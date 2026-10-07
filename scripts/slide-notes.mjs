import { createHash, randomUUID } from 'node:crypto'
import { constants } from 'node:fs'
import { link, lstat, mkdir, open, readFile, readdir, rename, unlink } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inspectSlideIdentities } from './slide-identities.mjs'

export const MAX_NOTE_BYTES = 256 * 1024
export const MAX_CORRECTION_IMAGE_BYTES = 10 * 1024 * 1024
const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const revisionOf = text => createHash('sha256').update(text).digest('hex')

export function noteError(status, message) {
  return Object.assign(new Error(message), { status })
}

function validateId(id) {
  if (typeof id !== 'string' || !uuidPattern.test(id))
    throw noteError(400, 'Invalid slide ID')
}

export function noteFilename(slide) {
  const title = slide.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80).replace(/-$/g, '') || 'untitled'
  return `slide-${String(slide.number).padStart(3, '0')}-${title}--${slide.id}.md`
}

function encodeNote(slide, content) {
  return `---\nslide_id: ${JSON.stringify(slide.id)}\nslide_number: ${slide.number}\nslide_title: ${JSON.stringify(slide.title)}\nsource_anchor: ${JSON.stringify(slide.anchor ?? null)}\n---\n\n${content}`
}

function imageMetadata(slide, imageId) {
  return {
    slide_id: slide.id, slide_number: slide.number, slide_title: slide.title,
    source_anchor: slide.anchor ?? null, image_id: imageId,
    filename: `${noteFilename(slide).slice(0, -3)}--screenshot-${imageId}.png`,
  }
}

function decodeNote(raw, filename) {
  const header = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  const field = header?.[1].match(/^slide_id:\s*([^\r\n]+)$/m)?.[1].trim()
  if (!field) {
    if (filename.startsWith('slide-'))
      throw noteError(500, `Note ${filename} has missing or damaged slide_id metadata; restore its header before editing`)
    return null
  }
  const id = field.replace(/^(?:"([^"\n]+)"|'([^'\n]+)')$/, (_, double, single) => double ?? single)
  if (!uuidPattern.test(id))
    throw noteError(500, `Note ${filename} has an invalid slide_id; restore its header before editing`)
  // The one blank line belongs to the file wrapper, not the user's Markdown.
  return { id, content: raw.slice(header[0].length).replace(/^\r?\n/, ''), raw, filename }
}

async function atomicWrite(path, content) {
  const temporary = `${path}.tmp-${randomUUID()}`
  let handle
  try {
    handle = await open(temporary, 'wx', 0o600)
    await handle.writeFile(content, 'utf8')
    await handle.sync()
    await handle.close()
    handle = null
    await rename(temporary, path)
  }
  finally {
    await handle?.close()
    await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error })
  }
}

export function createSlideNotesStore({
  slidesPath = resolve(projectDirectory, 'slides.md'),
  corrections = false,
  notesDirectory = resolve(projectDirectory, corrections ? 'Corrections' : 'notes'),
} = {}) {
  slidesPath = resolve(slidesPath)
  notesDirectory = resolve(notesDirectory)
  const directoryLabel = corrections ? 'Corrections' : 'notes'
  let pending = Promise.resolve()
  const serialize = operation => {
    const result = pending.then(operation, operation)
    pending = result.catch(() => {})
    return result
  }

  async function directoryExists(create = false) {
    if (create) await mkdir(notesDirectory, { recursive: true })
    try {
      const stat = await lstat(notesDirectory)
      if (!stat.isDirectory() || stat.isSymbolicLink())
        throw noteError(500, 'The notes directory must be a real directory')
      return true
    }
    catch (error) { if (error.code === 'ENOENT') return false; throw error }
  }

  async function withWriteLock(operation) {
    await directoryExists(true)
    const lockPath = resolve(notesDirectory, '.slide-notes.lock')
    let lock
    try {
      lock = await open(lockPath, 'wx', 0o600)
    }
    catch (error) {
      if (error.code === 'EEXIST')
        throw noteError(409, `Another write is in progress. Retry; if the server crashed, remove ${directoryLabel}/.slide-notes.lock after stopping it`)
      throw error
    }
    try { return await operation() }
    finally { await lock.close(); await unlink(lockPath) }
  }

  async function loadSlides() {
    const slides = inspectSlideIdentities(await readFile(slidesPath, 'utf8'))
    if (slides.some(slide => !slide.id))
      throw noteError(500, 'A slide is missing its persistent ID. Restart the development server to assign it')
    return slides
  }

  async function loadNotes() {
    const notes = new Map()
    if (!await directoryExists()) return notes
    for (const filename of (await readdir(notesDirectory)).sort()) {
      if (!filename.endsWith('.md')) continue
      const path = resolve(notesDirectory, filename)
      const stat = await lstat(path)
      if (!stat.isFile() || stat.isSymbolicLink())
        throw noteError(500, `Note ${filename} must be a regular file`)
      if (stat.size > MAX_NOTE_BYTES + 16384)
        throw noteError(500, `Note ${filename} exceeds the supported size`)
      const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW)
      let raw
      try { raw = await handle.readFile('utf8') }
      finally { await handle.close() }
      const note = decodeNote(raw, filename)
      if (!note) continue
      if (notes.has(note.id))
        throw noteError(500, `Multiple note files refer to slide ${note.id}; resolve the duplicate files before editing`)
      notes.set(note.id, note)
    }
    return notes
  }

  async function imageFile(filename, maximumSize, read = true) {
    const path = resolve(notesDirectory, filename)
    const stat = await lstat(path)
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > maximumSize)
      throw noteError(500, `Correction image file ${filename} must be a regular file within the size limit`)
    if (!read) return
    const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW)
    try { return await handle.readFile() }
    finally { await handle.close() }
  }

  async function loadImages({ includeMissing = false } = {}) {
    if (!corrections || !await directoryExists()) return []
    const images = []
    const seen = new Set()
    for (const filename of (await readdir(notesDirectory)).sort()) {
      if (!filename.endsWith('.png.json')) continue
      let metadata
      try { metadata = JSON.parse((await imageFile(filename, 16384)).toString('utf8')) }
      catch (error) {
        if (error.code === 'ENOENT') continue
        throw noteError(500, `Cannot read correction image metadata ${filename}: ${error.message}`)
      }
      const imageFilename = filename.slice(0, -5)
      if (!metadata || !uuidPattern.test(metadata.slide_id) || !uuidPattern.test(metadata.image_id)
        || typeof metadata.filename !== 'string'
        || metadata.filename.replace(/^x_/, '') !== imageFilename.replace(/^x_/, '') || !Number.isInteger(metadata.slide_number)
        || typeof metadata.slide_title !== 'string' || seen.has(metadata.image_id))
        throw noteError(500, `Correction image ${filename} has damaged or duplicate metadata`)
      // Metadata is authoritative; never infer the slide from its title/number.
      // Prefixing an image or its sidecar with x_ hides it without requiring
      // a manual metadata edit. Retain the real sidecar path for later syncs.
      let storedFilename = imageFilename
      try { await imageFile(storedFilename, MAX_CORRECTION_IMAGE_BYTES, false) }
      catch (error) {
        if (error.code !== 'ENOENT') throw error
        const alternate = imageFilename.startsWith('x_') ? imageFilename.slice(2) : `x_${imageFilename}`
        try {
          await imageFile(alternate, MAX_CORRECTION_IMAGE_BYTES, false)
          storedFilename = alternate
        }
        catch (error) {
          if (error.code !== 'ENOENT') throw error
          // A manually deleted screenshot leaves a harmless sidecar. It must
          // not block loading corrections, saving replacements, or builds.
          if (!includeMissing) continue
        }
      }
      seen.add(metadata.image_id)
      images.push({ ...metadata, filename: storedFilename, sidecarFilename: filename })
    }
    return images
  }

  async function record(slide, note, images) {
    return {
      slideId: slide.id, slideNumber: slide.number, slideTitle: slide.title,
      content: note?.content ?? '', revision: note ? revisionOf(note.raw) : null,
      filename: note?.filename ?? null,
      ...(corrections ? { images: (images ?? await loadImages()).filter(image => image.slide_id === slide.id)
        .map(image => ({ imageId: image.image_id,
          filename: image.sidecarFilename.startsWith('x_') && !image.filename.startsWith('x_') ? `x_${image.filename}` : image.filename })) } : {}),
    }
  }

  async function read(id) {
    validateId(id)
    const slides = await loadSlides()
    const slide = slides.find(slide => slide.id === id)
    if (!slide) throw noteError(404, `This slide ID is no longer in the presentation; its saved files are retained in ${directoryLabel}/`)
    return record(slide, (await loadNotes()).get(id))
  }

  async function persist(slide, previous, content) {
    const filename = `${corrections && previous?.filename.startsWith('x_') ? 'x_' : ''}${noteFilename(slide)}`
    const raw = encodeNote(slide, content)
    if (previous?.raw === raw && previous.filename === filename) return previous
    if (previous && previous.filename !== filename) {
      // Claim a new filename without replacing anything already at that path.
      await link(resolve(notesDirectory, previous.filename), resolve(notesDirectory, filename))
        .catch(error => { if (error.code === 'EEXIST') throw noteError(500, `Refusing to replace existing note ${filename}`); throw error })
      try { await atomicWrite(resolve(notesDirectory, filename), raw) }
      catch (error) { await unlink(resolve(notesDirectory, filename)); throw error }
      await unlink(resolve(notesDirectory, previous.filename))
    }
    else {
      await atomicWrite(resolve(notesDirectory, filename), raw)
    }
    return { id: slide.id, content, raw, filename }
  }

  return {
    read: id => serialize(() => read(id)),
    save: (id, value) => serialize(async () => {
      validateId(id)
      if (!value || typeof value.content !== 'string' || !(value.revision === null || typeof value.revision === 'string'))
        throw noteError(400, 'Expected Markdown content and its last loaded revision')
      if (Buffer.byteLength(value.content, 'utf8') > MAX_NOTE_BYTES)
        throw noteError(413, 'Notes are limited to 256 KiB of Markdown')
      if (corrections && value.content.split(/\r?\n/).some(line => line.trim() && !/^-(?:\s+\S|\[[ xX]\])/.test(line)))
        throw noteError(400, 'Write each correction as a Markdown bullet: - correction text')
      return withWriteLock(async () => {
        const slide = (await loadSlides()).find(slide => slide.id === id)
        if (!slide) throw noteError(404, 'This slide is no longer in the presentation; the draft has not been saved')
        const previous = (await loadNotes()).get(id)
        if ((previous ? revisionOf(previous.raw) : null) !== value.revision)
          throw noteError(409, 'This note changed since you opened it. Keep your draft and reload the saved version before merging')
        // Opening the editor and image-only corrections need no Markdown file.
        if (corrections && !previous && !value.content.trim()) return record(slide, null)
        // Clearing an existing note persists explicitly without deleting it.
        const saved = await persist(slide, previous, value.content)
        return record(slide, saved)
      })
    }),
    all: () => serialize(async () => {
      const slides = await loadSlides()
      const notes = await loadNotes()
      const images = await loadImages()
      return Object.fromEntries(await Promise.all(slides.filter(slide => notes.has(slide.id) || images.some(image => image.slide_id === slide.id))
        .map(async slide => [slide.id, await record(slide, notes.get(slide.id), images)])))
    }),
    saveImage: (id, content) => serialize(async () => {
      validateId(id)
      if (!corrections) throw noteError(404, 'Screenshots belong in Corrections/')
      if (!Buffer.isBuffer(content) || !content.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')))
        throw noteError(415, 'Expected a PNG clipboard image')
      if (content.length > MAX_CORRECTION_IMAGE_BYTES)
        throw noteError(413, 'Correction images are limited to 10 MiB')
      return withWriteLock(async () => {
        const slide = (await loadSlides()).find(slide => slide.id === id)
        if (!slide) throw noteError(404, 'This slide is no longer in the presentation; the image has not been saved')
        await loadImages()
        const metadata = imageMetadata(slide, randomUUID())
        const path = resolve(notesDirectory, metadata.filename)
        await atomicWrite(path, content)
        try { await atomicWrite(`${path}.json`, `${JSON.stringify(metadata, null, 2)}\n`) }
        catch (error) { await unlink(path); throw error }
        return { imageId: metadata.image_id, filename: metadata.filename }
      })
    }),
    readImage: (id, imageId) => serialize(async () => {
      validateId(id)
      validateId(imageId)
      if (!(await loadSlides()).some(slide => slide.id === id)) throw noteError(404, 'Unknown slide ID')
      const image = (await loadImages()).find(image => image.slide_id === id && image.image_id === imageId)
      if (!image) throw noteError(404, 'Unknown correction image')
      return imageFile(image.filename, MAX_CORRECTION_IMAGE_BYTES)
    }),
    deleteImage: (id, imageId) => serialize(async () => {
      validateId(id)
      validateId(imageId)
      if (!corrections) throw noteError(404, 'Screenshots belong in Corrections/')
      if (!(await loadSlides()).some(slide => slide.id === id)) throw noteError(404, 'Unknown slide ID')
      return withWriteLock(async () => {
        const images = await loadImages({ includeMissing: true })
        const image = images.find(image => image.image_id === imageId)
        if (image && image.slide_id !== id) throw noteError(404, 'Unknown correction image')
        if (image) {
          for (const filename of [image.filename, image.sidecarFilename])
            await unlink(resolve(notesDirectory, filename)).catch(error => { if (error.code !== 'ENOENT') throw error })
        }
        // Repeated deletion is harmless, including after manual deletion.
        return read(id)
      })
    }),
    syncMetadata: () => serialize(async () => {
      if (!await directoryExists()) return
      return withWriteLock(async () => {
        const slides = await loadSlides()
        const notes = await loadNotes()
        const images = await loadImages()
        if (corrections) {
          const knownImages = new Set((await loadImages({ includeMissing: true })).map(image => image.image_id))
          for (const filename of (await readdir(notesDirectory)).sort()) {
            const ids = filename.match(/^(?:x_)?slide-\d+-.*--([0-9a-f-]{36})--screenshot-([0-9a-f-]{36})\.png$/)
            if (!ids || !uuidPattern.test(ids[1]) || !uuidPattern.test(ids[2]) || knownImages.has(ids[2])) continue
            const slide = slides.find(slide => slide.id === ids[1])
            if (!slide) continue
            // Recover a missing sidecar using only the persistent UUIDs in
            // our screenshot filename. Existing metadata remains authoritative.
            await imageFile(filename, MAX_CORRECTION_IMAGE_BYTES, false)
            const metadata = { ...imageMetadata(slide, ids[2]), filename }
            const sidecarFilename = `${filename}.json`
            await atomicWrite(resolve(notesDirectory, sidecarFilename), `${JSON.stringify(metadata, null, 2)}\n`)
            images.push({ ...metadata, sidecarFilename })
            knownImages.add(ids[2])
          }
        }
        for (const slide of slides) {
          const previous = notes.get(slide.id)
          if (previous) await persist(slide, previous, previous.content)
          for (const image of images.filter(image => image.slide_id === slide.id)) {
            const updated = imageMetadata(slide, image.image_id)
            if (image.filename.startsWith('x_') || image.sidecarFilename.startsWith('x_')) updated.filename = `x_${updated.filename}`
            const { sidecarFilename, ...savedMetadata } = image
            if (JSON.stringify(savedMetadata) === JSON.stringify(updated) && sidecarFilename === `${updated.filename}.json`) continue
            const oldPath = resolve(notesDirectory, image.filename)
            const newPath = resolve(notesDirectory, updated.filename)
            if (image.filename !== updated.filename) await link(oldPath, newPath)
            try { await atomicWrite(`${newPath}.json`, `${JSON.stringify(updated, null, 2)}\n`) }
            catch (error) { if (oldPath !== newPath) await unlink(newPath); throw error }
            if (resolve(notesDirectory, sidecarFilename) !== `${newPath}.json`) await unlink(resolve(notesDirectory, sidecarFilename))
            if (oldPath !== newPath) await unlink(oldPath)
          }
        }
      })
    }),
  }
}

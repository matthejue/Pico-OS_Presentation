import { createHash, randomUUID } from 'node:crypto'
import { constants } from 'node:fs'
import { link, lstat, mkdir, open, readFile, readdir, rename, unlink } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inspectSlideIdentities } from './slide-identities.mjs'

export const MAX_NOTE_BYTES = 256 * 1024
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
  notesDirectory = resolve(projectDirectory, 'notes'),
} = {}) {
  slidesPath = resolve(slidesPath)
  notesDirectory = resolve(notesDirectory)
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
        throw noteError(409, 'Another notes write is in progress. Retry; if the server crashed, remove notes/.slide-notes.lock after stopping it')
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

  function record(slide, note) {
    return {
      slideId: slide.id, slideNumber: slide.number, slideTitle: slide.title,
      content: note?.content ?? '', revision: note ? revisionOf(note.raw) : null,
      filename: note?.filename ?? null,
    }
  }

  async function read(id) {
    validateId(id)
    const slides = await loadSlides()
    const slide = slides.find(slide => slide.id === id)
    if (!slide) throw noteError(404, 'This slide ID is no longer in the presentation; its saved note is retained in notes/')
    return record(slide, (await loadNotes()).get(id))
  }

  async function persist(slide, previous, content) {
    const filename = noteFilename(slide)
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
      return withWriteLock(async () => {
        const slide = (await loadSlides()).find(slide => slide.id === id)
        if (!slide) throw noteError(404, 'This slide is no longer in the presentation; the draft has not been saved')
        const previous = (await loadNotes()).get(id)
        if ((previous ? revisionOf(previous.raw) : null) !== value.revision)
          throw noteError(409, 'This note changed since you opened it. Keep your draft and reload the saved version before merging')
        // Empty saves persist explicitly; clearing a note never deletes a file.
        const saved = await persist(slide, previous, value.content)
        return record(slide, saved)
      })
    }),
    all: () => serialize(async () => {
      const slides = await loadSlides()
      const notes = await loadNotes()
      return Object.fromEntries(slides.filter(slide => notes.has(slide.id)).map(slide => [slide.id, record(slide, notes.get(slide.id))]))
    }),
    syncMetadata: () => serialize(async () => {
      if (!await directoryExists()) return
      return withWriteLock(async () => {
        const slides = await loadSlides()
        const notes = await loadNotes()
        for (const slide of slides) {
          const previous = notes.get(slide.id)
          if (previous) await persist(slide, previous, previous.content)
        }
      })
    }),
  }
}

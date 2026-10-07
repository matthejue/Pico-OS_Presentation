import { resolve } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createSlideNotesStore, MAX_CORRECTION_IMAGE_BYTES, MAX_NOTE_BYTES, noteError } from './slide-notes.mjs'

const projectDirectory = fileURLToPath(new URL('../', import.meta.url))

function sendJson(response, status, data) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.end(JSON.stringify(data))
}

async function readBody(request) {
  if (!request.headers['content-type']?.startsWith('application/json'))
    throw noteError(415, 'Expected an application/json request')
  const chunks = []
  let length = 0
  for await (const chunk of request) {
    length += chunk.length
    // JSON may expand a character into six bytes (for example, \\u0000).
    if (length > MAX_NOTE_BYTES * 6 + 16384)
      throw noteError(413, 'Note request is too large')
    chunks.push(chunk)
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) }
  catch { throw noteError(400, 'Invalid JSON request') }
}

async function readImageBody(request) {
  if (request.headers['content-type'] !== 'image/png') throw noteError(415, 'Expected an image/png request')
  const chunks = []
  let length = 0
  for await (const chunk of request) {
    length += chunk.length
    if (length > MAX_CORRECTION_IMAGE_BYTES) throw noteError(413, 'Correction images are limited to 10 MiB')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export default function createSlideNotesPlugin({
  slidesPath = resolve(projectDirectory, 'slides.md'),
  corrections = false,
  notesDirectory = resolve(projectDirectory, corrections ? 'Corrections' : 'notes'),
} = {}) {
  slidesPath = resolve(slidesPath)
  notesDirectory = resolve(notesDirectory)
  const kind = corrections ? 'corrections' : 'notes'
  const virtualId = `virtual:picoos-slide-${kind}`
  const resolvedVirtualId = `\0${virtualId}`
  const changeEvent = `picoos:slide-${kind}-changed`
  const editorHeader = `x-picoos-slide-${kind}`
  const store = createSlideNotesStore({ slidesPath, notesDirectory, corrections })
  let building = false
  let base = '/'
  return {
    name: `picoos-slide-${kind}`,
    configResolved(config) {
      building = config.command === 'build'
      base = config.base
    },
    async buildStart() {
      // Reordering/retitling only changes the readable name and metadata.
      await store.syncMetadata()
    },
    resolveId(id) { if (id === virtualId) return resolvedVirtualId },
    async load(id) {
      if (id !== resolvedVirtualId) return
      if (!building) return 'export default {}'
      this.addWatchFile(slidesPath)
      const notes = await store.all()
      const imageUrls = []
      for (const note of Object.values(notes)) {
        if (note.filename) this.addWatchFile(resolve(notesDirectory, note.filename))
        for (const [index, image] of (note.images ?? []).entries()) {
          this.addWatchFile(resolve(notesDirectory, image.filename))
          this.addWatchFile(resolve(notesDirectory, `${image.filename}.json`))
          const reference = this.emitFile({ type: 'asset', name: image.filename, source: await store.readImage(note.slideId, image.imageId) })
          imageUrls.push(`notes[${JSON.stringify(note.slideId)}].images[${index}].url = import.meta.ROLLUP_FILE_URL_${reference};`)
        }
      }
      return `const notes = ${JSON.stringify(notes)};\n${imageUrls.join('\n')}\nexport default notes;`
    },
    async configureServer(server) {
      // Watch real directories from startup, including before the first save.
      await mkdir(notesDirectory, { recursive: true })
      const endpoint = `${base}__slide-${kind}/`
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split('?')[0] ?? ''
        // Vite can pass a base-stripped URL when another middleware mounted it.
        const prefix = pathname.startsWith(endpoint) ? endpoint : `/__slide-${kind}/`
        if (!pathname.startsWith(prefix)) return next()
        const [id, action, imageId, ...extra] = pathname.slice(prefix.length).split('/')
        void (async () => {
          if (extra.length || action && (!corrections || action !== 'images')) throw noteError(404, 'Unknown slide annotation action')
          if (action === 'images' && imageId && request.method === 'GET') {
            const image = await store.readImage(id, imageId)
            response.statusCode = 200
            response.setHeader('Content-Type', 'image/png')
            response.setHeader('Cache-Control', 'no-store')
            response.setHeader('X-Content-Type-Options', 'nosniff')
            return response.end(image)
          }
          const upload = action === 'images' && !imageId && request.method === 'POST'
          const deletion = action === 'images' && imageId && request.method === 'DELETE'
          if (action && !upload && !deletion) throw noteError(405, 'Use POST to save a correction image, GET to view one, or DELETE to remove one')
          if (request.method === 'GET')
            return sendJson(response, 200, await store.read(id))
          if (request.method !== 'PUT' && !upload && !deletion) {
            response.setHeader('Allow', 'GET, PUT')
            throw noteError(405, 'Use GET to load notes or PUT to save them')
          }
          if (request.headers[editorHeader] !== '1')
            throw noteError(403, `Missing slide-${kind} editor header`)
          if (request.headers.origin) {
            let host
            try { host = new URL(request.headers.origin).host }
            catch { throw noteError(403, 'Invalid request origin') }
            if (host !== request.headers.host)
              throw noteError(403, 'Slide annotations must be saved from the presentation origin')
          }
          const saved = deletion ? await store.deleteImage(id, imageId)
            : upload ? await store.saveImage(id, await readImageBody(request)) : await store.save(id, await readBody(request))
          sendJson(response, 200, saved)
          server.ws.send({ type: 'custom', event: changeEvent, data: { slideId: id } })
        })().catch(error => sendJson(response, error.status ?? 500, { error: error.message ?? String(error) }))
      })

      server.watcher.add([slidesPath, notesDirectory])
      let updateTimer
      function onChange(path) {
        if (resolve(path) === slidesPath) {
          clearTimeout(updateTimer)
          updateTimer = setTimeout(() => {
            void store.syncMetadata().catch(error => server.config.logger.error(`Slide ${kind}: ${error.message}`))
          }, 100)
        }
        else if (resolve(path).startsWith(`${notesDirectory}/`) && (path.endsWith('.md') || corrections && (path.endsWith('.png.json') || path.endsWith('.png')))) {
          server.ws.send({ type: 'custom', event: changeEvent, data: {} })
        }
      }
      server.watcher.on('add', onChange).on('change', onChange).on('unlink', onChange)
      server.httpServer?.once('close', () => {
        clearTimeout(updateTimer)
        server.watcher.off('add', onChange).off('change', onChange).off('unlink', onChange)
      })
    },
  }
}

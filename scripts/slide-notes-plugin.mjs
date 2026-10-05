import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSlideNotesStore, MAX_NOTE_BYTES, noteError } from './slide-notes.mjs'

const virtualId = 'virtual:picoos-slide-notes'
const resolvedVirtualId = `\0${virtualId}`
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

export default function createSlideNotesPlugin({
  slidesPath = resolve(projectDirectory, 'slides.md'),
  notesDirectory = resolve(projectDirectory, 'notes'),
} = {}) {
  slidesPath = resolve(slidesPath)
  notesDirectory = resolve(notesDirectory)
  const store = createSlideNotesStore({ slidesPath, notesDirectory })
  let building = false
  let base = '/'
  return {
    name: 'picoos-slide-notes',
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
      for (const note of Object.values(notes))
        this.addWatchFile(resolve(notesDirectory, note.filename))
      return `export default ${JSON.stringify(notes)}`
    },
    configureServer(server) {
      const endpoint = `${base}__slide-notes/`
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split('?')[0] ?? ''
        // Vite can pass a base-stripped URL when another middleware mounted it.
        const prefix = pathname.startsWith(endpoint) ? endpoint : '/__slide-notes/'
        if (!pathname.startsWith(prefix)) return next()
        const id = pathname.slice(prefix.length)
        void (async () => {
          if (request.method === 'GET')
            return sendJson(response, 200, await store.read(id))
          if (request.method !== 'PUT') {
            response.setHeader('Allow', 'GET, PUT')
            throw noteError(405, 'Use GET to load notes or PUT to save them')
          }
          if (request.headers['x-picoos-slide-notes'] !== '1')
            throw noteError(403, 'Missing slide-notes editor header')
          if (request.headers.origin) {
            let host
            try { host = new URL(request.headers.origin).host }
            catch { throw noteError(403, 'Invalid request origin') }
            if (host !== request.headers.host)
              throw noteError(403, 'Notes must be saved from the presentation origin')
          }
          const saved = await store.save(id, await readBody(request))
          sendJson(response, 200, saved)
          server.ws.send({ type: 'custom', event: 'picoos:slide-notes-changed', data: { slideId: id } })
        })().catch(error => sendJson(response, error.status ?? 500, { error: error.message ?? String(error) }))
      })

      server.watcher.add([slidesPath, notesDirectory])
      let updateTimer
      function onChange(path) {
        if (resolve(path) === slidesPath) {
          clearTimeout(updateTimer)
          updateTimer = setTimeout(() => {
            void store.syncMetadata().catch(error => server.config.logger.error(`Slide notes: ${error.message}`))
          }, 100)
        }
        else if (resolve(path).startsWith(`${notesDirectory}/`) && path.endsWith('.md')) {
          server.ws.send({ type: 'custom', event: 'picoos:slide-notes-changed', data: {} })
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

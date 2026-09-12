import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig } from 'vite'
import { applySelection, syncSelection, toggleSelection } from './scripts/short-version.mjs'

const maximumBodySize = 1024

async function readJsonBody(request: IncomingMessage) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > maximumBodySize)
      throw new Error('Request body is too large')
  }
  return body ? JSON.parse(body) : {}
}

function sendJson(response: ServerResponse, status: number, value: unknown) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(value))
}

export default defineConfig({
  plugins: [
    {
      name: 'picoos-short-version-editor',
      configureServer(server) {
        let writes = Promise.resolve()
        server.middlewares.use('/__short-version', (request, response, next) => {
          if (request.method !== 'POST') {
            next()
            return
          }
          if (request.headers['x-picoos-short-version'] !== '1') {
            sendJson(response, 403, { error: 'Missing short-version editor header' })
            return
          }

          const action = request.url?.split('?')[0].split('/').filter(Boolean).at(-1)
          if (!['toggle', 'apply', 'sync'].includes(action ?? '')) {
            sendJson(response, 404, { error: 'Unknown short-version action' })
            return
          }

          const operation = async () => {
            const body = await readJsonBody(request)
            if (action === 'toggle')
              return toggleSelection(Number(body.slide))
            if (action === 'apply') {
              const result = await applySelection()
              return { slideCount: result.slideCount, disabledCount: result.disabled.length, changed: result.changed }
            }
            const result = await syncSelection()
            return { slideCount: result.slideCount, disabledCount: result.disabled.length }
          }

          writes = writes.then(operation, operation).then(
            result => sendJson(response, 200, result),
            error => sendJson(response, 400, { error: error instanceof Error ? error.message : String(error) }),
          )
        })
      },
    },
  ],
})

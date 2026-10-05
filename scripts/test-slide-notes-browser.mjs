// An isolated deck exercises the real Slidev/Vite integration without writing
// into the presenter's slides or notes. PRESENTATION_URL may point to a manually
// started copy of this fixture; its known UUIDs are checked before any writes.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { existsSync } from 'node:fs'
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const firstId = 'ba1c5141-e8c1-4c85-bbde-fb4d6f038bec'
const secondId = '34f22a0b-eb90-47e0-a64c-33b97ec16ae8'
const fixtureBase = '/notes-fixture/'
let fixtureDirectory
let server
let serverOutput = ''
let browser
let url = process.env.PRESENTATION_URL

async function unusedPort() {
  const listener = createServer()
  listener.listen(0, '127.0.0.1')
  await once(listener, 'listening')
  const port = listener.address().port
  await new Promise((resolveClose, reject) => listener.close(error => error ? reject(error) : resolveClose()))
  return port
}

async function createFixture() {
  fixtureDirectory = await mkdtemp(join(tmpdir(), 'picoos-notes-browser-'))
  await Promise.all([
    mkdir(join(fixtureDirectory, 'components')),
    mkdir(join(fixtureDirectory, 'setup')),
    cp(join(project, 'scripts'), join(fixtureDirectory, 'scripts'), { recursive: true }),
    cp(join(project, 'package.json'), join(fixtureDirectory, 'package.json')),
    symlink(join(project, 'node_modules'), join(fixtureDirectory, 'node_modules')),
  ])
  await Promise.all([
    cp(join(project, 'components/SlideNotes.vue'), join(fixtureDirectory, 'components/SlideNotes.vue')),
    cp(join(project, 'components/VisualZoom.vue'), join(fixtureDirectory, 'components/VisualZoom.vue')),
    cp(join(project, 'setup/shortcuts.ts'), join(fixtureDirectory, 'setup/shortcuts.ts')),
    writeFile(join(fixtureDirectory, 'global-top.vue'), `<script setup>\nimport SlideNotes from './components/SlideNotes.vue'\nimport VisualZoom from './components/VisualZoom.vue'\n</script>\n<template><SlideNotes /><VisualZoom /></template>\n`),
    writeFile(join(fixtureDirectory, 'setup/preparser.ts'), `import { definePreparserSetup } from '@slidev/types'\nexport default definePreparserSetup(() => [{ name: 'notes-fixture-identity', transformSlide(content, frontmatter) { frontmatter.noteId = content.match(/<!-- SLIDE_ID ([^ ]+) -->/)?.[1] } }])\n`),
    writeFile(join(fixtureDirectory, 'vite.config.mts'), `import { defineConfig } from 'vite'\nimport createSlideNotesPlugin from './scripts/slide-notes-plugin.mjs'\nexport default defineConfig({ plugins: [createSlideNotesPlugin()] })\n`),
    writeFile(join(fixtureDirectory, 'slides.md'), `---\ntheme: default\ntitle: Slide notes browser fixture\nfonts:\n  sans: Arial\n  mono: monospace\n---\n\n<!-- SLIDE_ID ${firstId} -->\n\n# Notes Alpha\n\nFirst note belongs here.\n\n<div class="zoomable">Zoomable fixture visual</div>\n\n---\n\n<!-- SLIDE_ID ${secondId} -->\n\n# Notes Beta\n\nSecond note belongs here.\n`),
  ])
  const port = await unusedPort()
  url = `http://localhost:${port}${fixtureBase}`
  server = spawn(process.execPath, [join(project, 'node_modules/@slidev/cli/bin/slidev.mjs'), 'slides.md', '--port', String(port), '--base', fixtureBase, '--log', 'error'], {
    cwd: fixtureDirectory,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, SLIDES_SHORT: '0' },
  })
  for (const output of [server.stdout, server.stderr]) output.on('data', chunk => { serverOutput = `${serverOutput}${chunk}`.slice(-16000) })
}

const pause = duration => new Promise(resolvePause => setTimeout(resolvePause, duration))

async function waitForServer() {
  const deadline = Date.now() + 45000
  let lastResponse = ''
  while (Date.now() < deadline) {
    if (server && server.exitCode !== null) throw new Error(`Slidev fixture stopped: ${serverOutput}`)
    try {
      const response = await fetch(`${url}__slide-notes/${firstId}`)
      if (response.ok) return
      lastResponse = `HTTP ${response.status}: ${(await response.text()).slice(0, 1000)}`
    }
    catch (error) { lastResponse = String(error.cause || error) }
    await pause(200)
  }
  throw new Error(`Slidev fixture did not start (${lastResponse}): ${serverOutput}`)
}

async function getNote(id) {
  const response = await fetch(`${url}__slide-notes/${id}`)
  assert.equal(response.status, 200)
  return response.json()
}

async function putNote(id, content, revision) {
  const response = await fetch(`${url}__slide-notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-PicoOS-Slide-Notes': '1' },
    body: JSON.stringify({ content, revision }),
  })
  assert.equal(response.status, 200, await response.clone().text())
  return response.json()
}

async function waitForNote(id, content) {
  const deadline = Date.now() + 10000
  while (Date.now() < deadline) {
    const note = await getNote(id)
    if (note.content === content) return note
    await pause(100)
  }
  assert.equal((await getNote(id)).content, content)
}

async function editor(page) {
  await page.keyboard.press('Alt+n')
  const dialog = page.getByRole('dialog', { name: 'Edit slide note' })
  await dialog.waitFor({ state: 'visible' })
  const input = dialog.getByRole('textbox', { name: 'Markdown note' })
  await input.waitFor({ state: 'visible' })
  await page.waitForFunction(() => !document.querySelector('#slide-note-markdown')?.disabled)
  return { dialog, input }
}

async function saveEditor(page, id, content) {
  await page.keyboard.press('Control+Enter')
  const result = await waitForNote(id, content)
  await page.getByRole('dialog', { name: 'Edit slide note' }).getByText('All changes saved', { exact: true }).waitFor()
  return result
}

async function closeEditor(page) {
  await page.keyboard.press('Escape')
  await page.getByRole('dialog', { name: 'Edit slide note' }).waitFor({ state: 'hidden' })
}

try {
  if (!url) await createFixture()
  url = url.endsWith('/') ? url : `${url}/`
  await waitForServer()
  const first = await getNote(firstId)
  const second = await getNote(secondId)
  assert.equal(first.slideTitle, 'Notes Alpha', 'PRESENTATION_URL must point to the isolated notes fixture')
  assert.equal(second.slideTitle, 'Notes Beta', 'PRESENTATION_URL must point to the isolated notes fixture')

  const endpoint = `${url}__slide-notes/${firstId}`
  const body = JSON.stringify({ content: 'Unauthorized overwrite', revision: first.revision })
  assert.equal((await fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body })).status, 403)
  assert.equal((await fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-PicoOS-Slide-Notes': '1', Origin: 'https://foreign.invalid' }, body })).status, 403)
  assert.equal((await fetch(endpoint, { method: 'POST' })).status, 405)
  assert.equal((await fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'text/plain', 'X-PicoOS-Slide-Notes': '1' }, body })).status, 415)
  assert.equal((await fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-PicoOS-Slide-Notes': '1' }, body: '{damaged JSON' })).status, 400)
  assert.equal((await getNote(firstId)).content, first.content, 'Rejected HTTP requests do not modify saved notes')

  const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined)
  browser = await chromium.launch({ headless: true, executablePath })
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  const errors = []
  const shortVersionRequests = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (request.url().includes('/__short-version/')) shortVersionRequests.push(request.url()) })
  await page.goto(`${url}1`)
  await page.getByRole('button', { name: 'Edit slide note', exact: true }).waitFor()
  let { dialog, input } = await editor(page)
  const firstContent = '# Alpha speaker note\n\nRemember **the first slide** and ünicode.\n\n<script>window.noteExecuted = true</script>\n\n[Unsafe](javascript:alert(1))\n\n![No remote image](https://example.invalid/tracker.png)\n'
  await input.fill(firstContent)
  const editorUrl = page.url()
  for (const key of ['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', 'Space', 'm', 'n', 'f', '+', 'Alt+a', 'Alt+s']) await page.keyboard.press(key)
  assert.equal(page.url(), editorUrl, 'Typing navigation and presentation shortcuts cannot change slides')
  assert.equal(await page.locator('dialog[open]').count(), 1, 'Visual zoom cannot capture keys inside the note editor')
  assert.deepEqual(shortVersionRequests, [], 'Presentation editor shortcuts stay inactive while writing a note')
  await input.fill(firstContent)
  const saved = await saveEditor(page, firstId, firstContent)
  await closeEditor(page)
  const panel = page.getByRole('region', { name: 'Slide notes' })
  await panel.getByText('Alpha speaker note', { exact: true }).waitFor()
  assert.equal(await panel.locator('script, img, a[href^="javascript:"]').count(), 0, 'Markdown previews never execute source HTML or unsafe links')
  assert.equal(await page.evaluate(() => window.noteExecuted), undefined)
  assert.match(saved.filename, new RegExp(`^slide-001-notes-alpha--${firstId}\\.md$`))
  if (fixtureDirectory) {
    const filename = join(fixtureDirectory, 'notes', saved.filename)
    const markdown = await readFile(filename, 'utf8')
    assert.match(markdown, new RegExp(`slide_id: "${firstId}"`))
    assert.match(markdown, /slide_number: 1\b/)
    assert.match(markdown, /slide_title: "Notes Alpha"/)
    assert.ok(markdown.endsWith(firstContent), 'Ctrl+Enter saves Markdown into the fixture repository')
  }

  await page.keyboard.press('Alt+Shift+n')
  await panel.waitFor({ state: 'hidden' })
  await page.reload()
  await page.getByRole('button', { name: 'Toggle slide notes' }).waitFor()
  assert.equal(await panel.count(), 0, 'The hidden preference survives reload')
  await page.keyboard.press('Alt+Shift+n')
  await panel.getByText('Alpha speaker note', { exact: true }).waitFor()
  await page.keyboard.press('ArrowRight')
  await page.waitForURL(`${url}2`)
  await panel.getByText('2 · Notes Beta', { exact: true }).waitFor()
  assert.ok(!(await panel.innerText()).includes('Alpha speaker note'), 'Displayed notes follow the currently open slide')
  ;({ dialog, input } = await editor(page))
  const secondContent = 'A separate note for **Beta**.'
  await input.fill(secondContent)
  await saveEditor(page, secondId, secondContent)
  await closeEditor(page)
  await panel.getByText('A separate note for Beta.', { exact: true }).waitFor()
  await page.keyboard.press('ArrowLeft')
  await page.waitForURL(`${url}1`)
  await panel.getByText('Alpha speaker note', { exact: true }).waitFor()

  ;({ dialog, input } = await editor(page))
  const draft = 'Unsaved draft must survive closing and reloading.'
  await input.fill(draft)
  await page.keyboard.press('Escape')
  await dialog.getByRole('button', { name: 'Keep draft & close' }).click()
  await dialog.waitFor({ state: 'hidden' })
  assert.equal((await getNote(firstId)).content, firstContent, 'A browser draft does not overwrite the repository note')
  await page.reload()
  await page.getByRole('button', { name: 'Edit slide note', exact: true }).waitFor()
  ;({ dialog, input } = await editor(page))
  assert.equal(await input.inputValue(), draft, 'Unsaved drafts survive reload')
  await page.keyboard.press('Escape')
  await dialog.getByRole('button', { name: 'Discard draft', exact: true }).click()
  await dialog.waitFor({ state: 'hidden' })
  ;({ dialog, input } = await editor(page))
  assert.equal(await input.inputValue(), firstContent, 'Discarding a draft restores the persisted note')

  const localDraft = 'Draft from this browser.'
  await input.fill(localDraft)
  const current = await getNote(firstId)
  const remoteContent = 'Newer note saved by another client.'
  await putNote(firstId, remoteContent, current.revision)
  await page.keyboard.press('Control+Enter')
  await dialog.getByRole('alert').filter({ hasText: 'saved note changed' }).waitFor()
  assert.equal(await input.inputValue(), localDraft, 'A conflict preserves the editor draft')
  assert.equal((await getNote(firstId)).content, remoteContent, 'A stale editor cannot overwrite another client')
  const merge = dialog.getByRole('button', { name: 'Mark draft as merged' })
  assert.equal(await merge.isDisabled(), true, 'A conflict requires an explicit changed merge')
  const mergedContent = `${remoteContent}\n\n${localDraft}`
  await input.fill(mergedContent)
  await merge.click()
  await saveEditor(page, firstId, mergedContent)
  await closeEditor(page)
  await page.reload()
  await panel.getByText('Newer note saved by another client.', { exact: false }).waitFor()
  assert.ok((await panel.innerText()).includes(localDraft))
  assert.equal((await getNote(secondId)).content, secondContent, 'Editing and resolving conflicts cannot modify another slide')
  if (fixtureDirectory) assert.equal((await readdir(join(fixtureDirectory, 'notes'))).filter(filename => filename.endsWith('.md')).length, 2)
  assert.deepEqual(errors, [], 'No uncaught browser errors')
  console.log('Isolated Slidev notes shortcuts, repository persistence, visibility, navigation, reload, drafts, safe Markdown, HTTP validation, and conflicts passed.')
}
catch (error) {
  if (serverOutput) process.stderr.write(`Slidev fixture output:\n${serverOutput}\n`)
  throw error
}
finally {
  await browser?.close()
  if (server && server.exitCode === null) {
    const stopped = once(server, 'exit')
    server.kill('SIGTERM')
    await Promise.race([stopped, pause(5000)])
    if (server.exitCode === null) server.kill('SIGKILL')
  }
  if (fixtureDirectory) await rm(fixtureDirectory, { recursive: true, force: true })
}

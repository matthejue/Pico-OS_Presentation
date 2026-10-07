// An isolated deck exercises the real Slidev/Vite integration without writing
// into the presenter's slides or notes. PRESENTATION_URL may point to a manually
// started copy of this fixture; its known UUIDs are checked before any writes.
import assert from 'node:assert/strict'
import { execFile, spawn } from 'node:child_process'
import { once } from 'node:events'
import { existsSync } from 'node:fs'
import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, symlink, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { chromium } from 'playwright-chromium'

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const firstId = 'ba1c5141-e8c1-4c85-bbde-fb4d6f038bec'
const secondId = '34f22a0b-eb90-47e0-a64c-33b97ec16ae8'
const fixtureBase = '/notes-fixture/'
let fixtureDirectory
let server
let previewServer
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
    cp(join(project, 'components/ShortVersionStatus.vue'), join(fixtureDirectory, 'components/ShortVersionStatus.vue')),
    cp(join(project, 'setup/shortcuts.ts'), join(fixtureDirectory, 'setup/shortcuts.ts')),
    cp(join(project, 'setup/shortcut-hints.ts'), join(fixtureDirectory, 'setup/shortcut-hints.ts')),
    cp(join(project, 'global-top.vue'), join(fixtureDirectory, 'global-top.vue')),
    writeFile(join(fixtureDirectory, 'setup/preparser.ts'), `import { definePreparserSetup } from '@slidev/types'\nexport default definePreparserSetup(() => [{ name: 'notes-fixture-identity', transformSlide(content, frontmatter) { frontmatter.noteId = content.match(/<!-- SLIDE_ID ([^ ]+) -->/)?.[1] } }])\n`),
    writeFile(join(fixtureDirectory, 'vite.config.mts'), `import { defineConfig } from 'vite'\nimport createSlideNotesPlugin from './scripts/slide-notes-plugin.mjs'\nexport default defineConfig({ plugins: [createSlideNotesPlugin(), createSlideNotesPlugin({ corrections: true })] })\n`),
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

async function getNote(id, corrections = false) {
  const response = await fetch(`${url}__slide-${corrections ? 'corrections' : 'notes'}/${id}`)
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

async function waitForNote(id, content, corrections = false) {
  const deadline = Date.now() + 10000
  while (Date.now() < deadline) {
    const note = await getNote(id, corrections)
    if (note.content === content) return note
    await pause(100)
  }
  assert.equal((await getNote(id, corrections)).content, content)
}

async function editor(page, corrections = false) {
  const singular = corrections ? 'correction' : 'note'
  await page.keyboard.press(corrections ? 'Alt+c' : 'Alt+n')
  const dialog = page.getByRole('dialog', { name: `Edit slide ${singular}` })
  await dialog.waitFor({ state: 'visible' })
  const input = dialog.getByRole('textbox', { name: `Markdown ${singular}` })
  await input.waitFor({ state: 'visible' })
  await page.waitForFunction(id => !document.getElementById(id)?.disabled, `slide-${singular}-markdown`)
  return { dialog, input }
}

async function saveEditor(page, id, content, corrections = false) {
  await page.keyboard.press('Control+Enter')
  const result = await waitForNote(id, content, corrections)
  await page.getByRole('dialog', { name: `Edit slide ${corrections ? 'correction' : 'note'}` }).getByText('All changes saved', { exact: true }).waitFor()
  return result
}

async function closeEditor(page, corrections = false) {
  await page.keyboard.press('Escape')
  await page.getByRole('dialog', { name: `Edit slide ${corrections ? 'correction' : 'note'}` }).waitFor({ state: 'hidden' })
}

async function copyScreenshot(page) {
  await page.evaluate(async () => {
    const canvas = document.createElement('canvas')
    canvas.width = 4
    canvas.height = 3
    const drawing = canvas.getContext('2d')
    drawing.fillStyle = 'red'
    drawing.fillRect(0, 0, 4, 3)
    const blob = await new Promise(resolveBlob => canvas.toBlob(resolveBlob, 'image/png'))
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
  })
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
  // Let reactive shortcut state settle between synthetic key presses, as it
  // does with normal typing, before testing the next shortcut or navigation.
  browser = await chromium.launch({ headless: true, executablePath, slowMo: 50 })
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] })
  // Headless permission overrides deny screen wake locks. Keeping the display
  // awake is unrelated to these tests and otherwise causes Slidev rejections.
  await context.addInitScript(() => {
    try { localStorage.setItem('slidev-wake-lock', 'false') }
    catch { /* Blank and sandboxed documents have no local storage. */ }
  })
  const page = await context.newPage()
  const errors = []
  const shortVersionRequests = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (request.url().includes('/__short-version/')) shortVersionRequests.push(request.url()) })
  await page.goto(`${url}1`)
  await page.locator('.slidev-page-1 .slidev-layout').first().waitFor({ state: 'visible' })
  const noteButtons = page.locator('.slide-notes-controls:not(.slide-corrections-controls)')
  const correctionButtons = page.locator('.slide-corrections-controls')
  assert.equal(await noteButtons.count(), 0, 'Note buttons start hidden')
  assert.equal(await correctionButtons.count(), 0, 'Correction buttons start hidden')
  await page.keyboard.press('h')
  await noteButtons.waitFor({ state: 'visible' })
  assert.equal(await page.getByRole('button', { name: 'Edit slide note', exact: true }).innerText(), 'Notes · Alt+N')
  assert.equal(await page.getByRole('button', { name: 'Toggle slide notes' }).innerText(), 'Show · Alt+Shift+N')
  await correctionButtons.waitFor({ state: 'visible' })
  assert.equal(await page.getByRole('button', { name: 'Edit slide correction', exact: true }).innerText(), 'Corrections · Alt+C')
  assert.equal(await page.getByRole('button', { name: 'Toggle slide corrections' }).innerText(), 'Show · Alt+Shift+C')
  await page.keyboard.press('h')
  await noteButtons.waitFor({ state: 'hidden' })
  await correctionButtons.waitFor({ state: 'hidden' })
  assert.equal(page.url(), `${url}1`, 'H only toggles hints and buttons')
  let { dialog, input } = await editor(page)
  const noteEditorWidth = (await dialog.boundingBox()).width
  await input.fill('h')
  await page.keyboard.press('h')
  assert.equal(await input.inputValue(), 'hh', 'Typing H edits a note without toggling its controls')
  assert.equal(await noteButtons.count(), 0)
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
  await page.locator('.slidev-page-1 .slidev-layout').first().waitFor({ state: 'visible' })
  assert.equal(await noteButtons.count(), 0, 'Reload resets note buttons to hidden')
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
  await page.locator('.slidev-page-1 .slidev-layout').first().waitFor({ state: 'visible' })
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
  const remoteContent = 'Newer note saved by another client.\n\n- [x] Completed-looking note stays visible.'
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

  const correctionEndpoint = `${url}__slide-corrections/${firstId}`
  assert.equal((await getNote(firstId, true)).content, '')
  assert.equal((await fetch(correctionEndpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: '- Rejected', revision: null }) })).status, 403)
  assert.equal((await fetch(correctionEndpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-PicoOS-Slide-Corrections': '1' }, body: JSON.stringify({ content: 'Missing bullet', revision: null }) })).status, 400)
  assert.equal((await fetch(`${correctionEndpoint}/images`, { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: 'rejected' })).status, 403)
  assert.equal((await fetch(`${correctionEndpoint}/images`, { method: 'POST', headers: { 'Content-Type': 'image/png', 'X-PicoOS-Slide-Corrections': '1', Origin: 'https://foreign.invalid' }, body: 'rejected' })).status, 403)
  assert.equal((await fetch(`${correctionEndpoint}/images`, { method: 'POST', headers: { 'Content-Type': 'image/png', 'X-PicoOS-Slide-Corrections': '1' }, body: 'not PNG' })).status, 415)
  ;({ dialog, input } = await editor(page, true))
  assert.equal((await dialog.boundingBox()).width, noteEditorWidth, 'Corrections reuse the unchanged note editor size')
  assert.equal((await getNote(firstId, true)).filename, null, 'Opening the correction editor creates no Markdown file')
  await closeEditor(page, true)
  assert.equal((await getNote(firstId, true)).filename, null, 'Closing an untouched editor creates no Markdown file')
  ;({ dialog, input } = await editor(page, true))
  await input.fill('   \n')
  await page.keyboard.press('Control+Enter')
  await dialog.getByText('All changes saved', { exact: true }).waitFor()
  assert.equal(await input.inputValue(), '')
  assert.equal((await getNote(firstId, true)).filename, null, 'Saving whitespace creates no Markdown file')
  await copyScreenshot(page)
  await dialog.getByRole('button', { name: 'Save clipboard image' }).click()
  await dialog.getByRole('status').filter({ hasText: 'Saved image to Corrections/' }).waitFor()
  const imageOnly = await getNote(firstId, true)
  assert.equal(imageOnly.filename, null, 'Saving only a screenshot creates no Markdown file')
  assert.equal(imageOnly.images.length, 1)
  await dialog.getByRole('button', { name: 'Delete screenshot', exact: false }).click()
  await dialog.getByRole('status').filter({ hasText: 'Image deleted.' }).waitFor()
  assert.equal((await getNote(firstId, true)).filename, null)
  if (fixtureDirectory) assert.ok(!(await readdir(join(fixtureDirectory, 'Corrections'))).some(name => name.endsWith('.md')))
  const corrections = '- Correct **the Alpha label**.\n- Add a reference.\n-[x] Compact completed correction\n- [x] Standard completed correction\n- [X] Uppercase completed correction\n- [ ] Still pending correction\n'
  await input.fill(corrections)
  for (const key of ['ArrowRight', 'PageDown', 'Alt+n', 'Alt+Shift+n', 'Alt+Shift+c', 'Alt+a', 'h']) await page.keyboard.press(key)
  assert.equal(page.url(), `${url}1`, 'Correction editing locks slide navigation and other editor shortcuts')
  await input.fill(corrections)
  await saveEditor(page, firstId, corrections, true)
  const beforeImage = await getNote(firstId, true)
  const correctionDraft = `${corrections}- Retain this draft while saving an image.\n`
  await input.fill(correctionDraft)
  await page.evaluate(async () => navigator.clipboard.writeText('no image'))
  await dialog.getByRole('button', { name: 'Save clipboard image' }).click()
  await dialog.getByRole('alert').filter({ hasText: 'clipboard contains no image' }).waitFor()
  await copyScreenshot(page)
  await dialog.getByRole('button', { name: 'Save clipboard image' }).click()
  await dialog.getByRole('status').filter({ hasText: 'Saved image to Corrections/' }).waitFor()
  assert.equal(await input.inputValue(), correctionDraft, 'Saving the clipboard leaves the Markdown draft intact')
  const withImage = await getNote(firstId, true)
  assert.equal(withImage.images.length, 1)
  assert.equal(withImage.revision, beforeImage.revision, 'Screenshot saving does not change the Markdown revision')
  let image = withImage.images[0]
  assert.match(image.filename, new RegExp(`^slide-001-notes-alpha--${firstId}--screenshot-`))
  const imageResponse = await fetch(`${correctionEndpoint}/images/${image.imageId}`)
  assert.equal(imageResponse.status, 200)
  assert.equal(imageResponse.headers.get('content-type'), 'image/png')
  assert.equal((await fetch(`${url}__slide-corrections/${secondId}/images/${image.imageId}`)).status, 404)
  if (fixtureDirectory) {
    const imageMetadata = JSON.parse(await readFile(join(fixtureDirectory, 'Corrections', `${image.filename}.json`), 'utf8'))
    assert.equal(imageMetadata.slide_id, firstId)
    assert.equal(imageMetadata.slide_number, 1)
    assert.equal(imageMetadata.slide_title, 'Notes Alpha')
  }
  const imageEndpoint = `${correctionEndpoint}/images/${image.imageId}`
  assert.equal((await fetch(imageEndpoint, { method: 'DELETE' })).status, 403)
  assert.equal((await fetch(imageEndpoint, { method: 'DELETE', headers: { 'X-PicoOS-Slide-Corrections': '1', Origin: 'https://foreign.invalid' } })).status, 403)
  assert.equal((await fetch(`${url}__slide-corrections/${secondId}/images/${image.imageId}`, { method: 'DELETE', headers: { 'X-PicoOS-Slide-Corrections': '1' } })).status, 404)
  await dialog.getByRole('button', { name: 'Delete screenshot', exact: false }).click()
  await dialog.getByRole('status').filter({ hasText: 'Image deleted.' }).waitFor()
  assert.equal(await input.inputValue(), correctionDraft, 'Deleting an image retains the unsaved Markdown draft')
  assert.equal((await getNote(firstId, true)).revision, beforeImage.revision)
  assert.equal(await dialog.locator('.correction-images img').count(), 0)
  assert.equal((await fetch(imageEndpoint, { method: 'DELETE', headers: { 'X-PicoOS-Slide-Corrections': '1' } })).status, 200, 'Repeated deletion is harmless')
  if (fixtureDirectory) {
    assert.ok(!existsSync(join(fixtureDirectory, 'Corrections', image.filename)))
    assert.ok(!existsSync(join(fixtureDirectory, 'Corrections', `${image.filename}.json`)))
  }
  await dialog.getByRole('button', { name: 'Save clipboard image' }).click()
  await dialog.getByRole('status').filter({ hasText: 'Saved image to Corrections/' }).waitFor()
  image = (await getNote(firstId, true)).images[0]
  if (fixtureDirectory) {
    await rm(join(fixtureDirectory, 'Corrections', image.filename))
    await page.waitForFunction(() => document.querySelectorAll('dialog[open] .correction-images img').length === 0)
    assert.equal(await input.inputValue(), correctionDraft, 'Manual deletion refreshes images without replacing the draft')
    assert.equal(await dialog.getByRole('alert').count(), 0, 'Manual deletion does not display an error')
    assert.ok(await dialog.getByRole('button', { name: 'Save clipboard image' }).isEnabled())
    assert.deepEqual((await getNote(firstId, true)).images, [])
    await dialog.getByRole('button', { name: 'Save clipboard image' }).click()
    await dialog.getByRole('status').filter({ hasText: 'Saved image to Corrections/' }).waitFor()
    image = (await getNote(firstId, true)).images[0]
  }
  await saveEditor(page, firstId, correctionDraft, true)
  await closeEditor(page, true)
  const correctionPanel = page.getByRole('region', { name: 'Slide corrections' })
  await correctionPanel.getByText('Correct the Alpha label.', { exact: true }).waitFor()
  assert.ok(!(await correctionPanel.innerText()).includes('completed correction'), 'Completed correction bullets are hidden from the slide view')
  assert.ok((await correctionPanel.innerText()).includes('Still pending correction'), 'Unchecked correction bullets remain visible')
  await panel.getByText('[x] Completed-looking note stays visible.', { exact: true }).waitFor()
  await page.waitForFunction(() => document.querySelector('#slide-corrections-panel img')?.naturalWidth === 4)
  const noteBounds = await panel.boundingBox()
  const correctionBounds = await correctionPanel.boundingBox()
  assert.ok(noteBounds.width > 360 && correctionBounds.width > 360, 'Both displayed blocks are larger')
  assert.ok(noteBounds.y + noteBounds.height < correctionBounds.y, 'Corrections sit clearly below notes')
  assert.ok(Math.abs(correctionBounds.y - 450) < 2, 'Corrections begin at the vertical center')
  for (const region of [panel, correctionPanel]) {
    const style = await region.evaluate(element => ({ font: getComputedStyle(element).fontSize, background: getComputedStyle(element).backgroundColor }))
    assert.equal(style.font, '16px')
    assert.match(style.background, /rgba\(.*0\.8/)
  }
  assert.equal((await getNote(firstId)).content, mergedContent, 'Speaker notes and correction drafts stay independent')
  await page.keyboard.press('ArrowRight')
  await page.waitForURL(`${url}2`)
  await correctionPanel.getByText('2 · Notes Beta', { exact: true }).waitFor()
  assert.equal(await correctionPanel.locator('img').count(), 0, 'Screenshots follow the slide UUID')
  assert.ok(!(await correctionPanel.innerText()).includes('Alpha label'))
  await page.keyboard.press('ArrowLeft')
  await page.waitForURL(`${url}1`)
  await correctionPanel.getByText('Correct the Alpha label.', { exact: true }).waitFor()
  await page.keyboard.press('Alt+Shift+c')
  await correctionPanel.waitFor({ state: 'hidden' })
  await page.reload()
  await page.locator('.slidev-page-1 .slidev-layout').first().waitFor({ state: 'visible' })
  assert.equal(await correctionButtons.count(), 0)
  assert.equal(await correctionPanel.count(), 0, 'Correction visibility persists independently across reloads')
  await panel.getByText('Newer note saved by another client.', { exact: false }).waitFor()
  await page.keyboard.press('Alt+Shift+c')
  await correctionPanel.getByText('Correct the Alpha label.', { exact: true }).waitFor()

  if (fixtureDirectory) {
    // Exercise actual HMR and metadata synchronization after a move, title
    // change and layout change. The source UUID remains authoritative.
    await writeFile(join(fixtureDirectory, 'slides.md'), `---\ntheme: default\nfonts:\n  sans: Arial\n  mono: monospace\n---\n\n<!-- SLIDE_ID ${secondId} -->\n\n# Notes Beta\n\nSecond slide moved first.\n\n---\nlayout: center\n---\n\n<!-- SLIDE_ID ${firstId} -->\n\n# Renamed Alpha\n\nChanged content and layout.\n`)
    await page.waitForFunction(async ({ id, base }) => {
      const record = await (await fetch(`${base}__slide-corrections/${id}`)).json()
      return record.filename?.startsWith('slide-002-renamed-alpha--') && record.images[0]?.filename.startsWith('slide-002-renamed-alpha--')
    }, { id: firstId, base: fixtureBase })
    await page.goto(`${url}2`)
    await correctionPanel.getByText('2 · Renamed Alpha', { exact: true }).waitFor()
    await correctionPanel.getByText('Correct the Alpha label.', { exact: true }).waitFor()
    await page.waitForFunction(() => document.querySelector('#slide-corrections-panel img')?.naturalWidth === 4)
    const moved = await getNote(firstId, true)
    assert.equal(moved.content, correctionDraft)
    assert.equal(moved.images[0].imageId, image.imageId)
    const movedMetadata = JSON.parse(await readFile(join(fixtureDirectory, 'Corrections', `${moved.images[0].filename}.json`), 'utf8'))
    assert.equal(movedMetadata.slide_id, firstId)
    assert.equal(movedMetadata.slide_number, 2)
    assert.equal(movedMetadata.slide_title, 'Renamed Alpha')

    const correctionPath = join(fixtureDirectory, 'Corrections', moved.filename)
    const screenshotPath = join(fixtureDirectory, 'Corrections', moved.images[0].filename)
    const hiddenCorrectionPath = join(fixtureDirectory, 'Corrections', `x_${moved.filename}`)
    const hiddenScreenshotPath = join(fixtureDirectory, 'Corrections', `x_${moved.images[0].filename}`)
    await rename(correctionPath, hiddenCorrectionPath)
    await rename(screenshotPath, hiddenScreenshotPath)
    try { await correctionPanel.getByText('No active correction text for this slide.', { exact: false }).waitFor({ timeout: 5000 }) }
    catch (error) {
      console.error('Excluded correction panel:', await correctionPanel.innerText())
      console.error('Excluded correction record:', await getNote(firstId, true))
      console.error('Correction files:', await readdir(join(fixtureDirectory, 'Corrections')))
      throw error
    }
    await page.waitForFunction(() => document.querySelectorAll('#slide-corrections-panel img').length === 0)
    assert.ok(!(await correctionPanel.innerText()).includes('Alpha label'), 'x_ Markdown files are hidden')
    assert.ok(!(await correctionPanel.innerText()).includes('x_slide-'), 'Excluded filenames are not shown in the slide panel')
    ;({ dialog, input } = await editor(page, true))
    assert.equal(await input.inputValue(), correctionDraft, 'The editor retains completed bullets and excluded Markdown')
    assert.equal(await dialog.locator('.correction-images img').count(), 1, 'Excluded screenshots remain available in the editor')
    await closeEditor(page, true)
    await rename(hiddenCorrectionPath, correctionPath)
    await rename(hiddenScreenshotPath, screenshotPath)
    await correctionPanel.getByText('Correct the Alpha label.', { exact: true }).waitFor()
    await page.waitForFunction(() => document.querySelector('#slide-corrections-panel img')?.naturalWidth === 4)

    await promisify(execFile)(process.execPath, [join(project, 'node_modules/@slidev/cli/bin/slidev.mjs'), 'build', 'slides.md', '--base', fixtureBase], {
      cwd: fixtureDirectory, timeout: 60000, maxBuffer: 1024 * 1024, env: { ...process.env, SLIDES_SHORT: '0' },
    })
    const previewPort = await unusedPort()
    previewServer = spawn(process.execPath, [join(project, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(previewPort), '--base', fixtureBase], { cwd: fixtureDirectory, stdio: 'ignore' })
    const staticUrl = `http://127.0.0.1:${previewPort}${fixtureBase}2`
    await page.goto(staticUrl, { waitUntil: 'networkidle' }).catch(async () => { await pause(500); await page.goto(staticUrl) })
    await page.keyboard.press('Alt+Shift+c')
    await correctionPanel.getByText('Correct the Alpha label.', { exact: true }).waitFor()
    assert.ok(!(await correctionPanel.innerText()).includes('completed correction'), 'Static correction views apply the same completed-bullet filter')
    await page.waitForFunction(() => document.querySelector('#slide-corrections-panel img')?.naturalWidth === 4)
    assert.ok((await correctionPanel.locator('img').getAttribute('src')).includes('/assets/'), 'Static builds include screenshot assets')
    await page.keyboard.press('Alt+c')
    await page.getByRole('status').filter({ hasText: 'published presentation shows saved corrections' }).waitFor()
    assert.equal(await page.locator('dialog[open]').count(), 0, 'Static corrections are viewable without opening a writable editor')
  }
  assert.deepEqual(errors, [], 'No uncaught browser errors')
  console.log('Isolated Slidev notes and corrections: shortcuts, clipboard images, UUID movement, display, static assets, drafts, and conflicts passed.')
}
catch (error) {
  if (serverOutput) process.stderr.write(`Slidev fixture output:\n${serverOutput}\n`)
  throw error
}
finally {
  await browser?.close()
  previewServer?.kill('SIGTERM')
  if (server && server.exitCode === null) {
    const stopped = once(server, 'exit')
    server.kill('SIGTERM')
    await Promise.race([stopped, pause(5000)])
    if (server.exitCode === null) server.kill('SIGKILL')
  }
  if (fixtureDirectory) await rm(fixtureDirectory, { recursive: true, force: true })
}

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'

// Test a real Slidev dev server or the built browser deck. This never exports
// slides or executes PicoOS programs.
const base = process.env.PRESENTATION_URL || 'http://127.0.0.1:4173/'
const routerMode = process.env.PRESENTATION_ROUTER || 'hash'
const slideURL = (n, root = base) => new URL(routerMode === 'hash' ? `#/${n}` : `${n}`, root).href
const executablePath = process.env.BROWSER || '/usr/bin/chromium'
const markdown = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
const slides = markdown.split(/^---\s*$/m).slice(2)
const primary = await readFile(new URL('../.source/Pico-OS-README.md', import.meta.url), 'utf8')

function headings(text) {
  let fenced = false
  const result = []
  for (const line of text.split('\n')) {
    if (line.startsWith('```')) fenced = !fenced
    const match = !fenced && /^(#{1,6}) (.+)$/.exec(line)
    if (match) result.push({ level: match[1].length, title: match[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') })
  }
  return result
}
const hierarchy = new Map()
const stack = []
for (const { level, title } of headings(primary)) {
  stack.length = level - 1
  const anchor = title.replaceAll('`', '').toLowerCase().replace(/[^\w -]/g, '').replaceAll(' ', '-')
  hierarchy.set(anchor, { title, parents: [...stack], order: hierarchy.size })
  stack.push(title)
}
const occurrences = new Map()
let lastOrder = -1
const pages = slides.map((slide, i) => {
  const markers = [...slide.matchAll(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->/g)]
  assert.equal(markers.length, 1, `Slide ${i + 1}: exactly one primary source marker`)
  const anchor = markers[0][1]
  const source = hierarchy.get(anchor)
  assert.ok(source, `Slide ${i + 1}: anchor ${anchor} exists`)
  assert.ok(source.order >= lastOrder, `Slide ${i + 1}: README order`)
  lastOrder = source.order
  occurrences.set(anchor, (occurrences.get(anchor) || 0) + 1)
  return { page: i + 1, slide, source, anchor }
})
const numbers = new Map()
for (const { page, slide, source, anchor } of pages) {
  const titles = headings(slide)
  assert.equal(titles[0].title, source.parents.length ? source.parents.join(' · ') : source.title, `Slide ${page}: main title`)
  if (source.parents.length) {
    const n = (numbers.get(anchor) || 0) + 1
    numbers.set(anchor, n)
    assert.equal(titles[1].title, source.title + (occurrences.get(anchor) > 1 ? ` (${n})` : ''), `Slide ${page}: subtitle`)
  }
}
assert.equal(JSON.parse(await readFile(new URL('../source-state.json', import.meta.url))).slideCount, pages.length)

const expectedTopics = ['Toolchain extensions', 'Boot & kernel startup', 'Interrupts, system calls & exceptions', 'Processes, memory & I/O', 'Shell & user applications', 'Test system', 'OS & RTOS lectures']
assert.ok(!pages.some(p => p.anchor === 'contents'), 'The summarized cover is the only contents overview')

const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] })
const errors = []
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
  page.on('pageerror', error => errors.push(error.message))
  // Vue catches failed slide imports and reports them to console.error rather
  // than pageerror. Those must fail the check too.
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', response => {
    if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`HTTP ${response.status()}: ${response.url()}`)
  })
  await page.goto(slideURL(1))
  let routeBase = base
  async function navigate(n) {
    await page.evaluate(({ url, mode }) => {
      if (mode === 'hash') location.hash = new URL(url).hash
      else { history.pushState({}, '', url); window.dispatchEvent(new PopStateEvent('popstate')) }
    }, { url: slideURL(n, routeBase), mode: routerMode })
    await page.waitForFunction(({ n }) => {
      const error = [...document.querySelectorAll('.slidev-page')].find(el => el.getBoundingClientRect().width && /An error occurred on this slide/.test(el.textContent))
      const layout = document.querySelector(`.slidev-page-${n} .slidev-layout`)
      return error || (layout && layout.getBoundingClientRect().width)
    }, { n }, { timeout: 15000 })
    assert.equal(await page.getByText('An error occurred on this slide. Check the terminal for more information.', { exact: true }).filter({ visible: true }).count(), 0, `Slide ${n}: no error fallback`)
    assert.deepEqual(errors, [], `Slide ${n}: no console, module, or network errors`)
    const layout = page.locator(`.slidev-page-${n} .slidev-layout`).first()
    await layout.waitFor({ state: 'visible' })
    await page.waitForTimeout(220)
    const expectedDiagrams = (pages[n - 1].slide.match(/^```mermaid/gm) || []).length
    assert.equal(await layout.locator('.mermaid').count(), expectedDiagrams, `Slide ${n}: every expected diagram mounted`)
    for (const diagram of await layout.locator('.mermaid').all()) {
      await diagram.locator('svg').waitFor()
      assert.equal(await diagram.locator('svg[aria-roledescription="error"], .error-icon, .error-text').count(), 0, `Slide ${n}: no diagram error placeholder`)
      const xmlError = await diagram.evaluate(host => {
        const root = host.shadowRoot
        if (root.querySelector('parsererror')) return 'XML parser error embedded in the shadow DOM'
        const svg = root.querySelector('svg')
        if (root.firstElementChild !== svg) return 'Diagram root is not the SVG'
        const parsed = new DOMParser().parseFromString(new XMLSerializer().serializeToString(svg), 'image/svg+xml')
        return parsed.querySelector('parsererror')?.textContent || null
      })
      assert.equal(xmlError, null, `Slide ${n}: valid SVG including HTML labels`)
    }
    assert.equal(await layout.locator('pre').filter({ hasText: /(?:Parse|Syntax) error|Error:.*mermaid/i }).count(), 0, `Slide ${n}: no diagram parse error`)
    return layout
  }

  const cover = await navigate(1)
  assert.deepEqual(await cover.locator('.cover-chapter > span:last-child').allTextContents(), expectedTopics, 'Cover has the seven summarized topics')

  const layoutIssues = []
  for (const { page: n } of pages) {
    const layout = await navigate(n)
    const issues = await layout.evaluate(element => {
      const bounds = element.getBoundingClientRect()
      const scale = bounds.width / 980
      const found = []
      const selector = '.deck-content .card, .deck-content pre, .deck-content table, .stack-diagram, .slide-note, .timeline, .deck-content > div, .cover-outline, .cover-chapter, h2'
      for (const child of element.querySelectorAll(selector)) {
        const rect = child.getBoundingClientRect()
        if (rect.bottom > bounds.bottom - 20 * scale || rect.right > bounds.right - 20 * scale)
          found.push(`Outside content area: ${child.textContent.slice(0, 70)}`)
        if (child.tagName === 'PRE' && child.scrollWidth > child.clientWidth + 5)
          found.push(`Horizontally clipped code: ${child.textContent.slice(0, 70)}`)
      }
      for (const host of element.querySelectorAll('.mermaid')) {
        const svg = host.shadowRoot?.querySelector('svg')
        if (!svg) { found.push('Missing Mermaid SVG'); continue }
        const r = svg.getBoundingClientRect(), h = host.getBoundingClientRect()
        if (r.top < h.top - 1 || r.bottom > h.bottom + 1 || r.right > h.right + 1)
          found.push('SVG exceeds its diagram panel')
        if (r.height < 20) found.push('Collapsed diagram')
      }
      return found
    })
    if (issues.length) layoutIssues.push({ page: n, issues })
    if (n % 25 === 0) console.log(`Checked ${n}/${pages.length}: ${base}`)
  }
  assert.deepEqual(layoutIssues, [], 'Every slide fits its content area')
  assert.equal(await page.locator('svg[aria-roledescription="error"]').count(), 0, 'No Mermaid error SVGs left in the document')

  const sampleSelectors = ['.mermaid', '.code-panel .slidev-code', '.compiler-showcase-code .slidev-code', '.shell-session .slidev-code', '.data-table', '.memory-visual', '.timeline', '.debugger-image']
  for (const selector of sampleSelectors) {
    const sample = pages.find(p => selector === '.mermaid' ? p.slide.includes('```mermaid') : p.slide.includes(selector.split(' ')[0].slice(1)))
    assert.ok(sample, `Sample exists for ${selector}`)
    const layout = await navigate(sample.page)
    const target = layout.locator(selector).first()
    const before = page.url()
    await target.click()
    const dialog = page.locator('dialog.visual-zoom[open]')
    await dialog.waitFor({ state: 'visible' })
    assert.equal(page.url(), before, `${selector}: opening does not advance`)
    if (selector.includes('.slidev-code')) {
      await dialog.locator('.zoom-content pre').first().hover()
      assert.equal(await dialog.locator('.zoom-content .slidev-code-copy, .zoom-content svg').count(), 0, `${selector}: no cloned clipboard controls or enlarged icon on hover`)
      assert.equal(await dialog.locator('.zoom-content code').first().textContent(), await target.locator('code').first().textContent(), `${selector}: complete code retained`)
    }
    const initial = await dialog.locator('output').textContent()
    await dialog.getByRole('button', { name: 'Zoom in', exact: true }).click()
    assert.notEqual(await dialog.locator('output').textContent(), initial)
    await page.keyboard.press('ArrowRight')
    assert.equal(page.url(), before, `${selector}: modal keys do not navigate`)
    await dialog.getByRole('button', { name: 'Fit', exact: true }).click()
    assert.ok(await dialog.locator('.zoom-content').evaluate(el => el.scrollHeight > 0), `${selector}: clone is visible`)
    if (selector === '.mermaid') assert.ok(await dialog.locator('.zoom-content svg').count(), 'Shadow DOM SVG copied into viewer')
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    assert.equal(page.url(), before, `${selector}: closing does not advance`)
    assert.ok(await page.evaluate(() => document.activeElement?.hasAttribute('data-zoom-ready')), 'Focus returns to visual')
    await page.keyboard.press('Enter')
    await dialog.waitFor({ state: 'visible' })
    await dialog.getByRole('button', { name: 'Close enlarged view' }).click()
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(250)
    assert.notEqual(page.url(), before, 'Slide navigation resumes after closing')
  }

  // For production, exercise selection with the built entry under its prefix.
  // Development checks use an actual --base /selectable-text/ server.
  if (routerMode === 'hash') {
    await page.route('**/selectable-text/', async route => {
      const response = await route.fetch({ url: base })
      await route.fulfill({ response })
    })
    routeBase = new URL('selectable-text/', base).href
  }
  const codePage = pages.find(p => p.slide.includes('class="code-panel'))
  await page.goto(slideURL(codePage.page, routeBase))
  const layout = await navigate(codePage.page)
  if (routeBase.includes('/selectable-text/')) assert.ok(await page.locator('html').evaluate(el => el.classList.contains('selectable-text')))
  const codeTarget = layout.locator('.slidev-code').first()
  await codeTarget.evaluate(el => {
    const range = document.createRange()
    range.selectNodeContents(el)
    getSelection().removeAllRanges()
    getSelection().addRange(range)
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
  })
  assert.equal(await page.locator('dialog[open]').count(), 0, 'Selection does not open zoom')
  await page.evaluate(() => getSelection().removeAllRanges())
  await codeTarget.click()
  await page.locator('dialog[open]').waitFor()
  await page.keyboard.press('Escape')
  assert.deepEqual(errors, [], 'No browser runtime errors')
  console.log(`Verified ${pages.length} slides: source hierarchy, numbering, rendering, and zoom/selection/navigation.`)
} finally {
  await browser.close()
}

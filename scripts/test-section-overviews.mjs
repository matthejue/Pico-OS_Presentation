import assert from 'node:assert/strict'
import { readFile, mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { presentationSlides } from './presentation-navigation.mjs'

const base = process.env.PRESENTATION_URL || 'http://localhost:3030/'
const mode = process.env.PRESENTATION_ROUTER || 'history'
const short = process.env.SLIDES_SHORT === '1'
const project = process.env.PRESENTATION_PROJECT
const markdown = await readFile(project ? `${project}/slides.md` : new URL('../slides.md', import.meta.url), 'utf8')
const sections = JSON.parse(await readFile(project ? `${project}/config/section-overviews.json` : new URL('../config/section-overviews.json', import.meta.url)))
const slides = presentationSlides(markdown, sections, short)
assert.equal(sections[0].anchor, 'picoos', 'Introduction is the first section in the contents')
assert.equal(sections[0].number, '0', 'Introduction is section 0')
assert.equal(sections[0].title, 'Introduction', 'Opening section has its presentation title')
assert.deepEqual(slides.filter(slide => slide.cover).map(slide => slide.page), [1], 'Only the presentation cover is marked as a cover')
const url = n => new URL(mode === 'hash' ? `#/${n}` : `${n}`, base).href
const browser = await chromium.launch({ executablePath: process.env.BROWSER || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(url(1))
  await page.locator('.slidev-page-1 .slidev-layout').first().waitFor({ state: 'visible' })
  async function navigate(n) {
    await page.evaluate(({ url, mode }) => {
      if (mode === 'hash') location.hash = new URL(url).hash
      else { history.pushState({}, '', url); dispatchEvent(new PopStateEvent('popstate')) }
    }, { url: url(n), mode })
    const layout = page.locator(`.slidev-page-${n} .slidev-layout`).first()
    await layout.waitFor({ state: 'visible' })
    return layout
  }
  const screenshots = process.env.OVERVIEW_SCREENSHOTS
  if (screenshots) await mkdir(screenshots, { recursive: true })
  const firstContent = slides.find(slide => !slide.cover && !slide.overview && !slide.contents)
  await navigate(firstContent.page)
  assert.equal(await page.locator('.zoom-hint:visible').count(), 0, 'Content hints start hidden in both deck versions')
  assert.equal(await page.getByRole('button', { name: 'Edit slide note' }).count(), 0, 'Note shortcut controls start hidden with the other hints')
  const beforeHints = page.url()
  await page.keyboard.press('h')
  await page.locator('.zoom-hint').waitFor({ state: 'visible' })
  assert.equal(page.url(), beforeHints, 'H toggles hints without navigating')
  assert.match(await page.getByRole('button', { name: 'Edit slide note' }).textContent(), /Alt\+N/, 'Note shortcut labels share the hint setting')
  if (mode === 'history')
    assert.match(await page.locator('.zoom-hint').textContent(), /toggle short-deck exclusion/, 'Development hints also appear in the short deck')
  await navigate(slides.find(slide => slide.overview).page)
  await page.locator('.section-navigation-hint:visible').waitFor()
  const overviewUrl = page.url()
  await page.locator('.section-overview:visible .section-topic-link').first().focus()
  await page.keyboard.press('Shift+h')
  await page.locator('.section-navigation-hint:visible').waitFor({ state: 'hidden' })
  assert.equal(page.url(), overviewUrl, 'Uppercase H toggles hints with a focused TOC link without navigating')
  await page.keyboard.down('h')
  await page.locator('.section-navigation-hint:visible').waitFor()
  await page.keyboard.down('h')
  await page.keyboard.up('h')
  assert.equal(await page.locator('.section-navigation-hint:visible').count(), 1, 'Holding H toggles hints only once')
  assert.equal(page.url(), overviewUrl, 'Holding H does not navigate')
  await navigate(slides.find(slide => slide.contents).page)
  await page.locator('.presentation-contents .section-navigation-hint:visible').waitFor()
  await navigate(slides.find(slide => slide.overview).page)
  await page.keyboard.press('h')
  await page.locator('.section-navigation-hint:visible').waitFor({ state: 'hidden' })
  assert.equal(await page.locator('.section-navigation-hint:visible').count(), 0, 'H hides the overview hint through the shared state')
  await page.keyboard.press('h')
  await page.locator('.section-navigation-hint:visible').waitFor()
  if (mode === 'history') {
    await page.keyboard.press('Alt+n')
    const editor = page.getByRole('dialog', { name: 'Edit slide note' })
    const input = editor.getByRole('textbox', { name: 'Markdown note' })
    await input.waitFor()
    await page.waitForFunction(() => !document.querySelector('#slide-note-markdown')?.disabled)
    const initialNote = await input.inputValue()
    await input.press('Control+End')
    await input.press('h')
    assert.equal(await input.inputValue(), `${initialNote}h`, 'H remains ordinary text while editing a note')
    assert.match(await page.getByRole('button', { name: 'Edit slide note', exact: true }).textContent(), /Alt\+N/, 'Typing H does not toggle shortcut hints')
    assert.equal(page.url(), overviewUrl, 'Typing H in notes does not navigate')
    await input.fill(initialNote)
    await page.keyboard.press('Escape')
    await editor.waitFor({ state: 'hidden' })
  }
  await page.reload()
  await page.locator('.section-overview:visible').waitFor()
  assert.equal(await page.locator('.section-navigation-hint:visible').count(), 0, 'A fresh page starts with hints hidden')
  const cover = await navigate(1)
  assert.equal(await cover.locator('.cover-outline, .cover-chapter').count(), 0, 'Old cover outline removed')
  if (screenshots) await cover.screenshot({ path: `${screenshots}/cover.png` })
  const mainContents = slides.find(slide => slide.contents)
  assert.equal(mainContents.page, 2, 'Contents immediately follows the cover')
  const activeSections = sections.filter(section => slides.some(slide => slide.overview && slide.anchor === section.anchor))
  const mainLayout = await navigate(mainContents.page)
  await mainLayout.locator('.major-toc').waitFor()
  assert.deepEqual(await mainLayout.locator('[data-contents-anchor]').evaluateAll(links => links.map(link => link.dataset.contentsAnchor)), activeSections.map(section => section.anchor), 'Contents lists exactly the populated sections')
  const contentsIssues = await mainLayout.locator('.major-toc').evaluate(el => [...el.querySelectorAll('a')].filter(link => link.scrollHeight > link.clientHeight + 2 || link.scrollWidth > link.clientWidth + 2).map(link => link.textContent))
  assert.deepEqual(contentsIssues, [], 'Main contents entries fit')
  if (screenshots) await mainLayout.screenshot({ path: `${screenshots}/contents.png` })
  for (const section of sections) {
    const overview = slides.find(slide => slide.overview && slide.anchor === section.anchor)
    const content = slides.filter(slide => !slide.cover && !slide.overview && !slide.contents && (slide.anchor === section.anchor || section.entries.some(entry => entry.anchor === slide.anchor)))
    if (!content.length) { assert.equal(overview, undefined, `${section.anchor}: empty section overview omitted`); continue }
    assert.ok(overview, `${section.anchor}: populated overview available`)
    assert.ok(content.every(slide => slide.page > overview.page), `${section.anchor}: overview precedes every content slide`)
    if (section.anchor === 'picoos') {
      assert.equal(overview.page, 3, 'Introduction overview immediately follows Contents')
      assert.ok(content.every(slide => slide.page > 3), 'Introduction content excludes cover and overview')
    }
    await navigate(mainContents.page)
    const mainLink = mainLayout.locator(`[data-contents-anchor="${section.anchor}"]`)
    assert.equal(new URL(await mainLink.getAttribute('href'), base).href, url(overview.page))
    await mainLink.click()
    const layout = await navigate(overview.page)
    const toc = layout.locator('.section-overview')
    await toc.waitFor()
    await page.waitForTimeout(150)
    const availableEntries = section.entries.filter(entry => content.some(slide => slide.anchor === entry.anchor || entry.descendants.includes(slide.anchor)))
    const intro = content.filter(slide => slide.anchor === section.anchor)
    assert.deepEqual(await toc.locator('[data-topic-anchor]').evaluateAll(rows => rows.map(row => row.dataset.topicAnchor)), [...(intro.length ? [section.anchor] : []), ...availableEntries.map(entry => entry.anchor)], `${section.number}: introduction first, then populated heading branches in order`)
    const linked = new Set()
    for (const entry of availableEntries) {
      const row = toc.locator(`[data-topic-anchor="${entry.anchor}"]`)
      const direct = content.filter(slide => slide.anchor === entry.anchor).map(slide => slide.page)
      assert.deepEqual((await row.locator('.section-slide-links a').allTextContents()).map(Number), direct, `${entry.number}: every continuation slide linked with current page number`)
      direct.forEach(n => linked.add(n))
      const target = direct[0] ?? content.find(slide => entry.descendants.includes(slide.anchor))?.page
      const title = row.locator('a.section-topic-link')
      assert.equal(await title.count(), target ? 1 : 0, `${entry.number}: correct availability`)
      if (target) assert.equal(new URL(await title.getAttribute('href'), base).href, url(target), `${entry.number}: title goes to first available slide`)
    }
    assert.equal(await toc.locator('.section-overview-footer .section-introduction').count(), 0, 'No introduction links in the footer')
    if (intro.length) {
      const row = toc.locator('.toc-introduction')
      assert.equal(await row.locator('.section-topic-title').textContent(), 'Section Introduction')
      assert.deepEqual((await row.locator('.section-slide-links a').allTextContents()).map(Number), intro.map(slide => slide.page), `${section.number}: every section introduction slide linked in the first TOC entry, excluding the cover`)
      assert.equal(new URL(await row.locator('.section-topic-link').getAttribute('href'), base).href, url(intro[0].page), 'Introduction title goes to its first slide')
      const depths = await toc.locator('[data-topic-anchor]').evaluateAll(rows => rows.map(row => Number(row.style.getPropertyValue('--toc-depth'))))
      assert.equal(depths[0], 0, 'Introduction is the highest TOC level')
      assert.ok(depths.slice(1).every(depth => depth > depths[0]), 'Subsections appear below the introduction level')
    }
    intro.forEach(slide => linked.add(slide.page))
    assert.deepEqual([...linked].sort((a, b) => a - b), content.map(slide => slide.page), `${section.number}: every slide reachable`)
    const issues = await layout.evaluate(el => {
      const frame = el.querySelector('.section-toc')
      const bounds = frame.getBoundingClientRect()
      const footer = el.querySelector('.section-overview-footer').getBoundingClientRect()
      const issues = []
      if (frame.scrollHeight > frame.clientHeight + 2) issues.push('TOC overflows vertically')
      for (const row of frame.querySelectorAll('li, a')) {
        const rect = row.getBoundingClientRect()
        if (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 2 || rect.right > bounds.right + 2) issues.push(`Outside TOC: ${row.textContent}`)
        if (row.scrollWidth > row.clientWidth + 2) issues.push(`Clipped row: ${row.textContent}`)
      }
      if (bounds.bottom > footer.top + 1) issues.push('TOC overlaps footer')
      if (parseFloat(getComputedStyle(el.querySelector('h1')).fontSize) < 40) issues.push('Title is not enlarged')
      return issues
    })
    if (screenshots) await layout.screenshot({ path: `${screenshots}/section-${section.number}.png` })
    assert.deepEqual(issues, [], `${section.number}: overview fits and title is enlarged`)
    const measuredFont = await toc.locator('.section-toc').evaluate(el => getComputedStyle(el).fontSize)
    // Exercise real navigation to the first and last slides of every chapter.
    for (const target of [...new Set([content[0]?.page, content.at(-1)?.page])].filter(Boolean)) {
      await navigate(overview.page)
      const link = layout.locator('a').filter({ hasText: new RegExp(`^${target}$`) }).first()
      const fallback = layout.locator('.section-single-topic a')
      await (await link.count() ? link : fallback).click()
      await page.locator(`.slidev-page-${target} .slidev-layout`).first().waitFor({ state: 'visible' })
      assert.equal(page.url(), url(target), `${section.number}: click navigates to slide ${target}`)
      const breadcrumb = page.locator(`.slidev-page-${target} [data-overview-anchor="${section.anchor}"]`).first()
      if (slides.find(slide => slide.page === target).anchor === section.anchor) {
        // Direct top-level content has no README ancestor and therefore no
        // invented breadcrumb; nested slides retain the linked ancestor.
        assert.equal(await breadcrumb.count(), 0, `${section.number}: no invented ancestor on top-level content`)
        await navigate(overview.page)
      }
      else {
        assert.equal(new URL(await breadcrumb.getAttribute('href'), base).href, url(overview.page))
        await breadcrumb.click()
        await page.waitForURL(url(overview.page))
      }
    }
    // Slidev's floating toolbar can cover the bottom-left footer in dev mode.
    // Exercise the return link through its native keyboard activation.
    await layout.locator('.contents-back-link').focus()
    await page.keyboard.press('Enter')
    await page.waitForURL(url(mainContents.page))
    console.log(`Section ${section.number}: ${availableEntries.length} headings, ${content.length} linked slides; font ${measuredFont}.`)
  }
  // A keyboard-activated link must navigate just like a pointer click.
  const sample = slides.find(slide => slide.overview)
  const layout = await navigate(sample.page)
  const link = layout.locator('a.section-topic-link').first()
  const target = new URL(await link.getAttribute('href'), base).href
  await link.focus()
  await page.keyboard.press('Enter')
  await page.waitForURL(target)
  assert.deepEqual(errors, [], 'No browser errors')
  console.log(`Verified ${activeSections.length} section overviews in the ${short ? 'short' : 'full'} deck: contents, filtered hierarchy, slide links, breadcrumbs, return links, layout, clicks, and keyboard navigation.`)
}
finally { await browser.close() }

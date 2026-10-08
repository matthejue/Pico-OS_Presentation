import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'

const base = process.env.PRESENTATION_URL || 'http://localhost:3030/'
const browser = await chromium.launch({ executablePath: process.env.BROWSER || '/usr/bin/chromium' })
try {
  const page = await browser.newPage()
  for (const { path, range, expected } of [
    { path: '26', range: '21-40', expected: Array.from({ length: 20 }, (_, i) => i + 21) },
    { path: '4', range: '2,4-5', expected: [2, 4, 5] },
  ]) {
    const url = new URL(path, base)
    url.searchParams.set('print', 'true')
    url.searchParams.set('range', range)
    await page.goto(url.href, { waitUntil: 'networkidle' })
    await page.locator(`[data-slidev-no="${path}"]`).waitFor()
    const rendered = await page.locator('[data-slidev-no]').evaluateAll(nodes => nodes.map(node => Number(node.dataset.slidevNo)))
    assert.deepEqual(rendered, expected, `${path}: only the requested print range is mounted`)
    assert.deepEqual(await page.locator('[data-slidev-no]:visible').evaluateAll(nodes => nodes.map(node => Number(node.dataset.slidevNo))), [Number(path)], 'Per-slide export displays the requested slide')
  }
  await page.goto(new URL('26', base).href, { waitUntil: 'networkidle' })
  await page.locator('[data-slidev-no="26"]').waitFor()
  assert.equal(await page.locator('[data-slidev-no="26"]').isVisible(), true, 'Normal direct slide navigation still works')
  console.log('Print ranges, sparse ranges, per-slide visibility, and direct navigation passed.')
}
finally {
  await browser.close()
}

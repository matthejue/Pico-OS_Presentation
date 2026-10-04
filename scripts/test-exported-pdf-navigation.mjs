// Verify real Chromium link annotations through the same merge/finalization
// stages as Make. Unrendered pages are blank placeholders for destination refs.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { PDFDocument, PDFName, PDFArray, PDFDict, PDFString, PDFHexString } from 'pdf-lib'
import { presentationSlides } from './presentation-navigation.mjs'

const [samplePath, sourcePagesText, directory] = process.argv.slice(2)
if (!samplePath || !sourcePagesText || !directory?.startsWith('/tmp/'))
  throw new Error('Usage: node scripts/test-exported-pdf-navigation.mjs SAMPLE.pdf 1,2,... /tmp/OUTPUT_DIRECTORY')
const sourcePages = sourcePagesText.split(',').map(Number)
await mkdir(directory, { recursive: true })
const sections = JSON.parse(await readFile(new URL('../config/section-overviews.json', import.meta.url), 'utf8'))
const slides = presentationSlides(await readFile(new URL('../slides.md', import.meta.url), 'utf8'), sections, process.env.SLIDES_SHORT === '1')
const sample = await PDFDocument.load(await readFile(samplePath))
assert.equal(sample.getPageCount(), sourcePages.length)
const expected = []
for (const [index, page] of sample.getPages().entries()) {
  const annotations = page.node.lookupMaybe(PDFName.of('Annots'), PDFArray)
  for (const ref of annotations?.asArray() ?? []) {
    const action = sample.context.lookup(ref, PDFDict).lookupMaybe(PDFName.of('A'), PDFDict)
    const uri = action?.lookup(PDFName.of('URI'))
    if (!(uri instanceof PDFString || uri instanceof PDFHexString)) continue
    const match = /^https:\/\/picoos\.invalid\/slide\/(\d+)$/.exec(uri.decodeText())
    if (match) expected.push({ from: sourcePages[index], to: Number(match[1]) })
  }
}
assert.ok(expected.length > 50, 'Chromium exported real contents, overview, and breadcrumb links')
const chunks = []
for (const [start, end] of [[1, 20], [21, slides.length]]) {
  const chunk = await PDFDocument.create()
  for (let page = start; page <= end; page++) {
    const sampleIndex = sourcePages.indexOf(page)
    if (sampleIndex < 0) chunk.addPage([sample.getPage(0).getWidth(), sample.getPage(0).getHeight()])
    else chunk.addPage((await chunk.copyPages(sample, [sampleIndex]))[0])
  }
  const path = `${directory}/chunk-${start}.pdf`
  await writeFile(path, await chunk.save())
  chunks.push(path)
}
const merged = `${directory}/merged.pdf`, output = `${directory}/linked.pdf`
execFileSync('pdfunite', [...chunks, merged])
execFileSync(process.execPath, [new URL('./link-presentation-pdf.mjs', import.meta.url).pathname, merged, output], { stdio: 'inherit' })
const result = await PDFDocument.load(await readFile(output))
const destinations = new Map(result.getPages().map((page, index) => [page.ref.toString(), index + 1]))
const actual = []
for (const [index, page] of result.getPages().entries()) {
  const annotations = page.node.lookupMaybe(PDFName.of('Annots'), PDFArray)
  for (const ref of annotations?.asArray() ?? []) {
    const action = result.context.lookup(ref, PDFDict).lookupMaybe(PDFName.of('A'), PDFDict)
    if (!action) continue
    const uri = action.lookup(PDFName.of('URI'))
    assert.ok(!(uri instanceof PDFString || uri instanceof PDFHexString) || !uri.decodeText().includes('picoos.invalid'), 'No browser placeholder URL remains')
    if (action.lookup(PDFName.of('S'))?.toString() !== '/GoTo') continue
    const destination = action.lookup(PDFName.of('D'), PDFArray)
    const target = destinations.get(destination.get(0).toString())
    assert.ok(target, 'Internal destination refers to a real merged PDF page')
    actual.push({ from: index + 1, to: target })
  }
}
assert.deepEqual(actual, expected, 'Every real export annotation targets the correct active-deck page after merging')
assert.ok(actual.some(link => link.from <= 20 && link.to > 20), 'Cross-chunk navigation works')
assert.ok(actual.some(link => link.to === 2), 'Overview return-to-contents links work')
const overviewPages = new Set(slides.filter(slide => slide.overview).map(slide => slide.page))
assert.ok(actual.some(link => link.from !== 2 && !overviewPages.has(link.from) && overviewPages.has(link.to)), 'Breadcrumb returns work')
console.log(`Verified ${actual.length} real exported PDF links in the ${process.env.SLIDES_SHORT === '1' ? 'short' : 'full'} deck, including merged-page destinations and return navigation.`)

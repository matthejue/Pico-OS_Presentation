import { readFile, writeFile } from 'node:fs/promises'
import { linkPresentationPdf } from './pdf-navigation.mjs'
import { presentationSlides } from './presentation-navigation.mjs'

const [input, output] = process.argv.slice(2)
if (!input || !output) throw new Error('Usage: node scripts/link-presentation-pdf.mjs INPUT.pdf OUTPUT.pdf')
const sections = JSON.parse(await readFile(new URL('../config/section-overviews.json', import.meta.url), 'utf8'))
const expected = presentationSlides(await readFile(new URL('../slides.md', import.meta.url), 'utf8'), sections, process.env.SLIDES_SHORT === '1').length
const result = await linkPresentationPdf(await readFile(input))
if (result.pages !== expected) throw new Error(`Expected ${expected} PDF pages for the active deck, received ${result.pages}`)
if (!result.links) throw new Error('PDF contains no presentation navigation links; check the export before publishing')
await writeFile(output, result.bytes)
console.log(`Linked ${result.links} internal destinations across ${result.pages} PDF pages.`)

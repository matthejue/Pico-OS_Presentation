import assert from 'node:assert/strict'
import { presentationSlides } from './presentation-navigation.mjs'
import { PDFDocument, PDFName, PDFArray, PDFDict, PDFString } from 'pdf-lib'
import { linkPresentationPdf } from './pdf-navigation.mjs'

const sections = [
  { anchor: 'renamed-chapter', entries: [{ anchor: 'child' }] },
  { anchor: 'new-chapter', entries: [{ anchor: 'new-child' }] },
]
const slide = (anchor, content) => `<!-- SOURCE Pico-OS/README.md#${anchor} -->\n${content}\n---\n`
const markdown = slide('picoos', '# PicoOS') + slide('contents', '<PresentationContents />')
  + slide('renamed-chapter', '<SectionOverview section="renamed-chapter" />')
  + slide('child', '<!-- SHORT_VERSION_DISABLED -->\n# Child')
  + slide('new-chapter', '<!-- SHORT_VERSION_DISABLED -->\n<SectionOverview section="new-chapter" />')
  + slide('new-child', '# Newly added content')
assert.deepEqual(presentationSlides(markdown, sections).map(slide => slide.page), [1, 2, 3, 4, 5, 6])
assert.deepEqual(presentationSlides(markdown, sections, true).map(slide => slide.anchor), ['picoos', 'contents', 'new-chapter', 'new-child'])
assert.equal(presentationSlides(markdown, sections, true).at(-1).page, 4, 'Surviving slides are renumbered')

// A cross-chunk PDF link must target the final merged document's page object.
const pdf = await PDFDocument.create()
pdf.addPage(); pdf.addPage(); pdf.addPage()
const annotation = pdf.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [0, 0, 100, 20], A: { S: 'URI', URI: PDFString.of('https://picoos.invalid/slide/3') } })
pdf.getPage(0).node.set(PDFName.of('Annots'), pdf.context.obj([pdf.context.register(annotation)]))
const linked = await linkPresentationPdf(await pdf.save())
assert.equal(linked.links, 1)
const result = await PDFDocument.load(linked.bytes)
const annotations = result.getPage(0).node.lookup(PDFName.of('Annots'), PDFArray)
const action = result.context.lookup(annotations.get(0), PDFDict).lookup(PDFName.of('A'), PDFDict)
assert.equal(action.lookup(PDFName.of('S')).toString(), '/GoTo')
assert.equal(action.lookup(PDFName.of('D'), PDFArray).get(0).toString(), result.getPage(2).ref.toString())
const broken = PDFString.of('https://picoos.invalid/slide/4')
annotation.lookup(PDFName.of('A'), PDFDict).set(PDFName.of('URI'), broken)
await assert.rejects(linkPresentationPdf(await pdf.save()), /PDF has 3 pages/)
console.log('Dynamic chapter filtering, added/renamed anchors, renumbering, and PDF destinations passed.')

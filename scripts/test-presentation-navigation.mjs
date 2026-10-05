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

// The cover, Introduction overview, and opening content share one source anchor.
// Only the opening content and its unnumbered descendants populate section 0.
const introductionSections = [
  { anchor: 'picoos', number: '0', entries: [
    { anchor: 'about-picoos' },
    { anchor: 'intended-physical-hardware-reti-execution-model' },
  ] },
  ...sections,
]
const introductionMarkdown = (keepLastChild = false) => slide('picoos', '# PicoOS')
  + slide('contents', '<PresentationContents />')
  + slide('picoos', '<SectionOverview section="picoos" />')
  + slide('picoos', '<!-- SHORT_VERSION_DISABLED -->\n# PicoOS')
  + slide('about-picoos', '<!-- SHORT_VERSION_DISABLED -->\n# About PicoOS')
  + slide('intended-physical-hardware-reti-execution-model',
    `${keepLastChild ? '' : '<!-- SHORT_VERSION_DISABLED -->\n'}# Intended physical hardware RETI execution model`)
  + slide('new-chapter', '<SectionOverview section="new-chapter" />')
  + slide('new-child', '# Newly added content')

const introductionFull = presentationSlides(introductionMarkdown(), introductionSections)
assert.equal(introductionFull[0].cover, true, 'The first PicoOS slide is the cover')
assert.equal(introductionFull[0].major, undefined, 'The cover does not populate Introduction')
assert.deepEqual(introductionFull.filter(slide => slide.major === 'picoos').map(slide => slide.sourcePage), [3, 4, 5, 6])
assert.equal(introductionFull.filter(slide => slide.major === 'picoos' && !slide.overview && !slide.contents && !slide.cover).length, 3,
  'Introduction contains its opening content and two unnumbered descendants')
assert.deepEqual(introductionFull.map(slide => slide.page), [1, 2, 3, 4, 5, 6, 7, 8])

const introductionEmpty = presentationSlides(introductionMarkdown(), introductionSections, true)
assert.deepEqual(introductionEmpty.map(slide => slide.anchor), ['picoos', 'contents', 'new-chapter', 'new-child'],
  'The retained cover cannot keep an empty Introduction overview visible')
assert.equal(introductionEmpty[0].cover, true)
assert.equal(introductionEmpty.some(slide => slide.overview && slide.major === 'picoos'), false)
assert.deepEqual(introductionEmpty.map(slide => slide.page), [1, 2, 3, 4])

const introductionSurvivingChild = presentationSlides(introductionMarkdown(true), introductionSections, true)
assert.deepEqual(introductionSurvivingChild.map(slide => slide.anchor), [
  'picoos', 'contents', 'picoos', 'intended-physical-hardware-reti-execution-model', 'new-chapter', 'new-child',
], 'An unnumbered surviving descendant keeps its Introduction overview')
assert.equal(introductionSurvivingChild[2].overview, true)
assert.equal(introductionSurvivingChild[2].major, 'picoos')
assert.equal(introductionSurvivingChild[3].major, 'picoos')
assert.deepEqual(introductionSurvivingChild.map(slide => slide.page), [1, 2, 3, 4, 5, 6])
assert.equal(introductionSurvivingChild[3].sourcePage, 6, 'Original page identity survives dynamic renumbering')

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
console.log('Introduction cover handling, dynamic chapter filtering, added/renamed anchors, renumbering, and PDF destinations passed.')

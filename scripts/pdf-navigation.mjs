import { PDFDocument, PDFName, PDFString, PDFHexString, PDFArray, PDFDict } from 'pdf-lib'

export async function linkPresentationPdf(bytes) {
  const document = await PDFDocument.load(bytes)
  const pages = document.getPages()
  let links = 0
  for (const page of pages) {
    const annotations = page.node.lookupMaybe(PDFName.of('Annots'), PDFArray)
    if (!annotations) continue
    for (const annotationRef of annotations.asArray()) {
      const annotation = document.context.lookup(annotationRef, PDFDict)
      const action = annotation.lookupMaybe(PDFName.of('A'), PDFDict)
      const uri = action?.lookup(PDFName.of('URI'))
      if (!(uri instanceof PDFString || uri instanceof PDFHexString)) continue
      const match = /^https:\/\/picoos\.invalid\/slide\/(\d+)\/?$/.exec(uri.decodeText())
      if (!match) continue
      const target = Number(match[1])
      if (!pages[target - 1]) throw new Error(`PDF link points to slide ${target}, but the PDF has ${pages.length} pages`)
      annotation.set(PDFName.of('A'), document.context.obj({ S: 'GoTo', D: [pages[target - 1].ref, 'Fit'] }))
      links++
    }
  }
  return { bytes: await document.save(), links, pages: pages.length }
}

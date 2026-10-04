// Source anchors are stable identities; page numbers come from the active deck.
export function majorForAnchor(anchor, sections) {
  return sections.find(section => section.anchor === anchor
    || section.entries.some(entry => entry.anchor === anchor))?.anchor
}

export function presentationSlides(markdown, sections, short = false) {
  const slides = [...markdown.matchAll(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->([\s\S]*?)(?=<!-- SOURCE Pico-OS\/README.md#|$)/g)]
    .map((match, index) => ({
      sourcePage: index + 1,
      anchor: match[1],
      major: majorForAnchor(match[1], sections),
      overview: match[2].includes('<SectionOverview '),
      contents: match[2].includes('<PresentationContents '),
      excluded: match[2].includes('<!-- SHORT_VERSION_DISABLED -->'),
    }))
  const populated = new Set(slides.filter(slide => !slide.overview && !slide.contents
    && (!short || !slide.excluded)).map(slide => slide.major))
  return slides.filter(slide => slide.contents || (slide.overview
    ? populated.has(slide.major)
    : !short || !slide.excluded)).map((slide, index) => ({ ...slide, page: index + 1 }))
}

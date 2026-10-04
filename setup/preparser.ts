import { definePreparserSetup } from '@slidev/types'
import sections from '../config/section-overviews.json'
import { majorForAnchor, presentationSlides } from '../scripts/presentation-navigation.mjs'

const shortVersionMarker = '<!-- SHORT_VERSION_DISABLED -->'

export default definePreparserSetup(() => {
  let availableOverviews = new Set<string>()
  return [
    {
      name: 'picoos-presentation-navigation',
      transformRawLines(lines) {
        availableOverviews = new Set(presentationSlides(lines.join('\n'), sections, process.env.SLIDES_SHORT === '1')
          .filter(slide => slide.overview).map(slide => slide.anchor))
      },
      transformSlide(content, frontmatter) {
        frontmatter.shortVersion = process.env.SLIDES_SHORT === '1'
        frontmatter.readmeAnchor = content.match(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->/)?.[1]
        frontmatter.sectionOverview = content.includes('<SectionOverview ')
        frontmatter.presentationContents = content.includes('<PresentationContents ')
        frontmatter.readmeMajor = majorForAnchor(frontmatter.readmeAnchor, sections)
        // Slide titles contain a link component; search results and Slidev's
        // own contents renderer should retain ordinary heading text.
        if (content.includes('<MajorSectionLink '))
          frontmatter.title = content.match(/^# (.+)$/m)?.[1].replace(/<\/?MajorSectionLink\b[^>]*>/g, '')
        if (frontmatter.sectionOverview)
          frontmatter.disabled = !availableOverviews.has(frontmatter.readmeAnchor)
        else if (!frontmatter.presentationContents && frontmatter.shortVersion && content.includes(shortVersionMarker))
          frontmatter.disabled = true
      },
    },
  ]
})

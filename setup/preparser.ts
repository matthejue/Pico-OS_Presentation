import { definePreparserSetup } from '@slidev/types'

const shortVersionMarker = '<!-- SHORT_VERSION_DISABLED -->'

export default definePreparserSetup(() => [
  {
    name: 'picoos-short-version',
    transformSlide(content, frontmatter) {
      frontmatter.shortVersion = process.env.SLIDES_SHORT === '1'
      frontmatter.readmeAnchor = content.match(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->/)?.[1]
      frontmatter.sectionOverview = content.includes('<SectionOverview ')
      if (frontmatter.shortVersion && content.includes(shortVersionMarker))
        frontmatter.disabled = true
    },
  },
])

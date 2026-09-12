import { definePreparserSetup } from '@slidev/types'

const shortVersionMarker = '<!-- SHORT_VERSION_DISABLED -->'

export default definePreparserSetup(() => [
  {
    name: 'picoos-short-version',
    transformSlide(content, frontmatter) {
      if (process.env.SLIDES_SHORT === '1' && content.includes(shortVersionMarker))
        frontmatter.disabled = true
    },
  },
])

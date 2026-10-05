import { definePreparserSetup } from '@slidev/types'
import { readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import sections from '../config/section-overviews.json'
import { majorForAnchor, presentationSlides } from '../scripts/presentation-navigation.mjs'
import { ensureSlideIdentities, inspectSlideIdentities } from '../scripts/slide-identities.mjs'

const shortVersionMarker = '<!-- SHORT_VERSION_DISABLED -->'

export default definePreparserSetup(async ({ filepath }) => {
  // Slidev loads this setup before parsing the entry file. Persist new UUIDs
  // now so its first render and subsequent launches see the same identity.
  const source = await readFile(filepath, 'utf8')
  const identified = ensureSlideIdentities(source)
  if (identified !== source) {
    const temporary = `${filepath}.${randomUUID()}.tmp`
    try {
      await writeFile(temporary, identified, { flag: 'wx' })
      if (await readFile(filepath, 'utf8') !== source)
        throw new Error('Slide source changed while assigning UUIDs; reload the presentation to try again')
      await rename(temporary, filepath)
    }
    finally {
      await unlink(temporary).catch(() => {})
    }
  }
  let availableOverviews = new Set<string>()
  let slideIdentities: ReturnType<typeof inspectSlideIdentities> = []
  let identityIndex = 0
  return [
    {
      name: 'picoos-presentation-navigation',
      transformRawLines(lines) {
        // HMR can pass a source string cached just before UUID persistence.
        // Reflect that exact update in its first parse as well as on disk.
        if (identified !== source && lines.join('\n') === source.replace(/\r\n/g, '\n'))
          lines.splice(0, lines.length, ...identified.split(/\r?\n/))
        slideIdentities = inspectSlideIdentities(lines.join('\n'))
        identityIndex = 0
        availableOverviews = new Set(presentationSlides(lines.join('\n'), sections, process.env.SLIDES_SHORT === '1')
          .filter(slide => slide.overview).map(slide => slide.anchor))
      },
      transformSlide(content, frontmatter) {
        frontmatter.presentationCover = identityIndex === 0
        frontmatter.noteId = slideIdentities[identityIndex++]?.id
        frontmatter.shortVersion = process.env.SLIDES_SHORT === '1'
        frontmatter.readmeAnchor = content.match(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->/)?.[1]
        frontmatter.sectionOverview = content.includes('<SectionOverview ')
        frontmatter.presentationContents = content.includes('<PresentationContents ')
        frontmatter.readmeMajor = frontmatter.presentationCover ? undefined : majorForAnchor(frontmatter.readmeAnchor, sections)
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

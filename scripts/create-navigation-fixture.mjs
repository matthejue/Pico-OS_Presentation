// Isolated browser fixture: exercise filtering and a new README chapter without
// changing the presenter's deck or pending short-version selection.
import { cp, mkdir, readFile, writeFile, symlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import { majorForAnchor } from './presentation-navigation.mjs'

const project = resolve(new URL('..', import.meta.url).pathname)
const destination = process.argv[2]
if (!destination?.startsWith('/tmp/')) throw new Error('Provide a fresh fixture directory under /tmp')
await mkdir(destination, { recursive: true })
for (const name of ['components', 'config', 'setup', 'styles', 'scripts', 'global-top.vue', 'vite.config.mts', 'package.json'])
  await cp(`${project}/${name}`, `${destination}/${name}`, { recursive: true })
for (const name of ['node_modules', 'public']) await symlink(`${project}/${name}`, `${destination}/${name}`)
const sections = JSON.parse(await readFile(`${project}/config/section-overviews.json`, 'utf8'))
let markdown = await readFile(`${project}/slides.md`, 'utf8')
markdown = markdown.replace(/(<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->)([\s\S]*?)(?=<!-- SOURCE Pico-OS\/README.md#|$)/g, (block, marker, anchor, body) => {
  if (body.includes('<SectionOverview ') || body.includes('<PresentationContents ')) return block
  const major = majorForAnchor(anchor, sections)
  const entry = sections.flatMap(section => section.entries).find(entry => entry.anchor === anchor)
  const excluded = major === sections[1].anchor || /^1\.1\.3(?:\.|$)/.test(entry?.number ?? '') || entry?.number === '3.4.1'
  return excluded && !body.includes('<!-- SHORT_VERSION_DISABLED -->') ? `${marker}\n<!-- SHORT_VERSION_DISABLED -->${body}` : block
})
const added = {
  anchor: '18-dynamic-extension', number: '18', title: 'Dynamic extension', titleHtml: 'Dynamic extension',
  entries: [{ anchor: '181-added-subsection', number: '18.1', title: 'Added subsection', titleHtml: 'Added subsection', depth: 1, descendants: [] }],
}
sections.push(added)
markdown += `\n---\n\n<!-- SOURCE Pico-OS/README.md#${added.anchor} -->\n\n<div class="eyebrow section-eyebrow">Section 18 · Overview</div>\n\n# 18. Dynamic extension\n\n<SectionOverview section="${added.anchor}" />\n\n---\n\n<!-- SOURCE Pico-OS/README.md#181-added-subsection -->\n\n# <MajorSectionLink section="${added.anchor}">18. Dynamic extension</MajorSectionLink>\n\n## 18.1 Added subsection\n\n<div class="deck-content"><ul><li>Navigation follows the generated hierarchy.</li></ul></div>\n`
await writeFile(`${destination}/config/section-overviews.json`, JSON.stringify(sections, null, 2))
await writeFile(`${destination}/slides.md`, markdown)
await writeFile(`${destination}/short-version-disabled-slides.txt`, '')
console.log(destination)

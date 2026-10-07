import { randomUUID } from 'node:crypto'
import { parseSync } from '@slidev/parser/core'

export const slideIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Use Slidev's own parser so code blocks, slide frontmatter and speaker notes
// cannot accidentally change the relationship between a slide and its UUID.
function outsideFences(content) {
  let fence
  return content.split('\n').map(line => {
    const opening = line.match(/^\s*(`{3,}|~{3,})/)
    if (fence) {
      if (new RegExp(`^\\s*${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = undefined
      return ''
    }
    if (opening) {
      fence = opening[1]
      return ''
    }
    return line
  }).join('\n')
}

function plainTitle(value) {
  return value
    .replace(/<\/?MajorSectionLink\b[^>]*>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, entity => ({
      '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ',
    })[entity])
    .replace(/\s+/g, ' ').trim()
}

function slideTitle(content, fallback, number) {
  const headings = [...outsideFences(content).matchAll(/^#{1,2}\s+(.+?)\s*$/gm)]
  const title = headings.slice(0, 2).map(match => plainTitle(match[1])).filter(Boolean).join(' · ')
  return title || plainTitle(String(fallback || `Slide ${number}`))
}

export function inspectSlideIdentities(markdown) {
  if (typeof markdown !== 'string') throw new TypeError('Slide source must be a Markdown string')
  const seen = new Map()
  const slides = parseSync(markdown, 'slides.md').slides.map((slide, index) => {
    const number = index + 1
    const content = outsideFences(slide.raw)
    const markers = [...content.matchAll(/<!--\s*SLIDE_ID([\s\S]*?)(?:-->|$)/gi)]
    if (markers.length > 1) throw new Error(`Slide ${number} has more than one SLIDE_ID comment; keep exactly one UUID per slide`)
    let id
    if (markers.length) {
      const marker = markers[0]
      id = marker[1].trim()
      if (!marker[0].endsWith('-->') || !slideIdPattern.test(id))
        throw new Error(`Slide ${number} has a malformed SLIDE_ID comment; expected <!-- SLIDE_ID uuid -->`)
      id = id.toLowerCase()
      if (seen.has(id))
        throw new Error(`Duplicate SLIDE_ID ${id} on slides ${seen.get(id)} and ${number}; copied slides need a new UUID`)
      seen.set(id, number)
    }
    const sources = [...content.matchAll(/<!-- SOURCE Pico-OS\/README\.md#([^\s]+) -->/g)]
    if (sources.length > 1) throw new Error(`Slide ${number} contains multiple SOURCE markers`)
    return {
      id,
      number,
      title: slideTitle(slide.content, slide.title, number),
      anchor: sources[0]?.[1],
      content: slide.content,
      raw: slide.raw,
      start: slide.start,
      contentStart: slide.contentStart,
      end: slide.end,
      overview: content.includes('<SectionOverview '),
      contents: content.includes('<PresentationContents '),
      excluded: content.includes('<!-- SHORT_VERSION_DISABLED -->'),
    }
  })
  return slides
}

function bodyKey(slide) {
  // Titles and short-version selections are presentation metadata. The exact
  // remaining body lets a rebuild retain IDs after a title/anchor changes.
  const visible = outsideFences(slide.content).split('\n')
  return slide.content.split(/\r?\n/).map((line, index) => {
    if (/^#{1,2}\s+/.test(visible[index])
      || /^\s*<!--(?:\s*SLIDE_ID\b[\s\S]*?| SOURCE Pico-OS\/README\.md#[^\s]+ | SHORT_VERSION_DISABLED )-->\s*$/.test(visible[index]))
      return ''
    return line.trimEnd()
  }).join('\n').trim()
}

function sourceTitleKey(slide) {
  if (!slide.anchor) return undefined
  const role = slide.overview ? 'overview' : slide.contents ? 'contents'
    : slide.content.includes('class="cover-title ') ? 'cover' : 'content'
  return `${slide.anchor}\0${slide.title}\0${role}`
}

function artifactKey(slide) {
  // Retain a visual slide's identity when deleting a neighbouring bullet slide
  // changes its numbered title, or removing its list panel changes its body.
  // Matching must still be unique; a shared asset alone cannot pick a UUID.
  const assets = [...outsideFences(slide.content).matchAll(/<!-- README_ASSET ([^\s]+)( repeated)? -->/g)]
    .filter(match => !match[1].startsWith('list-'))
    .map(match => `${match[1]}${match[2] || ''}`).sort()
  return assets.length ? assets.join('\0') : undefined
}

function uniquePairs(current, previous, keyOf) {
  const index = slides => {
    const groups = new Map()
    for (const slide of slides) {
      const key = keyOf(slide)
      if (!key) continue
      const group = groups.get(key) || []
      group.push(slide)
      groups.set(key, group)
    }
    return groups
  }
  const oldKeys = index(previous)
  const newKeys = index(current)
  return [...newKeys].flatMap(([key, slides]) => slides.length === 1 && oldKeys.get(key)?.length === 1
    ? [[slides[0], oldKeys.get(key)[0]]] : [])
}

export function ensureSlideIdentities(markdown, previousMarkdown) {
  const slides = inspectSlideIdentities(markdown)
  const assigned = new Map(slides.filter(slide => slide.id).map(slide => [slide.number, slide.id]))
  const used = new Set(assigned.values())
  if (previousMarkdown !== undefined) {
    const previous = inspectSlideIdentities(previousMarkdown).filter(slide => slide.id)
    const remaining = () => slides.filter(slide => !assigned.has(slide.number))
    const available = () => previous.filter(slide => !used.has(slide.id))
    // Matching order matters: identical bodies distinguish slides sharing a
    // README anchor/title (for example the cover and repeated PicoOS slides).
    // No fallback ever uses page numbers or a slide's position in its section.
    for (const keyOf of [bodyKey, artifactKey, sourceTitleKey]) {
      for (const [current, old] of uniquePairs(remaining(), available(), keyOf)) {
        assigned.set(current.number, old.id)
        used.add(old.id)
      }
    }
  }
  const lineEnding = markdown.includes('\r\n') ? '\r\n' : '\n'
  const lines = markdown.split(/\r?\n/)
  for (const slide of [...slides].reverse()) {
    if (slide.id) continue
    const id = assigned.get(slide.number) || randomUUID()
    // A separator must retain its following blank line; otherwise Slidev
    // interprets the UUID comment as the beginning of YAML frontmatter.
    const insertion = lines[slide.contentStart]?.trim() === '' ? slide.contentStart + 1 : slide.contentStart
    lines.splice(insertion, 0, `<!-- SLIDE_ID ${id} -->`)
  }
  const result = lines.join(lineEnding)
  inspectSlideIdentities(result)
  return result
}

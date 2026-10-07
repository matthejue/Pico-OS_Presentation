import { parseSync } from '@slidev/parser/core'
import { inspectSlideIdentities, slideIdPattern } from './slide-identities.mjs'

export function rebuildRemovalIds(args) {
  return args.map(argument => {
    const id = argument.startsWith('--remove-slide=') ? argument.slice('--remove-slide='.length).toLowerCase() : ''
    if (!slideIdPattern.test(id))
      throw new Error(`Unknown rebuild argument: ${argument}. Intentional removals use --remove-slide=<slide UUID>.`)
    return id
  })
}

// Check individual identities, not counts: a new slide cannot conceal the loss
// of another slide. Matching uncertainty stops the rebuild for review.
export function protectRebuild(previousMarkdown, candidateMarkdown, allowedRemovalIds = []) {
  const previous = inspectSlideIdentities(previousMarkdown)
  const candidate = inspectSlideIdentities(candidateMarkdown)
  if ([...previous, ...candidate].some(slide => !slide.id))
    throw new Error('Rebuild protection requires a stable SLIDE_ID on every existing and generated slide.')
  const previousById = new Map(previous.map(slide => [slide.id, slide]))
  const candidateIds = new Set(candidate.map(slide => slide.id))
  const allowed = new Set(allowedRemovalIds)
  for (const id of allowed) {
    if (!previousById.has(id) || candidateIds.has(id))
      throw new Error(`Removal authorization ${id} must identify an existing slide missing from the candidate. No output was replaced.`)
  }
  const missing = previous.filter(slide => !candidateIds.has(slide.id) && !allowed.has(slide.id))
  if (missing.length) {
    throw new Error(`Rebuild would remove ${missing.length} existing slide(s). No output was replaced.\n`
      + missing.map(slide => `  Slide ${slide.number}: ${slide.title}\n    ${slide.id}`).join('\n')
      + '\nRestore the content or correct identity matching. For an intentional removal only, pass --remove-slide=<listed UUID> for each removed slide.')
  }
  const hidden = parseSync(candidateMarkdown, 'slides.md').slides
    .flatMap((slide, index) => slide.frontmatter.disabled === true ? [candidate[index]] : [])
  if (hidden.length)
    throw new Error(`Rebuild would permanently disable slide(s): ${hidden.map(slide => `${slide.number} (${slide.title})`).join(', ')}. No output was replaced. Use the short-version selection instead.`)

  // Only the same UUID inherits a short-version choice. New slides are visible
  // by default; sharing a section or image never spreads an exclusion.
  const lineEnding = candidateMarkdown.includes('\r\n') ? '\r\n' : '\n'
  const lines = candidateMarkdown.split(/\r?\n/)
  for (const slide of [...candidate].reverse()) {
    let fence
    let identityLine
    let sourceLine
    const markerLines = []
    for (let index = slide.contentStart; index < slide.end; index++) {
      const line = lines[index] || ''
      const opening = line.match(/^\s*(`{3,}|~{3,})/)
      if (fence) {
        if (new RegExp(`^\\s*${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = undefined
        continue
      }
      if (opening) { fence = opening[1]; continue }
      if (line.trim() === '<!-- SHORT_VERSION_DISABLED -->') markerLines.push(index)
      if (line.trim().toLowerCase() === `<!-- slide_id ${slide.id} -->`) identityLine = index
      if (/^\s*<!-- SOURCE Pico-OS\/README\.md#[^\s]+ -->\s*$/.test(line)) sourceLine = index
    }
    if (identityLine === undefined) throw new Error(`Cannot locate slide identity ${slide.id}; no output was replaced.`)
    for (const index of markerLines.reverse()) {
      lines.splice(index, 1)
      if (index < identityLine) identityLine--
      if (sourceLine !== undefined && index < sourceLine) sourceLine--
    }
    if (previousById.get(slide.id)?.excluded)
      lines.splice((sourceLine ?? identityLine) + 1, 0, '<!-- SHORT_VERSION_DISABLED -->')
  }
  const result = lines.join(lineEnding)
  const protectedSlides = inspectSlideIdentities(result)
  if (protectedSlides.length !== candidate.length || protectedSlides.some((slide, index) =>
    slide.id !== candidate[index].id || slide.excluded !== (previousById.get(slide.id)?.excluded ?? false)))
    throw new Error('Rebuild changed slide identities or short-version choices; no output was replaced.')
  return result
}

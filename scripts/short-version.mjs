import { readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SHORT_VERSION_MARKER = '<!-- SHORT_VERSION_DISABLED -->'

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
export const projectDirectory = resolve(scriptsDirectory, '..')
export const defaultSlidesPath = resolve(projectDirectory, 'slides.md')
export const defaultSelectionPath = resolve(projectDirectory, 'short-version-disabled-slides.txt')

const sourceMarkerPattern = /^[ \t]*<!-- SOURCE Pico-OS\/README\.md#[^ ]+ -->[ \t]*$/gm
const shortMarkerPattern = /^[ \t]*<!-- SHORT_VERSION_DISABLED -->[ \t]*$(?:\r?\n)?/gm

export function parseSlideNumbers(text, label = 'slide selection') {
  const trimmed = text.trim()
  if (!trimmed)
    return []

  const tokens = trimmed.split(/\s+/)
  const invalid = tokens.filter(token => !/^[1-9]\d*$/.test(token))
  if (invalid.length)
    throw new Error(`${label} contains invalid slide number${invalid.length === 1 ? '' : 's'}: ${invalid.join(', ')}`)

  return [...new Set(tokens.map(Number))].sort((left, right) => left - right)
}

export function formatSlideNumbers(numbers) {
  const sorted = [...new Set(numbers)].sort((left, right) => left - right)
  const lines = []
  for (let index = 0; index < sorted.length; index += 20)
    lines.push(sorted.slice(index, index + 20).join(' '))
  return lines.length ? `${lines.join('\n')}\n` : ''
}

export function inspectSlides(markdown) {
  const sources = [...markdown.matchAll(sourceMarkerPattern)]
  const disabled = []
  const markerCounts = new Map()

  for (const marker of markdown.matchAll(shortMarkerPattern)) {
    const markerPosition = marker.index ?? -1
    let slide = 0
    for (let index = 0; index < sources.length; index++) {
      if ((sources[index].index ?? Infinity) > markerPosition)
        break
      slide = index + 1
    }
    if (!slide)
      throw new Error('A short-version marker appears before the first slide SOURCE marker')
    markerCounts.set(slide, (markerCounts.get(slide) ?? 0) + 1)
  }

  for (const [slide, count] of markerCounts) {
    if (count > 1)
      throw new Error(`Slide ${slide} has ${count} short-version markers; expected at most one`)
    disabled.push(slide)
  }

  return {
    slideCount: sources.length,
    disabled: disabled.sort((left, right) => left - right),
  }
}

export function applySelectionToMarkdown(markdown, selectedSlides) {
  const normalized = [...new Set(selectedSlides)].sort((left, right) => left - right)
  const withoutMarkers = markdown.replace(shortMarkerPattern, '')
  const { slideCount } = inspectSlides(withoutMarkers)
  const outOfRange = normalized.filter(slide => slide > slideCount)

  if (outOfRange.length)
    throw new Error(`Slide number${outOfRange.length === 1 ? '' : 's'} outside the 1-${slideCount} range: ${outOfRange.join(', ')}`)

  const selected = new Set(normalized)
  const newline = withoutMarkers.includes('\r\n') ? '\r\n' : '\n'
  let slide = 0
  const updated = withoutMarkers.replace(sourceMarkerPattern, (sourceMarker) => {
    slide += 1
    return selected.has(slide)
      ? `${sourceMarker}${newline}${SHORT_VERSION_MARKER}`
      : sourceMarker
  })

  return { markdown: updated, slideCount, disabled: normalized }
}

async function atomicWrite(path, content) {
  const temporaryPath = `${path}.tmp-${process.pid}-${Date.now()}`
  await writeFile(temporaryPath, content, 'utf8')
  await rename(temporaryPath, path)
}

export async function readSelection(selectionPath = defaultSelectionPath) {
  return parseSlideNumbers(await readFile(selectionPath, 'utf8'), selectionPath)
}

export async function writeSelection(numbers, selectionPath = defaultSelectionPath) {
  await atomicWrite(selectionPath, formatSlideNumbers(numbers))
}

export async function toggleSelection(slide, selectionPath = defaultSelectionPath) {
  if (!Number.isSafeInteger(slide) || slide < 1)
    throw new Error(`Invalid slide number: ${slide}`)

  const selected = new Set(await readSelection(selectionPath))
  const marked = !selected.has(slide)
  if (marked)
    selected.add(slide)
  else
    selected.delete(slide)
  const slides = [...selected].sort((left, right) => left - right)
  await writeSelection(slides, selectionPath)
  return { slide, marked, slides }
}

export async function applySelection({
  slidesPath = defaultSlidesPath,
  selectionPath = defaultSelectionPath,
} = {}) {
  const [markdown, selectedSlides] = await Promise.all([
    readFile(slidesPath, 'utf8'),
    readSelection(selectionPath),
  ])
  const result = applySelectionToMarkdown(markdown, selectedSlides)
  if (result.markdown !== markdown)
    await atomicWrite(slidesPath, result.markdown)
  return { ...result, changed: result.markdown !== markdown }
}

export async function syncSelection({
  slidesPath = defaultSlidesPath,
  selectionPath = defaultSelectionPath,
} = {}) {
  const markdown = await readFile(slidesPath, 'utf8')
  const result = inspectSlides(markdown)
  await writeSelection(result.disabled, selectionPath)
  return result
}

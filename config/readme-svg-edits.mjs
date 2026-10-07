import edits from './readme-svg-edits.json' with { type: 'json' }

// Presentation-only annotation corrections. The README snapshot and its
// original asset hashes remain unchanged; source changes require a review.
export function applySvgEdits(name, svg) {
  for (const [before, after] of edits[name] || []) {
    if (!svg.includes(before))
      throw new Error(`Review outdated SVG correction in ${name}: ${before}`)
    svg = svg.replaceAll(before, after)
  }
  return svg
}

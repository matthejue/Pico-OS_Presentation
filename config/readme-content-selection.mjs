// Section 1 uses its source visuals without the redundant bullet summaries,
// starting after the first shared-epilogue slide. Compare README section
// numbers so the selection survives slide insertions and renumbering.
export function visualOnlySection(section) {
  const number = section.title.match(/^(\d+(?:\.\d+)*)\.?\s/)?.[1].split('.').map(Number)
  if (!number || number[0] !== 1) return false
  const start = [1, 1, 3, 2]
  for (let i = 0; i < Math.max(number.length, start.length); i++) {
    if ((number[i] || 0) !== (start[i] || 0)) return (number[i] || 0) > (start[i] || 0)
  }
  return true
}

export const keepSummary = (section, index) => !visualOnlySection(section)
  || (section.anchor === '1132-shared-function-epilogue-and-return-values' && index === 0)

// Instruction sequences inside tables remain complete, as plain lines.
export const plainTableLines = html => html
  .replace(/<ul\b[^>]*>/g, '<div class="table-lines">').replaceAll('</ul>', '</div>')
  .replace(/<li\b[^>]*>/g, '<div class="table-line">').replaceAll('</li>', '</div>')

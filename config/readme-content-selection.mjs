// Sections 2–7 and the later part of section 1 use source visuals without bullet
// summaries, with the explicitly retained slide exceptions below. Compare README section
// numbers so the selection survives slide insertions and renumbering.
export function visualOnlySection(section) {
  const number = section.title.match(/^(\d+(?:\.\d+)*)\.?\s/)?.[1].split('.').map(Number)
  if ([2, 3, 4, 5, 6, 7].includes(number?.[0])) return true
  if (!number || number[0] !== 1) return false
  const start = [1, 1, 3, 2]
  for (let i = 0; i < Math.max(number.length, start.length); i++) {
    if ((number[i] || 0) !== (start[i] || 0)) return (number[i] || 0) > (start[i] || 0)
  }
  return true
}

const retainedFirstSlides = new Set([
  '1132-shared-function-epilogue-and-return-values',
  '421-loading-a-process-load-library-call',
  '422-starting-a-process-run-library-call',
])
export const keepSummary = (section, index) => !visualOnlySection(section)
  || (retainedFirstSlides.has(section.anchor) && index === 0)

export const omitSourceLists = section => /^[234567](?:\.|\s)/.test(section.title)
  && !retainedFirstSlides.has(section.anchor)
export const sourceListOmission = 'Standalone bullet lists omitted by request; table bullets retained'

// Keep the signal comparison as a plain note on its related function table
// when the standalone summary slide is removed.
export const contextualNoteTargets = {
  '724-fixed-picoos-signal-actions-compared-with-unix': '725-signal-function-reference',
}

// Keep the reviewed source grouping, then remove list panels and collapse
// their empty columns/rows. Never leave a layout slot reserved for deleted text.
export function removeSourceListPanels(panel) {
  if (panel.panels) {
    const surviving = panel.panels.map((child, i) => ({panel: removeSourceListPanels(child), weight: panel.weights[i]}))
      .filter(child => child.panel.group.length)
    if (surviving.length === 1) return {...surviving[0].panel, summary: panel.summary}
    return {...panel, panels: surviving.map(child => child.panel), weights: surviving.map(child => child.weight),
      group: surviving.flatMap(child => child.panel.group)}
  }
  const group = panel.group.filter(asset => asset.type !== 'list')
  const layout = group.length === 1 && ['columns', 'compact-stacked', 'stacked'].includes(panel.layout) ? 'single' : panel.layout
  return {...panel, group, layout}
}

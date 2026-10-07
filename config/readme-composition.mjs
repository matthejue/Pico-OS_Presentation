// Reviewed merges within a README subsection. Existing column layouts and
// their independently reviewed proportions stay nested inside each panel.
// Weights reflect rendered content heights, rather than equal empty panels.
const plans = {
  'picoos': [[135, 259], 1],
  'build-and-run': [[132, 216]],
  '116-program-sections-interrupt-table-entries-and-linker-placement': [[148, 143]],
  '1171-interrupt-safe-push-and-pop': [[149, 132]],
  '1172-loading-32-bit-values-with-loadi32': [[78, 95]],
  '1174-pseudoinstruction-expansion-during-linking': [[197, 143]],
  '118-linked-sections-metadata-and-the-five-word-binary-header': [[170, 253], 1, [151, 216]],
  '119-generated-memory-constants-for-the-bootloader-and-kernel': [1, 1, [95, 143]],
  '121-reti-machine-model-and-memory-mapped-peripherals': [[116, 143], 1],
  '21-reti-interrupt-entry-and-the-interrupt-service-routine-table': [1, [216, 114]],
  '242-system-call-entry-execution-and-return-to-userspace': [1, 1, [230, 125]],
  '2422-handle-syscall': [[173, 90]],
  '2423-selecting-the-return-path': [[204, 130]],
  '251-timer-interrupt-path': [1, 1, [125, 183], [120, 120]],
  '26-uart-receive-interrupt-path': [1, [269, 125], 1, 1],
  '27-dma-completion-interrupt-path': [1, [285, 125]],
  '421-loading-a-process-load-library-call': [[150, 211], 1],
  '52-mapping-unlinking-and-deferred-destruction': [1, [316, 316]],
  '611-algorithm-and-round-robin-comparison': [[124, 266]],
  '62-saved-process-registers': [[208, 216]],
  '63-saving-the-current-process-and-selecting-the-next-process': [1, [218, 125]],
  '64-restoring-the-selected-process-and-returning-with-rti': [[129, 185]],
  '71-wait-queues-and-pcb-links': [[114, 213], 1],
  '82-global-terminal-input-buffer': [[170, 216]],
  '83-blocking-and-completing-terminal-reads': [[157, 173], 1],
  '84-foreground-input-ownership-and-terminal-generated-signals': [[365, 86]],
  '1011-header-implementation-and-linking': [[180, 95]],
  '1029-stdio-streams-formatting-and-scanning': [[95, 69]],
  '112-kernel-startup': [[114, 243]],
  '1412-library-test-example': [[227, 134]],
  '1413-os-test-example': [1, [210, 92]],
  '1414-shell-test-example': [[152, 94]],
  '1415-boot-test-example': [[108, 88]],
  '1511-inspecting-picoos-execution-in-the-reti-emulator': [[150, 206]],
  '1513-editing-and-executing-symbolic-reti-assembly': [1, [289, 64]],
  'appendix-inspecting-bin-files-with-hexyl': [[216, 110]],
}
const composed = (panels, weights) => ({
  group: panels.flatMap(panel => panel.group), layout: 'composed', panels, weights,
})
const single = asset => ({group: [asset], layout: 'single'})

export function compactGroups(groups, section) {
  const parts = groups.flatMap(panel => panel.group)
  const types = parts.map(part => part.type).join(',')
  // Expanded storage views and redirection stages need the complete slide width.
  // Their source diagrams already contain the explanations and detail panels.
  const fullWidthSections = new Set([
    '6111-selecting-the-next-runnable-process',
    '92-containment-and-reference-relationships',
    '126-inputoutput-redirection',
    '127-sequential-file-backed-pipelines',
    '82-global-terminal-input-buffer',
  ])
  if (fullWidthSections.has(section.anchor)) {
    return groups.flatMap(panel => panel.group.some(part => part.type === 'image')
      ? panel.group.map(single) : [panel])
  }
  // These sequences benefit from moving the page boundary inside an old pair.
  if (section.anchor === '122-atomic-test-and-set-with-tsl' && types === 'code,image,image,table')
    return [composed(parts.slice(0, 2).map(single), [95, 247]), composed(parts.slice(2).map(single), [189, 180])]
  if (section.anchor === '281-cpu-exception-entry-and-registers' && types === 'mermaid,table,code,list,code,list')
    return [composed(parts.slice(0, 2).map(single), [128, 182]), composed(parts.slice(2, 4).map(single), [173, 160]), {group: parts.slice(4), layout: 'columns'}]
  const plan = plans[section.anchor]
  // Changed source compositions require a fresh layout review.
  if (!plan || plan.reduce((n, run) => n + (Array.isArray(run) ? run.length : run), 0) !== groups.length)
    return groups
  let offset = 0
  return plan.map(run => {
    const count = Array.isArray(run) ? run.length : run
    const panels = groups.slice(offset, offset += count)
    return Array.isArray(run) ? composed(panels, run) : panels[0]
  })
}

export function renderComposed({panels, weights}, render, {columnAttributes, columnShares, codeNeed, rowAttributes}) {
  const html = panels.map(({group, layout}) => {
    const columnKey = 'assets:' + group.map(asset => asset.id).join('+')
    if (layout === 'columns') {
      for (const asset of group) if (asset.type === 'code') asset.narrow = true
      if (group.every(asset => asset.type === 'code')) {
        const shares = columnShares(columnKey)
        const budget = Math.max(...group.map((asset, i) => codeNeed(asset.content.trimEnd().split('\n')) / (shares[i] / 100)))
        group.forEach((asset, i) => asset.nativeCodeWidth = budget * shares[i] / 100)
      }
    }
    return `<div class="readme-artifacts composition-panel layout-${layout}"${layout === 'columns' ? ' ' + columnAttributes(columnKey) : layout === 'stacked' ? rowAttributes(group) : ''}>\n\n${group.map(render).join('\n\n')}\n\n</div>`
  }).join('\n\n')
  return `<div class="readme-artifacts layout-composed" style="--readme-rows:${weights.map(weight => `minmax(0, ${weight}fr)`).join(' ')}">\n\n${html}\n\n</div>`
}

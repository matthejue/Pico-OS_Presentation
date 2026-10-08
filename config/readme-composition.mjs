// Reviewed merges within a README subsection. Existing column layouts and
// their independently reviewed proportions stay nested inside each panel.
// Weights reflect rendered content heights, rather than equal empty panels.
const plans = {
  'build-and-run': [[132, 216]],
  '116-program-sections-interrupt-table-entries-and-linker-placement': [[220, 143]],
  '1171-interrupt-safe-push-and-pop': [[149, 132]],
  '1172-loading-32-bit-values-with-loadi32': [[78, 95]],
  '1174-pseudoinstruction-expansion-during-linking': [[197, 143]],
  '118-linked-sections-metadata-and-the-five-word-binary-header': [1, 1, [180, 160], [170, 180]],
  '119-generated-memory-constants-for-the-bootloader-and-kernel': [[170, 230], 1],
  '1221-test-and-set-in-sram': [[95, 240]],
  '1222-tsl-instruction-encoding': [[150, 200]],
  '221-interrupt-controller-initialization': [1, [250, 100]],
  '121-reti-machine-model-and-memory-mapped-peripherals': [[116, 143], 1],
  '21-reti-interrupt-entry-and-the-interrupt-service-routine-table': [1, [216, 114]],
  '242-system-call-entry-execution-and-return-to-userspace': [1, 1, [230, 125]],
  '2422-handle-syscall': [[173, 90]],
  '2423-selecting-the-return-path': [[204, 130]],
  '2813-halting-the-kernel-or-terminating-the-process': [[160, 160]],
  '31-heap-block-layout-and-allocation-algorithm': [1, [210, 180]],
  '412-global-process-list-and-current-process': [[250, 110]],
  '251-timer-interrupt-path': [1, 1, [125, 183], [120, 120]],
  '26-uart-receive-interrupt-path': [1, [269, 125], 1, 1],
  '27-dma-completion-interrupt-path': [1, [285, 125]],
  '421-loading-a-process-load-library-call': [[150, 211], 1],
  '52-mapping-unlinking-and-deferred-destruction': [1, [316, 316]],
  '611-algorithm-and-round-robin-comparison': [[124, 266]],
  '62-saved-process-registers': [1, 1],
  '63-saving-the-current-process-and-selecting-the-next-process': [1, [218, 125]],
  '64-restoring-the-selected-process-and-returning-with-rti': [1, 1],
  '71-wait-queues-and-pcb-links': [[114, 213], 1],
  '82-global-terminal-input-buffer': [[170, 216]],
  '83-blocking-and-completing-terminal-reads': [1, 1, 1],
  '84-foreground-input-ownership-and-terminal-generated-signals': [[365, 86]],
  '1011-header-implementation-and-linking': [1, [220, 75]],
  '1026-dirent-directory-streams': [[175, 215]],
  '1029-stdio-streams-formatting-and-scanning': [[95, 69]],
  '112-kernel-startup': [1, 1],
  '131-writing-a-simple-user-application': [[250, 80]],
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
  // With the prose removed, the IVT declaration and naked ISR fit above the
  // five-row interrupt table on one slide.
  if (section.anchor === '21-reti-interrupt-entry-and-the-interrupt-service-routine-table' && types === 'code,table,code')
    return [composed([{group: [parts[0], parts[2]], layout: 'columns'}, single(parts[1])], [160, 220])]
  // Stack the short include file above the runtime entry instead of leaving
  // most of one column empty.
  if (section.anchor === '1152-picoos-libstart-startup-sequence' && types === 'code,code') {
    parts[0].command = true
    return [{group: parts, layout: 'command-above'}]
  }
  // The opening toolchain cards take only their content height, leaving the
  // remaining area for the full-width build-and-boot diagram.
  if (section.anchor === 'picoos' && types === 'list,image')
    return [{group: parts, layout: 'toolchain-overview'}]
  // Restored caller/dependency columns make these tables wider and taller.
  // Give them full-width rows rather than shrinking unrelated companions.
  if (['88-opening-reading-writing-and-seeking',
    '89-picoos-paths-working-directories-and-host-operations'].includes(section.anchor))
    return parts.map(single)
  if (section.anchor==='51-named-entries-and-per-process-attachments'&&types==='code,table,table')
    return [single(parts[0]),composed(parts.slice(1).map(single),[240,100])]
  if (section.anchor==='1414-shell-test-example'&&types==='code,code,image')
    return [composed([{group:parts.slice(0,2),layout:'columns'},single(parts[2])],[240,100])]
  if(section.anchor==='62-saved-process-registers'&&types==='image,code,table')
    return [single(parts[0]),{group:parts.slice(1),layout:'columns'}]
  if(section.anchor==='73-mutexes-with-test-and-set-and-wait-queues'&&types==='code,code,image,table,table')
    return [composed(parts.slice(0,2).map(single),[100,270]),single(parts[2]),{group:parts.slice(3),layout:'columns'}]
  if(section.anchor==='122-shell-startup-and-command-loop'&&types==='table,code,table')
    return [{group:parts.slice(0,2),layout:'columns'},single(parts[2])]
  if(section.anchor==='111-loading-the-kernel-from-the-eprom-bootloader'&&types==='table,code,image,code,list,code,image')
    return [{group:parts.slice(0,2),layout:'columns'},single(parts[2]),{group:parts.slice(3,5),layout:'compact-stacked'},composed(parts.slice(5).map(single),[230,160])]
  if(section.anchor==='1522-minimal-launcher-and-worker-code'&&types==='code,code,code,code,code') {
    // Compare the complete parent and child programs in aligned columns.
    // The short shared declaration stays above them; build/run commands follow.
    parts[1].split = false
    return [composed([single(parts[0]),{group:parts.slice(1,3),layout:'columns'}],[100,360]),
      composed(parts.slice(3).map(single),[300,65])]
  }
  if(section.anchor==='1172-loading-32-bit-values-with-loadi32'&&types==='math,code,code,code,math')
    return [composed([single(parts[0]),{group:parts.slice(1,3),layout:'columns'}],[90,160]),composed([single(parts[3]),single(parts[4])],[130,90])]
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

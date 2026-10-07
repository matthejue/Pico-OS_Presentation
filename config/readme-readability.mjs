// Reviewed after the October font-size audit. Keep prose beside spacious
// examples; give crowded examples the full slide area. Source IDs make these
// placements independent of slide numbering. "after" collects explanations
// at the end of the same README subsection; "next" inserts them immediately
// after their source example without squeezing the next code example.
const summaryDestinations = {
  "1131-stack-frame-layout-and-caller-cleanup": {
    "table-644": "after"
  },
  "1133-naked-functions-without-a-generated-frame": {
    "code-839": "after"
  },
  "114-placing-globals-in-ivt-with-sectionivt": {
    "code-918": "next"
  },
  "1152-picoos-libstart-startup-sequence": {
    "code-1029": "after"
  },
  "116-program-sections-interrupt-table-entries-and-linker-placement": {
    "code-1713": "after"
  },
  "1172-loading-32-bit-values-with-loadi32": {
    "math-1157": "after"
  },
  "1221-test-and-set-in-sram": {
    "code-1553": "after"
  },
  "123-uart-host-service-protocol": {
    "table-1617": "after"
  },
  "221-interrupt-controller-initialization": {
    "image-1807": "after"
  },
  "2412-file-and-directory-request-structures": {
    "table-1997": "after"
  },
  "2421-entering-kernel-context": {
    "code-2048": "after"
  },
  "24211-stack-boundary-helpers": {
    "code-2133": "after"
  },
  "2423-selecting-the-return-path": {
    "code-2290": "list-2335"
  },
  "2511-saving-context-and-selecting-the-timer-branch": {
    "code-2445": "after"
  },
  "2514-entering-kernel-context-for-userspace-preemption": {
    "code-2567": "after"
  },
  "261-entering-kernel-segments-on-the-interrupted-stack": {
    "code-2694": "after"
  },
  "2813-halting-the-kernel-or-terminating-the-process": {
    "code-3169": "after"
  },
  "31-heap-block-layout-and-allocation-algorithm": {
    "image-3275": "after"
  },
  "412-global-process-list-and-current-process": {
    "image-3727": "after"
  },
  "42111-processload-transfer-record": {
    "table-3827": "after"
  },
  "42212-initial-argc-argv-and-envp": {
    "table-3998": "after"
  },
  "51-named-entries-and-per-process-attachments": {
    "table-4295": "after"
  },
  "62-saved-process-registers": {
    "code-4686": "after"
  },
  "71-wait-queues-and-pcb-links": {
    "code-4985": "after"
  },
  "721-supported-signals-and-fixed-actions": {
    "table-5355": "after"
  },
  "73-mutexes-with-test-and-set-and-wait-queues": {
    "code-5466": "after"
  },
  "84-foreground-input-ownership-and-terminal-generated-signals": {
    "table-5820": "after"
  },
  "88-opening-reading-writing-and-seeking": {
    "table-5937": "after"
  },
  "91-memory-layout-allocation-sources-and-lifetimes": {
    "table-6090": "after"
  },
  "1026-dirent-directory-streams": {
    "code-6716": "after"
  },
  "10273-environment-operations-in-envpicoc": {
    "table-6830": "after"
  },
  "10291-streams-and-output-in-stdiopicoc": {
    "table-6906": "after"
  },
  "1133-loading-starting-and-waiting-for-the-shell": {
    "code-7329": "after"
  },
  "122-shell-startup-and-command-loop": {
    "table-7521": "after"
  },
  "123-interactive-line-editing-and-command-history": {
    "code-7586": "after"
  },
  "124-command-parsing-expansion-and-execution": {
    "table-7653": "after"
  },
  "131-writing-a-simple-user-application": {
    "code-8250": "after"
  },
  "1412-library-test-example": {
    "code-8513": "after"
  },
  "1413-os-test-example": {
    "code-8546": "code-8574"
  },
  "1512-exploring-userspace-heap-allocation": {
    "code-8789": "after"
  },
  "1513-editing-and-executing-symbolic-reti-assembly": {
    "code-8851": "after",
    "code-8893": "after"
  },
  "1522-minimal-launcher-and-worker-code": {
    "code-9017": "after",
    "code-9076": "after"
  }
}

// These combinations remained small even after their prose moved. Keep each
// source artifact complete and let it occupy a separate full-width slide.
const separateArtifacts = new Set([
  'code-2048', // kernel-entry code and its stack explanation
  'code-4985', // wait-queue declaration and two field tables
  'table-5355', // signal actions and signal delivery
  'code-6716', // directory example and two function tables
  'code-7125', // bootloader code and its transfer diagram
])

export function placeSummaries(groups, summaries, section) {
  const placed = groups.map((group, i) => ({...group, summary: summaries[i] || []}))
  const deferred = []
  const following = new Map()
  for (const [source, destination] of Object.entries(summaryDestinations[section.anchor] || {})) {
    const origins = placed.filter(panel => panel.group[0]?.id === source)
    if (!origins.length) throw Error('Missing reviewed summary source: ' + source)
    for (const origin of origins) {
      const items = origin.summary
      origin.summary = []
      if (destination === 'after') deferred.push(...items)
      else if (destination === 'next') following.set(origin, items)
      else {
        const target = placed.find(panel => panel.group[0]?.id === destination)
        if (!target) throw Error('Missing reviewed summary destination: ' + destination)
        target.summary.push(...items)
      }
    }
  }
  if (deferred.length) placed.push({group: [], layout: 'bullets', summary: deferred})
  return placed.flatMap(panel => {
    const expanded = separateArtifacts.has(panel.group[0]?.id)
      ? panel.group.map((asset, i) => ({
        group: [asset], layout: 'single', summary: i === 0 ? panel.summary : [],
      })) : [panel]
    const next = following.get(panel)
    if (next?.length) expanded.push({group: [], layout: 'bullets', summary: next})
    return expanded
  })
}

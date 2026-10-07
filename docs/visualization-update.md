# Visualization changes · 7 October 2026

Compared PicoOS commit `4a8c95017f28572d575993e72561d2380465edba` with
`7647e8be5d3c7b3f9ff3f92c6a00be29ca92517c`, then compared the exact saved
README snapshot with the current README. The old snapshot also contained
uncommitted compiler-pipeline corrections, so the snapshot was the source
of truth for the old diagrams.

All 32 existing image assets were refreshed from PicoOS. All 38 Mermaid
diagrams now use the corresponding current SVG. The deck includes every
current README image: 91 SVGs and one PNG, copied byte for byte.

## Mermaid replacements

The heading column identifies the old README location. The new location and
slide numbers are derived from the current source inventory.

| Previous README section | Current SVG | Current section | Slides |
| --- | --- | --- | --- |
| 1.1.1 Compilation pipeline and compiler passes | [compiler-original-pipeline.svg](../public/readme/compiler-original-pipeline.svg) | 1.1.1 Compilation pipeline and compiler passes | 14 |
| 1.1.1 Compilation pipeline and compiler passes | [compiler-picoos-pipeline.svg](../public/readme/compiler-picoos-pipeline.svg) | 1.1.1 Compilation pipeline and compiler passes | 14 |
| 1.1.2 Separate compilation, reusable artifacts, and linking | [compiler-gcc-linking.svg](../public/readme/compiler-gcc-linking.svg) | 1.1.2 Separate compilation, reusable artifacts, and linking | 16 |
| 1.1.2 Separate compilation, reusable artifacts, and linking | [compiler-picoc-linking.svg](../public/readme/compiler-picoc-linking.svg) | 1.1.2 Separate compilation, reusable artifacts, and linking | 16 |
| 1.1.3.2 Shared function epilogue and return values | [compiler-shared-epilogue.svg](../public/readme/compiler-shared-epilogue.svg) | 1.1.3.2 Shared function epilogue and return values | 19 |
| 1.1.8 Linked `.sections` metadata and the five-word binary header | [compiler-binary-assembly.svg](../public/readme/compiler-binary-assembly.svg) | 1.1.8 Linked `.sections` metadata and the five-word binary header | 39 |
| 1.2.3 UART host-service protocol | [uart-physical-host-service.svg](../public/readme/uart-physical-host-service.svg) | 1.2.3 UART host-service protocol | 52 |
| 1.2.3 UART host-service protocol | [uart-emulated-host-service.svg](../public/readme/uart-emulated-host-service.svg) | 1.2.3 UART host-service protocol | 52 |
| 1.2.3 UART host-service protocol | [uart-load-protocol.svg](../public/readme/uart-load-protocol.svg) | 1.2.3 UART host-service protocol | 54 |
| 1.2.3 UART host-service protocol | [uart-file-requests.svg](../public/readme/uart-file-requests.svg) | 1.2.3 UART host-service protocol | 54 |
| 2.4.2 System-call entry, execution, and return to userspace | [interrupt-syscall-path.svg](../public/readme/interrupt-syscall-path.svg) | 2.4.2 System-call entry, execution, and return to userspace | 72 |
| 2.5.1 Timer interrupt path | [interrupt-timer-path.svg](../public/readme/interrupt-timer-path.svg) | 2.5.1 Timer interrupt path | 83 |
| 2.5.1 Timer interrupt path | [timer-pc-memory-layout.svg](../public/readme/timer-pc-memory-layout.svg) | 2.5.1.1 Saving context and selecting the timer branch | 85 |
| 2.6 UART receive interrupt path | [interrupt-uart-path.svg](../public/readme/interrupt-uart-path.svg) | 2.6 UART receive interrupt path | 92 |
| 2.7 DMA completion interrupt path | [interrupt-dma-path.svg](../public/readme/interrupt-dma-path.svg) | 2.7 DMA completion interrupt path | 98 |
| 2.8.1 CPU exception entry and registers | [interrupt-exception-path.svg](../public/readme/interrupt-exception-path.svg) | 2.8.1 CPU exception entry and registers | 102 |
| 3.6.1 Common allocator linkage and function reference | [heap-allocator-linkage.svg](../public/readme/heap-allocator-linkage.svg) | 3.6.1 Common allocator linkage and function reference | 124 |
| 3.6.2 Reallocation decisions | [heap-reallocation-decisions.svg](../public/readme/heap-reallocation-decisions.svg) | 3.6.2 Reallocation decisions | 126 |
| 4.1.1 Process states and transitions | [process-state-transitions.svg](../public/readme/process-state-transitions.svg) | 4.1.1 Process states and transitions | 140 |
| 4.3.2.1.1 Environment origin and propagation | [process-environment-propagation.svg](../public/readme/process-environment-propagation.svg) | 4.2.2.2.1 Environment origin and propagation | 157 |
| 4.3.2.2 Recording termination status | [process-termination-status.svg](../public/readme/process-termination-status.svg) | 7.1.2.1 Recording termination status | 195 |
| 6.1.1 Algorithm and Round Robin comparison | [scheduler-overview.svg](../public/readme/scheduler-overview.svg) | 6.1.1.1 Selecting the next runnable process | 173 |
| 7.2 Wait queues and PCB links | [wait-queue-pcb-links.svg](../public/readme/wait-queue-pcb-links.svg) | 7.1 Wait queues and PCB links | 190 |
| 7.4 Mutexes with test-and-set and wait queues | [mutex-lock-wakeup.svg](../public/readme/mutex-lock-wakeup.svg) | 7.3 Mutexes with test-and-set and wait queues | 206 |
| 8.1 Per-process file-descriptor table | [file-descriptor-inheritance.svg](../public/readme/file-descriptor-inheritance.svg) | 8.1 Per-process file-descriptor table | 211 |
| 9.2 Containment and reference relationships | [process-containment-references.svg](../public/readme/process-containment-references.svg) | 9.2 Containment and reference relationships | 230 |
| 9.2 Containment and reference relationships | [process-waitpid-references.svg](../public/readme/process-waitpid-references.svg) | 9.2 Containment and reference relationships | 231 |
| 9.3 Kernel global variables and process-list roots | [memory-process-list.svg](../public/readme/memory-process-list.svg) | 4.1.2 Global process list and current process | 141 |
| 11. Complete startup: bootloader, kernel, init, shell, and user applications | [startup-memory-sequence.svg](../public/readme/startup-memory-sequence.svg) | 11. Complete startup: bootloader, kernel, init, shell, and user applications | 265 |
| 12.1 Shell-owned state | [process-shell-state.svg](../public/readme/process-shell-state.svg) | 12.1 Shell-owned state | 284 |
| 12.6 Input/output redirection | [process-redirection-save.svg](../public/readme/process-redirection-save.svg) | 12.6 Input/output redirection | 295 |
| 12.7 Sequential file-backed pipelines | [process-pipeline.svg](../public/readme/process-pipeline.svg) | 12.7 Sequential file-backed pipelines | 303 |
| 14.1 Library, OS, shell, and boot test categories | [test-categories.svg](../public/readme/test-categories.svg) | 14.1 Library, OS, shell, and boot test categories | 315 |
| 14.1.1 Files that make up a test | [test-file-layout.svg](../public/readme/test-file-layout.svg) | 14.1.1 Files that make up a test | 316 |
| 14.1.2 Library test example | [test-library-flow.svg](../public/readme/test-library-flow.svg) | 14.1.2 Library test example | 318 |
| 14.1.3 OS test example | [test-os-flow.svg](../public/readme/test-os-flow.svg) | 14.1.3 OS test example | 320 |
| 14.1.4 Shell test example | [test-shell-flow.svg](../public/readme/test-shell-flow.svg) | 14.1.4 Shell test example | 321 |
| 14.1.5 Boot test example | [test-boot-flow.svg](../public/readme/test-boot-flow.svg) | 14.1.5 Boot test example | 322 |

## Moved content and larger views

- Process loading moved from 4.3 to 4.2. Initial stacks now belong under
  4.2.2.1; inheritance belongs under 4.2.2.2. Loading is split into reception,
  PCB creation, and the loaded stack.
- Termination status and final child removal moved from 4.3.2 into
  7.1.2.1 and 7.1.2.2 under waitpid. The blocking cycle moved from 7.1 into
  7.1.1.1 under sleep/wakeup. Signals and mutexes are now 7.2 and 7.3.
- Interrupt entry, handling, and restoration have separate README headings.
  Their slide titles and section-overview destinations follow those headings.
- Scheduler scans include selection, wraparound, and end-of-list walkthroughs.
  Expanded activation, dispatcher, waitpid, descriptor, and terminal figures
  keep their current SVG compositions.
- Shell redirection uses five full-width stage diagrams. The producer and
  consumer pipeline figures each have a full-width slide. The larger
  containment/reference views and terminal-buffer image also have dedicated
  space rather than inheriting the old paired layouts.
- Applications now have a 13.1 worked example; the existing inventory moved
  to 13.2. The shared-mutex lesson has its full launcher/worker examples and
  execution trace.

## Preservation

The cover and its saved note are unchanged. All five short-version exclusions
remain on slides 5, 6, 7, 8, and 11. 306 previous UUIDs were retained by matching
mapped content, rather than shifted section numbers. Split, merged, or replaced
compositions without a unique match receive distinct UUIDs. Subsequent rebuilds
preserve the resulting associations.

The enlarged viewer loads source SVGs as vectors with selectable labels, zoom,
fit, scrolling, and return to the same slide. Source asset files remain unchanged.

No PDF was generated.

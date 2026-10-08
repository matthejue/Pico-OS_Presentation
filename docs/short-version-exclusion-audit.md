# Short-version exclusion audit

Audited on 2026-10-08 against commit `8313fca` (381 slides), rebuild snapshot `a07f9fb`, and current commit `a8da103` (339 slides). Slide numbers below refer to the audited full deck; UUIDs in the [JSON report](short-version-exclusion-audit.json) remain stable after renumbering.

## Restored slides

Restored 27 additional slides in both the source markers and editable exclusion list. Every listed slide was visible and absent from the editable selection in the baseline. Its exclusion matches the old generator's rule that propagated a hidden text-only slide's choice to all slides sharing its subsection anchor.

Git snapshots record final files, not individual shortcut actions. These are matches to the known bug; they cannot prove that no user action happened between commits. Other exclusions were preserved.

The last column gives the commentary slide's number in the earlier 381-slide deck. Many of those commentary slides were subsequently removed when redundant bullet slides were removed. Their exclusions had already spread to the surviving examples.

| Current full-deck slide | Slide title | Previously hidden commentary slide |
| --- | --- | --- |
| 18 | 1.1.3.1 Stack-frame layout and caller cleanup (1) | 19 — 1.1.3.1 Stack-frame layout and caller cleanup (2) |
| 67 | 2.4.1.2 File and directory request structures (1) | 73 — 2.4.1.2 File and directory request structures (3) |
| 68 | 2.4.1.2 File and directory request structures (2) | 73 — 2.4.1.2 File and directory request structures (3) |
| 105 | 3.1 Heap block layout and allocation algorithm (1) | 125 — 3.1 Heap block layout and allocation algorithm (3) |
| 106 | 3.1 Heap block layout and allocation algorithm (2) | 125 — 3.1 Heap block layout and allocation algorithm (3) |
| 127 | 4.1.2 Global process list and current process | 152 — 4.1.2 Global process list and current process (2) |
| 139 | 4.2.2.1.2 Initial argc, argv, and envp (2) | 166 — 4.2.2.1.2 Initial argc, argv, and envp (4) |
| 140 | 4.2.2.1.2 Initial argc, argv, and envp (3) | 166 — 4.2.2.1.2 Initial argc, argv, and envp (4) |
| 149 | 5.1 Named entries and per-process attachments (1) | 177 — 5.1 Named entries and per-process attachments (3) |
| 150 | 5.1 Named entries and per-process attachments (2) | 177 — 5.1 Named entries and per-process attachments (3) |
| 163 | 6.2 Saved process registers (1) | 194 — 6.2 Saved process registers (3) |
| 164 | 6.2 Saved process registers (2) | 194 — 6.2 Saved process registers (3) |
| 173 | 7.1 Wait queues and PCB links (1) | 208 — 7.1 Wait queues and PCB links (5) |
| 174 | 7.1 Wait queues and PCB links (2) | 208 — 7.1 Wait queues and PCB links (5) |
| 175 | 7.1 Wait queues and PCB links (3) | 208 — 7.1 Wait queues and PCB links (5) |
| 176 | 7.1 Wait queues and PCB links (4) | 208 — 7.1 Wait queues and PCB links (5) |
| 185 | 7.3 Mutexes with test-and-set and wait queues (1) | 228 — 7.3 Mutexes with test-and-set and wait queues (4) |
| 186 | 7.3 Mutexes with test-and-set and wait queues (2) | 228 — 7.3 Mutexes with test-and-set and wait queues (4) |
| 187 | 7.3 Mutexes with test-and-set and wait queues (3) | 228 — 7.3 Mutexes with test-and-set and wait queues (4) |
| 198 | 8.4 Foreground input ownership and terminal-generated signals (1) | 240 — 8.4 Foreground input ownership and terminal-generated signals (2) |
| 202 | 8.8 Opening, reading, writing, and seeking (1) | 246 — 8.8 Opening, reading, writing, and seeking (4) |
| 203 | 8.8 Opening, reading, writing, and seeking (2) | 246 — 8.8 Opening, reading, writing, and seeking (4) |
| 204 | 8.8 Opening, reading, writing, and seeking (3) | 246 — 8.8 Opening, reading, writing, and seeking (4) |
| 235 | 10.2.6 dirent: directory streams (1) | 279 — 10.2.6 dirent: directory streams (4) |
| 236 | 10.2.6 dirent: directory streams (2) | 279 — 10.2.6 dirent: directory streams (4) |
| 237 | 10.2.6 dirent: directory streams (3) | 279 — 10.2.6 dirent: directory streams (4) |
| 247 | 10.2.9.1 Streams and output in stdio.picoc (1) | 289 — 10.2.9.1 Streams and output in stdio.picoc (2) |

## Other changed exclusions: left unchanged

These 7 slides were also visible in the baseline, but their new exclusions do not match the subsection/asset propagation evidence. They may be deliberate choices or another accidental change. History alone cannot establish intent.

| Current full-deck slide | Slide title | Timing |
| --- | --- | --- |
| 43 | 1.1.9 Generated memory constants for the bootloader and kernel (2) | Already hidden in a07f9fb |
| 45 | 1.1.9 Generated memory constants for the bootloader and kernel (4) | Already hidden in a07f9fb |
| 47 | 1.2 ReTI-Emulator extensions (2) | Hidden after a07f9fb |
| 66 | 2.4.1.1 Process, wait, signal, and memory request structures | Already hidden in a07f9fb |
| 100 | 2.8.1.2.1 Reporting the exception | Already hidden in a07f9fb |
| 126 | 4.1.1 Process states and transitions (2) | Already hidden in a07f9fb |
| 338 | 17. Limitations | Already hidden in a07f9fb |

## Removed slide identities

43 earlier slide UUIDs are absent from the current deck. 41 belonged to text-only slides in the sections affected by configured bullet removal. The other two were source slides whose code/table assets now appear on surviving visible slides (58 and 331). No code, table, or image asset from those removed identities is missing. These were not restored by this exclusion audit.

## Verification

Restoration changes only the 27 identified slides' exclusion markers and list entries. Slide UUIDs, slide count, source content, and every other slide's visibility remain unchanged. Existing section 13/15 example restorations remain visible.

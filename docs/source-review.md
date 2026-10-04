# Source review · 4 October 2026

The deck was rebuilt from the current PicoOS README, including its uncommitted
edits. The source record in `source-state.json` and the byte-for-byte snapshot in
`.source/Pico-OS-README.md` identify the input. The presentation contains 256
slides covering 179 README anchors, in source order.

## Structure and content

Each slide uses the exact current heading and its complete ancestry. Sections
spanning several slides have consecutive subtitle numbers. Introductions without
separate content appear in descendant titles; the cover supplies the prescribed
seven-topic overview instead of duplicating the README's Contents section.
Function references retain operations reached through library syscalls or direct
library linkage. Internal-only catalogs are omitted.

Existing slides were reviewed by content, moved to their current sections, and
adapted. The cover artwork, hardware layout, compiler showcase, register-save
walkthroughs, initialization timelines, application grids, and lecture examples
remain. The existing light palette with cyan, amber, and green accents is
preserved. New diagrams, memory maps, tables, and code excerpts use that same
style, with long sequences focused on individual interactions.

The revision incorporates these changes in the current source:

- Separate compilation, stack-frame and return-value conventions, naked
  functions, compiler/default startup, and the atomic TSL instruction.
- Current syscall requests and groups, timer and UART paths, borrowed-stack
  entry, DMA loading, exception handling, and the timer measurement figure.
- The kernel / process-and-shared-data / per-process heap hierarchy, allocator
  linkage, splitting and repeated coalescing, and current generated addresses.
- Process control blocks, load/run transitions, the 29-cell argc/argv/envp
  startup example, shared-memory lifetimes, scheduling, and blocking.
- Library-facing functions, descriptors and terminal ownership, request
  chunking, shell job control, redirection, and sequential file-backed pipelines.
- Compiler-generated kernel startup and custom libstart entry points, including
  the README's repeated startup examples at their relevant stages.
- The current test inventory: 63 classes, comprising 13 library, 23 OS, 26 shell,
  and one boot class. These are source-reported counts, not new test results.

Source limitations remain visible, including the mutex missed-wakeup window,
missing initial-stack fit validation, NEW-process stop/continue behavior, and
termination during init's final scheduling path. Memory sizes, measurements,
and implementation behavior describe this source snapshot.

## Source and update workflow

The stored previous commit (`be085be6efde3705fd7fb05f3cafcee5b9e738e3`) was not
available in the current PicoOS repository history. The authoritative comparison
was therefore the exact saved README against the current working README;
current HEAD and its README working-tree diff were also inspected.

No `AGENTS.md` or `agents.md` was present in the checkout or its parent paths.
This update follows the supplied files in
`/home/areo/Documents/AI-Vault/skills/PicoOS_Presentation/`:
`presentation.md`, `update-presentation.md`, and `short-version.md`.

For future updates:

1. Apply pending short-version numbers to slide markers before editing.
2. Compare the saved source bytes with the current README and inspect its git
   history and working-tree changes.
3. Revise content, headings, ordering, and visuals together; preserve each
   slide's source and short-version markers.
4. Build and verify the candidate with `PRESENTATION_SOURCE` pointing to those
   exact README bytes. Check both normal and selectable-text development modes.
5. After success, save the source snapshot and its metadata, then synchronize
   short-version numbers from the relocated markers.

The six existing exclusions follow their corresponding content. The excluded
old quick-start make-target slide is represented by the current launch-options
slide. Their new full-deck numbers are 2, 3, 4, 5, 6, and 8.

## Presentation behavior

The existing `m`, `Alt+A`, and `Alt+S` editing shortcuts, selectable-text route,
visual enlargement controls, and bundled asciinema recording are preserved.
New heap diagrams, stack cells, and the measurement figure also support the
shared enlarged viewer. Sequence diagrams omit repeated bottom actor boxes to
leave more room for messages. Slides load on demand because preloading the
larger deck exhausted Chromium's pending-resource capacity during review.

The full (256-slide) and short (250-slide) production builds passed. Browser
checks passed for the production build and both development modes, covering all
slide bounds, README titles and markers, Mermaid rendering, zoom, navigation,
selection, and local recording playback. The three editing shortcuts were also
checked against the real development write endpoints in both modes, with the
test edits restored afterward. The short-version unit checks passed.

No PDF was exported, no PicoOS tests were run, and `speaker-notes.md` was not
edited.

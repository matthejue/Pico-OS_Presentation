# Pending correction review — 2026-10-08

Processed 31 correction files (12 Markdown files and 19 screenshots), associated with 29 existing slides by persistent `slide_id`. All completed Markdown bullets are checked. Completed filenames and screenshot sidecars are prefixed with `x_`; existing `x_` files were not processed.

## Stale or changed screenshots

- ReTI execution model (`52d277d0-bd4e-4399-af49-3310a5c61d8c`): the memory map is already larger and separated from the table compared with the screenshot. Verified the request as already satisfied and marked the screenshot complete without editing the slide.
- Concrete initial-stack example (`1395b8ee-c3c3-480e-8e62-2db36b0c9e19`): the crossed-out “Reading the stack” note was already absent. Applied the remaining clear request to swap the examples.
- Stack-frame layout (`2d92951f-5f88-46ca-9959-9c45f246e965`): the current caller/callee bands already differ from older screenshots. A neutral header removes the remaining teal/amber/teal sequence while preserving both colored bands.

## Unresolved correction

The Markdown correction historically labeled slide 305 targets `9204e2d0-4668-4d63-b517-fcc62df0f1ea`, which does not exist in the current deck. Its two bullets remain unchecked and its filename is unchanged. No similarly titled or numbered slide was substituted.

## Changes by persistent identity

Current numbers below are review aids only; UUIDs determined every target.

| Current slide | Persistent slide_id | Result |
| --- | --- | --- |
| 11 | `52d277d0-bd4e-4399-af49-3310a5c61d8c` | The older screenshot requests a larger memory map and more separation. Both are already satisfied in the current slide; no additional edit. |
| 14 | `ae8ed70c-774e-4466-b9e8-fc5fddd04358` | Replaced the extended heading with “several source files”; put the preprocessor label on one line. |
| 18 | `2d92951f-5f88-46ca-9959-9c45f246e965` | Used a neutral table header above contiguous amber caller and teal callee bands. |
| 47 | `34f55380-203b-4af3-a00b-17ecd4efffaa` | Moved SRAM transcoding to the end of the right table. |
| 50 | `b76f762b-22f9-4111-a94b-c1f872bfec7e` | Removed the three crossed-out SVG captions; cropped the resulting empty margin. |
| 55 | `6164bc4d-486b-47af-b6bd-951480b9f99f` | Removed the offline caption and redundant click instruction; preserved recording playback. |
| 70 | `4ed85741-419e-4a63-8ef8-e52a86618eff` | Rebalanced the split code to 25 lines on the left and 13 on the right; preserved the complete example. |
| 71 | `c276aed7-d90d-4f32-9092-8d3a724154e5` | Swapped the helper examples; the longer kernel example is on the left. |
| 72 | `8ff2e1d3-e134-4d33-a051-9fe5c9f4f5f5` | Merged into one code box and moved the ellipsis two else-if cases earlier, as requested. |
| 73 | `cf38293b-13ad-4a01-91e1-05d7f041e34c` | Removed the crossed-out Kernel functions column. |
| 102 | `af6e54f6-acda-4b9a-9d9a-cc51542b3e98` | Removed the crossed-out Entry or reported cause column. |
| 106 | `f48c8de3-76a5-47a9-8415-b949101cfe3e` | Removed the crossed-out Used by column and rebalanced the diagram/table. |
| 114 | `b2386cf5-167b-49c5-af14-3d616eadad4b` | Applied stationary fade transitions to all seven heap states through Second merge at B (current slide 120). |
| 123 | `bdcecc69-4db5-4798-9056-a428a679c0dd` | Removed the crossed-out Used by column. |
| 124 | `0c4ea443-bb1c-41fa-a9e1-ffc85071ab0e` | Removed the crossed-out Used by column. |
| 127 | `3df40f5a-3655-46c7-97c5-0a952f67dfe8` | Removed the crossed-out table and expanded the diagram. |
| 129 | `124ee5e4-b4f2-438c-83d3-3889df1340d9` | Condensed the current README loading steps. The subsection is prose in the current README, so its steps are presented as short bullets. |
| 135 | `41105c89-7e72-429c-b592-649185f7e1b4` | Condensed all five README startup steps, including default/custom environment selection. |
| 141 | `1395b8ee-c3c3-480e-8e62-2db36b0c9e19` | Placed the launcher on the left. The screenshot’s crossed-out Reading the stack note was already absent; left it absent. |
| 143 | `95ee971e-cc8a-48ee-a952-5dcd0022c5f7` | Verified the PicoOS loader/PCB creation and run setup. Corrected the analogy to fork + exec / load + run. |
| 150 | `8df448ef-73ff-41ef-970e-a7f4d2bb2f5d` | Removed both crossed-out Used by columns. |
| 155 | `93a930be-b0de-415f-9722-c1532466d1c3` | Placed the complete launcher on the left and complete worker on the right, with neither example split. |
| 156 | `f8d6bae2-637d-4220-b86f-5834b9a56216` | Removed Calls; expanded Kernel function so all three names remain on one line. |
| 162 | `393fe079-df86-4a12-83bf-4a37bbfdbdb2` | Merged the complete scheduler example into one full-width box, with tighter leading. |
| 179 | `0a747ec2-be9b-434b-869b-49316c9b40ea` | Removed the crossed-out Unix: reaping note and expanded the remaining diagram. |
| 181 | `07c8ffee-61bc-4ad7-b9ed-ed1910ca06ad` | Removed Completion path and the entire lower kernel-function table; expanded the retained public-operation table. |
| 255 | `c52037df-3f0f-4210-8f37-bde800a69083` | Removed the crossed-out bootloader-function table and expanded the retained code. |
| 261 | `1aef0ee8-6100-4294-aa97-dd3d2be77003` | Merged the complete startup example into one full-width box, with tighter leading. |
| 295 | `ebdfae59-d4ac-4457-9fb4-254a82382579` | Merged the complete pipeline example into one full-width box, with tighter leading. |

## Verification

- Rendered and inspected every affected slide, the already-satisfied memory-map slide, and all seven heap states. No clipping or browser errors were found in the layout checks.
- Tall single code boxes keep all original lines; only the explicitly requested syscall abbreviation removes cases.
- Verified enlargement, zoom controls, and return to the same slide.
- Verified recording activation, playback key isolation, and restoration of slide navigation after clicking outside.
- Slide-identity, note/correction, navigation, and short-version tests pass. All 334 slide IDs, source anchors, and short-version markers are unchanged.
- SVG correction configuration reproduces the edited compiler and TSL assets exactly.
- No PDF was generated or exported.

These user-requested table/column omissions and the abbreviated syscall example intentionally depart from the original source-coverage inventory. This review does not claim the strict full-source-content audit passes. No README rebuild or source snapshot update was performed.

## Additional correction batch

Applied the subsequent pending corrections by persistent UUID, including two
screenshots saved during this review. The older completed `x_` files were not
processed again.

| Slide ID | Result |
| --- | --- |
| `d012f102-ce27-48a3-90bc-fb698ee36af3` | Replaced the example with one main, if/else, and two returns; aligned the diagram with the two explicit returns. |
| `b07062cf-0509-47d2-bce5-60199deb0bca` | Replaced the command and ANF example with real compiler output; both branches use main_epilogue. |
| `2f40f602-7242-41c9-87e4-e8f605a73715` | Replaced symbolic ReTI with the complete corresponding compiler output in balanced columns. |
| `b129a8dc-55a9-4ce5-b247-33259f0b9019` | Replaced the analogy note with concise libc services and glibc CRT startup bullets; placed the longer startup example beside its wrapper. |
| `c88b8466-2934-4c68-9ae1-1e2d31e684c0` | Replaced expansion bullets with semicolon-separated instructions. |
| `b76f2e2a-4b26-4543-b159-a815e02c8b80` | Named the 0x80000005 example, showed how its upper/lower values are obtained, and removed the crossed-out arithmetic note. |
| `512473e0-07c8-4c40-b081-248b80dba8b9` | Removed the modulo-equivalence equation; retained and centered the bootloader example. |
| `8bce7067-7572-47c6-bdae-c29f2ee54bc9` | Removed the crossed-out defaults table and expanded the assembly diagram. |
| `26f3feb1-ec31-4d4a-8379-0a9dd6437b1e` | Removed the crossed-out header table and centered the terminal example; kept hex-dump borders unwrapped. |
| `e720ab54-002a-4dae-b3e8-9c9be745c27e` | Restored two memory-header explanations with the precise startup purpose; clarified that -k is a compiler option. |
| `0dd731bf-b632-4826-9049-a7251b914a18` | Reduced the table and enlarged the memory map and its labels. |
| `b76f762b-22f9-4111-a94b-c1f872bfec7e` | Reduced the code and enlarged the TSL diagram and its labels. |
| `d964847e-9b73-4174-bfc7-26ea59781692` | Removed the crossed-out Linux comparison. |
| `fa4b4712-4473-464e-9f7f-60df243ad2c0` | Removed the crossed-out System V ABI and POSIX notes. |
| `6ba983ff-bdeb-4422-a3ae-b519df29be46` | Kept the complete startup heading and (1) suffix on one line within the slide margins. |
| `6ce48ef8-591c-49ae-a58e-f7a99576e37f` | Swapped the startup examples; the longer start.picoc is on the left with more width. |

### Sources and interpretation

The replacement epilogue example and actual generated stages are saved in
[docs/examples/shared-epilogue](examples/shared-epilogue/README.md).

The libc note describes glibc specifically: libc supplies C runtime services,
and its CRT objects supply `_start`, which calls `__libc_start_main` before
`main` and exit. Verified against the primary glibc
[startup source](https://github.com/bminor/glibc/blob/master/sysdeps/x86_64/start.S),
[CRT build rules](https://github.com/bminor/glibc/blob/master/csu/Makefile), and
[GNU C Library project description](https://sourceware.org/glibc/).

Recovered original memory-header bullets from presentation commit `1bee8e4`:
“-k sram / eprom: header-only generation” and “Then compile: include generated
header”. PicoOS README section 1.1.9 and its Makefile header/build rules confirm
the compiler generates addresses from the linked layout, then compilation
embeds them for bootloader/kernel register setup and heap initialization.
The bootloader includes both generated headers, initializes its own DS/stack,
and discards the kernel image's heap fields. Thus the header supplies constants
before ordinary process loading can establish a runtime context.

The removed LOADI32 equation proves equality of the low 32 product bits for
signed/unsigned upper fields. It is a valid supporting proof in README section
1.1.7.2, but is not required for the instruction expansion or bootloader example.
The retained example directly explains the signed conversion and low-bit split.

The command-options correction for `9204e2d0-4668-4d63-b517-fcc62df0f1ea`
remains unresolved: that exact slide is absent. Its reviewed `list-8353` group
is recorded with `omitLists: true` in `config/readme-slide-selection.json`.
No current slide was substituted by its number or title.

All 333 surviving persistent identities and source anchors are preserved; the
explicitly requested duplicate deletion is recorded below. Later slide numbers
and pending short-version choices were remapped by UUID. Concurrent user
short-version selection edits made during this review are retained.
No README rebuild, snapshot update, or PDF export was performed. Presentation
corrections intentionally replace/omit some source artifacts, so strict original
source-content coverage is not claimed. The SVG correction configuration
reproduces all three edited diagrams from the original PicoOS SVGs.

### Corrections saved during the review

- `9e2731c3-c572-4d7f-9ad0-078edba26eb5`: adopted the requested kernel/init distinction in the responsibilities table.
- `53bcf41c-58cb-42b8-b736-411b5ef70f26`: merged the complete init session into one full-width code box with tighter leading.
- `5bd4796d-e12d-4c12-8c43-d26718e7685e`: the later Markdown correction superseded the earlier screenshot's column swap. Replaced the duplicated libstart code with a shell-specific startup flow, verified against `user/shell.picoc` main and README 11.3.4.
- `586ab56d-c506-40eb-bd57-d5ca8a404017`: deleted this exact redundant application-startup slide as explicitly requested. Both the README generation comments at 11.3.4/11.3.5 and the generator's `repeated` map deliberately requested identical libstart examples at each runtime stage. This explains the duplication; the new correction overrides that prior presentation choice.
- `254c42e4-b819-464d-8cb8-732df8a5e942`: its new screenshot shows an older introduction layout, while the associated UUID currently holds inspection commands/tables. The crossed-out phrase was already absent. Added the requested concise registers/memory/peripherals inspection note to the slide identified by the stored UUID, without substituting another slide by title or number.

The viewer now also inlines SVG data URLs, which Vite produces for small
assets. Verified vector label selection, zoom controls, full code retention,
and return to the same slide in both normal and selectable-text previews.
All affected layouts passed bounds, alignment, and table-clipping checks.
The final shell flow and the slide following the duplicate deletion were
reviewed again. Identity, note/correction, navigation, and short-version tests
pass; `git diff --check` passes. The source snapshot records its original
334-slide generation; this correction batch reduces the current deck to 333
without adopting a new README commit or rewriting that historical snapshot.

Completed this additional batch: 10 Markdown files (14 checked bullets) and 10 screenshots. Completed files and image sidecars have the `x_` prefix. The missing-identity command-options correction remains unchecked.

## Final pending batch: startup consistency, ABI, syscalls and library example

Completed four Markdown files (five unchecked bullets) and one annotated
screenshot, matched by their stored persistent `slide_id`. Completed Markdown
bullets are checked; all five files and the screenshot sidecar have `x_` prefixes.
Previously completed correction content was not processed again.

- `2814405e-f7c3-4011-8d19-e9751be78c74`: interpreted both “keep consistent”
  annotation rectangles as requests for identical startup and next-function
  wording across init, shell and user applications. All three now show
  `-C library/start/libstart.picoc` and `main()`.
- `72e18091-38e6-4018-a9a1-48f57ef8c058`: replaced the ABI remark with three
  concise bullets: binary contract, argument/register/stack/file rules, and
  PicoOS's ReTI adaptation. Checked the general definition against the primary
  [System V ABI specification](https://www.sco.com/developers/gabi/) and its
  [low-level system interface chapter](https://www.sco.com/developers/devspecs/gabi41.pdf).
- `e0885272-03d0-4677-b7f0-e46b49a56218`: kept the syscall-section waitpid
  example and rewrote the six existing chapter 10.1 example slides around
  `getpid()`. Header/linking, selector/registers, wrapper/helper, SRAM storage,
  and entry/return now follow this simpler call. Updated the section overview's
  display names while retaining its navigation anchors.
- `cf38293b-13ad-4a01-91e1-05d7f041e34c`: added selector ranges 0–1, 2–11,
  12–14, 15–20, 21–28 and 29–36, plus the total of 37 syscalls. The negative
  load-continuation return sentinel is not a syscall selector.
- `9204e2d0-4668-4d63-b517-fcc62df0f1ea`: resolved the previously missing
  target by recovering the exact UUID's authored slide from the parent of
  commit `f54d3ca`. Restored that identity, retained every original command
  bullet and nested bullet, and split the list into two readable pages. The
  existing terminal session is now the third page; its counter-result notes
  are retained there. Enabled the previously omitted source-list selection.
  This completes the correction previously recorded above as unresolved.

PicoOS facts and snippets were verified locally against
`library/unistd/unistd.header`, `library/unistd/process.picoc`,
`library/unistd/libunistd.picoc`, `common/syscall.header`,
`kernel/syscall.picoc`, and README section 13.2.1. The two new getpid diagrams
are selectable SVGs in the deck's existing palette with sharp rectangular boxes.

All 333 pre-existing slide identities, source anchors and exclusion markers
are retained. The recovered slide and its new continuation bring the deck to
335 slides. Pending short-version choices were remapped using the corresponding
UUIDs. No new README revision was adopted or source snapshot rewritten.

Rendered and inspected the affected content slides and chapter 10 overview.
Final bounds/clipping checks reported no issues or browser errors. Verified
code, diagram and command-list enlargement, viewer controls, vector text and
return to the same slide. Identity, note/correction, navigation and short-version
tests pass. No PDF was generated or exported. The chapter 10 example intentionally
replaces the README's waitpid material, so strict original-source coverage is
not claimed and a README rebuild was not run.

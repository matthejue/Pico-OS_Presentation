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

# Source review · 4 October 2026

The presentation uses the README at PicoOS commit
`4d1fa5047c14aa80121a76850b75c2c0319147f6`, including uncommitted edits to
Contents link labels. `.source/Pico-OS-README.md` stores its exact bytes;
`.source/source-state.json` records the commit, SHA-256, dirty state, date,
and slide count. The full deck has 290 slides; the short deck has 285.

## Content and composition

The title slide is preserved exactly. Slide titles follow the README section
order, exact headings, and complete ancestor hierarchy. Subtitles are numbered
from `(1)` when a section spans multiple slides. Introductions without separate
content appear in descendant titles.

The coverage inventory tracks all 345 substantive source artifacts:

| README content | Presentation treatment |
| --- | --- |
| 109 code examples | Complete; long examples split into balanced columns |
| 38 Mermaid diagrams | Complete original source and layout directives |
| 136 tables | 126 retained; 10 internal-only function catalogs omitted |
| 32 images and SVGs | Original composition; shared presentation styling |
| 1 terminal recording | Local inline asciinema playback |
| 29 lists | Every substantive source item represented by brief bullets |

The title page uses the project title and toolchain artwork. The two README
navigation lists are replaced by a contents slide immediately after the cover,
linking to each populated major section's overview. Each numbered major section starts with a linked overview
of every README subsection, with individual slide links for continuation pages.
The overview uses the active deck's slide metadata, so filtering or renumbering
does not leave stale links. Headings without their own slide link to an available
descendant; empty branches and chapters are omitted from navigation. Ancestor
headings link back to their major section overview; each overview links back
to Contents. Slide text stays brief, with bullets for multiple items and plain
text for single statements, values, headings, and notes. A multi-item table cell
requires bullets in all nonempty cells of its column on that slide, across both
panels when split. Matching list panels and card detail fields also keep their
formatting consistent within the slide. Hardware slides include the FPGA, SRAM, UART adapter,
connections, individual prices, and total from the README.

Function tables retain operations exposed through or called by a library,
either directly or through a syscall. The 104 omitted internal rows and their
reasons are recorded in the inventory. Nonessential table columns are removed;
row order and function names are retained. Tables use reviewed column widths,
balanced continuation pages, and equal halves where suitable. Libraries,
built-ins, and applications use grids.

Related artifacts within the same subsection share slides. The original and
extended compiler pipelines are stacked; C and PicoC linking diagrams sit side
by side. Long code examples use two full-width column boxes, with the extra
line in the left half when necessary. Command strips sit above their related
code. Every original code line remains present, including split boundaries.

Reviewed merges cover 38 subsections and remove 41 unnecessary slide breaks.
Build and run combines its commands and launcher-options table. Stacked
composition panels preserve the existing column proportions and give each
panel height according to its content. `config/readme-composition.mjs` stores
these arrangements; changed source compositions require a fresh review.

List labels and selected keywords use bold color emphasis. Original and
Extended compiler pipelines have amber and cyan labels and matching panel
edges. Table keys and inline code use cyan; contextual comparison labels use
amber. Authored wording stays unchanged. `styles/readme-emphasis.css` contains
the scoped emphasis and composition styles.

Side-by-side content aligns at the top, including code, tables, diagrams, and
lists within columns and stacked composition panels. Standalone visuals stay
vertically centered in their panels. Command strips and their examples form
one group. The RETI execution model's address map and usage table share a slide.

All 70 column layouts were reviewed at slide size. Columns use unequal shares
where the content benefits: the hardware details use 39% for the short list and
61% for the table. Its text is about 75% larger than with the previous equal
split. Paired code boxes and tables use compatible text sizes; split code keeps
every original line. Four table-cell width profiles were adjusted to avoid tiny
wrapped remainders after resizing.

`docs/readme-coverage.json` maps each artifact to source lines, hashes, and slide
placements. It records retained/omitted table rows, selected columns, list-item
indices, and code-part counts. README comments requesting repeated startup,
interrupt-table, and waitpid examples are honored. `yarn test:source` verifies
complete code and Mermaid bodies, reviewed table cells and selections, every
summarized source list item, copied image fidelity, brief prose, and the cover.

SVG copies in `public/readme/` retain coordinates, paths, labels, and composition.
Only colors, font, and rectangle corners change. The raster image is unchanged.
Mermaid source and layout directives remain intact; the renderer applies the
shared cyan, amber, and green palette and sharp rectangle corners. Diagrams
are not recomposed.

`ReadmeVisual` fits complete visuals into the available area. Click-to-enlarge
provides the unscaled content with zoom, scrolling, text selection, and return
to the same slide. Unix/Linux, POSIX, System V, argc/argv/envp, init, and
fork/exec versus load/run comparisons appear in brief contextual fact boxes.

## Source and update workflow

No `AGENTS.md` or `agents.md` was found in the checkout or its parent paths.
This revision follows the supplied `presentation.md`, `update-presentation.md`,
and `short-version.md` in
`/home/areo/Documents/AI-Vault/skills/PicoOS_Presentation/`, with the user's
latest instructions taking precedence.

Source changes are reviewed against the saved README bytes. The latest source
delta changes only Contents link labels; headings and substantive artifacts
remain unchanged. The saved snapshot and dirty flag include these edits.

`scripts/rebuild-from-readme.mjs` combines the original artifacts with reviewed
`config/readme-lists.json`, `config/readme-prose.json`, and
`config/readme-facts.json`. Table selection and short descriptions are authored
in `config/readme-tables.mjs` and `config/readme-table-cells.json`; reviewed
widths are in `config/readme-table-widths.json`. `config/title-slide.md` stores
the unchanged cover. This is an artifact-based reconstruction with reviewed
summaries and layouts, rather than a remap of old heading names.

`config/readme-columns.json` records reviewed column shares and native widths
for paired tables. SVG diagrams scale through their own viewBox so sequence
labels and shapes render together correctly in Chromium; their layout remains
unchanged.

For future updates:

1. Apply pending numbered short-version choices before editing.
2. Compare the saved source with the current README; inspect source git history
   and README working-tree changes.
3. Review changed artifacts, headings, summaries, facts, table selection, and
   composition. Preserve short-version choices with the corresponding content.
4. Rebuild with `PRESENTATION_SOURCE` pointing to the exact candidate README.
   Audit source coverage, build, and check production plus both development
   variants before replacing the previous source baseline.
5. After success, save the exact source bytes and metadata, then synchronize
   numbered short-version choices from the relocated markers.

Existing exclusions follow unchanged artifact hashes, even when source lines
move. Their merged placements now occupy five full-deck slides:
4, 6, 7, 8, and 11. Changed assets and layouts need review.

## Verification

The navigation update passed full and short static builds and the existing
browser checks across all 290 slides in normal development. Additional checks
covered contents, all 17 overviews, ordered populated headings, every slide
link, breadcrumb returns, return-to-contents links, content bounds, larger
titles, pointer clicks, and keyboard navigation in full and short decks.
An isolated fixture removed chapter 2, a whole subsection branch, and one leaf,
then added chapter 18. Empty branches disappeared and the new chapter appeared
without changing destination code. Rebuilding reproduced the generated slides,
overview data, and coverage inventory exactly.

Representative nine-page PDF samples were exported in both variants. Their
151 navigation annotations per variant were checked through `pdfunite` and the
finalization step, with blank destination pages filling unexported positions.
Every annotation became an internal destination to the correct final page,
including cross-chunk links and overview/contents/breadcrumb return links.

Earlier browser checks passed across the original 272 slides in production,
normal development, and selectable-text development.
They cover source hierarchy, numbering, content bounds, vertical centering, full-width code boxes,
table clipping, Mermaid/XML rendering, enlarged visuals, complete enlarged
code, scrolling, text selection, navigation, and inline asciinema playback.
All 116 table/grid pages were checked for clipping. The reviewed table widths,
wording, and column proportions from the preceding review remain in place.

The `m`, `Alt+A`, and `Alt+S` shortcuts passed against the real development write
endpoints in both modes; test edits were restored. Short-version unit checks
and source coverage passed. Representative compiler diagrams, hardware,
code columns, tables, and inventory grids were inspected at slide size.

PDF exports for this update were temporary verification samples. No PicoOS tests
were run, and `speaker-notes.md` was not edited.

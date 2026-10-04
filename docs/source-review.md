# Source review · 4 October 2026

The presentation uses the README at PicoOS commit
`4d1fa5047c14aa80121a76850b75c2c0319147f6`. The source README has no
uncommitted changes. `.source/Pico-OS-README.md` stores its exact bytes;
`.source/source-state.json` records the commit, SHA-256, dirty state, date,
and slide count. The full deck has 314 slides; the short deck has 306.

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

The two Contents/navigation lists are replaced by the prescribed seven-topic
cover outline. Ordinary prose, list items, contextual facts, and verbose table
cells use brief bullets. Hardware slides include the FPGA, SRAM, UART adapter,
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
delta concerns section 16, Use of AI in the project. Its slide bullets were
updated alongside this revision of the deck's wording and composition.

`scripts/rebuild-from-readme.mjs` combines the original artifacts with reviewed
`config/readme-lists.json`, `config/readme-prose.json`, and
`config/readme-facts.json`. Table selection and short descriptions are authored
in `config/readme-tables.mjs` and `config/readme-table-cells.json`; reviewed
widths are in `config/readme-table-widths.json`. `config/title-slide.md` stores
the unchanged cover. This is an artifact-based reconstruction with reviewed
summaries and layouts, rather than a remap of old heading names.

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
move. Their combined or split placements now occupy eight full-deck slides:
3, 4, 6, 7, 8, 9, 12, and 13. Changed assets and layouts need review.

## Verification

The full and short production builds passed. Browser checks passed across all
314 slides in production, normal development, and selectable-text development.
They cover source hierarchy, numbering, content bounds, full-width code boxes,
table clipping, Mermaid/XML rendering, enlarged visuals, complete enlarged
code, scrolling, text selection, navigation, and inline asciinema playback.
All 117 table/grid pages were inspected; table widths and wording were adjusted
to avoid tiny wrapped remainders.

The `m`, `Alt+A`, and `Alt+S` shortcuts passed against the real development write
endpoints in both modes; test edits were restored. Short-version unit checks
and source coverage passed. Representative compiler diagrams, hardware,
code columns, tables, and inventory grids were inspected at slide size.

No PDF was exported, no PicoOS tests were run, and `speaker-notes.md` was not
edited.

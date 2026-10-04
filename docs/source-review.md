# Source review · 4 October 2026

The presentation follows the current PicoOS README, including its uncommitted
changes. `source-state.json` records the repository commit, exact source hash,
dirty state, and slide count. `.source/Pico-OS-README.md` contains the input bytes.
The full deck has 374 slides; the short deck has 367.

## Content and composition

The title slide is preserved exactly. Every other slide follows the current
README section order, exact headings, and complete ancestor hierarchy.
Subtitles are numbered from `(1)` when a section spans multiple slides.
Introductions without separate content appear in descendant titles.

All 345 substantive source artifacts are included:

| README content | Included |
| --- | ---: |
| Complete code examples | 109 |
| Complete Mermaid diagrams | 38 |
| Tables, with all columns and rows | 136 |
| Original images and SVG diagrams | 32 |
| Inline terminal recording | 1 |
| Lists, with each item represented in a shorter form | 29 |

Only the two Contents/navigation lists are replaced by the prescribed seven-topic
cover outline. The user's requirement to include all tables and complete
examples takes precedence over the earlier instructions to filter function
catalogs or omit columns. Tables continue across slides when necessary, with
headers repeated. Code examples are never excerpted or shortened.

`docs/readme-coverage.json` maps each artifact to its source lines, source hash,
and slide placements. Table placements also record row ranges. README comments
requesting repeated startup, interrupt-table, and waitpid examples are honored.
`yarn test:source` verifies complete code and Mermaid bodies, every table header
and cell, every summarized list item, copied image fidelity, and the title slide.

The SVG copies in `public/readme/` retain source coordinates, paths, labels, and
composition. Only the palette, font, and rectangle corners change. The raster
image is copied unchanged. Mermaid source and layout directives remain intact;
the renderer applies the shared palette and square rectangle corners. Sequence
diagrams retain their complete participants, messages, and repeated actor boxes.
No diagrams are replaced by a new composition.

`ReadmeVisual` fits each complete artifact into its slide area. The zoom viewer
opens the unscaled content, including all lines of long examples. Cyan, amber,
and green accents are consistent across diagram types and tables. Unix/Linux,
POSIX, System V, argc/argv/envp, init, and fork/exec versus load/run comparisons
appear as small contextual notes. The slide design emphasizes OS mechanisms.

## Source and update workflow

No `AGENTS.md` or `agents.md` was found in the checkout or its parent paths.
This revision follows the supplied `presentation.md`, `update-presentation.md`,
and `short-version.md` in
`/home/areo/Documents/AI-Vault/skills/PicoOS_Presentation/`, with the user's
latest content-preservation requirements taking precedence.

The source comparison uses the saved README bytes and current working README,
not heading-name substitution. The revised composition is encoded in
`scripts/rebuild-from-readme.mjs`, the original artifacts, and the reviewed
`config/readme-lists.json`, `config/readme-facts.json`, and
`config/readme-prose.json`. `config/title-slide.md` stores the unchanged cover.
Rebuilding the current source reproduces the reviewed deck byte for byte,
including its short-version markers.

For future updates:

1. Apply pending short-version numbers to slide markers before editing.
2. Compare the saved source bytes with the current README and inspect its git
   history and working-tree changes.
3. Review content and composition, including the authored summaries and notes.
   Preserve short-version choices when sections or artifacts change. The script
   matches unchanged artifact groups by content hashes and row ranges, even
   when source line numbers move; changed groups need review.
4. Rebuild and verify coverage with `PRESENTATION_SOURCE` pointing to the exact
   candidate README. Check production and both development launch variants.
5. After success, save the source snapshot and metadata, then synchronize the
   numbered short-version selection from the relocated markers.

The previously excluded content remains excluded. Splitting the source tables
places it on seven full-deck slides: 3, 5, 6, 7, 8, 12, and 13.

## Verification

The full and short production builds passed. Browser checks passed across all
374 slides in production, normal development, and selectable-text development.
They cover heading hierarchy, source markers, subtitle numbering, content
bounds, Mermaid/XML rendering, complete enlarged code and diagrams, scrolling
through the longest example, text selection, navigation, and inline local
asciinema playback with play/pause and seeking.

The `m`, `Alt+A`, and `Alt+S` shortcuts passed against the real development write
endpoints in both modes. Test edits were restored. Short-version unit checks
and the source coverage audit passed. Representative source SVGs, memory maps,
code, and the complete startup sequence were also inspected at slide size.

No PDF was exported, no PicoOS tests were run, and `speaker-notes.md` was not
edited.

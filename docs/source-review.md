# Source review · 7 October 2026

The presentation uses PicoOS README commit
`551620232ed915a92e442891eafd03619b2a2d5e`. The README matches that commit.
The previous source was commit `4a8c95017f28572d575993e72561d2380465edba`
with uncommitted compiler-pipeline corrections. The update compares both the
commit history and the exact saved README bytes, so those corrections remain
part of the old-content comparison.

`.source/Pico-OS-README.md` stores the exact current input;
`.source/source-state.json` records its commit, SHA-256, dirty state, update
date, and slide count. The full deck contains 361 slides; the shortened deck
contains 356. The cover, saved cover note, recording, keyboard shortcuts,
source markers, and all five short-version exclusions are preserved.

## Visualizations and source coverage

The current inventory covers 387 substantive README artifacts:

| Source content | Presentation treatment |
| --- | --- |
| 124 code examples | Complete source; balanced columns for long examples |
| 139 tables | 129 retained; 10 internal-only catalogs omitted |
| 92 images | 91 SVGs and one PNG; exact source bytes |
| 1 terminal recording | Local inline asciinema playback |
| 31 lists | Every substantive item represented by brief bullets |

The 38 former Mermaid diagrams are replaced by their current SVG versions.
Every existing README image is refreshed. The source images already match the
presentation style, so no recoloring, font replacement, corner changes, or
coordinate changes are applied. Source coverage checks compare the complete
copied image bytes with PicoOS.

[Visualization changes](visualization-update.md) maps each former Mermaid
figure to its replacement, current README section, and generated slide numbers.
It also records moved headings and the expanded process, interrupt, scheduler,
waitpid, terminal, startup, shell, and shared-mutex views.

The expanded storage diagrams receive the complete slide width. Shell
redirection has five separate stage diagrams, and producer/consumer pipeline
views have separate slides. Tall linking diagrams still share columns; wide
compiler comparisons remain stacked. The 81 column layouts retain reviewed
proportions where their content still matches. Added table descriptions are
brief, and the library-dependency summaries reflect the new local syscall
helpers. Metadata calculations use readable table values instead of raw LaTeX.

The enlarged viewer loads local SVGs as vectors with selectable labels. Zoom,
fit, scrolling, focus return, and closing preserve the current slide. Source
files on disk stay unchanged.

## Navigation and persistence

Headings and breadcrumbs follow the current README hierarchy. Process stack
and inheritance topics now sit under 4.2; termination collection sits under
7.1.2; signals and mutexes are 7.2 and 7.3; the application inventory is 13.2.
Contents and all 18 section overviews derive destinations from the active deck.
Expanded hierarchies can use four measured columns with compact spacing.
Continuation badges accommodate pairs of three-digit slide numbers, so long
subsections do not create tall single-badge stacks. Topic fonts remain at least
10 px at the presentation’s native size.
The complete wait-library code is repeated where the README requests it.

Source-line IDs in the authored list, table, width, column, prose, fact, and
composition settings were remapped by matching source artifacts and heading
meaning. 246 previous slide UUIDs were retained through mapped content. Split,
merged, or replaced compositions without a unique association have distinct
UUIDs. The saved note remains attached to the unchanged cover UUID. Subsequent
regeneration preserves the resulting IDs.

All five short-version exclusions remain on full-deck slides 5, 7, 8, 9, and 12.
The numbered selection file is synchronized with the slide-local markers.

## Update workflow

Follow the supplied `presentation.md` and `short-version.md` in
`/home/areo/Documents/AI-Vault/skills/PicoOS_Presentation/`. No AGENTS.md was
found in this checkout or its parent paths.

1. Apply pending numbered short-version selections.
2. Compare the recorded commit and exact source snapshot with the candidate.
3. Remap moved headings and source artifacts, then review layout and summaries.
4. Rebuild using `PRESENTATION_SOURCE`, check coverage, build, and verify the
   rendered deck before replacing the previous source baseline.
5. Save the exact successful source bytes and metadata, then synchronize
   short-version selections.

The generator copies current images unchanged. The coverage inventory records
source hashes, lines, retained/omitted rows, and placements. Changes to source
line numbers require matching and reviewing the authored configuration keys;
source line numbers alone are not content identities.

## Verification

Validation covers complete source artifacts, full and short static builds,
rendered content bounds, README hierarchy and numbering, dynamic overview
links, enlarged SVG label selection, zoom controls, code selection, keyboard
navigation, recording playback, slide identities, notes, short-version
filtering, and navigation destination conversion. Representative diagrams
were inspected at slide size, including expanded memory and descriptor views.
Regeneration is checked for identical slide bytes, UUIDs, overview data, and
coverage inventory.

No PDF was generated. Existing PDFs, packaged archives, and `speaker-notes.md`
were not edited. No PicoOS program tests were run.

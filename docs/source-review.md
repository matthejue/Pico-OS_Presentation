# Source review · 7 October 2026

The presentation realizes the committed PicoOS README at
`7647e8be5d3c7b3f9ff3f92c6a00be29ca92517c`, compared with the requested baseline
`4a8c95017f28572d575993e72561d2380465edba`. The previous presentation had already
adopted the newer visualizations in `f58cd7171a2710fd617f5bdb603966ef1a1c3022`.
This update keeps those source assets and reviews the accompanying prose,
examples, tables, section hierarchy, and layout rules across the entire deck.

The source repository advanced during review. Its final commit removes the
appendix's negative-offset hexyl example; that example is also removed here.
Only committed source bytes are used. The source repository was not edited.

The full deck has 341 slides, compared with 361 previously; the short deck has
336. Neighboring content was merged where it fits. The title page, saved cover
note, recording, shortcuts, zoom viewer, and five short-version exclusions are
preserved. Exclusions now occupy full-deck slides 5, 6, 7, 8, and 11.
306 existing slide UUIDs remain. New or substantially changed compositions have
separate identities; regeneration preserves the resulting UUIDs.

## Content and structure

Every README heading and prose section was reviewed. Missing explanations now
appear as concise bullets or nested bullets alongside the relevant artifacts,
including loading and startup, stack layout, environment copying, shared-memory
lifetimes, scheduling, waitpid, signals, mutex races, terminal ownership,
descriptors, library dependencies, shell behavior, tests, and teaching examples.
Statements that repeat the complete source visuals remain omitted.

POSIX, Unix/Linux, System V ABI, init/PID 1, compiler, and instruction-set
comparisons appear as short contextual remarks. The heap-color legend now
matches the source figures. Authored summaries are rendered even when a section
also contains diagrams, tables, or code; the previous generator silently lost
many such summaries.

Titles follow the current README order and hierarchy. The ancestor line contains
only actual preceding headings; the current heading is the main title.
Top-level headings have no invented ancestor. The opening content is
Introduction (1) and Introduction (2), without subtitles. Contents and all 18
section overviews derive their links from the active full or short deck.

## Source coverage and layouts

| Source content | Presentation treatment |
| --- | --- |
| 123 code examples | Complete source, shared headers, balanced long examples |
| 138 tables | 128 retained; 10 internal-only function catalogs omitted |
| 92 images | 91 SVGs and one PNG, copied byte for byte |
| 1 terminal recording | Local inline asciinema playback |
| 31 substantive lists | Concise items and nested structure |
| 2 equations | Complete mathematical expressions |

The two README navigation lists are replaced by Contents and section overviews.
All retained tables keep their source columns, including types, callers,
implementation dependencies, and syscall relationships. Internal function rows
are filtered only according to the supplied library-facing rule.

Every code box fills its slide or column width. A consistent header identifies
the named source file, example, or terminal; split boxes also show their line
ranges. Host and PicoOS command fixtures use the appropriate prompts. Code
coverage reconstructs every original example from its split parts.

Wide, short content is stacked; tall content uses columns. Reviewed merges cover
metadata, constants, interrupt handling, registers, shared-memory declarations,
startup, applications, and test examples. Long examples and tables are balanced
with the longer part on the left, their tops aligned, and the complete group
centered. Code and table text on the same slide use compatible sizes. The
complete enlarged viewer remains available for dense source content.

The dispatcher restoration diagram and code use separate slides to keep both
readable. Compact stacked examples subtract their accompanying list from the
available code height, including when the example uses nested columns. This
prevents groups from extending into the title or footer.

## Review records and reproducibility

- [Source inventory](readme-coverage.json): source hashes, lines, exact image
  hashes, retained/omitted rows, code parts, and slide placements.
- [Prose review](readme-prose-review.json): all 257 README headings, paragraph
  hashes and lines, reviewed summaries/remarks, and placements or visual treatment.
- [Rendered slide audit](slide-audit.json): each slide's title, source anchor,
  visual types, displayed text sizes, and layout issues.
- [Visualization mapping](visualization-update.md): previous Mermaid figures,
  current SVGs, moved sections, and updated slide numbers.

The dated README and metadata pair in `.source/` records the exact validated
commit and SHA-256. The previous pair is retained in `.source/history/`.
[Source history](source-history.md) describes the commit-pinned save workflow;
it preserves uncommitted source edits without including them in the deck.
The earlier 17 recovered pairs remain intact.

Authored configuration IDs were remapped by source content and section meaning.
Regeneration is checked for identical slide bytes, UUIDs, overview data,
coverage, and prose review. Coverage checks require every reviewed summary and
standards remark to appear in the generated slides and retain all table columns.

## Verification

Checks cover complete source content, full and short static builds, every
rendered slide's bounds and alignment, exact titles and numbering, dynamic
contents/overview links, enlarged vector labels, code selection, zoom controls,
recording playback, shortcuts, notes, stable identities, short-version filtering,
and navigation destination conversion. Normal and selectable-text development
previews are checked as well. Representative layouts are inspected visually.

No PDF was generated. Existing PDFs, packaged archives, and speaker-notes.md
were not edited. No PicoOS program tests were run.

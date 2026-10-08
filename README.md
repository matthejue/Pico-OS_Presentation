# PicoOS presentation

Slidev presentation generated from
`/home/areo/Documents/Studium/Pico-OS/README.md`.

```sh
yarn install
make launch-presentation-with-selectable-text
```

This target opens the `/selectable-text/` variant, which keeps ordinary text
selection enabled on slides. Use `make launch-presentation-in-browser` for the
normal Slidev presentation behavior.

In VS Code, use `Ctrl+Shift+P` → `Tasks: Run Task` to choose a clearly named
presentation task.

To export a PDF:

```sh
make generate-presentation-pdf
```

Build the static presentation with:

```sh
make build-static-presentation
```

## Short presentation

While reviewing the full deck in the Slidev development server, press `m` to
toggle the current slide in [`short-version-disabled-slides.txt`](short-version-disabled-slides.txt).
Press `Alt+A` (**Apply**) to persist that selection as slide-local markers,
and press `Alt+S` (**Sync**) after a deck update to regenerate the numbered
text file from those markers.

Run or generate the filtered deck with:

```sh
make launch-short-presentation-in-browser
make launch-short-presentation-with-selectable-text
make build-short-static-presentation
make package-short-static-presentation
make generate-short-presentation-pdf
```

The full selection workflow, standalone scripts, static package target,
environment variable, update ordering, and failure behavior are documented in
[short presentation version](docs/short-version.md). Existing presentation
targets continue to produce the full deck.

## Slide notes and corrections

Press `Alt+N` on a slide to add or edit its Markdown note, and
`Ctrl+Enter` / `Cmd+Enter` to save. `Alt+Shift+N` toggles the notes panel at the
upper right. The same actions are available as buttons.
Use `Alt+C` to edit correction bullets (`- correction text`) and `Alt+Shift+C`
to show or hide corrections below the notes, near the vertical center.
Press `H` to show both sets of buttons and shortcut hints. Both displayed
blocks are larger and slightly transparent; the editor retains its size.
The correction editor's **Save clipboard image** button saves an annotated
screenshot into `Corrections/` with a metadata sidecar.

Notes are saved in `notes/` with the slide number, title, and a persistent UUID
in the filename. The UUID keeps each note linked when slides move or are
renumbered, and the README rebuild preserves it when the slide can be matched
unambiguously. Editing requires the development server; static presentations
include saved notes, corrections and screenshots for viewing. Correction
Markdown and screenshot sidecars use `slide_id` as the authoritative
association; their readable filenames track the current number and title.
See [slide notes and corrections](docs/slide-notes.md) for
identity rules, draft recovery, and concurrent-edit handling.

## Releases

Pushing a tag whose name starts with `v` builds and uploads four assets to the
matching GitHub release:

- `picoos-presentation.pdf`
- `picoos-presentation-static.tar.gz`, containing the browser presentation and an
  Ubuntu launcher script.
- `picoos-presentation-short.pdf`
- `picoos-presentation-short-static.tar.gz`, containing only the shortened deck
  and the same Ubuntu launcher script.

Manual workflow runs also build and upload all four files as workflow artifacts.

After committing and pushing the release changes, create the release tag with,
for example:

```sh
./create_tag.sh v1.0.0 "v1.0.0"
```

To present on Ubuntu, download the static archive from the release and run:

```sh
tar -xzf picoos-presentation-static.tar.gz
cd picoos-presentation-static
./start-presentation.sh
```

Open <http://127.0.0.1:8000/> in your browser. The script installs Python 3 if
needed; Node.js and Yarn are not required. See the included
[Ubuntu instructions](docs/static-presentation.md) for presenter view, setup,
and offline font behavior.

To build the same archive locally, run `make package-static-presentation`.
Use `make package-short-static-presentation` for the shortened archive. The full
and short static builds use separate `dist/` and `dist-short/` directories.

The slide source is
[`slides.md`](slides.md); global styling is in [`styles/index.css`](styles/index.css).
Each slide contains an invisible `SOURCE` comment that maps it back to a stable
Pico-OS README heading. The exact input bytes are saved in
[`.source/Pico-OS-README-2026-10-07.md`](.source/Pico-OS-README-2026-10-07.md),
with their commit, hash, dirty state, date, and slide count in
[`.source/source-state-2026-10-07.json`](.source/source-state-2026-10-07.json).
Each source update archives the previous dated pair in `.source/history/`.
Run `yarn source:compare` before updating slides and `yarn source:save` after
validation. The repository rule, recovered versions, and complete workflow
are in [source history](docs/source-history.md).
The current revision and update workflow are documented in
[source review](docs/source-review.md).

The titles reproduce the README hierarchy: preceding heading levels are joined
with middle dots in the smaller ancestor line, and the current heading is the
main slide title. Top-level content has no ancestor line.
Sections spanning multiple slides use consecutive `(1)`, `(2)`, … suffixes.
Function catalogs retain operations exposed through or called by a library,
directly or through a syscall. Internal-only operations are omitted. Table
descriptions use brief text; columns and widths are reviewed for readability.
The title page focuses on PicoOS and the toolchain artwork. A contents slide
immediately follows it, linking to the overview of each major README section.
Each overview has a larger title and a clickable subsection hierarchy. Click
a topic to jump to its first slide, or a numbered link to choose an individual
slide. Click the major section title in a content slide's ancestor heading to
return to its overview; every overview also links back to Contents.
Section introduction slides appear in the first TOC entry, **Section Introduction**,
above the subsection hierarchy, with individual slide-number links.

The unnumbered opening README topics form section **0. Introduction**, whose
overview follows Contents. The README's opening **PicoOS** heading appears as
**Introduction** in the presentation, including **Introduction (1)** through
**Introduction (2)**. Its descendants use the linked ancestor **Introduction**,
followed by any deeper README ancestors. Source anchors keep their README names.

Shortcut hints start hidden in every presentation version. Press **H** to show
or hide the content-slide control reminders and the overview's “Choose a topic
or slide number ↗” hint. The setting persists while navigating and resets to
hidden on reload. The same setting controls the contents prompt, note and correction buttons
(which always show their shortcuts when visible), and visual viewer help.
Development editing reminders appear when hints are shown.

Navigation follows the generated README hierarchy and the active full or short
deck. Dense section overviews adapt to four measured columns, with continuation
slide numbers wrapping in pairs. Empty branches and sections disappear; ancestors remain when descendants
have content. Section overviews and Contents are maintained automatically when
content slides are excluded. The full deck contains 334 slides. The short deck follows the saved exclusions. Slides load on demand to
avoid rendering the entire diagram-heavy deck in the background.

## Preserving the README content

The source inventory tracks 387 substantive README artifacts: 123 code
examples, 138 tables, 92 images (91 SVGs and one PNG), one terminal recording,
31 lists, and two equations. The 38 former Mermaid diagrams now use their current source SVGs. All code, diagrams, images, recordings, and retained list
items are represented. Sixteen source lists in section 2 are intentionally omitted.
Tables retain the reviewed library-facing operations;
ten internal-only function catalogs are omitted. Retained tables keep all source
columns, including callers, dependencies, types, and syscall relationships.
The two README navigation
lists are replaced by the dynamic contents slide and section overviews.

Ordinary slide text and table descriptions stay brief. Use bullets for multiple
items; single statements, table values, card headings, and notes use plain text.
Every list must contain at least two items. Each table cell, list panel, and card
detail field follows this rule independently, even when neighboring content
uses bullets. Code and diagram
bodies stay complete. Long code examples split into balanced columns, with
boxes filling their column width. Related assets share slides where they fit;
application, library, and built-in catalogs use compact grids. The hardware
slides include the setup, wiring, and README price estimates.

In section 1, the first **Shared function epilogue and return values** slide
retains its bullets; the later slides use code, tables, diagrams, and the
recording without redundant bullet summaries. Eight former summary-only slides
are omitted. Bullet lists inside tables retain their formatting, and
standards and analogy remarks use compact plain-text notes. This selection is
preserved by [`config/readme-content-selection.mjs`](config/readme-content-selection.mjs).

The complete section 2 also omits bullet summaries and source lists. Seventeen
slides containing only those lists are removed, and the two interrupt-entry
slides are merged into one. Code fills the freed columns;
empty rows are collapsed. Table fields and their bullet lists remain complete, and
Linux, POSIX, and System V comparisons remain in compact notes. The POSIX note
from the removed syscall introduction accompanies its first surviving example.

Sections 3 and 4 also omit bullet summaries and standalone lists, with two retained
section 4 exceptions: **Loading a process (`load` library call)** and the first
**Starting a process (`run` library call)** slide. Nine summary-only slides are
removed. The remaining visuals fill the available space; contextual standards
and analogy notes use plain text. The two exception slides keep their content.

Sections 5, 6, and 7 follow the same rule: remove lists and summaries outside
tables, preserve every table bullet, and expand surviving visuals into the
available space. Fifteen slides containing only those bullets are intentionally
removed across these three sections. The Unix signal comparison remains as a
plain note beside the signal function table. Rebuild protection requires each
intentional slide removal to be named by UUID; all surviving slide identities
and short-version choices are preserved.

Slides currently included in the short deck in sections 8–15 also omit standalone
lists, except the section 15 introduction. Five slides left empty by this cleanup
are removed. Table and diagram bullets remain intact. **Unix: reaping** and **Device
inode analogy** remain as compact plain-text remarks. **Unix fork + exec / PicoOS**,
the requested comparison boxes, and **Reading the stack** are omitted.
[`config/readme-slide-selection.json`](config/readme-slide-selection.json) stores
the reviewed source-artifact groups and UUIDs so rebuilds preserve these choices
without changing excluded slides. Empty list columns and rows collapse, and
surviving code, tables, and diagrams fill the available space.

Crowded examples use the full slide area. Their prose moves to a roomier next
slide or a separate explanation slide in the same subsection. Useful bullets
stay beside examples where they fit. Reviewed placements and the remaining
artifact splits live in [`config/readme-readability.mjs`](config/readme-readability.mjs).
Text reflows at a larger preferred size and shrinks when the available height
requires it. See the [readability review](docs/readability-review.md).

Side-by-side content shares a common top edge while the whole group stays
vertically centered in its available slide or panel area. This applies to
paired tables, code boxes, lists, and columns within stacked panels. Standalone
visuals are vertically centered within their panels. Command strips and their
code examples stay together as one group. The ReTI address map and its usage
table share one slide.

Column proportions follow the content. The hardware table gets more width than
its short companion list; paired tables and code examples use compatible text
sizes. Column layouts are checked at slide size. Their proportions
and paired-table sizing are stored in [`config/readme-columns.json`](config/readme-columns.json).

Code boxes and tables on the same slide share a displayed text size, including
command strips. Long source lines wrap without changing the code.
All code boxes fill their slide or column width and use a shared filename or
terminal header. Tables reflow to fill
their panels, with short list items sharing lines where space permits. Two-part
tables divide by content length rather than equal row counts; reviewed breaks
and initial stacked-row weights also live in the column configuration.
Stacked groups redistribute spare height using their rendered content and
stay centered with compact gaps. These rules survive README regeneration.

Important list words and labels use selective bold color accents; Original and
Extended compiler pipelines use amber and cyan labels. Table keys and inline
code use cyan. Reviewed merges in
[`config/readme-composition.mjs`](config/readme-composition.mjs) keep related
content on one slide, including Build and run. Stacked panels retain the
existing column proportions and allocate height to match their content.
The emphasis styles are in [`styles/readme-emphasis.css`](styles/readme-emphasis.css).

Images in `public/readme/` retain the current README assets, with ReTI spelling
normalized in SVG labels and identifiers. Reviewed SVG label and readability
corrections are preserved by [`config/readme-svg-edits.json`](config/readme-svg-edits.json)
when rebuilding; a changed source label requires another review. Source snapshots and source hashes
retain the original bytes. Their existing colors, fonts, shapes, labels, and composition already
match the presentation. Expanded memory views, redirection stages, and the
producer/consumer pipeline diagrams use full-width slides. The enlarged viewer
inlines source SVGs so their labels remain selectable. Unix/Linux and ABI
comparisons appear in small contextual notes. The previous-to-current diagram
mapping is recorded in [visualization changes](docs/visualization-update.md).

[`ReadmeVisual`](components/ReadmeVisual.vue) fits each complete visual into
the available slide area. Click it to inspect the full content in the zoom
viewer. Large examples are never truncated to make them fit.

The source-to-slide inventory is in
[`docs/readme-coverage.json`](docs/readme-coverage.json). Its hashes, source
lines, slide numbers, retained/omitted table rows, and code-part counts make
selection and placement reviewable. Check it
with `yarn test:source` (or set `PRESENTATION_SOURCE` to a candidate README).
[`docs/readme-prose-review.json`](docs/readme-prose-review.json) records every
README heading and prose paragraph, its reviewed summary or visual treatment,
and its slide placements. [`docs/slide-audit.json`](docs/slide-audit.json) records
the rendered checks for every slide. Coverage checks ensure authored summaries
and standards remarks actually appear beside the source assets.

The reconstruction script is `yarn rebuild:readme`. It combines the original
README artifacts with reviewed bullet summaries and contextual notes in
`config/readme-*.json`. `config/readme-tables.mjs` and the table-cell and
column-width configurations describe the reviewed tables;
`config/title-slide.md` preserves the title page.
Before replacing any output, the rebuild checks every existing slide's stable
UUID. Missing slides stop the rebuild and are listed by title and UUID, even
when additions leave the total slide count unchanged. Short-version choices
follow the same UUID; they never spread to other slides sharing a section or
asset. New slides are included in both versions by default. Run
`yarn test:rebuild` to verify these safeguards.

If a removal is intentional, review the listed slide and explicitly name its
UUID: `yarn rebuild:readme --remove-slide=<UUID>`. Repeat the argument for each
intentional removal. There is no general bypass; stale or unknown UUIDs fail.
If matching fails after a rename or layout change, correct the matching or
retain the existing UUID rather than authorizing a content deletion.

The rebuild also generates `config/section-overviews.json` for
[`SectionOverview`](components/SectionOverview.vue),
[`PresentationContents`](components/PresentationContents.vue), and the
breadcrumb links. Shared styles live in `styles/section-navigation.css`;
`setup/presentation-navigation.ts` resolves destinations from the active deck.
Review those authored files whenever the source changes, then follow the
validation and baseline workflow in [source review](docs/source-review.md).

With the presentation running, `yarn test:overviews` checks contents and overview
layouts, filtered topic branches, individual slide links, breadcrumb returns,
and keyboard navigation. `yarn test:navigation` verifies dynamic filtering and
PDF destination conversion. Set
`PRESENTATION_URL` for a different server, `SLIDES_SHORT=1` for the short deck,
and `PRESENTATION_ROUTER=hash` for a static build.

The `make generate-presentation-pdf` and `make generate-short-presentation-pdf`
targets preserve these links as internal PDF page destinations. They export
slides in chunks, merge the chunks, then finalize destinations against the
complete active deck with `scripts/link-presentation-pdf.mjs`. This last step
is required for linked PDFs; raw Slidev export chunks still contain temporary
destination URLs. It uses the `pdf-lib` dependency already used by Slidev.

## Enlarging visuals

Click a diagram, code block, table, memory map, timeline, or debugger image to
open an enlarged view without advancing the slide. Focus a visual with Tab and
press Enter or Space for the same action. The viewer keeps diagrams as vectors
and code/text selectable.

- Use **+ / −** or the toolbar to zoom; **F** fits the complete visual.
- Scroll to explore a large visual; arrow keys scroll while the viewer is open.
- Press **Escape** or **Close** to return to the same slide.
- Dragging to select text does not open the viewer, including on `/selectable-text/`.

The viewer is in [`components/VisualZoom.vue`](components/VisualZoom.vue).
[`setup/mermaid-renderer.ts`](setup/mermaid-renderer.ts) applies the presentation
palette and sizes SVGs inside Slidev's shadow DOM. It uses Mermaid's browser
bundle, matching Slidev's own import; the package-root entry fails to load its
CommonJS dependencies in the development server. HTML labels are normalized
before SVG serialization so line breaks remain valid in the rendered diagrams.

## Terminal recordings

Use the reusable `AsciinemaRecording` component to show a poster generated from
a local asciicast. Clicking the poster starts the full player directly on the
slide without advancing it:

```html
<AsciinemaRecording
  src="/casts/example.cast"
  title="Example terminal session"
  poster="npt:8"
  fallback-href="https://asciinema.org/a/REPLACE_ME"
/>
```

Place the `.cast` file in `public/casts/`. Vite copies it into the static build,
and the bundled player loads that local file. Keep `fallback-href` on every use
as the editable asciinema.org fallback shown beside the recording. While the
player has focus, Space toggles playback and the arrow keys seek; click outside
it to return those keys to Slidev. Playback and fallback handling are implemented in
[`components/AsciinemaRecording.vue`](components/AsciinemaRecording.vue).

## Browser checks

Build and serve the presentation locally:

```sh
yarn build --router-mode hash
python -m http.server 4173 --directory dist --bind 127.0.0.1
```

In another terminal, run:

```sh
node scripts/check-presentation.mjs
```

While updating, set `PRESENTATION_SOURCE` to the exact candidate README path
to validate its hierarchy before replacing the last successful source snapshot.
After validation, run `yarn source:save` to archive the previous pair and save
those exact bytes with the current source commit in the new dated pair.

Also check both development launch variants, because successful production
bundling does not guarantee that development imports load correctly. Start each
server in its own terminal:

```sh
yarn slidev --port 3031
yarn slidev --port 3032 --base /selectable-text/
```

Run the same checks against their history routes:

```sh
PRESENTATION_URL=http://localhost:3031/ PRESENTATION_ROUTER=history node scripts/check-presentation.mjs
PRESENTATION_URL=http://localhost:3032/selectable-text/ PRESENTATION_ROUTER=history node scripts/check-presentation.mjs
```

The check visits every slide and validates the cover, generated contents, source
anchors, heading order, numbered subtitles, content bounds, full-width code
boxes, matching column top edges, vertical centering of column groups, and
table-cell clipping. It rejects
console/module/network errors, Slidev error fallbacks, missing diagrams, and
Mermaid/XML error placeholders, and exercises enlargement, keyboard navigation,
text selection, complete code in the enlarged viewer, scrolling through the
longest example, and local recording playback. Set `BROWSER`
to a Chromium executable or `PRESENTATION_URL` to
another local preview URL if needed. Use `PRESENTATION_ROUTER=history` for a
development server. It does not export a PDF or run the PicoOS tests.

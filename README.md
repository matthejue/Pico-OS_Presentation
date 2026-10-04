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
[`.source/Pico-OS-README.md`](.source/Pico-OS-README.md), with their commit, hash,
dirty state, date, and slide count in [`.source/source-state.json`](.source/source-state.json).
The current revision and update workflow are documented in
[source review](docs/source-review.md).

The titles reproduce the README hierarchy: preceding heading levels are joined
with middle dots in the main title, and the current heading is the subtitle.
Sections spanning multiple slides use consecutive `(1)`, `(2)`, … suffixes.
Function catalogs retain operations exposed through or called by a library,
directly or through a syscall. Internal-only operations are omitted. Table
descriptions use brief bullets; columns and widths are reviewed for readability.
The title page focuses on PicoOS and the toolchain artwork. A contents slide
immediately follows it, linking to the overview of each major README section.
Each overview has a larger title and a clickable subsection hierarchy. Click
a topic to jump to its first slide, or a numbered link to choose an individual
slide. Click the major section title in a content slide's ancestor heading to
return to its overview; every overview also links back to Contents.

Navigation follows the generated README hierarchy and the active full or short
deck. Empty branches and sections disappear; ancestors remain when descendants
have content. Section overviews and Contents are maintained automatically when
content slides are excluded. The full deck contains 290 slides. Slides load on demand to
avoid rendering the entire diagram-heavy deck in the background.

## Preserving the README content

The source inventory tracks 345 substantive README artifacts: 109 code
examples, 38 Mermaid diagrams, 136 tables, 32 images, one terminal recording,
and 29 lists. All code, diagrams, images, recordings, and substantive list
items are represented. Tables retain the reviewed library-facing operations;
ten internal-only function catalogs are omitted. The two README navigation
lists are replaced by the dynamic contents slide and section overviews.

Ordinary slide text and table descriptions use brief bullets. Code and diagram
bodies stay complete. Long code examples split into balanced columns, with
boxes filling their column width. Related assets share slides where they fit;
application, library, and built-in catalogs use compact grids. The hardware
slides include the setup, wiring, and README price estimates.

Side-by-side content aligns at the top in every column layout, including paired
tables, code boxes, lists, and columns within stacked panels. Standalone visuals
are vertically centered within their panels. Command strips and their code
examples stay together as one group. The RETI address map and its usage table
share one slide.

Column proportions follow the content. The hardware table gets more width than
its short companion list; paired tables and code examples use compatible text
sizes. All 70 column layouts have been reviewed at slide size. Their proportions
and paired-table sizing are stored in [`config/readme-columns.json`](config/readme-columns.json).

Important list words and labels use selective bold color accents; Original and
Extended compiler pipelines use amber and cyan labels. Table keys and inline
code use cyan. Reviewed merges in
[`config/readme-composition.mjs`](config/readme-composition.mjs) keep related
content on one slide, including Build and run. Stacked panels retain the
existing column proportions and allocate height to match their content.
The emphasis styles are in [`styles/readme-emphasis.css`](styles/readme-emphasis.css).

SVGs in `public/readme/` are copied from the README assets. Styling changes
their colors, font, and rectangle corners; their coordinates, paths, labels,
and composition stay intact. Mermaid diagrams retain their source structure
and layout directives. Cyan, amber, and green accents are shared across
diagrams, memory maps, and tables. Unix/Linux and ABI comparisons appear in
small contextual notes.

[`ReadmeVisual`](components/ReadmeVisual.vue) fits each complete visual into
the available slide area. Click it to inspect the full content in the zoom
viewer. Large examples are never truncated to make them fit.

The source-to-slide inventory is in
[`docs/readme-coverage.json`](docs/readme-coverage.json). Its hashes, source
lines, slide numbers, retained/omitted table rows, and code-part counts make
selection and placement reviewable. Check it
with `yarn test:source` (or set `PRESENTATION_SOURCE` to a candidate README).

The reconstruction script is `yarn rebuild:readme`. It combines the original
README artifacts with reviewed bullet summaries and contextual notes in
`config/readme-*.json`. `config/readme-tables.mjs` and the table-cell and
column-width configurations describe the reviewed tables;
`config/title-slide.md` preserves the title page.
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
After validation, save those exact bytes and refresh `.source/source-state.json`.

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
boxes, top alignment of column content, and table-cell clipping. It rejects
console/module/network errors, Slidev error fallbacks, missing diagrams, and
Mermaid/XML error placeholders, and exercises enlargement, keyboard navigation,
text selection, complete code in the enlarged viewer, scrolling through the
longest example, and local recording playback. Set `BROWSER`
to a Chromium executable or `PRESENTATION_URL` to
another local preview URL if needed. Use `PRESENTATION_ROUTER=history` for a
development server. It does not export a PDF or run the PicoOS tests.

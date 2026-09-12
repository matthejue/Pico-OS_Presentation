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
make generate-short-presentation-pdf
```

The full selection workflow, standalone scripts, static package target,
environment variable, update ordering, and failure behavior are documented in
[short presentation version](docs/short-version.md). Existing presentation
targets continue to produce the full deck.

## Releases

Pushing a tag whose name starts with `v` builds and uploads two assets to the
matching GitHub release:

- `picoos-presentation.pdf`
- `picoos-presentation-static.tar.gz`, containing the browser presentation and an
  Ubuntu launcher script.

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

The slide source is
[`slides.md`](slides.md); global styling is in [`styles/index.css`](styles/index.css).
Each slide contains an invisible `SOURCE` comment that maps it back to a stable
Pico-OS README heading. Source tracking and the future update workflow are
documented in [`AGENTS.md`](AGENTS.md) and [`source-state.json`](source-state.json).

The titles reproduce the README hierarchy: preceding heading levels are joined
with middle dots in the main title, and the current heading is the subtitle.
Sections spanning multiple slides use consecutive `(1)`, `(2)`, … suffixes.
Kernel function catalogs are omitted. Source inconsistencies resolved during
the revision are recorded in [source review](docs/source-review.md).
The title page contains a compact, seven-topic outline; there is no separate
Contents slide. This presentation choice is recorded in `AGENTS.md`.

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

The check visits every slide and validates the summarized cover outline, source
anchors, heading order, numbered subtitles, and content bounds. It rejects
console/module/network errors, Slidev error fallbacks, missing diagrams, and
Mermaid/XML error placeholders, and exercises enlargement, keyboard navigation,
text selection, and hovering over enlarged compiler and shell code. Set `BROWSER`
to a Chromium executable or `PRESENTATION_URL` to
another local preview URL if needed. Use `PRESENTATION_ROUTER=history` for a
development server. It does not export a PDF or run the PicoOS tests.

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

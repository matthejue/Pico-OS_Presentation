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

The slide source is
[`slides.md`](slides.md); global styling is in [`styles/index.css`](styles/index.css).
Each slide contains an invisible `SOURCE` comment that maps it back to a stable
Pico-OS README heading. Source tracking and the future update workflow are
documented in [`AGENTS.md`](AGENTS.md) and [`source-state.json`](source-state.json).

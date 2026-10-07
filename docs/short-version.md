# Short presentation version

The short presentation is derived from the same [`slides.md`](../slides.md) as
the full presentation. A slide is excluded from short mode when its source
contains this persistent marker:

```html
<!-- SHORT_VERSION_DISABLED -->
```

The marker is deliberately stored beside the slide's stable `SOURCE` comment.
It therefore moves with the slide when README-driven presentation updates insert
or remove other slides. Do not add Slidev's permanent `disabled: true` property;
that would also remove the slide from the full presentation.

README rebuilds preserve this choice by the slide's stable UUID. An exclusion
never transfers to another slide merely because it shares a section or asset.
New slides are visible by default. A rebuild that loses any existing UUID stops
before replacing outputs and lists the affected slides for review.

README rebuilds also update the number selection automatically by UUID, including
pending choices made with `m`. They do not apply those pending choices. Inserting,
removing, or reordering slides therefore cannot make the next Apply operation
target a different slide just because its number changed.

[`short-version-disabled-slides.txt`](../short-version-disabled-slides.txt) is a
temporary, human-editable selection expressed as whitespace-separated **full
deck source slide numbers**. Spaces, tabs, and newlines are all accepted;
duplicates are removed and the file is sorted whenever it is written.

## Editing from the running presentation

Start the normal development presentation:

```sh
make launch-presentation-in-browser
```

The following shortcuts are active when focus is not in an input field:

| Shortcut | Action |
| --- | --- |
| `m` | Toggle the current slide number in `short-version-disabled-slides.txt`. |
| `Alt+A` — Apply | Apply the entire text-file selection to `slides.md`. Existing short-version markers are replaced. |
| `Alt+S` — Sync | Synchronize the text file with the slide numbers currently marked in `slides.md`, overwriting the text file. |

A message at the top of the browser confirms each operation. These editing
shortcuts need the Slidev development server: a static archive cannot write back
to its source checkout.

Shortcut reminders start hidden in both full and short decks. Press `H` to show
or hide the corner reminders and the overview's “Choose a topic or slide number
↗” hint. The setting stays shared across slides and resets to hidden on reload.
When shown, development decks include editing, visual viewer, and recording
controls. Static decks include viewer and recording controls. Hints are hidden
in PDF output. Visual controls apply to a focused visual or its open viewer.
Recording controls apply while the player has focus.

`m` only edits the text file. The short deck does not change until `Alt+A` is
pressed or the apply script is run. This makes it possible to mark several
slides while reviewing the full deck and commit them together.

## The two synchronization scripts

Apply the current number selection to persistent slide markers:

```sh
make apply-short-version-selection
# equivalent: node scripts/apply-short-version.mjs
```

This operation is exact: markers not represented in the text file are removed,
and markers for all listed numbers are added. Invalid or out-of-range values
stop the operation without changing `slides.md`.

README rebuilds refresh the number file automatically. After manually inserting,
removing, or reordering slides, refresh it from the persistent markers:

```sh
make sync-short-version-selection
# equivalent: node scripts/sync-short-version-selection.mjs
```

This second direction intentionally overwrites the text file. Any number that
was toggled with `m` but never applied to `slides.md` is therefore lost. The
safe workflow for manual slide edits is:

1. Press `Alt+A` (or run the apply target) before updating the deck.
2. Update `slides.md`; preserve every `SHORT_VERSION_DISABLED` marker with its slide.
3. Press `Alt+S` (or run the sync target) after the update to refresh the numbers.

## Running and generating the short deck

`SLIDES_SHORT=1` activates filtering in development, build, and export modes.
Convenience targets set it automatically:

```sh
make launch-short-presentation-in-browser
make launch-short-presentation-with-selectable-text
make build-short-static-presentation
make package-short-static-presentation
make generate-short-presentation-pdf
```

The outputs of the package and PDF targets are
`picoos-presentation-short-static.tar.gz` and
`picoos-presentation-short.pdf`. The existing full-deck targets and filenames
remain unchanged.

Contents, chapter overviews, slide-number links, and breadcrumb returns are
derived from the surviving slides. Empty chapters and subsection branches are
removed automatically. Ancestors with surviving descendants remain visible.
Navigation slides are maintained automatically; use `m` on content slides to
change the selection. PDF targets finalize internal destinations after merging
the exported chunks, so links use the short PDF's page numbers.

Static builds go to separate directories: `dist/` for the full deck and
`dist-short/` for the short deck. Both versions can be generated in one command:

```sh
make package-static-presentation package-short-static-presentation
make generate-presentation-pdf generate-short-presentation-pdf
```

The GitHub release workflow generates all four outputs. Tagged releases attach
both PDFs and both static archives; manual runs upload the same files as
workflow artifacts.

The underlying commands also work directly:

```sh
SLIDES_SHORT=1 yarn slidev slides.md
SLIDES_SHORT=1 yarn build --router-mode hash
SLIDES_SHORT=1 yarn export
```

The pre-parser in [`setup/preparser.ts`](../setup/preparser.ts) translates the
persistent marker to Slidev's `disabled` frontmatter only when short mode is
active. Slidev then removes those slides before navigation, static rendering,
and PDF rendering. The development-only write endpoints are defined in
[`vite.config.mts`](../vite.config.mts), and the browser bindings are in
[`setup/shortcuts.ts`](../setup/shortcuts.ts).

Run the focused test with:

```sh
make test-short-version
```

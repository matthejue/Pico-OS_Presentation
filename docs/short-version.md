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

After slides have been inserted, removed, or reordered, rebuild the number file
from the persistent markers:

```sh
make sync-short-version-selection
# equivalent: node scripts/sync-short-version-selection.mjs
```

This second direction intentionally overwrites the text file. Any number that
was toggled with `m` but never applied to `slides.md` is therefore lost. The
safe update workflow is:

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

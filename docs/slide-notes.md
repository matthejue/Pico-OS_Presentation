# Slide notes and corrections

Start the presentation with `npm run dev`, `yarn dev`, or an existing Makefile
launch target. On any slide, use these shortcuts:

| Shortcut | Action |
| --- | --- |
| `Alt+N` | Add or edit the current slide's Markdown note |
| `Alt+Shift+N` | Show or hide notes in the panel at the upper right |
| `Alt+C` | Add or edit the current slide's correction bullets |
| `Alt+Shift+C` | Show or hide corrections below the notes, near the vertical center |
| `H` | Show or hide note/correction buttons and other presentation hints |
| `Ctrl+Enter` / `Cmd+Enter` | Save the note or corrections while editing |
| `Escape` | Close the editor; unsaved changes require saving, keeping the draft, or discarding it |

The note and correction buttons start hidden. Press `H` outside the editor to
show or hide them together with the other presentation hints. Whenever visible,
the buttons show their edit and visibility shortcuts. These shortcuts also
work while the buttons are hidden. Reloading hides the buttons again.
Both panels follow the current slide as you navigate, with independent visibility
preferences. They are wider, use larger text, and have slightly transparent
backgrounds. The existing note editor keeps its size. Note text supports
headings, lists, emphasis, links, and code. Corrections use one simple Markdown
bullet per entry, with optional blank lines:

```markdown
- Correct the arrow direction in the diagram.
- Add the missing syscall reference.
```

The `Alt+Shift+C` slide panel hides completed bullets (`-[x]`, `- [x]`,
or `- [X]`) and correction Markdown/images whose filenames start with `x_`.
They remain available in the correction editor. The `x_` prefix survives
filename refreshes after reordering or renaming slides. To hide a screenshot,
prefix its PNG filename with `x_`; its sidecar can be prefixed too, without
editing the metadata. Normal notes are unaffected.

Notes and corrections are hidden from PDF exports.
Saving requires the development server, which writes into this repository.
Static builds include saved notes, corrections and screenshots for viewing
without a server that can write to the repository.

## Files and slide identity

Saved notes live in `notes/` as Markdown files. A filename includes the current
full-deck slide number, readable title, and persistent UUID, for example:

```text
slide-007-introduction-build-and-run--204ea1c9-6227-4a6f-aae9-f69f49722046.md
```

The file starts with YAML metadata followed by your Markdown:

```markdown
---
slide_id: "204ea1c9-6227-4a6f-aae9-f69f49722046"
slide_number: 7
slide_title: "Introduction · Build and run"
source_anchor: "build-and-run"
---

Explain the launcher before showing the commands.
```

You can also edit the Markdown body with a text editor. Keep `slide_id` intact.
The UUID is the relationship to the slide; the number and title describe its
current location. The number is always from the full slide source, including
when viewing the short presentation.

Each slide has an invisible identity comment in `slides.md`:

```markdown
<!-- SLIDE_ID 204ea1c9-6227-4a6f-aae9-f69f49722046 -->
```

Move this comment with its slide. The note remains connected through reordering,
inserting slides, changing titles, and switching between full and short decks.
New slides receive UUIDs automatically when the development server or build
loads the source. When copying a slide to create another slide, remove the
copied UUID comment so the new slide receives its own identity. Duplicate or
malformed IDs stop loading with a clear error instead of attaching a note to
the wrong slide.

`yarn rebuild:readme` preserves old UUIDs by matching unchanged slide bodies,
then unique README anchor/title combinations with the same slide role. It never
uses slide numbers. If a rebuild cannot distinguish identical slides, it assigns
new UUIDs and retains the old note files for recovery. To reconnect a reviewed
slide manually, restore that note's UUID in the slide's identity comment,
ensuring no other slide uses it.

Starting or building the presentation, changing its slide source while the
server runs, or rebuilding from the README refreshes note filenames and metadata
to reflect current numbers and titles. This leaves the Markdown body intact.
Removing a slide retains its note file. Commit `slides.md` and `notes/*.md`
together to preserve the relationship when sharing or reverting the repository.

Corrections reuse exactly the same persistent slide UUIDs and Markdown storage
workflow in `Corrections/`. Their `.md` files use the same readable filename and
YAML header shown above; `slide_id` is the authoritative association. A slide's
number, title, content or layout can change without changing that UUID.
Correction filenames and metadata refresh alongside notes when starting,
building, editing the slide source or rebuilding from the README.

## Clipboard screenshots

In the correction editor, choose **Save clipboard image** after copying an
annotated screenshot. Clipboard access requires a supported browser on localhost
or HTTPS; accept the browser's clipboard permission if prompted. Images are saved
as PNG files (up to 10 MiB), without changing unsaved correction text. An empty
clipboard or denied access displays an error and leaves the draft intact.

Each screenshot has its own identifier and a readable name, for example:

```text
slide-007-introduction-build-and-run--<slide UUID>--screenshot-<image UUID>.png
```

Alongside it, `<filename>.png.json` stores `slide_id`, `slide_number`,
`slide_title`, `source_anchor`, `image_id`, and `filename`. The sidecar's
`slide_id` associates the image with the slide. Multiple screenshots can belong
to one slide, including slides without correction text. Screenshots appear in
the correction panel and editor; click one to view its full image.

Use **Delete image** below a screenshot in the correction editor to remove both
the PNG and its metadata file. This leaves saved correction text and unsaved
drafts intact. You can also delete a PNG directly in `Corrections/`; leftover
metadata for a missing screenshot is ignored, so loading corrections and saving
a replacement still work. File deletions refresh the editor's image list.

Opening or closing the correction editor does not create a Markdown file.
Neither does saving only a screenshot or submitting blank correction text.
A new `.md` file is created when you save nonempty correction text.

Reordering or renaming refreshes image filenames and sidecars while retaining
their UUIDs and original pixels. Removing a slide retains its corrections and
images for recovery. Commit `slides.md` and the Markdown, PNG and JSON files in
`Corrections/` together. PNG corrections are explicitly allowed by `.gitignore`.

## Saving and recovery

The editor keeps unsaved drafts in browser storage when available. It warns
before closing or navigating away with unsaved changes, and provides
**Keep draft & close**. Returning to the slide restores its draft; a draft from
another tab or session can be recovered explicitly.

Saves check the revision loaded when you opened the editor. If another tab or a
text editor changed the file, the save keeps your draft and displays the current
saved version. Merge its changes into your draft, choose **Mark draft as
merged**, and save again, or choose **Use saved note** to keep the file's version.
File writes are atomic, and concurrent repository writers use a lock. Damaged
note metadata and duplicate note UUIDs fail clearly; existing files are not
silently replaced.

Corrections use the same draft recovery, revision checks and editor behavior,
with separate browser storage so notes and corrections remain independent.

Run `npm run test:notes` for identity, rebuild, note/correction persistence,
screenshot association and conflict checks. `npm run test:notes:browser` starts
an isolated temporary presentation
and checks both editors, clipboard images, navigation, metadata refresh and
static viewing in Chromium without changing the real slide or correction files.

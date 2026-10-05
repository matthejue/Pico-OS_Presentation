# Slide notes

Start the presentation with `npm run dev`, `yarn dev`, or an existing Makefile
launch target. On any slide, use these shortcuts:

| Shortcut | Action |
| --- | --- |
| `Alt+N` | Add or edit the current slide's Markdown note |
| `Alt+Shift+N` | Show or hide notes in the panel at the upper right |
| `H` | Show or hide the note buttons and other presentation hints |
| `Ctrl+Enter` / `Cmd+Enter` | Save the note while editing |
| `Escape` | Close the editor; unsaved changes require saving, keeping the draft, or discarding it |

The buttons at the upper right start hidden. Press `H` outside the editor to
show or hide them together with the other presentation hints. Whenever visible,
the buttons show their `Alt+N` and `Alt+Shift+N` shortcuts. These shortcuts also
work while the buttons are hidden. Reloading hides the buttons again.
The visible panel follows the current slide as you navigate. Note text supports
headings, lists, emphasis, links, and code. Notes are hidden from PDF exports.
Saving requires the development server, which writes into this repository.
Static builds include the saved notes and allow viewing them without a server
that can write to the repository.

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

Run `npm run test:notes` for identity, rebuild, file persistence and conflict
checks. `npm run test:notes:browser` starts an isolated temporary presentation
and checks the editor in Chromium without changing the real slide or note files.

# AGENTS.md

## Purpose

- This repo is a Slidev presentation explaining PicoOS and its supporting
  PicoC-Compiler and RETI-Emulator toolchain.
- Treat `/home/areo/Documents/Studium/Pico-OS/README.md` as the authoritative
  source and keep the slide order aligned with its chapter order.
- Consult the sibling compiler/emulator READMEs only where the PicoOS README
  refers to their contracts or where a small clarification is necessary.
- Keep slides visual and sparse: prefer diagrams, memory maps, state flows,
  progressive reveals, and focused code over paragraphs.
- Preserve the current restrained dark/cyan/amber style. Fancy effects should
  clarify the mechanism, not distract from it.
- Every slide must contain an invisible comment beginning with `SOURCE ` and a
  stable PicoOS README anchor. Put new slides beside the slide for the matching
  README section. Keep a blank line between a plain `---` slide separator and
  the comment so Slidev does not probe the slide body as frontmatter.
- Preserve unrelated manual presentation edits while updating source-derived
  material.

## User command: UPDATE_PRESENTATION

When the user writes `UPDATE_PRESENTATION`:

1. Read `source-state.json` and `.source/Pico-OS-README.md`.
2. In `/home/areo/Documents/Studium/Pico-OS`, inspect `git status`, the commits
   after the stored primary commit, `git diff <stored-commit>..HEAD -- README.md`,
   and `git diff HEAD -- README.md`.
3. Use `git diff --no-index -- .source/Pico-OS-README.md
   /home/areo/Documents/Studium/Pico-OS/README.md` as the authoritative exact
   delta; this also handles an uncommitted baseline or current working copy.
4. Match changed README headings to `SOURCE ` comments in `slides.md`. Update
   those slides in place, or insert new slides at the corresponding chapter
   position. Check the sibling READMEs only for newly referenced details.
5. Keep text short and turn new mechanisms into visuals where practical. Every
   added slide needs its own `SOURCE:` marker.
6. Build only this presentation to verify it. Do not run the PicoOS test suite.
7. After a successful update, replace `.source/Pico-OS-README.md` with the exact
   README used and refresh all relevant commits, SHA-256 hashes, dirty state,
   date, and slide count in `source-state.json`.

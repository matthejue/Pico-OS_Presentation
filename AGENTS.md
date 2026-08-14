# Instructions

- `/home/areo/Documents/Studium/Pico-OS/README.md` is authoritative; keep slide order aligned with its chapters. Consult PicoC-Compiler and RETI-Emulator READMEs only for contracts/details it newly references.
- Keep slides sparse and visual (diagrams, maps, flows, progressive reveals, focused code) in the existing dark/cyan/amber style. Preserve unrelated manual edits.
- Every slide needs an invisible `SOURCE ` comment with a stable PicoOS README anchor. Insert new slides beside their matching section.
- Do not update `speaker-notes.md` as part of `UPDATE_PRESENTATION`.
- Do not regenerate or export the PDF; the user always handles PDF generation.

# UPDATE_PRESENTATION

1. Read `source-state.json` and `.source/Pico-OS-README.md`.
2. In `/home/areo/Documents/Studium/Pico-OS`, inspect `git status`, commits after the stored primary commit, `git diff <stored-commit>..HEAD -- README.md`, and `git diff HEAD -- README.md`.
3. Treat `git diff --no-index -- .source/Pico-OS-README.md /home/areo/Documents/Studium/Pico-OS/README.md` as the exact authoritative delta.
4. Map changed README headings to `SOURCE ` comments in `slides.md`; update slides in place or insert at the matching chapter. Keep text short, use visuals, and give every new slide a `SOURCE:` marker.
5. Build only this presentation; do not run the PicoOS test suite.
6. On success, replace `.source/Pico-OS-README.md` with the exact README used and refresh commits, SHA-256 hashes, dirty state, date, and slide count in `source-state.json`.

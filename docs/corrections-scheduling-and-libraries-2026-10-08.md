# Scheduling and library correction review — 2026-10-08

Processed five unchecked Markdown bullets and four annotated screenshots by
their stored `slide_id`. Six Markdown files are archived, including the empty
file associated with `aae956c1-0fcb-45ff-abd6-8870d0c0d020`, which requested no
change. All completed bullets have `[x]`; completed correction files and image
sidecars have the `x_` prefix. Previously completed requests were not reapplied.
The fourth screenshot was saved during the review and is included below.

| Persistent slide_id | Applied correction |
| --- | --- |
| `576ccea6-9739-4681-bb90-2f6a9778eb39` | Swapped termination and shutdown examples; the longer example is on the left. |
| `9e6976d4-d412-47c3-999e-c97878a31ba5` | Added two dashed expansion guides connecting the outer heap to the detailed process payload. Pointer arrows remain solid. |
| `d977a719-8394-49ef-a97d-232d5a623935` | Removed the crossed-out Used by column; rebalanced code and the remaining two-column table without breaking the code filename. |
| `98f2cdbc-c0b8-48da-be9a-906b3dbf57a6` | Moved the next slide's complete dispatcher-save code here; moved its diagram to `2141e618-bd32-4be3-8de8-56f85854b82e`. |
| `3bb60e3b-a297-436f-93c3-61d123a2724e` | Moved the complete restoration code here in one full-width code box. |
| `62b5a2ed-b827-42d6-ac13-4f4bffef585a` | Combined both original code parts without omitting lines, then moved that complete example to the preceding requested slide. This identity now holds the restoration diagram. |
| `88497705-af19-49fe-a160-b5c50853d5d3` | Inserted a styled chapter-10 jump immediately afterward, with new UUID `f5740e3b-34f8-4420-9fde-edf850080a3d`. |
| `d8b1e73e-25ce-415d-9f69-21b32385cd57` | Condensed the userspace getpid example to one slide: the header declaration and implementation, including invoke_syscall, INT 0, and the returned PID. |
| `fcb9ea56-bb37-4004-bad3-22ce1187b9e9` | Removed the crossed-out “Inspect source +”; retained live execution and both lecture-topic bullets. |

The syscall example follows the local PicoOS source in
`library/unistd/unistd.header`, `library/unistd/process.picoc`,
`common/syscall.header`, and `kernel/syscall.picoc`. It deliberately omits the
previous linking, register-table, memory-context, and return-path slides to
satisfy the requested simplification.

The following five redundant example slides were removed as part of that merge:

- `fbcb268f-997c-40b7-a089-0e38a2ee9d1d`
- `5de2a26a-4658-44a3-8cbb-a4606ab8e2da`
- `16cc1b17-e4ca-4b6b-8e87-a6d25f528752`
- `c97fa599-e01c-4809-8260-ddaa492474b8`
- `2a9f965e-ea7e-4c55-836b-1ce4fe34ed42`

All other existing identities, source anchors, and applied short-version
exclusions are preserved. Pending short-version selections were remapped by
UUID, rather than reset from the applied markers. The deck has 331 slides.

The jump resolves its destination from the active chapter overview, using the
shared presentation-navigation helper. Its destination adapts to the full or
short deck and uses the existing internal-PDF-destination convention in print
mode. The SVG edit configuration reproduces the dashed guides from the original
PicoOS SVG without changing that source repository.

Visual review used an isolated presentation copy to avoid automatic metadata
refreshes in the working notes/corrections directories. Rendered layouts were
inspected for balance, filename wrapping, alignment, and slide-boundary clipping.
The chapter jump was activated by keyboard in the full and shortened decks.
Identity, notes/corrections, navigation/PDF-destination, and short-version tests
pass. No README rebuild, source snapshot update, or PDF export was performed.

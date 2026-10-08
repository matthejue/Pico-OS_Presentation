# Release and limitations corrections — 2026-10-08

Processed the two pending correction sets using their stored `slide_id`.
Previously completed `x_` files were not processed.

- `d0d41e3f-aa5f-439c-9c4a-07220adf33c0`: inserted the release-archive slide immediately afterward, with new UUID `9fffb17d-9607-4015-83ae-930d3e638635`. The full URL has a copy button and selectable, enlargable code box. The URL, runtime description and platforms follow the local PicoOS README's Build and run section. The following subsection slide is now numbered (4).
- `e6126660-8ba5-4fb6-b371-4aae70da00fe`: added “no filesystem” to the UART bullet; retained “Fixed heap” and removed the crossed-out stack wording, reduced-libraries bullet, POSIX-like-names bullet and Scope strip. The remaining two-column list stays centered and balanced.

All 331 existing slide identities, source anchors and applied exclusions are
preserved. The deck now has 332 slides. Pending short-version choices were
remapped by UUID. The completed Markdown bullet has `[x]`; the Markdown file,
annotated screenshot and its sidecar have the `x_` prefix. No pending correction
files remain.

Rendered and visually inspected both affected layouts. Browser checks verified
slide bounds, exact clipboard contents, enlargement and return to the same
slide in normal and selectable-text modes. The headless preview's screen-wake-lock
restriction produced no other page errors. Full-deck browser checks passed for
all 18 section overviews, including layout and keyboard navigation. Identity,
notes/corrections, navigation/PDF-destination and short-version tests pass.
No README rebuild, source snapshot update or PDF export was performed.

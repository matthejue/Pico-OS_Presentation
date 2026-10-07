# Readability review · 7 October 2026

Crowded slides now give their examples more space. Useful explanations move
to a roomier existing slide or a separate follow-up in the same subsection;
spacious examples retain their accompanying bullets.

The `.ivt` assembly example's two bullets appear on its immediate next slide.
The linked-output example follows that explanation with its full slide area.
The assembly text grows from 11.55 to 16.06 displayed pixels in the same
1440 × 810 browser viewport, approximately 39% larger.

Reviewed placements are stored in
[`config/readme-readability.mjs`](../config/readme-readability.mjs), keyed by
README section and source asset rather than slide number. Six compressed
combinations now use separate full-width slides, including kernel entry,
wait queues, signal tables, directory streams, bootloader transfer, and worker
code. Request, environment, and stream tables use smaller row groups.

[`ReadmeVisual`](../components/ReadmeVisual.vue) reflows text at a larger
preferred size before reducing it to fit the available height. Intrinsic source
width no longer limits text enlargement in spacious panels. Table cells wrap
long words when their column requires it.

The full deck expands from 341 to 389 slides: 40 explanation slides and eight
additional artifact slides. All 341 original slide UUIDs remain. Code, diagrams,
images, recordings, and substantive lists stay complete. The saved source README
and its commit remain identical.

In the same 1440 × 810 viewport, slides with code or table body text below
13.5 displayed pixels decrease from 55 to 11. The remaining cases contain
long source examples or dense reference tables; their complete enlarged views
remain available.

Verification includes every slide's bounds, clipping, alignment, hierarchy,
numbering, and displayed font sizes; contents and all 18 section overviews;
zoom, selection, navigation, and recording playback; source coverage; stable
identities and notes; regeneration; and the static production build.
The measured slide results are in [`slide-audit.json`](slide-audit.json).

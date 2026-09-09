# Source review · 9 September 2026

The presentation follows the exact PicoOS README saved in
`.source/Pico-OS-README.md`. Chapter introductions with no independent visual
content are represented by the main titles of their subsection slides. The
function catalogs in sections 4.7, 5.6 and 9.4 are omitted; section 6.4 retains
its parent-death behavior without its function table. Other kernel function
tables are also omitted. Data-structure tables are reduced to fields and
ownership relevant to the explanation.

The cover artwork, hardware composition, compiler example, memory bars,
timeline styling and command/test grids were retained or adapted from the
previous presentation at the user's request. The manually configured light
palette remains, with cyan, amber and green accents. Other diagrams and source
excerpts come from the primary README, with long sequences split or focused
and compiler pipeline stages rearranged into columns.

## Inconsistencies within the primary README

- **Test counts:** section 15.1's prose and table state 62 classes: 12 library,
  22 OS feature and 28 shell. Its diagram still says 61 / 49 / 27; the opening
  build section and section 12.8 also contain older counts. The slides use
  section 15.1's prose/table consistently and update the diagram labels.
- **Initial working directory:** section 11.2.1's sequence and closing paragraph
  still describe obtaining a host startup directory using `pwd`. Sections
  5.3 and 9.6 describe the current contract: PID 1 starts at PicoOS `/`, and a
  child inherits its parent's guest working directory. The slides follow
  those sections and do not reproduce the stale init-directory sequence.
- **Mutex behavior:** section 6.5 explicitly documents a possible missed wakeup
  between failed `TSL` and `sleep()`. The slides retain that limitation next to
  the implementation and in the final limitations overview; the controlled
  teaching example is not presented as proof of preemption safety.

The README itself was not edited. Test inventories and generated image/layout
numbers are source-reported figures, not results of a new PicoOS test run.
No new sibling README claims were added; the revised deck is tracked against
the primary README alone.

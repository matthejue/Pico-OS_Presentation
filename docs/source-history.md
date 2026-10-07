# Source snapshots and comparisons

The source-update rule from
`/home/areo/Documents/AI-Vault/skills/PicoOS_Presentation/presentation.md`
is documented here and implemented by the comparison and saving scripts.

Exactly one current pair lives directly in `.source/`:

- `Pico-OS-README-<date>.md`: exact README bytes used for the validated deck.
- `source-state-<date>.json`: current Pico-OS commit, README SHA-256, dirty
  state, update date, slide count, and the paired snapshot path.

`<date>` is the source update date in Europe/Berlin, formatted `YYYY-MM-DD`.
Previous pairs live in `.source/history/`. Both locations use the consistent
`Pico-OS-README-<date>.md` spelling; the `.md-<date>` spelling in the archive
bullet of the supplied rule is treated as a filename typo.
The check scripts discover the current dated state and verify its snapshot
hash; no undated baseline copies are maintained.

## Updating the source baseline

1. Apply any pending short-version selection before editing slides.
2. Run `yarn source:compare`. It reads the saved source commit, compares it
   with current Pico-OS HEAD, lists committed changes across the repository,
   reports staged, unstaged, and untracked files, and prints the exact saved
   README-to-current-README diff. Inspect the relevant patches with
   `git -C ../Pico-OS diff <saved-commit> HEAD -- <affected-paths>` and the
   working-tree changes with `git -C ../Pico-OS diff <saved-commit> -- <affected-paths>`.
   Review linked images, diagrams, recordings, and generators even when
   README.md itself is unchanged. Untracked files require direct inspection.
3. Deduce the necessary slide updates from that comparison. Review moved
   headings, authored summaries, layouts, source assets, notes, and selections.
4. Rebuild and validate the exact candidate, keeping the old baseline in place:

   ```sh
   PRESENTATION_SOURCE=../Pico-OS/README.md yarn rebuild:readme
   PRESENTATION_SOURCE=../Pico-OS/README.md yarn test:source
   ```

   Follow the rendering, navigation, full/short deck, and development-server
   checks in [source review](source-review.md) and [README](../README.md).
   Do not generate a PDF.
5. After validation, run `yarn source:save`. It checks that the candidate,
   current README, coverage hash, and slide counts agree, archives the old
   pair, and writes the new pair with current Pico-OS HEAD. It records the
   previous source commit/hash as `comparisonBase`. These consistency checks
   do not replace rendered-deck validation.
6. Update the current snapshot links and review documentation, then synchronize
   short-version selections.

`README_REPOSITORY` can override the source repository. `PRESENTATION_SOURCE`
can select a validation candidate; saving requires that its exact bytes match
the current README in the source repository.

Repeated saves of an unchanged clean source and deck do nothing. Source commits
that change only diagrams still advance the recorded commit. Dirty repositories
are recorded explicitly. Archives use the previous save timestamp when present
(stored as UTC), otherwise its original update date; a numeric suffix avoids
overwriting any existing pair on the same date or timestamp.

## Reconstructed history

On 7 October 2026, 17 previous snapshot pairs were recovered from the
presentation repository's Git history across all refs, from 3 August through 5 October.
The current 7 October pair was renamed to the dated format.

Each archived README is byte-identical to its committed presentation snapshot
and matches the original metadata's SHA-256. Source snapshots marked dirty
retain their uncommitted edits; replacing them with `git show <source-commit>:README.md`
would lose those edits. Metadata fields are retained, with only `snapshot`
changed to the corresponding archived path. Metadata-only revisions, such as
slide-count changes, also retain their own pair. Identical pairs and the move
of `source-state.json` into `.source/` are not duplicated.

Recovered filenames use the presentation commit's author timestamp, including
its timezone, to distinguish several updates on a single day. The original
`generatedAt` is preserved, even when it precedes the commit date: the version
committed on 14 August still records 13 August, and the version committed on
5 October still records 4 October. These are recovered commit times, not
invented generation times. No unsaved intermediate README versions are inferred.

The alternate historical commit `1c207b3` shares an author timestamp and README
bytes with `ecdc4b3`, but records a different Pico-OS commit. Its filename adds
`-1c207b3` to preserve that metadata revision without a timestamp collision.

[`.source/history/reconstruction.json`](../.source/history/reconstruction.json)
maps every recovered pair to its presentation commit, author and committer
dates, original paths, Git blob IDs, and original metadata hash. Recover the
original JSON with `git show <presentation-commit>:<originalStatePath>`;
recover its exact README with
`git show <presentation-commit>:.source/Pico-OS-README.md`.

Run `yarn test:source-state` to check all recovered hashes and provenance and
exercise comparison and saving in an isolated temporary repository.

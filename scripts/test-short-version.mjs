import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  applySelection,
  applySelectionToMarkdown,
  formatSlideNumbers,
  inspectSlides,
  parseSlideNumbers,
  syncSelection,
  toggleSelection,
} from './short-version.mjs'

const sample = `---
title: Test
---

<!-- SOURCE Pico-OS/README.md#one -->

# One

---

<!-- SOURCE Pico-OS/README.md#two -->

# Two

---

<!-- SOURCE Pico-OS/README.md#three -->

# Three
`

assert.deepEqual(parseSlideNumbers('3 1\n3\t2\n'), [1, 2, 3])
assert.equal(formatSlideNumbers([3, 1, 3]), '1 3\n')
assert.throws(() => parseSlideNumbers('1 two'), /invalid slide number/)

const applied = applySelectionToMarkdown(sample, [2])
assert.deepEqual(inspectSlides(applied.markdown), { slideCount: 3, disabled: [2] })
assert.equal((applied.markdown.match(/SHORT_VERSION_DISABLED/g) ?? []).length, 1)
assert.throws(() => applySelectionToMarkdown(sample, [4]), /outside the 1-3 range/)

const testDirectory = await mkdtemp(join(tmpdir(), 'picoos-short-version-'))
const slidesPath = join(testDirectory, 'slides.md')
const selectionPath = join(testDirectory, 'selection.txt')
await Promise.all([
  writeFile(slidesPath, sample, 'utf8'),
  writeFile(selectionPath, '1 3\n', 'utf8'),
])

await applySelection({ slidesPath, selectionPath })
assert.deepEqual(inspectSlides(await readFile(slidesPath, 'utf8')).disabled, [1, 3])
await toggleSelection(3, selectionPath)
assert.equal(await readFile(selectionPath, 'utf8'), '1\n')
await syncSelection({ slidesPath, selectionPath })
assert.equal(await readFile(selectionPath, 'utf8'), '1 3\n')

console.log('Short-version selection and slide-marker tests passed.')

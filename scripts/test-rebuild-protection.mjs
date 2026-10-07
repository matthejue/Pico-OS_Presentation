import assert from 'node:assert/strict'
import { readFile, writeFile, cp, symlink, mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { ensureSlideIdentities, inspectSlideIdentities } from './slide-identities.mjs'
import { protectRebuild, rebuildRemovalIds } from './rebuild-protection.mjs'
import { loadSourceState } from './source-state.mjs'

const uuidA = '9d30b5de-5530-4a48-a81e-a986707db9fb'
const uuidB = '60bed78a-d5b0-4e49-a2b7-c609224cdd35'
const uuidC = '6c1e2254-cc8a-4f2b-b1e0-856390d13e4c'
const marker = '<!-- SHORT_VERSION_DISABLED -->'
const slide = (id, title, body = '', excluded = false) => `<!-- SLIDE_ID ${id} -->\n<!-- SOURCE Pico-OS/README.md#shared -->\n${excluded ? marker + '\n' : ''}\n# ${title}\n\n${body}`
const deck = (...slides) => slides.join('\n\n---\n\n') + '\n'
const previous = deck(slide(uuidA, 'One', 'Body A'), slide(uuidB, 'Two', 'Body B', true))

// A replacement can leave the count unchanged or even increase it.
for (const candidate of [
  deck(slide(uuidA, 'One')),
  deck(slide(uuidA, 'One'), slide(uuidC, 'Replacement')),
  deck(slide(uuidA, 'One'), slide(uuidC, 'Replacement'), slide('703b8e58-2623-4d47-8d35-113d4044cfc5', 'Added')),
]) {
  assert.throws(() => protectRebuild(previous, candidate), error =>
    error.message.includes('No output was replaced') && error.message.includes(uuidB) && error.message.includes('Two'))
}
assert.throws(() => protectRebuild(previous, deck(slide(uuidB, 'Two'))), /One/, 'even a previously visible slide is protected')
assert.throws(() => protectRebuild(previous, '# Unidentified\n'), /stable SLIDE_ID/)

const reordered = deck(slide(uuidB, 'Renamed Two', 'Updated B'), slide(uuidC, 'New', 'New content', true), slide(uuidA, 'Renamed One', 'Updated A', true))
const result = protectRebuild(previous, reordered)
assert.deepEqual(inspectSlideIdentities(result).map(slide => [slide.id, slide.excluded]), [
  [uuidB, true], [uuidC, false], [uuidA, false],
], 'reordering, renaming and content edits retain choices by UUID; new slides stay visible')
assert.equal(protectRebuild(previous, result), result, 'protection is idempotent')
assert.equal(protectRebuild(previous.replaceAll('\n', '\r\n'), reordered.replaceAll('\n', '\r\n')).replaceAll('\r\n', '\n'), result, 'CRLF deck retains slide identity and selection')
assert.ok(!/(?<!\r)\n/.test(protectRebuild(previous.replaceAll('\n', '\r\n'), reordered.replaceAll('\n', '\r\n'))), 'inserted markers preserve CRLF line endings')

const fencedBody = `\`\`\`html\n${marker}\n\`\`\``
const fencedPrevious = deck(slide(uuidA, 'One', fencedBody, true))
const fencedResult = protectRebuild(fencedPrevious, deck(slide(uuidA, 'One', fencedBody)))
assert.ok(fencedResult.includes(fencedBody), 'marker examples inside code fences remain untouched')
assert.equal(inspectSlideIdentities(fencedResult)[0].excluded, true)
const frontmatter = `---\ntitle: Protected deck\n---\n\n${slide(uuidA, 'One')}\n\n---\nlayout: center\n---\n\n${slide(uuidB, 'Two')}`
assert.deepEqual(inspectSlideIdentities(protectRebuild(previous, frontmatter)).map(slide => slide.excluded), [false, true], 'slide frontmatter is not confused with boundaries')
assert.throws(() => protectRebuild(previous, frontmatter.replace('layout: center', 'disabled: true')), /permanently disable/)

const deliberatelyRemoved = protectRebuild(previous, deck(slide(uuidA, 'One')), [uuidB])
assert.equal(inspectSlideIdentities(deliberatelyRemoved).length, 1, 'explicit removal of one exact UUID is supported')
assert.throws(() => protectRebuild(previous, deck(slide(uuidA, 'One')), [uuidC]), /must identify an existing slide/)
assert.throws(() => protectRebuild(previous, previous, [uuidB]), /must identify an existing slide/, 'stale removal authorizations fail')
assert.deepEqual(rebuildRemovalIds([`--remove-slide=${uuidB.toUpperCase()}`]), [uuidB])
assert.throws(() => rebuildRemovalIds(['--force']), /Unknown rebuild argument/)
assert.throws(() => rebuildRemovalIds(['--remove-slide=123']), /Unknown rebuild argument/)

const actual = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
const withoutIds = actual.replace(/^<!-- SLIDE_ID [0-9a-f-]+ -->\r?\n/gmi, '')
const actualRebuild = protectRebuild(actual, ensureSlideIdentities(withoutIds, actual))
assert.deepEqual(inspectSlideIdentities(actualRebuild).map(slide => [slide.id, slide.excluded]),
  inspectSlideIdentities(actual).map(slide => [slide.id, slide.excluded]), 'every actual slide and its short-version choice survives a rebuild')

// Exercise the real generator in an isolated checkout. Reproduce the original
// silent omission, including its introOnly exemption, without touching the deck.
const root = fileURLToPath(new URL('../', import.meta.url))
const fixture = await mkdtemp(path.join(tmpdir(), 'pico-rebuild-guard-'))
const originalCwd = process.cwd()
const originalArgs = process.argv
const originalSource = process.env.PRESENTATION_SOURCE
const originalRepository = process.env.README_REPOSITORY
try {
  for (const directory of ['scripts', 'config', 'docs'])
    await cp(path.join(root, directory), path.join(fixture, directory), { recursive: true })
  await writeFile(path.join(fixture, 'slides.md'), actual)
  await symlink(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'), 'dir')
  const configPath = path.join(fixture, 'config/readme-prose.json')
  const prose = JSON.parse(await readFile(configPath, 'utf8'))
  delete prose['421-loading-a-process-load-library-call']
  await writeFile(configPath, JSON.stringify(prose))
  const generatorPath = path.join(fixture, 'scripts/rebuild-from-readme.mjs')
  const generator = await readFile(generatorPath, 'utf8')
  await writeFile(generatorPath, generator.replace('const introOnly=new Set([', "const introOnly=new Set(['421-loading-a-process-load-library-call',"))
  const outputs = ['slides.md', 'config/section-overviews.json', 'docs/readme-coverage.json', 'docs/readme-prose-review.json']
  const before = await Promise.all(outputs.map(filename => readFile(path.join(fixture, filename), 'utf8')))
  process.chdir(fixture)
  process.argv = [process.execPath, generatorPath]
  const baseline = await loadSourceState(root)
  process.env.PRESENTATION_SOURCE = baseline.snapshotPath
  process.env.README_REPOSITORY = originalRepository || path.resolve(root, '../Pico-OS')
  await assert.rejects(import(pathToFileURL(generatorPath).href), error =>
    /Rebuild would remove/.test(error.message) && /Loading a process/.test(error.message) && /No output was replaced/.test(error.message),
  'the real generator refuses the original silent omission')
  assert.deepEqual(await Promise.all(outputs.map(filename => readFile(path.join(fixture, filename), 'utf8'))), before,
    'a rejected rebuild leaves the deck and all generated metadata untouched')
  await assert.rejects(stat(path.join(fixture, 'public')), { code: 'ENOENT' }, 'a rejected rebuild writes no image outputs')
} finally {
  process.chdir(originalCwd)
  process.argv = originalArgs
  if (originalSource === undefined) delete process.env.PRESENTATION_SOURCE
  else process.env.PRESENTATION_SOURCE = originalSource
  if (originalRepository === undefined) delete process.env.README_REPOSITORY
  else process.env.README_REPOSITORY = originalRepository
  await rm(fixture, { recursive: true, force: true })
}
console.log('Rebuild protection passed: slide loss, replacements, exact removals, visibility, full-deck identities, and a real rejected rebuild with unchanged outputs.')

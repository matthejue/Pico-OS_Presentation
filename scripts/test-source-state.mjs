import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { loadSourceState, compareSource, saveSource } from './source-state.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const execute = promisify(execFile)
const git = async (cwd, ...args) => (await execute('git', ['-C', cwd, ...args], { encoding: 'buffer', maxBuffer: 32 * 1024 * 1024 })).stdout
const reconstruction = JSON.parse(await fs.readFile(path.join(root, '.source/history/reconstruction.json'), 'utf8'))
for (const entry of reconstruction.versions) {
  const state = JSON.parse(await fs.readFile(path.join(root, entry.state), 'utf8'))
  const snapshot = await fs.readFile(path.join(root, entry.snapshot))
  const original = await git(root, 'show', `${entry.presentationCommit}:${entry.originalStatePath}`)
  assert.equal(hash(original), entry.originalStateSha256)
  assert.equal(state.primarySource.snapshot, entry.snapshot)
  assert.equal(hash(snapshot), state.primarySource.contentSha256)
  assert.deepEqual(snapshot, await git(root, 'show', `${entry.presentationCommit}:.source/Pico-OS-README.md`))
  const expected = JSON.parse(original)
  expected.primarySource.snapshot = entry.snapshot
  assert.deepEqual(state, expected, 'Original metadata retained except the paired archive path')
}
await loadSourceState()

const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'picoos-source-state-'))
const oldRepository = process.env.README_REPOSITORY
const oldCandidate = process.env.PRESENTATION_SOURCE
const oldLog = console.log
const output = []
try {
  const repository = path.join(temporary, 'Pico-OS')
  const presentation = path.join(temporary, 'presentation')
  await fs.mkdir(repository)
  await fs.mkdir(path.join(presentation, '.source'), { recursive: true })
  await fs.mkdir(path.join(presentation, 'docs'))
  await git(repository, 'init', '-q')
  await git(repository, 'config', 'user.name', 'Source state test')
  await git(repository, 'config', 'user.email', 'source-test@example.invalid')
  const before = '# PicoOS\n\nBefore\n'
  await fs.writeFile(path.join(repository, 'README.md'), before)
  await git(repository, 'add', '.')
  await git(repository, 'commit', '-qm', 'Initial source')
  const commit = (await git(repository, 'rev-parse', 'HEAD')).toString().trim()
  const state = {
    schemaVersion: 1, generatedAt: '2026-10-06', slideCount: 1,
    primarySource: {
      repository, file: 'README.md', commit, contentSha256: hash(before),
      dirtyAtGeneration: false, snapshot: '.source/Pico-OS-README-2026-10-06.md',
    },
  }
  await fs.writeFile(path.join(presentation, state.primarySource.snapshot), before)
  await fs.writeFile(path.join(presentation, '.source/source-state-2026-10-06.json'), JSON.stringify(state))
  await fs.writeFile(path.join(presentation, 'slides.md'), '<!-- SOURCE Pico-OS/README.md#picoos -->\n\n# Example\n')
  await fs.writeFile(path.join(presentation, 'docs/readme-coverage.json'), JSON.stringify({ sourceSha256: hash(before), slideCount: 1 }))
  process.env.README_REPOSITORY = repository
  delete process.env.PRESENTATION_SOURCE
  console.log = (...args) => output.push(args.join(' '))
  await saveSource(presentation)
  assert.equal((await fs.readdir(path.join(presentation, '.source'))).length, 2, 'Unchanged source is not archived')

  const after = '# PicoOS\n\nAfter\n'
  await fs.writeFile(path.join(repository, 'README.md'), after)
  await compareSource(presentation)
  assert.ok(output.some(line => line.includes('-Before') && line.includes('+After')), 'Dirty README diff is returned successfully')
  await assert.rejects(saveSource(presentation), /Deck coverage does not match/)
  assert.equal((await loadSourceState(presentation)).state.primarySource.commit, commit)
  await fs.writeFile(path.join(presentation, 'docs/readme-coverage.json'), JSON.stringify({ sourceSha256: hash(after), slideCount: 1 }))
  await saveSource(presentation, new Date('2026-10-06T22:30:00Z'))
  const saved = await loadSourceState(presentation)
  assert.ok(saved.snapshotPath.endsWith('2026-10-07.md'), 'Berlin date differs correctly from UTC at midnight')
  assert.equal(saved.state.primarySource.dirtyAtGeneration, true)
  assert.equal(saved.snapshot.toString(), after)
  const archive = path.join(presentation, '.source/history')
  assert.equal(await fs.readFile(path.join(archive, 'Pico-OS-README-2026-10-06.md'), 'utf8'), before)
  assert.equal(saved.state.comparisonBase.commit, commit)

  await git(repository, 'add', '.')
  await git(repository, 'commit', '-qm', 'Changed README')
  await saveSource(presentation, new Date('2026-10-07T12:00:00Z'))
  await fs.writeFile(path.join(repository, 'diagram.svg'), '<svg />')
  await git(repository, 'add', '.')
  await git(repository, 'commit', '-qm', 'README display asset only')
  await saveSource(presentation, new Date('2026-10-07T12:00:00Z'))
  const filesBefore = await fs.readdir(archive)
  const dirtyAgain = after + '\nDirty again\n'
  await fs.writeFile(path.join(repository, 'README.md'), dirtyAgain)
  await fs.writeFile(path.join(presentation, 'docs/readme-coverage.json'), JSON.stringify({ sourceSha256: hash(dirtyAgain), slideCount: 1 }))
  await saveSource(presentation, new Date('2026-10-07T12:00:00Z'))
  const filesAfter = await fs.readdir(archive)
  assert.equal(filesAfter.length, filesBefore.length + 2, 'Repeated timestamps preserve every pair')
  assert.ok(filesBefore.every(file => filesAfter.includes(file)))
  for (const file of filesAfter.filter(file => file.startsWith('source-state-'))) {
    const archived = JSON.parse(await fs.readFile(path.join(archive, file), 'utf8'))
    assert.equal(hash(await fs.readFile(path.join(presentation, archived.primarySource.snapshot))), archived.primarySource.contentSha256)
  }
  await fs.writeFile((await loadSourceState(presentation)).snapshotPath, 'Corrupted')
  await assert.rejects(loadSourceState(presentation), /hash does not match/)
} finally {
  console.log = oldLog
  if (oldRepository === undefined) delete process.env.README_REPOSITORY
  else process.env.README_REPOSITORY = oldRepository
  if (oldCandidate === undefined) delete process.env.PRESENTATION_SOURCE
  else process.env.PRESENTATION_SOURCE = oldCandidate
  await fs.rm(temporary, { recursive: true, force: true })
}
console.log(`Verified ${reconstruction.versions.length} recovered source pairs, dirty comparisons, validation guards, Berlin dates, asset-only commits, and archive preservation.`)

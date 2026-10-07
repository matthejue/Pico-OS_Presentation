import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { inspectSlides } from './short-version.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const execute = promisify(execFile)
const git = async (repository, ...args) => (await execute('git', ['-C', repository, ...args], { maxBuffer: 32 * 1024 * 1024 })).stdout
const berlinDate = now => new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(now)

export async function loadSourceState(directory = root) {
  const files = (await fs.readdir(path.join(directory, '.source')))
    .filter(name => /^source-state-\d{4}-\d{2}-\d{2}\.json$/.test(name))
  if (files.length !== 1) throw new Error(`Expected one current dated source-state file; found ${files.length}`)
  const statePath = path.join(directory, '.source', files[0])
  const state = JSON.parse(await fs.readFile(statePath, 'utf8'))
  const snapshotPath = path.resolve(directory, state.primarySource.snapshot)
  const expected = path.join(directory, '.source', files[0].replace('source-state-', 'Pico-OS-README-').replace(/\.json$/, '.md'))
  if (snapshotPath !== expected) throw new Error('Source metadata must reference its paired dated README')
  const snapshot = await fs.readFile(snapshotPath)
  if (hash(snapshot) !== state.primarySource.contentSha256) throw new Error('Saved README hash does not match source metadata')
  return { statePath, snapshotPath, snapshot, state }
}

export async function compareSource(directory = root) {
  const baseline = await loadSourceState(directory)
  const repository = process.env.README_REPOSITORY || baseline.state.primarySource.repository
  const commit = (await git(repository, 'rev-parse', 'HEAD')).trim()
  const previous = baseline.state.primarySource.commit
  // All paths are intentional: README display also depends on linked assets
  // and generators, which can change without a README.md edit.
  console.log(`Saved source: ${previous}\nCurrent source: ${commit}\nBaseline: ${baseline.state.primarySource.snapshot}`)
  for (const [label, args] of [
    ['Commits since the saved source', ['log', '--oneline', `${previous}..${commit}`]],
    ['Committed changes (including README assets and generators)', ['diff', '--stat', previous, commit]],
    ['Working tree and untracked files', ['status', '--short']],
    ['Staged and unstaged changes since the saved source', ['diff', '--stat', previous]],
  ]) console.log(`\n${label}:\n${(await git(repository, ...args)).trim() || '(none)'}`)
  console.log('\nExact saved README versus current README:')
  let diff
  try {
    diff = (await execute('git', ['diff', '--no-index', '--', baseline.snapshotPath, path.join(repository, 'README.md')], {
      encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
    })).stdout
  } catch (error) {
    if (error.code !== 1 || error.stdout === undefined) throw error
    diff = error.stdout
  }
  console.log(diff || '(identical)')
}

export async function saveSource(directory = root, now = new Date()) {
  const baseline = await loadSourceState(directory)
  const repository = process.env.README_REPOSITORY || baseline.state.primarySource.repository
  const requestedCommit = process.env.PRESENTATION_SOURCE_COMMIT
  const commit = (await git(repository, 'rev-parse', requestedCommit || 'HEAD')).trim()
  const workingTreeDirty = Boolean((await git(repository, 'status', '--porcelain')).length)
  const dirty = requestedCommit ? false : workingTreeDirty
  const readme = requestedCommit ? Buffer.from(await git(repository, 'show', `${commit}:README.md`))
    : await fs.readFile(path.join(repository, 'README.md'))
  const candidate = await fs.readFile(process.env.PRESENTATION_SOURCE || path.join(repository, 'README.md'))
  if (!candidate.equals(readme)) throw new Error('Validated candidate must match the selected Pico-OS README bytes')
  const coverage = JSON.parse(await fs.readFile(path.join(directory, 'docs/readme-coverage.json'), 'utf8'))
  if (coverage.sourceSha256 !== hash(readme)) throw new Error('Deck coverage does not match the current README; rebuild and validate first')
  const slideCount = inspectSlides(await fs.readFile(path.join(directory, 'slides.md'), 'utf8')).slideCount
  if (coverage.slideCount !== slideCount) throw new Error('Coverage and deck slide counts differ')
  if (commit === baseline.state.primarySource.commit && readme.equals(baseline.snapshot)
    && slideCount === baseline.state.slideCount && !dirty && !baseline.state.primarySource.dirtyAtGeneration) {
    console.log('Saved source already matches the current commit, README, and deck.')
    return
  }
  const date = berlinDate(now)
  const snapshot = `.source/Pico-OS-README-${date}.md`
  const statePath = path.join(directory, `.source/source-state-${date}.json`)
  const primarySource = { ...baseline.state.primarySource }
  delete primarySource.selection
  delete primarySource.workingTreeChangesExcluded
  const state = {
    ...baseline.state, generatedAt: date, savedAt: now.toISOString(), slideCount,
    primarySource: {
      ...primarySource, repository, commit, snapshot,
      contentSha256: hash(readme),
      dirtyAtGeneration: dirty,
      ...(requestedCommit ? { selection: 'commit', workingTreeChangesExcluded: workingTreeDirty } : {}),
    },
    comparisonBase: {
      commit: baseline.state.primarySource.commit,
      contentSha256: baseline.state.primarySource.contentSha256,
    },
  }
  const history = path.join(directory, '.source/history')
  await fs.mkdir(history, { recursive: true })
  const stamp = (baseline.state.savedAt || baseline.state.generatedAt).replace(/:/g, '-')
  let suffix = stamp
  for (let n = 2; ; n++) {
    const archivedSnapshot = `.source/history/Pico-OS-README-${suffix}.md`
    const archivedState = path.join(history, `source-state-${suffix}.json`)
    const existing = await fs.readdir(history)
    if (existing.includes(path.basename(archivedSnapshot)) || existing.includes(path.basename(archivedState))) {
      suffix = `${stamp}-${n}`
      continue
    }
    await fs.writeFile(path.join(directory, archivedSnapshot), baseline.snapshot, { flag: 'wx' })
    await fs.writeFile(archivedState, JSON.stringify({
      ...baseline.state,
      primarySource: { ...baseline.state.primarySource, snapshot: archivedSnapshot },
    }, null, 2) + '\n', { flag: 'wx' })
    break
  }
  // Archive both old files before replacing the current baseline.
  await fs.writeFile(path.join(directory, snapshot), readme)
  await fs.writeFile(statePath, JSON.stringify(state, null, 2) + '\n')
  if (baseline.statePath !== statePath) {
    await fs.unlink(baseline.statePath)
    await fs.unlink(baseline.snapshotPath)
  }
  console.log(`Saved ${snapshot} and ${path.relative(directory, statePath)}; previous pair archived in .source/history/.`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const action = process.argv[2]
  if (action === 'compare') await compareSource()
  else if (action === 'save') await saveSource()
  else throw new Error('Usage: node scripts/source-state.mjs compare|save')
}

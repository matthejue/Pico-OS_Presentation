import assert from 'node:assert/strict'
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createSlideNotesStore, MAX_NOTE_BYTES } from './slide-notes.mjs'

const firstId = 'ba1c5141-e8c1-4c85-bbde-fb4d6f038bec'
const secondId = '34f22a0b-eb90-47e0-a64c-33b97ec16ae8'
const thirdId = '5bcebd29-de68-453d-bcf0-82bedb1dcd91'
const slide = (id, title, body = '') => `<!-- SLIDE_ID ${id} -->\n\n# ${title}\n\n${body}`
const deck = (...slides) => `---\ntitle: Notes regression fixture\n---\n\n${slides.join('\n\n---\n\n')}\n`
const status = expected => error => {
  assert.equal(error.status, expected, error.message)
  return true
}

async function withFixture(test) {
  const directory = await mkdtemp(join(tmpdir(), 'picoos-slide-notes-'))
  const slidesPath = join(directory, 'slides.md')
  const notesDirectory = join(directory, 'notes')
  await writeFile(slidesPath, deck(slide(firstId, 'Alpha'), slide(secondId, 'Beta')))
  const store = createSlideNotesStore({ slidesPath, notesDirectory })
  try {
    await test({ directory, slidesPath, notesDirectory, store })
  }
  finally {
    await rm(directory, { recursive: true, force: true })
  }
}

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const blank = await store.read(firstId)
  assert.equal(blank.slideId, firstId)
  assert.equal(blank.slideNumber, 1)
  assert.equal(blank.slideTitle, 'Alpha')
  assert.equal(blank.content, '')
  assert.equal(blank.revision, null)
  assert.equal(blank.filename, null)

  const content = '# Speaker note\n\n- Mention ünicode.\n\n```md\n---\nslide_id: this is note text\n```\n'
  const saved = await store.save(firstId, { content, revision: null })
  assert.equal(saved.content, content, 'Markdown whitespace and fenced metadata text are preserved')
  assert.match(saved.revision, /\S+/)
  assert.match(saved.filename, new RegExp(`^slide-0*1-alpha--${firstId}\\.md$`))
  const markdown = await readFile(join(notesDirectory, saved.filename), 'utf8')
  assert.match(markdown, new RegExp(`slide_id:\\s*["']?${firstId}`))
  assert.match(markdown, /slide_number:\s*1\b/)
  assert.match(markdown, /slide_title:\s*["']?Alpha/)
  assert.ok(markdown.endsWith(content), 'Repository file contains the original Markdown note')

  const reopened = createSlideNotesStore({ slidesPath, notesDirectory })
  assert.deepEqual(await reopened.read(firstId), saved, 'Notes survive a fresh store instance')
  const records = await reopened.all()
  assert.equal(records[firstId]?.content, content)

  await writeFile(slidesPath, deck(slide(secondId, 'Beta'), slide(firstId, 'Alpha renamed')))
  await store.syncMetadata()
  const moved = await store.read(firstId)
  assert.equal(moved.slideNumber, 2)
  assert.equal(moved.slideTitle, 'Alpha renamed')
  assert.equal(moved.content, content)
  assert.match(moved.filename, new RegExp(`^slide-0*2-alpha-renamed--${firstId}\\.md$`))
  assert.deepEqual(await readdir(notesDirectory), [moved.filename], 'Renaming does not leave a duplicate old note')
  const updatedMarkdown = await readFile(join(notesDirectory, moved.filename), 'utf8')
  assert.match(updatedMarkdown, /slide_number:\s*2\b/)
  assert.match(updatedMarkdown, /slide_title:\s*["']?Alpha renamed/)
})

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  await writeFile(slidesPath, deck(slide(firstId, 'Repeated title'), slide(secondId, 'Repeated title')))
  const first = await store.save(firstId, { content: 'First slide note', revision: null })
  const second = await store.save(secondId, { content: 'Second slide note', revision: null })
  assert.notEqual(first.filename, second.filename)
  assert.equal((await readdir(notesDirectory)).length, 2)
  await writeFile(slidesPath, deck(slide(secondId, 'Repeated title'), slide(firstId, 'Repeated title')))
  await store.syncMetadata()
  assert.equal((await store.read(firstId)).content, 'First slide note')
  assert.equal((await store.read(secondId)).content, 'Second slide note')
})

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const original = await store.save(firstId, { content: 'Original note', revision: null })
  const otherClient = createSlideNotesStore({ slidesPath, notesDirectory })
  const updated = await store.save(firstId, { content: 'Newer note', revision: original.revision })
  await assert.rejects(otherClient.save(firstId, { content: 'Stale overwrite', revision: original.revision }), status(409))
  await assert.rejects(store.save(firstId, { content: 'Recreate existing note', revision: null }), status(409))
  assert.equal((await store.read(firstId)).content, 'Newer note')

  const race = await Promise.allSettled([
    store.save(firstId, { content: 'Concurrent A', revision: updated.revision }),
    store.save(firstId, { content: 'Concurrent B', revision: updated.revision }),
  ])
  assert.equal(race.filter(result => result.status === 'fulfilled').length, 1, 'Only one concurrent writer may use a revision')
  const loser = race.find(result => result.status === 'rejected')
  assert.equal(loser.reason.status, 409)
  assert.ok(['Concurrent A', 'Concurrent B'].includes((await store.read(firstId)).content))

  const newest = await store.read(firstId)
  const serverRace = await Promise.allSettled([
    store.save(firstId, { content: 'Server A', revision: newest.revision }),
    otherClient.save(firstId, { content: 'Server B', revision: newest.revision }),
  ])
  assert.equal(serverRace.filter(result => result.status === 'fulfilled').length, 1, 'Multiple server instances cannot overwrite each other')
  assert.equal(serverRace.find(result => result.status === 'rejected').reason.status, 409)
})

await withFixture(async ({ notesDirectory, store }) => {
  const original = await store.save(firstId, { content: 'Keep me intact', revision: null })
  const originalPath = join(notesDirectory, original.filename)
  const duplicatePath = join(notesDirectory, `slide-099-duplicate--${firstId}.md`)
  await copyFile(originalPath, duplicatePath)
  const before = await readFile(originalPath, 'utf8')
  await assert.rejects(store.read(firstId), status(500))
  await assert.rejects(store.save(firstId, { content: 'Must not replace corruption', revision: original.revision }), status(500))
  await assert.rejects(store.syncMetadata(), status(500))
  assert.equal(await readFile(originalPath, 'utf8'), before)
  assert.equal(await readFile(duplicatePath, 'utf8'), before)
})

await withFixture(async ({ notesDirectory, store }) => {
  const original = await store.save(firstId, { content: 'Recoverable note', revision: null })
  const filename = join(notesDirectory, original.filename)
  const malformed = '---\nslide_id: [unterminated\n---\nRecoverable note\n'
  await writeFile(filename, malformed)
  await assert.rejects(store.read(firstId), status(500))
  await assert.rejects(store.save(firstId, { content: 'Must not erase malformed file', revision: original.revision }), status(500))
  assert.equal(await readFile(filename, 'utf8'), malformed)
})

await withFixture(async ({ directory, notesDirectory, store }) => {
  for (const id of ['../../escaped', `${firstId}/../../escaped`, '', null, 1]) {
    await assert.rejects(store.read(id), status(400))
    await assert.rejects(store.save(id, { content: 'Invalid path', revision: null }), status(400))
  }
  await assert.rejects(store.read(thirdId), status(404))
  await assert.rejects(store.save(thirdId, { content: 'Unknown slide', revision: null }), status(404))
  for (const body of [null, {}, { content: 4, revision: null }, { content: 'Text', revision: {} }])
    await assert.rejects(store.save(firstId, body), status(400))
  await assert.rejects(store.save(firstId, { content: 'x'.repeat(MAX_NOTE_BYTES + 1), revision: null }), status(413))
  assert.deepEqual((await readdir(directory)).filter(name => name !== 'slides.md' && name !== 'notes'), [])
  assert.deepEqual(await readdir(notesDirectory).catch(error => error.code === 'ENOENT' ? [] : Promise.reject(error)), [])
})

await withFixture(async ({ store }) => {
  const maximumContent = 'ü'.repeat(MAX_NOTE_BYTES / 2)
  const saved = await store.save(firstId, { content: maximumContent, revision: null })
  assert.equal(saved.content, maximumContent, 'The limit is measured in UTF-8 bytes')
  await assert.rejects(store.save(firstId, { content: `${maximumContent}ü`, revision: saved.revision }), status(413))
  assert.equal((await store.read(firstId)).content, maximumContent, 'Oversized saves preserve the previous note')
})

await withFixture(async ({ directory, notesDirectory, store }) => {
  const target = join(directory, 'elsewhere')
  await mkdir(target)
  await writeFile(join(target, 'untouched.md'), 'Outside the notes directory')
  await symlink(target, notesDirectory)
  await assert.rejects(store.read(firstId), status(500))
  await assert.rejects(store.save(firstId, { content: 'Must not follow directory symlink', revision: null }), status(500))
  assert.deepEqual(await readdir(target), ['untouched.md'])
})

await withFixture(async ({ directory, notesDirectory, store }) => {
  await mkdir(notesDirectory)
  const target = join(directory, 'outside.md')
  await writeFile(target, 'Outside note remains intact')
  await symlink(target, join(notesDirectory, `slide-001-alpha--${firstId}.md`))
  await assert.rejects(store.read(firstId), status(500))
  await assert.rejects(store.save(firstId, { content: 'Must not follow file symlink', revision: null }), status(500))
  assert.equal(await readFile(target, 'utf8'), 'Outside note remains intact')
})

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const original = await store.save(firstId, { content: 'Preserve removed slide note', revision: null })
  const filename = join(notesDirectory, original.filename)
  const before = await readFile(filename, 'utf8')
  await writeFile(slidesPath, deck(slide(secondId, 'Beta')))
  await store.syncMetadata()
  await assert.rejects(store.read(firstId), status(404))
  assert.equal(await readFile(filename, 'utf8'), before, 'Removed slide notes are retained for recovery')
  await writeFile(slidesPath, deck(slide(secondId, 'Beta'), slide(firstId, 'Returned Alpha')))
  await store.syncMetadata()
  assert.equal((await store.read(firstId)).content, original.content, 'Reintroducing the identity reconnects the note')
})

console.log('Slide-note persistence, stable identity, metadata refresh, concurrency, corruption, validation, and orphan recovery passed.')

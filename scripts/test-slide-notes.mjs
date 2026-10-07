import assert from 'node:assert/strict'
import { copyFile, mkdir, mkdtemp, readFile, readdir, rename, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createSlideNotesStore, MAX_CORRECTION_IMAGE_BYTES, MAX_NOTE_BYTES } from './slide-notes.mjs'

const firstId = 'ba1c5141-e8c1-4c85-bbde-fb4d6f038bec'
const secondId = '34f22a0b-eb90-47e0-a64c-33b97ec16ae8'
const thirdId = '5bcebd29-de68-453d-bcf0-82bedb1dcd91'
const slide = (id, title, body = '') => `<!-- SLIDE_ID ${id} -->\n\n# ${title}\n\n${body}`
const deck = (...slides) => `---\ntitle: Notes regression fixture\n---\n\n${slides.join('\n\n---\n\n')}\n`
const status = expected => error => {
  assert.equal(error.status, expected, error.message)
  return true
}

async function withFixture(test, corrections = false) {
  const directory = await mkdtemp(join(tmpdir(), 'picoos-slide-notes-'))
  const slidesPath = join(directory, 'slides.md')
  const notesDirectory = join(directory, corrections ? 'Corrections' : 'notes')
  await writeFile(slidesPath, deck(slide(firstId, 'Alpha'), slide(secondId, 'Beta')))
  const store = createSlideNotesStore({ slidesPath, notesDirectory, corrections })
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

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN1cAAAAASUVORK5CYII=', 'base64')
await withFixture(async ({ notesDirectory, store }) => {
  assert.equal((await store.read(firstId)).filename, null)
  await store.syncMetadata()
  for (const content of ['', '   \n\t\n']) {
    const empty = await store.save(firstId, { content, revision: null })
    assert.equal(empty.filename, null, 'Blank corrections do not create a Markdown file')
    assert.equal(empty.revision, null)
    assert.equal(empty.content, '')
  }
  const image = await store.saveImage(firstId, png)
  const imageOnly = await store.read(firstId)
  assert.equal(imageOnly.filename, null, 'Saving only a screenshot does not create Markdown')
  assert.equal(imageOnly.revision, null)
  await store.syncMetadata()
  assert.ok(!(await readdir(notesDirectory)).some(filename => filename.endsWith('.md')))
  await store.deleteImage(firstId, image.imageId)
  const saved = await store.save(firstId, { content: '- Written correction\n', revision: null })
  assert.ok(saved.filename)
  const cleared = await store.save(firstId, { content: '', revision: saved.revision })
  assert.equal(cleared.filename, saved.filename, 'Clearing existing text does not silently delete the file')
}, true)

await withFixture(async ({ directory, slidesPath, notesDirectory, store }) => {
  const noteStore = createSlideNotesStore({ slidesPath, notesDirectory: join(directory, 'notes') })
  await noteStore.save(firstId, { content: 'Independent speaker note', revision: null })
  const content = '- Correct **the diagram**.\n- Rename the label.\n'
  const saved = await store.save(firstId, { content, revision: null })
  assert.match(await readFile(join(notesDirectory, saved.filename), 'utf8'), new RegExp(`slide_id: "${firstId}"`))
  await assert.rejects(store.save(firstId, { content: 'Missing bullet', revision: saved.revision }), status(400))
  await assert.rejects(store.save(firstId, { content: '- Good\nUnbulleted second line', revision: saved.revision }), status(400))
  await assert.rejects(store.save(firstId, { content: '- Stale', revision: null }), status(409))
  assert.equal((await noteStore.read(firstId)).content, 'Independent speaker note')
  const image = await store.saveImage(firstId, png)
  const secondImage = await store.saveImage(firstId, png)
  const imageOnly = await store.saveImage(secondId, png)
  assert.notEqual(image.imageId, secondImage.imageId, 'Multiple clipboard images cannot replace each other')
  assert.deepEqual(await store.readImage(firstId, image.imageId), png)
  assert.deepEqual(await store.readImage(secondId, imageOnly.imageId), png)
  await assert.rejects(store.readImage(secondId, image.imageId), status(404))
  await assert.rejects(store.readImage(firstId, '../../outside'), status(400))
  await assert.rejects(store.saveImage(thirdId, png), status(404))
  await assert.rejects(store.saveImage(firstId, Buffer.from('not PNG')), status(415))
  await assert.rejects(store.saveImage(firstId, Buffer.concat([png, Buffer.alloc(MAX_CORRECTION_IMAGE_BYTES)])), status(413))
  assert.equal((await store.read(firstId)).revision, saved.revision, 'Saving images leaves the Markdown revision intact')
  assert.deepEqual((await store.read(firstId)).images, [image, secondImage].sort((a, b) => a.filename.localeCompare(b.filename)))
  const metadata = JSON.parse(await readFile(join(notesDirectory, `${image.filename}.json`), 'utf8'))
  assert.equal(metadata.slide_id, firstId)
  assert.equal(metadata.slide_number, 1)
  assert.equal(metadata.slide_title, 'Alpha')
  assert.equal(metadata.filename, image.filename)
  assert.equal(metadata.image_id, image.imageId)
  assert.equal((await store.all())[secondId].images[0].imageId, imageOnly.imageId, 'Static builds include image-only corrections')

  await writeFile(slidesPath, deck(slide(secondId, 'Beta'), slide(firstId, 'Renamed Alpha', '<div class="new-layout">Changed layout</div>')))
  await store.syncMetadata()
  const moved = await store.read(firstId)
  assert.equal(moved.content, content)
  assert.equal(moved.slideNumber, 2)
  assert.equal(moved.slideTitle, 'Renamed Alpha')
  assert.match(moved.filename, new RegExp(`^slide-002-renamed-alpha--${firstId}\\.md$`))
  for (const item of moved.images) {
    assert.match(item.filename, new RegExp(`^slide-002-renamed-alpha--${firstId}--screenshot-`))
    const refreshed = JSON.parse(await readFile(join(notesDirectory, `${item.filename}.json`), 'utf8'))
    assert.equal(refreshed.slide_id, firstId)
    assert.equal(refreshed.slide_number, 2)
    assert.equal(refreshed.slide_title, 'Renamed Alpha')
    assert.deepEqual(await store.readImage(firstId, item.imageId), png)
  }
  assert.ok(!(await readdir(notesDirectory)).includes(image.filename), 'Image renaming leaves no outdated duplicate')
  const reopened = createSlideNotesStore({ slidesPath, notesDirectory, corrections: true })
  assert.deepEqual(await reopened.read(firstId), moved, 'Corrections and screenshots survive a fresh store instance')
  await writeFile(slidesPath, deck(slide(secondId, 'Beta')))
  await store.syncMetadata()
  assert.ok((await readdir(notesDirectory)).includes(moved.images[0].filename), 'Removed slide screenshots are retained')
  await assert.rejects(store.read(firstId), status(404))
  await writeFile(slidesPath, deck(slide(firstId, 'Returned Alpha'), slide(secondId, 'Beta')))
  await store.syncMetadata()
  assert.equal((await store.read(firstId)).content, content)
  assert.deepEqual(await store.readImage(firstId, image.imageId), png, 'Restoring a slide UUID reconnects its screenshots')
}, true)

await withFixture(async ({ directory, notesDirectory, store }) => {
  const image = await store.saveImage(firstId, png)
  const metadataPath = join(notesDirectory, `${image.filename}.json`)
  const original = await readFile(metadataPath, 'utf8')
  await writeFile(metadataPath, '{broken metadata')
  await assert.rejects(store.read(firstId), status(500))
  await assert.rejects(store.syncMetadata(), status(500))
  await writeFile(metadataPath, original)
  await rm(join(notesDirectory, image.filename))
  const outside = join(directory, 'outside.png')
  await writeFile(outside, png)
  await symlink(outside, join(notesDirectory, image.filename))
  await assert.rejects(store.readImage(firstId, image.imageId), status(500))
  await assert.rejects(store.syncMetadata(), status(500))
  assert.deepEqual(await readFile(outside), png)
}, true)

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const saved = await store.save(firstId, { content: '- Keep this text\n', revision: null })
  const missing = await store.saveImage(firstId, png)
  const missingPath = join(notesDirectory, missing.filename)
  await rm(missingPath)
  assert.deepEqual((await store.read(firstId)).images, [], 'A deleted PNG does not break correction loading')
  assert.deepEqual((await store.all())[firstId].images, [], 'Missing images are omitted from static builds')
  await assert.rejects(store.readImage(firstId, missing.imageId), status(404))
  const replacement = await store.saveImage(firstId, png)
  const otherSlide = await store.saveImage(secondId, png)
  await assert.rejects(store.deleteImage(secondId, replacement.imageId), status(404))
  assert.deepEqual(await store.readImage(firstId, replacement.imageId), png, 'Wrong-slide deletion cannot remove an image')
  const deleted = await store.deleteImage(firstId, replacement.imageId)
  assert.equal(deleted.content, saved.content)
  assert.equal(deleted.revision, saved.revision, 'Deleting an image leaves the Markdown revision intact')
  assert.deepEqual(deleted.images, [])
  assert.ok(!(await readdir(notesDirectory)).includes(replacement.filename))
  assert.ok(!(await readdir(notesDirectory)).includes(`${replacement.filename}.json`))
  assert.deepEqual(await store.deleteImage(firstId, replacement.imageId), deleted, 'Repeated deletion succeeds')
  await store.deleteImage(firstId, missing.imageId)
  assert.ok(!(await readdir(notesDirectory)).includes(`${missing.filename}.json`), 'Deleting an already missing image removes its sidecar')
  await assert.rejects(store.deleteImage(firstId, '../outside'), status(400))
  await assert.rejects(store.deleteImage(thirdId, replacement.imageId), status(404))
  await writeFile(slidesPath, deck(slide(secondId, 'Beta renamed'), slide(firstId, 'Alpha')))
  await store.syncMetadata()
  assert.deepEqual(await store.readImage(secondId, otherSlide.imageId), png, 'Other slides remain intact')
  const archived = await store.saveImage(firstId, png)
  await rename(join(notesDirectory, archived.filename), join(notesDirectory, `x_${archived.filename}`))
  await store.syncMetadata()
  const archivedName = (await store.read(firstId)).images[0].filename
  await store.deleteImage(firstId, archived.imageId)
  assert.ok(!(await readdir(notesDirectory)).includes(archivedName), 'Excluded screenshots can be deleted in the editor')
  assert.ok(!(await readdir(notesDirectory)).includes(`${archivedName}.json`))
}, true)

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const image = await store.saveImage(firstId, png)
  await rm(join(notesDirectory, image.filename))
  await writeFile(slidesPath, deck(slide(secondId, 'Beta'), slide(firstId, 'Alpha renamed')))
  await store.syncMetadata()
  assert.deepEqual((await store.read(firstId)).images, [], 'Metadata refresh ignores missing screenshots')
  assert.deepEqual(await store.all(), {}, 'An orphan sidecar alone does not create a correction record')
  const replacement = await store.saveImage(firstId, png)
  assert.deepEqual(await store.readImage(firstId, replacement.imageId), png, 'A replacement can be saved after reordering')
}, true)

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const content = '- Pending\n-[x] Compact completed\n- [X] Standard completed\n- [ ] Unchecked\n'
  const saved = await store.save(firstId, { content, revision: null })
  await rename(join(notesDirectory, saved.filename), join(notesDirectory, `x_${saved.filename}`))
  const hidden = await store.read(firstId)
  assert.equal(hidden.filename, `x_${saved.filename}`)
  const edited = await store.save(firstId, { content: `${content}- New pending\n`, revision: hidden.revision })
  assert.equal(edited.filename, hidden.filename, 'Editing does not clear a file exclusion')
  for (const mode of ['image', 'sidecar', 'both']) {
    const image = await store.saveImage(firstId, png)
    const path = join(notesDirectory, image.filename)
    if (mode !== 'sidecar') await rename(path, join(notesDirectory, `x_${image.filename}`))
    if (mode !== 'image') await rename(`${path}.json`, join(notesDirectory, `x_${image.filename}.json`))
    const listed = (await store.read(firstId)).images.find(item => item.imageId === image.imageId)
    assert.ok(listed.filename.startsWith('x_'), 'Prefixing the image, sidecar, or both marks it hidden')
    assert.deepEqual(await store.readImage(firstId, image.imageId), png, 'Excluded images remain accessible to the editor')
  }
  await writeFile(slidesPath, deck(slide(secondId, 'Beta'), slide(firstId, 'Alpha renamed')))
  await store.syncMetadata()
  const moved = await store.read(firstId)
  assert.match(moved.filename, /^x_slide-002-alpha-renamed--/)
  assert.equal(moved.content, edited.content)
  for (const image of moved.images) {
    assert.match(image.filename, /^x_slide-002-alpha-renamed--/)
    const metadata = JSON.parse(await readFile(join(notesDirectory, `${image.filename}.json`), 'utf8'))
    assert.equal(metadata.slide_id, firstId)
    assert.equal(metadata.filename, image.filename)
    assert.deepEqual(await store.readImage(firstId, image.imageId), png)
  }
  await store.syncMetadata()
  assert.deepEqual(await store.read(firstId), moved, 'Excluded filenames are stable across repeated synchronization')
}, true)

await withFixture(async ({ slidesPath, notesDirectory, store }) => {
  const first = await store.saveImage(firstId, png)
  const second = await store.saveImage(secondId, png)
  const excluded = await store.saveImage(firstId, png)
  const existingMetadata = await store.saveImage(secondId, png)
  await rm(join(notesDirectory, existingMetadata.filename))
  const misleadingFilename = `slide-999-alpha--${firstId}--screenshot-${existingMetadata.imageId}.png`
  await writeFile(join(notesDirectory, misleadingFilename), png)
  for (const image of [first, second, excluded]) await rm(join(notesDirectory, `${image.filename}.json`))
  await rename(join(notesDirectory, excluded.filename), join(notesDirectory, `x_${excluded.filename}`))
  const staleFilename = `slide-999-wrong-number-and-title--${firstId}--screenshot-${first.imageId}.png`
  await rename(join(notesDirectory, first.filename), join(notesDirectory, staleFilename))
  const unknownFilename = `slide-001-alpha--${thirdId}--screenshot-60bed78a-d5b0-4e49-a2b7-c609224cdd35.png`
  await writeFile(join(notesDirectory, unknownFilename), png)
  await writeFile(slidesPath, deck(slide(secondId, 'Beta moved'), slide(firstId, 'Alpha renamed', '<div>New layout</div>')))
  const restarted = createSlideNotesStore({ slidesPath, notesDirectory, corrections: true })
  await restarted.syncMetadata()
  const recovered = await restarted.read(firstId)
  assert.equal(recovered.images.length, 2, 'Restart reconnects screenshots whose sidecars are missing')
  assert.equal(recovered.slideNumber, 2)
  for (const image of recovered.images) {
    assert.match(image.filename, /^(?:x_)?slide-002-alpha-renamed--/)
    const metadata = JSON.parse(await readFile(join(notesDirectory, `${image.filename}.json`), 'utf8'))
    assert.equal(metadata.slide_id, firstId, 'Recovery uses the UUID, never the old number or title')
    assert.equal(metadata.slide_title, 'Alpha renamed')
    assert.equal(metadata.image_id, image.imageId)
    assert.deepEqual(await restarted.readImage(firstId, image.imageId), png)
  }
  assert.ok(recovered.images.find(image => image.imageId === excluded.imageId).filename.startsWith('x_'))
  assert.equal((await restarted.read(secondId)).images[0].imageId, second.imageId)
  assert.deepEqual(await restarted.readImage(secondId, second.imageId), png)
  await restarted.syncMetadata()
  assert.deepEqual(await restarted.read(firstId), recovered, 'Recovery is idempotent')
  assert.ok(!(await readdir(notesDirectory)).includes(`${unknownFilename}.json`), 'Unrecognized slide UUIDs are never reassigned by number or title')
  assert.deepEqual(await readFile(join(notesDirectory, unknownFilename)), png)
  assert.ok(!(await readdir(notesDirectory)).includes(`${misleadingFilename}.json`), 'Existing metadata stays authoritative even when its PNG is missing')
}, true)

console.log('Notes and corrections: UUID associations, Markdown, screenshots, metadata refresh, conflicts, exclusions, validation, and restart recovery passed.')

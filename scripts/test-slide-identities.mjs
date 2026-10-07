import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { ensureSlideIdentities, inspectSlideIdentities, slideIdPattern } from './slide-identities.mjs'

const uuidA = '9d30b5de-5530-4a48-a81e-a986707db9fb'
const uuidB = '60bed78a-d5b0-4e49-a2b7-c609224cdd35'
const uuidC = '6c1e2254-cc8a-4f2b-b1e0-856390d13e4c'
const source = (anchor, title, body, id) => `${id ? `<!-- SLIDE_ID ${id} -->\n` : ''}<!-- SOURCE Pico-OS/README.md#${anchor} -->\n\n# ${title}\n\n${body}`
const deck = (...slides) => slides.join('\n\n---\n\n') + '\n'
const ids = markdown => inspectSlideIdentities(markdown).map(slide => slide.id)
const withoutIds = markdown => markdown.replace(/^<!-- SLIDE_ID [0-9a-f-]+ -->\r?\n/gmi, '')

const initial = deck(source('one', 'One', 'First body'), source('two', 'Two', 'Second body'))
const identified = ensureSlideIdentities(initial)
assert.equal(inspectSlideIdentities(identified).length, 2, 'inserting IDs retains actual Slidev boundaries')
assert.ok(ids(identified).every(id => slideIdPattern.test(id)))
assert.equal(new Set(ids(identified)).size, 2)
assert.equal(ensureSlideIdentities(identified), identified, 'ID assignment is idempotent')
assert.equal(withoutIds(identified), initial, 'identity assignment changes no authored content')

const old = deck(source('one', 'One', 'First body', uuidA), source('two', 'Two', 'Second body', uuidB))
const moved = deck(source('two', 'Renamed', 'Changed body', uuidB), source('new', 'New', 'Fresh'), source('one', 'One', 'First body', uuidA))
const movedSlides = inspectSlideIdentities(ensureSlideIdentities(moved))
assert.deepEqual(movedSlides.map(slide => [slide.number, slide.title, slide.id]).filter(slide => [uuidA, uuidB].includes(slide[2])), [
  [1, 'Renamed', uuidB], [3, 'One', uuidA],
], 'explicit UUID follows reordering, title changes and content changes')

const rebuilt = ensureSlideIdentities(deck(source('two', 'Two', 'Updated body'), source('one-renamed', 'Renamed One', 'First body')), old)
assert.deepEqual(ids(rebuilt), [uuidB, uuidA], 'rebuild uses unique anchor/title or unchanged body, independent of number')

const repeatedTitles = deck(source('shared', 'Shared', 'Body A', uuidA), source('shared', 'Shared', 'Body B', uuidB))
assert.deepEqual(ids(ensureSlideIdentities(deck(source('shared', 'Shared', 'Body B'), source('shared', 'Shared', 'Body A')), repeatedTitles)), [uuidB, uuidA])
const ambiguous = deck(source('shared', 'Shared', 'Same body', uuidA), source('shared', 'Shared', 'Same body', uuidB))
const ambiguousResult = ids(ensureSlideIdentities(withoutIds(ambiguous), ambiguous))
assert.ok(ambiguousResult.every(id => ![uuidA, uuidB].includes(id)), 'ambiguous bodies and anchor/titles never inherit an arbitrary old ID')

const rolePrevious = deck(source('shared', 'Shared', '<SectionOverview section="shared" />', uuidA), source('shared', 'Shared', 'Content', uuidB))
assert.deepEqual(ids(ensureSlideIdentities(deck(source('shared', 'Shared', 'Updated content')), rolePrevious)), [uuidB], 'overview and content with the same title stay separate')
const emptyPrevious = deck(`# One\n\n<!-- SLIDE_ID ${uuidA} -->`)
assert.notEqual(ids(ensureSlideIdentities(deck('# Completely different'), emptyPrevious))[0], uuidA, 'empty bodies do not create a false match')

const beforeListRemoval = deck(
  source('shared', 'Shared (1)', 'Bullet overview', uuidA),
  source('shared', 'Shared (2)', '<!-- README_ASSET code-100 -->\nCode\n<!-- README_ASSET list-110 -->\nBullets', uuidB),
)
const afterListRemoval = deck(source('shared', 'Shared', '<!-- README_ASSET code-100 -->\nCode'))
assert.deepEqual(ids(ensureSlideIdentities(afterListRemoval, beforeListRemoval)), [uuidB],
  'remaining code keeps its own UUID when list removal changes its body and numbered title')
const sharedArtifacts = deck(source('shared', 'Shared', '<!-- README_ASSET code-100 -->\nA', uuidA),
  source('shared', 'Shared', '<!-- README_ASSET code-100 -->\nB', uuidB))
assert.ok(ids(ensureSlideIdentities(deck(source('changed', 'Changed', '<!-- README_ASSET code-100 -->\nNew')), sharedArtifacts))
  .every(id => ![uuidA, uuidB].includes(id)), 'ambiguous asset reuse cannot arbitrarily transfer an identity')

const frontmatter = `---\ntheme: default\ntitle: Front matter\n---\n\n# First\n\nBody\n\n---\nlayout: center\n---\n\n# Second\n\n\`\`\`md\n---\n<!-- SLIDE_ID not-a-real-id -->\n# Not the slide title\n\`\`\`\n\n<!--\nSpeaker note with a separator\n---\n-->\n`
const frontmatterIdentified = ensureSlideIdentities(frontmatter)
assert.equal(inspectSlideIdentities(frontmatterIdentified).length, 2, 'YAML, fenced separators and multiline comments follow Slidev parsing')
assert.deepEqual(inspectSlideIdentities(frontmatterIdentified).map(slide => slide.title), ['First', 'Second'])
assert.equal(withoutIds(frontmatterIdentified), frontmatter, 'frontmatter/code/notes are byte-preserved')
assert.equal(ensureSlideIdentities(initial.replaceAll('\n', '\r\n')).replaceAll('\r\n', '\n').replace(/^<!-- SLIDE_ID [0-9a-f-]+ -->\n/gmi, ''), initial, 'CRLF is retained')

assert.throws(() => ensureSlideIdentities(deck(source('one', 'One', 'First', uuidA), source('two', 'Two', 'Second', uuidA))), /Duplicate SLIDE_ID/)
assert.throws(() => ensureSlideIdentities(deck(`<!-- SLIDE_ID ${uuidA} -->\n<!-- SLIDE_ID ${uuidC} -->\n# Twice`)), /more than one SLIDE_ID/)
assert.throws(() => ensureSlideIdentities(deck('<!-- SLIDE_ID invalid -->\n# Invalid')), /malformed SLIDE_ID/)
assert.throws(() => ensureSlideIdentities(deck('<!-- SLIDE_IDtypo -->\n# Invalid')), /malformed SLIDE_ID/)
assert.throws(() => ensureSlideIdentities(deck('<!-- SLIDE_ID unclosed\n# Invalid')), /malformed SLIDE_ID/)
assert.throws(() => ensureSlideIdentities(initial, deck(source('one', 'One', 'First', uuidA), source('two', 'Two', 'Second', uuidA))), /Duplicate SLIDE_ID/, 'invalid previous identity state also fails')

const actual = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
assert.ok(ids(actual).length > 0)
assert.ok(ids(actual).every(Boolean), 'every repository slide has an ID')
assert.equal(new Set(ids(actual)).size, ids(actual).length)
assert.deepEqual(ids(ensureSlideIdentities(withoutIds(actual), actual)), ids(actual), 'complete actual deck rebuild restores all identities')
console.log('Slide UUID assignment, movement, rebuild matching, ambiguity and parser boundaries passed.')

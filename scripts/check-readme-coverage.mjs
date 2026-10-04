import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { readmeSource, md, hash, displayHtml } from './readme-source.mjs'
import { styleSourceSvg } from '../config/visual-palette.mjs'

const sourcePath=process.env.PRESENTATION_SOURCE || '.source/Pico-OS-README.md'
const source=await fs.readFile(sourcePath,'utf8')
const deck=await fs.readFile('slides.md','utf8')
const inventory=JSON.parse(await fs.readFile('docs/readme-coverage.json','utf8'))
const {assets}=readmeSource(source)
assert.equal(inventory.sourceSha256,hash(source))
const deckFences=md.parse(deck,{}).filter(t=>t.type==='fence')
for(const a of assets) {
  const entry=inventory.assets.find(e=>e.id===a.id)
  assert.ok(entry,`Inventory includes ${a.id}`)
  assert.equal(entry.sourceSha256,a.sha256,`${a.id}: exact source version`)
  if(a.navigationOnly) { assert.ok(entry.excluded);continue }
  assert.ok(entry.slides.length,`${a.id}: placed on a slide`)
  assert.ok(deck.includes(`<!-- README_ASSET ${a.id}`),`${a.id}: source marker present`)
  if(a.type==='code'||a.type==='mermaid')assert.ok(deckFences.some(f=>f.content===a.content),`${a.id}: complete, unchanged source body`)
  if(a.type==='table') {
    assert.ok(deck.includes(displayHtml(a.header)),`${a.id}: all original column headers preserved`)
    const placements=entry.slides.filter(p=>!p.repeated).flatMap(p=>Array.from({length:p.rows[1]-p.rows[0]+1},(_,i)=>p.rows[0]+i))
    assert.deepEqual(placements,a.rows.map((_,i)=>i+1),`${a.id}: every row exactly once and in order`)
    for(const row of a.rows)assert.ok(deck.includes(displayHtml(row)),`${a.id}: every original cell preserved`)
  }
  if(a.type==='image') {
    const original=await fs.readFile(path.resolve(process.env.README_REPOSITORY || '../Pico-OS',a.path))
    assert.equal(hash(original),entry.originalFileSha256)
    const copied=await fs.readFile(entry.copiedFile)
    if(a.path.endsWith('.svg'))assert.equal(copied.toString(),styleSourceSvg(original.toString()),`${a.id}: only palette, font, and rectangle-corner substitutions`)
    else assert.equal(hash(copied),hash(original),`${a.id}: original raster unchanged`)
  }
  if(a.type==='list') {
    const summaries=JSON.parse(await fs.readFile('config/readme-lists.json','utf8'))[a.id]
    const itemCount=md.parse(a.raw,{}).filter(t=>t.type==='list_item_open'&&t.level===1).length
    assert.equal(summaries.length,itemCount,`${a.id}: every list item represented`)
    for(const item of summaries)assert.ok(deck.includes(displayHtml(md.renderInline(item))),`${a.id}: summary present`)
  }
}
const cover=await fs.readFile('config/title-slide.md','utf8')
assert.ok(deck.startsWith(cover.trimEnd()),'Title slide preserved exactly')
console.log(`Verified ${assets.filter(a=>!a.navigationOnly).length} README artifacts: complete code and Mermaid, all table cells and list items, all original image compositions, and unchanged cover.`)

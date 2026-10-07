import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import {readmeSource,md,hash,displayHtml,plain,presentationText} from './readme-source.mjs'
import {prepareTable} from '../config/readme-tables.mjs'
import {loadSourceState} from './source-state.mjs'
import {applySvgEdits} from '../config/readme-svg-edits.mjs'
const sourcePath=process.env.PRESENTATION_SOURCE || (await loadSourceState()).snapshotPath
const source=await fs.readFile(sourcePath,'utf8'),rawDeck=await fs.readFile('slides.md','utf8')
// Persistent identity is invisible metadata, independent of source coverage.
const deck=rawDeck.replace(/^<!-- SLIDE_ID [0-9a-f-]+ -->\r?\n/gmi,'')
const inventory=JSON.parse(await fs.readFile('docs/readme-coverage.json','utf8'))
const {assets}=readmeSource(source),fences=md.parse(deck,{}).filter(t=>t.type==='fence')
const summaries=JSON.parse(await fs.readFile('config/readme-lists.json','utf8'))
const codeLabels=JSON.parse(await fs.readFile('config/readme-code-labels.json','utf8'))
assert.equal(inventory.sourceSha256,hash(source))
for(const a of assets) {
 const entry=inventory.assets.find(e=>e.id===a.id)
 assert.ok(entry,`${a.id}: inventoried`);assert.equal(entry.sourceSha256,a.sha256)
 if(a.navigationOnly){assert.ok(entry.excluded);continue}
 if(a.type==='table') {
  const table=prepareTable(a)
  assert.equal(table.columns,a.columns,`${a.id}: all source table columns retained`)
  if(!table.compactRows?.length){assert.ok(entry.excluded);assert.equal(entry.slides.length,0);continue}
  assert.equal(table.unresolved.length,0,`${a.id}: every verbose cell reviewed`)
  assert.deepEqual(entry.retainedRows,table.retainedRows,`${a.id}: library-facing row selection`)
  assert.deepEqual(entry.slides.filter(p=>!p.repeated).flatMap(p=>p.rows),table.retainedRows,`${a.id}: retained rows complete and ordered`)
  for(const row of table.compactRows)for(const cell of row.values)assert.ok(deck.includes(cell.html),`${a.id}: summarized cell present`)
 }
 assert.ok(entry.slides.length,`${a.id}: placed`)
 assert.ok(deck.includes(`<!-- README_ASSET ${a.id}`),`${a.id}: artifact marker`)
 if(a.type==='mermaid')assert.ok(fences.some(f=>f.content===presentationText(a.content)),`${a.id}: complete diagram with presentation spelling`)
 if(a.type==='math')assert.ok(deck.includes(a.content),`${a.id}: complete source equation`)
 if(a.type==='code') {
  const lines=a.content.split('\n');if(lines.at(-1)==='')lines.pop()
  const parts=[...deck.matchAll(new RegExp(`<!-- README_CODE_PART ${a.id} lines=(\\d+)-(\\d+) -->[\\s\\S]*?\x60\x60\x60[^\\n]*\\n([\\s\\S]*?)\x60\x60\x60`,'g'))]
  assert.ok(parts.length,`${a.id}: code parts present`)
  const original=part=>a.language!=='console'&&/\/input\.txt$/.test(codeLabels[a.id]||'')?part.replace(/^PicoOS> /gm,''):part
  for(const part of parts)assert.equal(original(part[3]),presentationText(lines.slice(Number(part[1])-1,Number(part[2])).join('\n')+'\n'),`${a.id}: exact original lines, apart from terminal prompts and presentation spelling`)
  const ranges=[...new Map(parts.map(p=>[p[1],p])).values()].sort((a,b)=>Number(a[1])-Number(b[1]))
  assert.equal(ranges[0][1],'1');assert.equal(Number(ranges.at(-1)[2]),lines.length)
  for(let i=1;i<ranges.length;i++)assert.equal(Number(ranges[i][1]),Number(ranges[i-1][2])+1,`${a.id}: no omitted/duplicated boundary lines`)
  assert.equal(ranges.map(p=>original(p[3])).join(''),presentationText(a.content),`${a.id}: split parts reconstruct the full example`)
  if(codeLabels[a.id])assert.ok(deck.includes(`<span>${codeLabels[a.id].replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}</span>`),`${a.id}: filename visible in shared code header`)
 }
 if(a.type==='image') {
  const original=await fs.readFile(path.resolve(process.env.README_REPOSITORY||'../Pico-OS',a.path)),copied=await fs.readFile(entry.copiedFile)
  assert.equal(hash(original),entry.originalFileSha256)
  const expected=a.path.endsWith('.svg')?Buffer.from(applySvgEdits(path.basename(a.path),presentationText(original.toString('utf8')))):original
  assert.equal(copied.toString('base64'),expected.toString('base64'),`${a.id}: source image retained with reviewed presentation corrections`)
 }
 if(a.type==='list') {
  const count=md.parse(a.raw,{}).filter(t=>t.type==='list_item_open'&&t.level===1).length
  assert.equal(summaries[a.id].length,count,`${a.id}: every source list item represented`)
  assert.deepEqual(entry.slides.flatMap(p=>p.items),Array.from({length:count},(_,i)=>i+1))
  for(const item of summaries[a.id].flat())assert.ok(deck.includes(displayHtml(md.renderInline(item))),`${a.id}: brief bullet present`)
 }
}
const cover=await fs.readFile('config/title-slide.md','utf8')
assert.ok(deck.startsWith(cover.trimEnd()),'Cover unchanged')
// Source code/diagram labels are preserved; authored slide text stays brief.
const prose=JSON.parse(await fs.readFile('config/readme-prose.json','utf8'))
const facts=JSON.parse(await fs.readFile('config/readme-facts.json','utf8'))
const remarks=fact=>typeof fact[0]==='string'?[fact]:fact
const bullets=[...Object.values(summaries).flat(Infinity),...Object.values(prose).flat(Infinity),...Object.values(facts).flatMap(f=>remarks(f).flatMap(note=>note[1]))]
for(const bullet of bullets)assert.ok(plain(bullet).split(/\s+/).length<=10,`Brief bullet: ${bullet}`)
for(const [anchor,items] of Object.entries(prose))for(const item of items.flat(Infinity))
 assert.ok(deck.includes(displayHtml(md.renderInline(item))),`${anchor}: reviewed prose actually appears alongside its source assets`)
for(const [anchor,fact] of Object.entries(facts))for(const item of remarks(fact).flatMap(note=>note[1]))
 assert.ok(deck.includes(displayHtml(md.renderInline(item))),`${anchor}: contextual/standards remark present`)
assert.equal((deck.slice(cover.length).match(/<(?:p|div class="readme-explanation")\b/g)||[]).length,0,'No continuous slide prose')
console.log(`Verified ${assets.filter(a=>!a.navigationOnly).length} source artifacts: full code/diagrams/images, all list items, reviewed table filtering/summaries, and brief slide text.`)

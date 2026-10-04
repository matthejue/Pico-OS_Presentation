// Source artifacts stay intact. Reviewed bullets, table summaries and composition
// are authored here/config; no source heading remap or code truncation is used.
import fs from 'node:fs/promises'
import path from 'node:path'
import {readmeSource, md, hash, plain, displayHtml} from './readme-source.mjs'
import {styleSourceSvg} from '../config/visual-palette.mjs'
import {prepareTable} from '../config/readme-tables.mjs'
import {compactGroups, renderComposed} from '../config/readme-composition.mjs'
const sourcePath=process.env.PRESENTATION_SOURCE || '../Pico-OS/README.md'
const source=await fs.readFile(sourcePath,'utf8')
const {sections,assets}=readmeSource(source)
const lists=JSON.parse(await fs.readFile('config/readme-lists.json','utf8'))
const summaries=JSON.parse(await fs.readFile('config/readme-prose.json','utf8'))
const facts=JSON.parse(await fs.readFile('config/readme-facts.json','utf8'))
const tableWidths=JSON.parse(await fs.readFile('config/readme-table-widths.json','utf8'))
const columnConfig=JSON.parse(await fs.readFile('config/readme-columns.json','utf8'))
for(const [key,shares] of Object.entries(columnConfig.shares))
 if(shares.length!==2||shares.some(n=>!Number.isFinite(n)||n<=0)||Math.abs(shares[0]+shares[1]-100)>0.01)throw Error('Invalid column shares: '+key)
const columnShares=key=>columnConfig.shares[key]||[50,50]
const columnAttributes=(key,extra='')=>`data-column-key="${key}" style="--readme-columns:minmax(0, ${columnShares(key)[0]}fr) minmax(0, ${columnShares(key)[1]}fr);${extra}"`
const codeNeed=lines=>Math.max(420,...lines.map(l=>l.length*8.6+40))
const cover=await fs.readFile('config/title-slide.md','utf8')
const previous=await fs.readFile('slides.md','utf8')
const oldInventory=JSON.parse(await fs.readFile('docs/readme-coverage.json','utf8'))
const oldAssets=new Map(oldInventory.assets.map(a=>[a.id,a]))
const excludedHashes=new Set(),excludedAnchors=new Set(),excludedOverviews=new Set()
for(const block of previous.split(/(?=<!-- SOURCE Pico-OS\/README.md#)/)) {
 if(!block.includes('<!-- SHORT_VERSION_DISABLED -->'))continue
 const anchor=block.match(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->/)?.[1]
 if(block.includes('<SectionOverview ')) {excludedOverviews.add(anchor);continue}
 const ids=[...block.matchAll(/<!-- README_ASSET (\S+)/g)].map(m=>m[1])
 if(ids.length) {
  for(const id of ids)if(oldAssets.has(id))excludedHashes.add(oldAssets.get(id).sourceSha256)
 } else excludedAnchors.add(anchor)
}
const inventory=new Map(assets.map(a=>[a.id,{id:a.id,type:a.type,anchor:a.anchor,line:a.line,endLine:a.endLine,sourceSha256:a.sha256,slides:[],...(a.path?{sourcePath:a.path}:{}),...(a.navigationOnly?{excluded:'Navigation replaced by dynamic presentation contents and section overviews'}:{})}]))
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const prose=s=>displayHtml(md.renderInline(s))
const bulletList=(items,cls='')=>{
 const content=items.map(item=>Array.isArray(item)?`${prose(item[0])}${bulletList(item.slice(1))}`:prose(item))
 if(!content.length)return ''
 if(content.length===1)return `<div class="${cls||'readme-item'}">${content[0]}</div>`
 return `<ul${cls?` class="${cls}"`:''}>${content.map(item=>`<li>${item}</li>`).join('\n')}</ul>`
}
const marker=a=>`<!-- README_ASSET ${a.id}${a.borrowed?' repeated':''} -->`
const visual=(kind,inner,width=980,classes='',attributes='')=>`<ReadmeVisual kind="${kind}" :width="${width}"${classes?` class="${classes}"`:''}${attributes?` ${attributes}`:''}>\n\n${inner}\n\n</ReadmeVisual>`
await fs.mkdir('public/readme',{recursive:true})
for(const a of assets.filter(a=>a.type==='image')) {
 const bytes=await fs.readFile(path.resolve(path.dirname(sourcePath),a.path)), name=path.basename(a.path)
 a.outputPath=`/readme/${name}`
 if(name.endsWith('.svg')) {
  const svg=bytes.toString('utf8'),box=svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
  a.aspect=box[2]/box[3]
  await fs.writeFile(`public/readme/${name}`,styleSourceSvg(svg))
 } else {a.aspect=1.5;await fs.writeFile(`public/readme/${name}`,bytes)}
 Object.assign(inventory.get(a.id),{copiedFile:`public/readme/${name}`,originalFileSha256:hash(bytes)})
}
const grids=new Set(['table-5997','table-7397','table-6992'])
const preserveVertical=new Set(['table-689','table-3726','table-7116'])
function balanced(items,capacity) {
 const count=Math.ceil(items.length/capacity),size=Math.ceil(items.length/count),result=[]
 for(let i=0;i<items.length;i+=size)result.push(items.slice(i,i+size))
 return result
}
function prepare(a) {
 if(a.type==='table') {
  const t=prepareTable(a),entry=inventory.get(a.id)
  Object.assign(entry,{retainedRows:t.retainedRows,omittedRows:t.omittedRows,displayColumns:t.headerLabels})
  if(!t.compactRows?.length){entry.excluded='Internal function table; no library-facing operation';return []}
  if(t.unresolved.length)throw Error('Missing reviewed table summary: '+JSON.stringify(t.unresolved))
  const capacity=grids.has(a.id)?(a.id==='table-7397'?9:15):t.columns<=3&&!preserveVertical.has(a.id)?24:t.columns>=5?9:14
  return balanced(t.compactRows,capacity).map(rows=>({...t,compactRows:rows,grid:grids.has(a.id),tableColumns:rows.length>=10&&t.columns<=3&&!preserveVertical.has(a.id)?2:1}))
 }
 if(a.type==='list') {
  const items=lists[a.id]
  if(!items)throw Error(`Missing reviewed list: ${a.id}`)
  return [{...a,items,itemIndices:items.map((_,i)=>i+1),listColumns:items.length>6?2:1,tiles:a.id==='list-185'}]
 }
 if(a.type==='code') {
  const lines=a.content.trimEnd().split('\n')
  return [{...a,codeLines:lines.length,split:lines.length>=22,command:a.language==='console'&&lines.length<=4}]
 }
 if(a.type==='mermaid')return [{...a,aspect:/flowchart LR/.test(a.content)?4:/flowchart (TB|TD)/.test(a.content)?0.85:1.8}]
 return [a]
}
const headerAliases={'Kernel / Library Function':'Function','Kernel function':'Kernel function','Return value / status':'Result','Return value / status and purpose':'Purpose / result','Syscalls / Host Requests':'Syscalls / host','Contribution used by PicoOS':'Contribution','Contents and purpose':'Purpose','Address direction / position':'Position','Meaning and why it exists':'Meaning','Field and containing storage':'Field / storage','RETI emulator host requests and result':'Host requests','1. Initial shell':'Initial shell','2. After opening OUT as 3, then saving 1 as 6':'Open 3; save 1 → 6','3. After installing 3 as 1 and closing 3':'3 → 1; close 3','4. Child after run setup':'Child after run','5. Shell after restoring 6 as 1 and closing 6':'Restore 6 → 1; close 6'}
function widths(table,rows,target) {
 const labels=table.headerLabels.map(x=>headerAliases[x]||x)
 const lengths=labels.map((label,i)=>{
  const values=[label,...rows.map(r=>plain(r.values[i].html))]
  const token=Math.max(...values.flatMap(v=>v.split(/\s+/)).map(v=>v.length))
  const mean=values.reduce((s,v)=>s+Math.min(v.length,80),0)/values.length
  return {minimum:Math.min(620,Math.max(75,token*8.2+26)),weight:Math.max(12,mean)}
 })
 const min=lengths.reduce((s,c)=>s+c.minimum,0),width=Math.max(target,min)
 const extra=width-min,weights=lengths.reduce((s,c)=>s+c.weight,0)
 return {width,columns:lengths.map(c=>100*(c.minimum+extra*c.weight/weights)/width),labels}
}
function renderTable(a) {
 if(a.grid) {
  const html=`<div class="readme-tiles" v-pre>${a.compactRows.map(r=>`<div class="readme-tile"><div class="tile-name">${r.values[0].html}</div>${r.values.slice(1).map(v=>`<div class="tile-detail">${v.html}</div>`).join('')}</div>`).join('\n')}</div>`
  return visual('table',html,a.id==='table-5997'?1440:1280,`inventory-grid${a.id==='table-5997'?' library-grid':''}`)
 }
 const chunks=a.tableColumns===2?balanced(a.compactRows,Math.ceil(a.compactRows.length/2)):[a.compactRows]
 const dims=chunks.map(rows=>widths(a,rows,a.tableColumns===2?650:columnConfig.tableWidths[a.id]||1080))
 // Both halves use the same column widths to make reading across them predictable.
 const maxWidth=Math.max(...dims.map(d=>d.width))
 const merged=widths(a,a.compactRows,maxWidth)
 const tableKey=a.id+':'+a.compactRows.map(r=>r.sourceRow).join(',')
 if(tableWidths[tableKey]?.length===merged.columns.length)merged.columns=tableWidths[tableKey]
 const html=chunks.map(rows=>`<div class="readme-table"><table><colgroup>${merged.columns.map(w=>`<col style="width:${w.toFixed(2)}%" />`).join('')}</colgroup><thead><tr>${merged.labels.map(label=>`<th>${prose(label)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr data-source-row="${r.sourceRow}">${r.values.map((v,i)=>`<td${i===0?' class="table-key"':''}>${v.html}</td>`).join('')}</tr>`).join('\n')}</tbody></table></div>`).join('\n')
 return visual('table',`<div class="table-panels${chunks.length===2?' table-panels-two':''}"${chunks.length===2?' '+columnAttributes('table:'+tableKey):''} v-pre>${html}</div>`,chunks.length===2?merged.width*2+24:merged.width,'',`data-table-key="${tableKey}"`)
}
function renderCode(a) {
 const sourceLines=a.content.split('\n');if(sourceLines.at(-1)==='')sourceLines.pop()
 const cut=Math.ceil(sourceLines.length/2),parts=a.split?[sourceLines.slice(0,cut),sourceLines.slice(cut)]:[sourceLines]
 const language=a.language==='reti'?'text':a.language
 const shares=columnShares('code:'+a.id)
 const budget=a.split?Math.max(...parts.map((lines,i)=>codeNeed(lines)/(shares[i]/100))):0
 const widths=a.split?shares.map(n=>budget*n/100):[a.nativeCodeWidth||Math.max(a.narrow?420:980,...sourceLines.map(l=>l.length*8.6+40))]
 let offset=0
 const boxes=parts.map((lines,i)=>{
  const start=offset+1;offset+=lines.length
  const partMarker=`<!-- README_CODE_PART ${a.id} lines=${start}-${offset} -->`
  const inner=`${partMarker}\n<div class="readme-code${a.language==='console'?' readme-terminal':''}">\n\n\`\`\`${language} {lines:false}\n${lines.join('\n')}\n\`\`\`\n\n</div>`
  return visual('code',inner,widths[i],a.command?'command-strip':'',`data-code-source="${a.id}" data-code-part="${i+1}"${a.command?` style="flex:0 0 ${Math.round((a.codeLines*21+32)*0.86)}px"`:''}`)
 })
 return a.split?`<div class="code-columns" ${columnAttributes('code:'+a.id,`--source-aspect:${(budget+24)/(parts[0].length*21+34)}`)}>\n\n${boxes.join('\n\n')}\n\n</div>`:boxes[0]
}
function render(a) {
 if(a.type==='code')return marker(a)+'\n'+renderCode(a)
 if(a.type==='table')return marker(a)+'\n'+renderTable(a)
 if(a.type==='mermaid')return marker(a)+'\n'+visual('mermaid',`\`\`\`mermaid\n${a.content}\`\`\``)
 if(a.type==='image')return marker(a)+'\n'+visual('image',`<img src="${a.outputPath}" alt="${esc(a.alt)}" />`)
 if(a.type==='list') {
  if(a.tiles)return marker(a)+`\n<div class="hardware-tiles">${a.items.map(item=>`<div class="readme-tile"><div class="tile-name">${prose(Array.isArray(item)?item[0]:item)}</div>${Array.isArray(item)?bulletList(item.slice(1)):''}</div>`).join('')}</div>`
  return marker(a)+`\n<div class="readme-list${a.listColumns===2?' bullet-columns':''}">${bulletList(a.items)}</div>`
 }
 if(a.type==='recording')return marker(a)+'\n<AsciinemaRecording src="/casts/reti_emulator.cast" title="RETI-Emulator session" poster="npt:8" fallback-href="https://asciinema.org/a/1264549" />\n<div class="slide-note">Click to play; click outside to navigate</div>'
}
const repeated={
 '116-program-sections-interrupt-table-entries-and-linker-placement':'21-reti-interrupt-entry-and-the-interrupt-service-routine-table',
 '241-syscall-selectors-and-register-convention':'722-child-waiting-with-waitpid',
 '112-kernel-startup':'1151-default-compiler-generated-_start',
 '113-init-process':'1152-picoos-libstart-startup-sequence',
 '1134-shell-startup':'1152-picoos-libstart-startup-sequence',
 '1135-loading-user-applications':'1152-picoos-libstart-startup-sequence'
}
for(const s of sections)if(s.instructions.some(x=>/waitpid code/.test(x)))repeated[s.anchor]=sections.find(s=>s.title.startsWith('7.2.2 ')).anchor
const introOnly=new Set(['1-toolchain-extensions-for-picoos','115-selecting-a-startup-function-with--c----startup-source','2-interrupts-system-calls-preemption-and-exceptions','25-timer-interrupts-and-userspace-preemption','28-cpu-exceptions-and-runtime-errors','3-memory-management-and-shared-memory','33-kernel-heap','34-process-and-shared-data-heap','35-user-process-heap','36-heap-and-allocator-function-reference','4-processes-and-process-lifecycle','42-initial-user-process-stack','43-loading-and-starting-a-process','5-shared-memory-entries-and-mappings','61-scheduler-implementation','7-blocking-wait-queues-signals-and-mutexes','73-process-signals','8-terminal-file-descriptors-and-host-filesystem','101-from-a-library-call-to-the-kernel-waitpid','1021-unistd-processes-descriptors-paths-and-wait-queues','1027-stdlib-process-heap-environment-conversion-and-exit','12-shell','13-user-applications-and-commands','14-test-system'])
const diagram=a=>['mermaid','image'].includes(a.type)
const shortCode=a=>a.type==='code'&&!a.split&&a.codeLines<=18
function compose(parts) {
 const groups=[]
 for(let i=0;i<parts.length;i++) {
  const a=parts[i],b=parts[i+1]
  let group=[a],layout='single'
  if(a.command&&b?.type==='code') {group.push(b);layout='command-above';i++}
  else if(b && !(b.command && parts[i+2]?.type==='code')) {
   if(diagram(a)&&diagram(b)) {group.push(b);layout=(a.aspect>=2.8&&b.aspect>=2.8)?'stacked':'columns';i++}
   else if(shortCode(a)&&shortCode(b)) {group.push(b);layout='columns';i++}
   else if(a.type==='list'&&shortCode(b)||shortCode(a)&&b.type==='list') {group.push(b);layout='columns';i++}
   else if(a.type==='list'&&b.type==='list') {group.push(b);layout='columns';i++}
   else if(a.type==='table'&&b.type==='table'&&a.tableColumns===1&&b.tableColumns===1&&a.compactRows.length+b.compactRows.length<=14) {group.push(b);layout=a.columns<=3&&b.columns<=3?'columns':'stacked';i++}
   else if(diagram(a)&&a.aspect>=3&&shortCode(b)&&b.codeLines<=12) {group.push(b);layout='stacked';i++}
   else if(a.type==='code'&&a.codeLines<=6&&b.type==='mermaid') {group.push(b);layout='command-above';i++}
  }
  groups.push({group,layout})
 }
 return groups
}
const pages=[]
for(const section of sections) {
 if(section.anchor==='contents')continue
 let originals=section.assets.filter(a=>!a.navigationOnly).sort((a,b)=>a.line-b.line)
 if(repeated[section.anchor]) {
  const origin=sections.find(s=>s.anchor===repeated[section.anchor])
  if(origin)originals.unshift(...origin.assets.filter(a=>a.type==='code'&&a.language==='c').map(a=>({...a,borrowed:true})))
 }
 const parts=originals.flatMap(prepare)
 let groups=compactGroups(compose(parts),section)
 if(section.anchor==='reti-execution-model')groups=[{group:parts,layout:'compact-stacked'}]
 if(section.anchor==='intended-physical-hardware')groups=[{group:parts.filter(a=>a.type==='image'),layout:'single'},{group:parts.filter(a=>a.type==='list'||a.type==='table'),layout:'hardware'}]
 if(!groups.length && summaries[section.anchor] && !introOnly.has(section.anchor))groups=[{group:[],layout:'bullets'}]
 if(section.anchor==='picoos')groups.unshift({group:[],layout:'bullets'})
 if(!groups.length && !originals.length && section.paragraphs.length && !introOnly.has(section.anchor))throw Error('Missing reviewed prose bullets: '+section.anchor)
 groups.forEach(({group,layout,panels,weights},number)=>{
  let content
  const columnKey='assets:'+group.map(a=>a.id).join('+')
  if(layout==='columns') {
   for(const a of group)if(a.type==='code')a.narrow=true
   if(group.every(a=>a.type==='code')) {
    const shares=columnShares(columnKey),budget=Math.max(...group.map((a,i)=>codeNeed(a.content.trimEnd().split('\n'))/(shares[i]/100)))
    group.forEach((a,i)=>a.nativeCodeWidth=budget*shares[i]/100)
   }
  }
  if(!group.length)content=`<div class="readme-list${summaries[section.anchor].length>6?' bullet-columns':''}">${bulletList(summaries[section.anchor])}</div>`
  else if(layout==='hardware')content=`${render(group.find(a=>a.type==='list'))}\n<div class="artifact-columns hardware-details" ${columnAttributes('hardware:details')}><div class="readme-list">${bulletList(summaries[section.anchor])}</div>\n\n${render(group.find(a=>a.type==='table'))}\n\n</div>`
  else if(section.anchor==='111-compilation-pipeline-and-compiler-passes')content=`<div class="readme-artifacts pipeline-comparison">${group.map((a,i)=>`<div class="pipeline-panel"><div class="readme-list">${bulletList(summaries[section.anchor].slice(i*3,i*3+3))}</div>\n\n${render(a)}\n\n</div>`).join('\n\n')}</div>`
  else if(layout==='composed')content=renderComposed({panels,weights},render,{columnAttributes,columnShares,codeNeed})
  else content=`<div class="readme-artifacts layout-${layout}"${layout==='columns'?' '+columnAttributes(columnKey):''}>\n\n${group.map(render).join('\n\n')}\n\n</div>`
  const fact=number===0?facts[section.anchor]:null
  if(fact)content+=`\n<aside class="context-note"><b>${esc(fact[0])}</b>${bulletList(fact[1])}</aside>`
  pages.push({section,group,layout,content,number:groups.length>1?number+1:null})
 })
}
// Overview entries retain every README heading, including headings whose
// content is presented by descendants rather than a separate introduction.
const majorSections=sections.filter(s=>!s.parents.length && /^\d+\. /.test(s.title))
const sectionOverviews=majorSections.map(s=>({
 anchor:s.anchor,
 number:s.title.match(/^\d+/)[0],
 title:plain(s.title.replace(/^\d+\.\s+/,'')),
 titleHtml:prose(s.title.replace(/^\d+\.\s+/,'')),
 entries:sections.filter(child=>child.parents[0]===s.title).map(child=>({
  anchor:child.anchor,
  number:child.title.match(/^[\d.]+/)[0],
  title:plain(child.title.replace(/^[\d.]+\s+/,'')),
  titleHtml:prose(child.title.replace(/^[\d.]+\s+/,'')),
  depth:child.parents.length,
  descendants:sections.filter(descendant=>descendant.parents.includes(child.title)).map(descendant=>descendant.anchor),
 })),
}))
const deckPages=[]
const startedSections=new Set()
for(const p of pages) {
 const major=majorSections.find(s=>s===p.section || p.section.parents[0]===s.title)
 if(major && !startedSections.has(major.anchor)) {
  startedSections.add(major.anchor)
  deckPages.push({section:major,overview:true})
 }
 deckPages.push(p)
}
const body=deckPages.map((p,i)=>{
 const page=i+3,s=p.section
 if(p.overview) return `<!-- SOURCE Pico-OS/README.md#${s.anchor} -->${excludedOverviews.has(s.anchor)?'\n<!-- SHORT_VERSION_DISABLED -->':''}\n\n<div class="eyebrow section-eyebrow">Section ${s.title.match(/^\d+/)[0].padStart(2,'0')} · Overview</div>\n\n# ${s.title}\n\n<SectionOverview section="${s.anchor}" />`
 const disabled=excludedAnchors.has(s.anchor)||p.group.some(a=>excludedHashes.has(a.sha256))
 for(const a of p.group)inventory.get(a.id).slides.push({page,layout:p.layout,...(a.type==='table'?{rows:a.compactRows.map(r=>r.sourceRow)}:{}),...(a.type==='list'?{items:a.itemIndices}:{}),...(a.type==='code'?{codeParts:a.split?2:1}:{}),...(a.borrowed?{repeated:true}:{})})
 const major=majorSections.find(major=>major===s||s.parents[0]===major.title)
 const majorTitle=title=>major && title===major.title?`<MajorSectionLink section="${major.anchor}">${title}</MajorSectionLink>`:title
 const main=s.parents.length?s.parents.map(majorTitle).join(' · '):majorTitle(s.title)
 const subtitle=s.parents.length?`\n\n## ${s.title}${p.number?` (${p.number})`:''}`:''
 return `<!-- SOURCE Pico-OS/README.md#${s.anchor} -->${disabled?'\n<!-- SHORT_VERSION_DISABLED -->':''}\n\n# ${main}${subtitle}\n\n<div class="deck-content readme-slide">\n\n${p.content}\n\n</div>`
})
const contents='<!-- SOURCE Pico-OS/README.md#contents -->\n\n<div class="eyebrow section-eyebrow">Presentation map</div>\n\n# Contents\n\n<PresentationContents />'
await fs.writeFile('slides.md',cover.trimEnd()+'\n\n---\n\n'+contents+'\n\n---\n\n'+body.join('\n\n---\n\n')+'\n')
await fs.writeFile('config/section-overviews.json',JSON.stringify(sectionOverviews,null,2)+'\n')
await fs.writeFile('docs/readme-coverage.json',JSON.stringify({sourceSha256:hash(source),slideCount:deckPages.length+2,assets:[...inventory.values()]},null,2)+'\n')
console.log(`${deckPages.length+2} slides, including contents and ${startedSections.size} section overviews; complete source code/diagrams; reviewed bullets + library-facing table rows.`)

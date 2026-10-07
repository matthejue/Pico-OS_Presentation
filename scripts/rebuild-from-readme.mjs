// Source artifacts retain their content with normalized ReTI spelling.
// Reviewed bullets, table summaries and composition
// are authored here/config; the opening PicoOS heading is displayed as
// Introduction while source anchors and artifacts remain unchanged.
import fs from 'node:fs/promises'
import path from 'node:path'
import {readmeSource, md, hash, plain, displayHtml, presentationText} from './readme-source.mjs'
import {prepareTable} from '../config/readme-tables.mjs'
import {compactGroups, renderComposed} from '../config/readme-composition.mjs'
import {placeSummaries} from '../config/readme-readability.mjs'
import {visualOnlySection, keepSummary, omitSourceLists, sourceListOmission, removeSourceListPanels, contextualNoteTargets} from '../config/readme-content-selection.mjs'
import {ensureSlideIdentities} from './slide-identities.mjs'
import {protectRebuild, rebuildRemovalIds} from './rebuild-protection.mjs'
import {createSlideNotesStore} from './slide-notes.mjs'
import {applySvgEdits} from '../config/readme-svg-edits.mjs'
const sourcePath=process.env.PRESENTATION_SOURCE || '../Pico-OS/README.md'
const allowedRemovalIds=rebuildRemovalIds(process.argv.slice(2))
const source=await fs.readFile(sourcePath,'utf8')
const {sections,assets}=readmeSource(source)
const lists=JSON.parse(await fs.readFile('config/readme-lists.json','utf8'))
const summaries=JSON.parse(await fs.readFile('config/readme-prose.json','utf8'))
const facts=JSON.parse(await fs.readFile('config/readme-facts.json','utf8'))
const codeLabels=JSON.parse(await fs.readFile('config/readme-code-labels.json','utf8'))
const tableWidths=JSON.parse(await fs.readFile('config/readme-table-widths.json','utf8'))
const columnConfig=JSON.parse(await fs.readFile('config/readme-columns.json','utf8'))
for(const [key,shares] of Object.entries(columnConfig.shares))
 if(shares.length!==2||shares.some(n=>!Number.isFinite(n)||n<=0)||Math.abs(shares[0]+shares[1]-100)>0.01)throw Error('Invalid column shares: '+key)
const columnShares=key=>columnConfig.shares[key]||[50,50]
const columnAttributes=(key,extra='')=>`data-column-key="${key}" style="--readme-columns:minmax(0, ${columnShares(key)[0]}fr) minmax(0, ${columnShares(key)[1]}fr);${extra}"`
const rowAttributes=group=>{
 const weights=columnConfig.rows?.['assets:'+group.map(a=>a.id).join('+')]
 return weights?` style="--readme-rows:${weights.map(weight=>`minmax(0, ${weight}fr)`).join(' ')}"`:''
}
// Wrap unusually long source lines instead of making both columns tiny.
const codeLineWidth=lines=>Math.max(...lines.map(line=>line.length*8.6+40))
const codeNeed=lines=>Math.max(240,Math.min(560,codeLineWidth(lines)))
const cover=await fs.readFile('config/title-slide.md','utf8')
const previous=await fs.readFile('slides.md','utf8')
const inventory=new Map(assets.map(a=>[a.id,{id:a.id,type:a.type,anchor:a.anchor,line:a.line,endLine:a.endLine,sourceSha256:a.sha256,slides:[],...(a.path?{sourcePath:a.path}:{}),...(a.navigationOnly?{excluded:'Navigation replaced by dynamic presentation contents and section overviews'}:{})}]))
for(const section of sections.filter(omitSourceLists))for(const asset of section.assets.filter(a=>a.type==='list'))
 inventory.get(asset.id).excluded=sourceListOmission
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const prose=s=>displayHtml(md.renderInline(s))
const contextRemarks=(section,fact)=>{
 const notes=typeof fact[0]==='string'?[fact]:fact
 const remarks=notes.map(([title,items])=>`<aside class="context-note"><b>${esc(title)}</b>${visualOnlySection(section)?`<span>${items.map(prose).join(' · ')}</span>`:bulletList(items)}</aside>`).join('\n')
 return notes.length>1?`<div class="context-notes">${remarks}</div>`:remarks
}
const bulletList=(items,cls='',requestedSubBullet=false)=>{
 const content=items.map(item=>Array.isArray(item)?`${prose(item[0])}${bulletList(item.slice(1),'',requestedSubBullet)}`:prose(item))
 if(!content.length)return ''
 if(content.length===1&&!requestedSubBullet)return `<div class="${cls||'readme-item'}">${content[0]}</div>`
 if(content.length===1&&requestedSubBullet)cls='requested-sub-bullet'
 return `<ul${cls?` class="${cls}"`:''}>${content.map(item=>`<li>${item}</li>`).join('\n')}</ul>`
}
const marker=a=>`<!-- README_ASSET ${a.id}${a.borrowed?' repeated':''} -->`
const visual=(kind,inner,width=980,classes='',attributes='')=>`<ReadmeVisual kind="${kind}" :width="${width}"${classes?` class="${classes}"`:''}${attributes?` ${attributes}`:''}>\n\n${inner}\n\n</ReadmeVisual>`
const imageOutputs=new Map()
for(const a of assets.filter(a=>a.type==='image')) {
 const bytes=await fs.readFile(path.resolve(process.env.README_REPOSITORY || path.dirname(sourcePath),a.path)), name=path.basename(a.path)
 a.outputPath=`/readme/${name}`
 if(name.endsWith('.svg')) {
  const svg=applySvgEdits(name,presentationText(bytes.toString('utf8')))
  const box=svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
  a.aspect=box[2]/box[3]
  imageOutputs.set(`public/readme/${name}`,svg)
 } else {a.aspect=1.5;imageOutputs.set(`public/readme/${name}`,bytes)}
 Object.assign(inventory.get(a.id),{copiedFile:`public/readme/${name}`,originalFileSha256:hash(bytes)})
}
const grids=new Set(['table-6536','table-8316','table-7687'])
const preserveVertical=new Set(['table-644','table-3998','table-7116'])
const denseFieldTables=new Set(['table-1997','table-3653'])
// Long request fields and stream/environment function descriptions need fewer
// rows per slide even when the accompanying prose has its own slide.
const readableTableCapacities={'table-1997':8,'table-6830':7,'table-6906':7}
function balanced(items,capacity) {
 const count=Math.ceil(items.length/capacity),size=Math.ceil(items.length/count),result=[]
 for(let i=0;i<items.length;i+=size)result.push(items.slice(i,i+size))
 return result
}
function prepare(a) {
 if(a.type==='table') {
  const t=prepareTable(a),entry=inventory.get(a.id)
  Object.assign(entry,{retainedRows:t.retainedRows,omittedRows:t.omittedRows,displayColumns:t.headerLabels.map(presentationText)})
  if(!t.compactRows?.length){entry.excluded='Internal function table; no library-facing operation';return []}
  if(t.unresolved.length)throw Error('Missing reviewed table summary: '+JSON.stringify(t.unresolved))
  const capacity=readableTableCapacities[a.id] ?? (denseFieldTables.has(a.id)?12:grids.has(a.id)?(a.id==='table-8316'?9:15):t.columns<=3&&!preserveVertical.has(a.id)?24:t.columns>=5?9:14)
  return balanced(t.compactRows,capacity).map(rows=>({...t,compactRows:rows,grid:grids.has(a.id),tableColumns:rows.length>=10&&t.columns<=3&&!preserveVertical.has(a.id)?2:1}))
 }
 if(a.type==='list') {
  const items=lists[a.id]
  if(!items)throw Error(`Missing reviewed list: ${a.id}`)
  return [{...a,items,itemIndices:items.map((_,i)=>i+1),listColumns:items.length>6?2:1,tiles:['list-176','list-26'].includes(a.id)}]
 }
 if(a.type==='code') {
  const lines=a.content.trimEnd().split('\n')
  const terminal=a.language==='console'||/\/input\.txt$/.test(codeLabels[a.id]||'')
  return [{...a,codeLines:lines.length,split:lines.length>=22,terminal,command:terminal&&lines.length<=4}]
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
  return visual('table',html,a.id==='table-6536'?1440:1280,`inventory-grid${a.id==='table-6536'?' library-grid':''}`)
 }
 let chunks=[a.compactRows]
 if(a.tableColumns===2) {
  // Keep source order, but balance the amount of text rather than row counts.
  const weights=a.compactRows.map(row=>Math.max(...row.values.map(cell=>
   Math.max(1,(cell.html.match(/<li>/g)||[]).length,Math.ceil(plain(cell.html).length/55)))))
  const total=weights.reduce((sum,weight)=>sum+weight,0)
  let cut=1,left=0,best=Infinity
  for(let i=1;i<weights.length;i++) {
   left+=weights[i-1]
   const cost=left>=total-left?Math.max(left,total-left):Infinity
   if(cost<best){best=cost;cut=i}
  }
  const reviewedCut=columnConfig.tableBreaks?.[a.id+':'+a.compactRows.map(row=>row.sourceRow).join(',')]
  if(reviewedCut!==undefined) {
   if(!Number.isInteger(reviewedCut)||reviewedCut<1||reviewedCut>=a.compactRows.length)throw Error('Invalid table break: '+a.id)
   if(weights.slice(0,reviewedCut).reduce((sum,n)=>sum+n,0)>=total/2)cut=reviewedCut
  }
  chunks=[a.compactRows.slice(0,cut),a.compactRows.slice(cut)]
 }
 const dims=chunks.map(rows=>widths(a,rows,a.tableColumns===2?650:columnConfig.tableWidths[a.id]||1080))
 // Both halves use the same column widths to make reading across them predictable.
 const maxWidth=Math.max(...dims.map(d=>d.width))
 const merged=widths(a,a.compactRows,maxWidth)
 const tableKey=a.id+':'+a.compactRows.map(r=>r.sourceRow).join(',')
 if(tableWidths[tableKey]?.length===merged.columns.length)merged.columns=tableWidths[tableKey]
 const rowHtml=r=>{
  const frame=a.id==='table-644'
  const cls=frame?` class="${r.sourceRow<=6?'stack-caller':'stack-callee'}"`:''
  const row=`<tr data-source-row="${r.sourceRow}"${cls}>${r.values.map((v,i)=>`<td${i===0?' class="table-key"':''}>${v.html}</td>`).join('')}</tr>`
  // Split the source's combined locals/temporaries row for a clearer frame.
  return row+(frame&&r.sourceRow===12?'\n<tr class="stack-callee stack-temporaries"><td class="table-key"><code>BAF - 2, …</code></td><td>Temporaries</td><td>Callee</td></tr>':'')
 }
 const html=chunks.map(rows=>`<div class="readme-table"><table><colgroup>${merged.columns.map(w=>`<col style="width:${w.toFixed(2)}%" />`).join('')}</colgroup><thead><tr>${merged.labels.map(label=>`<th>${prose(label)}</th>`).join('')}</tr></thead><tbody>${rows.map(rowHtml).join('\n')}</tbody></table></div>`).join('\n')
 const reviewedScale=columnConfig.tableTextScales?.[a.id] ?? (['table-227','table-251','table-3232'].includes(a.id)?0.85:undefined)
 const textScale=reviewedScale===undefined?'':` :text-scale="${reviewedScale}"`
 return visual('table',`<div class="table-panels${chunks.length===2?' table-panels-two':''}"${chunks.length===2?' '+columnAttributes('table:'+tableKey):''} v-pre>${html}</div>`,chunks.length===2?merged.width*2+24:merged.width,'',`data-table-key="${tableKey}"${textScale}`)
}
function renderCode(a) {
 const sourceLines=a.content.split('\n');if(sourceLines.at(-1)==='')sourceLines.pop()
 const cut=Math.ceil(sourceLines.length/2),parts=a.split?[sourceLines.slice(0,cut),sourceLines.slice(cut)]:[sourceLines]
 const language=a.terminal?'console':a.language==='reti'?'text':a.language
 const label=codeLabels[a.id] || (a.terminal?(a.content.includes('PicoOS>')?'PicoOS terminal':'Host terminal'):a.language==='reti'?'ReTI assembly':'PicoC example')
 const shares=columnShares('code:'+a.id)
 const budget=a.split?Math.max(...parts.map((lines,i)=>codeNeed(lines)/(shares[i]/100))):0
 const widths=a.split?shares.map(n=>budget*n/100):[a.nativeCodeWidth||(a.narrow?codeNeed(sourceLines):Math.max(640,Math.min(980,codeLineWidth(sourceLines))))]
 let offset=0
 const boxes=parts.map((lines,i)=>{
  const start=offset+1;offset+=lines.length
  const partMarker=`<!-- README_CODE_PART ${a.id} lines=${start}-${offset} -->`
  // Input fixtures are command examples too. Prompts are presentation-only;
  // source ranges still identify and reconstruct the unmodified README code.
  const displayed=lines.map(line=>a.terminal&&a.language!=='console'&&line.trim()?`PicoOS> ${line}`:line)
  const inner=`${partMarker}\n<div class="readme-code${a.terminal?' readme-terminal':''}">\n<div class="readme-code-header" v-pre><span>${esc(label)}</span><span class="code-range">${a.split?`lines ${start}–${offset}`:''}</span></div>\n\n\`\`\`${language} {lines:false}\n${displayed.join('\n')}\n\`\`\`\n\n</div>`
  const textScale=columnConfig.codeTextScales?.[a.id]
  return visual('code',inner,widths[i],a.command?'command-strip':'',`data-code-source="${a.id}" data-code-part="${i+1}"${textScale?' :text-scale="'+textScale+'"':''}`)
 })
 return a.split?`<div class="code-columns" ${columnAttributes('code:'+a.id,`--source-aspect:${(budget+24)/(parts[0].length*21+34)}`)}>\n\n${boxes.join('\n\n')}\n\n</div>`:boxes[0]
}
function render(a) {
 if(a.type==='code')return marker(a)+'\n'+renderCode(a)
 if(a.type==='table')return marker(a)+'\n'+renderTable(a)
 if(a.type==='mermaid')return marker(a)+'\n'+visual('mermaid',`\`\`\`mermaid\n${a.content}\`\`\``)
 if(a.type==='math')return marker(a)+'\n'+visual('math',`<div class="readme-math">\n\n${a.content}\n\n</div>`)
 if(a.type==='image')return marker(a)+'\n'+visual('image',`<img src="${a.outputPath}" alt="${esc(a.alt)}" />`)
 if(a.type==='list') {
  if(a.tiles)return marker(a)+`\n<div class="hardware-tiles">${a.items.map(item=>`<div class="readme-tile"><div class="tile-name">${prose(Array.isArray(item)?item[0]:item)}</div>${Array.isArray(item)?bulletList(item.slice(1)):''}</div>`).join('')}</div>`
  return marker(a)+`\n<div class="readme-list${a.listColumns===2?' bullet-columns':''}">${bulletList(a.items)}</div>`
 }
 if(a.type==='recording')return marker(a)+'\n<AsciinemaRecording src="/casts/reti_emulator.cast" title="ReTI-Emulator session" poster="npt:8" fallback-href="https://asciinema.org/a/1264549" />\n<div class="slide-note">Click to play; click outside to navigate</div>'
}
const repeated={
 '116-program-sections-interrupt-table-entries-and-linker-placement':'21-reti-interrupt-entry-and-the-interrupt-service-routine-table',
 '241-syscall-selectors-and-register-convention':'1012-packing-arguments-and-executing-the-syscall',
 '112-kernel-startup':'1151-default-compiler-generated-_start',
 '113-init-process':'1152-picoos-libstart-startup-sequence',
 '1134-shell-startup':'1152-picoos-libstart-startup-sequence',
 '1135-loading-user-applications':'1152-picoos-libstart-startup-sequence'
}
for(const s of sections)if(s.instructions.some(x=>/waitpid code/.test(x)))repeated[s.anchor]='1012-packing-arguments-and-executing-the-syscall'
const introOnly=new Set(['122-atomic-test-and-set-with-tsl','22-interrupt-controller-mappings-and-priorities','3633-free-d-and-merge-its-remainder','3634-free-c-and-merge-repeatedly-at-b','611-algorithm-and-round-robin-comparison','712-child-waiting-with-waitpid','1013-interrupt-entry-waiting-and-return','1-toolchain-extensions-for-picoos','115-selecting-a-startup-function-with--c----startup-source','2-interrupts-system-calls-preemption-and-exceptions','25-timer-interrupts-and-userspace-preemption','28-cpu-exceptions-and-runtime-errors','3-memory-management-and-shared-memory','33-kernel-heap','34-process-and-shared-data-heap','35-user-process-heap','36-heap-and-allocator-function-reference','4-processes-and-process-lifecycle','4221-initial-user-process-stack','42-loading-and-starting-a-process','5-shared-memory-entries-and-mappings','61-scheduler-implementation','7-blocking-wait-queues-signals-and-mutexes','72-process-signals','8-terminal-file-descriptors-and-host-filesystem','101-from-a-library-call-to-the-kernel-waitpid','1021-unistd-processes-descriptors-paths-and-wait-queues','1027-stdlib-process-heap-environment-conversion-and-exit','12-shell','13-user-applications-and-commands','14-test-system'])
const diagram=a=>['mermaid','image'].includes(a.type)
const shortCode=a=>a.type==='code'&&!a.split&&a.codeLines<=21
function compose(parts) {
 const groups=[]
 for(let i=0;i<parts.length;i++) {
  const a=parts[i],b=parts[i+1]
  let group=[a],layout='single'
  if(a.command&&b?.type==='code') {group.push(b);layout='command-above';i++}
  else if(a.type==='code'&&a.split&&a.codeLines<=42&&b?.type==='list') {group.push(b);layout='compact-stacked';i++}
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
 if(!groups.length && summaries[section.anchor])groups=[{group:[],layout:'bullets'}]
 if(section.anchor==='picoos')groups.unshift({group:[],layout:'bullets'})
 if(!groups.length && !originals.length && section.paragraphs.length && !introOnly.has(section.anchor))throw Error('Missing reviewed prose bullets: '+section.anchor)
 const summary=summaries[section.anchor]||[]
 // Source lists stay complete. Reviewed placements move explanations off dense
 // examples while retaining useful summaries beside spacious source content.
 const summaryParts=section.anchor==='picoos'||section.anchor==='intended-physical-hardware'||section.anchor==='111-compilation-pipeline-and-compiler-passes'
  ? [] : groups.length ? balanced(summary,Math.max(2,Math.ceil(summary.length/groups.length))) : []
 groups=placeSummaries(groups,summaryParts,section)
 if(omitSourceLists(section))groups=groups.map(removeSourceListPanels)
 if(visualOnlySection(section)) {
  groups=groups.filter((panel,i)=>panel.group.length||keepSummary(section,i))
    .map((panel,i)=>({...panel,summary:keepSummary(section,i)?panel.summary:[]}))
 }
 groups.forEach(({group,layout,panels,weights,summary:pageSummary},number)=>{
  let content
  const columnKey='assets:'+group.map(a=>a.id).join('+')
  if(layout==='columns') {
   for(const a of group)if(a.type==='code')a.narrow=true
   if(group.every(a=>a.type==='code')) {
    const shares=columnShares(columnKey),budget=Math.max(...group.map((a,i)=>codeNeed(a.content.trimEnd().split('\n'))/(shares[i]/100)))
    group.forEach((a,i)=>a.nativeCodeWidth=budget*shares[i]/100)
   }
  }
  if(!group.length) {
   const items=pageSummary.length?pageSummary:summary
   content=`<div class="readme-list${items.length>6?' bullet-columns':''}${items.length>=3&&items.every(Array.isArray)?' summary-cards':''}">${bulletList(items,'',section.anchor==='113-system-v-abi-stack-frames-and-call-cleanup')}</div>`
  }
  else if(layout==='hardware')content=`${render(group.find(a=>a.type==='list'))}\n<div class="artifact-columns hardware-details" ${columnAttributes('hardware:details')}><div class="readme-list">${bulletList(summaries[section.anchor])}</div>\n\n${render(group.find(a=>a.type==='table'))}\n\n</div>`
  else if(section.anchor==='111-compilation-pipeline-and-compiler-passes')content=`<div class="readme-artifacts pipeline-comparison">${group.map((a,i)=>{
   const items=summaries[section.anchor].slice(i*3,i*3+3)
   return `<div class="pipeline-panel"><div class="pipeline-heading">${prose(items[0])}</div><div class="readme-list">${bulletList(items.slice(1))}</div>\n\n${render(a)}\n\n</div>`
  }).join('\n\n')}</div>`
  else if(layout==='composed')content=renderComposed({panels,weights},render,{columnAttributes,columnShares,codeNeed,rowAttributes})
  else content=`<div class="readme-artifacts layout-${layout}"${layout==='columns'?' '+columnAttributes(columnKey):layout==='stacked'?rowAttributes(group):''}>\n\n${group.map(render).join('\n\n')}\n\n</div>`
  const additional=group.length?pageSummary:null
  if(additional?.length) {
   const notes=`<div class="readme-list prose-summary${additional.some(Array.isArray)?' nested-summary':''}">${bulletList(additional)}</div>`
   // Short standalone code shares a centered, top-aligned row with its prose.
   // Wide diagrams and split examples retain the full slide width.
   if(group.length===1&&group[0].type==='code'&&!group[0].split&&group[0].codeLines<=18)
    content=`<div class="readme-artifacts layout-columns prose-with-code" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr)">${notes}\n${render(group[0])}</div>`
   else content+=`\n${notes}`
  }
  const fact=number===0?facts[section.anchor]:null
  if(fact)content+=`\n${contextRemarks(section,fact)}`
  pages.push({section,group,layout,content,summary:pageSummary,number:groups.length>1?number+1:null})
 })
}
// A removed introduction can still carry a required standards comparison.
// Place that compact note with its first surviving descendant example.
for(const section of sections.filter(s=>visualOnlySection(s)&&facts[s.anchor]&&!pages.some(p=>p.section===s))) {
 const target=pages.find(p=>p.section.anchor===contextualNoteTargets[section.anchor])
  || pages.find(p=>p.section.parents.includes(section.title))
 if(!target)throw Error('No source visual for required contextual note: '+section.anchor)
 target.content+=`\n${contextRemarks(section,facts[section.anchor])}`
}
// Overview entries retain every README heading, including headings whose
// content is presented by descendants rather than a separate introduction.
// The unnumbered opening README hierarchy is presentation section zero.
// Keep its source anchors intact and display its root heading as Introduction.
const introduction=sections.find(s=>s.anchor==='picoos'&&!s.parents.length)
const majorSections=sections.filter(s=>!s.parents.length && (s===introduction || /^\d+\. /.test(s.title)))
const sectionNumber=s=>s===introduction?'0':s.title.match(/^\d+/)[0]
const sectionTitle=s=>s===introduction?'0. Introduction':s.title
const sectionOverviews=majorSections.map(s=>({
 anchor:s.anchor,
 number:sectionNumber(s),
 title:plain(sectionTitle(s).replace(/^\d+\.\s+/,'')),
 titleHtml:prose(sectionTitle(s).replace(/^\d+\.\s+/,'')),
 entries:sections.filter(child=>child.parents[0]===s.title&&child.anchor!=='contents').map(child=>({
  anchor:child.anchor,
  number:child.title.match(/^[\d.]+/)?.[0]||'',
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
 if(p.overview) return `<!-- SOURCE Pico-OS/README.md#${s.anchor} -->\n\n<div class="eyebrow section-eyebrow">Section ${sectionNumber(s).padStart(2,'0')} · Overview</div>\n\n# ${sectionTitle(s)}\n\n<SectionOverview section="${s.anchor}" />`
 for(const a of p.group)inventory.get(a.id).slides.push({page,layout:p.layout,...(a.type==='table'?{rows:a.compactRows.map(r=>r.sourceRow)}:{}),...(a.type==='list'?{items:a.itemIndices}:{}),...(a.type==='code'?{codeParts:a.split?2:1}:{}),...(a.borrowed?{repeated:true}:{})})
 const major=majorSections.find(major=>major===s||s.parents[0]===major.title)
 const displayTitle=title=>major===introduction && title===introduction.title?'Introduction':title
 const majorTitle=title=>major && title===major.title?`<MajorSectionLink section="${major.anchor}">${displayTitle(title)}</MajorSectionLink>`:title
 const ancestors=s.parents.map(majorTitle)
 // Top-level content has no invented/repeated ancestor line. Introduction
 // keeps its explicit display mapping and consecutive title numbering.
 const main=ancestors.length?ancestors.join(' · '):''
 const subtitle=`## ${displayTitle(s.title)}${p.number?` (${p.number})`:''}`
 return `<!-- SOURCE Pico-OS/README.md#${s.anchor} -->\n\n${main?'# '+main+'\n\n':''}${subtitle}\n\n<div class="deck-content readme-slide">\n\n${p.content}\n\n</div>`
})
const contents='<!-- SOURCE Pico-OS/README.md#contents -->\n\n<div class="eyebrow section-eyebrow">Presentation map</div>\n\n# Contents\n\n<PresentationContents />'
const rebuilt=presentationText(cover.trimEnd()+'\n\n---\n\n'+contents+'\n\n---\n\n'+body.join('\n\n---\n\n')+'\n')
const protectedDeck=protectRebuild(previous,ensureSlideIdentities(rebuilt,presentationText(previous)),allowedRemovalIds)
// Generate and validate the whole candidate before replacing any output.
if(await fs.readFile('slides.md','utf8')!==previous)throw Error('Slide source changed during the rebuild; no output was replaced. Re-run using the latest slides.md.')
await fs.mkdir('public/readme',{recursive:true})
for(const [filename,content] of imageOutputs)await fs.writeFile(filename,content)
await fs.writeFile('slides.md',protectedDeck)
await createSlideNotesStore({slidesPath:path.resolve('slides.md'),notesDirectory:path.resolve('notes')}).syncMetadata()
await createSlideNotesStore({slidesPath:path.resolve('slides.md'),notesDirectory:path.resolve('Corrections'),corrections:true}).syncMetadata()
await fs.writeFile('config/section-overviews.json',presentationText(JSON.stringify(sectionOverviews,null,2))+'\n')
await fs.writeFile('docs/readme-coverage.json',JSON.stringify({sourceSha256:hash(source),slideCount:deckPages.length+2,assets:[...inventory.values()]},null,2)+'\n')
await fs.writeFile('docs/readme-prose-review.json',JSON.stringify({
 sourceSha256:hash(source),
 sections:sections.map(section=>({
  anchor:section.anchor,title:presentationText(section.title),line:section.line,
  slides:deckPages.flatMap((page,i)=>!page.overview&&page.section===section?[i+3]:[]),
  summary:visualOnlySection(section)?pages.filter(page=>page.section===section).flatMap(page=>page.summary||[]):summaries[section.anchor]||[],remark:facts[section.anchor]||null,
  paragraphs:section.paragraphs.map(paragraph=>({line:paragraph.line,sourceSha256:hash(paragraph.text)})),
  treatment:visualOnlySection(section)?'Source visuals without redundant bullet summaries; standards and analogies use plain notes':section.anchor==='contents'?'Dynamic contents and overview hierarchy':summaries[section.anchor]?'Concise reviewed bullets; omit repetitions of source visuals':section.assets.length?'Source artifacts; prose repeats their explanation or links to other sections':'Section heading introduces descendant slides; repeated introduction omitted',
 })),
},null,2)+'\n')
console.log(`${deckPages.length+2} slides, including contents and ${startedSections.size} section overviews; complete source code/diagrams; reviewed bullets + library-facing table rows.`)

// Preserve README artifacts, then compose slides around them. Lists and side
// remarks are explicitly edited in config/; code and diagram bodies are verbatim.
import fs from 'node:fs/promises'
import path from 'node:path'
import { readmeSource, md, hash, plain, displayHtml } from './readme-source.mjs'
import { styleSourceSvg } from '../config/visual-palette.mjs'

const sourcePath = process.env.PRESENTATION_SOURCE || '../Pico-OS/README.md'
const source = await fs.readFile(sourcePath, 'utf8')
const { sections, assets } = readmeSource(source)
const lists = JSON.parse(await fs.readFile('config/readme-lists.json', 'utf8'))
const summaries = JSON.parse(await fs.readFile('config/readme-prose.json', 'utf8'))
const facts = JSON.parse(await fs.readFile('config/readme-facts.json', 'utf8'))
const cover = await fs.readFile('config/title-slide.md', 'utf8')
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const prose = s => displayHtml(md.renderInline(s.replace(/\n/g, ' ')))
const marker = a => `<!-- README_ASSET ${a.id}${a.rowStart != null ? ` rows=${a.rowStart + 1}-${a.rowEnd}` : ''}${a.borrowed ? ' repeated' : ''} -->`
// Keep reviewed short-version choices when regenerating the same content.
// Hashes also match artifacts whose source line numbers have moved.
const previousDeck = await fs.readFile('slides.md', 'utf8')
const previousInventory = JSON.parse(await fs.readFile('docs/readme-coverage.json', 'utf8'))
const previousHashes = new Map(previousInventory.assets.map(a => [a.id, a.sourceSha256]))
const currentHashes = new Map(assets.map(a => [a.id, a.sha256]))
const selectionKey = (anchor, text, hashes) => anchor + '|' + [...text.matchAll(/<!-- README_ASSET (\S+)(.*?) -->/g)]
  .map(([, id, suffix]) => `${hashes.get(id) || id}${suffix}`).join('|')
const disabledContent = new Set()
for (const block of previousDeck.split(/(?=<!-- SOURCE Pico-OS\/README.md#)/)) {
  const anchor = block.match(/<!-- SOURCE Pico-OS\/README.md#([^ ]+) -->/)?.[1]
  if (anchor && block.includes('<!-- SHORT_VERSION_DISABLED -->'))
    disabledContent.add(selectionKey(anchor, block, previousHashes))
}
const weight = a => a.type === 'code' ? a.content.trimEnd().split('\n').length + 2 : a.type === 'image' ? 16 : 10
const visual = (a, inner, width=1024) => `${marker(a)}\n<ReadmeVisual kind="${a.type}" :width="${width}" style="flex-grow:${weight(a)}">\n\n${inner}\n\n</ReadmeVisual>`
const inventory = new Map(assets.map(a => [a.id, { id: a.id, type: a.type, anchor: a.anchor, line: a.line, endLine: a.endLine, sourceSha256: a.sha256, ...(a.path ? { sourcePath:a.path } : {}), slides: [], ...(a.navigationOnly ? { excluded: 'README navigation; replaced by the prescribed cover outline' } : {}) }]))
await fs.mkdir('public/readme', { recursive: true })
for (const a of assets.filter(a => a.type === 'image')) {
  const bytes = await fs.readFile(path.resolve(path.dirname(sourcePath), a.path))
  const name = path.basename(a.path)
  a.outputPath = `/readme/${name}`
  if (name.endsWith('.svg')) {
    const svg = bytes.toString('utf8')
    const box = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
    a.aspect = box[2] / box[3]
    await fs.writeFile(`public/readme/${name}`, styleSourceSvg(svg))
  } else { a.aspect = 1.5; await fs.writeFile(`public/readme/${name}`, bytes) }
  Object.assign(inventory.get(a.id), { copiedFile: `public/readme/${name}`, originalFileSha256: hash(bytes) })
}
function paragraphFor(section) {
  return section.paragraphs.filter(p => !/^\s*(See|For |The following|This table|The table|The diagram|The code|Below|These rows)/.test(p.text))[0]?.text || section.paragraphs[0]?.text || ''
}
function captionFor(a, section) {
  const p = section.paragraphs.filter(p=>p.line<a.line).at(-1)
  if (!p || a.line-p.line>12 || plain(p.text).split(' ').length>42) return ''
  return `<div class="artifact-caption">${prose(p.text)}</div>\n`
}
function paginate(a) {
  if (a.type === 'table') {
    const chunks=[]; let rows=[], words=0, start=0
    const flush=()=>{if(rows.length)chunks.push({...a,rows:[...rows],rowStart:start,rowEnd:start+rows.length});start+=rows.length;rows=[];words=0}
    for(const row of a.rows) {
      const w=plain(row).split(/\s+/).length
      if(rows.length && (words+w>310 || rows.length>=12))flush()
      rows.push(row);words+=w
    }
    flush(); return chunks
  }
  if(a.type==='list') {
    if(!lists[a.id])throw Error(`Missing authored list summary: ${a.id}`)
    const items=lists[a.id], chunks=[]
    for(let i=0;i<items.length;i+=6) chunks.push({...a,items:items.slice(i,i+6),itemStart:i})
    return chunks
  }
  return [a]
}
function render(a, section) {
  if(a.type==='code') {
    const lang=a.language==='reti'?'text':a.language
    const terminal=a.language==='console'
    const maxLine=Math.max(...a.content.trimEnd().split('\n').map(l=>l.length))
    return visual(a,`<div class="readme-code${terminal?' readme-terminal':''}">\n\n\`\`\`${lang} {lines:false}\n${a.content}\`\`\`\n\n</div>`,Math.max(720,maxLine*8.6+40))
  }
  if(a.type==='mermaid') return visual(a,`\`\`\`mermaid\n${a.content}\`\`\``)
  if(a.type==='image')return visual(a,`<img src="${a.outputPath}" alt="${escape(a.alt)}" />`)
  if(a.type==='recording') return `${marker(a)}\n<AsciinemaRecording src="/casts/reti_emulator.cast" title="RETI-Emulator session" poster="npt:8" fallback-href="https://asciinema.org/a/1264549" />\n<p class="slide-note">Click to play the recording on this slide. Click outside the player to resume slide navigation.</p>`
  if(a.type==='table')return visual(a,`<div class="readme-table" v-pre><table><thead>${displayHtml(a.header)}</thead><tbody>${displayHtml(a.rows.join('\n'))}</tbody></table></div>`,a.columns>4?1440:1100)
  if(a.type==='list') {
    const tag=/^\d+\./.test(a.raw)?'ol':'ul', start=tag==='ol'?Number(a.raw.match(/^\d+/)[0])+a.itemStart:undefined
    return `${marker(a)}\n<div class="readme-list"><${tag}${start?` start="${start}"`:''}>${a.items.map(x=>`<li>${prose(x)}</li>`).join('\n')}</${tag}></div>`
  }
}
function light(a) {
  if(a.type==='code')return a.content.trimEnd().split('\n').length<=12
  if(a.type==='list')return a.items.length<=4 && a.items.join(' ').split(' ').length<100
  if(a.type==='table')return a.rows.length<=5 && plain(a.rows.join('')).split(' ').length<95
  if(a.type==='image')return a.aspect>3
  return false
}
// README comments explicitly request repeated source examples at these stages.
const repeated = {
  '116-program-sections-interrupt-table-entries-and-linker-placement':'21-reti-interrupt-entry-and-the-interrupt-service-routine-table',
  '241-syscall-selectors-and-register-convention':'722-waitpid-wrapper',
  '112-kernel-startup':'1151-default-compiler-generated-_start',
  '113-init-process':'1152-picoos-libstart-startup-sequence',
  '1134-starting-the-shell':'1152-picoos-libstart-startup-sequence',
  '1135-starting-user-applications':'1152-picoos-libstart-startup-sequence',
}
// Match actual section titles rather than silently losing requested repeats.
for(const section of sections)if(section.instructions.some(x=>/waitpid code/.test(x)))repeated[section.anchor]=sections.find(s=>s.title.startsWith('7.2.2 ')).anchor
for(const section of sections)if(section.instructions.some(x=>/shell startup/.test(x)))repeated[section.anchor]=sections.find(s=>s.title.startsWith('1.1.5.2 ')).anchor
for(const section of sections)if(section.instructions.some(x=>/application-startup/.test(x)))repeated[section.anchor]=sections.find(s=>s.title.startsWith('1.1.5.2 ')).anchor
const introductionOnly = new Set(['1-toolchain-extensions-for-picoos', '115-selecting-a-startup-function-with--c----startup-source', '2-interrupts-system-calls-preemption-and-exceptions', '25-timer-interrupts-and-userspace-preemption', '28-cpu-exceptions-and-runtime-errors', '3-memory-management-and-shared-memory', '33-kernel-heap', '34-process-and-shared-data-heap', '35-user-process-heap', '36-heap-and-allocator-function-reference', '4-processes-and-process-lifecycle', '42-initial-user-process-stack', '43-loading-and-starting-a-process', '5-shared-memory-entries-and-mappings', '61-scheduler-implementation', '7-blocking-wait-queues-signals-and-mutexes', '73-process-signals', '8-terminal-file-descriptors-and-host-filesystem', '101-from-a-library-call-to-the-kernel-waitpid', '1021-unistd-processes-descriptors-paths-and-wait-queues', '1027-stdlib-process-heap-environment-conversion-and-exit', '12-shell', '13-user-applications-and-commands', '14-test-system', '15-use-in-operating-systems-and-real-time-operating-systems-lectures'])
const pages=[]
for(const section of sections) {
  if(section.anchor==='contents')continue
  let sourceAssets=section.assets.filter(a=>!a.navigationOnly).sort((a,b)=>a.line-b.line)
  if(repeated[section.anchor]) {
    const origin=sections.find(s=>s.anchor===repeated[section.anchor])
    if(origin)sourceAssets.unshift(...origin.assets.filter(a=>a.type==='code'&&a.language==='c').map(a=>({...a,borrowed:true})))
  }
  const parts=sourceAssets.flatMap(paginate)
  let groups=[]
  for(const a of parts) {
    const prior=groups.at(-1)
    if(prior?.length===1 && light(prior[0]) && light(a) && a.type!=='table' && prior[0].type!=='table')prior.push(a)
    else groups.push([a])
  }
  const intro=paragraphFor(section)
  if(!groups.length && intro && !introductionOnly.has(section.anchor))groups=[[]]
  if(!groups.length)continue
  const fact=facts[section.anchor]
  // Keep an introductory context slide only for the root; the title slide stays intact.
  if(section.anchor==='picoos')groups.unshift([])
  groups.forEach((group,number)=> {
    let content=''
    if(!group.length) {
      const paras=summaries[section.anchor]?.map(text=>({text})) || section.paragraphs.filter(p=>!p.text.startsWith('[\\[')).slice(0,2)
      content=`<div class="readme-explanation">${paras.map(p=>`<p>${prose(p.text)}</p>`).join('\n')}</div>`
    } else {
      const caption=group.length===1&&group[0].type!=='table'&&group[0].type!=='list'?captionFor(group[0],section):''
      content=caption+`<div class="readme-artifacts ${group.length===2?'artifact-pair':'artifact-single'}">\n\n${group.map(a=>render(a,section)).join('\n\n')}\n\n</div>`
    }
    const sideFact=number===0&&fact?`<aside class="context-note"><b>${escape(fact[0])}</b><span>${escape(fact[1])}</span></aside>`:''
    pages.push({section,group,content:content+sideFact,number:groups.length>1?number+1:null})
  })
}
const body=pages.map((p,index)=> {
  const page=index+2, s=p.section
  const disabled=disabledContent.has(selectionKey(s.anchor,p.group.map(marker).join('\n'),currentHashes))
  for(const a of p.group) inventory.get(a.id).slides.push({page,...(a.rowStart!=null?{rows:[a.rowStart+1,a.rowEnd]}:{}),...(a.itemStart!=null?{items:[a.itemStart+1,a.itemStart+a.items.length]}:{}),...(a.borrowed?{repeated:true}:{})})
  const title=s.parents.length?s.parents.join(' · '):s.title
  const subtitle=s.parents.length?`\n\n## ${s.title}${p.number?` (${p.number})`:''}`:''
  return `<!-- SOURCE Pico-OS/README.md#${s.anchor} -->${disabled?'\n<!-- SHORT_VERSION_DISABLED -->':''}\n\n# ${title}${subtitle}\n\n<div class="deck-content readme-slide">\n\n${p.content}\n\n</div>`
})
await fs.writeFile('slides.md',cover.trimEnd()+'\n\n---\n\n'+body.join('\n\n---\n\n')+'\n')
await fs.writeFile('docs/readme-coverage.json',JSON.stringify({sourceSha256:hash(source),slideCount:pages.length+1,assets:[...inventory.values()]},null,2)+'\n')
console.log(`${pages.length+1} slides; ${assets.filter(a=>!a.navigationOnly).length} README artifacts; all code/diagrams verbatim, all table rows retained.`)

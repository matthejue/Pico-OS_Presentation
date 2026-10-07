import MarkdownIt from 'markdown-it'
import { createHash } from 'node:crypto'

export const md = new MarkdownIt({ html: true })
export const hash = text => createHash('sha256').update(text).digest('hex')
export const anchorFor = title => title.replaceAll('`', '').toLowerCase().replace(/[^\w -]/g, '').replaceAll(' ', '-')
export const plain = text => md.renderInline(text).replace(/<[^>]+>/g, ' ').replaceAll('&amp;', '&').replace(/\s+/g, ' ').trim()
export function readmeSource(text) {
  const lines = text.split('\n'), tokens = md.parse(text, {})
  const sections = [], assets = [], stack = []
  let section
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.level !== 0) continue
    if (t.type === 'heading_open') {
      const level = Number(t.tag.slice(1)), title = tokens[i + 1].content.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      stack.length = level - 1
      section = { title, anchor: anchorFor(title), parents: [...stack], line: t.map[0] + 1, assets: [], paragraphs: [], instructions: [] }
      stack.push(title); sections.push(section)
      continue
    }
    if (!section || !t.map) continue
    let type, end = i, images = []
    if (t.type === 'fence') type = t.info === 'mermaid' ? 'mermaid' : 'code'
    else if (t.type === 'table_open') { type = 'table'; while(tokens[end].type !== 'table_close') end++ }
    else if (t.type === 'bullet_list_open' || t.type === 'ordered_list_open') {
      type = 'list'; while(!(tokens[end].level === 0 && tokens[end].type === t.type.replace('_open', '_close'))) end++
    }
    else if (t.type === 'html_block' && t.content.startsWith('<table')) type = 'table'
    else if (t.type === 'html_block' && t.content.includes('Presentation')) section.instructions.push(t.content)
    else if (t.type === 'paragraph_open') {
      const inline = tokens[i + 1]
      images = (inline.children || []).flatMap(c => c.type === 'image' ? [{ alt: c.content, path: c.attrGet('src') }] : [])
      if (inline.content.startsWith('$$\n')) type = 'math'
      else if (images.length) type = images[0].path.includes('asciinema.org') ? 'recording' : 'image'
      else if (!inline.content.startsWith('[\\[')) section.paragraphs.push({ line: t.map[0] + 1, text: inline.content })
    }
    if (type) {
      const raw = lines.slice(t.map[0], t.map[1]).join('\n')
      const asset = { id: `${type}-${t.map[0]+1}`, type, line: t.map[0]+1, endLine: t.map[1], anchor: section.anchor, raw, sha256: hash(raw) }
      if (type === 'code' || type === 'mermaid') { asset.language = t.info; asset.content = t.content }
      if (type === 'math') asset.content = tokens[i + 1].content
      if (images.length) Object.assign(asset, images[0])
      if (type === 'table') {
        const html = t.type === 'html_block' ? t.content : md.renderer.render(tokens.slice(i, end + 1), md.options, {})
        asset.header = html.match(/<thead>([\s\S]*?)<\/thead>/)[1]
        asset.rows = [...html.replace(/<thead>[\s\S]*?<\/thead>/, '').matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(m => m[0])
        asset.columns = (asset.header.match(/<th[ >]/g) || []).length
      }
      if (section.anchor === 'contents') asset.navigationOnly = true
      assets.push(asset); section.assets.push(asset)
      // Images can occur inside a numbered explanation (the timer PC map does).
      if (type === 'list') for (const child of tokens.slice(i + 1, end)) {
        if (child.type !== 'inline') continue
        for (const image of child.children || []) if (image.type === 'image') {
          const line = child.map[0] + 1
          const nested = { id: `image-${line}`, type: 'image', line, endLine: child.map[1], anchor: section.anchor, raw: child.content, sha256: hash(child.content), alt: image.content, path: image.attrGet('src') }
          assets.push(nested); section.assets.push(nested)
        }
      }
      i = end
    }
  }
  return { sections, assets }
}
export function displayHtml(html) {
  // Links in source tables are documentation references, not presentation navigation.
  return html.replace(/<a\b[^>]*>/g, '<span class="source-link">').replaceAll('</a>', '</span>')
}

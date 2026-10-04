// Presentation-only substitutions. Diagram coordinates, topology and wording stay intact.
export const colors = {
  '#172b3a':'#17313a', '#172536':'#17313a', '#192c38':'#17313a', '#111':'#17313a', '#222':'#17313a', '#000':'#17313a', '#000000':'#17313a',
  '#43576a':'#167b84', '#334155':'#167b84', '#475569':'#637983', '#526472':'#637983', '#555':'#637983', '#96a3ae':'#9db7bc',
  '#405ea8':'#078b98', '#174a7e':'#078b98', '#285fa3':'#078b98', '#27617b':'#167b84', '#785099':'#167b84',
  '#26715b':'#2f8f61', '#266b2e':'#2f8f61', '#39733b':'#2f8f61',
  '#9c3d15':'#c8861a', '#8a5a00':'#c8861a', '#995b0b':'#c8861a', '#b87800':'#c8861a',
  '#deecff':'#d8efef', '#eaf4ff':'#eaf5f5', '#dceefa':'#d8efef', '#f1f7ff':'#f4f8f8', '#f6faff':'#f4f8f8', '#eef5ff':'#eaf5f5', '#eadffa':'#d8efef',
  '#fff0cc':'#fff1d6', '#fff8dc':'#fff1d6', '#fff1c7':'#fff1d6', '#fff2b2':'#f6dfab', '#ffd08a':'#f6dfab', '#fff5e3':'#fff1d6', '#fff3d6':'#fff1d6',
  '#e5f3de':'#e7f3ea', '#e6efe5':'#e7f3ea', '#edf9ed':'#e7f3ea', '#edf7f1':'#e7f3ea', '#e8f4e8':'#e7f3ea',
  '#f0f3f6':'#f4f8f8', '#f1f5f9':'#f4f8f8', '#f5f5f5':'#f4f8f8', '#f1f3f5':'#f4f8f8', '#ffffff':'#ffffff',
}
export const presentationColor = value => colors[value.toLowerCase()] || value
export function styleSourceSvg(svg) {
  return svg.replace(/\b(fill|stroke|stop-color|color)="(#[\da-fA-F]{3,8})"/g, (_, attr, color) => `${attr}="${presentationColor(color)}"`)
    .replace(/\bfont-family="[^"]*"/g, 'font-family="Cantarell, sans-serif"')
    .replace(/\b(rx|ry)="[^"]*"/g, '$1="0"')
}

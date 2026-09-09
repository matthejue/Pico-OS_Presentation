// Use the same browser bundle as Slidev. The package-root import pulls in
// unbundled CommonJS dependencies (such as dayjs) in the development server.
import mermaid from 'mermaid/dist/mermaid.esm.mjs'

let diagramId = 0

// Slidev places each SVG in a shadow root. Size the SVG itself so it fits its
// allocated panel; outside CSS cannot reach across that shadow boundary.
export default () => async (code: string, options: Record<string, unknown>) => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      fontFamily: 'Cantarell, sans-serif',
      fontSize: '18px',
      primaryColor: '#edf8f8',
      primaryTextColor: '#17313a',
      primaryBorderColor: '#078b98',
      lineColor: '#167b84',
      secondaryColor: '#fff1d6',
      tertiaryColor: '#f4f8f8',
      noteBkgColor: '#fff1d6',
      noteTextColor: '#17313a',
    },
    flowchart: { nodeSpacing: 28, rankSpacing: 38 },
    sequence: { actorMargin: 35, messageMargin: 28 },
    ...Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined)),
  })
  const { svg } = await mermaid.render(`pico-diagram-${++diagramId}`, code)
  // Mermaid's foreignObject labels contain HTML void elements such as <br>.
  // Parse as HTML so those are normalized before serializing to valid SVG/XML;
  // an XML parse here inserts a visible browser parsererror into the diagram.
  const document = new DOMParser().parseFromString(svg, 'text/html')
  const root = document.querySelector('svg')
  if (!root) throw new Error('Mermaid did not return an SVG diagram')
  root.setAttribute('width', '100%')
  root.setAttribute('height', '100%')
  root.setAttribute('style', 'width:100%;height:100%;max-width:100%;max-height:100%')
  root.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  return new XMLSerializer().serializeToString(root)
}

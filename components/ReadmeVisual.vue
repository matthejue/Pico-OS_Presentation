<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({ kind: String, width: { type: Number, default: 1024 } })
const frame = ref(), content = ref()
const nativeWidth = ref(props.width), nativeHeight = ref(1), scale = ref(1)
const sourceAspect = ref(props.width)
let resize, mutation, raf, fittingGroup, attempts = 0
function rowBudget(item) {
  const group = item.parentElement
  if (!group?.matches('.layout-composed, .layout-stacked')) return item.clientHeight
  const items = [...group.children]
  let weights = group.dataset.fitRows ? JSON.parse(group.dataset.fitRows)
    : [...group.style.getPropertyValue('--readme-rows').matchAll(/([\d.]+)fr/g)].map(match => Number(match[1]))
  if (weights.length !== items.length) weights = items.map(() => 1)
  const height = group.matches('.composition-panel') ? rowBudget(group) : group.clientHeight
  const gap = parseFloat(getComputedStyle(group).rowGap)
  return (height - gap * (items.length - 1)) * weights[items.indexOf(item)] / weights.reduce((sum, weight) => sum + weight, 0)
}
function occupiedHeight(item) {
  if (item.matches('.readme-visual')) return item.querySelector('.source-fit-stage').offsetHeight
  if (item.matches('.readme-list'))
    return [...item.children].reduce((sum, child) => sum + child.getBoundingClientRect().height / (fittingGroup.getBoundingClientRect().width / fittingGroup.offsetWidth), 0)
  const heights = [...item.children].map(occupiedHeight)
  if (!heights.length) return item.offsetHeight
  if (item.matches('.layout-columns, .code-columns, .artifact-columns')) return Math.max(...heights)
  return heights.reduce((sum, height) => sum + height, 0) + (parseFloat(getComputedStyle(item).rowGap) || 0) * (heights.length - 1)
}
function balanceRows() {
  if (!fittingGroup?.isConnected) return
  let changed = false
  for (const group of [...fittingGroup.querySelectorAll('.layout-composed, .layout-stacked')].reverse()) {
    if ([...group.querySelectorAll('.readme-visual')].some(visual => Number(visual.dataset.nativeHeight) <= 1)) continue
    const heights = [...group.children].map(occupiedHeight)
    if (heights.every(height => height > 1)) {
      group.style.gridTemplateRows = heights.map(height => `${height}px`).join(' ')
      const total = heights.reduce((sum, height) => sum + height, 0)
      const shares = heights.map(height => height / total)
      const previous = group.dataset.fitRows ? JSON.parse(group.dataset.fitRows) : []
      if (shares.some((share, i) => Math.abs(share - (previous[i] || 0)) > 0.002)) {
        group.dataset.fitRows = JSON.stringify(shares)
        changed = true
      }
    }
  }
  if (changed) fittingGroup.dispatchEvent(new Event('readme-fit'))
}
// Text examples on one slide share a displayed type size. Fit each at the width it will
// actually occupy, allowing long lines/cells to wrap before reducing the type.
function fitText(availableWidth, availableHeight) {
  // A source's intrinsic width must not cap text size in a roomy panel. Reflow
  // at a readable preferred size, then reduce it only when height requires it.
  const preferred = props.kind === 'code' ? 1.35 : 1.1
  const heightAt = value => {
    content.value.style.width = `${availableWidth / value}px`
    return content.value.scrollHeight
  }
  let limit = preferred
  if (heightAt(limit) * limit > availableHeight) {
    let low = Math.min(0.05, preferred / 2), high = limit
    for (let i = 0; i < 12; i++) {
      const candidate = (low + high) / 2
      if (heightAt(candidate) * candidate <= availableHeight) low = candidate
      else high = candidate
    }
    limit = low
  }
  const changed = Math.abs(Number(frame.value.dataset.fitLimit || 0) - limit) > 0.001
  frame.value.dataset.fitLimit = String(limit)
  const baseSize = props.kind === 'code' ? 14 : 17
  const peers = fittingGroup?.querySelectorAll('.readme-visual[data-fit-limit]') || []
  scale.value = Math.min(limit, ...[...peers].map(peer =>
    Number(peer.dataset.fitLimit) * (peer.dataset.kind === 'code' ? 14 : 17) / baseSize))
  nativeWidth.value = availableWidth / scale.value
  nativeHeight.value = heightAt(scale.value)
  sourceAspect.value = availableWidth / (nativeHeight.value * scale.value)
  frame.value.style.setProperty('--fitted-height', `${nativeHeight.value * scale.value}px`)
  const columns = frame.value.parentElement
  if (columns?.matches('.code-columns')) {
    const heights = [...columns.children].map(child => parseFloat(child.style.getPropertyValue('--fitted-height')) || 0)
    columns.style.setProperty('--source-aspect', String(columns.clientWidth / Math.max(...heights, 1)))
  }
  if (changed) fittingGroup?.dispatchEvent(new Event('readme-fit'))
  nextTick(balanceRows)
}
function measure() {
  // Keep an already scheduled measurement. A peer notification must not
  // repeatedly postpone a later visual while the first one is fitting.
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = undefined
    if (!frame.value || !content.value) return
    const svg = content.value.querySelector('.mermaid')?.shadowRoot?.querySelector('svg')
    const img = content.value.querySelector('img')
    if (props.kind === 'mermaid' && !svg || img && !img.complete) {
      if (attempts++ < 300) measure()
      return
    }
    const box = svg?.viewBox?.baseVal
    const sourceWidth = box?.width || img?.naturalWidth || props.width
    nativeWidth.value = sourceWidth
    nativeHeight.value = box?.height || img?.naturalHeight || content.value.scrollHeight
    sourceAspect.value = sourceWidth / nativeHeight.value
    // A centered column row takes the height of its tallest fitted item.
    // Fit against the group's available height so fitting does not depend
    // on the row height produced by the previous measurement.
    const parent = frame.value.parentElement
    const columns = parent?.matches('.layout-columns, .artifact-columns, .code-columns, .content-columns')
    const availableWidth = frame.value.clientWidth
    let availableHeight = columns ? parent.clientHeight : frame.value.clientHeight
    const panel = frame.value.closest('.composition-panel')
    if (panel) availableHeight = rowBudget(panel)
    if (parent?.matches('.layout-stacked')) availableHeight = rowBudget(frame.value)
    const compactGroup = frame.value.closest('.layout-compact-stacked')
    if (compactGroup) {
      const siblings = [...compactGroup.children].filter(child => !child.contains(frame.value))
      const budget = compactGroup.matches('.composition-panel') ? rowBudget(compactGroup) : compactGroup.clientHeight
      availableHeight = budget - parseFloat(getComputedStyle(compactGroup).rowGap) * siblings.length
        - siblings.reduce((sum, sibling) => sum + occupiedHeight(sibling), 0)
    }
    const commandGroup = parent?.closest('.layout-command-above')
    if (commandGroup) {
      const commands = [...commandGroup.children].filter(child => child.matches('.command-strip'))
      const gap = parseFloat(getComputedStyle(commandGroup).rowGap)
      const budget = commandGroup.matches('.composition-panel') ? rowBudget(commandGroup) : commandGroup.clientHeight
      if (commands.length === commandGroup.children.length) {
        const weights = commands.map(command => command.querySelectorAll('.line').length * 21 + 34)
        availableHeight = (budget - gap * (commands.length - 1)) * weights[commands.indexOf(frame.value)] / weights.reduce((sum, weight) => sum + weight, 0)
      }
      else availableHeight = frame.value.matches('.command-strip') ? budget
        : budget - commands.reduce((sum, command) => sum + command.clientHeight, 0) - gap * commands.length
    }
    if (availableWidth > 0 && availableHeight > 0) {
      if (props.kind === 'code' || props.kind === 'table') {
        fitText(availableWidth, availableHeight)
        return
      }
      scale.value = Math.min(availableWidth / sourceWidth, availableHeight / nativeHeight.value)
    }
    if (box) {
      // Let the SVG viewBox scale its labels and geometry together. Scaling
      // its HTML parent mispaints sequence labels in Chromium's shadow DOM.
      const host = content.value.querySelector('.mermaid')
      host.style.width = svg.style.width = `${sourceWidth * scale.value}px`
      host.style.height = svg.style.height = `${nativeHeight.value * scale.value}px`
    }
    nextTick(balanceRows)
  })
}
onMounted(async () => {
  await nextTick()
  fittingGroup = frame.value.closest('.deck-content')
  fittingGroup?.addEventListener('readme-fit', measure)
  resize = new ResizeObserver(measure)
  resize.observe(frame.value); resize.observe(content.value)
  if (frame.value.parentElement?.matches('.layout-columns, .artifact-columns, .code-columns, .content-columns'))
    resize.observe(frame.value.parentElement)
  mutation = new MutationObserver(measure)
  mutation.observe(content.value, { childList: true, subtree: true })
  frame.value.addEventListener('load', measure, true)
  document.fonts.ready.then(measure)
  measure()
})
onBeforeUnmount(() => { resize?.disconnect(); mutation?.disconnect(); fittingGroup?.removeEventListener('readme-fit', measure); cancelAnimationFrame(raf) })
</script>

<template>
  <div ref="frame" class="readme-visual zoomable" :data-kind="kind" :data-native-width="nativeWidth" :data-native-height="nativeHeight" :style="{ '--source-aspect': sourceAspect }">
    <div class="source-fit-stage" :style="{ width: `${nativeWidth * scale}px`, height: `${nativeHeight * scale}px` }">
      <div ref="content" class="source-fit-content" :style="{ width: `${nativeWidth * (kind === 'mermaid' ? scale : 1)}px`, transform: kind === 'mermaid' ? 'none' : `scale(${scale})` }"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const dialog = ref()
const stage = ref()
const content = ref()
const scale = ref(1)
const width = ref(800)
const height = ref(400)
const open = ref(false)
const percentage = computed(() => `${Math.round(scale.value * 100)}%`)
const targets = '.zoomable, .mermaid, .slidev-code, .data-table, .memory-bar, .debugger-image, .catalog, .compiler-feature-map'
let sourceElement
let previousFocus
let pointerStart
let observer
let scanFrame
let oldOverflow

function targetFor(target) {
  if (!(target instanceof Element) || !target.closest('.slidev-layout') || target.closest('dialog, a, button, input, textarea, [contenteditable="true"]'))
    return null
  // Explicit composite visuals enlarge together; other elements enlarge alone.
  return target.closest('.zoomable, .data-table, .code-panel, .compiler-showcase-code') || target.closest(targets)
}

function stop(event) {
  event.stopImmediatePropagation()
}

function fit() {
  if (!stage.value) return
  scale.value = Math.min((stage.value.clientWidth - 48) / width.value, (stage.value.clientHeight - 48) / height.value)
}

function adjust(amount) {
  scale.value = Math.min(8, Math.max(0.2, scale.value + amount))
}

async function enlarge(element) {
  if (open.value) return
  sourceElement = element.matches('[data-zoom-ready]') ? element : element.querySelector('[data-zoom-ready]') || element
  previousFocus = document.activeElement
  width.value = element.offsetWidth || element.getBoundingClientRect().width
  height.value = element.offsetHeight || element.getBoundingClientRect().height
  const clone = element.cloneNode(true)
  const originals = [element, ...element.querySelectorAll('*')]
  const copies = [clone, ...clone.querySelectorAll('*')]
  originals.forEach((original, index) => {
    if (original.shadowRoot) copies[index].innerHTML = original.shadowRoot.innerHTML
  })
  // Cloned Slidev controls have no Vue handlers. Remove them, including the
  // hover-only clipboard SVG, before looking for a diagram to fit.
  for (const control of clone.querySelectorAll('.slidev-code-copy')) control.remove()
  // Copy inherited typography without rasterizing code or SVG diagrams.
  const style = getComputedStyle(element)
  for (const property of ['fontFamily', 'fontSize', 'lineHeight', 'color', 'letterSpacing'])
    clone.style[property] = style[property]
  clone.style.width = `${width.value}px`
  clone.style.height = 'auto'
  clone.style.maxHeight = 'none'
  clone.style.margin = '0'
  clone.style.cursor = 'auto'
  clone.removeAttribute('tabindex')
  clone.removeAttribute('role')
  clone.removeAttribute('aria-label')
  for (const item of clone.querySelectorAll('[tabindex], button, a')) item.setAttribute('tabindex', '-1')
  // Mermaid uses IDs for arrow markers and clip paths. Remap the clone's IDs.
  const ids = new Map()
  for (const item of [clone, ...clone.querySelectorAll('[id]')]) {
    if (item.id) { ids.set(item.id, `zoom-${item.id}`); item.id = `zoom-${item.id}` }
  }
  for (const item of [clone, ...clone.querySelectorAll('*')]) {
    if (item.tagName.toLowerCase() === 'style') {
      let css = item.textContent
      for (const [from, to] of ids) css = css.split(`#${from}`).join(`#${to}`)
      item.textContent = css
    }
    for (const attribute of [...item.attributes]) {
      let value = attribute.value
      for (const [from, to] of ids) {
        value = value.split(`url(#${from})`).join(`url(#${to})`)
        if (value === `#${from}`) value = `#${to}`
      }
      if (value !== attribute.value) item.setAttribute(attribute.name, value)
    }
  }
  open.value = true
  await nextTick()
  content.value.replaceChildren(clone)
  // Preserve the diagram's full vector viewBox, including very tall sequences.
  const svg = clone.matches('svg') ? clone : clone.querySelector('.mermaid svg')
  if (svg?.viewBox?.baseVal?.width) {
    const box = svg.viewBox.baseVal
    width.value = Math.max(800, box.width)
    height.value = width.value * box.height / box.width
    clone.style.width = `${width.value}px`
    svg.style.width = `${width.value}px`
    svg.style.height = `${height.value}px`
    svg.style.maxWidth = 'none'
    svg.style.maxHeight = 'none'
  }
  dialog.value.showModal()
  oldOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  if (!svg) height.value = clone.scrollHeight
  // Open at a legible magnification; overflowing content remains scrollable.
  scale.value = Math.max(1.5, Math.min(2, (stage.value.clientWidth - 48) / width.value))
  stage.value.scrollTo(0, 0)
  dialog.value.querySelector('[data-close]').focus()
}

function close() {
  if (!open.value) return
  dialog.value.close()
  open.value = false
  document.body.style.overflow = oldOverflow
  ;(sourceElement?.isConnected ? sourceElement : previousFocus)?.focus?.({ preventScroll: true })
}

function onPointerDown(event) {
  if (open.value) {
    // Modal pointer events must not reach Slidev's swipe/navigation handlers.
    if (event.target === dialog.value) { event.preventDefault(); close() }
    return
  }
  const target = targetFor(event.target)
  if (target && event.button === 0) {
    pointerStart = { target, x: event.clientX, y: event.clientY }
    stop(event)
  } else pointerStart = null
}

function onClick(event) {
  if (open.value) return
  const target = targetFor(event.target)
  if (!target || event.button !== 0) return
  stop(event)
  // A drag selects text instead of opening the viewer, in either route.
  if (pointerStart && (Math.abs(event.clientX - pointerStart.x) > 6 || Math.abs(event.clientY - pointerStart.y) > 6)) return
  if (window.getSelection()?.toString()) return
  event.preventDefault()
  enlarge(target)
}

function onKey(event) {
  if (open.value) {
    // Native Tab remains available for the dialog's focus trap and controls.
    stop(event)
    if (event.key === 'Escape') { event.preventDefault(); close() }
    else if (event.key === '+' || event.key === '=') { event.preventDefault(); adjust(0.25) }
    else if (event.key === '-') { event.preventDefault(); adjust(-0.25) }
    else if (event.key.toLowerCase() === 'f') { event.preventDefault(); fit() }
    else if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && event.target.tagName !== 'BUTTON')) { event.preventDefault(); stage.value.scrollBy(0, 160) }
    else if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); stage.value.scrollBy(0, -160) }
    else if (event.key === 'ArrowRight') { event.preventDefault(); stage.value.scrollBy(160, 0) }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); stage.value.scrollBy(-160, 0) }
    return
  }
  const target = targetFor(event.target)
  if (target && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault(); stop(event); enlarge(target)
  }
}

function scan() {
  cancelAnimationFrame(scanFrame)
  scanFrame = requestAnimationFrame(() => {
    for (const element of document.querySelectorAll(`.slidev-layout :is(${targets})`)) {
      if (element.closest('dialog') || element.dataset.zoomReady || element.parentElement.closest('.zoomable, .data-table')) continue
      element.dataset.zoomReady = 'true'
      element.tabIndex = 0
      element.setAttribute('role', 'button')
      element.setAttribute('aria-label', 'Enlarge visual')
      element.setAttribute('aria-haspopup', 'dialog')
      element.title = 'Click or press Enter to enlarge'
    }
  })
}

onMounted(() => {
  window.addEventListener('pointerdown', onPointerDown, true)
  window.addEventListener('click', onClick, true)
  window.addEventListener('keydown', onKey, true)
  observer = new MutationObserver(scan)
  observer.observe(document.body, { childList: true, subtree: true })
  scan()
})
onBeforeUnmount(() => {
  close()
  observer?.disconnect()
  cancelAnimationFrame(scanFrame)
  window.removeEventListener('pointerdown', onPointerDown, true)
  window.removeEventListener('click', onClick, true)
  window.removeEventListener('keydown', onKey, true)
})
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="visual-zoom" aria-label="Enlarged slide visual" @cancel.prevent="close" @pointerdown.stop @pointerup.stop @click.stop @wheel.stop>
      <div class="zoom-toolbar">
        <span>Enlarged view</span>
        <div class="zoom-actions">
          <button aria-label="Zoom out" @click="adjust(-0.25)">−</button>
          <output aria-live="polite">{{ percentage }}</output>
          <button aria-label="Zoom in" @click="adjust(0.25)">+</button>
          <button @click="fit">Fit</button>
          <button @click="scale = 2">200%</button>
          <button data-close aria-label="Close enlarged view" @click="close">Close · Esc</button>
        </div>
      </div>
      <div ref="stage" class="zoom-stage">
        <div class="zoom-canvas" :style="{ width: `${width * scale}px`, height: `${height * scale}px` }">
          <div ref="content" class="zoom-content" :style="{ width: `${width}px`, transform: `scale(${scale})` }" />
        </div>
      </div>
      <div class="zoom-help">Scroll to explore · + / − to zoom · F to fit · Esc to return</div>
    </dialog>
  </Teleport>
</template>

<style>
.visual-zoom {
  position: fixed; inset: 0; margin: auto; padding: 0;
  width: 96vw; height: 94vh; max-width: none; max-height: none;
  border: 1px solid var(--cyan); border-radius: 12px;
  background: var(--machine-black); color: var(--ink);
  box-shadow: 0 24px 90px #0008; overflow: hidden;
  font-family: Cantarell, sans-serif;
}
.visual-zoom[open] { display: flex; flex-direction: column; }
.visual-zoom::backdrop { background: #10232de0; backdrop-filter: blur(4px); }
.zoom-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 18px; background: var(--machine-deep); border-bottom: 1px solid var(--line); }
.zoom-toolbar > span { color: var(--cyan); font-weight: 700; }
.zoom-actions { display: flex; gap: 8px; align-items: center; }
.zoom-actions button { border: 1px solid var(--line-strong); padding: 6px 12px; border-radius: 5px; background: white; color: var(--ink); cursor: pointer; }
.zoom-actions button:hover { background: #def3f3; }
.zoom-actions button:focus-visible { outline: 3px solid var(--amber); }
.zoom-actions output { min-width: 52px; text-align: center; font-size: 14px; }
.zoom-stage { flex: 1; min-height: 0; padding: 24px; overflow: auto; overscroll-behavior: contain; }
.zoom-canvas { position: relative; margin: 0 auto; }
.zoom-content { position: absolute; top: 0; left: 0; transform-origin: top left; }
.zoom-content, .zoom-content * { -webkit-user-select: text !important; user-select: text !important; cursor: auto !important; }
.zoom-content pre { max-height: none !important; overflow: visible !important; }
.zoom-content .slidev-code { font-family: 'Fira Code', monospace; }
.zoom-content .mermaid { display: block; }
.zoom-content table { width: 100%; }
.zoom-help { padding: 8px 18px; color: var(--muted); font-size: 12px; border-top: 1px solid var(--line); }
@media (max-width: 600px) { .zoom-toolbar > span { display: none; } .zoom-toolbar { padding: 8px; } .zoom-actions { gap: 4px; } .zoom-actions button { padding: 6px 8px; } }
@media print { .visual-zoom { display: none !important; } }
</style>

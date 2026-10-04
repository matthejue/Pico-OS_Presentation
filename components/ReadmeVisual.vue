<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({ kind: String, width: { type: Number, default: 1024 } })
const frame = ref(), content = ref()
const nativeWidth = ref(props.width), nativeHeight = ref(1), scale = ref(1)
const sourceAspect = ref(props.width)
let resize, mutation, raf, attempts = 0
function measure() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
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
    const availableWidth = frame.value.clientWidth, availableHeight = frame.value.clientHeight
    if (availableWidth && availableHeight) {
      scale.value = Math.min(availableWidth / sourceWidth, availableHeight / nativeHeight.value)
      // Keep a complete code box flush with both edges of its column even
      // when a long example is scaled to fit the available height.
      if (props.kind === 'code') nativeWidth.value = availableWidth / scale.value
    }
    if (box) {
      // Let the SVG viewBox scale its labels and geometry together. Scaling
      // its HTML parent mispaints sequence labels in Chromium's shadow DOM.
      const host = content.value.querySelector('.mermaid')
      host.style.width = svg.style.width = `${sourceWidth * scale.value}px`
      host.style.height = svg.style.height = `${nativeHeight.value * scale.value}px`
    }
  })
}
onMounted(async () => {
  await nextTick()
  resize = new ResizeObserver(measure)
  resize.observe(frame.value); resize.observe(content.value)
  mutation = new MutationObserver(measure)
  mutation.observe(content.value, { childList: true, subtree: true })
  frame.value.addEventListener('load', measure, true)
  document.fonts.ready.then(measure)
  measure()
})
onBeforeUnmount(() => { resize?.disconnect(); mutation?.disconnect(); cancelAnimationFrame(raf) })
</script>

<template>
  <div ref="frame" class="readme-visual zoomable" :data-kind="kind" :data-native-width="nativeWidth" :data-native-height="nativeHeight" :style="{ '--source-aspect': sourceAspect }">
    <div class="source-fit-stage" :style="{ width: `${nativeWidth * scale}px`, height: `${nativeHeight * scale}px` }">
      <div ref="content" class="source-fit-content" :style="{ width: `${nativeWidth * (kind === 'mermaid' ? scale : 1)}px`, transform: kind === 'mermaid' ? 'none' : `scale(${scale})` }"><slot /></div>
    </div>
  </div>
</template>

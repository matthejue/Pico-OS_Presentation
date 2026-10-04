<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({ kind: String, width: { type: Number, default: 1024 } })
const frame = ref(), content = ref()
const nativeWidth = ref(props.width), nativeHeight = ref(1), scale = ref(1)
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
    nativeWidth.value = box?.width || img?.naturalWidth || props.width
    nativeHeight.value = box?.height || img?.naturalHeight || content.value.scrollHeight
    if (box) {
      const host = content.value.querySelector('.mermaid')
      host.style.width = `${box.width}px`
      host.style.height = `${box.height}px`
    }
    const availableWidth = frame.value.clientWidth, availableHeight = frame.value.clientHeight
    if (availableWidth && availableHeight) scale.value = Math.min(availableWidth / nativeWidth.value, availableHeight / nativeHeight.value)
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
  <div ref="frame" class="readme-visual zoomable" :data-kind="kind" :data-native-width="nativeWidth" :data-native-height="nativeHeight">
    <div class="source-fit-stage" :style="{ width: `${nativeWidth * scale}px`, height: `${nativeHeight * scale}px` }">
      <div ref="content" class="source-fit-content" :style="{ width: `${nativeWidth}px`, transform: `scale(${scale})` }"><slot /></div>
    </div>
  </div>
</template>

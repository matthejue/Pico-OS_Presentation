<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ url: string }>()
const link = ref<HTMLElement>()
const status = ref('Copy link')
const urlParts = computed(() => {
  const split = props.url.indexOf('/releases/') + 1
  return [props.url.slice(0, split), props.url.slice(split)]
})

async function copyLink() {
  try {
    await navigator.clipboard.writeText(props.url)
    status.value = 'Copied'
  }
  catch {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(link.value!)
    selection?.removeAllRanges()
    selection?.addRange(range)
    status.value = document.execCommand('copy') ? 'Copied' : 'Select and copy link'
  }
}
</script>

<template>
  <div class="release-archive">
    <div class="release-intro">
      <span class="eyebrow">Ready-built runtime</span>
      <h3>Try <span class="accent">PicoOS</span></h3>
      <p>The bootloader, kernel, shell and user applications in one archive.</p>
    </div>
    <div class="readme-code release-link">
      <div class="readme-code-header">
        <span>pico-os-runtime.tar.gz</span>
        <button type="button" @pointerdown.stop @click.stop="copyLink" @keydown.stop>
          <span aria-live="polite">{{ status }}</span>
        </button>
      </div>
      <pre class="slidev-code zoomable" aria-label="PicoOS release archive URL"><code ref="link"><span>{{ urlParts[0] }}</span><wbr><span>{{ urlParts[1] }}</span></code></pre>
    </div>
    <div class="release-steps">
      <div><span>01</span><b>Download</b><p>Get the runtime archive.</p></div>
      <div><span>02</span><b>Extract</b><p>Use its own directory.</p></div>
      <div><span>03</span><b>Start</b><p>Run the platform launcher.</p></div>
    </div>
    <div class="release-footer">
      <span>Linux · macOS · Windows · Android (Termux)</span>
      <a href="https://github.com/matthejue/Pico-OS/releases/latest" target="_blank" rel="noopener noreferrer" @pointerdown.stop @click.stop @keydown.stop>Open release ↗</a>
    </div>
  </div>
</template>

<style scoped>
.release-archive { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem; }
.release-intro { display: flex; flex-direction: column; gap: 0.7rem; }
.release-intro h3 { margin: 0; font-size: 2.7rem; line-height: 1.1; }
.release-intro p { font-size: 1rem; color: var(--muted); }
.release-link { border-left: 4px solid var(--cyan); }
.release-link .slidev-code { font-size: 17px !important; padding: 20px !important; color: var(--ink); }
.release-link code { background: none; padding: 0; user-select: text; }
.release-link code > span { white-space: nowrap !important; }
.release-link button { flex: none; padding: 5px 12px; color: var(--cyan-dim); background: white; border: 1px solid var(--line-strong); font: 600 13px/1.35 Cantarell, sans-serif; }
.release-link button:hover { background: var(--code-header); }
.release-link button:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
.release-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
.release-steps > div { display: grid; grid-template-columns: auto 1fr; gap: 0.4rem 0.65rem; border-top: 1px solid var(--line-strong); padding-top: 0.9rem; }
.release-steps span { color: var(--cyan-dim); font: 500 0.85rem/1.5 'Fira Code', monospace; }
.release-steps b { color: var(--ink); font-size: 1rem; }
.release-steps p { grid-column: 2; font-size: 0.85rem; color: var(--muted); }
.release-footer { display: flex; justify-content: space-between; gap: 1rem; color: var(--muted); font-size: 0.8rem; }
.release-footer a { font-weight: 600; }
@media print { .release-link button { display: none; } }
</style>

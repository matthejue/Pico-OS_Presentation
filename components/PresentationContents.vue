<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import { usePresentationNavigation } from '../setup/presentation-navigation'
import { shortcutHintsVisible } from '../setup/shortcut-hints'

const { navigation, chapters, href } = usePresentationNavigation()
const columns = computed(() => chapters.value.length > 12 ? 3 : chapters.value.length > 5 ? 2 : 1)
const groups = computed(() => {
  const size = Math.ceil(chapters.value.length / columns.value)
  return Array.from({ length: columns.value }, (_, column) => chapters.value.slice(column * size, (column + 1) * size))
})
const frame = ref<HTMLElement>()
const fontSize = ref(13.5)
let observer: ResizeObserver | undefined
let measuring = false
async function fit() {
  if (measuring || !frame.value?.clientHeight) return
  measuring = true
  try {
    fontSize.value = 13.5
    await nextTick()
    while (frame.value && frame.value.scrollHeight > frame.value.clientHeight + 1 && fontSize.value > 10) {
      fontSize.value -= 0.25
      await nextTick()
    }
  } finally { measuring = false }
}
onMounted(() => {
  observer = new ResizeObserver(fit)
  observer.observe(frame.value!)
  document.fonts.ready.then(fit)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="presentation-contents section-overview">
    <div class="section-overview-meta">
      <span>{{ chapters.length }} sections <span class="overview-meta-dot">·</span> PicoOS</span>
      <span v-if="shortcutHintsVisible" class="section-navigation-hint">Choose a section <span aria-hidden="true">↗</span> · H: hide hints</span>
    </div>
    <nav ref="frame" class="major-toc" aria-label="Presentation contents"
      :style="{ '--major-columns': columns, '--major-font-size': `${fontSize}px` }">
      <div v-for="(group, column) in groups" :key="column" class="major-toc-column">
      <a v-for="chapter in group" :key="chapter.anchor" class="major-toc-link"
        :href="href(chapter.page)" :data-contents-anchor="chapter.anchor"
        :aria-label="`${chapter.number}. ${chapter.title}, section overview, slide ${chapter.page}`"
        @click.stop.prevent="navigation.go(chapter.page)">
        <span class="major-toc-number">{{ chapter.number.padStart(2, '0') }}</span>
        <span class="major-toc-title" v-html="chapter.titleHtml" />
        <span class="major-toc-page">{{ chapter.page }}</span>
      </a>
      </div>
    </nav>
    <div class="section-overview-footer"><span class="section-overview-rule" /><span>PicoOS · Presentation map</span></div>
  </div>
</template>

<style>
.major-toc { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(var(--major-columns), minmax(0, 1fr)); gap: 1.2rem; font-size: var(--major-font-size); }
.major-toc-column { display: flex; flex-direction: column; align-self: start; gap: 0.4em; }
.slidev-layout .major-toc-link { display: flex; align-items: flex-start; gap: 0.6em; padding: 0.5em 0.35em 0.3em; border: 0; border-top: 1px solid var(--line-strong); color: var(--ink); text-decoration: none; font-size: inherit; line-height: 1.23; border-radius: 0.15rem; }
.major-toc-number { flex: none; color: var(--cyan-dim); font: 500 0.78rem/1.3 'Fira Code', monospace; }
.major-toc-link:nth-child(3n + 2) .major-toc-number { color: var(--amber); }
.major-toc-title { flex: 1; min-width: 0; }
.major-toc-page { flex: none; color: var(--muted); font: 500 0.6rem/1.5 'Fira Code', monospace; }
.slidev-layout .major-toc-link:hover { background: #e3f2f2; color: var(--cyan-dim); }
.major-toc-link:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
</style>

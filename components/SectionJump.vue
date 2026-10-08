<script setup lang="ts">
import { computed } from 'vue'
import { usePresentationNavigation } from '../setup/presentation-navigation'

const props = defineProps<{ section: string }>()
const { navigation, chapters, href } = usePresentationNavigation()
const chapter = computed(() => chapters.value.find(item => item.anchor === props.section))
</script>

<template>
  <div class="section-jump">
    <span class="section-jump-caption">From kernel mechanisms to library calls</span>
    <a v-if="chapter" class="section-jump-card" :href="href(chapter.page)"
      :data-jump-anchor="section" @click.stop.prevent="navigation.go(chapter.page)">
      <span class="section-jump-number">{{ chapter.number }}</span>
      <span class="section-jump-copy">
        <strong>{{ chapter.title }}</strong>
        <span>See how a user library enters the kernel through a syscall.</span>
        <span class="section-jump-action">Open section overview <span aria-hidden="true">↗</span></span>
      </span>
      <span class="section-jump-arrow" aria-hidden="true">→</span>
    </a>
    <span class="section-jump-footer">Jump ahead · skip sections 8 and 9</span>
  </div>
</template>

<style scoped>
.section-jump { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 1rem; }
.section-jump-caption { color: var(--cyan-dim); font-size: 0.95rem; font-weight: 600; }
.slidev-layout a.section-jump-card { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 1.8rem; padding: 2.1rem; color: var(--ink); border: 1px solid var(--line-strong); border-left: 5px solid var(--cyan); background: var(--code-background); text-decoration: none; }
.section-jump-number { color: var(--cyan-dim); font: 500 4rem/1 'Fira Code', monospace; }
.section-jump-copy { display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.95rem; }
.section-jump-copy strong { font-size: 1.75rem; line-height: 1.2; }
.section-jump-action { color: var(--cyan-dim); font-weight: 600; margin-top: 0.5rem; }
.section-jump-arrow { color: var(--cyan-dim); font-size: 2rem; }
.section-jump-footer { color: var(--muted); font-size: 0.8rem; }
.slidev-layout a.section-jump-card:hover { background: var(--code-header); border-color: var(--cyan); }
.section-jump-card:focus-visible { outline: 2px solid var(--amber); outline-offset: 4px; }
</style>

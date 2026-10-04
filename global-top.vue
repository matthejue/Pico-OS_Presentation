<template>
  <VisualZoom />
  <ShortVersionStatus />
  <div v-if="$nav.currentPage > 1 && !$nav.currentFrontmatter.sectionOverview && !$nav.currentFrontmatter.shortVersion" class="zoom-hint">
    <div v-if="isDevelopment">m: toggle short-deck exclusion · Alt+A: apply exclusions · Alt+S: sync list from slides</div>
    <div>Visual: Enter/Space open · +/− zoom · F fit · arrows/PgUp/PgDn/Space scroll · Esc close · Recording: Space play/pause · ←/→ seek</div>
  </div>
  <div v-if="$nav.currentPage > 1" class="deck-page-number">
    {{ $nav.currentPage }} / {{ $nav.total }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ShortVersionStatus from './components/ShortVersionStatus.vue'
import VisualZoom from './components/VisualZoom.vue'

const isDevelopment = import.meta.env.DEV

onMounted(() => {
  document.documentElement.classList.toggle(
    'selectable-text',
    window.location.pathname.startsWith('/selectable-text/'),
  )
})
</script>

<style scoped>
.zoom-hint {
  position: absolute;
  left: 3rem;
  bottom: 0.85rem;
  right: 7rem;
  color: var(--muted);
  font: 400 0.65rem/1.35 Cantarell, sans-serif;
  pointer-events: none;
}
.deck-page-number {
  position: absolute;
  z-index: 100;
  right: 1.35rem;
  bottom: 0.85rem;
  color: rgba(61, 105, 113, 0.62);
  font: 500 0.66rem/1 'Fira Code', monospace;
  letter-spacing: 0.04em;
}
</style>

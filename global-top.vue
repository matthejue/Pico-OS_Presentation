<template>
  <VisualZoom />
  <ShortVersionStatus />
  <div v-if="$nav.currentPage > 1" class="zoom-hint">Click visuals to enlarge · click recordings to play</div>
  <div v-if="$nav.currentPage > 1" class="deck-page-number">
    {{ $nav.currentPage }} / {{ $nav.total }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ShortVersionStatus from './components/ShortVersionStatus.vue'
import VisualZoom from './components/VisualZoom.vue'

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
  color: var(--muted);
  font: 400 0.65rem/1 Cantarell, sans-serif;
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

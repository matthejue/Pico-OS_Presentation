<template>
  <SlideNotes />
  <SlideNotes corrections />
  <VisualZoom />
  <ShortVersionStatus />
  <div v-if="shortcutHintsVisible && $nav.currentPage > 1 && !$nav.currentFrontmatter.sectionOverview && !$nav.currentFrontmatter.presentationContents" class="zoom-hint">
    <div v-if="isDevelopment">m: toggle short-deck exclusion · Alt+A: apply exclusions · Alt+S: sync list from slides</div>
    <div>Notes: Alt+N edit · Alt+Shift+N show/hide · Corrections: Alt+C edit · Alt+Shift+C show/hide</div>
    <div>Visual: Enter/Space open · +/− zoom · F fit · arrows/PgUp/PgDn/Space scroll · Esc close · Recording: Space play/pause · ←/→ seek · H: hide hints</div>
  </div>
  <div v-if="$nav.currentPage > 1" class="deck-page-number">
    {{ $nav.currentPage }} / {{ $nav.total }}
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import ShortVersionStatus from './components/ShortVersionStatus.vue'
import SlideNotes from './components/SlideNotes.vue'
import VisualZoom from './components/VisualZoom.vue'
import { shortcutHintsVisible, toggleShortcutHints } from './setup/shortcut-hints'

const isDevelopment = import.meta.env.DEV

function onHintKey(event) {
  if (event.key.toLowerCase() !== 'h' || event.isComposing || event.ctrlKey || event.metaKey || event.altKey)
    return
  if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))
    return
  // Handle this before Slidev's key tracking, including when a link or button
  // has focus. Consuming the event prevents other handlers from navigating.
  event.preventDefault()
  event.stopImmediatePropagation()
  if (event.type === 'keydown' && !event.repeat)
    toggleShortcutHints()
}

onMounted(() => {
  window.addEventListener('keydown', onHintKey, true)
  window.addEventListener('keyup', onHintKey, true)
  document.documentElement.classList.toggle(
    'selectable-text',
    window.location.pathname.startsWith('/selectable-text/'),
  )
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onHintKey, true)
  window.removeEventListener('keyup', onHintKey, true)
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

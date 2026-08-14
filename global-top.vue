<template>
  <div v-if="$nav.currentPage > 1" class="deck-page-number">
    {{ $nav.currentPage }} / {{ $nav.total }}
  </div>
</template>

<style scoped>
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

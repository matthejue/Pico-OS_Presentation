<script setup lang="ts">
import { computed } from 'vue'
import { usePresentationNavigation } from '../setup/presentation-navigation'

const props = defineProps<{ section: string }>()
const { navigation, chapters, href } = usePresentationNavigation()
const target = computed(() => chapters.value.find(chapter => chapter.anchor === props.section)?.page)
</script>

<template>
  <a v-if="target" class="major-section-link" :href="href(target)" :data-overview-anchor="section"
    title="Open section overview" @click.stop.prevent="navigation.go(target)"><slot /></a>
  <span v-else><slot /></span>
</template>

<style>
.slidev-layout a.major-section-link { color: inherit; border: 0; text-decoration: none; }
.slidev-layout a.major-section-link:hover { color: var(--cyan); text-decoration: underline; text-underline-offset: 0.2em; }
.major-section-link:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
</style>

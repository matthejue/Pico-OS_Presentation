<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePresentationNavigation } from '../setup/presentation-navigation'
import sections from '../config/section-overviews.json'
import { shortcutHintsVisible } from '../setup/shortcut-hints'

const props = defineProps<{ section: string }>()
const { navigation, contentSlides: allContentSlides, contentsPage, href } = usePresentationNavigation()
const frame = ref<HTMLElement>()
const fontSize = ref(14.5)
const columnCount = ref(1)
const measuredWeights = ref<Record<string, number>>({})
const section = computed(() => sections.find(item => item.anchor === props.section)!)
const contentSlides = computed(() => allContentSlides.value.filter(slide => {
  const meta = slide.meta.slide.frontmatter
  return !meta.sectionOverview && (meta.readmeAnchor === props.section
    || section.value.entries.some(entry => entry.anchor === meta.readmeAnchor))
}))
const pagesFor = (anchor: string) => contentSlides.value
  .filter(slide => slide.meta.slide.frontmatter.readmeAnchor === anchor).map(slide => slide.no)
const introduction = computed(() => pagesFor(props.section))
const topicEntries = computed(() => section.value.entries.map(entry => {
  const pages = pagesFor(entry.anchor)
  const target = pages[0] ?? contentSlides.value.find(slide => entry.descendants
    .includes(slide.meta.slide.frontmatter.readmeAnchor))?.no
  return { ...entry, pages, target }
}).filter(entry => entry.target))
const entries = computed(() => [
  ...(introduction.value.length ? [{
    anchor: props.section, number: '', title: 'Section Introduction',
    titleHtml: 'Section Introduction', depth: 0, descendants: [],
    pages: introduction.value, target: introduction.value[0],
  }] : []),
  ...topicEntries.value,
])

// Read down each column, then continue at the top of the next. Choose the
// contiguous partition with the smallest tallest column, retaining README order.
const columns = computed(() => {
  if (!entries.value.length) return []
  const count = Math.min(entries.value.length, columnCount.value)
  const weight = (entry: typeof entries.value[number]) =>
    measuredWeights.value[entry.anchor] ?? 1.4 + Math.floor((entry.title.length + entry.pages.length * 3) / (count === 3 ? 33 : 54))
  const total = [0]
  entries.value.forEach(entry => total.push(total.at(-1)! + weight(entry)))
  const costs = Array.from({ length: count + 1 }, () => Array(total.length).fill(Infinity))
  const starts = Array.from({ length: count + 1 }, () => Array(total.length).fill(0))
  costs[0][0] = 0
  for (let column = 1; column <= count; column++) {
    for (let end = column; end < total.length; end++) {
      for (let start = column - 1; start < end; start++) {
        const cost = Math.max(costs[column - 1][start], total[end] - total[start])
        if (cost < costs[column][end]) {
          costs[column][end] = cost
          starts[column][end] = start
        }
      }
    }
  }
  const result: typeof entries.value[] = []
  let end = entries.value.length
  for (let column = count; column > 0; column--) {
    const start = starts[column][end]
    result.unshift(entries.value.slice(start, end))
    end = start
  }
  return result
})
let observer: ResizeObserver | undefined
let measuring = false
async function fit() {
  if (measuring || !frame.value?.clientHeight) return
  measuring = true
  try {
    const preferredColumns = entries.value.length > 18 ? 3 : entries.value.length > 6 ? 2 : 1
    // Expanded README hierarchies can need a fourth column. Measure each
    // candidate at its actual width before balancing and reducing the font.
    for (let count = preferredColumns; count <= Math.min(4, entries.value.length); count++) {
      columnCount.value = count
      fontSize.value = 14.5
      measuredWeights.value = {}
      await nextTick()
      if (!frame.value) return
      measuredWeights.value = Object.fromEntries([...frame.value.querySelectorAll<HTMLElement>('[data-topic-anchor]')]
        .map(row => [row.dataset.topicAnchor!, row.offsetHeight + parseFloat(getComputedStyle(row).marginTop)]))
      await nextTick()
      while (frame.value && frame.value.scrollHeight > frame.value.clientHeight + 1 && fontSize.value > 10) {
        fontSize.value -= 0.25
        await nextTick()
      }
      if (!frame.value || frame.value.scrollHeight <= frame.value.clientHeight + 1) break
    }
  }
  finally { measuring = false }
}
onMounted(() => {
  observer = new ResizeObserver(fit)
  observer.observe(frame.value!)
  document.fonts.ready.then(fit)
  void fit()
})
watch(entries, () => void nextTick(fit))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="section-overview" :data-section-anchor="section.anchor">
    <div class="section-overview-meta">
      <span>{{ entries.length }} topics <span class="overview-meta-dot">·</span> {{ contentSlides.length }} slides</span>
      <span v-if="shortcutHintsVisible" class="section-navigation-hint">Choose a topic or slide number <span aria-hidden="true">↗</span> · H: hide hints</span>
    </div>
    <nav ref="frame" class="section-toc" :class="{ 'toc-dense': columns.length === 4 }" :aria-label="`Section ${section.number} contents`"
      :style="{ '--toc-font-size': `${fontSize}px`, '--toc-columns': Math.max(1, columns.length) }">
      <ol v-for="(column, index) in columns" :key="index" class="section-toc-column">
        <li v-for="entry in column" :key="entry.anchor" class="section-toc-entry"
          :class="{ 'toc-group': entry.depth === 1, 'toc-introduction': entry.depth === 0 }"
          :style="{ '--toc-depth': entry.depth }" :data-topic-anchor="entry.anchor">
          <a class="section-topic-link" :href="href(entry.target!)"
            :aria-label="`${entry.number} ${entry.title}, slide ${entry.target}`"
            @click.stop.prevent="navigation.go(entry.target)">
            <span v-if="entry.number" class="section-topic-number">{{ entry.number }}</span>
            <span class="section-topic-title" v-html="entry.titleHtml" />
          </a>
          <span v-if="entry.pages.length" class="section-slide-links" :aria-label="`${entry.number} slides`">
            <a v-for="(page, part) in entry.pages" :key="page" :href="href(page)"
              :aria-label="`${entry.number} ${entry.title}, ${entry.pages.length > 1 ? `part ${part + 1}, ` : ''}slide ${page}`"
              :title="`Slide ${page}${entry.pages.length > 1 ? ` · part ${part + 1}` : ''}`"
              @click.stop.prevent="navigation.go(page)">{{ page }}</a>
          </span>
        </li>
      </ol>
      <div v-if="!entries.length" class="section-single-topic">
        <span class="section-single-number" aria-hidden="true">{{ section.number.padStart(2, '0') }}</span>
        <a v-if="introduction.length" :href="href(introduction[0])" @click.stop.prevent="navigation.go(introduction[0])">
          Explore this section <span aria-hidden="true">↗</span>
        </a>
        <span v-else>No slides in this presentation version</span>
      </div>
    </nav>
    <div class="section-overview-footer">
      <a v-if="contentsPage" class="contents-back-link" :href="href(contentsPage)"
        @click.stop.prevent="navigation.go(contentsPage)">← Contents</a>
      <span class="section-overview-rule" />
      <span>README section {{ section.number }}</span>
    </div>
  </div>
</template>

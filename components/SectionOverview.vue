<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSlideContext } from '@slidev/client'
import sections from '../config/section-overviews.json'

const props = defineProps<{ section: string }>()
const { $nav } = useSlideContext()
const router = useRouter()
const frame = ref<HTMLElement>()
const fontSize = ref(14.5)
const measuredWeights = ref<Record<string, number>>({})
const section = computed(() => sections.find(item => item.anchor === props.section)!)
const contentSlides = computed(() => $nav.value.slides.filter(slide => {
  const meta = slide.meta.slide.frontmatter
  return !meta.sectionOverview && (meta.readmeAnchor === props.section
    || section.value.entries.some(entry => entry.anchor === meta.readmeAnchor))
}))
const pagesFor = (anchor: string) => contentSlides.value
  .filter(slide => slide.meta.slide.frontmatter.readmeAnchor === anchor).map(slide => slide.no)
const introduction = computed(() => pagesFor(props.section))
const entries = computed(() => section.value.entries.map(entry => {
  const pages = pagesFor(entry.anchor)
  const target = pages[0] ?? contentSlides.value.find(slide => entry.descendants
    .includes(slide.meta.slide.frontmatter.readmeAnchor))?.no
  return { ...entry, pages, target }
}))

// Read down each column, then continue at the top of the next. Choose the
// contiguous partition with the smallest tallest column, retaining README order.
const columns = computed(() => {
  if (!entries.value.length) return []
  const count = entries.value.length > 18 ? 3 : entries.value.length > 6 ? 2 : 1
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
const href = (page: number) => router.resolve({
  path: `${$nav.value.isPresenter ? '/presenter' : ''}/${page}`,
}).href

let observer: ResizeObserver | undefined
let measuring = false
async function fit() {
  if (measuring || !frame.value?.clientHeight) return
  measuring = true
  try {
    fontSize.value = 14.5
    await nextTick()
    if (!frame.value) return
    // Actual wrapping and the slide badges determine row height. Measuring at
    // the preferred size avoids overloading a column with short-looking labels.
    measuredWeights.value = Object.fromEntries([...frame.value.querySelectorAll<HTMLElement>('[data-topic-anchor]')]
      .map(row => [row.dataset.topicAnchor!, row.offsetHeight + parseFloat(getComputedStyle(row).marginTop)]))
    await nextTick()
    while (frame.value && frame.value.scrollHeight > frame.value.clientHeight + 1 && fontSize.value > 10) {
      fontSize.value -= 0.25
      await nextTick()
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
      <span>Choose a topic or slide number <span aria-hidden="true">↗</span></span>
    </div>
    <nav ref="frame" class="section-toc" :aria-label="`Section ${section.number} contents`"
      :style="{ '--toc-font-size': `${fontSize}px`, '--toc-columns': Math.max(1, columns.length) }">
      <ol v-for="(column, index) in columns" :key="index" class="section-toc-column">
        <li v-for="entry in column" :key="entry.anchor" class="section-toc-entry"
          :class="{ 'toc-group': entry.depth === 1, 'toc-unavailable': !entry.target }"
          :style="{ '--toc-depth': entry.depth - 1 }" :data-topic-anchor="entry.anchor">
          <a v-if="entry.target" class="section-topic-link" :href="href(entry.target)"
            :aria-label="`${entry.number} ${entry.title}, slide ${entry.target}`"
            @click.stop.prevent="$nav.go(entry.target)">
            <span class="section-topic-number">{{ entry.number }}</span>
            <span class="section-topic-title" v-html="entry.titleHtml" />
          </a>
          <span v-else class="section-topic-link" :title="'No separate slide in this presentation version'">
            <span class="section-topic-number">{{ entry.number }}</span>
            <span class="section-topic-title" v-html="entry.titleHtml" />
          </span>
          <span v-if="entry.pages.length" class="section-slide-links" :aria-label="`${entry.number} slides`">
            <a v-for="(page, part) in entry.pages" :key="page" :href="href(page)"
              :aria-label="`${entry.number} ${entry.title}, ${entry.pages.length > 1 ? `part ${part + 1}, ` : ''}slide ${page}`"
              :title="`Slide ${page}${entry.pages.length > 1 ? ` · part ${part + 1}` : ''}`"
              @click.stop.prevent="$nav.go(page)">{{ page }}</a>
          </span>
        </li>
      </ol>
      <div v-if="!entries.length" class="section-single-topic">
        <span class="section-single-number" aria-hidden="true">{{ section.number.padStart(2, '0') }}</span>
        <a v-if="introduction.length" :href="href(introduction[0])" @click.stop.prevent="$nav.go(introduction[0])">
          Explore this section <span aria-hidden="true">↗</span>
        </a>
        <span v-else>No slides in this presentation version</span>
      </div>
    </nav>
    <div class="section-overview-footer">
      <span class="section-overview-rule" />
      <span v-if="introduction.length && entries.length" class="section-introduction">
        Section introduction
        <a v-for="page in introduction" :key="page" :href="href(page)" @click.stop.prevent="$nav.go(page)">{{ page }}</a>
      </span>
      <span v-else>README section {{ section.number }}</span>
    </div>
  </div>
</template>

<style>
.slidev-layout:has(.section-overview) {
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem 2.5rem;
}
.slidev-layout:has(.section-overview) > h1 {
  font-size: 2.6rem;
  line-height: 1.08;
  margin: 0.75rem 0 1rem;
  max-width: 54rem;
}
.section-eyebrow { flex: none; }
.section-overview { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 0.8rem; }
.section-overview-meta { display: flex; justify-content: space-between; color: var(--muted); font-size: 0.72rem; }
.overview-meta-dot { color: var(--amber); padding: 0 0.4rem; }
.section-overview-meta > span:last-child > span { color: var(--cyan); margin-left: 0.3rem; }
.section-toc { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(var(--toc-columns), minmax(0, 1fr)); gap: 1.35rem; font-size: var(--toc-font-size); }
.slidev-layout .section-toc-column { list-style: none; padding: 0; margin: 0; align-self: start; }
.section-toc-column + .section-toc-column { border-left: 1px solid var(--line); padding-left: 1.1rem; }
.slidev-layout .section-toc-entry { display: flex; align-items: baseline; gap: 0.35em; margin: 0 !important; padding: 0.14em 0 0.14em calc(var(--toc-depth) * 0.55em); line-height: 1.24; }
.section-topic-link { display: flex; flex: 1; min-width: 0; gap: 0.5em; align-items: baseline; border: 0 !important; border-radius: 0.2rem; padding: 0.1em 0.2em; text-decoration: none !important; }
.slidev-layout .section-topic-link { color: var(--ink); }
.section-topic-number { flex: none; color: var(--cyan-dim); font: 500 0.8em/1.3 'Fira Code', monospace; }
.section-topic-title { min-width: 0; }
.slidev-layout .section-topic-title code { font-size: 0.88em; background: none; padding: 0; color: var(--cyan-dim); }
.section-toc-entry.toc-group { border-top: 2px solid var(--line-strong); padding-top: 0.35em; margin-top: 0.25em !important; }
.section-toc-column > .toc-group:first-child { margin-top: 0 !important; }
.toc-group .section-topic-link { font-weight: 700; }
.toc-group .section-topic-number { color: var(--amber); }
.section-slide-links { flex: none; display: flex; flex-wrap: wrap; justify-content: flex-end; max-width: 4em; gap: 0.3em; margin: 0.1em 0; }
.section-slide-links a, .section-introduction a { border: 1px solid var(--line) !important; border-radius: 0.2rem; padding: 0.12em 0.4em; background: var(--panel-2); font: 500 0.7em/1.2 'Fira Code', monospace; text-decoration: none !important; }
.section-toc a:hover, .section-introduction a:hover { color: var(--cyan-dim); background: #e3f2f2; }
.section-toc a:focus-visible, .section-introduction a:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.toc-unavailable { opacity: 0.55; }
.section-overview-footer { flex: none; display: flex; gap: 1rem; align-items: center; color: var(--muted); font-size: 0.65rem; }
.section-overview-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--cyan), var(--line)); }
.section-introduction { display: flex; align-items: center; gap: 0.45rem; }
.section-introduction a { font-size: 0.9em; }
.section-single-topic { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1rem; }
.section-single-number { font: 600 6rem/1 'Fira Code', monospace; color: var(--line-strong); letter-spacing: -0.06em; }
.section-single-topic a { font-size: 1.15rem; }
@media (prefers-reduced-motion: no-preference) {
  .section-toc a { transition: color 120ms ease, background 120ms ease; }
}
</style>

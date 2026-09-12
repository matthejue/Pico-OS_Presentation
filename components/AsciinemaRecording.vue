<script setup>
import { lockShortcuts } from '@slidev/client'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import 'asciinema-player/dist/bundle/asciinema-player.css'

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, default: 'Terminal recording' },
  poster: { type: String, default: 'npt:0' },
  speed: { type: Number, default: 1 },
  idleTimeLimit: { type: Number, default: 1 },
  fallbackHref: { type: String, required: true },
  fallbackLabel: { type: String, default: 'Fallback on asciinema.org' },
})

const shell = ref()
const playerHost = ref()
const active = ref(false)
const failed = ref(false)
const assetUrl = computed(() => {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(props.src))
    return props.src
  return `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${props.src.replace(/^\/+/, '')}`
})

let player
let unlockShortcuts

function holdSlideShortcuts() {
  if (!unlockShortcuts)
    unlockShortcuts = lockShortcuts()
}

function releaseSlideShortcuts() {
  unlockShortcuts?.()
  unlockShortcuts = undefined
}

async function mountPlayer() {
  try {
    const AsciinemaPlayer = await import('asciinema-player')
    player = AsciinemaPlayer.create(assetUrl.value, playerHost.value, {
      controls: true,
      fit: 'both',
      idleTimeLimit: props.idleTimeLimit,
      poster: props.poster,
      preload: true,
      speed: props.speed,
    })
    player.addEventListener('errored', () => failed.value = true)
    await player.getDuration()
  }
  catch {
    failed.value = true
  }
}

async function activate(event) {
  event?.preventDefault()
  if (active.value || !player)
    return

  active.value = true
  holdSlideShortcuts()
  await nextTick()
  try {
    await player.play()
    player.el?.focus?.({ preventScroll: true })
  }
  catch {
    failed.value = true
    releaseSlideShortcuts()
  }
}

function onFocusIn() {
  if (active.value)
    holdSlideShortcuts()
}

function onFocusOut(event) {
  if (!shell.value?.contains(event.relatedTarget))
    releaseSlideShortcuts()
}

function onDocumentPointerDown(event) {
  if (active.value && !shell.value?.contains(event.target))
    releaseSlideShortcuts()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
  void mountPlayer()
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
  releaseSlideShortcuts()
  player?.dispose?.()
  player = undefined
})
</script>

<template>
  <div ref="shell" class="asciinema-recording-shell" @focusin="onFocusIn" @focusout="onFocusOut">
    <div class="asciinema-recording" :class="{ 'is-active': active }">
      <div ref="playerHost" class="asciinema-recording-player-host" />
      <div v-if="failed" class="asciinema-recording-error" role="alert">
        The local recording could not be played.
      </div>
      <div
        v-if="!active && !failed"
        class="asciinema-recording-activation"
        role="button"
        tabindex="0"
        :aria-label="`Play ${title} on this slide`"
        @click="activate"
        @keydown.enter="activate"
        @keydown.space="activate"
      >
        <div class="asciinema-recording-play" aria-hidden="true"><span>▶</span></div>
        <div class="asciinema-recording-caption">
          <span>{{ title }}</span>
          <span>click to play local .cast</span>
        </div>
      </div>
    </div>
    <div class="asciinema-recording-meta">
      <span>{{ active ? 'Player keys active · click outside to return to slide navigation' : 'Local recording · available offline' }}</span>
      <a :href="fallbackHref" target="_blank" rel="noopener">{{ fallbackLabel }} ↗</a>
    </div>
  </div>
</template>

<style>
.asciinema-recording-shell {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.45rem;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
.asciinema-recording {
  position: relative;
  display: flex;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(7, 139, 152, 0.45);
  border-radius: 0.45rem;
  background: #0a050d;
  box-shadow: 0 14px 30px rgba(28, 65, 72, 0.16);
}
.asciinema-recording-player-host {
  width: 100%;
  height: 100%;
  min-height: 0;
}
.asciinema-recording-player-host .ap-wrapper,
.asciinema-recording-player-host .ap-player { width: 100%; height: 100%; }
.asciinema-recording:not(.is-active) .asciinema-recording-player-host { pointer-events: none; }
.asciinema-recording:not(.is-active) .ap-overlay,
.asciinema-recording:not(.is-active) .ap-control-bar { display: none !important; }
.asciinema-recording-activation {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  cursor: pointer;
  outline: none;
  background: rgba(4, 15, 20, 0.12);
  transition: background 120ms ease, box-shadow 120ms ease;
}
.asciinema-recording-activation:hover {
  background: rgba(4, 15, 20, 0.25);
  box-shadow: inset 0 0 0 3px rgba(7, 139, 152, 0.72);
}
.asciinema-recording-activation:focus-visible { box-shadow: inset 0 0 0 4px var(--amber); }
.asciinema-recording-play span {
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  padding-left: 0.2rem;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 50%;
  background: rgba(7, 139, 152, 0.88);
  color: white;
  font-size: 1.55rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  transition: background 120ms ease, transform 120ms ease;
}
.asciinema-recording-activation:hover .asciinema-recording-play span { background: var(--amber); transform: scale(1.05); }
.asciinema-recording-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0.8rem;
  background: linear-gradient(transparent, rgba(5, 12, 16, 0.92) 45%);
  color: white;
  font: 500 0.68rem/1.2 'Fira Code', monospace;
}
.asciinema-recording-caption span:last-child { color: #8adce2; }
.asciinema-recording-error {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: grid;
  place-items: center;
  background: #0a050d;
  color: #f6dfab;
  font: 600 0.9rem/1.4 'Fira Code', monospace;
}
.asciinema-recording-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--muted);
  font: 500 0.7rem/1.25 'Fira Code', monospace;
}
.asciinema-recording-meta a {
  flex: none;
  border: 1px solid var(--line-strong);
  border-radius: 0.28rem;
  padding: 0.3rem 0.55rem;
  background: rgba(7, 139, 152, 0.06);
  color: var(--cyan-dim);
}
.asciinema-recording-meta a:hover { background: rgba(7, 139, 152, 0.13); }
.asciinema-recording-meta a:focus-visible { outline: 3px solid var(--amber); outline-offset: 2px; }
@media (max-width: 700px) {
  .asciinema-recording-caption,
  .asciinema-recording-meta { font-size: 0.58rem; }
  .asciinema-recording-meta > span { display: none; }
}
@media print {
  .asciinema-recording-play span { width: 3rem; height: 3rem; font-size: 1.15rem; }
}
</style>

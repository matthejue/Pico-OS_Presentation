<script setup lang="ts">
import { shortcutHintsVisible } from '../setup/shortcut-hints'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { lockShortcuts, useNav } from '@slidev/client'
import MarkdownIt from 'markdown-it'
import publishedNotes from 'virtual:picoos-slide-notes'
import publishedCorrections from 'virtual:picoos-slide-corrections'

type CorrectionImage = { imageId: string, filename: string, url?: string }
type Note = {
  slideId: string
  slideNumber: number
  slideTitle: string
  content: string
  revision: string | null
  filename: string | null
  images?: CorrectionImage[]
}
type Draft = { content: string, baseContent: string, revision: string | null, updatedAt: number }

const nav = useNav()
const router = useRouter()
// Both annotation kinds share the editor, drafts, shortcuts and persistence.
const props = defineProps<{ corrections?: boolean }>()
const kind = props.corrections ? 'corrections' : 'notes'
const singular = props.corrections ? 'correction' : 'note'
const plural = props.corrections ? 'corrections' : 'notes'
const heading = `Slide ${plural}`
const editorLabel = `Edit slide ${singular}`
const keyLetter = props.corrections ? 'C' : 'N'
const shortcut = `Alt+${keyLetter}`
const toggleShortcut = `Alt+Shift+${keyLetter}`
const panelId = `slide-${kind}-panel`
const inputId = `slide-${singular}-markdown`
const directory = props.corrections ? 'Corrections' : 'notes'
const endpoint = `${import.meta.env.BASE_URL}__slide-${kind}/`
const editorHeader = `X-PicoOS-Slide-${props.corrections ? 'Corrections' : 'Notes'}`
const visibleKey = `picoos:slide-${kind}:visible`
const tabKey = `picoos:slide-${kind}:tab`
const changeEvent = `picoos:slide-${kind}-changed`
const writable = import.meta.env.DEV
const notes = (props.corrections ? publishedCorrections : publishedNotes) as Record<string, Note>
const markdown = new MarkdownIt({ html: false, linkify: false, breaks: true }).disable('image')
const visible = ref(false)
const record = ref<Note | null>(null)
const loading = ref(false)
const loadError = ref('')
const notice = ref('')
const editor = ref<HTMLDialogElement>()
const textarea = ref<HTMLTextAreaElement>()
const editorOpen = ref(false)
const editorLoading = ref(false)
const saving = ref(false)
const deletingImage = ref(false)
const editTarget = ref<Note | null>(null)
const buffer = ref('')
const baseContent = ref('')
const revision = ref<string | null>(null)
const editorError = ref('')
const editorStatus = ref('')
const closeWarning = ref(false)
const conflict = ref<Note | null>(null)
const conflictDraft = ref('')
const canWrite = ref(false)
const backupAvailable = ref(true)
const otherDraft = ref<Draft | null>(null)
const slideId = computed(() => typeof nav.currentFrontmatter.value.noteId === 'string' ? nav.currentFrontmatter.value.noteId : '')
const dirty = computed(() => buffer.value !== baseContent.value)
const displayedContent = computed(() => {
  const content = record.value?.content || ''
  if (!props.corrections) return content
  if (record.value?.filename?.startsWith('x_')) return ''
  return content.split(/\r?\n/).filter(line => !/^\s*-\s*\[x\]/i.test(line)).join('\n').trim()
})
const renderedNote = computed(() => markdown.render(displayedContent.value))
const displayedImages = computed(() => (record.value?.images || []).filter(image => !image.filename.startsWith('x_')))
const draftPrefix = `picoos:slide-${singular}:draft:`
const savedPrefix = `picoos:slide-${singular}:saved:`
let tabId = ''
let fetchNumber = 0
let editFetchNumber = 0
let currentController: AbortController | undefined
let removeRouteGuard: (() => void) | undefined
let previousFocus: Element | null = null
let previousOverflow = ''
let persisting = false
let tabChannel: BroadcastChannel | undefined
let instanceId = ''
let unlockShortcuts: (() => void) | undefined

function uniqueToken() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function slideLabel(note: Note) {
  const page = nav.currentSlideNo.value
  if (note.slideId !== slideId.value) return `Full-deck slide ${note.slideNumber} · ${note.slideTitle}`
  return page === note.slideNumber
    ? `${page} · ${note.slideTitle}`
    : `${page} (full deck ${note.slideNumber}) · ${note.slideTitle}`
}

function stop(event: Event) {
  event.stopImmediatePropagation()
}

function fallback(id: string): Note {
  return notes[id] || {
    slideId: id,
    slideNumber: nav.currentSlideNo.value,
    slideTitle: String(nav.currentFrontmatter.value.title || nav.currentSlideRoute.value.meta.slide.title || `Slide ${nav.currentSlideNo.value}`),
    content: '', revision: null, filename: null,
  }
}

function validateNote(value: unknown, id: string): Note {
  const note = value as Note
  if (!note || note.slideId !== id || typeof note.content !== 'string' || typeof note.slideTitle !== 'string'
    || !Number.isInteger(note.slideNumber) || !(typeof note.revision === 'string' || note.revision === null)
    || !(typeof note.filename === 'string' || note.filename === null))
    throw new Error(`The ${plural} server returned an invalid response. Your draft is safe.`)
  if (props.corrections && (!Array.isArray(note.images) || note.images.some(image => !image
    || !/^[0-9a-f-]{36}$/.test(image.imageId) || typeof image.filename !== 'string')))
    throw new Error('The corrections server returned invalid image metadata. Your draft is safe.')
  return note
}

async function getNote(id: string, signal?: AbortSignal): Promise<Note> {
  if (!writable) return fallback(id)
  const response = await fetch(`${endpoint}${encodeURIComponent(id)}`, {
    cache: 'no-store', signal,
  })
  if (!response.ok) {
    let reason = ''
    try {
      const error = (await response.json()).error
      if (typeof error === 'string') reason = error
    } catch { /* A non-JSON response still has a useful status code. */ }
    throw new Error(`Could not load this slide's ${singular} (${response.status})${reason ? `: ${reason}` : '.'}`)
  }
  return validateNote(await response.json(), id)
}

async function loadCurrent() {
  const id = slideId.value
  const request = ++fetchNumber
  currentController?.abort()
  currentController = new AbortController()
  record.value = id ? fallback(id) : null
  loadError.value = ''
  loading.value = Boolean(id && writable)
  if (!id || nav.isPrintMode.value) return
  try {
    const note = await getNote(id, currentController.signal)
    if (request === fetchNumber && slideId.value === id) record.value = note
  } catch (error) {
    if (request === fetchNumber && !(error instanceof DOMException && error.name === 'AbortError'))
      loadError.value = error instanceof Error ? error.message : String(error)
  } finally {
    if (request === fetchNumber) loading.value = false
  }
}

function toggleVisible() {
  visible.value = !visible.value
  try { localStorage.setItem(visibleKey, String(visible.value)) } catch { /* Viewing works without browser storage. */ }
  if (visible.value) void loadCurrent()
}

function draftKey(id: string) { return `${draftPrefix}${id}:${tabId}` }

function readDraft(key: string): Draft | null {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    if (value && typeof value.content === 'string' && typeof value.baseContent === 'string'
      && (value.revision === null || typeof value.revision === 'string') && typeof value.updatedAt === 'number')
      return value
  } catch { /* A damaged or inaccessible backup never replaces a note. */ }
  return null
}

function findOtherDraft(id: string): Draft | null {
  let latest: Draft | null = null
  try {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index)
      if (!key?.startsWith(`${draftPrefix}${id}:`) || key === draftKey(id)) continue
      const candidate = readDraft(key)
      if (candidate && (!latest || candidate.updatedAt > latest.updatedAt)) latest = candidate
    }
  } catch { /* Recovery from other tabs is optional. */ }
  return latest
}

function persistDraft() {
  if (!editorOpen.value || !editTarget.value || editorLoading.value || !persisting) return
  try {
    if (dirty.value) {
      const draft: Draft = { content: buffer.value, baseContent: baseContent.value, revision: revision.value, updatedAt: Date.now() }
      localStorage.setItem(draftKey(editTarget.value.slideId), JSON.stringify(draft))
    } else localStorage.removeItem(draftKey(editTarget.value.slideId))
    backupAvailable.value = true
  } catch { backupAvailable.value = false }
}

function restoreDraft(draft: Draft, saved: Note) {
  buffer.value = draft.content
  baseContent.value = draft.baseContent
  revision.value = draft.revision
  editorStatus.value = 'Restored an unsaved draft.'
  if (draft.revision !== saved.revision) setConflict(saved)
}

function setConflict(saved: Note) {
  if (conflict.value?.revision !== saved.revision) conflictDraft.value = buffer.value
  conflict.value = saved
  editorError.value = `The saved ${singular} changed. Your draft was kept. Review the saved version below, merge its changes into your draft, then mark the draft as merged.`
}

async function openEditor() {
  notice.value = ''
  if (nav.isPrintMode.value || editorOpen.value || document.querySelector('dialog[open]')) return
  const id = slideId.value
  if (!id) { notice.value = 'This slide has no persistent slide ID. Restart the development server to assign slide IDs.'; return }
  if (!writable) {
    visible.value = true
    notice.value = `This published presentation shows saved ${plural}. Use npm run dev in the repository to add or edit ${plural}.`
    return
  }
  const request = ++editFetchNumber
  persisting = false
  editTarget.value = record.value?.slideId === id ? record.value : fallback(id)
  buffer.value = ''
  baseContent.value = ''
  revision.value = null
  conflict.value = null
  otherDraft.value = null
  editorError.value = ''
  editorStatus.value = ''
  closeWarning.value = false
  canWrite.value = false
  editorLoading.value = true
  unlockShortcuts = lockShortcuts()
  editorOpen.value = true
  previousFocus = document.activeElement
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  editor.value?.showModal()
  try {
    const saved = await getNote(id)
    if (request !== editFetchNumber || !editorOpen.value) return
    editTarget.value = saved
    buffer.value = saved.content
    baseContent.value = saved.content
    revision.value = saved.revision
    canWrite.value = true
    const draft = readDraft(draftKey(id))
    if (draft) restoreDraft(draft, saved)
    else otherDraft.value = findOtherDraft(id)
    if (slideId.value === id) record.value = saved
  } catch (error) {
    if (request !== editFetchNumber || !editorOpen.value) return
    editorError.value = error instanceof Error ? error.message : String(error)
    const draft = readDraft(draftKey(id))
    if (draft) {
      buffer.value = draft.content
      baseContent.value = draft.baseContent
      revision.value = draft.revision
    }
  } finally {
    if (request === editFetchNumber && editorOpen.value) {
      editorLoading.value = false
      persisting = true
      await nextTick()
      if (editorOpen.value && request === editFetchNumber)
        textarea.value?.focus()
    }
  }
}

async function refreshEditor(imagesOnly = false) {
  if (!editTarget.value || saving.value || editorLoading.value) return
  const id = editTarget.value.slideId
  const request = ++editFetchNumber
  try {
    const saved = await getNote(id)
    if (!editorOpen.value || editTarget.value?.slideId !== id || request !== editFetchNumber) return
    editTarget.value = { ...editTarget.value, images: saved.images }
    if (imagesOnly) return
    if (saved.revision !== revision.value && dirty.value) setConflict(saved)
    else if (!dirty.value) {
      editTarget.value = saved
      buffer.value = saved.content
      baseContent.value = saved.content
      revision.value = saved.revision
      conflict.value = null
      editorError.value = ''
    }
    canWrite.value = true
    if (slideId.value === id) record.value = saved
  } catch (error) {
    if (request === editFetchNumber) editorError.value = error instanceof Error ? error.message : String(error)
  }
}

function recoverOtherDraft() {
  if (!otherDraft.value || !editTarget.value) return
  restoreDraft(otherDraft.value, editTarget.value)
  otherDraft.value = null
  persistDraft()
}

function markMerged() {
  if (!conflict.value || buffer.value === conflictDraft.value) return
  revision.value = conflict.value.revision
  baseContent.value = conflict.value.content
  editTarget.value = conflict.value
  conflict.value = null
  editorError.value = ''
  editorStatus.value = 'Merged draft ready to save.'
  persistDraft()
}

function useSavedNote() {
  if (!conflict.value || !window.confirm(`Discard your unsaved draft and use the current saved ${singular}?`)) return
  buffer.value = conflict.value.content
  baseContent.value = conflict.value.content
  revision.value = conflict.value.revision
  editTarget.value = conflict.value
  conflict.value = null
  editorError.value = ''
  editorStatus.value = `Loaded the current saved ${singular}.`
  persistDraft()
}

async function save() {
  if (!editTarget.value || saving.value || editorLoading.value || !canWrite.value || conflict.value || !dirty.value) return
  saving.value = true
  editorError.value = ''
  editorStatus.value = ''
  persistDraft()
  const id = editTarget.value.slideId
  const content = buffer.value
  try {
    const response = await fetch(`${endpoint}${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', [editorHeader]: '1' },
      body: JSON.stringify({ content, revision: revision.value }),
    })
    if (response.status === 409) {
      let reason = ''
      try {
        const error = (await response.json()).error
        if (typeof error === 'string') reason = error
      } catch { /* The latest version can still resolve a conflict. */ }
      editorError.value = `The saved ${singular} changed. Your draft was kept. Reload the saved ${singular} to review and merge the changes.`
      canWrite.value = false
      const saved = await getNote(id)
      if (saved.revision !== revision.value) setConflict(saved)
      else editorError.value = `${reason || 'Another write is in progress.'} Your draft was kept. Try saving again.`
      canWrite.value = true
      return
    }
    if (!response.ok) {
      let reason = ''
      try { reason = (await response.json()).error || '' } catch { /* Keep the status if no JSON error was returned. */ }
      throw new Error(`Could not save your ${singular} (${response.status})${reason ? `: ${reason}` : '.'} Your draft was kept.`)
    }
    const saved = validateNote(await response.json(), id)
    editTarget.value = saved
    baseContent.value = saved.content
    revision.value = saved.revision
    buffer.value = saved.content
    if (slideId.value === id) record.value = saved
    editorStatus.value = saved.filename ? `Saved to ${directory}/${saved.filename}` : `${singular} saved.`
    closeWarning.value = false
    persistDraft()
    try { localStorage.setItem(`${savedPrefix}${id}`, JSON.stringify({ tabId, revision: saved.revision, time: Date.now() })) } catch { /* Revision checks also protect other tabs without storage. */ }
    if (!visible.value) toggleVisible()
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
    persistDraft()
  } finally { saving.value = false }
}

function imageUrl(id: string, image: CorrectionImage) {
  return image.url || `${endpoint}${encodeURIComponent(id)}/images/${encodeURIComponent(image.imageId)}`
}

async function saveClipboardImage() {
  if (!props.corrections || !editTarget.value || saving.value || editorLoading.value || !canWrite.value) return
  ++editFetchNumber
  saving.value = true
  editorError.value = ''
  editorStatus.value = ''
  persistDraft()
  const target = editTarget.value
  try {
    if (!navigator.clipboard?.read) throw new Error('Clipboard images require a browser with clipboard access on localhost or HTTPS.')
    const items = await navigator.clipboard.read()
    const item = items.find(item => item.types.some(type => type.startsWith('image/')))
    if (!item) throw new Error('The clipboard contains no image. Copy an annotated screenshot first.')
    const type = item.types.includes('image/png') ? 'image/png' : item.types.find(type => type.startsWith('image/'))!
    let blob = await item.getType(type)
    if (type !== 'image/png') {
      const bitmap = await createImageBitmap(blob)
      try {
        const canvas = document.createElement('canvas')
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
        blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Could not convert clipboard image to PNG.')), 'image/png'))
      } finally { bitmap.close() }
    }
    const response = await fetch(`${endpoint}${encodeURIComponent(target.slideId)}/images`, {
      method: 'POST', headers: { 'Content-Type': 'image/png', [editorHeader]: '1' }, body: blob,
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || `Could not save clipboard image (${response.status}).`)
    const saved = await getNote(target.slideId)
    // Image sidecars do not change the Markdown revision or the current draft.
    editTarget.value = { ...target, images: saved.images }
    if (slideId.value === target.slideId) record.value = saved
    editorStatus.value = `Saved image to Corrections/${result.filename}`
    if (!visible.value) toggleVisible()
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  } finally { saving.value = false }
}

async function deleteScreenshot(image: CorrectionImage) {
  if (!props.corrections || !editTarget.value || saving.value || editorLoading.value || !canWrite.value) return
  ++editFetchNumber
  saving.value = true
  deletingImage.value = true
  editorError.value = ''
  editorStatus.value = ''
  persistDraft()
  const target = editTarget.value
  try {
    const response = await fetch(imageUrl(target.slideId, image), {
      method: 'DELETE', headers: { [editorHeader]: '1' },
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || `Could not delete image (${response.status}).`)
    const saved = validateNote(result, target.slideId)
    editTarget.value = { ...target, images: saved.images }
    if (slideId.value === target.slideId) record.value = saved
    editorStatus.value = 'Image deleted.'
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  } finally {
    deletingImage.value = false
    saving.value = false
  }
}

function closeEditor(keepDraft = false) {
  if (saving.value) return
  if (dirty.value && !keepDraft) {
    closeWarning.value = true
    editorStatus.value = `Unsaved changes. Save your ${singular}, keep a browser draft, or discard the draft before closing.`
    return
  }
  persistDraft()
  ++editFetchNumber
  editor.value?.close()
  editorOpen.value = false
  document.body.style.overflow = previousOverflow
  if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true })
  unlockShortcuts?.()
  unlockShortcuts = undefined
}

function discardAndClose() {
  if (saving.value) return
  buffer.value = baseContent.value
  persistDraft()
  closeEditor()
}

function onKey(event: KeyboardEvent) {
  if (nav.isPrintMode.value) return
  if (editorOpen.value) {
    // Slidev tracks pressed keys on keyup. Let releases clear that state while
    // its public shortcut lock prevents navigation and other shortcut actions.
    if (event.type === 'keyup') return
    stop(event)
    if (event.isComposing) return
    if (event.key === 'Escape') { event.preventDefault(); closeEditor() }
    else if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); void save() }
    return
  }
  if (event.type !== 'keydown' || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || !event.altKey
    || !(event.code === `Key${keyLetter}` || event.key.toUpperCase() === keyLetter) || document.querySelector('dialog[open]')) return
  const target = event.target instanceof Element ? event.target : null
  if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
  event.preventDefault()
  stop(event)
  if (event.shiftKey) toggleVisible()
  else void openEditor()
}

function guardInteraction(event: Event) {
  if (editorOpen.value) stop(event)
  else if (event.target instanceof Element && event.target.closest('.slide-notes-panel, .slide-notes-controls')) stop(event)
}

function beforeUnload(event: BeforeUnloadEvent) {
  if (!editorOpen.value || (!dirty.value && !saving.value)) return
  persistDraft()
  event.preventDefault()
  event.returnValue = ''
}

function onStorage(event: StorageEvent) {
  if (event.key === visibleKey) { visible.value = event.newValue === 'true'; if (visible.value) void loadCurrent() }
  if (event.key === `${savedPrefix}${slideId.value}`) void loadCurrent()
  if (editorOpen.value && event.key === `${savedPrefix}${editTarget.value?.slideId}`) void refreshEditor()
}

function onFocus() {
  if (editorOpen.value) void refreshEditor()
  else if (visible.value) void loadCurrent()
}

function onNotesChanged(data: { slideId?: string }) {
  if (!data.slideId || data.slideId === slideId.value) void loadCurrent()
  // Keep an open editor's revision pinned. A concurrent write is checked on
  // focus or save, and never replaces an in-progress draft through HMR.
  if (props.corrections && editorOpen.value && (!data.slideId || data.slideId === editTarget.value?.slideId))
    void refreshEditor(true)
}

watch(slideId, () => { notice.value = ''; void loadCurrent() })
watch([buffer, baseContent, revision], persistDraft, { flush: 'sync' })

onMounted(() => {
  try {
    visible.value = localStorage.getItem(visibleKey) === 'true'
    tabId = sessionStorage.getItem(tabKey) || uniqueToken()
    sessionStorage.setItem(tabKey, tabId)
  } catch { tabId = `${Date.now()}-${Math.random().toString(36).slice(2)}` }
  if (nav.isPrintMode.value) return
  // Duplicating a browser tab also copies sessionStorage. Give the duplicate a
  // new backup namespace so two live editors cannot replace each other's draft.
  if (typeof BroadcastChannel !== 'undefined') {
    instanceId = uniqueToken()
    tabChannel = new BroadcastChannel(`picoos:slide-${kind}:tabs`)
    tabChannel.onmessage = ({ data }) => {
      if (!data || data.tabId !== tabId || data.instanceId === instanceId) return
      if (data.type === 'claim') tabChannel?.postMessage({ type: 'occupied', tabId, instanceId, recipient: data.instanceId })
      else if (data.type === 'occupied' && data.recipient === instanceId) {
        tabId = uniqueToken()
        try { sessionStorage.setItem(tabKey, tabId) } catch { /* The new namespace remains valid for this page. */ }
        persistDraft()
      }
    }
    tabChannel.postMessage({ type: 'claim', tabId, instanceId })
  }
  void loadCurrent()
  window.addEventListener('keydown', onKey, true)
  window.addEventListener('keyup', onKey, true)
  for (const type of ['pointerdown', 'pointerup', 'pointermove', 'touchstart', 'touchmove', 'touchend', 'wheel'])
    window.addEventListener(type, guardInteraction, true)
  window.addEventListener('beforeunload', beforeUnload)
  window.addEventListener('storage', onStorage)
  window.addEventListener('focus', onFocus)
  import.meta.hot?.on(changeEvent, onNotesChanged)
  removeRouteGuard = router.beforeEach((to, from) => {
    if (!editorOpen.value || to.fullPath === from.fullPath) return true
    if (saving.value || dirty.value) {
      closeWarning.value = true
      editorStatus.value = `Save your ${singular} or keep the draft and close the editor before navigating.`
      return false
    }
    closeEditor()
    return true
  })
})

onBeforeUnmount(() => {
  persistDraft()
  if (editorOpen.value) {
    editor.value?.close()
    document.body.style.overflow = previousOverflow
  }
  unlockShortcuts?.()
  currentController?.abort()
  tabChannel?.close()
  ++editFetchNumber
  removeRouteGuard?.()
  window.removeEventListener('keydown', onKey, true)
  window.removeEventListener('keyup', onKey, true)
  for (const type of ['pointerdown', 'pointerup', 'pointermove', 'touchstart', 'touchmove', 'touchend', 'wheel'])
    window.removeEventListener(type, guardInteraction, true)
  window.removeEventListener('beforeunload', beforeUnload)
  window.removeEventListener('storage', onStorage)
  window.removeEventListener('focus', onFocus)
  import.meta.hot?.off(changeEvent, onNotesChanged)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="shortcutHintsVisible && !nav.isPrintMode.value" class="slide-notes-controls" :class="{ 'slide-corrections-controls': corrections }">
      <button :aria-label="editorLabel" :title="`Add or edit a slide ${singular} · ${shortcut}`" @click.stop="openEditor">{{ corrections ? 'Corrections' : 'Notes' }} · {{ shortcut }}</button>
      <button :aria-label="`Toggle slide ${plural}`" :aria-expanded="visible" :aria-controls="panelId" :title="`Show or hide ${plural} · ${toggleShortcut}`" @click.stop="toggleVisible">{{ visible ? 'Hide' : 'Show' }} · {{ toggleShortcut }}</button>
    </div>
    <div v-if="notice && !nav.isPrintMode.value" class="slide-notes-notice" role="status">{{ notice }}</div>
    <aside v-if="visible && !nav.isPrintMode.value" :id="panelId" class="slide-notes-panel" :class="{ 'slide-corrections-panel': corrections }" role="region" :aria-label="heading" @click.stop>
      <header><div><strong>{{ heading }}</strong><span v-if="record">{{ slideLabel(record) }}</span></div><button :aria-label="`Hide slide ${plural}`" @click="toggleVisible">×</button></header>
      <p v-if="!writable" class="notes-help">Saved {{ plural }} · use npm run dev in the repository to edit.</p>
      <p v-if="!slideId" role="status">This slide has no persistent slide ID.</p>
      <p v-else-if="loading" role="status">Loading {{ singular }}…</p>
      <div v-else-if="loadError" role="alert"><p>{{ loadError }}</p><button @click="loadCurrent">Retry</button></div>
      <!-- Source HTML and Markdown images are disabled; screenshots use our local image endpoint. -->
      <div v-else-if="displayedContent" class="notes-markdown" v-html="renderedNote" />
      <p v-else class="notes-help">{{ corrections ? 'No active correction text for this slide.' : 'No note text for this slide yet.' }} {{ writable ? `Press ${shortcut} to add one.` : `No active ${singular} text is available in this presentation.` }}</p>
      <div v-if="corrections && record && displayedImages.length && !loading && !loadError" class="correction-images">
        <a v-for="image in displayedImages" :key="image.imageId" :href="imageUrl(record.slideId, image)" target="_blank" rel="noopener"><img :src="imageUrl(record.slideId, image)" :alt="`Correction screenshot for ${record.slideTitle}`" loading="lazy"><span>{{ image.filename }}</span></a>
      </div>
      <footer v-if="record?.filename && (!corrections || !record.filename.startsWith('x_'))">{{ record.filename }}</footer>
    </aside>
    <dialog v-if="!nav.isPrintMode.value" ref="editor" class="slide-note-editor" :aria-label="editorLabel" @cancel.prevent="closeEditor()" @click.stop>
      <header><div><strong>{{ editorLabel }}</strong><span v-if="editTarget">{{ slideLabel(editTarget) }}</span></div><button :disabled="saving" :aria-label="`Close ${singular} editor`" @click="closeEditor()">Close<span v-if="shortcutHintsVisible"> · Esc</span></button></header>
      <div class="note-editor-body">
        <p v-if="editTarget && editTarget.slideId !== slideId" class="notes-help">The presentation changed. This editor still belongs to “{{ editTarget.slideTitle }}”.</p>
        <p v-if="editorLoading" role="status">Loading saved {{ singular }}…</p>
        <div v-if="otherDraft" class="draft-recovery"><p>An unsaved draft from another tab or session is available.</p><button :disabled="saving" @click="recoverOtherDraft">Recover draft</button><button @click="otherDraft = null">Dismiss</button></div>
        <label :for="inputId">Markdown {{ singular }}</label>
        <textarea :id="inputId" ref="textarea" v-model="buffer" :aria-label="`Markdown ${singular}`" spellcheck="true" :disabled="editorLoading" :readonly="saving" :placeholder="corrections ? '- correction text' : 'Write a note for this slide…'" />
        <p class="notes-help"><span v-if="shortcutHintsVisible">Ctrl/Cmd+Enter to save · Escape to close · </span>{{ corrections ? 'Use one Markdown bullet per correction: - correction text' : 'Notes stay linked when slides move.' }}</p>
        <button v-if="corrections" :disabled="saving || editorLoading || !canWrite" @click="saveClipboardImage">Save clipboard image</button>
        <div v-if="corrections && editTarget?.images?.length" class="correction-images">
          <div v-for="image in editTarget.images" :key="image.imageId" class="correction-image-entry">
            <a :href="imageUrl(editTarget.slideId, image)" target="_blank" rel="noopener"><img :src="imageUrl(editTarget.slideId, image)" :alt="`Correction screenshot for ${editTarget.slideTitle}`" loading="lazy"><span>{{ image.filename }}</span></a>
            <button :disabled="saving || editorLoading || !canWrite" :aria-label="`Delete screenshot ${image.filename}`" @click="deleteScreenshot(image)">Delete image</button>
          </div>
        </div>
        <p v-if="!backupAvailable" role="alert">Browser draft backup is unavailable. Save your {{ singular }} before leaving this page.</p>
        <p v-if="editorError" class="note-error" role="alert">{{ editorError }}</p>
        <p v-if="editorStatus" role="status">{{ editorStatus }}</p>
        <div v-if="conflict" class="note-conflict">
          <strong>Current saved version</strong><pre>{{ conflict.content || `(Empty ${singular})` }}</pre>
          <button :disabled="buffer === conflictDraft || saving" @click="markMerged">Mark draft as merged</button>
          <button :disabled="saving" @click="useSavedNote">Use saved {{ singular }}</button>
        </div>
        <button v-if="!canWrite && !editorLoading" :disabled="saving" @click="refreshEditor()">Reload saved {{ singular }}</button>
      </div>
      <footer>
        <span>{{ saving ? deletingImage ? 'Deleting…' : 'Saving…' : dirty ? 'Unsaved draft' : 'All changes saved' }}</span>
        <div class="note-editor-actions">
          <button v-if="dirty || closeWarning" :disabled="saving || editorLoading || !backupAvailable" @click="closeEditor(true)">Keep draft &amp; close</button>
          <button v-if="closeWarning" :disabled="saving" @click="discardAndClose">Discard draft</button>
          <button class="note-save" :disabled="!dirty || saving || editorLoading || !canWrite || !!conflict" @click="save">Save {{ singular }}</button>
        </div>
      </footer>
    </dialog>
  </Teleport>
</template>

<style scoped>
.slide-notes-controls, .slide-notes-panel, .slide-notes-notice, .slide-note-editor { font: 400 14px/1.45 Cantarell, sans-serif; color: #153d46; }
.slide-notes-controls { position: fixed; z-index: 101; top: 10px; right: 12px; display: flex; gap: 5px; }
button { cursor: pointer; border: 1px solid #9fbec2; border-radius: 5px; padding: 5px 9px; background: #f4fbfb; color: #153d46; font: inherit; }
button:hover { background: #def2f2; }
button:focus-visible, textarea:focus-visible { outline: 3px solid #de9b38; outline-offset: 2px; }
button:disabled { cursor: default; opacity: .5; }
.slide-notes-controls button { font-size: 11px; background: #f4fbfbee; box-shadow: 0 2px 8px #102b3310; }
.slide-notes-panel { position: fixed; z-index: 102; top: 47px; right: 12px; width: min(480px, calc(100vw - 24px)); max-height: calc(50vh - 90px); display: flex; flex-direction: column; font-size: 16px; background: #f8fcfae0; border: 1px solid #9fbec2; border-radius: 8px; box-shadow: 0 10px 32px #102b3330; overflow: auto; overscroll-behavior: contain; -webkit-user-select: text; user-select: text; }
.slide-corrections-controls { top: calc(50% - 34px); }
.slide-corrections-panel { top: 50%; max-height: calc(50vh - 24px); border-color: #c8a979; background: #fff9eee0; }
.slide-notes-panel header strong { font-size: 18px; }
.slide-notes-panel header span, .slide-notes-panel .notes-help { font-size: 14px; }
.correction-images { display: flex; flex-direction: column; gap: 12px; padding-top: 12px; }
.correction-images a { display: block; color: #087587; overflow-wrap: anywhere; font-size: 11px; }
.correction-images img { display: block; max-width: 100%; max-height: 180px; object-fit: contain; border: 1px solid #c8a979; border-radius: 4px; margin-bottom: 4px; }
.correction-image-entry { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.slide-notes-panel > header, .slide-note-editor > header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 14px 16px; border-bottom: 1px solid #c2d9d9; }
header strong { display: block; font-size: 16px; }
header span { display: block; margin-top: 3px; color: #4c6d73; font-size: 12px; overflow-wrap: anywhere; }
.slide-notes-panel > p, .slide-notes-panel > div { margin: 0; padding: 14px 16px; }
.notes-help { color: #57757a; font-size: 12px; }
.slide-notes-panel > footer { padding: 8px 16px; border-top: 1px solid #d8e5e4; color: #57757a; font-size: 10px; overflow-wrap: anywhere; }
.notes-markdown { overflow-wrap: anywhere; }
.notes-markdown :deep(p) { margin: 0 0 .75em; }
.notes-markdown :deep(p:last-child) { margin-bottom: 0; }
.notes-markdown :deep(h1), .notes-markdown :deep(h2), .notes-markdown :deep(h3) { font-weight: 700; margin: .7em 0 .35em; font-size: 1.1em; }
.notes-markdown :deep(ul), .notes-markdown :deep(ol) { padding-left: 1.5em; margin: .5em 0; }
.notes-markdown :deep(ul) { list-style: disc; }
.notes-markdown :deep(ol) { list-style: decimal; }
.notes-markdown :deep(pre) { overflow: auto; padding: 8px; background: #e6efee; border-radius: 4px; font-size: 12px; }
.notes-markdown :deep(code) { font-family: 'Fira Code', monospace; font-size: .9em; }
.notes-markdown :deep(a) { color: #087587; text-decoration: underline; }
.notes-markdown :deep(blockquote) { border-left: 3px solid #9fbec2; padding-left: 10px; margin: 8px 0; }
.slide-notes-notice { position: fixed; z-index: 103; top: 49px; left: 50%; transform: translateX(-50%); max-width: min(600px, calc(100vw - 24px)); padding: 10px 14px; border-radius: 6px; border: 1px solid #9fbec2; background: #f4fbfb; box-shadow: 0 5px 18px #102b3320; }
.slide-note-editor { position: fixed; width: min(820px, calc(100vw - 32px)); max-width: none; max-height: calc(100vh - 32px); margin: auto; padding: 0; border: 1px solid #88b9bf; border-radius: 10px; background: #f8fcfa; box-shadow: 0 24px 90px #0008; overflow: hidden; }
.slide-note-editor[open] { display: flex; flex-direction: column; }
.slide-note-editor::backdrop { background: #10232dd9; backdrop-filter: blur(3px); }
.note-editor-body { overflow-y: auto; overscroll-behavior: contain; padding: 16px; }
.note-editor-body > label { display: block; margin-bottom: 5px; font-weight: 600; }
.note-editor-body > p { margin: 8px 0; }
textarea { display: block; box-sizing: border-box; width: 100%; min-height: min(42vh, 350px); resize: vertical; padding: 12px; border: 1px solid #9fbec2; border-radius: 5px; font: 14px/1.6 'Fira Code', monospace; color: #153d46; background: white; -webkit-user-select: text; user-select: text; }
.slide-note-editor > footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 12px 16px; border-top: 1px solid #c2d9d9; font-size: 12px; }
.note-editor-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.note-save { background: #087587; color: white; border-color: #087587; }
.note-save:hover { background: #086170; }
.note-error { color: #94400e; }
.note-conflict, .draft-recovery { border: 1px solid #deb978; background: #fff6e8; padding: 12px; border-radius: 6px; }
.note-conflict pre { white-space: pre-wrap; overflow-wrap: anywhere; max-height: 180px; overflow: auto; margin: 8px 0; padding: 8px; background: #fffdf8; font: 12px/1.5 'Fira Code', monospace; }
.note-conflict button, .draft-recovery button { margin: 3px 6px 0 0; }
@media (max-width: 560px) { .slide-notes-controls button { font-size: 10px; padding: 5px 6px; } .slide-note-editor > header { gap: 8px; } }
@media print { .slide-notes-controls, .slide-notes-panel, .slide-notes-notice, .slide-note-editor { display: none !important; } }
</style>

import type { ShortcutOptions } from '@slidev/types'
import { useNav } from '@slidev/client'
import { defineShortcutsSetup } from '@slidev/types'

type ShortVersionAction = 'apply' | 'sync' | 'toggle'

function announce(message: string, error = false) {
  window.dispatchEvent(new CustomEvent('short-version-status', {
    detail: { message, error },
  }))
}

async function request(action: ShortVersionAction, slide?: number) {
  try {
    const response = await fetch(`/__short-version/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-PicoOS-Short-Version': '1',
      },
      body: JSON.stringify(slide == null ? {} : { slide }),
    })
    const result = await response.json().catch(() => null)
    if (!response.ok)
      throw new Error(result?.error || `request failed with HTTP ${response.status}`)

    if (action === 'toggle')
      announce(`Slide ${result.slide} ${result.marked ? 'added to' : 'removed from'} the short-version exclusion list.`)
    else if (action === 'apply')
      announce(`Applied the list: ${result.disabledCount} of ${result.slideCount} slides are disabled in short mode.`)
    else
      announce(`Rebuilt the list: ${result.disabledCount} of ${result.slideCount} slides are disabled in short mode.`)
  }
  catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    announce(`Short-version edit failed: ${reason}. Use the Slidev development server for editing.`, true)
  }
}

export default defineShortcutsSetup((_operations, base: ShortcutOptions[]) => {
  const nav = useNav()
  return [
    ...base,
    {
      name: 'toggle_short_version_slide',
      key: 'm',
      fn: () => {
        const sourceIndex = nav.currentSlideRoute.value.meta.slide.sourceIndex
        void request('toggle', sourceIndex + 1)
      },
    },
    {
      name: 'apply_short_version_selection',
      key: 'alt+a',
      fn: () => void request('apply'),
    },
    {
      name: 'sync_short_version_selection',
      key: 'alt+s',
      fn: () => void request('sync'),
    },
  ]
})

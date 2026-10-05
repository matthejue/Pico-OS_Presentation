import { ref } from 'vue'

// Shared by the keyboard shortcut, content slides, and section overviews.
export const shortcutHintsVisible = ref(false)

export function toggleShortcutHints() {
  shortcutHintsVisible.value = !shortcutHintsVisible.value
}

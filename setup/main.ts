import { defineAppSetup } from '@slidev/types'

// Slidev snapshots the print range when its root navigation state is created.
// Wait for the initial URL so --range does not fall back to the entire deck.
export default defineAppSetup(async ({ router }) => {
  await router.isReady()
})

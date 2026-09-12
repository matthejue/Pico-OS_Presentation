#!/usr/bin/env node
import { applySelection } from './short-version.mjs'

try {
  const result = await applySelection()
  console.log(`${result.changed ? 'Updated' : 'Checked'} slides.md: ${result.disabled.length} of ${result.slideCount} slides disabled in short mode.`)
}
catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}

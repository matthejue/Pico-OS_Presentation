#!/usr/bin/env node
import { syncSelection } from './short-version.mjs'

try {
  const result = await syncSelection()
  console.log(`Updated short-version-disabled-slides.txt from slides.md: ${result.disabled.length} of ${result.slideCount} slides selected.`)
}
catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}

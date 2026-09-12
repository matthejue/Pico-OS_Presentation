#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { defaultSlidesPath, inspectSlides } from './short-version.mjs'

const { slideCount, disabled } = inspectSlides(await readFile(defaultSlidesPath, 'utf8'))
console.log(process.env.SLIDES_SHORT === '1' ? slideCount - disabled.length : slideCount)

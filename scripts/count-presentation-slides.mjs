#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { defaultSlidesPath } from './short-version.mjs'
import { presentationSlides } from './presentation-navigation.mjs'

const sections = JSON.parse(await readFile(new URL('../config/section-overviews.json', import.meta.url), 'utf8'))
console.log(presentationSlides(await readFile(defaultSlidesPath, 'utf8'), sections, process.env.SLIDES_SHORT === '1').length)

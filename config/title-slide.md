---
theme: default
title: PicoOS — master project presentation
info: |
  Pico-OS is a small educational operating system for the RETI teaching CPU.
  The slide order closely follows the Pico-OS README.
author: Jürgen Mattheis
colorSchema: light
highlighter: shiki
lineNumbers: true
transition: slide-left
defaults:
  preload: false
drawings:
  persist: false
mdc: true
fonts:
  sans: Cantarell
  mono: Fira Code
---

<script setup>
import releaseVersion from './config/presentation-release.txt?raw'
const presentationVersion = releaseVersion.trim()
</script>

<!-- SOURCE Pico-OS/README.md#picoos -->

<div class="eyebrow mb-5">Master Project Presentation</div>

# PicoOS

<div class="cover-title mt-2">An educational operating<br>system toolchain for the<br><span class="accent">OS and RTOS lectures</span></div>

<div class="cover-outline" aria-label="Presentation outline">
  <div class="cover-chapter"><span>01</span><span>Toolchain extensions</span></div>
  <div class="cover-chapter"><span>02</span><span>Interrupts, system calls &amp; exceptions</span></div>
  <div class="cover-chapter"><span>03</span><span>Memory, processes &amp; blocking</span></div>
  <div class="cover-chapter"><span>04</span><span>Boot &amp; kernel startup</span></div>
  <div class="cover-chapter"><span>05</span><span>Shell &amp; user applications</span></div>
  <div class="cover-chapter"><span>06</span><span>Test system</span></div>
  <div class="cover-chapter cover-lecture"><span>07</span><span>OS and RTOS usecases</span></div>
</div>

<div class="project-art" aria-label="Pico-OS source is compiled by PicoC-Compiler and assembled and executed by RETI-Emulator">
  <div class="art-trace trace-a"></div><div class="art-trace trace-b"></div><div class="art-trace trace-c"></div>
  <div class="art-node art-os"><b>Pico-OS</b><span>.picoc</span></div>
  <div class="art-node art-compiler"><b>PicoC-Compiler</b><span>RETI + .sections</span></div>
  <div class="art-node art-emulator"><b>RETI-Emulator</b><span>assemble · execute</span></div>
  <div class="art-pulse pulse-a"></div><div class="art-pulse pulse-b"></div>
</div>

<div class="cover-footline"><span>Jürgen Mattheis</span><div class="cover-meta"><span>University of Freiburg · Technical Faculty</span><span class="cover-version">{{ presentationVersion }}</span></div></div>

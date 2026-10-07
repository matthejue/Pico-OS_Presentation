---
theme: default
title: PicoOS — master project presentation
info: |
  Pico-OS is a small educational operating system running on the ReTI teaching CPU.
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

<!-- SLIDE_ID ae05f179-6991-4eff-a56e-4c5163e704b0 -->
<script setup>
import releaseVersion from './config/presentation-release.txt?raw'
const presentationVersion = releaseVersion.trim()
</script>

<!-- SOURCE Pico-OS/README.md#picoos -->

<div class="eyebrow mb-5">Master Project Presentation</div>

# PicoOS

<div class="cover-title mt-2">An educational operating<br>system toolchain for the<br><span class="accent">OS and RTOS lectures</span></div>

<div class="project-art" aria-label="Pico-OS source is compiled by PicoC-Compiler and assembled and executed by ReTI-Emulator">
  <div class="art-trace trace-a"></div><div class="art-trace trace-b"></div><div class="art-trace trace-c"></div>
  <div class="art-node art-os"><b>Pico-OS</b><span>.picoc</span></div>
  <div class="art-node art-compiler"><b>PicoC-Compiler</b><span>ReTI + .sections</span></div>
  <div class="art-node art-emulator"><b>ReTI-Emulator</b><span>assemble · execute</span></div>
  <div class="art-pulse pulse-a"></div><div class="art-pulse pulse-b"></div>
</div>

<div class="cover-footline"><span>Jürgen Mattheis</span><div class="cover-meta"><span>University of Freiburg · Technical Faculty</span><span class="cover-version">{{ presentationVersion }}</span></div></div>

---

<!-- SLIDE_ID 988e6d34-596a-4db6-b274-080cfed2d346 -->
<!-- SOURCE Pico-OS/README.md#contents -->

<div class="eyebrow section-eyebrow">Presentation map</div>

# Contents

<PresentationContents />

---

<!-- SLIDE_ID b2553b33-9aa9-489b-8ba7-67a99e7ef424 -->
<!-- SOURCE Pico-OS/README.md#picoos -->

<div class="eyebrow section-eyebrow">Section 00 · Overview</div>

# 0. Introduction

<SectionOverview section="picoos" />

---

<!-- SLIDE_ID 89e90074-bdc2-4cdf-a7e2-c42d0ba1a14c -->
<!-- SOURCE Pico-OS/README.md#picoos -->

## Introduction (1)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Educational OS</strong> running on <strong>ReTI</strong></li>
<li><strong>Components:</strong> Bootloader, Kernel, Init process, Shell, Libraries, Applications</li>
<li><strong>Non-preemptive kernel</strong></li>
<li><strong>No MMU or Isolation</strong></li>
<li><strong>Host-backed File System via UART</strong></li>
<li><strong>Unix / POSIX-inspired</strong>; small subset; no conformance claim</li></ul></div>
<div class="context-notes"><aside class="context-note"><b>Unix</b><ul><li>Multiuser · multitasking OS family</li>
<li>Shell + small, composable tools</li></ul></aside>
<aside class="context-note"><b>POSIX</b><ul><li>Portable interface standard</li>
<li>Common APIs + shell commands</li></ul></aside></div>

</div>

---

<!-- SLIDE_ID e40af357-b242-4d83-aeff-64600f29ee5d -->
<!-- SOURCE Pico-OS/README.md#picoos -->

## Introduction (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-toolchain-overview">

<!-- README_ASSET list-26 -->
<div class="hardware-tiles"><div class="readme-tile"><div class="tile-name"><strong>PicoOS Operating System</strong></div><ul><li>Operating System Sources</li>
<li>Kernel and Bootloader Sources</li></ul></div><div class="readme-tile"><div class="tile-name"><strong>PicoCC Compiler</strong></div><ul><li>Compile + Link</li>
<li>Produces <code>.reti</code> assembly and a <code>.sections</code> file</li></ul></div><div class="readme-tile"><div class="tile-name"><strong>ReTI Emulator</strong></div><div class="readme-item">Assemble + Execute</div></div></div>

<!-- README_ASSET image-41 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/picoos-build-boot.svg" alt="PicoOS build and boot overview" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 204ea1c9-6227-4a6f-aae9-f69f49722046 -->
<!-- SOURCE Pico-OS/README.md#build-and-run -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="picoos">Introduction</MajorSectionLink>

## Build and run

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 132fr) minmax(0, 216fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-57 -->
<ReadmeVisual kind="code" :width="865.5999999999999" data-code-source="code-57" data-code-part="1">

<!-- README_CODE_PART code-57 lines=1-5 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ curl -fLO https://github.com/matthejue/Pico-OS/releases/latest/download/pico-os-runtime.tar.gz
$ mkdir pico-os-runtime
$ tar -xzf pico-os-runtime.tar.gz -C pico-os-runtime
$ cd pico-os-runtime
$ ./start-picoos.sh
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-75 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-75:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.69%" /><col style="width:33.15%" /><col style="width:33.15%" /></colgroup><thead><tr><th>Behavior</th><th>Shell launcher</th><th>PowerShell launcher</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Use a specific emulator</td><td><code>--reti-emulator PATH</code></td><td><code>-RetiEmulator PATH</code></td></tr>
<tr data-source-row="2"><td class="table-key">Enable DMA loading</td><td><code>--dma</code> or <code>-M</code></td><td><code>-Dma</code> or <code>-M</code></td></tr>
<tr data-source-row="3"><td class="table-key">Run directly in the terminal</td><td><code>--notui</code> or <code>-N</code></td><td><code>-NoTui</code> or <code>-N</code></td></tr>
<tr data-source-row="4"><td class="table-key">Show help</td><td><code>--help</code> or <code>-h</code></td><td><code>-Help</code> or <code>-h</code></td></tr>
<tr data-source-row="5"><td class="table-key">Pass remaining emulator options</td><td><code>-- EMULATOR_ARGS...</code></td><td><code>-- EMULATOR_ARGS...</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Windows:</strong> <code>start-picoos.ps1</code>; <strong>Android:</strong> Termux</li>
<li><strong>Tools:</strong> archive directory + PATH; optional downloads</li>
<li><strong>DMA:</strong> other processes run during reception</li>
<li><strong>First launch:</strong> optional cheatsheet download</li></ul></div>

</div>

---

<!-- SLIDE_ID 026003bc-164e-49df-adec-470bfb3d6d47 -->
<!-- SOURCE Pico-OS/README.md#use-the-picoos-shell -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="picoos">Introduction</MajorSectionLink> · Build and run

## Use the PicoOS shell

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns prose-with-code" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr)"><div class="readme-list prose-summary nested-summary"><ul><li><strong>Debug TUI</strong><ul><li><strong>c + Enter:</strong> continue startup</li>
<li><strong>V:</strong> raw UART; <strong>Ctrl+]</strong> returns</li>
<li><strong>v:</strong> normal terminal; <strong>Escape</strong> returns</li></ul></li>
<li><strong>Commands</strong><ul><li><strong>/user:</strong> executable name or path</li>
<li><strong>Pipeline:</strong> left completes before right</li>
<li><strong>&gt; topics.txt:</strong> redirect final output</li></ul></li></ul></div>
<!-- README_ASSET code-111 -->
<ReadmeVisual kind="code" :width="736.6" data-code-source="code-111" data-code-part="1">

<!-- README_CODE_PART code-111 lines=1-6 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>PicoOS terminal</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> echo.bin "kernel\ncontext switcher\nscheduler" > input.txt
PicoOS> cat.bin input.txt | sed.bin "s/context switcher/dispatcher/" > topics.txt
PicoOS> cat.bin topics.txt
kernel
dispatcher
scheduler
```

</div>

</ReadmeVisual></div>

</div>

---

<!-- SLIDE_ID ba86f050-442d-48a8-a592-ea3687631e4a -->
<!-- SOURCE Pico-OS/README.md#release-archive-layout -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="picoos">Introduction</MajorSectionLink> · Build and run

## Release archive layout

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-141 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-141:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.04%" /><col style="width:50.96%" /></colgroup><thead><tr><th>Archive path</th><th>Purpose</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>binary/README.md</code></span></td><td>Release startup + filesystem instructions</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>binary/start-picoos.sh</code></span>, <span class="source-link"><code>binary/start-picoos.ps1</code></span></td><td>Find tools; configure; launch emulator</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>binary/download-tools.sh</code></span>, <span class="source-link"><code>binary/download-tools.ps1</code></span></td><td>Download missing released tools</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>binary/boot/</code></span></td><td>EPROM image; load kernel</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>binary/kernel/</code></span></td><td>Kernel binary + layout/debug metadata</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>binary/system/</code></span></td><td>Init binary</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>binary/user/</code></span></td><td>Shell + standalone commands</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>binary/config/</code></span></td><td>Environment, emulator options, OS version</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>binary/device/</code></span></td><td>Virtual terminal/null marker files</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><em><em>v</em> release:</em>* runtime archive + <code>README.pdf</code></li>
<li><strong>Extracted directory</strong> becomes PicoOS <code>/</code></li>
<li><strong>Host /tmp</strong> remains outside PicoOS</li></ul></div>

</div>

---

<!-- SLIDE_ID a3015a1e-f757-4cc5-b4be-3a39dae8b018 -->
<!-- SOURCE Pico-OS/README.md#intended-physical-hardware -->

# <MajorSectionLink section="picoos">Introduction</MajorSectionLink>

## Intended physical hardware (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-169 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/intended-hardware.svg" alt="Intended physical hardware: host, FPGA, and shared SRAM" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 75654566-570b-442b-9e1a-4c115b04554c -->
<!-- SOURCE Pico-OS/README.md#intended-physical-hardware -->

# <MajorSectionLink section="picoos">Introduction</MajorSectionLink>

## Intended physical hardware (2)

<div class="deck-content readme-slide">

<!-- README_ASSET list-176 -->
<div class="hardware-tiles"><div class="readme-tile"><div class="tile-name"><strong>FPGA:</strong> Alchitry Cu V2 — €55.66</div><ul><li>CPU / IRQ / UART / DMA</li>
<li>Timer + buffer + SRAM arbitration</li></ul></div><div class="readme-tile"><div class="tile-name"><strong>SRAM:</strong> 2 × ISSI chips</div><ul><li>2 × €5.80 = €11.60</li>
<li>Shared address + control</li>
<li>Combined 32-bit bus; 1 MiB</li></ul></div><div class="readme-tile"><div class="tile-name"><strong>USB–UART:</strong> SparkFun CH340C</div><div class="readme-item"><strong>Price:</strong> €10.92</div></div></div>
<div class="artifact-columns hardware-details" data-column-key="hardware:details" style="--readme-columns:minmax(0, 39fr) minmax(0, 61fr);"><div class="readme-list"><ul><li><strong>Parts total:</strong> €78.18 including VAT</li>
<li><strong>DigiKey Germany:</strong> 12 August 2026</li>
<li><strong>Excludes:</strong> wiring, PCB, cables, shipping</li>
<li><strong>Hardware:</strong> computer connected via USB–UART</li></ul></div>

<!-- README_ASSET table-227 -->
<ReadmeVisual kind="table" :width="760" data-table-key="table-227:1,2,3,4,5" :text-scale="0.85">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:44.91%" /><col style="width:26.47%" /><col style="width:28.62%" /></colgroup><thead><tr><th>Image</th><th>32-bit words</th><th>Size</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>kernel.bin</code></span> (<span class="source-link"><code>kernel.picoc</code></span>)</td><td>41,502</td><td>0.166008 MB</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>init.bin</code></span> (<span class="source-link"><code>init.picoc</code></span>)</td><td>10,824</td><td>0.043296 MB</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>shell.bin</code></span> (<span class="source-link"><code>shell.picoc</code></span>)</td><td>29,647</td><td>0.118588 MB</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>cat.bin</code></span> (<span class="source-link"><code>cat.picoc</code></span>)</td><td>10,487</td><td>0.041948 MB</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>echo.bin</code></span> (<span class="source-link"><code>echo.picoc</code></span>)</td><td>12,018</td><td>0.048072 MB</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 52d277d0-bd4e-4399-af49-3310a5c61d8c -->
<!-- SOURCE Pico-OS/README.md#reti-execution-model -->

# <MajorSectionLink section="picoos">Introduction</MajorSectionLink> · Intended physical hardware

## ReTI execution model

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-compact-stacked">

<!-- README_ASSET image-247 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/reti-memory-map.svg" alt="ReTI address space with EPROM and periphery each occupying one quarter and SRAM occupying one half" />

</ReadmeVisual>

<!-- README_ASSET table-251 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-251:1,2,3" :text-scale="0.85">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.82%" /><col style="width:30.15%" /><col style="width:45.02%" /></colgroup><thead><tr><th>High bits</th><th>Address space</th><th>PicoOS use</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>00</code></td><td>EPROM</td><td>Bootloader</td></tr>
<tr data-source-row="2"><td class="table-key"><code>01</code></td><td>Memory-mapped periphery</td><td>UART, interrupts, timer, exceptions, DMA</td></tr>
<tr data-source-row="3"><td class="table-key"><code>10</code> or <code>11</code></td><td>SRAM</td><td>Kernel, processes, heaps, stacks</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e5fc9694-10a3-4b4e-b622-7e141f2fe56a -->
<!-- SOURCE Pico-OS/README.md#1-toolchain-extensions-for-picoos -->

<div class="eyebrow section-eyebrow">Section 01 · Overview</div>

# 1. Toolchain extensions for PicoOS

<SectionOverview section="1-toolchain-extensions-for-picoos" />

---

<!-- SLIDE_ID 465373e1-7294-419c-a097-78d11017d1e5 -->
<!-- SOURCE Pico-OS/README.md#11-picoc-compiler-extensions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink>

## 1.1 PicoC-Compiler extensions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-531 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-531:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23">

<div class="table-panels table-panels-two" data-column-key="table:table-531:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:39.32%" /><col style="width:60.68%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Installation</td><td>Install picoc_compiler + environment</td></tr>
<tr data-source-row="2"><td class="table-key">Preprocessing</td><td><ul><li>Includes, macros, #pragma once</li><li>Dependencies + optional syntax checking</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">Multiple translation units</td><td>Per-file compilation + final linking</td></tr>
<tr data-source-row="4"><td class="table-key">Reusable build artifacts</td><td>Reusable code/symbol/debug artifacts</td></tr>
<tr data-source-row="5"><td class="table-key">Automatic artifact reuse</td><td>Hashes + options decide reuse</td></tr>
<tr data-source-row="6"><td class="table-key">Broader PicoC syntax</td><td>typedef, casts, declarations, increment</td></tr>
<tr data-source-row="7"><td class="table-key">Pointer support</td><td>Typed pointers + compatible structs</td></tr>
<tr data-source-row="8"><td class="table-key">Function pointers</td><td>Indirect calls + linked addresses</td></tr>
<tr data-source-row="9"><td class="table-key">Variadic functions</td><td>Variadic declarations + System V frames</td></tr>
<tr data-source-row="10"><td class="table-key">String and character data</td><td>Escapes + linker-safe string literals</td></tr>
<tr data-source-row="11"><td class="table-key">Inline ReTI assembly</td><td>Inline assembly + linked labels</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:39.32%" /><col style="width:60.68%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="12"><td class="table-key">Low-level functions</td><td>Naked startup/interrupt handlers</td></tr>
<tr data-source-row="13"><td class="table-key">Custom sections</td><td>.ivt attributes; .text/.data defaults</td></tr>
<tr data-source-row="14"><td class="table-key">ISR entries</td><td>Tagged SRAM handler addresses</td></tr>
<tr data-source-row="15"><td class="table-key">Runtime startup</td><td>Generated entry or custom -C source</td></tr>
<tr data-source-row="16"><td class="table-key">Global initialization</td><td>-O1 static global initializers</td></tr>
<tr data-source-row="17"><td class="table-key">Shared epilogues</td><td>One shared restore/return block</td></tr>
<tr data-source-row="18"><td class="table-key">Section layout</td><td>.ivt + .text + .data + .sections</td></tr>
<tr data-source-row="19"><td class="table-key">Linked labels</td><td>Readable labels until final patching</td></tr>
<tr data-source-row="20"><td class="table-key">Kernel headers</td><td>Generated kernel/boot memory constants</td></tr>
<tr data-source-row="21"><td class="table-key">Debug information</td><td>Source, globals, locals, calls, frames</td></tr>
<tr data-source-row="22"><td class="table-key">Inspectable intermediates</td><td>Preprocessed source + named pass results</td></tr>
<tr data-source-row="23"><td class="table-key">Debug trap + NOP</td><td>debug trap + real NOP</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID ae8ed70c-774e-4466-b9e8-fc5fddd04358 -->
<!-- SOURCE Pico-OS/README.md#111-compilation-pipeline-and-compiler-passes -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.1 Compilation pipeline and compiler passes

<div class="deck-content readme-slide">

<div class="readme-artifacts pipeline-comparison"><div class="pipeline-panel"><div class="pipeline-heading"><strong>Original:</strong> one source file</div><div class="readme-list"><ul><li><strong>Lark:</strong> parses source into a parse tree</li>
<li><strong>AST construction</strong>, then single-file lowering to ReTI</li></ul></div>

<!-- README_ASSET image-564 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/compiler-original-pipeline.svg" alt="1.1.1 Compilation pipeline and compiler passes" />

</ReadmeVisual>

</div>

<div class="pipeline-panel"><div class="pipeline-heading"><strong>Extended:</strong> reusable units, <strong>Tree-sitter</strong> replaces <strong>Lark</strong></div><div class="readme-list"><ul><li><strong>Tree-sitter:</strong> parses preprocessed source into a parse tree</li>
<li><strong>AST construction</strong>, symbol/type checks, linking + startup</li></ul></div>

<!-- README_ASSET image-570 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/compiler-picoos-pipeline.svg" alt="1.1.1 Compilation pipeline and compiler passes" />

</ReadmeVisual>

</div></div>

</div>

---

<!-- SLIDE_ID 04932a21-f8fc-45a5-8308-f0529e70e4a5 -->
<!-- SOURCE Pico-OS/README.md#112-separate-compilation-reusable-artifacts-and-linking -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.2 Separate compilation, reusable artifacts, and linking (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-582 -->
<div class="code-columns" data-column-key="code:code-582" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:4">

<ReadmeVisual kind="code" :width="560" data-code-source="code-582" data-code-part="1">

<!-- README_CODE_PART code-582 lines=1-12 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range">lines 1–12</span></div>

```console {lines:false}
$ gcc -c -O2 libstring.c basic_string.c
$ ls -1 basic_string.o libstring.o
basic_string.o
libstring.o

$ gcc -o basic_string basic_string.o libstring.o
$ ls -1 basic_string
basic_string

$ picoc_compiler -c -O1 library/string/libstring.picoc test/basic_string.picoc \
    library/stdlib/libstdlib.picoc library/stdio/libstdio.picoc
$ ls -1 library/string/libstring.{reti_blocks,st} test/basic_string.{reti_blocks,st}
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-582" data-code-part="2">

<!-- README_CODE_PART code-582 lines=13-23 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range">lines 13–23</span></div>

```console {lines:false}
library/string/libstring.reti_blocks
library/string/libstring.st
test/basic_string.reti_blocks
test/basic_string.st

$ picoc_compiler -O1 -o binary/basic_string.reti test/basic_string.reti_blocks \
    library/string/libstring.reti_blocks library/stdlib/libstdlib.reti_blocks \
    library/stdio/libstdio.reti_blocks
$ ls -1 binary/basic_string.{reti,sections}
binary/basic_string.reti
binary/basic_string.sections
```

</div>

</ReadmeVisual>

</div>

</div>
<aside class="context-note"><b>GCC / Clang</b><ul><li><strong>C object:</strong> symbol table inside .o</li>
<li><strong>PicoC:</strong> symbols in adjacent .st</li></ul></aside>

</div>

---

<!-- SLIDE_ID c4daf64c-42a5-4ae5-9ee1-d306f607e85e -->
<!-- SOURCE Pico-OS/README.md#112-separate-compilation-reusable-artifacts-and-linking -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.2 Separate compilation, reusable artifacts, and linking (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:image-610+image-617" style="--readme-columns:minmax(0, 42fr) minmax(0, 58fr);">

<!-- README_ASSET image-610 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/compiler-gcc-linking.svg" alt="1.1.2 Separate compilation, reusable artifacts, and linking" />

</ReadmeVisual>

<!-- README_ASSET image-617 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/compiler-picoc-linking.svg" alt="1.1.2 Separate compilation, reusable artifacts, and linking" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID bf43bceb-c022-4790-9018-2ba0c2304e17 -->
<!-- SOURCE Pico-OS/README.md#113-system-v-abi-stack-frames-and-call-cleanup -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.3 System V ABI stack frames and call cleanup

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>For <code>fun(arg1, arg2)</code>, first pushes <strong>arg2</strong>, then <strong>arg1</strong><ul class="requested-sub-bullet"><li><strong>Variadic functions:</strong> argument count doesn't matter</li></ul></li>
<li><strong>Callee:</strong> pushes <strong>caller BAF</strong>; <strong>BAF → first local</strong></li>
<li><strong>Return:</strong> restores <strong>BAF</strong>; result in <strong>IN2</strong></li>
<li><strong>Caller:</strong> removes arguments after return</li>
<li><strong>Callee handles BAF + arguments</strong> → elegant <strong>interrupt service routines</strong></li></ul></div>
<aside class="context-note"><b>System V ABI</b><ul><li>Binary interface rules</li>
<li>Calls: arguments, registers, stack</li>
<li>PicoOS adapts the stack convention to ReTI</li></ul></aside>

</div>

---

<!-- SLIDE_ID 2d92951f-5f88-46ca-9959-9c45f246e965 -->
<!-- SOURCE Pico-OS/README.md#1131-stack-frame-layout-and-caller-cleanup -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.1 Stack-frame layout and caller cleanup (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-644 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-644:1,2,3,4,5,6,7,8,9,10,11,12,13,14">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:29.49%" /><col style="width:40.26%" /><col style="width:30.25%" /></colgroup><thead><tr><th>Position</th><th>Contents</th><th>Managed by</th></tr></thead><tbody><tr data-source-row="1" class="stack-caller"><td class="table-key"><strong>Higher addresses ↑</strong></td><td>Earlier stack contents</td><td>Earlier calls</td></tr>
<tr data-source-row="2" class="stack-caller"><td class="table-key"><em><code>caller BAF + 3</code></em></td><td>Caller argument</td><td>Caller’s caller</td></tr>
<tr data-source-row="3" class="stack-caller"><td class="table-key"><em><code>caller BAF + 2</code></em></td><td>Caller return address</td><td>Caller’s caller</td></tr>
<tr data-source-row="4" class="stack-caller"><td class="table-key"><em><code>caller BAF + 1</code></em></td><td>Saved BAF</td><td>Caller frame</td></tr>
<tr data-source-row="5" class="stack-caller"><td class="table-key"><em><code>caller BAF</code></em></td><td>Caller local</td><td>Caller frame</td></tr>
<tr data-source-row="6" class="stack-caller"><td class="table-key"><em><code>caller BAF - 1</code></em></td><td>Retained temporary expression</td><td>Caller expression</td></tr>
<tr data-source-row="7" class="stack-callee"><td class="table-key"><strong><code>BAF + 4</code></strong></td><td>Second argument (arg2)</td><td>Caller</td></tr>
<tr data-source-row="8" class="stack-callee"><td class="table-key"><strong><code>BAF + 3</code></strong></td><td>First argument (arg1)</td><td>Caller</td></tr>
<tr data-source-row="9" class="stack-callee"><td class="table-key"><strong><code>BAF + 2</code></strong></td><td>Return address</td><td>Caller</td></tr>
<tr data-source-row="10" class="stack-callee"><td class="table-key"><strong><code>BAF + 1</code></strong></td><td>Saved BAF</td><td>Callee</td></tr>
<tr data-source-row="11" class="stack-callee"><td class="table-key"><strong><code>BAF</code></strong></td><td>First local</td><td>Callee</td></tr>
<tr data-source-row="12" class="stack-callee"><td class="table-key"><strong><code>BAF - 1</code></strong></td><td>Second local</td><td>Callee</td></tr>
<tr class="stack-callee stack-temporaries"><td class="table-key"><code>BAF - 2, …</code></td><td>Temporaries</td><td>Callee</td></tr>
<tr data-source-row="13" class="stack-callee"><td class="table-key"><strong><code>SP</code></strong></td><td>Free cell below occupied stack</td><td>Current stack boundary</td></tr>
<tr data-source-row="14" class="stack-callee"><td class="table-key"><strong>Lower addresses ↓</strong></td><td>Stack grows toward lower addresses</td><td></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID d3b58fba-a68f-4657-8b39-c3ca3629d36b -->
<!-- SOURCE Pico-OS/README.md#1131-stack-frame-layout-and-caller-cleanup -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.1 Stack-frame layout and caller cleanup (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Arguments:</strong> arg2 first, then arg1</li>
<li><strong>Aggregates:</strong> full width; later offsets increase</li>
<li><strong>Variadic:</strong> printf BAF+4; fprintf BAF+5</li>
<li><strong>Caller:</strong> removes arguments after return</li></ul></div>

</div>

---

<!-- SLIDE_ID d012f102-ce27-48a3-90bc-fb698ee36af3 -->
<!-- SOURCE Pico-OS/README.md#1132-shared-function-epilogue-and-return-values -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.2 Shared function epilogue and return values (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET image-678 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/compiler-shared-epilogue.svg" alt="1.1.3.2 Shared function epilogue and return values" />

</ReadmeVisual>

<!-- README_ASSET code-683 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-683" data-code-part="1">

<!-- README_CODE_PART code-683 lines=1-7 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>normal-function.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int add_one(int value) {
    return value + 1;
}

int main(void) {
    return add_one(41);
}
```

</div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>One epilogue</strong> per ordinary function</li>
<li><strong>IN2:</strong> result survives frame + argument cleanup</li></ul></div>

</div>

---

<!-- SLIDE_ID b07062cf-0509-47d2-bce5-60199deb0bca -->
<!-- SOURCE Pico-OS/README.md#1132-shared-function-epilogue-and-return-values -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.2 Shared function epilogue and return values (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-696 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-696" data-code-part="1">

<!-- README_CODE_PART code-696 lines=1-1 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ picoc_compiler -c -O1 -v -w normal-function.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-702 -->
<div class="code-columns" data-column-key="code:code-702" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);--source-aspect:3.0688864760525996">

<ReadmeVisual kind="code" :width="495.79999999999995" data-code-source="code-702" data-code-part="1">

<!-- README_CODE_PART code-702 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>normal-function.picoc_anf</span><span class="code-range">lines 1–13</span></div>

```text {lines:false}
_global_inits:
add_one:
  NewStackframe(Num('0'))
  Exp(StackframeParam(Num('0')))
  Exp(Num('1'))
  Exp(BinOp(Stack(Num('2')), Add(), Stack(Num('1'))))
  Assign(IN2, Stack(Num('1')))
  Exp(GoTo(Name('add_one_epilogue')))
add_one_epilogue:
  RestoreStackframe()
  RestoreReturnAddress()
main:
  NewStackframe(Num('0'))
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="422.3481481481481" data-code-source="code-702" data-code-part="2">

<!-- README_CODE_PART code-702 lines=14-26 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>normal-function.picoc_anf</span><span class="code-range">lines 14–26</span></div>

```text {lines:false}
  // Call(Name('add_one'), [Num('41')])
  Exp(Num('41'))
  SaveReturnAddress(Name('main_cont.3'))
  Exp(FunRef(Name('add_one')))
  Exp(GoTo(Stack(Num('1'))))
main_cont.3:
  RemoveArguments(Num('1'))
  Exp(IN2)
  Assign(IN2, Stack(Num('1')))
  Exp(GoTo(Name('main_epilogue')))
main_epilogue:
  RestoreStackframe()
  RestoreReturnAddress()
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 2f40f602-7242-41c9-87e4-e8f605a73715 -->
<!-- SOURCE Pico-OS/README.md#1132-shared-function-epilogue-and-return-values -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.2 Shared function epilogue and return values (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-735 -->
<div class="code-columns" data-column-key="code:code-735" style="--readme-columns:minmax(0, 55fr) minmax(0, 45fr);--source-aspect:1.2790471560525036">

<ReadmeVisual kind="code" :width="512.9999999999999" data-code-source="code-735" data-code-part="1">

<!-- README_CODE_PART code-735 lines=1-34 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>normal-function.reti_blocks</span><span class="code-range">lines 1–34</span></div>

```text {lines:false}
  .ivt
  .text
add_one:
  # NewStackframe(Num('0'))
  PUSH BAF
  MOVE SP BAF
  SUBI SP 0
  # Exp(StackframeParam(Num('0')))
  LOADIN BAF ACC 3
  PUSH ACC
  # Exp(Num('1'))
  LOADI ACC 1
  PUSH ACC
  # Exp(BinOp(Stack(Num('2')), Add(), Stack(Num('1'))))
  LOADIN SP ACC 2
  LOADIN SP IN2 1
  ADD ACC IN2
  STOREIN SP ACC 2
  ADDI SP 1
  # Assign(IN2, Stack(Num('1')))
  POP IN2
  # Exp(GoTo(Name('add_one_epilogue')))
  JUMP32 add_one_epilogue
add_one_epilogue:
  # RestoreStackframe()
  MOVE BAF SP
  POP BAF
  # RestoreReturnAddress()
  POP IN1
  MOVE IN1 PC
main:
  # NewStackframe(Num('0'))
  PUSH BAF
  MOVE SP BAF
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="419.72727272727275" data-code-source="code-735" data-code-part="2">

<!-- README_CODE_PART code-735 lines=35-67 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>normal-function.reti_blocks</span><span class="code-range">lines 35–67</span></div>

```text {lines:false}
  SUBI SP 0
  # // Call(Name('add_one'), [Num('41')])
  # Exp(Num('41'))
  LOADI ACC 41
  PUSH ACC
  # SaveReturnAddress(Name('main_cont.3'))
  LOADI32 ACC main_cont.3
  ADD ACC CS
  PUSH ACC
  # Exp(FunRef(Name('add_one')))
  LOADI32 ACC add_one
  ADD ACC CS
  PUSH ACC
  # Exp(GoTo(Stack(Num('1'))))
  POP ACC
  MOVE ACC PC
main_cont.3:
  # RemoveArguments(Num('1'))
  ADDI SP 1
  # Exp(IN2)
  PUSH IN2
  # Assign(IN2, Stack(Num('1')))
  POP IN2
  # Exp(GoTo(Name('main_epilogue')))
  JUMP32 main_epilogue
main_epilogue:
  # RestoreStackframe()
  MOVE BAF SP
  POP BAF
  # RestoreReturnAddress()
  POP IN1
  MOVE IN1 PC
  .data
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID b981b309-dfa1-4187-90a6-693f3783622b -->
<!-- SOURCE Pico-OS/README.md#1133-naked-functions-without-a-generated-frame -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.3 Naked functions without a generated frame (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-822 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-822" data-code-part="1">

<!-- README_CODE_PART code-822 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>naked-function.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
int constant(void) {
    asm("LOADI IN2 7");
    asm("LOADIN SP ACC 1");
    asm("ADDI SP 1");
    asm("MOVE ACC PC");
}

int main(void) {
    return constant();
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7a08b3f4-bbaa-45a0-b7e8-bde711db9230 -->
<!-- SOURCE Pico-OS/README.md#1133-naked-functions-without-a-generated-frame -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.3 Naked functions without a generated frame (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-839 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-839" data-code-part="1">

<!-- README_CODE_PART code-839 lines=1-1 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ picoc_compiler -c -O1 naked-function.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-846 -->
<div class="code-columns" data-column-key="code:code-846" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:1.5300859598853869">

<ReadmeVisual kind="code" :width="255" data-code-source="code-846" data-code-part="1">

<!-- README_CODE_PART code-846 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>naked-function.reti_blocks</span><span class="code-range">lines 1–15</span></div>

```text {lines:false}
  .ivt
  .text
constant:
  LOADI IN2 7
  LOADIN SP ACC 1
  ADDI SP 1
  MOVE ACC PC
main:
  PUSH BAF
  MOVE SP BAF
  SUBI SP 0
  LOADI32 ACC main_cont.2
  ADD ACC CS
  PUSH ACC
  LOADI32 ACC constant
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="255" data-code-source="code-846" data-code-part="2">

<!-- README_CODE_PART code-846 lines=16-29 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>naked-function.reti_blocks</span><span class="code-range">lines 16–29</span></div>

```text {lines:false}
  ADD ACC CS
  PUSH ACC
  POP ACC
  MOVE ACC PC
main_cont.2:
  PUSH IN2
  POP IN2
  JUMP32 main_epilogue
main_epilogue:
  MOVE BAF SP
  POP BAF
  POP IN1
  MOVE IN1 PC
  .data
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 804a0181-49f5-409b-a863-ea8db17f8e26 -->
<!-- SOURCE Pico-OS/README.md#114-placing-globals-in-ivt-with-sectionivt -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.4 Placing globals in `.ivt` with `section("ivt")` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-899 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-899" data-code-part="1">

<!-- README_CODE_PART code-899 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>section-placement.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void handler(void);

__attribute__((section("ivt")))
void (*ivt_table[1])(void) = {handler};

void (*ordinary_table[1])(void) = {handler};

void handler(void) {
}

int main(void) {
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID d32ee4a7-9057-473f-9391-0ceda660fb61 -->
<!-- SOURCE Pico-OS/README.md#114-placing-globals-in-ivt-with-sectionivt -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.4 Placing globals in `.ivt` with `section("ivt")` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-918 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-918" data-code-part="1">

<!-- README_CODE_PART code-918 lines=1-1 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ picoc_compiler -c -O1 section-placement.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-924 -->
<div class="code-columns" data-column-key="code:code-924" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:1.5300859598853869">

<ReadmeVisual kind="code" :width="255" data-code-source="code-924" data-code-part="1">

<!-- README_CODE_PART code-924 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>section-placement.reti_blocks</span><span class="code-range">lines 1–15</span></div>

```text {lines:false}
  .ivt
ivt_table:
  IVTE handler
  .text
handler:
  PUSH BAF
  MOVE SP BAF
  SUBI SP 0
  JUMP32 handler_epilogue
handler_epilogue:
  MOVE BAF SP
  POP BAF
  POP IN1
  MOVE IN1 PC
main:
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="255" data-code-source="code-924" data-code-part="2">

<!-- README_CODE_PART code-924 lines=16-30 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>section-placement.reti_blocks</span><span class="code-range">lines 16–30</span></div>

```text {lines:false}
  PUSH BAF
  MOVE SP BAF
  SUBI SP 0
  LOADI ACC 0
  PUSH ACC
  POP IN2
  JUMP32 main_epilogue
main_epilogue:
  MOVE BAF SP
  POP BAF
  POP IN1
  MOVE IN1 PC
  .data
ordinary_table:
  IVTE handler
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID a5987db8-4136-4b5c-b298-8add0c47e720 -->
<!-- SOURCE Pico-OS/README.md#114-placing-globals-in-ivt-with-sectionivt -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.4 Placing globals in `.ivt` with `section("ivt")` (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-960 -->
<ReadmeVisual kind="code" :width="667.8" class="command-strip" data-code-source="code-960" data-code-part="1">

<!-- README_CODE_PART code-960 lines=1-1 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ picoc_compiler -O1 -v -o section-placement.reti section-placement.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-967 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-967" data-code-part="1">

<!-- README_CODE_PART code-967 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>section-placement.reti</span><span class="code-range"></span></div>

```text {lines:false}
# // Block('ivt_table', [])
2147483668
# ...
# // Block('handler', [])
# NewStackframe(Num('0'))
SUBI SP 1
STOREIN SP BAF 1
MOVE SP BAF
SUBI SP 0
# ...
# // Block('ordinary_table', [])
2147483668
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 37c20bdd-a6c5-4b4c-9aa5-7cf440a5e5a8 -->
<!-- SOURCE Pico-OS/README.md#1151-default-compiler-generated-_start -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.5 Selecting a startup function with `-C` / `--startup-source`

## 1.1.5.1 Default compiler-generated `_start`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1004 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1004" data-code-part="1">

<!-- README_CODE_PART code-1004 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Compiler-generated _start · source equivalent</span><span class="code-range"></span></div>

```c {lines:false}
void _start(void) {
    main();
    asm("LOADI ACC 0");
    asm("JUMP 0");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b129a8dc-55a9-4ce5-b247-33259f0b9019 -->
<!-- SOURCE Pico-OS/README.md#1152-picoos-libstart-startup-sequence -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.5 Selecting a startup function with `-C` / `--startup-source`

## 1.1.5.2 PicoOS `libstart` startup sequence

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-1029 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-1029" data-code-part="1">

<!-- README_CODE_PART code-1029 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/libstart.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1038 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1038" data-code-part="1">

<!-- README_CODE_PART code-1038 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/start.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "../stdlib/stdlib.header"

int main(int argc, char **argv);
void initialize_environment(char **environment);

void start_process(int argc, char **argv) {
    init_process_heap();
    initialize_environment(argv + argc + 1);
    exit(main(argc, argv));
}

__attribute__((naked))
void _start(int argc, char *first_argument) {
    start_process(argc, (char **)&first_argument);
}
```

</div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>libc startup analogy</b><span><strong>Runtime preparation</strong> before application main · <strong>libstart:</strong> heap/environment; main result → exit</span></aside>

</div>

---

<!-- SLIDE_ID 2814405e-f7c3-4011-8d19-e9751be78c74 -->
<!-- SOURCE Pico-OS/README.md#1153-startup-functions-used-by-picoos-images -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.5 Selecting a startup function with `-C` / `--startup-source`

## 1.1.5.3 Startup functions used by PicoOS images

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1068 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1068:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.20%" /><col style="width:52.37%" /><col style="width:23.44%" /></colgroup><thead><tr><th>Image</th><th>_start used</th><th>Next function</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">EPROM bootloader</td><td>Explicit naked _start; no -C</td><td><span class="source-link"><code>boot_main()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key">SRAM kernel</td><td>Compiler-generated _start</td><td><span class="source-link"><code>main()</code></span></td></tr>
<tr data-source-row="3"><td class="table-key">Init process</td><td>libstart; -C library/start/libstart.picoc</td><td><span class="source-link"><code>main()</code></span></td></tr>
<tr data-source-row="4"><td class="table-key">Shell</td><td>Same libstart -C option</td><td><span class="source-link"><code>main()</code></span></td></tr>
<tr data-source-row="5"><td class="table-key">User applications</td><td>Common userspace libstart link rule</td><td>Application main()</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 72e18091-38e6-4018-a9a1-48f57ef8c058 -->
<!-- SOURCE Pico-OS/README.md#116-program-sections-interrupt-table-entries-and-linker-placement -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.6 Program sections, interrupt table entries, and linker placement

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 148fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-1713+code-1740" style="--readme-columns:minmax(0, 60fr) minmax(0, 40fr);">

<!-- README_ASSET code-1713 repeated -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-1713" data-code-part="1">

<!-- README_CODE_PART code-1713 lines=1-8 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((section("ivt")))
void (*interrupt_vector_table[OS_INTERRUPT_VECTOR_COUNT])(void) = {
    syscall_interrupt,
    timer_interrupt,
    uart_interrupt,
    cpu_exception_interrupt,
    dma_interrupt
};
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1740 repeated -->
<ReadmeVisual kind="code" :width="373.33333333333337" data-code-source="code-1740" data-code-part="1">

<!-- README_CODE_PART code-1740 lines=1-4 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void syscall_interrupt(void) {
    // ...
}
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1082 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1082:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:18.09%" /><col style="width:40.78%" /><col style="width:41.14%" /></colgroup><thead><tr><th>Section</th><th>Default contents and addressing</th><th>How source selects it</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>.ivt</code></td><td>ISR words; CS-relative globals</td><td>section(&quot;ivt&quot;) attribute</td></tr>
<tr data-source-row="2"><td class="table-key"><code>.text</code></td><td>Entry + ordinary instructions; CS-relative</td><td>Default for functions</td></tr>
<tr data-source-row="3"><td class="table-key"><code>.data</code></td><td>Ordinary globals; DS-relative</td><td>Default for globals</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>
<aside class="context-note"><b>System V ABI</b><span>C helpers + inline assembly · Shared ReTI stack-frame rules</span></aside>

</div>

---

<!-- SLIDE_ID ab62783f-7cea-4048-97a9-f381af81d6fb -->
<!-- SOURCE Pico-OS/README.md#117-reti-pseudoinstructions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.7 ReTI pseudoinstructions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1108 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1108:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.86%" /><col style="width:37.40%" /><col style="width:30.74%" /></colgroup><thead><tr><th>Pseudoinstruction</th><th>Purpose</th><th>Concrete size</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>PUSH reg</code></td><td>Reserve cell; store register</td><td>2 instructions</td></tr>
<tr data-source-row="2"><td class="table-key"><code>POP reg</code></td><td>Load top cell; release cell</td><td>2 instructions</td></tr>
<tr data-source-row="3"><td class="table-key"><code>LOADI32 reg operand</code></td><td>Load 32-bit literal or linked address</td><td>3 instructions</td></tr>
<tr data-source-row="4"><td class="table-key"><code>JUMP32[relation] target</code></td><td>Jump beyond immediate range</td><td>4--6 instructions when retained</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c88b8466-2934-4c68-9ae1-1e2d31e684c0 -->
<!-- SOURCE Pico-OS/README.md#1171-interrupt-safe-push-and-pop -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 ReTI pseudoinstructions

## 1.1.7.1 Interrupt-safe `PUSH` and `POP`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 149fr) minmax(0, 132fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1125 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1125:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:43.61%" /><col style="width:56.39%" /></colgroup><thead><tr><th>Pseudoinstruction</th><th>Expansion</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>PUSH ACC</code></td><td><ul><li><code>SUBI SP 1</code></li><li><code>STOREIN SP ACC 1</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>POP ACC</code></td><td><ul><li><code>LOADIN SP ACC 1</code></li><li><code>ADDI SP 1</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1139 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1139" data-code-part="1">

<!-- README_CODE_PART code-1139 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>PicoC example</span><span class="code-range"></span></div>

```c {lines:false}
asm("PUSH ACC");
asm("PUSH IN1");
/* Handle the interrupt */
asm("POP IN1");
asm("POP ACC");
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID b76f2e2a-4b26-4543-b159-a815e02c8b80 -->
<!-- SOURCE Pico-OS/README.md#1172-loading-32-bit-values-with-loadi32 -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 ReTI pseudoinstructions

## 1.1.7.2 Loading 32-bit values with `LOADI32` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 90fr) minmax(0, 160fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET math-1157 -->
<ReadmeVisual kind="math" :width="980">

<div class="readme-math">

$$
\mathrm{signed\_upper} = -b_{31}2^{21} + \sum_{j=0}^{20} b_{j+10}2^j,
\qquad
\mathrm{lower\_bits} = \sum_{j=0}^{9} b_j2^j.
$$

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-1167+code-1179" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1167 -->
<ReadmeVisual kind="code" :width="240" data-code-source="code-1167" data-code-part="1">

<!-- README_CODE_PART code-1167 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>ReTI assembly</span><span class="code-range"></span></div>

```text {lines:false}
LOADI reg signed_upper
MULTI reg 1024
ORI reg lower_bits
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1179 -->
<ReadmeVisual kind="code" :width="240" data-code-source="code-1179" data-code-part="1">

<!-- README_CODE_PART code-1179 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>ReTI assembly</span><span class="code-range"></span></div>

```text {lines:false}
LOADI ACC -2097152
MULTI ACC 1024
ORI ACC 5
```

</div>

</ReadmeVisual>

</div>

</div>
<aside class="context-note"><b>RISC-V / C arithmetic</b><span><strong>RISC-V:</strong> shared low-product; separate high-product operations · <strong>C signed overflow:</strong> undefined; reconstruction remains in range</span></aside>

</div>

---

<!-- SLIDE_ID 512473e0-07c8-4c40-b081-248b80dba8b9 -->
<!-- SOURCE Pico-OS/README.md#1172-loading-32-bit-values-with-loadi32 -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 ReTI pseudoinstructions

## 1.1.7.2 Loading 32-bit values with `LOADI32` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 130fr) minmax(0, 90fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1189 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1189" data-code-part="1">

<!-- README_CODE_PART code-1189 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>boot/bootloader.picoc</span><span class="code-range"></span></div>

```c {lines:false}
asm("LOADI32 ACC start_loaded_kernel");
asm("ADD ACC CS");
asm("MOVE ACC PC");
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET math-1210 -->
<ReadmeVisual kind="math" :width="980">

<div class="readme-math">

$$
\mathrm{unsigned\_upper}\,2^{10} - \mathrm{signed\_upper}\,2^{10} = 2^{32}.
$$

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 99e8bd96-623c-41ab-b95a-7630181c8141 -->
<!-- SOURCE Pico-OS/README.md#1173-long-jumps-with-jump32 -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 ReTI pseudoinstructions

## 1.1.7.3 Long jumps with `JUMP32`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1231 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1231" data-code-part="1">

<!-- README_CODE_PART code-1231 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>ReTI assembly</span><span class="code-range"></span></div>

```text {lines:false}
LOADI ACC signed_upper
MULTI ACC 1024
ORI ACC lower_bits
ADD ACC CS
MOVE ACC PC
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 6f5dbf33-cf1b-41a4-9c57-8de20b1fe668 -->
<!-- SOURCE Pico-OS/README.md#1174-pseudoinstruction-expansion-during-linking -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 ReTI pseudoinstructions

## 1.1.7.4 Pseudoinstruction expansion during linking

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 197fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1264 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/pseudoinstruction-blocks.svg" alt="Expanded code blocks and the jump to done" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1266 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1266:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.80%" /><col style="width:45.54%" /><col style="width:31.67%" /></colgroup><thead><tr><th>Block</th><th>Symbolic instructions</th><th>Real instructions after expansion</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>entry</code></td><td><code>PUSH BAF</code>, <code>LOADI32 ACC done</code>, <code>JUMP32 done</code></td><td><code>2 + 3 + 5 = 10</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>work</code></td><td><code>PUSH ACC</code>, <code>POP IN1</code>, <code>LOADI32 ACC 7</code></td><td><code>2 + 2 + 3 = 7</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>done</code></td><td><code>POP BAF</code></td><td><code>2</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 81605cda-d784-47a0-8afa-341ae1713278 -->
<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1292 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1292" data-code-part="1">

<!-- README_CODE_PART code-1292 lines=1-7 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>program.sections</span><span class="code-range"></span></div>

```json {lines:false}
{
  "codesegment_start": 0,
  "datasegment_start": 11595,
  "heap_start": 11621,
  "heap_size": 2000,
  "stack_start": 14621
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 31140f53-de63-4caf-befa-1e32bdba8891 -->
<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-1305+table-1322" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET table-1305 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1305:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:50.59%" /><col style="width:49.41%" /></colgroup><thead><tr><th>Entry</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>interrupt_service_routines_start</code></td><td>Optional ISR code start</td></tr>
<tr data-source-row="2"><td class="table-key"><code>codesegment_start</code></td><td>Initial CS + entry region</td></tr>
<tr data-source-row="3"><td class="table-key"><code>datasegment_start</code></td><td>Initial DS</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>heap_start</code></span></td><td>First process-local heap cell</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>heap_size</code></span></td><td>Capacity in cells; −1 → default</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>stack_start</code></span></td><td>Highest stack cell; −1 → default</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-1322 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1322:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.06%" /><col style="width:69.94%" /></colgroup><thead><tr><th>Size</th><th>Source and calculation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Words in <code>.data</code></td><td>Emitted <code>.data</code> words from linked <code>.reti_blocks</code></td></tr>
<tr data-source-row="2"><td class="table-key">Global-data extent</td><td>Largest global <code>addr + size</code> from <code>.st</code> symbols</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 8bce7067-7572-47c6-bdae-c29f2ee54bc9 -->
<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 180fr) minmax(0, 160fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1334 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1334:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:41.74%" /><col style="width:58.26%" /></colgroup><thead><tr><th>Entry</th><th>Default value</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>codesegment_start</code></td><td>Words in <code>.ivt</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>datasegment_start</code></td><td>Words in <code>.ivt</code> + words in <code>.text</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>heap_start</code></td><td><code>datasegment_start</code> + max(<code>.data</code> words, global-data extent)</td></tr>
<tr data-source-row="4"><td class="table-key"><code>heap_size</code></td><td><code>−1</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>stack_start</code></td><td><code>−1</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1354 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/compiler-binary-assembly.svg" alt="1.1.8 Linked .sections metadata and the five-word binary header" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 26f3feb1-ec31-4d4a-8379-0a9dd6437b1e -->
<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 170fr) minmax(0, 180fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1359 -->
<ReadmeVisual kind="code" :width="728" data-code-source="code-1359" data-code-part="1">

<!-- README_CODE_PART code-1359 lines=1-6 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ reti_emulator -a program.reti
$ hexyl -n 20 program.bin
┌────────┬─────────────────────────┬─────────────────────────┬────────┬────────┐
│00000000│ 00 00 00 00 00 00 2d 4b ┊ 00 00 2d 65 00 00 07 d0 │......-K┊..-e....│
│00000010│ 00 00 39 1d             ┊                         │..9.    ┊        │
└────────┴─────────────────────────┴─────────────────────────┴────────┴────────┘
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1375 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1375:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.22%" /><col style="width:19.24%" /><col style="width:27.59%" /><col style="width:33.94%" /></colgroup><thead><tr><th>Word</th><th>File byte offset</th><th>Value</th><th>Use in PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td>0</td><td><span class="source-link"><code>codesegment_start</code></span></td><td>Initial CS + entry</td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td>4</td><td><span class="source-link"><code>datasegment_start</code></span></td><td>Initial DS</td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td>8</td><td><span class="source-link"><code>heap_start</code></span></td><td>Process-local heap start</td></tr>
<tr data-source-row="4"><td class="table-key">3</td><td>12</td><td><span class="source-link"><code>heap_size</code></span></td><td>Configured cells; −1 → default</td></tr>
<tr data-source-row="5"><td class="table-key">4</td><td>16</td><td><span class="source-link"><code>stack_start</code></span></td><td>Highest stack cell; −1 → default</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 9b8bde65-0f92-402c-a765-ed0322f5daa1 -->
<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1413 -->
<ReadmeVisual kind="code" :width="736.6" data-code-source="code-1413" data-code-part="1">

<!-- README_CODE_PART code-1413 lines=1-9 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/memory_constants.header</span><span class="code-range"></span></div>

```c {lines:false}
#define SRAM_BASE (-2147483647 - 1) // -2^31
#define SRAM_MAX_ADDRESS_IN_MEMORY_MAP -2147221505 // -2^31 + 2^18 - 1
#define KERNEL_HEAP_START -2147442162 // -2^31 + heap_start
#define KERNEL_HEAP_SIZE 4096 // heap_size
#define PROCESS_MEMORY_START -2147435350 // -2^31 + stack_start + 1
#define KERNEL_CS_START_ASM "LOADI32 CS -2147483643" // -2^31 + codesegment_start
#define KERNEL_DS_START_ASM "LOADI32 DS -2147442893" // -2^31 + datasegment_start
#define KERNEL_SP_START_ASM "LOADI32 SP -2147435351" // -2^31 + stack_start
#define KERNEL_CS_ACC_ASM "LOADI32 ACC -2147483643" // -2^31 + codesegment_start
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID acedb95c-a90e-46b5-9a9f-db0abaeb727a -->
<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1427 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1427:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:53.02%" /><col style="width:46.98%" /></colgroup><thead><tr><th>Kernel constant</th><th>Consumer and purpose</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SRAM_BASE</code></span></td><td>Relative → absolute SRAM addresses</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SRAM_MAX_ADDRESS_IN_MEMORY_MAP</code></span></td><td>Inclusive outer-heap limit</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>KERNEL_HEAP_START</code></span>, <span class="source-link"><code>KERNEL_HEAP_SIZE</code></span></td><td>Kernel Heap bounds + stack boundary</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>PROCESS_MEMORY_START</code></span></td><td>First Process/Shared Data Heap cell</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>KERNEL_CS_START_ASM</code></span>, <span class="source-link"><code>KERNEL_DS_START_ASM</code></span></td><td>Install kernel CS + DS</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>KERNEL_SP_START_ASM</code></span></td><td>Install kernel SP</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>KERNEL_CS_ACC_ASM</code></span></td><td>Load kernel code base; currently unused</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e720ab54-002a-4dae-b3e8-9c9be745c27e -->
<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1441 -->
<ReadmeVisual kind="code" :width="676.4" data-code-source="code-1441" data-code-part="1">

<!-- README_CODE_PART code-1441 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>boot/memory_constants.header</span><span class="code-range"></span></div>

```c {lines:false}
#define SRAM_MAX_ADDRESS 262143 // 2^18 - 1
#define EPROM_DS_START_ASM "LOADI32 DS 3165" // datasegment_start
#define EPROM_STACK_START_ASM "LOADI32 SP -2147221505" // -2^31 + 2^18 - 1
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 14725512-8046-4b51-8536-43f32c77ced0 -->
<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1447 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1447:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:48.29%" /><col style="width:51.71%" /></colgroup><thead><tr><th>Bootloader constant</th><th>Consumer and purpose</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SRAM_MAX_ADDRESS</code></span></td><td>Physical SRAM limit; fallback stack</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>EPROM_DS_START_ASM</code></span></td><td>Install linked EPROM DS</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>EPROM_STACK_START_ASM</code></span></td><td>Temporary stack at SRAM top</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b05e2276-e4e6-4ce4-8317-360eed060d41 -->
<!-- SOURCE Pico-OS/README.md#12-reti-emulator-extensions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink>

## 1.2 ReTI-Emulator extensions (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1467 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1467:1,2,3,4,5,6,7,8,9,10,11,12,13">

<div class="table-panels table-panels-two" data-column-key="table:table-1467:1,2,3,4,5,6,7,8,9,10,11,12,13" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:37.58%" /><col style="width:62.42%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Plain execution output</td><td>UART output → host stdout</td></tr>
<tr data-source-row="2"><td class="table-key">Commented assembly</td><td>Source labels/comments beside assembly</td></tr>
<tr data-source-row="3"><td class="table-key">Atomic locking</td><td>Atomic old value + store 1</td></tr>
<tr data-source-row="4"><td class="table-key">Structured loading</td><td>Distinct code/data/heap/stack regions</td></tr>
<tr data-source-row="5"><td class="table-key">Binary assembly</td><td>ReTI words + five-word header</td></tr>
<tr data-source-row="6"><td class="table-key">EPROM-only boot</td><td>Start bootloader without SRAM preload</td></tr>
<tr data-source-row="7"><td class="table-key">Configurable SRAM</td><td>Configurable physical word capacity</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:37.58%" /><col style="width:62.42%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="8"><td class="table-key">Memory-mapped periphery</td><td>Memory-mapped offsets 0–16</td></tr>
<tr data-source-row="9"><td class="table-key">Interrupt controller</td><td>Mappings, priorities, pending state, nesting</td></tr>
<tr data-source-row="10"><td class="table-key">Direct memory access</td><td>UART words → SRAM; completion interrupt</td></tr>
<tr data-source-row="11"><td class="table-key">Manual interrupts</td><td>Trigger selected ISR in TUI</td></tr>
<tr data-source-row="12"><td class="table-key">Runtime timer</td><td>Instruction-count timer; visible live counter</td></tr>
<tr data-source-row="13"><td class="table-key">Raw-byte UART</td><td>Byte registers + status bits</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 34f55380-203b-4af3-a00b-17ecd4efffaa -->
<!-- SOURCE Pico-OS/README.md#12-reti-emulator-extensions -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink>

## 1.2 ReTI-Emulator extensions (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1467 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1467:14,15,16,17,18,19,20,21,22,23,24,25">

<div class="table-panels table-panels-two" data-column-key="table:table-1467:14,15,16,17,18,19,20,21,22,23,24,25" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:37.50%" /><col style="width:62.50%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="14"><td class="table-key">UART host services</td><td>Bounded host filesystem protocol</td></tr>
<tr data-source-row="15"><td class="table-key">Normal and raw terminals</td><td>Normal/raw input + control bytes</td></tr>
<tr data-source-row="16"><td class="table-key">CPU exceptions</td><td>Divide/stack/illegal → IVT entry 3</td></tr>
<tr data-source-row="17"><td class="table-key">Stack/heap protection</td><td>Inclusive lower SP boundary</td></tr>
<tr data-source-row="18"><td class="table-key">Runtime segment interpretation</td><td>Views follow live CS + DS</td></tr>
<tr data-source-row="19"><td class="table-key">Source-level debugging</td><td>Globals, locals, frames, source locations</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:37.50%" /><col style="width:62.50%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="20"><td class="table-key">SRAM transcoding</td><td>Numbers, characters, decoded instructions</td></tr>
<tr data-source-row="21"><td class="table-key">Snapshots and restart</td><td>Save/restore/restart complete machine state</td></tr>
<tr data-source-row="22"><td class="table-key">Live inspection/editing</td><td>Select, scroll, center, edit views</td></tr>
<tr data-source-row="23"><td class="table-key">Synthetic OS context</td><td>Synthetic startup kernel/interrupt context</td></tr>
<tr data-source-row="24"><td class="table-key">Explicit ISR table size</td><td>Reserve five-entry IVT</td></tr>
<tr data-source-row="25"><td class="table-key">Isolated assembly runs</td><td>Keep assembler periphery files isolated</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0dd731bf-b632-4826-9049-a7251b914a18 -->
<!-- SOURCE Pico-OS/README.md#121-reti-machine-model-and-memory-mapped-peripherals -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.1 ReTI machine model and memory-mapped peripherals (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 116fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1505 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/reti-periphery-memory-map.svg" alt="ReTI address space with periphery between EPROM and SRAM" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1510 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1510:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:34.38%" /><col style="width:17.00%" /><col style="width:18.52%" /><col style="width:30.09%" /></colgroup><thead><tr><th>Address range</th><th>Top-bit prefix</th><th>ReTI region</th><th>Implemented PicoOS use</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>0x00000000..0x3fffffff</code></td><td><code>00</code></td><td>EPROM</td><td>Bootloader code + data</td></tr>
<tr data-source-row="2"><td class="table-key"><strong><code>0x40000000..0x7fffffff</code></strong></td><td><strong><code>01</code></strong></td><td><strong>Periphery</strong></td><td>Implemented offsets 0–16</td></tr>
<tr data-source-row="3"><td class="table-key"><code>0x80000000..0xffffffff</code></td><td><code>10</code> or <code>11</code></td><td>SRAM</td><td>Kernel, processes, heaps, stacks</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 8e540a13-2b32-4ddb-940e-629beddbda7d -->
<!-- SOURCE Pico-OS/README.md#121-reti-machine-model-and-memory-mapped-peripherals -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.1 ReTI machine model and memory-mapped peripherals (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1520 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1520:1,2,3,4,5,6,7,8,9,10,11,12,13">

<div class="table-panels table-panels-two" data-column-key="table:table-1520:1,2,3,4,5,6,7,8,9,10,11,12,13" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:18.19%" /><col style="width:29.47%" /><col style="width:52.34%" /></colgroup><thead><tr><th>Offset</th><th>Register</th><th>Access and connection to PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td>UART send</td><td>Write low byte; clear send-ready</td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td>UART receive</td><td>Receive byte; poll or ISR reads</td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td>UART status</td><td>Bit 0: send; bit 1: receive</td></tr>
<tr data-source-row="4"><td class="table-key">3–5</td><td>Device-to-ISR mappings</td><td>Timer/custom/UART → IVT; 255 disables</td></tr>
<tr data-source-row="5"><td class="table-key">6–8</td><td>Device priorities</td><td>Highest pending priority wins</td></tr>
<tr data-source-row="6"><td class="table-key">9</td><td>Timer interval</td><td>Instruction interval; zero disables</td></tr>
<tr data-source-row="7"><td class="table-key">10</td><td>Stack/heap boundary</td><td>Inclusive SP limit; rewrite on switch</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:18.19%" /><col style="width:29.47%" /><col style="width:52.34%" /></colgroup><thead><tr><th>Offset</th><th>Register</th><th>Access and connection to PicoOS</th></tr></thead><tbody><tr data-source-row="8"><td class="table-key">11</td><td>CPU exception cause</td><td>None/divide/stack/illegal cause</td></tr>
<tr data-source-row="9"><td class="table-key">12</td><td>DMA active</td><td>1 enables DMA + extra registers</td></tr>
<tr data-source-row="10"><td class="table-key">13</td><td>DMA source</td><td>Absolute UART receive source</td></tr>
<tr data-source-row="11"><td class="table-key">14</td><td>DMA destination</td><td>Absolute SRAM destination</td></tr>
<tr data-source-row="12"><td class="table-key">15</td><td>DMA word count</td><td>Complete 32-bit words</td></tr>
<tr data-source-row="13"><td class="table-key">16</td><td>DMA status/control</td><td>0 idle; 1 busy; 2 done; 3 error</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b76f762b-22f9-4111-a94b-c1f872bfec7e -->
<!-- SOURCE Pico-OS/README.md#1221-test-and-set-in-sram -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions · 1.2.2 Atomic test-and-set with `TSL`

## 1.2.2.1 Test-and-set in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 95fr) minmax(0, 240fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1553 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1553" data-code-part="1">

<!-- README_CODE_PART code-1553 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>ReTI assembly</span><span class="code-range"></span></div>

```text {lines:false}
# Before: M[DS + 2] = 0
TSL DS ACC 2
# After:  ACC = 0 and M[DS + 2] = 1
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1563 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/tsl-memory-layout.svg" alt="TSL DS ACC 2 accessing adjacent SRAM word cells with the target changing from 0 to 1" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 020f5573-7ae4-43af-bce6-92c5f857f45f -->
<!-- SOURCE Pico-OS/README.md#1222-tsl-instruction-encoding -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions · 1.2.2 Atomic test-and-set with `TSL`

## 1.2.2.2 `TSL` instruction encoding

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 150fr) minmax(0, 200fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1576 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/tsl-instruction-format.svg" alt="TSL DS ACC 2 instruction fields" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1584 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1584:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:20.19%" /><col style="width:20.19%" /><col style="width:21.72%" /><col style="width:37.90%" /></colgroup><thead><tr><th>Type</th><th>Mode M</th><th>Assembly syntax</th><th>Operation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>10</code></td><td><code>00</code></td><td><code>STORE S i</code></td><td>Store S at DS-relative address</td></tr>
<tr data-source-row="2"><td class="table-key"><code>10</code></td><td><code>01</code></td><td><code>STOREIN D S i</code></td><td>Store register <code>S</code> at address <code>D + i</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>10</code></td><td><code>10</code></td><td><code>TSL S D i</code></td><td>D ← M[S+i]; M[S+i] ← 1</td></tr>
<tr data-source-row="4"><td class="table-key"><code>10</code></td><td><code>11</code></td><td><code>MOVE S D</code></td><td>Copy register <code>S</code> to register <code>D</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 2557cb88-4b56-4003-8f23-19544cff7e21 -->
<!-- SOURCE Pico-OS/README.md#123-uart-host-service-protocol -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.3 UART host-service protocol (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET image-1602 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/uart-physical-host-service.svg" alt="1.2.3 UART host-service protocol" />

</ReadmeVisual>

<!-- README_ASSET image-1607 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/uart-emulated-host-service.svg" alt="1.2.3 UART host-service protocol" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID df2f9f45-0896-4380-a59d-d59780656a16 -->
<!-- SOURCE Pico-OS/README.md#123-uart-host-service-protocol -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.3 UART host-service protocol (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1617 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1617:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15">

<div class="table-panels table-panels-two" data-column-key="table:table-1617:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:69.85%" /><col style="width:30.15%" /></colgroup><thead><tr><th>Request form</th><th>Result</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>&lt;ESC&gt;load &lt;path&gt;&lt;ESC&gt;/</code></td><td>Word count + binary bytes</td></tr>
<tr data-source-row="2"><td class="table-key"><code>&lt;ESC&gt;read-range &lt;offset&gt; &lt;count&gt; &lt;path&gt;&lt;ESC&gt;/</code></td><td>Returned count + file range</td></tr>
<tr data-source-row="3"><td class="table-key"><code>&lt;ESC&gt;file-size &lt;path&gt;&lt;ESC&gt;/</code></td><td>32-bit file size</td></tr>
<tr data-source-row="4"><td class="table-key"><code>&lt;ESC&gt;write &lt;path&gt;&lt;ESC&gt;/</code></td><td>Create/truncate; route UART output</td></tr>
<tr data-source-row="5"><td class="table-key"><code>&lt;ESC&gt;write-at &lt;offset&gt; &lt;path&gt;&lt;ESC&gt;/</code></td><td>Preserve file; output at offset</td></tr>
<tr data-source-row="6"><td class="table-key"><code>&lt;ESC&gt;write stdout&lt;ESC&gt;/</code> / <span class="source-link"><code>stderr</code></span></td><td>Restore host stdout/stderr</td></tr>
<tr data-source-row="7"><td class="table-key"><code>&lt;ESC&gt;literal-output &lt;count&gt;&lt;ESC&gt;/</code></td><td>Following bytes bypass control parser</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:69.85%" /><col style="width:30.15%" /></colgroup><thead><tr><th>Request form</th><th>Result</th></tr></thead><tbody><tr data-source-row="8"><td class="table-key"><code>&lt;ESC&gt;pwd&lt;ESC&gt;/</code></td><td>Length-prefixed PicoOS root /</td></tr>
<tr data-source-row="9"><td class="table-key"><code>&lt;ESC&gt;is-directory &lt;path&gt;&lt;ESC&gt;/</code></td><td>Directory existence/type test</td></tr>
<tr data-source-row="10"><td class="table-key"><code>&lt;ESC&gt;mkdir &lt;path&gt;&lt;ESC&gt;/</code></td><td>Create directory</td></tr>
<tr data-source-row="11"><td class="table-key"><code>&lt;ESC&gt;ls &lt;path&gt;&lt;ESC&gt;/</code></td><td>Length-prefixed listing</td></tr>
<tr data-source-row="12"><td class="table-key"><code>&lt;ESC&gt;unlink &lt;path&gt;&lt;ESC&gt;/</code></td><td>Remove file</td></tr>
<tr data-source-row="13"><td class="table-key"><code>&lt;ESC&gt;rmdir &lt;path&gt;&lt;ESC&gt;/</code></td><td>Remove empty directory</td></tr>
<tr data-source-row="14"><td class="table-key"><code>&lt;ESC&gt;move &lt;old path&gt;\n&lt;new path&gt;&lt;ESC&gt;/</code></td><td>Move/rename path</td></tr>
<tr data-source-row="15"><td class="table-key"><code>&lt;ESC&gt;touch &lt;path&gt;&lt;ESC&gt;/</code></td><td>Create/update timestamps</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID a8c9e247-d218-474a-9b6f-b6f7da9e2253 -->
<!-- SOURCE Pico-OS/README.md#123-uart-host-service-protocol -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.3 UART host-service protocol (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:image-1641+image-1646" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET image-1641 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/uart-load-protocol.svg" alt="1.2.3 UART host-service protocol" />

</ReadmeVisual>

<!-- README_ASSET image-1646 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/uart-file-requests.svg" alt="1.2.3 UART host-service protocol" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 6164bc4d-486b-47af-b6bd-951480b9f99f -->
<!-- SOURCE Pico-OS/README.md#124-debugger-source-view-and-terminal-modes -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.4 Debugger, source view, and terminal modes (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET recording-1667 -->
<AsciinemaRecording src="/casts/reti_emulator.cast" title="ReTI-Emulator session" poster="npt:8" fallback-href="https://asciinema.org/a/1264549" />
<div class="slide-note">Click to play; click outside to navigate</div>

</div>

</div>

---

<!-- SLIDE_ID f1f6efcb-5d26-4b6c-93da-0bba77656d9c -->
<!-- SOURCE Pico-OS/README.md#124-debugger-source-view-and-terminal-modes -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 ReTI-Emulator extensions

## 1.2.4 Debugger, source view, and terminal modes (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1679 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1679:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:21.97%" /><col style="width:26.73%" /><col style="width:51.30%" /></colgroup><thead><tr><th>View</th><th>Default tracking</th><th>Additional selection</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">CPU registers</td><td>All eight live registers</td><td>Inspect/edit selected register</td></tr>
<tr data-source-row="2"><td class="table-key">EEPROM / SRAM code</td><td>PC in matching address space</td><td>Choose register or address</td></tr>
<tr data-source-row="3"><td class="table-key">SRAM data</td><td>DS</td><td>Choose register or address</td></tr>
<tr data-source-row="4"><td class="table-key">SRAM stack</td><td>SP</td><td>Choose register or address</td></tr>
<tr data-source-row="5"><td class="table-key">Periphery</td><td>UART state</td><td>Cycle interrupt/timer/exception/DMA views</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 3bfdf250-5c22-4f71-9156-47cd007afa45 -->
<!-- SOURCE Pico-OS/README.md#2-interrupts-system-calls-preemption-and-exceptions -->

<div class="eyebrow section-eyebrow">Section 02 · Overview</div>

# 2. Interrupts, system calls, preemption, and exceptions

<SectionOverview section="2-interrupts-system-calls-preemption-and-exceptions" />

---

<!-- SLIDE_ID f7b01e53-759c-45e2-b462-522d88c3b6c2 -->
<!-- SOURCE Pico-OS/README.md#21-reti-interrupt-entry-and-the-interrupt-service-routine-table -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.1 ReTI interrupt entry and the interrupt service routine table

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 160fr) minmax(0, 220fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-1713+code-1740" style="--readme-columns:minmax(0, 60fr) minmax(0, 40fr);">

<!-- README_ASSET code-1713 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-1713" data-code-part="1">

<!-- README_CODE_PART code-1713 lines=1-8 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((section("ivt")))
void (*interrupt_vector_table[OS_INTERRUPT_VECTOR_COUNT])(void) = {
    syscall_interrupt,
    timer_interrupt,
    uart_interrupt,
    cpu_exception_interrupt,
    dma_interrupt
};
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1740 -->
<ReadmeVisual kind="code" :width="373.33333333333337" data-code-source="code-1740" data-code-part="1">

<!-- README_CODE_PART code-1740 lines=1-4 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void syscall_interrupt(void) {
    // ...
}
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1724 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1724:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.02%" /><col style="width:43.05%" /><col style="width:33.93%" /></colgroup><thead><tr><th>Index</th><th>Entry</th><th>Source</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td><span class="source-link"><code>syscall_interrupt()</code></span></td><td>Userspace INT 0</td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td><span class="source-link"><code>timer_interrupt()</code></span></td><td>Timer</td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td><span class="source-link"><code>uart_interrupt()</code></span></td><td>UART receive</td></tr>
<tr data-source-row="4"><td class="table-key">3</td><td><span class="source-link"><code>cpu_exception_interrupt()</code></span></td><td>Synchronous CPU exception</td></tr>
<tr data-source-row="5"><td class="table-key">4</td><td><span class="source-link"><code>dma_interrupt()</code></span></td><td>DMA completion; custom-device line</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 7b75a6e0-109c-479b-b39b-4d468213490c -->
<!-- SOURCE Pico-OS/README.md#221-interrupt-controller-initialization -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.2 Interrupt-controller mappings and priorities

## 2.2.1 Interrupt-controller initialization (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1767 -->
<div class="code-columns" data-column-key="code:code-1767" style="--readme-columns:minmax(0, 47fr) minmax(0, 53fr);--source-aspect:3.482777540693776">

<ReadmeVisual kind="code" :width="560.0000000000001" data-code-source="code-1767" data-code-part="1">

<!-- README_CODE_PART code-1767 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/interrupt_controller.picoc</span><span class="code-range">lines 1–15</span></div>

```c {lines:false}
int interrupt_device_isrs[INTERRUPT_DEVICE_COUNT] = {
    1,                            // INTERRUPT_DEVICE_INTTIMER (index 0)
    4,                            // INTERRUPT_DEVICE_DMA (index 1)
    2                             // INTERRUPT_DEVICE_UART (index 2)
};

int interrupt_device_priorities[INTERRUPT_DEVICE_COUNT] = {
    1, // INTERRUPT_DEVICE_INTTIMER (index 0)
    1, // INTERRUPT_DEVICE_DMA (index 1)
    2  // INTERRUPT_DEVICE_UART (index 2)
};

void interrupt_controller_initialize(void) {
    int device = 0;
    int interrupt_index;
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="631.4893617021277" data-code-source="code-1767" data-code-part="2">

<!-- README_CODE_PART code-1767 lines=16-29 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/interrupt_controller.picoc</span><span class="code-range">lines 16–29</span></div>

```c {lines:false}
    int priority;

    while (device < INTERRUPT_DEVICE_COUNT) {
        interrupt_controller_disable_device(device);
        interrupt_index = interrupt_device_isrs[device];
        priority = interrupt_device_priorities[device];

        if (interrupt_index != INTERRUPT_CONTROLLER_DISABLED) {
            interrupt_controller_assign_device(device, interrupt_index, priority);
        }

        device = device + 1;
    }
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 2ca89d93-d79b-4fbd-8376-d805dae9eb8d -->
<!-- SOURCE Pico-OS/README.md#221-interrupt-controller-initialization -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.2 Interrupt-controller mappings and priorities

## 2.2.1 Interrupt-controller initialization (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 250fr) minmax(0, 100fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1807 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-controller-initialization.svg" alt="SRAM initialization arrays and six interrupt-controller cells in the ReTI memory map" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1813 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1813:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:12.68%" /><col style="width:40.97%" /><col style="width:46.35%" /></colgroup><thead><tr><th>Device / array index</th><th>Mapping source → periphery cell</th><th>Priority source → periphery cell</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Timer / <code>0</code></td><td><code>interrupt_device_isrs[0] = 1</code> → <code>0x40000003</code></td><td><code>interrupt_device_priorities[0] = 1</code> → <code>0x40000006</code></td></tr>
<tr data-source-row="2"><td class="table-key">DMA on custom line / <code>1</code></td><td><code>interrupt_device_isrs[1] = 4</code> → <code>0x40000004</code></td><td><code>interrupt_device_priorities[1] = 1</code> → <code>0x40000007</code></td></tr>
<tr data-source-row="3"><td class="table-key">UART / <code>2</code></td><td><code>interrupt_device_isrs[2] = 2</code> → <code>0x40000005</code></td><td><code>interrupt_device_priorities[2] = 2</code> → <code>0x40000008</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID d964847e-9b73-4174-bfc7-26ea59781692 -->
<!-- SOURCE Pico-OS/README.md#23-saved-interrupt-stack-frame -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.3 Saved interrupt stack frame

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1860 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1860:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.57%" /><col style="width:38.79%" /><col style="width:33.64%" /></colgroup><thead><tr><th>Offset</th><th>Stored value</th><th>Address marker at entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><strong><code>+0</code></strong></td><td>Free cell addressed by <span class="source-link"><code>caller_context</code></span></td><td><strong>← <code>BAF</code> = <code>caller_context</code></strong> (copied from <code>SP</code>)</td></tr>
<tr data-source-row="2"><td class="table-key"><code>+1</code></td><td>Saved <code>DS</code></td><td></td></tr>
<tr data-source-row="3"><td class="table-key"><code>+2</code></td><td>Saved <code>CS</code></td><td></td></tr>
<tr data-source-row="4"><td class="table-key"><code>+3</code></td><td>Saved <code>BAF</code></td><td>Interrupted process's original <code>BAF</code> value</td></tr>
<tr data-source-row="5"><td class="table-key"><code>+4</code></td><td>Saved <code>IN2</code></td><td></td></tr>
<tr data-source-row="6"><td class="table-key"><code>+5</code></td><td>Saved <code>IN1</code></td><td></td></tr>
<tr data-source-row="7"><td class="table-key"><code>+6</code></td><td>Saved <code>ACC</code></td><td></td></tr>
<tr data-source-row="8"><td class="table-key"><code>+7</code></td><td>Return PC saved by interrupt entry</td><td></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Linux comparison</b><span><strong>Linux:</strong> context on kernel stack · <strong>PicoOS:</strong> context on user stack · ReTI entry/RTI use active SP</span></aside>

</div>

---

<!-- SLIDE_ID fa4b4712-4473-464e-9f7f-60df243ad2c0 -->
<!-- SOURCE Pico-OS/README.md#241-syscall-selectors-and-register-convention -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.1 Syscall selectors and register convention (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6306 repeated -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-6306" data-code-part="1">

<!-- README_CODE_PART code-6306 lines=1-8 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/syscall.header</span><span class="code-range"></span></div>

```c {lines:false}
// ...

struct WaitPidRequest {
    int pid;
    int *status;
};

// ...
```

</div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>System V ABI</b><span><strong>IN2:</strong> syscall + function result · Wrapper and entry agree</span></aside>
<aside class="context-note"><b>POSIX portability</b><span>Source interfaces across different kernels · PicoOS signatures/behavior differ</span></aside>

</div>

---

<!-- SLIDE_ID e0885272-03d0-4677-b7f0-e46b49a56218 -->
<!-- SOURCE Pico-OS/README.md#241-syscall-selectors-and-register-convention -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.1 Syscall selectors and register convention (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6323 repeated -->
<div class="code-columns" data-column-key="code:code-6323" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.2779369627507164">

<ReadmeVisual kind="code" :width="560" data-code-source="code-6323" data-code-part="1">

<!-- README_CODE_PART code-6323 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/sys/wait/wait.picoc</span><span class="code-range">lines 1–15</span></div>

```c {lines:false}
#include "wait.header"
#include "../../../common/syscall.header"

// Invokes INT 0 with ACC/IN1 and returns IN2 without loading unistd into SRAM
int invoke_waitpid_syscall(int number, int argument) {
    int result;

    asm("LOADIN BAF ACC 3");
    asm("LOADIN BAF IN1 4");
    asm("INT 0");
    asm("STOREIN BAF IN2 0");
    return result;
}

int waitpid(int pid) {
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-6323" data-code-part="2">

<!-- README_CODE_PART code-6323 lines=16-30 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/sys/wait/wait.picoc</span><span class="code-range">lines 16–30</span></div>

```c {lines:false}
    int status = 0;
    struct WaitPidRequest request;

    request.pid = pid;
    request.status = &status;
    while (!invoke_waitpid_syscall(SYSCALL_WAITPID, (int)&request)) {
    }
    return status;
}

bool WIFSTOPPED(int status) {
    return status == SIGNAL_STOP_STATUS ||
           status == SIGNAL_STOPPED_STATUS ||
           status == SIGNAL_TERMINAL_INPUT_STATUS;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID aaa81f9f-491f-493a-ab02-99ec07be59bd -->
<!-- SOURCE Pico-OS/README.md#241-syscall-selectors-and-register-convention -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.1 Syscall selectors and register convention (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1922 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1922:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.29%" /><col style="width:35.69%" /><col style="width:47.02%" /></colgroup><thead><tr><th>Register</th><th>Prepared or read by the helper</th><th>Meaning for this call</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>ACC</code></td><td><code>LOADIN BAF ACC 3</code>: first argument</td><td><code>SYSCALL_WAITPID</code> selects kernel wait handler</td></tr>
<tr data-source-row="2"><td class="table-key"><code>IN1</code></td><td><code>LOADIN BAF IN1 4</code>: second argument</td><td>Stack-local request: child PID + status destination</td></tr>
<tr data-source-row="3"><td class="table-key"><code>IN2</code></td><td><code>STOREIN BAF IN2 0</code>: local completion result</td><td>Completion indicator; child status written through request pointer</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 4f527028-2edf-4c50-be41-bf91c29cb7ce -->
<!-- SOURCE Pico-OS/README.md#241-syscall-selectors-and-register-convention -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.1 Syscall selectors and register convention (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1934 -->
<div class="code-columns" data-column-key="code:code-1934" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.4878048780487805">

<ReadmeVisual kind="code" :width="560" data-code-source="code-1934" data-code-part="1">

<!-- README_CODE_PART code-1934 lines=1-14 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/syscall.header · common/file.header</span><span class="code-range">lines 1–14</span></div>

```c {lines:false}
struct LoadProcessRequest { char *path; bool show_loading_bar; };
struct RunProcessRequest { int pid; char *arguments; char **environment; };
struct WaitPidRequest { int pid; int *status; };
struct KillRequest { int pid; int signal_number; };
struct PrctlRequest { int option; int argument; };
struct ShmOpenRequest { char *name; size_t size; };
struct GetCwdRequest { char *buffer; int size; };
struct ReadDirectoryRequest { char *path; char *buffer; int capacity; };
struct MoveRequest { char *old_path; char *new_path; };

struct OpenRequest { char *path; int flags; };
struct IoRequest {
    int file_descriptor;
    char *buffer;
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-1934" data-code-part="2">

<!-- README_CODE_PART code-1934 lines=15-27 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/syscall.header · common/file.header</span><span class="code-range">lines 15–27</span></div>

```c {lines:false}
    int count;
    bool protect_uart_control;
    bool show_loading_bar;
    int transferred;
    int loading_bar_update;
    bool complete;
};
struct SeekRequest {
    int file_descriptor;
    int offset;
    int origin;
};
struct Dup2Request { int old_file_descriptor; int new_file_descriptor; };
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 7bf082a5-9341-4119-8209-d3e8a4566e96 -->
<!-- SOURCE Pico-OS/README.md#2411-process-wait-signal-and-memory-request-structures -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.1 Syscall selectors and register convention

## 2.4.1.1 Process, wait, signal, and memory request structures

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1975 -->
<ReadmeVisual kind="table" :width="1475.6" data-table-key="table-1975:1,2,3,4,5,6,7,8,9,10,11,12,13">

<div class="table-panels table-panels-two" data-column-key="table:table-1975:1,2,3,4,5,6,7,8,9,10,11,12,13" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:36.35%" /><col style="width:21.66%" /><col style="width:42.00%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>LoadProcessRequest.path</code></span></td><td>Binary path</td><td><ul><li><code>load()</code></li><li><code>SYSCALL_LOAD_PROCESS</code></li><li><code>kmalloc()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><ul><li><code>LoadProcessRequest</code></li><li><code>.show_loading_bar</code></li></ul></td><td>Whether UART transfer progress should be printed</td><td><ul><li><code>load()</code></li><li><code>PICOOS_LOADING_BAR</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>RunProcessRequest.pid</code></span></td><td>Existing NEW PID</td><td><ul><li><code>run()</code></li><li><code>main()</code></li><li><code>SYSCALL_RUN_PROCESS_WITH_ARGUMENTS</code></li><li><code>READY</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>RunProcessRequest.arguments</code></span></td><td>Argument string / NULL</td><td><ul><li><code>run()</code></li><li><code>main()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>RunProcessRequest.environment</code></span></td><td>Null-terminated array of <code>NAME=value</code> pointers</td><td><ul><li><code>run()</code></li><li><code>main()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>WaitPidRequest.pid</code></span></td><td>Exact child PID</td><td><ul><li><code>waitpid()</code></li><li><code>SYSCALL_WAITPID</code></li></ul></td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:36.35%" /><col style="width:21.66%" /><col style="width:42.00%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="7"><td class="table-key"><span class="source-link"><code>WaitPidRequest.status</code></span></td><td>Address of caller's status cell</td><td><ul><li><code>waitpid()</code></li><li><code>waiting_status_ptr</code></li></ul></td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>KillRequest.pid</code></span></td><td>Target process</td><td><ul><li><code>kill()</code></li><li><code>SYSCALL_KILL</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>KillRequest.signal_number</code></span></td><td>Signal to deliver, 0 probes existence</td><td><code>kill()</code></td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>PrctlRequest.option</code></span></td><td>Currently only <span class="source-link"><code>PR_SET_PDEATHSIG</code></span></td><td><ul><li><code>prctl()</code></li><li><code>SYSCALL_PRCTL</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>PrctlRequest.argument</code></span></td><td>Signal number, or 0 to disable</td><td><ul><li><code>prctl()</code></li><li><code>parent_death_signal</code></li></ul></td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>ShmOpenRequest.name</code></span></td><td>Shared-entry lookup name</td><td><ul><li><code>shm_open()</code></li><li><code>SYSCALL_SHM_OPEN</code></li><li><code>kmalloc()</code></li></ul></td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>ShmOpenRequest.size</code></span></td><td>Requested shared region size in ReTI cells</td><td><code>shm_open()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0afb8f9a-6eba-40db-97d9-6d43b2de56ae -->
<!-- SOURCE Pico-OS/README.md#2412-file-and-directory-request-structures -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.1 Syscall selectors and register convention

## 2.4.1.2 File and directory request structures (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1997 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1997:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.43%" /><col style="width:29.01%" /><col style="width:39.55%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>OpenRequest.path</code></span></td><td>Relative/absolute file or device path</td><td><ul><li><code>open()</code></li><li><code>fopen()</code></li><li><code>SYSCALL_OPEN</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>OpenRequest.flags</code></span></td><td>Access mode plus <span class="source-link"><code>O_CREAT</code></span>, <span class="source-link"><code>O_TRUNC</code></span>, or <span class="source-link"><code>O_APPEND</code></span></td><td><ul><li><code>open()</code></li><li><code>fopen()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>IoRequest.file_descriptor</code></span></td><td>Entry number in the current PCB’s eight-entry table</td><td><ul><li><code>read()</code></li><li><code>write()</code></li><li><code>write_without_uart_escape_check()</code></li><li><code>SYSCALL_READ</code></li><li><code>SYSCALL_WRITE</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>IoRequest.buffer</code></span></td><td>Userspace destination for read or source for write</td><td><ul><li><code>read()</code></li><li><code>write()</code></li><li><code>write_without_uart_escape_check()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>IoRequest.count</code></span></td><td>Maximum cells to read or exact cells to write</td><td><ul><li><code>read()</code></li><li><code>write()</code></li><li><code>write_without_uart_escape_check()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>IoRequest.protect_uart_control</code></span></td><td>Scan escapes; protect with literal-output</td><td><ul><li><code>true</code></li><li><code>write()</code></li><li><code>fputc()</code></li><li><code>fputs()</code></li><li><code>false</code></li><li><code>write_without_uart_escape_check()</code></li><li><code>read()</code></li><li><code>fgetc()</code></li><li><code>write_process_exception_message()</code></li><li><code>list_processes()</code></li><li><code>write_file_descriptor()</code></li></ul></td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>IoRequest.show_loading_bar</code></span></td><td>Whether a host-file read shows progress</td><td><code>read()</code></td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>IoRequest.transferred</code></span></td><td>Bytes already copied by earlier chunks of the same <span class="source-link"><code>read()</code></span></td><td><ul><li><code>read()</code></li><li><code>read_regular_file()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c9bd20c7-754d-46fe-9a04-cd60348d798c -->
<!-- SOURCE Pico-OS/README.md#2412-file-and-directory-request-structures -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.1 Syscall selectors and register convention

## 2.4.1.2 File and directory request structures (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-1997+table-1997" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET table-1997 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1997:9,10,11,12,13,14,15,16">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:39.58%" /><col style="width:29.68%" /><col style="width:30.73%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="9"><td class="table-key"><span class="source-link"><code>IoRequest.loading_bar_update</code></span></td><td>Next total byte count that redraws read progress</td><td><code>read_regular_file()</code></td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>IoRequest.complete</code></span></td><td>Whether <span class="source-link"><code>read()</code></span> should return instead of invoking another chunk</td><td><ul><li><code>read()</code></li><li><code>read_file_descriptor()</code></li><li><code>read_regular_file()</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>SeekRequest.file_descriptor</code></span></td><td>Regular-file descriptor to reposition</td><td><ul><li><code>lseek()</code></li><li><code>SYSCALL_LSEEK</code></li></ul></td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>SeekRequest.offset</code></span></td><td>Signed displacement</td><td><ul><li><code>lseek()</code></li><li><code>SEEK_SET</code></li></ul></td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>SeekRequest.origin</code></span></td><td><span class="source-link"><code>SEEK_SET</code></span>, <span class="source-link"><code>SEEK_CUR</code></span>, or <span class="source-link"><code>SEEK_END</code></span></td><td><code>lseek()</code></td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>Dup2Request.old_file_descriptor</code></span></td><td>Descriptor to copy</td><td><ul><li><code>dup2()</code></li><li><code>SYSCALL_DUP2</code></li></ul></td></tr>
<tr data-source-row="15"><td class="table-key"><span class="source-link"><code>Dup2Request.new_file_descriptor</code></span></td><td>Entry to replace</td><td><code>dup2()</code></td></tr>
<tr data-source-row="16"><td class="table-key"><span class="source-link"><code>GetCwdRequest.buffer</code></span></td><td>Userspace destination</td><td><ul><li><code>getcwd()</code></li><li><code>SYSCALL_GETCWD</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-1997 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1997:17,18,19,20,21,22">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:41.26%" /><col style="width:27.36%" /><col style="width:31.38%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="17"><td class="table-key"><span class="source-link"><code>GetCwdRequest.size</code></span></td><td>Destination capacity</td><td><code>getcwd()</code></td></tr>
<tr data-source-row="18"><td class="table-key"><span class="source-link"><code>ReadDirectoryRequest.path</code></span></td><td>Directory to list</td><td><ul><li><code>opendir()</code></li><li><code>SYSCALL_READ_DIRECTORY</code></li></ul></td></tr>
<tr data-source-row="19"><td class="table-key"><span class="source-link"><code>ReadDirectoryRequest.buffer</code></span></td><td>Userspace listing buffer</td><td><ul><li><code>opendir()</code></li><li><code>d name\n</code></li><li><code>- name\n</code></li></ul></td></tr>
<tr data-source-row="20"><td class="table-key"><span class="source-link"><code>ReadDirectoryRequest.capacity</code></span></td><td>Maximum returned cells</td><td><code>opendir()</code></td></tr>
<tr data-source-row="21"><td class="table-key"><span class="source-link"><code>MoveRequest.old_path</code></span></td><td>Existing file or directory</td><td><ul><li><code>move()</code></li><li><code>move</code></li></ul></td></tr>
<tr data-source-row="22"><td class="table-key"><span class="source-link"><code>MoveRequest.new_path</code></span></td><td>New file or directory path</td><td><ul><li><code>move()</code></li><li><code>move</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 1fb48dc6-bf1e-491e-871f-bdc0da7273b0 -->
<!-- SOURCE Pico-OS/README.md#242-system-call-entry-execution-and-return-to-userspace -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.2 System-call entry, execution, and return to userspace

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2038 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-syscall-path.svg" alt="2.4.2 System-call entry, execution, and return to userspace" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 4ed85741-419e-4a63-8ef8-e52a86618eff -->
<!-- SOURCE Pico-OS/README.md#2421-entering-kernel-context -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.1 Entering kernel context

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2048 -->
<div class="code-columns" data-column-key="code:code-2048" style="--readme-columns:minmax(0, 48fr) minmax(0, 52fr);--source-aspect:2.647806004618938">

<ReadmeVisual kind="code" :width="538.8" data-code-source="code-2048" data-code-part="1">

<!-- README_CODE_PART code-2048 lines=1-19 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 1–19</span></div>

```c {lines:false}
__attribute__((naked))
void syscall_interrupt(void) {
    // Saves the same context layout as timer_interrupt
    asm("PUSH ACC"); // Syscall number
    asm("PUSH IN1"); // Syscall argument
    asm("PUSH IN2");
    asm("PUSH BAF");
    asm("PUSH CS");
    asm("PUSH DS");

    // BAF keeps old_sp while loading kernel CS, DS and SP
    asm("MOVE SP BAF");
    asm("LOADI IN1 0");
    write_stack_heap_boundary_from_in1();
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442893
    asm(KERNEL_SP_START_ASM); // LOADI32 SP -2147435351
    activate_kernel_stack_boundary();

```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="583.7" data-code-source="code-2048" data-code-part="2">

<!-- README_CODE_PART code-2048 lines=20-38 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 20–38</span></div>

```c {lines:false}
    // Builds the handle_syscall arguments from the saved context
    asm("PUSH BAF"); // Caller context
    asm("LOADIN BAF IN2 5");
    asm("PUSH IN2"); // Syscall argument
    asm("LOADIN BAF IN2 6");
    asm("PUSH IN2"); // Syscall number

    // A syscall that switches processes resumes with a successful IN2 result
    asm("LOADI IN2 1");
    asm("STOREIN BAF IN2 4");

    // Calls handle_syscall and returns through syscall_interrupt_return
    asm("LOADI32 ACC syscall_interrupt_return");
    asm("ADD ACC CS");
    asm("PUSH ACC"); // Return address: syscall return continuation
    asm("LOADI32 ACC handle_syscall");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID c276aed7-d90d-4f32-9092-8d3a724154e5 -->
<!-- SOURCE Pico-OS/README.md#24211-stack-boundary-helpers -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace · 2.4.2.1 Entering kernel context

## 2.4.2.1.1 Stack-boundary helpers

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-2133+code-2148" style="--readme-columns:minmax(0, 44fr) minmax(0, 56fr);">

<!-- README_ASSET code-2133 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-2133" data-code-part="1">

<!-- README_CODE_PART code-2133 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/periphery_asm.header</span><span class="code-range"></span></div>

```c {lines:false}
static inline void write_stack_heap_boundary_from_in1(void) {
    asm("LOADI ACC 1048576");
    asm("MULTI ACC 1024");
    asm("STOREIN ACC IN1 10");
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-2148 -->
<ReadmeVisual kind="code" :width="712.7272727272727" data-code-source="code-2148" data-code-part="1">

<!-- README_CODE_PART code-2148 lines=1-17 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/exception.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void activate_kernel_stack_boundary(void) {
    periphery_write_register(
        STACK_HEAP_BOUNDARY_REGISTER,
        KERNEL_HEAP_START + KERNEL_HEAP_SIZE - 1
    );
}

int process_stack_boundary(struct ProcessControlBlock *process) {
    return process->base_address + process->heap_start + process->heap_size - 1;
}

void activate_current_process_stack_boundary(void) {
    periphery_write_register(
        STACK_HEAP_BOUNDARY_REGISTER,
        process_stack_boundary(current_process())
    );
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 8ff2e1d3-e134-4d33-a051-9fe5c9f4f5f5 -->
<!-- SOURCE Pico-OS/README.md#2422-handle-syscall -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.2 Handle Syscall

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2191 -->
<div class="code-columns" data-column-key="code:code-2191" style="--readme-columns:minmax(0, 46fr) minmax(0, 54fr);--source-aspect:4.04361988386914">

<ReadmeVisual kind="code" :width="560" data-code-source="code-2191" data-code-part="1">

<!-- README_CODE_PART code-2191 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/syscall.picoc</span><span class="code-range">lines 1–13</span></div>

```c {lines:false}
int handle_syscall(int syscall_number, int argument, int *caller_context) {
    if (syscall_number == SYSCALL_SHUTDOWN) {
        shutdown();
        return 1;
    } else if (syscall_number == SYSCALL_REBOOT) {
        reboot();
        return 1;
    } else if (syscall_number == SYSCALL_LOAD_PROCESS) {
        return load_process_chunk(
            ((struct LoadProcessRequest *)argument)->path,
            ((struct LoadProcessRequest *)argument)->show_loading_bar,
            caller_context
        );
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="657.3913043478261" data-code-source="code-2191" data-code-part="2">

<!-- README_CODE_PART code-2191 lines=14-26 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/syscall.picoc</span><span class="code-range">lines 14–26</span></div>

```c {lines:false}
    } else if (syscall_number == SYSCALL_RUN_PROCESS_WITH_ARGUMENTS) {
        return mark_process_ready_with_arguments((struct RunProcessRequest *)argument);
    } else if (syscall_number == SYSCALL_LIST_PROCESSES) {
        list_processes();
        return 1;
    } else if (syscall_number == SYSCALL_UNLOAD_PROCESS) {
        return unload_process_by_pid(argument);
    }

    // ...

    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID cf38293b-13ad-4a01-91e1-05d7f041e34c -->
<!-- SOURCE Pico-OS/README.md#24221-system-call-groups -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace · 2.4.2.2 Handle Syscall

## 2.4.2.2.1 System-call groups

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2237 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2237:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:13.99%" /><col style="width:44.69%" /><col style="width:41.31%" /></colgroup><thead><tr><th>Group</th><th>Syscalls, in declaration order</th><th>Kernel functions</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">System control</td><td>Shutdown, reboot</td><td><ul><li><code>shutdown()</code></li><li><code>reboot()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key">Process management</td><td><ul><li>Load/run/list/unload/exit/wait/PID</li><li>Foreground/signals/parent-death</li></ul></td><td><ul><li><code>load_process_chunk()</code></li><li><code>mark_process_ready_with_arguments()</code></li><li><code>list_processes()</code></li><li><code>unload_process_by_pid()</code></li><li><code>exit_process()</code></li><li><code>wait_for_process_by_pid()</code></li><li><code>current_process()</code></li><li><code>set_foreground_process()</code></li><li><code>send_signal_by_pid()</code></li><li><code>set_parent_death_signal()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">Scheduling</td><td>Queue sleep, queue wakeup, yield</td><td><ul><li><code>sleep_on_wait_queue()</code></li><li><code>wakeup_wait_queue()</code></li><li><code>dispatcher_switch_from_context()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key">Process and shared memory</td><td>Heap start, heap size, heap-exhaustion handling, shared-memory open, map, unlink</td><td><ul><li><code>process_heap_start()</code></li><li><code>process_heap_size()</code></li><li><code>handle_process_heap_full_exception()</code></li><li><code>open_shared_memory()</code></li><li><code>map_shared_memory()</code></li><li><code>unlink_shared_memory()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key">Descriptors and I/O</td><td><ul><li>Availability/open/read/write/close/seek/dup</li><li>Direct UART byte</li></ul></td><td><ul><li>Availability → 1</li><li>Descriptor operations + UART output</li></ul></td></tr>
<tr data-source-row="6"><td class="table-key">Paths and directories</td><td><ul><li>chdir/getcwd/mkdir/readdir</li><li>unlink/rmdir/move/touch</li></ul></td><td><ul><li><code>change_working_directory()</code></li><li><code>get_working_directory()</code></li><li><code>make_host_directory()</code></li><li><code>read_host_directory()</code></li><li><code>unlink_host_file()</code></li><li><code>remove_host_directory()</code></li><li><code>move_host_path()</code></li><li><code>touch_host_file()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID eb23c1f5-f3b1-4a8e-a771-e283968d352a -->
<!-- SOURCE Pico-OS/README.md#2423-selecting-the-return-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.3 Selecting the return path (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2255 -->
<ReadmeVisual kind="code" :width="745.1999999999999" data-code-source="code-2255" data-code-part="1">

<!-- README_CODE_PART code-2255 lines=1-14 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void syscall_interrupt_return(void) {
    // Handle_syscall restores BAF to the saved caller context before returning
    // Saves the IN2 result before a pending timer request can dispatch the caller
    asm("STOREIN BAF IN2 4");

    asm("PUSH BAF"); // Caller context
    asm("LOADI32 ACC syscall_interrupt_restore");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC dispatcher_reschedule_if_requested");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 3c720b23-e163-4d95-a330-868fbbc7125e -->
<!-- SOURCE Pico-OS/README.md#2423-selecting-the-return-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.3 Selecting the return path (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-2290+code-2318" style="--readme-columns:minmax(0, 42fr) minmax(0, 58fr);">

<!-- README_ASSET code-2290 -->
<ReadmeVisual kind="code" :width="560.0000000000001" data-code-source="code-2290" data-code-part="1">

<!-- README_CODE_PART code-2290 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dispatcher.picoc</span><span class="code-range"></span></div>

```c {lines:false}
bool reschedule_requested = false;

void dispatcher_request_reschedule(void) {
    reschedule_requested = true;
}

void dispatcher_reschedule_if_requested(int *caller_context) {
    if (reschedule_requested) {
        dispatcher_switch_from_context(caller_context);
    }
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-2318 -->
<ReadmeVisual kind="code" :width="773.3333333333335" data-code-source="code-2318" data-code-part="1">

<!-- README_CODE_PART code-2318 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dispatcher.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void dispatcher_switch_to_process(struct ProcessControlBlock *process) {
    if (current_process() != NULL && current_process()->state == PROCESS_STATE_RUNNING) {
        current_process()->state = PROCESS_STATE_READY;
    }

    reschedule_requested = false;
    set_current_process(process);
    process->state = PROCESS_STATE_RUNNING;

    dispatcher_jump_to_process(process, process_stack_boundary(process));
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 9ae2bb06-7d13-49b7-9672-82640c51c2ad -->
<!-- SOURCE Pico-OS/README.md#2424-restoring-process-context-with-rti -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.4 Restoring process context with `RTI` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2375 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-2375" data-code-part="1">

<!-- README_CODE_PART code-2375 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void syscall_interrupt_restore(void) {
    asm("MOVE BAF SP");
    activate_current_process_stack_boundary();
    asm("POP DS");
    asm("POP CS");
    asm("POP BAF");
    asm("POP IN2");
    asm("POP IN1");
    asm("POP ACC");
    asm("RTI");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7c59fc5d-054b-475d-8e00-bf371c45fd89 -->
<!-- SOURCE Pico-OS/README.md#2424-restoring-process-context-with-rti -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.4 Restoring process context with `RTI` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2407 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-context-restore.svg" alt="Three process memory layouts with optional .ivt, .text and .data grouped as each process image, followed by its heap and stack. PCB 1 restores each CPU register, SP selects Process 1's stack, and RTI returns the PC to the resume instruction in Process 1's .text." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID ba29ca55-5928-470a-99d7-5bfbc082325e -->
<!-- SOURCE Pico-OS/README.md#251-timer-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.1 Timer interrupt path

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2436 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-timer-path.svg" alt="2.5.1 Timer interrupt path" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 3b1154d5-8c84-41ec-b85c-f92fa4fdca68 -->
<!-- SOURCE Pico-OS/README.md#2511-saving-context-and-selecting-the-timer-branch -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption · 2.5.1 Timer interrupt path

## 2.5.1.1 Saving context and selecting the timer branch (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2445 -->
<div class="code-columns" data-column-key="code:code-2445" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.2779369627507164">

<ReadmeVisual kind="code" :width="560" data-code-source="code-2445" data-code-part="1">

<!-- README_CODE_PART code-2445 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 1–15</span></div>

```c {lines:false}
__attribute__((naked))
void timer_interrupt(void) {
    // Saves the interrupted context before requesting a process switch
    asm("PUSH ACC");
    asm("PUSH IN1");
    asm("PUSH IN2");
    asm("PUSH BAF");
    asm("PUSH CS");
    asm("PUSH DS");
    // SP now addresses the free cell below DS, CS, BAF, IN2, IN1 and ACC

    // Uses kernel segments because an interrupt can arrive during entry or return
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442893

```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-2445" data-code-part="2">

<!-- README_CODE_PART code-2445 lines=16-29 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 16–29</span></div>

```c {lines:false}
    // Six saved registers put the automatic return PC at SP + 7.
    // DS is now kernel .data's start: kernel code is below it, process code above.
    // Test saved PC because CS may still be changing on kernel entry/return.
    asm("LOADIN SP ACC 7"); // Saved return PC at SP + 7
    asm("SUB ACC DS"); // Saved PC minus the kernel .data start
    asm("JUMP32> timer_interrupt_process"); // Positive: process context

    asm("LOADI32 ACC timer_interrupt_kernel_return");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC dispatcher_request_reschedule");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID b7cb3207-07f8-4287-a6c2-7e16347e8c84 -->
<!-- SOURCE Pico-OS/README.md#2511-saving-context-and-selecting-the-timer-branch -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption · 2.5.1 Timer interrupt path

## 2.5.1.1 Saving context and selecting the timer branch (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2491 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/timer-pc-memory-layout.svg" alt="Kernel execution below kernel DS and user-process execution strictly above it" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID cf8db111-0768-4a9c-ba98-4fd8d81c3565 -->
<!-- SOURCE Pico-OS/README.md#2513-restoring-interrupted-kernel-context-with-rti -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption · 2.5.1 Timer interrupt path

## 2.5.1.3 Restoring interrupted kernel context with `RTI`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2532 -->
<ReadmeVisual kind="code" :width="736.6" data-code-source="code-2532" data-code-part="1">

<!-- README_CODE_PART code-2532 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void timer_interrupt_kernel_return(void) {
    // The request stays pending while the interrupted kernel instructions resume
    asm("POP DS");
    asm("POP CS");
    asm("POP BAF");
    asm("POP IN2");
    asm("POP IN1");
    asm("POP ACC");
    asm("RTI");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e5868fe1-a49d-4aa0-8d35-43e2d071255f -->
<!-- SOURCE Pico-OS/README.md#2514-entering-kernel-context-for-userspace-preemption -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption · 2.5.1 Timer interrupt path

## 2.5.1.4 Entering kernel context for userspace preemption

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2567 -->
<ReadmeVisual kind="code" :width="702.1999999999999" data-code-source="code-2567" data-code-part="1">

<!-- README_CODE_PART code-2567 lines=1-19 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void timer_interrupt_process(void) {
    // BAF preserves caller_context while SP switches to the kernel stack
    asm("MOVE SP BAF");
    asm("LOADI IN1 0");
    write_stack_heap_boundary_from_in1();
    asm(KERNEL_SP_START_ASM); // LOADI32 SP -2147435351
    activate_kernel_stack_boundary();

    // Passes the interrupted stack frame to the dispatcher
    asm("PUSH BAF"); // Caller context

    // The dispatcher switches to a process through RTI and does not return
    asm("LOADI ACC 0");
    asm("PUSH ACC"); // Unreachable return address required by the call frame
    asm("LOADI32 ACC dispatcher_switch_from_context");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID baa38261-7bb9-4d5a-b91d-7fd604f5bc9c -->
<!-- SOURCE Pico-OS/README.md#253-shell-character-delay-for-different-timer-intervals -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.3 Shell character delay for different timer intervals

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2670 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/timer_interval_measurements.png" alt="Measured character delay for each timer interrupt interval" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f3e28112-442e-4896-9af7-d0db0008691c -->
<!-- SOURCE Pico-OS/README.md#26-uart-receive-interrupt-path -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.6 UART receive interrupt path

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2685 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-uart-path.svg" alt="2.6 UART receive interrupt path" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 531319ff-0eac-4780-bce5-94d36d36f300 -->
<!-- SOURCE Pico-OS/README.md#261-entering-kernel-segments-on-the-interrupted-stack -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.1 Entering kernel segments on the interrupted stack

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2694 -->
<div class="code-columns" data-column-key="code:code-2694" style="--readme-columns:minmax(0, 53fr) minmax(0, 47fr);--source-aspect:4.249962803154293">

<ReadmeVisual kind="code" :width="631.4893617021277" data-code-source="code-2694" data-code-part="1">

<!-- README_CODE_PART code-2694 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 1–12</span></div>

```c {lines:false}
__attribute__((naked))
void uart_interrupt(void) {
    // Saves the interrupted context while the kernel transfers one input byte
    asm("PUSH ACC");
    asm("PUSH IN1");
    asm("PUSH IN2");
    asm("PUSH BAF");
    asm("PUSH CS");
    asm("PUSH DS");

    // BAF keeps the interrupted stack while the handler uses kernel segments
    // Keeping SP avoids overwriting a suspended kernel call frame when all
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560.0000000000001" data-code-source="code-2694" data-code-part="2">

<!-- README_CODE_PART code-2694 lines=13-24 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 13–24</span></div>

```c {lines:false}
    // processes are blocked and the dispatcher is waiting for an interrupt
    asm("MOVE SP BAF");
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442893

    asm("LOADI32 ACC uart_interrupt_return");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC handle_uart_interrupt");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID fa1fbfd5-8459-4797-af38-8940037ccda8 -->
<!-- SOURCE Pico-OS/README.md#262-handling-the-received-byte -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.2 Handling the received byte

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2749 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-2749" data-code-part="1">

<!-- README_CODE_PART code-2749 lines=1-20 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/filesystem/terminal.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void handle_uart_interrupt(void) {
    struct ProcessControlBlock *process = terminal_input_process();
    struct Terminal *terminal = kernel_terminal();
    int value;
    int status;

    value = periphery_read_register(UART_RECEIVE_REGISTER) & 255;
    status = periphery_read_register(UART_STATUS_REGISTER);
    periphery_write_register(
        UART_STATUS_REGISTER,
        status | UART_RECEIVE_READY
    );

    if (handle_terminal_signal_character(value)) {
        return;
    }

    enqueue_terminal_byte(terminal, value);
    complete_pending_terminal_read(process, terminal);
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b7ceb77b-c199-4a83-8151-8d10aa9713bc -->
<!-- SOURCE Pico-OS/README.md#263-restoring-interrupted-context-with-rti -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.3 Restoring interrupted context with `RTI`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2802 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-2802" data-code-part="1">

<!-- README_CODE_PART code-2802 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void uart_interrupt_return(void) {
    // Restores the context that was active before the UART interrupt
    asm("MOVE BAF SP");
    asm("POP DS");
    asm("POP CS");
    asm("POP BAF");
    asm("POP IN2");
    asm("POP IN1");
    asm("POP ACC");
    asm("RTI");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 38159922-abcb-4e7f-a56d-695e80e8fd8e -->
<!-- SOURCE Pico-OS/README.md#264-uart-nesting-and-interrupt-priorities -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.4 UART nesting and interrupt priorities

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2832 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2832:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.52%" /><col style="width:33.49%" /><col style="width:41.99%" /></colgroup><thead><tr><th>Event</th><th>Context already executing</th><th>Result</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">UART receive</td><td>Syscall, with no hardware handler active</td><td>Immediate UART; return to syscall</td></tr>
<tr data-source-row="2"><td class="table-key">UART receive</td><td>Timer or DMA handler</td><td>UART priority 2 nests over priority 1</td></tr>
<tr data-source-row="3"><td class="table-key">Timer expiration</td><td>UART handler</td><td>Timer pending until UART returns</td></tr>
<tr data-source-row="4"><td class="table-key">DMA completion</td><td>UART handler</td><td>DMA pending until UART returns</td></tr>
<tr data-source-row="5"><td class="table-key">Timer expiration</td><td>DMA handler</td><td>Timer pending until DMA returns</td></tr>
<tr data-source-row="6"><td class="table-key">DMA completion</td><td>Timer handler</td><td>DMA pending until timer RTI</td></tr>
<tr data-source-row="7"><td class="table-key">Another UART byte</td><td>UART handler or an already pending UART byte</td><td>Queued byte until active UART ISR completes</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID cd705def-8c32-4475-805b-e495f5089a1c -->
<!-- SOURCE Pico-OS/README.md#265-polled-uart-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.5 Polled UART function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2864 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2864:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.61%" /><col style="width:9.80%" /><col style="width:11.51%" /><col style="width:33.71%" /><col style="width:22.37%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>send_byte_over_uart()</code></td><td>No value</td><td>Send one polled UART byte</td><td><code>switch_to_periphery_address_space()</code></td><td><code>send_byte_over_uart()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID cc67bdbc-4313-468b-8f2d-6c173462a5b8 -->
<!-- SOURCE Pico-OS/README.md#27-dma-completion-interrupt-path -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.7 DMA completion interrupt path

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2878 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-dma-path.svg" alt="2.7 DMA completion interrupt path" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID d085fea4-8f2d-4b10-821a-e1424f7fefad -->
<!-- SOURCE Pico-OS/README.md#271-entering-kernel-segments-on-the-interrupted-stack -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.7 DMA completion interrupt path

## 2.7.1 Entering kernel segments on the interrupted stack

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2887 -->
<div class="code-columns" data-column-key="code:code-2887" style="--readme-columns:minmax(0, 53fr) minmax(0, 47fr);--source-aspect:4.209393817743878">

<ReadmeVisual kind="code" :width="578.4893617021277" data-code-source="code-2887" data-code-part="1">

<!-- README_CODE_PART code-2887 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 1–11</span></div>

```c {lines:false}
__attribute__((naked))
void dma_interrupt(void) {
    // Saves the interrupted context while the kernel completes the DMA wait
    asm("PUSH ACC");
    asm("PUSH IN1");
    asm("PUSH IN2");
    asm("PUSH BAF");
    asm("PUSH CS");
    asm("PUSH DS");

    // BAF keeps the interrupted stack while the handler uses kernel segments
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="513.0000000000001" data-code-source="code-2887" data-code-part="2">

<!-- README_CODE_PART code-2887 lines=12-22 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 12–22</span></div>

```c {lines:false}
    asm("MOVE SP BAF");
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442893

    asm("LOADI32 ACC dma_interrupt_return");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC handle_dma_interrupt");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID aa5357e1-6d53-40ac-8cee-c8f0b703d125 -->
<!-- SOURCE Pico-OS/README.md#272-completing-the-dma-wait -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.7 DMA completion interrupt path

## 2.7.2 Completing the DMA wait

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2935 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-2935" data-code-part="1">

<!-- README_CODE_PART code-2935 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dma.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void handle_dma_interrupt(void) {
    wakeup_wait_queue(&dma_waiters);
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 04cc4554-f045-42a8-add8-59318100f5a0 -->
<!-- SOURCE Pico-OS/README.md#273-restoring-interrupted-context-with-rti -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.7 DMA completion interrupt path

## 2.7.3 Restoring interrupted context with `RTI`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2962 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-2962" data-code-part="1">

<!-- README_CODE_PART code-2962 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void dma_interrupt_return(void) {
    // Restores the context that was active before the DMA interrupt
    asm("MOVE BAF SP");
    asm("POP DS");
    asm("POP CS");
    asm("POP BAF");
    asm("POP IN2");
    asm("POP IN1");
    asm("POP ACC");
    asm("RTI");
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 35bafbb7-db7e-4420-9a0f-ddde1d7d0ae5 -->
<!-- SOURCE Pico-OS/README.md#281-cpu-exception-entry-and-registers -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.1 CPU exception entry and registers

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3016 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-exception-path.svg" alt="2.8.1 CPU exception entry and registers" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e14ef6ac-7c3e-4d0e-9436-2c83ee091c79 -->
<!-- SOURCE Pico-OS/README.md#2811-entering-kernel-context-after-a-fault -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers

## 2.8.1.1 Entering kernel context after a fault (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3024 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3024:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.42%" /><col style="width:18.40%" /><col style="width:44.18%" /></colgroup><thead><tr><th>Register</th><th>Written by</th><th>Contents and use</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">10, <span class="source-link"><code>STACK_HEAP_BOUNDARY_REGISTER</code></span></td><td>PicoOS</td><td><ul><li>0: disabled</li><li>SP below boundary → exception</li><li>Boundary: final heap cell</li></ul></td></tr>
<tr data-source-row="2"><td class="table-key">11, <span class="source-link"><code>CPU_EXCEPTION_CAUSE_REGISTER</code></span></td><td>ReTI CPU/emulator</td><td><ul><li>0: none; 1: divide-by-zero</li><li>2: stack overflow; 3: illegal instruction</li><li>Read-only cause register</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7fd5e3b1-5385-429e-92e7-64296cdcca04 -->
<!-- SOURCE Pico-OS/README.md#2811-entering-kernel-context-after-a-fault -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers

## 2.8.1.1 Entering kernel context after a fault (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3033 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/stack-heap-boundary.svg" alt="SP points to the next free stack cell, the boundary register marks the last heap cell, and the CPU rejects a decrease of SP below that boundary" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 5efaf46f-786a-481c-b157-4daf9b73d248 -->
<!-- SOURCE Pico-OS/README.md#2811-entering-kernel-context-after-a-fault -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers

## 2.8.1.1 Entering kernel context after a fault (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3038 -->
<div class="code-columns" data-column-key="code:code-3038" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:4">

<ReadmeVisual kind="code" :width="560" data-code-source="code-3038" data-code-part="1">

<!-- README_CODE_PART code-3038 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 1–12</span></div>

```c {lines:false}
__attribute__((naked))
void cpu_exception_interrupt(void) {
    // BAF preserves the interrupted CS while the handler resets kernel context
    asm("MOVE CS BAF");
    asm("LOADI IN1 0");
    write_stack_heap_boundary_from_in1();
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442893
    asm(KERNEL_SP_START_ASM); // LOADI32 SP -2147435351
    activate_kernel_stack_boundary();

    // A zero difference identifies an exception raised in kernel code
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-3038" data-code-part="2">

<!-- README_CODE_PART code-3038 lines=13-23 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>interrupt_service_routines/os_isrs.picoc</span><span class="code-range">lines 13–23</span></div>

```c {lines:false}
    asm("MOVE BAF ACC");
    asm("SUB ACC CS");
    asm("PUSH ACC");

    // The exception handler terminates the process or halts after a kernel panic
    asm("LOADI ACC 0");
    asm("PUSH ACC");
    asm("LOADI32 ACC handle_cpu_exception");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID c81dba57-6864-4942-9588-dcb09359f750 -->
<!-- SOURCE Pico-OS/README.md#2811-entering-kernel-context-after-a-fault -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers

## 2.8.1.1 Entering kernel context after a fault (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3098 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/exception-cs-comparison.svg" alt="Continuous SRAM with kernel and process CS pointing to their respective code sections, followed by the CS difference pushed into the handler's diff parameter" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2875c27d-2001-446b-a24f-3c46685d8bbc -->
<!-- SOURCE Pico-OS/README.md#2812-reading-and-classifying-the-exception -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers

## 2.8.1.2 Reading and classifying the exception

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3126 -->
<ReadmeVisual kind="code" :width="642" data-code-source="code-3126" data-code-part="1">

<!-- README_CODE_PART code-3126 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/exception.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void handle_cpu_exception(int interrupted_kernel_cs_difference) {
    int cause = periphery_read_register(CPU_EXCEPTION_CAUSE_REGISTER);
    bool kernel_exception = interrupted_kernel_cs_difference == 0;

    print_cpu_exception_message(cause, kernel_exception);
    if (kernel_exception) {
        shutdown();
    }

    exit_process(PROCESS_EXIT_STATUS_EXCEPTION);
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b9f76e07-90ea-4d3e-9aba-90dd8396edee -->
<!-- SOURCE Pico-OS/README.md#28121-reporting-the-exception -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers · 2.8.1.2 Reading and classifying the exception

## 2.8.1.2.1 Reporting the exception

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3155 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3155:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:13.97%" /><col style="width:33.31%" /><col style="width:52.73%" /></colgroup><thead><tr><th>Fault context</th><th>Diagnostic output</th><th>Kernel functions</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel</td><td>Panic directly over UART; bypass process descriptors</td><td><span class="source-link"><code>uart_print_string()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key">Process</td><td>Termination through process descriptor 1; follows redirection</td><td><span class="source-link"><code>write_process_exception_message(message)</code></span> builds an <span class="source-link"><code>IoRequest</code></span> and calls <span class="source-link"><code>write_file_descriptor()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 576ccea6-9739-4681-bb90-2f6a9778eb39 -->
<!-- SOURCE Pico-OS/README.md#2813-halting-the-kernel-or-terminating-the-process -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors · 2.8.1 CPU exception entry and registers

## 2.8.1.3 Halting the kernel or terminating the process

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-3169+code-3175" style="--readme-columns:minmax(0, 32fr) minmax(0, 68fr);">

<!-- README_ASSET code-3169 -->
<ReadmeVisual kind="code" :width="263.52941176470586" data-code-source="code-3169" data-code-part="1" :text-scale="1.2">

<!-- README_CODE_PART code-3169 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/kernel.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void shutdown(void) {
    asm("JUMP 0");
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-3175 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-3175" data-code-part="1" :text-scale="1.2">

<!-- README_CODE_PART code-3175 lines=1-6 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/process/process.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void exit_process(int status) {
    terminate_process(current_process(), status);
    dispatcher_start_next_process();
    // Switching to a next process returns via RTI; shutdown is only reached when none remain
    shutdown();
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID af6e54f6-acda-4b9a-9d9a-cc51542b3e98 -->
<!-- SOURCE Pico-OS/README.md#282-supported-exceptions-and-allocation-errors -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.2 Supported exceptions and allocation errors

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3215 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3215:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:15.25%" /><col style="width:26.18%" /><col style="width:36.48%" /><col style="width:22.09%" /></colgroup><thead><tr><th>Condition</th><th>Trigger</th><th>Entry or reported cause</th><th>PicoOS handling</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Division or modulo by zero</td><td>DIV/DIVI/MOD/MODI with zero divisor</td><td>Cause 1; IVT entry 3</td><td><ul><li>Userspace → terminate</li><li>Kernel → panic + shutdown</li></ul></td></tr>
<tr data-source-row="2"><td class="table-key">Stack overflow</td><td>SP decreased below active boundary</td><td>Cause 2; IVT entry 3</td><td><ul><li>Process overflow → terminate</li><li>Kernel overflow → shutdown</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">Illegal instruction</td><td>Invalid/unsupported decoded ReTI instruction</td><td>Cause 3; IVT entry 3</td><td>Same process/kernel fault policy</td></tr>
<tr data-source-row="4"><td class="table-key">Process heap full</td><td><span class="source-link"><code>malloc()</code></span> or <span class="source-link"><code>realloc()</code></span> cannot satisfy a positive-size allocation</td><td><span class="source-link"><code>require_process_heap_allocation()</code></span> invokes the process-heap-full syscall</td><td>Print heap-full diagnostic; terminate process</td></tr>
<tr data-source-row="5"><td class="table-key">Kernel heap full</td><td><span class="source-link"><code>kmalloc()</code></span> or <span class="source-link"><code>krealloc()</code></span> cannot satisfy a positive-size allocation</td><td><span class="source-link"><code>require_kernel_heap_allocation()</code></span> calls the panic handler directly</td><td>UART panic; shut down kernel</td></tr>
<tr data-source-row="6"><td class="table-key">Process and Shared Data Heap exhausted</td><td>No contiguous Process/Shared Data Payload</td><td>Returns <span class="source-link"><code>PSDMALLOC_INVALID_START</code></span>, no CPU exception is raised</td><td><ul><li>Load fails / shm_open returns −1</li><li>Process + kernel continue</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 73fafbf3-3e12-4687-91a6-f033e517af88 -->
<!-- SOURCE Pico-OS/README.md#283-exception-and-stack-boundary-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.3 Exception and stack-boundary function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3232 -->
<ReadmeVisual kind="table" :width="1138.6" data-table-key="table-3232:1" :text-scale="0.85">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.00%" /><col style="width:14.00%" /><col style="width:18.00%" /><col style="width:22.00%" /><col style="width:20.00%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>handle_process_heap_full_exception()</code></td><td>Terminates process</td><td>Print diagnostic; terminate process</td><td><ul><li><code>write_process_exception_message()</code></li><li><code>exit_process()</code></li></ul></td><td><code>require_process_heap_allocation()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 1e50e9af-47d3-4160-9fd9-f78649f0066a -->
<!-- SOURCE Pico-OS/README.md#3-memory-management-and-shared-memory -->

<div class="eyebrow section-eyebrow">Section 03 · Overview</div>

# 3. Memory management and shared memory

<SectionOverview section="3-memory-management-and-shared-memory" />

---

<!-- SLIDE_ID 297b295b-5c1c-42e6-b88c-f6f51a081573 -->
<!-- SOURCE Pico-OS/README.md#31-heap-block-layout-and-allocation-algorithm -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.1 Heap block layout and allocation algorithm (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3255 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-3255" data-code-part="1">

<!-- README_CODE_PART code-3255 lines=1-9 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/heap.header</span><span class="code-range"></span></div>

```c {lines:false}
struct BlockHeader {
    int size;
    bool free;
    struct BlockHeader *next;
};

struct Heap {
    struct BlockHeader *first_block;
};
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f48c8de3-76a5-47a9-8415-b949101cfe3e -->
<!-- SOURCE Pico-OS/README.md#31-heap-block-layout-and-allocation-algorithm -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.1 Heap block layout and allocation algorithm (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 210fr) minmax(0, 180fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-3275 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-generic-heap.svg" alt="One contiguous heap with Block Headers A–D and adjacent payloads, rooted at Heap.first_block" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-3280 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3280:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.02%" /><col style="width:24.06%" /><col style="width:53.93%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>BlockHeader.size</code></span></td><td>Usable cells; excludes header</td><td><ul><li><code>heap_init_region()</code></li><li><code>heap_alloc_from()</code></li><li><code>heap_split_block()</code></li><li><code>heap_merge_free_blocks()</code></li><li><code>heap_realloc_from()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>BlockHeader.free</code></span></td><td>Whether payload can satisfy allocation</td><td><ul><li><code>heap_init_region()</code></li><li><code>heap_split_block()</code></li><li><code>heap_alloc_from()</code></li><li><code>heap_free_from()</code></li><li><code>heap_realloc_from()</code></li><li><code>heap_merge_free_blocks()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>BlockHeader.next</code></span></td><td>Next header or NULL</td><td><ul><li><code>heap_init_region()</code></li><li><code>heap_alloc_from()</code></li><li><code>heap_split_block()</code></li><li><code>heap_merge_free_blocks()</code></li><li><code>heap_realloc_from()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>Heap.first_block</code></span></td><td>First header; no separate block array</td><td><ul><li><code>heap_init_region()</code></li><li><code>heap_alloc_from()</code></li><li><code>heap_merge_free_blocks()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 4d095311-07b0-4a03-a4a6-d3ab61fdf0ae -->
<!-- SOURCE Pico-OS/README.md#32-sram-image-and-heap-hierarchy -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.2 SRAM image and heap hierarchy (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3302 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3302:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:16.13%" /><col style="width:35.34%" /><col style="width:29.36%" /><col style="width:19.17%" /></colgroup><thead><tr><th>Heap context</th><th>Descriptor storage</th><th>Managed payloads</th><th>Interface</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel Heap</td><td>kernel_heap in kernel .data</td><td>PCBs, paths, descriptors, shared metadata</td><td><span class="source-link"><code>kmalloc()</code></span> / <span class="source-link"><code>kfree()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key">Process and Shared Data Heap</td><td>process_shared_data_heap in kernel .data</td><td>Complete process + shared-data payloads</td><td><span class="source-link"><code>PSDMalloc()</code></span> / <span class="source-link"><code>PSDFree()</code></span></td></tr>
<tr data-source-row="3"><td class="table-key">User Process Heap</td><td>process_heap in each process .data</td><td>Process + linked-library allocations</td><td><span class="source-link"><code>malloc()</code></span> / <span class="source-link"><code>free()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID a23f767b-3f90-4680-8174-22b3b48231ba -->
<!-- SOURCE Pico-OS/README.md#32-sram-image-and-heap-hierarchy -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.2 SRAM image and heap hierarchy (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3311 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-sram-overview.svg" alt="Continuous SRAM with the Kernel Heap, Process and Shared Data Heap, and nested User Process Heap highlighted by amber outlines and grouping bands, four blocks per heap, concrete kernel payload examples, and a dashed expansion of Process Payload A into its image, heap, and stack" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7f8f5d5f-58e9-4066-b51d-d25327fed09c -->
<!-- SOURCE Pico-OS/README.md#32-sram-image-and-heap-hierarchy -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.2 SRAM image and heap hierarchy (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked" style="--readme-rows:minmax(0, 317fr) minmax(0, 276fr)">

<!-- README_ASSET table-3317 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3317:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.83%" /><col style="width:21.97%" /><col style="width:17.41%" /><col style="width:35.78%" /></colgroup><thead><tr><th>Larger part</th><th>SRAM offset</th><th>Section or region</th><th>Contents</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel Image</td><td><code>0..4</code></td><td><code>.ivt</code></td><td>Five ISR addresses</td></tr>
<tr data-source-row="2"><td class="table-key">Kernel Image</td><td><code>5..40754</code></td><td><code>.text</code></td><td>Kernel + interrupt code</td></tr>
<tr data-source-row="3"><td class="table-key">Kernel Image</td><td><code>40755..41485</code></td><td><code>.data</code></td><td>Globals, heap descriptors, list roots</td></tr>
<tr data-source-row="4"><td class="table-key">Kernel runtime reservation</td><td><code>41486..45581</code></td><td>Kernel Heap</td><td>4096 cells + in-region headers</td></tr>
<tr data-source-row="5"><td class="table-key">Kernel runtime reservation</td><td><code>45582..48297</code></td><td>Kernel Stack</td><td>Downward-growing kernel stack</td></tr>
<tr data-source-row="6"><td class="table-key">After the Kernel region</td><td><code>48298..262143</code></td><td>Process and Shared Data Heap</td><td>Outer process + shared-data allocations</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-3335 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3335:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.31%" /><col style="width:41.54%" /><col style="width:39.14%" /></colgroup><thead><tr><th>Process Payload part</th><th>Relative address</th><th>Runtime role</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Optional <code>.ivt</code></td><td>Before <span class="source-link"><code>code_start</code></span> when present</td><td>Optional attributed data</td></tr>
<tr data-source-row="2"><td class="table-key"><code>.text</code></td><td><span class="source-link"><code>code_start</code></span></td><td>base_address → activation.cs</td></tr>
<tr data-source-row="3"><td class="table-key"><code>.data</code></td><td><span class="source-link"><code>data_start</code></span></td><td>base_address → activation.ds; process_heap</td></tr>
<tr data-source-row="4"><td class="table-key">User Process Heap</td><td><span class="source-link"><code>heap_start</code></span> through <code>heap_start + heap_size - 1</code></td><td>Inner headers + allocations; stack boundary</td></tr>
<tr data-source-row="5"><td class="table-key">User Process Stack</td><td>First cell beyond the heap through <span class="source-link"><code>effective_stack_start</code></span></td><td>Arguments, environment, PC, call frames</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 532cc55c-55e4-4e21-81d6-301b05c92f96 -->
<!-- SOURCE Pico-OS/README.md#352-user-process-heap-allocator-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.5 User Process Heap

## 3.5.2 User Process Heap allocator function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3460 -->
<ReadmeVisual kind="table" :width="1279.3999999999999" data-table-key="table-3460:1,2,3,4,5" :text-scale="0.95">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.50%" /><col style="width:8.00%" /><col style="width:10.00%" /><col style="width:25.50%" /><col style="width:11.00%" /><col style="width:22.00%" /></colgroup><thead><tr><th>Function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Syscalls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>malloc()</code></td><td>Pointer / NULL / heap-full</td><td><ul><li>First-fit process allocation</li><li>Positive failure → terminate</li></ul></td><td><ul><li><code>require_process_heap_allocation()</code></li><li><code>heap_alloc_from()</code></li></ul></td><td>Process-heap-full on positive-size failure</td><td><ul><li><code>opendir()</code></li><li><code>copy_environment_variable()</code></li><li><code>initialize_environment()</code></li><li><code>setenv()</code></li><li><code>clone_environment()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>realloc()</code></td><td>Pointer / NULL / heap-full</td><td><ul><li>Resize/move process allocation</li><li>Size 0 → free</li></ul></td><td><ul><li><code>require_process_heap_allocation()</code></li><li><code>heap_realloc_from()</code></li></ul></td><td>Process-heap-full on positive-size failure</td><td><code>store_environment_variable()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>free()</code></td><td>No value</td><td>Free + coalesce process blocks</td><td><code>heap_free_from()</code></td><td>None</td><td><ul><li><code>opendir()</code></li><li><code>closedir()</code></li><li><code>store_environment_variable()</code></li><li><code>unsetenv()</code></li><li><code>clearenv()</code></li><li><code>destroy_environment()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>init_process_heap()</code></td><td>No value</td><td>Initialize process-local heap</td><td><code>heap_init_region()</code></td><td>Process-heap-start, process-heap-size</td><td><code>start_process()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>require_process_heap_allocation()</code></td><td>Pointer or termination</td><td>Positive failure → heap-full syscall</td><td>None</td><td>Process-heap-full on positive-size failure</td><td><ul><li><code>malloc()</code></li><li><code>realloc()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f246d672-5b10-4a51-891f-6e15da0a7d71 -->
<!-- SOURCE Pico-OS/README.md#361-common-allocator-linkage-and-function-reference -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.1 Common allocator linkage and function reference (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3483 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-allocator-linkage.svg" alt="3.6.1 Common allocator linkage and function reference" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e3663d1b-15d7-499f-8071-c87cd51fe3d2 -->
<!-- SOURCE Pico-OS/README.md#361-common-allocator-linkage-and-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.1 Common allocator linkage and function reference (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3489 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3489:1,2,3,4" :text-scale="0.85">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.00%" /><col style="width:11.00%" /><col style="width:17.00%" /><col style="width:27.00%" /><col style="width:22.00%" /></colgroup><thead><tr><th>Function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>heap_init_region()</code></td><td>No value</td><td>Initialize one free header</td><td>None</td><td><code>init_process_heap()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>heap_alloc_from()</code></td><td>Pointer or NULL</td><td>First fit; split; mark allocated</td><td><code>heap_split_block()</code></td><td><code>malloc()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>heap_realloc_from()</code></td><td>Pointer or NULL; old block on failure</td><td>Shrink, grow, or allocate/copy/free</td><td><ul><li><code>heap_free_from()</code></li><li><code>heap_alloc_from()</code></li><li><code>heap_split_block()</code></li><li><code>heap_merge_free_blocks()</code></li><li><code>heap_copy_cells()</code></li></ul></td><td><code>realloc()</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>heap_free_from()</code></td><td>No value</td><td>Mark free; coalesce neighbors</td><td><code>heap_merge_free_blocks()</code></td><td><code>free()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 50e7d2b0-fb2f-4230-92e0-b8b4150040b2 -->
<!-- SOURCE Pico-OS/README.md#362-reallocation-decisions -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.2 Reallocation decisions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3506 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-reallocation-decisions.svg" alt="3.6.2 Reallocation decisions" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b2386cf5-167b-49c5-af14-3d616eadad4b -->
<!-- SOURCE Pico-OS/README.md#3631-initial-state-and-first-fit-search -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.1 Initial state and first-fit search

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3526 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-01-initial.svg" alt="Initial heap with allocated A, C and free B, D, linked from left to right" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0fb657aa-1ab6-4a86-b8a4-038d93abd916 -->
<!-- SOURCE Pico-OS/README.md#3632-allocation-splits-d -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.2 Allocation splits D

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3538 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-02-allocated.svg" alt="After allocation, D has eleven allocated payload cells and links to new free Header D′ with two payload cells" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7c9a95c6-5c7c-48c5-a3c6-471fd91c460e -->
<!-- SOURCE Pico-OS/README.md#36331-mark-d-free -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example · 3.6.3.3 Free D and merge its remainder

## 3.6.3.3.1 Mark D free

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3555 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-03-d-marked-free.svg" alt="D marked free with its eleven payload cells still separate from free D′ and its two payload cells" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 646df371-c8ac-4fc8-b3bf-44b8b26ad107 -->
<!-- SOURCE Pico-OS/README.md#36332-merge-d-and-its-remainder -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example · 3.6.3.3 Free D and merge its remainder

## 3.6.3.3.2 Merge D and its remainder

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3564 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-04-d-merged.svg" alt="D restored to sixteen free payload cells after absorbing Header D′ and its two payload cells" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f0d1be1f-687d-45e6-9dbc-688e50edcfe1 -->
<!-- SOURCE Pico-OS/README.md#36341-mark-c-free -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example · 3.6.3.4 Free C and merge repeatedly at B

## 3.6.3.4.1 Mark C free

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3580 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-05-c-marked-free.svg" alt="C marked free, making B, C, and D consecutive free blocks after allocated A" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 46ef18f2-0a25-448b-b876-dd6b2bed9c58 -->
<!-- SOURCE Pico-OS/README.md#36342-first-merge-at-b -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example · 3.6.3.4 Free C and merge repeatedly at B

## 3.6.3.4.2 First merge at B

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3588 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-06-b-c-merged.svg" alt="First merge at B bypasses Header C and produces nineteen free payload cells followed by free D" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID bd958652-9053-43f0-b683-d10efc9475ce -->
<!-- SOURCE Pico-OS/README.md#36343-second-merge-at-b -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example · 3.6.3.4 Free C and merge repeatedly at B

## 3.6.3.4.3 Second merge at B

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3597 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-07-b-d-merged.svg" alt="Second merge at B bypasses Header D, leaving allocated A and a thirty-eight-cell free B with next equal to NULL" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID ef86f82f-79a8-414c-aba5-b2a07d9706bd -->
<!-- SOURCE Pico-OS/README.md#4-processes-and-process-lifecycle -->

<div class="eyebrow section-eyebrow">Section 04 · Overview</div>

# 4. Processes and process lifecycle

<SectionOverview section="4-processes-and-process-lifecycle" />

---

<!-- SLIDE_ID 844582f6-5bf8-468e-8320-3fd88823c58a -->
<!-- SOURCE Pico-OS/README.md#41-process-control-block-fields -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.1 Process control block fields (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3623 -->
<div class="code-columns" data-column-key="code:code-3623" style="--readme-columns:minmax(0, 45fr) minmax(0, 55fr);--source-aspect:3.1991869918699183">

<ReadmeVisual kind="code" :width="461.4" data-code-source="code-3623" data-code-part="1">

<!-- README_CODE_PART code-3623 lines=1-14 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/process/process.header</span><span class="code-range">lines 1–14</span></div>

```c {lines:false}
struct ProcessControlBlock {
    int pid;
    int state;
    int base_address;
    int size;
    int heap_start;
    int heap_size;
    char *binary_path;
    char *working_directory;
    struct ActivationRecord activation;
    struct FileDescriptorTable *file_descriptors;
    int *waiting_status_ptr;
    struct wait_queue waiters;
    struct wait_queue *waiting_queue_ptr;
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="563.9333333333333" data-code-source="code-3623" data-code-part="2">

<!-- README_CODE_PART code-3623 lines=15-27 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/process/process.header</span><span class="code-range">lines 15–27</span></div>

```c {lines:false}
    struct ProcessControlBlock *wait_next;
    struct ProcessControlBlock *next;
    struct SharedMemoryAttachment *shared_memory_attachments;
    int parent_pid;
    int parent_death_signal;
    int exit_status;
    int stop_signal;
    int stopped_from_state;
    int pending_termination_signal;
    char *pending_terminal_read_buffer;
    int pending_terminal_read_count;
    struct ProcessLoad *pending_load;
};
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID bdcecc69-4db5-4798-9056-a428a679c0dd -->
<!-- SOURCE Pico-OS/README.md#41-process-control-block-fields -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.1 Process control block fields (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3653 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3653:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:21.47%" /><col style="width:22.16%" /><col style="width:56.37%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>pid</code></span></td><td>Stable process ID</td><td><ul><li><code>create_process()</code></li><li><code>find_process_by_pid()</code></li><li><code>wait_for_process_by_pid()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>state</code></span></td><td><ul><li>NEW / READY / RUNNING</li><li>BLOCKED / STOPPED / ZOMBIE</li></ul></td><td><ul><li><code>create_process()</code></li><li><code>mark_process_ready_with_arguments()</code></li><li><code>stop_process()</code></li><li><code>continue_process()</code></li><li><code>dispatcher_switch_to_process()</code></li><li><code>terminate_process()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>base_address</code></span>, <span class="source-link"><code>size</code></span></td><td>Absolute Process Payload base + size</td><td><ul><li><code>create_process()</code></li><li><code>remove_process()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>heap_start</code></span>, <span class="source-link"><code>heap_size</code></span></td><td>Relative userspace heap bounds</td><td><ul><li><code>create_process()</code></li><li><code>process_heap_start()</code></li><li><code>process_heap_size()</code></li><li><code>process_stack_boundary()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>binary_path</code></span></td><td>Owned executable path; later argv[0]</td><td><ul><li><code>create_process()</code></li><li><code>store_process_arguments()</code></li><li><code>list_processes()</code></li><li><code>remove_process()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>working_directory</code></span></td><td>Owned absolute path; inherited or /</td><td><ul><li><code>create_process()</code></li><li><code>build_process_path()</code></li><li><code>change_working_directory()</code></li><li><code>remove_process()</code></li></ul></td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>activation</code></span></td><td>Embedded saved CPU context</td><td><ul><li><code>create_process()</code></li><li><code>store_process_arguments()</code></li><li><code>dispatcher_switch_from_context()</code></li><li><code>complete_pending_terminal_read()</code></li><li><code>dispatcher_jump_to_process()</code></li></ul></td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>file_descriptors</code></span></td><td>Owned descriptor table</td><td><ul><li><code>create_process()</code></li><li><code>create_file_descriptor_table()</code></li><li><code>mark_process_ready_with_arguments()</code></li><li><code>remove_process()</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>waiting_status_ptr</code></span></td><td>Pointer into suspended waitpid frame</td><td><ul><li><code>NULL</code></li><li><code>create_process()</code></li><li><code>wait_for_process_by_pid()</code></li><li><code>wake_parent_waiting_for_process()</code></li><li><code>notify_process_stopped()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0c4ea443-bb1c-41fa-a9e1-ffc85071ab0e -->
<!-- SOURCE Pico-OS/README.md#41-process-control-block-fields -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.1 Process control block fields (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3653 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3653:10,11,12,13,14,15,16,17,18">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.37%" /><col style="width:33.99%" /><col style="width:39.64%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="10"><td class="table-key"><span class="source-link"><code>waiters</code></span></td><td>Embedded FIFO of waiting parents</td><td><ul><li><code>create_process()</code></li><li><code>wait_for_process_by_pid()</code></li><li><code>wake_parent_waiting_for_process()</code></li><li><code>notify_process_stopped()</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>waiting_queue_ptr</code></span>, <span class="source-link"><code>wait_next</code></span></td><td>Owning queue + intrusive successor</td><td><ul><li><code>create_process()</code></li><li><code>enqueue_current_process_on_wait_queue()</code></li><li><code>enqueue_terminal_reader()</code></li><li><code>wakeup_wait_queue()</code></li><li><code>remove_from_wait_queue()</code></li></ul></td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>next</code></span></td><td>Global process-list successor</td><td><ul><li><code>create_process()</code></li><li><code>scheduler_next_process()</code></li><li><code>find_process_by_pid()</code></li><li><code>remove_process()</code></li></ul></td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>shared_memory_attachments</code></span></td><td>Head of process mapping records</td><td><ul><li><code>create_process()</code></li><li><code>map_shared_memory()</code></li><li><code>remove_process()</code></li><li><code>release_process_shared_memory()</code></li></ul></td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>parent_pid</code></span>, <span class="source-link"><code>parent_death_signal</code></span></td><td>Parent identity + parent-death signal</td><td><ul><li><code>create_process()</code></li><li><code>set_parent_death_signal()</code></li><li><code>orphan_and_signal_children()</code></li></ul></td></tr>
<tr data-source-row="15"><td class="table-key"><span class="source-link"><code>exit_status</code></span></td><td>Retained zombie termination status</td><td><ul><li><code>create_process()</code></li><li><code>terminate_process()</code></li><li><code>wait_for_process_by_pid()</code></li></ul></td></tr>
<tr data-source-row="16"><td class="table-key"><span class="source-link"><code>stop_signal</code></span>, <span class="source-link"><code>stopped_from_state</code></span>, <span class="source-link"><code>pending_termination_signal</code></span></td><td>Stop/prior-state/deferred-termination bookkeeping</td><td><ul><li><code>create_process()</code></li><li><code>stop_process()</code></li><li><code>continue_process()</code></li><li><code>send_signal_to_process()</code></li><li><code>prepare_process_termination()</code></li></ul></td></tr>
<tr data-source-row="17"><td class="table-key"><span class="source-link"><code>pending_terminal_read_buffer</code></span>, <span class="source-link"><code>pending_terminal_read_count</code></span></td><td>Retained buffer + requested count</td><td><ul><li><code>NULL</code></li><li><code>create_process()</code></li><li><code>begin_terminal_read()</code></li><li><code>complete_pending_terminal_read()</code></li><li><code>resume_pending_terminal_read()</code></li></ul></td></tr>
<tr data-source-row="18"><td class="table-key"><span class="source-link"><code>pending_load</code></span></td><td>Metadata + progress of pending load</td><td><ul><li><code>NULL</code></li><li><code>create_process()</code></li><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li><li><code>finish_process_load()</code></li><li><code>cancel_process_load()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2e2cca8c-9aa4-4730-8f6a-f5309dfe9a0d -->
<!-- SOURCE Pico-OS/README.md#411-process-states-and-transitions -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.1 Process states and transitions (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3688 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3688:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.21%" /><col style="width:19.21%" /><col style="width:30.66%" /><col style="width:30.91%" /></colgroup><thead><tr><th>State</th><th>Numeric value</th><th>Meaning</th><th>Typical transition</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>NEW</code></span></td><td>0</td><td>Loaded; startup not prepared</td><td>Load completion</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>READY</code></span></td><td>1</td><td>Eligible for scheduling</td><td>Run, wakeup, SIGCONT</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>RUNNING</code></span></td><td>2</td><td>Activation loaded into CPU</td><td>Dispatch</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>BLOCKED</code></span></td><td>3</td><td>Linked into wait queue</td><td>Read, DMA, waitpid, sleep</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>STOPPED</code></span></td><td>4</td><td>Suspended by signal</td><td>SIGSTOP/TSTP/TTIN</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>ZOMBIE</code></span></td><td>5</td><td>Status retained for parent</td><td>Termination</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 8525fe3a-5897-41bd-92d3-0a9498826c31 -->
<!-- SOURCE Pico-OS/README.md#411-process-states-and-transitions -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.1 Process states and transitions (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3717 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-state-transitions.svg" alt="4.1.1 Process states and transitions" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 3df40f5a-3655-46c7-97c5-0a952f67dfe8 -->
<!-- SOURCE Pico-OS/README.md#412-global-process-list-and-current-process -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.2 Global process list and current process

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 250fr) minmax(0, 110fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-3727 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-process-list.svg" alt="Kernel globals and three linked PCBs in SRAM, followed by a process-list view of those same PCB objects with process_list_head, process_list_tail, and active_process pointing to PCB 1, PCB 3, and PCB 2" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-3744 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3744:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.86%" /><col style="width:27.65%" /><col style="width:41.50%" /></colgroup><thead><tr><th>List</th><th>Insertion policy</th><th>Pointers and linking cost</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">PCB list</td><td>Append at tail</td><td>Head for traversal; tail → O(1)</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry</code></span> registry</td><td>Prepend at head</td><td>Head insertion → O(1)</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 41f3c519-7928-417e-8da6-18f5d5b59aea -->
<!-- SOURCE Pico-OS/README.md#4121-from-pcbs-to-process-payloads-in-sram -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields · 4.1.2 Global process list and current process

## 4.1.2.1 From PCBs to Process Payloads in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3770 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-process-payload-links.svg" alt="Complete SRAM with three blocks per heap and two kernel PCBs pointing through base_address to Process Payloads A and C" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 124ee5e4-b4f2-438c-83d3-3889df1340d9 -->
<!-- SOURCE Pico-OS/README.md#421-loading-a-process-load-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process

## 4.2.1 Loading a process (`load` library call)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>load():</strong> receive the program into a reserved Process Payload</li>
<li><strong>Reception:</strong> caller owns transfer record; no child PCB</li>
<li><strong>After reception:</strong> create the child PCB and return its PID</li>
<li><strong>Initial state:</strong> NEW; run() prepares and starts the child</li></ul></div>

</div>

---

<!-- SLIDE_ID 7e9b38e1-6736-41eb-9443-36ab0322f9b8 -->
<!-- SOURCE Pico-OS/README.md#4211-step-1-receiving-the-process-image -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.1 Loading a process (`load` library call)

## 4.2.1.1 Step 1: Receiving the process image

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3811 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-load-transfer.svg" alt="EPROM, the complete peripheral mapping, and SRAM with CPU-polling and DMA transfer paths into the newly allocated User Process Image, while the caller owns ProcessLoad" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2d668bec-0d09-4df4-96de-02f882097ee3 -->
<!-- SOURCE Pico-OS/README.md#42111-processload-transfer-record -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.1 Loading a process (`load` library call) · 4.2.1.1 Step 1: Receiving the process image

## 4.2.1.1.1 `ProcessLoad` transfer record

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3827 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3827:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:34.94%" /><col style="width:25.30%" /><col style="width:39.77%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>ProcessLoad.base_address</code></span></td><td>Absolute reserved payload base</td><td><ul><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li><li><code>finish_process_load()</code></li><li><code>cancel_process_load()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>ProcessLoad.process_size</code></span></td><td>Image + heap + stack cells</td><td><ul><li><code>begin_process_load()</code></li><li><code>create_process()</code></li><li><code>finish_process_load()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>ProcessLoad.code_start</code></span>, <span class="source-link"><code>ProcessLoad.data_start</code></span></td><td>Linked code- and data-segment offsets from the binary header</td><td><ul><li><code>begin_process_load()</code></li><li><code>create_process()</code></li><li><code>finish_process_load()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>ProcessLoad.heap_start</code></span>, <span class="source-link"><code>ProcessLoad.heap_size</code></span></td><td>Resolved userspace heap offset and cell count</td><td><ul><li><code>begin_process_load()</code></li><li><code>create_process()</code></li><li><code>finish_process_load()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>ProcessLoad.payload_word_count</code></span></td><td>Encoded program words after the five-word header</td><td><ul><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>ProcessLoad.loaded_word_count</code></span></td><td>Words copied by the polling transfer so far</td><td><ul><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li></ul></td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>ProcessLoad.loading_bar_update</code></span></td><td>Next word count at which progress output is redrawn</td><td><ul><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li></ul></td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>ProcessLoad.uses_dma</code></span></td><td>DMA transfer versus polling chunks</td><td><ul><li><code>false</code></li><li><code>true</code></li><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li><li><code>cancel_process_load()</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>ProcessLoad.path</code></span></td><td>Owned binary path; range requests + PCB</td><td><ul><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li><li><code>finish_process_load()</code></li><li><code>free_process_load()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 9e6976d4-d412-47c3-999e-c97878a31ba5 -->
<!-- SOURCE Pico-OS/README.md#4212-step-2-creating-the-child-pcb -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.1 Loading a process (`load` library call)

## 4.2.1.2 Step 2: Creating the child PCB

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3854 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-load-complete.svg" alt="Completed load with the child PCB appended in the kernel heap, state NEW, fresh descriptors, initialized activation fields, and only one preliminary entry-PC cell on its stack" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 6580dcf7-5950-443a-8bb2-57664680aa05 -->
<!-- SOURCE Pico-OS/README.md#4213-process-stack-after-load -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.1 Loading a process (`load` library call)

## 4.2.1.3 Process stack after `load`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3869 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-loaded-stack.svg" alt="Child stack after load, lower addresses at the top and higher addresses at the bottom: saved activation.baf points to the only initialized stack cell at the bottom, while saved activation.sp points to the uninitialized cell immediately above it; stack growth is upward" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b0f58a23-0125-4a02-9036-28fb40b48586 -->
<!-- SOURCE Pico-OS/README.md#4214-load-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.1 Loading a process (`load` library call)

## 4.2.1.4 Load function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3892 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3892:1" :text-scale="0.9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.00%" /><col style="width:14.00%" /><col style="width:22.00%" /><col style="width:27.00%" /><col style="width:11.00%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>load_process_chunk()</code></td><td>PID success; 0 failure; −1 pending</td><td><ul><li>Incremental load; preserve progress</li><li>Create NEW PCB on completion</li></ul></td><td><ul><li><code>begin_process_load()</code></li><li><code>continue_process_load()</code></li><li><code>current_process()</code></li><li><code>file-size &amp;lt;path&amp;gt;</code></li><li><code>read-range &amp;lt;offset&amp;gt; &amp;lt;count&amp;gt; &amp;lt;path&amp;gt;</code></li></ul></td><td><code>load()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 41105c89-7e72-429c-b592-649185f7e1b4 -->
<!-- SOURCE Pico-OS/README.md#422-starting-a-process-run-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process

## 4.2.2 Starting a process (`run` library call) (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-3919 -->
<div class="readme-list"><ul><li>Pack PID, <strong>arguments</strong>, environment</li>
<li>Require <strong>NEW</strong> PCB</li>
<li>Copy <strong>inheritable descriptors</strong></li>
<li>Build child stack; update SP/<strong>BAF</strong></li>
<li>NEW → <strong>READY</strong></li></ul></div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Arguments:</strong> spaces/tabs; quoted whitespace preserved</li>
<li><strong>Kernel:</strong> builds pointer arrays + copies strings</li></ul></div>

</div>

---

<!-- SLIDE_ID a1e867ef-b98a-4953-95e5-fe051c212c8f -->
<!-- SOURCE Pico-OS/README.md#422-starting-a-process-run-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process

## 4.2.2 Starting a process (`run` library call) (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3933 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-run-setup.svg" alt="Run changes inside the same SRAM layout: inherited descriptor table, copied caller arguments and environment, new stack and activation pointers, and state NEW to READY" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 59d3cb05-b937-4225-a082-d62b919580f5 -->
<!-- SOURCE Pico-OS/README.md#42211-user-process-stack-placement -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.1 Initial user process stack

## 4.2.2.1.1 User process stack placement

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3965 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-stack-placement.svg" alt="Complete SRAM expanded into Process Payload A, with both the payload and its User Process Stack highlighted by matching teal fills and thick amber borders" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7a5a3778-76b4-4163-800c-5458c0395fda -->
<!-- SOURCE Pico-OS/README.md#42212-initial-argc-argv-and-envp -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.1 Initial user process stack

## 4.2.2.1.2 Initial `argc`, `argv`, and `envp` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3988 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3988:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.70%" /><col style="width:29.15%" /><col style="width:38.14%" /></colgroup><thead><tr><th>Name</th><th>Meaning</th><th>Calculation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>startup_cell_count</code></td><td>All startup values + strings</td><td>Sum shown below</td></tr>
<tr data-source-row="2"><td class="table-key"><code>entry_pc_address</code></td><td>Saved initial entry PC cell</td><td><code>base_address + size - startup_cell_count</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>strings_start_address</code></td><td>First copied character</td><td><code>entry_pc_address + argc + envc + 4</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>highest_stack_address</code></td><td>Highest reserved stack cell</td><td><code>base_address + size - 1</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>System V Intel386 / POSIX</b><span><strong>Intel386 Fig. 3-31:</strong> argc → argv → NULL → envp · <strong>ReTI:</strong> entry PC, word characters; no auxiliary vector · <strong>POSIX.1-2024:</strong> arrays/environment; no physical layout · <strong>PicoOS:</strong> load + run; no exec replacement</span></aside>

</div>

---

<!-- SLIDE_ID e359d1dd-0218-41b8-be1f-e4205cea5c38 -->
<!-- SOURCE Pico-OS/README.md#42212-initial-argc-argv-and-envp -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.1 Initial user process stack

## 4.2.2.1.2 Initial `argc`, `argv`, and `envp` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3998 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3998:1,2,3,4,5,6,7,8,9,10,11,12,13,14">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.30%" /><col style="width:50.70%" /></colgroup><thead><tr><th>Cell address</th><th>Stored value</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><strong>↑ Decreasing addresses</strong></td><td><strong>Lower addresses · stack grows ↑</strong></td></tr>
<tr data-source-row="2"><td class="table-key"><code>entry_pc_address</code></td><td>Entry PC = <span class="source-link"><code>activation.cs</code></span> minus 1</td></tr>
<tr data-source-row="3"><td class="table-key"><code>entry_pc_address + 1</code></td><td><span class="source-link"><code>argc</code></span></td></tr>
<tr data-source-row="4"><td class="table-key"><code>entry_pc_address + 2</code></td><td><span class="source-link"><code>argv[0]</code></span></td></tr>
<tr data-source-row="5"><td class="table-key"><code>...</code></td><td><code>...</code></td></tr>
<tr data-source-row="6"><td class="table-key"><code>entry_pc_address + argc + 2</code></td><td><span class="source-link"><code>argv[argc] = NULL</code></span></td></tr>
<tr data-source-row="7"><td class="table-key"><code>entry_pc_address + argc + 3</code></td><td><span class="source-link"><code>envp[0]</code></span></td></tr>
<tr data-source-row="8"><td class="table-key"><code>...</code></td><td><code>...</code></td></tr>
<tr data-source-row="9"><td class="table-key"><code>entry_pc_address + argc + envc + 3</code></td><td><span class="source-link"><code>envp[envc] = NULL</code></span></td></tr>
<tr data-source-row="10"><td class="table-key"><code>strings_start_address</code></td><td>First character of the copied <span class="source-link"><code>binary_path</code></span></td></tr>
<tr data-source-row="11"><td class="table-key"><code>strings_start_address + 1</code></td><td>Path character / \0</td></tr>
<tr data-source-row="12"><td class="table-key"><code>...</code></td><td>Remaining path, argument, and environment characters and <code>\0</code> terminators</td></tr>
<tr data-source-row="13"><td class="table-key"><code>highest_stack_address</code></td><td>Final \0</td></tr>
<tr data-source-row="14"><td class="table-key"><strong>↓ Increasing addresses</strong></td><td><strong>Higher addresses</strong></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID a77054e6-d573-437d-80af-29f8d4e6bf49 -->
<!-- SOURCE Pico-OS/README.md#42212-initial-argc-argv-and-envp -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.1 Initial user process stack

## 4.2.2.1.2 Initial `argc`, `argv`, and `envp` (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4028 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-4028" data-code-part="1">

<!-- README_CODE_PART code-4028 lines=1-4 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Startup reservation calculation</span><span class="code-range"></span></div>

```text {lines:false}
startup_cell_count = 1 + 1 + argc + 1 + envc + 1
    + cells(binary_path including its terminator)
    + cells(all argument strings including their terminators)
    + cells(all environment strings including their terminators)
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 1395b8ee-c3c3-480e-8e62-2db36b0c9e19 -->
<!-- SOURCE Pico-OS/README.md#422121-concrete-initial-stack-example -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.1 Initial user process stack · 4.2.2.1.2 Initial `argc`, `argv`, and `envp`

## 4.2.2.1.2.1 Concrete initial-stack example (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-4063+code-4079" style="--readme-columns:minmax(0, 57fr) minmax(0, 43fr);">

<!-- README_ASSET code-4063 -->
<ReadmeVisual kind="code" :width="560.0000000000001" data-code-source="code-4063" data-code-part="1">

<!-- README_CODE_PART code-4063 lines=1-10 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>add.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "library/stdlib/stdlib.header"

int main(int argc, char **argv) {
    char *enabled = getenv("X");

    if (argc == 3 && enabled != NULL && atoi(enabled) == 1) {
        return atoi(argv[1]) + atoi(argv[2]);
    }
    return 0;
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-4079 -->
<ReadmeVisual kind="code" :width="422.45614035087726" data-code-source="code-4079" data-code-part="1">

<!-- README_CODE_PART code-4079 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Launcher example</span><span class="code-range"></span></div>

```c {lines:false}
#include "library/unistd/unistd.header"
#include "library/sys/wait/wait.header"

int main(void) {
    char *environment[3];
    int pid = load("/add.bin");

    environment[0] = "X=1";
    environment[1] = "Y=0";
    environment[2] = NULL;
    run(pid, "2 3", environment);
    return waitpid(pid);
}
```

</div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Reading the stack</b><span>argc includes program name · <strong>argv/envp:</strong> NULL-terminated arrays · PicoOS prepares stack during run</span></aside>

</div>

---

<!-- SLIDE_ID cb71dff2-abb8-4454-a3e2-d98ef8ad4f28 -->
<!-- SOURCE Pico-OS/README.md#422121-concrete-initial-stack-example -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.1 Initial user process stack · 4.2.2.1.2 Initial `argc`, `argv`, and `envp`

## 4.2.2.1.2.1 Concrete initial-stack example (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4100 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-initial-stack-example.svg" alt="Initial stack for add.bin with two arguments, 2 and 3, and two environment variables, X=1 and Y=0, showing cell offsets from entry_pc_address, absolute pointer targets by offset, both address directions, and continuation arrows between rows" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 95ee971e-cc8a-48ee-a952-5dcd0022c5f7 -->
<!-- SOURCE Pico-OS/README.md#4222-parent-to-child-inheritance -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call)

## 4.2.2.2 Parent-to-child inheritance

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4112 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-inheritance.svg" alt="Complete SRAM map with compact Kernel Image, Kernel Stack and Process and Shared Data Heap regions surrounding detailed Kernel Heap allocations for parent and child PCBs, independent directory strings and descriptor tables, with pointers and copy operations" />

</ReadmeVisual>

</div>
<aside class="context-note"><b>fork / load + run</b><span><strong>Unix fork:</strong> clone parent process · <strong>PicoOS:</strong> fresh image + copied state</span></aside>

</div>

---

<!-- SLIDE_ID 3120a431-6260-4682-8411-6fee2a801bf9 -->
<!-- SOURCE Pico-OS/README.md#42221-environment-origin-and-propagation -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.2 Parent-to-child inheritance

## 4.2.2.2.1 Environment origin and propagation

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4170 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-environment-propagation.svg" alt="Environment origin and inheritance tree showing the kernel loading and starting init with an empty environment, init reading PATH=/user from config/environment.txt, and the shell's three child branches removing, changing, or keeping PATH before passing it to their children" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 1dfa7444-a609-44c8-8c24-4660dd93f81d -->
<!-- SOURCE Pico-OS/README.md#42222-loading-bar-environment-variable -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call) · 4.2.2.2 Parent-to-child inheritance

## 4.2.2.2.2 Loading-bar environment variable

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4196 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-4196" data-code-part="1">

<!-- README_CODE_PART code-4196 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/cat.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int main(int argc, char **argv) {
    // ...
    unsetenv(LOADING_BAR_ENVIRONMENT_VARIABLE);
    // ...
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID b5cbf61c-d1ab-4aad-bcad-0021e7c2a41a -->
<!-- SOURCE Pico-OS/README.md#4223-run-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Loading and starting a process · 4.2.2 Starting a process (`run` library call)

## 4.2.2.3 Run function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4213 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4213:1" :text-scale="0.8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.00%" /><col style="width:7.00%" /><col style="width:19.00%" /><col style="width:33.00%" /><col style="width:8.00%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>mark_process_ready_with_arguments()</code></td><td>true / false</td><td><ul><li>Build arguments/environment stack</li><li>Inherit descriptors; NEW → READY</li></ul></td><td><ul><li><code>current_process()</code></li><li><code>destroy_file_descriptor_table()</code></li><li><code>find_process_by_pid()</code></li><li><code>inherit_file_descriptors()</code></li><li><code>store_process_arguments()</code></li></ul></td><td><code>run()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 5460fa62-55e8-4b83-9153-5401e5b215f0 -->
<!-- SOURCE Pico-OS/README.md#43-process-list-pcb-metadata-and-lifecycle-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.3 Process list, PCB metadata, and lifecycle function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4233 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4233:1,2,3,4,5,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.91%" /><col style="width:10.86%" /><col style="width:14.67%" /><col style="width:32.33%" /><col style="width:19.23%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>list_processes()</code></td><td>No value</td><td>Print all PIDs + binary paths</td><td><ul><li><code>first_process()</code></li><li><code>system_relative_path()</code></li><li><code>uart_append_decimal()</code></li><li><code>write_file_descriptor()</code></li><li><code>write-at &amp;lt;offset&amp;gt; &amp;lt;path&amp;gt;</code></li><li><code>file-size &amp;lt;path&amp;gt;</code></li><li><code>write stdout</code></li><li><code>write stderr</code></li></ul></td><td><code>list_processes()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>unload_process_by_pid()</code></td><td>true / false</td><td>Remove noncurrent process by PID</td><td><ul><li><code>find_process_by_pid()</code></li><li><code>remove_process()</code></li><li><code>terminate_process()</code></li></ul></td><td><code>unload()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>exit_process()</code></td><td>No normal return</td><td>Record exit; notify parent; dispatch</td><td><ul><li><code>current_process()</code></li><li><code>dispatcher_start_next_process()</code></li><li><code>shutdown()</code></li><li><code>terminate_process()</code></li></ul></td><td><code>exit()</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>process_heap_start()</code></td><td>Absolute heap address</td><td>Current process heap base</td><td><code>current_process()</code></td><td><code>init_process_heap()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>process_heap_size()</code></td><td>Heap cell count</td><td>Current process heap capacity</td><td><code>current_process()</code></td><td><code>init_process_heap()</code></td></tr>
<tr data-source-row="9"><td class="table-key"><code>current_process()</code></td><td>PCB pointer or NULL</td><td>Current PCB; GETPID reads its pid</td><td>None</td><td><code>getpid()</code> → <code>GETPID</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7fb799da-b7b3-4637-a895-21cb7d93605f -->
<!-- SOURCE Pico-OS/README.md#5-shared-memory-entries-and-mappings -->

<div class="eyebrow section-eyebrow">Section 05 · Overview</div>

# 5. Shared Memory Entries and Mappings

<SectionOverview section="5-shared-memory-entries-and-mappings" />

---

<!-- SLIDE_ID f623a877-6c49-40a4-aaf8-8816379b491f -->
<!-- SOURCE Pico-OS/README.md#51-named-entries-and-per-process-attachments -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.1 Named entries and per-process attachments (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4270 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-4270" data-code-part="1">

<!-- README_CODE_PART code-4270 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/shared_memory.header</span><span class="code-range"></span></div>

```c {lines:false}
struct SharedMemoryEntry {
    char *name;
    int id;
    void *address;
    int reference_count;
    bool unlink_requested;
    struct SharedMemoryEntry *next;
};

struct SharedMemoryAttachment {
    struct SharedMemoryEntry *entry;
    struct SharedMemoryAttachment *next;
};
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 8df448ef-73ff-41ef-970e-a7f4d2bb2f5d -->
<!-- SOURCE Pico-OS/README.md#51-named-entries-and-per-process-attachments -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.1 Named entries and per-process attachments (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 240fr) minmax(0, 100fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-4295 -->
<ReadmeVisual kind="table" :width="948" data-table-key="table-4295:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:36.63%" /><col style="width:21.37%" /><col style="width:42.01%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.name</code></span></td><td><ul><li>Owned lookup name</li><li>Unlink → free + NULL</li></ul></td><td><ul><li><code>open_shared_memory()</code></li><li><code>find_shared_memory_by_name()</code></li><li><code>unlink_shared_memory()</code></li><li><code>destroy_shared_memory_entry()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.id</code></span></td><td>Numeric open/map handle</td><td><ul><li><code>open_shared_memory()</code></li><li><code>find_shared_memory_by_id()</code></li><li><code>map_shared_memory()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.address</code></span></td><td>Absolute start of the <span class="source-link"><code>PSDMalloc()</code></span> shared-memory data region</td><td><ul><li><code>open_shared_memory()</code></li><li><code>map_shared_memory()</code></li><li><code>destroy_shared_memory_entry()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.reference_count</code></span></td><td>Attachment count, not distinct PID count</td><td><ul><li><code>open_shared_memory()</code></li><li><code>map_shared_memory()</code></li><li><code>release_process_shared_memory()</code></li><li><code>unlink_shared_memory()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.unlink_requested</code></span></td><td>Defers destruction until the last attachment disappears</td><td><ul><li><code>open_shared_memory()</code></li><li><code>unlink_shared_memory()</code></li><li><code>release_process_shared_memory()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.next</code></span></td><td>Link to the next entry in the kernel's linked list</td><td><ul><li><code>open_shared_memory()</code></li><li><code>find_shared_memory_by_name()</code></li><li><code>find_shared_memory_by_id()</code></li><li><code>destroy_shared_memory_entry()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-4307 -->
<ReadmeVisual kind="table" :width="766.8" data-table-key="table-4307:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.33%" /><col style="width:30.13%" /><col style="width:36.54%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SharedMemoryAttachment.entry</code></span></td><td>Non-owning entry pointer; contributes one reference</td><td><ul><li><code>map_shared_memory()</code></li><li><code>release_process_shared_memory()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SharedMemoryAttachment.next</code></span></td><td>Link in one PCB's <span class="source-link"><code>shared_memory_attachments</code></span> list</td><td><ul><li><code>map_shared_memory()</code></li><li><code>release_process_shared_memory()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 607fa109-63ed-4134-8f71-fca61dae476c -->
<!-- SOURCE Pico-OS/README.md#511-global-shared-memory-list-and-entry-names -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink> · 5.1 Named entries and per-process attachments

## 5.1.1 Global shared-memory list and entry names

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4319 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-list.svg" alt="The global shared-memory list head reaches two linked entries in SRAM, each with a name pointer to a separate string. The lower view repeats the same two entries as a linked list." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 5ce5e05d-40df-4a86-ac5f-875815e617c2 -->
<!-- SOURCE Pico-OS/README.md#5111-from-shared-memory-entries-to-shared-data-payloads-in-sram -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink> · 5.1 Named entries and per-process attachments · 5.1.1 Global shared-memory list and entry names

## 5.1.1.1 From Shared Memory Entries to Shared Data Payloads in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4331 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-mappings.svg" alt="Three blocks in each heap: Shared Memory Entries 1 and 2 point through address to Shared Data Payloads A and C. PCB 1 and Process Payload B provide context." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c0ad25dc-a8be-47bb-9c4f-9f3952883766 -->
<!-- SOURCE Pico-OS/README.md#512-per-process-attachment-lists-in-sram -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink> · 5.1 Named entries and per-process attachments

## 5.1.2 Per-process attachment lists in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4343 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-attachments.svg" alt="Two PCBs, three attachments and two shared entries in the Kernel Heap, followed by the same two per-process attachment lists with shared_memory_attachments, next and entry arrows. The Process and Shared Data Heap is one box." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 5b777adf-cb2f-4602-9bad-5caaed6a7eda -->
<!-- SOURCE Pico-OS/README.md#52-mapping-unlinking-and-deferred-destruction -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.2 Mapping, unlinking, and deferred destruction (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4366 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-destruction.svg" alt="Shared-memory lifetime from left to right: shm_open creates Entry 1 with count 0, mmap in two processes raises the count to 2, shm_unlink removes the name while the count stays 2, removal of PCB 1 lowers it to 1, and removal of PCB 2 lowers it to 0 and frees the unlinked entry and its data." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 93a930be-b0de-415f-9722-c1532466d1c3 -->
<!-- SOURCE Pico-OS/README.md#52-mapping-unlinking-and-deferred-destruction -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.2 Mapping, unlinking, and deferred destruction (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 316fr) minmax(0, 316fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4383 -->
<div class="code-columns" data-column-key="code:code-4383" style="--readme-columns:minmax(0, 65fr) minmax(0, 35fr);--source-aspect:4.772452303396928">

<ReadmeVisual kind="code" :width="936.7428571428571" data-code-source="code-4383" data-code-part="1">

<!-- README_CODE_PART code-4383 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Shared-memory launcher example</span><span class="code-range">lines 1–13</span></div>

```c {lines:false}
// dependencies: ../../library/unistd/libunistd.reti_blocks ../../library/sys/wait/libwait.reti_blocks ../../library/sys/mman/libmman.reti_blocks

#include "../../library/unistd/unistd.header"
#include "../../library/sys/wait/wait.header"
#include "../../library/sys/mman/mman.header"

int main(void) {
    int shared_memory_id;
    int *shared_value;
    int worker_pid;
    int result = 1;

    shared_memory_id = shm_open("shared-value", 1);
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="504.4" data-code-source="code-4383" data-code-part="2">

<!-- README_CODE_PART code-4383 lines=14-26 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Shared-memory launcher example</span><span class="code-range">lines 14–26</span></div>

```c {lines:false}
    shared_value = (int *)mmap(shared_memory_id);
    shared_value[0] = 7;

    worker_pid = load("test/shared_value/worker.bin");
    run(worker_pid, "shared-value", NULL);
    waitpid(worker_pid);

    if (shared_value[0] == 8) {
        result = 0;
    }
    shm_unlink("shared-value");
    return result;
}
```

</div>

</ReadmeVisual>

</div>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4415 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-4415" data-code-part="1">

<!-- README_CODE_PART code-4415 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Shared-memory worker example</span><span class="code-range"></span></div>

```c {lines:false}
// dependencies: ../../library/sys/mman/libmman.reti_blocks

#include "../../library/sys/mman/mman.header"

int main(int argc, char **argv) {
    int shared_memory_id;
    int *shared_value;

    shared_memory_id = shm_open(argv[1], 1);
    shared_value = (int *)mmap(shared_memory_id);
    shared_value[0] = shared_value[0] + 1;
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID f8d6bae2-637d-4220-b86f-5834b9a56216 -->
<!-- SOURCE Pico-OS/README.md#53-shared-memory-function-reference -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.3 Shared Memory function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4444 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4444:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.28%" /><col style="width:10.35%" /><col style="width:16.57%" /><col style="width:35.66%" /><col style="width:14.15%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>open_shared_memory()</code></td><td>ID or −1</td><td>Find/create named shared entry</td><td><ul><li><code>find_shared_memory_by_name()</code></li><li><code>kmalloc()</code></li><li><code>copy_shared_memory_name()</code></li><li><code>PSDMalloc()</code></li><li><code>kfree()</code></li></ul></td><td><code>shm_open()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>map_shared_memory()</code></td><td>Address or NULL</td><td>Attach process; return shared address</td><td><ul><li><code>current_process()</code></li><li><code>find_shared_memory_by_id()</code></li><li><code>kmalloc()</code></li></ul></td><td><code>mmap()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>unlink_shared_memory()</code></td><td>0 / −1</td><td>Remove name; defer final release</td><td><ul><li><code>find_shared_memory_by_name()</code></li><li><code>kfree()</code></li><li><code>destroy_shared_memory_entry()</code></li></ul></td><td><code>shm_unlink()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f7c115f9-4397-4644-a01e-e4b23c6cdc88 -->
<!-- SOURCE Pico-OS/README.md#6-scheduling-and-context-switching -->

<div class="eyebrow section-eyebrow">Section 06 · Overview</div>

# 6. Scheduling and context switching

<SectionOverview section="6-scheduling-and-context-switching" />

---

<!-- SLIDE_ID 87572258-611d-4615-9bda-dd9f743c85d1 -->
<!-- SOURCE Pico-OS/README.md#6111-selecting-the-next-runnable-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink> · 6.1 Scheduler implementation · 6.1.1 Algorithm and Round Robin comparison

## 6.1.1.1 Selecting the next runnable process (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4514 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/scheduler-overview.svg" alt="PCB 1 through PCB 5 form a left-to-right list connected by next fields, ending in NULL. The global variables on the left point into the list: process_list_head to PCB 1 and active_process to PCB 3." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID fb660184-c161-44ef-ab40-dd3bbb7475d9 -->
<!-- SOURCE Pico-OS/README.md#6111-selecting-the-next-runnable-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink> · 6.1 Scheduler implementation · 6.1.1 Algorithm and Round Robin comparison

## 6.1.1.1 Selecting the next runnable process (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4537 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/scheduler-select.svg" alt="Steps 1–3: active_process remains at PCB 3 while start and candidate begin at PCB 4, candidate advances past its STOPPED state to PCB 5 in state READY, then the dispatcher moves active_process to PCB 5 and sets its state to RUNNING" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 1b4823da-b0b8-42bc-bb31-d3005ca34896 -->
<!-- SOURCE Pico-OS/README.md#6112-starting-at-the-head-after-the-last-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink> · 6.1 Scheduler implementation · 6.1.1 Algorithm and Round Robin comparison

## 6.1.1.2 Starting at the head after the last process

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4564 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/scheduler-next-turn.svg" alt="Steps 4–5: with active_process at PCB 5 and its next pointer NULL, the scheduler starts at PCB 1 and returns it in state READY, then the dispatcher moves active_process to PCB 1 and sets its state to RUNNING" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f7799228-aca5-4721-a70f-cc39bda2323e -->
<!-- SOURCE Pico-OS/README.md#6113-reaching-the-list-end-during-a-scan -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink> · 6.1 Scheduler implementation · 6.1.1 Algorithm and Round Robin comparison

## 6.1.1.3 Reaching the list end during a scan

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4584 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/scheduler-scan-end.svg" alt="List-end variation: with start at PCB 4 and active_process at PCB 3, the scan skips PCB 4 in state STOPPED and PCB 5 in state BLOCKED, reaches candidate NULL, resets candidate to the list head, and returns PCB 1 in state READY" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 393fe079-df86-4a12-83bf-4a37bbfdbdb2 -->
<!-- SOURCE Pico-OS/README.md#6114-implementation -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink> · 6.1 Scheduler implementation · 6.1.1 Algorithm and Round Robin comparison

## 6.1.1.4 Implementation

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4607 -->
<div class="code-columns" data-column-key="code:code-4607" style="--readme-columns:minmax(0, 63fr) minmax(0, 37fr);--source-aspect:2.613320017477062">

<ReadmeVisual kind="code" :width="697.7675675675677" data-code-source="code-4607" data-code-part="1">

<!-- README_CODE_PART code-4607 lines=1-19 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/scheduler.picoc</span><span class="code-range">lines 1–19</span></div>

```c {lines:false}
bool scheduler_can_run(struct ProcessControlBlock *process) {
    return process != NULL &&
           (process->state == PROCESS_STATE_READY ||
            // A still-current RUNNING process may be the only runnable process
            // when scheduler_next_process() wraps around to it
            process->state == PROCESS_STATE_RUNNING);
}

struct ProcessControlBlock *scheduler_next_process(void) {
    struct ProcessControlBlock *start;
    struct ProcessControlBlock *candidate;

    if (first_process() == NULL) {
        return NULL;
    }
    if (current_process() == NULL || current_process()->next == NULL) {
        start = first_process();
    } else {
        start = current_process()->next;
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="409.80000000000007" data-code-source="code-4607" data-code-part="2">

<!-- README_CODE_PART code-4607 lines=20-38 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/scheduler.picoc</span><span class="code-range">lines 20–38</span></div>

```c {lines:false}
    }

    candidate = start;
    while (candidate != NULL) {
        if (scheduler_can_run(candidate)) {
            return candidate;
        }
        candidate = candidate->next;
    }

    candidate = first_process();
    while (candidate != start) {
        if (scheduler_can_run(candidate)) {
            return candidate;
        }
        candidate = candidate->next;
    }
    return NULL;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 83080d75-fbd2-460d-bbe7-fd8ff5b72e6d -->
<!-- SOURCE Pico-OS/README.md#62-saved-process-registers -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.2 Saved process registers (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4677 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-activation-record.svg" alt="PCB 1 contains activation at offsets 8 through 14, connected directly to enlarged in1, in2, acc, sp, baf, cs, and ds cells. active_process points to PCB 1. Saved sp points one cell below the saved PC on the process stack." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID d977a719-8394-49ef-a97d-232d5a623935 -->
<!-- SOURCE Pico-OS/README.md#62-saved-process-registers -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.2 Saved process registers (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-4686+table-4698" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-4686 -->
<ReadmeVisual kind="code" :width="255" data-code-source="code-4686" data-code-part="1">

<!-- README_CODE_PART code-4686 lines=1-9 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/process/process.header</span><span class="code-range"></span></div>

```c {lines:false}
struct ActivationRecord {
    int in1;
    int in2;
    int acc;
    int sp;
    int baf;
    int cs;
    int ds;
};
```

</div>

</ReadmeVisual>

<!-- README_ASSET table-4698 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4698:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:14.19%" /><col style="width:31.40%" /><col style="width:54.41%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>in1</code></span>, <span class="source-link"><code>in2</code></span>, <span class="source-link"><code>acc</code></span></td><td>General argument/result registers at the suspension point</td><td><ul><li><code>create_process()</code></li><li><code>dispatcher_switch_from_context()</code></li><li><code>dispatcher_jump_to_process()</code></li><li><code>complete_pending_terminal_read()</code></li><li><code>resume_pending_terminal_read()</code></li><li><code>in2</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>sp</code></span></td><td>Below saved PC; PC at sp + 1</td><td><ul><li><code>create_process()</code></li><li><code>store_process_arguments()</code></li><li><code>dispatcher_switch_from_context()</code></li><li><code>dispatcher_jump_to_process()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>baf</code></span></td><td>Base address of the interrupted PicoC function frame</td><td><ul><li><code>create_process()</code></li><li><code>store_process_arguments()</code></li><li><code>dispatcher_switch_from_context()</code></li><li><code>dispatcher_jump_to_process()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>cs</code></span></td><td>Absolute code-segment base used for instruction addresses</td><td><ul><li><code>create_process()</code></li><li><code>dispatcher_switch_from_context()</code></li><li><code>dispatcher_jump_to_process()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>ds</code></span></td><td>Absolute data-segment base used for globals/static data</td><td><ul><li><code>create_process()</code></li><li><code>dispatcher_switch_from_context()</code></li><li><code>dispatcher_jump_to_process()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 98f2cdbc-c0b8-48da-be9a-906b3dbf57a6 -->
<!-- SOURCE Pico-OS/README.md#63-saving-the-current-process-and-selecting-the-next-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.3 Saving the current process and selecting the next process (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4746 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-dispatcher-save.svg" alt="caller_context points into PCB 3's user stack. Six arrows copy DS, CS, BAF, IN2, IN1 and ACC from offsets 1 through 6 to PCB 3.activation in the Kernel Heap. A separate address arrow saves caller_context + 6 as activation.sp. PC remains on the stack at offset 7." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2141e618-bd32-4be3-8de8-56f85854b82e -->
<!-- SOURCE Pico-OS/README.md#63-saving-the-current-process-and-selecting-the-next-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.3 Saving the current process and selecting the next process (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4751 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-4751" data-code-part="1">

<!-- README_CODE_PART code-4751 lines=1-18 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dispatcher.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void dispatcher_switch_from_context(int *caller_context) {
    struct ProcessControlBlock *process = current_process();

    if (process != NULL) {
        process->activation.sp = (int)(caller_context + 6);
        process->activation.ds = caller_context[1];
        process->activation.cs = caller_context[2];
        process->activation.baf = caller_context[3];
        process->activation.in2 = caller_context[4];
        process->activation.in1 = caller_context[5];
        process->activation.acc = caller_context[6];

        if (process->state == PROCESS_STATE_RUNNING) {
            process->state = PROCESS_STATE_READY;
        }
    }
    dispatcher_start_next_process();
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f1b5cdc2-a77a-48d7-8f74-14854efbf1b4 -->
<!-- SOURCE Pico-OS/README.md#63-saving-the-current-process-and-selecting-the-next-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.3 Saving the current process and selecting the next process (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4796 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-dispatcher-state.svg" alt="The outgoing PCB's state changes from RUNNING to READY. BLOCKED, STOPPED and an existing READY remain unchanged." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID aae956c1-0fcb-45ff-abd6-8870d0c0d020 -->
<!-- SOURCE Pico-OS/README.md#63-saving-the-current-process-and-selecting-the-next-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.3 Saving the current process and selecting the next process (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4809 -->
<ReadmeVisual kind="code" :width="710.8" data-code-source="code-4809" data-code-part="1">

<!-- README_CODE_PART code-4809 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dispatcher.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void dispatcher_start_next_process(void) {
    struct ProcessControlBlock *next_process = scheduler_next_process();

    // Waits in kernel context when every process is blocked. A hardware
    // interrupt can make one of them runnable without a separate idle process
    while (first_process() != NULL &&
           (next_process == NULL ||
            !prepare_process_termination(next_process))) {
        next_process = scheduler_next_process();
    }

    if (next_process != NULL) {
        dispatcher_switch_to_process(next_process);
    }
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 3bb60e3b-a297-436f-93c3-61d123a2724e -->
<!-- SOURCE Pico-OS/README.md#64-restoring-the-selected-process-and-returning-with-rti -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.4 Restoring the selected process and returning with `RTI` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4874 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-dispatcher-restore.svg" alt="PCB 1's activation fields live in SRAM's Kernel Heap and are copied into a separate CPU register bank. Steps 1–4 identify the restoration actions, not process numbers. Restored SP points to the saved ACC cell in PCB 1's user stack in SRAM's Process Payload A. In Step 4 the CPU executes RTI, meaning return from interrupt: it reads the saved PC from the next stack cell at SP + 1, updates CPU PC and SP, and resumes process 1 in its .text. The stack boundary is installed in a separate periphery register." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 62b5a2ed-b827-42d6-ac13-4f4bffef585a -->
<!-- SOURCE Pico-OS/README.md#64-restoring-the-selected-process-and-returning-with-rti -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.4 Restoring the selected process and returning with `RTI` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4900 -->
<div class="code-columns" data-column-key="code:code-4900" style="--readme-columns:minmax(0, 47fr) minmax(0, 53fr);--source-aspect:4.586752308309916">

<ReadmeVisual kind="code" :width="560.0000000000001" data-code-source="code-4900" data-code-part="1">

<!-- README_CODE_PART code-4900 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dispatcher.picoc</span><span class="code-range">lines 1–11</span></div>

```c {lines:false}
__attribute__((naked))
void dispatcher_jump_to_process(struct ProcessControlBlock *process, int stack_boundary) {
    // Reads the process pointer and its precomputed stack boundary from the call frame
    asm("LOADIN SP BAF 2");
    asm("LOADIN SP IN1 3");

    // Restores SP before the process boundary so an interrupt cannot compare the
    // kernel stack against the process heap during this context-switch window
    asm("LOADIN BAF SP 11");
    write_stack_heap_boundary_from_in1();

```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="631.4893617021277" data-code-source="code-4900" data-code-part="2">

<!-- README_CODE_PART code-4900 lines=12-22 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/dispatcher.picoc</span><span class="code-range">lines 12–22</span></div>

```c {lines:false}
    // Restores the remaining activation record while BAF still points to the process
    asm("LOADIN BAF CS 13");
    asm("LOADIN BAF DS 14");
    asm("LOADIN BAF IN1 8");
    asm("LOADIN BAF IN2 9");
    asm("LOADIN BAF ACC 10");
    asm("LOADIN BAF BAF 12");

    // Restores the saved program counter from the selected process's restored stack and resumes there
    asm("RTI");
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 896216eb-936c-4189-b487-1c03dbebb269 -->
<!-- SOURCE Pico-OS/README.md#65-dispatcher-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.5 Dispatcher function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4954 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4954:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.17%" /><col style="width:8.18%" /><col style="width:12.22%" /><col style="width:27.62%" /><col style="width:23.81%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>dispatcher_switch_from_context()</code></td><td>RTI; C return only for empty list</td><td>Save activation; select; restore process</td><td><ul><li><code>current_process()</code></li><li><code>dispatcher_start_next_process()</code></li></ul></td><td><ul><li><code>yield()</code></li><li><code>sleep()</code></li><li><code>waitpid()</code></li><li><code>read()</code></li><li><code>load()</code></li><li><code>timer_interrupt_process()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 049f0d35-f0bc-4faa-9046-441339ca97eb -->
<!-- SOURCE Pico-OS/README.md#7-blocking-wait-queues-signals-and-mutexes -->

<div class="eyebrow section-eyebrow">Section 07 · Overview</div>

# 7. Blocking, wait queues, signals, and mutexes

<SectionOverview section="7-blocking-wait-queues-signals-and-mutexes" />

---

<!-- SLIDE_ID ee2eb84b-fca3-4138-a2e3-270a4ef03bdb -->
<!-- SOURCE Pico-OS/README.md#71-wait-queues-and-pcb-links -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.1 Wait queues and PCB links (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4985 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-4985" data-code-part="1">

<!-- README_CODE_PART code-4985 lines=1-4 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/wait_queue.header</span><span class="code-range"></span></div>

```c {lines:false}
struct wait_queue {
    struct ProcessControlBlock *head;
    struct ProcessControlBlock *tail;
};
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c3b9d33c-4dff-4d29-9232-c91eb5d52b9b -->
<!-- SOURCE Pico-OS/README.md#71-wait-queues-and-pcb-links -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.1 Wait queues and PCB links (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4992 -->
<ReadmeVisual kind="table" :width="529" data-table-key="table-4992:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:18.87%" /><col style="width:15.77%" /><col style="width:65.37%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>head</code></span></td><td><ul><li>First blocked PCB</li><li>Empty → NULL</li></ul></td><td><ul><li><code>create_process()</code></li><li><code>initialize_terminal()</code></li><li><code>wait_queue_init()</code></li><li><code>initialize_dma()</code></li><li><code>enqueue_current_process_on_wait_queue()</code></li><li><code>enqueue_terminal_reader()</code></li><li><code>wakeup_wait_queue()</code></li><li><code>remove_from_wait_queue()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>tail</code></span></td><td><ul><li>Last blocked PCB</li><li>O(1) append; empty → NULL</li></ul></td><td><ul><li><code>create_process()</code></li><li><code>initialize_terminal()</code></li><li><code>wait_queue_init()</code></li><li><code>initialize_dma()</code></li><li><code>enqueue_current_process_on_wait_queue()</code></li><li><code>enqueue_terminal_reader()</code></li><li><code>wakeup_wait_queue()</code></li><li><code>remove_from_wait_queue()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 748188f1-e8cf-4333-b1a3-7a72a6188e7c -->
<!-- SOURCE Pico-OS/README.md#71-wait-queues-and-pcb-links -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.1 Wait queues and PCB links (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5007 -->
<ReadmeVisual kind="table" :width="1020" data-table-key="table-5007:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.28%" /><col style="width:24.28%" /><col style="width:38.44%" /></colgroup><thead><tr><th>Field / storage</th><th>Meaning</th><th>Used by and important relationships</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>WaitPidRequest.pid</code></span>, in <span class="source-link"><code>request</code></span> on the parent's userspace stack</td><td>Exact requested child PID</td><td><ul><li><code>waitpid()</code></li><li><code>wait_for_process_by_pid()</code></li><li><code>parent_pid</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>WaitPidRequest.status</code></span>, in the same stack-local request</td><td>Pointer to stack-local status result</td><td><ul><li><code>&amp;amp;status</code></li><li><code>waitpid()</code></li><li><code>waiting_status_ptr</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">wait_queue.head + wait_queue.tail</td><td>FIFO endpoints; O(1) append; NULL when empty</td><td><ul><li><code>enqueue_current_process_on_wait_queue()</code></li><li><code>wakeup_wait_queue()</code></li><li><code>remove_from_wait_queue()</code></li><li><code>wait_next</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.waiters</code></span>, embedded in each kernel-heap PCB</td><td>Other processes waiting for this child</td><td><ul><li><code>create_process()</code></li><li><code>&amp;amp;child-&amp;gt;waiters</code></li><li><code>sleep_on_wait_queue()</code></li><li><code>notify_process_stopped()</code></li><li><code>wake_parent_waiting_for_process()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.waiting_status_ptr</code></span>, pointer stored in the waiting parent's kernel-heap PCB</td><td>Parent's suspended stack-local status</td><td><ul><li><code>NULL</code></li><li><code>create_process()</code></li><li><code>WaitPidRequest.status</code></li><li><code>wait_for_process_by_pid()</code></li><li><code>wake_parent_waiting_for_process()</code></li><li><code>notify_process_stopped()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.waiting_queue_ptr</code></span>, pointer stored in every kernel-heap PCB</td><td>Queue containing this PCB or NULL</td><td><ul><li><code>remove_process()</code></li><li><code>remove_from_wait_queue()</code></li></ul></td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.wait_next</code></span>, embedded in every kernel-heap PCB</td><td>Intrusive successor; one active queue</td><td><ul><li><code>NULL</code></li><li><code>create_process()</code></li><li><code>enqueue_current_process_on_wait_queue()</code></li><li><code>remove_from_wait_queue()</code></li><li><code>next</code></li></ul></td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.state</code></span> and <span class="source-link"><code>ProcessControlBlock.stopped_from_state</code></span>, in the PCB</td><td>BLOCKED/runnable/STOPPED + completed wait</td><td><ul><li><code>state</code></li><li><code>BLOCKED</code></li><li><code>wakeup_wait_queue()</code></li><li><code>READY</code></li><li><code>state == STOPPED</code></li><li><code>stopped_from_state</code></li><li><code>continue_process()</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><ul><li>Child PCB: parent_pid</li><li>exit_status + stop_signal</li></ul></td><td>Parent validation + retained child state</td><td><ul><li><code>create_process()</code></li><li><code>wait_for_process_by_pid()</code></li><li><code>exit_status</code></li><li><code>stop_signal</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 7311ad58-2ead-4f75-9f64-735b85e96c9c -->
<!-- SOURCE Pico-OS/README.md#71-wait-queues-and-pcb-links -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.1 Wait queues and PCB links (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5041 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/wait-queue-pcb-links.svg" alt="7.1 Wait queues and PCB links" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID a3c6ec64-eca2-4a39-96ab-203551c588a4 -->
<!-- SOURCE Pico-OS/README.md#7111-from-blocking-to-resumed-execution -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.1 Wait queues and PCB links · 7.1.1 Blocking with `sleep` and waking with `wakeup`

## 7.1.1.1 From blocking to resumed execution (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5090 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/blocking-cycle.svg" alt="Waiting cycle: sleep() joins a wait queue with PCB state BLOCKED, wakeup() removes the waiter and sets state READY, then the scheduler selects the process and the dispatcher resumes it with state RUNNING." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 1bb88a1d-04ca-42de-afb2-b3cb95326ac7 -->
<!-- SOURCE Pico-OS/README.md#7111-from-blocking-to-resumed-execution -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.1 Wait queues and PCB links · 7.1.1 Blocking with `sleep` and waking with `wakeup`

## 7.1.1.1 From blocking to resumed execution (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5096 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5096:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.61%" /><col style="width:37.75%" /><col style="width:28.63%" /></colgroup><thead><tr><th>Blocking event</th><th>Wait queue</th><th>Wakeup event</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">sleep(queue)</td><td>Caller-supplied <span class="source-link"><code>wait_queue</code></span></td><td>wakeup(queue)</td></tr>
<tr data-source-row="2"><td class="table-key">Parent waitpid(child)</td><td>Child PCB waiters</td><td>Child exit or termination</td></tr>
<tr data-source-row="3"><td class="table-key">Contended mutex_lock</td><td>Mutex waiters</td><td>Mutex unlock</td></tr>
<tr data-source-row="4"><td class="table-key">Terminal read without input</td><td><span class="source-link"><code>Terminal.input_waiters</code></span></td><td>UART byte arrival</td></tr>
<tr data-source-row="5"><td class="table-key">DMA-backed process load</td><td>Global <span class="source-link"><code>dma_waiters</code></span></td><td>DMA completion</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0a747ec2-be9b-434b-869b-49316c9b40ea -->
<!-- SOURCE Pico-OS/README.md#7121-recording-termination-status -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.1 Wait queues and PCB links · 7.1.2 Child waiting with `waitpid`

## 7.1.2.1 Recording termination status

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5185 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-termination-status.svg" alt="SRAM layout with PCB A for the parent and PCB B for its child, Process Payload A with the parent's User Process Heap and expanded User Process Stack, showing WaitPidRequest.status and PCB A's waiting_status_ptr pointing to the separate int status cell that receives 7" />

</ReadmeVisual>

</div>
<aside class="context-note"><b>Unix: reaping</b><span>Collect status; remove child · <strong>PicoOS:</strong> no reparenting to init</span></aside>

</div>

---

<!-- SLIDE_ID d57d9311-c085-45fc-8246-3227b3c8555a -->
<!-- SOURCE Pico-OS/README.md#7122-parent-collection-and-final-removal -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.1 Wait queues and PCB links · 7.1.2 Child waiting with `waitpid`

## 7.1.2.2 Parent collection and final removal

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5304 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5304:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:34.20%" /><col style="width:27.30%" /><col style="width:38.50%" /></colgroup><thead><tr><th>Lifecycle order</th><th>Status delivery</th><th>PCB removal</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Parent is already waiting in <span class="source-link"><code>waitpid()</code></span></td><td>Write exit status; wake waiting parent</td><td><code>terminate_process()</code> removes PCB before dispatch</td></tr>
<tr data-source-row="2"><td class="table-key">Child exits before the parent waits</td><td>Retain <code>exit_status</code>; mark <strong>ZOMBIE</strong></td><td>Later <code>wait_for_process_by_pid()</code> collects + removes PCB</td></tr>
<tr data-source-row="3"><td class="table-key">No parent exists</td><td>No parent can collect status</td><td><code>terminate_process()</code> removes PCB immediately</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 07c8ffee-61bc-4ad7-b9ed-ed1910ca06ad -->
<!-- SOURCE Pico-OS/README.md#713-wait-queue-function-reference -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.1 Wait queues and PCB links

## 7.1.3 Wait queue function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked" style="--readme-rows:minmax(0, 287fr) minmax(0, 401fr)">

<!-- README_ASSET table-5322 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5322:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.23%" /><col style="width:49.63%" /><col style="width:33.14%" /></colgroup><thead><tr><th>Public/library operation</th><th>Syscall and kernel call path</th><th>Completion path</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>sleep(wq)</code></span></td><td><span class="source-link"><code>SYSCALL_SLEEP</code></span> → <span class="source-link"><code>handle_syscall()</code></span> → <span class="source-link"><code>sleep_on_wait_queue(wq, caller_context)</code></span> → <span class="source-link"><code>enqueue_current_process_on_wait_queue(wq)</code></span></td><td>An event owner reaches <span class="source-link"><code>wakeup_wait_queue(wq)</code></span>, often through <span class="source-link"><code>wakeup(wq)</code></span>.</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>wakeup(wq)</code></span></td><td><span class="source-link"><code>SYSCALL_WAKEUP</code></span> → <span class="source-link"><code>handle_syscall()</code></span> → <span class="source-link"><code>wakeup_wait_queue(wq)</code></span></td><td>Clear links; READY or completed beneath STOPPED</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>waitpid(pid)</code></span></td><td>WAITPID → validate child → sleep_on_wait_queue</td><td><ul><li>Child exits/stops → status write</li><li>Same FIFO wakeup primitive</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5331 -->
<ReadmeVisual kind="table" :width="1122.1999999999998" data-table-key="table-5331:1,2,3,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.81%" /><col style="width:9.62%" /><col style="width:8.16%" /><col style="width:30.81%" /><col style="width:20.58%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>wait_for_process_by_pid()</code></td><td>Completion flag; userspace IN2 = 1</td><td>Validate child; collect or block</td><td><ul><li><code>current_process()</code></li><li><code>find_process_by_pid()</code></li><li><code>remove_process()</code></li><li><code>sleep_on_wait_queue()</code></li></ul></td><td><ul><li><code>waitpid()</code></li><li><code>SYSCALL_WAITPID</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>sleep_on_wait_queue()</code></td><td>No value; later resumes via RTI</td><td>Enqueue caller; BLOCKED; dispatch</td><td><ul><li><code>enqueue_current_process_on_wait_queue()</code></li><li><code>dispatcher_switch_from_context()</code></li></ul></td><td><ul><li><code>sleep()</code></li><li><code>SYSCALL_SLEEP</code></li><li><code>waitpid()</code></li><li><code>wait_for_process_by_pid()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>wakeup_wait_queue()</code></td><td>true if woke; false if empty</td><td>Wake FIFO head</td><td>None</td><td><ul><li><code>wakeup()</code></li><li><code>SYSCALL_WAKEUP</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>enqueue_current_process_on_wait_queue()</code></td><td>No value</td><td>Link current PCB into FIFO</td><td><code>current_process()</code></td><td><ul><li><code>sleep()</code></li><li><code>waitpid()</code></li><li><code>sleep_on_wait_queue()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 6bf71b72-2720-40cf-bd7c-7ae316d60733 -->
<!-- SOURCE Pico-OS/README.md#721-supported-signals-and-fixed-actions -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.2 Process signals

## 7.2.1 Supported signals and fixed actions (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5355 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5355:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.68%" /><col style="width:21.16%" /><col style="width:47.16%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>pending_termination_signal</code></span></td><td>Deferred SIGINT/SIGKILL</td><td><ul><li><code>create_process()</code></li><li><code>send_signal_to_process()</code></li><li><code>prepare_process_termination()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>stop_signal</code></span></td><td>Current stop signal</td><td><ul><li><code>create_process()</code></li><li><code>stop_process()</code></li><li><code>continue_process()</code></li><li><code>notify_process_stopped()</code></li><li><code>wait_for_process_by_pid()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>stopped_from_state</code></span></td><td>State reconsidered on SIGCONT</td><td><ul><li><code>READY</code></li><li><code>create_process()</code></li><li><code>stop_process()</code></li><li><code>wakeup_wait_queue()</code></li><li><code>resume_pending_terminal_read()</code></li><li><code>continue_process()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>parent_death_signal</code></span></td><td>Signal delivered when parent dies</td><td><ul><li><code>create_process()</code></li><li><code>set_parent_death_signal()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>pending_terminal_read_buffer</code></span>, <span class="source-link"><code>pending_terminal_read_count</code></span></td><td>Retained terminal buffer + count</td><td><ul><li><code>NULL</code></li><li><code>create_process()</code></li><li><code>begin_terminal_read()</code></li><li><code>complete_pending_terminal_read()</code></li><li><code>resume_pending_terminal_read()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>POSIX / Linux null signal</b><span><strong>Signal 0:</strong> existence + permission check; no delivery · <strong>PicoOS:</strong> no permissions/groups; rejects zombies</span></aside>

</div>

---

<!-- SLIDE_ID 1dc45d9c-4a04-40d3-bc7a-3fc695fe320f -->
<!-- SOURCE Pico-OS/README.md#721-supported-signals-and-fixed-actions -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.2 Process signals

## 7.2.1 Supported signals and fixed actions (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5369 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5369:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:15.79%" /><col style="width:19.55%" /><col style="width:35.17%" /><col style="width:29.50%" /></colgroup><thead><tr><th>Number</th><th>Name</th><th>Kernel action</th><th>Reported status/state</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td>Probe</td><td>Validates that a non-zombie PID exists</td><td>No change</td></tr>
<tr data-source-row="2"><td class="table-key">2</td><td><span class="source-link"><code>SIGINT</code></span></td><td>Terminates the target</td><td>Exit status 130</td></tr>
<tr data-source-row="3"><td class="table-key">9</td><td><span class="source-link"><code>SIGKILL</code></span></td><td>Terminates the target</td><td>Exit status 137</td></tr>
<tr data-source-row="4"><td class="table-key">18</td><td><span class="source-link"><code>SIGCONT</code></span></td><td>Resumes a stopped target</td><td>READY / original BLOCKED wait</td></tr>
<tr data-source-row="5"><td class="table-key">19</td><td><span class="source-link"><code>SIGSTOP</code></span></td><td>Stops the target</td><td><ul><li>STOPPED</li><li>Status: 147</li></ul></td></tr>
<tr data-source-row="6"><td class="table-key">20</td><td><span class="source-link"><code>SIGTSTP</code></span></td><td>Stops the target</td><td><ul><li>STOPPED</li><li>Status: 148</li></ul></td></tr>
<tr data-source-row="7"><td class="table-key">21</td><td><span class="source-link"><code>SIGTTIN</code></span></td><td>Stop background terminal reader</td><td><ul><li>STOPPED</li><li>Status: 149</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 053c1da5-d394-49ca-8c0e-deeb522db162 -->
<!-- SOURCE Pico-OS/README.md#725-signal-function-reference -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.2 Process signals

## 7.2.5 Signal function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5437 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5437:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.79%" /><col style="width:10.81%" /><col style="width:16.61%" /><col style="width:33.23%" /><col style="width:11.57%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>send_signal_by_pid()</code></td><td>0 / −1</td><td>Validate PID; probe or deliver</td><td><ul><li><code>signal_number_is_valid()</code></li><li><code>find_process_by_pid()</code></li><li><code>send_signal_to_process()</code></li></ul></td><td><code>kill()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>set_parent_death_signal()</code></td><td>0 / −1</td><td>Configure signal on parent death</td><td><ul><li><code>signal_number_is_valid()</code></li><li><code>current_process()</code></li></ul></td><td><code>prctl()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Unix signal handling</b><span><strong>SIGINT/TSTP/TTIN:</strong> catch or ignore · <strong>SIGKILL/STOP:</strong> cannot catch · <strong>PicoOS:</strong> all actions fixed</span></aside>

</div>

---

<!-- SLIDE_ID 837b3982-4b8b-4b02-afeb-90f5c62ec5f1 -->
<!-- SOURCE Pico-OS/README.md#73-mutexes-with-test-and-set-and-wait-queues -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.3 Mutexes with test-and-set and wait queues (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 100fr) minmax(0, 270fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-5466 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-5466" data-code-part="1">

<!-- README_CODE_PART code-5466 lines=1-4 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/mutex/mutex.header</span><span class="code-range"></span></div>

```c {lines:false}
struct mutex {
    bool lock;
    struct wait_queue waiters;
};
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-5479 -->
<div class="code-columns" data-column-key="code:code-5479" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:2.2048780487804875">

<ReadmeVisual kind="code" :width="349.6" data-code-source="code-5479" data-code-part="1">

<!-- README_CODE_PART code-5479 lines=1-14 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/mutex/mutex.picoc</span><span class="code-range">lines 1–14</span></div>

```c {lines:false}
bool testset(bool *lock_addr) {
    int old;

    asm("LOADIN BAF IN2 3");
    asm("TSL IN2 ACC 0");
    asm("STOREIN BAF ACC 0");
    return old;
}

void mutex_init(struct mutex *m) {
    m->lock = false;
    wait_queue_init(&(m->waiters));
    return;
}
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="349.6" data-code-source="code-5479" data-code-part="2">

<!-- README_CODE_PART code-5479 lines=15-27 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/mutex/mutex.picoc</span><span class="code-range">lines 15–27</span></div>

```c {lines:false}

void mutex_lock(struct mutex *m) {
    while (testset(&(m->lock))) {
        sleep(&(m->waiters));
    }
    return;
}

void mutex_unlock(struct mutex *m) {
    m->lock = false;
    wakeup(&(m->waiters));
    return;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

</div>

---

<!-- SLIDE_ID 88497705-af19-49fe-a160-b5c50853d5d3 -->
<!-- SOURCE Pico-OS/README.md#73-mutexes-with-test-and-set-and-wait-queues -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.3 Mutexes with test-and-set and wait queues (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5523 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/mutex-lock-wakeup.svg" alt="7.3 Mutexes with test-and-set and wait queues" />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 13bb5e4a-484f-4859-b91f-5e4c3df1531c -->
<!-- SOURCE Pico-OS/README.md#73-mutexes-with-test-and-set-and-wait-queues -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.3 Mutexes with test-and-set and wait queues (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-5528+table-5533" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr);">

<!-- README_ASSET table-5528 -->
<ReadmeVisual kind="table" :width="540" data-table-key="table-5528:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.24%" /><col style="width:36.26%" /><col style="width:41.49%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>lock</code></span></td><td>Unlocked=false; TSL returns old, stores true</td><td><ul><li><code>mutex_init()</code></li><li><code>testset()</code></li><li><code>mutex_lock()</code></li><li><code>mutex_unlock()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>waiters</code></span></td><td>Embedded FIFO of waiting parents</td><td><ul><li><code>mutex_init()</code></li><li><code>wait_queue_init()</code></li><li><code>sleep()</code></li><li><code>wakeup()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5533 -->
<ReadmeVisual kind="table" :width="960" data-table-key="table-5533:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:29.98%" /><col style="width:45.89%" /><col style="width:24.13%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>testset()</code></td><td>Atomic old value; store 1</td><td>TSL; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>mutex_init()</code></td><td>Clear lock + initialize wait queue</td><td>None</td></tr>
<tr data-source-row="3"><td class="table-key"><code>mutex_lock()</code></td><td>Acquire; sleep/retry on contention</td><td><code>SLEEP</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>mutex_unlock()</code></td><td>Clear lock; wake one contender</td><td><code>WAKEUP</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 735cbbbc-6449-47ea-8646-aa8a0e6537e0 -->
<!-- SOURCE Pico-OS/README.md#8-terminal-file-descriptors-and-host-filesystem -->

<div class="eyebrow section-eyebrow">Section 08 · Overview</div>

# 8. Terminal, file descriptors, and host filesystem

<SectionOverview section="8-terminal-file-descriptors-and-host-filesystem" />

---

<!-- SLIDE_ID b1b6b443-bff7-4da4-b0c8-634df08b043e -->
<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5567 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-file-descriptors.svg" alt="SRAM layout with an expanded Kernel Heap showing PCB 1 pointing to a separately allocated FileDescriptorTable, its entries pointer reaching a single eight-element array, and descriptor 3 pointing to a separately allocated path string" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Open:</strong> lowest free slot 0–4; exhaustion −1</li>
<li><strong>Slots 5–7:</strong> shell backups; explicit dup2 allowed</li></ul></div>
<aside class="context-note"><b>Unix comparison</b><ul><li><strong>Unix:</strong> shared open-file descriptions</li>
<li><strong>PicoOS:</strong> independent copied entries/offsets</li></ul></aside>

</div>

---

<!-- SLIDE_ID 9ec4de6e-9678-471f-9cdc-0a8e8a545ea2 -->
<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5580 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5580:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.14%" /><col style="width:38.71%" /><col style="width:35.15%" /></colgroup><thead><tr><th>Index</th><th>Initial or conventional use</th><th>Availability to open()</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td>Standard input</td><td>Reused if closed</td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td>Standard output</td><td>Reused if closed</td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td>Standard error</td><td>Reused if closed</td></tr>
<tr data-source-row="4"><td class="table-key">3</td><td>General inherited slot</td><td>Available</td></tr>
<tr data-source-row="5"><td class="table-key">4</td><td>General inherited slot</td><td>Available</td></tr>
<tr data-source-row="6"><td class="table-key">5</td><td>Shell scratch</td><td>open skips slot</td></tr>
<tr data-source-row="7"><td class="table-key">6</td><td>Shell scratch</td><td>open skips slot</td></tr>
<tr data-source-row="8"><td class="table-key">7</td><td>Shell scratch</td><td>open skips slot</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>STDERR kind:</strong> preserved when copied to other index</li>
<li><strong>No pipe kind:</strong> pipelines use files</li></ul></div>

</div>

---

<!-- SLIDE_ID 8fd417e9-a6d4-4698-99ae-743cdf2f4ad5 -->
<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5595 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/file-descriptor-inheritance.svg" alt="8.1 Per-process file-descriptor table" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><div class="readme-item"><strong>Zombie:</strong> retains descriptor allocations until collection</div></div>

</div>

---

<!-- SLIDE_ID 80a6f284-f5b9-4e56-ae5b-2e83ac701c3e -->
<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked" style="--readme-rows:minmax(0, 251fr) minmax(0, 341fr)">

<!-- README_ASSET table-5606 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5606:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.19%" /><col style="width:31.17%" /><col style="width:41.64%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>FileDescriptor.kind</code></span></td><td>FREE/STDIN/STDOUT/STDERR/FILE identity</td><td><ul><li><code>initialize_file_descriptor()</code></li><li><code>inherit_file_descriptors()</code></li><li><code>read_file_descriptor()</code></li><li><code>write_file_descriptor()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>FileDescriptor.flags</code></span></td><td>Access + create/truncate/append bits</td><td><ul><li><code>initialize_file_descriptor()</code></li><li><code>open_file_descriptor()</code></li><li><code>file_descriptor_can_read()</code></li><li><code>file_descriptor_can_write()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>FileDescriptor.offset</code></span></td><td>Independent logical byte position</td><td><ul><li><code>initialize_file_descriptor()</code></li><li><code>read_regular_file()</code></li><li><code>write_file_descriptor()</code></li><li><code>seek_file_descriptor()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>FileDescriptor.path</code></span></td><td>Owned normalized path or NULL</td><td><ul><li><code>NULL</code></li><li><code>initialize_file_descriptor()</code></li><li><code>create_file_descriptor_table()</code></li><li><code>copy_file_descriptor()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>FileDescriptorTable.entries</code></span></td><td>Owned array of eight descriptors</td><td><ul><li><code>create_file_descriptor_table()</code></li><li><code>inherit_file_descriptors()</code></li><li><code>destroy_file_descriptor_table()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5617 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5617:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.04%" /><col style="width:25.64%" /><col style="width:23.75%" /><col style="width:31.56%" /></colgroup><thead><tr><th>Descriptor case</th><th>kind</th><th>path</th><th>Read/write behavior</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Initial standard input</td><td><span class="source-link"><code>FILE_DESCRIPTOR_STDIN</code></span></td><td><code>/device/terminal.dev</code></td><td>Ring input; may block</td></tr>
<tr data-source-row="2"><td class="table-key">Initial standard output</td><td><span class="source-link"><code>FILE_DESCRIPTOR_STDOUT</code></span></td><td><code>/device/terminal.dev</code></td><td>UART → stdout</td></tr>
<tr data-source-row="3"><td class="table-key">Initial standard error</td><td><span class="source-link"><code>FILE_DESCRIPTOR_STDERR</code></span></td><td><code>/device/terminal.dev</code></td><td>Select stderr; restore stdout</td></tr>
<tr data-source-row="4"><td class="table-key">Opened regular file</td><td><span class="source-link"><code>FILE_DESCRIPTOR_FILE</code></span></td><td>Normalized absolute path</td><td>Flags + saved offset; host requests</td></tr>
<tr data-source-row="5"><td class="table-key">Explicitly opened terminal device</td><td><span class="source-link"><code>FILE_DESCRIPTOR_FILE</code></span></td><td><code>/device/terminal.dev</code></td><td>Ring reads; UART stdout writes</td></tr>
<tr data-source-row="6"><td class="table-key">Explicitly opened null device</td><td><span class="source-link"><code>FILE_DESCRIPTOR_FILE</code></span></td><td><code>/device/null.dev</code></td><td>Read → 0; write → count</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f43397f7-3fb6-4d41-ad76-d8b7dc266bcc -->
<!-- SOURCE Pico-OS/README.md#82-global-terminal-input-buffer -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.2 Global terminal input buffer (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-5654 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-terminal-input-buffer.svg" alt="SRAM layout with the global Terminal embedded in kernel .data, containing its 128-cell input ring, integer indices, count, and reader queue. The queue's head and tail point to PCB 1 in a Kernel Heap payload after Block Header A, and waiting_queue_ptr points back to the embedded queue" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>128 cells:</strong> all usable; count distinguishes full/empty</li>
<li><strong>Full ring:</strong> drop incoming byte; no flow control</li></ul></div>

</div>

---

<!-- SLIDE_ID 29d5e48c-160b-4537-9cf5-e075e44a6f34 -->
<!-- SOURCE Pico-OS/README.md#82-global-terminal-input-buffer -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.2 Global terminal input buffer (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5658 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5658:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.76%" /><col style="width:23.38%" /><col style="width:48.86%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>Terminal.input_buffer</code></span></td><td>Embedded receive ring</td><td><ul><li><code>enqueue_terminal_byte()</code></li><li><code>pop_terminal_byte()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>Terminal.input_head</code></span></td><td>Next unread byte</td><td><ul><li><code>initialize_terminal()</code></li><li><code>pop_terminal_byte()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>Terminal.input_tail</code></span></td><td>Next insertion cell</td><td><ul><li><code>initialize_terminal()</code></li><li><code>enqueue_terminal_byte()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>Terminal.input_count</code></span></td><td>Occupied count; distinguishes full/empty</td><td><ul><li><code>initialize_terminal()</code></li><li><code>enqueue_terminal_byte()</code></li><li><code>copy_terminal_bytes()</code></li><li><code>pop_terminal_byte()</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>Terminal.input_waiters</code></span></td><td>Foreground readers awaiting input</td><td><ul><li><code>initialize_terminal()</code></li><li><code>begin_terminal_read()</code></li><li><code>resume_pending_terminal_read()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Read:</strong> available bytes; need not fill count</li>
<li><strong>Accessor:</strong> exposes object without usable extern globals</li></ul></div>

</div>

---

<!-- SLIDE_ID 7d57f9a5-c4c5-46cb-9091-e3d85b3f2d55 -->
<!-- SOURCE Pico-OS/README.md#83-blocking-and-completing-terminal-reads -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.3 Blocking and completing terminal reads (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-5713+code-5725" style="--readme-columns:minmax(0, 46fr) minmax(0, 54fr);">

<!-- README_ASSET code-5713 -->
<ReadmeVisual kind="code" :width="444.3259259259258" data-code-source="code-5713" data-code-part="1">

<!-- README_CODE_PART code-5713 lines=1-6 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>User terminal-read example</span><span class="code-range"></span></div>

```c {lines:false}
int main(void) {
    // ...
    char buffer[16];
    read(STDIN_FILENO, buffer, 16);
    // ...
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-5725 -->
<ReadmeVisual kind="code" :width="521.5999999999999" data-code-source="code-5725" data-code-part="1">

<!-- README_CODE_PART code-5725 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/unistd/io.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int read(int file_descriptor, void *buffer, int count) {
    struct IoRequest request;
    // ...
    request.file_descriptor = file_descriptor;
    request.buffer = (char *)buffer;
    request.count = count;
    // ...
    request.transferred = 0;
    request.complete = false;
    // ...
}
```

</div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>UART mask:</strong> atomic buffer check + queue insertion</li>
<li><strong>PCB retains:</strong> destination + count; not IoRequest</li></ul></div>

</div>

---

<!-- SLIDE_ID f9c3fc8f-0a29-419c-b33f-1e9bf2392cec -->
<!-- SOURCE Pico-OS/README.md#83-blocking-and-completing-terminal-reads -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.3 Blocking and completing terminal reads (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-5743+code-5763" style="--readme-columns:minmax(0, 43fr) minmax(0, 57fr);">

<!-- README_ASSET code-5743 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-5743" data-code-part="1">

<!-- README_CODE_PART code-5743 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/filesystem/filesystem.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int read_file_descriptor(struct IoRequest *request, int *caller_context) {
    // ...
    if (is_terminal_device_path(descriptor->path)) {
        request->complete = true;
        return begin_terminal_read(
            kernel_terminal(),
            request->buffer + request->transferred,
            request->count - request->transferred,
            caller_context
        );
    }
    // ...
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-5763 -->
<ReadmeVisual kind="code" :width="742.3255813953489" data-code-source="code-5763" data-code-part="1">

<!-- README_CODE_PART code-5763 lines=1-19 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/filesystem/terminal.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int begin_terminal_read(
    struct Terminal *terminal,
    char *buffer,
    int count,
    int *caller_context
) {
    struct ProcessControlBlock *process = current_process();
    // ...
    process->pending_terminal_read_buffer = buffer;
    process->pending_terminal_read_count = count;
    enqueue_current_process_on_wait_queue(&(terminal->input_waiters));
    interrupt_controller_assign_device(
        INTERRUPT_DEVICE_UART,
        uart_interrupt_index,
        uart_interrupt_priority
    );
    dispatcher_switch_from_context(caller_context);
    // ...
}
```

</div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>One input owner:</strong> one active queued terminal read</li>
<li><strong>Stopped read:</strong> detached; buffer/count retained</li></ul></div>

</div>

---

<!-- SLIDE_ID 4962f2d5-c05d-4f48-b108-fa72b64036c6 -->
<!-- SOURCE Pico-OS/README.md#83-blocking-and-completing-terminal-reads -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.3 Blocking and completing terminal reads (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns prose-with-code" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr)"><div class="readme-list prose-summary"><div class="readme-item"><strong>Restored syscall:</strong> saved count; no application retry</div></div>
<!-- README_ASSET code-5789 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-5789" data-code-part="1">

<!-- README_CODE_PART code-5789 lines=1-18 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/filesystem/terminal.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void complete_pending_terminal_read(
    struct ProcessControlBlock *process,
    struct Terminal *terminal
) {
    int result;
    // ...
    result = copy_terminal_bytes(
        terminal,
        process->pending_terminal_read_buffer,
        process->pending_terminal_read_count
    );

    process->activation.in2 = result;
    process->pending_terminal_read_buffer = NULL;
    process->pending_terminal_read_count = 0;
    remove_from_wait_queue(process);
    process->state = PROCESS_STATE_READY;
}
```

</div>

</ReadmeVisual></div>

</div>

---

<!-- SLIDE_ID 3b561c36-b8a7-41d9-a50b-8efc8a02205e -->
<!-- SOURCE Pico-OS/README.md#84-foreground-input-ownership-and-terminal-generated-signals -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.4 Foreground input ownership and terminal-generated signals (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 365fr) minmax(0, 86fr)">

<div class="readme-artifacts composition-panel layout-stacked" style="--readme-rows:minmax(0, 214fr) minmax(0, 208fr)">

<!-- README_ASSET table-5820 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5820:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.80%" /><col style="width:34.20%" /><col style="width:20.19%" /><col style="width:21.81%" /></colgroup><thead><tr><th>Situation</th><th>Saved foreground_process_target value</th><th>Ordinary input</th><th>Ctrl+C / Ctrl+Z</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Before shell registration</td><td><code>0</code></td><td>Buffer; fallback completion target</td><td>Consume; no signal</td></tr>
<tr data-source-row="2"><td class="table-key">Shell prompt, including while background work runs</td><td>Negative shell process ID</td><td>Shell input</td><td>Consume; protect shell</td></tr>
<tr data-source-row="3"><td class="table-key">Foreground child / fg</td><td>Positive child process ID</td><td>Child input</td><td>SIGINT / SIGTSTP</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5831 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5831:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.65%" /><col style="width:41.11%" /><col style="width:36.24%" /></colgroup><thead><tr><th>Input byte</th><th>Detection and action</th><th>Buffered?</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">3 (<code>Ctrl+C</code>)</td><td>Foreground SIGINT</td><td>Never buffered</td></tr>
<tr data-source-row="2"><td class="table-key">26 (<code>Ctrl+Z</code>)</td><td>Foreground SIGTSTP</td><td>Never buffered</td></tr>
<tr data-source-row="3"><td class="table-key">4 (<code>Ctrl+D</code>)</td><td>Ordinary ring byte; user handles EOF</td><td>Stored; dropped only when full</td></tr>
<tr data-source-row="4"><td class="table-key">Any other byte</td><td>Enqueue; complete pending read</td><td>Stored unless full; waiter may consume</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-5864 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5864:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.08%" /><col style="width:10.32%" /><col style="width:13.31%" /><col style="width:24.50%" /><col style="width:25.80%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>set_foreground_process()</code></td><td>0 / −1</td><td>Select shell or child input owner</td><td><ul><li><code>current_process()</code></li><li><code>find_process_by_pid()</code></li></ul></td><td><code>set_foreground_process()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID fbc27ec9-38f9-4a7a-b116-8323816941e8 -->
<!-- SOURCE Pico-OS/README.md#84-foreground-input-ownership-and-terminal-generated-signals -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.4 Foreground input ownership and terminal-generated signals (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>set_foreground_process(0):</strong> store negative caller PID</li>
<li><strong>Nonowner read:</strong> SIGTTIN even with buffered input</li>
<li><strong>fg:</strong> ownership before SIGCONT</li>
<li><strong>bg:</strong> pending terminal reader stays stopped</li>
<li><strong>Ctrl+D:</strong> cat convention; kernel stores byte 4</li></ul></div>

</div>

---

<!-- SLIDE_ID f72c28a4-247e-4eae-bd8c-e30a7406d742 -->
<!-- SOURCE Pico-OS/README.md#85-virtual-terminal-and-null-device-paths -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.5 Virtual terminal and null-device paths

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5885 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5885:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.24%" /><col style="width:22.42%" /><col style="width:52.35%" /></colgroup><thead><tr><th>Device path</th><th>Role</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>/device/terminal.dev</code></td><td>Global ring input; UART output; no seek</td><td><ul><li><code>create_file_descriptor_table()</code></li><li><code>open_file_descriptor()</code></li><li><code>read_file_descriptor()</code></li><li><code>write_file_descriptor()</code></li><li><code>seek_file_descriptor()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>/device/null.dev</code></td><td>Immediate EOF; discard writes; no seek</td><td><ul><li><code>open_file_descriptor()</code></li><li><code>read_file_descriptor()</code></li><li><code>write_file_descriptor()</code></li><li><code>seek_file_descriptor()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Exact normalized paths:</strong> select kernel behavior</li>
<li><strong>Marker contents:</strong> no device state</li>
<li><strong>Other /device paths:</strong> ordinary host files</li>
<li><strong>Null write:</strong> count + logical offset; no UART</li></ul></div>
<aside class="context-note"><b>Device inode analogy</b><ul><li><strong>Conventional OS:</strong> special device inode</li>
<li><strong>PicoOS:</strong> exact path selects virtual behavior</li></ul></aside>

</div>

---

<!-- SLIDE_ID 27948d7a-be13-4e04-bd3d-d050209f1897 -->
<!-- SOURCE Pico-OS/README.md#86-file-descriptor-creation-inheritance-duplication-and-cleanup -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.6 File-descriptor creation, inheritance, duplication, and cleanup

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5900 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5900:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.86%" /><col style="width:9.71%" /><col style="width:15.94%" /><col style="width:35.26%" /><col style="width:11.23%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>close_file_descriptor()</code></td><td>0 / −1</td><td>Release path; reset entry</td><td><ul><li><code>current_process()</code></li><li><code>file_descriptor_is_valid()</code></li><li><code>kfree()</code></li><li><code>initialize_file_descriptor()</code></li></ul></td><td><ul><li><code>close()</code></li><li><code>fclose()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>duplicate_file_descriptor()</code></td><td>Target FD / −1</td><td>Replace target with independent copy</td><td><ul><li><code>current_process()</code></li><li><code>file_descriptor_is_valid()</code></li><li><code>copy_file_descriptor()</code></li></ul></td><td><code>dup2()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f4699dc0-c04d-4501-8296-d9f7f647244c -->
<!-- SOURCE Pico-OS/README.md#88-opening-reading-writing-and-seeking -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.8 Opening, reading, writing, and seeking (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5937 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5937:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.74%" /><col style="width:21.20%" /><col style="width:56.06%" /></colgroup><thead><tr><th>Flag</th><th>Value</th><th>Meaning in OpenRequest.flags</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>O_RDONLY</code></span></td><td>0</td><td>Permit reads</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>O_WRONLY</code></span></td><td>1</td><td>Permit writes</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>O_RDWR</code></span></td><td>2</td><td>Read + write; O_ACCMODE extracts access bits</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>O_CREAT</code></span></td><td>64</td><td>Allow a missing regular path to be created</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>O_TRUNC</code></span></td><td>512</td><td>With writable access, create/empty the regular host file during open</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>O_APPEND</code></span></td><td>1024</td><td>Every write uses current file end</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e36757dd-db92-4a3b-8b84-61a05cd997ff -->
<!-- SOURCE Pico-OS/README.md#88-opening-reading-writing-and-seeking -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.8 Opening, reading, writing, and seeking (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5959 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5959:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:16.06%" /><col style="width:18.39%" /><col style="width:16.85%" /><col style="width:24.08%" /><col style="width:24.62%" /></colgroup><thead><tr><th>Operation or mode</th><th>Descriptor flags/state</th><th>Offset handling</th><th>PicoOS functions</th><th>Host requests</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Open existing without truncation</td><td>Any valid access mode, no <span class="source-link"><code>O_TRUNC</code></span></td><td>Initializes 0</td><td><span class="source-link"><code>open_file_descriptor()</code></span>, <span class="source-link"><code>file_exists()</code></span></td><td>file-size verifies existing file</td></tr>
<tr data-source-row="2"><td class="table-key">Create missing file</td><td><span class="source-link"><code>O_CREAT</code></span> with any valid access mode</td><td>Initializes 0</td><td><span class="source-link"><code>open_file_descriptor()</code></span></td><td>Failed file-size → write → restore stdout</td></tr>
<tr data-source-row="3"><td class="table-key">Truncate/overwrite open</td><td>Writable mode plus <span class="source-link"><code>O_TRUNC</code></span>, usually with <span class="source-link"><code>O_CREAT</code></span></td><td>Initializes 0</td><td><span class="source-link"><code>open_file_descriptor()</code></span></td><td>write creates/truncates; restore stdout</td></tr>
<tr data-source-row="4"><td class="table-key">Read</td><td>Readable descriptor</td><td>Starts at saved offset, advances by returned bytes</td><td><span class="source-link"><code>read_file_descriptor()</code></span>, <span class="source-link"><code>read_regular_file()</code></span></td><td>read-range; ≤1 KiB/syscall; 0 → EOF</td></tr>
<tr data-source-row="5"><td class="table-key">Ordinary overwrite/write</td><td>Writable regular descriptor without <span class="source-link"><code>O_APPEND</code></span></td><td>Uses saved offset, advances by requested count</td><td><span class="source-link"><code>write_file_descriptor()</code></span>, <span class="source-link"><code>write_uart_bytes()</code></span></td><td>write-at; optional literal-output; restore stdout</td></tr>
<tr data-source-row="6"><td class="table-key">Append write</td><td>Writable regular descriptor with <span class="source-link"><code>O_APPEND</code></span></td><td>Place at end; save resulting offset</td><td><span class="source-link"><code>write_file_descriptor()</code></span>, <span class="source-link"><code>receive_file_size()</code></span></td><td>file-size → write-at end → restore stdout</td></tr>
<tr data-source-row="7"><td class="table-key">Seek from end</td><td>Regular non-device descriptor</td><td>File size plus requested displacement becomes the new nonnegative offset</td><td><span class="source-link"><code>seek_file_descriptor()</code></span>, <span class="source-link"><code>receive_file_size()</code></span></td><td><code>file-size &lt;path&gt;</code>, no data transfer</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2114e8f5-c77b-440b-aa55-3bc144fef61e -->
<!-- SOURCE Pico-OS/README.md#88-opening-reading-writing-and-seeking -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.8 Opening, reading, writing, and seeking (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6002 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6002:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:21.47%" /><col style="width:7.98%" /><col style="width:11.30%" /><col style="width:30.18%" /><col style="width:29.08%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>open_file_descriptor()</code></td><td>Lowest free FD / −1</td><td>Open path; choose lowest free slot</td><td><ul><li><code>current_process()</code></li><li><code>free_file_descriptor()</code></li><li><code>build_process_path()</code></li><li><code>copy_file_path()</code></li><li><code>is_device_path()</code></li><li><code>kfree()</code></li><li><code>uart_send_host_request()</code></li><li><code>file_exists()</code></li><li><code>file-size &amp;lt;path&amp;gt;</code></li><li><code>write &amp;lt;path&amp;gt;</code></li><li><code>write stdout</code></li></ul></td><td><ul><li><code>open()</code></li><li><code>fopen()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>read_file_descriptor()</code></td><td>Byte count / −1</td><td>Read file or terminal; may block</td><td><ul><li><code>current_process()</code></li><li><code>file_descriptor_is_valid()</code></li><li><code>file_descriptor_can_read()</code></li><li><code>is_terminal_device_path()</code></li><li><code>begin_terminal_read()</code></li><li><code>kernel_terminal()</code></li><li><code>is_null_device_path()</code></li><li><code>read_regular_file()</code></li><li><code>read-range &amp;lt;offset&amp;gt; &amp;lt;count&amp;gt; &amp;lt;path&amp;gt;</code></li></ul></td><td><ul><li><code>read()</code></li><li><code>fgetc()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>write_file_descriptor()</code></td><td>Byte count / −1</td><td>Route output; advance saved offset</td><td><ul><li><code>current_process()</code></li><li><code>file_descriptor_is_valid()</code></li><li><code>file_descriptor_can_write()</code></li><li><code>is_null_device_path()</code></li><li><code>is_terminal_device_path()</code></li><li><code>uart_send_host_request()</code></li><li><code>receive_file_size()</code></li><li><code>uart_send_file_write_command()</code></li><li><code>write_uart_bytes()</code></li><li><code>file-size &amp;lt;path&amp;gt;</code></li><li><code>write-at &amp;lt;offset&amp;gt; &amp;lt;path&amp;gt;</code></li><li><code>write stdout</code></li><li><code>write stderr</code></li><li><code>literal-output &amp;lt;count&amp;gt;</code></li></ul></td><td><ul><li><code>write()</code></li><li><code>write_without_uart_escape_check()</code></li><li><code>fputc()</code></li><li><code>fputs()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>seek_file_descriptor()</code></td><td>Offset / −1</td><td>Replace logical file offset</td><td><ul><li><code>current_process()</code></li><li><code>file_descriptor_is_valid()</code></li><li><code>is_device_path()</code></li><li><code>receive_file_size()</code></li><li><code>file-size &amp;lt;path&amp;gt;</code></li><li><code>SEEK_END</code></li></ul></td><td><code>lseek()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2f1aeab6-0574-41ef-8cdc-8a8f909be21c -->
<!-- SOURCE Pico-OS/README.md#88-opening-reading-writing-and-seeking -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.8 Opening, reading, writing, and seeking (4)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Reads + offsets</strong><ul><li><strong>Regular read:</strong> ≤1 KiB per syscall</li>
<li><strong>Partial error:</strong> return transferred count</li>
<li><strong>Each return:</strong> permits deferred scheduling</li>
<li><strong>Device seeks:</strong> rejected</li></ul></li>
<li><strong>Writes</strong><ul><li><strong>Append:</strong> size request before each write</li>
<li><strong>Concurrent append:</strong> unsupported; separate host operations</li>
<li><strong>Host write failure:</strong> no acknowledgement; may report success</li>
<li><strong>Arbitrary data:</strong> write protects escape bytes</li></ul></li></ul></div>

</div>

---

<!-- SLIDE_ID 5dc0c634-a0ed-4acc-9194-3fb896d0061f -->
<!-- SOURCE Pico-OS/README.md#89-picoos-paths-working-directories-and-host-operations -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.9 PicoOS paths, working directories, and host operations (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6040 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6040:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.41%" /><col style="width:42.97%" /><col style="width:24.62%" /></colgroup><thead><tr><th>Requested path</th><th>Base and normalization</th><th>Example result from current directory /a/b</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Relative dir</td><td>Append to the PCB directory</td><td><code>/a/b/dir</code></td></tr>
<tr data-source-row="2"><td class="table-key">. / repeated separators</td><td>Skip . + empty segments</td><td><code>/a/b</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>..</code></td><td>Remove one existing result segment, but never remove root</td><td><code>/a</code>, from <code>/</code>, still <code>/</code></td></tr>
<tr data-source-row="4"><td class="table-key">Parent/child combinations</td><td>Apply segments from left to right</td><td><code>/a/dir</code></td></tr>
<tr data-source-row="5"><td class="table-key">Absolute <code>/dir</code></td><td>Ignore the PCB directory and start at root</td><td><code>/dir</code></td></tr>
<tr data-source-row="6"><td class="table-key">Empty or result at least <span class="source-link"><code>PATH_MAX</code></span> cells</td><td>Reject before contacting the emulator</td><td>Operation returns failure</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>PicoOS chdir:</strong> PCB only; host directory unchanged</li>
<li><strong>Relative paths:</strong> prepend PCB working directory</li>
<li><strong>Normalize:</strong> separators, dot, root-clamped dot-dot, PATH_MAX</li></ul></div>
<aside class="context-note"><b>POSIX / Linux / Windows hosts</b><ul><li><strong>POSIX:</strong> reject symlink traversal</li>
<li><strong>Linux:</strong> BENEATH / NO_SYMLINKS / NO_XDEV</li>
<li><strong>Windows:</strong> reject reparse points + junctions</li></ul></aside>

</div>

---

<!-- SLIDE_ID 42ebfed2-abd0-46b7-b958-dd4f0972fc40 -->
<!-- SOURCE Pico-OS/README.md#89-picoos-paths-working-directories-and-host-operations -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.9 PicoOS paths, working directories, and host operations (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6053 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6053:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.31%" /><col style="width:9.93%" /><col style="width:15.31%" /><col style="width:37.01%" /><col style="width:11.45%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>get_working_directory()</code></td><td>0 / −1</td><td>Copy current absolute path</td><td><ul><li><code>copy_working_directory()</code></li><li><code>current_process()</code></li></ul></td><td><code>getcwd()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>change_working_directory()</code></td><td>0 / −1</td><td>Validate directory; replace current path</td><td><ul><li><code>build_process_path()</code></li><li><code>uart_send_host_request()</code></li><li><code>receive_word()</code></li><li><code>set_process_working_directory()</code></li><li><code>current_process()</code></li><li><code>is-directory &amp;lt;path&amp;gt;</code></li></ul></td><td><code>chdir()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>make_host_directory()</code></td><td>Host status</td><td>Request host directory creation</td><td><ul><li><code>build_process_path()</code></li><li><code>uart_send_host_request()</code></li><li><code>receive_word()</code></li><li><code>mkdir &amp;lt;path&amp;gt;</code></li></ul></td><td><code>mkdir()</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>read_host_directory()</code></td><td>Listing count / error</td><td>Fetch directory listing</td><td><ul><li><code>build_process_path()</code></li><li><code>uart_send_host_request()</code></li><li><code>uart_receive_string()</code></li><li><code>ls &amp;lt;path&amp;gt;</code></li></ul></td><td><code>opendir()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><ul><li><code>unlink_host_file()</code></li><li><code>remove_host_directory()</code></li></ul></td><td>Host status</td><td>Request file removal</td><td><ul><li><code>request_host_path_operation()</code></li><li><code>unlink &amp;lt;path&amp;gt;</code></li><li><code>rmdir &amp;lt;path&amp;gt;</code></li></ul></td><td><ul><li><code>unlink()</code></li><li><code>rmdir()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>move_host_path()</code></td><td>Host status</td><td>Request move/rename</td><td><ul><li><code>build_process_path()</code></li><li><code>uart_print_character()</code></li><li><code>uart_print_string()</code></li><li><code>receive_word()</code></li><li><code>move &amp;lt;old path&amp;gt;\n&amp;lt;new path&amp;gt;</code></li></ul></td><td><code>move()</code></td></tr>
<tr data-source-row="7"><td class="table-key"><code>touch_host_file()</code></td><td>Host status</td><td>Create file or update timestamps</td><td><ul><li><code>request_host_path_operation()</code></li><li><code>touch &amp;lt;path&amp;gt;</code></li></ul></td><td><code>touch()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>chdir failure:</strong> old directory preserved</li>
<li><strong>getcwd:</strong> copy stored path; no host request</li></ul></div>

</div>

---

<!-- SLIDE_ID d295abff-5d07-4c24-bfbd-14013d9527eb -->
<!-- SOURCE Pico-OS/README.md#9-kernel-data-structures-relationships-storage-and-lifetimes -->

<div class="eyebrow section-eyebrow">Section 09 · Overview</div>

# 9. Kernel data structures: relationships, storage, and lifetimes

<SectionOverview section="9-kernel-data-structures-relationships-storage-and-lifetimes" />

---

<!-- SLIDE_ID bf08995c-e408-4ec0-b425-0d865d32a764 -->
<!-- SOURCE Pico-OS/README.md#9-kernel-data-structures-relationships-storage-and-lifetimes -->
<!-- SHORT_VERSION_DISABLED -->

## 9. Kernel data structures: relationships, storage, and lifetimes

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Containment:</strong> embedded field</li>
<li><strong>Reference:</strong> pointer to another object</li>
<li><strong>Ownership:</strong> responsibility for cleanup</li>
<li>Wait queues reference; <strong>do not own PCBs</strong></li></ul></div>

</div>

---

<!-- SLIDE_ID 742a574c-a173-4326-b691-3d927f14ebc3 -->
<!-- SOURCE Pico-OS/README.md#91-memory-layout-allocation-sources-and-lifetimes -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.1 Memory layout, allocation sources, and lifetimes (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6090 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6090:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.07%" /><col style="width:22.42%" /><col style="width:27.13%" /><col style="width:27.37%" /></colgroup><thead><tr><th>Object</th><th>Storage and allocation</th><th>References / access</th><th>Lifetime or release</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>ProcessControlBlock</code></span>, the PCB</td><td>One kernel-heap allocation per process via <span class="source-link"><code>create_process()</code></span></td><td>Global list + current/queue pointers</td><td>Until <span class="source-link"><code>remove_process()</code></span>, possibly after a zombie period</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>ActivationRecord</code></span>, child <span class="source-link"><code>waiters</code></span>, and PCB scalar/pointer fields</td><td>Embedded in the PCB, no separate allocation</td><td>Saved activation + queue back-reference</td><td>PCB lifetime. Queue membership and pending-operation fields change during it</td></tr>
<tr data-source-row="3"><td class="table-key">Complete Process Payload</td><td>One <span class="source-link"><code>PSDMalloc()</code></span> payload, including program sections, heap and stack reservation</td><td>PCB base/size + heap + saved registers</td><td>Released with <span class="source-link"><code>PSDFree()</code></span> on PCB removal</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>ProcessLoad</code></span> and copied path</td><td>Separate kernel-heap allocations, plus a reserved Process Payload</td><td>Loading caller's <span class="source-link"><code>pending_load</code></span>. <span class="source-link"><code>ProcessLoad.base_address</code></span> reaches the unfinished image</td><td>Completion transfers payload; cancellation frees it</td></tr>
<tr data-source-row="5"><td class="table-key">PCB <span class="source-link"><code>binary_path</code></span> and <span class="source-link"><code>working_directory</code></span></td><td>Separate kernel-heap strings via <span class="source-link"><code>copy_process_path()</code></span></td><td>PCB pointers</td><td>PCB removal. Changing directory replaces its string</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>FileDescriptorTable</code></span></td><td>One kernel-heap wrapper allocation</td><td><span class="source-link"><code>ProcessControlBlock.file_descriptors</code></span></td><td>Table replacement or PCB removal</td></tr>
<tr data-source-row="7"><td class="table-key">Eight <span class="source-link"><code>FileDescriptor</code></span> entries</td><td>Separate contiguous Kernel Heap array</td><td>entries pointer; indexed by descriptor number</td><td>Array lasts with table. Closing resets one element</td></tr>
<tr data-source-row="8"><td class="table-key">Descriptor paths</td><td>Separate kernel-heap copies, including standard terminal paths</td><td>Each occupied descriptor references its own path</td><td>Close, duplication/replacement, or table destruction</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>Terminal</code></span></td><td>Kernel .data; embedded ring + wait queue</td><td><span class="source-link"><code>kernel_terminal()</code></span> returns its address</td><td>Whole kernel run</td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry</code></span>, name, and <span class="source-link"><code>SharedMemoryAttachment</code></span> nodes</td><td>Separate kernel-heap allocations</td><td>Registry → entries; PCB → attachments → entry</td><td>Process removal; unlink + last reference</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0b015118-5396-44b7-9007-95da918f08d3 -->
<!-- SOURCE Pico-OS/README.md#91-memory-layout-allocation-sources-and-lifetimes -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.1 Memory layout, allocation sources, and lifetimes (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6090 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6090:11,12,13,14,15,16,17,18,19">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.09%" /><col style="width:29.63%" /><col style="width:34.50%" /><col style="width:18.77%" /></colgroup><thead><tr><th>Object</th><th>Storage and allocation</th><th>References / access</th><th>Lifetime or release</th></tr></thead><tbody><tr data-source-row="11"><td class="table-key">Shared data</td><td>Separate <span class="source-link"><code>PSDMalloc()</code></span> payload</td><td>Same absolute address for every mapping</td><td>Entry destruction; independent of mapper image</td></tr>
<tr data-source-row="12"><td class="table-key">Kernel Heap and Process and Shared Data Heap <span class="source-link"><code>Heap</code></span> descriptors</td><td>Kernel .data globals</td><td>Each <span class="source-link"><code>first_block</code></span> points into its own managed region</td><td>Whole kernel run</td></tr>
<tr data-source-row="13"><td class="table-key">Per-process <span class="source-link"><code>process_heap</code></span> and <span class="source-link"><code>environ</code></span></td><td>Process <code>.data</code> globals when the libraries are linked</td><td>Process heap blocks + environment array</td><td>Image lifetime. Environment contents can be replaced</td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>BlockHeader</code></span></td><td>In-region header immediately before payload</td><td>Descriptor → first → next header</td><td>Allocator splits/merges; inner/outer lists separate</td></tr>
<tr data-source-row="15"><td class="table-key">Userspace library objects, buffers, and caller-created mutexes/queues</td><td>Caller chooses heap/data/stack/shared storage</td><td>DirectoryStream, environment, mutex</td><td>Caller lifetime; retain until kernel completion</td></tr>
<tr data-source-row="16"><td class="table-key">Syscall requests and result cells</td><td>Stack-local request; user/kernel</td><td>Syscall pointer argument or direct function argument</td><td>Suspended call preserves retained result/buffer</td></tr>
<tr data-source-row="17"><td class="table-key">Pending terminal-read state and destination</td><td>PCB retains caller buffer + count</td><td><span class="source-link"><code>pending_terminal_read_buffer</code></span> and <span class="source-link"><code>pending_terminal_read_count</code></span></td><td>Clear fields; preserve buffer through blocked call</td></tr>
<tr data-source-row="18"><td class="table-key">Kernel local variables and scratch buffers</td><td>Live kernel stack frames in normal kernel calls, e.g. <span class="source-link"><code>absolute_path</code></span></td><td>Parameters and local pointers</td><td>Until return or context-switch abandonment of that kernel call chain</td></tr>
<tr data-source-row="19"><td class="table-key">Interrupt saved frames and handler locals</td><td>Interrupted process or kernel stack</td><td>Saved frame; PC at activation.sp + 1</td><td>Until restore; UART/DMA borrow same stack</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID cdb13a00-f3d0-4aeb-91ee-2abada037622 -->
<!-- SOURCE Pico-OS/README.md#91-memory-layout-allocation-sources-and-lifetimes -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.1 Memory layout, allocation sources, and lifetimes (3)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Kernel locals:</strong> kernel stack or borrowed interrupt stack</li>
<li><strong>Pointer field:</strong> lives with containing object</li>
<li><strong>Target lifetime:</strong> may differ from field lifetime</li></ul></div>

</div>

---

<!-- SLIDE_ID bb99332c-bc15-4125-8a4a-e8eab79b7c20 -->
<!-- SOURCE Pico-OS/README.md#92-containment-and-reference-relationships -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.2 Containment and reference relationships (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-6123 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-containment-references.svg" alt="9.2 Containment and reference relationships" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Kernel requests:</strong> local frames; no heap allocation</li>
<li><strong>next / wait_next:</strong> different lists</li></ul></div>

</div>

---

<!-- SLIDE_ID 08e3218a-5f01-428b-8073-c33581bc16af -->
<!-- SOURCE Pico-OS/README.md#92-containment-and-reference-relationships -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.2 Containment and reference relationships (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-6139 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-waitpid-references.svg" alt="SRAM with the Kernel Heap on the left and Process Payload A's image, heap, and stack on the right. Matching expanded Kernel Heap and User Process Stack containers show PCB 1 after Block Header A, the two-cell WaitPidRequest, and the separate int status, with request.status and waiting_status_ptr both pointing to that integer" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>waiters / waiting_queue_ptr:</strong> ownership versus membership</li>
<li><strong>parent_pid / device path:</strong> IDs/names; not object pointers</li></ul></div>

</div>

---

<!-- SLIDE_ID a01d2152-abec-4b6f-8af7-09329a350c16 -->
<!-- SOURCE Pico-OS/README.md#93-kernel-global-variables-and-process-list-roots -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.3 Kernel global variables and process-list roots

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6169 -->
<ReadmeVisual kind="table" :width="1442.7999999999997" data-table-key="table-6169:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17">

<div class="table-panels table-panels-two" data-column-key="table:table-6169:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:34.87%" /><col style="width:45.28%" /><col style="width:19.85%" /></colgroup><thead><tr><th>Global</th><th>Type</th><th>Stored value / referenced structure and role</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>process_list_head</code></span></td><td><code>struct ProcessControlBlock *</code></td><td>First PCB or NULL; traversal starts here</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>process_list_tail</code></span></td><td><code>struct ProcessControlBlock *</code></td><td>Final PCB or NULL; O(1) append</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>active_process</code></span></td><td><code>struct ProcessControlBlock *</code></td><td>Current PCB + scheduler scan position</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>next_process_id</code></span></td><td><code>int</code></td><td>Next PID; initial 1</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>kernel_heap</code></span></td><td><span class="source-link"><code>struct Heap</code></span></td><td>Embedded descriptor whose first-block pointer reaches the kernel heap</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>process_shared_data_heap</code></span></td><td><span class="source-link"><code>struct Heap</code></span></td><td>Outer Process/Shared Data Heap descriptor</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>terminal</code></span></td><td><code>struct Terminal</code></td><td>128-cell ring + indices/count + wait queue</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>shared_memory_list_head</code></span></td><td><code>struct SharedMemoryEntry *</code></td><td>Registry head; includes unlinked live entries</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>next_shared_memory_id</code></span></td><td><code>int</code></td><td>Next shared-memory ID; independent of PID</td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>dma_waiters</code></span></td><td><span class="source-link"><code>struct wait_queue</code></span></td><td>Standalone DMA wait queue; PCB endpoints</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:34.87%" /><col style="width:45.28%" /><col style="width:19.85%" /></colgroup><thead><tr><th>Global</th><th>Type</th><th>Stored value / referenced structure and role</th></tr></thead><tbody><tr data-source-row="11"><td class="table-key"><span class="source-link"><code>dma_initialized</code></span></td><td><code>bool</code></td><td>Initially false. It prevents reinitializing the DMA queue after setup</td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>reschedule_requested</code></span></td><td><code>bool</code></td><td>Deferred switch flag; cleared on selection</td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>foreground_process_target</code></span></td><td><code>int</code></td><td><ul><li>0: unregistered</li><li>Positive: input + signals</li><li>Negative: input; suppress signals</li></ul></td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>interrupt_device_isrs</code></span></td><td><code>int[INTERRUPT_DEVICE_COUNT]</code> (3 entries)</td><td>Timer/DMA/UART indices {1,4,2}</td></tr>
<tr data-source-row="15"><td class="table-key"><span class="source-link"><code>interrupt_device_priorities</code></span></td><td><code>int[INTERRUPT_DEVICE_COUNT]</code> (3 entries)</td><td>Timer/DMA/UART priorities <code>{1, 1, 2}</code> used during controller initialization</td></tr>
<tr data-source-row="16"><td class="table-key"><span class="source-link"><code>loading_bar_enabled</code></span></td><td><code>bool</code></td><td>Image-local loading-bar setting; initially true</td></tr>
<tr data-source-row="17"><td class="table-key"><span class="source-link"><code>interrupt_vector_table</code></span></td><td><code>void (*[OS_INTERRUPT_VECTOR_COUNT])(void)</code> (5 entries)</td><td>Five ISR addresses in .ivt</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 739441a9-1d89-4d70-9e04-caa7a3cd9eae -->
<!-- SOURCE Pico-OS/README.md#94-wait-requests-and-queue-storage -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.4 Wait requests and queue storage

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6199 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6199:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.29%" /><col style="width:31.50%" /><col style="width:31.21%" /></colgroup><thead><tr><th>Call path</th><th>Request and queue storage</th><th>Retained references and reason</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>sleep(wq)</code></span> → <span class="source-link"><code>sleep_on_wait_queue()</code></span></td><td>Caller queue address directly in IN1</td><td>Retained queue pointer + intrusive PCB links</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>mutex_lock()</code></span> → <span class="source-link"><code>sleep()</code></span></td><td>Embedded mutex.waiters; stack or shared storage</td><td>Kernel writes PCB pointers into caller queue</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>waitpid()</code></span> → <span class="source-link"><code>wait_for_process_by_pid()</code></span> → <span class="source-link"><code>sleep_on_wait_queue()</code></span>, when blocking</td><td>Parent stack request/status; child's embedded waiters</td><td>Retain status pointer; suspended frame stays alive</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>begin_terminal_read()</code></span></td><td>Kernel-global terminal.input_waiters</td><td>PCB retains caller buffer/count for delivery after an input interrupt</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>start_dma_uart_receive()</code></span></td><td>Kernel-global dma_waiters</td><td>Intrusive wait links + persistent load progress</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Queue:</strong> two PCB pointers; no waiter-node allocation</li>
<li><strong>waitpid:</strong> child PCB’s existing embedded queue</li>
<li><strong>Stack-local queue:</strong> must outlive every waiter</li></ul></div>

</div>

---

<!-- SLIDE_ID 304a6166-5e15-4772-b9e2-8e853ac233e6 -->
<!-- SOURCE Pico-OS/README.md#10-userspace-libraries -->

<div class="eyebrow section-eyebrow">Section 10 · Overview</div>

# 10. Userspace libraries

<SectionOverview section="10-userspace-libraries" />

---

<!-- SLIDE_ID d36a56b2-04e2-40cb-b538-5d55d4226a76 -->
<!-- SOURCE Pico-OS/README.md#10-userspace-libraries -->
<!-- SHORT_VERSION_DISABLED -->

## 10. Userspace libraries

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Local library code or <strong>syscall wrapper</strong></li>
<li><strong>Link dependencies</strong> into user image</li>
<li><strong>Source portability</strong> depends on interface</li>
<li>PicoOS implements <strong>documented subset</strong></li></ul></div>

</div>

---

<!-- SLIDE_ID fbcb268f-997c-40b7-a089-0e38a2ee9d1d -->
<!-- SOURCE Pico-OS/README.md#1011-header-implementation-and-linking -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.1 Header, implementation, and linking (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6244 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6244:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.85%" /><col style="width:64.15%" /></colgroup><thead><tr><th>File</th><th>Role in the wait library</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>wait.header</code></span></td><td>Public <code>waitpid()</code> + <code>WIFSTOPPED()</code> declarations</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>wait.picoc</code></span></td><td>Implementation + syscall helper</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>libwait.picoc</code></span></td><td>Compilation unit links wait implementation</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>common/stddef.header</code></span></td><td>Shared <code>bool</code>, <code>NULL</code>, <code>true</code>, and <code>false</code> definitions</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>common/signal.header</code></span></td><td>Stopped-status constants for <code>WIFSTOPPED()</code></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>common/syscall.header</code></span></td><td>Shared selector + child PID/status request layout</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>libwait.reti_blocks</code></span></td><td>Reusable ReTI code blocks; linker input</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>libwait.st</code></span></td><td>Function signatures + types; used alongside code blocks</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Header:</strong> signatures; compiler checks calls</li>
<li><strong>Implementation:</strong> linked into user image</li></ul></div>

</div>

---

<!-- SLIDE_ID d8b1e73e-25ce-415d-9f69-21b32385cd57 -->
<!-- SOURCE Pico-OS/README.md#1011-header-implementation-and-linking -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.1 Header, implementation, and linking (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 220fr) minmax(0, 75fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-6258+code-6274" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-6258 -->
<ReadmeVisual kind="code" :width="384" data-code-source="code-6258" data-code-part="1">

<!-- README_CODE_PART code-6258 lines=1-7 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/sys/wait/wait.header</span><span class="code-range"></span></div>

```c {lines:false}
#pragma once

#include "../../../common/stddef.header"
#include "../../../common/signal.header"

int waitpid(int pid);
bool WIFSTOPPED(int status);
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-6274 -->
<ReadmeVisual kind="code" :width="384" data-code-source="code-6274" data-code-part="1">

<!-- README_CODE_PART code-6274 lines=1-1 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/sys/wait/libwait.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "wait.picoc"
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-6281 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-6281" data-code-part="1">

<!-- README_CODE_PART code-6281 lines=1-1 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ picoc_compiler -c -O1 library/sys/wait/libwait.picoc
```

</div>

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>libwait:</strong> private syscall bridge; no unistd dependency</li>
<li><strong>Kernel:</strong> separate build; runtime INT 0 entry</li></ul></div>

</div>

---

<!-- SLIDE_ID 5de2a26a-4658-44a3-8cbb-a4606ab8e2da -->
<!-- SOURCE Pico-OS/README.md#1012-packing-arguments-and-executing-the-syscall -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.2 Packing arguments and executing the syscall (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns prose-with-code" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr)"><div class="readme-list prose-summary"><ul><li><strong>Request + result:</strong> stack-local; no heap allocation</li>
<li><strong>Helper zero:</strong> retry</li></ul></div>
<!-- README_ASSET code-6306 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-6306" data-code-part="1">

<!-- README_CODE_PART code-6306 lines=1-8 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>common/syscall.header</span><span class="code-range"></span></div>

```c {lines:false}
// ...

struct WaitPidRequest {
    int pid;
    int *status;
};

// ...
```

</div>

</ReadmeVisual></div>
<aside class="context-note"><b>waitpid / POSIX</b><ul><li><strong>PicoOS:</strong> one PID; returns child status</li>
<li><strong>POSIX:</strong> output parameter + options</li></ul></aside>

</div>

---

<!-- SLIDE_ID 16cc1b17-e4ca-4b6b-8e87-a6d25f528752 -->
<!-- SOURCE Pico-OS/README.md#1012-packing-arguments-and-executing-the-syscall -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.2 Packing arguments and executing the syscall (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6323 -->
<div class="code-columns" data-column-key="code:code-6323" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.2779369627507164">

<ReadmeVisual kind="code" :width="560" data-code-source="code-6323" data-code-part="1">

<!-- README_CODE_PART code-6323 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/sys/wait/wait.picoc</span><span class="code-range">lines 1–15</span></div>

```c {lines:false}
#include "wait.header"
#include "../../../common/syscall.header"

// Invokes INT 0 with ACC/IN1 and returns IN2 without loading unistd into SRAM
int invoke_waitpid_syscall(int number, int argument) {
    int result;

    asm("LOADIN BAF ACC 3");
    asm("LOADIN BAF IN1 4");
    asm("INT 0");
    asm("STOREIN BAF IN2 0");
    return result;
}

int waitpid(int pid) {
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-6323" data-code-part="2">

<!-- README_CODE_PART code-6323 lines=16-30 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/sys/wait/wait.picoc</span><span class="code-range">lines 16–30</span></div>

```c {lines:false}
    int status = 0;
    struct WaitPidRequest request;

    request.pid = pid;
    request.status = &status;
    while (!invoke_waitpid_syscall(SYSCALL_WAITPID, (int)&request)) {
    }
    return status;
}

bool WIFSTOPPED(int status) {
    return status == SIGNAL_STOP_STATUS ||
           status == SIGNAL_STOPPED_STATUS ||
           status == SIGNAL_TERMINAL_INPUT_STATUS;
}
```

</div>

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Blocked wait resumes:</strong> IN2=1; no busy polling</li>
<li><strong>Public result:</strong> child status; no options argument</li></ul></div>

</div>

---

<!-- SLIDE_ID c97fa599-e01c-4809-8260-ddaa492474b8 -->
<!-- SOURCE Pico-OS/README.md#10131-cpu-execution-and-sram-storage -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid · 10.1.3 Interrupt entry, waiting, and return

## 10.1.3.1 CPU execution and SRAM storage

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-6402 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/waitpid-memory-context.svg" alt="One CPU fetches kernel instructions and parent instructions from their separate SRAM text sections. The complete SRAM row locates kernel globals, PCBs, the Kernel Stack, and the parent's image, heap, and stack. Enlarged panels show PCB 1.activation, PCB 1.waiting_status_ptr, PCB 2.waiters, the saved interrupt frame and PC, WaitPidRequest, and the separate status integer." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2a9f965e-ea7e-4c55-836b-1ce4fe34ed42 -->
<!-- SOURCE Pico-OS/README.md#10132-following-entry-and-the-two-return-paths -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid · 10.1.3 Interrupt entry, waiting, and return

## 10.1.3.2 Following entry and the two return paths

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-6445 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/waitpid-return-paths.svg" alt="Five aligned columns distinguish CPU execution from SRAM state: parent INT 0, kernel wait setup, execution of other processes, kernel notification of a child event, and parent resumption after RTI. An immediate-result shortcut connects kernel wait handling directly to parent resumption." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0af3c4f9-bac1-45ff-b328-463980effb88 -->
<!-- SOURCE Pico-OS/README.md#102-library-overview-and-dependencies -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink>

## 10.2 Library overview and dependencies

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6536 -->
<ReadmeVisual kind="table" :width="1440" class="inventory-grid library-grid">

<div class="readme-tiles" v-pre><div class="readme-tile"><div class="tile-name"><span class="source-link"><code>unistd</code></span></div><div class="tile-detail"><ul><li>Processes + descriptors</li><li>Paths + wait queues</li></ul></div><div class="tile-detail">stdlib: environment</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>fcntl</code></span></div><div class="tile-detail">Open/create files</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/wait</code></span></div><div class="tile-detail">Child wait/stop status</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>mutex</code></span></div><div class="tile-detail">Atomic lock + wait queue</div><div class="tile-detail">unistd wait queues</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/mman</code></span></div><div class="tile-detail">Named shared memory</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>dirent</code></span></div><div class="tile-detail">Directory streams</div><div class="tile-detail">Own syscall helper + stdlib</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>stdlib</code></span></div><div class="tile-detail"><ul><li>Heap + environment</li><li>Conversion + exit</li></ul></div><div class="tile-detail">common/heap.picoc</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>string</code></span></div><div class="tile-detail">Copy, compare, length</div><div class="tile-detail">common/string.picoc</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>stdio</code></span></div><div class="tile-detail">Streams, formatting, scanning</div><div class="tile-detail"><ul><li>common/decimal.picoc</li><li>Syscall helper</li></ul></div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>start</code></span></div><div class="tile-detail">Entry + runtime initialization</div><div class="tile-detail">stdlib</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>schedule</code></span></div><div class="tile-detail">Voluntary scheduling</div><div class="tile-detail">Inline syscall</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>signal</code></span></div><div class="tile-detail">Signal delivery</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/prctl</code></span></div><div class="tile-detail">Parent-death signal</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/reboot</code></span></div><div class="tile-detail">Restart + power-off</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/stat</code></span></div><div class="tile-detail">Directory creation</div><div class="tile-detail">Own syscall helper</div></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Private syscall helpers:</strong> avoid full unistd dependency</li>
<li><strong>Plain writers:</strong> no stdio streams/format parser</li>
<li><strong>Short local loops:</strong> avoid unused string library</li>
<li><strong>Smaller image:</strong> more SRAM for heap + stack</li>
<li><strong>UART backend:</strong> usable before userspace startup</li></ul></div>

</div>

---

<!-- SLIDE_ID f8f99ea8-a9eb-423f-a8e5-7b723fca685e -->
<!-- SOURCE Pico-OS/README.md#10211-process-operations-in-processpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.1 Process operations in `process.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6596 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6596:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.98%" /><col style="width:31.30%" /><col style="width:42.72%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>invoke_syscall()</code></td><td>Internal syscall bridge; result in IN2</td><td>Forward supplied selector + argument</td></tr>
<tr data-source-row="2"><td class="table-key"><code>load()</code></td><td>Load binary; return NEW child PID</td><td><ul><li><code>LOAD_PROCESS</code></li><li>Host: <code>file-size</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>run()</code></td><td>Prepare child; mark READY</td><td><code>RUN_PROCESS_WITH_ARGUMENTS</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>unload()</code></td><td>Remove noncurrent process</td><td><code>UNLOAD_PROCESS</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>list_processes()</code></td><td>Print all PIDs + binary paths</td><td><ul><li><code>LIST_PROCESSES</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>getpid()</code></td><td>Current process PID</td><td><code>GETPID</code></td></tr>
<tr data-source-row="7"><td class="table-key"><code>set_foreground_process()</code></td><td>Shell/child input owner</td><td><code>SET_FOREGROUND_PROCESS</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 06822f91-611a-4795-a7ce-7e3645a7123e -->
<!-- SOURCE Pico-OS/README.md#10212-descriptor-operations-in-iopicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.2 Descriptor operations in `io.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6616 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6616:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.34%" /><col style="width:33.44%" /><col style="width:34.22%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>read()</code></td><td>Read bytes; return count or −1</td><td><ul><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>write()</code></td><td>Write bytes; protect UART control</td><td><ul><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>write_without_uart_escape_check()</code></td><td>Write known escape-free bytes</td><td><ul><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>close()</code></td><td>Close descriptor; return 0 or −1</td><td><code>CLOSE</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>dup2()</code></td><td>Independent entry copy; return target</td><td><code>DUP2</code></td></tr>
<tr data-source-row="6"><td class="table-key"><code>lseek()</code></td><td>Set offset; return position or −1</td><td><ul><li><code>LSEEK</code></li><li>Host: <code>file-size</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 5b082237-7bad-489f-a4c6-95ee9262e55e -->
<!-- SOURCE Pico-OS/README.md#10213-working-directory-operations-in-working_directorypicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.3 Working-directory operations in `working_directory.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6631 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6631:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.33%" /><col style="width:44.34%" /><col style="width:31.33%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>chdir()</code></td><td>Change process working directory</td><td><ul><li><code>CHDIR</code></li><li>Host: <code>is-directory</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>getcwd()</code></td><td>Copy directory; buffer or NULL</td><td><code>GETCWD</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 76448738-c898-4af5-a62d-427ddd97cbb2 -->
<!-- SOURCE Pico-OS/README.md#10214-path-operations-in-file_removalpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.4 Path operations in `file_removal.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6641 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6641:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.49%" /><col style="width:42.50%" /><col style="width:32.01%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>unlink()</code></td><td>Remove file; return host status</td><td><ul><li><code>UNLINK</code></li><li>Host: <code>unlink</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>rmdir()</code></td><td>Remove empty directory</td><td><ul><li><code>RMDIR</code></li><li>Host: <code>rmdir</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>move()</code></td><td>Move/rename path</td><td><ul><li><code>MOVE</code></li><li>Host: <code>move</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>touch()</code></td><td>Create or update timestamps</td><td><ul><li><code>TOUCH</code></li><li>Host: <code>touch</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 43d7107e-d166-452c-800e-1df9e4c4c842 -->
<!-- SOURCE Pico-OS/README.md#10215-wait-queue-operations-in-blockingpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.5 Wait-queue operations in `blocking.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6654 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6654:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.41%" /><col style="width:42.01%" /><col style="width:25.58%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>wait_queue_init()</code></td><td>Clear FIFO head + tail</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>sleep()</code></td><td>Queue caller; suspend execution</td><td><code>SLEEP</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>wakeup()</code></td><td>Wake at most one waiter</td><td><code>WAKEUP</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 92b75598-372d-408d-b393-744c3332e3cf -->
<!-- SOURCE Pico-OS/README.md#1022-fcntl-opening-and-creating-files -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.2 fcntl: opening and creating files

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6666 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6666:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:20.57%" /><col style="width:36.28%" /><col style="width:43.15%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>open()</code></td><td>Lowest free descriptor; −1 on error</td><td><ul><li><code>OPEN</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write</code></li><li>Host: <code>write stdout</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>creat()</code></td><td>Write + create + truncate</td><td><ul><li><code>OPEN</code></li><li>Host: <code>write</code></li><li>Host: <code>write stdout</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 85a267ef-74fe-48fe-8ef8-77a649dab165 -->
<!-- SOURCE Pico-OS/README.md#1023-syswait-waiting-for-children -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.3 sys/wait: waiting for children

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6677 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6677:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.72%" /><col style="width:46.72%" /><col style="width:26.56%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>waitpid()</code></td><td>Child exit/stopped status; −1 on error</td><td><code>WAITPID</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>WIFSTOPPED()</code></td><td>Test stopped-status encoding</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 68458579-f34d-41ca-a049-014ef436d742 -->
<!-- SOURCE Pico-OS/README.md#1024-mutex-locking-and-waking-contenders -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.4 mutex: locking and waking contenders

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6687 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6687:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.72%" /><col style="width:45.37%" /><col style="width:25.91%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>testset()</code></td><td>Atomic old value; store 1</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>mutex_init()</code></td><td>Clear lock + initialize wait queue</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>mutex_lock()</code></td><td>Acquire; sleep/retry on contention</td><td><code>SLEEP</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>mutex_unlock()</code></td><td>Clear lock; wake one contender</td><td><code>WAKEUP</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Shared object:</strong> lock + queue visible to participants</li>
<li><strong>Failed test → sleep:</strong> lost-wakeup limitation</li></ul></div>

</div>

---

<!-- SLIDE_ID 71d0ab2b-a8ae-4f01-a1de-2c4a39c11e38 -->
<!-- SOURCE Pico-OS/README.md#1025-sysmman-named-shared-memory -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.5 sys/mman: named shared memory

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6704 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6704:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.45%" /><col style="width:44.62%" /><col style="width:26.93%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>shm_open()</code></td><td>Named entry ID or −1</td><td><code>SHM_OPEN</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>mmap()</code></td><td>Attach; shared address or NULL</td><td><code>MMAP</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>shm_unlink()</code></td><td>Unlink name; defer destruction</td><td><code>SHM_UNLINK</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID f6bcd08a-6154-4c36-93d4-3f904627dde5 -->
<!-- SOURCE Pico-OS/README.md#1026-dirent-directory-streams -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.6 dirent: directory streams (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6716 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-6716" data-code-part="1">

<!-- README_CODE_PART code-6716 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/dirent/dirent.header</span><span class="code-range"></span></div>

```c {lines:false}
struct dirent {
    int d_type;
    char d_name[DIRENT_NAME_MAX];
};

struct DirectoryStream {
    char *contents;
    int length;
    int offset;
    struct dirent entry;
};
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 968bf2cd-df65-48bf-9422-f8939b2e8cd4 -->
<!-- SOURCE Pico-OS/README.md#1026-dirent-directory-streams -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.6 dirent: directory streams (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6734 -->
<ReadmeVisual kind="table" :width="704" data-table-key="table-6734:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:36.87%" /><col style="width:29.57%" /><col style="width:33.55%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>DirectoryStream.contents</code></span></td><td>Owned 512-cell listing buffer</td><td><ul><li><code>opendir()</code></li><li><code>read_host_directory()</code></li><li><code>readdir()</code></li><li><code>closedir()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>DirectoryStream.length</code></span></td><td>Listing length without terminator</td><td><ul><li><code>opendir()</code></li><li><code>readdir()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>DirectoryStream.offset</code></span></td><td>Next listing record</td><td><ul><li><code>opendir()</code></li><li><code>readdir()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>DirectoryStream.entry</code></span></td><td>Embedded, reused directory-entry result</td><td><code>readdir()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>dirent.d_type</code></span></td><td>Directory or regular-file type</td><td><code>readdir()</code></td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>dirent.d_name</code></span></td><td>Terminated name; 127-character limit</td><td><code>readdir()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 80c1a868-2411-4706-875e-9ebdf81c57da -->
<!-- SOURCE Pico-OS/README.md#1026-dirent-directory-streams -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.6 dirent: directory streams (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6746 -->
<ReadmeVisual kind="table" :width="896" data-table-key="table-6746:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.29%" /><col style="width:32.62%" /><col style="width:48.09%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>opendir()</code></td><td>Allocate stream + fetch listing</td><td><ul><li><code>READ_DIRECTORY</code></li><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>ls</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>readdir()</code></td><td>Reuse entry; NULL at end</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>closedir()</code></td><td>Free buffer + stream</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 8a3b483d-aeed-4720-bbdf-f3d4f54f1f69 -->
<!-- SOURCE Pico-OS/README.md#1026-dirent-directory-streams -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.6 dirent: directory streams (4)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Listing:</strong> fetched once; 512-cell owned buffer</li>
<li><strong>readdir:</strong> reused embedded entry; copy before next call</li></ul></div>

</div>

---

<!-- SLIDE_ID 1bcc43f4-c6ba-4f9f-90c5-b52eaef9244a -->
<!-- SOURCE Pico-OS/README.md#10271-heap-operations-in-mallocpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.1 Heap operations in `malloc.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6766 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6766:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.67%" /><col style="width:31.39%" /><col style="width:32.94%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>require_process_heap_allocation()</code></td><td>Positive failure → heap-full syscall</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>init_process_heap()</code></td><td>Initialize process-local heap</td><td><ul><li><code>PROCESS_HEAP_START</code></li><li><code>PROCESS_HEAP_SIZE</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>malloc()</code></td><td><ul><li>First-fit process allocation</li><li>Positive failure → terminate</li></ul></td><td><code>PROCESS_HEAP_FULL</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>realloc()</code></td><td><ul><li>Resize/move process allocation</li><li>Size 0 → free</li></ul></td><td><code>PROCESS_HEAP_FULL</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>free()</code></td><td>Free + coalesce process blocks</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Positive allocation failure:</strong> heap-full syscall</li>
<li><strong>Diagnostic:</strong> descriptor 1; redirected output possible</li></ul></div>

</div>

---

<!-- SLIDE_ID b7ffb9a1-d56a-4a19-91f2-8cc680b1c59a -->
<!-- SOURCE Pico-OS/README.md#10272-decimal-conversion-in-atoipicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.2 Decimal conversion in `atoi.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6780 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6780:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.86%" /><col style="width:38.86%" /><col style="width:35.28%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>atoi()</code></td><td>Convert signed decimal text</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 53fcb363-56f3-40f3-9bca-02d6fb41f3aa -->
<!-- SOURCE Pico-OS/README.md#10273-environment-operations-in-envpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.3 Environment operations in `env.picoc` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns prose-with-code" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr)"><div class="readme-list prose-summary"><ul><li><strong>envp:</strong> argv + argc + 1</li>
<li><strong>Startup:</strong> stack array/strings → heap-owned environ</li>
<li><strong>Lookup:</strong> exact name followed by =</li></ul></div>
<!-- README_ASSET code-6813 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-6813" data-code-part="1">

<!-- README_CODE_PART code-6813 lines=1-10 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/stdlib/env.picoc</span><span class="code-range"></span></div>

```c {lines:false}
char *getenv(char *name) {
    int name_length = environment_variable_length(name);
    int index = environment_variable_index(name, name_length);

    if (index == -1) {
        return NULL;
    }

    return environ[index] + name_length + 1;
}
```

</div>

</ReadmeVisual></div>

</div>

---

<!-- SLIDE_ID 7790ca2b-50f9-4144-b6f3-c5aa7fa70502 -->
<!-- SOURCE Pico-OS/README.md#10273-environment-operations-in-envpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.3 Environment operations in `env.picoc` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-6830+table-6830" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET table-6830 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6830:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.05%" /><col style="width:24.69%" /><col style="width:42.26%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>getenv()</code></td><td>Value pointer or NULL</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>current_environment()</code></td><td>Process-global environ pointer</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>copy_environment_variable()</code></td><td>Allocate string copy</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>store_environment_variable()</code></td><td>Add/replace environment entry</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>initialize_environment()</code></td><td>Copy inherited environment</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>setenv()</code></td><td>Add/replace NAME=value</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-6830 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6830:7,8,9,10,11,12">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.90%" /><col style="width:27.59%" /><col style="width:44.51%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="7"><td class="table-key"><code>unsetenv()</code></td><td>Remove entry; compact pointer array</td><td>Local code; no syscall</td></tr>
<tr data-source-row="8"><td class="table-key"><code>putenv()</code></td><td>Copy NAME=value; require =</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><code>clearenv()</code></td><td>Free strings; retain empty array</td><td>Local code; no syscall</td></tr>
<tr data-source-row="10"><td class="table-key"><code>clone_environment()</code></td><td>Deep-copy environment</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><code>destroy_environment()</code></td><td>Free cloned strings + array</td><td>Local code; no syscall</td></tr>
<tr data-source-row="12"><td class="table-key"><code>restore_environment()</code></td><td>Recreate current environment</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c302cae5-785c-4957-bc6f-00b9480079ba -->
<!-- SOURCE Pico-OS/README.md#10273-environment-operations-in-envpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.3 Environment operations in `env.picoc` (3)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Empty value:</strong> terminator pointer; <strong>missing:</strong> NULL</li>
<li><strong>Returned value:</strong> existing string; no allocation</li></ul></div>

</div>

---

<!-- SLIDE_ID bf127f7a-3383-4ab6-a54f-59c0197e587b -->
<!-- SOURCE Pico-OS/README.md#10274-process-exit-in-exitpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.4 Process exit in `exit.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6857 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6857:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.93%" /><col style="width:46.14%" /><col style="width:26.93%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>exit()</code></td><td>Terminate with status; no return</td><td><code>EXIT</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c2a7aaa4-f602-4bd6-9ae3-430c408dcc86 -->
<!-- SOURCE Pico-OS/README.md#1028-string-copying-comparison-and-length -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.8 string: copying, comparison, and length

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6868 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6868:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.27%" /><col style="width:43.89%" /><col style="width:32.84%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>strcpy()</code></td><td>Copy terminated string; return destination</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>strcat()</code></td><td>Append string; return destination</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>strcmp()</code></td><td>First unequal cell difference</td><td>Local code; no syscall</td></tr>
<tr data-source-row="4"><td class="table-key"><code>strncmp()</code></td><td>Compare at most count cells</td><td>Local code; no syscall</td></tr>
<tr data-source-row="5"><td class="table-key"><code>strlen()</code></td><td>Cells before terminator</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Local memory only:</strong> no syscall/allocation</li>
<li><strong>Sizes:</strong> ReTI cells; leave room for terminator</li></ul></div>

</div>

---

<!-- SLIDE_ID 5ce52698-129c-4e47-adea-d8efc2174b29 -->
<!-- SOURCE Pico-OS/README.md#1029-stdio-streams-formatting-and-scanning -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.9 stdio: streams, formatting, and scanning

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 95fr) minmax(0, 69fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-6882 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-6882" data-code-part="1">

<!-- README_CODE_PART code-6882 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/stdio/stdio.header</span><span class="code-range"></span></div>

```c {lines:false}
struct PicoFile {
    int file_descriptor;
};
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-6893 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6893:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.21%" /><col style="width:23.21%" /><col style="width:46.58%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th><th>Used by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>PicoFile.file_descriptor</code></span></td><td>Current process descriptor number</td><td><ul><li><code>prepare_standard_streams()</code></li><li><code>fopen()</code></li><li><code>fgetc()</code></li><li><code>fputc()</code></li><li><code>fputs()</code></li><li><code>fclose()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Per image:</strong> standard streams + five extra slots</li>
<li><strong>No private buffers</strong> or EOF/error flags</li>
<li><strong>Scanning:</strong> one-character pushback globals</li></ul></div>

</div>

---

<!-- SLIDE_ID 1f1799e4-8958-44c3-b618-73bc70dfca55 -->
<!-- SOURCE Pico-OS/README.md#10291-streams-and-output-in-stdiopicoc -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.9 stdio: streams, formatting, and scanning

## 10.2.9.1 Streams and output in `stdio.picoc` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-6906+table-6906" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET table-6906 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6906:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.81%" /><col style="width:29.54%" /><col style="width:46.65%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>standard_input()</code></td><td>Process-global stdin stream</td><td><code>FILE_DESCRIPTORS_AVAILABLE</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>standard_output()</code></td><td>Process-global stdout stream</td><td><code>FILE_DESCRIPTORS_AVAILABLE</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>standard_error()</code></td><td>Process-global stderr stream</td><td><code>FILE_DESCRIPTORS_AVAILABLE</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>fopen()</code></td><td>Stream slot or NULL; r/w/a/+</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>OPEN</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write</code></li><li>Host: <code>write stdout</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>fclose()</code></td><td>Close + release stream slot</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>CLOSE</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>fgetc()</code></td><td>Character or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-6906 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6906:7,8,9,10,11,12">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.74%" /><col style="width:23.09%" /><col style="width:57.17%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="7"><td class="table-key"><code>fputc()</code></td><td>Written character or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="8"><td class="table-key"><code>fputs()</code></td><td>Written count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><code>write_decimal()</code></td><td>Print decimal; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="10"><td class="table-key"><code>format_stream()</code></td><td>Format arguments; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><code>fprintf()</code></td><td>Formatted stream output; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="12"><td class="table-key"><code>printf()</code></td><td>Formatted stdout output; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>System V-style variadic ABI</b><ul><li><strong>printf / fprintf:</strong> walk stack arguments</li>
<li><strong>Shared PicoC frame</strong> convention</li></ul></aside>

</div>

---

<!-- SLIDE_ID 1c5fb565-a097-46d9-971a-81f83d981b87 -->
<!-- SOURCE Pico-OS/README.md#10291-streams-and-output-in-stdiopicoc -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.9 stdio: streams, formatting, and scanning

## 10.2.9.1 Streams and output in `stdio.picoc` (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>First use:</strong> descriptor availability queried once</li>
<li><strong>Formats:</strong> %d · %c · %s · %%</li></ul></div>

</div>

---

<!-- SLIDE_ID aa8595d3-4b7e-4fbe-aea1-064642e8bad9 -->
<!-- SOURCE Pico-OS/README.md#10292-scanning-in-scanfpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.9 stdio: streams, formatting, and scanning

## 10.2.9.2 Scanning in `scanf.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6933 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6933:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.13%" /><col style="width:36.72%" /><col style="width:44.15%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>read_input()</code></td><td>Pushback character or stdin byte</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>skip_whitespace()</code></td><td>Skip spaces; save following character</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>read_decimal()</code></td><td>Parse signed decimal into target</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>read_string()</code></td><td>Parse nonempty whitespace-delimited string</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>scanf()</code></td><td>Number of assigned arguments</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Formats:</strong> %d · %c · %s</li>
<li><strong>Also:</strong> literal characters + whitespace</li>
<li><strong>Pushback:</strong> one character via image globals</li></ul></div>

</div>

---

<!-- SLIDE_ID 1ba66188-6bb1-4769-b9d1-4112842fab45 -->
<!-- SOURCE Pico-OS/README.md#10210-start-entering-and-leaving-a-user-program -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.10 start: entering and leaving a user program

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6948 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6948:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:21.17%" /><col style="width:29.67%" /><col style="width:49.16%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>_start()</code></td><td>Naked entry → start_process</td><td><ul><li><code>PROCESS_HEAP_START</code></li><li><code>PROCESS_HEAP_SIZE</code></li><li><code>EXIT</code></li><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>start_process()</code></td><td><ul><li>Initialize heap + environment</li><li>main → exit(status)</li></ul></td><td><ul><li><code>PROCESS_HEAP_START</code></li><li><code>PROCESS_HEAP_SIZE</code></li><li><code>EXIT</code></li><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 56f3b78a-ab49-4757-947f-b04105efef7c -->
<!-- SOURCE Pico-OS/README.md#10211-single-function-libraries -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.11 Single-function libraries

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6960 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6960:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.80%" /><col style="width:24.62%" /><col style="width:41.30%" /><col style="width:16.28%" /></colgroup><thead><tr><th>Library</th><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>schedule</code></span></td><td><span class="source-link"><code>yield(void)</code></span></td><td>Voluntarily saves the current activation and schedules another runnable process</td><td><code>YIELD</code></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>signal</code></span></td><td><span class="source-link"><code>kill(pid, signal_number)</code></span></td><td><ul><li>0 / −1</li><li>Signal 0: existence probe</li></ul></td><td><code>KILL</code></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>sys/prctl</code></span></td><td><span class="source-link"><code>prctl(option, argument)</code></span></td><td>0 or <code>-1</code>. Supports <span class="source-link"><code>PR_SET_PDEATHSIG</code></span></td><td><code>PRCTL</code></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>sys/reboot</code></span></td><td><span class="source-link"><code>reboot(command)</code></span></td><td>Restart/power-off: no return; otherwise −1</td><td><ul><li><code>REBOOT</code></li><li><code>SHUTDOWN</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>sys/stat</code></span></td><td><span class="source-link"><code>mkdir(path)</code></span></td><td>0 success; −1 path/host error</td><td><ul><li><code>MKDIR</code></li><li>Host: <code>mkdir</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Reboot:</strong> EPROM → reload kernel + init</li>
<li><strong>Self termination signal:</strong> may return before dispatch</li></ul></div>

</div>

---

<!-- SLIDE_ID d14ad219-e6dd-46fb-a9b6-019c534d9acb -->
<!-- SOURCE Pico-OS/README.md#11-complete-startup-bootloader-kernel-init-shell-and-user-applications -->

<div class="eyebrow section-eyebrow">Section 11 · Overview</div>

# 11. Complete startup: bootloader, kernel, init, shell, and user applications

<SectionOverview section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications" />

---

<!-- SLIDE_ID 6ba983ff-bdeb-4422-a3ae-b519df29be46 -->
<!-- SOURCE Pico-OS/README.md#11-complete-startup-bootloader-kernel-init-shell-and-user-applications -->

## 11. Complete startup: bootloader, kernel, init, shell, and user applications (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-6991 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/startup-memory-sequence.svg" alt="Startup sequence over adjacent EPROM, periphery with UART, kernel-reserved SRAM, and the Process and Shared Data Heap. The kernel image, heap and stack occupy the reserved area. Init, shell and applications have separate process payloads." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID e08cdffe-764a-4195-a7b6-36787b99a4e4 -->
<!-- SOURCE Pico-OS/README.md#11-complete-startup-bootloader-kernel-init-shell-and-user-applications -->

## 11. Complete startup: bootloader, kernel, init, shell, and user applications (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7007 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7007:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.39%" /><col style="width:35.21%" /><col style="width:40.40%" /></colgroup><thead><tr><th>Component</th><th>Startup implementation</th><th>Execution path</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Bootloader</td><td>Explicit naked _start</td><td>boot_main → load kernel → jump</td></tr>
<tr data-source-row="2"><td class="table-key">Kernel</td><td>Generated default _start</td><td>main → init subsystems → dispatch</td></tr>
<tr data-source-row="3"><td class="table-key">Init process</td><td>libstart; custom -C</td><td>_start → heap/env → main → exit</td></tr>
<tr data-source-row="4"><td class="table-key">Shell</td><td>libstart; custom -C</td><td>_start → heap/env → main → exit</td></tr>
<tr data-source-row="5"><td class="table-key">User applications</td><td>libstart; custom -C</td><td>_start → heap/env → main → exit</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID c52037df-3f0f-4210-8f37-bde800a69083 -->
<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-7026+code-7036" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET table-7026 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7026:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.36%" /><col style="width:18.93%" /><col style="width:18.97%" /><col style="width:16.85%" /><col style="width:18.88%" /></colgroup><thead><tr><th>Bootloader function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Called by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>_start(void)</code></span></td><td>Naked entry → start_process</td><td>Install EPROM CS/DS + temporary SRAM stack</td><td><code>boot_main()</code></td><td><strong>Machine entry:</strong> PC 0 at boot. Kernel <span class="source-link"><code>reboot()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>boot_main(void)</code></span></td><td>Load kernel; install segments; transfer control</td><td>Read five-word header; copy kernel payload</td><td><ul><li>UART host load; receive words</li><li>Copy to SRAM; jump to kernel</li></ul></td><td><strong>Bootloader functions:</strong> <span class="source-link"><code>_start()</code></span></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>start_loaded_kernel(void)</code></span></td><td>Does not return</td><td>Relative → absolute segments; replace boot stack</td><td><ul><li><code>_start</code></li><li><code>main()</code></li></ul></td><td><strong>Bootloader functions:</strong> <span class="source-link"><code>boot_main()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET code-7036 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-7036" data-code-part="1">

<!-- README_CODE_PART code-7036 lines=1-11 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>boot/bootloader.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void _start(void) {
    asm("LOADI CS 0"); // Sets CS to the EPROM base
    asm(EPROM_STACK_START_ASM); // LOADI32 SP eprom_stack_start
    asm("MOVE SP BAF"); // BAF = eprom_stack_start
    asm(EPROM_DS_START_ASM); // LOADI32 DS eprom_ds_start
    asm("ADD DS CS"); // DS = CS + eprom_ds_start
    asm("LOADI32 ACC boot_main"); // ACC = boot_main in EPROM
    asm("ADD ACC CS"); // ACC = CS + boot_main
    asm("MOVE ACC PC"); // JUMP to boot_main in EPROM
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID d022302e-3962-4938-96c5-2950b9ddd36e -->
<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7056 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/boot-eprom-registers.svg" alt="Bootloader entry register destinations. CS points to the EPROM base, ACC and PC to boot_main, DS to bootloader data, and SP and BAF to the highest SRAM cell." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0c827c0c-9fa8-4239-89cd-852896ffd165 -->
<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-compact-stacked">

<!-- README_ASSET code-7062 -->
<div class="code-columns" data-column-key="code:code-7062" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:2.408421052631579">

<ReadmeVisual kind="code" :width="560" data-code-source="code-7062" data-code-part="1">

<!-- README_CODE_PART code-7062 lines=1-21 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>boot/bootloader.picoc</span><span class="code-range">lines 1–21</span></div>

```c {lines:false}
void boot_main(void) {
    int code_start;
    int data_start;
    int stack_start;
    int word_count;
    int payload_word_count;

    uart_send_host_request("load ", "kernel/kernel.bin");

    word_count = receive_word();
    if (word_count == -1) {
        uart_print_string("error: could not load kernel\n");
        asm("JUMP 0");
    }
    if (word_count < 5) {
        uart_print_string("error: invalid kernel image\n");
        asm("JUMP 0");
    }
    code_start = receive_word();
    data_start = receive_word();
    receive_word(); // Discards heap_start because the kernel uses memory_constants.header
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-7062" data-code-part="2">

<!-- README_CODE_PART code-7062 lines=22-42 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>boot/bootloader.picoc</span><span class="code-range">lines 22–42</span></div>

```c {lines:false}
    receive_word(); // Discards heap_size because the kernel uses memory_constants.header
    stack_start = receive_word();
    if (stack_start == -1) {
        stack_start = SRAM_MAX_ADDRESS;
    }

    payload_word_count = word_count - 5;
    uart_print_loading_bar_label(
        loading_bar_enabled,
        "load ",
        "kernel/kernel.bin"
    );
    receive_words_to_sram(
        SRAM_BASE,
        payload_word_count,
        loading_bar_enabled
    );
    asm("LOADI32 ACC start_loaded_kernel"); // ACC = start_loaded_kernel
    asm("ADD ACC CS"); // ACC = CS + start_loaded_kernel in EPROM
    asm("MOVE ACC PC"); // JUMP to start_loaded_kernel in EPROM
}
```

</div>

</ReadmeVisual>

</div>

<!-- README_ASSET list-7109 -->
<div class="readme-list"><ul><li>Request <strong>kernel.bin</strong>; validate header size</li>
<li>Read offsets; <strong>−1 stack</strong> → SRAM top</li>
<li>Receive payload through <strong>polling/DMA</strong></li>
<li>Install kernel <strong>registers</strong>; enter code</li></ul></div>

</div>

</div>

---

<!-- SLIDE_ID ea0769e5-c963-4616-92ba-449ef9a48513 -->
<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7125 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-7125" data-code-part="1">

<!-- README_CODE_PART code-7125 lines=1-20 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>boot/bootloader.picoc</span><span class="code-range"></span></div>

```c {lines:false}
__attribute__((naked))
void start_loaded_kernel(void) {
    // BAF points behind the kernel metadata
    asm("LOADIN BAF ACC 0"); // ACC = code_start
    asm("LOADIN BAF IN1 -1"); // IN1 = data_start
    asm("LOADIN BAF IN2 -2"); // IN2 = stack_start

    asm("LOADI32 CS -2147483648"); // -2^31, SRAM base
    asm("MOVE CS DS"); // DS = SRAM base
    asm("MOVE CS SP"); // SP = SRAM base

    asm("ADD CS ACC"); // CS = SRAM base + code_start

    asm("ADD DS IN1"); // DS = SRAM base + data_start

    asm("ADD SP IN2"); // SP = SRAM base + stack_start
    asm("MOVE SP BAF"); // BAF = SP

    asm("MOVE CS PC"); // JUMP to CS
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID a8d16977-6132-42ef-8544-e93f5e8bba1b -->
<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (5)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7155 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/boot-kernel-registers.svg" alt="Kernel handoff register destinations. CS and PC point to kernel text, DS to kernel data, and SP and BAF to the highest kernel stack cell. ACC, IN1, and IN2 retain code_start, data_start, and stack_start offsets." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID ddaf829e-3b87-4e1d-8d5d-94ff9afa0bc5 -->
<!-- SOURCE Pico-OS/README.md#112-kernel-startup -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.2 Kernel startup (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns prose-with-code" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr)"><div class="readme-list prose-summary"><ul><li><strong>Globals:</strong> kernel .data</li>
<li><strong>init_request:</strong> kernel-stack local</li></ul></div>
<!-- README_ASSET code-1004 repeated -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-1004" data-code-part="1">

<!-- README_CODE_PART code-1004 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>Compiler-generated _start · source equivalent</span><span class="code-range"></span></div>

```c {lines:false}
void _start(void) {
    main();
    asm("LOADI ACC 0");
    asm("JUMP 0");
}
```

</div>

</ReadmeVisual></div>

</div>

---

<!-- SLIDE_ID 1aef0ee8-6100-4294-aa97-dd3d2be77003 -->
<!-- SOURCE Pico-OS/README.md#112-kernel-startup -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.2 Kernel startup (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-compact-stacked">

<!-- README_ASSET code-7173 -->
<div class="code-columns" data-column-key="code:code-7173" style="--readme-columns:minmax(0, 40fr) minmax(0, 60fr);--source-aspect:3.590909090909091">

<ReadmeVisual kind="code" :width="401.19999999999993" data-code-source="code-7173" data-code-part="1">

<!-- README_CODE_PART code-7173 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/kernel.picoc</span><span class="code-range">lines 1–12</span></div>

```c {lines:false}
int main(void) {
    int init_pid;
    struct RunProcessRequest init_request;

    activate_kernel_stack_boundary();
    init_kernel_heap();
    initialize_terminal();
    initialize_process_table();
    init_process_shared_data_heap();
    initialize_shared_memory();
    if (dma_is_active()) {
        initialize_dma();
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="601.8" data-code-source="code-7173" data-code-part="2">

<!-- README_CODE_PART code-7173 lines=13-24 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/kernel.picoc</span><span class="code-range">lines 13–24</span></div>

```c {lines:false}
    }
    interrupt_controller_initialize();
    init_pid = load_process("system/init.bin", loading_bar_enabled);
    init_request.pid = init_pid;
    init_request.arguments = NULL;
    init_request.environment = NULL;
    if (mark_process_ready_with_arguments(&init_request)) {
        interrupt_controller_activate_timer();
        dispatcher_start_next_process();
    }
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

<!-- README_ASSET list-7202 -->
<div class="readme-list"><ul><li>Initialize <strong>heaps + stack boundary</strong></li>
<li>Reset <strong>terminal, process list, shared-memory registry</strong></li>
<li>Initialize <strong>DMA + interrupt controller</strong></li>
<li>Load init; build <strong>initial stack</strong>; READY</li>
<li><strong>Dispatch</strong> init; startup never resumes</li></ul></div>

</div>
<div class="readme-list prose-summary"><div class="readme-item"><strong>Generated entry:</strong> calls kernel main</div></div>

</div>

---

<!-- SLIDE_ID 083c38ea-e8ba-4f4d-9b1c-ec264b9fd269 -->
<!-- SOURCE Pico-OS/README.md#1121-loading-init-and-entering-normal-execution -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.2 Kernel startup

## 11.2.1 Loading init and entering normal execution

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-7247+list-7267" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-7247 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-7247" data-code-part="1">

<!-- README_CODE_PART code-7247 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/kernel.picoc</span><span class="code-range"></span></div>

```c {lines:false}
void shutdown(void) {
    asm("JUMP 0");
}

void reboot(void) {
    int device = 0;

    while (device < INTERRUPT_DEVICE_COUNT) {
        interrupt_controller_disable_device(device);
        device = device + 1;
    }
    periphery_write_register(INTERRUPT_CONTROLLER_TIMER_INTERVAL_REGISTER, 0);
    periphery_write_register(STACK_HEAP_BOUNDARY_REGISTER, 0);
    asm("LOADI PC 0");
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET list-7267 -->
<div class="readme-list"><ul><li><strong>shutdown:</strong> halt; retain allocations</li>
<li><strong>reboot:</strong> disable interrupts; clear timer/boundary</li>
<li>PC ← <strong>0</strong>; restart EPROM bootloader</li></ul></div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Init:</strong> PID 1; directory /; no parent</li>
<li><strong>Environment:</strong> empty; argv[0] only</li>
<li><strong>First dispatch:</strong> RTI → libstart; not main directly</li>
<li><strong>Load/run failure:</strong> return to generated halt</li></ul></div>

</div>

---

<!-- SLIDE_ID 6ce48ef8-591c-49ae-a58e-f7a99576e37f -->
<!-- SOURCE Pico-OS/README.md#113-init-process -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.3 Init process

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1029+code-1038" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1029 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1029" data-code-part="1">

<!-- README_CODE_PART code-1029 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/libstart.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1038 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1038" data-code-part="1">

<!-- README_CODE_PART code-1038 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/start.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "../stdlib/stdlib.header"

int main(int argc, char **argv);
void initialize_environment(char **environment);

void start_process(int argc, char **argv) {
    init_process_heap();
    initialize_environment(argv + argc + 1);
    exit(main(argc, argv));
}

__attribute__((naked))
void _start(int argc, char *first_argument) {
    start_process(argc, (char **)&first_argument);
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 9e2731c3-c572-4d7f-9ad0-078edba26eb5 -->
<!-- SOURCE Pico-OS/README.md#1131-init-responsibilities -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.1 Init responsibilities

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7294 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7294:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.19%" /><col style="width:68.81%" /></colgroup><thead><tr><th>Component</th><th>Responsibility</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel <span class="source-link"><code>main()</code></span></td><td>Initialize subsystems + dispatch</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>Init</code></span></td><td>Configure environment; supervise shell</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>Shell</code></span></td><td>Terminal ownership + command execution</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Kernel:</strong> execution + resources</li>
<li><strong>Init:</strong> configure session; keep shell available</li>
<li><strong>Init path:</strong> resolve from /; no pwd host request</li></ul></div>
<aside class="context-note"><b>Init / PID 1 analogy</b><ul><li><strong>Userspace supervisor:</strong> environment → shell → wait → repeat</li>
<li><strong>Kernel:</strong> mechanisms; <strong>init:</strong> session policy</li></ul></aside>

</div>

---

<!-- SLIDE_ID cc487a97-4c03-4111-a5ba-87a158a402bb -->
<!-- SOURCE Pico-OS/README.md#1132-initial-environment-configuration -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.2 Initial environment configuration

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7312 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7312:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.04%" /><col style="width:28.98%" /><col style="width:37.99%" /></colgroup><thead><tr><th>Init function</th><th>Result</th><th>Library functions</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>init_write_error(text)</code></span></td><td>No value</td><td>write → stderr diagnostic</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>read_environment(void)</code></span></td><td>Read /config environment</td><td>Read config; setenv; release buffers</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>main(void)</code></span></td><td>Setup/launch failure → 1; otherwise supervises</td><td><span class="source-link"><code>setenv()</code></span>, <span class="source-link"><code>load()</code></span>, <span class="source-link"><code>run()</code></span>, and exact-child <span class="source-link"><code>waitpid()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>257-cell buffer:</strong> reject file ≥256 cells</li>
<li><strong>Records:</strong> newline/CRLF-separated NAME=value</li>
<li><strong>Configuration failure:</strong> init returns 1</li>
<li><strong>PATH=/user:</strong> optional loading-bar entry</li></ul></div>

</div>

---

<!-- SLIDE_ID 53bcf41c-58cb-42b8-b736-411b5ef70f26 -->
<!-- SOURCE Pico-OS/README.md#1133-loading-starting-and-waiting-for-the-shell -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.3 Loading, starting, and waiting for the shell (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-compact-stacked">

<!-- README_ASSET code-7329 -->
<div class="code-columns" data-column-key="code:code-7329" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);--source-aspect:3.355111633372503">

<ReadmeVisual kind="code" :width="657.3913043478261" data-code-source="code-7329" data-code-part="1">

<!-- README_CODE_PART code-7329 lines=1-16 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>system/init.picoc</span><span class="code-range">lines 1–16</span></div>

```c {lines:false}
int main(void) {
    int shell_pid;

    if (!read_environment()) {
        return 1;
    }
    if (loading_bar_enabled) {
        if (setenv(
                LOADING_BAR_ENVIRONMENT_VARIABLE,
                "true",
                true
            ) != 0) {
            init_write_error("init: could not configure loading bar\n");
            return 1;
        }
    }
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-7329" data-code-part="2">

<!-- README_CODE_PART code-7329 lines=17-32 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>system/init.picoc</span><span class="code-range">lines 17–32</span></div>

```c {lines:false}

    while (true) {
        shell_pid = load("./user/shell.bin");
        if (shell_pid == 0) {
            init_write_error("init: could not load shell\n");
            return 1;
        }

        if (!run(shell_pid, NULL, NULL)) {
            init_write_error("init: could not start shell\n");
            return 1;
        }

        waitpid(shell_pid);
    }
}
```

</div>

</ReadmeVisual>

</div>

<!-- README_ASSET list-7366 -->
<div class="readme-list"><ul><li>Read config; set <strong>loading-bar environment</strong></li>
<li><strong>Load/run</strong> shell; inherit environment + descriptors</li>
<li><strong>Waitpid</strong> exact PID; restart after exit/stop</li>
<li>Environment/load/run failure → <strong>status 1</strong></li></ul></div>

</div>

</div>

---

<!-- SLIDE_ID 99561f19-a97f-4372-b8e1-a5e5c5bb8b48 -->
<!-- SOURCE Pico-OS/README.md#1133-loading-starting-and-waiting-for-the-shell -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.3 Loading, starting, and waiting for the shell (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Environment:</strong> config parsed before shell loop</li>
<li><strong>waitpid:</strong> exact shell PID; exit or stop</li>
<li><strong>Failure:</strong> environment/load/run → status 1</li></ul></div>

</div>

---

<!-- SLIDE_ID 5bd4796d-e12d-4c12-8c43-d26718e7685e -->
<!-- SOURCE Pico-OS/README.md#1134-shell-startup -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.4 Shell startup

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1029+code-1038" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1029 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1029" data-code-part="1">

<!-- README_CODE_PART code-1029 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/libstart.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1038 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1038" data-code-part="1">

<!-- README_CODE_PART code-1038 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/start.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "../stdlib/stdlib.header"

int main(int argc, char **argv);
void initialize_environment(char **environment);

void start_process(int argc, char **argv) {
    init_process_heap();
    initialize_environment(argv + argc + 1);
    exit(main(argc, argv));
}

__attribute__((naked))
void _start(int argc, char *first_argument) {
    start_process(argc, (char **)&first_argument);
}
```

</div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Own heap + environment:</strong> libstart before main</li>
<li><strong>Descriptors + input ownership:</strong> then command loop</li>
<li><strong>Init waits:</strong> shell return permits new session</li></ul></div>

</div>

---

<!-- SLIDE_ID 586ab56d-c506-40eb-bd57-d5ca8a404017 -->
<!-- SOURCE Pico-OS/README.md#1135-loading-user-applications -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.5 Loading user applications

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1029+code-1038" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1029 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1029" data-code-part="1">

<!-- README_CODE_PART code-1029 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/libstart.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1038 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1038" data-code-part="1">

<!-- README_CODE_PART code-1038 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>library/start/start.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "../stdlib/stdlib.header"

int main(int argc, char **argv);
void initialize_environment(char **environment);

void start_process(int argc, char **argv) {
    init_process_heap();
    initialize_environment(argv + argc + 1);
    exit(main(argc, argv));
}

__attribute__((naked))
void _start(int argc, char *first_argument) {
    start_process(argc, (char **)&first_argument);
}
```

</div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>External command:</strong> fresh payload; load + run</li>
<li><strong>Built-in:</strong> executes inside shell</li>
<li><strong>Foreground:</strong> shell waits; <strong>background:</strong> next prompt</li></ul></div>

</div>

---

<!-- SLIDE_ID bdabf2d4-329b-4ea9-a1e2-0eec4a14928e -->
<!-- SOURCE Pico-OS/README.md#1136-shell-exit-and-restart-policy -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.6 Shell exit and restart policy

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>exit</strong> → end session; init restarts shell</li>
<li><strong>poweroff</strong> → halt; <strong>reboot</strong> → EPROM</li>
<li><strong>Stopped</strong> shell can trigger new session</li>
<li><strong>Init</strong> in /system; commands in /user</li></ul></div>

</div>

---

<!-- SLIDE_ID 3225bb76-16b0-49fd-8d6d-5aabecfa69c9 -->
<!-- SOURCE Pico-OS/README.md#1137-when-init-terminates -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.7 When init terminates

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>PID 1</strong> has no signal protection</li>
<li>Kernel releases <strong>init</strong> resources</li>
<li><strong>Children orphaned</strong> + parent-death signals</li>
<li>Survivors continue; <strong>init</strong> never restarted</li>
<li><strong>Final-candidate deletion:</strong> dispatcher limitation</li></ul></div>

</div>

---

<!-- SLIDE_ID cc8695f4-0139-4e21-a4f6-468e914c6c30 -->
<!-- SOURCE Pico-OS/README.md#12-shell -->

<div class="eyebrow section-eyebrow">Section 12 · Overview</div>

# 12. Shell

<SectionOverview section="12-shell" />

---

<!-- SLIDE_ID 9ae26a61-ba92-41ff-b1a3-785737926a3c -->
<!-- SOURCE Pico-OS/README.md#121-shell-owned-state -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.1 Shell-owned state (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7460 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-7460:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels table-panels-two" data-column-key="table:table-7460:1,2,3,4,5,6,7,8,9,10" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:45.34%" /><col style="width:54.66%" /></colgroup><thead><tr><th>Global</th><th>Meaning and storage</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>last_command_exit_status</code></span></td><td>$? status integer</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>last_background_process_id</code></span></td><td><ul><li>Background/stopped PID</li><li>Used by $!, fg, bg</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>shell_executable_path</code></span></td><td>Embedded scratch buffer for one <code>PATH</code> candidate</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>shell_pipe_left_command</code></span>, <span class="source-link"><code>shell_pipe_right_command</code></span>, <span class="source-link"><code>shell_pipe_path</code></span></td><td>Embedded command and temporary-path storage for one two-command pipeline</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>command_history</code></span></td><td>Eight-command ring; skip consecutive duplicates</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:45.34%" /><col style="width:54.66%" /></colgroup><thead><tr><th>Global</th><th>Meaning and storage</th></tr></thead><tbody><tr data-source-row="6"><td class="table-key"><span class="source-link"><code>command_history_draft</code></span></td><td>Current unfinished line preserved while navigating history</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>shell_line_erase_sequence</code></span></td><td>Embedded scratch array holding one batched terminal erase sequence</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>shell_input_buffer</code></span></td><td>Retain up to 128 read-ahead bytes</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>command_history_start</code></span>, <span class="source-link"><code>command_history_count</code></span></td><td>History ring indices/count</td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>shell_input_index</code></span>, <span class="source-link"><code>shell_input_count</code></span></td><td>Next retained byte + valid byte count</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>.data:</strong> history, read-ahead, pipeline scratch</li>
<li><strong>Stack:</strong> 80-cell command array</li></ul></div>

</div>

---

<!-- SLIDE_ID 75ddbca6-30c7-4ab9-8c9a-f02aae80ffd1 -->
<!-- SOURCE Pico-OS/README.md#121-shell-owned-state -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.1 Shell-owned state (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7489 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-shell-state.svg" alt="Wide SRAM layout showing the kernel terminal buffer in kernel .data, shell PCB and descriptor allocations in the Kernel Heap, and the shell Process Payload expanded into its image globals, User Process Heap environment allocations, and stack locals" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Input path:</strong> terminal ring → shell buffer → command</li>
<li><strong>Environment:</strong> separate User Process Heap allocations</li></ul></div>

</div>

---

<!-- SLIDE_ID e18cd8bf-39c7-44e1-b362-775224c97098 -->
<!-- SOURCE Pico-OS/README.md#122-shell-startup-and-command-loop -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.2 Shell startup and command loop (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-7521+code-7530" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET table-7521 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7521:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:12.17%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:16.27%" /><col style="width:16.27%" /></colgroup><thead><tr><th>Buffer state</th><th>Cell 0</th><th>Cell 1</th><th>Cell 2</th><th>Cell 3</th><th>Cell 4</th><th>Cell 5</th><th>Cell 6</th><th>shell_input_index</th><th>shell_input_count</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">After <span class="source-link"><code>read()</code></span></td><td><code>p</code></td><td><code>w</code></td><td><code>d</code></td><td><code>\n</code></td><td><code>l</code></td><td><code>s</code></td><td><code>\n</code></td><td>0</td><td>7</td></tr>
<tr data-source-row="2"><td class="table-key">After <span class="source-link"><code>read_line()</code></span> returns <code>pwd</code></td><td><code>p</code></td><td><code>w</code></td><td><code>d</code></td><td><code>\n</code></td><td><code>l</code></td><td><code>s</code></td><td><code>\n</code></td><td>4</td><td>7</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET code-7530 -->
<ReadmeVisual kind="code" :width="513" data-code-source="code-7530" data-code-part="1">

<!-- README_CODE_PART code-7530 lines=1-17 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int read_shell_character(char *character) {
    if (shell_input_index >= shell_input_count) {
        shell_input_count = read(
            STDIN_FILENO,
            shell_input_buffer,
            SHELL_INPUT_BUFFER_CAPACITY
        );
        shell_input_index = 0;
        if (shell_input_count <= 0) {
            return shell_input_count;
        }
    }

    *character = shell_input_buffer[shell_input_index];
    shell_input_index = shell_input_index + 1;
    return 1;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 15bcbb9e-dd2b-43a5-8482-1008a2d62543 -->
<!-- SOURCE Pico-OS/README.md#122-shell-startup-and-command-loop -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.2 Shell startup and command loop (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7552 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7552:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:43.94%" /><col style="width:20.26%" /><col style="width:35.80%" /></colgroup><thead><tr><th>Shell function</th><th>Result</th><th>Library functions</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>read_shell_character(character)</code></span></td><td>1 byte; 0 EOF; negative error</td><td>Refill once; consume retained bytes</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>read_line(buffer, capacity)</code></span></td><td>Length; −1 EOF</td><td>Batch echoes; edit line; navigate history</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>remember_shell_command(command)</code></span></td><td>No value</td><td>strcmp/strcpy; update eight-entry ring</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>expand_variables(arguments, result, capacity)</code></span></td><td>Expanded buffer; bounded length; NULL on null</td><td>getenv + $?/$!; retain quote bytes</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>load_from_path(name)</code></span></td><td>Loaded PID, or 0</td><td>Search PATH; load candidates in order</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>run_process(pid, arguments, background, stdin_path, stdout_path, append_stdout, stderr_path, append_stderr)</code></span></td><td><code>true</code> when <span class="source-link"><code>run()</code></span> succeeds, otherwise <code>false</code></td><td>Redirect; run; foreground/wait; update statuses</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>continue_background_process(foreground)</code></span></td><td><code>true</code> when the tracked process was continued, otherwise <code>false</code></td><td><span class="source-link"><code>kill()</code></span> and, for <code>fg</code>, <span class="source-link"><code>set_foreground_process()</code></span> and <span class="source-link"><code>waitpid()</code></span></td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>eval(command)</code></span></td><td><code>false</code> only for <code>exit</code>, otherwise <code>true</code></td><td>Selects a built-in or external execution path</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>main(argc, argv)</code></span></td><td>Shell exit status</td><td>Initialize ownership; close scratch; command loop</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Redirected stdin:</strong> commands until EOF</li>
<li><strong>Read-ahead:</strong> retain bytes after first newline</li></ul></div>

</div>

---

<!-- SLIDE_ID b85a5ba9-2bda-4751-aeeb-8ff324aec2d4 -->
<!-- SOURCE Pico-OS/README.md#122-shell-startup-and-command-loop -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.2 Shell startup and command loop (3)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Startup:</strong> close 3–7; keep inherited standard streams</li>
<li><strong>Input ownership:</strong> negative shell PID</li>
<li><strong>Parent-death policy:</strong> SIGKILL</li></ul></div>

</div>

---

<!-- SLIDE_ID 39309ee3-ec53-46bf-b8d0-7f648ee557f2 -->
<!-- SOURCE Pico-OS/README.md#123-interactive-line-editing-and-command-history -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.3 Interactive line editing and command history (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7571 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-7571:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels table-panels-two" data-column-key="table:table-7571:1,2,3,4,5,6,7,8,9,10" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:22.82%" /><col style="width:37.85%" /><col style="width:39.33%" /></colgroup><thead><tr><th>Input</th><th>Shell behavior</th><th>Implementation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Line feed or carriage return</td><td>Echo one newline and finish the command</td><td><span class="source-link"><code>read_line()</code></span> calls <span class="source-link"><code>shell_write_character()</code></span> and ends its loop</td></tr>
<tr data-source-row="2"><td class="table-key">Backspace (8) or Delete (127)</td><td>Remove one buffered character and erase it visually</td><td><span class="source-link"><code>read_line()</code></span> calls <span class="source-link"><code>erase_shell_line_suffix()</code></span> with <code>length - 1</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>Ctrl+U</code> (21)</td><td>Erase the complete current line</td><td><span class="source-link"><code>read_line()</code></span> calls <span class="source-link"><code>erase_shell_line_suffix()</code></span> with retained length 0</td></tr>
<tr data-source-row="4"><td class="table-key"><code>Ctrl+V</code> (22)</td><td>Ignore the byte because PicoOS has no literal-next-character mode</td><td>No matching branch; discarded</td></tr>
<tr data-source-row="5"><td class="table-key"><code>Ctrl+W</code> (23)</td><td>Erase trailing whitespace and the previous word</td><td><span class="source-link"><code>read_line()</code></span> finds the retained prefix, then calls <span class="source-link"><code>erase_shell_line_suffix()</code></span></td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:22.82%" /><col style="width:37.85%" /><col style="width:39.33%" /></colgroup><thead><tr><th>Input</th><th>Shell behavior</th><th>Implementation</th></tr></thead><tbody><tr data-source-row="6"><td class="table-key">Up: ESC [ A / ESC O A</td><td>Move toward older entries in the eight-command history ring</td><td><span class="source-link"><code>read_line()</code></span> decodes the sequence, then calls <span class="source-link"><code>navigate_command_history(..., 1)</code></span></td></tr>
<tr data-source-row="7"><td class="table-key">Down: ESC [ B / ESC O B</td><td>Move toward newer entries and finally restore the draft</td><td><span class="source-link"><code>read_line()</code></span> calls <span class="source-link"><code>navigate_command_history(..., -1)</code></span></td></tr>
<tr data-source-row="8"><td class="table-key">Left/right: ESC [ C/D / ESC O C/D</td><td>Consume the escape sequence but do not move the cursor</td><td><span class="source-link"><code>read_line()</code></span> sets <span class="source-link"><code>process_character</code></span> to <code>false</code> without changing the line</td></tr>
<tr data-source-row="9"><td class="table-key">Tab</td><td>Append one space if room remains</td><td><span class="source-link"><code>read_line()</code></span> converts it to a space, then calls <span class="source-link"><code>append_shell_line_character()</code></span></td></tr>
<tr data-source-row="10"><td class="table-key">Printable byte</td><td>Append it if room remains</td><td><span class="source-link"><code>read_line()</code></span> calls <span class="source-link"><code>append_shell_line_character()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Command buffer:</strong> 79 characters + terminator</li>
<li><strong>Ctrl+C / Ctrl+Z:</strong> consumed before line editing</li></ul></div>

</div>

---

<!-- SLIDE_ID 70987023-e41e-4938-b912-13bb2a590306 -->
<!-- SOURCE Pico-OS/README.md#123-interactive-line-editing-and-command-history -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.3 Interactive line editing and command history (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7586 -->
<div class="code-columns" data-column-key="code:code-7586" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:2.306451612903226">

<ReadmeVisual kind="code" :width="560" data-code-source="code-7586" data-code-part="1">

<!-- README_CODE_PART code-7586 lines=1-22 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 1–22</span></div>

```c {lines:false}
int read_line(char *buffer, int capacity) {
    // ...
    while (!complete) {
        read_result = read_shell_character(&character);
        if (read_result == 1) {
            // ...
            if (escape_sequence_state == 1) {
                // ...
            } else if (escape_sequence_state == 2) {
                // ...
                if (character == 'A') {
                    length = navigate_command_history(
                        buffer, length, capacity, &history_position, 1
                    );
                    process_character = false;
                } else if (character == 'B') {
                    length = navigate_command_history(
                        buffer, length, capacity, &history_position, -1
                    );
                    process_character = false;
                }
                // ...
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-7586" data-code-part="2">

<!-- README_CODE_PART code-7586 lines=23-43 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 23–43</span></div>

```c {lines:false}
            }
            // ...
            if (process_character) {
                if (character == '\n' || character == '\r') {
                    // ...
                } else if (character == '\b' || character == 127) {
                    // ...
                } else if (character == SHELL_CTRL_U) {
                    length = erase_shell_line_suffix(length, 0);
                } else if (character == SHELL_CTRL_W) {
                    // ...
                    length = erase_shell_line_suffix(length, retained_length);
                }
                // ...
            }
            // ...
        }
        // ...
    }
    // ...
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID ba16f374-23ba-4d79-be8a-fc6487e0c0a1 -->
<!-- SOURCE Pico-OS/README.md#123-interactive-line-editing-and-command-history -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.3 Interactive line editing and command history (3)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Read-ahead:</strong> up to 128 cells</li>
<li><strong>Echo:</strong> batch printable bytes; flush before controls</li></ul></div>

</div>

---

<!-- SLIDE_ID 3faa4010-66f0-4bf9-bb05-aecebd3192ee -->
<!-- SOURCE Pico-OS/README.md#124-command-parsing-expansion-and-execution -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.4 Command parsing, expansion, and execution (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7653 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7653:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.40%" /><col style="width:31.28%" /><col style="width:38.33%" /></colgroup><thead><tr><th>Stage</th><th>Result</th><th>What changed</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Input</td><td>Original command + redirection + &amp;</td><td>Nothing yet</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>strip_background_operator()</code></span></td><td>Trailing &amp; removed; background=true</td><td>Removed only the trailing <code>&amp;</code> and adjacent whitespace</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>strip_command_redirections()</code></span></td><td>Command prefix + stdout_path</td><td>Split final &gt;; path stays unexpanded</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>command_arguments()</code></span></td><td>Separated name + raw arguments</td><td>Terminate name; retain raw argument suffix</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>load_from_path()</code></span></td><td>/user/echo.bin; NEW PID</td><td>Used <code>PATH</code>. This step does <strong>not</strong> copy descriptors</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>expand_variables()</code></span></td><td>&quot;hello Ada (0)&quot;; quotes retained</td><td>Replaced <code>$NAME</code> and <code>$?</code>, deliberately retaining quote bytes</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>run()</code></span></td><td>argv[1] = hello Ada (0)</td><td>Strip matching quotes; inherit FDs; READY</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Conventional shell comparison</b><ul><li><strong>PicoOS single quotes:</strong> still expand variables</li>
<li><strong>echo:</strong> interprets \n itself; no shell escape pass</li></ul></aside>

</div>

---

<!-- SLIDE_ID 3c6ad1ca-5134-4994-9462-70c611d1b964 -->
<!-- SOURCE Pico-OS/README.md#124-command-parsing-expansion-and-execution -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.4 Command parsing, expansion, and execution (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>One unquoted pipe:</strong> balanced quotes required</li>
<li><strong>Arguments only:</strong> $NAME, $?, $! expansion</li>
<li><strong>Names / redirection paths:</strong> no expansion</li>
<li><strong>Quotes:</strong> preserve whitespace; do not suppress expansion</li>
<li><strong>Backslashes:</strong> no general shell escape pass</li>
<li><strong>PATH:</strong> colon-separated; slash names load directly</li></ul></div>

</div>

---

<!-- SLIDE_ID 0594b9f5-0bd9-4b7c-b21d-35371d14269f -->
<!-- SOURCE Pico-OS/README.md#125-shell-built-in-commands -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.5 Shell built-in commands

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7687 -->
<ReadmeVisual kind="table" :width="1280" class="inventory-grid">

<div class="readme-tiles" v-pre><div class="readme-tile"><div class="tile-name"><code>exit</code></div><div class="tile-detail">End current session</div><div class="tile-detail">libstart → exit(main_result)</div></div>
<div class="readme-tile"><div class="tile-name"><code>eval COMMAND</code></div><div class="tile-detail">Recursively evaluate command; same shell state</div><div class="tile-detail">eval; normal command APIs</div></div>
<div class="readme-tile"><div class="tile-name"><code>export NAME=value</code></div><div class="tile-detail">Expand assignment; update environment</div><div class="tile-detail">getenv/setenv</div></div>
<div class="readme-tile"><div class="tile-name"><code>cd DIRECTORY</code></div><div class="tile-detail">Validate path; change shell directory</div><div class="tile-detail">chdir; host directory check</div></div>
<div class="readme-tile"><div class="tile-name"><code>load PATH</code></div><div class="tile-detail">Load binary → NEW PCB</div><div class="tile-detail">load; host file-size + read-range</div></div>
<div class="readme-tile"><div class="tile-name"><code>run PID [ARGUMENTS]</code></div><div class="tile-detail">Run child; background + redirection</div><div class="tile-detail">Redirect → run → wait → restore</div></div>
<div class="readme-tile"><div class="tile-name"><code>unload PID</code></div><div class="tile-detail">Remove noncurrent process</div><div class="tile-detail">unload</div></div>
<div class="readme-tile"><div class="tile-name"><code>fg</code></div><div class="tile-detail">Continue job; foreground; wait</div><div class="tile-detail">Foreground ownership; SIGCONT; waitpid</div></div>
<div class="readme-tile"><div class="tile-name"><code>bg</code></div><div class="tile-detail">Continue job in background</div><div class="tile-detail">kill(SIGCONT)</div></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>9 built-ins:</strong> mutate shell’s own state</li>
<li><strong>No unset / wait</strong> built-ins</li>
<li><strong>NAME=value alone:</strong> external command</li>
<li><strong>Operands:</strong> required; exit/fg/bg reject extras</li></ul></div>

</div>

---

<!-- SLIDE_ID 8e95c7a9-b606-42dd-a4eb-43ec401962d1 -->
<!-- SOURCE Pico-OS/README.md#1251-foreground-processes-background-processes-and-job-control-signals -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink> · 12.5 Shell built-in commands

## 12.5.1 Foreground processes, background processes, and job-control signals (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7719 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-job-control.svg" alt="SRAM allocation and address links for shell and child, with inline job-control PIDs and status" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary nested-summary"><ul><li><strong>Job control</strong><ul><li><strong>Foreground:</strong> transfer input; exact-PID wait; reclaim</li>
<li><strong>Stopped child:</strong> tracked by $! for fg/bg</li>
<li><strong>fg:</strong> ownership → SIGCONT → wait</li>
<li><strong>Background:</strong> independent redirected descriptors</li></ul></li>
<li><strong>Status + cleanup</strong><ul><li><strong>$!:</strong> one remembered PID; no job table</li>
<li><strong>Background completion:</strong> no asynchronous status update</li>
<li><strong>Background zombies:</strong> no automatic collection</li>
<li><strong>fg zombie:</strong> SIGCONT fails; does not reap</li></ul></li></ul></div>

</div>

---

<!-- SLIDE_ID 67c051c0-5f86-42a1-b5d6-3b576585eaa1 -->
<!-- SOURCE Pico-OS/README.md#1251-foreground-processes-background-processes-and-job-control-signals -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink> · 12.5 Shell built-in commands

## 12.5.1 Foreground processes, background processes, and job-control signals (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7737 -->
<div class="code-columns" data-column-key="code:code-7737" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:1.8392282958199357">

<ReadmeVisual kind="code" :width="560" data-code-source="code-7737" data-code-part="1">

<!-- README_CODE_PART code-7737 lines=1-28 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 1–28</span></div>

```c {lines:false}
#include "../library/unistd/unistd.header"
#include "../library/fcntl/fcntl.header"
#include "../library/sys/wait/wait.header"
// ...

int last_command_exit_status = 0;
int last_background_process_id = 0;
// ...

bool run_process(
    int pid,
    char *arguments,
    bool background,
    char *stdin_path,
    char *stdout_path,
    bool append_stdout,
    char *stderr_path,
    bool append_stderr
) {
    char expanded_arguments[SHELL_COMMAND_BUFFER_CAPACITY];
    bool stdin_redirected = false;
    bool stdout_redirected = false;
    bool stderr_redirected = false;
    bool started;

    // ...
    started = run(pid, expand_variables(
                           arguments,
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-7737" data-code-part="2">

<!-- README_CODE_PART code-7737 lines=29-56 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 29–56</span></div>

```c {lines:false}
                           expanded_arguments,
                           SHELL_COMMAND_BUFFER_CAPACITY),
                  NULL);
    restore_standard_descriptors(
        stdin_redirected, stdout_redirected, stderr_redirected
    );

    if (!started) {
        shell_write_error_string("error: could not start process\n");
    } else if (background) {
        last_background_process_id = pid;
    } else {
        set_foreground_process(pid);
        last_command_exit_status = waitpid(pid);
        set_foreground_process(0);
        report_foreground_process_status(
            pid,
            last_command_exit_status
        );
        if (WIFSTOPPED(last_command_exit_status)) {
            last_background_process_id = pid;
        } else if (last_background_process_id == pid) {
            last_background_process_id = 0;
        }
    }
    return started;
}
// ...
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 56091088-7299-4b8a-8425-f0e86aac3f36 -->
<!-- SOURCE Pico-OS/README.md#1251-foreground-processes-background-processes-and-job-control-signals -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink> · 12.5 Shell built-in commands

## 12.5.1 Foreground processes, background processes, and job-control signals (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7804 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-7804" data-code-part="1">

<!-- README_CODE_PART code-7804 lines=1-17 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/signal.picoc</span><span class="code-range"></span></div>

```c {lines:false}
int set_foreground_process(int pid) {
    struct ProcessControlBlock *process;

    if (pid == 0) {
        foreground_process_target = -current_process()->pid;
        return 0;
    }

    process = find_process_by_pid(pid);
    if (process == NULL ||
        process->parent_pid != current_process()->pid) {
        return -1;
    }

    foreground_process_target = pid;
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 98947404-3643-444c-8040-551d7f48d31c -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7929 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-redirection-initial.svg" alt="Starting SRAM overview before load(): only shell process 1 is shown. Its stdin, stdout and stderr each point to a separate complete /device/terminal.dev string. Slots 3–7 have NULL paths and no allocations. Child process 2 has not been created." />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary nested-summary"><ul><li><strong>Redirection rules</strong><ul><li><strong>Backup slots:</strong> stdin 5; stdout 6; stderr 7</li>
<li><strong>Open 0–4 full:</strong> fail before starting child</li>
<li><strong>Operators:</strong> input → stdout → stderr order</li>
<li><strong>Parse suffixes:</strong> remove in reverse order</li></ul></li>
<li><strong>Lifetime + failures</strong><ul><li><strong>Dup2:</strong> separate path + offset copies</li>
<li><strong>Restore shell:</strong> before foreground wait</li>
<li><strong>Setup failure:</strong> close temporary + saved descriptors</li>
<li><strong>Nested shell:</strong> keeps redirected 0–2</li></ul></li></ul></div>
<aside class="context-note"><b>Unix fork + exec / PicoOS</b><ul><li><strong>Unix:</strong> redirect forked child; replace image</li>
<li><strong>PicoOS:</strong> redirect shell; copy on run; restore</li>
<li><strong>No paging:</strong> alone does not explain missing fork</li></ul></aside>

</div>

---

<!-- SLIDE_ID f2f26bfa-003c-49f8-8942-a4af7ee987d6 -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7959 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-redirection-save.svg" alt="Shell process 1's descriptor group after open() creates slot 3 for /output.txt and dup2(1, 6) saves terminal stdout. The call labels point to the affected entries. Every allocated path appears in full beside its descriptor, including stdin and stderr." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID a9176fe3-c18d-46ff-a631-0ef41e96469f -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7971 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-redirection-install.svg" alt="Shell process 1's descriptor group after dup2(3, 1) installs redirected stdout and close(3) frees the temporary descriptor's path. The call labels point to entries 1 and 3. Every allocated path appears in full beside its shell descriptor, while the child's initial descriptors are still unchanged and omitted." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 2ce0b0ee-180f-4676-a895-c34aea290725 -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7984 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-redirection-inherit.svg" alt="The upper group contains shell process 1's unchanged descriptors and paths. The lower group contains child process 2's descriptors and paths after run() copies the shell's descriptors and sets the child's state to READY. Both stdout entries own independent /output.txt strings. Only the shell has saved terminal descriptor 6." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 6643e254-81d1-47f9-92ab-0290dcd1b4bd -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (5)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-7996 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-redirection-restore.svg" alt="The upper group shows shell process 1 after dup2(6, 1) restores terminal stdout and close(6) releases the saved descriptor. The lower group shows child process 2's unchanged descriptors and paths, with stdout still naming /output.txt through its independent copy." />

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID cd188a9b-5a81-4a32-a441-c8fb3fe44fd8 -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (6)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8004 -->
<ReadmeVisual kind="code" :width="719.4" data-code-source="code-8004" data-code-part="1">

<!-- README_CODE_PART code-8004 lines=1-20 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>kernel/process/process_arguments.picoc</span><span class="code-range"></span></div>

```c {lines:false}
bool mark_process_ready_with_arguments(struct RunProcessRequest *request) {
    struct ProcessControlBlock *process;
    struct FileDescriptorTable *file_descriptors;

    process = find_process_by_pid(request->pid);
    if (process == NULL || process->state != PROCESS_STATE_NEW) {
        return false;
    }
    if (current_process() != NULL) {
        file_descriptors = inherit_file_descriptors(
            current_process()->file_descriptors
        );
        destroy_file_descriptor_table(process->file_descriptors);
        process->file_descriptors = file_descriptors;
    }

    store_process_arguments(process, request->arguments, request->environment);
    process->state = PROCESS_STATE_READY;
    return true;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 34c5db34-80c0-4e78-aadb-6840839ddd63 -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (7)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8032 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8032:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:15.34%" /><col style="width:35.76%" /><col style="width:16.33%" /><col style="width:32.58%" /></colgroup><thead><tr><th>Shell form</th><th>Opens/creates</th><th>Copies and replacements before run()</th><th>Child endpoints and shell cleanup</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>COMMAND</code></td><td>None</td><td>None</td><td>Child: independent 0–2 + file slots 3–4</td></tr>
<tr data-source-row="2"><td class="table-key"><code>COMMAND &lt; IN</code></td><td>Save stdin → 5; open IN as 0</td><td><span class="source-link"><code>dup2(0, 5)</code></span> saves current stdin</td><td>Child reads 0; shell restores/closes 5</td></tr>
<tr data-source-row="3"><td class="table-key"><code>COMMAND &gt; OUT</code></td><td>Open OUT: write/create/truncate; temporary slot 3</td><td>Save 1 → 6; install OUT; close temporary</td><td>Child writes 1; shell restores/closes 6</td></tr>
<tr data-source-row="4"><td class="table-key"><code>COMMAND &gt;&gt; OUT</code></td><td>Same, with <span class="source-link"><code>O_APPEND</code></span> instead of <span class="source-link"><code>O_TRUNC</code></span></td><td>Same stdout operations</td><td>Each child write appends using a <code>file-size</code> request</td></tr>
<tr data-source-row="5"><td class="table-key"><code>COMMAND 2&gt; ERR</code> / <code>2&gt;&gt; ERR</code></td><td>Open with the corresponding truncate/append flags</td><td>Save 2 → 7; install ERR; close temporary</td><td>Child writes 2; shell restores/closes 7</td></tr>
<tr data-source-row="6"><td class="table-key"><code>COMMAND &lt; IN &gt; OUT 2&gt; ERR</code></td><td>stdout → stderr → stdin; append optional</td><td>Combine save slots 5, 6, 7</td><td>Child gets endpoints; shell restores originals</td></tr>
<tr data-source-row="7"><td class="table-key"><code>LEFT | RIGHT</code></td><td>LEFT &gt; temporary; RIGHT &lt; temporary</td><td>Save stdout → 6; stdin → 5</td><td>LEFT exits → RIGHT reads → unlink temporary</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0cd00f4d-effc-4111-a42e-13ab9d2b3ea8 -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (8)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8060 -->
<div class="code-columns" data-column-key="code:code-8060" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.2779369627507164">

<ReadmeVisual kind="code" :width="560" data-code-source="code-8060" data-code-part="1">

<!-- README_CODE_PART code-8060 lines=1-15 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 1–15</span></div>

```c {lines:false}
bool redirect_output(
    int target_file_descriptor,
    int saved_file_descriptor,
    char *path,
    bool append
) {
    int opened_file_descriptor;
    int flags = O_WRONLY | O_CREAT;

    if (append) {
        flags = flags | O_APPEND;
    } else {
        flags = flags | O_TRUNC;
    }
    opened_file_descriptor = open(path, flags);
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-8060" data-code-part="2">

<!-- README_CODE_PART code-8060 lines=16-30 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 16–30</span></div>

```c {lines:false}
    if (opened_file_descriptor < 0) {
        return false;
    }
    if (dup2(target_file_descriptor, saved_file_descriptor) < 0) {
        close(opened_file_descriptor);
        return false;
    }
    if (dup2(opened_file_descriptor, target_file_descriptor) < 0) {
        close(opened_file_descriptor);
        close(saved_file_descriptor);
        return false;
    }
    close(opened_file_descriptor);
    return true;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID e2684061-a6e4-4539-86e0-5f2bf9e993ca -->
<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (9)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8100 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-8100" data-code-part="1">

<!-- README_CODE_PART code-8100 lines=1-17 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range"></span></div>

```c {lines:false}
bool redirect_standard_input(char *path) {
    int file_descriptor;

    if (dup2(STDIN_FILENO, SHELL_SAVED_STDIN_FILENO) < 0) {
        return false;
    }
    close(STDIN_FILENO);
    file_descriptor = open(path, O_RDONLY);
    if (file_descriptor != STDIN_FILENO) {
        if (file_descriptor >= 0) {
            close(file_descriptor);
        }
        restore_standard_descriptors(true, false, false);
        return false;
    }
    return true;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 31113768-c983-4f2d-95ba-38fce7a6547b -->
<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-8151 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-pipeline.svg" alt="Producer stage with fixed shell, producer, consumer, and temporary-file rows. The shell redirects stdout, run copies descriptors to the producer, the shell restores stdout, and waitpid reaps the producer. The consumer row remains uncreated throughout." />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>One pipeline:</strong> finite foreground commands</li>
<li><strong>TMP:</strong> <code>.picoos-pipe-&lt;shell PID&gt;.tmp</code></li></ul></div>
<aside class="context-note"><b>Conventional pipe comparison</b><ul><li><strong>Kernel buffer:</strong> concurrent readers/writers; backpressure</li>
<li><strong>PicoOS file:</strong> sequential; no unbounded/interactive stream</li>
<li><strong>Kernel pipe needs:</strong> endpoints, queues, EOF, concurrent startup</li></ul></aside>

</div>

---

<!-- SLIDE_ID fa52f079-9361-4187-9d7e-4291c87d9920 -->
<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-8161 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-pipeline-consumer.svg" alt="Consumer stage with the same fixed rows. The producer remains reaped. The shell redirects stdin to TMP and stdout to OUT, run copies descriptors to the consumer, the shell restores its descriptors, and the consumer is reaped before TMP is removed." />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Existing TMP:</strong> truncated, then removed</li>
<li><strong>Longer pipelines / &amp;:</strong> unsupported</li></ul></div>

</div>

---

<!-- SLIDE_ID ebdfae59-d4ac-4457-9fb4-254a82382579 -->
<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8176 -->
<div class="code-columns" data-column-key="code:code-8176" style="--readme-columns:minmax(0, 42fr) minmax(0, 58fr);--source-aspect:3.5898867690398633">

<ReadmeVisual kind="code" :width="452.8" data-code-source="code-8176" data-code-part="1">

<!-- README_CODE_PART code-8176 lines=1-13 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 1–13</span></div>

```c {lines:false}
bool run_pipeline(char *command, int pipeline) {
    // ...
    build_shell_pipe_path();
    if (!insert_redirection(
            command,
            ">",
            shell_pipe_path,
            strlen(command),
            shell_pipe_left_command
        ) || !insert_redirection(
            right_command,
            "<",
            shell_pipe_path,
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="625.2952380952381" data-code-source="code-8176" data-code-part="2">

<!-- README_CODE_PART code-8176 lines=14-26 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>user/shell.picoc</span><span class="code-range">lines 14–26</span></div>

```c {lines:false}
            find_output_redirection(right_command),
            shell_pipe_right_command
        )) {
        shell_write_error_string("error: pipeline is too long\n");
        last_command_exit_status = 1;
        return true;
    }

    eval(shell_pipe_left_command);
    evaluating = eval(shell_pipe_right_command);
    unlink(shell_pipe_path);
    return evaluating;
}
```

</div>

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><div class="readme-item"><strong>Whole producer result:</strong> stored before consumer starts</div></div>

</div>

---

<!-- SLIDE_ID 78265c34-14ce-47f5-8574-77aeae1f5b84 -->
<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8228 -->
<ReadmeVisual kind="code" :width="719.4" class="command-strip" data-code-source="code-8228" data-code-part="1">

<!-- README_CODE_PART code-8228 lines=1-4 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>PicoOS terminal</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> echo.bin "first\nsecond" > pipeline-input.txt
PicoOS> cat.bin pipeline-input.txt | sed.bin "1aINSERTED" > pipeline-output.txt
PicoOS> cat.bin pipeline-output.txt
PicoOS> rm.bin pipeline-input.txt pipeline-output.txt
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 0ad744b0-50aa-41c3-993e-7374636036d2 -->
<!-- SOURCE Pico-OS/README.md#13-user-applications-and-commands -->

<div class="eyebrow section-eyebrow">Section 13 · Overview</div>

# 13. User applications and commands

<SectionOverview section="13-user-applications-and-commands" />

---

<!-- SLIDE_ID a1a1e8d2-972e-43a3-a72f-0e84487d198d -->
<!-- SOURCE Pico-OS/README.md#131-writing-a-simple-user-application -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink>

## 13.1 Writing a simple user application (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 250fr) minmax(0, 80fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-8250+code-8274" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-8250 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-8250" data-code-part="1">

<!-- README_CODE_PART code-8250 lines=1-12 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/add.picoc</span><span class="code-range"></span></div>

```c {lines:false}
#include "../library/stdio/stdio.header"
#include "../library/stdlib/stdlib.header"

int main(int argc, char **argv) {
    if (argc != 3) {
        printf("Usage: add.bin NUMBER NUMBER\n");
        return 1;
    }

    printf("%d\n", atoi(argv[1]) + atoi(argv[2]));
    return 0;
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8274 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-8274" data-code-part="1">

<!-- README_CODE_PART code-8274 lines=1-6 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ mkdir -p binary/documentation
$ picoc_compiler --direct-source-link -O1 -s \
    documentation/add.picoc library/stdio/libstdio.picoc \
    library/stdlib/libstdlib.picoc -C library/start/libstart.picoc \
    -o binary/documentation/add.reti
$ reti_emulator -a binary/documentation/add.reti
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-8292 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-8292" data-code-part="1">

<!-- README_CODE_PART code-8292 lines=1-2 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>PicoOS terminal</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> /documentation/add.bin 7 5
12
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID e317355e-4693-4b64-b349-029343f3abe3 -->
<!-- SOURCE Pico-OS/README.md#131-writing-a-simple-user-application -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink>

## 13.1 Writing a simple user application (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>argc check:</strong> two operands; failure status 1</li>
<li><strong>atoi + printf:</strong> conversion + sum output</li>
<li><strong>--direct-source-link:</strong> source compilation + link</li>
<li><strong>-C libstart:</strong> heap/environment → main → exit</li>
<li><strong>stdout:</strong> inherited; shell may redirect</li></ul></div>

</div>

---

<!-- SLIDE_ID 526c134c-5ee2-4ecd-8934-7f6732cccaa2 -->
<!-- SOURCE Pico-OS/README.md#132-applications-library-calls-and-host-requests -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink>

## 13.2 Applications, library calls, and host requests (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8316 -->
<ReadmeVisual kind="table" :width="1280" class="inventory-grid">

<div class="readme-tiles" v-pre><div class="readme-tile"><div class="tile-name"><span class="source-link"><code>shell.bin</code></span></div><div class="tile-detail">Interpret commands; interactive or redirected</div><div class="tile-detail"><ul><li>Process + descriptor + environment APIs</li><li>Host: load/read/output/directory requests</li></ul></div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>echo.bin</code></span></div><div class="tile-detail">Join arguments; expand \n; newline</div><div class="tile-detail">printf; descriptor-based output</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>count.bin</code></span></div><div class="tile-detail">Count + busy delay; yield</div><div class="tile-detail">printf/atoi/yield; descriptor-based output</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>cat.bin</code></span></div><div class="tile-detail">Files/stdin → stdout; editing</div><div class="tile-detail"><ul><li>open/read/write/lseek/close</li><li>Host: file-size/read-range/output</li></ul></div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>touch.bin</code></span></div><div class="tile-detail">Create file or update timestamps</div><div class="tile-detail">touch; host touch</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>cp.bin</code></span></div><div class="tile-detail">Copy file in 64-cell chunks</div><div class="tile-detail"><ul><li>open/read/write/close</li><li>Host: read-range/write-at</li></ul></div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>mv.bin</code></span></div><div class="tile-detail">Move/rename file or directory</div><div class="tile-detail">move; host move/rename</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sed.bin</code></span></div><div class="tile-detail">Insert/change/append/substitute stdin lines</div><div class="tile-detail"><ul><li>lseek/read/write; malloc/free</li><li>Host: file-size/read-range/output</li></ul></div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>ps.bin</code></span></div><div class="tile-detail">Print PIDs + binary paths</div><div class="tile-detail">list_processes; descriptor-based output</div></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Command loading:</strong> parent shell’s operation</li>
<li><strong>Output routing:</strong> depends on inherited descriptor</li></ul></div>

</div>

---

<!-- SLIDE_ID a7978e96-0130-4f7a-b698-464b6a467c75 -->
<!-- SOURCE Pico-OS/README.md#132-applications-library-calls-and-host-requests -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink>

## 13.2 Applications, library calls, and host requests (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8316 -->
<ReadmeVisual kind="table" :width="1280" class="inventory-grid">

<div class="readme-tiles" v-pre><div class="readme-tile"><div class="tile-name"><span class="source-link"><code>ls.bin</code></span></div><div class="tile-detail">Directory listing; optional -a</div><div class="tile-detail">opendir/readdir/closedir; host ls</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>mkdir.bin</code></span></div><div class="tile-detail">Create supplied directories</div><div class="tile-detail">mkdir; host mkdir</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>pwd.bin</code></span></div><div class="tile-detail">Print current working directory</div><div class="tile-detail">getcwd; descriptor-based output</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>rm.bin</code></span></div><div class="tile-detail">Remove supplied files</div><div class="tile-detail">unlink; host unlink</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>rmdir.bin</code></span></div><div class="tile-detail">Remove supplied empty directories</div><div class="tile-detail">rmdir; host rmdir</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>kill.bin</code></span></div><div class="tile-detail">Deliver signal; 0 probes PID</div><div class="tile-detail">kill/atoi/yield; diagnostics output</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>poweroff.bin</code></span></div><div class="tile-detail">Halt PicoOS</div><div class="tile-detail">reboot(POWER_OFF); no host request</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>reboot.bin</code></span></div><div class="tile-detail">Restart bootloader + kernel</div><div class="tile-detail">reboot(RESTART); host reloads kernel + init</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>uname.bin</code></span></div><div class="tile-detail">Print installed PicoOS version</div><div class="tile-detail"><ul><li>open/read/write/close</li><li>Host: file-size/read-range/output</li></ul></div></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Echo:</strong> -h/--help ordinary text</li>
<li><strong>Other commands:</strong> sole help argument recognized</li></ul></div>

</div>

---

<!-- SLIDE_ID 9204e2d0-4668-4d63-b517-fcc62df0f1ea -->
<!-- SOURCE Pico-OS/README.md#1321-command-behavior-and-supported-options -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink> · 13.2 Applications, library calls, and host requests

## 13.2.1 Command behavior and supported options (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-8353 -->
<div class="readme-list bullet-columns"><ul><li><strong>echo:</strong> space-joined text + newline<ul><li><strong>\n:</strong> embedded newline; <strong>no -n</strong></li>
<li><strong>-h/--help:</strong> ordinary text; status 0</li></ul></li>
<li><strong>count:</strong> at most one nonnegative busy-loop delay<ul><li><strong>Delay:</strong> not milliseconds</li>
<li><strong>Prints indefinitely:</strong> yield after each value</li></ul></li>
<li><strong>cat:</strong> files or stdin; 64-cell chunks<ul><li><strong>Terminal:</strong> editable lines; Ctrl+D finishes</li>
<li><strong>Files:</strong> preserve bytes; terminal escapes nonprintables</li></ul></li>
<li><strong>touch:</strong> multiple paths; <strong>cp/mv:</strong> source + destination<ul><li><strong>cp:</strong> 64-cell chunks</li>
<li><strong>ps:</strong> includes zombies</li>
<li><strong>touch:</strong> stop on first failure</li>
<li><strong>mv:</strong> one host move request; no options</li>
<li><strong>cp:</strong> disables loading bar</li></ul></li>
<li><strong>sed:</strong> seekable stdin; no pathname operand<ul><li><strong>i / c / a:</strong> numbered-line insert/change/append</li>
<li><strong>s/old/new/:</strong> first literal match; no regex</li>
<li><strong>/pattern/iTEXT:</strong> insert before matching lines</li>
<li><strong>Whole input:</strong> in memory; loading bar disabled</li></ul></li>
<li><strong>ls:</strong> one directory; <strong>-a:</strong> hidden names<ul><li><strong>mkdir:</strong> no -p; <strong>rm:</strong> nonrecursive</li>
<li><strong>rmdir:</strong> multiple empty directories</li></ul></li>
<li><strong>kill:</strong> SIGKILL default; names or numbers<ul><li><strong>Signal 0:</strong> probe; zombies rejected</li>
<li><strong>Accepted request:</strong> yield; no group PID forms</li></ul></li>
<li><strong>poweroff:</strong> halt; <strong>reboot:</strong> EPROM restart<ul><li><strong>uname:</strong> installed version</li>
<li><strong>No operands:</strong> all three</li></ul></li></ul></div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Killed counter:</strong> probe fails; ps still shows zombie</li>
<li><strong>$!:</strong> choose actual PID without hardcoding</li></ul></div>
<aside class="context-note"><b>Unix command names</b><ul><li>Reduced option sets</li>
<li><strong>cd:</strong> built-in changes shell directory</li></ul></aside>

</div>

---

<!-- SLIDE_ID 17211802-dd5d-4f64-b59a-2c1c97236e61 -->
<!-- SOURCE Pico-OS/README.md#1321-command-behavior-and-supported-options -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink> · 13.2 Applications, library calls, and host requests

## 13.2.1 Command behavior and supported options (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8413 -->
<div class="code-columns" data-column-key="code:code-8413" style="--readme-columns:minmax(0, 61fr) minmax(0, 39fr);--source-aspect:4.555007256894049">

<ReadmeVisual kind="code" :width="721.676923076923" data-code-source="code-8413" data-code-part="1">

<!-- README_CODE_PART code-8413 lines=1-11 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>PicoOS terminal</span><span class="code-range">lines 1–11</span></div>

```console {lines:false}
PicoOS> mkdir.bin demo
PicoOS> cd demo
PicoOS> echo.bin "todo\nreview" > n
PicoOS> cat.bin n | sed.bin "s/todo/done/" > r
PicoOS> echo.bin "pwd.bin\ntouch.bin e\ncp.bin n c\nmv.bin c b\nls.bin -a" > x
PicoOS> shell.bin < x
/demo
PicoOS> count.bin 0 > /device/null.dev &
PicoOS> ps.bin
14 user/count.bin
PicoOS> kill.bin SIGSTOP $!
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="461.3999999999999" data-code-source="code-8413" data-code-part="2">

<!-- README_CODE_PART code-8413 lines=12-22 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>PicoOS terminal</span><span class="code-range">lines 12–22</span></div>

```console {lines:false}
PicoOS> kill.bin SIGCONT $!
PicoOS> kill.bin $!
PicoOS> kill.bin 0 $!
kill: process not found
PicoOS> echo.bin $?
1
PicoOS> ps.bin
14 user/count.bin
PicoOS> cd ..
PicoOS> rm.bin demo/n demo/b demo/e demo/r demo/x
PicoOS> rmdir.bin demo
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID d747ba3c-c6e0-4175-91ec-435448926146 -->
<!-- SOURCE Pico-OS/README.md#1322-command-errors-and-exit-statuses -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink> · 13.2 Applications, library calls, and host requests

## 13.2.2 Command errors and exit statuses

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Results → <strong>stdout</strong>; diagnostics → stderr</li>
<li><strong>Multiple paths:</strong> continue; retain failure</li>
<li><strong>Foreground result</strong> stored in $?</li>
<li><strong>Signal status</strong> reported by PID/name</li>
<li><strong>Unchecked writes:</strong> success may hide truncation</li></ul></div>

</div>

---

<!-- SLIDE_ID e7bf9f07-bf52-4512-8575-f30d3ff45a1a -->
<!-- SOURCE Pico-OS/README.md#14-test-system -->

<div class="eyebrow section-eyebrow">Section 14 · Overview</div>

# 14. Test system

<SectionOverview section="14-test-system" />

---

<!-- SLIDE_ID 5d2e52ac-ae0e-43b4-949b-975d4ad36df2 -->
<!-- SOURCE Pico-OS/README.md#141-library-os-shell-and-boot-test-categories -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink>

## 14.1 Library, OS, shell, and boot test categories

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-8475 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/test-categories.svg" alt="14.1 Library, OS, shell, and boot test categories" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>63 classes:</strong> 13 library; 23 OS; 26 shell; 1 boot</li>
<li><strong>49 System tests:</strong> OS + shell</li>
<li><strong>Missing input/expectation:</strong> directory excluded</li>
<li><strong>cat_binary:</strong> shell fixture by exact input rule</li></ul></div>

</div>

---

<!-- SLIDE_ID f29de854-80cc-455c-8c72-923791ea70c6 -->
<!-- SOURCE Pico-OS/README.md#1411-files-that-make-up-a-test -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.1 Files that make up a test (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-8483 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/test-file-layout.svg" alt="14.1.1 Files that make up a test" />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Fixtures:</strong> stage under binary/test</li>
<li><strong>Private applications:</strong> compiled + assembled there</li></ul></div>

</div>

---

<!-- SLIDE_ID f7808e70-3f36-4ff4-bcfe-b57ff57da51a -->
<!-- SOURCE Pico-OS/README.md#1411-files-that-make-up-a-test -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.1 Files that make up a test (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8489 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-8489:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels table-panels-two" data-column-key="table:table-8489:1,2,3,4,5,6,7,8,9,10" style="--readme-columns:minmax(0, 52fr) minmax(0, 48fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:28.19%" /><col style="width:42.05%" /><col style="width:29.76%" /></colgroup><thead><tr><th>File or generated file</th><th>Role</th><th>Test categories</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">test/*.picoc</td><td>Program + input/expected/link metadata</td><td>Library</td></tr>
<tr data-source-row="2"><td class="table-key">input.txt</td><td>Prompt-driven commands + encoded keys</td><td>Boot, OS, Shell</td></tr>
<tr data-source-row="3"><td class="table-key">expected_output.txt</td><td>Source-controlled normalized expectation</td><td>Boot, OS, Shell</td></tr>
<tr data-source-row="4"><td class="table-key">launcher.picoc</td><td>OS coordination program</td><td>Every OS test and the <span class="source-link"><code>shell_exit_status_pid</code> Shell test</span></td></tr>
<tr data-source-row="5"><td class="table-key"><code>&lt;program&gt;.picoc</code></td><td>Optional applications/workers</td><td>OS, Shell</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:28.19%" /><col style="width:42.05%" /><col style="width:29.76%" /></colgroup><thead><tr><th>File or generated file</th><th>Role</th><th>Test categories</th></tr></thead><tbody><tr data-source-row="6"><td class="table-key">*.header</td><td>Shared definitions</td><td>OS when needed</td></tr>
<tr data-source-row="7"><td class="table-key">Other source *.txt</td><td>Guest data, scripts, expected variants</td><td>OS, Shell</td></tr>
<tr data-source-row="8"><td class="table-key">raw_output.txt</td><td>Complete emulator stdout</td><td>Boot, OS, Shell</td></tr>
<tr data-source-row="9"><td class="table-key">output.txt</td><td>Normalized actual output</td><td>Boot, OS, Shell</td></tr>
<tr data-source-row="10"><td class="table-key">Library build artifacts</td><td>Derived input/output/compiler artifacts</td><td>Library</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><div class="readme-item"><strong>Runner:</strong> original input; <strong>guest:</strong> staged data</div></div>

</div>

---

<!-- SLIDE_ID 57e4a553-ad0a-4b31-bc89-f6bf842e9a62 -->
<!-- SOURCE Pico-OS/README.md#1412-library-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.2 Library test example (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 227fr) minmax(0, 134fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-8513 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-8513" data-code-part="1">

<!-- README_CODE_PART code-8513 lines=1-10 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/basic_printf_newline_escape.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// in:
// expected:newline\n
// dependencies: ../library/stdio/libstdio.reti_blocks

#include "../library/stdio/stdio.header"

int main() {
    printf("newline\n");
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-8538 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/test-library-flow.svg" alt="14.1.2 Library test example" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 184f2426-3f5e-42bb-b921-e762c783e703 -->
<!-- SOURCE Pico-OS/README.md#1412-library-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.2 Library test example (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Library test:</strong> linked ISR support; no PicoOS kernel</li>
<li><strong>Staged/direct:</strong> same second-line expectation</li>
<li><strong>Compare:</strong> ignore trailing whitespace per line</li>
<li><strong>Failure:</strong> mismatch, error, missing output, 5-second timeout</li></ul></div>

</div>

---

<!-- SLIDE_ID a87d49e1-9f07-4abf-b235-ef297d094a65 -->
<!-- SOURCE Pico-OS/README.md#1413-os-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.3 OS test example (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-8546 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-8546" data-code-part="1">

<!-- README_CODE_PART code-8546 lines=1-3 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>test/hello_world/input.txt</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> load test/hello_world/launcher.bin
PicoOS> run 3
PicoOS> poweroff.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8555 -->
<ReadmeVisual kind="code" :width="917.1999999999999" data-code-source="code-8555" data-code-part="1">

<!-- README_CODE_PART code-8555 lines=1-14 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/hello_world/launcher.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// test/hello_world/launcher.picoc
// dependencies: ../../library/unistd/libunistd.reti_blocks ../../library/sys/wait/libwait.reti_blocks

#include "../../library/unistd/unistd.header"
#include "../../library/sys/wait/wait.header"
#include "../../common/stddef.header"

int main(void) {
    int pid = load("test/hello_world/hello_world.bin");

    run(pid, NULL, NULL);
    waitpid(pid);
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 6b8d0346-4320-42ee-981c-88a856407f14 -->
<!-- SOURCE Pico-OS/README.md#1413-os-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.3 OS test example (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 210fr) minmax(0, 92fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-8574+code-8588" style="--readme-columns:minmax(0, 56fr) minmax(0, 44fr);">

<!-- README_ASSET code-8574 -->
<ReadmeVisual kind="code" :width="530.2" data-code-source="code-8574" data-code-part="1">

<!-- README_CODE_PART code-8574 lines=1-9 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/hello_world/hello_world.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// test/hello_world/hello_world.picoc
// dependencies: ../../library/stdio/libstdio.reti_blocks

#include "../../library/stdio/stdio.header"

int main(void) {
    printf("hello world");
    return 0;
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8588 -->
<ReadmeVisual kind="code" :width="416.5857142857143" data-code-source="code-8588" data-code-part="1">

<!-- README_CODE_PART code-8588 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/hello_world/expected_output.txt</span><span class="code-range"></span></div>

```text {lines:false}
process with pid 3 created
hello world
process with pid 5 created
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-8596 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/test-os-flow.svg" alt="14.1.3 OS test example" />

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>OS category:</strong> launcher + exact three-line input</li>
<li><strong>Launcher:</strong> orchestrates processes/events without host commands</li></ul></div>

</div>

---

<!-- SLIDE_ID cc7cf3b9-8ee7-449d-9037-cdae09312d31 -->
<!-- SOURCE Pico-OS/README.md#1414-shell-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.4 Shell test example

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 240fr) minmax(0, 100fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-8612+code-8620" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-8612 -->
<ReadmeVisual kind="code" :width="263.6" class="command-strip" data-code-source="code-8612" data-code-part="1">

<!-- README_CODE_PART code-8612 lines=1-2 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>test/ps/input.txt</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> ps.bin
PicoOS> poweroff.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8620 -->
<ReadmeVisual kind="code" :width="263.6" data-code-source="code-8620" data-code-part="1">

<!-- README_CODE_PART code-8620 lines=1-5 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/ps/expected_output.txt</span><span class="code-range"></span></div>

```text {lines:false}
process with pid 3 created
1 system/init.bin
2 user/shell.bin
3 user/ps.bin
process with pid 4 created
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-8632 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/test-shell-flow.svg" alt="14.1.4 Shell test example" />

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Encoded keys:</strong> arrows, Home, Escape, Backspace, controls</li>
<li><strong>Input:</strong> send next line after new prompt</li>
<li><strong>Private programs/data:</strong> optional</li></ul></div>

</div>

---

<!-- SLIDE_ID c445421a-f33e-4054-8992-a34ecc3e8b01 -->
<!-- SOURCE Pico-OS/README.md#1415-boot-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.5 Boot test example

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 108fr) minmax(0, 88fr)">

<div class="readme-artifacts composition-panel layout-command-above">

<!-- README_ASSET code-8640 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-8640" data-code-part="1">

<!-- README_CODE_PART code-8640 lines=1-2 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>test/boot/input.txt</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> echo.bin hello world
PicoOS> poweroff.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8647 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-8647" data-code-part="1">

<!-- README_CODE_PART code-8647 lines=1-3 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/boot/expected_output.txt</span><span class="code-range"></span></div>

```text {lines:false}
process with pid 3 created
hello world
process with pid 4 created
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-8657 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/test-boot-flow.svg" alt="14.1.5 Boot test example" />

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>One boot fixture:</strong> no private PicoC program</li>
<li><strong>Same full startup:</strong> bootloader → kernel → init → shell</li></ul></div>

</div>

---

<!-- SLIDE_ID 676ac0c8-22e8-495c-81ed-cc7907b7330e -->
<!-- SOURCE Pico-OS/README.md#142-test-execution -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink>

## 14.2 Test execution

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8669 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8669:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:14.77%" /><col style="width:20.63%" /><col style="width:14.80%" /><col style="width:35.15%" /><col style="width:14.65%" /></colgroup><thead><tr><th>Test representation</th><th>Started by</th><th>Input path</th><th>Code that runs</th><th>Output and pass condition</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Top-level Library <code>.picoc</code> file</td><td><span class="source-link"><code>run_sys_tests.sh</code></span>, then <span class="source-link"><code>run_lib_test_case.sh</code></span></td><td>Source // in: → emulator</td><td>Test + libraries; no PicoOS</td><td>Output equals // expected; trim line endings</td></tr>
<tr data-source-row="2"><td class="table-key">OS directory</td><td><span class="source-link"><code>run_os_tests.py</code></span> with <code>--kind os</code></td><td>Prompt-driven input.txt → launcher</td><td>Boot/kernel/init/shell/launcher/workers</td><td>Raw → normalize terminal → compare expectation</td></tr>
<tr data-source-row="3"><td class="table-key">Shell directory</td><td><span class="source-link"><code>run_os_tests.py</code></span> with <code>--kind shell</code></td><td>Prompt-driven commands + keys</td><td>Boot/kernel/init/shell/commands</td><td>Same normalized comparison as OS tests</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>test/boot/</code></span></td><td><span class="source-link"><code>run_os_tests.py</code></span> with <code>--kind boot</code></td><td>Prompt-driven boot commands</td><td>Boot/kernel/init/shell/release applications</td><td>Same normalized comparison as OS tests</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Per class:</strong> fresh emulator + temporary peripherals</li>
<li><strong>Staged:</strong> reusable artifacts; <strong>direct:</strong> source linking</li>
<li><strong>Timeouts:</strong> library 5 s; other categories 120 s</li>
<li><strong>CI:</strong> all categories; direct linking + DMA</li></ul></div>

</div>

---

<!-- SLIDE_ID 10faac28-c869-4248-9589-d13d58d85d4c -->
<!-- SOURCE Pico-OS/README.md#1421-make-targets -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.2 Test execution

## 14.2.1 Make targets

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8690 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8690:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.60%" /><col style="width:64.40%" /></colgroup><thead><tr><th>Command</th><th>Tests run</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>make test</code></td><td>Release build + Library/System/Boot</td></tr>
<tr data-source-row="2"><td class="table-key"><code>make test-all</code></td><td>Alias for make test</td></tr>
<tr data-source-row="3"><td class="table-key"><code>make test-lib</code></td><td>Library; TEST_PATTERN filters</td></tr>
<tr data-source-row="4"><td class="table-key"><code>make test-sys</code></td><td>OS then Shell; excludes Boot</td></tr>
<tr data-source-row="5"><td class="table-key"><code>make test-os</code></td><td>Directories matching OS classification</td></tr>
<tr data-source-row="6"><td class="table-key"><code>make test-shell</code></td><td>Runnable non-Boot/non-OS directories</td></tr>
<tr data-source-row="7"><td class="table-key"><code>make test-boot</code></td><td>Only test/boot; one emulator</td></tr>
<tr data-source-row="8"><td class="table-key"><code>make test_not_passed</code></td><td>Previously failed Library paths</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>run-os:</strong> inspect OS_RUN_PATH; no expected-output comparison</li>
<li><strong>Non-debug:</strong> still records output files</li></ul></div>

</div>

---

<!-- SLIDE_ID 69148704-1813-4521-b66e-0b2c23602274 -->
<!-- SOURCE Pico-OS/README.md#15-use-in-operating-systems-and-real-time-operating-systems-lectures -->

<div class="eyebrow section-eyebrow">Section 15 · Overview</div>

# 15. Use in operating-systems and real-time operating-systems lectures

<SectionOverview section="15-use-in-operating-systems-and-real-time-operating-systems-lectures" />

---

<!-- SLIDE_ID fcb9ea56-bb37-4004-bad3-22ce1187b9e9 -->
<!-- SOURCE Pico-OS/README.md#15-use-in-operating-systems-and-real-time-operating-systems-lectures -->

## 15. Use in operating-systems and real-time operating-systems lectures

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Inspect source + <strong>live execution</strong></li>
<li><strong>OS:</strong> processes, interrupts, memory, files</li>
<li><strong>RTOS:</strong> scheduling, queues, synchronization</li></ul></div>

</div>

---

<!-- SLIDE_ID 8f546600-0c50-43df-b2a0-31de316ffe17 -->
<!-- SOURCE Pico-OS/README.md#151-operating-systems-topics -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink>

## 15.1 Operating-systems topics

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8717 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8717:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.41%" /><col style="width:50.59%" /></colgroup><thead><tr><th>Operating-systems lecture topic</th><th>What students can inspect in PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Parent/child relationships and process loading</td><td>load/run; PCB parent; zombies; cleanup</td></tr>
<tr data-source-row="2"><td class="table-key">Signals</td><td>Signal fields + state changes</td></tr>
<tr data-source-row="3"><td class="table-key">interrupt service routines tables and ISRs</td><td>IVT; saved activation; handlers; RTI</td></tr>
<tr data-source-row="4"><td class="table-key">Software, hardware, and synchronous interrupts</td><td>Syscalls, devices, synchronous exceptions</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>malloc()</code></span> / <span class="source-link"><code>free()</code></span></td><td>First fit; split; free; coalesce</td></tr>
<tr data-source-row="6"><td class="table-key">Filesystem boundary</td><td>Descriptors + UART host boundary</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Compare:</strong> PicoC → symbolic ReTI → binary → live state</li>
<li><strong>Files:</strong> descriptors + UART host requests</li></ul></div>

</div>

---

<!-- SLIDE_ID 254c42e4-b819-464d-8cb8-732df8a5e942 -->
<!-- SOURCE Pico-OS/README.md#1511-inspecting-picoos-execution-in-the-reti-emulator -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.1 Inspecting PicoOS execution in the ReTI-Emulator

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 150fr) minmax(0, 206fr)">

<div class="readme-artifacts composition-panel layout-command-above">

<!-- README_ASSET code-8736 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-8736" data-code-part="1">

<!-- README_CODE_PART code-8736 lines=1-2 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ picoc_compiler -O1 -i -w -g -v -o program.reti program.picoc
$ reti_emulator -d -c -D program.debuginfo program.reti
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8744 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-8744" data-code-part="1">

<!-- README_CODE_PART code-8744 lines=1-2 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ cd binary
$ reti_emulator -n 5 -O -r 262144 -e boot/bootloader.reti -S kernel/kernel.sections -D kernel/kernel.debuginfo -d -c
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:table-8753+table-8766" style="--readme-columns:minmax(0, 55fr) minmax(0, 45fr);">

<!-- README_ASSET table-8753 -->
<ReadmeVisual kind="table" :width="770" data-table-key="table-8753:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.07%" /><col style="width:64.93%" /></colgroup><thead><tr><th>Keys or option</th><th>What students can inspect or do</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>c</code>, then <code>E</code> (<code>Enter again</code>)</td><td>Continue; stop anywhere; inspect instruction</td></tr>
<tr data-source-row="2"><td class="table-key"><code>d</code> (<code>debug source</code>)</td><td>PicoC source for current ReTI instruction</td></tr>
<tr data-source-row="3"><td class="table-key"><code>A</code> (<code>Assign value</code>)</td><td>Edit register/memory; continue execution</td></tr>
<tr data-source-row="4"><td class="table-key"><code>r</code> (<code>restart</code>)</td><td>Restart emulator</td></tr>
<tr data-source-row="5"><td class="table-key"><code>S</code> / <code>R</code> (<code>Snapshot</code> / <code>Restore</code>)</td><td>Save/restore complete emulator state</td></tr>
<tr data-source-row="6"><td class="table-key"><code>e</code>, then <code>T</code></td><td>Trigger + inspect selected interrupt</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-8766 -->
<ReadmeVisual kind="table" :width="630" data-table-key="table-8766:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.31%" /><col style="width:26.98%" /><col style="width:44.71%" /></colgroup><thead><tr><th>SRAM address</th><th>Value</th><th>Annotation in the debug TUI</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>8012</code></td><td><code>3</code></td><td><code>global current_pid@12</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>8179</code></td><td><code>42</code></td><td><code>var timeslice@0</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>8182</code></td><td><code>9001</code></td><td><code>return addr.</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>8183</code></td><td><code>7</code></td><td><code>arg next_pid@0</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 3837c397-435d-4f67-a71d-beedc4ecea98 -->
<!-- SOURCE Pico-OS/README.md#1512-exploring-userspace-heap-allocation -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.2 Exploring userspace heap allocation (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8789 -->
<div class="code-columns" data-column-key="code:code-8789" style="--readme-columns:minmax(0, 52fr) minmax(0, 48fr);--source-aspect:2.75368876647649">

<ReadmeVisual kind="code" :width="547.4" data-code-source="code-8789" data-code-part="1">

<!-- README_CODE_PART code-8789 lines=1-17 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/exercise_sheet_4_heap/launcher.picoc</span><span class="code-range">lines 1–17</span></div>

```c {lines:false}
// dependencies: ../../library/stdlib/libstdlib.reti_blocks

#include "../../library/stdlib/stdlib.header"

struct point {
    int x;
    int y;
};

int main(void) {
    struct point *p1;
    struct point *p3;
    int *a;
    struct point p2;

    a = &(p2.x);
    p2.x = 7;
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="505.29230769230765" data-code-source="code-8789" data-code-part="2">

<!-- README_CODE_PART code-8789 lines=18-33 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>test/exercise_sheet_4_heap/launcher.picoc</span><span class="code-range">lines 18–33</span></div>

```c {lines:false}
    p2.y = 4;

    p1 = (struct point *)malloc(sizeof(struct point));
    (*p1).y = *a;
    p3 = p1;
    p1 = &p2;

    if ((*p1).y > 5) {
        *a = 42;
    } else {
        *a = 1;
    }

    free(p3);
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 899a4a82-ced4-430d-a4b0-059d54015785 -->
<!-- SOURCE Pico-OS/README.md#1512-exploring-userspace-heap-allocation -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.2 Exploring userspace heap allocation (2)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Predict:</strong> storage, aliases, required free address</li>
<li><strong>Single-step:</strong> p3 retains allocation; inspect write through a</li>
<li><strong>Then:</strong> longer reuse + block-merging traces</li></ul></div>

</div>

---

<!-- SLIDE_ID 13c7f45d-6850-4aae-9a0a-ebb653f1cc44 -->
<!-- SOURCE Pico-OS/README.md#1513-editing-and-executing-symbolic-reti-assembly -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.3 Editing and executing symbolic ReTI assembly (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8851 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-8851" data-code-part="1">

<!-- README_CODE_PART code-8851 lines=1-19 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/countdown.reti_blocks</span><span class="code-range"></span></div>

```text {lines:false}
  .ivt
  .text
_start:
  # Save registers.
  PUSH IN1
  PUSH ACC
  LOADI32 IN1 16777219
  LOADI32 ACC 16777216
  SUB IN1 ACC
loop:
  SUBI IN1 1
  MOVE IN1 ACC
  JUMP32> loop
done:
  # Restore registers.
  POP ACC
  POP IN1
  JUMP 0
  .data
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SLIDE_ID 76d1ab88-1b2a-455d-8eeb-7c2a9e67d835 -->
<!-- SOURCE Pico-OS/README.md#1513-editing-and-executing-symbolic-reti-assembly -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.3 Editing and executing symbolic ReTI assembly (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-8893 -->
<ReadmeVisual kind="code" :width="762.4" class="command-strip" data-code-source="code-8893" data-code-part="1">

<!-- README_CODE_PART code-8893 lines=1-3 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ cd documentation
$ picoc_compiler -v -C countdown.reti_blocks -o countdown.reti countdown.reti_blocks
$ reti_emulator -d -c -K countdown.reti
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8903 -->
<div class="code-columns" data-column-key="code:code-8903" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:1.630097087378641">

<ReadmeVisual kind="code" :width="323.8" data-code-source="code-8903" data-code-part="1">

<!-- README_CODE_PART code-8903 lines=1-18 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/countdown.reti</span><span class="code-range">lines 1–18</span></div>

```text {lines:false}
# // Block('_start', [])
# Save registers.
SUBI SP 1
STOREIN SP IN1 1
SUBI SP 1
STOREIN SP ACC 1
# Instr(LOADI32, [IN1, 16777219])
# write large immediate into IN1
LOADI IN1 16384
MULTI IN1 1024
ORI IN1 3
# Instr(LOADI32, [ACC, 16777216])
# write large immediate into ACC
LOADI ACC 16384
MULTI ACC 1024
ORI ACC 0
SUB IN1 ACC
# // Block('loop', [])
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="323.8" data-code-source="code-8903" data-code-part="2">

<!-- README_CODE_PART code-8903 lines=19-35 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/countdown.reti</span><span class="code-range">lines 19–35</span></div>

```text {lines:false}
SUBI IN1 1
MOVE IN1 ACC
# Jump32(>, loop)
JUMP<= 6
# write large immediate into ACC
LOADI ACC 0
MULTI ACC 1024
ORI ACC 11
ADD ACC CS
MOVE ACC PC
# // Block('done', [])
# Restore registers.
LOADIN SP ACC 1
ADDI SP 1
LOADIN SP IN1 1
ADDI SP 1
JUMP 0
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID 56ecfc98-f6e0-4305-a8eb-9ea34ceb5278 -->
<!-- SOURCE Pico-OS/README.md#1513-editing-and-executing-symbolic-reti-assembly -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.3 Editing and executing symbolic ReTI assembly (3)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Labels + pseudoinstructions:</strong> compiler resolves/expands</li>
<li><strong>Loop counter:</strong> IN1: 3 → 2 → 1 → 0</li>
<li><strong>After POP:</strong> initial IN1, ACC, SP restored</li>
<li><strong>-K:</strong> inspect final state after JUMP 0</li></ul></div>

</div>

---

<!-- SLIDE_ID 51c924b8-7162-4b06-93a2-a3c488906514 -->
<!-- SOURCE Pico-OS/README.md#152-real-time-operating-systems-topics -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink>

## 15.2 Real-time operating-systems topics

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8954 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8954:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.94%" /><col style="width:64.06%" /></colgroup><thead><tr><th>Real-time operating-systems lecture topic</th><th>What students can inspect in PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Process states</td><td>NEW/READY/RUNNING/BLOCKED/STOPPED/ZOMBIE</td></tr>
<tr data-source-row="2"><td class="table-key">Scheduling and dispatching</td><td>Scheduler chooses; dispatcher saves/restores</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>waitpid()</code></span>, <span class="source-link"><code>sleep()</code></span>, and <span class="source-link"><code>wakeup()</code></span></td><td>Wait queues + event wakeup</td></tr>
<tr data-source-row="4"><td class="table-key">Mutexes</td><td>Sleep on contention; unlock wakes waiter</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Inspect:</strong> scheduling, waiting, synchronization</li>
<li><strong>Deadlines:</strong> no real-time guarantees</li></ul></div>

</div>

---

<!-- SLIDE_ID e3008c5a-593c-4bce-9c18-47071858f894 -->
<!-- SOURCE Pico-OS/README.md#1521-parent-workers-and-shared-memory -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.2 Real-time operating-systems topics

## 15.2.1 Parent, workers, and shared memory

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-8979 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-shared-mutex.svg" alt="A parent launcher creates and initializes one SharedState region, starts two child workers that open the same shared-memory name, and waits for both. All three local shared_state pointers reach the same counter, lock, and wait queue. A kernel SharedMemoryEntry stores the name, ID, and payload address." />

</ReadmeVisual>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Three processes:</strong> parent + two identical workers</li>
<li><strong>One region:</strong> counter + shared mutex</li>
<li><strong>Separate local mutexes:</strong> would not protect common counter</li>
<li><strong>Two increments:</strong> expected final value 2</li></ul></div>

</div>

---

<!-- SLIDE_ID 56a43e1a-9177-498c-8c9e-1a64c1540974 -->
<!-- SOURCE Pico-OS/README.md#1522-minimal-launcher-and-worker-code -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.2 Real-time operating-systems topics

## 15.2.2 Minimal launcher and worker code (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 150fr) minmax(0, 240fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-9017 -->
<ReadmeVisual kind="code" :width="640" data-code-source="code-9017" data-code-part="1">

<!-- README_CODE_PART code-9017 lines=1-8 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/shared_mutex/shared.header</span><span class="code-range"></span></div>

```c {lines:false}
#pragma once

#include "../../library/mutex/mutex.header"

struct SharedState {
    int workers;
    struct mutex mutex;
};
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-9034 -->
<div class="code-columns" data-column-key="code:code-9034" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.091891891891892">

<ReadmeVisual kind="code" :width="560" data-code-source="code-9034" data-code-part="1">

<!-- README_CODE_PART code-9034 lines=1-16 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/shared_mutex/launcher.picoc</span><span class="code-range">lines 1–16</span></div>

```c {lines:false}
// dependencies: ../../library/unistd/libunistd.reti_blocks ../../library/sys/wait/libwait.reti_blocks ../../library/sys/mman/libmman.reti_blocks ../../library/mutex/libmutex.reti_blocks

#include "shared.header"
#include "../../library/unistd/unistd.header"
#include "../../library/sys/wait/wait.header"
#include "../../library/sys/mman/mman.header"

int main(void) {
    int shared_memory_id;
    int first_worker;
    int second_worker;
    struct SharedState *shared_state;

    shared_memory_id = shm_open(
        "shared-memory-mutex",
        sizeof(struct SharedState)
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="560" data-code-source="code-9034" data-code-part="2">

<!-- README_CODE_PART code-9034 lines=17-31 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/shared_mutex/launcher.picoc</span><span class="code-range">lines 17–31</span></div>

```c {lines:false}
    );
    shared_state = (struct SharedState *)mmap(shared_memory_id);
    shared_state->workers = 0;
    mutex_init(&(shared_state->mutex));

    first_worker = load("documentation/shared_mutex/worker.bin");
    second_worker = load("documentation/shared_mutex/worker.bin");
    run(first_worker, NULL, NULL);
    run(second_worker, NULL, NULL);

    waitpid(first_worker);
    waitpid(second_worker);
    shm_unlink("shared-memory-mutex");
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

</div>

---

<!-- SLIDE_ID d0d41e3f-aa5f-439c-9c4a-07220adf33c0 -->
<!-- SOURCE Pico-OS/README.md#1522-minimal-launcher-and-worker-code -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.2 Real-time operating-systems topics

## 15.2.2 Minimal launcher and worker code (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 300fr) minmax(0, 65fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-9076+code-9111" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-9076 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-9076" data-code-part="1">

<!-- README_CODE_PART code-9076 lines=1-18 -->
<div class="readme-code">
<div class="readme-code-header" v-pre><span>documentation/shared_mutex/worker.picoc</span><span class="code-range"></span></div>

```c {lines:false}
// dependencies: ../../library/sys/mman/libmman.reti_blocks ../../library/mutex/libmutex.reti_blocks ../../library/schedule/libschedule.reti_blocks

#include "shared.header"
#include "../../library/sys/mman/mman.header"
#include "../../library/schedule/schedule.header"

int main(void) {
    int shared_memory_id;
    struct SharedState *shared_state;

    shared_memory_id = shm_open("shared-memory-mutex", 0);
    shared_state = (struct SharedState *)mmap(shared_memory_id);
    mutex_lock(&(shared_state->mutex));
    shared_state->workers = shared_state->workers + 1;
    yield();
    mutex_unlock(&(shared_state->mutex));
    return 0;
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-9111 -->
<ReadmeVisual kind="code" :width="560" data-code-source="code-9111" data-code-part="1">

<!-- README_CODE_PART code-9111 lines=1-13 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ mkdir -p binary/documentation/shared_mutex
$ picoc_compiler --direct-source-link -O1 -s -i -w -g \
    documentation/shared_mutex/launcher.picoc library/unistd/libunistd.picoc \
    library/sys/wait/libwait.picoc library/sys/mman/libmman.picoc \
    library/mutex/libmutex.picoc library/stdlib/libstdlib.picoc \
    -C library/start/libstart.picoc -o binary/documentation/shared_mutex/launcher.reti
$ picoc_compiler --direct-source-link -O1 -s -i -w -g \
    documentation/shared_mutex/worker.picoc library/sys/mman/libmman.picoc \
    library/mutex/libmutex.picoc library/unistd/libunistd.picoc \
    library/schedule/libschedule.picoc library/stdlib/libstdlib.picoc \
    -C library/start/libstart.picoc -o binary/documentation/shared_mutex/worker.reti
$ reti_emulator -a binary/documentation/shared_mutex/launcher.reti
$ reti_emulator -a binary/documentation/shared_mutex/worker.reti
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-9132 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-9132" data-code-part="1">

<!-- README_CODE_PART code-9132 lines=1-1 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>PicoOS terminal</span><span class="code-range"></span></div>

```console {lines:false}
PicoOS> /documentation/shared_mutex/launcher.bin
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SLIDE_ID a5625633-6778-40bc-b5ab-164d28dccb33 -->
<!-- SOURCE Pico-OS/README.md#1522-minimal-launcher-and-worker-code -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.2 Real-time operating-systems topics

## 15.2.2 Minimal launcher and worker code (3)

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Initialize mutex:</strong> before starting either child</li>
<li><strong>Open existing:</strong> size 0 prevents accidental creation</li>
<li><strong>yield while locked:</strong> permits contention; no order guarantee</li>
<li><strong>Unlink:</strong> parent mapping retains data until removal</li></ul></div>

</div>

---

<!-- SLIDE_ID 84f122ac-5802-4436-b911-2fca7e4f2342 -->
<!-- SOURCE Pico-OS/README.md#1523-following-the-counter-and-mutex-through-execution -->
<!-- SHORT_VERSION_DISABLED -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.2 Real-time operating-systems topics

## 15.2.3 Following the counter and mutex through execution

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-9151 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-9151:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:12.05%" /><col style="width:29.23%" /><col style="width:12.83%" /><col style="width:12.05%" /><col style="width:33.83%" /></colgroup><thead><tr><th>Step</th><th>Action</th><th>Counter</th><th>Lock</th><th>Queue / process state</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">1</td><td>Parent initializes the shared region</td><td><code>0</code></td><td><code>false</code></td><td>Queue empty, neither child has started</td></tr>
<tr data-source-row="2"><td class="table-key">2</td><td>Worker 1 acquires the mutex and increments the counter</td><td><code>0 → 1</code></td><td><code>true</code></td><td>Worker 1's state is <span class="source-link"><code>PROCESS_STATE_RUNNING</code></span></td></tr>
<tr data-source-row="3"><td class="table-key">3</td><td>Worker 1 yields while holding the mutex</td><td><code>1</code></td><td><code>true</code></td><td>Worker 1's state becomes <span class="source-link"><code>PROCESS_STATE_READY</code></span>, the lock remains held</td></tr>
<tr data-source-row="4"><td class="table-key">4</td><td>Worker 2 tries to lock, finds it held, and sleeps</td><td><code>1</code></td><td><code>true</code></td><td>Worker 2 queued; <strong>BLOCKED</strong></td></tr>
<tr data-source-row="5"><td class="table-key">5</td><td>Worker 1 resumes and unlocks</td><td><code>1</code></td><td><code>false</code></td><td>Worker 2 dequeued; <strong>READY</strong></td></tr>
<tr data-source-row="6"><td class="table-key">6</td><td>Worker 2 resumes, retries acquisition, increments, yields, and unlocks</td><td><code>1 → 2</code></td><td><code>true → false</code></td><td>Queue empty, both children can finish</td></tr>
<tr data-source-row="7"><td class="table-key">7</td><td>Parent finishes waiting, inspect the shared counter</td><td><code>2</code></td><td><code>false</code></td><td>Counter is <code>2</code>, parent unlinks the name</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<div class="readme-list prose-summary nested-summary"><ul><li><strong>Wakeup</strong><ul><li><strong>Queue:</strong> shared memory; <strong>PCB:</strong> Kernel Heap</li>
<li><strong>Unlock:</strong> waiter becomes READY</li>
<li><strong>Later dispatch:</strong> retry TSL; acquire lock</li></ul></li>
<li><strong>Lost-update experiment</strong><ul><li><strong>Split read/write:</strong> yield between them; remove mutex</li>
<li><strong>Both read 0:</strong> both write 1</li>
<li><strong>Original yield after write:</strong> may still produce 2</li></ul></li></ul></div>

</div>

---

<!-- SLIDE_ID 9e84965b-64b6-4cae-b06b-04b9f8b7ed4c -->
<!-- SOURCE Pico-OS/README.md#16-use-of-ai-in-the-project -->

<div class="eyebrow section-eyebrow">Section 16 · Overview</div>

# 16. Use of AI in the project

<SectionOverview section="16-use-of-ai-in-the-project" />

---

<!-- SLIDE_ID 84e3055c-f534-40fa-82b4-09c8e89af1eb -->
<!-- SOURCE Pico-OS/README.md#16-use-of-ai-in-the-project -->
<!-- SHORT_VERSION_DISABLED -->

## 16. Use of AI in the project

<div class="deck-content readme-slide">

<div class="readme-list summary-cards"><ul><li><strong>Author’s work</strong><ul><li><strong>Core concepts, architecture, structural decisions</strong></li>
<li><strong>System understanding + integration</strong></li>
<li><strong>Manual debugging:</strong> custom ReTI source debugger</li>
<li><strong>No GDB:</strong> custom CPU/runtime conventions</li></ul></li>
<li><strong>AI assistance</strong><ul><li><strong>Known behavior + approach:</strong> repetitive implementation</li>
<li><strong>Pointer arithmetic:</strong> check calculations + correct errors</li>
<li><strong>Supporting applications, tests, Makefiles, scripts</strong></li>
<li><strong>Usage record:</strong> documented by source file</li></ul></li>
<li><strong>Context</strong><ul><li><strong>Freiburg writing guide:</strong> principles adapted to code</li>
<li><strong>Guide:</strong> does not explicitly cover code generation</li>
<li><strong>GitHub Copilot / Education:</strong> more use near project end</li>
<li><strong>Three semesters:</strong> beyond 18 ECTS</li></ul></li></ul></div>

</div>

---

<!-- SLIDE_ID 958eb9fc-b363-4736-9a58-111ae898958b -->
<!-- SOURCE Pico-OS/README.md#17-limitations -->

<div class="eyebrow section-eyebrow">Section 17 · Overview</div>

# 17. Limitations

<SectionOverview section="17-limitations" />

---

<!-- SLIDE_ID e6126660-8ba5-4fb6-b371-4aae70da00fe -->
<!-- SOURCE Pico-OS/README.md#17-limitations -->
<!-- SHORT_VERSION_DISABLED -->

## 17. Limitations

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-9268 -->
<div class="readme-list bullet-columns"><ul><li><strong>No MMU</strong>, isolation, or virtual memory</li>
<li>Host files via <strong>UART</strong></li>
<li><strong>Eight descriptors</strong>; independent copied state</li>
<li><strong>Lazy Round Robin</strong>; cyclic scan</li>
<li><strong>Non-preemptive kernel</strong>; deferred switching</li>
<li><strong>Fixed heap/stack</strong>; no stack growth</li>
<li><strong>Reduced libraries</strong>, formatting, shell parsing</li>
<li><strong>Hardware unimplemented</strong>; instruction-count timing</li>
<li><strong>No sound/LCD</strong>; host terminal</li>
<li><strong>Static images:</strong> no dynamic loader/shared libraries<div class="readme-item"><strong>Reduced C library:</strong> linked through libstart</div></li>
<li><strong>POSIX-like names</strong>; reduced semantics</li></ul></div>

</div>
<aside class="context-note"><b>Scope</b><ul><li>Educational OS mechanisms</li>
<li>POSIX-like interfaces; reduced behavior</li></ul></aside>

</div>

---

<!-- SLIDE_ID 2ca8219a-609d-4c55-ad26-903ce5f84775 -->
<!-- SOURCE Pico-OS/README.md#appendix-inspecting-bin-files-with-hexyl -->
<!-- SHORT_VERSION_DISABLED -->

## Appendix: Inspecting `.bin` files with `hexyl`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 216fr) minmax(0, 110fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-9305 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-9305:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.10%" /><col style="width:27.10%" /><col style="width:45.80%" /></colgroup><thead><tr><th>File byte offset</th><th>Header word</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>0x00</code></td><td>Code start</td><td>Initial code/entry offset</td></tr>
<tr data-source-row="2"><td class="table-key"><code>0x04</code></td><td>Data start</td><td>Initial data offset</td></tr>
<tr data-source-row="3"><td class="table-key"><code>0x08</code></td><td>Heap start</td><td>Process heap start</td></tr>
<tr data-source-row="4"><td class="table-key"><code>0x0c</code></td><td>Heap size</td><td>Heap capacity; −1 → default</td></tr>
<tr data-source-row="5"><td class="table-key"><code>0x10</code></td><td>Stack start</td><td>Highest stack cell; −1 → default</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-9319 -->
<ReadmeVisual kind="code" :width="640" class="command-strip" data-code-source="code-9319" data-code-part="1">

<!-- README_CODE_PART code-9319 lines=1-2 -->
<div class="readme-code readme-terminal">
<div class="readme-code-header" v-pre><span>Host terminal</span><span class="code-range"></span></div>

```console {lines:false}
$ hexyl -g 4 -n 20 binary/user/echo.bin
$ hexyl -g 4 -s 20 -n 64 binary/user/echo.bin
```

</div>

</ReadmeVisual>

</div>

</div>
<div class="readme-list prose-summary"><ul><li><strong>Header:</strong> 20 bytes; words big-endian</li>
<li><strong>Transfer word count:</strong> UART only; absent from file</li>
<li><strong>Image word 32:</strong> byte 20 + 4×32 = 148</li>
<li><strong>Negative skip:</strong> count backward from file end</li></ul></div>

</div>

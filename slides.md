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

<div class="project-art" aria-label="Pico-OS source is compiled by PicoC-Compiler and assembled and executed by RETI-Emulator">
  <div class="art-trace trace-a"></div><div class="art-trace trace-b"></div><div class="art-trace trace-c"></div>
  <div class="art-node art-os"><b>Pico-OS</b><span>.picoc</span></div>
  <div class="art-node art-compiler"><b>PicoC-Compiler</b><span>RETI + .sections</span></div>
  <div class="art-node art-emulator"><b>RETI-Emulator</b><span>assemble · execute</span></div>
  <div class="art-pulse pulse-a"></div><div class="art-pulse pulse-b"></div>
</div>

<div class="cover-footline"><span>Jürgen Mattheis</span><div class="cover-meta"><span>University of Freiburg · Technical Faculty</span><span class="cover-version">{{ presentationVersion }}</span></div></div>

---

<!-- SOURCE Pico-OS/README.md#contents -->

<div class="eyebrow section-eyebrow">Presentation map</div>

# Contents

<PresentationContents />

---

<!-- SOURCE Pico-OS/README.md#picoos -->

# PicoOS

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Educational OS</strong> for RETI</li>
<li><strong>Bootloader</strong> → kernel → init → shell</li>
<li><strong>Shared physical memory</strong>; no MMU</li>
<li><strong>Host-backed files</strong> via UART</li></ul></div>
<aside class="context-note"><b>POSIX context</b><ul><li>Unix-inspired interfaces</li>
<li>Educational subset; reduced semantics</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#picoos -->
<!-- SHORT_VERSION_DISABLED -->

# PicoOS

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 135fr) minmax(0, 259fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-27 -->
<div class="readme-list"><ul><li><strong>Pico-Compiler:</strong> compile + link</li>
<li><strong>RETI-Emulator:</strong> assemble to machine code, execute, inspect</li>
<li><strong>PicoOS:</strong> source includes bootloader, kernel, init process, user applications (shell)</li></ul></div>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-42 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/picoos-build-boot.svg" alt="PicoOS build and boot overview" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#picoos -->

# PicoOS

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-51 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-51:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.58%" /><col style="width:39.16%" /><col style="width:32.26%" /></colgroup><thead><tr><th>Producer</th><th>Contract</th><th>Consumer</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">PicoC-Compiler</td><td>Linked code + layout + debug metadata</td><td>Assembler + source debugger</td></tr>
<tr data-source-row="2"><td class="table-key">RETI-Emulator assembler</td><td>Five-word header + RETI binary</td><td>Bootloader + process loader</td></tr>
<tr data-source-row="3"><td class="table-key">PicoOS libraries</td><td>Selector + value/request pointer</td><td>Interrupt entry + kernel subsystem</td></tr>
<tr data-source-row="4"><td class="table-key">Kernel subsystems</td><td>PCBs, queues, descriptors, periphery writes</td><td>Dispatcher + emulated hardware</td></tr>
<tr data-source-row="5"><td class="table-key">PicoOS UART host request protocol</td><td>Bounded UART requests + big-endian replies</td><td>Emulator or companion serial host</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#build-and-run -->
<!-- SHORT_VERSION_DISABLED -->

# PicoOS

## Build and run

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 132fr) minmax(0, 216fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-68 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-68" data-code-part="1">

<!-- README_CODE_PART code-68 lines=1-5 -->
<div class="readme-code readme-terminal">

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

<!-- README_ASSET table-86 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-86:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.69%" /><col style="width:33.15%" /><col style="width:33.15%" /></colgroup><thead><tr><th>Behavior</th><th>Shell launcher</th><th>PowerShell launcher</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Use a specific emulator</td><td><code>--reti-emulator PATH</code></td><td><code>-RetiEmulator PATH</code></td></tr>
<tr data-source-row="2"><td class="table-key">Enable DMA loading</td><td><code>--dma</code> or <code>-M</code></td><td><code>-Dma</code> or <code>-M</code></td></tr>
<tr data-source-row="3"><td class="table-key">Run directly in the terminal</td><td><code>--notui</code> or <code>-N</code></td><td><code>-NoTui</code> or <code>-N</code></td></tr>
<tr data-source-row="4"><td class="table-key">Show help</td><td><code>--help</code> or <code>-h</code></td><td><code>-Help</code> or <code>-h</code></td></tr>
<tr data-source-row="5"><td class="table-key">Pass remaining emulator options</td><td><code>-- EMULATOR_ARGS...</code></td><td><code>-- EMULATOR_ARGS...</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#use-the-picoos-shell -->
<!-- SHORT_VERSION_DISABLED -->

# PicoOS · Build and run

## Use the PicoOS shell

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-122 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-122" data-code-part="1">

<!-- README_CODE_PART code-122 lines=1-6 -->
<div class="readme-code readme-terminal">

```console {lines:false}
PicoOS> echo.bin "kernel\ncontext switcher\nscheduler" > input.txt
PicoOS> cat.bin input.txt | sed.bin "s/context switcher/dispatcher/" > topics.txt
PicoOS> cat.bin topics.txt
kernel
dispatcher
scheduler
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#release-archive-layout -->
<!-- SHORT_VERSION_DISABLED -->

# PicoOS · Build and run

## Release archive layout

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-150 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-150:1,2,3,4,5,6,7,8,9">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#intended-physical-hardware -->

# PicoOS

## Intended physical hardware (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-178 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/intended-hardware.svg" alt="Intended physical hardware: host, FPGA, and shared SRAM" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#intended-physical-hardware -->

# PicoOS

## Intended physical hardware (2)

<div class="deck-content readme-slide">

<!-- README_ASSET list-185 -->
<div class="hardware-tiles"><div class="readme-tile"><div class="tile-name"><strong>FPGA:</strong> Alchitry Cu V2 — €55.66</div><ul><li>Lattice iCE40-HX8K</li>
<li>CPU / IRQ / <strong>UART</strong> / DMA</li>
<li>Timer + buffer + SRAM arbitration</li></ul></div><div class="readme-tile"><div class="tile-name"><strong>SRAM:</strong> 2 × ISSI chips</div><ul><li>IS61WV25616BLL-10TLI</li>
<li>2 × €5.80 = €11.60</li>
<li>Shared address + control</li>
<li>Combined 32-bit bus; 1 MiB</li></ul></div><div class="readme-tile"><div class="tile-name"><strong>USB–UART:</strong> SparkFun CH340C</div><ul><li><strong>Price:</strong> €10.92</li>
<li>TXO → RX; RXI ← TX</li>
<li>Common ground; matching serial format</li>
<li><strong>DMA:</strong> four bytes → one word</li></ul></div></div>
<div class="artifact-columns hardware-details" data-column-key="hardware:details" style="--readme-columns:minmax(0, 39fr) minmax(0, 61fr);"><div class="readme-list"><ul><li><strong>Parts total:</strong> €78.18 including VAT</li>
<li><strong>DigiKey Germany estimate:</strong> 12 August 2026</li>
<li><strong>Excludes</strong> wiring, PCB, cables, shipping</li>
<li>Proposed hardware; development uses <strong>emulator</strong></li>
<li>Hardware needs <strong>companion host service</strong></li></ul></div>

<!-- README_ASSET table-236 -->
<ReadmeVisual kind="table" :width="760" data-table-key="table-236:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:44.91%" /><col style="width:26.47%" /><col style="width:28.62%" /></colgroup><thead><tr><th>Image</th><th>32-bit words</th><th>Size</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>kernel.bin</code></span> (<span class="source-link"><code>kernel.picoc</code></span>)</td><td>41,502</td><td>0.166008 MB</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>init.bin</code></span> (<span class="source-link"><code>init.picoc</code></span>)</td><td>10,824</td><td>0.043296 MB</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>shell.bin</code></span> (<span class="source-link"><code>shell.picoc</code></span>)</td><td>29,647</td><td>0.118588 MB</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>cat.bin</code></span> (<span class="source-link"><code>cat.picoc</code></span>)</td><td>10,487</td><td>0.041948 MB</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>echo.bin</code></span> (<span class="source-link"><code>echo.picoc</code></span>)</td><td>12,018</td><td>0.048072 MB</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#reti-execution-model -->
<!-- SHORT_VERSION_DISABLED -->

# PicoOS · Intended physical hardware

## RETI execution model

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-compact-stacked">

<!-- README_ASSET image-256 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/reti-memory-map.svg" alt="RETI address space with EPROM and periphery each occupying one quarter and SRAM occupying one half" />

</ReadmeVisual>

<!-- README_ASSET table-260 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-260:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.82%" /><col style="width:30.15%" /><col style="width:45.02%" /></colgroup><thead><tr><th>High bits</th><th>Address space</th><th>PicoOS use</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>00</code></td><td>EPROM</td><td>Bootloader</td></tr>
<tr data-source-row="2"><td class="table-key"><code>01</code></td><td>Memory-mapped periphery</td><td>UART, interrupts, timer, exceptions, DMA</td></tr>
<tr data-source-row="3"><td class="table-key"><code>10</code> or <code>11</code></td><td>SRAM</td><td>Kernel, processes, heaps, stacks</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1-toolchain-extensions-for-picoos -->

<div class="eyebrow section-eyebrow">Section 01 · Overview</div>

# 1. Toolchain extensions for PicoOS

<SectionOverview section="1-toolchain-extensions-for-picoos" />

---

<!-- SOURCE Pico-OS/README.md#11-picoc-compiler-extensions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink>

## 1.1 PicoC-Compiler extensions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-501 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-501:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23">

<div class="table-panels table-panels-two" data-column-key="table:table-501:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:39.32%" /><col style="width:60.68%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Installation</td><td>Install picoc_compiler + environment</td></tr>
<tr data-source-row="2"><td class="table-key">Preprocessing</td><td><ul><li>Includes, macros, #pragma once</li><li>Dependencies + optional syntax checking</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">Multiple translation units</td><td>Per-file compilation + final linking</td></tr>
<tr data-source-row="4"><td class="table-key">Reusable build artifacts</td><td>Reusable code/symbol/debug artifacts</td></tr>
<tr data-source-row="5"><td class="table-key">Automatic artifact reuse</td><td>Hashes + options decide reuse</td></tr>
<tr data-source-row="6"><td class="table-key">Broader PicoC syntax</td><td>typedef, casts, declarations, increment</td></tr>
<tr data-source-row="7"><td class="table-key">Pointer support</td><td>Typed pointers + compatible structs</td></tr>
<tr data-source-row="8"><td class="table-key">Function pointers</td><td>Indirect calls + linked addresses</td></tr>
<tr data-source-row="9"><td class="table-key">Variadic functions</td><td>Variadic declarations + System V frames</td></tr>
<tr data-source-row="10"><td class="table-key">String and character data</td><td>Escapes + linker-safe string literals</td></tr>
<tr data-source-row="11"><td class="table-key">Inline RETI assembly</td><td>Inline assembly + linked labels</td></tr>
<tr data-source-row="12"><td class="table-key">Low-level functions</td><td>Naked startup/interrupt handlers</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:39.32%" /><col style="width:60.68%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="13"><td class="table-key">Custom sections</td><td>.ivt attributes; .text/.data defaults</td></tr>
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

<!-- SOURCE Pico-OS/README.md#111-compilation-pipeline-and-compiler-passes -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.1 Compilation pipeline and compiler passes

<div class="deck-content readme-slide">

<div class="readme-artifacts pipeline-comparison"><div class="pipeline-panel"><div class="readme-list"><ul><li><strong>Original:</strong> one source file</li>
<li><strong>Lark:</strong> parses source into a parse tree</li>
<li><strong>AST construction</strong>, then single-file lowering to RETI</li></ul></div>

<!-- README_ASSET mermaid-534 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    source["One PicoC source file"]

    subgraph frontend["Lexing and parsing"]
        lexer["Lark lexer and parser"]
        tree["Parse tree"]
        ast["PicoC AST"]
    end

    subgraph compilation["Single-file compilation passes"]
        shrink["picoc_shrink"]
        blocks["picoc_blocks"]
        anf["picoc_anf"]
        reti_blocks["reti_blocks"]
        patch["reti_patch"]
        reti["reti"]
    end

    output["One RETI program"]

    source --> lexer --> tree -->|TransformerPicoC| ast
    ast --> shrink --> blocks --> anf --> reti_blocks --> patch --> reti --> output
```

</ReadmeVisual>

</div>

<div class="pipeline-panel"><div class="readme-list"><ul><li><strong>Extended:</strong> reusable units, <strong>Tree-sitter</strong> replaces <strong>Lark</strong></li>
<li><strong>Tree-sitter:</strong> parses preprocessed source into a parse tree</li>
<li><strong>AST construction</strong>, symbol/type checks, linking + startup</li></ul></div>

<!-- README_ASSET mermaid-563 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    source["PicoC source files"]

    subgraph preprocessing["Preprocessing"]
        preprocessor["Includes, macros, and line splicing"]:::added
        preprocessed["Preprocessed source"]:::added
    end

    subgraph frontend["Lexing and parsing"]
        parser["Tree-sitter lexer and parser"]:::added
        parse_tree["Tree-sitter parse tree"]
        ast["PicoC AST"]
    end

    subgraph compilation["Per-file compilation passes"]
        shrink["picoc_shrink"]
        blocks["picoc_blocks"]
        symbol["PicoC symbols<br/>picoc_symbol"]:::added
        typing["PicoC typing<br/>picoc_typing"]:::added
        anf["picoc_anf"]
        reti_blocks["reti_blocks"]
    end

    subgraph linking["Program-wide linking passes"]
        merge["Merge code / global symbols<br/>Insert startup code"]:::added
        patch["reti_patch"]
        reti["reti"]
    end

    output["Linked RETI program"]

    source --> preprocessor --> preprocessed --> parser --> parse_tree -->|TransformerPicoC.build_ast| ast
    ast --> shrink --> blocks --> symbol --> typing --> anf --> reti_blocks
    reti_blocks --> merge --> patch --> reti --> output
    classDef added fill:#fff2b2,stroke:#8a5a00,stroke-width:3px,color:#111
    style preprocessing fill:#fff8dc,stroke:#8a5a00,stroke-width:3px,color:#111
```

</ReadmeVisual>

</div></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#112-separate-compilation-reusable-artifacts-and-linking -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.2 Separate compilation, reusable artifacts, and linking (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-612 -->
<div class="code-columns" data-column-key="code:code-612" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:5.415384615384615">

<ReadmeVisual kind="code" :width="762.4" data-code-source="code-612" data-code-part="1">

<!-- README_CODE_PART code-612 lines=1-12 -->
<div class="readme-code readme-terminal">

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

<ReadmeVisual kind="code" :width="762.4" data-code-source="code-612" data-code-part="2">

<!-- README_CODE_PART code-612 lines=13-23 -->
<div class="readme-code readme-terminal">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#112-separate-compilation-reusable-artifacts-and-linking -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.2 Separate compilation, reusable artifacts, and linking (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:mermaid-640+mermaid-652" style="--readme-columns:minmax(0, 42fr) minmax(0, 58fr);">

<!-- README_ASSET mermaid-640 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TB
    SRC["libstring.c + included .h headers"] --> COMPILE["gcc -c -O2 libstring.c"]
    COMPILE --> OBJ["libstring.o"]
    OBJ --> LINK["gcc -o basic_string libstring.o basic_string.o ..."]
    MORE["basic_string.o, ..."] --> LINK
    LINK --> OUT["basic_string<br/>executable binary"]
```

</ReadmeVisual>

<!-- README_ASSET mermaid-652 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TB
    SRC["libstring.picoc<br/>includes string.picoc / shared helpers"] --> COMPILE["picoc_compiler -c -O1 libstring.picoc"]
    COMPILE --> OBJ["libstring.reti_blocks"]
    COMPILE --> SYMBOLS["libstring.st<br/>JSON symbol table"]
    OBJ --> LINK["picoc_compiler -O1 -o basic_string.reti<br/>libstring.reti_blocks basic_string.reti_blocks ..."]
    SYMBOLS -.->|automatically read with libstring.reti_blocks| LINK
    MORE["basic_string.reti_blocks, ..."] --> LINK
    LINK --> RETI["basic_string.reti"]
    LINK --> SECTIONS["basic_string.sections"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#113-system-v-abi-stack-frames-and-call-cleanup -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.3 System V ABI stack frames and call cleanup

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Shared convention:</strong> C, assembly, startup, interrupts</li>
<li><strong>BAF</strong> identifies stack frame</li>
<li>Caller pushes <strong>arguments</strong> + continuation</li>
<li>Caller removes <strong>arguments</strong> after return</li>
<li>Callee restores <strong>BAF</strong>; result in IN2</li></ul></div>
<aside class="context-note"><b>System V ABI</b><ul><li>General model adapted to RETI</li>
<li>Different from AMD64 ABI</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#1131-stack-frame-layout-and-caller-cleanup -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.1 Stack-frame layout and caller cleanup

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-689 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-689:1,2,3,4,5,6,7,8,9,10,11,12,13,14">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.60%" /><col style="width:44.05%" /><col style="width:28.36%" /></colgroup><thead><tr><th>Position</th><th>Contents</th><th>Managed by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><strong>Higher addresses ↑</strong></td><td>Earlier stack contents</td><td>Earlier calls</td></tr>
<tr data-source-row="2"><td class="table-key"><em><code>caller BAF + 3</code></em></td><td>Caller argument</td><td>Caller’s caller</td></tr>
<tr data-source-row="3"><td class="table-key"><em><code>caller BAF + 2</code></em></td><td>Caller return address</td><td>Caller’s caller</td></tr>
<tr data-source-row="4"><td class="table-key"><em><code>caller BAF + 1</code></em></td><td>Saved caller frame pointer</td><td>Caller frame</td></tr>
<tr data-source-row="5"><td class="table-key"><em><code>caller BAF</code></em></td><td>Caller local</td><td>Caller frame</td></tr>
<tr data-source-row="6"><td class="table-key"><em><code>caller BAF - 1</code></em></td><td>Retained temporary expression</td><td>Caller expression</td></tr>
<tr data-source-row="7"><td class="table-key"><strong><code>BAF + 4</code></strong></td><td>Second argument (arg2)</td><td>Caller</td></tr>
<tr data-source-row="8"><td class="table-key"><strong><code>BAF + 3</code></strong></td><td>First argument (arg1)</td><td>Caller</td></tr>
<tr data-source-row="9"><td class="table-key"><strong><code>BAF + 2</code></strong></td><td>Return continuation address</td><td>Caller</td></tr>
<tr data-source-row="10"><td class="table-key"><strong><code>BAF + 1</code></strong></td><td>Saved caller BAF</td><td>Callee</td></tr>
<tr data-source-row="11"><td class="table-key"><strong><code>BAF</code></strong></td><td>First local</td><td>Callee</td></tr>
<tr data-source-row="12"><td class="table-key"><strong><code>BAF - 1</code>, ...</strong></td><td>More locals + temporaries</td><td>Callee</td></tr>
<tr data-source-row="13"><td class="table-key"><strong><code>SP</code></strong></td><td>Free cell below occupied stack</td><td>Current stack boundary</td></tr>
<tr data-source-row="14"><td class="table-key"><strong>Lower addresses ↓</strong></td><td>Stack grows toward lower addresses</td><td></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1132-shared-function-epilogue-and-return-values -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.2 Shared function epilogue and return values (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET mermaid-723 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    return_a["return expression A"] --> epilogue["function_epilogue"]
    return_b["return expression B"] --> epilogue
    return_void["return"] --> epilogue
    epilogue --> restore["Restore BAF"]
    restore --> caller["Jump to saved return address"]
```

</ReadmeVisual>

<!-- README_ASSET code-735 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-735" data-code-part="1">

<!-- README_CODE_PART code-735 lines=1-7 -->
<div class="readme-code">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#1132-shared-function-epilogue-and-return-values -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.2 Shared function epilogue and return values (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-748 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-748" data-code-part="1" style="flex:0 0 46px">

<!-- README_CODE_PART code-748 lines=1-1 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -c -O1 -v -w normal-function.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-754 -->
<div class="code-columns" data-column-key="code:code-754" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);--source-aspect:3.0688864760525996">

<ReadmeVisual kind="code" :width="495.79999999999995" data-code-source="code-754" data-code-part="1">

<!-- README_CODE_PART code-754 lines=1-13 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="422.3481481481481" data-code-source="code-754" data-code-part="2">

<!-- README_CODE_PART code-754 lines=14-26 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1132-shared-function-epilogue-and-return-values -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.2 Shared function epilogue and return values (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-787 -->
<div class="code-columns" data-column-key="code:code-787" style="--readme-columns:minmax(0, 55fr) minmax(0, 45fr);--source-aspect:1.2798573975044563">

<ReadmeVisual kind="code" :width="513.3333333333333" data-code-source="code-787" data-code-part="1">

<!-- README_CODE_PART code-787 lines=1-34 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="420" data-code-source="code-787" data-code-part="2">

<!-- README_CODE_PART code-787 lines=35-67 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1133-naked-functions-without-a-generated-frame -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.3 Naked functions without a generated frame (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-874 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-874" data-code-part="1">

<!-- README_CODE_PART code-874 lines=1-11 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1133-naked-functions-without-a-generated-frame -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.3 System V ABI stack frames and call cleanup

## 1.1.3.3 Naked functions without a generated frame (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-891 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-891" data-code-part="1" style="flex:0 0 46px">

<!-- README_CODE_PART code-891 lines=1-1 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -c -O1 naked-function.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-895 -->
<div class="code-columns" data-column-key="code:code-895" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:2.475644699140401">

<ReadmeVisual kind="code" :width="420" data-code-source="code-895" data-code-part="1">

<!-- README_CODE_PART code-895 lines=1-15 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="420" data-code-source="code-895" data-code-part="2">

<!-- README_CODE_PART code-895 lines=16-29 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#114-placing-globals-in-ivt-with-sectionivt -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.4 Placing globals in `.ivt` with `section("ivt")` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-948 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-948" data-code-part="1">

<!-- README_CODE_PART code-948 lines=1-13 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#114-placing-globals-in-ivt-with-sectionivt -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.4 Placing globals in `.ivt` with `section("ivt")` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-967 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-967" data-code-part="1" style="flex:0 0 46px">

<!-- README_CODE_PART code-967 lines=1-1 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -c -O1 section-placement.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-973 -->
<div class="code-columns" data-column-key="code:code-973" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:2.475644699140401">

<ReadmeVisual kind="code" :width="420" data-code-source="code-973" data-code-part="1">

<!-- README_CODE_PART code-973 lines=1-15 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="420" data-code-source="code-973" data-code-part="2">

<!-- README_CODE_PART code-973 lines=16-30 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#114-placing-globals-in-ivt-with-sectionivt -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.4 Placing globals in `.ivt` with `section("ivt")` (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-command-above">

<!-- README_ASSET code-1009 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-1009" data-code-part="1" style="flex:0 0 46px">

<!-- README_CODE_PART code-1009 lines=1-1 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -O1 -v -o section-placement.reti section-placement.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1016 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1016" data-code-part="1">

<!-- README_CODE_PART code-1016 lines=1-12 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1151-default-compiler-generated-_start -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.5 Selecting a startup function with `-C` / `--startup-source`

## 1.1.5.1 Default compiler-generated `_start`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1050 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1050" data-code-part="1">

<!-- README_CODE_PART code-1050 lines=1-4 -->
<div class="readme-code">

```c {lines:false}
void _start(void) {
    main();
    Exit(0);
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1152-picoos-libstart-startup-sequence -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.5 Selecting a startup function with `-C` / `--startup-source`

## 1.1.5.2 PicoOS `libstart` startup sequence

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1072+code-1081" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1072 -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1072" data-code-part="1">

<!-- README_CODE_PART code-1072 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1081 -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1081" data-code-part="1">

<!-- README_CODE_PART code-1081 lines=1-16 -->
<div class="readme-code">

```c {lines:false}
#include "../stdlib/stdlib.header"
#include "../unistd/unistd.header"

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

<!-- SOURCE Pico-OS/README.md#1153-startup-functions-used-by-picoos-images -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.5 Selecting a startup function with `-C` / `--startup-source`

## 1.1.5.3 Startup functions used by PicoOS images

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1112 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1112:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.20%" /><col style="width:52.37%" /><col style="width:23.44%" /></colgroup><thead><tr><th>Image</th><th>_start used</th><th>Next function</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">EPROM bootloader</td><td>Explicit naked _start; no -C</td><td><span class="source-link"><code>boot_main()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key">SRAM kernel</td><td>Compiler-generated _start</td><td><span class="source-link"><code>main()</code></span></td></tr>
<tr data-source-row="3"><td class="table-key">Init process</td><td>libstart; -C library/start/libstart.picoc</td><td><span class="source-link"><code>main()</code></span></td></tr>
<tr data-source-row="4"><td class="table-key">Shell</td><td>Same libstart -C option</td><td><span class="source-link"><code>main()</code></span></td></tr>
<tr data-source-row="5"><td class="table-key">User applications</td><td>Common userspace libstart link rule</td><td>Application main()</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#116-program-sections-interrupt-table-entries-and-linker-placement -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.6 Program sections, interrupt table entries, and linker placement

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 148fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-1760+code-1787" style="--readme-columns:minmax(0, 60fr) minmax(0, 40fr);">

<!-- README_ASSET code-1760 repeated -->
<ReadmeVisual kind="code" :width="630" data-code-source="code-1760" data-code-part="1">

<!-- README_CODE_PART code-1760 lines=1-8 -->
<div class="readme-code">

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

<!-- README_ASSET code-1787 repeated -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-1787" data-code-part="1">

<!-- README_CODE_PART code-1787 lines=1-4 -->
<div class="readme-code">

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

<!-- README_ASSET table-1126 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1126:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:18.09%" /><col style="width:40.78%" /><col style="width:41.14%" /></colgroup><thead><tr><th>Section</th><th>Default contents and addressing</th><th>How source selects it</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>.ivt</code></td><td>ISR words; CS-relative globals</td><td>section(&quot;ivt&quot;) attribute</td></tr>
<tr data-source-row="2"><td class="table-key"><code>.text</code></td><td>Entry + ordinary instructions; CS-relative</td><td>Default for functions</td></tr>
<tr data-source-row="3"><td class="table-key"><code>.data</code></td><td>Ordinary globals; DS-relative</td><td>Default for globals</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>
<aside class="context-note"><b>Calling convention</b><ul><li>C helpers + inline assembly</li>
<li>Shared RETI stack-frame rules</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#117-reti-pseudoinstructions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.7 RETI pseudoinstructions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1152 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1152:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.86%" /><col style="width:37.40%" /><col style="width:30.74%" /></colgroup><thead><tr><th>Pseudoinstruction</th><th>Purpose</th><th>Concrete size</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>PUSH reg</code></td><td>Reserve cell; store register</td><td>2 instructions</td></tr>
<tr data-source-row="2"><td class="table-key"><code>POP reg</code></td><td>Load top cell; release cell</td><td>2 instructions</td></tr>
<tr data-source-row="3"><td class="table-key"><code>LOADI32 reg operand</code></td><td>Load 32-bit literal or linked address</td><td>3 instructions</td></tr>
<tr data-source-row="4"><td class="table-key"><code>JUMP32[relation] target</code></td><td>Jump beyond immediate range</td><td>4--6 instructions when retained</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1171-interrupt-safe-push-and-pop -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 RETI pseudoinstructions

## 1.1.7.1 Interrupt-safe `PUSH` and `POP`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 149fr) minmax(0, 132fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1169 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1169:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:43.61%" /><col style="width:56.39%" /></colgroup><thead><tr><th>Pseudoinstruction</th><th>Expansion</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>PUSH ACC</code></td><td><ul><li><code>SUBI SP 1</code></li><li><code>STOREIN SP ACC 1</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>POP ACC</code></td><td><ul><li><code>LOADIN SP ACC 1</code></li><li><code>ADDI SP 1</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1183 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1183" data-code-part="1">

<!-- README_CODE_PART code-1183 lines=1-5 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1172-loading-32-bit-values-with-loadi32 -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 RETI pseudoinstructions

## 1.1.7.2 Loading 32-bit values with `LOADI32`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 78fr) minmax(0, 95fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-1211+code-1223" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1211 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-1211" data-code-part="1">

<!-- README_CODE_PART code-1211 lines=1-3 -->
<div class="readme-code">

```text {lines:false}
LOADI reg signed_upper
MULTI reg 1024
ORI reg lower_bits
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1223 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-1223" data-code-part="1">

<!-- README_CODE_PART code-1223 lines=1-3 -->
<div class="readme-code">

```text {lines:false}
LOADI ACC -2097152
MULTI ACC 1024
ORI ACC 5
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1233 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1233" data-code-part="1">

<!-- README_CODE_PART code-1233 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
asm("LOADI32 ACC start_loaded_kernel");
asm("ADD ACC CS");
asm("MOVE ACC PC");
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1173-long-jumps-with-jump32 -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 RETI pseudoinstructions

## 1.1.7.3 Long jumps with `JUMP32`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1275 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1275" data-code-part="1">

<!-- README_CODE_PART code-1275 lines=1-5 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1174-pseudoinstruction-expansion-during-linking -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions · 1.1.7 RETI pseudoinstructions

## 1.1.7.4 Pseudoinstruction expansion during linking

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 197fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1308 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/pseudoinstruction-blocks.svg" alt="Expanded code blocks and the jump to done" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1310 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1310:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.80%" /><col style="width:45.54%" /><col style="width:31.67%" /></colgroup><thead><tr><th>Block</th><th>Symbolic instructions</th><th>Real instructions after expansion</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>entry</code></td><td><code>PUSH BAF</code>, <code>LOADI32 ACC done</code>, <code>JUMP32 done</code></td><td><code>2 + 3 + 5 = 10</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>work</code></td><td><code>PUSH ACC</code>, <code>POP IN1</code>, <code>LOADI32 ACC 7</code></td><td><code>2 + 2 + 3 = 7</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>done</code></td><td><code>POP BAF</code></td><td><code>2</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 170fr) minmax(0, 253fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1336 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1336" data-code-part="1">

<!-- README_CODE_PART code-1336 lines=1-7 -->
<div class="readme-code">

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

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1349 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1349:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:50.59%" /><col style="width:49.41%" /></colgroup><thead><tr><th>Entry</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>interrupt_service_routines_start</code></td><td>Optional ISR code start</td></tr>
<tr data-source-row="2"><td class="table-key"><code>codesegment_start</code></td><td>Initial CS + entry region</td></tr>
<tr data-source-row="3"><td class="table-key"><code>datasegment_start</code></td><td>Initial DS</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>heap_start</code></span></td><td>First process-local heap cell</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>heap_size</code></span></td><td>Capacity in cells; −1 → default</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>stack_start</code></span></td><td>Highest stack cell; −1 → default</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-1366 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TB
    RETI["program.reti<br/>linked RETI instructions and data"] --> ASSEMBLE["reti_emulator -a program.reti"]
    SECTIONS["program.sections<br/>linked layout metadata"] -->|automatically found beside program.reti| ASSEMBLE
    ASSEMBLE --> BIN["program.bin<br/>five-word big-endian layout header<br/>encoded RETI instructions + data words"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#118-linked-sections-metadata-and-the-five-word-binary-header -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.8 Linked `.sections` metadata and the five-word binary header (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 151fr) minmax(0, 216fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1376 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1376" data-code-part="1">

<!-- README_CODE_PART code-1376 lines=1-6 -->
<div class="readme-code readme-terminal">

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

<!-- README_ASSET table-1390 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1390:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.34%" /><col style="width:32.71%" /><col style="width:42.96%" /></colgroup><thead><tr><th>Word</th><th>Value</th><th>Use in PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td><code>codesegment_start</code></td><td>Initial CS + entry</td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td><code>datasegment_start</code></td><td>Initial DS</td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td><span class="source-link"><code>heap_start</code></span></td><td>Process-local heap start</td></tr>
<tr data-source-row="4"><td class="table-key">3</td><td><span class="source-link"><code>heap_size</code></span></td><td>Configured cells; −1 → default</td></tr>
<tr data-source-row="5"><td class="table-key">4</td><td><span class="source-link"><code>stack_start</code></span></td><td>Highest stack cell; −1 → default</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1416 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1416" data-code-part="1">

<!-- README_CODE_PART code-1416 lines=1-9 -->
<div class="readme-code">

```c {lines:false}
#define SRAM_BASE (-2147483647 - 1) // -2^31
#define SRAM_MAX_ADDRESS_IN_MEMORY_MAP -2147221505 // -2^31 + 2^18 - 1
#define KERNEL_HEAP_START -2147442151 // -2^31 + heap_start
#define KERNEL_HEAP_SIZE 4096 // heap_size
#define PROCESS_MEMORY_START -2147435339 // -2^31 + stack_start + 1
#define KERNEL_CS_START_ASM "LOADI32 CS -2147483643" // -2^31 + codesegment_start
#define KERNEL_DS_START_ASM "LOADI32 DS -2147442882" // -2^31 + datasegment_start
#define KERNEL_SP_START_ASM "LOADI32 SP -2147435340" // -2^31 + stack_start
#define KERNEL_CS_ACC_ASM "LOADI32 ACC -2147483643" // -2^31 + codesegment_start
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1430 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1430:1,2,3,4,5,6,7">

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

<!-- SOURCE Pico-OS/README.md#119-generated-memory-constants-for-the-bootloader-and-kernel -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.1 PicoC-Compiler extensions

## 1.1.9 Generated memory constants for the bootloader and kernel (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 95fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1444 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1444" data-code-part="1">

<!-- README_CODE_PART code-1444 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
#define SRAM_MAX_ADDRESS 262143 // 2^18 - 1
#define EPROM_DS_START_ASM "LOADI32 DS 3165" // datasegment_start
#define EPROM_STACK_START_ASM "LOADI32 SP -2147221505" // -2^31 + 2^18 - 1
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1450 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1450:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:48.29%" /><col style="width:51.71%" /></colgroup><thead><tr><th>Bootloader constant</th><th>Consumer and purpose</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SRAM_MAX_ADDRESS</code></span></td><td>Physical SRAM limit; fallback stack</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>EPROM_DS_START_ASM</code></span></td><td>Install linked EPROM DS</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>EPROM_STACK_START_ASM</code></span></td><td>Temporary stack at SRAM top</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#12-reti-emulator-extensions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink>

## 1.2 RETI-Emulator extensions (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1470 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1470:1,2,3,4,5,6,7,8,9,10,11,12,13">

<div class="table-panels table-panels-two" data-column-key="table:table-1470:1,2,3,4,5,6,7,8,9,10,11,12,13" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:37.58%" /><col style="width:62.42%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Plain execution output</td><td>UART output → host stdout</td></tr>
<tr data-source-row="2"><td class="table-key">Commented assembly</td><td>Source labels/comments beside assembly</td></tr>
<tr data-source-row="3"><td class="table-key">Atomic locking</td><td>Atomic old value + store 1</td></tr>
<tr data-source-row="4"><td class="table-key">Structured loading</td><td>Distinct code/data/heap/stack regions</td></tr>
<tr data-source-row="5"><td class="table-key">Binary assembly</td><td>RETI words + five-word header</td></tr>
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

<!-- SOURCE Pico-OS/README.md#12-reti-emulator-extensions -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink>

## 1.2 RETI-Emulator extensions (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1470 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1470:14,15,16,17,18,19,20,21,22,23,24,25">

<div class="table-panels table-panels-two" data-column-key="table:table-1470:14,15,16,17,18,19,20,21,22,23,24,25" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:37.50%" /><col style="width:62.50%" /></colgroup><thead><tr><th>Feature</th><th>Contribution</th></tr></thead><tbody><tr data-source-row="14"><td class="table-key">UART host services</td><td>Bounded host filesystem protocol</td></tr>
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

<!-- SOURCE Pico-OS/README.md#121-reti-machine-model-and-memory-mapped-peripherals -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.1 RETI machine model and memory-mapped peripherals (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 116fr) minmax(0, 143fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1508 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/reti-periphery-memory-map.svg" alt="RETI address space with periphery between EPROM and SRAM" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1513 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1513:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:34.38%" /><col style="width:17.00%" /><col style="width:18.52%" /><col style="width:30.09%" /></colgroup><thead><tr><th>Address range</th><th>Top-bit prefix</th><th>RETI region</th><th>Implemented PicoOS use</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>0x00000000..0x3fffffff</code></td><td><code>00</code></td><td>EPROM</td><td>Bootloader code + data</td></tr>
<tr data-source-row="2"><td class="table-key"><strong><code>0x40000000..0x7fffffff</code></strong></td><td><strong><code>01</code></strong></td><td><strong>Periphery</strong></td><td>Implemented offsets 0–16</td></tr>
<tr data-source-row="3"><td class="table-key"><code>0x80000000..0xffffffff</code></td><td><code>10</code> or <code>11</code></td><td>SRAM</td><td>Kernel, processes, heaps, stacks</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#121-reti-machine-model-and-memory-mapped-peripherals -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.1 RETI machine model and memory-mapped peripherals (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1523 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1523:1,2,3,4,5,6,7,8,9,10,11,12,13">

<div class="table-panels table-panels-two" data-column-key="table:table-1523:1,2,3,4,5,6,7,8,9,10,11,12,13" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:18.19%" /><col style="width:29.47%" /><col style="width:52.34%" /></colgroup><thead><tr><th>Offset</th><th>Register</th><th>Access and connection to PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td>UART send</td><td>Write low byte; clear send-ready</td></tr>
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

<!-- SOURCE Pico-OS/README.md#122-atomic-test-and-set-with-tsl -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.2 Atomic test-and-set with `TSL` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 95fr) minmax(0, 247fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1552 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1552" data-code-part="1">

<!-- README_CODE_PART code-1552 lines=1-3 -->
<div class="readme-code">

```text {lines:false}
# Before: M[DS + 2] = 0
TSL DS ACC 2
# After:  ACC = 0 and M[DS + 2] = 1
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1562 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/tsl-memory-layout.svg" alt="TSL DS ACC 2 accessing adjacent SRAM word cells with the target changing from 0 to 1" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#122-atomic-test-and-set-with-tsl -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.2 Atomic test-and-set with `TSL` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 189fr) minmax(0, 180fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-1572 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/tsl-instruction-format.svg" alt="TSL DS ACC 2 instruction fields" />

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1580 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1580:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:20.19%" /><col style="width:20.19%" /><col style="width:21.72%" /><col style="width:37.90%" /></colgroup><thead><tr><th>Type</th><th>Mode M</th><th>Assembly syntax</th><th>Operation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>10</code></td><td><code>00</code></td><td><code>STORE S i</code></td><td>Store S at DS-relative address</td></tr>
<tr data-source-row="2"><td class="table-key"><code>10</code></td><td><code>01</code></td><td><code>STOREIN D S i</code></td><td>Store register <code>S</code> at address <code>D + i</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>10</code></td><td><code>10</code></td><td><code>TSL S D i</code></td><td>D ← M[S+i]; M[S+i] ← 1</td></tr>
<tr data-source-row="4"><td class="table-key"><code>10</code></td><td><code>11</code></td><td><code>MOVE S D</code></td><td>Copy register <code>S</code> to register <code>D</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#123-uart-host-service-protocol -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.3 UART host-service protocol (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET mermaid-1598 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    UART["RETI UART controller"] <-->|"UART bytes<br/>host requests / responses"| ADAPTER["UART-to-USB adapter"]
    ADAPTER <-->|"USB connection<br/>host requests / responses"| SERVICE
    subgraph HOST["Host operating system"]
        SERVICE["Dedicated host-side service software<br/>interpret escape-sequence requests"]
        TERMINAL["Terminal"]
        FILES["Sandboxed host filesystem"]
        SERVICE -->|normal UART output| TERMINAL
        SERVICE -->|"host request: mkdir, touch, write, ..."| FILES
        FILES -->|data or result for host response| SERVICE
    end
```

</ReadmeVisual>

<!-- README_ASSET mermaid-1615 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
%%{init: {"flowchart": {"nodeSpacing": 20, "rankSpacing": 45, "wrappingWidth": 300}}}%%
flowchart LR
    subgraph HOST["Host operating system"]
        direction LR
        subgraph EMU["RETI-Emulator"]
            direction LR
            GUEST["PicoOS on<br/>emulated RETI"]
            UART["Emulated UART<br/>controller"]
            SERVICE["Built-in<br/>host-service parser"]
            GUEST <-->|UART send / receive bytes| UART
            UART <-->|host requests / responses| SERVICE
        end
        SERVICE -->|normal UART output| TERMINAL["Host terminal<br/>launches the emulator"]
        SERVICE -->|sandboxed filesystem operation| FILES["Sandboxed host filesystem<br/>Launch directory = PicoOS /"]
        FILES -->|data or result| SERVICE
    end
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#123-uart-host-service-protocol -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.3 UART host-service protocol (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1642 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-1642:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15">

<div class="table-panels table-panels-two" data-column-key="table:table-1642:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:69.85%" /><col style="width:30.15%" /></colgroup><thead><tr><th>Request form</th><th>Result</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>&lt;ESC&gt;load &lt;path&gt;&lt;ESC&gt;/</code></td><td>Word count + binary bytes</td></tr>
<tr data-source-row="2"><td class="table-key"><code>&lt;ESC&gt;read-range &lt;offset&gt; &lt;count&gt; &lt;path&gt;&lt;ESC&gt;/</code></td><td>Returned count + file range</td></tr>
<tr data-source-row="3"><td class="table-key"><code>&lt;ESC&gt;file-size &lt;path&gt;&lt;ESC&gt;/</code></td><td>32-bit file size</td></tr>
<tr data-source-row="4"><td class="table-key"><code>&lt;ESC&gt;write &lt;path&gt;&lt;ESC&gt;/</code></td><td>Create/truncate; route UART output</td></tr>
<tr data-source-row="5"><td class="table-key"><code>&lt;ESC&gt;write-at &lt;offset&gt; &lt;path&gt;&lt;ESC&gt;/</code></td><td>Preserve file; output at offset</td></tr>
<tr data-source-row="6"><td class="table-key"><code>&lt;ESC&gt;write stdout&lt;ESC&gt;/</code> / <span class="source-link"><code>stderr</code></span></td><td>Restore host stdout/stderr</td></tr>
<tr data-source-row="7"><td class="table-key"><code>&lt;ESC&gt;literal-output &lt;count&gt;&lt;ESC&gt;/</code></td><td>Following bytes bypass control parser</td></tr>
<tr data-source-row="8"><td class="table-key"><code>&lt;ESC&gt;pwd&lt;ESC&gt;/</code></td><td>Length-prefixed PicoOS root /</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:69.85%" /><col style="width:30.15%" /></colgroup><thead><tr><th>Request form</th><th>Result</th></tr></thead><tbody><tr data-source-row="9"><td class="table-key"><code>&lt;ESC&gt;is-directory &lt;path&gt;&lt;ESC&gt;/</code></td><td>Directory existence/type test</td></tr>
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

<!-- SOURCE Pico-OS/README.md#123-uart-host-service-protocol -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.3 UART host-service protocol (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:mermaid-1666+mermaid-1680" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET mermaid-1666 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
%%{init: {"sequence": {"wrap": false, "actorMargin": 60, "width": 180, "height": 45, "messageMargin": 25, "mirrorActors": false, "diagramMarginY": 35}, "themeCSS": "rect { rx: 0 !important; ry: 0 !important; }"}}%%
sequenceDiagram
    participant P as PicoOS loader
    participant H as RETI-Emulator host

    P->>H: ESC load path ESC /
    H-->>P: total word count (big-endian 32-bit)
    H-->>P: complete file payload
```

</ReadmeVisual>

<!-- README_ASSET mermaid-1680 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
%%{init: {"sequence": {"wrap": false, "actorMargin": 60, "width": 180, "height": 45, "messageMargin": 25, "mirrorActors": false, "diagramMarginY": 35}, "themeCSS": "rect { rx: 0 !important; ry: 0 !important; }"}}%%
sequenceDiagram
    participant P as PicoOS
    participant H as RETI-Emulator host

    P->>H: ESC file-size path ESC /
    H-->>P: file size (big-endian 32-bit)
    P->>H: ESC read-range offset count path ESC /
    H-->>P: returned byte count (big-endian 32-bit)
    H-->>P: requested byte range
    P->>H: ESC is-directory path ESC /
    H-->>P: status value
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#124-debugger-source-view-and-terminal-modes -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.4 Debugger, source view, and terminal modes (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET recording-1714 -->
<AsciinemaRecording src="/casts/reti_emulator.cast" title="RETI-Emulator session" poster="npt:8" fallback-href="https://asciinema.org/a/1264549" />
<div class="slide-note">Click to play; click outside to navigate</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#124-debugger-source-view-and-terminal-modes -->

# <MajorSectionLink section="1-toolchain-extensions-for-picoos">1. Toolchain extensions for PicoOS</MajorSectionLink> · 1.2 RETI-Emulator extensions

## 1.2.4 Debugger, source view, and terminal modes (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1726 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1726:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:21.97%" /><col style="width:26.73%" /><col style="width:51.30%" /></colgroup><thead><tr><th>View</th><th>Default tracking</th><th>Additional selection</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">CPU registers</td><td>All eight live registers</td><td>Inspect/edit selected register</td></tr>
<tr data-source-row="2"><td class="table-key">EEPROM / SRAM code</td><td>PC in matching address space</td><td>Choose register or address</td></tr>
<tr data-source-row="3"><td class="table-key">SRAM data</td><td>DS</td><td>Choose register or address</td></tr>
<tr data-source-row="4"><td class="table-key">SRAM stack</td><td>SP</td><td>Choose register or address</td></tr>
<tr data-source-row="5"><td class="table-key">Periphery</td><td>UART state</td><td>Cycle interrupt/timer/exception/DMA views</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#2-interrupts-system-calls-preemption-and-exceptions -->

<div class="eyebrow section-eyebrow">Section 02 · Overview</div>

# 2. Interrupts, system calls, preemption, and exceptions

<SectionOverview section="2-interrupts-system-calls-preemption-and-exceptions" />

---

<!-- SOURCE Pico-OS/README.md#21-reti-interrupt-entry-and-the-interrupt-service-routine-table -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.1 RETI interrupt entry and the interrupt service routine table (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1760 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1760" data-code-part="1">

<!-- README_CODE_PART code-1760 lines=1-8 -->
<div class="readme-code">

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

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#21-reti-interrupt-entry-and-the-interrupt-service-routine-table -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.1 RETI interrupt entry and the interrupt service routine table (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 216fr) minmax(0, 114fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-1771 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1771:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.02%" /><col style="width:43.05%" /><col style="width:33.93%" /></colgroup><thead><tr><th>Index</th><th>Entry</th><th>Source</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td><span class="source-link"><code>syscall_interrupt()</code></span></td><td>Userspace INT 0</td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td><span class="source-link"><code>timer_interrupt()</code></span></td><td>Timer</td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td><span class="source-link"><code>uart_interrupt()</code></span></td><td>UART receive</td></tr>
<tr data-source-row="4"><td class="table-key">3</td><td><span class="source-link"><code>cpu_exception_interrupt()</code></span></td><td>Synchronous CPU exception</td></tr>
<tr data-source-row="5"><td class="table-key">4</td><td><span class="source-link"><code>dma_interrupt()</code></span></td><td>DMA completion; custom-device line</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1787 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1787" data-code-part="1">

<!-- README_CODE_PART code-1787 lines=1-4 -->
<div class="readme-code">

```c {lines:false}
__attribute__((naked))
void syscall_interrupt(void) {
    // ...
}
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#22-interrupt-controller-mappings-and-priorities -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.2 Interrupt-controller mappings and priorities (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1813 -->
<div class="code-columns" data-column-key="code:code-1813" style="--readme-columns:minmax(0, 47fr) minmax(0, 53fr);--source-aspect:4.097529329080391">

<ReadmeVisual kind="code" :width="660.8377358490565" data-code-source="code-1813" data-code-part="1">

<!-- README_CODE_PART code-1813 lines=1-15 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="745.1999999999998" data-code-source="code-1813" data-code-part="2">

<!-- README_CODE_PART code-1813 lines=16-29 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#22-interrupt-controller-mappings-and-priorities -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.2 Interrupt-controller mappings and priorities (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-1853 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/interrupt-controller-initialization.svg" alt="SRAM initialization arrays and six interrupt-controller cells in the ReTI memory map" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#22-interrupt-controller-mappings-and-priorities -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.2 Interrupt-controller mappings and priorities (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1859 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1859:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:12.68%" /><col style="width:40.97%" /><col style="width:46.35%" /></colgroup><thead><tr><th>Device / array index</th><th>Mapping source → periphery cell</th><th>Priority source → periphery cell</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Timer / <code>0</code></td><td><code>interrupt_device_isrs[0] = 1</code> → <code>0x40000003</code></td><td><code>interrupt_device_priorities[0] = 1</code> → <code>0x40000006</code></td></tr>
<tr data-source-row="2"><td class="table-key">DMA on custom line / <code>1</code></td><td><code>interrupt_device_isrs[1] = 4</code> → <code>0x40000004</code></td><td><code>interrupt_device_priorities[1] = 1</code> → <code>0x40000007</code></td></tr>
<tr data-source-row="3"><td class="table-key">UART / <code>2</code></td><td><code>interrupt_device_isrs[2] = 2</code> → <code>0x40000005</code></td><td><code>interrupt_device_priorities[2] = 2</code> → <code>0x40000008</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#23-saved-interrupt-stack-frame -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.3 Saved interrupt stack frame

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-1901 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-1901:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:42.52%" /><col style="width:57.48%" /></colgroup><thead><tr><th>Offset</th><th>Stored value</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>+0</code></td><td>Free cell addressed by <span class="source-link"><code>caller_context</code></span></td></tr>
<tr data-source-row="2"><td class="table-key"><code>+1</code></td><td>Saved <code>DS</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>+2</code></td><td>Saved <code>CS</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>+3</code></td><td>Saved <code>BAF</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>+4</code></td><td>Saved <code>IN2</code></td></tr>
<tr data-source-row="6"><td class="table-key"><code>+5</code></td><td>Saved <code>IN1</code></td></tr>
<tr data-source-row="7"><td class="table-key"><code>+6</code></td><td>Saved <code>ACC</code></td></tr>
<tr data-source-row="8"><td class="table-key"><code>+7</code></td><td>Return PC saved by interrupt entry</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Linux comparison</b><ul><li><strong>Linux:</strong> context on kernel stack</li>
<li><strong>PicoOS:</strong> context on user stack</li>
<li>RETI entry/RTI use active SP</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#24-system-call-interface-and-execution -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.4 System-call interface and execution

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Library wrapper</strong> → selector + request</li>
<li>INT 0 → <strong>handle_syscall</strong></li>
<li><strong>No hardcoded</strong> kernel function addresses</li>
<li><strong>ABI:</strong> registers, layouts, result meanings</li></ul></div>
<aside class="context-note"><b>POSIX portability</b><ul><li>Source interfaces across different kernels</li>
<li>PicoOS signatures/behavior differ</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#241-syscall-selectors-and-register-convention -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.1 Syscall selectors and register convention (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4917 repeated -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4917" data-code-part="1">

<!-- README_CODE_PART code-4917 lines=1-10 -->
<div class="readme-code">

```c {lines:false}
int waitpid(int pid) {
    int status = 0;
    struct WaitPidRequest request;

    request.pid = pid;
    request.status = &status;
    while (!invoke_waitpid_syscall(SYSCALL_WAITPID, (int)&request)) {
    }
    return status;
}
```

</div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>ABI connection</b><ul><li><strong>IN2:</strong> syscall + function result</li>
<li>Wrapper and entry agree</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#241-syscall-selectors-and-register-convention -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.1 Syscall selectors and register convention (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-1960 -->
<div class="code-columns" data-column-key="code:code-1960" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:4.25">

<ReadmeVisual kind="code" :width="685" data-code-source="code-1960" data-code-part="1">

<!-- README_CODE_PART code-1960 lines=1-14 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="685" data-code-source="code-1960" data-code-part="2">

<!-- README_CODE_PART code-1960 lines=15-27 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#2411-process-wait-signal-and-memory-request-structures -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.1 Syscall selectors and register convention

## 2.4.1.1 Process, wait, signal, and memory request structures

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2001 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-2001:1,2,3,4,5,6,7,8,9,10,11,12,13">

<div class="table-panels table-panels-two" data-column-key="table:table-2001:1,2,3,4,5,6,7,8,9,10,11,12,13" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:56.25%" /><col style="width:43.75%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>LoadProcessRequest.path</code></span></td><td>Binary path</td></tr>
<tr data-source-row="2"><td class="table-key"><ul><li><code>LoadProcessRequest</code></li><li><code>.show_loading_bar</code></li></ul></td><td>Whether UART transfer progress should be printed</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>RunProcessRequest.pid</code></span></td><td>Existing NEW PID</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>RunProcessRequest.arguments</code></span></td><td>Argument string / NULL</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>RunProcessRequest.environment</code></span></td><td>Null-terminated array of <code>NAME=value</code> pointers</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>WaitPidRequest.pid</code></span></td><td>Exact child PID</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>WaitPidRequest.status</code></span></td><td>Address of caller's status cell</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:56.25%" /><col style="width:43.75%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="8"><td class="table-key"><span class="source-link"><code>KillRequest.pid</code></span></td><td>Target process</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>KillRequest.signal_number</code></span></td><td>Signal to deliver, 0 probes existence</td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>PrctlRequest.option</code></span></td><td>Currently only <span class="source-link"><code>PR_SET_PDEATHSIG</code></span></td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>PrctlRequest.argument</code></span></td><td>Signal number, or 0 to disable</td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>ShmOpenRequest.name</code></span></td><td>Shared-entry lookup name</td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>ShmOpenRequest.size</code></span></td><td>Requested shared region size in RETI cells</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#2412-file-and-directory-request-structures -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.1 Syscall selectors and register convention

## 2.4.1.2 File and directory request structures

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2023 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-2023:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22">

<div class="table-panels table-panels-two" data-column-key="table:table-2023:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:60.06%" /><col style="width:39.94%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>OpenRequest.path</code></span></td><td>Relative/absolute file or device path</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>OpenRequest.flags</code></span></td><td>Access mode plus <span class="source-link"><code>O_CREAT</code></span>, <span class="source-link"><code>O_TRUNC</code></span>, or <span class="source-link"><code>O_APPEND</code></span></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>IoRequest.file_descriptor</code></span></td><td>Entry number in the current PCB’s eight-entry table</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>IoRequest.buffer</code></span></td><td>Userspace destination for read or source for write</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>IoRequest.count</code></span></td><td>Maximum cells to read or exact cells to write</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>IoRequest.protect_uart_control</code></span></td><td>Scan escapes; protect with literal-output</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>IoRequest.show_loading_bar</code></span></td><td>Whether a host-file read shows progress</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>IoRequest.transferred</code></span></td><td>Bytes already copied by earlier chunks of the same <span class="source-link"><code>read()</code></span></td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>IoRequest.loading_bar_update</code></span></td><td>Next total byte count that redraws read progress</td></tr>
<tr data-source-row="10"><td class="table-key"><span class="source-link"><code>IoRequest.complete</code></span></td><td>Whether <span class="source-link"><code>read()</code></span> should return instead of invoking another chunk</td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>SeekRequest.file_descriptor</code></span></td><td>Regular-file descriptor to reposition</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:60.06%" /><col style="width:39.94%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="12"><td class="table-key"><span class="source-link"><code>SeekRequest.offset</code></span></td><td>Signed displacement</td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>SeekRequest.origin</code></span></td><td><span class="source-link"><code>SEEK_SET</code></span>, <span class="source-link"><code>SEEK_CUR</code></span>, or <span class="source-link"><code>SEEK_END</code></span></td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>Dup2Request.old_file_descriptor</code></span></td><td>Descriptor to copy</td></tr>
<tr data-source-row="15"><td class="table-key"><span class="source-link"><code>Dup2Request.new_file_descriptor</code></span></td><td>Entry to replace</td></tr>
<tr data-source-row="16"><td class="table-key"><span class="source-link"><code>GetCwdRequest.buffer</code></span></td><td>Userspace destination</td></tr>
<tr data-source-row="17"><td class="table-key"><span class="source-link"><code>GetCwdRequest.size</code></span></td><td>Destination capacity</td></tr>
<tr data-source-row="18"><td class="table-key"><span class="source-link"><code>ReadDirectoryRequest.path</code></span></td><td>Directory to list</td></tr>
<tr data-source-row="19"><td class="table-key"><span class="source-link"><code>ReadDirectoryRequest.buffer</code></span></td><td>Userspace listing buffer</td></tr>
<tr data-source-row="20"><td class="table-key"><span class="source-link"><code>ReadDirectoryRequest.capacity</code></span></td><td>Maximum returned cells</td></tr>
<tr data-source-row="21"><td class="table-key"><span class="source-link"><code>MoveRequest.old_path</code></span></td><td>Existing file or directory</td></tr>
<tr data-source-row="22"><td class="table-key"><span class="source-link"><code>MoveRequest.new_path</code></span></td><td>New file or directory path</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#242-system-call-entry-execution-and-return-to-userspace -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.2 System-call entry, execution, and return to userspace (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-2064 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    ENTRY["Save context and enter kernel<br/>syscall_interrupt<br/>write_stack_heap_boundary_from_in1<br/>activate_kernel_stack_boundary"] --> HANDLE["Execute operation<br/>handle_syscall"]
    HANDLE -->|returns normally| RETURN["Save result and check rescheduling<br/>syscall_interrupt_return<br/>caller_context[4] = IN2<br/>dispatcher_reschedule_if_requested"]
    RETURN --> CHECK{"reschedule_requested?"}
    CHECK -->|false| RESTORE["Restore caller and return with RTI<br/>syscall_interrupt_restore<br/>activate_current_process_stack_boundary"]
    CHECK -->|true| DISPATCH["Dispatcher<br/>Select a process and return with RTI"]
    HANDLE -->|blocks, yields, or exits| DISPATCH
    HANDLE -->|shutdown or reboot| SYSTEM["Halt or restart"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#242-system-call-entry-execution-and-return-to-userspace -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.2 System-call entry, execution, and return to userspace (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2079 -->
<div class="code-columns" data-column-key="code:code-2079" style="--readme-columns:minmax(0, 48fr) minmax(0, 52fr);--source-aspect:2.04527739569005">

<ReadmeVisual kind="code" :width="702.2" data-code-source="code-2079" data-code-part="1">

<!-- README_CODE_PART code-2079 lines=1-33 -->
<div class="readme-code">

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
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442882
    asm(KERNEL_SP_START_ASM); // LOADI32 SP -2147435340
    activate_kernel_stack_boundary();

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
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="760.7166666666666" data-code-source="code-2079" data-code-part="2">

<!-- README_CODE_PART code-2079 lines=34-66 -->
<div class="readme-code">

```c {lines:false}
    asm("PUSH ACC"); // Return address: syscall return continuation
    asm("LOADI32 ACC handle_syscall");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}

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

</div>

---

<!-- SOURCE Pico-OS/README.md#242-system-call-entry-execution-and-return-to-userspace -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution

## 2.4.2 System-call entry, execution, and return to userspace (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 230fr) minmax(0, 125fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:list-2151+list-2179" style="--readme-columns:minmax(0, 57fr) minmax(0, 43fr);">

<!-- README_ASSET list-2151 -->
<div class="readme-list"><ul><li>Save <strong>six registers + PC</strong></li>
<li>BAF → <strong>saved frame</strong></li>
<li>Install kernel segments + <strong>stack boundary</strong></li>
<li><strong>Push</strong> context, argument, selector</li>
<li>Default <strong>saved IN2</strong> = 1</li>
<li><strong>handle_syscall</strong> → syscall_interrupt_return</li></ul></div>

<!-- README_ASSET list-2179 -->
<div class="readme-list"><ul><li>Save <strong>IN2</strong> in caller_context[4]</li>
<li>Check <strong>deferred rescheduling</strong></li>
<li>Restore directly or <strong>dispatch</strong></li></ul></div>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-2195 -->
<div class="readme-list"><ul><li>SP ← <strong>BAF</strong>; discard scratch frames</li>
<li>Restore caller <strong>stack boundary</strong></li>
<li><strong>Pop registers</strong>; RTI restores PC</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#2421-handle-syscall -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.1 Handle Syscall

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 173fr) minmax(0, 90fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-2212 -->
<div class="code-columns" data-column-key="code:code-2212" style="--readme-columns:minmax(0, 46fr) minmax(0, 54fr);--source-aspect:4.928763631213709">

<ReadmeVisual kind="code" :width="684.9999999999999" data-code-source="code-2212" data-code-part="1">

<!-- README_CODE_PART code-2212 lines=1-13 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="804.1304347826086" data-code-source="code-2212" data-code-part="2">

<!-- README_CODE_PART code-2212 lines=14-26 -->
<div class="readme-code">

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

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-2243 -->
<div class="readme-list"><ul><li>Match selector; pass <strong>saved context</strong></li>
<li><strong>IN2</strong> ← result; unknown selector → 0</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#24211-system-call-groups -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace · 2.4.2.1 Handle Syscall

## 2.4.2.1.1 System-call groups

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2258 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2258:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.37%" /><col style="width:75.63%" /></colgroup><thead><tr><th>Group</th><th>Syscalls, in declaration order</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">System control</td><td>Shutdown, reboot</td></tr>
<tr data-source-row="2"><td class="table-key">Process management</td><td><ul><li>Load/run/list/unload/exit/wait/PID</li><li>Foreground/signals/parent-death</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">Scheduling</td><td>Queue sleep, queue wakeup, yield</td></tr>
<tr data-source-row="4"><td class="table-key">Process and shared memory</td><td>Heap start, heap size, heap-exhaustion handling, shared-memory open, map, unlink</td></tr>
<tr data-source-row="5"><td class="table-key">Descriptors and I/O</td><td><ul><li>Availability/open/read/write/close/seek/dup</li><li>Direct UART byte</li></ul></td></tr>
<tr data-source-row="6"><td class="table-key">Paths and directories</td><td><ul><li>chdir/getcwd/mkdir/readdir</li><li>unlink/rmdir/move/touch</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#2422-selecting-the-return-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.2 Selecting the return path

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 204fr) minmax(0, 130fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-2277+code-2305" style="--readme-columns:minmax(0, 42fr) minmax(0, 58fr);">

<!-- README_ASSET code-2277 -->
<ReadmeVisual kind="code" :width="583.2206896551725" data-code-source="code-2277" data-code-part="1">

<!-- README_CODE_PART code-2277 lines=1-11 -->
<div class="readme-code">

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

<!-- README_ASSET code-2305 -->
<ReadmeVisual kind="code" :width="805.4000000000001" data-code-source="code-2305" data-code-part="1">

<!-- README_CODE_PART code-2305 lines=1-11 -->
<div class="readme-code">

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

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-2322 -->
<div class="readme-list"><ul><li>Outgoing RUNNING → <strong>READY</strong></li>
<li>Clear request; selected PCB → <strong>RUNNING</strong></li>
<li>Restore boundary + activation; <strong>RTI</strong></li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#2423-stack-boundary-helpers -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.4 System-call interface and execution · 2.4.2 System-call entry, execution, and return to userspace

## 2.4.2.3 Stack-boundary helpers

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-2358+code-2373" style="--readme-columns:minmax(0, 44fr) minmax(0, 56fr);">

<!-- README_ASSET code-2358 -->
<ReadmeVisual kind="code" :width="571.9999999999999" data-code-source="code-2358" data-code-part="1">

<!-- README_CODE_PART code-2358 lines=1-5 -->
<div class="readme-code">

```c {lines:false}
static inline void write_stack_heap_boundary_from_in1(void) {
    asm("LOADI ACC 1048576");
    asm("MULTI ACC 1024");
    asm("STOREIN ACC IN1 10");
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-2373 -->
<ReadmeVisual kind="code" :width="727.9999999999999" data-code-source="code-2373" data-code-part="1">

<!-- README_CODE_PART code-2373 lines=1-17 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#251-timer-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.1 Timer interrupt path (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET mermaid-2436 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    ENTRY["timer_interrupt<br/>Save six registers; load kernel CS/DS"] --> CHECK{"saved PC − kernel DS ≥ 0?"}
    CHECK -->|no: kernel execution| REQUEST_K["dispatcher_request_reschedule<br/>reschedule_requested = true"]
    REQUEST_K --> RETURN["timer_interrupt_kernel_return<br/>Six POPs + RTI"]
    RETURN -->|syscall returns later| LATER["Same kernel work continues<br/>syscall_interrupt_return saves IN2"]
    RETURN -->|kernel work dispatches directly| SELECT
    LATER --> PENDING{"dispatcher_reschedule_if_requested(c)<br/>reschedule_requested?"}
    PENDING -->|false| DIRECT["syscall_interrupt_restore<br/>Resume calling process with RTI"]
    PENDING -->|true| DISPATCH["dispatcher_switch_from_context(c)<br/>Save process activation"]
    CHECK -->|yes: user process| PROCESS["timer_interrupt_process<br/>BAF = c; kernel SP + boundary"]
    PROCESS --> REQUEST_P["dispatcher_request_reschedule<br/>reschedule_requested = true"]
    REQUEST_P --> AFTER["timer_interrupt_after_reschedule_request<br/>dispatcher_switch_from_context(c)"]
    AFTER --> DISPATCH
    DISPATCH --> SELECT["dispatcher_start_next_process<br/>→ dispatcher_switch_to_process<br/>reschedule_requested = false"]
    SELECT --> RESTORE["dispatcher_jump_to_process<br/>Restore activation + boundary; RTI"]
```

</ReadmeVisual>

<!-- README_ASSET mermaid-2457 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    LOAD["LOADIN SP ACC 7<br/>ACC = saved PC"] --> SUBTRACT["SUB ACC DS<br/>DS = kernel .data start"]
    SUBTRACT --> CHECK{"JUMP32>= timer_interrupt_process<br/>saved PC − kernel DS ≥ 0?"}
    CHECK -->|yes: user process| PROCESS["timer_interrupt_process<br/>Select fresh kernel stack"]
    CHECK -->|no: kernel execution| KERNEL["Request reschedule<br/>Keep interrupted stack"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#251-timer-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.1 Timer interrupt path (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2467 -->
<div class="code-columns" data-column-key="code:code-2467" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:1.9387341772151898">

<ReadmeVisual kind="code" :width="753.8" data-code-source="code-2467" data-code-part="1">

<!-- README_CODE_PART code-2467 lines=1-36 -->
<div class="readme-code">

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
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442882

    // Six saved registers put the automatic return PC at SP + 7.
    // DS is now kernel .data's start: kernel code is below it, process code above.
    // Test saved PC because CS may still be changing on kernel entry/return.
    asm("LOADIN SP ACC 7"); // Saved return PC at SP + 7
    asm("SUB ACC DS"); // Saved PC minus the kernel .data start
    asm("JUMP32>= timer_interrupt_process"); // Nonnegative: process context

    asm("LOADI32 ACC timer_interrupt_kernel_return");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC dispatcher_request_reschedule");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}

__attribute__((naked))
void timer_interrupt_kernel_return(void) {
    // The request stays pending while the interrupted kernel instructions resume
    asm("POP DS");
    asm("POP CS");
    asm("POP BAF");
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="753.8" data-code-source="code-2467" data-code-part="2">

<!-- README_CODE_PART code-2467 lines=37-71 -->
<div class="readme-code">

```c {lines:false}
    asm("POP IN2");
    asm("POP IN1");
    asm("POP ACC");
    asm("RTI");
}

__attribute__((naked))
void timer_interrupt_process(void) {
    // BAF preserves caller_context while SP switches to the kernel stack
    asm("MOVE SP BAF");
    asm("LOADI IN1 0");
    write_stack_heap_boundary_from_in1();
    asm(KERNEL_SP_START_ASM); // LOADI32 SP -2147435340
    activate_kernel_stack_boundary();

    asm("LOADI32 ACC timer_interrupt_after_reschedule_request");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC dispatcher_request_reschedule");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}

__attribute__((naked))
void timer_interrupt_after_reschedule_request(void) {
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

</div>

---

<!-- SOURCE Pico-OS/README.md#251-timer-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.1 Timer interrupt path (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 125fr) minmax(0, 183fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-2544 -->
<div class="readme-list"><ul><li>Save registers; <strong>PC at SP + 7</strong></li>
<li>Install kernel <strong>CS + DS</strong></li>
<li>Classify <strong>saved PC</strong> against kernel DS</li></ul></div>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET image-2553 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/timer-pc-memory-layout.svg" alt="Kernel execution below kernel DS and user-process execution strictly above it" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#251-timer-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.1 Timer interrupt path (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 120fr) minmax(0, 120fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:list-2563+list-2570" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET list-2563 -->
<div class="readme-list"><div class="readme-item"><strong>Kernel</strong> → defer; <strong>userspace</strong> → switch</div></div>

<!-- README_ASSET list-2570 -->
<div class="readme-list"><ul><li>Pop registers; retain <strong>stack boundary</strong></li>
<li><strong>RTI</strong>; reschedule at later safe point</li></ul></div>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:list-2582+list-2599" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET list-2582 -->
<div class="readme-list"><ul><li><strong>BAF</strong> ← process frame</li>
<li>Install kernel <strong>SP</strong> + boundary</li>
<li><strong>Request rescheduling</strong>; continue entry path</li></ul></div>

<!-- README_ASSET list-2599 -->
<div class="readme-list"><ul><li><strong>Push</strong> context + dummy return</li>
<li>Save PCB; <strong>dispatch</strong> selected process</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#252-kernel-non-preemption-and-deferred-rescheduling -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.2 Kernel non-preemption and deferred rescheduling

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Kernel work completes before <strong>process switch</strong></li>
<li><strong>Device interrupts</strong> remain enabled</li>
<li>Timer → <strong>deferred rescheduling</strong> flag</li>
<li>Syscall return → <strong>safe switching point</strong></li>
<li><strong>Polling:</strong> bounded chunks; <strong>DMA:</strong> block</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#253-shell-character-delay-for-different-timer-intervals -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.5 Timer interrupts and userspace preemption

## 2.5.3 Shell character delay for different timer intervals

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-2642 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/timer_interval_measurements.png" alt="Measured character delay for each timer interrupt interval" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#26-uart-receive-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.6 UART receive interrupt path (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-2657 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    ENTRY["uart_interrupt<br/>Save registers and load kernel CS/DS"] --> HANDLE["handle_uart_interrupt<br/>Read and acknowledge byte"]
    HANDLE --> SIGNAL{"handle_terminal_signal_character<br/>Recognized control character?"}
    SIGNAL -->|yes| RETURN["uart_interrupt_return<br/>Restore context and execute RTI"]
    SIGNAL -->|no| INPUT["enqueue_terminal_byte<br/>complete_pending_terminal_read"]
    INPUT --> RETURN
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#26-uart-receive-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.6 UART receive interrupt path (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 269fr) minmax(0, 125fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-2668 -->
<div class="code-columns" data-column-key="code:code-2668" style="--readme-columns:minmax(0, 53fr) minmax(0, 47fr);--source-aspect:3.1678050218662475">

<ReadmeVisual kind="code" :width="714.259574468085" data-code-source="code-2668" data-code-part="1">

<!-- README_CODE_PART code-2668 lines=1-19 -->
<div class="readme-code">

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
    // processes are blocked and the dispatcher is waiting for an interrupt
    asm("MOVE SP BAF");
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442882

    asm("LOADI32 ACC uart_interrupt_return");
    asm("ADD ACC CS");
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="633.4" data-code-source="code-2668" data-code-part="2">

<!-- README_CODE_PART code-2668 lines=20-37 -->
<div class="readme-code">

```c {lines:false}
    asm("PUSH ACC");
    asm("LOADI32 ACC handle_uart_interrupt");
    asm("ADD ACC CS");
    asm("MOVE ACC PC");
}

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

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:list-2711+list-2722" style="--readme-columns:minmax(0, 63fr) minmax(0, 37fr);">

<!-- README_ASSET list-2711 -->
<div class="readme-list"><ul><li>Save <strong>registers + automatic PC</strong></li>
<li>Retain interrupted <strong>SP</strong> + boundary</li>
<li><strong>handle_uart_interrupt</strong> → uart_interrupt_return</li></ul></div>

<!-- README_ASSET list-2722 -->
<div class="readme-list"><ul><li>SP ← <strong>BAF</strong></li>
<li><strong>Pop six registers</strong></li>
<li><strong>RTI</strong>; no scheduling check</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#26-uart-receive-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.6 UART receive interrupt path (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-2730 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-2730" data-code-part="1">

<!-- README_CODE_PART code-2730 lines=1-20 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#26-uart-receive-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.6 UART receive interrupt path (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-2756 -->
<div class="readme-list"><ul><li>Find <strong>foreground owner</strong> + terminal</li>
<li>Read byte; acknowledge <strong>receive-ready</strong></li>
<li><strong>Ctrl+C</strong> → SIGINT; <strong>Ctrl+Z</strong> → SIGTSTP</li>
<li>Buffer byte; complete <strong>waiting read</strong></li></ul></div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#261-borrowed-stack-entry-and-return -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.1 Borrowed-stack entry and return

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>UART/DMA</strong> borrow interrupted stack</li>
<li>Handler uses space below <strong>saved frame</strong></li>
<li>Retain SP + <strong>stack boundary</strong></li>
<li>Kernel <strong>CS</strong> classifies nested faults</li>
<li><strong>Return restores</strong> interrupted execution</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#262-uart-nesting-and-interrupt-priorities -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.2 UART nesting and interrupt priorities

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2797 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2797:1,2,3,4,5,6,7">

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

<!-- SOURCE Pico-OS/README.md#263-polled-uart-function-reference -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.6 UART receive interrupt path

## 2.6.3 Polled UART function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-2829 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2829:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.24%" /><col style="width:16.22%" /><col style="width:20.07%" /><col style="width:31.47%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>send_byte_over_uart()</code></td><td>No value</td><td>Send one polled UART byte</td><td><code>send_byte_over_uart()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#27-dma-completion-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.7 DMA completion interrupt path (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-2841 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    PENDING["DMA completion/error latched<br/>Mapping enabled"] --> PRIORITY{"No active hardware ISR<br/>or strictly higher priority?"}
    PRIORITY -->|no| WAIT["Pending-handler queue<br/>Retry after active ISR returns"]
    PRIORITY -->|yes| ENTRY["dma_interrupt<br/>Save registers; keep SP; kernel CS/DS"]
    WAIT --> PRIORITY
    ENTRY --> HANDLE["handle_dma_interrupt<br/>wakeup_wait_queue(&dma_waiters)"]
    HANDLE --> QUEUE{"dma_waiters.head != NULL?"}
    QUEUE -->|yes| WAKE["Remove FIFO head<br/>End its DMA wait"]
    QUEUE -->|no| RETURN["dma_interrupt_return<br/>Restore interrupted context; RTI"]
    WAKE --> RETURN
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#27-dma-completion-interrupt-path -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink>

## 2.7 DMA completion interrupt path (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 285fr) minmax(0, 125fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-2857 -->
<div class="code-columns" data-column-key="code:code-2857" style="--readme-columns:minmax(0, 53fr) minmax(0, 47fr);--source-aspect:2.980972912175462">

<ReadmeVisual kind="code" :width="704.5617021276595" data-code-source="code-2857" data-code-part="1">

<!-- README_CODE_PART code-2857 lines=1-20 -->
<div class="readme-code">

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
    asm("MOVE SP BAF");
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442882

    asm("LOADI32 ACC dma_interrupt_return");
    asm("ADD ACC CS");
    asm("PUSH ACC");
    asm("LOADI32 ACC handle_dma_interrupt");
    asm("ADD ACC CS");
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="624.8" data-code-source="code-2857" data-code-part="2">

<!-- README_CODE_PART code-2857 lines=21-39 -->
<div class="readme-code">

```c {lines:false}
    asm("MOVE ACC PC");
}

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

void handle_dma_interrupt(void) {
    wakeup_wait_queue(&dma_waiters);
}
```

</div>

</ReadmeVisual>

</div>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:list-2902+list-2918" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);">

<!-- README_ASSET list-2902 -->
<div class="readme-list"><ul><li>Save <strong>six registers</strong></li>
<li>Borrow stack; install kernel <strong>CS</strong>/DS</li>
<li><strong>handle_dma_interrupt</strong> → dma_interrupt_return</li></ul></div>

<!-- README_ASSET list-2918 -->
<div class="readme-list"><ul><li>SP ← <strong>BAF</strong></li>
<li><strong>Pop six registers</strong></li>
<li><strong>RTI</strong>; retain borrowed-stack convention</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#281-cpu-exception-entry-and-registers -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.1 CPU exception entry and registers (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 128fr) minmax(0, 182fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET mermaid-2959 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    ENTRY["cpu_exception_interrupt<br/>Preserve old CS and select kernel context"] --> HANDLE["handle_cpu_exception<br/>Read cause and compare old CS with kernel CS"]
    HANDLE --> KERNEL{"Old CS equals kernel CS?"}
    KERNEL -->|yes| PANIC["Print kernel panic"] --> HALT["shutdown<br/>JUMP 0"]
    KERNEL -->|no| EXIT["Print process error<br/>exit_process with exception status"]
    EXIT --> NEXT["dispatcher_start_next_process<br/>Wait for a runnable process"]
    NEXT --> SELECT{"Process selected?"}
    SELECT -->|no processes remain| HALT
    SELECT -->|yes| RESTORE["dispatcher_jump_to_process<br/>Restore selected process and execute RTI"]
```

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-2974 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-2974:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.42%" /><col style="width:18.40%" /><col style="width:44.18%" /></colgroup><thead><tr><th>Register</th><th>Written by</th><th>Contents and use</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">10, <span class="source-link"><code>STACK_HEAP_BOUNDARY_REGISTER</code></span></td><td>PicoOS</td><td><ul><li>0: disabled</li><li>SP below boundary → exception</li><li>Boundary: final heap cell</li></ul></td></tr>
<tr data-source-row="2"><td class="table-key">11, <span class="source-link"><code>CPU_EXCEPTION_CAUSE_REGISTER</code></span></td><td>RETI CPU/emulator</td><td><ul><li>0: none; 1: divide-by-zero</li><li>2: stack overflow; 3: illegal instruction</li><li>Read-only cause register</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#281-cpu-exception-entry-and-registers -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.1 CPU exception entry and registers (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 173fr) minmax(0, 160fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-2982 -->
<div class="code-columns" data-column-key="code:code-2982" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:5.234965034965035">

<ReadmeVisual kind="code" :width="736.6" data-code-source="code-2982" data-code-part="1">

<!-- README_CODE_PART code-2982 lines=1-12 -->
<div class="readme-code">

```c {lines:false}
__attribute__((naked))
void cpu_exception_interrupt(void) {
    // BAF preserves the interrupted CS while the handler resets kernel context
    asm("MOVE CS BAF");
    asm("LOADI IN1 0");
    write_stack_heap_boundary_from_in1();
    asm(KERNEL_CS_START_ASM); // LOADI32 CS -2147483643
    asm(KERNEL_DS_START_ASM); // LOADI32 DS -2147442882
    asm(KERNEL_SP_START_ASM); // LOADI32 SP -2147435340
    activate_kernel_stack_boundary();

    // A zero difference identifies an exception raised in kernel code
```

</div>

</ReadmeVisual>

<ReadmeVisual kind="code" :width="736.6" data-code-source="code-2982" data-code-part="2">

<!-- README_CODE_PART code-2982 lines=13-23 -->
<div class="readme-code">

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

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-3011 -->
<div class="readme-list"><ul><li><strong>BAF</strong> ← interrupted CS</li>
<li>Reset <strong>kernel segments</strong>, stack, boundary</li>
<li>Compare interrupted <strong>CS</strong> with kernel CS</li>
<li>Handle exception; <strong>never return</strong></li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#281-cpu-exception-entry-and-registers -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.1 CPU exception entry and registers (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-3030+list-3047" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-3030 -->
<ReadmeVisual kind="code" :width="642" data-code-source="code-3030" data-code-part="1">

<!-- README_CODE_PART code-3030 lines=1-11 -->
<div class="readme-code">

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

<!-- README_ASSET list-3047 -->
<div class="readme-list"><ul><li>Read cause; classify <strong>kernel/userspace</strong></li>
<li>Print diagnostic via <strong>UART</strong> or stdout</li>
<li>Kernel fault → <strong>shutdown</strong></li>
<li>Process fault → status + <strong>ZOMBIE</strong></li>
<li><strong>Dispatch</strong> survivor; never restore fault</li></ul></div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#282-supported-exceptions-and-allocation-errors -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.2 Supported exceptions and allocation errors

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3080 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3080:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:15.25%" /><col style="width:26.18%" /><col style="width:36.48%" /><col style="width:22.09%" /></colgroup><thead><tr><th>Condition</th><th>Trigger</th><th>Entry or reported cause</th><th>PicoOS handling</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Division or modulo by zero</td><td>DIV/DIVI/MOD/MODI with zero divisor</td><td>Cause 1; IVT entry 3</td><td><ul><li>Userspace → terminate</li><li>Kernel → panic + shutdown</li></ul></td></tr>
<tr data-source-row="2"><td class="table-key">Stack overflow</td><td>SP decreased below active boundary</td><td>Cause 2; IVT entry 3</td><td><ul><li>Process overflow → terminate</li><li>Kernel overflow → shutdown</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key">Illegal instruction</td><td>Invalid/unsupported decoded RETI instruction</td><td>Cause 3; IVT entry 3</td><td>Same process/kernel fault policy</td></tr>
<tr data-source-row="4"><td class="table-key">Process heap full</td><td><span class="source-link"><code>malloc()</code></span> or <span class="source-link"><code>realloc()</code></span> cannot satisfy a positive-size allocation</td><td><span class="source-link"><code>require_process_heap_allocation()</code></span> invokes the process-heap-full syscall</td><td>Print heap-full diagnostic; terminate process</td></tr>
<tr data-source-row="5"><td class="table-key">Kernel heap full</td><td><span class="source-link"><code>kmalloc()</code></span> or <span class="source-link"><code>krealloc()</code></span> cannot satisfy a positive-size allocation</td><td><span class="source-link"><code>require_kernel_heap_allocation()</code></span> calls the panic handler directly</td><td>UART panic; shut down kernel</td></tr>
<tr data-source-row="6"><td class="table-key">Process and Shared Data Heap exhausted</td><td>No contiguous Process/Shared Data Payload</td><td>Returns <span class="source-link"><code>PSDMALLOC_INVALID_START</code></span>, no CPU exception is raised</td><td><ul><li>Load fails / shm_open returns −1</li><li>Process + kernel continue</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#283-exception-and-stack-boundary-function-reference -->

# <MajorSectionLink section="2-interrupts-system-calls-preemption-and-exceptions">2. Interrupts, system calls, preemption, and exceptions</MajorSectionLink> · 2.8 CPU exceptions and runtime errors

## 2.8.3 Exception and stack-boundary function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3097 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3097:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:36.64%" /><col style="width:13.24%" /><col style="width:16.44%" /><col style="width:33.68%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>handle_process_heap_full_exception()</code></td><td>Terminates process</td><td>Print diagnostic; terminate process</td><td><code>require_process_heap_allocation()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#3-memory-management-and-shared-memory -->

<div class="eyebrow section-eyebrow">Section 03 · Overview</div>

# 3. Memory management and shared memory

<SectionOverview section="3-memory-management-and-shared-memory" />

---

<!-- SOURCE Pico-OS/README.md#31-heap-block-layout-and-allocation-algorithm -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.1 Heap block layout and allocation algorithm (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3120 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-3120" data-code-part="1">

<!-- README_CODE_PART code-3120 lines=1-9 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#31-heap-block-layout-and-allocation-algorithm -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.1 Heap block layout and allocation algorithm (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3140 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-generic-heap.svg" alt="One contiguous heap with Block Headers A–D and adjacent payloads, rooted at Heap.first_block" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#31-heap-block-layout-and-allocation-algorithm -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.1 Heap block layout and allocation algorithm (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3145 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3145:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:40.71%" /><col style="width:59.29%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>BlockHeader.size</code></span></td><td>Usable cells; excludes header</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>BlockHeader.free</code></span></td><td>Whether payload can satisfy allocation</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>BlockHeader.next</code></span></td><td>Next header or NULL</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>Heap.first_block</code></span></td><td>First header; no separate block array</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#32-sram-image-and-heap-hierarchy -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.2 SRAM image and heap hierarchy (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3167 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3167:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:16.13%" /><col style="width:35.34%" /><col style="width:29.36%" /><col style="width:19.17%" /></colgroup><thead><tr><th>Heap context</th><th>Descriptor storage</th><th>Managed payloads</th><th>Interface</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel Heap</td><td>kernel_heap in kernel .data</td><td>PCBs, paths, descriptors, shared metadata</td><td><span class="source-link"><code>kmalloc()</code></span> / <span class="source-link"><code>kfree()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key">Process and Shared Data Heap</td><td>process_shared_data_heap in kernel .data</td><td>Complete process + shared-data payloads</td><td><span class="source-link"><code>PSDMalloc()</code></span> / <span class="source-link"><code>PSDFree()</code></span></td></tr>
<tr data-source-row="3"><td class="table-key">User Process Heap</td><td>process_heap in each process .data</td><td>Process + linked-library allocations</td><td><span class="source-link"><code>malloc()</code></span> / <span class="source-link"><code>free()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#32-sram-image-and-heap-hierarchy -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.2 SRAM image and heap hierarchy (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3183 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-sram-overview.svg" alt="Continuous SRAM with the Kernel Heap, Process and Shared Data Heap, and nested User Process Heap highlighted by orange outlines and grouping bands, four blocks per heap, concrete kernel payload examples, and a dashed expansion of Process Payload A into its image, heap, and stack" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#32-sram-image-and-heap-hierarchy -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink>

## 3.2 SRAM image and heap hierarchy (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET table-3189 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3189:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.83%" /><col style="width:21.97%" /><col style="width:17.41%" /><col style="width:35.78%" /></colgroup><thead><tr><th>Larger part</th><th>SRAM offset</th><th>Section or region</th><th>Contents</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel Image</td><td><code>0..4</code></td><td><code>.ivt</code></td><td>Five ISR addresses</td></tr>
<tr data-source-row="2"><td class="table-key">Kernel Image</td><td><code>5..40765</code></td><td><code>.text</code></td><td>Kernel + interrupt code</td></tr>
<tr data-source-row="3"><td class="table-key">Kernel Image</td><td><code>40766..41496</code></td><td><code>.data</code></td><td>Globals, heap descriptors, list roots</td></tr>
<tr data-source-row="4"><td class="table-key">Kernel runtime reservation</td><td><code>41497..45592</code></td><td>Kernel Heap</td><td>4096 cells + in-region headers</td></tr>
<tr data-source-row="5"><td class="table-key">Kernel runtime reservation</td><td><code>45593..48308</code></td><td>Kernel Stack</td><td>Downward-growing kernel stack</td></tr>
<tr data-source-row="6"><td class="table-key">After the Kernel region</td><td><code>48309..262143</code></td><td>Process and Shared Data Heap</td><td>Outer process + shared-data allocations</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-3207 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3207:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.31%" /><col style="width:41.54%" /><col style="width:39.14%" /></colgroup><thead><tr><th>Process Payload part</th><th>Relative address</th><th>Runtime role</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Optional <code>.ivt</code></td><td>Before <span class="source-link"><code>code_start</code></span> when present</td><td>Optional attributed data</td></tr>
<tr data-source-row="2"><td class="table-key"><code>.text</code></td><td><span class="source-link"><code>code_start</code></span></td><td>base_address → activation.cs</td></tr>
<tr data-source-row="3"><td class="table-key"><code>.data</code></td><td><span class="source-link"><code>data_start</code></span></td><td>base_address → activation.ds; process_heap</td></tr>
<tr data-source-row="4"><td class="table-key">User Process Heap</td><td><span class="source-link"><code>heap_start</code></span> through <code>heap_start + heap_size - 1</code></td><td>Inner headers + allocations; stack boundary</td></tr>
<tr data-source-row="5"><td class="table-key">User Process Stack</td><td>First cell beyond the heap through <span class="source-link"><code>effective_stack_start</code></span></td><td>Arguments, environment, PC, call frames</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#331-kernel-heap-blocks-and-kernel-objects -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.3 Kernel Heap

## 3.3.1 Kernel Heap blocks and kernel objects

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Kernel Heap:</strong> PCB, paths, shared metadata</li>
<li><strong>Separate allocation</strong> for each object</li>
<li>Metadata points into <strong>outer heap</strong></li>
<li>kernel_heap.first_block → <strong>header chain</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#341-process-allocations -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.4 Process and Shared Data Heap

## 3.4.1 Process allocations

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>PSDMalloc → complete <strong>Process Payload</strong></li>
<li>PCB records <strong>base_address + size</strong></li>
<li>Image + <strong>user heap</strong> + stack</li>
<li>remove_process → <strong>PSDFree</strong> whole payload</li>
<li>User free releases <strong>inner allocation</strong> only</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#342-shared-data-allocations -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.4 Process and Shared Data Heap

## 3.4.2 Shared Data allocations

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>PSDMalloc → <strong>Shared Data Payload</strong></li>
<li>Entry + name in <strong>Kernel Heap</strong></li>
<li>Several mappings → same <strong>shared payload</strong></li>
<li><strong>No nested user heap</strong></li>
<li>Unlinked + unmapped → <strong>PSDFree</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#351-per-process-user-process-heap -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.5 User Process Heap

## 3.5.1 Per-Process User Process Heap

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>process_heap</strong> stored in process .data</li>
<li><strong>Startup obtains</strong> bounds through syscalls</li>
<li>malloc/realloc/free → <strong>common allocator</strong></li>
<li>Inner blocks; <strong>outer payload</strong> stays allocated</li>
<li>Restored DS selects <strong>process-local globals</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#352-user-process-heap-allocator-function-reference -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.5 User Process Heap

## 3.5.2 User Process Heap allocator function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3332 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3332:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.94%" /><col style="width:14.79%" /><col style="width:17.79%" /><col style="width:33.48%" /></colgroup><thead><tr><th>Function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>malloc()</code></td><td>Pointer / NULL / heap-full</td><td><ul><li>First-fit process allocation</li><li>Positive failure → terminate</li></ul></td><td><ul><li><code>opendir()</code></li><li><code>copy_environment_variable()</code></li><li><code>initialize_environment()</code></li><li><code>setenv()</code></li><li><code>clone_environment()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>realloc()</code></td><td>Pointer / NULL / heap-full</td><td><ul><li>Resize/move process allocation</li><li>Size 0 → free</li></ul></td><td><code>store_environment_variable()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>free()</code></td><td>No value</td><td>Free + coalesce process blocks</td><td><ul><li><code>opendir()</code></li><li><code>closedir()</code></li><li><code>store_environment_variable()</code></li><li><code>unsetenv()</code></li><li><code>clearenv()</code></li><li><code>destroy_environment()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>init_process_heap()</code></td><td>No value</td><td>Initialize process-local heap</td><td><code>start_process()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>require_process_heap_allocation()</code></td><td>Pointer or termination</td><td>Positive failure → heap-full syscall</td><td><ul><li><code>malloc()</code></li><li><code>realloc()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#361-common-allocator-linkage-and-function-reference -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.1 Common allocator linkage and function reference (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-3353 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    subgraph K["Kernel target"]
        KW["kmalloc / krealloc / kfree<br/>kernel_heap"] -->|direct calls| KC["common/heap.picoc<br/>heap_alloc_from / heap_realloc_from / heap_free_from"]
        PW["PSDMalloc / PSDRealloc / PSDFree<br/>process_shared_data_heap"] -->|direct calls| KC
    end
    subgraph L["Each userspace target: libstdlib"]
        LW["malloc / realloc / free<br/>process_heap in this image"] -->|direct calls| LC["same common/heap.picoc source<br/>heap_alloc_from / heap_realloc_from / heap_free_from"]
    end
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#361-common-allocator-linkage-and-function-reference -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.1 Common allocator linkage and function reference (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3368 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3368:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.56%" /><col style="width:16.95%" /><col style="width:32.17%" /><col style="width:24.32%" /></colgroup><thead><tr><th>Function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>heap_init_region()</code></td><td>No value</td><td>Initialize one free header</td><td><code>init_process_heap()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>heap_alloc_from()</code></td><td>Pointer or NULL</td><td>First fit; split; mark allocated</td><td><code>malloc()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>heap_realloc_from()</code></td><td>Pointer or NULL; old block on failure</td><td>Shrink, grow, or allocate/copy/free</td><td><code>realloc()</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>heap_free_from()</code></td><td>No value</td><td>Mark free; coalesce neighbors</td><td><code>free()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#362-reallocation-decisions -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.2 Reallocation decisions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-3385 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    R["Resize an existing block"] --> FIT{"Current payload large enough?"}
    FIT -->|Yes| SHRINK["heap_split_block<br/>heap_merge_free_blocks"]
    SHRINK --> SAME["Return original pointer"]
    FIT -->|No| NEXT{"Immediate next block free and combined space enough?"}
    NEXT -->|Yes| GROW["Absorb next header and payload<br/>heap_split_block"]
    GROW --> SAME
    NEXT -->|No| ALLOC["heap_alloc_from"]
    ALLOC --> OK{"Allocation succeeded?"}
    OK -->|No| KEEP["Return NULL<br/>Old block remains allocated"]
    OK -->|Yes| COPY["heap_copy_cells<br/>heap_free_from old block"]
    COPY --> NEW["Return replacement pointer"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#363-allocation-and-repeated-coalescing-example -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference

## 3.6.3 Allocation and repeated coalescing example

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Allocation</strong> → free → repeated coalescing</li>
<li><strong class="emphasis-amber">Amber:</strong> headers; <strong>cyan:</strong> allocated payloads</li>
<li><strong class="emphasis-green">Green:</strong> free payloads</li>
<li><strong>Arrows:</strong> next links; <strong>offsets:</strong> cells</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#3631-initial-state-and-first-fit-search -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.1 Initial state and first-fit search

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3418 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-01-initial.svg" alt="Initial heap with allocated A, C and free B, D, linked from left to right" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#3632-allocation-splits-d -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.2 Allocation splits D

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3433 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-02-allocated.svg" alt="After allocation, D has eleven allocated payload cells and links to new free Header D′ with two payload cells" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#3633-free-d-and-merge-its-remainder -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.3 Free D and merge its remainder

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET image-3444 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-03-d-marked-free.svg" alt="D marked free with its eleven payload cells still separate from free D′ and its two payload cells" />

</ReadmeVisual>

<!-- README_ASSET image-3450 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-04-d-merged.svg" alt="D restored to sixteen free payload cells after absorbing Header D′ and its two payload cells" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#3634-free-c-and-merge-repeatedly-at-b -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.4 Free C and merge repeatedly at B (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET image-3460 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-05-c-marked-free.svg" alt="C marked free, making B, C, and D consecutive free blocks after allocated A" />

</ReadmeVisual>

<!-- README_ASSET image-3465 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-06-b-c-merged.svg" alt="First merge at B bypasses Header C and produces nineteen free payload cells followed by free D" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#3634-free-c-and-merge-repeatedly-at-b -->

# <MajorSectionLink section="3-memory-management-and-shared-memory">3. Memory management and shared memory</MajorSectionLink> · 3.6 Heap and allocator function reference · 3.6.3 Allocation and repeated coalescing example

## 3.6.3.4 Free C and merge repeatedly at B (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3471 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/heap-07-b-d-merged.svg" alt="Second merge at B bypasses Header D, leaving allocated A and a thirty-eight-cell free B with next equal to NULL" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#4-processes-and-process-lifecycle -->

<div class="eyebrow section-eyebrow">Section 04 · Overview</div>

# 4. Processes and process lifecycle

<SectionOverview section="4-processes-and-process-lifecycle" />

---

<!-- SOURCE Pico-OS/README.md#41-process-control-block-fields -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.1 Process control block fields (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3496 -->
<div class="code-columns" data-column-key="code:code-3496" style="--readme-columns:minmax(0, 45fr) minmax(0, 55fr);--source-aspect:3.202882483370288">

<ReadmeVisual kind="code" :width="461.94545454545454" data-code-source="code-3496" data-code-part="1">

<!-- README_CODE_PART code-3496 lines=1-14 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="564.6" data-code-source="code-3496" data-code-part="2">

<!-- README_CODE_PART code-3496 lines=15-27 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#41-process-control-block-fields -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.1 Process control block fields (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3526 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-3526:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18">

<div class="table-panels table-panels-two" data-column-key="table:table-3526:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:47.69%" /><col style="width:52.31%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>pid</code></span></td><td>Stable process ID</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>state</code></span></td><td><ul><li>NEW / READY / RUNNING</li><li>BLOCKED / STOPPED / ZOMBIE</li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>base_address</code></span>, <span class="source-link"><code>size</code></span></td><td>Absolute Process Payload base + size</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>heap_start</code></span>, <span class="source-link"><code>heap_size</code></span></td><td>Relative userspace heap bounds</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>binary_path</code></span></td><td>Owned executable path; later argv[0]</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>working_directory</code></span></td><td>Owned absolute path; inherited or /</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>activation</code></span></td><td>Embedded saved CPU context</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>file_descriptors</code></span></td><td>Owned descriptor table</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>waiting_status_ptr</code></span></td><td>Pointer into suspended waitpid frame</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:47.69%" /><col style="width:52.31%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="10"><td class="table-key"><span class="source-link"><code>waiters</code></span></td><td>Embedded FIFO of waiting parents</td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>waiting_queue_ptr</code></span>, <span class="source-link"><code>wait_next</code></span></td><td>Owning queue + intrusive successor</td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>next</code></span></td><td>Global process-list successor</td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>shared_memory_attachments</code></span></td><td>Head of process mapping records</td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>parent_pid</code></span>, <span class="source-link"><code>parent_death_signal</code></span></td><td>Parent identity + parent-death signal</td></tr>
<tr data-source-row="15"><td class="table-key"><span class="source-link"><code>exit_status</code></span></td><td>Retained zombie termination status</td></tr>
<tr data-source-row="16"><td class="table-key"><span class="source-link"><code>stop_signal</code></span>, <span class="source-link"><code>stopped_from_state</code></span>, <span class="source-link"><code>pending_termination_signal</code></span></td><td>Stop/prior-state/deferred-termination bookkeeping</td></tr>
<tr data-source-row="17"><td class="table-key"><span class="source-link"><code>pending_terminal_read_buffer</code></span>, <span class="source-link"><code>pending_terminal_read_count</code></span></td><td>Retained buffer + requested count</td></tr>
<tr data-source-row="18"><td class="table-key"><span class="source-link"><code>pending_load</code></span></td><td>Metadata + progress of pending load</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#411-process-states-and-transitions -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.1 Process states and transitions (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3561 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3561:1,2,3,4,5,6">

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

<!-- SOURCE Pico-OS/README.md#411-process-states-and-transitions -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.1 Process states and transitions (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-3590 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
%%{init: {"themeCSS": "rect { rx: 0 !important; ry: 0 !important; }"}}%%
stateDiagram-v2
    [*] --> NEW: completed load
    NEW --> READY: run and build initial stack
    READY --> RUNNING: dispatcher
    RUNNING --> READY: timer or yield
    RUNNING --> BLOCKED: waitpid, sleep, empty stdin, or DMA load
    BLOCKED --> READY: wakeup, input, or DMA completion
    READY --> STOPPED: stop signal
    RUNNING --> STOPPED: stop signal
    BLOCKED --> STOPPED: stop signal remembers BLOCKED
    STOPPED --> BLOCKED: SIGCONT while still queued
    STOPPED --> READY: SIGCONT when wait is satisfied
    STOPPED --> STOPPED: pending terminal read without input ownership
    NEW --> ZOMBIE: termination or unload
    READY --> ZOMBIE: termination or signal
    RUNNING --> ZOMBIE: exit or fatal signal
    BLOCKED --> ZOMBIE: fatal signal
    STOPPED --> ZOMBIE: fatal signal
    ZOMBIE --> [*]: collection, orphan cleanup, or unload
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#412-global-process-list-and-current-process -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.2 Global process list and current process (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3627 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-process-list.svg" alt="Kernel globals and three linked PCBs in SRAM, followed by a process-list view of those same PCB objects with process_list_head, process_list_tail, and active_process pointing to PCB 1, PCB 3, and PCB 2" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#412-global-process-list-and-current-process -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields

## 4.1.2 Global process list and current process (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3648 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3648:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.86%" /><col style="width:27.65%" /><col style="width:41.50%" /></colgroup><thead><tr><th>List</th><th>Insertion policy</th><th>Pointers and linking cost</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">PCB list</td><td>Append at tail</td><td>Head for traversal; tail → O(1)</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry</code></span> registry</td><td>Prepend at head</td><td>Head insertion → O(1)</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#4121-from-pcbs-to-process-payloads-in-sram -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.1 Process control block fields · 4.1.2 Global process list and current process

## 4.1.2.1 From PCBs to Process Payloads in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3674 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-process-payload-links.svg" alt="Complete SRAM with three blocks per heap and two kernel PCBs pointing through base_address to Process Payloads A and C" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#421-user-process-stack-placement -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Initial user process stack

## 4.2.1 User process stack placement

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3693 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-stack-placement.svg" alt="Complete SRAM expanded into Process Payload A, with both the payload and its User Process Stack highlighted by matching blue fills and thick blue borders" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#422-initial-argc-argv-and-envp -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Initial user process stack

## 4.2.2 Initial `argc`, `argv`, and `envp` (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3716 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3716:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.70%" /><col style="width:29.15%" /><col style="width:38.14%" /></colgroup><thead><tr><th>Name</th><th>Meaning</th><th>Calculation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>startup_cell_count</code></td><td>All startup values + strings</td><td>Sum shown below</td></tr>
<tr data-source-row="2"><td class="table-key"><code>entry_pc_address</code></td><td>Saved initial entry PC cell</td><td><code>base_address + size - startup_cell_count</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>strings_start_address</code></td><td>First copied character</td><td><code>entry_pc_address + argc + envc + 4</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>highest_stack_address</code></td><td>Highest reserved stack cell</td><td><code>base_address + size - 1</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>System V / POSIX</b><ul><li><strong>Intel386:</strong> argc → argv → envp</li>
<li>NULL ends pointer arrays</li>
<li><strong>RETI:</strong> entry PC; no auxiliary vector</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#422-initial-argc-argv-and-envp -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Initial user process stack

## 4.2.2 Initial `argc`, `argv`, and `envp` (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3726 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3726:1,2,3,4,5,6,7,8,9,10,11,12,13,14">

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

<!-- SOURCE Pico-OS/README.md#422-initial-argc-argv-and-envp -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Initial user process stack

## 4.2.2 Initial `argc`, `argv`, and `envp` (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-3756 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-3756" data-code-part="1">

<!-- README_CODE_PART code-3756 lines=1-4 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#4221-concrete-initial-stack-example -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Initial user process stack · 4.2.2 Initial `argc`, `argv`, and `envp`

## 4.2.2.1 Concrete initial-stack example (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-3791+code-3807" style="--readme-columns:minmax(0, 57fr) minmax(0, 43fr);">

<!-- README_ASSET code-3791 -->
<ReadmeVisual kind="code" :width="564.6" data-code-source="code-3791" data-code-part="1">

<!-- README_CODE_PART code-3791 lines=1-10 -->
<div class="readme-code">

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

<!-- README_ASSET code-3807 -->
<ReadmeVisual kind="code" :width="425.92631578947373" data-code-source="code-3807" data-code-part="1">

<!-- README_CODE_PART code-3807 lines=1-13 -->
<div class="readme-code">

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
<aside class="context-note"><b>Reading the stack</b><ul><li>argc includes program name</li>
<li><strong>argv/envp:</strong> NULL-terminated arrays</li>
<li>PicoOS prepares stack during run</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#4221-concrete-initial-stack-example -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.2 Initial user process stack · 4.2.2 Initial `argc`, `argv`, and `envp`

## 4.2.2.1 Concrete initial-stack example (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3828 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-initial-stack-example.svg" alt="Initial stack for add.bin with two arguments, 2 and 3, and two environment variables, X=1 and Y=0, showing cell offsets from entry_pc_address, absolute pointer targets by offset, both address directions, and continuation arrows between rows" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#431-loading-a-process-load-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process

## 4.3.1 Loading a process (`load` library call) (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 150fr) minmax(0, 211fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-3847 -->
<div class="readme-list"><ul><li>Validate header; reserve <strong>Process Payload</strong></li>
<li>Track polling/<strong>DMA</strong> progress</li>
<li>Append <strong>NEW</strong> PCB + fresh descriptors</li>
<li>Release load metadata; return <strong>PID</strong></li></ul></div>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:image-3863+image-3878" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET image-3863 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-load-transfer.svg" alt="EPROM, the complete peripheral mapping, and SRAM with CPU-polling and DMA transfer paths into the newly allocated User Process Image, while the caller owns ProcessLoad" />

</ReadmeVisual>

<!-- README_ASSET image-3878 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-load-complete.svg" alt="Completed load with the child PCB appended in the kernel heap, state NEW, fresh descriptors, initialized activation fields, and only one preliminary entry-PC cell on its stack" />

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#431-loading-a-process-load-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process

## 4.3.1 Loading a process (`load` library call) (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3888 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3888:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:48.41%" /><col style="width:51.59%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>ProcessLoad.base_address</code></span></td><td>Absolute reserved payload base</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>ProcessLoad.process_size</code></span></td><td>Image + heap + stack cells</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>ProcessLoad.code_start</code></span>, <span class="source-link"><code>ProcessLoad.data_start</code></span></td><td>Linked code- and data-segment offsets from the binary header</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>ProcessLoad.heap_start</code></span>, <span class="source-link"><code>ProcessLoad.heap_size</code></span></td><td>Resolved userspace heap offset and cell count</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>ProcessLoad.payload_word_count</code></span></td><td>Encoded program words after the five-word header</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>ProcessLoad.loaded_word_count</code></span></td><td>Words copied by the polling transfer so far</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>ProcessLoad.loading_bar_update</code></span></td><td>Next word count at which progress output is redrawn</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>ProcessLoad.uses_dma</code></span></td><td>DMA transfer versus polling chunks</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>ProcessLoad.path</code></span></td><td>Owned binary path; range requests + PCB</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#4311-load-function-reference -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.1 Loading a process (`load` library call)

## 4.3.1.1 Load function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3914 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3914:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:29.01%" /><col style="width:21.53%" /><col style="width:33.92%" /><col style="width:15.55%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>load_process_chunk()</code></td><td>PID success; 0 failure; −1 pending</td><td><ul><li>Incremental load; preserve progress</li><li>Create NEW PCB on completion</li></ul></td><td><code>load()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#432-starting-a-process-run-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process

## 4.3.2 Starting a process (`run` library call) (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-3941 -->
<div class="readme-list"><ul><li>Pack PID, <strong>arguments</strong>, environment</li>
<li>Require <strong>NEW</strong> PCB</li>
<li>Copy <strong>inheritable descriptors</strong></li>
<li>Build child stack; update SP/<strong>BAF</strong></li>
<li>NEW → <strong>READY</strong></li></ul></div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#432-starting-a-process-run-library-call -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process

## 4.3.2 Starting a process (`run` library call) (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3952 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-run-setup.svg" alt="Run changes inside the same SRAM layout: inherited descriptor table, copied caller arguments and environment, new stack and activation pointers, and state NEW to READY" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#4321-parent-to-child-inheritance -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call)

## 4.3.2.1 Parent-to-child inheritance (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-3973 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-3973:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.73%" /><col style="width:30.25%" /><col style="width:38.02%" /></colgroup><thead><tr><th>Child field or resource</th><th>Source and time</th><th>Relationship to parent afterward</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>parent_pid</code></span></td><td>Loading parent; during load</td><td>Parent identity; no shared PCB pointer</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>working_directory</code></span></td><td>Owned path copied during load</td><td>Independent owned path</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>parent_death_signal</code></span></td><td>Signal setting copied during load</td><td>Independent signal setting</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>file_descriptors</code></span></td><td>Run caller; during run</td><td>Independent entries, paths, offsets</td></tr>
<tr data-source-row="5"><td class="table-key">Initial environment</td><td>Explicit env or run caller</td><td>Copied to child stack; then heap</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>fork / load + run</b><ul><li><strong>Unix fork:</strong> clone parent process</li>
<li><strong>PicoOS:</strong> fresh image + copied state</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#4321-parent-to-child-inheritance -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call)

## 4.3.2.1 Parent-to-child inheritance (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-3985 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/process-inheritance.svg" alt="Parent and child PCBs with independent directory strings and descriptor tables in contiguous kernel-heap blocks, distinguishing stored pointers from load-time and run-time copies" />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#43211-environment-origin-and-propagation -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call) · 4.3.2.1 Parent-to-child inheritance

## 4.3.2.1.1 Environment origin and propagation

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-4031 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    K["Kernel<br/>no environment object"] -->|direct kernel start helper| I0["Init startup<br/>empty environment"]
    C["config/environment.txt<br/>PATH=/user"] -->|read_environment and setenv| I["Init heap environment<br/>PATH=/user<br/>PICOOS_LOADING_BAR=true when enabled"]
    I0 -->|read configuration| I
    I -->|run shell, NULL environment| S["Shell heap environment<br/>independent copies"]
    S -->|run child, NULL environment| U["Unchanged branch<br/>keeps inherited environment"]
    U -->|run child, NULL environment| UC["Child receives<br/>unchanged values"]
    S -->|run child, NULL environment| R["Removal branch<br/>unsetenv PICOOS_LOADING_BAR"]
    R -->|run child, NULL environment| RC["Child receives PATH<br/>loading-bar variable absent"]
    S -->|run child, NULL environment| M["Change branch<br/>setenv PATH, /user:/test, true"]
    M -->|run child, NULL environment| MC["Child receives<br/>PATH=/user:/test"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#43212-loading-bar-environment-variable -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call) · 4.3.2.1 Parent-to-child inheritance

## 4.3.2.1.2 Loading-bar environment variable

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4062 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4062" data-code-part="1">

<!-- README_CODE_PART code-4062 lines=1-5 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#4322-recording-termination-status -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call)

## 4.3.2.2 Recording termination status (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-4081 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 360, "rankSpacing": 30}, "themeCSS": "rect { rx: 0 !important; ry: 0 !important; }"}}%%
flowchart TB
    subgraph WAIT_FIRST["Parent already waiting"]
        direction LR
        EXIT["Child PCB<br/>exit_status = 7"]
        DELIVER["Parent stack<br/>status = 7"]
        RESUME["waitpid<br/>returns 7"]
        EXIT -->|copy| DELIVER
        DELIVER -->|wake and schedule| RESUME
    end
    subgraph EXIT_FIRST["Child terminates first"]
        direction LR
        KEEP["Child PCB<br/>exit_status = 7<br/>state = ZOMBIE"]
        COLLECT["Parent stack<br/>status = 7"]
        RETURN["waitpid<br/>returns 7"]
        KEEP -->|later waitpid copies| COLLECT
        COLLECT -->|no blocking| RETURN
    end
    WAIT_FIRST ~~~ EXIT_FIRST
    classDef waiting fill:#fff3d6,stroke:#b87800,color:#222;
    classDef delivered fill:#e8f4e8,stroke:#39733b,color:#222;
    class EXIT,KEEP waiting;
    class DELIVER,RESUME,COLLECT,RETURN delivered;
```

</ReadmeVisual>

</div>
<aside class="context-note"><b>Unix: reaping</b><ul><li>Collect status; remove child</li>
<li><strong>PicoOS:</strong> no reparenting to init</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#4322-recording-termination-status -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call)

## 4.3.2.2 Recording termination status (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:list-4109+list-4124" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET list-4109 -->
<div class="readme-list"><ul><li>Request points to <strong>local status</strong></li>
<li>Queue parent; mark <strong>BLOCKED</strong></li>
<li><strong>Child exits</strong>; write status; wake parent</li>
<li>Wrapper resumes; returns <strong>child status</strong></li></ul></div>

<!-- README_ASSET list-4124 -->
<div class="readme-list"><ul><li>Creation records <strong>parent PID</strong></li>
<li>Find <strong>caller</strong> + requested child</li>
<li><strong>Parent-only collection</strong>; mismatch → −1</li></ul></div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#4323-parent-collection-and-final-removal -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call)

## 4.3.2.3 Parent collection and final removal

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4164 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4164:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:34.20%" /><col style="width:27.30%" /><col style="width:38.50%" /></colgroup><thead><tr><th>Lifecycle order</th><th>Status handoff and child state</th><th>Who deletes the child PCB, and when</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Parent calls <span class="source-link"><code>waitpid()</code></span> while child is alive</td><td>Parent blocks; child later exits</td><td>Exit writes status; wakes; removes child</td></tr>
<tr data-source-row="2"><td class="table-key">Child terminates before parent calls <span class="source-link"><code>waitpid()</code></span></td><td>Child zombie; parent later waits</td><td>waitpid collects + removes child</td></tr>
<tr data-source-row="3"><td class="table-key">No live parent remains</td><td>No future parent collection</td><td>Orphan exit or parent cleanup removes child</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#4324-run-function-reference -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink> · 4.3 Loading and starting a process · 4.3.2 Starting a process (`run` library call)

## 4.3.2.4 Run function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4184 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4184:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:40.09%" /><col style="width:12.29%" /><col style="width:34.57%" /><col style="width:13.05%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>mark_process_ready_with_arguments()</code></td><td>true / false</td><td><ul><li>Build arguments/environment stack</li><li>Inherit descriptors; NEW → READY</li></ul></td><td><code>run()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#44-process-list-pcb-metadata-and-lifecycle-function-reference -->

# <MajorSectionLink section="4-processes-and-process-lifecycle">4. Processes and process lifecycle</MajorSectionLink>

## 4.4 Process list, PCB metadata, and lifecycle function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4204 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4204:1,2,3,4,5,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.77%" /><col style="width:23.01%" /><col style="width:29.78%" /><col style="width:22.44%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>list_processes()</code></td><td>No value</td><td>Print all PIDs + binary paths</td><td><code>list_processes()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>unload_process_by_pid()</code></td><td>true / false</td><td>Remove noncurrent process by PID</td><td><code>unload()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>exit_process()</code></td><td>No normal return</td><td>Record exit; notify parent; dispatch</td><td><code>exit()</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>process_heap_start()</code></td><td>Absolute heap address</td><td>Current process heap base</td><td><code>init_process_heap()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>process_heap_size()</code></td><td>Heap cell count</td><td>Current process heap capacity</td><td><code>init_process_heap()</code></td></tr>
<tr data-source-row="9"><td class="table-key"><code>current_process()</code></td><td>PCB pointer or NULL</td><td>Current PCB; GETPID reads its pid</td><td><code>getpid()</code> → <code>GETPID</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#5-shared-memory-entries-and-mappings -->

<div class="eyebrow section-eyebrow">Section 05 · Overview</div>

# 5. Shared Memory Entries and Mappings

<SectionOverview section="5-shared-memory-entries-and-mappings" />

---

<!-- SOURCE Pico-OS/README.md#51-named-entries-and-per-process-attachments -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.1 Named entries and per-process attachments (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4241 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4241" data-code-part="1">

<!-- README_CODE_PART code-4241 lines=1-13 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#51-named-entries-and-per-process-attachments -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.1 Named entries and per-process attachments (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-4265+table-4277" style="--readme-columns:minmax(0, 60fr) minmax(0, 40fr);">

<!-- README_ASSET table-4265 -->
<ReadmeVisual kind="table" :width="948" data-table-key="table-4265:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.19%" /><col style="width:50.81%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.name</code></span></td><td><ul><li>Owned lookup name</li><li>Unlink → free + NULL</li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.id</code></span></td><td>Numeric open/map handle</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.address</code></span></td><td>Absolute start of the <span class="source-link"><code>PSDMalloc()</code></span> shared-memory data region</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.reference_count</code></span></td><td>Attachment count, not distinct PID count</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.unlink_requested</code></span></td><td>Defers destruction until the last attachment disappears</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>SharedMemoryEntry.next</code></span></td><td>Link to the next entry in the kernel's linked list</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-4277 -->
<ReadmeVisual kind="table" :width="632" data-table-key="table-4277:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.10%" /><col style="width:50.90%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>SharedMemoryAttachment.entry</code></span></td><td>Non-owning entry pointer; contributes one reference</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>SharedMemoryAttachment.next</code></span></td><td>Link in one PCB's <span class="source-link"><code>shared_memory_attachments</code></span> list</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#511-global-shared-memory-list-and-entry-names -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink> · 5.1 Named entries and per-process attachments

## 5.1.1 Global shared-memory list and entry names

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4299 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-list.svg" alt="The global shared-memory list head reaches two linked entries in SRAM, each with a name pointer to a separate string. The lower view repeats the same two entries as a linked list." />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#5111-from-shared-memory-entries-to-shared-data-payloads-in-sram -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink> · 5.1 Named entries and per-process attachments · 5.1.1 Global shared-memory list and entry names

## 5.1.1.1 From Shared Memory Entries to Shared Data Payloads in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4311 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-mappings.svg" alt="Three blocks in each heap: Shared Memory Entries 1 and 2 point through address to Shared Data Payloads A and C. PCB 1 and Process Payload B provide context." />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#512-per-process-attachment-lists-in-sram -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink> · 5.1 Named entries and per-process attachments

## 5.1.2 Per-process attachment lists in SRAM

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4332 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-attachments.svg" alt="Two PCBs, three attachments and two shared entries in the Kernel Heap, followed by the same two per-process attachment lists with shared_memory_attachments, next and entry arrows. The Process and Shared Data Heap is one box." />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#52-mapping-unlinking-and-deferred-destruction -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.2 Mapping, unlinking, and deferred destruction (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4354 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/memory-shared-destruction.svg" alt="Shared-memory lifetime from left to right: shm_open creates Entry 1 with count 0, mmap in two processes raises the count to 2, shm_unlink removes the name while the count stays 2, removal of PCB 1 lowers it to 1, and removal of PCB 2 lowers it to 0 and frees the unlinked entry and its data." />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#52-mapping-unlinking-and-deferred-destruction -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.2 Mapping, unlinking, and deferred destruction (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 106fr) minmax(0, 284fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4371 -->
<div class="code-columns" data-column-key="code:code-4371" style="--readme-columns:minmax(0, 71fr) minmax(0, 29fr);--source-aspect:5.9826581639675185">

<ReadmeVisual kind="code" :width="1287.0000000000002" data-code-source="code-4371" data-code-part="1">

<!-- README_CODE_PART code-4371 lines=1-13 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="525.6760563380282" data-code-source="code-4371" data-code-part="2">

<!-- README_CODE_PART code-4371 lines=14-26 -->
<div class="readme-code">

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

<!-- README_ASSET code-4403 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4403" data-code-part="1">

<!-- README_CODE_PART code-4403 lines=1-13 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#53-shared-memory-function-reference -->

# <MajorSectionLink section="5-shared-memory-entries-and-mappings">5. Shared Memory Entries and Mappings</MajorSectionLink>

## 5.3 Shared Memory function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4432 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4432:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.02%" /><col style="width:16.51%" /><col style="width:33.16%" /><col style="width:20.31%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>open_shared_memory()</code></td><td>ID or −1</td><td>Find/create named shared entry</td><td><code>shm_open()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>map_shared_memory()</code></td><td>Address or NULL</td><td>Attach process; return shared address</td><td><code>mmap()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>unlink_shared_memory()</code></td><td>0 / −1</td><td>Remove name; defer final release</td><td><code>shm_unlink()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#6-scheduling-and-context-switching -->

<div class="eyebrow section-eyebrow">Section 06 · Overview</div>

# 6. Scheduling and context switching

<SectionOverview section="6-scheduling-and-context-switching" />

---

<!-- SOURCE Pico-OS/README.md#6-scheduling-and-context-switching -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Save activation → <strong>select PCB</strong> → restore</li>
<li><strong>Lazy Round Robin</strong> scans process list</li>
<li>Only <strong>runnable processes</strong> enter execution</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#611-algorithm-and-round-robin-comparison -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink> · 6.1 Scheduler implementation

## 6.1.1 Algorithm and Round Robin comparison

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 124fr) minmax(0, 266fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET mermaid-4489 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    P1["P1<br/>READY"] --> P2["P2<br/>BLOCKED"]
    P2 --> P3["P3<br/>RUNNING<br/>current"]
    P3 --> P4["P4<br/>STOPPED"]
    P4 --> P5["P5<br/>READY"]
```

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4510 -->
<div class="code-columns" data-column-key="code:code-4510" style="--readme-columns:minmax(0, 63fr) minmax(0, 37fr);--source-aspect:2.692620697239635">

<ReadmeVisual kind="code" :width="719.4" data-code-source="code-4510" data-code-part="1">

<!-- README_CODE_PART code-4510 lines=1-19 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="422.5047619047619" data-code-source="code-4510" data-code-part="2">

<!-- README_CODE_PART code-4510 lines=20-38 -->
<div class="readme-code">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#62-saved-process-registers -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.2 Saved process registers

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 208fr) minmax(0, 216fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4574 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4574" data-code-part="1">

<!-- README_CODE_PART code-4574 lines=1-9 -->
<div class="readme-code">

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

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-4586 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4586:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.14%" /><col style="width:73.86%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>in1</code></span>, <span class="source-link"><code>in2</code></span>, <span class="source-link"><code>acc</code></span></td><td>General argument/result registers at the suspension point</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>sp</code></span></td><td>Below saved PC; PC at sp + 1</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>baf</code></span></td><td>Base address of the interrupted PicoC function frame</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>cs</code></span></td><td>Absolute code-segment base used for instruction addresses</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>ds</code></span></td><td>Absolute data-segment base used for globals/static data</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#63-saving-the-current-process-and-selecting-the-next-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.3 Saving the current process and selecting the next process (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:list-4606+code-4618" style="--readme-columns:minmax(0, 45fr) minmax(0, 55fr);">

<!-- README_ASSET list-4606 -->
<div class="readme-list"><ul><li>Timer/<strong>yield</strong> → immediate switch</li>
<li><strong>Blocking call</strong> → save wait; switch</li>
<li><strong>Deferred request</strong> → switch on syscall return</li></ul></div>

<!-- README_ASSET code-4618 -->
<ReadmeVisual kind="code" :width="556" data-code-source="code-4618" data-code-part="1">

<!-- README_CODE_PART code-4618 lines=1-18 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#63-saving-the-current-process-and-selecting-the-next-process -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.3 Saving the current process and selecting the next process (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 218fr) minmax(0, 125fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:list-4642+code-4666" style="--readme-columns:minmax(0, 45fr) minmax(0, 55fr);">

<!-- README_ASSET list-4642 -->
<div class="readme-list"><ul><li>Find <strong>current PCB</strong></li>
<li><strong>Save registers</strong>; SP = context + 6</li>
<li>RUNNING → <strong>READY</strong>; retain blocking states</li>
<li>Select <strong>next process</strong></li></ul></div>

<!-- README_ASSET code-4666 -->
<ReadmeVisual kind="code" :width="710.8" data-code-source="code-4666" data-code-part="1">

<!-- README_CODE_PART code-4666 lines=1-15 -->
<div class="readme-code">

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

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-4687 -->
<div class="readme-list"><ul><li>Ask <strong>scheduler</strong> for candidate</li>
<li>Retry; interrupts can wake <strong>blocked</strong> processes</li>
<li>Restore accepted process; <strong>empty list</strong> → return</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#64-restoring-the-selected-process-and-returning-with-rti -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.4 Restoring the selected process and returning with `RTI`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 129fr) minmax(0, 185fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4705 -->
<div class="code-columns" data-column-key="code:code-4705" style="--readme-columns:minmax(0, 47fr) minmax(0, 53fr);--source-aspect:6.626093938177439">

<ReadmeVisual kind="code" :width="814" data-code-source="code-4705" data-code-part="1">

<!-- README_CODE_PART code-4705 lines=1-11 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="917.9148936170213" data-code-source="code-4705" data-code-part="2">

<!-- README_CODE_PART code-4705 lines=12-22 -->
<div class="readme-code">

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

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET list-4733 -->
<div class="readme-list"><ul><li><strong>BAF</strong> ← PCB; IN1 ← boundary</li>
<li>Install saved <strong>SP</strong> before boundary</li>
<li>Write boundary <strong>without C frame</strong></li>
<li><strong>Restore registers</strong>; BAF last</li>
<li>RTI → <strong>saved PC</strong> or initial entry</li></ul></div>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#65-dispatcher-function-reference -->

# <MajorSectionLink section="6-scheduling-and-context-switching">6. Scheduling and context switching</MajorSectionLink>

## 6.5 Dispatcher function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4765 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4765:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.13%" /><col style="width:10.63%" /><col style="width:15.18%" /><col style="width:43.05%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>dispatcher_switch_from_context()</code></td><td>RTI; C return only for empty list</td><td>Save activation; select; restore process</td><td><ul><li><code>yield()</code></li><li><code>sleep()</code></li><li><code>waitpid()</code></li><li><code>read()</code></li><li><code>load()</code></li><li><code>timer_interrupt_after_reschedule_request()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#7-blocking-wait-queues-signals-and-mutexes -->

<div class="eyebrow section-eyebrow">Section 07 · Overview</div>

# 7. Blocking, wait queues, signals, and mutexes

<SectionOverview section="7-blocking-wait-queues-signals-and-mutexes" />

---

<!-- SOURCE Pico-OS/README.md#71-blocking-and-wakeup -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.1 Blocking and wakeup (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET image-4793 -->
<ReadmeVisual kind="image" :width="980">

<img src="/readme/blocking-cycle.svg" alt="Waiting cycle: sleep() joins a wait queue with PCB state BLOCKED, wakeup() removes the waiter and sets state READY, then the scheduler selects the process and the dispatcher resumes it with state RUNNING." />

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#71-blocking-and-wakeup -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.1 Blocking and wakeup (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-4802 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4802:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.61%" /><col style="width:37.75%" /><col style="width:28.63%" /></colgroup><thead><tr><th>Blocking event</th><th>Wait queue</th><th>Wakeup event</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">sleep(queue)</td><td>Caller-supplied <span class="source-link"><code>wait_queue</code></span></td><td>wakeup(queue)</td></tr>
<tr data-source-row="2"><td class="table-key">Parent waitpid(child)</td><td>Child PCB waiters</td><td>Child exit or termination</td></tr>
<tr data-source-row="3"><td class="table-key">Contended mutex_lock</td><td>Mutex waiters</td><td>Mutex unlock</td></tr>
<tr data-source-row="4"><td class="table-key">Terminal read without input</td><td><span class="source-link"><code>Terminal.input_waiters</code></span></td><td>UART byte arrival</td></tr>
<tr data-source-row="5"><td class="table-key">DMA-backed process load</td><td>Global <span class="source-link"><code>dma_waiters</code></span></td><td>DMA completion</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#72-wait-queues-and-pcb-links -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.2 Wait queues and PCB links (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 114fr) minmax(0, 213fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-4823 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4823" data-code-part="1">

<!-- README_CODE_PART code-4823 lines=1-4 -->
<div class="readme-code">

```c {lines:false}
struct wait_queue {
    struct ProcessControlBlock *head;
    struct ProcessControlBlock *tail;
};
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:table-4830+table-4845" style="--readme-columns:minmax(0, 32fr) minmax(0, 68fr);">

<!-- README_ASSET table-4830 -->
<ReadmeVisual kind="table" :width="480" data-table-key="table-4830:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:40.15%" /><col style="width:59.85%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>head</code></span></td><td><ul><li>First blocked PCB</li><li>Empty → NULL</li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>tail</code></span></td><td><ul><li>Last blocked PCB</li><li>O(1) append; empty → NULL</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-4845 -->
<ReadmeVisual kind="table" :width="1020" data-table-key="table-4845:1,2,3,4,5,6,7,8,9">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:47.75%" /><col style="width:52.25%" /></colgroup><thead><tr><th>Field / storage</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>WaitPidRequest.pid</code></span>, in <span class="source-link"><code>request</code></span> on the parent's userspace stack</td><td>Exact requested child PID</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>WaitPidRequest.status</code></span>, in the same stack-local request</td><td>Pointer to stack-local status result</td></tr>
<tr data-source-row="3"><td class="table-key">wait_queue.head + wait_queue.tail</td><td>FIFO endpoints; O(1) append; NULL when empty</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.waiters</code></span>, embedded in each kernel-heap PCB</td><td>Other processes waiting for this child</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.waiting_status_ptr</code></span>, pointer stored in the waiting parent's kernel-heap PCB</td><td>Parent's suspended stack-local status</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.waiting_queue_ptr</code></span>, pointer stored in every kernel-heap PCB</td><td>Queue containing this PCB or NULL</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.wait_next</code></span>, embedded in every kernel-heap PCB</td><td>Intrusive successor; one active queue</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>ProcessControlBlock.state</code></span> and <span class="source-link"><code>ProcessControlBlock.stopped_from_state</code></span>, in the PCB</td><td>BLOCKED/runnable/STOPPED + completed wait</td></tr>
<tr data-source-row="9"><td class="table-key"><ul><li>Child PCB: parent_pid</li><li>exit_status + stop_signal</li></ul></td><td>Parent validation + retained child state</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#72-wait-queues-and-pcb-links -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.2 Wait queues and PCB links (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-4879 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    subgraph A["PCB A: process being waited on<br/>kernel heap"]
        AW["waiters: embedded wait_queue"]
    end
    AW -->|head| B["PCB B: waiting process<br/>kernel heap"]
    B -->|wait_next| C["PCB C: waiting process<br/>kernel heap"]
    C -->|wait_next| D["PCB D: waiting process<br/>kernel heap"]
    D -->|wait_next| N["NULL"]
    AW -->|tail| D
    B -. waiting_queue_ptr .-> AW
    C -. waiting_queue_ptr .-> AW
    D -. waiting_queue_ptr .-> AW
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#721-blocking-with-sleep-and-waking-with-wakeup -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.2 Wait queues and PCB links

## 7.2.1 Blocking with `sleep` and waking with `wakeup`

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>sleep → <strong>FIFO queue</strong> + BLOCKED</li>
<li>wakeup → remove head; mark <strong>READY</strong></li>
<li>Queue references PCBs; <strong>owns no allocations</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#722-child-waiting-with-waitpid -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.2 Wait queues and PCB links

## 7.2.2 Child waiting with `waitpid`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-4917 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-4917" data-code-part="1">

<!-- README_CODE_PART code-4917 lines=1-10 -->
<div class="readme-code">

```c {lines:false}
int waitpid(int pid) {
    int status = 0;
    struct WaitPidRequest request;

    request.pid = pid;
    request.status = &status;
    while (!invoke_waitpid_syscall(SYSCALL_WAITPID, (int)&request)) {
    }
    return status;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#723-wait-queue-function-reference -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.2 Wait queues and PCB links

## 7.2.3 Wait queue function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET table-4957 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4957:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.23%" /><col style="width:49.63%" /><col style="width:33.14%" /></colgroup><thead><tr><th>Public/library operation</th><th>Syscall and kernel call path</th><th>Completion path</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>sleep(wq)</code></span></td><td><span class="source-link"><code>SYSCALL_SLEEP</code></span> → <span class="source-link"><code>handle_syscall()</code></span> → <span class="source-link"><code>sleep_on_wait_queue(wq, caller_context)</code></span> → <span class="source-link"><code>enqueue_current_process_on_wait_queue(wq)</code></span></td><td>An event owner reaches <span class="source-link"><code>wakeup_wait_queue(wq)</code></span>, often through <span class="source-link"><code>wakeup(wq)</code></span>.</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>wakeup(wq)</code></span></td><td><span class="source-link"><code>SYSCALL_WAKEUP</code></span> → <span class="source-link"><code>handle_syscall()</code></span> → <span class="source-link"><code>wakeup_wait_queue(wq)</code></span></td><td>Clear links; READY or completed beneath STOPPED</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>waitpid(pid)</code></span></td><td>WAITPID → validate child → sleep_on_wait_queue</td><td><ul><li>Child exits/stops → status write</li><li>Same FIFO wakeup primitive</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-4966 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4966:1,2,3,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.28%" /><col style="width:19.08%" /><col style="width:16.34%" /><col style="width:27.30%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>wait_for_process_by_pid()</code></td><td>Completion flag; userspace IN2 = 1</td><td>Validate child; collect or block</td><td><ul><li><code>waitpid()</code></li><li><code>SYSCALL_WAITPID</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>sleep_on_wait_queue()</code></td><td>No value; later resumes via RTI</td><td>Enqueue caller; BLOCKED; dispatch</td><td><ul><li><code>sleep()</code></li><li><code>SYSCALL_SLEEP</code></li><li><code>waitpid()</code></li><li><code>wait_for_process_by_pid()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>wakeup_wait_queue()</code></td><td>true if woke; false if empty</td><td>Wake FIFO head</td><td><ul><li><code>wakeup()</code></li><li><code>SYSCALL_WAKEUP</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>enqueue_current_process_on_wait_queue()</code></td><td>No value</td><td>Link current PCB into FIFO</td><td><ul><li><code>sleep()</code></li><li><code>waitpid()</code></li><li><code>sleep_on_wait_queue()</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#731-supported-signals-and-fixed-actions -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.3 Process signals

## 7.3.1 Supported signals and fixed actions

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET table-4990 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-4990:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:55.09%" /><col style="width:44.91%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>pending_termination_signal</code></span></td><td>Deferred SIGINT/SIGKILL</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>stop_signal</code></span></td><td>Current stop signal</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>stopped_from_state</code></span></td><td>State reconsidered on SIGCONT</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>parent_death_signal</code></span></td><td>Signal delivered when parent dies</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>pending_terminal_read_buffer</code></span>, <span class="source-link"><code>pending_terminal_read_count</code></span></td><td>Retained terminal buffer + count</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5004 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5004:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:15.79%" /><col style="width:19.55%" /><col style="width:35.17%" /><col style="width:29.50%" /></colgroup><thead><tr><th>Number</th><th>Name</th><th>Kernel action</th><th>Reported status/state</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td>Probe</td><td>Validates that a non-zombie PID exists</td><td>No change</td></tr>
<tr data-source-row="2"><td class="table-key">2</td><td><span class="source-link"><code>SIGINT</code></span></td><td>Terminates the target</td><td>Exit status 130</td></tr>
<tr data-source-row="3"><td class="table-key">9</td><td><span class="source-link"><code>SIGKILL</code></span></td><td>Terminates the target</td><td>Exit status 137</td></tr>
<tr data-source-row="4"><td class="table-key">18</td><td><span class="source-link"><code>SIGCONT</code></span></td><td>Resumes a stopped target</td><td>READY / original BLOCKED wait</td></tr>
<tr data-source-row="5"><td class="table-key">19</td><td><span class="source-link"><code>SIGSTOP</code></span></td><td>Stops the target</td><td><ul><li>STOPPED</li><li>Status: 147</li></ul></td></tr>
<tr data-source-row="6"><td class="table-key">20</td><td><span class="source-link"><code>SIGTSTP</code></span></td><td>Stops the target</td><td><ul><li>STOPPED</li><li>Status: 148</li></ul></td></tr>
<tr data-source-row="7"><td class="table-key">21</td><td><span class="source-link"><code>SIGTTIN</code></span></td><td>Stop background terminal reader</td><td><ul><li>STOPPED</li><li>Status: 149</li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>POSIX / Linux: signal 0</b><ul><li>Probe without signal delivery</li>
<li><strong>PicoOS:</strong> existence only; rejects zombies</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#732-stopping-and-continuing-a-process -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.3 Process signals

## 7.3.2 Stopping and continuing a process

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Stop saves <strong>previous state</strong> + signal</li>
<li>STOPPED processes stay in <strong>process list</strong></li>
<li>Continue restores <strong>prior state</strong></li>
<li>Terminal read also needs <strong>input ownership</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#733-termination-ctrl-c-and-parent-collection -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.3 Process signals

## 7.3.3 Termination, `Ctrl-C`, and parent collection

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Current target:</strong> defer until dispatch</li>
<li><strong>Waiting parent:</strong> status + wakeup + removal</li>
<li><strong>Otherwise:</strong> retain status as ZOMBIE</li>
<li><strong>Ctrl+C</strong> → shell resumes with 130</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#734-fixed-picoos-signal-actions-compared-with-unix -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.3 Process signals

## 7.3.4 Fixed PicoOS signal actions compared with Unix

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>PicoOS:</strong> fixed signal actions</li>
<li><strong>Stop/continue</strong> update state immediately</li>
<li>Current-process termination waits for <strong>dispatch</strong></li></ul></div>
<aside class="context-note"><b>Unix signal handling</b><ul><li><strong>SIGINT/TSTP/TTIN:</strong> catch or ignore</li>
<li><strong>SIGKILL/STOP:</strong> cannot catch</li>
<li><strong>PicoOS:</strong> all actions fixed</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#735-signal-function-reference -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink> · 7.3 Process signals

## 7.3.5 Signal function reference

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5072 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5072:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.71%" /><col style="width:16.76%" /><col style="width:28.01%" /><col style="width:17.52%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>send_signal_by_pid()</code></td><td>0 / −1</td><td>Validate PID; probe or deliver</td><td><code>kill()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>set_parent_death_signal()</code></td><td>0 / −1</td><td>Configure signal on parent death</td><td><code>prctl()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#74-mutexes-with-test-and-set-and-wait-queues -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.4 Mutexes with test-and-set and wait queues (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-5100 -->
<div class="code-columns" data-column-key="code:code-5100" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:2.6341463414634148">

<ReadmeVisual kind="code" :width="420" data-code-source="code-5100" data-code-part="1">

<!-- README_CODE_PART code-5100 lines=1-14 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="420" data-code-source="code-5100" data-code-part="2">

<!-- README_CODE_PART code-5100 lines=15-27 -->
<div class="readme-code">

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

---

<!-- SOURCE Pico-OS/README.md#74-mutexes-with-test-and-set-and-wait-queues -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.4 Mutexes with test-and-set and wait queues (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-5137 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TD
    A["mutex_lock: call testset"] --> B{"Old lock value?"}
    B -->|false| C["Lock changed from 0 to 1<br/>enter critical section"]
    B -->|true| D["sleep on mutex.waiters"]
    D --> E["Resume after wakeup and scheduling"]
    E --> A
    C --> F["mutex_unlock: clear lock, then call wakeup"]
    F -.->|If a process is waiting| E
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#74-mutexes-with-test-and-set-and-wait-queues -->

# <MajorSectionLink section="7-blocking-wait-queues-signals-and-mutexes">7. Blocking, wait queues, signals, and mutexes</MajorSectionLink>

## 7.4 Mutexes with test-and-set and wait queues (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-5151+table-5156" style="--readme-columns:minmax(0, 36fr) minmax(0, 64fr);">

<!-- README_ASSET table-5151 -->
<ReadmeVisual kind="table" :width="540" data-table-key="table-5151:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:34.80%" /><col style="width:65.20%" /></colgroup><thead><tr><th>Attribute</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>lock</code></span></td><td>Unlocked=false; TSL returns old, stores true</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>waiters</code></span></td><td>Embedded FIFO of waiting parents</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5156 -->
<ReadmeVisual kind="table" :width="960" data-table-key="table-5156:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:29.98%" /><col style="width:45.89%" /><col style="width:24.13%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>testset()</code></td><td>Atomic old value; store 1</td><td>TSL; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>mutex_init()</code></td><td>Clear lock + initialize wait queue</td><td>None</td></tr>
<tr data-source-row="3"><td class="table-key"><code>mutex_lock()</code></td><td>Acquire; sleep/retry on contention</td><td><code>SLEEP</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>mutex_unlock()</code></td><td>Clear lock; wake one contender</td><td><code>WAKEUP</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#8-terminal-file-descriptors-and-host-filesystem -->

<div class="eyebrow section-eyebrow">Section 08 · Overview</div>

# 8. Terminal, file descriptors, and host filesystem

<SectionOverview section="8-terminal-file-descriptors-and-host-filesystem" />

---

<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-5182 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-5182" data-code-part="1">

<!-- README_CODE_PART code-5182 lines=1-10 -->
<div class="readme-code">

```c {lines:false}
struct FileDescriptor {
    int kind;
    int flags;
    int offset;
    char *path;
};

struct FileDescriptorTable {
    struct FileDescriptor *entries;
};
```

</div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Unix comparison</b><ul><li><strong>Unix:</strong> shared open-file descriptions</li>
<li><strong>PicoOS:</strong> independent copied entries/offsets</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5206 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5206:1,2,3,4,5,6,7,8">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-5221 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    subgraph PARENT["parent entries[0..7]"]
        P02["0, 1, 2<br/>always copy"]
        P34["3, 4<br/>copy only FILE kind"]
        P57["5, 6, 7<br/>never examine"]
    end
    subgraph CHILD["new child table and array"]
        C02["0, 1, 2<br/>deep copies"]
        C34["3, 4<br/>FILE deep copies or FREE"]
        C57["5, 6, 7<br/>FREE"]
    end
    P02 --> C02
    P34 -->|"conditional"| C34
    P57 -. "not inherited" .-> C57
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#81-per-process-file-descriptor-table -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.1 Per-process file-descriptor table (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET table-5247 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5247:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:43.35%" /><col style="width:56.65%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>FileDescriptor.kind</code></span></td><td>FREE/STDIN/STDOUT/STDERR/FILE identity</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>FileDescriptor.flags</code></span></td><td>Access + create/truncate/append bits</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>FileDescriptor.offset</code></span></td><td>Independent logical byte position</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>FileDescriptor.path</code></span></td><td>Owned normalized path or NULL</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>FileDescriptorTable.entries</code></span></td><td>Owned array of eight descriptors</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5258 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5258:1,2,3,4,5,6">

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

<!-- SOURCE Pico-OS/README.md#82-global-terminal-input-buffer -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.2 Global terminal input buffer

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 170fr) minmax(0, 216fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-5286 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-5286" data-code-part="1">

<!-- README_CODE_PART code-5286 lines=1-7 -->
<div class="readme-code">

```c {lines:false}
struct Terminal {
    char input_buffer[TERMINAL_INPUT_BUFFER_CAPACITY];
    int input_head;
    int input_tail;
    int input_count;
    struct wait_queue input_waiters;
};
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-5296 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5296:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.16%" /><col style="width:50.84%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>Terminal.input_buffer</code></span></td><td>Embedded receive ring</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>Terminal.input_head</code></span></td><td>Next unread byte</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>Terminal.input_tail</code></span></td><td>Next insertion cell</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>Terminal.input_count</code></span></td><td>Occupied count; distinguishes full/empty</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>Terminal.input_waiters</code></span></td><td>Foreground readers awaiting input</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#83-blocking-and-completing-terminal-reads -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.3 Blocking and completing terminal reads (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 157fr) minmax(0, 173fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-5351+code-5359" style="--readme-columns:minmax(0, 46fr) minmax(0, 54fr);">

<!-- README_ASSET code-5351 -->
<ReadmeVisual kind="code" :width="422.3481481481481" data-code-source="code-5351" data-code-part="1">

<!-- README_CODE_PART code-5351 lines=1-2 -->
<div class="readme-code">

```c {lines:false}
char buffer[16];
read(STDIN_FILENO, buffer, 16);
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-5359 -->
<ReadmeVisual kind="code" :width="495.79999999999995" data-code-source="code-5359" data-code-part="1">

<!-- README_CODE_PART code-5359 lines=1-8 -->
<div class="readme-code">

```c {lines:false}
request.file_descriptor = file_descriptor;
request.buffer = (char *)buffer;
request.count = count;
request.protect_uart_control = false;
request.show_loading_bar =
    getenv(LOADING_BAR_ENVIRONMENT_VARIABLE) != NULL;
request.transferred = 0;
request.complete = false;
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-5374+code-5390" style="--readme-columns:minmax(0, 43fr) minmax(0, 57fr);">

<!-- README_ASSET code-5374 -->
<ReadmeVisual kind="code" :width="458.36491228070173" data-code-source="code-5374" data-code-part="1">

<!-- README_CODE_PART code-5374 lines=1-9 -->
<div class="readme-code">

```c {lines:false}
if (is_terminal_device_path(descriptor->path)) {
    request->complete = true;
    return begin_terminal_read(
        kernel_terminal(),
        request->buffer + request->transferred,
        request->count - request->transferred,
        caller_context
    );
}
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-5390 -->
<ReadmeVisual kind="code" :width="607.6" data-code-source="code-5390" data-code-part="1">

<!-- README_CODE_PART code-5390 lines=1-9 -->
<div class="readme-code">

```c {lines:false}
process->pending_terminal_read_buffer = buffer;
process->pending_terminal_read_count = count;
enqueue_current_process_on_wait_queue(&(terminal->input_waiters));
interrupt_controller_assign_device(
    INTERRUPT_DEVICE_UART,
    uart_interrupt_index,
    uart_interrupt_priority
);
dispatcher_switch_from_context(caller_context);
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#83-blocking-and-completing-terminal-reads -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.3 Blocking and completing terminal reads (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-5406 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-5406" data-code-part="1">

<!-- README_CODE_PART code-5406 lines=1-11 -->
<div class="readme-code">

```c {lines:false}
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
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#84-foreground-input-ownership-and-terminal-generated-signals -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.4 Foreground input ownership and terminal-generated signals

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 365fr) minmax(0, 86fr)">

<div class="readme-artifacts composition-panel layout-stacked">

<!-- README_ASSET table-5430 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5430:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.80%" /><col style="width:34.20%" /><col style="width:20.19%" /><col style="width:21.81%" /></colgroup><thead><tr><th>Situation</th><th>Saved foreground_process_target value</th><th>Ordinary input</th><th>Ctrl+C / Ctrl+Z</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Before shell registration</td><td><code>0</code></td><td>Buffer; fallback completion target</td><td>Consume; no signal</td></tr>
<tr data-source-row="2"><td class="table-key">Shell prompt, including while background work runs</td><td>Negative shell process ID</td><td>Shell input</td><td>Consume; protect shell</td></tr>
<tr data-source-row="3"><td class="table-key">Foreground child / fg</td><td>Positive child process ID</td><td>Child input</td><td>SIGINT / SIGTSTP</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5441 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5441:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.65%" /><col style="width:41.11%" /><col style="width:36.24%" /></colgroup><thead><tr><th>Input byte</th><th>Detection and action</th><th>Buffered?</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">3 (<code>Ctrl+C</code>)</td><td>Foreground SIGINT</td><td>Never buffered</td></tr>
<tr data-source-row="2"><td class="table-key">26 (<code>Ctrl+Z</code>)</td><td>Foreground SIGTSTP</td><td>Never buffered</td></tr>
<tr data-source-row="3"><td class="table-key">4 (<code>Ctrl+D</code>)</td><td>Ordinary ring byte; user handles EOF</td><td>Stored; dropped only when full</td></tr>
<tr data-source-row="4"><td class="table-key">Any other byte</td><td>Enqueue; complete pending read</td><td>Stored unless full; waiter may consume</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-5470 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5470:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.90%" /><col style="width:14.52%" /><col style="width:20.31%" /><col style="width:32.27%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>set_foreground_process()</code></td><td>0 / −1</td><td>Select shell or child input owner</td><td><code>set_foreground_process()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#85-virtual-terminal-and-null-device-paths -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.5 Virtual terminal and null-device paths

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5491 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5491:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:44.46%" /><col style="width:55.54%" /></colgroup><thead><tr><th>Device path</th><th>Role</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>/device/terminal.dev</code></td><td>Global ring input; UART output; no seek</td></tr>
<tr data-source-row="2"><td class="table-key"><code>/device/null.dev</code></td><td>Immediate EOF; discard writes; no seek</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#86-file-descriptor-creation-inheritance-duplication-and-cleanup -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.6 File-descriptor creation, inheritance, duplication, and cleanup

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5506 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5506:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:42.04%" /><col style="width:15.90%" /><col style="width:24.64%" /><col style="width:17.42%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>close_file_descriptor()</code></td><td>0 / −1</td><td>Release path; reset entry</td><td><ul><li><code>close()</code></li><li><code>fclose()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>duplicate_file_descriptor()</code></td><td>Target FD / −1</td><td>Replace target with independent copy</td><td><code>dup2()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#88-opening-reading-writing-and-seeking -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.8 Opening, reading, writing, and seeking (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET table-5543 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5543:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:22.74%" /><col style="width:21.20%" /><col style="width:56.06%" /></colgroup><thead><tr><th>Flag</th><th>Value</th><th>Meaning in OpenRequest.flags</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>O_RDONLY</code></span></td><td>0</td><td>Permit reads</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>O_WRONLY</code></span></td><td>1</td><td>Permit writes</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>O_RDWR</code></span></td><td>2</td><td>Read + write; O_ACCMODE extracts access bits</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>O_CREAT</code></span></td><td>64</td><td>Allow a missing regular path to be created</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>O_TRUNC</code></span></td><td>512</td><td>With writable access, create/empty the regular host file during open</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>O_APPEND</code></span></td><td>1024</td><td>Every write uses current file end</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5565 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5565:1,2,3,4,5,6,7">

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

<!-- SOURCE Pico-OS/README.md#88-opening-reading-writing-and-seeking -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.8 Opening, reading, writing, and seeking (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5608 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5608:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.14%" /><col style="width:18.85%" /><col style="width:21.19%" /><col style="width:36.82%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>open_file_descriptor()</code></td><td>Lowest free FD / −1</td><td>Open path; choose lowest free slot</td><td><ul><li><code>open()</code></li><li><code>fopen()</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>read_file_descriptor()</code></td><td>Byte count / −1</td><td>Read file or terminal; may block</td><td><ul><li><code>read()</code></li><li><code>fgetc()</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>write_file_descriptor()</code></td><td>Byte count / −1</td><td>Route output; advance saved offset</td><td><ul><li><code>write()</code></li><li><code>write_without_uart_escape_check()</code></li><li><code>fputc()</code></li><li><code>fputs()</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>seek_file_descriptor()</code></td><td>Offset / −1</td><td>Replace logical file offset</td><td><code>lseek()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#89-picoos-paths-working-directories-and-host-operations -->

# <MajorSectionLink section="8-terminal-file-descriptors-and-host-filesystem">8. Terminal, file descriptors, and host filesystem</MajorSectionLink>

## 8.9 PicoOS paths, working directories, and host operations

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET table-5646 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5646:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.41%" /><col style="width:42.97%" /><col style="width:24.62%" /></colgroup><thead><tr><th>Requested path</th><th>Base and normalization</th><th>Example result from current directory /a/b</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Relative dir</td><td>Append to the PCB directory</td><td><code>/a/b/dir</code></td></tr>
<tr data-source-row="2"><td class="table-key">. / repeated separators</td><td>Skip . + empty segments</td><td><code>/a/b</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>..</code></td><td>Remove one existing result segment, but never remove root</td><td><code>/a</code>, from <code>/</code>, still <code>/</code></td></tr>
<tr data-source-row="4"><td class="table-key">Parent/child combinations</td><td>Apply segments from left to right</td><td><code>/a/dir</code></td></tr>
<tr data-source-row="5"><td class="table-key">Absolute <code>/dir</code></td><td>Ignore the PCB directory and start at root</td><td><code>/dir</code></td></tr>
<tr data-source-row="6"><td class="table-key">Empty or result at least <span class="source-link"><code>PATH_MAX</code></span> cells</td><td>Reject before contacting the emulator</td><td>Operation returns failure</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-5659 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5659:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:38.04%" /><col style="width:16.15%" /><col style="width:28.14%" /><col style="width:17.67%" /></colgroup><thead><tr><th>Kernel function</th><th>Result</th><th>Effects</th><th>Library entry</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>get_working_directory()</code></td><td>0 / −1</td><td>Copy current absolute path</td><td><code>getcwd()</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>change_working_directory()</code></td><td>0 / −1</td><td>Validate directory; replace current path</td><td><code>chdir()</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>make_host_directory()</code></td><td>Host status</td><td>Request host directory creation</td><td><code>mkdir()</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>read_host_directory()</code></td><td>Listing count / error</td><td>Fetch directory listing</td><td><code>opendir()</code></td></tr>
<tr data-source-row="5"><td class="table-key"><ul><li><code>unlink_host_file()</code></li><li><code>remove_host_directory()</code></li></ul></td><td>Host status</td><td>Request file removal</td><td><ul><li><code>unlink()</code></li><li><code>rmdir()</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>move_host_path()</code></td><td>Host status</td><td>Request move/rename</td><td><code>move()</code></td></tr>
<tr data-source-row="7"><td class="table-key"><code>touch_host_file()</code></td><td>Host status</td><td>Create file or update timestamps</td><td><code>touch()</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Host OS boundary</b><ul><li>Root confinement; reject symlinks</li>
<li><strong>Linux:</strong> RESOLVE_BENEATH/NO_SYMLINKS/NO_XDEV</li>
<li><strong>Windows:</strong> reject reparse points</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#9-kernel-data-structures-relationships-storage-and-lifetimes -->

<div class="eyebrow section-eyebrow">Section 09 · Overview</div>

# 9. Kernel data structures: relationships, storage, and lifetimes

<SectionOverview section="9-kernel-data-structures-relationships-storage-and-lifetimes" />

---

<!-- SOURCE Pico-OS/README.md#9-kernel-data-structures-relationships-storage-and-lifetimes -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li><strong>Containment:</strong> embedded field</li>
<li><strong>Reference:</strong> pointer to another object</li>
<li><strong>Ownership:</strong> responsibility for cleanup</li>
<li>Wait queues reference; <strong>do not own PCBs</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#91-memory-layout-allocation-sources-and-lifetimes -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.1 Memory layout, allocation sources, and lifetimes (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5696 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5696:1,2,3,4,5,6,7,8,9,10">

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

<!-- SOURCE Pico-OS/README.md#91-memory-layout-allocation-sources-and-lifetimes -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.1 Memory layout, allocation sources, and lifetimes (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5696 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5696:11,12,13,14,15,16,17,18,19">

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

<!-- SOURCE Pico-OS/README.md#92-containment-and-reference-relationships -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.2 Containment and reference relationships

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-stacked">

<!-- README_ASSET mermaid-5729 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    subgraph PCB["ProcessControlBlock / PCB: one Kernel Heap allocation"]
        P["PCB fields"]
        A["activation: embedded ActivationRecord"]
        W["waiters: embedded wait_queue<br/>other processes waiting for this process"]
    end
    W -->|head| WA["first waiting PCB"]
    WA -->|wait_next| WZ["last waiting PCB"]
    W -->|tail| WZ
    WA -->|waiting_queue_ptr| W
    P -->|next| PN["next PCB in global process list"]
    P -->|base_address| IMG["Process Payload: PSDMalloc<br/>User Process Image / User Process Heap / User Process Stack"]
    A -->|"sp and baf"| ST["saved process stack frame and return PC<br/>inside that Process Payload"]
    P -->|file_descriptors| FDT["FileDescriptorTable<br/>separate kmalloc allocation"]
    subgraph ARRAY["one separate kmalloc allocation: FileDescriptor entries 0–7"]
        FD["entries[fd]<br/>kind / flags / offset / path"]
    end
    FDT -->|entries| FD
    FD -->|path| PATH["separate kmalloc path string"]
    subgraph TERM["global Terminal object: kernel .data"]
        TROOT["Terminal fields"]
        INPUT["input_buffer[128]<br/>embedded ring storage"]
        INPUTQ["input_waiters<br/>embedded wait_queue"]
    end
    TROOT -->|contains| INPUT
    TROOT -->|contains| INPUTQ
    INPUTQ -->|head / tail| READER["waiting reader PCB<br/>kernel heap"]
    READER -->|waiting_queue_ptr| INPUTQ
    PATH -. "terminal-device path selects" .-> TROOT
    P -->|"binary_path / working_directory"| STR["separate kmalloc strings"]
    P -->|pending_load| LOAD["ProcessLoad: kmalloc<br/>path copy and unfinished PSDMalloc Process Payload"]
    P -->|shared_memory_attachments| ATT["SharedMemoryAttachment: kmalloc"]
    ATT -->|next| ATT2["next attachment or NULL"]
    ATT -->|entry| SE["SharedMemoryEntry: kmalloc"]
    SE -->|next| SE2["next registry entry or NULL"]
    SE -->|name| NAME["kmalloc name or NULL after unlink"]
    SE -->|address| SH["shared data: PSDMalloc"]
    P -->|waiting_queue_ptr| Q["queue currently containing this PCB<br/>may belong to another PCB, terminal, DMA, or userspace"]
    P -->|wait_next| WP["next PCB in that wait queue or NULL"]
    P -->|waiting_status_ptr| STATUS["parent's stack-local waitpid status<br/>inside its Process Payload, or NULL"]
    P -->|pending_terminal_read_buffer| BUF["pending read destination<br/>caller stack, .data, heap, or shared data"]
```

</ReadmeVisual>

<!-- README_ASSET mermaid-5776 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    subgraph IMAGE["parent Process Payload: one PSDMalloc allocation"]
        direction TB
        DATA[".data<br/>library globals such as environ"]
        HEAP["userspace heap<br/>malloc environment and application objects"]
        subgraph FRAME["waitpid function frame: userspace stack"]
            REQ["WaitPidRequest request<br/>pid and status pointer"]
            RESULT["int status"]
        end
    end
    REQ -->|status| RESULT
    REQ -->|"&request through IN1"| ARG["handle_syscall argument<br/>pointer value in a kernel stack frame"]
    ARG -->|read during syscall| WAIT["wait_for_process_by_pid<br/>kernel stack frame"]
    PARENT["parent PCB<br/>kernel heap"] -->|waiting_status_ptr| RESULT
    CHILD["child PCB<br/>kernel heap"] -->|contains| Q["waiters: embedded wait_queue"]
    Q -->|head / tail| PARENT
    PARENT -->|waiting_queue_ptr| Q
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#93-kernel-global-variables-and-process-list-roots -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.3 Kernel global variables and process-list roots (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5816 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-5816:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17">

<div class="table-panels table-panels-two" data-column-key="table:table-5816:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:52.85%" /><col style="width:47.15%" /></colgroup><thead><tr><th>Global</th><th>Stored value / referenced structure and role</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>process_list_head</code></span></td><td>First PCB or NULL; traversal starts here</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>process_list_tail</code></span></td><td>Final PCB or NULL; O(1) append</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>active_process</code></span></td><td>Current PCB + scheduler scan position</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>next_process_id</code></span></td><td>Next PID; initial 1</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>kernel_heap</code></span></td><td>Embedded descriptor whose first-block pointer reaches the kernel heap</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>process_shared_data_heap</code></span></td><td>Outer Process/Shared Data Heap descriptor</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>terminal</code></span></td><td>128-cell ring + indices/count + wait queue</td></tr>
<tr data-source-row="8"><td class="table-key"><span class="source-link"><code>shared_memory_list_head</code></span></td><td>Registry head; includes unlinked live entries</td></tr>
<tr data-source-row="9"><td class="table-key"><span class="source-link"><code>next_shared_memory_id</code></span></td><td>Next shared-memory ID; independent of PID</td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:52.85%" /><col style="width:47.15%" /></colgroup><thead><tr><th>Global</th><th>Stored value / referenced structure and role</th></tr></thead><tbody><tr data-source-row="10"><td class="table-key"><span class="source-link"><code>dma_waiters</code></span></td><td>Standalone DMA wait queue; PCB endpoints</td></tr>
<tr data-source-row="11"><td class="table-key"><span class="source-link"><code>dma_initialized</code></span></td><td>Initially false. It prevents reinitializing the DMA queue after setup</td></tr>
<tr data-source-row="12"><td class="table-key"><span class="source-link"><code>reschedule_requested</code></span></td><td>Deferred switch flag; cleared on selection</td></tr>
<tr data-source-row="13"><td class="table-key"><span class="source-link"><code>foreground_process_target</code></span></td><td><ul><li>0: unregistered</li><li>Positive: input + signals</li><li>Negative: input; suppress signals</li></ul></td></tr>
<tr data-source-row="14"><td class="table-key"><span class="source-link"><code>interrupt_device_isrs</code></span></td><td>Timer/DMA/UART indices {1,4,2}</td></tr>
<tr data-source-row="15"><td class="table-key"><span class="source-link"><code>interrupt_device_priorities</code></span></td><td>Timer/DMA/UART priorities <code>{1, 1, 2}</code> used during controller initialization</td></tr>
<tr data-source-row="16"><td class="table-key"><span class="source-link"><code>loading_bar_enabled</code></span></td><td>Image-local loading-bar setting; initially true</td></tr>
<tr data-source-row="17"><td class="table-key"><span class="source-link"><code>interrupt_vector_table</code></span></td><td>Five ISR addresses in .ivt</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#93-kernel-global-variables-and-process-list-roots -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.3 Kernel global variables and process-list roots (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-5840 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    H["process_list_head<br/>kernel .data"] --> A["PCB A<br/>kernel heap"]
    A -->|next| B["PCB B<br/>kernel heap"]
    B -->|next| C["PCB C<br/>kernel heap"]
    C -->|next| N["NULL"]
    T["process_list_tail<br/>kernel .data"] --> C
    AP["active_process<br/>kernel .data"] --> B
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#94-wait-requests-and-queue-storage -->

# <MajorSectionLink section="9-kernel-data-structures-relationships-storage-and-lifetimes">9. Kernel data structures: relationships, storage, and lifetimes</MajorSectionLink>

## 9.4 Wait requests and queue storage

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5864 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5864:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:37.29%" /><col style="width:31.50%" /><col style="width:31.21%" /></colgroup><thead><tr><th>Call path</th><th>Request and queue storage</th><th>Retained references and reason</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>sleep(wq)</code></span> → <span class="source-link"><code>sleep_on_wait_queue()</code></span></td><td>Caller queue address directly in IN1</td><td>Retained queue pointer + intrusive PCB links</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>mutex_lock()</code></span> → <span class="source-link"><code>sleep()</code></span></td><td>Embedded mutex.waiters; stack or shared storage</td><td>Kernel writes PCB pointers into caller queue</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>waitpid()</code></span> → <span class="source-link"><code>wait_for_process_by_pid()</code></span> → <span class="source-link"><code>sleep_on_wait_queue()</code></span>, when blocking</td><td>Parent stack request/status; child's embedded waiters</td><td>Retain status pointer; suspended frame stays alive</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>begin_terminal_read()</code></span></td><td>Kernel-global terminal.input_waiters</td><td>PCB retains caller buffer/count for delivery after an input interrupt</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>start_dma_uart_receive()</code></span></td><td>Kernel-global dma_waiters</td><td>Intrusive wait links + persistent load progress</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10-userspace-libraries -->

<div class="eyebrow section-eyebrow">Section 10 · Overview</div>

# 10. Userspace libraries

<SectionOverview section="10-userspace-libraries" />

---

<!-- SOURCE Pico-OS/README.md#10-userspace-libraries -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Local library code or <strong>syscall wrapper</strong></li>
<li><strong>Link dependencies</strong> into user image</li>
<li><strong>Source portability</strong> depends on interface</li>
<li>PicoOS implements <strong>documented subset</strong></li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1011-header-implementation-and-linking -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.1 Header, implementation, and linking

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 180fr) minmax(0, 95fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-5902 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-5902:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:38.83%" /><col style="width:61.17%" /></colgroup><thead><tr><th>File</th><th>Role</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>wait.header</code></span></td><td>Public waitpid declaration</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>wait.picoc</code></span></td><td>Implementation + syscall helper</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>libwait.picoc</code></span></td><td>Compilation unit links wait implementation</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>common/syscall.header</code></span></td><td>Shared request + selector declarations</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-5911 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-5911" data-code-part="1">

<!-- README_CODE_PART code-5911 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
#include "../library/sys/wait/wait.header"

last_command_exit_status = waitpid(pid);
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1012-packing-arguments-and-executing-the-syscall -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.2 Packing arguments and executing the syscall

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-5932+code-5943" style="--readme-columns:minmax(0, 45fr) minmax(0, 55fr);">

<!-- README_ASSET code-5932 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-5932" data-code-part="1">

<!-- README_CODE_PART code-5932 lines=1-4 -->
<div class="readme-code">

```c {lines:false}
struct WaitPidRequest {
    int pid;
    int *status;
};
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-5943 -->
<ReadmeVisual kind="code" :width="513.3333333333333" data-code-source="code-5943" data-code-part="1">

<!-- README_CODE_PART code-5943 lines=1-9 -->
<div class="readme-code">

```c {lines:false}
int invoke_waitpid_syscall(int number, int argument) {
    int result;

    asm("LOADIN BAF ACC 3");
    asm("LOADIN BAF IN1 4");
    asm("INT 0");
    asm("STOREIN BAF IN2 0");
    return result;
}
```

</div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>waitpid / POSIX</b><ul><li><strong>PicoOS:</strong> one PID; returns child status</li>
<li><strong>POSIX:</strong> output parameter + options</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#1013-interrupt-entry-waiting-and-return -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.1 From a library call to the kernel: waitpid

## 10.1.3 Interrupt entry, waiting, and return

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-5970 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-5970" data-code-part="1">

<!-- README_CODE_PART code-5970 lines=1-6 -->
<div class="readme-code">

```c {lines:false}
} else if (syscall_number == SYSCALL_WAITPID) {
        return wait_for_process_by_pid(
            (struct WaitPidRequest *)argument,
            caller_context
        );
    }
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#102-library-overview-and-dependencies -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink>

## 10.2 Library overview and dependencies

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-5997 -->
<ReadmeVisual kind="table" :width="1440" class="inventory-grid library-grid">

<div class="readme-tiles" v-pre><div class="readme-tile"><div class="tile-name"><span class="source-link"><code>unistd</code></span></div><div class="tile-detail"><ul><li>Processes + descriptors</li><li>Paths + wait queues</li></ul></div><div class="tile-detail">stdlib: environment</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>fcntl</code></span></div><div class="tile-detail">Open/create files</div><div class="tile-detail">unistd syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/wait</code></span></div><div class="tile-detail">Child wait/stop status</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>mutex</code></span></div><div class="tile-detail">Atomic lock + wait queue</div><div class="tile-detail">unistd wait queues</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/mman</code></span></div><div class="tile-detail">Named shared memory</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>dirent</code></span></div><div class="tile-detail">Directory streams</div><div class="tile-detail">unistd + stdlib</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>stdlib</code></span></div><div class="tile-detail"><ul><li>Heap + environment</li><li>Conversion + exit</li></ul></div><div class="tile-detail">common/heap.picoc</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>string</code></span></div><div class="tile-detail">Copy, compare, length</div><div class="tile-detail">common/string.picoc</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>stdio</code></span></div><div class="tile-detail">Streams, formatting, scanning</div><div class="tile-detail"><ul><li>common/decimal.picoc</li><li>Syscall helper</li></ul></div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>start</code></span></div><div class="tile-detail">Entry + runtime initialization</div><div class="tile-detail">stdlib</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>schedule</code></span></div><div class="tile-detail">Voluntary scheduling</div><div class="tile-detail">Inline syscall</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>signal</code></span></div><div class="tile-detail">Signal delivery</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/prctl</code></span></div><div class="tile-detail">Parent-death signal</div><div class="tile-detail">Own syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/reboot</code></span></div><div class="tile-detail">Restart + power-off</div><div class="tile-detail">unistd syscall helper</div></div>
<div class="readme-tile"><div class="tile-name"><span class="source-link"><code>sys/stat</code></span></div><div class="tile-detail">Directory creation</div><div class="tile-detail">unistd syscall helper</div></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10211-process-operations-in-processpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.1 Process operations in `process.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6036 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6036:1,2,3,4,5,6,7">

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

<!-- SOURCE Pico-OS/README.md#10212-descriptor-operations-in-iopicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.2 Descriptor operations in `io.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6056 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6056:1,2,3,4,5,6">

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

<!-- SOURCE Pico-OS/README.md#10213-working-directory-operations-in-working_directorypicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.3 Working-directory operations in `working_directory.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6071 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6071:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.33%" /><col style="width:44.34%" /><col style="width:31.33%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>chdir()</code></td><td>Change process working directory</td><td><ul><li><code>CHDIR</code></li><li>Host: <code>is-directory</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>getcwd()</code></td><td>Copy directory; buffer or NULL</td><td><code>GETCWD</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10214-path-operations-in-file_removalpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.4 Path operations in `file_removal.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6081 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6081:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.49%" /><col style="width:42.50%" /><col style="width:32.01%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>unlink()</code></td><td>Remove file; return host status</td><td><ul><li><code>UNLINK</code></li><li>Host: <code>unlink</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>rmdir()</code></td><td>Remove empty directory</td><td><ul><li><code>RMDIR</code></li><li>Host: <code>rmdir</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>move()</code></td><td>Move/rename path</td><td><ul><li><code>MOVE</code></li><li>Host: <code>move</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>touch()</code></td><td>Create or update timestamps</td><td><ul><li><code>TOUCH</code></li><li>Host: <code>touch</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10215-wait-queue-operations-in-blockingpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.1 unistd: processes, descriptors, paths, and wait queues

## 10.2.1.5 Wait-queue operations in `blocking.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6094 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6094:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:32.41%" /><col style="width:42.01%" /><col style="width:25.58%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>wait_queue_init()</code></td><td>Clear FIFO head + tail</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>sleep()</code></td><td>Queue caller; suspend execution</td><td><code>SLEEP</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>wakeup()</code></td><td>Wake at most one waiter</td><td><code>WAKEUP</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1022-fcntl-opening-and-creating-files -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.2 fcntl: opening and creating files

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6106 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6106:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:20.57%" /><col style="width:36.28%" /><col style="width:43.15%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>open()</code></td><td>Lowest free descriptor; −1 on error</td><td><ul><li><code>OPEN</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write</code></li><li>Host: <code>write stdout</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>creat()</code></td><td>Write + create + truncate</td><td><ul><li><code>OPEN</code></li><li>Host: <code>write</code></li><li>Host: <code>write stdout</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1023-syswait-waiting-for-children -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.3 sys/wait: waiting for children

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6117 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6117:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.72%" /><col style="width:46.72%" /><col style="width:26.56%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>waitpid()</code></td><td>Child exit/stopped status; −1 on error</td><td><code>WAITPID</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>WIFSTOPPED()</code></td><td>Test stopped-status encoding</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1024-mutex-locking-and-waking-contenders -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.4 mutex: locking and waking contenders

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6127 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6127:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.72%" /><col style="width:45.37%" /><col style="width:25.91%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>testset()</code></td><td>Atomic old value; store 1</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>mutex_init()</code></td><td>Clear lock + initialize wait queue</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>mutex_lock()</code></td><td>Acquire; sleep/retry on contention</td><td><code>SLEEP</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>mutex_unlock()</code></td><td>Clear lock; wake one contender</td><td><code>WAKEUP</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1025-sysmman-named-shared-memory -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.5 sys/mman: named shared memory

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6144 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6144:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.45%" /><col style="width:44.62%" /><col style="width:26.93%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>shm_open()</code></td><td>Named entry ID or −1</td><td><code>SHM_OPEN</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>mmap()</code></td><td>Attach; shared address or NULL</td><td><code>MMAP</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>shm_unlink()</code></td><td>Unlink name; defer destruction</td><td><code>SHM_UNLINK</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1026-dirent-directory-streams -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.6 dirent: directory streams (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6156 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6156" data-code-part="1">

<!-- README_CODE_PART code-6156 lines=1-11 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1026-dirent-directory-streams -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.6 dirent: directory streams (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:table-6174+table-6186" style="--readme-columns:minmax(0, 44fr) minmax(0, 56fr);">

<!-- README_ASSET table-6174 -->
<ReadmeVisual kind="table" :width="704" data-table-key="table-6174:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:46.74%" /><col style="width:53.26%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>DirectoryStream.contents</code></span></td><td>Owned 512-cell listing buffer</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>DirectoryStream.length</code></span></td><td>Listing length without terminator</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>DirectoryStream.offset</code></span></td><td>Next listing record</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>DirectoryStream.entry</code></span></td><td>Embedded, reused directory-entry result</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>dirent.d_type</code></span></td><td>Directory or regular-file type</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>dirent.d_name</code></span></td><td>Terminated name; 127-character limit</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-6186 -->
<ReadmeVisual kind="table" :width="896" data-table-key="table-6186:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.29%" /><col style="width:32.62%" /><col style="width:48.09%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>opendir()</code></td><td>Allocate stream + fetch listing</td><td><ul><li><code>READ_DIRECTORY</code></li><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>ls</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>readdir()</code></td><td>Reuse entry; NULL at end</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>closedir()</code></td><td>Free buffer + stream</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10271-heap-operations-in-mallocpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.1 Heap operations in `malloc.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6206 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6206:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.67%" /><col style="width:31.39%" /><col style="width:32.94%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>require_process_heap_allocation()</code></td><td>Positive failure → heap-full syscall</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>init_process_heap()</code></td><td>Initialize process-local heap</td><td><ul><li><code>PROCESS_HEAP_START</code></li><li><code>PROCESS_HEAP_SIZE</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>malloc()</code></td><td><ul><li>First-fit process allocation</li><li>Positive failure → terminate</li></ul></td><td><code>PROCESS_HEAP_FULL</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>realloc()</code></td><td><ul><li>Resize/move process allocation</li><li>Size 0 → free</li></ul></td><td><code>PROCESS_HEAP_FULL</code></td></tr>
<tr data-source-row="5"><td class="table-key"><code>free()</code></td><td>Free + coalesce process blocks</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10272-decimal-conversion-in-atoipicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.2 Decimal conversion in `atoi.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6220 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6220:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.86%" /><col style="width:38.86%" /><col style="width:35.28%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>atoi()</code></td><td>Convert signed decimal text</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10273-environment-operations-in-envpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.3 Environment operations in `env.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6230 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-6230:1,2,3,4,5,6,7,8,9,10,11,12">

<div class="table-panels table-panels-two" data-column-key="table:table-6230:1,2,3,4,5,6,7,8,9,10,11,12" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:48.00%" /><col style="width:30.31%" /><col style="width:21.69%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>getenv()</code></td><td>Value pointer or NULL</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>current_environment()</code></td><td>Process-global environ pointer</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>copy_environment_variable()</code></td><td>Allocate string copy</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>store_environment_variable()</code></td><td>Add/replace environment entry</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>initialize_environment()</code></td><td>Copy inherited environment</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>setenv()</code></td><td>Add/replace NAME=value</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:48.00%" /><col style="width:30.31%" /><col style="width:21.69%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="7"><td class="table-key"><code>unsetenv()</code></td><td>Remove entry; compact pointer array</td><td>Local code; no syscall</td></tr>
<tr data-source-row="8"><td class="table-key"><code>putenv()</code></td><td>Copy NAME=value; require =</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><code>clearenv()</code></td><td>Free strings; retain empty array</td><td>Local code; no syscall</td></tr>
<tr data-source-row="10"><td class="table-key"><code>clone_environment()</code></td><td>Deep-copy environment</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><code>destroy_environment()</code></td><td>Free cloned strings + array</td><td>Local code; no syscall</td></tr>
<tr data-source-row="12"><td class="table-key"><code>restore_environment()</code></td><td>Recreate current environment</td><td><ul><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10274-process-exit-in-exitpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.7 stdlib: process heap, environment, conversion, and exit

## 10.2.7.4 Process exit in `exit.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6255 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6255:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:26.93%" /><col style="width:46.14%" /><col style="width:26.93%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>exit()</code></td><td>Terminate with status; no return</td><td><code>EXIT</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1028-string-copying-comparison-and-length -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.8 string: copying, comparison, and length

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6266 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6266:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:23.27%" /><col style="width:43.89%" /><col style="width:32.84%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>strcpy()</code></td><td>Copy terminated string; return destination</td><td>Local code; no syscall</td></tr>
<tr data-source-row="2"><td class="table-key"><code>strcat()</code></td><td>Append string; return destination</td><td>Local code; no syscall</td></tr>
<tr data-source-row="3"><td class="table-key"><code>strcmp()</code></td><td>First unequal cell difference</td><td>Local code; no syscall</td></tr>
<tr data-source-row="4"><td class="table-key"><code>strncmp()</code></td><td>Compare at most count cells</td><td>Local code; no syscall</td></tr>
<tr data-source-row="5"><td class="table-key"><code>strlen()</code></td><td>Cells before terminator</td><td>Local code; no syscall</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1029-stdio-streams-formatting-and-scanning -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.9 stdio: streams, formatting, and scanning

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 95fr) minmax(0, 69fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-6280 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6280" data-code-part="1">

<!-- README_CODE_PART code-6280 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
struct PicoFile {
    int file_descriptor;
};
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-6291 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6291:1">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.79%" /><col style="width:50.21%" /></colgroup><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>PicoFile.file_descriptor</code></span></td><td>Current process descriptor number</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10291-streams-and-output-in-stdiopicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.9 stdio: streams, formatting, and scanning

## 10.2.9.1 Streams and output in `stdio.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6304 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-6304:1,2,3,4,5,6,7,8,9,10,11,12">

<div class="table-panels table-panels-two" data-column-key="table:table-6304:1,2,3,4,5,6,7,8,9,10,11,12" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:33.00%" /><col style="width:20.60%" /><col style="width:46.40%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>standard_input()</code></td><td>Process-global stdin stream</td><td><code>FILE_DESCRIPTORS_AVAILABLE</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>standard_output()</code></td><td>Process-global stdout stream</td><td><code>FILE_DESCRIPTORS_AVAILABLE</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>standard_error()</code></td><td>Process-global stderr stream</td><td><code>FILE_DESCRIPTORS_AVAILABLE</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>fopen()</code></td><td>Stream slot or NULL; r/w/a/+</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>OPEN</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write</code></li><li>Host: <code>write stdout</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>fclose()</code></td><td>Close + release stream slot</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>CLOSE</code></li></ul></td></tr>
<tr data-source-row="6"><td class="table-key"><code>fgetc()</code></td><td>Character or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr></tbody></table></div>
<div class="readme-table"><table><colgroup><col style="width:33.00%" /><col style="width:20.60%" /><col style="width:46.40%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="7"><td class="table-key"><code>fputc()</code></td><td>Written character or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="8"><td class="table-key"><code>fputs()</code></td><td>Written count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="9"><td class="table-key"><code>write_decimal()</code></td><td>Print decimal; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="10"><td class="table-key"><code>format_stream()</code></td><td>Format arguments; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="11"><td class="table-key"><code>fprintf()</code></td><td>Formatted stream output; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr>
<tr data-source-row="12"><td class="table-key"><code>printf()</code></td><td>Formatted stdout output; count or −1</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>WRITE</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li><li>Host: <code>literal-output</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Variadic ABI</b><ul><li><strong>printf/fprintf:</strong> stack-based arguments</li>
<li>Same PicoC frame convention</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#10292-scanning-in-scanfpicoc -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies · 10.2.9 stdio: streams, formatting, and scanning

## 10.2.9.2 Scanning in `scanf.picoc`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6331 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6331:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:19.13%" /><col style="width:36.72%" /><col style="width:44.15%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>read_input()</code></td><td>Pushback character or stdin byte</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>skip_whitespace()</code></td><td>Skip spaces; save following character</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="3"><td class="table-key"><code>read_decimal()</code></td><td>Parse signed decimal into target</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="4"><td class="table-key"><code>read_string()</code></td><td>Parse nonempty whitespace-delimited string</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><code>scanf()</code></td><td>Number of assigned arguments</td><td><ul><li><code>FILE_DESCRIPTORS_AVAILABLE</code></li><li><code>READ</code></li><li>Host: <code>read-range</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10210-start-entering-and-leaving-a-user-program -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.10 start: entering and leaving a user program

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6346 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6346:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:21.17%" /><col style="width:29.67%" /><col style="width:49.16%" /></colgroup><thead><tr><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>_start()</code></td><td>Naked entry → start_process</td><td><ul><li><code>PROCESS_HEAP_START</code></li><li><code>PROCESS_HEAP_SIZE</code></li><li><code>EXIT</code></li><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr>
<tr data-source-row="2"><td class="table-key"><code>start_process()</code></td><td><ul><li>Initialize heap + environment</li><li>main → exit(status)</li></ul></td><td><ul><li><code>PROCESS_HEAP_START</code></li><li><code>PROCESS_HEAP_SIZE</code></li><li><code>EXIT</code></li><li><code>PROCESS_HEAP_FULL</code></li><li>Host: <code>write-at</code></li><li>Host: <code>write stdout</code></li><li>Host: <code>file-size</code></li><li>Host: <code>write stderr</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#10211-single-function-libraries -->

# <MajorSectionLink section="10-userspace-libraries">10. Userspace libraries</MajorSectionLink> · 10.2 Library overview and dependencies

## 10.2.11 Single-function libraries

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6358 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6358:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.80%" /><col style="width:24.62%" /><col style="width:41.30%" /><col style="width:16.28%" /></colgroup><thead><tr><th>Library</th><th>Library function</th><th>Purpose / result</th><th>Syscalls / host</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>schedule</code></span></td><td><span class="source-link"><code>yield(void)</code></span></td><td>Voluntarily saves the current activation and schedules another runnable process</td><td><code>YIELD</code></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>signal</code></span></td><td><span class="source-link"><code>kill(pid, signal_number)</code></span></td><td><ul><li>0 / −1</li><li>Signal 0: existence probe</li></ul></td><td><code>KILL</code></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>sys/prctl</code></span></td><td><span class="source-link"><code>prctl(option, argument)</code></span></td><td>0 or <code>-1</code>. Supports <span class="source-link"><code>PR_SET_PDEATHSIG</code></span></td><td><code>PRCTL</code></td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>sys/reboot</code></span></td><td><span class="source-link"><code>reboot(command)</code></span></td><td>Restart/power-off: no return; otherwise −1</td><td><ul><li><code>REBOOT</code></li><li><code>SHUTDOWN</code></li></ul></td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>sys/stat</code></span></td><td><span class="source-link"><code>mkdir(path)</code></span></td><td>0 success; −1 path/host error</td><td><ul><li><code>MKDIR</code></li><li>Host: <code>mkdir</code></li></ul></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#11-complete-startup-bootloader-kernel-init-shell-and-user-applications -->

<div class="eyebrow section-eyebrow">Section 11 · Overview</div>

# 11. Complete startup: bootloader, kernel, init, shell, and user applications

<SectionOverview section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications" />

---

<!-- SOURCE Pico-OS/README.md#11-complete-startup-bootloader-kernel-init-shell-and-user-applications -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-6386 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
%%{init: {"sequence": {"height": 90}, "themeCSS": "rect { rx: 0 !important; ry: 0 !important; }"}}%%
sequenceDiagram
    box rgb(232, 248, 248) EPROM
        participant B as Bootloader<br/>.text and .data
    end
    box rgb(255, 248, 237) Kernel-reserved SRAM
        participant K as Kernel image<br/>0–41496<br/>.ivt: 0–4<br/>.text from 5<br/>.data from 40766
        participant KH as Kernel heap<br/>41497–45592
        participant KS as Kernel stack<br/>45593–48308
    end
    box rgb(239, 252, 242) Process and Shared Data Heap
        participant I as Init image<br/>libstart startup
        participant SH as Shell image<br/>libstart startup
        participant A as Application A<br/>libstart startup
        participant C as Application B<br/>libstart startup
    end
    B->>K: boot_main loads the kernel payload at SRAM offset 0
    B-->>KS: start_loaded_kernel sets SP and BAF from stack_start
    B-->>K: MOVE CS PC transfers control to kernel _start
    K->>KS: main calls activate_kernel_stack_boundary
    K->>KH: main calls init_kernel_heap, then heap_init_region
    K->>I: load_process loads init
    I->>SH: init loads the shell
    SH->>A: shell loads application A
    SH->>C: shell loads application B
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#11-complete-startup-bootloader-kernel-init-shell-and-user-applications -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6428 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6428:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:24.39%" /><col style="width:35.21%" /><col style="width:40.40%" /></colgroup><thead><tr><th>Component</th><th>Startup implementation</th><th>Execution path</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Bootloader</td><td>Explicit naked _start</td><td>boot_main → load kernel → jump</td></tr>
<tr data-source-row="2"><td class="table-key">Kernel</td><td>Generated default _start</td><td>main → init subsystems → dispatch</td></tr>
<tr data-source-row="3"><td class="table-key">Init process</td><td>libstart; custom -C</td><td>_start → heap/env → main → exit</td></tr>
<tr data-source-row="4"><td class="table-key">Shell</td><td>libstart; custom -C</td><td>_start → heap/env → main → exit</td></tr>
<tr data-source-row="5"><td class="table-key">User applications</td><td>libstart; custom -C</td><td>_start → heap/env → main → exit</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6447 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6447:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:25.89%" /><col style="width:18.30%" /><col style="width:18.05%" /><col style="width:19.64%" /><col style="width:18.12%" /></colgroup><thead><tr><th>Bootloader function</th><th>Result</th><th>Effects</th><th>Calls</th><th>Called by</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>_start(void)</code></span></td><td>Naked entry → start_process</td><td>Install EPROM CS/DS + temporary SRAM stack</td><td>Jumps to <span class="source-link"><code>boot_main()</code></span></td><td><strong>Machine entry:</strong> PC 0 at boot. Kernel <span class="source-link"><code>reboot()</code></span></td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>boot_main(void)</code></span></td><td>Load kernel; install segments; transfer control</td><td>Read five-word header; copy kernel payload</td><td><ul><li>UART host load; receive words</li><li>Copy to SRAM; jump to kernel</li></ul></td><td><strong>Bootloader functions:</strong> <span class="source-link"><code>_start()</code></span></td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>start_loaded_kernel(void)</code></span></td><td>Does not return</td><td>Relative → absolute segments; replace boot stack</td><td>Jumps to the generated kernel <span class="source-link"><code>_start</code></span>, which calls <span class="source-link"><code>main()</code></span></td><td><strong>Bootloader functions:</strong> <span class="source-link"><code>boot_main()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6456 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6456" data-code-part="1">

<!-- README_CODE_PART code-6456 lines=1-11 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6474 -->
<div class="code-columns" data-column-key="code:code-6474" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);--source-aspect:3.477894736842105">

<ReadmeVisual kind="code" :width="814" data-code-source="code-6474" data-code-part="1">

<!-- README_CODE_PART code-6474 lines=1-21 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="814" data-code-source="code-6474" data-code-part="2">

<!-- README_CODE_PART code-6474 lines=22-42 -->
<div class="readme-code">

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

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#111-loading-the-kernel-from-the-eprom-bootloader -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.1 Loading the kernel from the EPROM bootloader (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6522 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6522" data-code-part="1">

<!-- README_CODE_PART code-6522 lines=1-20 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#112-kernel-startup -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.2 Kernel startup

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 114fr) minmax(0, 243fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-1050 repeated -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-1050" data-code-part="1">

<!-- README_CODE_PART code-1050 lines=1-4 -->
<div class="readme-code">

```c {lines:false}
void _start(void) {
    main();
    Exit(0);
}
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-6561 -->
<div class="code-columns" data-column-key="code:code-6561" style="--readme-columns:minmax(0, 40fr) minmax(0, 60fr);--source-aspect:3.7552447552447554">

<ReadmeVisual kind="code" :width="420" data-code-source="code-6561" data-code-part="1">

<!-- README_CODE_PART code-6561 lines=1-12 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="630" data-code-source="code-6561" data-code-part="2">

<!-- README_CODE_PART code-6561 lines=13-24 -->
<div class="readme-code">

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

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1121-loading-init-and-entering-normal-execution -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.2 Kernel startup

## 11.2.1 Loading init and entering normal execution

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6612 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6612" data-code-part="1">

<!-- README_CODE_PART code-6612 lines=1-15 -->
<div class="readme-code">

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

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#113-init-process -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink>

## 11.3 Init process

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1072+code-1081" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1072 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1072" data-code-part="1">

<!-- README_CODE_PART code-1072 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1081 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1081" data-code-part="1">

<!-- README_CODE_PART code-1081 lines=1-16 -->
<div class="readme-code">

```c {lines:false}
#include "../stdlib/stdlib.header"
#include "../unistd/unistd.header"

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

<!-- SOURCE Pico-OS/README.md#1131-init-responsibilities -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.1 Init responsibilities

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6648 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6648:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:31.19%" /><col style="width:68.81%" /></colgroup><thead><tr><th>Component</th><th>Responsibility</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Kernel <span class="source-link"><code>main()</code></span></td><td>Initialize subsystems + dispatch</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>Init</code></span></td><td>Configure environment; supervise shell</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>Shell</code></span></td><td>Terminal ownership + command execution</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>Init / PID 1</b><ul><li>Environment → shell → wait → repeat</li>
<li>Userspace supervisor</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#1132-initial-environment-configuration -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.2 Initial environment configuration

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6666 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6666:1,2,3">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:33.04%" /><col style="width:28.98%" /><col style="width:37.99%" /></colgroup><thead><tr><th>Init function</th><th>Result</th><th>Library functions</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>init_write_error(text)</code></span></td><td>No value</td><td>write → stderr diagnostic</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>read_environment(void)</code></span></td><td>Read /config environment</td><td>Read config; setenv; release buffers</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>main(void)</code></span></td><td>Setup/launch failure → 1; otherwise supervises</td><td><span class="source-link"><code>setenv()</code></span>, <span class="source-link"><code>load()</code></span>, <span class="source-link"><code>run()</code></span>, and exact-child <span class="source-link"><code>waitpid()</code></span></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1133-loading-starting-and-waiting-for-the-shell -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.3 Loading, starting, and waiting for the shell

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6681 -->
<div class="code-columns" data-column-key="code:code-6681" style="--readme-columns:minmax(0, 54fr) minmax(0, 46fr);--source-aspect:3.432667450058754">

<ReadmeVisual kind="code" :width="672.8869565217391" data-code-source="code-6681" data-code-part="1">

<!-- README_CODE_PART code-6681 lines=1-16 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="573.1999999999999" data-code-source="code-6681" data-code-part="2">

<!-- README_CODE_PART code-6681 lines=17-32 -->
<div class="readme-code">

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

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1134-shell-startup -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.4 Shell startup

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1072+code-1081" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1072 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1072" data-code-part="1">

<!-- README_CODE_PART code-1072 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1081 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1081" data-code-part="1">

<!-- README_CODE_PART code-1081 lines=1-16 -->
<div class="readme-code">

```c {lines:false}
#include "../stdlib/stdlib.header"
#include "../unistd/unistd.header"

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

<!-- SOURCE Pico-OS/README.md#1135-loading-user-applications -->

# <MajorSectionLink section="11-complete-startup-bootloader-kernel-init-shell-and-user-applications">11. Complete startup: bootloader, kernel, init, shell, and user applications</MajorSectionLink> · 11.3 Init process

## 11.3.5 Loading user applications

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-1072+code-1081" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-1072 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1072" data-code-part="1">

<!-- README_CODE_PART code-1072 lines=1-3 -->
<div class="readme-code">

```c {lines:false}
// dependencies: ../stdlib/libstdlib.reti_blocks

#include "start.picoc"
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-1081 repeated -->
<ReadmeVisual kind="code" :width="470" data-code-source="code-1081" data-code-part="1">

<!-- README_CODE_PART code-1081 lines=1-16 -->
<div class="readme-code">

```c {lines:false}
#include "../stdlib/stdlib.header"
#include "../unistd/unistd.header"

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

<!-- SOURCE Pico-OS/README.md#12-shell -->

<div class="eyebrow section-eyebrow">Section 12 · Overview</div>

# 12. Shell

<SectionOverview section="12-shell" />

---

<!-- SOURCE Pico-OS/README.md#121-shell-owned-state -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.1 Shell-owned state (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6793 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-6793:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels table-panels-two" data-column-key="table:table-6793:1,2,3,4,5,6,7,8,9,10" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:45.34%" /><col style="width:54.66%" /></colgroup><thead><tr><th>Global</th><th>Meaning and storage</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><span class="source-link"><code>last_command_exit_status</code></span></td><td>$? status integer</td></tr>
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

</div>

---

<!-- SOURCE Pico-OS/README.md#121-shell-owned-state -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.1 Shell-owned state (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-6811 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    subgraph UI["shell Process Payload"]
        subgraph DATA[".data: storage exists for the shell's lifetime"]
            IB["shell_input_buffer[128]<br/>bytes stored inline"]
            IX["shell_input_index"]
            CT["shell_input_count"]
            HS["history and pipeline arrays<br/>also stored inline"]
        end
        subgraph STACK["main() stack frame"]
            CMD["command[80]<br/>current editable line"]
        end
    end
    subgraph KH["kernel heap"]
        PCB["shell Process"] --> FDT["FileDescriptorTable"]
        FDT --> ENTRIES["entries → 8-descriptor array"]
    end
    IX -->|"next byte"| IB
    CT -->|"valid prefix length"| IB
    IB -->|"read_line copies one byte at a time"| CMD
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#122-shell-startup-and-command-loop -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.2 Shell startup and command loop (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6850 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6850:1,2">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:12.17%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:7.90%" /><col style="width:16.27%" /><col style="width:16.27%" /></colgroup><thead><tr><th>Buffer state</th><th>Cell 0</th><th>Cell 1</th><th>Cell 2</th><th>Cell 3</th><th>Cell 4</th><th>Cell 5</th><th>Cell 6</th><th>shell_input_index</th><th>shell_input_count</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">After <span class="source-link"><code>read()</code></span></td><td><code>p</code></td><td><code>w</code></td><td><code>d</code></td><td><code>\n</code></td><td><code>l</code></td><td><code>s</code></td><td><code>\n</code></td><td>0</td><td>7</td></tr>
<tr data-source-row="2"><td class="table-key">After <span class="source-link"><code>read_line()</code></span> returns <code>pwd</code></td><td><code>p</code></td><td><code>w</code></td><td><code>d</code></td><td><code>\n</code></td><td><code>l</code></td><td><code>s</code></td><td><code>\n</code></td><td>4</td><td>7</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#122-shell-startup-and-command-loop -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.2 Shell startup and command loop (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6859 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6859" data-code-part="1">

<!-- README_CODE_PART code-6859 lines=1-17 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#122-shell-startup-and-command-loop -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.2 Shell startup and command loop (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6881 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6881:1,2,3,4,5,6,7,8,9">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#123-interactive-line-editing-and-command-history -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.3 Interactive line editing and command history (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6900 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-6900:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels table-panels-two" data-column-key="table:table-6900:1,2,3,4,5,6,7,8,9,10" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:22.82%" /><col style="width:37.85%" /><col style="width:39.33%" /></colgroup><thead><tr><th>Input</th><th>Shell behavior</th><th>Implementation</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Line feed or carriage return</td><td>Echo one newline and finish the command</td><td><span class="source-link"><code>read_line()</code></span> calls <span class="source-link"><code>shell_write_character()</code></span> and ends its loop</td></tr>
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

</div>

---

<!-- SOURCE Pico-OS/README.md#123-interactive-line-editing-and-command-history -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.3 Interactive line editing and command history (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-6915 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-6915" data-code-part="1">

<!-- README_CODE_PART code-6915 lines=1-19 -->
<div class="readme-code">

```c {lines:false}
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

/* ... inside the ordinary-character branch ... */
if (character == SHELL_CTRL_U) {
    length = erase_shell_line_suffix(length, 0);
} else if (character == SHELL_CTRL_W) {
    /* scan backward over whitespace and the preceding word */
    length = erase_shell_line_suffix(length, retained_length);
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#124-command-parsing-expansion-and-execution -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.4 Command parsing, expansion, and execution

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6958 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-6958:1,2,3,4,5,6,7">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:30.40%" /><col style="width:31.28%" /><col style="width:38.33%" /></colgroup><thead><tr><th>Stage</th><th>Result</th><th>What changed</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Input</td><td>Original command + redirection + &amp;</td><td>Nothing yet</td></tr>
<tr data-source-row="2"><td class="table-key"><span class="source-link"><code>strip_background_operator()</code></span></td><td>Trailing &amp; removed; background=true</td><td>Removed only the trailing <code>&amp;</code> and adjacent whitespace</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>strip_command_redirections()</code></span></td><td>Command prefix + stdout_path</td><td>Split final &gt;; path stays unexpanded</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>command_arguments()</code></span></td><td>Separated name + raw arguments</td><td>Terminate name; retain raw argument suffix</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>load_from_path()</code></span></td><td>/user/echo.bin; NEW PID</td><td>Used <code>PATH</code>. This step does <strong>not</strong> copy descriptors</td></tr>
<tr data-source-row="6"><td class="table-key"><span class="source-link"><code>expand_variables()</code></span></td><td>&quot;hello Ada (0)&quot;; quotes retained</td><td>Replaced <code>$NAME</code> and <code>$?</code>, deliberately retaining quote bytes</td></tr>
<tr data-source-row="7"><td class="table-key"><span class="source-link"><code>run()</code></span></td><td>argv[1] = hello Ada (0)</td><td>Strip matching quotes; inherit FDs; READY</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#125-shell-built-in-commands -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.5 Shell built-in commands

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-6992 -->
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

</div>

---

<!-- SOURCE Pico-OS/README.md#1251-foreground-processes-background-processes-and-job-control-signals -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink> · 12.5 Shell built-in commands

## 12.5.1 Foreground processes, background processes, and job-control signals (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7019 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-7019" data-code-part="1">

<!-- README_CODE_PART code-7019 lines=1-19 -->
<div class="readme-code">

```c {lines:false}
started = run(pid, expand_variables(
                       arguments,
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
    /* report status and remember a stopped pid */
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1251-foreground-processes-background-processes-and-job-control-signals -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink> · 12.5 Shell built-in commands

## 12.5.1 Foreground processes, background processes, and job-control signals (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7044 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-7044" data-code-part="1">

<!-- README_CODE_PART code-7044 lines=1-17 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7116 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7116:1,2,3,4,5,6,7,8">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:17.53%" /><col style="width:15.25%" /><col style="width:14.49%" /><col style="width:14.47%" /><col style="width:23.02%" /><col style="width:15.25%" /></colgroup><thead><tr><th>Descriptor</th><th>Initial shell</th><th>Open 3; save 1 → 6</th><th>3 → 1; close 3</th><th>Child after run</th><th>Restore 6 → 1; close 6</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">0</td><td><code>T-in</code></td><td><code>T-in</code></td><td><code>T-in</code></td><td>T-in copy</td><td><code>T-in</code></td></tr>
<tr data-source-row="2"><td class="table-key">1</td><td><code>T-out</code></td><td><code>T-out</code></td><td><code>OUT</code></td><td>OUT copy</td><td><code>T-out</code></td></tr>
<tr data-source-row="3"><td class="table-key">2</td><td><code>T-err</code></td><td><code>T-err</code></td><td><code>T-err</code></td><td>T-err copy</td><td><code>T-err</code></td></tr>
<tr data-source-row="4"><td class="table-key">3</td><td>free</td><td><code>OUT</code> opened here</td><td>free</td><td>free</td><td>free</td></tr>
<tr data-source-row="5"><td class="table-key">4</td><td>free</td><td>free</td><td>free</td><td>free</td><td>free</td></tr>
<tr data-source-row="6"><td class="table-key">5</td><td>free</td><td>free</td><td>free</td><td>free because inheritance never examines it</td><td>free</td></tr>
<tr data-source-row="7"><td class="table-key">6</td><td>free</td><td>saved <code>T-out</code> copy</td><td>saved <code>T-out</code> copy</td><td>free because inheritance never examines it</td><td>free</td></tr>
<tr data-source-row="8"><td class="table-key">7</td><td>free</td><td>free</td><td>free</td><td>free because inheritance never examines it</td><td>free</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>
<aside class="context-note"><b>fork + exec / load + run</b><ul><li><strong>Unix:</strong> redirect forked child</li>
<li><strong>PicoOS:</strong> redirect shell; copy; restore</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-7130 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TB
    subgraph SAVE["2. shell saves its stdout"]
        S3["fd 3: OUT (open happened first)"]
        S1["fd 1: T-out"] -->|"dup2(1, 6)"| S6["fd 6: saved T-out"]
    end

    subgraph REDIRECT["3. shell installs OUT"]
        O3["fd 3: OUT from open()"] -->|"dup2(3, 1)"| O1["fd 1: OUT"]
        O3 -->|"close(3)"| OF["fd 3: free"]
    end

    subgraph RUN["4. run(): shell and child tables are different allocations"]
        direction LR
        subgraph ST["shell table"]
            ST0["0: T-in"]
            ST1["1: OUT"]
            ST2["2: T-err"]
            ST34["3–4: free (or opened FILE entries)"]
            ST57["5: free · 6: saved T-out · 7: free"]
        end
        subgraph CT["new child table"]
            CT0["0: T-in copy"]
            CT1["1: OUT copy"]
            CT2["2: T-err copy"]
            CT34["3–4: FILE copies or free"]
            CT57["5–7: free"]
        end
        ST0 -->|"always copied"| CT0
        ST1 -->|"always copied"| CT1
        ST2 -->|"always copied"| CT2
        ST34 -->|"copy only FILE entries"| CT34
        ST57 -. "not examined" .-> CT57
    end

    subgraph RESTORE["5. shell restores itself while the child remains unchanged"]
        R6["shell fd 6: saved T-out"] -->|"dup2(6, 1)"| R1["shell fd 1: T-out"]
        R6 -->|"close(6)"| RF["shell fd 6: free"]
        C1["child fd 1: OUT"] --> KEEP["continues to name OUT"]
    end

    SAVE --> REDIRECT --> RUN --> RESTORE
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7176 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-7176" data-code-part="1">

<!-- README_CODE_PART code-7176 lines=1-20 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (4)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7205 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7205:1,2,3,4,5,6,7">

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

<!-- SOURCE Pico-OS/README.md#126-inputoutput-redirection -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.6 Input/output redirection (5)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-7232+code-7257" style="--readme-columns:minmax(0, 53fr) minmax(0, 47fr);">

<!-- README_ASSET code-7232 -->
<ReadmeVisual kind="code" :width="581.8" data-code-source="code-7232" data-code-part="1">

<!-- README_CODE_PART code-7232 lines=1-15 -->
<div class="readme-code">

```c {lines:false}
opened_file_descriptor = open(path, flags);
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
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-7257 -->
<ReadmeVisual kind="code" :width="515.9358490566037" data-code-source="code-7257" data-code-part="1">

<!-- README_CODE_PART code-7257 lines=1-13 -->
<div class="readme-code">

```c {lines:false}
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
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7287 -->
<div class="code-columns" data-column-key="code:code-7287" style="--readme-columns:minmax(0, 42fr) minmax(0, 58fr);--source-aspect:3.8641509433962264">

<ReadmeVisual kind="code" :width="420" data-code-source="code-7287" data-code-part="1">

<!-- README_CODE_PART code-7287 lines=1-11 -->
<div class="readme-code">

```c {lines:false}
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

<ReadmeVisual kind="code" :width="580" data-code-source="code-7287" data-code-part="2">

<!-- README_CODE_PART code-7287 lines=12-22 -->
<div class="readme-code">

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
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-7314 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TB
    I["input: LEFT | RIGHT > OUT"]
    W["rewrite<br/>LEFT > TMP<br/>RIGHT < TMP > OUT<br/>TMP = .picoos-pipe-&lt;shell-pid&gt;.tmp"]

    subgraph PRODUCER["producer: eval(LEFT > TMP)"]
        P0["shell before setup<br/>0 T-in · 1 T-out · 2 T-err<br/>3 free · 4 free · 5 free · 6 free · 7 free"]
        P1["open(TMP) → 3<br/>1 → 6: dup2(1,6)<br/>3 → 1: dup2(3,1)<br/>close(3)<br/><b>shell:</b> 0 T-in · 1 TMP · 2 T-err · 3 free · 4 free · 5 free · 6 T-out · 7 free"]
        PC["run() copies child table<br/><b>producer:</b> 0 T-in · 1 TMP · 2 T-err<br/>3 free · 4 free · 5 free · 6 free · 7 free"]
        PR["shell immediately restores<br/>6 → 1: dup2(6,1)<br/>close(6)<br/><b>shell:</b> 0 T-in · 1 T-out · 2 T-err<br/>3–7 free"]
        PW["waitpid(producer)<br/>TMP now contains the complete output"]
        P0 --> P1 --> PC --> PR --> PW
    end

    subgraph CONSUMER["consumer: eval(RIGHT < TMP > OUT)"]
        C1["stdout first<br/>open(OUT) → 3<br/>1 → 6<br/>3 → 1<br/>close(3)<br/>stdin next<br/>0 → 5<br/>close(0)<br/>open(TMP) → 0<br/><b>shell:</b> 0 TMP · 1 OUT · 2 T-err · 3 free · 4 free · 5 T-in · 6 T-out · 7 free"]
        CC["run() copies child table<br/><b>consumer:</b> 0 TMP · 1 OUT · 2 T-err<br/>3 free · 4 free · 5 free · 6 free · 7 free"]
        CR["shell immediately restores<br/>5 → 0<br/>close(5)<br/>6 → 1<br/>close(6)<br/><b>shell:</b> 0 T-in · 1 T-out · 2 T-err · 3–7 free"]
        CW["waitpid(consumer)"]
        CU["unlink(TMP)"]
        C1 --> CC --> CR --> CW --> CU
    end

    I --> W --> P0
    PW --> C1
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#127-sequential-file-backed-pipelines -->

# <MajorSectionLink section="12-shell">12. Shell</MajorSectionLink>

## 12.7 Sequential file-backed pipelines (3)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7369 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-7369" data-code-part="1" style="flex:0 0 100px">

<!-- README_CODE_PART code-7369 lines=1-4 -->
<div class="readme-code readme-terminal">

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

<!-- SOURCE Pico-OS/README.md#13-user-applications-and-commands -->

<div class="eyebrow section-eyebrow">Section 13 · Overview</div>

# 13. User applications and commands

<SectionOverview section="13-user-applications-and-commands" />

---

<!-- SOURCE Pico-OS/README.md#131-applications-library-calls-and-host-requests -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink>

## 13.1 Applications, library calls, and host requests (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7397 -->
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

</div>

---

<!-- SOURCE Pico-OS/README.md#131-applications-library-calls-and-host-requests -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink>

## 13.1 Applications, library calls, and host requests (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7397 -->
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

</div>

---

<!-- SOURCE Pico-OS/README.md#1311-command-behavior-and-supported-options -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink> · 13.1 Applications, library calls, and host requests

## 13.1.1 Command behavior and supported options (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-7434 -->
<div class="readme-list bullet-columns"><ul><li><strong>echo:</strong> spaces + newline; expands \n<div class="readme-item"><strong>No -n</strong>; returns 0</div></li>
<li><strong>count:</strong> optional busy-loop delay<div class="readme-item"><strong>Yield</strong> after each value</div></li>
<li><strong>cat:</strong> files/stdin → stdout<div class="readme-item"><strong>64-cell chunks</strong>; terminal editing + Ctrl+D</div></li>
<li><strong>touch:</strong> multiple paths<ul><li><strong>cp/mv:</strong> one source + destination</li>
<li><strong>cp:</strong> 64-cell chunks; ps includes zombies</li></ul></li>
<li><strong>sed:</strong> seekable stdin; no path operand<div class="readme-item">Insert/change/append; <strong>first literal substitution</strong></div></li>
<li><strong>ls:</strong> one directory; -a<ul><li><strong>mkdir:</strong> no -p; <strong>rm:</strong> nonrecursive</li>
<li><strong>rmdir:</strong> empty directories; multiple paths</li></ul></li>
<li><strong>kill:</strong> default SIGKILL; names/numbers<ul><li><strong>Signal 0</strong> probes; zombies rejected</li>
<li>Accepted request → <strong>yield</strong></li></ul></li>
<li><strong>poweroff:</strong> halt; <strong>reboot:</strong> restart<ul><li><strong>uname:</strong> installed version</li>
<li><strong>All three:</strong> no operands</li></ul></li></ul></div>

</div>
<aside class="context-note"><b>Unix command names</b><ul><li>Reduced option sets</li>
<li><strong>cd:</strong> built-in changes shell directory</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#1311-command-behavior-and-supported-options -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink> · 13.1 Applications, library calls, and host requests

## 13.1.1 Command behavior and supported options (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7494 -->
<div class="code-columns" data-column-key="code:code-7494" style="--readme-columns:minmax(0, 61fr) minmax(0, 39fr);--source-aspect:4.555007256894049">

<ReadmeVisual kind="code" :width="721.676923076923" data-code-source="code-7494" data-code-part="1">

<!-- README_CODE_PART code-7494 lines=1-11 -->
<div class="readme-code readme-terminal">

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

<ReadmeVisual kind="code" :width="461.3999999999999" data-code-source="code-7494" data-code-part="2">

<!-- README_CODE_PART code-7494 lines=12-22 -->
<div class="readme-code readme-terminal">

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

<!-- SOURCE Pico-OS/README.md#1312-command-errors-and-exit-statuses -->

# <MajorSectionLink section="13-user-applications-and-commands">13. User applications and commands</MajorSectionLink> · 13.1 Applications, library calls, and host requests

## 13.1.2 Command errors and exit statuses

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Results → <strong>stdout</strong>; diagnostics → stderr</li>
<li><strong>Multiple paths:</strong> continue; retain failure</li>
<li><strong>Foreground result</strong> stored in $?</li>
<li><strong>Signal status</strong> reported by PID/name</li>
<li><strong>Unchecked writes:</strong> success may hide truncation</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#14-test-system -->

<div class="eyebrow section-eyebrow">Section 14 · Overview</div>

# 14. Test system

<SectionOverview section="14-test-system" />

---

<!-- SOURCE Pico-OS/README.md#141-library-os-shell-and-boot-test-categories -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink>

## 14.1 Library, OS, shell, and boot test categories

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-7556 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TD
    T["63 Tests<br/><code>make test</code>"] --> L["13 Library Tests<br/><code>make test-lib</code>"]
    T --> B["1 Boot Test<br/><code>make test-boot</code>"]
    T --> S["49 System Tests<br/><code>make test-sys</code>"]
    S --> O["23 OS Tests<br/><code>make test-os</code>"]
    S --> H["26 Shell Tests<br/><code>make test-shell</code>"]
    L --> LM["Expected output from<br/><code>// expected:</code> source metadata"]
    B --> EF["Expected output from<br/><code>expected_output.txt</code>"]
    O --> EF
    H --> EF
    LM --> LC["Compare actual Library output<br/>with expected output"]
    EF --> SC["Compare normalized <code>output.txt</code><br/>with <code>expected_output.txt</code>"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1411-files-that-make-up-a-test -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.1 Files that make up a test (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET mermaid-7577 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart TD
    T["<code>test/</code>"] --> L["<code>basic_printf_newline_escape.picoc</code><br/>one Library test"]
    T --> O["<code>hello_world/</code><br/>one OS test"]
    O --> I["<code>input.txt</code>"]
    O --> E["<code>expected_output.txt</code>"]
    O --> A["<code>launcher.picoc</code>"]
    O --> P["<code>hello_world.picoc</code>"]
```

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1411-files-that-make-up-a-test -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.1 Files that make up a test (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7591 -->
<ReadmeVisual kind="table" :width="1324" data-table-key="table-7591:1,2,3,4,5,6,7,8,9,10">

<div class="table-panels table-panels-two" data-column-key="table:table-7591:1,2,3,4,5,6,7,8,9,10" style="--readme-columns:minmax(0, 52fr) minmax(0, 48fr);" v-pre><div class="readme-table"><table><colgroup><col style="width:28.19%" /><col style="width:42.05%" /><col style="width:29.76%" /></colgroup><thead><tr><th>File or generated file</th><th>Role</th><th>Test categories</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">test/*.picoc</td><td>Program + input/expected/link metadata</td><td>Library</td></tr>
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

</div>

---

<!-- SOURCE Pico-OS/README.md#1412-library-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.2 Library test example

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 227fr) minmax(0, 134fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-7615 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-7615" data-code-part="1">

<!-- README_CODE_PART code-7615 lines=1-10 -->
<div class="readme-code">

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

<!-- README_ASSET mermaid-7640 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    M["Source metadata in <code>.picoc</code>"] --> R["Compiled RETI program"]
    M --> E["Generated <code>.expected_output</code>"]
    R --> A["Actual <code>.output</code>"]
    E --> C["Exact line comparison"]
    A --> C
    C --> P["Pass or fail"]
```

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1413-os-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.3 OS test example (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-columns" data-column-key="assets:code-7656+code-7665" style="--readme-columns:minmax(0, 32fr) minmax(0, 68fr);">

<!-- README_ASSET code-7656 -->
<ReadmeVisual kind="code" :width="431.6235294117646" data-code-source="code-7656" data-code-part="1">

<!-- README_CODE_PART code-7656 lines=1-3 -->
<div class="readme-code">

```text {lines:false}
load test/hello_world/launcher.bin
run 3
poweroff.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-7665 -->
<ReadmeVisual kind="code" :width="917.1999999999998" data-code-source="code-7665" data-code-part="1">

<!-- README_CODE_PART code-7665 lines=1-14 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1413-os-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.3 OS test example (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 210fr) minmax(0, 92fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-7684+code-7698" style="--readme-columns:minmax(0, 56fr) minmax(0, 44fr);">

<!-- README_ASSET code-7684 -->
<ReadmeVisual kind="code" :width="534.5454545454545" data-code-source="code-7684" data-code-part="1">

<!-- README_CODE_PART code-7684 lines=1-9 -->
<div class="readme-code">

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

<!-- README_ASSET code-7698 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-7698" data-code-part="1">

<!-- README_CODE_PART code-7698 lines=1-3 -->
<div class="readme-code">

```text {lines:false}
process with pid 3 created
hello world
process with pid 5 created
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET mermaid-7706 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    I["<code>input.txt</code>"] --> S["Shell <code>load</code> and <code>run</code> built-ins"]
    S --> L["<code>launcher.bin</code>"]
    L --> H["<code>hello_world.bin</code>"]
    H --> C["Captured emulator stdout"]
    C --> O["Normalized <code>output.txt</code>"]
    O --> D["Comparison"]
    E["<code>expected_output.txt</code>"] --> D
    D --> P["Pass or fail"]
```

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1414-shell-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.4 Shell test example

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 152fr) minmax(0, 94fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-7732+code-7740" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-7732 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-7732" data-code-part="1">

<!-- README_CODE_PART code-7732 lines=1-2 -->
<div class="readme-code">

```text {lines:false}
ps.bin
poweroff.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-7740 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-7740" data-code-part="1">

<!-- README_CODE_PART code-7740 lines=1-5 -->
<div class="readme-code">

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

<!-- README_ASSET mermaid-7752 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    I["<code>input.txt</code>"] --> R["Runner waits for <code>PicoOS&gt;</code>"]
    R --> S["Shell"]
    S --> A["Command or test application"]
    A --> C["Captured UART output"]
    C --> O["Normalized <code>output.txt</code>"]
    O --> D["Comparison"]
    E["<code>expected_output.txt</code>"] --> D
    D --> P["Pass or fail"]
```

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1415-boot-test-example -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.1 Library, OS, shell, and boot test categories

## 14.1.5 Boot test example

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 108fr) minmax(0, 88fr)">

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:code-7770+code-7777" style="--readme-columns:minmax(0, 50fr) minmax(0, 50fr);">

<!-- README_ASSET code-7770 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-7770" data-code-part="1">

<!-- README_CODE_PART code-7770 lines=1-2 -->
<div class="readme-code">

```text {lines:false}
echo.bin hello world
poweroff.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-7777 -->
<ReadmeVisual kind="code" :width="420" data-code-source="code-7777" data-code-part="1">

<!-- README_CODE_PART code-7777 lines=1-3 -->
<div class="readme-code">

```text {lines:false}
process with pid 3 created
hello world
process with pid 4 created
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET mermaid-7787 -->
<ReadmeVisual kind="mermaid" :width="980">

```mermaid
flowchart LR
    B["EPROM <code>bootloader.reti</code>"] --> K["<code>kernel.bin</code>"]
    K --> I["<code>init.bin</code>"]
    I --> S["<code>shell.bin</code>"]
    S --> E["<code>echo.bin</code>"]
    E --> C["Captured UART output"]
    C --> O["Normalized <code>output.txt</code>"]
    O --> D["Comparison"]
    X["<code>expected_output.txt</code>"] --> D
    D --> P["Pass or fail"]
```

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#142-test-execution -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink>

## 14.2 Test execution

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7810 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7810:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:14.77%" /><col style="width:20.63%" /><col style="width:14.80%" /><col style="width:35.15%" /><col style="width:14.65%" /></colgroup><thead><tr><th>Test representation</th><th>Started by</th><th>Input path</th><th>Code that runs</th><th>Output and pass condition</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Top-level Library <code>.picoc</code> file</td><td><span class="source-link"><code>run_sys_tests.sh</code></span>, then <span class="source-link"><code>run_lib_test_case.sh</code></span></td><td>Source // in: → emulator</td><td>Test + libraries; no PicoOS</td><td>Output equals // expected; trim line endings</td></tr>
<tr data-source-row="2"><td class="table-key">OS directory</td><td><span class="source-link"><code>run_os_tests.py</code></span> with <code>--kind os</code></td><td>Prompt-driven input.txt → launcher</td><td>Boot/kernel/init/shell/launcher/workers</td><td>Raw → normalize terminal → compare expectation</td></tr>
<tr data-source-row="3"><td class="table-key">Shell directory</td><td><span class="source-link"><code>run_os_tests.py</code></span> with <code>--kind shell</code></td><td>Prompt-driven commands + keys</td><td>Boot/kernel/init/shell/commands</td><td>Same normalized comparison as OS tests</td></tr>
<tr data-source-row="4"><td class="table-key"><span class="source-link"><code>test/boot/</code></span></td><td><span class="source-link"><code>run_os_tests.py</code></span> with <code>--kind boot</code></td><td>Prompt-driven boot commands</td><td>Boot/kernel/init/shell/release applications</td><td>Same normalized comparison as OS tests</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1421-make-targets -->

# <MajorSectionLink section="14-test-system">14. Test system</MajorSectionLink> · 14.2 Test execution

## 14.2.1 Make targets

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7831 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7831:1,2,3,4,5,6,7,8">

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

</div>

---

<!-- SOURCE Pico-OS/README.md#15-use-in-operating-systems-and-real-time-operating-systems-lectures -->

<div class="eyebrow section-eyebrow">Section 15 · Overview</div>

# 15. Use in operating-systems and real-time operating-systems lectures

<SectionOverview section="15-use-in-operating-systems-and-real-time-operating-systems-lectures" />

---

<!-- SOURCE Pico-OS/README.md#15-use-in-operating-systems-and-real-time-operating-systems-lectures -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-list"><ul><li>Inspect source + <strong>live execution</strong></li>
<li><strong>OS:</strong> processes, interrupts, memory, files</li>
<li><strong>RTOS:</strong> scheduling, queues, synchronization</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#151-operating-systems-topics -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink>

## 15.1 Operating-systems topics

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-7858 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-7858:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:49.41%" /><col style="width:50.59%" /></colgroup><thead><tr><th>Operating-systems lecture topic</th><th>What students can inspect in PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Parent/child relationships and process loading</td><td>load/run; PCB parent; zombies; cleanup</td></tr>
<tr data-source-row="2"><td class="table-key">Signals</td><td>Signal fields + state changes</td></tr>
<tr data-source-row="3"><td class="table-key">interrupt service routines tables and ISRs</td><td>IVT; saved activation; handlers; RTI</td></tr>
<tr data-source-row="4"><td class="table-key">Software, hardware, and synchronous interrupts</td><td>Syscalls, devices, synchronous exceptions</td></tr>
<tr data-source-row="5"><td class="table-key"><span class="source-link"><code>malloc()</code></span> / <span class="source-link"><code>free()</code></span></td><td>First fit; split; free; coalesce</td></tr>
<tr data-source-row="6"><td class="table-key">Filesystem boundary</td><td>Descriptors + UART host boundary</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1511-inspecting-picoos-execution-in-the-reti-emulator -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.1 Inspecting PicoOS execution in the RETI-Emulator

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 150fr) minmax(0, 206fr)">

<div class="readme-artifacts composition-panel layout-command-above">

<!-- README_ASSET code-7877 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-7877" data-code-part="1" style="flex:0 0 64px">

<!-- README_CODE_PART code-7877 lines=1-2 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -O1 -i -w -g -v -o program.reti program.picoc
$ reti_emulator -d -c -D program.debuginfo program.reti
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-7885 -->
<ReadmeVisual kind="code" :width="1037.6" class="command-strip" data-code-source="code-7885" data-code-part="1" style="flex:0 0 64px">

<!-- README_CODE_PART code-7885 lines=1-2 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ cd binary
$ reti_emulator -n 5 -O -r 262144 -e boot/bootloader.reti -S kernel/kernel.sections -D kernel/kernel.debuginfo -d -c
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-columns" data-column-key="assets:table-7894+table-7907" style="--readme-columns:minmax(0, 55fr) minmax(0, 45fr);">

<!-- README_ASSET table-7894 -->
<ReadmeVisual kind="table" :width="770" data-table-key="table-7894:1,2,3,4,5,6">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.07%" /><col style="width:64.93%" /></colgroup><thead><tr><th>Keys or option</th><th>What students can inspect or do</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>c</code>, then <code>E</code> (<code>Enter again</code>)</td><td>Continue; stop anywhere; inspect instruction</td></tr>
<tr data-source-row="2"><td class="table-key"><code>d</code> (<code>debug source</code>)</td><td>PicoC source for current RETI instruction</td></tr>
<tr data-source-row="3"><td class="table-key"><code>A</code> (<code>Assign value</code>)</td><td>Edit register/memory; continue execution</td></tr>
<tr data-source-row="4"><td class="table-key"><code>r</code> (<code>restart</code>)</td><td>Restart emulator</td></tr>
<tr data-source-row="5"><td class="table-key"><code>S</code> / <code>R</code> (<code>Snapshot</code> / <code>Restore</code>)</td><td>Save/restore complete emulator state</td></tr>
<tr data-source-row="6"><td class="table-key"><code>e</code>, then <code>T</code></td><td>Trigger + inspect selected interrupt</td></tr></tbody></table></div></div>

</ReadmeVisual>

<!-- README_ASSET table-7907 -->
<ReadmeVisual kind="table" :width="630" data-table-key="table-7907:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:28.31%" /><col style="width:26.98%" /><col style="width:44.71%" /></colgroup><thead><tr><th>SRAM address</th><th>Value</th><th>Annotation in the debug TUI</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>8012</code></td><td><code>3</code></td><td><code>global current_pid@12</code></td></tr>
<tr data-source-row="2"><td class="table-key"><code>8179</code></td><td><code>42</code></td><td><code>var timeslice@0</code></td></tr>
<tr data-source-row="3"><td class="table-key"><code>8182</code></td><td><code>9001</code></td><td><code>return addr.</code></td></tr>
<tr data-source-row="4"><td class="table-key"><code>8183</code></td><td><code>7</code></td><td><code>arg next_pid@0</code></td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1512-exploring-userspace-heap-allocation -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.2 Exploring userspace heap allocation

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7930 -->
<div class="code-columns" data-column-key="code:code-7930" style="--readme-columns:minmax(0, 52fr) minmax(0, 48fr);--source-aspect:2.75368876647649">

<ReadmeVisual kind="code" :width="547.4" data-code-source="code-7930" data-code-part="1">

<!-- README_CODE_PART code-7930 lines=1-17 -->
<div class="readme-code">

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

<ReadmeVisual kind="code" :width="505.29230769230765" data-code-source="code-7930" data-code-part="2">

<!-- README_CODE_PART code-7930 lines=18-33 -->
<div class="readme-code">

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

<!-- SOURCE Pico-OS/README.md#1513-editing-and-executing-symbolic-reti-assembly -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.3 Editing and executing symbolic RETI assembly (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-7992 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-7992" data-code-part="1">

<!-- README_CODE_PART code-7992 lines=1-6 -->
<div class="readme-code">

```c {lines:false}
int result;

int main(void) {
    result = 0;
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#1513-editing-and-executing-symbolic-reti-assembly -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink> · 15.1 Operating-systems topics

## 15.1.3 Editing and executing symbolic RETI assembly (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 289fr) minmax(0, 64fr)">

<div class="readme-artifacts composition-panel layout-command-above">

<!-- README_ASSET code-8003 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-8003" data-code-part="1" style="flex:0 0 46px">

<!-- README_CODE_PART code-8003 lines=1-1 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -c exercise.picoc
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8010 -->
<ReadmeVisual kind="code" :width="980" data-code-source="code-8010" data-code-part="1">

<!-- README_CODE_PART code-8010 lines=1-10 -->
<div class="readme-code">

```text {lines:false}
  .ivt
  .text
main:
  LOADI ACC 3
loop:
  SUBI ACC 1
  JUMP> loop
  STOREIN DS ACC result
  JUMP 0
  .data
```

</div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET code-8027 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-8027" data-code-part="1" style="flex:0 0 64px">

<!-- README_CODE_PART code-8027 lines=1-2 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ picoc_compiler -o exercise.reti exercise.reti_blocks
$ reti_emulator -d -c exercise.reti
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#152-real-time-operating-systems-topics -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink>

## 15.2 Real-time operating-systems topics (1)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET table-8039 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8039:1,2,3,4">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:35.94%" /><col style="width:64.06%" /></colgroup><thead><tr><th>Real-time operating-systems lecture topic</th><th>What students can inspect in PicoOS</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key">Process states</td><td>NEW/READY/RUNNING/BLOCKED/STOPPED/ZOMBIE</td></tr>
<tr data-source-row="2"><td class="table-key">Scheduling and dispatching</td><td>Scheduler chooses; dispatcher saves/restores</td></tr>
<tr data-source-row="3"><td class="table-key"><span class="source-link"><code>waitpid()</code></span>, <span class="source-link"><code>sleep()</code></span>, and <span class="source-link"><code>wakeup()</code></span></td><td>Wait queues + event wakeup</td></tr>
<tr data-source-row="4"><td class="table-key">Mutexes</td><td>Sleep on contention; unlock wakes waiter</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#152-real-time-operating-systems-topics -->

# <MajorSectionLink section="15-use-in-operating-systems-and-real-time-operating-systems-lectures">15. Use in operating-systems and real-time operating-systems lectures</MajorSectionLink>

## 15.2 Real-time operating-systems topics (2)

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET code-8050 -->
<ReadmeVisual kind="code" :width="1674" data-code-source="code-8050" data-code-part="1">

<!-- README_CODE_PART code-8050 lines=1-19 -->
<div class="readme-code">

```c {lines:false}
// dependencies: ../../library/stdlib/libstdlib.reti_blocks ../../library/mutex/libmutex.reti_blocks ../../library/schedule/libschedule.reti_blocks ../../library/sys/mman/libmman.reti_blocks

#include "shared.header"
#include "../../library/schedule/schedule.header"
#include "../../library/stdlib/stdlib.header"
#include "../../library/sys/mman/mman.header"

int main(int argc, char **argv) {
    struct SharedState *shared_state;

    shared_state = (struct SharedState *)mmap(atoi(argv[2]));
    mutex_lock(&(shared_state->mutex));
    shared_state->workers = shared_state->workers + 1;
    if (atoi(argv[1]) == 1) {
        yield();
    }
    mutex_unlock(&(shared_state->mutex));
    return 0;
}
```

</div>

</ReadmeVisual>

</div>

</div>

---

<!-- SOURCE Pico-OS/README.md#16-use-of-ai-in-the-project -->

<div class="eyebrow section-eyebrow">Section 16 · Overview</div>

# 16. Use of AI in the project

<SectionOverview section="16-use-of-ai-in-the-project" />

---

<!-- SOURCE Pico-OS/README.md#16-use-of-ai-in-the-project -->

# <MajorSectionLink section="16-use-of-ai-in-the-project">16. Use of AI in the project</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-list bullet-columns"><ul><li><strong>Core concepts + architecture:</strong> author</li>
<li><strong>Manual debugging</strong>; custom PicoC debugger</li>
<li><strong>GDB unavailable</strong> for RETI</li>
<li><strong>AI:</strong> repetitive, already-understood implementation</li>
<li><strong>Supporting applications</strong>, tests, build scripts</li>
<li><strong>Author checks</strong> calculations + integrates changes</li>
<li><strong>Freiburg guide:</strong> transparency principles</li>
<li><strong>GitHub Copilot</strong>; documented source-file usage</li>
<li><strong>Three semesters</strong>; beyond 18 ECTS</li></ul></div>

</div>

---

<!-- SOURCE Pico-OS/README.md#17-limitations -->

<div class="eyebrow section-eyebrow">Section 17 · Overview</div>

# 17. Limitations

<SectionOverview section="17-limitations" />

---

<!-- SOURCE Pico-OS/README.md#17-limitations -->

# <MajorSectionLink section="17-limitations">17. Limitations</MajorSectionLink>

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-single">

<!-- README_ASSET list-8158 -->
<div class="readme-list bullet-columns"><ul><li><strong>No MMU</strong>, isolation, or virtual memory</li>
<li>Host files via <strong>UART</strong></li>
<li><strong>Eight descriptors</strong>; independent copied state</li>
<li><strong>Lazy Round Robin</strong>; cyclic scan</li>
<li><strong>Non-preemptive kernel</strong>; deferred switching</li>
<li><strong>Fixed heap/stack</strong>; no stack growth</li>
<li><strong>Reduced libraries</strong>, formatting, shell parsing</li>
<li><strong>Hardware unimplemented</strong>; instruction-count timing</li>
<li><strong>No sound/LCD</strong>; host terminal</li>
<li><strong>Static images</strong>; no dynamic linking</li>
<li><strong>POSIX-like names</strong>; reduced semantics</li></ul></div>

</div>
<aside class="context-note"><b>Scope</b><ul><li>Educational OS mechanisms</li>
<li>POSIX-like interfaces; reduced behavior</li></ul></aside>

</div>

---

<!-- SOURCE Pico-OS/README.md#appendix-inspecting-bin-files-with-hexyl -->

# Appendix: Inspecting `.bin` files with `hexyl`

<div class="deck-content readme-slide">

<div class="readme-artifacts layout-composed" style="--readme-rows:minmax(0, 216fr) minmax(0, 110fr)">

<div class="readme-artifacts composition-panel layout-single">

<!-- README_ASSET table-8195 -->
<ReadmeVisual kind="table" :width="1080" data-table-key="table-8195:1,2,3,4,5">

<div class="table-panels" v-pre><div class="readme-table"><table><colgroup><col style="width:27.10%" /><col style="width:27.10%" /><col style="width:45.80%" /></colgroup><thead><tr><th>File byte offset</th><th>Header word</th><th>Meaning</th></tr></thead><tbody><tr data-source-row="1"><td class="table-key"><code>0x00</code></td><td>Code start</td><td>Initial code/entry offset</td></tr>
<tr data-source-row="2"><td class="table-key"><code>0x04</code></td><td>Data start</td><td>Initial data offset</td></tr>
<tr data-source-row="3"><td class="table-key"><code>0x08</code></td><td>Heap start</td><td>Process heap start</td></tr>
<tr data-source-row="4"><td class="table-key"><code>0x0c</code></td><td>Heap size</td><td>Heap capacity; −1 → default</td></tr>
<tr data-source-row="5"><td class="table-key"><code>0x10</code></td><td>Stack start</td><td>Highest stack cell; −1 → default</td></tr></tbody></table></div></div>

</ReadmeVisual>

</div>

<div class="readme-artifacts composition-panel layout-command-above">

<!-- README_ASSET code-8209 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-8209" data-code-part="1" style="flex:0 0 64px">

<!-- README_CODE_PART code-8209 lines=1-2 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ hexyl -g 4 -n 20 binary/user/echo.bin
$ hexyl -g 4 -s 20 -n 64 binary/user/echo.bin
```

</div>

</ReadmeVisual>

<!-- README_ASSET code-8220 -->
<ReadmeVisual kind="code" :width="980" class="command-strip" data-code-source="code-8220" data-code-part="1" style="flex:0 0 46px">

<!-- README_CODE_PART code-8220 lines=1-1 -->
<div class="readme-code readme-terminal">

```console {lines:false}
$ hexyl --skip=-64 -n 64 binary/user/echo.bin
```

</div>

</ReadmeVisual>

</div>

</div>

</div>

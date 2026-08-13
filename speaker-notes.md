# PicoOS presentation speaker notes

These notes follow the 35 slides in `slides.md` in order. The transition at the end of each section is intended to be spoken as the connection to the next slide.

## Slide 1 — PicoOS

Good morning, and welcome to my master project presentation. My project is called PicoOS. It is a small educational operating system for the RETI teaching CPU. The goal was not to reproduce Linux or to build a POSIX-compliant Unix system. Instead, I wanted to create a complete but understandable system in which the important operating-system mechanisms can be followed from source code down to individual RETI instructions. Today I will show how PicoOS boots, how it manages processes and memory, how user programs interact with the kernel, and how I verified that all these parts work together.

**Transition:** I will begin with the result as a whole, before looking inside the individual mechanisms.

## Slide 2 — What I built

The finished project contains much more than a kernel in isolation. First, there is an EPROM boot path that loads the kernel into SRAM and starts it. Second, the kernel provides interrupts, processes, scheduling, signals, memory management, and input and output. Third, a userspace environment makes the system usable: it includes libraries, an init process, an interactive shell, and several applications. Finally, the project includes tests at several levels, from individual library functions to complete shell sessions. Together, these parts form a bootable system that can execute multiple user programs, react to terminal input, and access files through a host connection.

**Transition:** To understand how these parts become a running system, we first need to look at the surrounding toolchain.

## Slide 3 — From PicoC source to a running system

PicoOS is one of three closely connected projects. The operating system is written in PicoC, a deliberately small subset of C. The PicoC compiler turns that source into symbolic RETI assembly, section metadata, and finally binary images. Those images run either in the RETI emulator or, in the intended physical setup, on an FPGA implementation of the same teaching CPU. The emulator also models EPROM, SRAM, the interrupt controller, the timer, and UART. SRAM contains 262,144 addressable 32-bit words, which is one mebibyte. UART connects the operating system to terminal input and host-side file services. This shared interface lets the software architecture remain the same for the emulator and planned hardware.

**Transition:** With that context, I can separate the project into the main areas that I designed and connected.

## Slide 4 — The parts I designed and connected

My contribution spans four layers. At the lowest layer, I implemented the boot process, interrupt vector table, low-level handlers, system-call entry, and exception handling. On top of that, I built the process system: process creation and termination, scheduling, context switching, blocking, waiting, and signals. The runtime-services layer adds kernel and process memory allocation, shared memory, file descriptors, and UART-based input and file access. Finally, userspace contains the startup runtime, libraries, init, the shell, job control, applications, and the test infrastructure. The important point is that these are not disconnected demonstrations. They form one execution path from a CPU event to a user-visible result.

**Transition:** I will now follow that execution path from the very beginning: switching on the machine and loading the kernel.

## Slide 5 — Loading the kernel from EPROM into SRAM

Execution begins at address zero in EPROM. The bootloader first establishes a valid environment: it sets the code segment to EPROM, places a temporary stack at the top of SRAM, and points the data segment at the bootloader's read-only data. Interrupts are not configured yet, so the bootloader communicates with UART by polling. It sends a request for `kernel.bin`. The host returns a word count, a five-word layout header, and the encoded program words. The bootloader reads the header but copies only the payload into SRAM. It then changes the code segment, data segment, stack pointer, and base-address frame register to the kernel values and jumps to the compiler-generated kernel start function, which calls `main`.

**Transition:** This handover only works because the bootloader and kernel agree on exact memory addresses and on the UART hardware interface.

## Slide 6 — Memory constants and UART hardware

The compiler generates memory constants for the selected target. These constants describe where the kernel text and data begin, where the kernel heap ends, and where memory for user processes starts. Both the bootloader and kernel compile against this shared layout, so there are no guessed addresses at runtime. The diagram also shows the memory-mapped UART registers at the periphery base. One cell transmits a byte, one receives a byte, and a status cell reports whether sending or receiving is ready. During boot, the bootloader polls these cells. After kernel initialization, incoming bytes are handled by a hardware interrupt instead. The same simple registers therefore support both early boot and normal interactive operation.

**Transition:** UART is not only a terminal connection; PicoOS also uses it as a small protocol for host-backed services.

## Slide 7 — Accessing host files over UART

PicoOS has no disk and no resident filesystem. Instead, it sends escape-sequence requests over UART. A load request returns a binary image, a read-range request returns part of a text file, and a file-size request returns a 32-bit size or a special value if the file does not exist. The host side is implemented by the emulator today; physical hardware would use a companion program connected over USB-to-UART. A program binary begins with five big-endian layout words: code start, data start, heap start, heap size, and stack start. The remaining words are executable code and data. Keeping this protocol small makes every byte crossing the machine boundary visible and inspectable.

**Transition:** Once the bootloader has used this protocol to place the kernel in SRAM, the kernel can initialize the rest of the operating system.

## Slide 8 — Kernel initialization

Kernel initialization follows a deliberate order. It first activates the kernel stack boundary, then initializes the kernel heap. This must happen early because later objects such as process control blocks and file metadata use kernel allocation. Next it creates the process list, initializes the allocator for complete process regions, and initializes shared-memory management. Only then does it configure the interrupt controller and load the init program as the first user process, with PID 1. After init is ready, the timer interval is set to 1000 interpreter cycles and the dispatcher is started. There is no conventional infinite loop in `main`; normal control leaves the kernel through the dispatcher.

**Transition:** The first dispatch is unusual because there is no interrupted user process to return to yet.

## Slide 9 — Starting the init process

At this point, the CPU is still in kernel context and init is the only ready process. Its process control block already contains an initial register set and an initial stack. One stack cell contains the address of the userspace start function minus one. The dispatcher marks init as running, loads its stack pointer, base-address frame register, code segment, data segment, and general registers, and then executes `RTI`. RETI normally returns from an interrupt, but here it also provides a clean way to enter a process. It takes the saved program counter, advances it, and begins exactly at `_start`. The same mechanism will later resume interrupted processes.

**Transition:** To see why this works, we need to look at how RETI finds interrupt handlers and how those handlers save context.

## Slide 10 — Interrupt vector table

The binary begins with an interrupt vector table, followed by text and data sections. PicoOS defines four vector entries. Vector zero handles software system calls, vector one handles timer interrupts, vector two handles UART input, and vector three handles CPU exceptions. When an interrupt occurs, the RETI CPU saves only the program counter automatically and jumps through the selected vector. That is intentionally minimal. PicoOS must preserve every other live register itself before it can run ordinary kernel code. At the end of the path, `RTI` restores control using the saved program counter. This small hardware contract is the foundation for system calls, preemption, input, and exception recovery.

**Transition:** The four vector entries lead to handlers with different purposes but a common low-level structure.

## Slide 11 — Interrupt handlers

Vector zero is entered deliberately by userspace and changes from the process stack to the kernel stack. Vector one is raised by the timer and may schedule another user process. Vector two is a higher-priority UART interrupt that completes pending input or buffers a received byte. Vector three is entered synchronously when the CPU detects a fault. Two compiler features make these handlers possible. The `section("ivt")` attribute places the raw vector entries and low-level code at the required addresses. The `naked` attribute suppresses the normal function prologue and epilogue, so the handler controls the exact register and stack layout around `INT` and `RTI`.

**Transition:** I will first show the exceptional path, where the CPU detects that execution cannot continue normally.

## Slide 12 — Handling CPU exceptions

The emulator reports three CPU faults to vector three: division by zero, stack overflow, and an illegal instruction word. A read-only periphery cell records the cause. Another periphery cell contains the active stack boundary, which lets the CPU detect when a downward-growing stack crosses its allowed limit. The handler also checks the interrupted code segment. If the fault came from userspace, PicoOS prints a diagnostic and terminates that process with status 1, allowing the rest of the system to continue. If the same fault occurred in the kernel, continuing would be unsafe, so PicoOS reports a kernel panic and shuts down. This separates process failure from operating-system failure.

**Transition:** Normal applications do not enter the kernel because of a fault; they enter deliberately through system calls.

## Slide 13 — Handling system calls with `INT 0`

A userspace wrapper places the syscall number in `ACC`, one scalar value or a pointer to a request structure in `IN1`, and executes `INT 0`. The vector-zero hub saves six registers in addition to the program counter saved by the CPU. It then switches to kernel code, data, and stack segments and calls the central syscall handler. PicoOS defines 32 syscall numbers, from zero through 31, covering processes, files, signals, shared memory, scheduling, and other services. If a call completes immediately, its result is placed in `ACC`, the original context is restored, and `RTI` returns to the caller. If it blocks, yields, or exits, the dispatcher selects a process and the return path may continue somewhere else.

**Transition:** The handler can interpret pointers and restore contexts only because the compiler and the kernel share one precise stack-frame convention.

## Slide 14 — Function stack frames and `BAF`

RETI stacks grow from high addresses toward low addresses, and `SP` points to the first free cell below the occupied stack. Function arguments are pushed from right to left. The caller then pushes a continuation address, while the called function saves the previous `BAF` and reserves its local variables. This means the first parameter is always at `BAF + 3`, and further or variadic parameters follow at increasing addresses. The same layout is used by library code and handwritten low-level handlers. On interrupt entry, the saved program counter and the six explicitly saved registers extend this stack image. Because the layout is fixed, the dispatcher can copy a suspended context into a process control block and later reconstruct it exactly.

**Transition:** With this shared context format in place, hardware events can either resume the current work or make another process runnable.

## Slide 15 — Timer and UART interrupts

The timer and UART show two different uses of hardware interrupts. The timer runs at priority one and fires every 1000 interpreter cycles. If it interrupts kernel code, the handler restores the saved registers and returns without scheduling. If it interrupts userspace, it saves the process and enters the scheduler. User processes are therefore preempted, while the kernel itself remains non-preemptive in the scheduling sense. UART has priority two and handles one incoming byte at a time. If a process is waiting for input, the interrupt completes that saved read and changes the process to ready. Otherwise, it puts the byte into a 128-cell ring buffer.

**Transition:** To decide what can run after such an event, PicoOS records every userspace task and its state in the process table.

## Slide 16 — The process table is a linked list

Despite its conventional name, the PicoOS process table is not a fixed array. It is a singly linked list allocated on the kernel heap. Each process control block stores identity and parent information, the assigned memory region, seven saved registers, file descriptors, wait-queue links, signals, and shared-memory attachments. The program counter is not duplicated in the PCB; it remains on the process stack. A process moves from new to ready when its initial stack is complete, from ready to running when dispatched, and back to ready after preemption or yielding. It may become blocked while waiting, stopped by a signal, or a zombie while its exit status is preserved.

**Transition:** These fields are filled when the kernel turns a binary file into a runnable process.

## Slide 17 — Loading a process

Process loading begins with the same UART binary protocol used during boot. The kernel reads the five layout words and asks the process-memory allocator for one contiguous region large enough for code, data, heap, and stack. It copies the payload, creates the PCB in the new state, and then constructs the initial stack. If the binary does not request explicit heap and stack sizes, PicoOS provides 1000 cells for each. The stack contains `_start - 1`, followed by `argc`, the `argv` pointer array, the `envp` pointer array, terminating null pointers, and the actual strings. Once this structure is complete, the process becomes ready and can be selected safely.

**Transition:** A running process cannot always make progress immediately, so the next mechanism is how it waits without wasting CPU time.

## Slide 18 — Waiting for an event

PicoOS represents wait queues as simple FIFO linked lists of processes. Calling `sleep` appends the current process to a queue, marks it blocked, saves its context, and dispatches another process. Calling `wakeup` removes one process from the head of that queue and marks it ready. Different subsystems use the same idea for different events: a child may exit, a mutex may become available, UART input may arrive, or a signal may need handling. A blocked process is not made runnable merely because the timer ticks. It stays asleep until the relevant subsystem explicitly wakes its queue. This makes the condition behind every state change visible in the code.

**Transition:** The clearest example of this relationship is a parent waiting for one particular child.

## Slide 19 — `waitpid()` before or after the child exits

`waitpid` must work regardless of which process reaches the rendezvous first. If the child has already exited, it is a zombie: its exit status is still available, so the kernel copies the status and removes the child. If the child is stopped, `waitpid` can return the stopped status. If the child is still active, the parent saves the address where the result must later be written, joins that child's wait queue, and becomes blocked. When the child exits, the kernel writes through the preserved pointer, wakes the parent, and removes the child. PicoOS waits for one exact PID and deliberately does not add a broader `wait` wrapper.

**Transition:** Waiting describes cooperation between related processes; signals provide asynchronous control over their state.

## Slide 20 — Signals in PicoOS

PicoOS implements five signals chosen to demonstrate termination, notification, stopping, and continuation. `SIGKILL` always terminates and cannot be caught. `SIGTERM`, `SIGCHLD`, `SIGCONT`, and `SIGTSTP` can use registered handlers, with the default actions shown here. Signals also support shell job control. Terminal control sequences target the registered foreground process, so Ctrl+C becomes a termination signal and Ctrl+Z becomes a stop signal. The parent-death setting solves another lifecycle problem: shell children inherit a request for `SIGTERM`, so they do not remain alive accidentally if their parent shell disappears. Signals therefore connect the terminal, process relations, and the scheduler.

**Transition:** Once signals, input, or wakeups have changed process states, the scheduler decides which ready process should execute.

## Slide 21 — Round-robin scheduling

The scheduler uses a deliberately straightforward round-robin algorithm. Starting after the current process, it scans the linked list for a runnable process, wraps at the tail, and skips blocked, stopped, new, or zombie entries. This takes linear time, but the process count is small and the implementation remains easy to inspect. A timer tick causes involuntary scheduling when userspace is running. A `yield` syscall reaches the same save-and-select path voluntarily. If only the current process is runnable, it may be selected again. If no process is runnable but some are blocked, the dispatcher waits in kernel context until an interrupt changes a state.

**Transition:** The scheduler chooses a process, but the dispatcher performs the actual machine-level switch to it.

## Slide 22 — Saving and restoring process state

This sequence shows a switch from process A to process B. On interrupt entry, the CPU leaves A's return program counter on A's stack, and the handler pushes six more registers. The dispatcher copies those registers plus the stack pointer into A's activation record and changes A from running to ready when appropriate. The scheduler then selects B. To restore B, the dispatcher first installs B's stack boundary, then restores its stack pointer, segment registers, general registers, and finally its base-address frame register. `RTI` consumes the program counter that was left on B's own stack and resumes it. Dividing context between the PCB and process stack avoids a separate program-counter field.

**Transition:** Context switching depends on each process having a stable memory region, so I will now show how SRAM is divided and allocated.

## Slide 23 — Memory layout and allocators

At low SRAM addresses, the kernel image contains its vector table, text, and data. These are followed by a fixed 4096-cell kernel heap and room for the downward-growing kernel stack. The rest of SRAM is managed as regions for processes and shared memory. Each process region has its own text and data bases, an upward-growing application heap, free space, and a stack growing downward from the high end. There is no MMU, virtual memory, or relocation after loading, so these addresses are physical SRAM addresses. The stack-boundary register detects a collision before the stack can silently overwrite the heap or another region.

**Transition:** Both kernel and userspace heaps use a small allocator whose splitting and merging behavior can be inspected directly.

## Slide 24 — Heap allocation and `free()`

Each heap is represented as a linked list of blocks. A block begins with a small header containing its size, whether it is free, and a pointer to the next block. Allocation uses first fit. If a free block is larger than requested by enough space for another header and at least one payload cell, the allocator splits it: the first part becomes allocated and the remainder becomes a new free block. `free` marks a block available and repeatedly merges adjacent free blocks. Repeated merging matters because releasing several neighboring allocations should recover one useful large region rather than leave avoidable fragments. The algorithm is intentionally compact enough to use in teaching.

**Transition:** The same allocator idea appears at three different levels, each with a different owner and lifetime.

## Slide 25 — Kernel, process, and application heaps

PicoOS has three distinct allocation roles. The kernel heap stores control structures such as PCBs, paths, descriptor tables, and shared-memory metadata. The process-memory allocator manages complete contiguous SRAM regions used by processes and shared-memory backing. Inside each process region, the userspace library manages the application heap used by `malloc` and `free`. Shared memory crosses the normal process boundary: `shm_open` resolves a name to an identifier, and `mmap` attaches the backing region at the same absolute SRAM address. Unlinking hides the name, while the memory remains until the last attachment is released. The shared region provides storage, but mutexes are still needed to coordinate access.

**Transition:** Applications normally reach all these services through libraries rather than constructing interrupt frames themselves.

## Slide 26 — How user programs reach the kernel

The userspace libraries form a small compatibility layer between applications and the kernel. Some functions, such as string operations, formatting, and user-heap allocation, run entirely in userspace. Functions dealing with processes, files, signals, scheduling, and shared memory eventually call a wrapper that executes `INT 0`. Larger arguments are grouped into request structures, because the syscall convention provides one general argument register. Results return in a register and are translated into the library-level interface. This organization lets a student call familiar functions such as `printf`, `malloc`, `read`, or `waitpid`, while still being able to trace the complete path through the library, interrupt hub, and kernel.

**Transition:** File descriptors are a good example of this path because they connect a familiar userspace interface to UART and host services.

## Slide 27 — How file descriptors use host files

Every process has a table of eight file descriptors. Descriptors zero, one, and two represent standard input, standard output, and standard error. Input is backed by the UART ring buffer and wait queue, while normal output is sent over UART. Descriptors three through seven can refer to host-backed files and store a path, flags, and a current offset. Read, write, append, and size operations are translated into the UART protocol rather than performed by an on-device filesystem. Children receive copies of descriptors zero through two. The copies have independent offsets because PicoOS does not implement a separate shared open-file object. This is a deliberate simplification, not Unix file-descriptor semantics in full.

**Transition:** Even with this compact descriptor model, the shell can implement normal output redirection using `dup2`.

## Slide 28 — Output redirection with `dup2()`

For output redirection, the shell first opens the target path. It saves its original standard output in descriptor seven, then uses `dup2` to replace descriptor one with the target file. The child is created while this redirected descriptor is active, so it inherits file output instead of UART output. The shell then restores its own standard output from descriptor seven. With `>`, the file is truncated once before writes begin. With `>>`, existing content is kept and each write appends. This order is important because the shell must redirect the child without permanently redirecting its own prompt. It also demonstrates how a small descriptor primitive supports a higher-level shell feature.

**Transition:** The shell itself is not started directly by the kernel; a small init process owns its lifecycle.

## Slide 29 — Init starts and restarts the shell

After kernel startup, init is PID 1 and becomes the first userspace program. It establishes the configured environment, including the path used to find user programs, then loads the shell. Init waits for that exact shell process with `waitpid`. If the shell exits, init starts a new shell, which creates a clean new interactive session. This separates responsibilities clearly: the kernel initializes machine resources and starts one userspace process; init manages the persistent user environment; and the shell handles commands and jobs. The `exit` command therefore ends one shell session, while `poweroff` invokes the kernel shutdown syscall and ends the complete system.

**Transition:** With init keeping the session alive, the shell can present the operating-system features through familiar commands.

## Slide 30 — Shell commands and programs

The shell reads a line of up to 80 cells, parses arguments, searches the configured path, expands simple environment variables, and supports output redirection and background jobs. In this example, `export` creates a variable, `echo` expands it and writes to a file, and `cat` reads the file back in 64-cell chunks while correctly handling partial writes. A trailing ampersand starts a background job; the shell exposes its PID through `$!` and can move jobs with `fg` and `bg`. Additional programs provide counting, directory operations, process signaling, and shutdown. These commands are small, but together they exercise nearly every kernel subsystem shown earlier.

**Transition:** That end-to-end interaction is also why PicoOS is useful as teaching material rather than only as an implementation exercise.

## Slide 31 — Operating-system mechanisms working together

PicoOS brings concepts from operating-systems and real-time-operating-systems lectures into one inspectable program. On the process side, students can study states, round-robin scheduling, dispatching, wait queues, test-and-set-lock mutexes, and shared memory. On the machine side, they can study binary sections, process loading, signals, interrupt handlers, file descriptors, and heap management. The value comes from the connections. For example, one input byte can trigger an interrupt, wake a blocked process, cause the scheduler to select it, and finally change what the shell does. Students can inspect the C source, generated assembly, register state, and observable terminal behavior for the same event.

**Transition:** Because these mechanisms interact closely, verification must cover isolated functions as well as complete system behavior.

## Slide 32 — How I tested the system

The test system is organized into three levels. Library tests focus on functions such as allocation, string handling, formatting, and synchronization. Operating-system tests exercise process arguments and environment, round-robin scheduling, signals, file descriptors, shared memory, exceptions, and other kernel features. Shell tests run complete command sessions and compare their exact output, including job control, redirection, editing, and error messages. The normal `make test` path uses fresh boots for strong isolation. The faster `make test-fast` path keeps one operating-system instance for groups of tests. Together, these levels make failures easier to localize while still checking the complete boot-to-shell path.

**Transition:** The difference between the normal and fast modes is mainly how they isolate one test from the next.

## Slide 33 — Fresh boots and fast repeated tests

In normal mode, each operating-system or shell test is compiled, booted in a fresh emulator process, driven through UART, and compared with its expected output. This gives the cleanest isolation but repeats startup work. Fast mode creates a manifest and uses a launcher inside one shared boot. After each test, it removes test processes, closes private file descriptors, restores the environment, and resets expected PID state before launching the next case. The harness captures the raw terminal stream, renders control characters where needed, removes known prompt or loading noise, and then performs an exact output comparison. This keeps the fast path useful without hiding state-leak bugs.

**Transition:** These tests support the final result: a small system whose major operating-system paths all work together.

## Slide 34 — The finished PicoOS system

The finished system supports five signals, eight descriptors per process, separate kernel, process-region, and application allocation roles, and one mebibyte of addressable SRAM. A program can receive arguments and environment variables, use its own heap and stack, access files, share memory, receive signals, and return an exit status to its parent. The system can be used interactively through a shell with background jobs, Ctrl+C, Ctrl+Z, and redirection. It can also be inspected instruction by instruction in the emulator and tested automatically. Its deliberate limits—no virtual memory, no on-device filesystem, and no claim of Unix compatibility—keep the important mechanisms small enough to understand.

**Transition:** I will finish by following one ordinary keypress through the whole system in a single chain.

## Slide 35 — What happens after a key is pressed

When the user presses a key, the host delivers one byte to the emulated UART and raises its hardware interrupt. The CPU saves the current program counter and enters the UART handler through vector two. If the shell is blocked in a read, the handler copies the byte into the pending request, changes the shell from blocked to ready, and returns. At the next scheduling opportunity, the scheduler can select the shell. The dispatcher restores its saved registers and executes `RTI`, so the interrupted `read` call finally returns. The shell processes and echoes the character and may eventually start another program. This one path connects hardware, interrupts, wait queues, process states, scheduling, context switching, libraries, and userspace.

That is the central result of PicoOS: the individual mechanisms remain simple enough to inspect, but together they form a complete and usable teaching system. Thank you. I am happy to answer your questions.

## Deck consistency notes

These are not part of the spoken script:

- The current README defines a binary as a word count followed by a **five-word** header and the payload. Slides 5 and 7 currently display four header words in parts of their diagrams.
- The current README and `common/syscall.header` define **32 syscall numbers**, numbered `0` through `31`. Slide 13 currently displays “31 syscall numbers.”

// Reviewed presentation summaries. Source row numbers remain in the coverage record.
import { plain, md, displayHtml } from '../scripts/readme-source.mjs'
import cellOverrides from './readme-table-cells.json' with { type: 'json' }
export const cellsOf = row => [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/g)].map(m=>m[1])
const words = text => plain(text).split(/\s+/).filter(Boolean)
const nameOf = html => plain(html).match(/^[\w.]+/)?.[0]
const purposes = {
 send_byte_over_uart:'Send one polled UART byte', handle_process_heap_full_exception:'Print diagnostic; terminate process',
 malloc:['First-fit process allocation','Positive failure → terminate'], realloc:['Resize/move process allocation','Size 0 → free'], free:'Free + coalesce process blocks', init_process_heap:'Initialize process-local heap', require_process_heap_allocation:'Positive failure → heap-full syscall',
 heap_init_region:'Initialize one free header',heap_alloc_from:'First fit; split; mark allocated',heap_realloc_from:'Shrink, grow, or allocate/copy/free',heap_free_from:'Mark free; coalesce neighbors',
 load_process_chunk:['Incremental load; preserve progress','Create NEW PCB on completion'],mark_process_ready_with_arguments:['Build arguments/environment stack','Inherit descriptors; NEW → READY'],
 list_processes:'Print all PIDs + binary paths',unload_process_by_pid:'Remove noncurrent process by PID',exit_process:'Record exit; notify parent; dispatch',process_heap_start:'Current process heap base',process_heap_size:'Current process heap capacity',current_process:'Current PCB; GETPID reads its pid',
 open_shared_memory:'Find/create named shared entry',map_shared_memory:'Attach process; return shared address',unlink_shared_memory:'Remove name; defer final release',
 dispatcher_switch_from_context:'Save activation; select; restore process',wait_for_process_by_pid:'Validate child; collect or block',sleep_on_wait_queue:'Enqueue caller; BLOCKED; dispatch',wakeup_wait_queue:'Wake FIFO head',enqueue_current_process_on_wait_queue:'Link current PCB into FIFO',
 send_signal_by_pid:'Validate PID; probe or deliver',set_parent_death_signal:'Configure signal on parent death',set_foreground_process:'Select shell or child input owner',
 close_file_descriptor:'Release path; reset entry',duplicate_file_descriptor:'Replace target with independent copy',open_file_descriptor:'Open path; choose lowest free slot',read_file_descriptor:'Read file or terminal; may block',write_file_descriptor:'Route output; advance saved offset',seek_file_descriptor:'Replace logical file offset',
 get_working_directory:'Copy current absolute path',change_working_directory:'Validate directory; replace current path',make_host_directory:'Request host directory creation',read_host_directory:'Fetch directory listing',unlink_host_file:'Request file removal',move_host_path:'Request move/rename',touch_host_file:'Create file or update timestamps',
 load:'Load binary; return NEW child PID',run:'Prepare child; mark READY',unload:'Remove noncurrent process',getpid:'Current process PID',
 read:'Read bytes; return count or −1',write:'Write bytes; protect UART control',write_without_uart_escape_check:'Write known escape-free bytes',close:'Close descriptor; return 0 or −1',dup2:'Independent entry copy; return target',lseek:'Set offset; return position or −1',
 chdir:'Change process working directory',getcwd:'Copy directory; buffer or NULL',unlink:'Remove file; return host status',rmdir:'Remove empty directory',move:'Move/rename path',touch:'Create or update timestamps',
 wait_queue_init:'Clear FIFO head + tail',sleep:'Queue caller; suspend execution',wakeup:'Wake at most one waiter',open:'Lowest free descriptor; −1 on error',creat:'Write + create + truncate',waitpid:'Child exit/stopped status; −1 on error',WIFSTOPPED:'Test stopped-status encoding',
 testset:'Atomic old value; store 1',mutex_init:'Clear lock + initialize wait queue',mutex_lock:'Acquire; sleep/retry on contention',mutex_unlock:'Clear lock; wake one contender',shm_open:'Named entry ID or −1',mmap:'Attach; shared address or NULL',shm_unlink:'Unlink name; defer destruction',
 opendir:'Allocate stream + fetch listing',readdir:'Reuse entry; NULL at end',closedir:'Free buffer + stream',atoi:'Convert signed decimal text',
 getenv:'Value pointer or NULL',current_environment:'Process-global environ pointer',copy_environment_variable:'Allocate string copy',store_environment_variable:'Add/replace environment entry',initialize_environment:'Copy inherited environment',setenv:'Add/replace NAME=value',unsetenv:'Remove entry; compact pointer array',putenv:'Copy NAME=value; require =',clearenv:'Free strings; retain empty array',clone_environment:'Deep-copy environment',destroy_environment:'Free cloned strings + array',restore_environment:'Recreate current environment',exit:'Terminate with status; no return',
 strcpy:'Copy terminated string; return destination',strcat:'Append string; return destination',strcmp:'First unequal cell difference',strncmp:'Compare at most count cells',strlen:'Cells before terminator',
 standard_input:'Process-global stdin stream',standard_output:'Process-global stdout stream',standard_error:'Process-global stderr stream',fopen:'Stream slot or NULL; r/w/a/+',fclose:'Close + release stream slot',fgetc:'Character or −1',fputc:'Written character or −1',fputs:'Written count or −1',write_decimal:'Print decimal; count or −1',format_stream:'Format arguments; count or −1',fprintf:'Formatted stream output; count or −1',printf:'Formatted stdout output; count or −1',
 read_input:'Pushback character or stdin byte',skip_whitespace:'Skip spaces; save following character',read_decimal:'Parse signed decimal into target',read_string:'Parse nonempty whitespace-delimited string',scanf:'Number of assigned arguments',_start:'Naked entry → start_process',start_process:['Initialize heap + environment','main → exit(status)'],yield:'Voluntary process switch',kill:'Send signal or probe PID',prctl:'Set parent-death signal',reboot:'Restart or power off',mkdir:'Create directory; return host status',
 boot_main:'Load kernel; install segments; transfer control',kernel_main:'Initialize kernel subsystems',read_environment:'Read /config environment',start_shell:'Load, run, wait for shell',
}
const fieldPurposes = {
 'BlockHeader.size':'Usable payload cells; excludes header','BlockHeader.free':'Free/allocated flag','BlockHeader.next':'Next in-region header or NULL','Heap.first_block':'First header in managed region',
 pid:'Stable process ID',state:['NEW / READY / RUNNING','BLOCKED / STOPPED / ZOMBIE'],base_address:'Absolute Process Payload base + size',heap_start:'Relative userspace heap bounds',binary_path:'Owned executable path; later argv[0]',working_directory:'Owned absolute path; inherited or /',activation:'Embedded saved CPU context',file_descriptors:'Owned descriptor table',waiting_status_ptr:'Pointer into suspended waitpid frame',waiters:'Embedded FIFO of waiting parents',waiting_queue_ptr:'Owning queue + intrusive successor',next:'Global process-list successor',shared_memory_attachments:'Head of process mapping records',parent_pid:'Parent identity + parent-death signal',exit_status:'Retained zombie termination status',stop_signal:'Stop/prior-state/deferred-termination bookkeeping',pending_terminal_read_buffer:'Retained buffer + requested count',pending_load:'Metadata + progress of pending load',
 'FileDescriptor.kind':'FREE/STDIN/STDOUT/STDERR/FILE identity','FileDescriptor.flags':'Access + create/truncate/append bits','FileDescriptor.offset':'Independent logical byte position','FileDescriptor.path':'Owned normalized path or NULL','FileDescriptorTable.entries':'Owned array of eight descriptors',
 'Terminal.input_buffer':'Embedded receive ring','Terminal.input_head':'Next unread byte','Terminal.input_tail':'Next insertion cell','Terminal.input_count':'Occupied count; distinguishes full/empty','Terminal.input_waiters':'Foreground readers awaiting input',
 'DirectoryStream.contents':'Owned 512-cell listing buffer','DirectoryStream.length':'Listing length without terminator','DirectoryStream.offset':'Next listing record','DirectoryStream.entry':'Embedded, reused directory-entry result','dirent.d_type':'Directory or regular-file type','dirent.d_name':'Terminated name; 127-character limit','PicoFile.file_descriptor':'Current process descriptor number',
}
// Each item replaces a verbose cell in its original row order.
const brief = {
 'table-50':{1:['Linked code + layout + debug metadata','Five-word header + ReTI binary','Selector + value/request pointer','PCBs, queues, descriptors, periphery writes','Bounded UART requests + big-endian replies'],2:['Assembler + source debugger','Bootloader + process loader','Interrupt entry + kernel subsystem','Dispatcher + emulated hardware','Emulator or companion serial host']},
 'table-141':{1:['Release startup + filesystem instructions','Find tools; configure; launch emulator','Download missing released tools','EPROM image; load kernel','Kernel binary + layout/debug metadata','Init binary','Shell + standalone commands','Environment, emulator options, OS version','Virtual terminal/null marker files']},
 'table-251':{2:['Bootloader','UART, interrupts, timer, exceptions, DMA','Kernel, processes, heaps, stacks']},
 'table-531':{1:['Install picoc_compiler + environment',['Includes, macros, #pragma once','Dependencies + optional syntax checking'],'Per-file compilation + final linking','Reusable code/symbol/debug artifacts','Hashes + options decide reuse','typedef, casts, declarations, increment','Typed pointers + compatible structs','Indirect calls + linked addresses','Variadic declarations + System V frames','Escapes + linker-safe string literals','Inline assembly + linked labels','Naked startup/interrupt handlers','.ivt attributes; .text/.data defaults','Tagged SRAM handler addresses','Generated entry or custom -C source','-O1 static global initializers','One shared restore/return block','.ivt + .text + .data + .sections','Readable labels until final patching','Generated kernel/boot memory constants','Source, globals, locals, calls, frames','Preprocessed source + named pass results','debug trap + real NOP']},
 'table-644':{1:['Earlier stack contents','Caller argument','Caller return address','Saved caller frame pointer','Caller local','Retained temporary expression','Second argument (arg2)','First argument (arg1)','Return continuation address','Saved caller BAF','First local','More locals + temporaries','Free cell below occupied stack','Stack grows toward lower addresses'],2:['Earlier calls','Caller’s caller','Caller’s caller','Caller frame','Caller frame','Caller expression','Caller','Caller','Caller','Callee','Callee','Callee','Current stack boundary','']},
 'table-1068':{1:['Explicit naked _start; no -C','Compiler-generated _start','libstart; -C library/start/libstart.picoc','Same libstart -C option','Common userspace libstart link rule']},
 'table-1082':{1:['ISR words; CS-relative globals','Entry + ordinary instructions; CS-relative','Ordinary globals; DS-relative'],2:['section("ivt") attribute','Default for functions','Default for globals']},
 'table-1108':{1:['Reserve cell; store register','Load top cell; release cell','Load 32-bit literal or linked address','Jump beyond immediate range']},
 'table-1305':{1:['Optional ISR code start','Initial CS + entry region','Initial DS','First process-local heap cell','Capacity in cells; −1 → default','Highest stack cell; −1 → default']},
 'table-1375':{3:['Initial CS + entry','Initial DS','Process-local heap start','Configured cells; −1 → default','Highest stack cell; −1 → default']},
 'table-1427':{1:['Relative → absolute SRAM addresses','Inclusive outer-heap limit','Kernel Heap bounds + stack boundary','First Process/Shared Data Heap cell','Install kernel CS + DS','Install kernel SP','Load kernel code base; currently unused']},
 'table-1447':{1:['Physical SRAM limit; fallback stack','Install linked EPROM DS','Temporary stack at SRAM top']},
 'table-1467':{1:['UART output → host stdout','Source labels/comments beside assembly','Atomic old value + store 1','Distinct code/data/heap/stack regions','ReTI words + five-word header','Start bootloader without SRAM preload','Configurable physical word capacity','Memory-mapped offsets 0–16','Mappings, priorities, pending state, nesting','UART words → SRAM; completion interrupt','Trigger selected ISR in TUI','Instruction-count timer; visible live counter','Byte registers + status bits','Bounded host filesystem protocol','Normal/raw input + control bytes','Divide/stack/illegal → IVT entry 3','Inclusive lower SP boundary','Views follow live CS + DS','Globals, locals, frames, source locations','Numbers, characters, decoded instructions','Save/restore/restart complete machine state','Select, scroll, center, edit views','Synthetic startup kernel/interrupt context','Reserve five-entry IVT','Keep assembler periphery files isolated']},
 'table-1510':{3:['Bootloader code + data','Implemented offsets 0–16','Kernel, processes, heaps, stacks']},
 'table-1520':{2:['Write low byte; clear send-ready','Receive byte; poll or ISR reads','Bit 0: send; bit 1: receive','Timer/custom/UART → IVT; 255 disables','Highest pending priority wins','Instruction interval; zero disables','Inclusive SP limit; rewrite on switch','None/divide/stack/illegal cause','1 enables DMA + extra registers','Absolute UART receive source','Absolute SRAM destination','Complete 32-bit words','0 idle; 1 busy; 2 done; 3 error']},
 'table-1617':{1:['Word count + binary bytes','Returned count + file range','32-bit file size','Create/truncate; route UART output','Preserve file; output at offset','Restore host stdout/stderr','Following bytes bypass control parser','Length-prefixed PicoOS root /','Directory existence/type test','Create directory','Length-prefixed listing','Remove file','Remove empty directory','Move/rename path','Create/update timestamps']},
 'table-1679':{1:['All eight live registers','PC in matching address space','DS','SP','UART state'],2:['Inspect/edit selected register','Choose register or address','Choose register or address','Choose register or address','Cycle interrupt/timer/exception/DMA views']},
 'table-1724':{2:['Userspace INT 0','Timer','UART receive','Synchronous CPU exception','DMA completion; custom-device line']},
 'table-2832':{2:['Immediate UART; return to syscall','UART priority 2 nests over priority 1','Timer pending until UART returns','DMA pending until UART returns','Timer pending until DMA returns','DMA pending until timer RTI','Queued byte until active UART ISR completes']},
 'table-3280':{1:['Usable cells; excludes header','Whether payload can satisfy allocation','Next header or NULL','First header; no separate block array']},
 'table-3302':{1:['kernel_heap in kernel .data','process_shared_data_heap in kernel .data','process_heap in each process .data'],2:['PCBs, paths, descriptors, shared metadata','Complete process + shared-data payloads','Process + linked-library allocations']},
 'table-3317':{3:['Five ISR addresses','Kernel + interrupt code','Globals, heap descriptors, list roots','4096 cells + in-region headers','Downward-growing kernel stack','Outer process + shared-data allocations']},
 'table-3335':{2:['Optional attributed data','base_address → activation.cs','base_address → activation.ds; process_heap','Inner headers + allocations; stack boundary','Arguments, environment, PC, call frames']},
 'table-3688':{2:['Loaded; startup not prepared','Eligible for scheduling','Activation loaded into CPU','Linked into wait queue','Suspended by signal','Status retained for parent'],3:['Load completion','Run, wakeup, SIGCONT','Dispatch','Read, DMA, waitpid, sleep','SIGSTOP/TSTP/TTIN','Termination']},
 'table-3744':{1:['Append at tail','Prepend at head'],2:['Head for traversal; tail → O(1)','Head insertion → O(1)']},
 'table-3988':{1:['All startup values + strings','Saved initial entry PC cell','First copied character','Highest reserved stack cell']},
 'table-3973':{1:['Loading parent; during load','Owned path copied during load','Signal setting copied during load','Run caller; during run','Explicit env or run caller'],2:['Parent identity; no shared PCB pointer','Independent owned path','Independent signal setting','Independent entries, paths, offsets','Copied to child stack; then heap']},
 'table-5304':{1:['Parent blocks; child later exits','Child zombie; parent later waits','No future parent collection'],2:['Exit writes status; wakes; removes child','waitpid collects + removes child','Orphan exit or parent cleanup removes child']},
 'table-5096':{0:['sleep(queue)','Parent waitpid(child)','Contended mutex_lock','Terminal read without input','DMA-backed process load'],2:['wakeup(queue)','Child exit or termination','Mutex unlock','UART byte arrival','DMA completion']},
 'table-5355':{1:['Deferred SIGINT/SIGKILL','Current stop signal','State reconsidered on SIGCONT','Signal delivered when parent dies','Retained terminal buffer + count']},
 'table-5580':{1:['Standard input','Standard output','Standard error','General inherited slot','General inherited slot','Shell scratch','Shell scratch','Shell scratch']},
 'table-5617':{3:['Ring input; may block','UART → stdout','Select stderr; restore stdout','Flags + saved offset; host requests','Ring reads; UART stdout writes','Read → 0; write → count']},
 'table-5820':{2:['Buffer; fallback completion target','Shell input','Child input'],3:['Consume; no signal','Consume; protect shell','SIGINT / SIGTSTP']},
 'table-5831':{1:['Foreground SIGINT','Foreground SIGTSTP','Ordinary ring byte; user handles EOF','Enqueue; complete pending read'],2:['Never buffered','Never buffered','Stored; dropped only when full','Stored unless full; waiter may consume']},
 'table-5885':{1:['Global ring input; UART output; no seek','Immediate EOF; discard writes; no seek']},
 'table-6244':{1:['Public waitpid declaration','Implementation + syscall helper','Compilation unit links wait implementation','Shared request + selector declarations']},
 'table-6536':{1:['Processes, descriptors, paths, queues','Open/create files','Child status + stopped inspection','Atomic lock + wait queue','Named shared memory','Directory streams','Heap, environment, conversion, exit','Copy, compare, length','Streams, formatting, scanning','Entry + runtime initialization','Voluntary scheduling','Signal delivery','Parent-death signal','Restart + power-off','Directory creation'],2:['stdlib: environment','Own syscall helper','Own syscall helper','unistd wait queues','Own syscall helper','Own syscall helper + stdlib','common/heap.picoc','common/string.picoc','common/decimal.picoc + syscall helper','stdlib','Inline syscall','Own syscall helper','Own syscall helper','Own syscall helper','Own syscall helper']},
 'table-7007':{1:['Explicit naked _start','Generated default _start','libstart; custom -C','libstart; custom -C','libstart; custom -C'],2:['boot_main → load kernel → jump','main → init subsystems → dispatch','_start → heap/env → main → exit','_start → heap/env → main → exit','_start → heap/env → main → exit']},
 'table-7294':{1:['Initialize subsystems + dispatch','Configure environment; supervise shell','Terminal ownership + command execution']},
 'table-7653':{1:['Original command + redirection + &','Trailing & removed; background=true','Command prefix + stdout_path','Separated name + raw arguments','/user/echo.bin; NEW PID','"hello Ada (0)"; quotes retained','argv[1] = hello Ada (0)']},
 'table-8489':{0:['test/*.picoc','input.txt','expected_output.txt','launcher.picoc','`<program>.picoc`','*.header','Other source *.txt','raw_output.txt','output.txt','Generated Library files'],1:['Program + input/expected/link metadata','Prompt-driven commands + encoded keys','Source-controlled normalized expectation','OS coordination program','Optional applications/workers','Shared definitions','Guest data, scripts, expected variants','Complete emulator stdout','Normalized actual output','Derived input/output/compiler artifacts']},
 'table-8669':{2:['Source // in: → emulator','Prompt-driven input.txt → launcher','Prompt-driven commands + keys','Prompt-driven boot commands'],3:['Test + libraries; no PicoOS','Boot/kernel/init/shell/launcher/workers','Boot/kernel/init/shell/commands','Boot/kernel/init/shell/release applications']},
 'table-8690':{1:['Release build + Library/System/Boot','Alias for make test','Library; TEST_PATTERN filters','OS then Shell; excludes Boot','Directories matching OS classification','Runnable non-Boot/non-OS directories','Only test/boot; one emulator','Previously failed Library paths']},
 'table-8717':{1:['load/run; PCB parent; zombies; cleanup','Signal fields + state changes','IVT; saved activation; handlers; RTI','Syscalls, devices, synchronous exceptions','First fit; split; free; coalesce','Descriptors + UART host boundary']},
 'table-8753':{1:['Continue; stop anywhere; inspect instruction','PicoC source for current ReTI instruction','Edit register/memory; continue execution','Restart emulator','Save/restore complete emulator state','Trigger + inspect selected interrupt']},
 'table-8954':{1:['NEW/READY/RUNNING/BLOCKED/STOPPED/ZOMBIE','Scheduler chooses; dispatcher saves/restores','Wait queues + event wakeup','Sleep on contention; unlock wakes waiter']},
 'table-9305':{2:['Initial code/entry offset','Initial data offset','Process heap start','Heap capacity; −1 → default','Highest stack cell; −1 → default']}
}
const statuses = {
 send_byte_over_uart:'No value',handle_process_heap_full_exception:'Terminates process',malloc:'Pointer / NULL / heap-full',realloc:'Pointer / NULL / heap-full',free:'No value',init_process_heap:'No value',require_process_heap_allocation:'Pointer or termination',
 heap_init_region:'No value',heap_alloc_from:'Pointer or NULL',heap_realloc_from:'Pointer or NULL; old block on failure',heap_free_from:'No value',load_process_chunk:'PID success; 0 failure; −1 pending',mark_process_ready_with_arguments:'true / false',list_processes:'No value',unload_process_by_pid:'true / false',exit_process:'No normal return',process_heap_start:'Absolute heap address',process_heap_size:'Heap cell count',open_shared_memory:'ID or −1',map_shared_memory:'Address or NULL',unlink_shared_memory:'0 / −1',dispatcher_switch_from_context:'RTI; C return only for empty list',wait_for_process_by_pid:'Completion flag; userspace IN2 = 1',sleep_on_wait_queue:'No value; later resumes via RTI',wakeup_wait_queue:'true if woke; false if empty',enqueue_current_process_on_wait_queue:'No value',send_signal_by_pid:'0 / −1',set_parent_death_signal:'0 / −1',set_foreground_process:'0 / −1',close_file_descriptor:'0 / −1',duplicate_file_descriptor:'Target FD / −1',open_file_descriptor:'Lowest free FD / −1',read_file_descriptor:'Byte count / −1',write_file_descriptor:'Byte count / −1',seek_file_descriptor:'Offset / −1',get_working_directory:'0 / −1',change_working_directory:'0 / −1',make_host_directory:'Host status',read_host_directory:'Listing count / error',unlink_host_file:'Host status',move_host_path:'Host status',touch_host_file:'Host status'
}
function bulletHtml(items) {
 const content=items.filter(Boolean).map(s=>displayHtml(md.renderInline(s)))
 return content.length>1?`<ul>${content.map(s=>`<li>${s}</li>`).join('')}</ul>`:content[0]||''
}
function tokens(html) {
 const code=[...html.matchAll(/<code>(.*?)<\/code>/g)].map(m=>m[1])
 const syscalls=[...new Set(code.filter(c=>c.startsWith('SYSCALL_')))]
 const host=[...new Set(code.map(c=>c.match(/^(file-size|read-range|write-at|write stderr|write stdout|write|literal-output|is-directory|mkdir|ls|unlink|rmdir|move|touch)\b/)?.[0]).filter(Boolean))]
 if(syscalls.length || host.length) return [...syscalls.map(s=>'`'+s.replace('SYSCALL_','')+'`'),...host.map(s=>'Host: `'+s+'`')]
 return null
}
export function prepareTable(a) {
 const header=cellsOf(a.header), labels=header.map(plain)
 const kernel=/^Kernel function(?:$| \(shared helper\))|^Kernel \/ Library Function$/.test(labels[0])
 const rows=a.rows.map((r,i)=>({sourceRow:i+1,cells:cellsOf(r)})).filter(r=>r.cells.some(c=>plain(c)))
 // GETPID directly calls current_process() in kernel/syscall.picoc; the
 // README's caller cell lists handle_syscall rather than the public wrapper.
 const selected=kernel?rows.filter(r=>/Library functions/.test(plain(r.cells.at(-1))) || nameOf(r.cells[0])==='current_process' || (labels[0]==='Kernel / Library Function'&&/\(Library only\)/.test(plain(r.cells[0])))):rows
 let columns=labels.map((_,i)=>i)
 // Retain the README's relationship, call, syscall, and type columns as well
 // as its values. Only internal function rows are filtered by the slide rule.
 if(!selected.length)return { ...a, rows:[], retainedRows:[], omittedRows:rows.map(r=>({row:r.sourceRow,reason:'Internal function; no library caller'})), columns:columns.length, headerLabels:columns.map(i=>labels[i]) }
 const unresolved=[]
 const compactRows=selected.map(r=> {
  const fn=nameOf(r.cells[0])
  const values=columns.map(i=> {
   const html=r.cells[i]||'', text=plain(html)
   let summary=cellOverrides[`${a.id}/${r.sourceRow}/${i}`] ?? brief[a.id]?.[i]?.[r.sourceRow-1]
   if(summary===undefined && i===0 && (kernel || labels[0]==='Library function'))summary=[...html.matchAll(/<code>(.*?)<\/code>/g)].map(m=>'`'+m[1].replace(/\(.*$/,'()')+'`')
   if(summary===undefined && i===1 && (labels[0].includes('function') || labels[0]==='Kernel / Library Function'))summary=kernel?(fn==='current_process'?'PCB pointer or NULL':statuses[fn]):purposes[fn]
   if(summary===undefined && i===2 && kernel)summary=purposes[fn]
   if(summary===undefined && i===header.length-1 && kernel) {
    const libraryPart=html.split(/Library functions[^:]*:/)[1]?.split(/(?:<strong>)?(?:Kernel|Test|User|Shared|System)/)[0]
    summary=fn==='current_process'?['`getpid()` → `GETPID`']:libraryPart?[...libraryPart.matchAll(/<code>(.*?)<\/code>/g)].map(m=>'`'+m[1]+'`'):['Direct library linkage']
   }
   if(summary===undefined && i===1 && /^(Field|Attribute)/.test(labels[0]))summary=fieldPurposes[fn]
   if(summary===undefined && /Syscalls/.test(labels[i]))summary=tokens(html) || (text.includes('No syscall')?'Local code; no syscall':undefined)
   if(summary===undefined && (labels[i]==='Calls'||/^Used by/.test(labels[i])||a.id==='table-2237'&&i===2)) {
    const names=[...new Set([...html.matchAll(/<code>(.*?)<\/code>/g)].map(m=>m[1].replace(/\(.*$/,'()')))]
    if(names.length)summary=names.map(name=>'`'+name+'`')
    else if(/^\s*(?:None|No |—)/.test(text))summary='None'
   }
   if(summary!==undefined)return {html:bulletHtml(Array.isArray(summary)?summary:[summary]),summary:summary,sourceColumn:i+1}
   if(words(text).length>10)unresolved.push({table:a.id,row:r.sourceRow,column:i,header:labels[i],text})
   const parts=html.split(/<br\s*\/?\s*>/i).filter(Boolean)
   return {html:parts.length>1?`<ul>${parts.map(p=>`<li>${displayHtml(p)}</li>`).join('')}</ul>`:displayHtml(html),sourceColumn:i+1}
  })
  return {sourceRow:r.sourceRow,values}
 })
 return {...a,columns:columns.length,headerLabels:columns.map(i=>kernel&&i===header.length-1?'Library entry':labels[i]),compactRows,retainedRows:selected.map(r=>r.sourceRow),omittedRows:rows.filter(r=>!selected.includes(r)).map(r=>({row:r.sourceRow,reason:'Internal function; no library caller'})),unresolved}
}

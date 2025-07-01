---
title: Registers
aliases:
  - Registers
---
Registers are memory, usually connected directly to circuitry for performance reason. They are responsible for the modern computers to function, and can be manipulated with Assembly instructions.

- Registers can be grouped into this categories:
# 1. General Purpose


Used for most calculations, data movement, loop counters, function arguments, etc.

>[!Important]
>From this Registers ***Extended Stack Pointer*** **`ESP`** is most important because it points to the memory address where the next stack operation will take place.
>
>So with it we can point normal Program to point to at our malicious code and execute it.

| 64-bit       | 32-bit     | 16-bit     | 8-bit      | Purpose / Notes                      |
| ------------ | ---------- | ---------- | ---------- | ------------------------------------ |
| **RAX**      | EAX        | AX         | AL         | Accumulator (return values)          |
| **RBX**      | EBX        | BX         | BL         | Base register (can be general use)   |
| **RCX**      | ECX        | CX         | CL         | Counter (loops, shifts)              |
| **RDX**      | EDX        | DX         | DL         | Data (used in I/O, syscalls, etc.)   |
| **RSI**      | ESI        | SI         | SIL        | Source index (used in `movs`, etc.)  |
| **RDI**      | EDI        | DI         | DIL        | Destination index                    |
| **RBP**      | EBP        | BP         | BPL        | Base pointer (stack frame reference) |
| **R8 - R15** | R8D - R15D | R8W - R15W | R8B - R15B | Extra general-purpose registers      |
![[images/Pasted image 20250701102623.png]]

As shown in the diagram, the first four registers, **`rax`,` rbx`,` rcx`, and `rdx`** also allow the **bits 8-15** to be accessed with the **`ah`, `bh`, `ch`, and `dh`** register names. With the exception of ah, these are provided for legacy support.
- Legacy Support means the `ah` - `dh` registers are kept in modern CPUs so old software still runs.
	- The registers `ah`, `bh`, `ch`, and `dh` were originally introduced in **16-bit x86 processors** (like the Intel 8086).
	- In those early processors, registers like `ax` (accumulator) were **16-bit**, and `ah` accessed the **high byte** (bits 8–15) of `ax`, while `al` accessed the **low byte** (bits 0–7).
	- These "high-byte" registers (`ah`, `bh`, etc.) still exist on modern 64-bit CPUs, **only for compatibility** with old code.
- **Don't worry about using `ah`, `bh`, `ch`, `dh`** modern Assembly programming rarely uses them because:
	- Newer instructions and compilers don't rely on them.
	- Using 32-bit or 64-bit registers like `eax`, `rax` is more common and cleaner.
	- The `ah`–`dh` registers can cause **conflicts with some modern instruction encodings**.
# 2. Stack Pointer Register (RSP)
| 64-bit       | 32-bit     | 16-bit     | 8-bit      | Purpose / Notes                      |
| ------------ | ---------- | ---------- | ---------- | ------------------------------------ |
| **RBP**      | EBP        | BP         | BPL        | Base pointer (stack frame reference) |
`rsp`, is used to point to the current top of the stack. The `rsp` register should not be used for data or other uses.
# 3. Base Pointer Register (RBP)
| 64-bit       | 32-bit     | 16-bit     | 8-bit      | Purpose / Notes                      |
| ------------ | ---------- | ---------- | ---------- | ------------------------------------ |
| **RBP**      | EBP        | BP         | BPL        | Base pointer (stack frame reference) |
`rbp`, is used as a base pointer during function calls. The `rbp`
register should not be used for data or other uses.

# 4. Instruction Pointer Register (RIP)

| 64-bit  | 32-bit | Use                                          |
| ------- | ------ | -------------------------------------------- |
| **RIP** | EIP    | Holds address of next instruction to execute |
There is a special register, `rip`, which is used by the CPU to point to the **next instruction to be executed**. Specifically, since the `rip` points to the next instruction, that means the instruction being pointed to by `rip`, and shown in the debugger, has not yet been executed. This is an important distinction which can be confusing when reviewing code in a debugger.
# 5. Flags Register

| 64-bit     | 32-bit | Use                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------- |
| **RFLAGS** | EFLAGS | Contains status flags (zero, carry, overflow, sign, etc.) after operations |
So `RFLAGS` registers contains many sub-flags as follow: 

| Flag   | Bit | Full Name      | Set When...                                                                                                 |
| ------ | --- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| **CF** | 0   | Carry Flag     | Used to indicate if the previous operation resulted in a carry.                                             |
| **PF** | 2   | Parity Flag    | Used to indicate if the last byte has an even number of 1's (i.e., even parity).                            |
| **AF** | 4   | Adjust Flag    | Used to support Binary Coded Decimal operations.                                                            |
| **ZF** | 6   | Zero Flag      | Used to indicate if the previous operation resulted in a zero result.                                       |
| **SF** | 7   | Sign Flag      | Used to indicate if the result of the previous operation resulted in a negative (most significant bit is 1) |
| **DF** | 10  | Direction Flag | Used to specify the direction (increment or decrement) for some string operations.                          |
| **OF** | 11  | Overflow Flag  | Signed overflow occurred                                                                                    |
Let's understand `RFLAGS` with example:
```asm
mov eax, 5
cmp eax, 5    ; compares: sets ZF because 5 - 5 = 0
je equal      ; jumps to 'equal' if ZF is set
```
Now here:
1. `mov eax, 5` 
	- Puts the value `5` into register `EAX`.
2. `cmp eax, 5`
	- Performs: `eax - 5`.
	- **It updates the `RFLAGS` register**, specifically

| Flag | Meaning                      | Value                     |
| ---- | ---------------------------- | ------------------------- |
| ZF   | **Zero Flag**                | `1` (because 5 - 5 = 0)   |
| SF   | Sign Flag                    | `0` (result not negative) |
| OF   | Overflow Flag                | `0` (no signed overflow)  |
| CF   | Carry Flag (unsigned borrow) | `0` (no borrow)           |
3. `je equal`
	- `je` = "Jump if Equal" = jump if **ZF (Zero Flag) == 1**
	- So it **reads the ZF bit** from `RFLAGS`.
	- Since ZF = 1 (from the `cmp`), the jump is **taken**.

So, we don’t access `RFLAGS` directly in most code. Instead, **conditional jump instructions** (like `je`, `jg`, `jl`, `jb`) **rely on it under the hood**.

# 6. XMM Registers
There are a set of dedicated registers used to support **64-bit and 32-bit** floating-point operations and **Single Instruction Multiple Data (SIMD)** instructions. The SIMD instructions allow a single instruction to be applied simultaneously to multiple data items. Used effectively, this can result in a **significant performance increase**. Typical applications include some graphics processing and digital signal processing.
The `XMM` registers as follows:

|Register Name|Size|Purpose|
|---|---|---|
|`xmm0` to `xmm15` (or `xmm31`*)|128 bits (16 bytes)|SIMD operations, floating-point, packed integer data|
|`ymm0` to `ymm15`|256 bits (AVX)|Extended version of XMM registers|
|`zmm0` to `zmm31`|512 bits (AVX-512)|High-performance SIMD|
# 7. Segment Registers
Used historically for segmented memory; less relevant today but still exist.

|Register|Name|Typical Use|
|---|---|---|
|**CS**|Code Segment|Instruction fetching (set automatically)|
|**DS**|Data Segment|Default for most data accesses|
|**SS**|Stack Segment|Used for stack operations (push/pop/call)|
|**ES**|Extra Segment|Older string ops (e.g. `movs`, `stos`)|
|**FS**|Extra Segment 2|**Thread-local storage**, Windows TIB/TEB|
|**GS**|Extra Segment 3|Used by OS/kernel (e.g. Linux TLS, KASLR)|
Segmentation is **mostly disabled in 64-bit mode**, **FS and GS are still functional** and used in:
- **Linux:** `GS` points to per-CPU data structures or TLS (Thread Local Storage)
- **Windows:** `FS` points to the Thread Information Block (TIB)

# 8. Control Registers

**Control Registers** are special CPU registers used to **control and configure low-level operations** of the processor  such as enabling paging, switching privilege levels, or setting up virtual memory.

These are **used by the OS kernel and hypervisors**, not in typical application-level code.

|Register|Name|Purpose|
|---|---|---|
|**CR0**|Control 0|Enables protected mode, paging, and other features|
|**CR2**|Control 2|Stores the faulting address on a page fault|
|**CR3**|Control 3|Holds the **Page Table Base Address**|
|**CR4**|Control 4|Enables advanced CPU features (SSE, PAE, etc.)|
|**CR8**|Control 8|Task Priority Register (x86-64 only, for APIC/interrupts)|
>**CR1, CR5-CR7** are reserved or unused.

## CR0 - Core CPU Control

Enables/disables basic processor features.

|Bit|Flag|Meaning|
|---|---|---|
|0|PE|**Protected Mode Enable**|
|31|PG|**Paging Enable**|
|2|TS|Task Switched|
|3|ET|Extension Type (387 math coproc)|
|5|NE|Numeric Error (for FPU)|
|16|WP|Write Protect (kernel paging)|

If `CR0.PG` is set, **virtual memory (paging)** is active.

## CR2 - Page Fault Linear Address

- When a **page fault** occurs, CR2 contains the **virtual address** that caused it.
- OS reads CR2 to understand which memory access failed.

```asm
mov rax, cr2   ; get the address that triggered the page fault
```
## CR3 - Page Table Base Register (PTBR)

- Holds the **physical address of the Level 4 page table** (in x86-64).
- Changing CR3 switches to a **new virtual address space** (used in context switching).

```asm
mov cr3, rax   ; switch page tables
```
## CR4 - Feature Enable Flags

Enables advanced features.

|Bit|Feature|Purpose|
|---|---|---|
|5|PAE|Physical Address Extension|
|9|OSFXSR|Enables SSE instructions|
|10|OSXMMEXCPT|Enables SSE exception handling|
|7|PGE|Global pages|
|12|SMAP|Supervisor Mode Access Prevention|
## CR8 (x86-64 only)

- Controls the **priority of interrupts**.
- Mostly used in **APIC interrupt controllers**.


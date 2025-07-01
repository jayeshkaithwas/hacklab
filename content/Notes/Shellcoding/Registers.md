---
title: Registers
aliases:
  - Registers
---
Registers are memory, usually connected directly to circuitry for performance reason. They are responsible for the modern computers to function, and can be manipulated with Assembly instructions.

- Registers can be grouped into four categories:
	1. General purpose
	2. Flags Register
	3. Segment
	4. Control

# 1. General Purpose
Used for most calculations, data movement, loop counters, function arguments, etc.

| 64-bit     | 32-bit   | 16-bit | 8-bit | Purpose / Notes                      |
| ---------- | -------- | ------ | ----- | ------------------------------------ |
| **RAX**    | EAX      | AX     | AL    | Accumulator (return values)          |
| **RBX**    | EBX      | BX     | BL    | Base register (can be general use)   |
| **RCX**    | ECX      | CX     | CL    | Counter (loops, shifts)              |
| **RDX**    | EDX      | DX     | DL    | Data (used in I/O, syscalls, etc.)   |
| **RSI**    | ESI      | SI     | SIL   | Source index (used in `movs`, etc.)  |
| **RDI**    | EDI      | DI     | DIL   | Destination index                    |
| **RBP**    | EBP      | BP     | BPL   | Base pointer (stack frame reference) |
| **RSP**    | ESP      | SP     | SPL   | Stack pointer                        |
| **R8–R15** | R8D–R15D | -      | -     | Extra general-purpose registers      |
-  In 64-bit mode, **you get 8 extra GPRs**: R8 to R15.

>[!Important]
>From this Registers ***Extended Stack Pointer*** **`ESP`** is most important because it points to the memory address where the next stack operation will take place.
>
>So with it we can point normal Program to point to at our malicious code and execute it.

# 2. Flags Register

| 64-bit     | 32-bit | Use                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------- |
| **RFLAGS** | EFLAGS | Contains status flags (zero, carry, overflow, sign, etc.) after operations |
So `RFLAGS` registers contains many sub-flags as follow: 

| Flag   | Full Name     | Set When...                                    |
| ------ | ------------- | ---------------------------------------------- |
| **ZF** | Zero Flag     | Result of an operation is zero                 |
| **SF** | Sign Flag     | Result is negative (most significant bit is 1) |
| **CF** | Carry Flag    | Carry out from an unsigned operation           |
| **OF** | Overflow Flag | Signed overflow occurred                       |
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

# 3. Segment Registers
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

# 4. Control Registers

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


There is one more Register that **holds the memory address of the next instruction** the CPU will execute also known as instruction Pointer.

| 64-bit  | 32-bit | Use                                          |
| ------- | ------ | -------------------------------------------- |
| **RIP** | EIP    | Holds address of next instruction to execute |

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


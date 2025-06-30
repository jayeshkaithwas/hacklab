---
title: Registers
aliases:
  - Registers
---
Registers are memory, usually connected directly to circuitry for performance reason. They are responsible for the modern computers to function, and can be manipulated with Assembly instructions.

- Registers can be grouped into four categories:
	- General purpose
	- Instruction Pointer
	- Segment
	- Control
	- Other

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

# 2. Instruction Pointer
It **holds the memory address of the next instruction** the CPU will execute.

| 64-bit  | 32-bit | Use                                          |
| ------- | ------ | -------------------------------------------- |
| **RIP** | EIP    | Holds address of next instruction to execute |
# 3. **Flags Register**

| 64-bit     | 32-bit | Use                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------- |
| **RFLAGS** | EFLAGS | Contains status flags (zero, carry, overflow, sign, etc.) after operations |

---

### 4. **Segment Registers**

Used historically for segmented memory; less relevant today but still exist.

|Register|Use|
|---|---|
|CS|Code Segment|
|DS|Data Segment|
|SS|Stack Segment|
|ES, FS, GS|Extra segments (can point to thread-local storage, etc.)|

---

### 5. **Control and Special Registers** (Used by OS or low-level code)

|Register|Use|
|---|---|
|CR0–CR4|Control registers for enabling paging, protection, etc.|
|GDTR, IDTR|Pointers to descriptor tables (GDT, IDT)|
|MSRs|Model-Specific Registers|
|XMM0–XMM15|SIMD registers (128-bit, for floating-point/packed int)|
|YMM0–YMM15|AVX 256-bit registers (if AVX enabled)|
|ZMM0–ZMM31|AVX-512 512-bit registers (if supported)|

---

## 💡 Example of Register Usage (in C + assembly):

```c
int add(int a, int b) {
    return a + b;
}
```

This might translate in assembly to:

```asm
mov eax, edi   ; move first argument (a) from EDI to EAX
add eax, esi   ; add second argument (b) from ESI to EAX
ret            ; return (value is in EAX)
```

> In x86-64, function arguments are passed in **RDI, RSI, RDX, RCX, R8, R9** (in order).

---

## 🧾 Summary

|Category|Examples|Purpose|
|---|---|---|
|General-Purpose|RAX, RBX, RCX, RDX, R8–R15|Arithmetic, arguments, pointers|
|Instruction|RIP|Tracks execution|
|Flags|RFLAGS|Status after operations|
|Segment|CS, DS, FS, GS|Legacy segmentation|
|Control/SIMD|CR0–CR4, XMM0+, YMM0+, etc.|OS-level and high-perf operations|

---

Let me know if you want:

- A visual chart of these registers,
    
- Their role in function calls (calling convention),
    
- How to inspect them in a debugger (like GDB or x64dbg),
    
- Or usage in shellcode / process injection.

---
title: Program Format
aliases:
  - Program Format
---

**A properly formatted assembly source file consists of several main parts:**
- **[[Program Format#Data Section (`section .data`)|Data Section]]** where initialized data is declared and defined.
- **[[Program Format#BSS Section (`section .bss`)|BSS Section]]** where uninitialized data is declared.
- **[[Program Format#Text Section (`section .text`)|Text Section]]** where code is placed.
# Comments
The **semicolon (`;`)** is used to **add comments** in the code.
- **Everything after a `;` on a line is ignored** by the assembler.
- Comments can be placed:
    - On a **line by themselves**
    - **After an instruction**, on the same line
Here's a clean and structured note for **Number Representation in Different Bases**, following your consistent format:
# Number Representation

In assembly language and low-level programming, **numbers can be written in different bases**.
Number values may be specified in **decimal, hex, or octal.**
1. **Decimal (Base-10)**
	- The **default number system**.
	- **No prefix or suffix** is needed.
	- Example:  
	    `127` (decimal) → just written as `127`
2. **Hexadecimal (Base-16)**
	- **Prefixed with `0x`**.
	- Uses digits `0–9` and letters `A–F`.
	- Example:  
	    `127` (decimal) → `0x7F` (hexadecimal)
3. **Octal (Base-8)**
	- **Suffixed with `q`**.
	- Uses digits `0–7` only.
	- Example:  
	    `511` (decimal) → `777q` (octal)

| Base    | Name        | Format Example | Meaning (Decimal) |
| ------- | ----------- | -------------- | ----------------- |
| Base-10 | Decimal     | `127`          | `127`             |
| Base-16 | Hexadecimal | `0x7F`         | `127`             |
| Base-8  | Octal       | `777q`         | `511`             |
# Defining Constants

**Constants** are defined using the keyword `equ`.

>**Format:**
```
<name> equ <value>
```

- A **constant cannot be changed** during program execution.
- The value is **substituted at assembly time** (before the program runs).
- **No memory location** is allocated to a constant.
- Constants are **not tied to a specific type or size** (like byte, word, etc.).
- The value must fit within the **range of its intended use**.

>**Example:**
```asm
SIZE equ 10000
```
- `SIZE` is a symbolic name for the value `10000`.
- It could be used as a **word** or a **double-word**, but **not a byte**, since the value is too large for 8 bits.

# Data Section (`section .data`)

The **`.data` section** is used for defining **initialized variables and constants**.

>**Syntax:**
```asm
section .data
<variableName>   <dataType>   <initialValue>
```

- Variable names must **start with a letter** and may include **letters, digits**, or `_`.
- The value must **fit within** the specified data type’s range.

**Supported Data Types:**

| Directive | Size    | Description      |
| --------- | ------- | ---------------- |
| `db`      | 8-bit   | byte variable(s) |
| `dw`      | 16-bit  | word variable(s) |
| `dd`      | 32-bit  | double word      |
| `dq`      | 64-bit  | quad word        |
| `ddq`     | 128-bit | 128-bit integer  |
| `dt`      | 128-bit | 128-bit float    |

>**Examples**:
```asm
bVar  db  10             ; 8-bit variable
cVar  db  'H'            ; Single character
strng db  'Hello World'  ; String (ASCII)
wVar  dw  5000           ; 16-bit variable
dVar  dd  50000          ; 32-bit variable
arr   dd  100, 200, 300  ; 3-element array
flt1  dd  3.14159        ; 32-bit float (note: assembler-dependent)
qVar  dq  1000000000     ; 64-bit variable
```

# BSS Section (`section .bss`)

The **`.bss` section** is used for **uninitialized variables**.

>**Syntax**:
```asm
section .bss
<variableName> <resType> <count>
```

- Variables are **allocated** but not initialized.
- Used for declaring **arrays or buffers** with a known size.

**Supported `res` Types:**

| Directive | Size    | Description              |
| --------- | ------- | ------------------------ |
| `resb`    | 8-bit   | reserve byte(s)          |
| `resw`    | 16-bit  | reserve word(s)          |
| `resd`    | 32-bit  | reserve double word(s)   |
| `resq`    | 64-bit  | reserve quad word(s)     |
| `resdq`   | 128-bit | reserve 128-bit variable |
>**Examples**:
```asm
bArr resb 10   ; 10-element byte array
wArr resw 50   ; 50-element word array
dArr resd 100  ; 100-element double-word array
qArr resq 200  ; 200-element quad-word array
```

# Text Section (`section .text`)

The **`.text` section** contains the **executable code**.

>Syntax:
```asm
section .text
global _start

_start:
    ; Instructions here
```

- Each instruction is written **one per line**.
- A **valid instruction** must have correct operands.
- The label `_start:` marks the **entry point** of the program.

>**Example**:
```asm
section .data
msg db "Hello", 0xA

section .bss
buffer resb 64

section .text
global _start

_start:
    ; Your code here
```

Here's a clean, organized summary and explanation of **Section 4.7 – Example Program**, rewritten for clarity and study/reference:

# Example : Basic Program Format

This program demonstrates the **layout and formatting** of a simple assembly program using **NASM syntax (x86-64)**.


```asm
; Simple example demonstrating basic program format and layout.
; Jayesh kaithwas
; July 2, 2025

; Data section
section .data     
	;constants
	EXIT_SUCCESS equ 0       ; Return code for successful termination
	SYS_exit     equ 60      ; System call number for exit
	
	;8-bit (Byte) Variables
	bVar1    db 17
	bVar2    db 9
	bResult  db 0            ; result = bVar1 + bVar23
	
	;16-bit (Word) Variables 
	wVar1    dw 17000
	wVar2    dw 9000
	wResult  dw 0            ; result = wVar1 + wVar2
	
	;32-bit (Double Word) Variables
	dVar1    dd 17000000
	dVar2    dd 9000000
	dResult  dd 0            ; result = dVar1 + dVar2
	
	;64-bit (Quad Word) Variables
	qVar1    dq 170000000
	qVar2    dq 90000000
	qResult  dq 0            ; result = qVar1 + qVar2
	
;Code Section
section .text
	global _start
	
_start:
	;Byte Addition
	mov  al, byte [bVar1]         ; Load bVar1 into AL
	add  al, byte [bVar2]         ; Add bVar2 to AL
	mov  byte [bResult], al       ; Store result in bResult
	
	;Word Addition
	mov  ax, word [wVar1]         ; Load wVar1 into AX
	add  ax, word [wVar2]         ; Add wVar2 to AX
	mov  word [wResult], ax       ; Store result in wResult
	
	;Double Word Addition
	mov  eax, dword [dVar1]       ; Load dVar1 into EAX
	add  eax, dword [dVar2]       ; Add dVar2 to EAX
	mov  dword [dResult], eax     ; Store result in dResult
	
	;Quad Word Addition
	mov  rax, qword [qVar1]       ; Load qVar1 into RAX
	add  rax, qword [qVar2]       ; Add qVar2 to RAX
	mov  qword [qResult], rax     ; Store result in qResult
	
;Terminate program
last:
	mov  rax, SYS_exit            ; Load syscall number for exit
	mov  rdi, EXIT_SUCCESS        ; Load exit code (0)
	syscall                       ; Make system call to exit
```


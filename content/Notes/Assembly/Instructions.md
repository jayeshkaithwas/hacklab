---
title: Instructions
aliases:
  - Instructions
tags:
  - Assembly
---

The instructions are presented in the following order:
- Data Movement
- Conversion Instructions
- Arithmetic Instructions
- Logical Instructions
- Control Instructions
# Operands

| **Operand Notation**                      | **Description**                                                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `<reg>`                                   | Register operand. The operand must be a register.                                                                                  |
| `<reg8>`, `<reg16>`, `<reg32>`, `<reg64>` | Register operand with specific size. <br>• `reg8` = byte-sized (e.g., `al`, `bl`) <br>• `reg32` = double-word (e.g., `eax`, `ebx`) |
| `<dest>`                                  | Destination operand. Can be a register or memory. Contents will be **overwritten** with the result of the instruction.             |
| `<RXdest>`                                | Floating-point destination register operand. Must be a floating-point register. Contents will be **overwritten** with the result.  |
| `<src>`                                   | Source operand. Value remains unchanged after instruction.                                                                         |
| `<imm>`                                   | Immediate value. Can be specified in decimal, hex, octal, or binary.                                                               |
| `<mem>`                                   | Memory location. Can be a variable name or an indirect reference (e.g., a memory address).                                         |
| `<op>` or `<operand>`                     | Generic operand. May be a register or memory.                                                                                      |
| `<op8>`, `<op16>`, `<op32>`, `<op64>`     | Operand with specific size requirement. Similar to `<reg8>`, etc., but may refer to either memory or register.                     |
| `<label>`                                 | Program label (typically used for jumps or function names).                                                                        |
# Data Movement
Data must be moved into a **CPU register** from **RAM** in order to be operated upon. Once the calculations are completed, the result may be copied from the register and placed into a variable. The `mov` instruction **copies** data from a **source** to a **destination**. This is the most basic and commonly used instruction in assembly, used to:

- Transfer data from memory to a register
- Move data between registers
- Store results back into memory

>[!info] 
>The **source** remains unchanged.  
> The **destination** receives a **copy** of the value.

>**Syntax**
```asm
mov <destination>, <source>
```

>Examples:
```asm
mov eax, dword [myVariable] ; Copy a 32-bit value from memory to eax
mov dword [dValue], 27      ; Store the immediate value 27 into memory
```

| Invalid Action                                 | Correct Behavior                                      |
| ---------------------------------------------- | ----------------------------------------------------- |
| You **cannot move memory to memory**           | Use a register as an intermediate                     |
| You **cannot use an immediate as destination** | Destination must be a register or memory              |
| Both operands **must be same size**            | E.g., 32-bit to 32-bit (`eax` ↔ `dword`), not 64 ↔ 32 |
When you move a 32-bit value (like `eax`) into a 64-bit register (like `rcx`), the **upper 32 bits are cleared (set to 0)**:

```asm
mov eax, 100        ; eax = 0x00000064
mov rcx, -1         ; rcx = 0xffffffffffffffff (-1)
mov ecx, eax        ; ecx = 0x00000064 ➜ rcx becomes 0x0000000000000064
```

Moving to a 32-bit register **zero-extends** the value to 64-bit.

```asm
mov dword [dValue], 27        ; dValue = 27

mov al, byte [bNum]           ; Load bNum into al
mov byte [bAns], al           ; Store al into bAns

mov ax, word [wNum]           ; wNum → ax
mov word [wAns], ax           ; ax → wAns

mov eax, dword [dNum]         ; dNum → eax
mov dword [dAns], eax         ; eax → dAns

mov rax, qword [qNum]         ; qNum → rax
mov qword [qAns], rax         ; rax → qAns
```

> In some cases, you can **omit `byte`, `word`, etc.** if the size is clear from the register.

# Addresses and Values
### Accessing Memory: `[]` Brackets

In x86-64 assembly, square brackets `[]` are used to **dereference** a memory location. That means you're asking for the **value stored at that memory address**.

> **Example:**

```asm
mov rax, qword [var1] ; value of var1 in rax
```

- This loads the **value** stored at the memory address labeled `var1` into the `rax` register.
- `qword` specifies that you're accessing 8 bytes (64 bits).

### Without Brackets: Getting the Address Instead

When you **omit the brackets**, you're asking the assembler to give you the **address of the variable**, not its value.

> **Example:**

```asm
mov rax, var1 ; address of var1 in rax
```

- This moves the **address** (i.e., the memory location) of `var1` into `rax`, not its value.

### lea
The tricky part is: **both forms are valid**, so the assembler will not warn you. But they do **very different things**, so it's easy to make mistakes if you confuse them.

Using `lea`  Load Effective Address.

The `lea` (Load Effective Address) instruction is another way to load an address into a register. It's like doing pointer arithmetic or getting the address of a variable, similar to the `&` operator in C.

> **Syntax:**
```asm
lea reg64, [memory_operand]
```

> **Examples:**
```asm
lea rcx, byte [bvar]   ; loads the address of bvar into rcx
lea rsi, dword [dVar]  ; loads the address of dVar into rsi
```

- Despite `[bvar]` and `[dVar]` looking like values, `lea` doesn't fetch the value at that address. It just calculates and returns the address itself.
- Think of `lea` as a **"get address"** tool, often used for pointer math or address calculation.

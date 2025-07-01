---
title: Assembly
aliases:
  - Assembly
---
**Assembly language** is a low-level programming language that provides a symbolic, human-readable way to write instructions that a CPU understands. It’s one step above **machine code** (binary) and is specific to a **CPU architecture** like x86, x86-64, ARM, RISC-V, etc.

# Features

- **Architecture-specific** (e.g., x86-64, ARM, MIPS)
- **Mnemonic-based**: Uses symbols like `mov`, `add`, `jmp`
- **Low-level**: Direct access to memory, CPU registers, and instructions
- **Used for**: OS kernels, bootloaders, reverse engineering, malware, performance-critical code.

# Instructions

| Mnemonic | Meaning       | Example        | Description                          |
| -------- | ------------- | -------------- | ------------------------------------ |
| `mov`    | Move data     | `mov rax, rbx` | Copies data between registers/memory |
| `add`    | Addition      | `add eax, 1`   | Adds a value                         |
| `sub`    | Subtraction   | `sub rbx, 10`  | Subtracts a value                    |
| `push`   | Stack push    | `push rax`     | Pushes a value onto the stack        |
| `pop`    | Stack pop     | `pop rbx`      | Pops value from the stack            |
| `call`   | Call function | `call my_func` | Calls a subroutine                   |
| `ret`    | Return        | `ret`          | Returns from subroutine              |
| `jmp`    | Jump          | `jmp label`    | Unconditional jump                   |
| `cmp`    | Compare       | `cmp eax, 0`   | Sets flags based on comparison       |
| `je`     | Jump if equal | `je label`     | Conditional jump if equal            |
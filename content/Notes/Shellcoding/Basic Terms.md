---
title: Basic Terms
aliases:
  - Basic Terms
---
# Shellcode
---
**Shellcoding** is an excellent way to learn more about **assembly language** and how a program **communicates with the underlying OS**.

> **Why are we red teamers and penetration testers writing shellcode?**

Because in real cases shellcode can be a code that is injected into a running program to make it do something it was not made to do, for example buffer overflow attacks. So shellcode is generally can be used as the “payload” of an exploit.

## Basic Terms
---
### Stack
The stack is a data structure, more specifically a ***Last In First Out*** **(LIFO)** data structure, which means that the most recent data placed, or pushed, onto the stack is the next item to be removed, or popped, from the stack. 
- The stack stores **local variables, information relating to function calls, and other information** used to clean up the stack after a function or procedure is called.
- The stack **grows down** the address space.
```
High memory address (e.g., 0xFFFF)
|
|  <-- Stack starts here (empty stack pointer)
|
|  Function A is called
|  Push return address
|  Push local variables
|
|  Function B is called
|  Push return address
|  Push local variables
|
V
Low memory address (e.g., 0x0000)
```
Each time a function is called:
- A **stack frame** is created (return address, arguments, local variables).
- This stack frame is **pushed at a lower address** than the one before.

## Heap
The Heap is a ***First In First Out*** **(FIFO)** data structure, which means data is placed and removed from the heap as it builds.
- The heap used to hold **program information, more specifically, dynamic variables**.
- **Allocated at runtime** (not at compile-time)
- Can **grow and shrink** as needed (until the system limit is reached). 
- The heap **grows up** the address space.
```
High Address
---------------
|    Stack     |  <--- Grows Down
---------------
|              |  <- Unused
---------------
|    Heap      |  <--- Grows Up
---------------
| Global/Data  |
---------------
|   Code (.text) |
---------------
Low Address
```

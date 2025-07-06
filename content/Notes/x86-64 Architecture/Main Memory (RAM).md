---
title: Main Memory (RAM)
aliases:
  - Main Memory (RAM)
---
Memory can be viewed as a series of bytes, one after another. That is, memory is **byte addressable**. This means each memory address holds one byte(8-bits) of information.

To store a **double-word(32-bits)**, four bytes are required which use four memory addresses.
- As Main Memory(RAM) follows ***little-endian*** endianness. Means the **Least Significant Byte(LSB)** is stored in the lowest memory address and the **Most Significant Byte (MSB)** is stored in the highest memory location.
![[images/Pasted image 20250701120825.png]]
>**Understand with example:**

We have a `DWORD var1 = 12345678`. 

Converting `12345678`to bits.
Refer: [[Memory Size#**Decimal to Binary Conversion**|Decimal to Binary Conversion]]
`12345678 = 1011 1100 0110 0001 1101 1110`

`1011 1100 0110 0001 1101 1110 = 24-bits` 
`24-bits = 3 bytes`
So it can fit in **4 bytes(32-bit)**.

**Step 1 :** Convert `12345678` to Hexadecimal.          
Refer: [[Memory Size#Decimal to Hexadecimal Conversion|Decimal to Hexadecimal Conversion]]
$$12345678₁₀ = 0x00BC614E₁₆$$
So, `var1 = 0x00BC614E`

Step 2: Storage in Memory (Little-Endian)
So, `0x00BC614E` is stored in memory as:

| Byte Index | Memory Address | Byte (Hex) | Value (Hex) | Meaning                      |
| ---------- | -------------- | ---------- | ----------- | ---------------------------- |
| var1 + 0   | `0x1000`       | `4E`       | `78`        | Least Significant Byte (LSB) |
| var1 + 1   | `0x1001`       | `61`       | `56`        |                              |
| var1 + 2   | `0x1002`       | `BC`       | `34`        |                              |
| var1 + 3   | `0x1003`       | `00`       | `12`        | Most Significant Byte (MSB)  |

# Memory Layout
---
![[images/Pasted image 20250701125122.png]]

- The reserved section is not available to user programs. 
- The text (or code) section is where the machine language(i.e., the 1's and 0's that represent the code) is stored. 
- The data section is where the initialized data is stored. This includes declared variables that have been provided an initial value at assemble-time.  
- The uninitialized data section, typically called BSS section, is where declared variables that have not been provided an initial value are stored. If accessed before being set, the value will not be meaningful.
- The [[Basic Terms#Heap|Heap]] is where dynamically allocated data will be stored (if requested)(e.g., `malloc`, `new`). And it grows upwards. 
- The [[Basic Terms#Stack|Stack]] starts in high memory and grows downward.

# Memory Hierarchy
---
In order to fully understand the various different memory levels and associated usage, it is useful to review the memory hierarchy. In general terms, faster memory is more expensive and slower memory blocks are less expensive. The CPU registers are small, fast, and expensive. Secondary storage devices such as disk drives and Solid State Drives (SSD's)  are larger, slower, and less expensive. The overall goal is to balance performance with cost.
![[images/Pasted image 20250701131116.png]]
Where the top of the triangle represents the fastest, smallest, and most expensive memory. As we move down levels, the memory becomes slower, larger, and less expensive. The goal is to use an effective balance between the small, fast, expensive memory and the large, slower, and cheaper memory.

|**Memory Unit**|**Example Size**|**Typical Speed**|
|---|---|---|
|**Registers**|16, 64-bit registers|~1 nanosecond|
|**Cache Memory (L1, L2)**|4 – 8+ Megabytes|~5–60 nanoseconds|
|**Primary Storage** (Main Memory / RAM)|2 – 32+ Gigabytes|~100–150 nanoseconds|
|**Secondary Storage** (HDD, SSD, etc.)|500 GB – 4+ Terabytes|~3–15 milliseconds|
---
title: Data Representation
aliases:
  - Data Representation
---
**Data representation** refers to how information is stored within the computer.
- There are different methods for storing integers, floating-point, characters, etc.
# Integer Representation
---
Computer has limited amount of space that can be used for storing each number or variable. For example,
- A **byte(8-bit)** ca be used to store $2^8$ or  different numbers.
	- This consider, 0 to 255(inclusive) unsigned(all positive) numbers.
	- Or -128 to 127(inclusive) signed(both positive and negative) numbers.
Same a **word (16-bits)** can be used to represent $2^{16}$ or 65,536 different values, and a **double-word (32-bits)** can be used to represent $2^{32}$ or 4,294,967,296 different numbers.

| **Size**             | **Bits**  | **Unsigned Range** | **Signed Range**                 |
| -------------------- | --------- | ------------------ | -------------------------------- |
| **Byte**             | $2^8$     | 0 to 255           | −128 to +127                     |
| **Word**             | $2^{16}$  | 0 to 65,535        | −32,768 to +32,767               |
| **Double Word**      | $2^{32}$  | 0 to 4,294,967,295 | −2,147,483,648 to +2,147,483,647 |
| **Quad Word**        | $2^{64}$  | 0 to $2^{64}$ − 1  | −$2^{63}$ to + $2^{63}$ − 1      |
| **Double Quad Word** | $2^{128}$ | 0 to $2^{64}$ − 1  | −$2^{127}$ to +$2^{127}$ − 1     |
![[images/Pasted image 20250701141322.png]]
When the unsigned and signed values are within the overlapping positive **range (0 to +127)**:
- An unsigned byte representation of $12_{10}$ is `0x0C16`
- A signed byte representation of $-12_{10}$ is also `0x0C16`
But, when the unsigned and signed values are **outside the overlapping range**:
- An unsigned byte representation of $241_{10}$ is  `0xF116`
- A signed byte representation of $241_{10}$ is not `0xF116`, `0xF116` is $-15_{10}$

This can be confusing until you clear **Two's Complement topic**.

- An ***unsigned*** value is converted into binary with Standard binary conversion method.
- But, a ***signed*** value is converted into binary with Two's Complement method.

>What is **Two's Complement**?
- It is **Simple Two Steps** used to convert:
	- *unsigned binary* to *signed binary* 
	- *signed binary* to *unsigned Binary*.
- **Two Steps:**
	1. Flip the bits.
	2. Add 1.
To do this steps first you should know, how bits are added. See next topic.
And if you are already aware of addition then jump to the [[Data Representation#Unsigned Integer to Signed Integer|Converting Unsigned Integer to Signed Integer]].
# Addition of Bits
---
It is not that simple to add bits like normal adding numbers or xor'ing bits. But also it's not that too hard.

To understand this easily learn this simple rule.

>[!Warning] Rule
> $1+1=10$ **as $2$ in bits is $10$**
> $1+1+1=11$  **as $3$ in binary is $11$**

Then else is same as **normal addition**.

>**Example:** 4-bits

**10 + 7**

|     |     |     |  1  |     |     |
| :-: | --- | :-: | :-: | :-: | :-: |
|     | 10  |  1  |  0  |  1  |  0  |
|  +  | 3   |  0  |  0  |  1  |  1  |
|  =  | 13  |  1  |  1  |  0  |  1  |
> **Example:** 8-bits

**55 + 38**

|     |          |         |  **1**  |         |         |  **1**  |  **1**  |         |         |
| :-: | -------- | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
|     | **55**   |    0    |    0    |    1    |    1    |    0    |    1    |    1    |    1    |
|  +  | **38**   |    0    |    0    |    1    |    0    |    0    |    1    |    1    |    0    |
|  =  | ***93*** | ***0*** | ***1*** | ***0*** | ***1*** | ***1*** | ***1*** | ***0*** | ***1*** |
# Conversion and Interpretation.
## Unsigned Integer to Signed Integer

Not all integer values are positive. In some scenarios, negative integers are required. For Example, to represent the difference between two integers, you need to take into account that the difference could be negative, and only signed integers can hold negative values.
**So to represent signed integer in native integer value which can interpret ate by CPU, there is a concept called two's complement.** Which helps in conversion between unsigned and signed values.
### 4-bit Example:

Positive Number (e.g., +5):
- Binary: `0101`

Negative Number (e.g., -5):
1. Start with +5: `0101`
2. Flip the bits(1 become 0 and 0 become 1): `1010`
3. Add 1:  
    `1010` + `0001` = `1011`

- So, **-5 = `1011`** in 4-bit two's complement.
 This $2^{nd}$ and $3^{rd}$ step in known as **Two's Complement**.

| Binary | Decimal |
| ------ | ------- |
| 0000   | 0       |
| 0001   | 1       |
| 0010   | 2       |
| 0011   | 3       |
| 0100   | 4       |
| 0101   | 5       |
| 0110   | 6       |
| 0111   | 7       |
| 1000   | -8      |
| 1001   | -7      |
| 1010   | -6      |
| 1011   | -5      |
| 1100   | -4      |
| 1101   | -3      |
| 1110   | -2      |
| 1111   | -1      |
### 8-bit Example:

Positive Number (e.g., +123):
- Binary: `01111011`

Negative Number (e.g., -123):
1. Flip the bits: `10000100`
2. Add 1:  
    `10000100` + `00000001` = `10000101`

- So, **-123 = `10000101`** in 8-bit two's complement.

## Interpretation of bits.

So there are bits(11111000) which represent to signed integer. And you want to know what it is. To know that we can use **Two's Complement**.

**Example:** `11111000`

1. Flip the bits: `00000111`
2. Add 1:  
	`00000111` + `00000001` = `00001000`
- `00001000` = **8** 
- So, **`11111000`** = $-8$
# Floating-point Representation
The representation issues for floating-point numbers are more complex. There are a series of floating-point representations for various ranges of the value. For simplicity, we will look primarily at the **IEEE 754 32-bit** floating-point standard.

## IEEE 32-bit Representation

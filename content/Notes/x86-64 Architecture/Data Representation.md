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
![[images/Pasted image 20250702105219.png]]
A 32-bit floating-point number is divided into **three parts**:

| **Sign (1 bit)** | **Exponent (8 bits)** | **Mantissa / Fraction (23 bits)** |
| ---------------- | --------------------- | --------------------------------- |
1. **Sign Bit (S)**
- **1 bit**: Determines the **sign** of the number.
    - `0` = **positive**
    - `1` = **negative**     

2. **Exponent (E)**
- **8 bits**: Stores the **exponent** in **"biased" form**. 
- Bias for single precision = **127**
    - Actual exponent = `Exponent bits (as int)` − 127

3. **Mantissa (M) / Fraction**
- **23 bits**: Represents the **fractional part** (also called the **significand**).
- The value is stored **without the leading 1** (because it's implicit in normalized numbers).

#### Example 1 : Represent 5.75
1. **Convert 5.75 to binary**:   
    `5.75 = 101.11` = $1.0111× 2^2$                    Refer: [[Memory Size#Decimal to Binary|Decimal to Binary Conversion]]
2. **Sign bit (S)** = `0` (positive)
3. **Exponent (E)** = $127+2=129 → 10000001$
4. **Mantissa (M)** = binary after the dot in `1.0111` → `01110000000000000000000`

So the 32-bit binary is:
```
0 10000001 01110000000000000000000
```

**In hex: `0x40B80000`**

#### Example 2 : Represent 7.77
1. **Convert 7.77 to binary**:          Refer: [[Memory Size#Decimal to Binary|Decimal to Binary Conversion]], [[Memory Size#Example Convert 7.77|Example: Convert 7.77]]
	**Integer part = 7 →** `111`  
	**Fractional part = 0.77 → binary:**
	```
	0.77 × 2 = 1.54 → 1
	0.54 × 2 = 1.08 → 1
	0.08 × 2 = 0.16 → 0
	0.16 × 2 = 0.32 → 0
	0.32 × 2 = 0.64 → 0
	0.64 × 2 = 1.28 → 1
	0.28 × 2 = 0.56 → 0
	0.56 × 2 = 1.12 → 1
	0.12 × 2 = 0.24 → 0
	0.24 × 2 = 0.48 → 0
	0.48 × 2 = 0.96 → 0
	0.96 × 2 = 1.92 → 1
	0.92 × 2 = 1.84 → 1
	0.84 × 2 = 1.68 → 1
	0.68 × 2 = 1.36 → 1
	...
	```
	
	So the **binary** of `7.77` is approximately:
	$111.110001010001110000101000111... (repeating)$
	
	Now normalize:
	$111.11000101000111000010100 = 1.11110001010001110000101 × 2^2$

2. **Sign bit (S)** = `0` (positive)
3. **Exponent (E)** = $127+2=129 → 10000001$
4. **Mantissa (M)** = binary after the dot in `1.11110001010001110000101` → `11110001010001110000101`

So the 32-bit binary is:
```
0 10000001 11110001010001110000101
```

**In Hex**: `0x40F8A385

#### Example 3 : Represent -7.75
1. **Convert -7.75 to binary**:   
    `7.75 = 111.11` = $1.1111× 2^2$                    Refer: [[Memory Size#Decimal to Binary|Decimal to Binary Conversion]]
2. **Sign bit (S)** = `1` (negative)
3. **Exponent (E)** = $127+2=129 → 10000001$
4. **Mantissa (M)** = binary after the dot in `1.1111` → `11110000000000000000000`

So the 32-bit binary is:
```
1 10000001 11110000000000000000000
```

**In hex: `0xC0F80000`**
#### Example 4 : Represent -0.125
1. **Convert -0.125 to binary**:   
    `-0.125 = 0.001` = $1.0× 2^{-3}$                    Refer: [[Memory Size#Decimal to Binary|Decimal to Binary Conversion]]
2. **Sign bit (S)** = `1` (negative)
3. **Exponent (E)** = $127+(-3)=124 → 01111100$
4. **Mantissa (M)** = binary after the dot in `1.0` → `00000000000000000000000`

So the 32-bit binary is:
```
1 01111100 00000000000000000000000
```

**In hex: `0xBE000000`**

#### Example 5 : Represent 5.75
1. **Convert 5.75 to binary**:   
    `5.75 = 101.11` = $1.0111× 2^2$                    Refer: [[Memory Size#Decimal to Binary|Decimal to Binary Conversion]]
2. **Sign bit (S)** = `0` (positive)
3. **Exponent (E)** = $127+2=129 → 10000001$
4. **Mantissa (M)** = binary after the dot in `1.0111` → `01110000000000000000000`

So the 32-bit binary is:
```
0 10000001 01110000000000000000000
```

**In hex: `0x40B80000

#### Example 6 : Identification `0x41440000`
1. **Convert `0x41440000` to binary:**              Refer: [[Memory Size#Hexadecimal to Integer|Hexadecimal to Integer]], [[Memory Size#Integer to Binary|Integer to Binary]]
	`0100 0001 0100 0100 0000 0000 0000 0000`
2. **Split into Components**: `0 10000010 10001000000000000000000`
3. **Determine Mantissa(M)**: `1.` before the binary → `1.1000100`
4. **Determine Exponent(E)**:                         Refer: [[Memory Size#Binary to Integer|Binary to Integer]]
	   `10000010` → **130** → $130 - 127 = 3$ → **3**      
5. **Sign(S)** = `0`  →  Positive.
6. **Binary to decimal**: $1.10001 × 2^3$ → `1100.01` = **+12.25**     Refer: [[Memory Size#Binary to Decimal|Binary to Decimal]]

## IEEE 64-bit Representation
![[images/Pasted image 20250702152758.png]]
The representation process is same as [[Data Representation#IEEE 32-bit Representation|IEEE 32-bit Representation]]. The only difference is IEEE 64-bit format allows an **11-bit biased exponent(E)** and 11-bit biased exponent used a bias of ±$1023$.
### Not a Number (NaN)
A **NaN (Not a Number)** is a special value used to represent undefined or unrepresentable results in **floating-point arithmetic**.

- When a value is **interpreted as a floating-point number** but **does not follow the correct format** (for 32-bit or 64-bit standards).    
- When an **integer is mistakenly treated as a floating-point** value.
- When the result of a **floating-point operation** (e.g., addition, subtraction, multiplication, or division) is **too large** or **too small** to be represented.
- When the operation itself is **undefined**, such as:
    - $\frac{0}{0}$
    - $\infty - \infty$
    - $\sqrt{-1}$ (in real numbers)

- **NaN** is **not a valid number**, but it is still a **valid floating-point value** used to signal errors. 
- It allows a program to continue running even if a computation becomes undefined.
- **NaNs propagate** through calculations: any arithmetic operation with a **NaN** usually results in a **NaN**.
# Characters and Strings

In addition to numeric data, **symbolic (non-numeric) data** is also commonly used. For example, a message like `"Hello World"`.

- Computers are built to **store and process numbers**.
- To handle symbols like letters, digits, or punctuation, we **assign numeric values to each character**.
- This allows symbolic data to be stored and processed in memory.

## Character Representation
A **character** is a unit of information that represents a **symbol** such as:
- Letters (`A`, `b`, etc.)
- Digits (`0`–`9`)
- Punctuation (`.`, `!`, etc.)
- Whitespace (`space`, `tab`, `newline`, etc.)
- **Control characters**, which affect text processing (e.g., carriage return, tab)

#### American Standard Code for Information Interchange (ASCII)
- **ASCII** is a standard that assigns a **numeric value to each character**.
- Examples:
    - `'A'` → `65` (decimal) or `0x41` (hex)
    - `'9'` → `57` (decimal) or `0x39` (hex)

> If `9` (as an **integer**) is interpreted as an ASCII character (`0x09`), it will be seen as a **tab** character.
- **Character** `'2'` ≠ **Integer** `2`
    - Characters: for **display**, not for calculation
    - Integers: for **calculation**, not directly displayable
- **Characters** are stored using **1 byte (8 bits)**, aligning with **byte-addressable memory**.

#### Unicode
- **Unicode** is a modern standard supporting **multiple languages and scripts**.
- Unicode uses encodings like:
    - **UTF-8** (most common, backward-compatible with ASCII)
    - **UTF-16**, **UTF-32**
- Unicode assigns a **unique number to every character**, regardless of platform, language, or program.

> Details of Unicode encoding are beyond this section.


## String Representation
A **string** is a **sequence of characters**, typically stored in memory with a **NULL terminator**.
> **NULL** = special ASCII control character (`0x00`) marking the **end of the string**
##### Example 1: `"Hello"`

|Character|`H`|`e`|`l`|`l`|`o`|`NULL`|
|---|---|---|---|---|---|---|
|ASCII (dec)|72|101|108|108|111|0|
|ASCII (hex)|0x48|0x65|0x6C|0x6C|0x6F|0x00|
##### Example 2: `"19653"`

|Character|`1`|`9`|`6`|`5`|`3`|`NULL`|
|---|---|---|---|---|---|---|
|ASCII (dec)|49|57|54|53|51|0|
|ASCII (hex)|0x31|0x39|0x36|0x35|0x33|0x00|

>  `"19653"` as a **string** uses **6 bytes** (including NULL)  
>  `19653` as an **integer** can be stored in **2 bytes** (one word)


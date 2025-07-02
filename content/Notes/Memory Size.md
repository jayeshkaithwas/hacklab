---
title: Memory Size
aliases:
  - Memory Size
---
# **Memory Size Table**

| Unit           | Size (Bytes)          |
| -------------- | --------------------- |
| Bit (b)        | 1 bit  `or`  1/8 byte |
| Nibble         | 4 bits                |
| Byte (B)       | 8 bits                |
| Kilobyte (KB)  | 1024 bytes            |
| Megabyte (MB)  | 1024 KB               |
| Gigabyte (GB)  | 1024 MB               |
| Terabyte (TB)  | 1024 GB               |
| Petabyte (PB)  | 1024 TB               |
| Exabyte (EB)   | 1024 PB               |
| Zettabyte (ZB) | 1024 EB               |
| Yottabyte (YB) | 1024 ZB               |

# Memory size used in `x86-64` architecture

| Storage (Unit)   | Size(bits) | Size(bytes) |
| ---------------- | ---------- | ----------- |
| Byte             | 8-bits     | 1 byte      |
| Word             | 16-bits    | 2 bytes     |
| Double-word      | 32-bits    | 4 bytes     |
| Quardword        | 64-bits    | 8 bytes     |
| Double quardword | 128-bits   | 16 bytes    |
# Memory size in C/C++
| **C/C++ Declaration** | **Storage (Unit)** | **Size (bits)** | **Size (bytes)** |
| --------------------- | ------------------ | --------------- | ---------------- |
| `char`                | Byte               | 8 bits          | 1 byte           |
| `short`               | Word               | 16 bits         | 2 bytes          |
| `int`                 | Double-word        | 32 bits         | 4 bytes          |
| `unsigned int`        | Double-word        | 32 bits         | 4 bytes          |
| `long`[^1]            | Quadword           | 64 bits         | 8 bytes          |
| `long long`           | Quadword           | 64 bits         | 8 bytes          |
| `int *`[^2]           | Quadword           | 64 bits         | 8 bytes          |
| `char *`              | Quadword           | 64 bits         | 8 bytes          |
| `float`               | Double-word        | 32 bits         | 4 bytes          |
| `double`              | Quadword           | 64 bits         | 8 bytes          |
[^1]: The `long` type declaration is compiler dependent. Type shown is for gcc and g++ compilers.

[^2]: `int *` means the address of an integer.

---
# Addition of Bits

**Example:**
You're adding:

```
  00110111   (which is 55 in decimal)
+ 00000001   (which is 1 in decimal)
------------
= 00111000   (which is 56 in decimal)
```

Let's Add Bit by Bit (Right to Left):

```
Bit position:  7 6 5 4 3 2 1 0
               0 0 1 1 0 1 1 1   ← 00110111
           +   0 0 0 0 0 0 0 1   ← 00000001
           -------------------
               0 0 1 1 1 0 0 0   ← 00111000
```

Explanation of the rightmost bits:
- `1 + 1` = `10` → you write down **0**, carry over **1**
- `1 + 0 + carry 1` = `10` → write down **0**, carry **1**
- `1 + 0 + carry 1` = `10` → write down **0**, carry **1**
- `0 + 0 + carry 1` = `1` → write **1**, carry **0**
- Remaining bits add up normally.
---


# 7-bit integer encoding

It is also known as **Base-127 Varint encoding**

| Chunk Position   | Continuation Bit (MSB) |
| ---------------- | ---------------------- |
| First (LSB side) | `1` if more follow     |
| Last (MSB side)  | Always `0`             |

| Value Range   | Bytes Used | MSB of Each Byte                           |
| ------------- | ---------- | ------------------------------------------ |
| `0 – 127`     | 1 byte     | `0xxxxxxx` (MSB = 0)                       |
| `128 – 16383` | 2 bytes    | First: `1xxxxxxx`, Second: `0xxxxxxx`      |
| `>16383`      | 3+ bytes   | All but last: `1xxxxxxx`, Last: `0xxxxxxx` |
1. Convert 300 to binary.
2. Break into 7-bit chunks.
3. Add continuation bits

###### ***Example:*** Encoding integer 300

**Step 1:** Convert 300 to binary.

- `00000001` `00101100`        →        16-bit 
- =`0b100101100`

**Step 2:** Break into 7-bit chunks.

- `00` `0000010` `0101100`
- $1^{st}$ chunk = `0101100`
- $2^{nd}$ chunk = `0000010`

**Step 3:** Add continuation bits
Converting chunks to **8-bit** and then adding `1` to MSB, to the chunk who follows more bytes and `0` to MSB, to the chunk who follows **least bytes**.

$1^{st}$ chunk = ` 0101100`
		= `00101100`
$2^{nd}$ chunk = ` 0000010`
		 = `00000010`

Adding `1` to $1^{st}$ chunks MSB and `0` to $2^{nd}$ chunks MSB.

$1^{st}$ chunk = `00101100` + `1`
		= `10101100`
		= `0xAC`                     →        Hexadecimal
$2^{nd}$ chunk = `00000010` + `0`
		 = `00000010`
		 = `0x02`                    →        Hexadecimal

**Result:**
Encoded as bytes:
```csharp
[0xAC, 0x02]
```

Or in binary:
```csharp
10101100 00000010
```




# Conversion
***Integer*** : $1, 2, 6, 55, 58, 106, etc.$
***Decimal*** : $0.5, 1.75, 12.345, 0.001, etc.$
***Binary*** : $10101, 10001 , 10100011, 1001, etc.$
***Hexadecimal*** : $0x1A, 0x2F, 0xFF, 0x100, etc.$
## Integer to Binary

To convert a decimal number to binary:

1. Divide the number by  `2`.
2. Record the remainder.
3. Repeat the process with the quotient until you reach  `0`.
4. The binary representation is the remainders read in reverse order.

#### Example: Convert `13` to binary.

| Division Step | Quotient | Remainder |
| ------------- | -------- | --------- |
| 13 / 2        | 6        | 1         |
| 6 / 2         | 3        | 0         |
| 3 / 2         | 1        | 1         |
| 1 / 2         | 0        | 1         |

Binary of 13: **1101**

## Binary to Integer

To convert a binary number to decimal:

1. Multiply each bit by  `2`  raised to its position (from right, starting at  `0`).
2. Sum the results.

#### Example: Convert  `1101`  to decimal.

$$
1×2^3+1×2^2+0×2^1+1×2^0 
$$
$$
8+4+0+1=13
$$

Decimal of 1101: **13**

## Integer to Hexadecimal

> **Hex Table (0–15):**

| Decimal | Hex |
| ------- | --- |
| 0       | 0   |
| 1       | 1   |
| ...     | ... |
| 10      | A   |
| 11      | B   |
| 12      | C   |
| 13      | D   |
| 14      | E   |
| 15      | F   |

**To convert a decimal to hexadecimal:**

1. Divide the decimal number by 16 till Quotient < 16.
2. Convert Quotient and Reminders values to hex digits.
3. Put them together.

#### Example: Convert `65` to Hexadecimal.
**Step 1:** 

- 65 ÷ 16 = 4 remainder **1**

This gives:
- Quotient = 4
- Remainder = 1

**Step 2:**

- Quotient: `4` → hex digit is `4`
- Remainder: `1` → hex digit is `1`

**Step 3:**

- So, **65 in decimal = 0x41 in hex**

**Exercise:**
1. Convert **10** to hexadecimal.     →     [[Answers#1. Convert **10** to hexadecimal.|Answer]]
2. Convert **15** to hexadecimal.     →     [[Answers#2. Convert **15** to hexadecimal.|Answer]]
3. Convert **31** to hexadecimal.     →     [[Answers#3. Convert **31** to hexadecimal.|Answer]]
   
4. Convert **64** to hexadecimal.     →     [[Answers#4. Convert **64** to hexadecimal.|Answer]]
5. Convert **127** to hexadecimal.     →     [[Answers#5. Convert **127** to hexadecimal.|Answer]]
6. Convert **255** to hexadecimal.     →     [[Answers#6. Convert **255** to hexadecimal.|Answer]]
   
7. Convert **1023** to hexadecimal.     →     [[Answers#7. Convert **1023** to hexadecimal.|Answer]]    
8. Convert **4096** to hexadecimal.     →     [[Answers#8. Convert **4096** to hexadecimal.|Answer]]
9. Convert **12345** to hexadecimal.     →     [[Answers#9. Convert **12345** to hexadecimal.|Answer]]
10. Convert **65535** to hexadecimal.     →     [[Answers#10. Convert **65535** to hexadecimal.|Answer]]


## Hexadecimal to Integer

To convert a **hexadecimal number to decimal**, follow this simple method:

1. Write the hexadecimal number.
2. Replace each hex digit with its decimal equivalent.
3. Multiply each by 16 raised to its positional power.
4. Add all the products together.

Take each digit, multiply it by **16 raised to the power of its position** (counting from right to left, starting at 0), and sum the results.

#### Example: Convert `2F` to decimal

```
= (2 × 16¹) + (F × 16⁰)
= (2 × 16) + (15 × 1)
= 32 + 15
= 47
```

#### Example: Convert `3A7` to decimal

```
= (3 × 16²) + (A × 16¹) + (7 × 16⁰)
= (3 × 256) + (10 × 16) + (7 × 1)
= 768 + 160 + 7
= 935
```

**Exercise:**

1. Convert hexadecimal **A** to decimal.
2. Convert hexadecimal **1F** to decimal.
3. Convert hexadecimal **3C** to decimal.

4. Convert hexadecimal **7E** to decimal.
5. Convert hexadecimal **FF** to decimal.
6. Convert hexadecimal **100** to decimal.

7. Convert hexadecimal **1A3** to decimal.
8. Convert hexadecimal **2F7** to decimal.
9. Convert hexadecimal **3E8** to decimal.
10. Convert hexadecimal **FFFF** to decimal.

## Decimal to Binary 

To convert a **decimal integer** to binary:
1. **Divide** the number by 2.
2. **Record the remainder** (it will be 0 or 1).
3. **Divide the quotient** again by 2.
4. Repeat until the quotient is 0.
5. The **binary number is the remainders read from bottom to top**.

#### Example: Convert 10.625

Divide the numbers into two part.
	$10 + 0.625 = 10.625$

Now, find binary for `10` and `0.625`.

**`10` = `1010`**                      Refer: [[Memory Size#Integer to Binary|Integer to Binary Conversion]]

```
0.625 × 2 = 1.25 → 1
0.25  × 2 = 0.5  → 0
0.5   × 2 = 1.0  → 1
```
**Binary of `0.625` = `.101`**

So, **`10.625` (decimal) = `1010.101` (binary)**

#### Example: Convert 7.77

Divide the numbers into two part.
	$7 + 0.77 = 7.77$

Now, find binary for `7` and `0.77`.

**`7` = `0111`**                      Refer: [[Memory Size#Integer to Binary|Integer to Binary Conversion]]

## Binary to Decimal

To convert a **binary number** to decimal:
1. **Separate** the integer and fractional parts (if any).
2. For the **integer part**, multiply each bit by $2^n$, where **n** is the position from right to left, starting at 0.
3. For the **fractional part**, multiply each bit by $2^{-n}$, where **n** starts at 1 and increases to the right.
4. **Add** all the values together.

#### Example: Convert `1010.101` to Decimal

Divide the binary into two parts.  
`1010 + 0.101 = 1010.101`

Now, convert both parts to decimal.

**Integer Part: `1010`**
```
(1 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰)  
= 8 + 0 + 2 + 0 = 10
```

**Fractional Part: `.101`**
```
(1 × 2⁻¹) + (0 × 2⁻²) + (1 × 2⁻³)  
= 0.5 + 0 + 0.125 = 0.625
```

So, **`1010.101` (binary) = `10.625` (decimal)**

#### Example: Convert `111.110001` to Decimal

Divide the binary into two parts.  
`111 + 0.110001 = 111.110001`

Now, convert both parts to decimal.

**Integer Part: `111`**
```
(1 × 2²) + (1 × 2¹) + (1 × 2⁰)  
= 4 + 2 + 1 = 7
```

**Fractional Part: `.110001`**
```
(1 × 2⁻¹) + (1 × 2⁻²) + (0 × 2⁻³) + (0 × 2⁻⁴) + (0 × 2⁻⁵) + (1 × 2⁻⁶)  
= 0.5 + 0.25 + 0 + 0 + 0 + 0.015625  
= 0.765625
```

So, **`111.110001` (binary) = `7.765625` (decimal)**



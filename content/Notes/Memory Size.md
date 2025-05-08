---
title: Memory Size
aliases:
  - Memory Size
---
```
			       1 Bit (b) = 1 Bit
			        1 Nibble = 4 Bits
			      1 Byte (B) = 8 Bits
			 1 Kilobyte (KB) = 1024 Bytes
			 1 Megabyte (MB) = 1024 Kilobytes
			 1 Gigabyte (GB) = 1024 Megabytes
			 1 Terabyte (TB) = 1024 Gigabytes
			 1 Petabyte (PB) = 1024 Terabytes
			  1 Exabyte (EB) = 1024 Petabytes
			1 Zettabyte (ZB) = 1024 Exabytes
			1 Yottabyte (YB) = 1024 Zettabytes
```

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

---

# **Decimal to Binary Conversion**

To convert a decimal number to binary:

1. Divide the number by  `2`.
2. Record the remainder.
3. Repeat the process with the quotient until you reach  `0`.
4. The binary representation is the remainders read in reverse order.

###### **_Example:_** Convert `13` to binary.

| Division Step | Quotient | Remainder |
| ------------- | -------- | --------- |
| 13 / 2        | 6        | 1         |
| 6 / 2         | 3        | 0         |
| 3 / 2         | 1        | 1         |
| 1 / 2         | 0        | 1         |

Binary of 13: **1101**

---

# **Binary to Decimal Conversion**

To convert a binary number to decimal:

1. Multiply each bit by  `2`  raised to its position (from right, starting at  `0`).
2. Sum the results.

###### **_Example:_** Convert  `1101`  to decimal.

$$
1×2^3+1×2^2+0×2^1+1×2^0 
$$
$$
8+4+0+1=13
$$

Decimal of 1101: **13**

---
# Decimal to Hexadecimal Conversion

### 💡 Hex Table (0–15):

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

###### ***Example:*** Convert 65 to Hexadecimal.
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

---
# Hexadecimal to Decimal Conversion

To convert a **hexadecimal number to decimal**, follow this simple method:

1. Write the hexadecimal number.
2. Replace each hex digit with its decimal equivalent.
3. Multiply each by 16 raised to its positional power.
4. Add all the products together.

Take each digit, multiply it by **16 raised to the power of its position** (counting from right to left, starting at 0), and sum the results.

**Example:** Convert `2F` to decimal

```
= (2 × 16¹) + (F × 16⁰)
= (2 × 16) + (15 × 1)
= 32 + 15
= 47
```

**Example:** Convert `3A7` to decimal

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

---
# Converting Unsigned Integer to Signed Integer

Not all integer values are positive. In some scenarios, negative integers are required. For Example, to represent the difference between two integers, you need to take into account that the difference could be negative, and only signed integers can hold negative values.
**So to represent signed integer in native integer value which can interpret ate by CPU, there is a concept called two's complement.** Which helps in conversion between unsigned and signed values.

![[images/Pasted image 20250507160212.png]]
**MSB** → Most Significant Bit
**LSB**  → Least Significant Bit 

- Simple sign detection: **MSB (Most Significant Bit)** is the **sign bit**:
	- `0` = positive
	- `1` = negative

>**4-bit Example:**

Positive Number (e.g., +5):
- Binary: `0101`

Negative Number (e.g., -5):
1. Start with +5: `0101`
2. Flip the bits: `1010`
3. Add 1:  
    `1010` + `0001` = `1011`

- So, **-5 = `1011`** in 4-bit two's complement.

|Binary|Decimal|
|---|---|
|0000|0|
|0001|1|
|0010|2|
|0011|3|
|0100|4|
|0101|5|
|0110|6|
|0111|7|
|1000|-8|
|1001|-7|
|1010|-6|
|1011|-5|
|1100|-4|
|1101|-3|
|1110|-2|
|1111|-1|

- For **n bits**, two's complement can represent integers in the range:
    $-2^{n-1} \text{ to } 2^{n-1} - 1$
    - For 8 bits: **-128 to +127**
    - For 4 bits: **-8 to +7**


>**8-bit Example:**

Positive Number (e.g., +123):
- Binary: `01111011`

Negative Number (e.g., -123):
1. Start with +123: `01111011`
2. Flip the bits: `10000100`
3. Add 1:  
    `10000100` + `00000001` = `10000101`

- So, **-123 = `10000101`** in 8-bit two's complement.

>Let’s decode `10000101` as **signed two’s complement**:

Break down the bits:  
`1 0 0 0 0 1 0 1`

Bit weights (signed):
- MSB = $-128$
- The rest: $64,32,16,8,4,2,1$

Now add the weights for the 1s:
- `-128` (from the MSB)
- `4` and `1` from the last two bits

−128+4+1=−123-128 + 4 + 1 = -123

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


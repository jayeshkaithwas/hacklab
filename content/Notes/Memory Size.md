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

**_Example:_** Convert `13` to binary.

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

**_Example:_** Convert  `1101`  to decimal.

$$
1×2^3+1×2^2+0×2^1+1×2^0 
$$
$$
8+4+0+1=13
$$

Decimal of 1101: **13**

---
# Decimal to Hexadecimal Conversion

To convert a decimal to hexadecimal:

1. Divide the decimal number by 16
2. Convert Quotient and Reminder values to hex digits.
3. Put them together.

***Example:*** Convert 65 to Hexadecimal.

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

### 💡 Hex Table (0–15):

|Decimal|Hex|
|---|---|
|0|0|
|1|1|
|...|...|
|10|A|
|11|B|
|12|C|
|13|D|
|14|E|
|15|F|

---
# Converting Unsigned Integer to Signed Integer

Not all integer values are positive. In some scenarios, negative integers are required. For Example, to represent the difference between two integers, you need to take into account that the difference could be negative, and only signed integers can hold negative values.
**So to represent signed integer in native integer value which can interpret ate by CPU, there is a concept called two's complement.** Which helps in conversion between unsigned and signed values.

![[images/Pasted image 20250507160212.png]]
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

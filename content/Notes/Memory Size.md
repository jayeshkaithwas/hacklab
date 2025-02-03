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
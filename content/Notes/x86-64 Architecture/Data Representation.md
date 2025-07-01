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
To do this steps first you should know, how bits are added.

# Addition of Bits
---
It is not that simple to add bits like normal adding numbers or xor'ing bits. But also it's not that too hard.

To understand this easily learn this simple rule.
>[!Warning] Rule
> While Adding bits keep in mind that $1+1\ne2$.
> $1+1=10$ 
> $2$ in binary is $10$

Then else is same as normal addition.

**Example:**

10 + 20
# Converting Unsigned Integer to Signed Integer

Not all integer values are positive. In some scenarios, negative integers are required. For Example, to represent the difference between two integers, you need to take into account that the difference could be negative, and only signed integers can hold negative values.
**So to represent signed integer in native integer value which can interpret ate by CPU, there is a concept called two's complement.** Which helps in conversion behtween unsigned and signed values.

![[images/Pasted image 20250507160212.png]]
**MSB** → Most Significant Bit
**LSB**  → Least Significant Bit 

- Simple sign detection: **MSB (Most Significant Bit)** is the **sign bit**:
	- `0` = positive
	- `1` = negative

## **4-bit Example:**

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


## **8-bit Example:**

Positive Number (e.g., +123):
- Binary: `01111011`

Negative Number (e.g., -123):
1. Start with +123: `01111011`
2. Flip the bits: `10000100`
3. Add 1:  
    `10000100` + `00000001` = `10000101`              refer to [[Memory Size#]]

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

See [[Memory Size#Converting Unsigned Integer to Signed Integer|Converting Unsigned Integer to Signed Integer]] for more understanding.
Because ***Signed value*** is first converted into binary as it is ***unsigned value*** and then that binary is converted to **signed** with the help of two's Complement. 

Example:
Representing $-9$ .

| 9(8+1)=                | 00001001     |
| ---------------------- | ------------ |
| **Step 1 (Flip Bits)** | **11110110** |
| **Step 2 (Adding 1)**  | **11110111** |
| **So, $-9 =$**         | **11110111** |
| **In Hex**             | **F7**       |



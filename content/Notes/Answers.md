---
title: Answers
aliases:
  - Answers
---
# Convert Decimal to Hexadecimal
---
## 1. Convert **10** to hexadecimal.

As 10 is already < 16 the we will refer to [[Memory Size#💡 Hex Table (0–15)|Hex Table]] and find 10's hex value in it.
From [[Memory Size#💡 Hex Table (0–15)|Hex Table]] we get 10 = 10

**Hexadecimal** = `0x10`

## 2. Convert **15** to hexadecimal.

As 15 is already < 16 the we will refer to [[Memory Size#💡 Hex Table (0–15)|Hex Table]] and find 15's hex value in it.
From [[Memory Size#💡 Hex Table (0–15)|Hex Table]] we get 15 = F

**Hexadecimal** = `0xF`

## 3. Convert **31** to hexadecimal.

**Step 1:** 
- 31 ÷ 16 = 1 remainder **15**

This gives:
- Quotient = 1
- Remainder = 15

**Step 2:**
- Quotient: `1` → hex digit is `1`
- Remainder: `15` → hex digit is `F`

**Step 3:**
- So, **31 in decimal = 0x1F in hex**

## 4. Convert **64** to hexadecimal.

**Step 1:** 
- 64 ÷ 16 = 4 remainder **0**

This gives:
- Quotient = 4
- Remainder = 0

**Step 2:**
- Quotient: `4` → hex digit is `4`
- Remainder: `0` → hex digit is `0`

**Step 3:**
- So, **64 in decimal = 0x40 in hex**

## 5. Convert **127** to hexadecimal.

**Step 1:** 
- 127 ÷ 16 = 7 remainder **15**

This gives:
- Quotient = 7
- Remainder = 15

**Step 2:**
- Quotient: `7` → hex digit is `7`
- Remainder: `15` → hex digit is `F`

**Step 3:**
- So, **127 in decimal = 0x7F in hex**

## 6. Convert **255** to hexadecimal.

**Step 1:** 
- 225 ÷ 16 = 15 remainder **15**

This gives:
- Quotient = 15
- Remainder = 15

**Step 2:**
- Quotient: `15` → hex digit is `F`
- Remainder: `15` → hex digit is `F`

**Step 3:**
- So, **255 in decimal = 0xFF in hex**

## 7. Convert **1023** to hexadecimal.    

**Step 1:** 
- 1023 ÷ 16 = 63 remainder **15**
As Quotient > 16:
- 63 ÷ 16 = 3 remainder **15**

This gives:
- Quotient = 3
- Remainder = 15
- Remainder = 15

**Step 2:**
- Quotient: `3` → hex digit is `3`
- Remainder: `15` → hex digit is `F`
- Remainder: `15` → hex digit is `F`

**Step 3:**
- So, **1023 in decimal = 0x3FF in hex**

## 8. Convert **4096** to hexadecimal.

**Step 1:** 
- 4096 ÷ 16 = 256 remainder **0**
As Quotient > 16:
- 256 ÷ 16 = 16 remainder **0**
As Quotient > 16:
- 16 ÷ 16 = 1 remainder **0**

This gives:
- Quotient = 1
- Remainder = 0
- Remainder = 0
- Remainder = 0

**Step 2:**
- Quotient: `1` → hex digit is `1`
- Remainder: `0` → hex digit is `0`
- Remainder: `0` → hex digit is `0`
- Remainder: `0` → hex digit is `0`

**Step 3:**
- So, **4096 in decimal = 0x1000 in hex**

## 9. Convert **12345** to hexadecimal.

**Step 1:** 
- 12345 ÷ 16 = 779 remainder **9**
As Quotient > 16:
- 779 ÷ 16 = 48 remainder **3**
As Quotient > 16:
- 48 ÷ 16 = 3 remainder **0**

This gives:
- Quotient = 3
- Remainder = 0
- Remainder = 3
- Remainder = 9

**Step 2:**
- Quotient: `3` → hex digit is `3`
- Remainder: `0` → hex digit is `0`
- Remainder: `3` → hex digit is `3`
- Remainder: `9` → hex digit is `9`

**Step 3:**
- So, **12345 in decimal = 0x3039 in hex**


## 10. Convert **65535** to hexadecimal.

**Step 1:** 
- 65535 ÷ 16 = 4095 remainder **15**
As Quotient > 16:
- 4095 ÷ 16 = 255 remainder **15**
As Quotient > 16:
- 255 ÷ 16 = 15 remainder **15**

This gives:
- Quotient = 15
- Remainder = 15
- Remainder = 15
- Remainder = 15

**Step 2:**
- Quotient: `15` → hex digit is `F`
- Remainder: `15` → hex digit is `F`
- Remainder: `15` → hex digit is `F`
- Remainder: `15` → hex digit is `F`

**Step 3:**
- So, **65535 in decimal = 0xFFFF in hex**

# Convert Hexadecimal to Decimal
---
## 1. Convert hexadecimal **A** to decimal.

By [[Memory Size#💡 Hex Table (0–15)|Hex Table]] A → `10`

## 2. Convert hexadecimal **1F** to decimal.

```
= (1 × 16¹) + (F × 16⁰)
= (1 × 16) + (15 × 1)
= 16 + 15
= 31
```

## 3. Convert hexadecimal **3C** to decimal.

```
= (3 × 16¹) + (C × 16⁰)
= (3 × 16) + (12 × 1)
= 48 + 12
= 60
```

## 4. Convert hexadecimal **7E** to decimal.

```
= (7 × 16¹) + (E × 16⁰)
= (7 × 16) + (14 × 1)
= 112 + 14
= 126
```

## 5. Convert hexadecimal **FF** to decimal.

```
= (F × 16¹) + (F × 16⁰)
= (15 × 16) + (15 × 1)
= 240 + 15
= 265
```

## 6. Convert hexadecimal **100** to decimal.

```
= (1 × 16²) + (0 × 16¹) + (0 × 16⁰)
= (1 × 256) + (0 × 1) + (0 × 1)
= 256 + 0 + 0
= 256
```

## 7. Convert hexadecimal **1A3** to decimal.

```
= (1 × 16²) + (A × 16¹) + (3 × 16⁰)
= (1 × 256) + (10 × 16) + (3 × 1)
= 256 + 160 + 3
= 419
```

## 8. Convert hexadecimal **2F7** to decimal.

```
= (2 × 16²) + (F × 16¹) + (7 × 16⁰)
= (2 × 256) + (15 × 16) + (7 × 1)
= 512 + 240 + 7
= 759
```

## 9. Convert hexadecimal **3E8** to decimal.

```
= (3 × 16²) + (E × 16¹) + (8 × 16⁰)
= (3 × 256) + (14 × 16) + (8 × 1)
= 768 + 224 + 8
= 1000
```
## 10. Convert hexadecimal **FFFF** to decimal.

```
= (F × 16³) + (F × 16²) + (f × 16¹) + (F × 16⁰)
= (15 × 4096) + (15 × 256) + (15 × 16) + (15 × 1)
= 61440 + 3840 + 240 + 15
= 65535
```


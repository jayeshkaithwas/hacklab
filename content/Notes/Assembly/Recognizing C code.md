---
title: Recognizing C code
aliases:
  - Recognizing C code
---
##### Example 1
**C code:**
```cpp
int number;
. . . more code . . .
number++;
```

**Assembly:**

```asm
number dd 0               ; 32-bit(4 bytes) int
. . .more code . . .
mov eax, [number]         ; load 32-bit value
inc eax
mov [number], eax         ; store it back
```

##### Example 2
**C code:**
```cpp
int number;
if (number<0)
{
. . .more code . . .
}
```

**Assembly:**

```asm
number dd 0              ; 4 bytes (32-bit int), correct 

mov eax, [number]    ; load value into eax
or eax, eax          ; set flags without changing value
jge is_positive      ; jump if number >= 0

    ; code when number < 0
    ; (e.g., print "negative")
    ; ...

is_positive:
    ; code when number >= 0
```

##### Example 3
**C Code:**
```cpp
int array[4];
. . .more code . . .
array[2]=9;
```

**Assembly:**

```asm
array dd 0, 0, 0, 0         ; Four 32-bit integers
. . .more code . . .
mov ebx, 2              ; array index = 2
mov dword [array + ebx*4], 9   ; array[2] = 9
```
- Each `int` is **4 bytes**
- To access `array[2]`, the offset is `2 * 4 = 8`
- So `array + ebx * 4` is the correct memory address for `array[2]`
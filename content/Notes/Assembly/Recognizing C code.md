---
title: Recognizing C code
aliases:
  - Recognizing C code
tags:
  - Assembly
  - Malware-Analysis
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
# Global vs. Local Variables

## Global Variables

**C Code:**

```c
int x = 1;
int y = 2;
void main() {
    x = x + y;
    printf("total = %d\n", x);
}
```

**Assembly (Listing 6-3):**

```
00401003  mov   eax, dword_40CF60 ; load global x
00401008  add   eax, dword_40C000 ; add global y
0040100E  mov   dword_40CF60, eax ; store result back to x
00401013  mov   ecx, dword_40CF60 ; load x again for printf
00401019  push  ecx                ; push x
0040101A  push  offset aTotalD     ; push format string "total = %d\n"
0040101F  call  printf             ; call printf
```

## Local Variables

**C Code:**

```c
void main() {
    int x = 1;
    int y = 2;
    x = x + y;
    printf("total = %d\n", x);
}
```

**Assembly (without labels):**

```
00401006  mov   dword ptr [ebp-4], 1 ; x = 1
0040100D  mov   dword ptr [ebp-8], 2 ; y = 2
00401014  mov   eax, [ebp-4]         ; load x
00401017  add   eax, [ebp-8]         ; add y
0040101A  mov   [ebp-4], eax         ; store result back to x
0040101D  mov   ecx, [ebp-4]         ; load x again for printf
00401020  push  ecx                  ; push x
00401021  push  offset aTotalD       ; push format string
00401026  call  printf               ; call printf
```
- **Global:** Memory addresses like `dword_40CF60`, program-wide scope.
- **Local:** Stack offsets `[ebp-4]`, `[ebp+var_4]`, function-limited scope.

- Uses explicit stack offsets (`[ebp-4]`, `[ebp-8]`, etc.).
- Harder to read because you have to track what’s at which offset.

Here, you have to remember
- `[ebp-4]` → `x`
- `[ebp-8]` → `y`

**Assembly (with labels):**

```
00401006  mov   [ebp+var_4], 1       ; x = 1
0040100D  mov   [ebp+var_8], 2       ; y = 2
00401014  mov   eax, [ebp+var_4]     ; load x
00401017  add   eax, [ebp+var_8]     ; add y
0040101A  mov   [ebp+var_4], eax     ; store result back to x
0040101D  mov   ecx, [ebp+var_4]     ; load x again for printf
00401020  push  ecx                  ; push x
00401021  push  offset aTotalD       ; push format string
00401026  call  printf               ; call printf
```
- Uses **symbolic names** (like `var_4`, `var_8`) assigned by a disassembler (like IDA Pro).
- Much easier to read because you don’t have to track offsets in your head.
- Tools can rename `var_4` to `x` directly!

- `var_4` → local variable `x`
- `var_8` → local variable `y`


The **actual binary code and execution** don’t change at all.  
It’s purely about **readability** during analysis.

|**Without Label**|**With Label**|**What It Means**|
|---|---|---|
|`[ebp-4]`|`[ebp+var_4]`|Local variable `x`|
|`[ebp-8]`|`[ebp+var_8]`|Local variable `y`|

---
# Disassembling Arithmetic Operations

**C  Code:**
```c
int a = 0;
int b = 1;
a = a + 11;
a = a - b;
a--;
b++;
b = a % 3;
```

This initializes two integers `a` and `b`, then performs a series of arithmetic operations: addition, subtraction, decrement, increment, and modulo.

**Assembly:**
```
00401006 mov     [ebp+var_4], 0
0040100D mov     [ebp+var_8], 1
00401014 mov     eax, [ebp+var_4]       ; load a
00401017 mov     eax, 0Bh               ; move 11 into eax
0040101A add     [ebp+var_4], eax       ; a = a + 11
0040101D mov     ecx, [ebp+var_4]       ; load a into ecx
00401020 mov     ecx, [ebp+var_8]       ; load b into ecx
00401023 sub     [ebp+var_4], ecx       ; a = a - b
00401026 mov     edx, [ebp+var_4]       ; load a into edx
00401029 mov     edx, 1                 ; load 1 into edx
0040102C sub     [ebp+var_4], edx       ; a--
0040102F mov     eax, [ebp+var_8]       ; load b into eax
00401032 mov     eax, 1                 ; load 1 into eax
00401035 add     [ebp+var_8], eax       ; b++
00401038 mov     eax, [ebp+var_4]       ; load a into eax
0040103B cdq                            ; sign-extend eax into edx:eax
0040103C mov     ecx, 3                 ; load 3 into ecx
00401041 idiv    ecx                    ; divide edx:eax by ecx
00401043 mov     [ebp+var_8], edx       ; store remainder (modulo) in b
```

**Explanation:**

- **Initialization:**
    - `a` (`var_4`) = 0
    - `b` (`var_8`) = 1
- **Addition (`a + 11`):**  
    `11` is moved to `eax`, added to `a`, and stored back in `a`.
- **Subtraction (`a - b`):**  
    `b` is loaded into `ecx`, subtracted from `a`, and stored.
- **Decrement (`a--`):**  
    Rather than using `dec`, compiler uses `sub` with 1.
- **Increment (`b++`):**  
    Uses `add` with 1 instead of `inc`.
- **Modulo (`b = a % 3`):**
    - `a` is in `eax`, `cdq` extends it to `edx:eax`.
    - `idiv ecx` divides `edx:eax` by 3.
    - Remainder in `edx` is stored as `b`.
---
# Recognizing If Statements

`if` statements in C let a program choose different execution paths based on a condition. Let’s see how this is translated to assembly.

**C Code Example:**

```c
int x = 1;
int y = 2;
if (x == y) {
    printf("x equals y.\n");
} else {
    printf("x is not equal to y.\n");
}
```

**Assembly Code:**

```
00401006 mov [ebp+var_8], 1         ; x = 1
0040100D mov [ebp+var_4], 2         ; y = 2
00401014 mov eax, [ebp+var_8]       ; load x
00401017 cmp eax, [ebp+var_4]       ; compare x and y  
0040101A jnz short loc_40102B       ; jump if not equal
0040101C push offset aXEqualsY      ; "x equals y.\n"
00401021 call printf
00401026 add esp, 4
00401029 jmp short loc_401038       ; jump to end      
0040102B loc_40102B:
0040102B push offset aXIsNotEqualToY; "x is not equal to y.\n"
00401030 call printf
```

- The comparison (`cmp`) checks if `x` equals `y`.
- The conditional jump (`jnz`) means “jump if not equal.” If `x` is not equal to `y`, the jump occurs to the `else` block (`loc_40102B`).
- If `x` equals `y`, the jump is skipped, and the code prints `"x equals y."`
- At the end of the `if` block, an unconditional jump (`jmp`) skips over the `else` block, ensuring only one branch runs.

---
# Recognizing Nested if Statements

Nested `if` statements test multiple conditions and can add complexity in assembly.

**C Code:**

```c
int x = 0;
int y = 1;
int z = 2;
if (x == y) {
  if (z == 0) {
    printf("z is zero and x = y.\n");
  } else {
    printf("z is non-zero and x = y.\n");
  }
} else {
  if (z == 0) {
    printf("z zero and x != y.\n");
  } else {
    printf("z non-zero and x != y.\n");
  }
}
```

**Assembly Code:**

```
00401006 mov [ebp+var_8], 0           ; x=0
0040100D mov [ebp+var_4], 1           ; y=1
00401014 mov [ebp+var_C], 2           ; z=2
0040101B mov eax, [ebp+var_8]         ; load x
0040101E cmp eax, [ebp+var_4]         ; compare x and y
00401021 jnz short loc_401047         ; jump if x != y       
00401023 cmp [ebp+var_C], 0           ; check z==0
00401027 jnz short loc_401038         ; jump if z!=0         
00401029 push offset aZIsZeroAndXY_   ; "z is zero and x = y.\n"
0040102E call printf
00401033 add esp, 4
00401036 jmp short loc_401045         ; jump to end
00401038 loc_401038:
00401038 push offset aZIsNonZeroAndX  ; "z is non-zero and x = y.\n"
0040103D call printf
00401042 add esp, 4
00401045 loc_401045:
00401045 jmp short loc_401069         ; skip else section
00401047 loc_401047:
00401047 cmp [ebp+var_C], 0           ; check z==0 again     
0040104B jnz short loc_40105C         ; jump if z!=0
0040104D push offset aZZeroAndXY_     ; "z zero and x != y.\n"
00401052 call printf
00401057 add esp, 4
0040105A jmp short loc_401069
0040105C loc_40105C:
0040105C push offset aZNonZeroAndXY_  ; "z non-zero and x != y.\n"
00401061 call printf
```

- The first comparison (`cmp` + `jnz`) at **** checks if `x != y`.  
- If `x == y`, it compares `z` to 0 (`cmp` + `jnz`) at **** and chooses which message to print.  
- If `x != y`, another comparison (`cmp` + `jnz`) at **** chooses between the last two messages.
---
# Recognizing Loops
## For Loop:

**C Code**

```c
int i;
for(i=0; i<100; i++) {
  printf("i equals %d\n", i);
}
```

**Assembly Code:**

```
00401004 mov [ebp+var_4], 0         ; i=0          
0040100B jmp short loc_401016       ; jump to compare first  
0040100D loc_40100D:
0040100D mov eax, [ebp+var_4]       ; increment loop variable
00401010 add eax, 1
00401013 mov [ebp+var_4], eax       ; store incremented value 
00401016 loc_401016:
00401016 cmp [ebp+var_4], 64h       ; compare i with 100    
0040101A jge short loc_40102F       ; if i >= 100, jump to end  
0040101C mov ecx, [ebp+var_4]       ; execution: print i
0040101F push ecx
00401020 push offset aID            ; "i equals %d\n"
00401025 call printf
0040102A add esp, 8
0040102D jmp short loc_40100D       ; jump to increment    
```

## `while` Loop

The `while` loop is commonly used in malware and other software to repeat code execution until a condition is met—like waiting for a packet or command.

**C Code for a while Loop:**

```c
int status=0;
int result=0;
while(status == 0) {
  result = performAction();
  status = checkResult(result);
}
```

**Assembly Code:**

```
00401036 mov [ebp+var_4], 0       ; status = 0
0040103D mov [ebp+var_8], 0       ; result = 0
00401044 loc_401044:
00401044 cmp [ebp+var_4], 0       ; check if status == 0
00401048 jnz short loc_401063     ; exit loop if not zero  
0040104A call performAction       ; result = performAction()
0040104F mov [ebp+var_8], eax
00401052 mov eax, [ebp+var_8]
00401055 push eax
00401056 call checkResult         ; status = checkResult(result)
0040105B add esp, 4
0040105E mov [ebp+var_4], eax
00401061 jmp short loc_401044     ; jump back to start of loop 
```

#### Key Points:

- The loop **starts** at `loc_401044`, where it **compares** `status` with 0.  
- If `status` is not zero (`jnz`), the loop **exits** at `loc_401063`.  
- If `status` is zero, `performAction()` and `checkResult()` are **executed**, updating `status`.  
- An unconditional jump (`jmp`) at the end ensures the loop **repeats** until the condition is false.
---
# Function Call Conventions

Function calls can vary in **how arguments are passed**, **who cleans up the stack**, and **where the return value is stored**. These rules are known as **calling conventions**, and they are crucial for understanding assembly code and interfacing with APIs.

#### Key Conventions

> **cdecl**
- **Parameters:** pushed **right-to-left**
- **Stack cleanup:** **caller**
- **Return value:** in **EAX**
- Example:
    ```
    push c
    push b
    push a
    call test
    add esp, 12    ; caller cleans up
    mov ret, eax
    ```

> **stdcall**
- Same parameter order as cdecl.
- **Callee** cleans up the stack (no `add esp` in caller).
- Used in **Windows API**.

> **fastcall**

- **First few arguments** (often 2) passed in **registers** (e.g., **ECX, EDX**).
- Additional arguments on stack, **right-to-left**.
- Caller usually cleans up the stack.
#### Push vs. Move

Compilers may either **push** arguments onto the stack or **move** them directly to memory.
For instance:
- Visual Studio (pushes):
    ```
    push x
    push y
    call adder
    ```
- GCC (moves directly):
    ```
    mov [esp+4], y
    mov [esp], x
    call adder
    ```

**C code**:

```c
int adder(int a, int b) {
  return a + b;
}

void main() {
  int x = 1, y = 2;
  printf("Result: %d\n", adder(x, y));
}
```

The **assembly code for `adder`** is:

```
00401730 push ebp
00401731 mov ebp, esp
00401733 mov eax, [ebp+arg_0]
00401736 add eax, [ebp+arg_4]
00401739 pop ebp
0040173A retn
```

#### Visual Studio vs. GCC

|Visual Studio (push)|GCC (move)|
|---|---|
|`push x`|`mov [esp], x`|
|`push y`|`mov [esp+4], y`|
|`call adder`|`call adder`|
|`add esp, 8` (cleanup)|No cleanup needed|
|`printf` uses similar variations|`printf` uses similar variations|


- Even for the **same compiler**, these conventions can **change** based on build settings.
- Always check **disassembly** to confirm the convention.
- Knowing these conventions helps you **reverse-engineer** or **interface** with compiled code confidently.
#  Switch Statements 
---
**C Code:**
```c
switch(i)
{
  case 1:
    printf("i = %d", i+1);
    break;
  case 2:
    printf("i = %d", i+2);
    break;
  case 3:
    printf("i = %d", i+3);
    break;
  default:
    break;
}
```

**Assembly :**
```assembly
00401013 cmp [ebp+var_8], 1
00401017 jz short loc_401027   ; jump if i == 1
00401019 cmp [ebp+var_8], 2
0040101D jz short loc_40103D   ; jump if i == 2
0040101F cmp [ebp+var_8], 3
00401023 jz short loc_401053   ; jump if i == 3
00401025 jmp short loc_401067  ; jump to default / end

; ---------- case 1 ----------
00401027 loc_401027:
00401027 mov ecx, [ebp+var_4]   ; move i to ecx
0040102A add ecx, 1             ; i + 1
0040102D push ecx               ; push result
0040102E push offset unk_40C000 ; push format string "i = %d"
00401033 call printf
00401038 add esp, 8             ; clean up stack
0040103B jmp short loc_401067   ; jump to end

; ---------- case 2 ----------
0040103D loc_40103D:
0040103D mov edx, [ebp+var_4]   ; move i to edx
00401040 add edx, 2             ; i + 2
00401043 push edx               ; push result
00401044 push offset unk_40C004 ; push format string "i = %d"
00401049 call printf
0040104E add esp, 8             ; clean up stack
00401051 jmp short loc_401067   ; jump to end

; ---------- case 3 ----------
00401053 loc_401053:
00401053 mov eax, [ebp+var_4]   ; move i to eax
00401056 add eax, 3             ; i + 3
00401059 push eax               ; push result
0040105A push offset unk_40C008 ; push format string "i = %d"
0040105F call printf
00401064 add esp, 8             ; clean up stack

; ---------- end of switch ----------
00401067 loc_401067:
```


- **Comparisons** (`cmp`) are done one after the other:
	* First compare `i` to 1 (`cmp [ebp+var_8], 1`)
	* Jump to code for **case 1** if equal
	* If not, compare to 2, and so on

-  **Unconditional jumps (`jmp`)** at the end of each case code block:
	* Prevents **fall-through** (like `break` in C)
	* All cases end up at `loc_401067` (end of switch)

- **For each case**:
	* Load `i` (`mov ecx, [ebp+var_4]`, etc.)
	* Add case-specific value (`add ecx, 1`, etc.)
	* Push arguments to `printf` (`push ecx`, etc.)
	* Call `printf`
	* Clean up stack (`add esp, 8`)

# Disassembling Arrays

**C Code :**
```c
int b[5] = {123, 87, 487, 7, 978};

void main()
{
    int i;
    int a[5];
    for(i = 0; i < 5; i++)
    {
        a[i] = i;
        b[i] = i;
    }
}
```


**Assembly Code :**

```assembly
00401006 mov [ebp+var_18], 0      ; i = 0
0040100D jmp short loc_401018     ; jump to comparison

0040100F loc_40100F:
0040100F mov eax, [ebp+var_18]    ; eax = i
00401012 add eax, 1               ; eax = i + 1
00401015 mov [ebp+var_18], eax    ; i++

00401018 loc_401018:
00401018 cmp [ebp+var_18], 5      ; compare i to 5
0040101C jge short loc_401037     ; if i >= 5, exit loop

; ---------- a[i] = i ----------
0040101E mov ecx, [ebp+var_18]    ; ecx = i
00401021 mov edx, [ebp+var_18]    ; edx = i
00401024 mov [ebp+ecx*4+var_14], edx ; a[i] = i

; ---------- b[i] = i ----------
00401028 mov eax, [ebp+var_18]    ; eax = i
0040102B mov ecx, [ebp+var_18]    ; ecx = i
0040102E mov dword_40A000[ecx*4], eax ; b[i] = i

00401035 jmp short loc_40100F     ; loop again

00401037 loc_401037:
```

**Local variable `a`**
- **Base address**: `[ebp+var_14]`
- Access: `[ebp + ecx*4 + var_14]`  since `int` is 4 bytes.
**Global variable `b`**
- **Base address**: `dword_40A000` (global in `.data` segment).
- Access: `[dword_40A000 + ecx*4]`.
**Loop Control**
- `mov [ebp+var_18], 0` → `i = 0`
- Comparison: `cmp [ebp+var_18], 5`
- If `i >= 5`, exit loop (`jge loc_401037`)
- Loop increment: `i++` (`add eax, 1`)


- Local array element:
    ```
    mov [ebp+index*4+var_14], value
    ```
- Global array element:
    ```
    mov dword_40A000[index*4], value
    ```
Let's break down the **C struct**, the **assembly for `main()` and `test()`**, and explain **how the struct's layout** can be reverse engineered from the disassembly.

---
# Struct Definition
**C Code:**
```c
struct my_structure {      // Struct layout
    int x[5];              // offset 0x00
    char y;                // offset 0x14
    double z;              // offset 0x18
};

struct my_structure *gms;  // Global variable

void test(struct my_structure *q)
{
    int i;
    q->y = 'a';            // ASCII 0x61
    q->z = 15.6;           // Floating point
    for (i = 0; i < 5; i++) {
        q->x[i] = i;       // Array initialization
    }
}

void main()
{
    gms = (struct my_structure *) malloc(sizeof(struct my_structure));
    test(gms);
}
```

**Assembly: `main()` Function**

```asm
00401050 push ebp
00401051 mov ebp, esp
00401053 push 20h                   ; sizeof(my_structure) = 0x20 (32 bytes)
00401055 call malloc
0040105A add esp, 4
0040105D mov dword_40EA30, eax     ; store malloc ptr to global gms
00401062 mov eax, dword_40EA30     ; eax = gms
00401067 push eax                  ; pass pointer to test()
00401068 call sub_401000           ; call test()
0040106D add esp, 4
00401070 xor eax, eax
00401072 pop ebp
00401073 retn
```
**Assembly: `test()` Function:**
```asm
00401000 push ebp
00401001 mov ebp, esp
00401003 mov ecx, [ebp+arg_0]          ; ecx = pointer to struct

00401007 mov byte ptr [ecx+14h], 61h   ; q->y = 'a' → offset 0x14
0040100E fld ds:dbl_40B120             ; load 15.6 as float (global constant)
00401014 fstp qword ptr [ecx+18h]      ; q->z = 15.6 → offset 0x18

00401017 mov [ebp+var_4], 0            ; i = 0
0040101E jmp short loc_401029          ; loop condition

00401020 loc_401020:
00401020 mov edx, [ebp+var_4]
00401023 mov ecx, [ebp+arg_0]
00401026 mov [ecx+eax*4], edx          ; q->x[i] = i → offset 0x00 + i*4

00401029 loc_401029:
00401029 cmp [ebp+var_4], 5
0040102D jge short loc_40103D

0040102F mov eax, [ebp+var_4]
00401032 mov edx, [ebp+var_4]
00401035 mov [ecx+eax*4], edx          ; again q->x[i] = i

0040103B jmp short loc_401020

0040103D loc_40103D:
0040103D mov esp, ebp
0040103F pop ebp
00401040 retn
```

---
# Link Traversal

**C Code :**
```c
struct node {
    int x;
    struct node* next;
};
typedef struct node pnode;

void main() {
    pnode *curr, *head;
    int i;

    head = NULL;

    //  Linked list creation
    for (i = 1; i <= 10; i++) {
        curr = (pnode *)malloc(sizeof(pnode));
        curr->x = i;
        curr->next = head;
        head = curr;
    }

    //  Linked list traversal
    curr = head;
    while (curr) {
        printf("%d\n", curr->x);
        curr = curr->next;
    }
}
```


```c
struct node {
    int x;           // offset 0
    struct node *next; // offset 4
};
```

**Linked List Creation Loop (Assembly:)**

```asm
0040106A mov [ebp+var_8], 0          ; head = NULL
00401071 mov [ebp+var_C], 1          ; i = 1
00401078 loc_401078:
00401078 cmp [ebp+var_C], 0Ah        ; if (i > 10) exit loop
0040107C jg  loc_4010AB              ; jump if i > 10
...
00401085 call malloc                 ; allocate new node
0040108A mov [ebp+var_4], eax        ; curr = malloc(...)
0040108D mov edx, [ebp+var_4]
00401090 mov eax, [ebp+var_C]
00401093 mov [edx], eax              ; curr->x = i   ()
00401095 mov edx, [ebp+var_4]
00401098 mov eax, [ebp+var_8]
0040109B mov [edx+4], eax            ; curr->next = head ()
0040109E mov eax, [ebp+var_4]
004010A1 mov [ebp+var_8], eax        ; head = curr
...
004010A7 inc [ebp+var_C]             ; i++
004010A9 jmp loc_401078              ; loop again
```

- `malloc` creates a new struct.
- `curr->x = i` → stored at `[curr + 0]` → offset `0x0`
- `curr->next = head` → stored at `[curr + 4]` → offset `0x4`
- `head = curr` updates the head of the list.

**Linked List Traversal Loop (Assembly:)**

```asm
004010AB mov [ebp+var_4], eax        ; curr = head
004010B1 loc_4010B1:
004010B1 cmp [ebp+var_4], 0          ; while(curr)
004010B5 jz  locret_4010D7           ; if null, exit

004010B7 mov eax, [ebp+var_4]        ; eax = curr
004010BA mov eax, [eax]              ; eax = curr->x
004010BC mov [esp+var_14], eax       ; prepare printf arg
004010C0 mov [esp+var_18], offset aD ; "%d\n"
004010C7 call printf                 ; print

004010CC mov eax, [ebp+var_4]
004010CF mov eax, [eax+4]            ; eax = curr->next  ()
004010D2 mov [ebp+var_4], eax        ; curr = curr->next
004010D5 jmp loc_4010B1              ; repeat ()
```

- The value `curr->x` is printed: `mov eax, [eax]`    
- `curr->next` is accessed via `mov eax, [eax+4]` — **this is the key to identifying a linked list.**

1. **Pointer Field within Structure:**    
    - When a value is loaded from `[eax + 4]` where `eax` is a struct pointer, it's likely a `next` pointer.
    - If that value is then reused as a pointer to the same structure → **you have a linked list.**
2. **Recursive Structure Access:**
    - The pointer field (`next`) is repeatedly dereferenced in a loop.
3. **Offset Use:**
    - If the struct is `8` bytes (4 for `x`, 4 for `next`), and `[eax]` and `[eax + 4]` are accessed consistently → classic linked list.
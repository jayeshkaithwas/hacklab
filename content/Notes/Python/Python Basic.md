---
title: Python Basic
aliases:
  - Python Basic
---
cg,# Operators
---

| Operator | Operation                           | Example | Evaluates to ... |
| -------- | ----------------------------------- | ------- | ---------------- |
| **       | Exponent                            | 2 ** 3  | 8                |
| %        | Modulus / Remainder                 | 22 % 8  | 6                |
| //       | Integer division / floored quotient | 22 // 8 | 2                |
| /        | Division                            | 22 / 8  | 2.75             |
| *        | Multiplication                      | 3 * 5   | 15               |
| -        | Subtraction                         | 5 - 2   | 3                |
| +        | Addition                            | 2 + 2   | 4                |

# Data types
---

| Data type              | Examples                                |
| ---------------------- | --------------------------------------- |
| Integers               | -2, -1, 0, 1, 2, 3, 4, 5                |
| Floating-point numbers | -1.25, -1.0, --0.5, 0.0, 0.5, 1.0, 1.25 |
| Strings                | 'a', 'aa', 'aaa', 'Hello!', '11 cats'   |

# Variables
---
A *variable* is like a box in the computer’s memory where you can store a single value. If you want to use the result of an evaluated expression later in your program, you can save it inside a variable.

1. It can be only one word.
2. It can use only letters,numbers, ans the underscore(_) character.
3. It can't begin with a number.

| Valid variable names | Invalid variable names                               |
| -------------------- | ---------------------------------------------------- |
| balance              | current-balance (hyphens are not allowed)            |
| currentBalance       | current balance (spaces are not allowed)             |
| current_balance      | 4account (can't begin with a number)                 |
| _spam                | 42 (can't begin with a number)                       |
| SPAM                 | total_$um (special character like $ are not allowed) |
| account4             | 'hello' (special characters like ' are not allowed)  |
|                      |                                                      |
- Variable names are case-sensitive, meaning that spam, SPAM, Spam, and sPaM are four different variables.

>[!Questions]
 **Q. What is an expression made up of? What do all expressions do?**
 **Ans.** Expressions consist of values (such as 2) and operators (such as +), and they can always evaluate (that is, reduce) down to a single value. 
 >
 >**Q. What tis the difference between an expression and statement?**
 >**Ans.** An expression evaluates to a single value. A statement does not.


# Compatison Operators
---

| Operator | Meaning                  |
| -------- | ------------------------ |
| ==       | Equal to                 |
| !=       | Not equal to             |
| <        | Less than                |
| >        | Greater than             |
| <=       | Less than or equal to    |
| >=       | Greater than or equal to |
>[!hint] Note
>**The Difference Between the == and = Operators.** 
   You might have noticed that the == operator (equal to) has two equal signs, while the = operator (assignment) has just one equal sign. It’s easy to confuse these two operators with each other.


# Boolean Values 
---
**True** & **False**

# Boolean Operators
---
**and, or** and **not** 

## The `and` Operator's Truth Table
---

| Expression      | Evaluates to... |
| --------------- | --------------- |
| True and True   | True            |
| True and False  | False           |
| False and True  | False           |
| False and False | False           |
## The `or` Operator's Truth Table
---

| Expression     | Evaluates to... |
| -------------- | --------------- |
| True or True   | True            |
| True or False  | True            |
| False or True  | True            |
| False or False | False           |

## The `not` Operator's Truth Table
---

| Expression | Evaluates to... |
| ---------- | --------------- |
| not True   | False           |
| not Flase  | True            |

# Gauss's Clever Trick for Adding Numbers
---
```
total = 0
for num in range(101):
	total = total + num
print(total)
```

Imagine you have a list of numbers like this:
`1, 2, 3, 4, 5, 6, ... all the way up to 100.`

Gauss, a really smart kid, wanted to add them all up quickly without adding each number one by one. So he thought of a cool trick!

He looked at the first number (1) and the last number (100). When you add them together, you get 101 (1 + 100 = 101). Then he looked at the second number (2) and the second-to-last number (99). When you add them together, you also get 101 (2 + 99 = 101).

If you keep doing this, you’ll see that every time you add the first number with the last number, the second with the second-to-last, and so on, you always get 101. There are 50 pairs like this.

So instead of adding each number one by one, Gauss figured out that if you have 50 pairs, and each pair adds to 101, you just need to multiply:

50 pairs × 101 = 5050.

So the total of all the numbers from 1 to 100 is 5050. Isn’t that a cool shortcut?  
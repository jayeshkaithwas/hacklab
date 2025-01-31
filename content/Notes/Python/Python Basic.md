---
title: Python Basic
aliases:
  - Python Basic
---
# Operators
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
>[!Note]
>The data type of  `None`  is  `NoneType`.

# Variables
---
A *variable* is like a box in the computer’s memory where you can store a single value. If you want to use the result of an evaluated expression later in your program, you can save it inside a variable.

1. It can be only one word.
2. It can use only letters,numbers, ans the underscore(_) character.
3. It can't begin with a number.

| Valid variable names | Invalid variable names                                 |
| -------------------- | ------------------------------------------------------ |
| balance              | current-balance (hyphens are not allowed)              |
| currentBalance       | current balance (spaces are not allowed)               |
| current_balance      | 4account (can't begin with a number)                   |
| _spam                | 42 (can't begin with a number)                         |
| SPAM                 | `total_$um` (special character like $ are not allowed) |
| account4             | 'hello' (special characters like ' are not allowed)    |
|                      |                                                        |
- Variable names are case-sensitive, meaning that spam, SPAM, Spam, and sPaM are four different variables.

>[!Questions]
 >**Q. What is an expression made up of? What do all expressions do?**
 >**Ans.** Expressions consist of values (such as 2) and operators (such as +), and they can always evaluate (that is, reduce) down to a single value. 
 >
 >**Q. What tis the difference between an expression and statement?**
 >**Ans.** An expression evaluates to a single value. A statement does not.


# Comparison Operators
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
```python
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

# `from` `import` Statements
---
An alternative form of the import statement is composed of the `from` keyword, followed by the module name, the `import` keyword, and a star; for ­example, 
`from random import *`.
With this form of import statement, calls to functions in `random` will not need the `random.` prefix. However, using the full name makes for more readable code, so it is better to use the normal form of the `import` statement.

# The Augmented Assignment Operators
---

| Augmented assignment statement | Equivalent assignment statement |
| ------------------------------ | ------------------------------- |
| spam = spam + 1                | spam += 1                       |
| spam = spam - 1                | spam -= 1                       |
| spam = spam * 1                | spam *= 1                       |
| spam = spam / 1                | spam /= 1                       |
| spam = spam % 1                | spam %= 1                       |


# References
---
```python
>>> spam = 42
>>> cheese = spam
>>> spam = 100
>>> spam
100
>>> cheese
42
```
 
 You assign 42 to the  `spam`  variable, and then you copy the value in  `spam`  and assign it to the variable  `cheese` . When you later change the value in  `spam`  to 100, this doesn’t affect the value in  `cheese` . This is because  `spam`  and  `cheese`  are different variables that store different values.

But lists don’t work this way. When you assign a list to a variable, you are actually assigning a list *reference* to the variable. A reference is a value that points to some bit of data, and a list reference is a value that points to a list. Here is some code that will make this distinction easier to understand.

Enter this into the interactive shell:

```python
>>> spam = [0, 1, 2, 3, 4, 5]
>>> cheese = spam
>>> cheese[1] = 'Hello!'
>>> spam
[0, 'Hello!', 2, 3, 4, 5]
>>> cheese
[0, 'Hello!', 2, 3, 4, 5]
```

The code changed only the  `cheese`  list, but it seems that both the  `cheese`  and  `spam`  lists have changed. 

When you create the list  `1`  , you assign a reference to it in the  `spam`  variable. But the next line  `2`  copies only the list reference in  `spam`  to  `cheese` , not the list value itself. This means the values stored in  `spam`  and  `cheese`  now both refer to the same list. There is only one underlying list because the list itself was never actually copied. So when you modify the first element of  `cheese`  `3` , you are modifying the same list that  `spam`  refers to.

Using boxes as a metaphor for variables, this Figures shows what happens when a list is assigned to the  `spam`  variable.

![[images/Pasted image 20250131123115.png]]

![[images/Pasted image 20250131123146.png]]

![[images/Pasted image 20250131123203.png]]


>[!Questions]
 >**Q. Name a few ways that list values are similar to string values.**
 >**Ans.** Both lists and strings can be passed to  `len()`, have *indexes* and *slices*, be used in  `for`   loops, be concatenated or replicated, and be used with the  `in`  and  `not in`  operators.
 >
 >**Q. How do you type the tuple value that has just the integer value 42 in it?**
 >**Ans.** (42,) (The trailing comma is mandatory.)
 >
 >**Q. What is the difference between copy.copy() and copy.deepcopy()?**
 >**Ans.** Python provides the copy module to create actual copies which offer functions for  **shallow `(copy.copy())`**  and **deep `(copy. deepcopy ())`**  copies.
 >
 >- A **shallow copy** creates a new object but retains references to the objects contained within the original. It only copies the top-level structure without duplicating nested elements.
 >- Changes made to a copy of an object do reflect in the original object. In python, this is implemented using the ****“copy.copy()”**** function.
 >
 >	![[images/Pasted image 20250131131550.png]]
 >
 >***Example:***
 >
>```python
>>>> import copy
>>>> a = [[1, 2, 3], [4, 5, 6]]
>>>> b = copy.copy(a)
>>>> b[0][0] = 0
>>>> a
[[0, 2, 3], [4, 5, 6]]
>>>> b
[[0, 2, 3], [4, 5, 6]]
>```
>
>- A **deep copy** creates a new compound object before inserting copies of the items found in the original into it in a recursive manner.
>- It will first construct a new collection object and then recursively populate it with copies of the child objects found in the original. It means that any changes made to a copy of the object do not reflect in the original object.
>  
> 	 ![[images/Pasted image 20250131132232.png]]
>  
>***Example:***
>  
>```python
>>>> import copy
>>>> a = [[1, 2, 3], [4, 5, 6]]
>>>> b = copy.deepcopy(a)
>>>> b[0][0] = 0
>>>> a
[[1, 2, 3], [4, 5, 6]]
>>>> b
[[0, 2, 3], [4, 5, 6]]
>```

 
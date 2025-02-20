---
title: Python Basic
aliases:
  - Python Basic
tags:
  - Python
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
>[!info] Note
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
- Variable names are case-sensitive, meaning that spam, SPAM, Spam, and sPaM are four different variables.

>[!check] Questions
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

>[!tip] 
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
An alternative form of the import statement is composed of the `from` keyword, followed by the module name, the `import` keyword, and a star; for ­example, `from random import *`.
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


>[!check] Question
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
 >>>> b = copy.deepcopy(a)
 >>>> b[0][0]= 0
 >>>> a
 > `[[0, 2, 3], [4, 5, 6]]`
 >>>> b
 > `[[0, 2, 3], [4, 5, 6]]`
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
 > `[[1, 2, 3], [4, 5, 6]]`
 >>>> b
 > `[[0, 2, 3], [4, 5, 6]]`
 >```


# Comma Code
---
Say you have a list value like this:
`spam = ['apples', 'bananas', 'tofu', 'cats']`
Write a function that takes a list value as an argument and returns a string with all the items separated by a comma and a space, with *and* inserted before the last item. For example, passing the previous `spam` list to the function would return `'apples, bananas, tofu, and cats'`. But your function should be able to work with any list value passed to it.

## Solution
```python
spam = ['apples', 'bananas', 'tofu', 'cats']
def function(line):
    result = ''
    for i in line:
        if i == line[-1]:
            result += 'and '+i
        else:
            result += i+', '
    return result
print(function(spam))

#OUTPUT
apples, bananas, tofu, and cats
```


# Character Picture Grid
---
Say you have a list of lists where each value in the inner lists is one-character string, like this:
```
grid = [['.', '.', '.', '.', '.', '.'],
		['.', 'O', 'O', '.', '.', '.'],
		['O', 'O', 'O', 'O', '.', '.'],
		['O', 'O', 'O', 'O', 'O', '.'],
		['.', 'O', 'O', 'O', 'O', 'O'],
		['O', 'O', 'O', 'O', 'O', '.'],
		['O', 'O', 'O', 'O', '.', '.'],
		['.', 'O', 'O', '.', '.', '.'],
		['.', '.', '.', '.', '.', '.']]
```
You can think of `grid[x][y]` as being the character at the x- and y-­coordinates of a picture” drawn with text characters. The (0, 0) origin will be in the upper-left corner, the x-coordinates increase going right, and w the y-coordinates increase going down. 
Copy the previous grid value, and write code that uses it to print the image.
```
..OO.OO..
.OOOOOOO.
.OOOOOOO.
..OOOOO..
...OOO...
....O....
```
## Solution
```python
grid = [['.', '.', '.', '.', '.', '.'],
['.', 'O', 'O', '.', '.', '.'],
['O', 'O', 'O', 'O', '.', '.'],
['O', 'O', 'O', 'O', 'O', '.'],
['.', 'O', 'O', 'O', 'O', 'O'],
['O', 'O', 'O', 'O', 'O', '.'],
['O', 'O', 'O', 'O', '.', '.'],
['.', 'O', 'O', '.', '.', '.'],
['.', '.', '.', '.', '.', '.']]

for i in range(6):
    for j in range(9):
        print(grid[j][i], end='')
    print()

```


# Dictionary
---
## Dictionaries vs. Lists

Unlike lists, items in dictionaries are **unordered**.
```python
>>> spam = ['cats', 'dogs', 'moose']
>>> bacon = ['dogs', 'moose', 'cats']
>>> spam == bacon
False
>>> eggs = {'name': 'Zophie', 'species': 'cat', 'age': '8'}
>>> ham = {'species': 'cat', 'age': '8', 'name': 'Zophie'}
>>> eggs == ham
True
```

## The *keys()*, *values()*, and *items()* Methods

```python
>>> spam = {'color': 'red', 'age': 42}
>>> for v in spam.values():
		print(v)
red
42

>>> for k in spam.keys():
print(k)
color
age

>>> for i in spam.items():
print(i)
('color', 'red')
('age', 42)
```

>[!info] Note
>The values in the  `dict_items`  value returned by the  `items()`  method are
**tuples** of the key and value.

```python
>>> spam = {'color': 'red', 'age': 42}
>>> spam.keys()
dict_keys(['color', 'age'])
>>> list(spam.keys())
['color', 'age']
```

The  `list(spam.keys())`  line takes the **dict_keys** value returned from  `keys()` and passes it to  `list()` , which then returns a list value of  `['color', 'age']`.

## The *get()* Method

It’s tedious to check whether a key exists in a dictionary before accessing that key’s value. Fortunately, dictionaries have a  `get()`  method that takes **two** arguments: the key of the value to retrieve and a fallback value to return if that key does not exist.

```python
>>> picnicItems = {'apples': 5, 'cups': 2}
>>> 'I am bringing ' + str(picnicItems.get('cups', 0)) + ' cups.'
'I am bringing 2 cups.'
>>> 'I am bringing ' + str(picnicItems.get('eggs', 0)) + ' eggs.'
'I am bringing 0 eggs.'
```


## The *setdefault()* Method

You’ll often have to set a value in a dictionary for a certain key only if that key does not already have a value. The code looks something like this:
```python
spam = {'name': 'Pooka', 'age': 5}
if 'color' not in spam:
	spam['color'] = 'black'
```
The  `setdefault()`  method offers a way to do this in one line of code. The first argument passed to the method is the key to check for, and the second argument is the value to set at that key ==if the key does not exist==. If the key does exist, the  `setdefault()`  method returns the key’s value. Enter the following into the interactive shell:
```python
>>> spam = {'name': 'Pooka', 'age': 5}
>>> spam.setdefault('color', 'black')
'black'
>>> spam
{'color': 'black', 'age': 5, 'name': 'Pooka'}
>>> spam.setdefault('color', 'white')
'black'
>>> spam
{'color': 'black', 'age': 5, 'name': 'Pooka'}
```

### characterCount.py

```python
message = 'It was a bright cold day in April, and the clocks were striking thirteen.'
count = {}
for character in message:
	count.setdefault(character, 0)
	count[character] = count[character] + 1
print(count)
```

#### Output
``` python
{' ': 13, ',': 1, '.': 1, 'A': 1, 'I': 1, 'a': 4, 'c': 3, 'b': 1, 'e': 5, 'd': 3, 'g': 2, 'i': 6, 'h': 3, 'k': 2, 'l': 3, 'o': 2, 'n': 4, 'p': 1, 's': 3, 'r': 5, 't': 6, 'w': 2, 'y': 1}
```

## Pretty Printing

```python
import pprint
message = 'It was a bright cold day in April, and the clocks were striking thirteen.'
count = {}
for i in message:
	count.setdefault(i, 0)
	count[i] = count[i] + 1
pprint.pprint(count)

# OUTPUT
{' ': 13,
 ',': 1,
 '.': 1,
 'A': 1,
 'I': 1,
 'a': 4,
 'b': 1,
 'c': 3,
 'd': 3,
 'e': 5,
 'g': 2,
 'h': 3,
 'i': 6,
 'k': 2,
 'l': 3,
 'n': 4,
 'o': 2,
 'p': 1,
 'r': 5,
 's': 3,
 't': 6,
 'w': 2,
 'y': 1}
```


# A Tic-Tac-Toe Board
---
![[images/Pasted image 20250204130042.png]]

```python
# Board Initialization
theBoard = {'top-L': ' ', 'top-M': ' ', 'top-R': ' ',
			'mid-L': ' ', 'mid-M': ' ', 'mid-R': ' ',
			'low-L': ' ', 'low-M': ' ', 'low-R': ' '}

# Printing the Board
def printBoard(board):
	print(board['top-L'] + '|' + board['top-M'] + '|' + board['top-R'])
	print('-+-+-')
	print(board['mid-L'] + '|' + board['mid-M'] + '|' + board['mid-R'])
	print('-+-+-')
	print(board['low-L'] + '|' + board['low-M'] + '|' + board['low-R'])

# Checking for a Win
def checkWin(board):
	winning_combinations = [
		['top-L', 'top-M', 'top-R'], 
		['mid-L', 'mid-M', 'mid-R'], 
		['low-L', 'low-M', 'low-R'], 
		['top-L', 'mid-L', 'low-L'], 
		['top-M', 'mid-M', 'low-M'], 
		['top-R', 'mid-R', 'low-R'], 
		['top-L', 'mid-M', 'low-R'], 
		['top-R', 'mid-M', 'low-L']
	]
	for i in winning_combinations:
		if board[i[0]] == board[i[1]] == board[i[2]] and board[i[0]] != ' ':
			return board[i[0]]
	return None

# Checking if the Board is Full
def isBoardFull(board):
	for value in Board.values():
		if value == '':
			return False
		return True

# Getting a Vaild Move
def getValidMove():
	move = input()
	while move not in theBoard or theBoard[move] != ' ':
		print("Invallid mmove. Please choose an empty spot.")
		move = input()
	return move

# Game Loop
turn = 'X'
while True:
	printBoard(theBoard)
	print('Turn for ' + turn + '. Move on which space?')
	move = getValidMove()
	theBoard[move] = turn
	
	winner = checkWin(theBoard)
	if winner:
		print(f"Player {winner} wins!")
		break
	
	if isBoardFull(theBoard):
		printBoard(theBoard)
		print("It's a tie!")
		break
		
	if turn == 'X':
		turn = 'O'
	else:
		turn = 'X'
```

>[!check] Questions
>**Q. If a dictionary is stored in spam, what is the difference between the expressions  =='cat' in spam==  and  =='cat' in spam.keys()==?**
>**Ans.** There is no difference. The in operator checks whether a value exists as a key in the dictionary.
>
>**Q. If a dictionary is stored in spam, what is the difference between the expressions =='cat' in spam== and =='cat' in spam.values()==?**
>**Ans.** `'cat' in spam`  checks whether there is a **'cat'** key in the dictionary, while `'cat' in spam.values()`  checks whether there is a value 'cat' for one of the keys in spam.

# String
---
## Escape Characters

| Escape character | Prints as            |
| ---------------- | -------------------- |
| `\'`             | Single quote         |
| `\''`            | Double quote         |
| `\t`             | tab                  |
| `\n`             | Newline (line break) |
| `\\`             | Backslash            |

## Raw Strings

```python
>>> print(r'That is Carol\'s cat.')
That is Carol\'s cat.
```

## The *isX* String Methods

Here are some common isX string methods:

- `isalpha()` returns ==True== if the string consists only of letters and is not blank.
- `isalnum()` returns ==True== if the string consists only of letters and numbers and is not blank.
- `isdecimal()` returns ==True== if the string consists only of numeric characters and is not blank.
- `isspace()` returns ==True== if the string consists only of spaces, tabs, and newlines and is not blank.
- `istitle()` returns ==True== if the string consists only of words that begin with an uppercase letter followed by only lowercase letters.

```python
>>> 'hello'.isalpha()
True
>>> 'hello123'.isalpha()
False
>>> 'hello123'.isalnum()
True
>>> 'hello'.isalnum()
True
>>> '123'.isdecimal()
True
>>> '
'.isspace()
True
>>> 'This Is Title Case'.istitle()
True
>>> 'This Is Title Case 123'.istitle()
True
>>> 'This Is not Title Case'.istitle()
False
>>> 'This Is NOT Title Case Either'.istitle()
False
```


## The *startswith()* and *endswith()* String Methods

```python
>>> 'Hello world!'.startswith('Hello')
True
>>> 'Hello world!'.endswith('world!')
True
>>> 'abc123'.startswith('abcdef')
False
>>> 'abc123'.endswith('12')
False
>>> 'Hello world!'.startswith('Hello world!')
True
>>> 'Hello world!'.endswith('Hello world!')
True
```

>[!tip]
> **There methods are useful alternatives to the  `==`  equals operator if you need to check only whether the first or last part of the string, rather than the whole thing, is equal to another string.**


## The *join()* and *split()* String Methods

```python
>>> ', '.join(['cats', 'rats', 'bats'])
'cats, rats, bats'
>>> ' '.join(['My', 'name', 'is', 'Simon'])
'My name is Simon'
>>> 'ABC'.join(['My', 'name', 'is', 'Simon'])
'MyABCnameABCisABCSimon'


>>> 'My name is Simon'.split()
['My', 'name', 'is', 'Simon']


>>> 'MyABCnameABCisABCSimon'.split('ABC')
['My', 'name', 'is', 'Simon']
>>> 'My name is Simon'.split('m')
['My na', 'e is Si', 'on']


>>> spam = '''Dear Alice,
How have you been? I am fine.
There is a container in the fridge
that is labeled "Milk Experiment".
Please do not drink it.
Sincerely,
Bob'''
>>> spam.split('\n')
['Dear Alice,', 'How have you been? I am fine.', 'There is a container in the
fridge', 'that is labeled "Milk Experiment".', '', 'Please do not drink it.',
'Sincerely,', 'Bob']
```

## Justifying Text with *rjust()*, *ljust*, and *center()*
 
```python
>>> 'Hello'.rjust(10)
'     Hello'
>>> 'Hello'.rjust(20)
'               Hello'
>>> 'Hello World'.rjust(20)
'         Hello World'

>>> 'Hello'.ljust(10)
'Hello     '

>>> 'Hello'.rjust(20,'*')
'***************Hello'
>>> 'Hello'.ljust(20,'-')
'Hello---------------'

>>> 'Hello'.center(20)
'       Hello        '
>>> 'Hello'.center(20,'=')
'=======Hello========'
```

>[!Example]
>```python
>def printPicnic(itemsDict, leftWidth, rightWidth):
>	print('PICNIC ITEMS'.center(leftWidth + rightWidth, '-'))
>	for k, v in itemsDict.items():
>		print(k.ljust(leftWidth, '.') + str(v).rjust(rightWidth))
>picnicItems = {'sandwiches': 4, 'apples': 12, 'cups': 4, 'cookies': 8000}
>printPicnic(picnicItems, 12, 5)
>printPicnic(picnicItems, 20, 6)
>
># OUTPUT
>---PICNIC ITEMS--
>sandwiches..    4
>apples......   12
>cups........    4
>cookies..... 8000
>-------PICNIC ITEMS-------
>sandwiches..........     4
>apples..............    12
>cups................     4
>cookies.............  8000
>```

## Removing Whitespace with *strip()*, *rstrip()*, and *lstrip()*

```python
>>> spam = '     Hello World     '
>>> spam.strip()
'Hello World'
>>> spam.lstrip()
'Hello World     '
>>> spam.rstrip()
'     Hello World'

>>> spam = 'SpamSpamBaconSpamEggsSpamSpam'
>>> spam.strip('ampS')
'BaconSpamEggs'
```

## Copying and Pasting Strings with the pyperclip Module

```python
>>> import pyperclip
>>> pyperclip.copy('Hello world!')
>>> pyperclip.paste()
'Hello world!'

>>> pyperclip.paste()
'For example, if I copied this sentence to the clipboard and then called
paste(), it would look like this:'
```


### Project : Password Locker

```python
#! python
# pw.py - An insecure password locker program.

PASSWORDS = {'email' : 'F7minlBDDuvMJuxESSKHFhTxFtjVB6',
			'blog': 'VmALvQyKAxiVH5G8v01if1MLZF3sdt',
			'luggage': '12345'}

import sys,pyperclip

if len(sys.argv) < 2:
	print('Usage: python pw.py [account] - copy account password')
	sys.exit()

account = sys.argv[1]

if account in PASSWORDS:
	pyperclip.copy(PASSWORDS[account])
	print('Password for ' + account + ' copied to clipboard.')
else:
	print('There is no account named ' + account)
```

#### OUTPUT

```bash
┌──(venv3)(voldemort🔥IdeaPad)-[~]
└─$ python pw.py email
Password for emailcopied to clipboard.

┌──(venv3)(voldemort🔥IdeaPad)-[~]
└─$ python pw.py blog
Password for blogcopied to clipboard.
```

### Project : Adding Bullets to Wiki Markup

```python
#! python3
# bulletPointAdder.py - Adds Wikipedia bullet points to the start of each line of text on the clipboard

import pyperclip
text = pyperclip.paste()

#Seperate lines and add stars.
lines = text.split('\n')
for i in range(len(lines)): # loop through all indexes for "lines" list
	lines[i] = '* ' + lines[i] # add start to each string in "lines" list

text = '\n'.join(lines)
pyperclip.copy(text)
```

#### OUTPUT
```bash
#COPIED
In the C wing,
there are 24 rooms, a narrow hallway,
a kitchen, a solarium and a locked entrance.
(It’s not rocket science).

┌──(venv3)(voldemort🔥IdeaPad)-[~]
└─$ python bulletPointAdder.py 

#PASTED
* In the C wing,
* there are 24 rooms, a narrow hallway,
* a kitchen, a solarium and a locked entrance.
* (It’s not rocket science).
```

### Project : Table Printer
```python
tableData = [['apples', 'oranges', 'cherries', 'banana'],
			['Alice', 'Bob', 'Carol', 'David'],
			['dogs', 'cats', 'moose', 'goose']]

column = []
for m in tableData:
	for n in m:
		lc = 0
		if len(n) > lc:
			lc = len(n)
	colum.append(lc+2)

for i in range(len(tableData[0])):
	for j in range(len(tableData)):
		print(tableData[j][i].rjust(colum[j]),end=' ')
	print('\n')
```

#### OUTPUT
```
┌──(venv3)(voldemort🔥IdeaPad)-[~]
└─$ python TablePrinter.py 
  apples   Alice    dogs 
 oranges     Bob    cats 
cherries   Carol   moose 
  banana   David   goose 
```


# Character Classes

| Shorthand character class | Represents                                                                        |
| ------------------------- | --------------------------------------------------------------------------------- |
| \d                        | Any numeric digit from 0 to 9.                                                    |
| \D                        | And character that is *not* a numeric digit from 0 to 9.                          |
| \w                        | Any letter, numeric digit, or the underscore character.                           |
| \W                        | Any character that is *not* a letter, numeric digit, or the underscore character. |
| \s                        | Any space, tab, or newline character.                                             |
| \S                        | Any character that is *not* a space, tab, or newline.                             |

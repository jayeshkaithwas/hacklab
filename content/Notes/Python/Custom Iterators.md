---
title: Custom Iterators
aliases:
  - Custom Iterators
description: Understanding Custom Iterators in Python
tags:
  - Python
---

## **1. Implementing a Finite Power of Two Iterator**

The first program defines a class `Pow_of_Two`, which acts as an iterator generating powers of two up to a given limit. The `__iter__()` method initializes the iterator, and `__next__()` computes the next power of two until the maximum limit is reached. If no more values are available, it raises a `StopIteration` exception.

**Key Concepts:**

- Custom iterator implementation using `__iter__()` and `__next__()`.
- Raising `StopIteration` to indicate the end of iteration.
- Generating powers of two dynamically.

```python
class Pow_of_Two:
	'''Class to implement an iterator of power of two'''
	def __init__(self,max=0):
		self.max = max
	def __iter__(self):
		self.n = 0
		return self
	def __next__(self):
		if self.n <= self.max:
			result = 2 ** self.n
			self.n += 1
			return result
		else:
			raise StopIteration
print(Pow_of_Two.__doc__)
a = Pow_of_Two(4)
i = iter(a)
print(next(i))  //print(i.__next__0)
print(next(i))
print(next(i))

#OUTPUT
Class to implement an iterator of power of two
1
2
4
```


## **2. Creating an Infinite Iterator for Odd Numbers**

The second program demonstrates an **infinite iterator** that continuously generates odd numbers. Unlike the first example, this iterator does not have a stopping condition and will keep generating numbers indefinitely.

**Key Concepts:**

- Infinite iteration using `__iter__()` and `__next__()`.
- Returning odd numbers by incrementing by `2` on each iteration.
- No `StopIteration`, making the iterator run infinitely unless stopped manually.

These examples illustrate the power of iterators in Python, helping in generating sequences efficiently without storing them in memory.

```python
class Infinite_Iter:
	'''Infinite iterator to return all odd numbers'''
	def __iter__(self):
		self.num = 1
		return self
	def __next__(self):
		num=self.num
		self.num += 2
		return num
i = Infinite_Iter()
a = iter(i)
print(next(a))
print(next(a))
print(next(a))
print(next(a))

#OUTPUT
1
3
5
7
```
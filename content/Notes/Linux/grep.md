---
title: grep
aliases:
  - grep
---


The `grep` command is used to search for text patterns within files or output streams in Linux. It supports regular expressions and various options to refine searches.


| Options | Description                                                                                     | Example                                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| -v      | Exclude a specific word.                                                                        | [[grep#2. Exclude a specific word (invert match)\| 2]], [[grep#4. Count lines that do not contain the word\| 4]] |
| -c      | Count occurrences of a word.                                                                    | [[grep#3. Count occurrences of a word\| 3]], [[grep#4. Count lines that do not contain the word\| 4]]            |
| -i      | Ignores, case for matching.                                                                     | [[grep#5. Case-insensitive search\| 5]], [[grep#6. Matched lines and their line numbers.\| 6]]                   |
| -n      | Matched lines and their line numbers.                                                           | [[grep#6. Matched lines and their line numbers.\| 6]]                                                            |
| -r      | Search for a word in all files within a directory (recursive)                                   |                                                                                                                  |
| -l      | Displays list of a filenames only.                                                              |                                                                                                                  |
| -w      | Match whole word                                                                                | [[grep#1. Search for a specific word in a file\| 1]]                                                             |
| -o      | Print only the matched parts of a matching line, with each such part on a separate output line. |                                                                                                                  |

# Basic Usage

## 1. Search for a specific word in a file

> [!Note] 
>  `grep "Alice" text.txt` and `grep -w "Alice" text.txt` , both command will produce same Output.

```bash
grep "Alice" text.txt
```
![[images/Pasted image 20250216222400.png]]

## 2. Exclude a specific word (invert match)

```bash
grep -v Alice text.txt
```
![[images/Pasted image 20250216223103.png]]
## 3. Count occurrences of a word

```bash
grep -c Alice text.txt
```
![[images/Pasted image 20250216223215.png]]
## 4. Count lines that do not contain the word

```bash
grep -cv Alice text.txt
```
![[images/Pasted image 20250216223255.png]]
## 5. Case-insensitive search

```bash
grep -i Alice text.txt
```
![[images/Pasted image 20250216223418.png]]

## 6. Matched lines and their line numbers.

```bash
grep -in alice text/text.txt
```
![[images/Pasted image 20250216225548.png]]

## 7. Print only the matched parts of a matching line, with each such part on a separate output line.

```bash
grep -io alice text/text.txt
```
![[images/Pasted image 20250216232657.png]]

## 8. Using expression multiple times

```bash
grep -e "Alice" -e "is" text/text.txt
```
![[images/Pasted image 20250216233051.png]]

---
# Recursive Search

## 1. Search for a word in all files within a directory (recursive)

```bash
grep -ri "Alice" text/
```
![[images/Pasted image 20250216223758.png]]

---
## 2. List only filenames containing the word

```bash
grep -ril "Alice" text/
```
![[images/Pasted image 20250216223920.png]]

---
# Pattern Matching

## 1. Search for lines starting with a specific word

```bash
grep "^The" text/text.txt
```
![[images/Pasted image 20250216224115.png]]

## 2. Search for lines ending with a specific character (e.g., `s.`)

```bash
grep -i "s.$" text/text.txt
```
![[images/Pasted image 20250216224343.png]]

## 3. Count empty lines in multiple files

```bash
grep -rc "^$" text/
```
![[images/Pasted image 20250216224718.png]]

## 4. Search for lines containing a specific pattern

```bash
grep ".or" text/text.txt
grep "....or" text/text.txt
```
![[images/Pasted image 20250216225025.png]]


# Custom Commands

The `grep` command is a powerful text-searching tool in Linux, allowing users to find, count, and filter text patterns efficiently. Understanding its various options enhances search capabilities significantly.
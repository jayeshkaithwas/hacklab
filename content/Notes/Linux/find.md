---
title: find
aliases:
  - find
tags:
  - Linux
  - Bash
description: The find command lets you use a pattern to find a file.
---
# **Mastering the `find` Command in Linux**

## **Introduction to the `find` Command**

The `find` command in Linux is a powerful utility for searching and locating files and directories based on various criteria such as name, size, type, and modification date. Whether you're a system administrator or a casual user, mastering `find` can save you a lot of time and effort.

---

## **Basic Usage and Syntax**

The basic syntax of the `find` command is:

```bash
find [path] [options] [expression]
```

- **`[path]`**: Directory to search in. Use `.` for the current directory or `/` for the entire filesystem.
- **`[options]`**: Additional options to refine the search, like `-name`, `-size`, `-type`, etc.
- **`[expression]`**: Criteria for searching, such as filename patterns, file types, sizes, or timestamps.

**Example:**

```bash
find . -name "example.txt"
```

This command searches for a file named `example.txt` in the current directory and its sub-directories.

| Command                  | Description                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| -name pattern            | Searches for files with a specific name or pattern.                                                                   |
| -type type               | Specifies the type of file to search for (e.g.,  `f`  for regular files,  `d`  for directories).                      |
| \-size \[+/-\]n          | Searches for files based on size. `+n` finds larger files, `-n` finds smaller files. `n` measures size in characters. |
| -mtime n                 | Finds files based on modification time.  `n`  represents the number of days ago.                                      |
| -exec command {} \\;     | Executes a command on each file found.                                                                                |
| -print                   | Displays the path names of files that match the specified criteria.                                                   |
| -maxdepth levels         | Restricts the search to a specified directory depth.                                                                  |
| -mindepth levels         | Specifies the minimum directory depth for the search.                                                                 |
| -empty                   | Finds empty files and directories.                                                                                    |
| \-delete                 | Deletes files that match the specified criteria.                                                                      |
| \-execdir command {} \\; | Executes a command on each file found, from the directory containing the matched file.                                |
| \-iname pattern          | Case-insensitive version of `-name`. Searches for files with a specific name or pattern, regardless of case.          |


> [!NOTE] 
> **\- exec vs \- execdir**
> In the Linux `find` command, "-exec" runs the specified command on each matched file in the current directory or wherever the `find` command is run, while "-execdir" specifically runs the command within the directory where each matched file is found, preventing potential race conditions by not changing the working directory during the search.
> 
> **Example :**
> ![[images/Pasted image 20250223202146.png]]
> 
> **Explanation :**
> `find Desktop/ -name "*.txt" -exec ls -la {} \;` command searches for all files with the ".txt" extension in the current directory(i.e `Desktop/`) and its subdirectories, and then runs the `ls -l` command on each file individually, listing its details in the current working(i.e `~`) directory.
> 
>`find Desktop/ -name "*.txt" -execdir ls -la {} \;` command does the same search for ".txt" files, but the `ls -l` command will be executed within the directory(i.e `Desktop/`) where each file is found, ensuring that the working directory is always the same as the file location.


---

## **Searching by Name and Extension**

We can search for files by their name or extension using the `-name` or `-iname` (case-insensitive) option.

**1. Search by Exact Name:**

```bash
find /home/voldemort/Desktop -name "Attacking Nginx.pdf"
```

![[images/Pasted image 20250223181938.png]]

**2. Case-Insensitive Search:**

```bash
find /home/voldemort/Desktop -iname "aTTacking nGinx.pdf"
```

![[images/Pasted image 20250223182053.png]]

**3. Search by Extension:**

```bash
find /home/voldemort/Desktop -name "*.pdf"
```

![[images/Pasted image 20250223182445.png]]

**4. Search for Multiple Extensions:**

```bash
find /home/voldemort/Desktop/ -name "*.jpg" -o -name "*.txt" -o -name "*.py"
```

![[images/Pasted image 20250223183016.png]]

---

## **Searching by Size and Date**

The `find` command allows searching by file size or modification date.

**1. Search by Size:**

```bash
find /home/voldemort/ovas -size +100M
```

This searches for files larger than 100 MB.

- `+` means greater than.
- `-` means less than.
- No symbol means exact size.

![[images/Pasted image 20250223183246.png]]

**2. Search by Date:**

```bash
find /home/voldemort/Desktop/ -mtime -7
```

This finds files modified in the last 7 days.

- `-mtime`: Modification time in days.
- `-atime`: Last accessed time.
- `-ctime`: Last changed time (metadata).

![[images/Pasted image 20250223194033.png]]
![[images/Pasted image 20250223194110.png]]
![[images/Pasted image 20250223194141.png]]

**3. Search by Minutes:**

```bash
find /home/voldemort/Desktop/ -mmin -60
```

Finds files modified in the last 60 minutes.

![[images/Pasted image 20250223194301.png]]

---

## **Combining Multiple Conditions**

You can combine multiple conditions using logical operators:

- `-and` or `-a`: Logical AND (default behavior)
- `-or` or `-o`: Logical OR
- `-not` or `!`: Logical NOT

**Example:**

```bash
find /home/voldemort/Desktop/ -type f -name "*.txt" -size +20M
```

This searches for text files larger than 1 MB.

![[images/Pasted image 20250223194806.png]]

**Using OR Condition:**

```bash
find /home/voldemort/Desktop/ -name "*.txt" -o -name "*.pdf" -size +20M
```

![[images/Pasted image 20250223195228.png]]

---

## **Executing Actions on Found Files**

The `-exec` option allows executing a command on each found file.

**1. Deleting Files:**

```bash
find /path/to/search -name "*.tmp" -exec rm {} \;
```

>[!Note]
>`{}` is replaced by each found file, and `\;` marks the end of the command.

**2. Moving Files:**

```bash
find /path/to/search -name "*.jpg" -exec mv {} /path/to/destination/ \;
```

**3. Archiving Files:**

```bash
find /path/to/search -name "*.log" -exec tar -rvf logs_archive.tar {} \;
```

**4. Using xargs for Efficiency:**

```bash
find /path/to/search -name "*.tmp" -print0 | xargs -0 rm
```

This approach is more efficient for large numbers of files.

---

### **Practical Examples 

1. **Find and Delete Old Log Files:**

```bash
find /var/log -name "*.log" -mtime +30 -exec rm {} \;
```

This deletes log files older than 30 days.

2. **Find Large Files Taking Up Space:**

```bash
find / -type f -size +1G
```

This helps you find files larger than 1 GB anywhere on your system.

3. **List Recently Modified Files:**

```bash
find . -type f -mtime -1
```

Lists all files modified within the last 24 hours.

4. **Find and Compress Large Files:**

```bash
find /path/to/search -size +100M -exec gzip {} \;
```


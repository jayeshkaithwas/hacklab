---
title: cd
aliases:
  - cd
---
![[images/Pasted image 20250120132722.png]]
# Mastering Directory Navigation with Bash

Navigating through directories in a terminal can be cumbersome, especially when dealing with complex directory structures. Luckily, Bash provides various commands and tricks that can significantly ease your navigation experience. Below, I'll walk you through some practical examples and advanced tips for efficient directory management using `cd`, `pwd`, aliases, and functions.

---

## **1. Create and Navigate Directories Efficiently**

One of the fundamental tasks in the terminal is creating and navigating through directories. Here's a simple example:

```bash
root@IdeaPad$ mkdir -p /tmp/folder5/folder4/folder3/folder2/folder1

root@IdeaPad$ cd /tmp/folder5/folder4/folder3/folder2/folder1/

root@IdeaPad$ pwd
/tmp/folder5/folder4/folder3/folder2/folder1

```

By using `mkdir -p`, we can create a whole directory structure in one go, even if intermediate directories do not exist.

---

## **2. Jumping Up Multiple Directory Levels**

Navigating through multiple parent directories is a common task. Instead of typing multiple `cd ..` commands, you can use aliases for quicker navigation. For example, after adding the following aliases to your `.bashrc` file:

```bash
alias ..="cd .."
alias ..2="cd ../.."
alias ..3="cd ../../.."
alias ..4="cd ../../../.."
alias ..5="cd ../../../../.."
```

You can jump multiple directories at once:

```bash
root@IdeaPad$ cd /tmp/folder5/folder4/folder3/folder2/folder1
root@IdeaPad$ ..2

root@IdeaPad$ pwd
/tmp/folder5/folder4/folder3/
```

---

## **3. Improving Directory Navigation with Functions**

Bash functions can be extremely helpful when you want to combine commands. For example, you can create a function that creates a directory and then immediately navigates into it. Here’s a simple `mkdircd` function added to your `.bashrc` file:

```bash
function mkdircd() {
    mkdir -p "$@" && eval cd "\"\$$#\"";
}
```

This function makes it easy to create directories and switch into them at the same time:

```bash
root@IdeaPad$ mkdircd /tmp/dir1/dir2/dir3/dir4

root@IdeaPad$ pwd
/tmp/dir1/dir2/dir3/dir4
```

---

## **4. Navigating Back and Forth Using `cd -`**

You can use `cd -` to switch between the current and the previous directory, making it easier to jump back and forth. For example:

```bash
root@IdeaPad$ cd /tmp/folder5/folder4/folder3/folder2/folder1
root@IdeaPad$ cd /tmp/dir1/dir2/dir3/dir4

root@IdeaPad$ cd -
root@IdeaPad$ pwd
/tmp/folder5/folder4/folder3/folder2/folder1

root@IdeaPad$ cd -
root@IdeaPad$ pwd
/tmp/dir1/dir2/dir3/dir4
```

Using `cd -` allows you to toggle between two directories without having to type the full path each time.

---

#### **5. Directory Stack with `pushd` and `popd`**

If you frequently need to navigate to multiple directories, `pushd` and `popd` can help you manage your location in a stack-like manner. Here's how it works:

```bash
root@IdeaPad$ cd /tmp/folder1
root@IdeaPad$ pushd .

root@IdeaPad$ cd /tmp/folder2
root@IdeaPad$ pushd .

root@IdeaPad$ cd /tmp/folder3
root@IdeaPad$ pushd .

root@IdeaPad$ dirs
/tmp/folder3 /tmp/folder2 /tmp/folder1
```

You can use `popd` to go back through the directories in reverse order:

```bash
root@IdeaPad$ popd
root@IdeaPad$ pwd
/tmp/folder2

root@IdeaPad$ popd
root@IdeaPad$ pwd
/tmp/folder1

root@IdeaPad$ popd
bash: popd: directory stack empty
```

This is a great way to manage and quickly switch between multiple directories without losing your place.

---

#### **6. Auto-Correction for Typos in `cd` Command with `shopt -s cdspell`**

If you're prone to typos, Bash has a feature that automatically corrects your mistakes when you type directory names. This is enabled using the command `shopt -s cdspell`. For example:

```bash
root@IdeaPad$ cd /tmp/felder1
bash: cd: /tmp/felder1: No such file or directory

root@IdeaPad$ shopt -s cdspell

root@IdeaPad$ cd /tmp/felder1
root@IdeaPad$ pwd
/tmp/folder1
```

As you can see, even though we mistyped `felder1`, `cdspell` automatically corrected the mistake to `folder1` and allowed us to navigate into the directory.

---

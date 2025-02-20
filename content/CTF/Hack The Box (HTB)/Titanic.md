---
title: Titanic
aliases:
  - Titanic
tags:
  - Easy
  - Linux
  - HTB
---
[_Titanic_](https://app.hackthebox.com/machines/Titanic) is an Easy Linux machine on HTB which allows you to practice virtual host enumeration, path traversal, gitea, PBKDF2 cracking and arbitrary code execution.

# Reconnaissance

Scanning port with Nmap.
![[images/Pasted image 20250219172728.png]]

The Scan shows us that port 80 is open.

Lets Visit http://10.10.11.15/
![[images/Pasted image 20250219173255.png]]

Adding titanic.htb to /etc/hosts

![[images/Pasted image 20250219173436.png]]
![[images/Pasted image 20250219173533.png]]

Now visiting titanic.htb
![[images/Pasted image 20250219173755.png]]

By enumerating , found a form on a page
![[images/Pasted image 20250219174341.png]]

We will try to capture requests in burp suite.

![[images/Pasted image 20250219174229.png]]



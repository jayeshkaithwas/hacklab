---
title: Crack the Hash
aliases:
  - Crack the Hash
tags:
  - Easy
  - CTF
description: Cracking hashes challenges
---
# Introduction

The "Crack the Hash" room on TryHackMe is designed to teach participants how to identify and crack various hashed passwords using different techniques and tools like **Hashcat**, **John the Ripper**, and **online hash lookup databases**. This write-up provides step-by-step solutions for the challenges presented in the room.

[LAB](https://tryhackme.com/room/crackthehash)
# Level 1
---

## **Hash 1: `48bb6e862e54f2a795ffc4e541caed4d`**

### **Step 1 : Cracking hash Using Online Decryption Sites**

We can check this hash on website like:

- [https://crackstation.net/](https://crackstation.net/)
 
![[images/Pasted image 20250212130626.png]]
#### **Result:** `easy`

---
## **Hash 2: `CBFDAC6008F9CAB4083784CBD1874F76618D2A97 `**

### **Step 1 : Cracking hash Using Online Decryption Sites**

We can check this hash on website like:

- [https://hashes.com/](https://hashes.com/)
![[images/Pasted image 20250212131237.png]]
#### **Result:** `password123`

---
## **Hash 3: `1C8BFE8F801D79745C4631D09FFF36C82AA37FC4CCE4FC946683D7B336B63032`**

### **Step 1 : Cracking hash Using Online Decryption Sites**

We can check this hash on website like:

- [https://crackstation.net/](https://crackstation.net/)

![[images/Pasted image 20250212131816.png]]
#### **Result:** `letmein`

---
## **Hash 4: `$2y$12$Dwt1BZj6pcyc3Dy1FWZ5ieeUznr71EeNkJkUlypTsgbX1H68wsRom`**

### **Step 1 : Cracking hash Using Online Decryption Sites**

- [https://crackstation.net/](https://crackstation.net/)

![[images/Pasted image 20250212133059.png]]

### **Step 2 : Identify the hash type**

We can use **hashid** or **hash-identifier** to determine the type
![[images/Pasted image 20250212134607.png]]
 
 Or you can use AI bot's like [ChatGPT](https://chatgpt.com/), [Claude](https://claude.ai/), [Gemini](https://gemini.google.com/app?hl=en-IN) etc.
 
![[images/Pasted image 20250212135103.png]]

This hash is likely **bcrypt**.

### **Step 3 : Crack using John the Ripper**

```sh 
┌──(voldemort🔥IdeaPad)-[~]
└─$ echo '$2y$12$Dwt1BZj6pcyc3Dy1FWZ5ieeUznr71EeNkJkUlypTsgbX1H68wsRom' > hash

┌──(voldemort🔥IdeaPad)-[~]
└─$ john --wordlist=SecLists/Passwords/Leaked-Databases/rockyou.txt hash
Loaded 1 password hash (bcrypt [Blowfish 32/64 X3])
Will run 12 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
bleh             (?)
1g 0:00:35:19 100% 0.000471g/s 82.07p/s 82.07c/s 82.07C/s bobbyray..binkie1
Use the "--show" option to display all of the cracked passwords reliably
Session completed

┌──(voldemort🔥IdeaPad)-[~]
└─$ john hash --show
?:bleh

1 password hash cracked, 0 left
```
#### **Result:** `bleh`

---
## **Hash 5 : `279412f945939ba78ce0758d3fd83daa`** 
### **Step 1 : Cracking hash Using Online Decryption Sites**

- [https://hashes.com/](https://hashes.com/)

![[images/Pasted image 20250212172015.png]]
#### **Result:** `Eternity22`

---
# Level 2
---
## **Hash 1 : `F09EDCB1FCEFC6DFB23DC3505A882655FF77375ED8AA2D1C13F640FCCC2D0C85`**
### **Step 1 : Cracking hash Using Online Decryption Sites**

- [https://crackstation.net/](https://crackstation.net/)

![[images/Pasted image 20250212172414.png]]
#### Result: `paule`

---
## **Hash 2 : `1DFECA0C002AE40B8619ECF94819CC1B`**

### **Step 1 : Cracking hash Using Online Decryption Sites**

- [https://hashes.com/](https://hashes.com/)

![[images/Pasted image 20250212172806.png]]
#### Result: `n63umy8lkf4i`
---
## **Hash 3 : `Hash: $6$aReallyHardSalt$6WKUTqzq.UQQmrm0p/T7MPpMbGNnzXPMAXi4bJMl9be.cfi3/qxIf.hsGpS41BqMhSrHVXgMpdjS6xeKZAs02.`**

**Salt:** `aReallyHardSalt`

### **Step 1 : Cracking hash Using Online Decryption Sites**

- [https://hashes.com/](https://hashes.com/)
![[images/Pasted image 20250212174559.png]]

---
### **Hash 4 : `e5d8870e5bdd26602cab8dbe07a942c8669e56d6`**

**Salt:** `tryhackme`

### **Step 1 : Cracking hash Using Online Decryption Sites**

- [https://hashes.com/](https://hashes.com/)
![[images/Pasted image 20250212175029.png]]
---
title: Pyramid Of Pain
aliases:
  - Pyramid Of Pain
tags:
  - Easy
  - THM
  - SOCLevel1
  - Walkthrough
description: Learn what is the Pyramid of Pain and how to utilize this model to determine the level of difficulty it will cause for an adversary to change the indicators associated with them, and their campaign.
---
# Hash Values (Trivial)
---

**Analyse the report associated with the hash "b8ef959a9176aef07fdca8705254a163b50b49a17217a4ff0107487f59d4a35d" [here.](https://assets.tryhackme.com/additional/pyramidofpain/t3-virustotal.pdf) What is the filename of the sample?**

- `Sales_Receipt 5606.xls`
  
![[images/Pasted image 20250227111940.png]]

# IP Address (Easy)
---

**Read the following [report](https://assets.tryhackme.com/additional/pyramidofpain/task3-anyrun.pdf) to answer this question. What is the first IP address the malicious process (PID 1632) attempts to communicate with?**

- `50.87.136.52`
  
![[images/Pasted image 20250227112757.png]]

**Read the following [report](https://assets.tryhackme.com/additional/pyramidofpain/task3-anyrun.pdf) to answer this question. What is the first domain name the malicious process ((PID 1632) attempts to communicate with?**

- `craftinglegacy.com`

![[images/Pasted image 20250227112757.png]]


# Domain Names (Simple)
---

**Go to [this report on app.any.run](https://app.any.run/tasks/a66178de-7596-4a05-945d-704dbf6b3b90) and provide the first suspicious domain request you are seeing, you will be using this report to answer the remaining questions of this task.**

- `craftingalegacy.com`
  
![[images/Pasted image 20250227113512.png]]

**What term refers to an address used to access websites?**

- `Domain Name`

**What type of attack uses Unicode characters in the domain name to imitate the a known domain?**

- `Punycode attack`

**Provide the redirected website for the shortened URL using a preview:** https://tinyurl.com/bw7t8p4u

- `https://tryhackme.com`

# Host Artifacts (Annoying)
---

**A process named regidle.exe makes a POST request to an IP address based in the United States (US) on port 8080. What is the IP address?**

- `96.126.101.6`

![[images/Pasted image 20250227115533.png]]

**The actor drops a malicious executable (EXE). What is the name of this executable?**

- `G_jugk.exe`

![[images/Pasted image 20250227120132.png]]

**Look at this [report](https://assets.tryhackme.com/additional/pyramidofpain/vtotal2.png) by Virustotal. How many vendors determine this host to be malicious?**

- `9`

![[images/Pasted image 20250227120340.png]]

# Network Artifacts (Annoying)
---

**What browser uses the User-Agent string shown in the screenshot above?**

- `Internet Explorer`

**How many POST requests are in the screenshot from the pcap file?**

- `6`
  
![[images/Pasted image 20250227120935.png]]

# Tools (Challenging)
---

**Provide the method used to determine similarity between the files**

-  `Fuzzy Hashing`

Provide the alternative name for fuzzy hashes without the abbreviation

- `context triggered piecewise hashes`


# TTPs (Tough)
---
**Navigate to ATT&CK Matrix webpage. How many techniques fall under the Exfiltration category?**

- `9`

![[images/Pasted image 20250227121523.png]]

**Chimera is a China-based hacking group that has been active since 2018. What is the name of the commercial, remote access tool they use for C2 beacons and data exfiltration?**

- `Cobalt Strike`
 
![[images/Pasted image 20250227122039.png]]

# Practical: The Pyramid of Pain
---

**Complete the static site. What is the flag?**

- `THM{PYRAMIDS_COMPLETE}`

![[images/Pasted image 20250227123445.png]]
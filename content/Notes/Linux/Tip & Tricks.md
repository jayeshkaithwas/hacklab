---
title: Tip & Tricks
aliases:
  - Tip & Tricks
---
# Terminal Shortcut Keys
---

| Key                 | Usage                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ctrl + a            | Move to the beginning of line.                                                                                                                                         |
| Ctrl + d            | If you've type something, Ctrl + d deletes the character under the cursor, else, it escapes the current shell.                                                         |
| Ctrl + e            | Move to the end of line.                                                                                                                                               |
| Ctrl + k            | Delete all text from the cursor to the end of line.                                                                                                                    |
| Ctrl + l            | Equivalent to clear.                                                                                                                                                   |
| Ctrl + n            | Same as Down arrow.                                                                                                                                                    |
| Ctrl + p            | Same as Up arrow.                                                                                                                                                      |
| Ctrl + r            | Begins a backward search through command history.(keep pressing Ctrl + r to move backward)                                                                             |
| Ctrl + s            | To stop output to terminal.                                                                                                                                            |
| Ctrl + t            | Transpose the character before the cursor with the one under the cursor, press Esc + t to transposes the two words before the cursor.                                  |
| Ctrl + u            | Cut the line before the cursor; then Ctrl + y paste it                                                                                                                 |
| Ctrl + w            | Cut the word before the cursor; then Ctrl + y paste it                                                                                                                 |
| Ctrl + x + Ctrl + e | Launch editor defined by $EDITOR to input your command. Useful for multi-line commands.                                                                                |
| Ctrl + z            | Stop current running process and keep it in background. You can use `fg` to continue the process in the foreground, or `bg` to continue the process in the background. |

# Suppress Standard Output
---
```bash

┌──(voldemort@IdeaPad)-[~]
└─$ cat traceconnect.d > /dev/null

┌──(voldemort@IdeaPad)-[~]
└─$ cat traceconnect.d 2> /dev/null
struct sockaddr_in{
	short 		sin_family;
	unsigned short 	sin_port;
	in_addr_t	sin_addr;
	char		sin_zero[8];
};

syscall::connect:entry
/arg2 == sizeof(struct sockaddr_in)/
{
	addr = (struct sockaddr_in*)copyin(arg1, arg2);
	printf("process:'%s' %s:%d", execname, inet_ntop(2, &addr->sin_addr), ntohs(addr->sin_port)); 
}

```
---
title: FFuF
aliases:
  - FFuF
tags:
  - Reconnaissance
  - BruteForce
---
# FUZZing with FFUF

![[images/Pasted image 20250116184413.png]]

When it comes to penetration testing and bug bounty hunting, efficient fuzzing tools are indispensable. FFUF (Fuzz Faster U Fool) is one such powerhouse tool that lets you discover hidden directories, subdomains, and other endpoints with ease. This blog will dive into techniques for using FFUF to maximize its potential.

## Subdomain Enumeration

Discovering subdomains is a critical part of reconnaissance. Here's a command that demonstrates how to use FFUF for subdomain enumeration:

```bash
ffuf -w /usr/share/wordlists/dirb/big.txt -H "HOST:FUZZ.board.htb" -u "http://board.htb"
```

### Filtering Techniques
To refine your results and focus on actionable data, FFUF provides several filtering options:

1. **Filter by Status Codes**
   Narrow down results to specific HTTP status codes, such as `200`, `301`, and `302`, which often indicate valid pages:
   ```bash
   -mc 200,301,302
   ```

2. **Filter by Content Length**
   Exclude responses based on content length. For instance, to ignore responses with a length of `0`:
   ```bash
   -fs 0
   ```

3. **Filter by Word Count**
   Exclude responses with a specific word count. For example, to skip responses with zero words:
   ```bash
   -fw 0
   ```

4. **Match Strings**
   Focus on results containing specific strings in the response body:
   ```bash
   -mr "specific-string"
   ```

5. **Save Output for Analysis**
   Save results to a file in JSON format for further processing:
   ```bash
   -o results.json -of json
   ```

6. **Add Specific Extensions**
   Target specific file types by including extensions:
   ```bash
   -e .txt,.md,.php
   ```

---

## Directory Discovery

Discovering hidden directories can reveal sensitive or unprotected resources. Use the following command:

```bash
ffuf -c -w /usr/share/wordlists/dirbuster/directory-list-1.0.txt -u http://itrc.ssg.htb/?page=FUZZ -b "PHPSESSID=d9d5c700f355b51c27d8026f8f3d8027" -recursion -fs 3976
```

### Command Breakdown
| Flag           | Description                                                                                                                                                                 |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **-c**         | Colorizes the output for better readability.                                                                                                                                |
| **-w**         | Specifies the wordlist to use.                                                                                                                                              |
| **-u**         | Defines the URL with the FUZZ keyword (e.g., `-u http://itrc.ssg.htb/?page=FUZZ`).                                                                                          |
| **-b**         | Adds cookie data for authenticated requests (e.g., `-b "PHPSESSID=..."`).                                                                                                 |
| **-recursion** | Enables recursive scanning to discover links or directories nested within the initial results.                                                                               |
| **-fs 3976**   | Filters out responses with a content length of `3976`.                                                                                                                       |

---

## Subdomain Discovery

Another approach to subdomain enumeration is shown here:

```bash
ffuf -c -w SecLists/Discovery/DNS/n0kovo_subdomains.txt -u "http://ssg.htb" -H "HOST: FUZZ.ssg.htb" -t 200 -mc all -fc 302
```

### Command Breakdown
| Flag            | Description                                                                                                                |
|-----------------|----------------------------------------------------------------------------------------------------------------------------|
| **-t 200**      | Sets the number of concurrent threads to 200, speeding up the scan.                                                        |
| **-mc all**     | Includes all HTTP status codes in the results.                                                                             |
| **-fc 302**     | Excludes responses with status code `302`.                                                                                 |

---
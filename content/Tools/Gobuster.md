---
title: Gobuster
aliases:
  - Gobuster
tags:
  - Bash
  - Installation
  - Linux
  - Reconnaissance
  - Scanning
description: Gobuster is a powerful command-line tool written in Go that brute-forces URLs (directories and files) on web servers
---
# Uncover Hidden Paths with Gobuster: A Fast and Powerful Directory Brute-Forcing Tool
---
In the world of ethical hacking and penetration testing, **information discovery** is a critical first step. Often, the success of a web application penetration test hinges on how much you can uncover about the structure and hidden components of a target site. This is where tools like **Gobuster** come into play.

## What is Gobuster?

**Gobuster** is a powerful command-line tool written in Go that brute-forces URLs (directories and files) on web servers. Unlike traditional web crawlers, which rely on hyperlinks and sitemaps, Gobuster uses a **wordlist** to test different URI paths and detect valid ones based on HTTP responses. This makes it extremely useful for discovering **hidden files, directories, subdomains**, and even **virtual hosts**.

Gobuster is fast, efficient, and customizable, making it a staple in any ethical hacker's toolkit.

## Installing Gobuster

To install Gobuster, you can either download a precompiled binary or build it from source:

### On Kali Linux or Parrot OS:

```bash
sudo apt install gobuster
```

### From Source:

```bash
go install github.com/OJ/gobuster/v3@latest
```

Make sure your `$GOPATH/bin` is in your system’s `$PATH` to run Gobuster globally.

## Basic Usage

Here's a quick example to scan a target website for hidden directories:

```bash
gobuster dir -u http://example.com -w /usr/share/wordlists/dirb/common.txt
```

### Options Breakdown:

- `dir` – The mode (directory brute-forcing)
- `-u` – The target URL
- `-w` – The wordlist to use for brute-forcing

### Additional Useful Flags:

- `-t` – Number of concurrent threads (e.g., `-t 50` for 50 threads)
- `-x` – File extensions to append (e.g., `-x php,html`)
- `-o` – Output results to a file

## DNS Subdomain Bruteforcing

Gobuster can also be used to discover subdomains of a domain:

```bash
gobuster dns -d example.com -w /usr/share/wordlists/dns/subdomains-top1million-5000.txt
```

## Example in Action

Let’s say you’re testing a CTF box or real-world target and suspect there might be hidden admin panels or upload pages. Using:

```bash
gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt,bak -t 50
```

You could uncover paths like:

```
/admin (Status: 301)
/backup.bak (Status: 200)
/upload.php (Status: 200)
```

These findings could reveal attack vectors like login pages, backup files with sensitive data, or unrestricted upload endpoints.

## Tips for Effective Use

- Choose your **wordlist wisely** – larger lists find more but take longer.
- Combine with tools like **Burp Suite**, **Nmap**, or **Nikto** for deeper insight.
- Respect **rate limits** and avoid crashing the target server—especially on production sites.

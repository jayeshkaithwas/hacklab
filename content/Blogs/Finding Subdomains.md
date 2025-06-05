---
title: Finding Subdomains
aliases:
  - Finding Subdomains
---
Techniques to find Subdomains:
1. Google dorking
2. crt.sh
3. Sublist3r
4. Amass

# Google Dork for Finding Subdomains

```
site:*.example.com -www
```

- `site:*.example.com` tells Google to look for any subdomain of `example.com`.
  ![[images/Pasted image 20250604131208.png]]
    ```
    site:*.example.com
    site:*.example.com filetype:pdf
    ```

    ```
    site:*.example.com intitle:"login"
    site:*.example.com inurl:"admin"
    ```

---
# Crt.sh

One of the easiest ways to start is by checking Certificate Transparency (CT) logs using [crt.sh](https://crt.sh/). This website records every SSL/TLS certificate issued for a domain, including subdomains.

Let's look at the results.

![[images/Pasted image 20250604132332.png]]

You can also use [crt.py](https://github.com/jayeshkaithwas/Networking-Python/blob/main/crt.py) script to get all unique domains straight to your **txt** file.

---
# Sublist3r

```bash
python sublist3r.py -d example.com
```

![[images/Pasted image 20250604202612.png]]

To find subdomains of **example.com** and save to **example_subs.txt**:

```bash
python sublist3r.py -d example.com -o example_subs.txt -t 20
```
---
# Amass

```bash
amass enum -d example.com```
![[images/Pasted image 20250604203229.png]]
## Building a **Recon Pipeline**

Combine Amass with other tools for an even more thorough enumeration:

- **Passive + Active**:
    1. Passive: `amass enum -passive -d example.com`
    2. Active: `amass enum -active -d example.com`
- **Visualize relationships**:
    ```bash
    amass viz -d3 -dir amass_output/ -o graph.html
    ```

Would you like me to **write a bash script** for automating your Amass workflow? Or show how to **integrate Amass output with Python** for further processing? Let me know! 🚀✨


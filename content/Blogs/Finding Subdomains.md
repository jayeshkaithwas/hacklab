---
title: Finding Subdomains
aliases:
  - Finding Subdomains
---
Techniques to find Subdomains:
1. Google dorking
2. crt.sh

# Google Dork for Finding Subdomains

We can use the `site:` operator to look for specific subdomains. For example:

```
site:*.example.com -www
```

Here’s what this does:

- `site:*.example.com` tells Google to look for any subdomain of `example.com`.
  ![[images/Pasted image 20250604131208.png]]
## Refining the Search

We can get creative with your queries:

1. **Using different keywords:**
    
    ```
    site:*.example.com
    site:*.example.com filetype:pdf
    ```
    
2. **Finding specific types of pages:**
    
    ```
    site:*.example.com intitle:"login"
    site:*.example.com inurl:"admin"
    ```
    
3. **Finding archived or historical subdomains:**  
    Sometimes Google still indexes older subdomains that might not be actively linked anywhere else.

# Crt.sh

One of the easiest ways to start is by checking Certificate Transparency (CT) logs using [crt.sh](https://crt.sh/). This website records every SSL/TLS certificate issued for a domain, including subdomains.

To search for truecaller’s subdomains, visit [crt.sh](https://crt.sh/) and enter `%.truecaller.com` as the query. The `%` acts as a wildcard to match any subdomains.

Let's look at the results.

![[images/Pasted image 20250604132332.png]]

You can also use [crt.py](https://github.com/jayeshkaithwas/Networking-Python/blob/main/crt.py) script to get all unique domains straight to your **txt** file.

# Sublist3r

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/aboul3la/Sublist3r.git
cd Sublist3r
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

##  Usage

Basic usage:

```bash
python sublist3r.py -d example.com
```

This will output the subdomains found.
![[images/Pasted image 20250604202612.png]]
##  Key Options

- `-d <domain>`: The target domain to find subdomains for.
- `-o <outputfile>`: Save the results to a file.
- `-t <threads>`: Number of threads (default: 10).
- `-v`: Enable verbose mode.
- `-p <ports>`: Scan the found subdomains on specific ports.
- `-e <engines>`: Specify search engines (e.g., google, yahoo, bing).

## Example

To find subdomains of **example.com** and save to **example_subs.txt**:

```bash
python sublist3r.py -d example.com -o example_subs.txt -t 20
```

# Amass

### 💻 Usage Examples

#### Basic subdomain enumeration:

```bash
amass enum -d example.com
```

#### Save to a file:

```bash
amass enum -d example.com -o example_subs.txt
```

#### Passive mode (no active scans):

```bash
amass enum -passive -d example.com
```

#### Use specific data sources:

```bash
amass enum -src -d example.com
```

#### Run with verbose output:

```bash
amass enum -v -d example.com
```

---

### 🏗️ Building a **Recon Pipeline**

Combine Amass with other tools for an even more thorough enumeration:

- **Passive + Active**:
    
    1. Passive: `amass enum -passive -d example.com`
        
    2. Active: `amass enum -active -d example.com`
        
- **Visualize relationships**:
    
    ```bash
    amass viz -d3 -dir amass_output/ -o graph.html
    ```
    

---

### 🪪 API Keys (Optional)

Amass supports APIs for better coverage (e.g., VirusTotal, SecurityTrails).  
Put your API keys in `~/.config/amass/config.ini`.

Example:

```ini
[passive]
virustotal = YOUR_API_KEY
securitytrails = YOUR_API_KEY
```

---

### 📦 Summary

✅ Amass is comprehensive, combining active and passive techniques.  
✅ It’s **recommended** for serious recon work.  
✅ Results are often better than simpler tools like Sublist3r.

---

Would you like me to **write a bash script** for automating your Amass workflow? Or show how to **integrate Amass output with Python** for further processing? Let me know! 🚀✨

![[images/Pasted image 20250604203229.png]]
---
title: Nmap
aliases:
  - Nmap
tags: 
description:
---
![[images/Pasted image 20250112085649.png]]
# Introduction
---
Nmap (Network Mapper) is a powerful and versatile tool used by cybersecurity professionals, system administrators, and ethical hackers to discover hosts and services on a computer network. It allows users to map out networks, identify open ports, detect operating systems, and uncover vulnerabilities in a system's security posture.

Below, you'll find a curated list of essential Nmap commands categorized for various use cases including host discovery, service enumeration, and web application reconnaissance.


## **Basic Commands**

- **Simple Host Scan:**
    
    ```bash
    nmap {target_IP}
    ```
    
- **Aggressive/Extensive Scan:**
    
    ```bash
    nmap -T4 -A -v {target_IP}
    ```
    

## **Web Application Reconnaissance**

1. **Enumerate Directories on Web Servers:**
    
    ```bash
    nmap -sV --script=http-enum {target_IP}
    ```
    
2. **Discover Hostnames Resolving to Targeted Domain:**
    
	```bash
	nmap --script hostmap-bfk -script-args hostmap-bfk.prefix=hostmap-{target_IP}
	```

3. **Perform HTTP Trace:**
    
    ```bash
    nmap -p80 --script http-trace -d {target_IP}
    ```
    
4. **Check Firewall Configuration:**
    
    ```bash
    nmap -p80 --script http-waf-detect {target_IP}
    ```
    

## **Host Discovery Techniques**

1. **Using ARP:**
    
    ```bash
    nmap -PR -sn {target_IP}/24
    ```
    
2. **Using ICMP:**
    
    ```bash
    nmap -PE -sn {target_IP}/24
    nmap -PP -sn {target_IP}/24
    nmap -PM -sn {target_IP}/24
    ```
    
3. **Using TCP and UDP:**
    
    ```bash
    nmap -PS -sn {target_IP}/24      # TCP SYN
    nmap -PA -sn {target_IP}/24      # TCP ACK
    nmap -PU -sn {target_IP}/24      # UDP
    ```
    

## **Advanced Scanning Techniques**

1. **TCP SYN Scan:**
    
    ```bash
    nmap -sS {target_IP}
    ```
    
2. **Intense Scan:**
    
    ```bash
    nmap -T4 -A {target_IP}
    ```
    
3. **Ping Sweep Scan:**
    
    ```bash
    nmap -sP {target_IP}/24
    ```
    
4. **Zombie Scan:**
    
    ```bash
    nmap -sl {target_IP} {target_IP}
    ```
    
5. **Fragmented Packet Scan:**
    
    ```bash
    nmap -f {target_IP}
    ```
    
6. **Scan with Source Port Manipulation:**
    
    ```bash
    nmap -g 80 {target_IP}
    ```
    
7. **Set Custom MTU:**
    
    ```bash
    nmap -mtu 8 {target_IP}
    ```
    

## **Service Enumeration and Vulnerability Detection**

1. **SMB Enumeration:**
    
    ```bash
    nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse {target_IP}
    ```
    
2. **SMTP Enumeration:**
    
    ```bash
    nmap -p 25 --script=smtp-enum-users {target_IP}
    nmap -p 25 --script=smtp-open-relay {target_IP}
    nmap -p 25 --script=smtp-commands {target_IP}
    ```
    
3. **Vulnerability Detection:**
    
    ```bash
    nmap -Pn --script vuln {target_IP}
    ```
    
4. **Service and Version Detection with Default Scripts:**
    
    ```bash
    nmap -sV -sC {target_IP}
    ```
    

## **Evading Firewalls and Intrusion Detection Systems**

1. **Bypass Detection with Fragmented Packets:**
    
    ```bash
    nmap -f {target_IP}
    ```
    
2. **Spoof MAC Address:**
    
    ```bash
    nmap -sT -Pn --spoof-mac 0 {target_IP}
    ```
    
3. **Scan Beyond Firewalls:**
    
    ```bash
    nmap -D RND:{target_IP}
    ```
    

## **Network Enumeration and Discovery**

1. **Identify Live Hosts:**
    
    ```bash
    nmap -sn -PE {target_IP}-23
    ```
    
2. **Enumerate Active Ports:**
    
    ```bash
    nmap {target_IP} -p- | grep "^[0-9]" | awk -F'/' '{print $1}' | tr '\n' ',' | sed 's/,$//'
    ```
    
3. **Discover DNS Services:**
    
    ```bash
    nmap --script=broadcast-dns-service-discovery certifiedhacker.com
    nmap -T4 -p 53 --script dns-brute certifiedhacker.com
    nmap --script dns-srv-enum --script-args "dns-srv-enum.domain='certifiedhacker.com'"
    ```
    

## **Additional Recon Techniques**

1. **Identify Open RDP Ports:**
    
    ```bash
    nmap -Pn -p 3389 -sV {target_IP}
    ```
    
2. **Find FQDN of a Domain Controller:**
    
    ```bash
    nmap -p 389 -sV {target_IP}
    nmap -p 389 --script ldap-rootdse {target_IP}
    ```
    
3. **Enumerate LDAP Services:**
    
    ```bash
    nmap -p 389 --script ldap-brute --script-args ldap.base='"cn=users,dc=CEH,dc=com"' {target_IP}
    ```
    

These Nmap commands empower security professionals to explore network vulnerabilities, assess security configurations, and conduct detailed reconnaissance during penetration testing exercises. Always ensure that scans and tests are conducted ethically and with proper authorization.
---
title: Wireshark
aliases:
  - Wireshark
description: "🦈 Wireshark: Network Analysis and Packet Sniffing"
---

![[images/Pasted image 20250403185844.png]]

**Wireshark** is a powerful, open-source network protocol analyzer used for capturing and analyzing network traffic. It allows users to inspect network packets in real-time, making it an essential tool for cybersecurity professionals, network administrators, and developers. This blog will guide you on installing Wireshark, using it efficiently, and applying essential filters to analyze network traffic effectively.

---

# 📥 Installing Wireshark

## Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install wireshark -y
```

During installation, you might be prompted to allow non-root users to capture packets. Select "Yes" to grant permissions.

## Windows

1. Download Wireshark from [official website](https://www.wireshark.org/download.html).
    
2. Run the installer and follow the on-screen instructions.
    
3. Install Npcap when prompted (necessary for packet capturing).
    
4. Launch Wireshark and start capturing packets.
    

---

# 🚀 How to Use Wireshark

## 1️⃣ Start Capturing Packets

- Open Wireshark.
    ![[images/Pasted image 20250404143410.png]]
    
- Select the network interface (e.g., `eth0`, `wlan0`).
    
- Click **Start** to begin capturing packets.
    

## 2️⃣ Apply Display Filters

Filters help analyze network traffic efficiently. Some commonly used filters include:

```bash
# Filter by IP Address
ip.addr == 10.10.10.9

# Filter by Source or Destination IP
ip.src == 10.10.16.33
ip.dst == 10.10.10.15

# Filter by TCP Port
tcp.port == 25

# Filter by Multiple TCP Ports
ip.addr == 10.10.0.4 or ip.addr == 10.10.0.5

# Filter by IP and Port
ip.addr == 10.10.14.22 and tcp.port == 8080
```

## 3️⃣ Advanced Filtering

```bash
# SYN Flag Filter
tcp.flags.syn == 1 and tcp.flags.ack == 0

# Broadcast Traffic Filter
eth.dst == ff:ff:ff:ff:ff:ff

# Filter by Packet Length
ip.dst == 10.0.1.50 && frame.pkt_len > 400

# Filter HTTP GET Requests
http.request

# Filter Packets Containing Specific Word
tcp contains traffic

# Exclude ARP, ICMP, DNS from Capture
!(arp or icmp or dns)
```

---
# Filters Cheat Sheet

![[images/Pasted image 20241018162859.png]]
![[images/Pasted image 20241018162908.png]]
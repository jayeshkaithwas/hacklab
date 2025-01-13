---
title: DNS Records
aliases:
  - DNS Records
description: "Understanding DNS Records: A Guide to A, AAAA, CNAME, TXT, SRV, MX, and NS Records"
---
# **Understanding DNS Records: A Guide to A, AAAA, CNAME, TXT, SRV, MX, and NS Records**

When you type a domain name like "[www.example.com](http://www.example.com/)" into your browser, your computer needs to find out where that domain is hosted in order to load the webpage. This process is made possible through the Domain Name System (DNS). DNS is essentially the phonebook of the internet, converting user-friendly domain names into machine-readable IP addresses. DNS records play a crucial role in this conversion process, with different types serving various purposes. In this post, we'll take a look at the key types of DNS records and explain how they work.

## **1. A Record: Mapping Domain to IPv4 Address**

The **A record**, or **Address Record**, is one of the most basic and widely used DNS records. It maps a domain name to an **IPv4** address (the 32-bit address format used to identify devices on the internet). For instance, if you visit **[www.example.com](http://www.example.com/)**, the A record will help your browser connect to the appropriate IP address where the website is hosted.

- **Example**:  
    `www.example.com` → `192.0.2.1` (IPv4 address)

## **2. AAAA Record: Mapping Domain to IPv6 Address**

Similar to the A record, the **AAAA record** (also known as the **Quad A record**) maps a domain to its respective **IPv6 address**. As the internet transitions from IPv4 to the newer IPv6 protocol to accommodate more devices, the AAAA record becomes increasingly important. IPv6 addresses are represented as 128-bit strings, providing a much larger address space compared to IPv4.

- **Example**:  
    `www.example.com` → `2001:0db8:85a3:0000:0000:8a2e:0370:7334` (IPv6 address)

## **3. CNAME Record: Aliases and Redirections**

The **CNAME record** (Canonical Name record) is used to create an alias for a domain. When a domain has several subdomains (e.g., www, mail), a CNAME record can point these subdomains to the same IP address or canonical domain name. This helps simplify domain management and avoid duplicate entries for the same website.

- **Example**:  
    `www.example.com` → `example.com`  
    This means that when someone visits **[www.example.com](http://www.example.com/)**, they are redirected to the main domain **example.com**.

## **4. TXT Record: Storing Textual Information**

A **TXT record** is a flexible DNS record that allows domain administrators to store arbitrary text. These records are often used for various verification processes, including email spam filtering (SPF, DKIM) and domain ownership verification. It’s also used by services like Google or Microsoft to verify domain ownership for setting up services like email or websites.

- **Example**:  
    `example.com` → `"v=spf1 include:_spf.google.com ~all"`  
    This would indicate that Google is authorized to send emails on behalf of **example.com**.

## **5. SRV Record: Service Records for Specific Protocols**

The **SRV record** (Service record) specifies the location (hostname and port) of servers for specified services, including the priority and weight of those servers. This is particularly useful in environments that involve complex services like instant messaging, VoIP, and more. SRV records help ensure that traffic is directed to the right service or server in the network.

- **Example**:  
    `_sip._tcp.example.com` → `sipserver.example.com` (priority: 10, weight: 5)

## **6. MX Record: Directing Email Traffic**

The **MX record** (Mail Exchange record) is used to route email messages to the appropriate mail servers. When an email is sent to someone at **example.com**, the MX record tells the sender’s mail server where to deliver the email. MX records contain the priority of mail servers, allowing administrators to define which mail servers should be used first.

- **Example**:  
    `example.com` → `mail.example.com` (priority 10)  
    This means that email for **example.com** will be routed to the **mail.example.com** server with priority 10.

## **7. NS Record: Identifying Authoritative Name Servers**

The **NS record** (Name Server record) is used to specify which DNS servers are authoritative for a particular domain. These name servers hold the DNS records for the domain and are responsible for responding to DNS queries. NS records are essential for ensuring that a domain’s DNS information can be properly resolved on the internet.

- **Example**:  
    `example.com` → `ns1.exampledns.com`  
    This means that **ns1.exampledns.com** is the authoritative name server for **example.com**.

---
	
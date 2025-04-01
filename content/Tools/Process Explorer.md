---
title: Process Explorer
aliases:
  - Process Explorer
description: Process Explorer, provides valuable insight into the processes currently running on a system.
---
# Understanding Process Explorer

## Introduction

Process Explorer, a free tool from Microsoft, is an extremely powerful task manager that should be running when performing dynamic analysis. It provides valuable insight into the processes currently running on a system, making it an essential tool for malware analysts and cybersecurity professionals.

## Features of Process Explorer

Process Explorer offers a wide range of capabilities that make it superior to the standard Windows Task Manager. Some of its key features include:

### 1. Listing Active Processes

Process Explorer lists all active processes in a hierarchical tree structure, showing the parent-child relationships. This makes it easier to analyze process spawning behavior and detect anomalies.
![[images/Pasted image 20250401154313.png]]
### 2. Monitoring Process Properties

Process Explorer allows users to view various properties of a process, such as:

- **Threads Tab:** Displays all active threads.
    ![[images/Pasted image 20250401154548.png]]
    
- **TCP/IP Tab:** Shows active network connections and listening ports.
    ![[images/Pasted image 20250401154608.png]]
    
- **Image Tab:** Displays the file path of the executable on disk.
    ![[images/Pasted image 20250401154625.png]]

### 3. Real-time System Monitoring

![[images/Pasted image 20250401154313.png]]
Process Explorer updates every second and highlights different process types with colors:

- **Pink:** Services
    
- **Blue:** Processes
    
- **Green:** Newly started processes (temporary highlight)
    
- **Red:** Terminated processes (temporary highlight)
    

### 5. Killing Processes and Managing User Sessions

Users can kill a process, log out users, and launch or validate processes directly from Process Explorer.
![[images/Pasted image 20250401154810.png]]
## Verifying Process Authenticity

One of the most useful features of Process Explorer is the **Verify** option in the Image tab. This allows users to confirm if a binary is digitally signed by Microsoft. Since malware often replaces authentic Windows files with its own, verification helps ensure file integrity.

![[images/Pasted image 20250401154839.png]]
### Process Replacement Detection

Some malware uses process replacement techniques, where a running process's memory space is overwritten with a malicious executable. This can be detected using:

- **The Strings Tab:** Compare strings in the disk executable against those in memory. If they differ significantly, process replacement may have occurred.
    ![[images/Pasted image 20250401154916.png]]
    
- **Memory vs. Disk Comparison:** The in-memory image of a process should match its disk counterpart. Discrepancies can indicate malware.


## Searching for Malicious DLLs

Process Explorer allows users to search for a specific **handle or DLL** using the _Find Handle or DLL_ feature. This is particularly useful for tracking a malicious DLL loaded into memory by a running process.
![[images/Pasted image 20250401155044.png]]
## Analyzing Malicious Documents

Process Explorer is also useful for analyzing malicious documents (e.g., PDFs, Word files). When opening a suspicious document, users can monitor for any unexpected processes launched. If a document spawns a new process, this could indicate malicious activity.
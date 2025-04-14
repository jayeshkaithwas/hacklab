---
title: Undetectable Keyloggers
aliases:
  - Undetectable Keyloggers
description: "Undetectable Keyloggers: Understanding a Hidden Threat"
---
In today’s connected world, keyloggers remain one of the most subtle yet dangerous types of malware. Their purpose is simple yet devastating: capture every keystroke a user types - be it login credentials, private messages, or banking details and transmit it to malicious actors.

This article dives into the core concepts from a research paper that tested the effectiveness of “**undetectable keyloggers**” against top antivirus solutions, revealing vulnerabilities that cybersecurity vendors must urgently address.

---

## 🎯 What is a Keylogger?

A keylogger is a type of spyware designed to record user keystrokes without their knowledge. Advanced variants can:

- Capture **screenshots** of the user’s screen
    
- Log all typed text
    
- Send collected data via **email or FTP**
    
- Hide within seemingly harmless files (like images or documents)


---

## Creating and Testing an Undetectable Keylogger

### 🔨 Step 1: Building the Keylogger

The researchers developed a keylogger using **C#**, leveraging features like SMTP for email delivery. The logger stored keystrokes in `.txt` files and emailed them using a Gmail SMTP server.

####  Snippet of the Keylogger’s Source Code
![[images/Pasted image 20250413175933.png]]

---

Absolutely! Here’s an expanded and detailed version of **Step 2: Making the Keylogger Undetectable**, breaking down each obfuscation and encoding technique used to bypass antivirus detection.

---

### 🧬 Step 2: Making the Keylogger Undetectable – In Detail

Once the basic keylogger was developed in C#, the researchers applied multiple layers of obfuscation and encoding to transform it into an **"undetectable keylogger."** The key idea behind this step is to **disguise the malicious code and behavior** so thoroughly that antivirus software cannot recognize it.

To achieve this, two main tools were used:

- **SmartAssembly**: A .NET obfuscation tool that scrambles and encodes code.
- **Multimedia Builder**: A GUI software used to embed the keylogger inside another file (covered more in Step 3).

Let’s walk through each sub-step of the obfuscation process:

#### 🔒 1. Assigning a Strong Name Key

This step adds a **digital signature** to the assembly. It protects the executable from being tampered with or reverse-engineered easily. It also prevents basic static analysis by adding cryptographic verification.

🔹 **Why it matters:** Prevents the keylogger from being edited or modified by analysis tools. It's like sealing a document so that any tampering is evident.

#### 🧹 2. Pruning the Code

**Code pruning** involves removing any unused functions, metadata, and attributes that aren’t essential to the runtime execution.

🔹 **Benefits:**
- Reduces file size by ~30%
-  Strips out clues that antivirus engines might use for detection  
- Makes reverse engineering harder

#### 🌀 3. Obfuscating Code with Name Mangling

Obfuscation changes variable, method, and class names into **gibberish or unreadable text**.
##### Before:

```csharp
public void CaptureKeyboardInput() {}
```
##### After:

```csharp
public void a9sjg8a9sj() {}
```

🔹 **Effect:** Antivirus and malware analysts can't easily tell what the code is doing, making signature-based detection unreliable.

#### 🔁 4. Control Flow Obfuscation

Here, the logical flow of the program is scrambled into **“spaghetti code”** — full of unnecessary jumps, loops, and confusing branches.

🔹 **Purpose:** Makes the decompiled source code unreadable and almost impossible to follow manually or through automated tools.

> 🧠 Think of it like turning a simple recipe into a chaotic list of steps in random order, with false instructions and confusing loops — a nightmare for anyone trying to make sense of it.

#### 🛡 5. Using Dynamic Proxy for External Calls

This technique **hides external API calls** by routing them through proxy classes. For example, instead of calling Windows APIs directly, the keylogger creates a proxy method to hide the true intent.

🔹 **Effectiveness:** Antivirus tools can’t track the keylogger’s behavior easily, since the real calls are abstracted behind a smokescreen.

#### 🔐 6. Encoding Sensitive Strings

Any strings within the code that could indicate malicious behavior — such as email addresses, SMTP servers, file paths, or passwords — are **encoded** to avoid detection.

**For example:**
##### Before:

```csharp
string smtpServer = "smtp.gmail.com";
```
##### After:

```csharp
string smtpServer = Decode("djOZb2YqdA==");
```

🔹 **Reason:** Signature-based antivirus tools often scan for suspicious keywords. Encoding conceals them completely.

#### 📊 Visual Summary: Encoding Workflow

Here’s a diagram summarizing the full encoding and obfuscation process (recreated from Figure 2 in the paper):

![[images/Pasted image 20250413175518.png]]


## 🧠 Why This Works

Antivirus software typically relies on a combination of:

- **Signature detection**: Looking for known patterns
- **Heuristic detection**: Guessing based on behavior
- **Behavioral analysis**: Watching programs in real-time

These obfuscation steps make it **harder for signatures to match**, **weaker for heuristics to guess**, and **delay or confuse behavior analysis**, especially before the keylogger activates.

---

## 🧪 Step 3: Embedding in a Host File

This stage uses **social engineering**: the keylogger is hidden within another file, such as a video or image. Through **extension spoofing**, users are tricked into opening seemingly harmless files, which secretly launch the malware.

---

## 🧪 Final Step: Antivirus Testing

The enhanced keylogger was tested against **20+ popular antivirus tools** (as per AV-Comparatives 2014). Each stage (basic keylogger, encoded version, and embedded version) was analyzed.

---


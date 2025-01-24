---
title: LAB 0.11
aliases:
  - LAB 0.11
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS into HTML context with most tags and attributes blocked"
---
# # Lab: Reflected XSS into HTML context with most tags and attributes blocked
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-most-tags-and-attributes-blocked)

This lab contains a reflected XSS vulnerability in the search functionality but uses a web application firewall (WAF) to protect against common XSS vectors.

To solve the lab, perform a cross-site scripting attack that bypasses the WAF and calls the `print()` function.

# Solution
---
## Step 1: Understand the Challenge

1. Access the lab. You’ll land on a blog page with a vulnerable search bar.
    
2. Attempt a simple XSS payload in search bar:
    
    ```html
    <img src='x' onerror='alert(1)'>
    ```
    
    ![[images/Pasted image 20250124193811.png]]
    
3. Test an empty tag (`<>`) to check for allowed tags. This succeeds.
	![[images/Pasted image 20250124193848.png]]
	
---

## Step 2: Identify Allowed Tags

1. Open Burp Suite and find the search request under the **Target** tab.
   ![[images/Pasted image 20250124194106.png]]
2. Right-click the request and select **Send to Intruder**.
3. In the **Intruder** tab:
    - Replace the search string with `<>`.
    - Highlight the space between the angle brackets and click **Add§**.
      ![[images/Pasted image 20250124194419.png]]
    - Go to **Payloads** > Paste the HTML tags from the PortSwigger XSS [Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet).
      ![[images/Pasted image 20250124194620.png]]
      ![[images/Pasted image 20250124194807.png]]
    - Start the attack.
4. Identify tags with a `200` status code. For this lab, `<body>` works.
   ![[images/Pasted image 20250124194856.png]]

---

## Step 3: Test Attributes

1. Test a payload using `<body>` with an attribute:    
    ![[images/Pasted image 20250124195103.png]]
    
    ![[images/Pasted image 20250124195010.png]]
    
2. Use Burp Intruder again to test attributes:
    
    - Modify the request to:
	![[images/Pasted image 20250124195412.png]]
	
    - Copy event attributes from the XSS [Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet).
      ![[images/Pasted image 20250124195635.png]]
      
    - Start the attack.
    
3. Identify attributes with `200` responses. Here, `onresize` works.
    ![[images/Pasted image 20250124200555.png]]

---

## Step 4: Craft the Exploit

Combine findings to create a functional payload:

```html
<body onresize='print()'>
```

However, triggering `onresize` requires user interaction. To automate:

1. Use an `<iframe>` to embed the payload:
    
    ```html
    <iframe src="https://0a7700f204022a5580b84e1e002b002a.web-security-academy.net/?search=%22%3E%3Cbody%20onresize=print()%3E" onload=this.style.width='100px'>
    ```
    
2. Paste the `<iframe>` in the exploit server’s **Body** section.
	   
    ![[images/Pasted image 20250124200249.png]]

---

## Step 5: Deliver the Exploit

1. Click **View exploit** to verify it works. The `print()` dialog should appear.
   ![[images/Pasted image 20250124200349.png]]
2. Click **Store** and then **Deliver exploit to victim**.

---
#### Congratulations!

You’ve successfully exploited the vulnerability and solved the lab!
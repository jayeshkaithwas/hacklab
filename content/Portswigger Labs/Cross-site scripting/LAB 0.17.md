---
title: LAB 0.17
aliases:
  - LAB 0.17
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS in canonical link tag"
---
# Lab: Reflected XSS in canonical link tag
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-canonical-link-tag)

This lab reflects user input in a canonical link tag and escapes angle brackets.

To solve the lab, perform a cross-site scripting attack on the home page that injects an attribute that calls the `alert` function.

To assist with your exploit, you can assume that the simulated user will press the following key combinations:

- `ALT+SHIFT+X`
- `CTRL+ALT+X`
- `Alt+X`

# Solution
---
## **Understanding the Vulnerability**

The **canonical link tag** is used to specify the preferred URL for a webpage:

```html
<link rel="canonical" href="https://example.com/page" />
```

If this URL is dynamically generated without proper sanitization, an attacker can inject JavaScript into it. This script will execute when the page loads, even though the element is not visible.

---
## **1. Identifying the Injection Point**

Using browser DevTools, we find that the URL is **reflected** inside a `<link>` tag in the `<head>` section. Since this tag isn't visible on the page, we need a way to trigger our payload.

![[images/Pasted image 20250217131242.png]]
## **2. Injecting an OnClick Event**

We attempt to escape the `href` attribute and insert an `onclick` event:

```plaintext
https://0a50007d045deea998c46648009400df.web-security-academy.net/?'onclick='alert(1)
```

However, since the `<link>` tag is in the `<head>`, there's no way for the user to click on it.

![[images/Pasted image 20250217131336.png]]
## **3. Using HTML AccessKeys**

To make the event triggerable, we use **HTML AccessKeys**, which allow users to activate elements via keyboard shortcuts:

```plaintext
https://0a50007d045deea998c46648009400df.web-security-academy.net/?'accesskey='x'onclick='alert(1)
```

This binds the **"X"** key as an access key for the element, making it interactable via the keyboard.

### **4. Triggering the Payload**

To execute the script, press:

- **Windows**: `ALT + SHIFT + X`
- **MacOS**: `CTRL + ALT + X`
- **Linux**: `ALT + X`

![[images/Pasted image 20250217131635.png]]

On pressing the key, the `alert(1)` pops up, confirming the exploit.

---

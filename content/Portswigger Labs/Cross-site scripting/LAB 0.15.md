---
title: LAB 0.15
aliases:
  - LAB 0.15
tags:
  - XSS
  - Labs
  - Reflected
  - Apprentice
description: "Lab: Reflected XSS into attribute with angle brackets HTML-encoded"
---
# Lab: Reflected XSS into attribute with angle brackets HTML-encoded
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded)

This lab contains a reflected cross-site scripting vulnerability in the search blog functionality where angle brackets are HTML-encoded. To solve this lab, perform a cross-site scripting attack that injects an attribute and calls the `alert` function.

# Solution
---
## **1. Identifying the Injection Point**

Access the lab and enter a test input in the search bar, such as:

```
test"
```

Inspect the page source to locate how the input is reflected. If it's inside an attribute like:

![[images/Pasted image 20250212123703.png]]

This confirms that our input is inside the `value` attribute and that angle brackets are encoded.

---

### **2. Understanding the Restriction**

Since `<script>` tags won’t work due to HTML encoding, we need an alternative way to execute JavaScript. The best approach in this scenario is **breaking out of the attribute and injecting an event handler**.

---

### **3. Crafting the Payload**

To break out of the `value` attribute and execute JavaScript, we can inject an event like `onmouseover`:

```html
" onmouseover="alert(1)
```

When placed inside the search input, it modifies the attribute structure:

![[images/Pasted image 20250212123852.png]]

Now, when the user hovers over the input field, the JavaScript executes.

---

### **4. Injecting the Payload**

1. Enter the payload into the search bar:
    
    ```
    " onmouseover="alert(1)
    ```
    
2. Click **Search**.
3. Hover over the search box, and the `alert(1)` pop-up should appear.
![[images/Pasted image 20250212123944.png]]
---

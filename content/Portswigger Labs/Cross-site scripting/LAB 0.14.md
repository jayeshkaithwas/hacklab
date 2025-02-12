---
title: LAB 0.14
aliases:
  - LAB 0.14
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS with some SVG markup allowed"
---
# Lab: Reflected XSS with some SVG markup allowed
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-some-svg-markup-allowed)

This lab has a simple reflected XSS vulnerability. The site is blocking common tags but misses some SVG tags and events.

To solve the lab, perform a cross-site scripting attack that calls the `alert()` function.

# Solution
---
## 1. **Initial Exploration**

Access the lab. You’ll see a web page with a search bar.  
Attempt a basic XSS payload, like:

```html
<img src=0 onerror=alert(1)>
```

![[images/Pasted image 20250212120042.png]]
The response indicate that the `<img>` tag is blocked by the Web Application Firewall (WAF).

---

### 2. **Identifying Valid Tags**

The first step is to identify which HTML tags are allowed. Using an Burp Suite or manual testing as we have done in [[LAB 0.11#Step 2 Identify Allowed Tags]], you can find a list of valid tags.

---

### 3. **Crafting the XSS Payload**

From the results, `<svg>` is allowed along with the `animatetransform` element.

- The `onbegin` event works! Craft the final payload:

```html
<svg><animateTransform onbegin='alert(1)'>
```

![[images/Pasted image 20250212120848.png]]

---

### 4. **Trigger the XSS**

Paste the payload into the search bar and click **Search**. You’ll see the `alert(1)` pop-up, confirming the XSS.

![[images/Pasted image 20250212121019.png]]

---

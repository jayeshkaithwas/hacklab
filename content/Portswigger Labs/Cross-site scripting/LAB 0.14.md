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

The response will indicate that the `<img>` tag is blocked by the Web Application Firewall (WAF).

---

### 2. **Testing Allowed Tags Using Burp Intruder**

#### Step 1: Send the Request to Intruder

- Open Burp Suite and navigate to the **Target** tab.
- Locate the search request, right-click, and select **Send to Intruder**.

#### Step 2: Modify the Request

- Replace the search string with empty angle brackets (`<>`) and add Intruder markers:
    
    ```html
    GET /?search=<§§> HTTP/1.1
    ```
    

#### Step 3: Add Payloads

- Go to the **Payloads** tab in Intruder.
- Copy tags from the [XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet) and paste them into the payload list.

#### Step 4: Start the Attack

- Click the **Start Attack** button.
- Filter the results by status code `200` to identify tags that bypass the WAF.

---

### 3. **Crafting the XSS Payload**

From the results, `<svg>` is allowed along with the `animatetransform` element.

#### Step 1: Test Events on `animatetransform`

- Update the Intruder request:
    
    ```html
    GET /?search=<svg><animateTransform%20§§=1> HTTP/1.1
    ```
    
- Copy all events from the XSS Cheat Sheet and paste them as payloads.
- Start the attack and look for a status code `200`.

#### Step 2: Use the Allowed Event

The `onbegin` event works! Craft the final payload:

```html
<svg><animateTransform onbegin='alert(1)'>
```

---

### 4. **Trigger the XSS**

Paste the payload into the search bar and click **Search**. You’ll see the `alert(1)` pop-up, confirming the XSS.

---

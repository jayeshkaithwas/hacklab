---
title: LAB 0.10
aliases:
  - LAB 0.10
tags:
  - XSS
  - Labs
  - DOM-Based
  - Practitioner
description: "Lab: Stored DOM XSS"
---
# Lab: Stored DOM XSS
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-stored)

This lab demonstrates a stored DOM vulnerability in the blog comment functionality. To solve this lab, exploit this vulnerability to call the `alert()` function.


# Solution
---
## Step 1: Access the Blog Page

Once you access the lab, navigate to any blog post. Scroll down to the comment form, where you’ll be leaving your payload.

![[images/Pasted image 20250123110130.png]]

## Step 2: Test the Comment Form

1. Fill out the form fields (Name, Email, and Comment).
2. In the comment field, enter a simple, identifiable string (e.g., `TestComment123`).
3. Submit the comment and click **Back to Blog** to view it.

![[images/Pasted image 20250123110255.png]]

---

## Step 3: Inspect the DOM

1. Locate your comment on the page and right-click it. Select **Inspect** to examine how it’s processed in the DOM.  
2. You’ll notice something like this:
	![[images/Pasted image 20250123110456.png]]

The script responsible for processing comments is `/resources/js/loadCommentsWithVulnerableEscapeHtml.js`.

---

## Step 4: Analyze the Vulnerability

- Navigate to the **Network** tab, refresh the page, and locate the `loadCommentsWithVulnerableEscapeHtml.js` script. Examine its response to uncover the following vulnerability:
	![[images/Pasted image 20250123110647.png]]
The `.replace()` method only replaces the **first occurrence** of `<` and `>`. This means a crafted payload with multiple tags can bypass this sanitization.

---

## Step 5: Craft Your Payload

Using this flaw, create a payload that introduces a harmless tag before your exploit:

```html
<><img src=x onerror=alert(1)>
```

Here:

- `<><img>` uses the bypass to inject a valid tag.
- `onerror=alert(1)` triggers the JavaScript `alert()` function when the browser fails to load the image.

---

## Step 6: Exploit the Vulnerability

Return to the comment form, and submit the crafted payload in the comment field:

![[images/Pasted image 20250123110845.png]]

Click **Post Comment**, then **Back to Blog**.

---

## Step 7: Confirm Exploitation

Upon viewing your comment, you should see the pop-up window confirming the payload execution. Inspect the DOM to verify the payload is embedded in your comment.

![[images/Pasted image 20250123110937.png]]

---

### Congratulations! 

You’ve successfully exploited the stored DOM XSS vulnerability. The root cause lies in the improper use of `.replace()` for sanitizing user input.

By replacing `.replace()` with `.replaceAll()`, this vulnerability could have been avoided. 

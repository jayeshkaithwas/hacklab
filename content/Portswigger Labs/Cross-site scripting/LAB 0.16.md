---
title: LAB 0.16
aliases:
  - LAB 0.16
tags:
  - XSS
  - Labs
  - Stored
  - Apprentice
description: "Lab: Stored XSS into anchor href attribute with double quotes HTML-encoded"
---
# Lab: Stored XSS into anchor `href` attribute with double quotes HTML-encoded
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-href-attribute-double-quotes-html-encoded)

This lab contains a stored cross-site scripting vulnerability in the comment functionality. To solve this lab, submit a comment that calls the `alert` function when the comment author name is clicked.

# Solution
---
## 1. Accessing the Lab

- Open the lab and navigate to any blog post by clicking "View Post."
- Scroll down to the comment section and submit a comment with a name and a website.

### 2. Identifying the Injection Point

![[images/Pasted image 20250213123705.png]]
- After posting, click "Back to blog" and inspect your comment.
- Right-click your display name and select **Inspect**.
- You will see an anchor (`<a>`) tag where the `href` attribute contains the website you entered.
![[images/Pasted image 20250213123827.png]]

**Example DOM structure:**

```html
<a id="author" href="https://example.com">example</a>
```

### 3. Injecting the Payload

- Submit another comment, but this time, enter the following payload in the **Website** field:
    
    ```
    javascript:alert(1)
    ```
    
- Click **Post Comment**.

### 4. Triggering the XSS

- Click "Back to blog" and locate your comment.
- Click on your name, and you should see a pop-up alert.

**Updated DOM after injection:**

```html
<a id="author" href="javascript:alert(1)">example</a>
```

![[images/Pasted image 20250213124004.png]]


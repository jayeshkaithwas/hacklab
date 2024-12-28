---
title: LAB 0.2
aliases:
  - LAB 0.2
tags:
  - XSS
  - Labs
  - Stored
  - Apprentice
description: "Lab: Stored XSS into HTML context with nothing encoded"
---
# # Lab: Stored XSS into HTML context with nothing encoded
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded)

This lab contains a **stored cross-site scripting** vulnerability in the comment functionality.

To solve this lab, submit a comment that calls the `alert` function when the blog post is viewed.

![[images/Pasted image 20241228094703.png]]
# Solution
---
In this lab, we’ll tackle stored XSS vulnerability, this time by injecting malicious JavaScript into the comment section of a blog. The goal is to craft a script that gets stored on the server and executed in a victim’s browser when they view the blog post. Let’s break it down step by step.

#### Locating the Comment Section

Navigate to one of the blog posts. Scroll down to find the comment section, which usually has fields for:

- **Comment**
- **Name**
- **Email**
- **Website**

![[images/Pasted image 20241228094937.png]]

You don’t need to provide real information. Feel free to make something up for the required fields and post the commet. Here’s an example:

- Comment: `<h6>hello<h6>`
- **Name:** example
- **Email:** example@gmail.com
- **Website:** http://example.com

![[images/Pasted image 20241228095700.png]]

You might notice the text appearing in a smaller font, like a text. If so, the site is likely rendering your input directly as HTML.
#### Crafting the XSS Payload

In the comment box, we’ll inject our malicious JavaScript payload. Use the same script as before:

```html
<script>alert(1)</script>
```

##### Breakdown of the Payload:

- `<script></script>`: HTML tags that define a block of JavaScript code.
- `alert`: A JavaScript function that triggers a pop-up box.

> [!Why This Works: ]
> When you submit this comment, the payload is stored on the web server. Any user who visits the blog page will unknowingly execute this script in their browser.

#### Submitting the Comment

Paste the payload into the **Comment** field and click the button to post your comment. A confirmation or success message should appear, indicating your comment was successfully added.

#### Seeing the Payload in Action

![[images/Pasted image 20241228100206.png]]

PortSwigger will immediately confirm that you’ve solved the lab. If you want to see your payload in action:

1. Click the **Back to blog** button to return to the post.
2. As the page loads, the browser will execute the injected script, and a pop-up window will appear displaying the document’s cookies.
---

Congratulations! You’ve successfully completed this lab.
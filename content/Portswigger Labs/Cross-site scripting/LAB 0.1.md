---
title: LAB 0.1
aliases:
  - LAB 0.1
tags:
  - XSS
  - Labs
  - Reflected
  - Apprentice
description: "Lab: Reflected XSS into HTML context with nothing encoded"
---
# Lab: Reflected XSS into HTML context with nothing encoded
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded)

This lab contains a simple **reflected cross-site scripting** vulnerability in the search functionality.

To solve the lab, perform a cross-site scripting attack that calls the `alert` function.

![[images/Pasted image 20241227224545.png]]
# Solution
---
## Testing the Search Bar

Start by typing in something random as your search query - a mix of letters and numbers that won’t return any meaningful results. For example:

**Search Query:** `abc123`
 ![[images/Pasted image 20241227230206.png]]

After clicking the **Search** button, take a look at the page. Your search query should appear somewhere in the results. If the entire query is displayed exactly as you entered it, the website might not be sanitizing user input - a potential vulnerability.

![[images/Pasted image 20241227230356.png]]

>[!tip]
>Look out for cases where the search query is reflected back on the page. This often hints at how the site handles user inputs.

## Testing Special Characters

Next, let’s see if the site properly handles special characters. Try wrapping your search query in HTML tags. For instance:

**Search Query:** `<h6>abc</h6>`

![[images/Pasted image 20241227230759.png]]

Once you hit search, check how the result looks. You might notice the text appearing in a smaller font, like a text. If so, the site is likely rendering your input directly as HTML.

## Crafting an XSS Payload

Now that we’ve confirmed the vulnerability, it’s time to test an actual XSS payload. Here’s a simple script to try:

```html
<script>alert()</script>
```

### What Does This Do?

- `<script></script>`: These tags define a block of JavaScript code to execute.
- `alert`: A JavaScript function that shows a pop-up alert.
- `(document.cookie)`: This retrieves and displays the cookies stored for the current site.
 
![[images/Pasted image 20241227231038.png]]

Enter this payload into the search bar and hit search. If everything works as expected, you’ll see a pop-up window showing the alert. Congrats, you’ve successfully exploited an XSS vulnerability!

![[images/Pasted image 20241227225236.png]]

### Why Did This Work?

The website doesn’t sanitize or encode user inputs, which allows malicious scripts to execute in the browser. This is a classic example of a reflected XSS vulnerability.
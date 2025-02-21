---
title: LAB 0.19
aliases:
  - LAB 0.19
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS into a JavaScript string with angle brackets HTML encoded"
---
# Lab: Reflected XSS into a JavaScript string with angle brackets HTML encoded
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-html-encoded)

This lab contains a reflected cross-site scripting vulnerability in the search query tracking functionality where angle brackets are encoded. The reflection occurs inside a JavaScript string. To solve this lab, perform a cross-site scripting attack that breaks out of the JavaScript string and calls the `alert` function.

---

## Understanding the Vulnerability

Reflected XSS happens when user input is included in the response without proper sanitization. In this case, the search query is reflected inside a JavaScript variable as shown:

```js
var searchTerms = 'YOUR_INPUT';
document.write('<img src="/resources/images/tracker.gif?searchTerms='+encodeURIComponent(searchTerms)+'">');
```

Notice how the input is wrapped in single quotes. Since angle brackets are encoded, we can’t use common tags like `<script>` or `<img>`.

---

## Step-by-Step Walkthrough

1. **Triggering the Reflection:**
    
    - Start by entering an alphanumeric string that yields no results, e.g., `Hello`.
    - Right-click on the displayed search string and select “Inspect” to view its placement in the DOM.
    - You'll see the input reflected in the JavaScript string:
        
        ```js
        var searchTerms = 'Hello';
        ```
        
2. **Breaking Out of the String:**
    
    - To escape the JavaScript string, append a single quote at the end of your input:
        
        ```
        Hello'
        ```
        ![[images/Pasted image 20250221221953.png]]
        
    - Inspect the DOM again, and you'll notice that the single quote breaks out of the string:
        
        ```js
        var searchTerms = 'Hello'';
        ```
        
3. **Injecting the Payload:**
    
    - Since we're already inside a JavaScript context, we can directly call the `alert()` function.
    - Use the `-` operator to concatenate the payload:
        
        ```
        Hello' - alert() - '
        ```
        
    - This effectively breaks the script and executes the alert.
		![[images/Pasted image 20250221222128.png]]
---


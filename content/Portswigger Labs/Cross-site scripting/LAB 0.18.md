---
title: LAB 0.18
aliases:
  - LAB 0.18
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS into a JavaScript string with single quote and backslash escaped"
---
# Lab: Reflected XSS into a JavaScript string with single quote and backslash escaped
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-single-quote-backslash-escaped)

This lab contains a reflected cross-site scripting vulnerability in the search query tracking functionality. The reflection occurs inside a JavaScript string with single quotes and backslashes escaped.

To solve this lab, perform a cross-site scripting attack that breaks out of the JavaScript string and calls the `alert` function.

---
## Step 1 : Identifying the Vulnerability

Upon accessing the lab, we find a **search bar**. Entering a test string (`Hi`) helps locate how user input is reflected in the page.

Inspecting the DOM reveals that our input appears in three places:

1. `<h1>` tag
2. `<img>` tag
3. Inside a `<script>` tag:

```html
<script>
    var searchTerms = 'hi';
    document.write('<img src="/resources/images/tracker.gif?searchTerms='+encodeURIComponent(searchTerms)+'">');
</script>
```

Since our input is inside a **JavaScript string**, we attempt to break out using a single quote (`'`), but it gets escaped:

![[images/Pasted image 20250218122253.png]]
```js
var searchTerms = 'hi\'';
```

Trying to escape the escape (`\'`) results in:

![[images/Pasted image 20250218122340.png]]
```js
var searchTerms = 'hi\\\'';
```

Both single quotes and backslashes are escaped properly, preventing direct string termination.

---

## Exploiting the XSS

Since we can’t escape the string directly, another approach is **closing the script tag and injecting our own script**.

### Payload:

```html
</script><script>alert(1)</script>
```

### Explanation:

4. `</script>` closes the original `<script>` tag.
5. `<script>alert(1)</script>` inserts our own script, executing `alert(1)`.

### Execution:

- Enter the payload into the search bar.
![[images/Pasted image 20250218122433.png]]

- The **JavaScript executes**, triggering an alert box.
![[images/Pasted image 20250218122456.png]]

---
By **closing the script tag**, we bypass input escaping and successfully inject our payload. This technique is useful when escaping mechanisms prevent direct string injections.

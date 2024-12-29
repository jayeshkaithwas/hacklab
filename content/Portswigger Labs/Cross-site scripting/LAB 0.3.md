---
title: LAB 0.3
aliases:
  - LAB 0.3
tags:
  - XSS
  - Labs
  - DOM-Based
  - Apprentice
description: "Lab: DOM XSS in document.write sink using source location.search"
---
#  Lab: DOM XSS in `document.write` sink using source `location.search`
---
[Lab](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink)

This lab contains a DOM-based cross-site scripting vulnerability in the search query tracking functionality. It uses the JavaScript `document.write` function, which writes data out to the page. The `document.write` function is called with data from `location.search`, which you can control using the website URL.

To solve this lab, perform a cross-site scripting attack that calls the `alert` function.

![[images/Pasted image 20241228111937.png]]

# Solution
---
## Understanding the Vulnerability

The lab description highlights that the `document.write` function is called with user-controlled data, making it susceptible to XSS attacks. The key here is that the function uses `location.search`, which retrieves the query string in the URL. By manipulating this query string, we can inject and execute our JavaScript code.

But before diving in, let’s briefly understand the Document Object Model (DOM):

- The **DOM** is a hierarchical representation of an HTML or XML document, allowing scripts to dynamically interact with and modify web page elements.
- In a browser’s developer tools, the **Inspector** tab (or **Elements** tab in Chrome) lets you view and navigate the DOM structure.

---

## Initial Exploration

Visit the blog page provided in the lab and locate the search bar. First, let’s test for reflected XSS by entering the following payload in the search bar:

```html
<script>alert(document.cookie)</script>
```

After submitting, observe the response. The page displays the entire input, including the script tags, without executing the script. Let’s dig deeper to understand why.
 ![[images/Pasted image 20241228112525.png]]

---

## Inspecting the DOM

1. Right-click on the search result and choose **Inspect** to open the DOM browser.
2. Notice that the script is reflected twice in the DOM:
    - Inside an `<h1>` tag, surrounded by single quotes.
    - Inside an `<img>` tag’s `src` attribute.

![[images/Pasted image 20241228112840.png]]

In the DOM, you’ll find a script like this:

```javascript
<script>
function trackSearch(query) {
    document.write('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">');
}
var query = (new URLSearchParams(window.location.search)).get('search');
if (query) {
    trackSearch(query);
}
</script>
```

### Breakdown of the Script:

- `trackSearch(query)`: A function that generates an `<img>` tag with a `src` attribute containing the `query` value.
- `document.write`: Dynamically writes the generated `<img>` tag into the DOM.
- `var query`: Retrieves the value of the `search` parameter from the URL query string.
- `window.location.search`: Accesses the query string portion of the current URL.

This script intends to track search queries by embedding them in an image URL. However, it directly includes user input without sanitization, leading to the vulnerability.

---

## Crafting the Payload

Our initial payload didn’t work because it remained confined within the `src` attribute of the `<img>` tag. To execute a script, we need to "break out" of this context. Let’s test this idea:

1. Update the query to:
    ```
    " Hello
    ```

![[images/Pasted image 20241228113215.png]]
2. Observe the result:
    - The `src` attribute value is prematurely closed, causing the following elements to misbehave.
    - This indicates that we’ve successfully "broken out" of the attribute.
3. Now, craft a payload that injects a new `<img>` tag with a malicious `onerror` attribute:
    
    ```html
    "><img src=x onerror=alert(1)>
    ```
    

### Breakdown of the Payload:

- `">`: Closes the original `src` attribute and the `<img>` tag.
- `<img>`: Starts a new `<img>` element.
- `src=x`: Sets an invalid image source.
- `onerror`: Executes JavaScript when the `src` fails to load.
- `alert('MardukWasHere')`: Triggers a pop-up with a custom message.

---

## Testing the Payload

1. Replace the search query in the URL with the crafted payload.
2. Submit the search and observe the behavior. The browser should display a pop-up alert showing your custom message, confirming the script execution.
3. 
![[images/Pasted image 20241228113443.png]]

---

Congratulations! You’ve successfully solved a DOM-based XSS lab. Keep practicing to sharpen your skills!
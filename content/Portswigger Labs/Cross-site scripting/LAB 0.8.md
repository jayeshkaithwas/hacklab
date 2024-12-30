---
title: LAB 0.8
aliases:
  - LAB 0.8
tags:
  - XSS
  - Labs
  - DOM-Based
  - Practitioner
  - AngularJS
description: "Lab: DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded"
---
# Lab: DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-angularjs-expression)

This lab contains a DOM-based cross-site scripting vulnerability in a AngularJS expression within the search functionality.

AngularJS is a popular JavaScript library, which scans the contents of HTML nodes containing the `ng-app` attribute (also known as an AngularJS directive). When a directive is added to the HTML code, you can execute JavaScript expressions within double curly braces. This technique is useful when angle brackets are being encoded.

To solve this lab, perform a cross-site scripting attack that executes an AngularJS expression and calls the `alert` function.

# Solution
---

## Analyze the Application

1. **Open the Lab**: Access the lab from the PortSwigger Academy.
    
2. **Inspect the Source Code**:
    
    - Use the browser developer tools (e.g., `Ctrl+Shift+I` in Chrome) to analyze the web page’s source code.
    - Identify where user input is reflected and how AngularJS expressions are processed.
3. **Test for AngularJS Binding**:
    
    - Enter a simple AngularJS expression, such as `{{7*7}}`, into input fields.
    - If `49` is rendered on the page, AngularJS is processing the input.
    
    ![[images/Pasted image 20241230213028.png]]
    

---

## Identify Encoding Restrictions

1. **Input Restriction Analysis**:
    
    - Test special characters like `<`, `>`, and `"` to confirm they are HTML-encoded.
    - For example, entering `<` gets reflected as `&lt;`, and `"` appears as `&quot;` in the HTML source.
2. **Payload Adjustment**:
    
    - Since angle brackets and double quotes are encoded, we need a payload that does not rely on these characters directly.
    - AngularJS allows certain constructs that don’t require `<`, `>`, or `"`.

---

## Crafting the Payload

AngularJS provides alternative syntax that can bypass encoding restrictions. Instead of using double quotes, AngularJS supports single quotes. For example, you can craft a payload using `{{constructor.constructor}}` to invoke the `Function` constructor.

**Payload**:

```javascript
{{constructor.constructor('alert(1)')()}}
```

**Explanation**:

- `constructor.constructor` accesses the `Function` constructor.
- `'alert(1)'` creates a function that triggers a JavaScript alert box.
- `()` executes the function.

---

## Inject and Execute the Payload

1. Locate the input field where your payload can be injected.
    
2. Insert the payload:
    
    ```js
    {{constructor.constructor('alert(1)')()}}
    ```
    
3. Submit the input or interact with the page to trigger the execution.
    
    ![[images/Pasted image 20241230213335.png]]
    
4. If successful, a JavaScript alert box will appear.
    

---
## Submit the Lab

After successfully stealing the session key or triggering the alert box, the lab will be marked as solved.

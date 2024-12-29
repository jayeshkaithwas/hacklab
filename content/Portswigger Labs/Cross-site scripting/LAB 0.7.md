---
title: LAB 0.7
aliases:
  - LAB 0.7
tags:
  - XSS
  - Labs
  - DOM-Based
  - Apprentice
---
# Lab: DOM XSS in jQuery selector sink using a hashchange event
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-selector-hash-change-event)

This lab contains a DOM-based cross-site scripting vulnerability on the home page. It uses jQuery's `$()` selector function to auto-scroll to a given post, whose title is passed via the `location.hash` property.

To solve the lab, deliver an exploit to the victim that calls the `print()` function in their browser.

# Solution
---

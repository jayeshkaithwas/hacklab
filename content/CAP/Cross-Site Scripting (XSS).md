---
title: Cross-Site Scripting (XSS)
aliases:
  - Cross-Site Scripting (XSS)
tags:
  - MCQs
  - CAP
  - XSS
---
1. **What is Cross-Site Scripting (XSS)?**
    
    - A) A server-side vulnerability that exposes data to unauthorized users.
    - B) A type of security vulnerability where an attacker injects malicious client-side scripts into a web page.
    - C) A method of encrypting data transmitted between a client and server.
    - D) A technique used to monitor and analyze web traffic for suspicious activities.
2. **Which of the following best describes a stored XSS attack?**
    
    - A) Injecting malicious code into a web page through a URL.
    - B) Malicious code is stored in a website's database and executed when a page is accessed.
    - C) The attacker tricks a user into executing a script via a phishing email.
    - D) Malicious code is injected directly into server-side scripts.
3. **In a reflected XSS attack, how is the malicious code injected?**
    
    - A) Through the website's database.
    - B) By embedding it in a URL that the victim clicks on.
    - C) By sending it through a form submission on the website.
    - D) By inserting it into server-side log files.
4. **Which of the following is NOT a recommended method for preventing XSS attacks?**
    
    - A) Input validation and sanitization
    - B) Content Security Policy (CSP)
    - C) Encoding user input
    - D) Allowing HTML tags in user input
5. **What does Content Security Policy (CSP) do in the context of XSS prevention?**
    
    - A) Encrypts the user’s data before it is sent to the server.
    - B) Specifies which sources of content are allowed to be loaded by the browser.
    - C) Automatically updates the website's database to remove malicious code.
    - D) Validates user input on the client-side before it is sent to the server.
6. **Why is escaping user input important for XSS prevention?**
    
    - A) It encrypts the user input before storing it in the database.
    - B) It prevents special characters from being interpreted as code.
    - C) It validates input to ensure it matches a specific format.
    - D) It restricts the length of user input to avoid buffer overflow attacks.
7. **Which technique involves converting user input into a format that can be safely displayed on the website?**
    
    - A) Input validation
    - B) Content Security Policy (CSP)
    - C) Escaping user input
    - D) Encoding user input
8. **What should be used in combination to effectively mitigate the risk of XSS attacks?**
    
    - A) Regular software updates and patches
    - B) A combination of input validation, CSP, escaping, encoding, and disabling HTML in user input
    - C) Strong passwords and two-factor authentication
    - D) Encryption of all data transmitted between client and server
9. **How can disabling HTML in user input help prevent XSS attacks?**
    
    - A) By reducing the amount of data stored in the database
    - B) By preventing users from injecting malicious HTML tags and attributes
    - C) By encrypting HTML content before rendering it on the webpage
    - D) By limiting the number of characters that can be input by users
10. **What is the primary goal of XSS attacks?**
    
- A) To gain unauthorized access to server-side data
- B) To manipulate how a web page is displayed or execute malicious commands
- C) To encrypt user data in transit
- D) To perform denial-of-service attacks on the web server

**Answers:**

1. B) A type of security vulnerability where an attacker injects malicious client-side scripts into a web page.
2. B) Malicious code is stored in a website's database and executed when a page is accessed.
3. B) By embedding it in a URL that the victim clicks on.
4. D) Allowing HTML tags in user input
5. B) Specifies which sources of content are allowed to be loaded by the browser.
6. B) It prevents special characters from being interpreted as code.
7. D) Encoding user input
8. B) A combination of input validation, CSP, escaping, encoding, and disabling HTML in user input
9. B) By preventing users from injecting malicious HTML tags and attributes
10. B) To manipulate how a web page is displayed or execute malicious commands
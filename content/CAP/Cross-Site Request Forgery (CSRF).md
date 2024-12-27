---
title: Cross-Site Request Forgery (CSRF)
aliases:
  - Cross-Site Request Forgery (CSRF)
tags:
  - MCQs
  - CAP
  - CSRF
---
#### Cross-Site Request Forgery Overview

1. **What is Cross-Site Request Forgery (CSRF)?**
    
    - A) A type of attack that involves manipulating user input fields
    - B) An attack that tricks a user into sending a malicious request to a target website
    - C) A method for accessing encrypted data
    - D) An attack that involves exploiting vulnerabilities in network protocols
2. **What types of requests can be involved in a CSRF attack?**
    
    - A) GET and POST requests
    - B) PUT and DELETE requests
    - C) PATCH and OPTIONS requests
    - D) HEAD and TRACE requests

#### Examples of CSRF Attacks

3. **What can a CSRF attack potentially use a POST request for?**
    
    - A) To access encrypted messages
    - B) To transfer funds or make purchases using sensitive data
    - C) To scan for vulnerabilities in a network
    - D) To send spam emails
4. **What is a potential use of a GET request in a CSRF attack?**
    
    - A) To update a user’s email address
    - B) To execute a command such as deleting all users
    - C) To encrypt sensitive data
    - D) To generate an API key

#### Impact of CSRF Attacks

5. **What might be the impact of a CSRF attack on an average user?**
    
    - A) The user’s account credentials are encrypted
    - B) The user’s funds are transferred or purchases are made without their knowledge
    - C) The user’s network connection is disrupted
    - D) The user’s data is backed up automatically
6. **What can a successful CSRF attack on a high-privilege user lead to?**
    
    - A) Data encryption
    - B) Full system compromise
    - C) Network speed optimization
    - D) Automated email responses

#### CSRF vs. XSS

7. **How do CSRF and XSS attacks differ?**
    
    - A) CSRF requires user authentication, while XSS does not
    - B) XSS is used to exploit network protocols, while CSRF does not
    - C) XSS involves email phishing, while CSRF does not
    - D) CSRF is a “two-way” attack, while XSS is a “one-way” attack
8. **What is a defining characteristic of XSS compared to CSRF?**
    
    - A) XSS requires user authentication and involves sending requests
    - B) XSS does not require authentication but involves executing scripts within the user’s browser
    - C) XSS is used to encrypt data, while CSRF does not
    - D) XSS only targets server-side vulnerabilities, while CSRF targets client-side vulnerabilities

#### Mitigating CSRF

9. **Which of the following is a recommended practice for protecting against CSRF attacks?**
    
    - A) Use CAPTCHA to prevent automated requests
    - B) Encrypt all data before transmission
    - C) Increase the session timeout period
    - D) Disable all external API access
10. **What role do anti-CSRF tokens play in mitigating CSRF attacks?**
    
    - A) They encrypt user data
    - B) They validate requests to ensure they are legitimate
    - C) They enhance the network speed
    - D) They prevent unauthorized access to network resources
11. **Why is using HTTPS important in preventing CSRF attacks?**
    
    - A) It improves the speed of request handling
    - B) It prevents attackers from intercepting requests
    - C) It provides encryption for sensitive data
    - D) It prevents the use of weak passwords
12. **What is one way to protect against CSRF attacks related to user sessions?**
    
    - A) Set a maximum lifetime for sessions
    - B) Use public Wi-Fi for accessing the application
    - C) Disable all user accounts
    - D) Use only GET requests for sensitive actions
13. **What is the benefit of enforcing strong passwords and two-factor authentication?**
    
    - A) It reduces the risk of unauthorized access and strengthens user authentication
    - B) It speeds up the login process
    - C) It prevents encrypted data from being accessed
    - D) It ensures users always use HTTPS

**Answers:**

1. **B) An attack that tricks a user into sending a malicious request to a target website**
2. **A) GET and POST requests**
3. **B) To transfer funds or make purchases using sensitive data**
4. **B) To execute a command such as deleting all users**
5. **B) The user’s funds are transferred or purchases are made without their knowledge**
6. **B) Full system compromise**
7. **A) CSRF requires user authentication, while XSS does not**
8. **B) XSS does not require authentication but involves executing scripts within the user’s browser**
9. **A) Use CAPTCHA to prevent automated requests**
10. **B) They validate requests to ensure they are legitimate**
11. **B) It prevents attackers from intercepting requests**
12. **A) Set a maximum lifetime for sessions**
13. **A) It reduces the risk of unauthorized access and strengthens user authentication**
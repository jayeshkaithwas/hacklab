---
title: SQL Injection
aliases:
  - SQL Injection
tags:
  - MCQs
  - CAP
---
#### SQL Injection Overview

1. **What is SQL injection?**
    
    - A) A method of database encryption
    - B) A type of attack that manipulates SQL queries to inject malicious code
    - C) A technique to optimize SQL queries
    - D) A type of SQL database management system
2. **Which of the following is NOT a category of SQL injection?**
    
    - A) Classic SQL injection
    - B) Blind SQL injection
    - C) Cross-Site Scripting (XSS)
    - D) Second-order SQL injection

#### Types of SQL Injection

3. **Classic SQL injection typically involves:**
    
    - A) Using remote command execution features
    - B) Manipulating SQL query syntax through input fields or URLs
    - C) Exploiting web application firewalls
    - D) Encrypting sensitive data
4. **In which SQL injection type does the attacker not have direct access to the database?**
    
    - A) Classic SQL injection
    - B) Blind SQL injection
    - C) Second-order SQL injection
    - D) Stored Procedure Injection
5. **What is the key characteristic of second-order SQL injection?**
    
    - A) Direct manipulation of input fields
    - B) Exploiting web application firewalls
    - C) Injected code is executed when the application is used by another user
    - D) Using Boolean-based techniques

#### Examples of SQL Injection

6. **Which of the following is an example of inserting malicious code into an input field?**
    
    - A) `SELECT * FROM users WHERE username='$username' AND password='$password' OR '1'='1'`
    - B) `EXEC sp_executesql 'SELECT * FROM users WHERE username='$username' AND password='$password' OR '1'='1'`
    - C) `SELECT dbo.fn_getuserdata('$username','$password')`
    - D) `EXEC xp_cmdshell 'SELECT * FROM users WHERE username='$username' AND password='$password' OR '1'='1'`
7. **Which SQL injection technique involves executing a stored procedure?**
    
    - A) Inserting malicious code into an input field
    - B) Exploiting stored procedures
    - C) Exploiting user-defined functions
    - D) Exploiting web application firewalls
8. **How can an attacker exploit user-defined functions in SQL injection?**
    
    - A) By entering code into an input field
    - B) By executing a stored procedure
    - C) By using a user-defined function to execute malicious code
    - D) By exploiting remote command execution features
9. **Which method involves executing a remote command to perform SQL injection?**
    
    - A) Exploiting web application firewalls
    - B) Inserting malicious code into an input field
    - C) Exploiting remote command execution
    - D) Using parameterized queries
10. **What does the following code represent: `SELECT * FROM users WHERE username LIKE '%$username%' AND password LIKE '%$password%'`?**
    
    - A) A method to exploit stored procedures
    - B) A technique to bypass web application firewalls
    - C) A user-defined function exploitation
    - D) A parameterized query

#### Prevention Techniques

11. **Which technique involves using placeholders to prevent SQL injection?**
    
    - A) Input validation
    - B) Parameterized queries
    - C) Encryption
    - D) Whitelisting
12. **What is the purpose of using prepared statements in SQL queries?**
    
    - A) To store sensitive data
    - B) To optimize SQL queries
    - C) To pre-compile and use queries with different parameters
    - D) To bypass web application firewalls
13. **Which technique ensures that only certain data types and values are accepted by an application?**
    
    - A) Parameterized queries
    - B) Input validation
    - C) Whitelisting
    - D) Encryption
14. **Why is encryption important in the context of SQL injection?**
    
    - A) It prevents SQL injection attacks directly
    - B) It protects sensitive data from being accessed by unauthorized users
    - C) It optimizes SQL query performance
    - D) It validates user input
15. **What does "least privilege access" refer to?**
    
    - A) Encrypting sensitive data
    - B) Monitoring system logs
    - C) Granting users the minimum access required to perform their tasks
    - D) Using parameterized queries
16. **How can monitoring system logs help in preventing SQL injection?**
    
    - A) By optimizing SQL queries
    - B) By detecting suspicious activities and potential SQL injection attempts
    - C) By encrypting sensitive data
    - D) By implementing whitelisting
17. **Which security measure is used to protect web applications from malicious traffic?**
    
    - A) Encryption
    - B) Web application firewalls
    - C) Stored procedures
    - D) Input validation

**Answers:**

1. B) A type of attack that manipulates SQL queries to inject malicious code
2. C) Cross-Site Scripting (XSS)
3. B) Manipulating SQL query syntax through input fields or URLs
4. B) Blind SQL injection
5. C) Injected code is executed when the application is used by another user
6. A) `SELECT * FROM users WHERE username='$username' AND password='$password' OR '1'='1'`
7. B) Exploiting stored procedures
8. C) By using a user-defined function to execute malicious code
9. C) Exploiting remote command execution
10. B) A technique to bypass web application firewalls
11. B) Parameterized queries
12. C) To pre-compile and use queries with different parameters
13. C) Whitelisting
14. B) It protects sensitive data from being accessed by unauthorized users
15. C) Granting users the minimum access required to perform their tasks
16. B) By detecting suspicious activities and potential SQL injection attempts
17. B) Web application firewalls
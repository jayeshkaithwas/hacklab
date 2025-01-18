---
title: Installation & Setting Up
aliases:
  - Installation & Setting Up
tags:
  - BurpSuite
  - FoxyProxy
  - Installation
---
#  How to Install and Set Up Burp Suite with FoxyProxy

**Burp Suite** is one of the most popular tools for web application security testing, and **FoxyProxy** is a handy browser extension that makes switching proxies seamless. In this guide, we will show you how to install Burp Suite, configure it, and use it with FoxyProxy for simplified proxy management. This setup is essential for web security professionals who need to intercept and manipulate web traffic.

---

## **Step 1: Install Burp Suite**

### 1.1 Download Burp Suite:

Start by visiting the official Burp Suite website to download the tool:

- Go to [PortSwigger - Burp Suite](https://portswigger.net/burp/communitydownload) and download the latest version of Burp Suite for your operating system (Windows, macOS, or Linux).

![[images/Pasted image 20250118215038.png]]

![[images/Pasted image 20250118215117.png]]

![[images/Pasted image 20250118215309.png]]
### 1.2 Install Burp Suite:

Once the download is complete, follow the installation instructions for your OS. 

---

## Step 2: Configure Burp Suite Proxy

### 2.1 Launch Burp Suite:

After installation, launch Burp Suite. When it starts, you’ll land on the main dashboard.
![[images/Pasted image 20250118215426.png]]
### 2.2 Set Up Proxy Listener:

To configure Burp Suite to intercept your browser traffic, follow these steps:

- Navigate to the **Proxy** tab.
![[images/Pasted image 20250118215521.png]]

- Click on the **Proxy Setting** sub-tab.
![[images/Pasted image 20250118215622.png]]

By default, Burp Suite listens on `127.0.0.1:8080`. Make sure it’s enabled. If you want to use a different port or IP, you can modify these settings here.

![[images/Pasted image 20250118215719.png]]

---

## **Step 3: Install FoxyProxy Extension**

### 3.1 Install FoxyProxy for Your Browser:

FoxyProxy is available as a browser extension for both Firefox and Chrome. Here’s how to install it:

- **For Firefox:** Visit the [FoxyProxy Firefox Add-on page](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) and click **Add to Firefox**.
    
- **For Chrome:** Visit the [FoxyProxy Chrome Extension page](https://chrome.google.com/webstore/detail/foxyproxy-standard) and click **Add to Chrome**.
    

After installation, you should see the FoxyProxy icon in the browser toolbar.

![[images/Pasted image 20250118215909.png]]

---

# **Step 4: Set Up FoxyProxy to Work with Burp Suite**

### 4.1 Open FoxyProxy Settings:

Click the FoxyProxy icon in your browser toolbar and select **Options**. This will open the FoxyProxy settings page where you can configure your proxy settings.

![[images/Pasted image 20250118220203.png]]

![[images/Pasted image 20250118220335.png]]

### 4.2 Add a New Proxy Configuration:

In the FoxyProxy settings, follow these steps:

- Click **Add New Proxy**.
- Set the proxy type to **HTTP**.
- Enter the following details:
    - **Proxy IP Address**: `127.0.0.1` (Burp Suite’s default IP address).
    - **Port**: `8080` (Burp Suite’s default port).

You can name this configuration as **Burp Suite Proxy** or anything you prefer.

![[images/Pasted image 20250118220447.png]]

---

### 4.3 Enable the Proxy:

Once the proxy is set up, go back to the FoxyProxy toolbar icon. Click on it and select the **Burp Suite Proxy** configuration you just created. This will route your browser traffic through Burp Suite.

![[images/Pasted image 20250118220548.png]]

---

## Step 5: Test Your Setup

### 5.1 Start Intercepting in Burp Suite:

In Burp Suite, go to the **Proxy** tab and make sure **Intercept** is set to **on**. This will start intercepting all HTTP/S requests made from your browser.

![[images/Pasted image 20250118220704.png]]

### 5.2 Browse a Website:

Open a new tab in your browser and visit any website. You should now see Burp Suite capturing and displaying the requests in the **Intercept** tab.

![[images/Pasted image 20250118220832.png]]

---

## Step 6: Optional Tweaks for Better Workflow

### 6.1 Disable FoxyProxy When Not Needed:

If you don’t need Burp Suite for all your browsing, you can quickly disable FoxyProxy by clicking on the FoxyProxy icon and selecting **No Proxy**.
### 6.2 Burp Suite SSL Certificate:

If you're working with HTTPS sites, you may need to install Burp Suite’s SSL certificate in your browser to avoid SSL errors. To do this:

- Open **[http://burp](http://burp/)** in your browser while Burp Suite is running.
- Download and install the Burp CA certificate in your browser to trust the intercepted SSL/TLS connections.

---

## Additional Resources:

- [Burp Suite Documentation](https://portswigger.net/burp/documentation)
- [FoxyProxy Official Website](https://getfoxyproxy.org/)
- [How to Install Burp Suite SSL Certificate](https://portswigger.net/burp/documentation/desktop/using-burp/intercept/ssl)

---

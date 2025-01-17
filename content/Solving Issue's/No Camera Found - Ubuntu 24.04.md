---
title: No Camera Found - Ubuntu 24.04
aliases:
  - No Camera Found - Ubuntu 24.04
tags:
  - Ubuntu
  - Camera
---

# No Camera Found? Here's How to Fix the Camera App in Ubuntu 24.04

Ubuntu 24.04 introduced GNOME’s new Camera app, but many users have encountered a frustrating issue: the app fails to detect built-in or external webcams, displaying the error message, "No Camera Found. Connect a camera device."

If you’re facing this issue, don’t worry—your hardware is likely fine. The problem seems to stem from software configuration rather than hardware defects. Here’s a quick and effective fix that has worked for many users.

![[images/Pasted image 20250117120736.png]]

---

## Fixing the Issue

The solution involves adding your user account to the `video` group, which is required for webcam access. You’ll need to use the terminal for this fix. Follow these steps:

1. **Open the Terminal:** Use the keyboard shortcut `Ctrl+Alt+T` to open the terminal.
    
2. **Run the Usermod Command:** Enter the following command to add your user to the `video` group:
    
    ```bash
    sudo usermod -aG video $USER
    ```
    
    - **Explanation:**
        - The `usermod` command is used to modify user accounts.
        - The `-aG` option appends a new group (`video`) to your existing groups.
        - `$USER` is a placeholder for your username; the command automatically replaces it with your current username.
3. **Enter Your Password:** If prompted, type your account password. Remember, the terminal won’t display your password as you type—this is normal. Simply type your password and press `Enter`.
    
4. **Restart Your Session:** Log out of your account or restart your system to apply the changes.
    
    ```bash
    sudo reboot
    ```
    

---

## Test the Camera App

After restarting, open the Camera app. Your webcam should now be detected, and the app should function as expected.

---

## Conclusion

This simple fix has resolved the issue for many users. By adding your user account to the `video` group, you grant it the necessary permissions to access your webcam. While it’s disappointing that this issue exists in a long-term support (LTS) release, this workaround ensures your Camera app works as intended.

If you encounter further issues, consider checking the official Ubuntu forums or reaching out to the community for additional support.
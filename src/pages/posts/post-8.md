---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Guide to use Wake-on-LAN with a Raspberry Pi'
pubDate: '2026-02-18'
description: ''
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Overview
Use an iPhone to issue a Wake-on-LAN command from a Raspberry Pi to a Dell Mini PC.

The Dell Pro Mini uses 10-20 watts on idle, while the Raspberry Pi 3B+ uses <2 watts on idle. Combined with Sunshine/Moonlight from LizardByte, this enables an on-demand, power-efficient solution to using a remote desktop PC without leaving the mini PC on 24/7.

Simply tap on an app shortcut on the iPhone's home screen to wake the PC and then launch the Moonlight app to start the remote desktop session.

## Requirements
- Raspberry Pi
- iPhone
- Dell Mini PC
- Termius or other iOS SSH app

## Dell Pro Mini PC
### Get the Ethernet MAC Address in Windows
1. Open **Command Prompt**
2. Type `ipconfig /all`

### Configure Ethernet adapter properties
1. Open the Start menu
2. Type `ncpa.cpl` and press **Enter** to open Network Connections
3. Right-click your ethernet adapter and select **Properties**
4. Select the **Configure** button
5. Select the **Advanced** tab
6. Verify these **Properties** and **Values**:
    - Energy Efficient Ethernet = Off
    - Wait for Link = Auto Detect
    - Wake on Magic Packet = Enabled
    - Wake On Magic Packet From S5 = Enabled
    - Wake on Pattern Match = Disabled

### Configure the BIOS
- Power
    - Deep Sleep Control = Disabled
- System Management
    - Wake on LAN/WLAN = LAN Only, WLAN Only, LAN or WLAN

## Raspberry Pi
### Set a static IP
Otherwise, your router may assign a different IP address and the SSH login information saved to your iPhone will need to be updated

### Protect against SSH brute-force attacks:
Install brute-force blocker:
```bash
apt install fail2ban
```

Edit the configuration file to increase penalties:
```bash
sudo nano /etc/fail2ban/jail.local
```

Add this:
```ini
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
findtime = 10m
bantime = 1w
bantime.increment = true
bantime.factor = 4
```

This configuration:
- Bans after 3 failures
- If the reconnections come within 10 minutes
- Bans for 24 hours
- Every repeated attack multiplies the ban duration x4 (24h → 4 days → 16 days → 64 days)

### Enable SSH
```bash
# Enable autostart
sudo systemctl enable ssh

# Launch SSH
sudo systemctl start ssh
```

### Boot to the Terminal for headless operation
1. sudo raspi-config
2. System
3. Boot
4. Select Console
5. Reboot

To undo, simply run `sudo raspi-config` in the Terminal again and choose ____.

To launch the desktop environment from the Terminal, type `startx`.

## Wake the PC with a Magic Packet
### Option 1 (reliable): Send a Magic Packet from a Raspberry Pi
1.  ```bash
    sudo apt update
    sudo apt install wakeonlan

    # Test function to wake PC from the shutdown state
    wakeonlan <MAC_ADDRESS>
    ```

    Output:
    > Sending magic packet to 255.255.255.255:9 with <MAC_ADDRESS>

2.  **Method A (recommended)**

    Use the iPhone to relay an SSH wake command to the Raspberry Pi. You can tap on the icon from the home screen or say "Hey Siri, <Wake Dell Pro Mini | title of icon>".
    #### Add an icon to the home screen to wake the PC
    1. Open Shortcuts app
    2. (Optional) Add **Show alert**
    3. Add **Run Script over SSH**
    4. Type `wakeonlan <MAC_ADDRESS>`
    5. Add the host IP, User, and Password
    6. Press the **down arrow** at the top
        - (Optional) Rename to "Wake PC"
        - Select **Add to Home Screen**
    
    **Method B**
    
    - Install Termius or another SSH iOS app from the App Store to SSH into the Raspberry Pi from the iPhone
    - Execute the `wakeonlan <MAC_ADDRESS>` command manually or create a script:
        ```bash
        # Create the file
        nano wake.sh

        # Add command
        wakeonlan <MAC_ADDRESS>
        
        # Make the file executable
        chmod +x wake.sh

        # Launch the script
        ./wake.sh
        ```

### Option 2 (unreliable): Send a Magic Packet from the Moonlight app on an iOS device
1. Open Moonlight
2. Select the host (monitor with an exclamation mark)
3. Select **Wake PC**
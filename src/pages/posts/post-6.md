---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Guide to install OpenRGB on Bazzite'
pubDate: '2026-02-04'
description: ''
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

The first option uses the Flatpak version and can only auto-start after login. The second option uses Bazzite's web application (uses `ujust install-openrgb`) and can auto-start at the login screen. Auto-starting at the login screen is useful for issuing a wake-on-lan request without needing to connect via remote desktop to login.

## Option 1: Flatpak (user level, runs after login)
### Launch the application and create a profile
1. Install OpenRGB Flatpak from Bazaar
2. Select the device(s) and set the LED to off
3. Save as a new profile named "off"

Find the profile file path:
```bash
find ~/.var/app/org.openrgb.OpenRGB -name '*.orp'
```
It should output something like:
```bash
/home/James/.var/app/org.openrgb.OpenRGB/config/OpenRGB/off.orp
```

### Create the user service file
```bash
nano ~/.config/systemd/user/openrgb-off.service
```

Paste:
```ini
[Unit]
Description=Apply OpenRGB "off" profile after login
After=graphical-session.target
Wants=graphical-session.target

[Service]
Type=oneshot
ExecStart=/usr/bin/bash -lc 'sleep 15; /usr/bin/flatpak run org.openrgb.OpenRGB --loglevel error --profile "$HOME/.var/app/org.openrgb.OpenRGB/config/OpenRGB/off.orp"'

[Install]
WantedBy=default.target
```

### Start the service and enable auto-start
```bash
# Reload the user systemd manager
systemctl --user daemon-reload

# Start the service now and auto-start at boot
systemctl --user enable --now openrgb-off.service

# Check the status
systemctl --user status openrgb-off.service
```

### (Optional) Check logs. `-b` checks logs from this boot. `-u` means this systemd unit (service)
```bash
journalctl --user -b -u openrgb-off.service
```

### Uninstall the user service
```bash
# Disable the service
systemctl --user disable --now openrgb-off.service

# Delete the service file
rm -f ~/.config/systemd/user/openrgb-off.service

# Reload the user systemd manager
systemctl --user daemon-reload

# Verify it's gone
systemctl --user list-unit-files | grep openrgb
```

## Option 2: AppImage (system-wide level, runs at login)

### Install OpenRGB from Bazzite Portal Setup
1. App Launcher > Utilities > **Bazzite Portal Setup**
2. *Browser opens* > Click **Setting up Bazzite** > *Scroll down*
3. Click the **toggle button** for OpenRGB
4. Click **Continue**
5. Click **Install Selected Items**
6. *Follow instructions*
7. A **Gear Lever** window will open
    - Click **Unlock**
    - Click **Move to the app menu**

### Verify the profile file and `logs` folder exists
```bash
# Profile
ls ~/.config/OpenRGB/off.orp

# Logs
ls -l /home/James/.config/OpenRGB/logs
```

### Create the system-wide service file
```bash
sudo nano /etc/systemd/system/openrgb-off.service
```

Paste:
```ini
[Unit]
Description=Turn off G.Skill Trident Z LEDs at boot (AppImage, with profile sanity check)
After=systemd-udev-settle.service multi-user.target
Wants=systemd-udev-settle.service

[Service]
Type=oneshot
WorkingDirectory=/home/James/.config/OpenRGB
ExecStart=/usr/bin/bash -lc '\
  sleep 5; \
  APP="/home/James/AppImages/openrgb.appimage"; \
  PROFILE="/home/James/.config/OpenRGB/off.orp"; \
  if [ -f "$PROFILE" ]; then \
    "$APP" --config "/home/James/.config/OpenRGB" --profile "$PROFILE"; \
  fi'
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

### Start the system-wide service and enable auto-start
```bash
# Reload the systemd manager
sudo systemctl daemon-reload

# Check the status
sudo systemctl status openrgb-off.service

# Start the service now and auto-start at boot
sudo systemctl enable --now openrgb-off.service
```

### To uninstall the system-wide service
```bash
# Disable the service
sudo systemctl disable --now openrgb-off.service

# Delete the service file
sudo rm -f nano /etc/systemd/system/openrgb-off.service

# Reload the systemd manager
sudo systemctl daemon-reload

# Check the status
sudo systemctl status openrgb-off.service
```
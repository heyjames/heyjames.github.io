---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'John the Ripper Notes'
pubDate: '2026-03-12'
description: ''
type: 'Cybersecurity'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

### Documentation
https://www.openwall.com/john/doc/

### Install (Ubuntu)
```bash
# Install
sudo snap install john-the-ripper

# Reboot
sudo reboot
```

### Get rockyou.txt wordlist
```bash
wget https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt
```

### Modes
```bash
# Wordlist mode
john --wordlist=wordlist.txt filetocrack.txt

# Single crack mode
# "...login names, "GECOS" / "Full Name" fields, and users' home directory names as candidate passwords, also with a large set of mangling rules applied"
john --single filetocrack.txt

# Leetspeak
# Example: th1s1smyp@$$w0rD
john --wordlist=wordlist.txt filetocrack.txt --rules=l33t

# Lower and upper case letters
# Example: ThisIsMyPassWorD
john --wordlist=wordlist.txt filetocrack.txt --rules=shifttoggle

# Mask mode
# ?d = number
# ?u = uppercase letter
# ?l = lowercase letter
# ?a = upper, lower, digits, symbols
# !  = exclamation mark
john --mask=?d?u?l filetocrack.txt

# Auto mode
# Single crack mode
# Uses John's built-in password.lst
# Incremental mode (brute-force)
john filetocrack.txt
```

### Interesting commands
```bash
# Copy all 5 character lines into a new file
LC_ALL=C awk 'length==5' ./rockyou.txt > ./5letter.txt

# Then run in wordlist mode
john --wordlist=5letter.txt filetocrack.txt
```

### Misc commands
```bash
# Show cracked results from a file
john --show filetocrack.txt

# Resume after interruption
john --restore

# View sessions
john --status
```

### Paths
```bash
# Where John stores cracked passwords
/home/<USERNAME>/snap/john-the-ripper/694/.john/john.pot
# Manually locate if the above doesnt work
find ~ -name "*.pot"

# Configuration
# change the default wordlist
# beep if you find a password
/snap/john-the-ripper/610/run/john.conf
```
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Guide to set up a proxy on Debian 11'
pubDate: '2026-01-21'
description: ''
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

This guide is for educational and testing purposes. Using a proxy may violate websites' terms of service. Use a proxy at your own risk.

## Overview
- Set up a proxy with Squid
- Set up Squid permissions to whitelist a connection and deny all else
- Set up UFW (firewall)
- Install fail2ban to protect against SSH brute-force
- Disable unused ports
- Create a non-root user
- Disable root login
- Create an SSH key with passphrase
- Restrict sudo user's .ssh folder
- Disable Link-Local Multicast Name Resolution on Port 5355 and deny in UFW

## Begin
Sign in as root

### Update system and packages and install squid
```bash
# Update system packages
apt update && apt upgrade -y

# Install squid
apt install squid -y
```

### Configure squid
Edit the file:
```bash
nano /etc/squid/squid.conf
```

1. Search (Mac: Control + W) for `http_access deny all`
2. Add two lines before `http_access deny all`

The section looks like this when added (note: the **order is important**):
```ini
acl myip src <YOUR_IP_ADDRESS> # add this
http_access allow authenticated # add this (if you want authentication)
http_access allow myip # add this
http_access deny all
```

Restart squid (this takes a while):
```bash
systemctl restart squid
```

### View real-time connections when the proxy is in use
```bash
tail -f /var/log/squid/access.log
```

### View list of running services
```bash
systemctl list-units --type=service --state=running
```

### (Optional) Add a username and password to use the proxy for increased security
Prompt for a username and password when the browser launches.
```bash
# Required password generator from squid
apt install apache2-utils

# Create the username and be prompted for a password
htpasswd -c /etc/squid/passwords <SQUID_USERNAME>

# Output hashed password
cat /etc/squid/passwords
```

Edit squid configuration file:
```bash
nano /etc/squid/squid.conf
```
1. Press `Control + w` and find the string `INSERT YOUR OWN RULE`.
2. Order matters! - Add these three lines so that it will look like the example below:

    ```ini
    auth_param basic program /usr/lib/squid3/basic_ncsa_auth /etc/squid/passwords
    auth_param basic realm proxy
    acl authenticated proxy_auth REQUIRED
    ```

3. And then add this a little farther below:
    ```bash
    http_access allow authenticated
    ```

Snippet of `squid.conf` after you added the lines:
```ini
#
# INSERT YOUR OWN RULE(S) HERE TO ALLOW ACCESS FROM YOUR CLIENTS
#
include /etc/squid/conf.d/*

auth_param basic program /usr/lib/squid3/basic_ncsa_auth /etc/squid/passwords
auth_param basic realm proxy
acl authenticated proxy_auth REQUIRED

# Example rule allowing access from your local networks.
# Adapt localnet in the ACL section to list your (internal) IP networks
# from where browsing should be allowed
#http_access allow localnet
http_access allow localhost

# And finally deny all other access to this proxy

# Allow rules for your public IP address
acl myip src <YOUR_IP_ADDRESS>
http_access allow authenticated
http_access allow myip
http_access deny all

#  TAG: adapted_http_access
```

Restart squid (this takes a while):
```bash
systemctl restart squid
```

## Firewall Configuration
- Verify the firewall is running
- Allow only your IP to access squid via port 3128
- Block all other incoming network traffic to 3128, regardless of TCP or UDP
- Verify they have been added via `ufw status` (use `ufw delete <NUMBER>` if needed)

```bash
# Output firewall rules with a number next to it
ufw status numbered

# Allow only connections from your specified IP address to port 3128
ufw allow from <YOUR_IP_ADDRESS> to any port 3128

# Deny all other connections to port 3128
ufw deny 3128
```

This is what `ufw status numbered` looks like at the end:
```bash
     To                         Action      From
     --                         ------      ----
[ 1] 3128                       ALLOW IN    <YOUR_IP_ADDRESS>             
[ 2] 3128                       DENY IN     Anywhere                  
[ 3] 5355                       DENY IN     Anywhere                  
[ 4] 22/tcp                     ALLOW IN    <YOUR_IP_ADDRESS>             
[ 5] 22/tcp                     DENY IN     Anywhere                  
[ 6] 3128 (v6)                  DENY IN     Anywhere (v6)             
[ 7] 5355 (v6)                  DENY IN     Anywhere (v6)             
[ 8] 22/tcp (v6)                DENY IN     Anywhere (v6)
```

## General network security configuration
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

```bash
# Restart fail2ban
sudo systemctl restart fail2ban

# View banned IPs
sudo fail2ban-client status sshd

# View bans in real-time
tail -f /var/log/fail2ban.log
```

### Allow SSH only from your IP:
```bash
ufw allow from <YOUR_IP_ADDRESS> to any port 22 proto tcp
ufw deny 22/tcp
```

### (Optional) Rate limit SSH connections
Deny connections from an IP address that has attempted to initiate 6 or more connections in the last 30 seconds.
```bash
ufw limit 22/tcp
```

### View SSH-related entries like logins, failed password attempts, session openings, etc from journalctl, the centralized log. The -u option shows logs for a specific service:
```bash
# View results
journalctl -u ssh

# View last 50 results
journalctl -u ssh -n 50

# View results with search string
journalctl -u ssh --grep "Failed password"
```

### Disable unused ports
Disable LLMNR (port 5355) - While useful for local network discovery, LLMNR can also be exploited for security vulnerabilities, such as poisoning and man-in-the-middle attacks.
```bash
sudo systemctl disable systemd-resolved
sudo systemctl stop systemd-resolved
```

Block port in ufw:
```bash
ufw deny 5355
```

### Check ports with socket statistics
> ss is a command-line tool that provides socket stats and displays various information based on various protocols. It can display port stats, TCP, UDP, RAW, and more.

`ss -tuln`:
- -t (or --tcp): Filters the output to display only TCP (Transmission Control Protocol) sockets.
- -u (or --udp): Filters the output to display only UDP (User Datagram Protocol) sockets.
- -l (or --listening): Restricts the display to only sockets that are in a listening state, meaning they are waiting for incoming connections.
- -n (or --numeric): Shows numerical addresses and port numbers, rather than trying to resolve them into symbolic hostnames or service names (e.g., displaying 0.0.0.0:80 instead of *:http)

| Local Address:Port | Definition                                 |
| ------------------ | ------------------------------------------ |
| `0.0.0.0:*`        | all IPv4 addresses on this system          |
| `[::]:*`           | all IPv6 addresses on this system          |
| `*:*`              | any address, any protocol family, any port |

This is what `ss -tuln` outputs. Note: `12.345.67.890:123` should be `<YOUR_IP_ADDRESS>`:
```bash
Netid         State          Recv-Q          Send-Q                      Local Address:Port       Peer Address:Port    Process         
udp           UNCONN         0               0                           127.0.0.53%lo:53              0.0.0.0:*                       
udp           UNCONN         0               0                                 0.0.0.0:68              0.0.0.0:*                       
udp           UNCONN         0               0                           12.345.67.890:123             0.0.0.0:*                       
udp           UNCONN         0               0                               127.0.0.1:123             0.0.0.0:*                       
udp           UNCONN         0               0                                 0.0.0.0:123             0.0.0.0:*                       
udp           UNCONN         0               0                                 0.0.0.0:5355            0.0.0.0:*                       
udp           UNCONN         0               0                                 0.0.0.0:47020           0.0.0.0:*                       
udp           UNCONN         0               0                                       *:42091                 *:*                       
udp           UNCONN         0               0       [fe80::5400:5ff:fec1:87ec]%enp1s0:123                [::]:*                       
udp           UNCONN         0               0                                   [::1]:123                [::]:*                       
udp           UNCONN         0               0                                    [::]:123                [::]:*                       
udp           UNCONN         0               0                                    [::]:5355               [::]:*                       
tcp           LISTEN         0               4096                              0.0.0.0:5355            0.0.0.0:*                       
tcp           LISTEN         0               4096                        127.0.0.53%lo:53              0.0.0.0:*                       
tcp           LISTEN         0               128                               0.0.0.0:22              0.0.0.0:*                       
tcp           LISTEN         0               4096                                 [::]:5355               [::]:*                       
tcp           LISTEN         0               128                                  [::]:22                 [::]:*                       
tcp           LISTEN         0               256                                     *:3128                  *:*
```

## General user account security configuration
### (Optional) Create a sudo user and disable root
1. Create a sudo user
    ```bash
    adduser <SUDO_USER>
    ```

    - Press enter for blank inputs
    - Give the user sudo privileges by adding them to the sudo group: `usermod -aG sudo <SUDO_USER>`
    - Confirm they are in the group. You should see `<SUDO_USER> : <SUDO_USER> sudo`
    - `groups <SUDO_USER>`

    **IMPORTANT**: Test if you can SSH with the new user.

2. Disable root (after confirming you can login via the new user)
    ```bash
    nano /etc/ssh/sshd_config
    ```

    Make sure these lines look like this (you may need to uncomment the line):
    ```ini
    PermitRootLogin no
    PasswordAuthentication no
    PubkeyAuthentication yes
    AuthorizedKeysFile .ssh/authorized_keys
    ```

    Restart ssh with one of these commands:
    ```bash
    systemctl restart ssh
    systemctl reload ssh
    ```

### (Optional) Create an SSH key
- Belongs to your private SSH key (on your Mac)
- Used locally when you unlock your key before connecting
- Protects your key if your laptop is stolen
- (Optional) You can leave an empty passphrase when creating the key (for convenience, but less secure)

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_<YOUR_CUSTOM_NAME> -C "<YOUR_CUSTOM_DESCRIPTION/comment>"
```

Create the path in your user directory first. You may need to create an empty file called `authorized_keys` in `.ssh`:
```bash
# Change file ownership of the .ssh contents to SUDO_USER only
sudo chown -R <SUDO_USER>:<SUDO_USER> /home/<SUDO_USER>/.ssh

# Change directory permissions (read, write, execute) to SUDO_USER only
sudo chmod 700 /home/<SUDO_USER>/.ssh

# Allow only SUDO_USER to read and modify the contents of authorized_keys
sudo chmod 600 /home/<SUDO_USER>/.ssh/authorized_keys
```

Then use this command to copy it from your local PC to the VPS server. Note: the `.pub` is the public one to copy:
```bash
ssh-copy-id -i ~/.ssh/id_ed25519_<YOUR_CUSTOM_NAME>.pub user@<YOUR_VPS_IP_ADDRESS>
```

Connect to it using the public key on your local device:
```bash
ssh -i ~/.ssh/id_ed25519_<YOUR_CUSTOM_NAME>.pub user@<YOUR_VPS_IP_ADDRESS>>
```

If you want it to prompt for your private key passphrase when you use `ssh user@<YOUR_VPS_IP_ADDRESS>`, add this:
```bash
nano ~/.ssh/config
```

```ini
Host <YOUR_VPS_IP_ADDRESS>
  User <username>
  IdentityFile ~/.ssh/id_ed25519_<YOUR_CUSTOM_NAME>
  IdentitiesOnly yes
```

## Browser Configuration
### Network Settings
I recommend Firefox or a fork since you can set the proxy settings to affect only the one browser instead of your operating system's network settings. I prefer a portable version of LibreWolf or Waterfox.

1. Firefox > Settings > Network Settings (scroll all the way to the bottom of **General**)
2. Select Manual proxy configuration
3. Enable checkbox for "Also use this proxy for HTTPS" if available
4. Select OK

### (Optional) Save login credentials
If it is not available, verify **Ask to save passwords** is enabled in Firefox settings and manually create a new saved password. It will not recognize it if you restart the browser, but it should prompt you to save it. Then delete your manually entered entry. I have had issues where it did not prompt me despite being enabled. It might be because you need to create a entry or use the entry below:

| Field           | Value                                      |
|-----------------|--------------------------------------------|
| Website address | moz-proxy://<br><YOUR_VPS_IP_ADDRESS>:3128 |
| Username        | `<USERNAME>`                               |
| Password        | `<PASSWORD>`                               |
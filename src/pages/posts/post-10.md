---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Proxmox Notes'
pubDate: '2026-03-18'
description: ''
type: 'Virtualization'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Gracefully shut down
#### Web interface
1. (Optional?) Shutdown each VM from Console
2. Select the next item below "Datacenter" from the left section
3. Select "Shutdown" in the top-right

#### SSH
```bash
# List running VMs
qm list

# Stop a specific VM gracefully (ACPI shutdown)
qm shutdown <vmid>

# List running containers
pct list

# Stop a specific container
pct shutdown <ctid>

# Force stop a VM
qm stop <vmid>

# Shut down the node after all VMs are off
shutdown -h now
# or
poweroff
```

## Windows 11
#### Windows 11 25H2 VM disk space used
46.3 GB
- Installed virtio-win-gt-x64.msi
- Installed virtio-win-guest-tools.exe
- No internet
- No update

#### Enable resolution selection from Settings
After installing virtio-win, shutdown and verify Proxmox's Hardware > Display is set to **VirtIO-GPU**.

<div class="image-container-md"><img src="/images/post-10/1.png"></div>

### Allow LAN and disable Internet on Windows 11 VM
This is useful if you want to allow connections to and from the VM on the whole network, not just the other VMs on the host machine.

#### Enable firewall on Datacenter
Verify "Firewall" is set to "Yes".
<div class="image-container-md"><img src="/images/post-10/2.png"></div>

#### Enable firewall on the VM
Verify "Firewall" is set to "Yes".
<div class="image-container-md"><img src="/images/post-10/3.png"></div>

#### Enable firewall on the network interface
Verify "Firewall" is checked.
<div class="image-container-md"><img src="/images/post-10/4.png"></div>

#### Add firewall rules on the VM
Order typically matters.
<div class="image-container-md"><img src="/images/post-10/5.png"></div>
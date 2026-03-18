---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Guide to install CoolerControl on Bazzite'
pubDate: '2026-02-11'
description: ''
type: 'Linux'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

Install the package:
```bash
ujust install-coolercontrol
```

Start the service now and auto-start at boot
```bash
sudo systemctl enable --now coolercontrold
```

Check the status:
```bash
sudo systemctl status coolercontrold
```

Run the app at http://localhost:11987

Detect sensors:
```bash
sudo sensors-detect
```

Reboot:
```bash
sudo reboot
```
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Update AsRock B850I Motherboard BIOS'
pubDate: '2026-04-09'
description: ''
type: 'BIOS Update'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Start

1. Turn off BitLocker
    - Search for BitLocker from the Start menu
2. Visit https://pg.asrock.com/mb/AMD/B850I%20Lightning%20WiFi/index.asp#BIOS to download the BIOS
3. Open the PDF with instructions from the AsRock website to update BIOS
4. Format the USB drive (FAT32, GPT if ok) and copy the `.ROM` file to the root directory
5. Turn off PC
6. Remove all other USB-connected devices from the PC except for keyboard and mouse
7. Remove Ethernet cable
8. Plug in the USB drive in a blue USB port
9. Turn on PC and go to BIOS (F2 or DEL key)
10. Disable SecureBoot
    - BIOS > Security > Secure Boot > Secure Boot: Disabled
11. Disable TPM
    - BIOS > Advanced > Trusted Computing > Security Device Support: Disabled
12. Exit > Save Changes and Exit
13. Return to the BIOS screen
14. Take pictures of any settings you want to restore later
15. Follow the AsRock Instant Flash User guide (AMD) PDF

## My custom settings
### Disable Auto Driver Installer
> It will pop-up in the bottom-right corner after you boot to Windows if enabled
- Tool > Auto Driver Installer: Disabled

### Disable WAN Radio
- Advanced > Onboard Devices Configuration > WAN Radio: Disabled

### Set GPU Link Speed
> I recommend changing "dGPU Only Mode" to "Auto" if you are setting "PCIe x16 Link Speed" to anything other than "Auto". This allows the iGPU and dGPU to be enabled in case you get a permanent black screen if the system doesn't work with the link speed setting. Beyond that, you will have to clear CMOS, which requires removing the GPU to access the jumper pins.
- Advanced > AMD PBS Option > AMD Common Platform Module > PCIe x16 Link Speed: Auto

### Disable iGPU
> Set "dGPU Only Mode" to "Auto" if you are setting "PCIe x16 Link Speed" to anything other than "Auto". You may get a permanent black screen if the system cannot display a screen and the iGPU fallback will not work if "dGPU Only Mode" is set to something other than "Auto". At that point, you will have to clear CMOS, which requires removing the GPU.
- Advanced > AMD CBS > NBIO Common Options > GFX Configuration > dGPU Only Mode: Enabled
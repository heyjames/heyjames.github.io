---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Windows 11 Notes'
pubDate: '2026-03-25'
description: ''
type: 'Windows'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Disable web search from Start menu
The Start menu in Windows 11 will attempt to search the web before any local results. If it thinks it has access to the internet but only has LAN, entering a search causes it to hang for a while.

Source (user: Limitless Technology): https://learn.microsoft.com/en-us/answers/questions/782951/how-do-you-disable-the-search-box-from-showing-web

1. Press `Windows Key + R` to launch **Run**
2. Type `regedit`
3. Navigate to `HKEY_CURRENT_USER\SOFTWARE\Policies\Microsoft\Windows`
4. Right-click the Windows key and select New > Key
5. Name it `Explorer`
6. Right-click the newly created Explorer key and select New > DWORD (32-bit) Value
7. Name the DWORD `DisableSearchBoxSuggestions`
8. Double-click the newly created DWORD and set the value from 0 to 1. Click OK and restart (required)

If you want to change it back and add web results again, go back and change the DWORD value for DisableSearchBoxSuggestions to 0 or delete the keys you created originally.

## Restore old context menu
No more clicking "Show more options". Enough said.

<div class="image-container-md"><img src="/images/post-11/1.png"></div>

1. Press `Windows Key + R` to launch **Run**
2. Type `regedit`
3. Navigate to `Computer\HKEY_CURRENT_USER\Software\Classes\CLSID`
4. Right-click > New > Key
5. Enter `{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}`
6. Right-click > New > Key
7. Enter `InprocServer32`
8. Select InprocServer32 and then double-click (Default) in the right pane
9. Leave `Value data` blank > OK
10. Restart Explorer.exe by right-clicking it from the Task Manager or restart PC

## Format a USB drive with diskpart in Command Prompt
Run Command Prompt as Administrator

#### Delete and initialize to store files:
```powershell
diskpart
list disk
select Disk <1|2|3...>

# Show disks again and look for the asterisk to confirm the correct disk is selected 
list disk

# Open This PC to double-check you have selected the desired disk

clean

# (Optional) Convert to gpt
#  - gpt (recommended for modern systems, NVMe drives, and UEFI)
#  - mbr (only for older BIOS-based systems or drives <2TB | pre-UEFI, pre-2012)
convert <gpt|mbr>

# Initialize for regular use
create partition primary
format fs=ntfs quick OR format fs=ntfs quick label="DataDrive"
assign letter=<E|F|G...>
exit
```

#### Delete only:
```powershell
diskpart
list disk
select disk <1|2|3...>
# Use `list disk` again to check the asterisk on the left-most column for confirmation
clean
exit
```

## PowerShell Hash (SHA256)
This ensures a long hash won't be cut off.

Open PowerShell
```powershell
(Get-FileHash "<PATH_TO_FILE>" -Algorithm SHA256).Hash
```
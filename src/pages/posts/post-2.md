---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Guide to backup a drive in Clonezilla'
pubDate: '2026-01-07'
description: ''
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

### Purpose
Backup an entire drive (e.g., m.2 SSD, SSD, HDD) with your operating system and files as an image stored in a folder on another drive (e.g., USB drive). If a hardware failure occurs, or if you want to go back to that state, you can restore from that image.

### Requirements
- Bootable Clonezilla USB drive
- USB drive to store the backup

### Notes
Use the **Tab** key to highlight the **\<Ok\>** or **\<Cancel\>** buttons in Clonezilla.

### Begin
1. Boot the Clonezilla Live USB
    <div class="image-container-md"><div class="image-container-md"><img src="/images/post-2/1.jpg"></div>
2. At the GRUB boot menu, select `Clonezilla live (VGA 800x600)`
3. Which language do you prefer:

    <div class="image-container-md"><img src="/images/post-2/2.jpg"></div>

    - Choose language
4. Change keyboard layout?
    
    <div class="image-container-md"><img src="/images/post-2/3.jpg"></div>

    - Select `Keep the default keyboard layout - US keyboard`
5. Start Clonezilla or enter login shell (command line)?
    
    <div class="image-container-md"><img src="/images/post-2/4.jpg"></div>
    
    - Select `Start_Clonezilla Start Clonezilla`
6. Two modes are available, you can
   
   (1) clone/restore a disk or partition using an image
   
   (2) disk to disk or partition to partition clone/restore
   
   Select mode:
    
    <div class="image-container-md"><img src="/images/post-2/5.jpg"></div>

    - Choose `device-image work with disks or partitions using images` to copy the entire drive into a folder with the image to be stored later
    - Choose `device-device work directly from a disk or partition to a disk or partition` if you want to clone one drive to another, such as buying a new drive because your current OS drive is running out of space and you just want the whole new drive to act exactly like the old one
7. Before cloning, you have to assign where the Clonezilla image will be saved to or read from.
    
    <div class="image-container-md"><img src="/images/post-2/6.jpg"></div>

    - Select `local_dev Use local device (E.g.: hard drive, USB drive)` to save the image to a local device, such as a USB drive
8. When prompted at the bottom, insert the USB drive and press **Enter** to continue
    
    <div class="image-container-md"><img src="/images/post-2/7.jpg"></div>

    - On the next screen, verify the USB where the image will be saved is in the list and note the name (e.g., `sdc`). Press **CTRL+C** to exit this screen
    
        <div class="image-container-md"><img src="/images/post-2/8.jpg"></div>

9. Now we need to mount a device as /home/partimag (Clonezilla image(s) repository) so that we can read or save the image in /home/partimag.
    
    <div class="image-container-md"><img src="/images/post-2/10.jpg"></div>

    - Select the device you noted earlier (e.g., `sdc2 232.9G`)
    - This will mount the device as `/home/partimag` and store the backup image there
10. Choose if you want to check and repair the file system before mounting the image repository.
    
    <div class="image-container-md"><img src="/images/post-2/11.jpg"></div>

    - Select `no-fsck Skip checking/repairing the file system before mounting`

11. Which directory is for the Clonezilla image repository?
    
    <div class="image-container-md"><img src="/images/post-2/12.jpg"></div>

    - This screen specifies which directory on the USB drive to save the image to. Note the `Current selected dir name: "/"`.
    - Press **Tab** and select **Done** to leave it as is
    - Verify the info at the bottom is correct and press **Enter** to continue
    
        <div class="image-container-md"><img src="/images/post-2/13.jpg"></div>

12. Choose the mode to run the following wizard about advanced parameters:
    
    <div class="image-container-md"><img src="/images/post-2/14.jpg"></div>

    - Select `Beginner Beginner mode: Accept the default options`
13. Select `savedisk Save_local_disk_as_an_image` to backup the entire disk including all partitions
    
    <div class="image-container-md"><img src="/images/post-2/15.jpg"></div>

14. Input a name for the saved image to use.
    
    <div class="image-container-md"><img src="/images/post-2/16.jpg"></div>

    - Keep the name short since errors may occur if it is long
15. Choose local disk as source.
    
    <div class="image-container-md"><img src="/images/post-2/17.jpg"></div>

    - Select the drive you want to backup if the asterisk is not marked
    - Verify the asterisk is marked on it and select *Ok**
16. Choose either compression option
    
    <div class="image-container-md"><img src="/images/post-2/18.jpg"></div>

17. Choose if you want to check and repair the file system before saving it.
    
    <div class="image-container-md"><img src="/images/post-2/19.jpg"></div>

    - Select `-sfsck Skip checking/repairing source file system`
18. After the image is saved, do you want to check if the image is restorable?
    
    <div class="image-container-md"><img src="/images/post-2/20.jpg"></div>

    - I chose `Yes, check the saved image`
19. Do you want to encrypt the image?
    
    <div class="image-container-md"><img src="/images/post-2/21.jpg"></div>

    - I chose `-senc Not to encrypt the image`
20. Do you want to copy the log files to Clonezilla live USB drive if it exists in this machine?
    
    <div class="image-container-md"><img src="/images/post-2/22.jpg"></div>

    - I chose `-plu Yes, copy log files to Clonezilla live USB drive if it exists`
21. The action to perform when everything is finished:
    
    <div class="image-container-md"><img src="/images/post-2/23.jpg"></div>

    - I chose `-p choose Choose reboot/shutdown/etc when everything is finished`
    - Verify the information at the bottom and press **Enter** to continue
    
        <div class="image-container-md"><img src="/images/post-2/24.jpg"></div>

    - Verify the information at the bottom and type `y` and press **Enter** to continue
    
        <div class="image-container-md"><img src="/images/post-2/26.jpg"></div>

22. Wait for the cloning process
    
    <div class="image-container-md"><img src="/images/post-2/27.jpg"></div>

23. When the cloning process is complete, press **Enter** to continue
    
    <div class="image-container-md"><img src="/images/post-2/28.jpg"></div>

24. Now you can choose to:
    
    <div class="image-container-md"><img src="/images/post-2/30.jpg"></div>
    
    - I generally choose `poweroff Poweroff` so I can safely remove the USB drives before turning on the PC for normal use
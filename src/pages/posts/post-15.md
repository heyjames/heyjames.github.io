---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Install yt-dlp on Fedora'
pubDate: '2026-09-26'
description: ''
type: 'Linux'
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

```bash
# Install yt-dlp
sudo dnf install yt-dlp

# (Option #1) Update yt-dlp
sudo dnf upgrade yt-dlp

# (Option #2) Update Pull the latest stable release from GitHub
sudo yt-dlp -U

# Download a Twitch VOD
yt-dlp https://www.twitch.tv/videos/<vod_id>

# Retrieve a list of available formats
yt-dlp -F https://www.twitch.tv/videos/<vod_id>

# Download the VOD with the specified format
yt-dlp -f 720p60 https://www.twitch.tv/videos/<vod_id>
```
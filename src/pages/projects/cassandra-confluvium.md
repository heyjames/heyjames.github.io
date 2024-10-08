---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Cassandra Confluvium Better UI/UX'
pubDate: 2024-09-06
dates: 'May 2019 - Present'
description: 'Userscript for Tampermonkey Browser Extension'
id: 5
type: 'userscript'
language: 'javascript'
image:
    url: ''
    alt: ''
    width: ''
github_url: 'https://github.com/heyjames/cassandra-site-helper'
tags: []
---
<div class="thumbnail-container-space-around pt">
    <div>
        <img class="thumbnail" src="../../src/whitespace-ip.png" height=250 alt="Double-click highlighting copies trailing white space" />
        <br>
    </div>
    <div>
        <img class="thumbnail" src="../../src/before-helper.png" height=250 alt="Before" />
        <div class="image-caption-center">Before</div>
    </div>
    <div>
        <img class="thumbnail" src="../../src/after-helper-public-dark.png" height=250 alt="After" />
        <div class="image-caption-center">After</div>
    </div>
</div>

This script uses the [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) extension to add quality-of-life features to the Insurgency: Sandstorm tactical community website [Confluvium Gaming](http://cassandra.confluvium.net/).

The website was unfortunately designed to unintentionally cause a user to include the trailing whitespace when copying the IP address, a condition that prevents connecting to the server in the game client. Using a single button to copy the IP address saves time and effort, while allowing me to connect faster than others for the last player slot on this popular server (yes, this has happened a lot). Although this script began as a simple button to copy the IP address, many other features were developed as a  moderation tool and to improve the user experience.

## Features
- Copy IP button (**up to 75% easier!**)
- Dark theme
- More readable Steam names
- More readable server restart timers and server occupancy labels
- Custom font styling
- View additional server info
- Customize a background color to highlight players
- (Deprecated) Copy SID button

## Special Features for moderation (closed source)
- Player database
  - Assign different colors to indicate an admin, moderator, kicked, banned, or concerning player
  - Add comments about a player
  - Use custom or original Steam names or both (e.g., disguising as moderator)
  - Flash the background if certain player(s) joined the server you're in
  - Search database by Steam ID or name
  - Automatically store players that connect as long as you have the website open
  - Highlight specific players by Steam ID
  - (Deprecated) Use external API to append information about special game modes enabled (e.g., pistols only, night map)
  - Disable automatic page refresh
  - Change the size of the server iFrame

## Default Features
- A single-click button to copy IP address without the trailing whitespace
- A single-click button to copy SID (replay ID) without the trailing whitespace
- Dark mode
- Gray, pill-styled names to easily distinguish each player
- Prevents confusion around names with spaces that may look like a separate player on the next line if it renders at the end of the line
- More readable server occupancy and uptime labels
- Because there is certain server information that is not displayed, a separate source is retrieved to show if a server was manually changed by a moderator/admin to a non-checkpoint mode (e.g. Outpost), mutators (shotguns or pistols only), or a night map.
- Number of players in server will turn orange if there is only one slot available (9 / 10+2) or red if the server is full (10 / 10+2). If the configuration is set to moderator, then the script will account for that, too (orange: 11 / 10+2, red: 12 / 10+2).
- The server uptime will remain light blue until it turns orange on hour 3. It will remain orange until it turns red on hour 4. Then it will add a black background at 4h45m to complement the red font. Time above 4h45m is considered overtime and will attempt to restart if active players end the round on a success.
- Customize font size and family for server info or Steam names
- Page refresh countdown bar + countdown timer
- Differentiate a favorite server from the regular servers with a separate background color
- (2020-11-08: Deprecated) HTML encoding is not set by default and uses windows-1252 which may be the cause of garbled text. Player names with garbled text can be replaced with the correct text/symbols by adding the garbled text and associated text/symbol to the dictionary.
- Disable automatic page refresh (Can help you report a player before the auto-refresh removes them from the page)
- (Deprecated) Manually override a server IP with the new one in the event the owner has not updated the web interface
- Increase iFrame height to remove scrollbars
- (For developer use) Censor mode to take screenshots
- Customize a background color to highlight a group of players

## The Original Inconvenience Problem
Without this script, a user can double-click and drag the IP address at the website and press CTRL+C to copy the IP address, but this also copies trailing whitespace. The alternative is to carefully single-click and drag the IP address and stop precisely before the trailing white space. Both scenarios require increased hand-eye coordination and takes about 5 and 8 user actions, respectively, compared to 2 with this script enabled.

- Scenario #1: Without script - click and drag method (con: requires more hand-eye coordination for precise selection)
    1. Hold mouse down
    2. Drag
    3. Mouse up
    4. Press CTRL
    5. Press C
  
- Scenario #2: Without script - double-click and drag method (con: requires additional actions)
    1. Mouse down
    2. Mouse up
    3. Hold mouse down
    4. Drag
    5. Mouse up
    6. Press CTRL
    7. Press C
    8. Backspace (in game client)
  
- Scenario #3: With script
    1. Mouse down
    2. Mouse up

## Tools
- Tampermonkey Extension
- JavaScript
- HTML

## Notes
Google Chrome is currently unsupported due to its security implementation around iFrames. Neither the current copy text method or Clipboard API will work.

There is no ID or class selector asssociated with the IP address (or any value) in its HTML, which requires splitting the contents of the iFrame by `<br>` and isolating the IP address. Alternatively, selecting the first instance of an IP address with Regex should work, too. The Clipboard API does not work, so the workaround requires creating an hidden input field to simulate a user select and user copy action.
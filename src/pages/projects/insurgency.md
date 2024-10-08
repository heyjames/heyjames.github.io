---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Insurgency'
pubDate: 2024-09-06
description: 'Video Game Dedicated Server'
id: 1
type: 'game server'
language: 'linux'
dates: 'Nov 2015 - Nov 2017'
# image:
#     url: 'https://docs.astro.build/assets/full-logo-light.png'
#     alt: 'The full Astro logo.'
github_url: 'https://github.com/heyjames/insurgency-dedicated-server'
tags: ["Insurgency", "Servers", "Video Games"]
---
Insurgency is a multiplayer military shooter. Although the video game can be fast-paced, I became interested in a slower co-op experience. To pursue this, I learned to operate server software on a virtual private server and built a small community of players focused on teamwork, balancing fun with realism, and server stability.

Players can join matches hosted on official servers hosted by the developers or on community-run dedicated servers, which allow for custom game modes, maps, increased player slots, weapon modifications, and time limit adjustments that affect various stages of the core game loop. Server customization was key to attracting new players, while keeping existing players happy.

While some server customizations can be as simple as modifying a single line of text in a configuration file, others like changing the player's loadout is made more complex by the lack of documentation. All the changes I added required assistance from other server operators, player-submitted mods, trial and error, and careful analysis of various file types.

## Tools
- Ubuntu Server
	- Adding non-root users
	- User File Permissions
- Digital Ocean cloud service provider
- SSH with PuTTY
- SFTP with FileZilla
- Apache webserver to serve custom maps and scripts
- Cronjobs to check server uptime and auto start on crash
- Created an ouput log to view server crashes

## Features
- Increased bot count
- Removed player-restricted zones
- Moved some primary slot weapons (submachine guns) to secondary's (pistols)
- Increased player supply points, so they can purchase all weapons and attachments
- Added 20+ custom maps
- Heavy armor enables 2 primary slots, and light armor enables 2 secondary slots
- Unmuted spectators and dead players
- Extended time to capture objectives, allowing moderators time to communicate to new players about the server's play style
- Increased the amount of players that can join the server
- Increased enemy variety instead of all enemies being uniform and acting like cannon fodder - heavy armor, heavy weapons, rare ones with suppressors, molotovs, fragmentation grenades
- Increased the beginning round timer so players with slower PCs can join after a new map loads
- Added new firearms with custom recoil and firerates to reflect real-life counterparts
- Adjusted player movement speed in 8 different player states (crouched, aimed down sights, stand walking, etc) to support the slower play style
- While pistols and SMGs are now grouped together, pistol holster and draw times were shortened to add incentives to using pistols
- Removed the impact damage from bots' perfectly programmed throwing trajectories and decreased the molotov's fire damage, shifting its usage as a way to break player formations, thus increasing dynamic gameplay

## Lessons
- Cronjobs can fail if the BASH script was written in Windows. `[DOS]` will be appended to the filename.
- Fixed crashes based on player feedback (not enough RAM)
- Players unable to download my custom theater files that enabled all the player customizations
    - A former developer for the game mentioned a "Fast Download" implementation that requires players to download from a remote URL
    - Instead of running a separate server, I ran a web server on the same server to simulate delivering the file remotely. This can be used to deliver the custom maps to players too.
- Although I reduced the bot count and added custom bot types—such as bots carrying armor-piercing bullets, heavy armor, or suppressed weapons—to emphasize stealth-themed gameplay, it ended up frustrating many players who complained about the lack of action
- Providing uncompressed map files for players to download created a smoother experience, as most players tend to have faster internet rather than powerful CPUs for decompressing files. While compressed maps save disk space, the decompression process isn't reflected in the game's loading bar, causing players to think the game had frozen and quit prematurely. Based on player feedback, uncompressed files proved more effective.
- Never add a feature to respawn; it will be abused, and removing it disappointed players
- Reducing ammo carrying capacity to encourage more accurate shots and heighten suspense received a lot of negative feedback, with some military veterans citicizing it as unrealistic
- Increasing weight and slowing player movement speed did not discourage players from choosing the one powerful weapon with the drum magazine. Limiting it to a couple of classes fixed the distribution of weapons usage
- Knife damage felt underpowered and underused. Increasing the damage from knife attacks from 70 to 100 caused unrealistic "run 'n knife" gameplay. Adjusting it to 99 fixed this while still offering players a small chance to survive in a situation when their primary and secondary magazines are depleted.
- Increasing draw and holster time for RPGs received a lot of negative feedback, but a slight increase in aim-down-sight time was well accepted
- Weapons listed at the top were used more frequently, allowing me to influence the popularity of Security-related weapons. This also emphasized the importance of firearms' audio signature in distinguishing between teammates and enemies

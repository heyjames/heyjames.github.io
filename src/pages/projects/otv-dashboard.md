---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'OTV Dashboard'
pubDate: 2024-09-06
dates: 'Jan 2021 - Jun 2022'
description: 'Website'
id: 7
type: 'website'
language: 'react.js'
image:
    url: ''
    alt: ''
    width: ''
github_url: 'https://github.com/heyjames/offlinetv'
github_url2: 'https://github.com/heyjames/offlinetv-api'
tags: ["Website"]
---
<div class="thumbnail-container-space-around pt pb">
    <img class="thumbnail" src="../../src/otvdashboard-dark.png" height=100 alt="otv dashboard dark theme">
    <img class="thumbnail" src="../../src/otvdashboard-darker.png" height=100 alt="otv dashboard darker theme">
    <img class="thumbnail" src="../../src/otvdashboard-light.png" height=100 alt="otv dashboard light theme">
    <img class="thumbnail" src="../../src/otvdashboard-syk.png" height=100 alt="otv dashboard syk theme">
    <img class="thumbnail" src="../../src/otvdashboard-lily.png" height=100 alt="otv dashboard lily theme">
    <img class="thumbnail" src="../../src/otvdashboard-mobile.png" height=100 alt="otv dashboard mobile">
</div>
A website that displays real-time livestream data from a group of digital content creators across YouTube and Twitch without needing to visit each website or subscribe to their push notifications.

## Features
- Intuitive user interface that provides useful livestream information on desktop and mobile devices
- "Last streamed at" time at a glance
- Multiple light and dark visual themes

## Enjoyed
I enjoyed arranging real-time data like the profile picture, live indicator, title, view count, and uptime in an easy to read user interface that works in multiple light and dark themes for desktop and mobile devices.

## Challenges
- Refactoring React Class Components to React Hooks
- Practicing breaking code
- Learning to use YouTube and Twitch's API
- Learning to use CSS variables
- Learning to use localStorage to cache the last used theme's data
- I tried to host the database using SQLite and was confused about random, incorrect "Last streamed at" dates
    - <a href="https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted-from-the-application" target="_blank" rel="noopener noreferrer">The Heroku filesystem is ephemeral</a> <i class="fas fa-external-link-alt"></i>

## Tools
- React.js
- Node.js
- Express.js
- PostgreSQL
- HTML
- Heroku
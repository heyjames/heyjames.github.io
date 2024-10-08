---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'INSTactical 2'
pubDate: 2024-09-06
dates: 'Sep 2019 - Sep 2022'
description: 'Website'
id: 6
type: 'website'
language: 'react.js'
image:
    url: ''
    alt: ''
    width: ''
github_url: 'https://github.com/heyjames/instactical2'
github_url2: 'https://github.com/heyjames/instactical2-api'
tags: ["Website"]
---
<div class="thumbnail-container-space-around pt">
    <img class="thumbnail" src="../../src/instactical2-home-mobile-view.png" height=120 alt="instactical home mobile view">
    <img class="thumbnail" src="../../src/instactical2-player-profile-detail.png" height=120 alt="instactical profile detail">
    <img class="thumbnail" src="../../src/instactical2-player-profiles-admin-filter.png" height=120 alt="instactical filter by admins">
    <img class="thumbnail" src="../../src/instactical2-player-profiles-home.png" height=120 alt="instactical player profile home">
    <img class="thumbnail" src="../../src/instactical2-edit-blog-post.png" height=120 alt="instactical edit blog post">
</div>

I remade the website in React after completing an online course. The new version includes a new Players Profiles page, where I can add, edit, and delete player profiles. It was an immensely helpful moderation tool that kept track of admins and banned players. It can also automatically parse the source website's (cassandra.confluvium.net) real-time data and allow creation of a new player profile with just a few clicks, saving me from tedious manual entries.

## Challenges
After learning to implement the React component lifecycle, I had to refactor essentially the same code for each webpage. That process became a eureka moment for me, marking the point where I started feeling comfortable breaking and refactoring code.

## Tools
- React.js
- Node.js
- Express.js
- MongoDB
- HTML
- Joi validation
- Extract, Transform, Load (ETL)
---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Even Resigned I'm Checking (ERIC)"
pubDate: 2024-09-06
dates: 'Feb 2024 - Mar 2024'
description: 'Background Application'
id: 8
type: 'application'
language: 'python'
image:
    url: ''
    alt: ''
    width: ''
github_url: 'https://github.com/heyjames/eric'
tags: ["Website"]
---
                                               (main loop, init)
                                         =============                
                                        |             |                                    
                                        |   eric.py   |                                    
                                        |             |
                                         ==============                      
                                               ^                             
                                               |                             
                                               v                             
                 ========================================================== 
                |                                                          |
                |                           api.py                         |
                |                                                          |
                 ========================================================== 
                            ^                                 ^                     
                            |                                 |                     
                            |                                 |                     
                            v (I/O layer)                     v (OS control/tools)  
                 ========================           ======================= 
                |                        |         |                       |
                |   legistar_parser.py   |         |   task_scheduler.py   |
                |                        | <-----> |                       |
                |   novus_parser.py      |         |   utils.py            |
                |                        |         |                       |
                |   pdf_parser.py        |         |   gmail.py            |
                |                        |         |                       |
                ========================           |   log.py              |
                                                   |                       |
                                                    ======================= 
<div class="image-caption-center">Topology</div>

An application running in the background that verifies Zoom registration links included in agenda packets published on meeting management websites.

## Purpose
City departments and the school district post meeting agendas with Zoom registration links that sometimes break onto a new line when it's too long. As a result, the full link isn't clickable, preventing the public from attending meetings virtually. This led to a formal complaint, and I decided thereafter to manually check each link for every agenda that was posted. Realizing this tedious process, I sought to explore automating it to practice programming architecture in Python and HTML parsing.

## Features
- Configurable schedule to periodically validate the next meeting's Zoom registration link inside of PDFs or HTML
- Supports Legistar and NovusAGENDA
- Email notifications

## Enjoyed
Thanks to Python's simpler syntax, I was able to focus on improving code organization and architecture, resulting in the codebase being easier to maintain, extend, and debug.

## Challenges
I used Beautiful Soup to read and extract data from HTML, but it was frustrating to handle the various data sources like checking if a registration link exists, verifying it's the correct one, detecting duplicates, and identifying outdated Zoom registration links across different agenda management interfaces.

## Tools
- Python
- Beautiful Soup - a Python library for pulling data out of HTML
- Extract and Transform
    - Automatically searches the most recent agenda, downloads PDF, parses, and notifies user via email if the Zoom link is invalid
- Gmail API
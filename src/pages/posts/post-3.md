---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Guide to update Astro vulnerabilities'
pubDate: '2026-01-08'
description: ''
author: ''
image:
    url: ''
    alt: ''
    width: ''
tags: []
---

## Overview
After `git push`, you may see this message below. This guide creates a branch to update NPM and Astro, verifies the website is working, merges the changes, and pushes the new changes to the remote repo.

> GitHub found _ vulnerabilities on <USERNAME.github.io>'s default branch (_ high, _ moderate, _ low). To find out more, visit: https://github.com/USERNAME/USERNAME.github.io/security/dependabot

## Quick Reminder
```bash
# git pull is shorthand for
git fetch
git merge

# Only check for new commits. Outputs nothing if there are no updates.
git fetch
```

## Begin
Open the Terminal view in Visual Studio Code (MacOS: Control + `)

```bash
# Check the Astro version
npx astro --version

# Start a new git branch
git checkout -b fix/deps

# Install the latest Astro version
npm install astro@latest

# Update installed packages allowed in package.json
npm update

# Install any compatible updates to vulnerable dependencies
npm audit fix

# Verify the remote URLs
git remote -v

# Execute the "dev" script defined in your project's package.json file and 
# visit the local url to verify the website works
npm run dev

# Show the working tree status
git status

# Stage all changes in the entire working directory
git add -A

# Commit
git commit -m "Update dependencies and fix audit vulnerabilities"

# If you're the only developer, skip to "2)"

# Publish the branch to GitHub
git push -u origin fix/deps

# 1) Make sure your fix/deps branch is pushed and up to date
git checkout fix/deps
git pull

# 2) Update master from GitHub first (avoid merging into stale master)
git checkout master
git pull

# 3) Merge the branch into master
git merge fix/deps

# 4) Push master to GitHub (this is what actually updates the default branch)
git push
```
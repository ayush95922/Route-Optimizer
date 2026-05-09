# SmartRoute — Project State

## Overview
SmartRoute is a full-stack transit comparison app for Indore.
Compares Bus, Walking, Cycling, Car for any route.
Tracks CO₂ savings and has a Champions leaderboard.

## Tech Stack
- Frontend: HTML + CSS + Vanilla JS + Tailwind CDN
- Backend: Spring Boot (Java 17) + Maven
- Database: MongoDB

## Architecture
- Frontend: Static HTML pages served via Nginx or file://
- Backend: REST API on port 8080
- DB: MongoDB on port 27017

## Pages (from screenshots)
1. Home (/) — Hero, stats cards, Find a route + Track my impact buttons
2. Login (/login) — Split layout, forest bg left, form right
3. Signup (/signup) — Split layout, street bg left, form right
4. Find Routes (/routes) — Origin/Destination dropdowns, criteria pills, Compare Routes button
5. Route Results (/routes) — Map (Leaflet), result card, Compare All Modes section (4 cards)
6. Champions (/champions) — Leaderboard with top 3 + table

## Status
- STARTED: 2026-05-04
- Phase: Initial setup complete

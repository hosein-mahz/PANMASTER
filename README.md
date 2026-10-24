# PanMaster

A cross-platform handpan learning and play ecosystem built with FastAPI, SQLite, and vanilla JavaScript.

## Overview

PanMaster is a web-based application designed to make handpan practice engaging and accessible. It combines an interactive canvas-based instrument with game-like practice modes, a coin-based reward system, and user accounts — all wrapped in a lightweight, mobile-friendly interface.

The project is currently under active development and fully playable on desktop and mobile browsers.

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Authentication:** JWT (PBKDF2-SHA256)
- **Frontend:** Vanilla HTML / CSS / JavaScript (Canvas API, Web Audio API)
- **Architecture:** Decoupled backend and frontend, RESTful API

## Features

- **Interactive Handpan Canvas:** Custom layout (1–8 notes + Ding) with multi-touch support.
- **Custom Audio Engine:** Polyphonic playback using WAV samples (no notes cut each other off).
- **Game Modes:**
  - Free Play (improvisation)
  - Falling Notes (rhythm/accuracy practice with dynamic note speeds)
- **Progression System:** 
  - XP-based leveling with 30 distinct levels.
  - Rewards for leveling up (coins, handpan skins, extra notes).
- **User Accounts:** JWT authentication, user profiles, and avatar uploads.
- **Economy:** Coin wallet system with mock in-app purchases.
- **Personalization (Settings):** 
  - Language (Persian / English)
  - Display mode (Numbers / Note Names)
  - Adjustable note fall speed, note size, and master volume
  - Custom UI fonts
- **Responsive Design:** Fully modular and scaled across all mobile devices and screen sizes.

## Project Structure

```text
panmaster/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── levels.py
│   │   └── database.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── css/
    ├── js/
    └── assets/
        ├── sounds/   # Custom WAV files (1.wav to 8.wav, D.wav)
        └── avatars/
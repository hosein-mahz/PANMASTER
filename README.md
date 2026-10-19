# PanMaster

A cross-platform handpan learning and play ecosystem built with FastAPI, SQLite, and vanilla JavaScript.

## Overview

PanMaster is a web-based application designed to make handpan practice engaging and accessible. It combines an interactive canvas-based instrument with game-like practice modes, a coin-based reward system, and user accounts — all wrapped in a lightweight, mobile-friendly interface.

The project is currently under active development.

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Authentication:** JWT (PBKDF2-SHA256)
- **Frontend:** Vanilla HTML / CSS / JavaScript (Canvas API, Web Audio API)
- **Architecture:** Decoupled backend and frontend, RESTful API

## Features

- Interactive handpan canvas with multi-touch support
- Polyphonic synthesis via Web Audio API
- Practice modes with scoring, accuracy tracking, and coin rewards
- User registration and login with JWT authentication
- Coin wallet system with in-app transactions
- Responsive layout across devices and browsers
- User profile and wallet pages

## Project Structure
panmaster/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── auth.py
│ │ └── database.py
│ └── requirements.txt
└── frontend/
├── index.html
├── css/
├── js/
└── assets/

text

## Getting Started

### Prerequisites

- Python 3.10+
- A modern web browser

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
Serve the frontend/ directory through the FastAPI app (already configured) and open the app in your browser.

Roadmap
☑ Core handpan canvas and audio engine
☑ Practice mode with scoring and coin rewards
☑ JWT authentication and user accounts
☑ Coin wallet and profile pages
□ Ad system and VIP gating
□ Song editor (API + UI)
□ Pitch detection (YIN) for real-instrument play
□ Android packaging (Capacitor / PWA)

# PanMaster Project Context

## 1. Tech Stack
- **Backend:** FastAPI (Python), SQLAlchemy ORM, SQLite.
- **Frontend:** Vanilla HTML/CSS/JS. Main files: `index.html`, `js/game-engine.js`.
- **Auth:** JWT (`pm_token` in localStorage).
- **APIs:** Canvas API, Web Audio API.

## 2. CRITICAL RULES
- **DB Rule:** When `models.py` is modified, YOU MUST delete `backend/panmaster.db` and restart Uvicorn.
- **Code Editing Rule:** `game-engine.js` is huge. DO NOT rewrite the whole file. Make targeted, minimal edits.
- **Canvas:** Size is 820x500, center is (410, 250).
- **Language:** ALWAYS respond in Persian (Farsi).

## 3. Current State
- Themes (Dark/Light), 3D buttons, Accordions, Avatar/Skin galleries.
- Server error on saving theme was fixed by adding `theme` to `schemas.py`.
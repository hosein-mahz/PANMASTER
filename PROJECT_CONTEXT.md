# PanMaster Project Context

## 1. Tech Stack
- **Backend:** FastAPI (Python), SQLAlchemy ORM, SQLite database.
- **Authentication:** JWT (JSON Web Tokens). Stored in `localStorage` as `pm_token`.
- **Frontend:** Vanilla HTML/CSS/JavaScript (No frameworks like React). Main files: `frontend/index.html`, `frontend/js/game-engine.js`.
- **APIs Used:** Canvas API (for drawing), Web Audio API (for sound).

## 2. CRITICAL RULES & GOTCHAS
- **DB Rule:** Whenever `backend/app/models.py` is modified, YOU MUST delete `backend/panmaster.db` and restart Uvicorn.
- **Code Editing Rule:** `game-engine.js` is a huge file (~1000 lines). **DO NOT rewrite the whole file.** Provide targeted, minimal code snippets.
- **Canvas Coordinates:** The canvas size is `820x500`. Center is `(410, 250)`.
- **Language:** ALWAYS respond to the user in Persian (Farsi).

## 3. Current State
- Themes (Dark/Light), 3D buttons, Accordion settings, Avatar/Skin galleries, and VIP system are fully implemented.
- Server error on saving theme was fixed by adding `theme` to `schemas.py`.
- `register` function was fixed to auto-login without `alert`.
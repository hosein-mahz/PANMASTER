import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from . import models, database
from .routers import users

# ساخت جداول دیتابیس در صورت وجود نداشتن
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["Users"])

# پیدا کردن مسیر پوشه frontend به صورت خودکار
# ساختار: PanMaster/backend/app/main.py  ->  PanMaster/frontend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# سرو کردن فایل‌های استاتیک
app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")

# 🔴 این خط جدیده: سرو کردن پوشه assets (برای فایل سکه)
app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")


@app.get("/")
def serve_home():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))


@app.get("/login")
def serve_login():
    """
    (اختیاری) اگه خواستی صفحه‌ی login.html جدا رو هم داشته باشی.
    اگه از login.html استفاده نمی‌کنی، این بخش رو می‌تونی حذف کنی.
    """
    login_path = os.path.join(FRONTEND_DIR, "login.html")
    if os.path.exists(login_path):
        return FileResponse(login_path)
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
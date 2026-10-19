from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# خواندن اطلاعات از فایل .env
load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./panmaster.db")

# تنظیمات مخصوص SQLite (برای اجرای همزمان درخواست‌ها)
connect_args = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# تابعی برای دریافت دیتابیس در مسیرهای API
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
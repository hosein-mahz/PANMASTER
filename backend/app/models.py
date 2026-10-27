from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    coins = Column(Integer, default=0)
    xp = Column(Integer, default=0, nullable=False)
    owned_skins = Column(String, default="[]", nullable=False)
    extra_notes = Column(Integer, default=0, nullable=False)
    is_vip = Column(Boolean, default=False)
    vip_expire_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # ===== تنظیمات =====
    language = Column(String, default="fa", nullable=False)
    fall_speed = Column(Integer, default=200, nullable=False)        # 100-500
    note_size = Column(Float, default=1.0, nullable=False)           # 0.7-1.5
    font_family = Column(String, default="Vazirmatn", nullable=False)
    sound_volume = Column(Float, default=0.5, nullable=False)        # 0-1
    note_display_mode = Column(String, default="number", nullable=False) # عدد، اسم
    active_skin = Column(String, default="default", nullable=False)
    calibration_data = Column(String, default="{}", nullable=False)
    avatar_url = Column(String, nullable=True)


class Song(Base):
    __tablename__ = "songs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    artist = Column(String, nullable=True)
    difficulty = Column(String, default="Easy")
    notes_data = Column(JSON, nullable=False)
    is_premium = Column(Boolean, default=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    is_public = Column(Boolean, default=True)


class Instrument(Base):
    __tablename__ = "instruments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    root_note = Column(String, nullable=False)
    keys_config = Column(JSON, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    is_public = Column(Boolean, default=True)


class Purchase(Base):
    __tablename__ = "purchases"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    item_type = Column(String, nullable=False)
    item_id = Column(Integer, nullable=True)
    amount_paid = Column(Integer, nullable=False)
    gateway_ref = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PracticeHistory(Base):
    __tablename__ = "practice_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    song_id = Column(Integer, ForeignKey("songs.id"), nullable=True)
    score = Column(Integer, default=0)
    accuracy = Column(Float, default=0.0)
    played_at = Column(DateTime(timezone=True), server_default=func.now())
    mode = Column(String, default="falling", nullable=False)


class CoinTransaction(Base):
    __tablename__ = "coin_transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    type = Column(String, nullable=False)
    description = Column(String, nullable=True)
    accuracy = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


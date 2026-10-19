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
    is_vip = Column(Boolean, default=False)
    vip_expire_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


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
    song_id = Column(Integer, ForeignKey("songs.id"), nullable=False)
    score = Column(Integer, default=0)
    accuracy = Column(Float, default=0.0)
    played_at = Column(DateTime(timezone=True), server_default=func.now())


class CoinTransaction(Base):
    __tablename__ = "coin_transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    type = Column(String, nullable=False)
    description = Column(String, nullable=True)
    accuracy = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List


# ===== User =====
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    coins: int
    xp: int
    level: int
    level_name: str
    xp_in_level: int
    xp_needed: int
    progress_percent: float
    owned_skins: List[str] = []
    extra_notes: int = 0
    avatar_url: Optional[str] = None
    language: str = "fa"
    fall_speed: int = 200
    note_size: float = 1.0
    font_family: str = "Vazirmatn"
    sound_volume: float = 0.5


# ===== Token =====
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


# ===== Profile Update =====
class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None

class ProfileUpdateResponse(BaseModel):
    message: str
    access_token: Optional[str] = None  # اگر ایمیل تغییر کرد، توکن جدید
    username: str
    email: str


# ===== Password Change =====
class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=6)


# ===== Settings =====
class SettingsUpdate(BaseModel):
    language: Optional[str] = None
    fall_speed: Optional[int] = Field(None, ge=100, le=500)
    note_size: Optional[float] = Field(None, ge=0.7, le=1.5)
    font_family: Optional[str] = None
    sound_volume: Optional[float] = Field(None, ge=0.0, le=1.0)

class SettingsOut(BaseModel):
    language: str
    fall_speed: int
    note_size: float
    font_family: str
    sound_volume: float


# ===== Buy Coins =====
class BuyCoinsRequest(BaseModel):
    package_id: str

class BuyCoinsResponse(BaseModel):
    message: str
    coins_added: int
    new_balance: int


# ===== Tokens (legacy) =====
class TokenAmount(BaseModel):
    amount: int

class TokenBalance(BaseModel):
    new_balance: int


# ===== Game Reward =====
class GameRewardInput(BaseModel):
    tokens_earned: int
    accuracy: float
    score: int = 0

class GameRewardResponse(BaseModel):
    new_balance: int
    xp_gained: int
    total_xp: int
    level: int
    level_name: str
    leveled_up: bool
    rewards_granted: List[dict] = []
    xp_in_level: int
    xp_needed: int
    progress_percent: float


# ===== Song =====
class SongBase(BaseModel):
    title: str
    artist: Optional[str] = None
    difficulty: Optional[str] = "Easy"

class SongCreate(SongBase):
    notes_data: dict

class SongOut(SongBase):
    id: int
    class Config:
        from_attributes = True


# ===== Instrument =====
class InstrumentBase(BaseModel):
    name: str
    root_note: str

class InstrumentOut(InstrumentBase):
    id: int
    class Config:
        from_attributes = True


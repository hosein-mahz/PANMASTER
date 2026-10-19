from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

UserResponse_unused = None  # placeholder if needed


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    coins: int
    is_vip: bool
    vip_expire_date: Optional[datetime] = None
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class AddTokensRequest(BaseModel):
    amount: int
    accuracy: Optional[float] = None


class CoinTransactionResponse(BaseModel):
    id: int
    amount: int
    type: str
    description: Optional[str] = None
    accuracy: Optional[float] = None
    created_at: datetime
    class Config:
        from_attributes = True


class ProfileStats(BaseModel):
    total_games: int
    best_accuracy: float
    total_coins_earned: int
    total_coins_spent: int
    member_since: Optional[datetime] = None
    vip_active: bool
    vip_expire: Optional[datetime] = None


class SongCreate(BaseModel):
    title: str
    artist: Optional[str] = None
    difficulty: str
    notes_data: List[Dict[str, Any]]
    is_premium: bool = False
    is_public: bool = True


class SongResponse(BaseModel):
    id: int
    title: str
    artist: Optional[str]
    difficulty: str
    is_premium: bool
    created_by: Optional[int]
    class Config:
        from_attributes = True


class InstrumentCreate(BaseModel):
    name: str
    root_note: str
    keys_config: Dict[str, Any]
    is_public: bool = True


class PurchaseCreate(BaseModel):
    item_type: str
    item_id: Optional[int] = None
    amount_paid: int
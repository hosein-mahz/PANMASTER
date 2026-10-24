import json
import os
import uuid
from datetime import datetime, timedelta
from typing import Optional, Annotated

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from . import models, schemas, database
from .levels import get_level_from_xp, get_level_name, get_xp_progress, LEVEL_REWARDS


# ===== تنظیمات =====
SECRET_KEY = "YOUR_SECRET_KEY_HERE"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

# مسیر ذخیره‌ی آواتارها
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")
AVATARS_DIR = os.path.join(FRONTEND_DIR, "assets", "avatars")
os.makedirs(AVATARS_DIR, exist_ok=True)

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")

router = APIRouter(prefix="/api/users", tags=["users"])


# ===== بسته‌های سکه (mock) =====
COIN_PACKAGES = {
    "starter":  {"coins": 100,  "price": "$0.99",  "name": "بسته شروع"},
    "standard": {"coins": 500,  "price": "$4.99",  "name": "بسته استاندارد"},
    "premium":  {"coins": 1200, "price": "$9.99",  "name": "بسته پریمیوم"},
    "ultimate": {"coins": 3000, "price": "$19.99", "name": "بسته نهایی"},
}


# ===== توابع کمکی =====
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(database.get_db),
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user


def _build_user_out(user: models.User) -> dict:
    level = get_level_from_xp(user.xp or 0)
    level_name = get_level_name(level)
    xp_in_level, xp_needed, _ = get_xp_progress(user.xp or 0)
    progress_percent = (xp_in_level / xp_needed * 100) if xp_needed > 0 else 100.0
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "coins": user.coins or 0,
        "xp": user.xp or 0,
        "level": level,
        "level_name": level_name,
        "xp_in_level": xp_in_level,
        "xp_needed": xp_needed,
        "progress_percent": round(progress_percent, 1),
        "owned_skins": json.loads(user.owned_skins or "[]"),
        "extra_notes": user.extra_notes or 0,
        "avatar_url": user.avatar_url,
        "language": user.language or "fa",
        "fall_speed": user.fall_speed or 200,
        "note_size": user.note_size or 1.0,
        "font_family": user.font_family or "Vazirmatn",
        "sound_volume": user.sound_volume or 0.5,
        "note_display_mode": user.note_display_mode or "number",
    }


# ===== Auth =====
@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="این ایمیل قبلاً ثبت شده است")
    if db.query(models.User).filter(models.User.username == user.username).first():
        raise HTTPException(status_code=400, detail="این نام کاربری قبلاً گرفته شده است")

    new_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=get_password_hash(user.password),
        coins=50, xp=0, owned_skins="[]", extra_notes=0,
    )
    db.add(new_user); db.commit(); db.refresh(new_user)
    return _build_user_out(new_user)


@router.post("/login", response_model=schemas.Token)
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(database.get_db),
):
    user = db.query(models.User).filter(
        (models.User.username == form_data.username) | (models.User.email == form_data.username)
    ).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="نام کاربری یا رمز عبور اشتباه است",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token = create_access_token(data={"sub": user.email})
    return schemas.Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(get_current_user)):
    return _build_user_out(current_user)


# ===== Profile Update =====
@router.put("/profile", response_model=schemas.ProfileUpdateResponse)
def update_profile(
    data: schemas.ProfileUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    new_token = None
    old_email = current_user.email

    if data.username and data.username != current_user.username:
        if db.query(models.User).filter(models.User.username == data.username).first():
            raise HTTPException(status_code=400, detail="این نام کاربری قبلاً گرفته شده")
        current_user.username = data.username

    if data.email and data.email != current_user.email:
        if db.query(models.User).filter(models.User.email == data.email).first():
            raise HTTPException(status_code=400, detail="این ایمیل قبلاً ثبت شده")
        current_user.email = data.email
        # چون JWT بر اساس ایمیل است، توکن جدید می‌سازیم
        new_token = create_access_token(data={"sub": data.email})

    db.commit(); db.refresh(current_user)

    return schemas.ProfileUpdateResponse(
        message="پروفایل با موفقیت به‌روز شد",
        access_token=new_token,
        username=current_user.username,
        email=current_user.email,
    )


# ===== Password Change =====
@router.put("/password")
def change_password(
    data: schemas.PasswordChange,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    if not verify_password(data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="رمز فعلی اشتباه است")
    current_user.password_hash = get_password_hash(data.new_password)
    db.commit()
    return {"message": "رمز عبور با موفقیت تغییر کرد"}


# ===== Settings =====
@router.put("/settings", response_model=schemas.SettingsOut)
def update_settings(
    data: schemas.SettingsUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    if data.language is not None: current_user.language = data.language
    if data.fall_speed is not None: current_user.fall_speed = data.fall_speed
    if data.note_size is not None: current_user.note_size = data.note_size
    if data.font_family is not None: current_user.font_family = data.font_family
    if data.sound_volume is not None: current_user.sound_volume = data.sound_volume
    if data.note_display_mode is not None: current_user.note_display_mode = data.note_display_mode
    db.commit(); db.refresh(current_user)
    return schemas.SettingsOut(
        language=current_user.language,
        fall_speed=current_user.fall_speed,
        note_size=current_user.note_size,
        font_family=current_user.font_family,
        sound_volume=current_user.sound_volume,
        note_display_mode=current_user.note_display_mode,
    )


# ===== Avatar Upload =====
@router.post("/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    # فقط تصویر
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="فقط فایل تصویری مجاز است")

    # پسوند
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".jpg", ".jpeg", ".png", ".gif", ".webp"]:
        raise HTTPException(status_code=400, detail="فرمت تصویر پشتیبانی نمی‌شود")

    # حذف آواتار قبلی
    if current_user.avatar_url:
        old_name = current_user.avatar_url.split("/")[-1].split("?")[0]
        old_path = os.path.join(AVATARS_DIR, old_name)
        if os.path.exists(old_path):
            try: os.remove(old_path)
            except: pass

    # نام فایل یکتا
    unique_name = f"user_{current_user.id}_{uuid.uuid4().hex[:8]}{ext}"
    save_path = os.path.join(AVATARS_DIR, unique_name)

    content = await file.read()
    if len(content) > 3 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="حجم تصویر باید کمتر از ۳ مگابایت باشد")

    with open(save_path, "wb") as f:
        f.write(content)

    current_user.avatar_url = f"/assets/avatars/{unique_name}"
    db.commit()

    return {"message": "آواتار آپلود شد", "avatar_url": current_user.avatar_url}


# ===== Buy Coins (mock) =====
@router.get("/coin-packages")
def get_coin_packages():
    return [
        {"id": pid, **info}
        for pid, info in COIN_PACKAGES.items()
    ]


@router.post("/buy-coins", response_model=schemas.BuyCoinsResponse)
def buy_coins(
    data: schemas.BuyCoinsRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    pkg = COIN_PACKAGES.get(data.package_id)
    if not pkg:
        raise HTTPException(status_code=404, detail="بسته پیدا نشد")

    # ⚠️ اینجا باید درگاه پرداخت واقعی وصل شود — فعلاً mock
    current_user.coins = (current_user.coins or 0) + pkg["coins"]

    purchase = models.Purchase(
        user_id=current_user.id,
        item_type="coins",
        amount_paid=pkg["coins"],
        gateway_ref=f"MOCK-{uuid.uuid4().hex[:12]}",
    )
    db.add(purchase)
    db.commit(); db.refresh(current_user)

    return schemas.BuyCoinsResponse(
        message=f"{pkg['coins']} سکه به حساب شما اضافه شد",
        coins_added=pkg["coins"],
        new_balance=current_user.coins,
    )


# ===== Game Reward =====
@router.post("/game-reward", response_model=schemas.GameRewardResponse)
def game_reward(
    reward: schemas.GameRewardInput,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    if reward.tokens_earned > 0:
        current_user.coins = (current_user.coins or 0) + reward.tokens_earned

    xp_gained = 0
    if reward.accuracy >= 80:
        xp_gained = 20
        current_user.xp = (current_user.xp or 0) + xp_gained

    old_level = get_level_from_xp((current_user.xp or 0) - xp_gained)
    new_level = get_level_from_xp(current_user.xp or 0)

    rewards_granted = []
    if new_level > old_level:
        for lvl in range(old_level + 1, new_level + 1):
            reward_info = LEVEL_REWARDS.get(lvl)
            if not reward_info: continue
            rtype = reward_info.get("type")
            if rtype == "coins":
                current_user.coins = (current_user.coins or 0) + reward_info.get("amount", 0)
            elif rtype == "handpan_skin":
                skins = json.loads(current_user.owned_skins or "[]")
                sid = reward_info.get("id")
                if sid and sid not in skins:
                    skins.append(sid); current_user.owned_skins = json.dumps(skins)
            elif rtype == "handpan_notes":
                current_user.extra_notes = (current_user.extra_notes or 0) + reward_info.get("extra", 1)
                if reward_info.get("coins"):
                    current_user.coins = (current_user.coins or 0) + reward_info.get("amount", 0)
            rewards_granted.append({"level": lvl, **reward_info})

    db.commit(); db.refresh(current_user)

    level = get_level_from_xp(current_user.xp or 0)
    xp_in_level, xp_needed, _ = get_xp_progress(current_user.xp or 0)
    progress_percent = (xp_in_level / xp_needed * 100) if xp_needed > 0 else 100.0

    return schemas.GameRewardResponse(
        new_balance=current_user.coins or 0,
        xp_gained=xp_gained,
        total_xp=current_user.xp or 0,
        level=level,
        level_name=get_level_name(level),
        leveled_up=new_level > old_level,
        rewards_granted=rewards_granted,
        xp_in_level=xp_in_level,
        xp_needed=xp_needed,
        progress_percent=round(progress_percent, 1),
    )


# ===== Legacy =====
@router.post("/add-tokens", response_model=schemas.TokenBalance)
def add_tokens(amount: schemas.TokenAmount, current_user: models.User = Depends(get_current_user),
               db: Session = Depends(database.get_db)):
    if amount.amount <= 0: raise HTTPException(400, "مقدار باید مثبت باشد")
    current_user.coins = (current_user.coins or 0) + amount.amount
    db.commit(); db.refresh(current_user)
    return schemas.TokenBalance(new_balance=current_user.coins)


@router.post("/spend-tokens", response_model=schemas.TokenBalance)
def spend_tokens(amount: schemas.TokenAmount, current_user: models.User = Depends(get_current_user),
                 db: Session = Depends(database.get_db)):
    if amount.amount <= 0: raise HTTPException(400, "مقدار باید مثبت باشد")
    if (current_user.coins or 0) < amount.amount: raise HTTPException(400, "سکه کافی نیست")
    current_user.coins = (current_user.coins or 0) - amount.amount
    db.commit(); db.refresh(current_user)
    return schemas.TokenBalance(new_balance=current_user.coins)
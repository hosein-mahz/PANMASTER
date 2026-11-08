import json
import uuid
from datetime import datetime, timedelta
from typing import Optional, Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from . import models, schemas, database
from .levels import get_level_from_xp, get_level_name, get_xp_progress, LEVEL_REWARDS
load_dotenv()

# ===== تنظیمات =====
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-insecure-key-change-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7


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

# ===== قیمت‌گذاری آواتارها و اسکین‌ها =====
# قیمت آواتارها (آواتارهای 1 تا 4 رایگان هستند)
AVATAR_PRICES = {
    "1": 0, "2": 0, "3": 0, "4": 0,     # رایگان
    "5": 50, "6": 50, "7": 100, "8": 100, # متوسط
    "9": 150, "10": 150, "11": 200, "12": 200 # گران‌قیمت
}

# قیمت اسکین‌ها (هر اسکینی که اینجا نباشه، یعنی از طریق لول‌آپ به دست میاد)
SKIN_PRICES = {
    "wood": 150,
    "silver": 200,
    "gold": 300,
    "rainbow": 500,
    "marble": 400,
    "ice_blue": 350,
    "bronze": 250,
    "turquoise": 600,
    "dark": 800,
    "royal": 1000
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
        "owned_avatars": json.loads(user.owned_avatars or '["1", "2", "3", "4"]'),
        "highlighted_avatars": json.loads(user.highlighted_avatars or "[]"),
        "extra_notes": user.extra_notes or 0,
        "selected_avatar": user.selected_avatar or "default",
        "language": user.language or "fa",
        "fall_speed": user.fall_speed or 200,
        "note_size": user.note_size or 1.0,
        "font_family": user.font_family or "Vazirmatn",
        "sound_volume": user.sound_volume or 0.5,
        "note_display_mode": user.note_display_mode or "number",
        "active_skin": user.active_skin or "default",
        "is_vip": bool(user.is_vip and user.vip_expire_date and user.vip_expire_date > datetime.utcnow()),
        "vip_expire_date": user.vip_expire_date.isoformat() if user.vip_expire_date else None,
        "theme": user.theme or "dark",
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
    if data.theme is not None: current_user.theme = data.theme
    if data.fall_speed is not None: current_user.fall_speed = data.fall_speed
    if data.note_size is not None: current_user.note_size = data.note_size
    if data.font_family is not None: current_user.font_family = data.font_family
    if data.sound_volume is not None: current_user.sound_volume = data.sound_volume
    if data.note_display_mode is not None: current_user.note_display_mode = data.note_display_mode
    if data.active_skin is not None: current_user.active_skin = data.active_skin
    if data.selected_avatar is not None: 
        # 👇 اعتبارسنجی آواتار (فقط آدرس‌های http یا آواتارهای پیش‌فرض مجازند)
        is_valid = data.selected_avatar.startswith("http") or data.selected_avatar == "default" or data.selected_avatar in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        if is_valid:
            current_user.selected_avatar = data.selected_avatar
        else:
            raise HTTPException(status_code=400, detail="آدرس آواتار نامعتبر است")
        
    db.commit(); db.refresh(current_user)
    return schemas.SettingsOut(
        language=current_user.language,
        fall_speed=current_user.fall_speed,
        note_size=current_user.note_size,
        font_family=current_user.font_family,
        sound_volume=current_user.sound_volume,
        note_display_mode=current_user.note_display_mode,
        active_skin=current_user.active_skin,
        selected_avatar=current_user.selected_avatar,
        theme=current_user.theme,
    )


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
    # 👇 ۱. اعتبارسنجی دقت (بین ۰ تا ۱۰۰)
    acc = max(0, min(100, reward.accuracy))
    
    # 👇 ۲. محاسبه سکه در بک‌اند (نه اعتماد به کلاینت)
    if acc >= 75:
        earned = 15
        xp_gained = 20
    elif acc >= 50:
        earned = 10
        xp_gained = 0
    elif acc >= 25:
        earned = 0
        xp_gained = 0
    else:
        earned = -5
        xp_gained = 0

    # ۳. اعمال سکه
    current_user.coins = (current_user.coins or 0) + earned
    if current_user.coins < 0:
        current_user.coins = 0 

    # ۴. اعمال XP
    if xp_gained > 0:
        current_user.xp = (current_user.xp or 0) + xp_gained

    # ۵. بررسی Level-up
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

@router.post("/practice-history", response_model=schemas.PracticeHistoryOut)
def save_practice_history(data: schemas.PracticeHistoryCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    entry = models.PracticeHistory(user_id=current_user.id, mode=data.mode, score=data.score, accuracy=data.accuracy)
    db.add(entry); db.commit(); db.refresh(entry)
    return entry

@router.get("/practice-history", response_model=List[schemas.PracticeHistoryOut])
def get_practice_history(limit: int = 10, current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    return db.query(models.PracticeHistory).filter(models.PracticeHistory.user_id == current_user.id).order_by(models.PracticeHistory.played_at.desc()).limit(limit).all()

# ===== Calibration =====
@router.post("/calibration")
def save_calibration(
    data: schemas.CalibrationSubmit,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    calibration = {
        "notes": data.notes,
        "calibrated_at": datetime.utcnow().isoformat()
    }
    current_user.calibration_data = json.dumps(calibration)
    db.commit()
    return {"message": "کالیبراسیون ذخیره شد", "calibration": calibration}


@router.get("/calibration")
def get_calibration(current_user: models.User = Depends(get_current_user)):
    try:
        return json.loads(current_user.calibration_data or "{}")
    except:
        return {}


@router.delete("/calibration")
def reset_calibration(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    current_user.calibration_data = "{}"
    db.commit()
    return {"message": "کالیبراسیون پاک شد"}

# ===== Buy Avatar =====
@router.post("/buy-avatar", response_model=schemas.TokenBalance)
def buy_avatar(
    data: schemas.AvatarPurchase,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    # خواندن قیمت از دیکشنری
    cost = AVATAR_PRICES.get(data.avatar_id, 50) # اگر پیدا نشد، پیش‌فرض 50
    if data.avatar_id == "random": cost = 20

    if current_user.coins < cost:
        raise HTTPException(status_code=400, detail="سکه کافی نیست")

    avatars = json.loads(current_user.owned_avatars or '["1", "2", "3", "4"]')
    highlighted = json.loads(current_user.highlighted_avatars or "[]")

    if data.avatar_id.startswith("http"):
        random_list = [a for a in avatars if a.startswith("http")]
        if len(random_list) >= 5:
            unhighlighted = [a for a in random_list if a not in highlighted]
            if not unhighlighted:
                raise HTTPException(status_code=400, detail="همه ۵ آواتار رندوم شما هایلایت شده‌اند.")
            oldest = unhighlighted[0]
            avatars.remove(oldest)

    if data.avatar_id not in avatars:
        avatars.append(data.avatar_id)

    current_user.coins -= cost
    current_user.owned_avatars = json.dumps(avatars)
    db.commit()
    return schemas.TokenBalance(new_balance=current_user.coins)

 # ____هایلایت/انهایلایت_______

@router.post("/toggle-highlight")
def toggle_highlight(
    data: schemas.HighlightToggle,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    avatars = json.loads(current_user.owned_avatars or "[]")
    highlighted = json.loads(current_user.highlighted_avatars or "[]")

    if data.avatar_url not in avatars:
        raise HTTPException(status_code=400, detail="این آواتار را ندارید")

    if data.avatar_url in highlighted:
        highlighted.remove(data.avatar_url)
    else:
        highlighted.append(data.avatar_url)

    current_user.highlighted_avatars = json.dumps(highlighted)
    db.commit()
    return {"highlighted": data.avatar_url in highlighted, "highlighted_avatars": highlighted}

@router.post("/delete-avatar")
def delete_avatar(
    data: schemas.HighlightToggle,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    avatars = json.loads(current_user.owned_avatars or "[]")
    highlighted = json.loads(current_user.highlighted_avatars or "[]")

    if data.avatar_url not in avatars:
        raise HTTPException(status_code=400, detail="این آواتار در لیست شما وجود ندارد")

    # حذف از لیست آواتارها و هایلایت‌ها
    avatars.remove(data.avatar_url)
    if data.avatar_url in highlighted:
        highlighted.remove(data.avatar_url)

    current_user.owned_avatars = json.dumps(avatars)
    current_user.highlighted_avatars = json.dumps(highlighted)

    # اگر این آواتار در حال حاضر انتخاب شده بود، به حالت پیش‌فرض برگردون
    if current_user.selected_avatar == data.avatar_url:
        current_user.selected_avatar = "default"

    db.commit()
    return {"message": "آواتار با موفقیت حذف شد"}

# ===== Buy Skin =====
@router.post("/buy-skin", response_model=schemas.TokenBalance)
def buy_skin(
    data: schemas.SkinPurchase,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    cost = SKIN_PRICES.get(data.skin_id)
    if cost is None:
        raise HTTPException(status_code=400, detail="این اسکین قابل خرید نیست")

    if current_user.coins < cost:
        raise HTTPException(status_code=400, detail="سکه کافی نیست")

    skins = json.loads(current_user.owned_skins or "[]")
    if data.skin_id not in skins:
        skins.append(data.skin_id)
        current_user.owned_skins = json.dumps(skins)

    current_user.coins -= cost
    db.commit()
    return schemas.TokenBalance(new_balance=current_user.coins)

# ===== Buy VIP =====
@router.post("/buy-vip", response_model=schemas.TokenBalance)
def buy_vip(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    cost = 1000
    if current_user.coins < cost:
        raise HTTPException(status_code=400, detail="سکه کافی نیست (نیاز به ۱۰۰۰ سکه)")

    # کسر سکه
    current_user.coins -= cost
    
    # تنظیم وضعیت VIP برای ۳۰ روز
    current_user.is_vip = True
    current_user.vip_expire_date = datetime.utcnow() + timedelta(days=30)

    db.commit()
    return schemas.TokenBalance(new_balance=current_user.coins)

# ==========================================
# 🛑 DEVELOPMENT ONLY - REMOVE BEFORE PRODUCTION 🛑
# ==========================================
@router.post("/dev/toggle-vip")
def dev_toggle_vip(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    if current_user.is_vip:
        current_user.is_vip = False
        current_user.vip_expire_date = None
    else:
        current_user.is_vip = True
        current_user.vip_expire_date = datetime.utcnow() + timedelta(days=30)
    
    db.commit()
    return {"message": "VIP toggled", "is_vip": current_user.is_vip}
# ==========================================
# 🛑 DEVELOPMENT ONLY - REMOVE BEFORE PRODUCTION 🛑
# ==========================================

# ===== Songs =====
@router.post("/songs", response_model=schemas.SongOut)
def create_song(
    data: schemas.SongCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    song = models.Song(
        title=data.title,
        artist=data.artist,
        difficulty=data.difficulty,
        notes_data=data.notes_data,
        is_public=data.is_public,
        created_by=current_user.id,
    )
    db.add(song)
    db.commit()
    db.refresh(song)
    return song


@router.get("/songs", response_model=List[schemas.SongOut])
def list_songs(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db),
):
    return db.query(models.Song).filter(models.Song.created_by == current_user.id).all()
# ==========================================
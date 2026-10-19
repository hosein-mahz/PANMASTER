from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from datetime import datetime, timedelta

from .. import models, schemas, auth, database

router = APIRouter()


def log_coin_transaction(db: Session, user_id: int, amount: int,
                         type_: str, description: str = None, accuracy: float = None):
    db.add(models.CoinTransaction(
        user_id=user_id, amount=amount, type=type_,
        description=description, accuracy=accuracy
    ))


@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    existing = db.query(models.User).filter(
        or_(models.User.email == user.email, models.User.username == user.username)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="ایمیل یا نام کاربری قبلاً ثبت شده")

    new_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=auth.get_password_hash(user.password),
        coins=50,
    )
    db.add(new_user)
    db.flush()

    log_coin_transaction(db, new_user.id, 50, "register_bonus", "هدیه ثبت‌نام")

    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(
        or_(models.User.email == form_data.username,
            models.User.username == form_data.username)
    ).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="ایمیل/نام کاربری یا رمز عبور اشتباه است")

    token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.UserResponse)
def me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


@router.post("/add-tokens")
def add_tokens(payload: schemas.AddTokensRequest,
               user: models.User = Depends(auth.get_current_user),
               db: Session = Depends(database.get_db)):
    user.coins += payload.amount
    log_coin_transaction(db, user.id, payload.amount, "game_reward",
                         "پاداش بازی", accuracy=payload.accuracy)
    db.commit()
    db.refresh(user)
    return {"new_balance": user.coins}


@router.post("/spend-tokens")
def spend_tokens(payload: schemas.AddTokensRequest,
                 user: models.User = Depends(auth.get_current_user),
                 db: Session = Depends(database.get_db)):
    if user.coins < payload.amount:
        raise HTTPException(status_code=400, detail="سکه کافی نیست")
    user.coins -= payload.amount
    log_coin_transaction(db, user.id, -payload.amount, "game_entry", "ورود به مرحله تستی")
    db.commit()
    db.refresh(user)
    return {"new_balance": user.coins}


# ===== WALLET =====
COIN_PACKAGES = {
    "small":  {"coins": 100,  "price_toman": 10_000},
    "medium": {"coins": 500,  "price_toman": 45_000},
    "large":  {"coins": 1000, "price_toman": 80_000},
}
VIP_PRICE_TOMAN = 50_000
VIP_DURATION_DAYS = 30


@router.get("/wallet/transactions", response_model=list[schemas.CoinTransactionResponse])
def get_wallet_transactions(limit: int = 50,
                            user: models.User = Depends(auth.get_current_user),
                            db: Session = Depends(database.get_db)):
    # 🆕 تغییر: هدیه ثبت‌نام (۵۰ سکه اول) از تاریخچه کیف پول حذف میشه
    return (db.query(models.CoinTransaction)
              .filter(models.CoinTransaction.user_id == user.id,
                      models.CoinTransaction.type != "register_bonus")
              .order_by(models.CoinTransaction.created_at.desc())
              .limit(limit).all())


@router.post("/wallet/buy-coins")
def buy_coins(package_id: str,
              user: models.User = Depends(auth.get_current_user),
              db: Session = Depends(database.get_db)):
    pkg = COIN_PACKAGES.get(package_id)
    if not pkg:
        raise HTTPException(status_code=400, detail="بسته نامعتبر")
    user.coins += pkg["coins"]
    log_coin_transaction(db, user.id, pkg["coins"], "iap_purchase",
                         f"خرید {pkg['coins']} سکه - {pkg['price_toman']:,} تومان")
    db.add(models.Purchase(user_id=user.id, item_type="coins",
                           amount_paid=pkg["price_toman"], gateway_ref="sandbox"))
    db.commit()
    db.refresh(user)
    return {"new_balance": user.coins}


@router.post("/wallet/buy-vip")
def buy_vip(user: models.User = Depends(auth.get_current_user),
            db: Session = Depends(database.get_db)):
    now = datetime.utcnow()
    if user.is_vip and user.vip_expire_date and user.vip_expire_date > now:
        user.vip_expire_date = user.vip_expire_date + timedelta(days=VIP_DURATION_DAYS)
    else:
        user.is_vip = True
        user.vip_expire_date = now + timedelta(days=VIP_DURATION_DAYS)
    log_coin_transaction(db, user.id, 0, "vip_purchase",
                         f"خرید VIP - {VIP_PRICE_TOMAN:,} تومان - {VIP_DURATION_DAYS} روز")
    db.add(models.Purchase(user_id=user.id, item_type="vip",
                           amount_paid=VIP_PRICE_TOMAN, gateway_ref="sandbox"))
    db.commit()
    db.refresh(user)
    return {"is_vip": user.is_vip, "vip_expire": user.vip_expire_date}


@router.get("/profile/stats", response_model=schemas.ProfileStats)
def get_profile_stats(user: models.User = Depends(auth.get_current_user),
                      db: Session = Depends(database.get_db)):
    total_games = (db.query(func.count(models.CoinTransaction.id))
                     .filter(models.CoinTransaction.user_id == user.id,
                             models.CoinTransaction.type == "game_entry")
                     .scalar()) or 0
    best_acc = (db.query(func.max(models.CoinTransaction.accuracy))
                  .filter(models.CoinTransaction.user_id == user.id,
                          models.CoinTransaction.accuracy.isnot(None))
                  .scalar()) or 0.0
    # 🆕 تغییر: مجموع سکه‌های کسب‌شده فقط از بازی و خرید (نه هدیه ثبت‌نام)
    earned = (db.query(func.coalesce(func.sum(models.CoinTransaction.amount), 0))
                .filter(models.CoinTransaction.user_id == user.id,
                        models.CoinTransaction.amount > 0,
                        models.CoinTransaction.type != "register_bonus")
                .scalar()) or 0
    spent_raw = (db.query(func.coalesce(func.sum(models.CoinTransaction.amount), 0))
                   .filter(models.CoinTransaction.user_id == user.id,
                           models.CoinTransaction.amount < 0)
                   .scalar()) or 0
    vip_active = bool(user.is_vip and user.vip_expire_date
                      and user.vip_expire_date > datetime.utcnow())
    return schemas.ProfileStats(
        total_games=int(total_games),
        best_accuracy=float(best_acc),
        total_coins_earned=int(earned),
        total_coins_spent=int(abs(spent_raw)),
        member_since=user.created_at,
        vip_active=vip_active,
        vip_expire=user.vip_expire_date,
    )
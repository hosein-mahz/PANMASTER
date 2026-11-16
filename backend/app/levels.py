# backend/app/levels.py

# ===== آستانه‌های XP برای ۳۰ مرحله =====
XP_THRESHOLDS = [
    0, 80, 160, 260, 400, 680, 980, 1200, 1680, 2100,
    2600, 3160, 3900, 4800, 5600, 6600, 7800, 8900, 10000, 11200,
    12400, 13600, 14800, 16000, 17000, 18500, 20000, 22300, 23800, 26000,
]

# ===== نام‌های مراحل =====
LEVEL_NAMES = [
    "تازه‌کار", "مبتدی", "تمرین‌کننده", "کوشا", "چابک", "همراه", "پیشرو", "سرسخت", "الهام‌بخش", "استاد ضرب",
    "نوازنده", "خنیاگر", "هنرمند", "خلاق", "حرفه‌ای", "ماهر", "برتر", "افسانه‌جو", "نخبه", "استاد",
    "استاد بزرگ", "افسانه", "اسطوره", "حماسه", "پهلوان", "جاودان", "خردمند", "یگانه", "بی‌همتا", "حکیم اعظم",
]

# ===== جوایز هر مرحله =====
LEVEL_REWARDS = {
    # --- شروع بازی ---
    2:  {"type": "coins", "amount": 5,    "name": "۵ سکه"},
    3:  {"type": "handpan_skin", "id": "wood", "name": "اسکین چوبی"},
    4:  {"type": "song_discount", "name": "تخفیف ۲۵٪ ساخت آهنگ"},
    5:  {"type": "coins", "amount": 15,   "name": "۱۵ سکه"},
    6:  {"type": "wallet_discount", "name": "تخفیف ۲۵٪ خرید سکه"},
    7:  {"type": "handpan_skin", "id": "silver", "name": "اسکین نقره‌ای"},
    8:  {"type": "avatar_discount", "name": "تخفیف ۲۵٪ خرید آواتار"},
    9:  {"type": "coins", "amount": 30,   "name": "۳۰ سکه"},
    
    # --- اولین الماس ---
    10: {"type": "diamonds", "amount": 1, "name": "۱ الماس"},
    
    # --- میان بازی ---
    11: {"type": "vip_discount", "name": "تخفیف ۲۵٪ خرید VIP"},
    12: {"type": "handpan_skin", "id": "gold", "name": "اسکین طلایی"},
    13: {"type": "song_discount", "name": "تخفیف ۲۵٪ ساخت آهنگ"},
    14: {"type": "coins", "amount": 50,   "name": "۵۰ سکه"},
    15: {"type": "handpan_skin", "id": "rainbow", "name": "اسکین رنگین‌کمان", "vip_only": True},
    16: {"type": "wallet_discount", "name": "تخفیف ۲۵٪ خرید سکه"},
    17: {"type": "coins", "amount": 60,   "name": "۶۰ سکه"},
    18: {"type": "avatar_discount", "name": "تخفیف ۲۵٪ خرید آواتار"},
    19: {"type": "handpan_skin", "id": "marble", "name": "اسکین مرمری", "vip_only": True},
    
    # --- دومین الماس ---
    20: {"type": "diamonds", "amount": 2, "name": "۲ الماس"},
    
    # --- بازی پیشرفته ---
    21: {"type": "vip_discount", "name": "تخفیف ۲۵٪ خرید VIP"},
    22: {"type": "handpan_skin", "id": "ice_blue", "name": "اسکین کریستال آبی", "vip_only": True},
    23: {"type": "song_discount", "name": "تخفیف ۲۵٪ ساخت آهنگ"},
    24: {"type": "coins", "amount": 100,  "name": "۱۰۰ سکه"},
    25: {"type": "handpan_skin", "id": "bronze", "name": "اسکین برنزی", "vip_only": True},
    26: {"type": "wallet_discount", "name": "تخفیف ۲۵٪ خرید سکه"},
    27: {"type": "coins", "amount": 120,  "name": "۱۲۰ سکه"},
    28: {"type": "handpan_skin", "id": "dark", "name": "اسکین تاریکی", "vip_only": True},
    29: {"type": "avatar_discount", "name": "تخفیف ۲۵٪ خرید آواتار"},
    
    # --- فینال (سومین الماس + اسکین افسانه‌ای) ---
    30: {"type": "diamonds", "amount": 3, "name": "۳ الماس + اسکین افسانه‌ای + ۳۰۰ سکه", "extra_skin": "royal", "extra_coins": 300 }
}

# ===== توابع =====
def get_level_from_xp(xp: int) -> int:
    level = 1
    for i, threshold in enumerate(XP_THRESHOLDS):
        if xp >= threshold:
            level = i + 1
        else:
            break
    return level

def get_level_name(level: int) -> str:
    if 1 <= level <= len(LEVEL_NAMES):
        return LEVEL_NAMES[level - 1]
    return "نامشخص"

def get_xp_progress(xp: int) -> tuple[int, int, int]:
    level = get_level_from_xp(xp)
    if level >= len(XP_THRESHOLDS):
        current = XP_THRESHOLDS[-1]
        return xp - current, 0, xp
    current_threshold = XP_THRESHOLDS[level - 1]
    next_threshold = XP_THRESHOLDS[level]
    in_level = xp - current_threshold
    needed = next_threshold - current_threshold
    return in_level, needed, xp

def get_league_from_level(level: int) -> str:
    if level <= 5: return "bronze"
    elif level <= 10: return "silver"
    elif level <= 15: return "gold"
    elif level <= 20: return "platinum"
    elif level <= 25: return "diamond"
    else: return "legend"
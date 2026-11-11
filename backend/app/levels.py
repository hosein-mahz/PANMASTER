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
    2:  {"type": "coins", "amount": 10,   "name": "10 سکه"},
    3:  {"type": "coins", "amount": 30,   "name": "30 سکه"},
    4:  {"type": "handpan_skin", "id": "wood",      "name": "اسکین چوبی"},
    5:  {"type": "coins", "amount": 50,  "name": "50 سکه"},
    6:  {"type": "coins", "amount": 70,  "name": "70 سکه"},
    7:  {"type": "handpan_skin", "id": "silver",    "name": "اسکین نقره‌ای"},
    8:  {"type": "coins", "amount": 70,  "name": "70 سکه"},
    9:  {"type": "coins", "amount": 100,  "name": "100 سکه"},
    10: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    11: {"type": "coins", "amount": 120,  "name": "120 سکه"},
    12: {"type": "handpan_skin", "id": "gold",      "name": "اسکین طلایی"},
    13: {"type": "coins", "amount": 300,  "name": "300 سکه"},
    14: {"type": "handpan_skin", "id": "rainbow",    "name": "اسکین رنگین‌کمان"},
    15: {"type": "handpan_skin", "id": "marble",   "name": "اسکین مرمری"},
    16: {"type": "handpan_skin", "id": "ice_blue", "name": "اسکین کریستال آبی"},
    17: {"type": "coins", "amount": 400,  "name": "400 سکه"},
    18: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    19: {"type": "handpan_skin", "id": "bronze",  "name": "اسکین برنزی"},
    20: {"type": "handpan_skin", "id": "turquoise",    "name": "اسکین فیروزه‌ای"},
    21: {"type": "coins", "amount": 500,  "name": "۵۰۰ سکه"},
    22: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    23: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    24: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    25: {"type": "coins", "amount": 600,  "name": "600 سکه"},
    26: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    27: {"type": "handpan_skin", "id": "dark",   "name": "اسکین تاریکی"},
    28: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    29: {"type": "coins", "amount": 750,  "name": "۷۵۰ سکه"},
    30: {"type": "handpan_skin", "id": "royal", "coins": True, "amount": 1000, "extra": 2, "name": "اسکین افسانه‌ای + 1000 سکه"},
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
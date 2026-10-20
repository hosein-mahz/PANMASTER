# backend/app/levels.py

# ===== آستانه‌های XP برای ۳۰ مرحله =====
XP_THRESHOLDS = [
    0,      # L1 (شروع)
    80,     # L2
    160,     # L3
    260,     # L4
    400,    # L5
    680,    # L6
    980,    # L7
    1200,    # L8
    1680,    # L9
    2100,    # L10
    2600,    # L11
    3160,    # L12
    3900,    # L13
    4800,    # L14
    5600,    # L15
    6600,    # L16
    7800,    # L17
    8900,    # L18
    10000,   # L19
    11200,   # L20
    12400,   # L21
    13600,   # L22
    14800,   # L23
    16000,   # L24
    17000,   # L25
    18500,   # L26
    20000,   # L27
    22300,   # L28
    23800,   # L29
    26000,   # L30
]

# ===== نام‌های مراحل =====
LEVEL_NAMES = [
    "تازه‌کار",         # 1
    "مبتدی",            # 2
    "تمرین‌کننده",      # 3
    "کوشا",             # 4
    "چابک",             # 5
    "همراه",            # 6
    "پیشرو",            # 7
    "سرسخت",            # 8
    "الهام‌بخش",       # 9
    "استاد ضرب",        # 10
    "نوازنده",          # 11
    "خنیاگر",           # 12
    "هنرمند",           # 13
    "خلاق",             # 14
    "حرفه‌ای",          # 15
    "ماهر",             # 16
    "برتر",             # 17
    "افسانه‌جو",        # 18
    "نخبه",             # 19
    "استاد",            # 20
    "استاد بزرگ",       # 21
    "افسانه",           # 22
    "اسطوره",           # 23
    "حماسه",            # 24
    "پهلوان",           # 25
    "جاودان",           # 26
    "خردمند",           # 27
    "یگانه",            # 28
    "بی‌همتا",          # 29
    "حکیم اعظم",        # 30
]

# ===== جوایز هر مرحله =====
# توضیح: کلید هر مرحله = مرحله‌ای که با رسیدن به آن، جایزه داده می‌شود.
# Level 1 جایزه ندارد (شروع). جوایز از Level 2 شروع می‌شوند.
LEVEL_REWARDS = {
    # --- ۲ تا ۱۰: سکه ---
    2:  {"type": "coins", "amount": 10,   "name": "10 سکه"},
    3:  {"type": "coins", "amount": 30,   "name": "30 سکه"},
    4:  {"type": "handpan_skin", "id": "wood",      "name": "هنگ‌درام چوبی"},
    5:  {"type": "coins", "amount": 50,  "name": "50 سکه"},
    6:  {"type": "coins", "amount": 70,  "name": "70 سکه"},
    7:  {"type": "handpan_skin", "id": "silver",    "name": "هنگ‌درام نقره‌ای"},
    8:  {"type": "coins", "amount": 70,  "name": "70 سکه"},
    9:  {"type": "coins", "amount": 100,  "name": "100 سکه"},
    10: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},

    # --- ۱۱ تا ۲۰: اسکین هنگ‌درام (طرح‌های مختلف) ---
    11: {"type": "coins", "amount": 120,  "name": "120 سکه"},
    12: {"type": "handpan_skin", "id": "gold",      "name": "هنگ‌درام طلایی"},
    13: {"type": "coins", "amount": 300,  "name": "300 سکه"},
    14: {"type": "handpan_skin", "id": "Seven Colors",    "name": "هنگ‌درام هفت رنگ"},
    15: {"type": "handpan_skin", "id": "Streaked",   "name": "هنگ‌درام رگه دار "},
    16: {"type": "handpan_skin", "id": "celestial", "name": "هنگ‌درام آسمانی"},
    17: {"type": "coins", "amount": 400,  "name": "400 سکه"},
    18: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    19: {"type": "handpan_skin", "id": "Bronze",  "name": "هنگ‌درام برنزی"},
    20: {"type": "handpan_skin", "id": "Veined turquoise",    "name": "هنگ‌درام فیروزه ای رگه دار"},


    # --- ۲۱ تا ۳۰: هنگ‌درام با نت بیشتر ---
    21: {"type": "coins", "amount": 500,  "name": "۵۰۰ سکه"},
    22: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    23: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    24: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    25: {"type": "coins", "amount": 600,  "name": "600 سکه"},
    26: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    27: {"type": "handpan_skin", "id": "dark",   "name": "هنگ‌درام تاریکی"},
    28: {"type": "handpan_notes", "extra": 1, "name": "هنگ‌درام +۱ نت"},
    29: {"type": "coins", "amount": 750,  "name": "۷۵۰ سکه"},
    30: {"type": "handpan_notes", "coins": True , "amount": 1000, "extra": 2,  "name": "هنگ‌درام افسانه‌ای +۲ نت + سکه 1000"},
}

# ===== توابع =====
def get_level_from_xp(xp: int) -> int:
    """مرحله فعلی را از روی XP کل برمی‌گرداند."""
    level = 1
    for i, threshold in enumerate(XP_THRESHOLDS):
        if xp >= threshold:
            level = i + 1
        else:
            break
    return level


def get_level_name(level: int) -> str:
    """نام مرحله را برمی‌گرداند."""
    if 1 <= level <= len(LEVEL_NAMES):
        return LEVEL_NAMES[level - 1]
    return "نامشخص"


def get_xp_progress(xp: int) -> tuple[int, int, int]:
    """
    پیشرفت در مرحله فعلی را برمی‌گرداند.
    خروجی: (xp_در_مرحله, xp_لازم_برای_مرحله_بعد, xp_کل)
    """
    level = get_level_from_xp(xp)
    if level >= len(XP_THRESHOLDS):  # maxed out
        current = XP_THRESHOLDS[-1]
        return xp - current, 0, xp
    current_threshold = XP_THRESHOLDS[level - 1]
    next_threshold = XP_THRESHOLDS[level]
    in_level = xp - current_threshold
    needed = next_threshold - current_threshold
    return in_level, needed, xp


def calculate_level(coins: int) -> tuple[int, str]:
    """سازگاری با کد قدیمی — از XP استفاده می‌کند ولی ورودی سکه است (منسوخ)."""
    # این تابع منسوخ شده؛ در auth.py از get_level_from_xp استفاده می‌کنیم
    level = get_level_from_xp(coins * 4)  # تبدیل تقریبی
    return level, get_level_name(level)
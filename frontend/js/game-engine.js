function getThemeColor(colorKey, fallback) {
    const root = getComputedStyle(document.documentElement);
    const varName = `--${colorKey.toLowerCase()}`;
    const value = root.getPropertyValue(varName).trim();
    return value || fallback;
}

function getCSSVar(varName, fallback) {
    const root = getComputedStyle(document.documentElement);
    const value = root.getPropertyValue(varName).trim();
    return value || fallback;
}

// ==========================================================
// I18N (ترجمه‌ها)
// ==========================================================
const I18N = {
    fa: {
        // # Auth
        "auth.identifier":"ایمیل یا نام کاربری","auth.password":"رمز عبور","auth.login_btn":"ورود به استودیو","auth.no_account":"حساب ندارید؟ ثبت‌نام کنید","auth.username":"نام کاربری","auth.email":"ایمیل","auth.register_btn":"ساخت حساب","auth.have_account":"قبلاً ثبت‌نام کرده‌اید؟ وارد شوید","auth.forgot_password": "رمز عبور را فراموش کرده‌اید؟","auth.forgot_title": "🔐 فراموشی رمز عبور","auth.forgot_desc": "شماره تلفن یا ایمیل خود را وارد کنید تا کد بازیابی ارسال شود.","auth.send_code_btn": "ارسال کد بازیابی","auth.code_sent": "کد بازیابی ارسال شد","auth.error.rate_limit": "⚠️ تلاش‌های بیش از حد! لطفاً ۱ دقیقه صبر کنید.","auth.error.rate_limit": "⚠️ تلاش‌های بیش از حد!","auth.error.wait_seconds": "⏱️ لطفاً {sec} ثانیه صبر کنید...","auth.phone": "شماره تلفن ",
        // # Header
        "header.logout":"خروج","header.level_prefix":"Lvl",
        // # Menu
        "menu.title":"یک حالت را انتخاب کنید","menu.free_play":"🎵 بداهه‌نوازی (رایگان)","menu.trial":"🌧️ مرحله تستی (ورود: ۱۰","menu.wallet":"💰 کیف پول","menu.profile":"👤 پروفایل","menu.settings":"⚙️ تنظیمات","menu.hint":"💡 دقت بالای ۷۵٪ = ۲۰ XP + جایزه مرحله","menu.training":"📚 تمرین کن و یاد بگیر","menu.training_short": "تمرین و یادگیری","menu.editor":"🎼 آهنگساز","menu.editor_short": "آهنگساز","menu.mic_mode": "🎤 حالت ساز واقعی (میکروفون)","menu.mic_on": "⏹️ خاموش کردن میکروفون","menu.mic_short": "ساز واقعی","menu.mic_off_short": "خاموش کردن","menu.mic_test": "🔬 تست میکروفون (عیب‌یابی)","menu.calibration": "🎯 کالیبراسیون ساز واقعی","menu.leaderboard": "🏆 جدول امتیازات","menu.leaderboard_short": "جدول امتیازات",
        // # Training & Tutorials
        "training.title":"📚 تمرین کن و یاد بگیر","training.my_songs":"🎵 آهنگ‌های من","tutorial.level_1":"📖 ضرب گیری", "tutorial.level_2":"📖 مرحله ۲: نت‌های کناری","tutorial.level_3":"📖 مرحله ۳: ترکیب نت‌ها", "tutorial.level_4":"📖 مرحله ۴: دو نت هم‌زمان","tutorial.level_5":"📖 مرحله ۵: ملودی نهایی","tutorial.soon":"📖 مرحله {n} به‌زودی فعال می‌شود!",
        // # Game & Result
        "game.ready":"آماده باش...","game.end":"پایان تمرین","game.back":"← بازگشت","result.title":"🎉 نتیجه تمرین","result.score":"امتیاز:","result.hits":"ضربه درست:","result.misses":"خطا:","result.accuracy":"دقت:","result.xp":"XP کسب‌شده:","result.back":"بازگشت به منو","result.reward_full":"عالی! پاداش کامل + ۲۰ XP (بالای ۷۵٪)","result.reward_ok":"خوب! ۱۰ سکه پاداش (بین ۵۰ تا ۷۵٪)","result.reward_none":"بدون پاداش (بین ۲۵ تا ۵۰٪)","result.reward_penalty":"جریمه ۵ سکه (زیر ۲۵٪)","result.reward_prefix":"جایزه دریافتی :","result.reward_song_full": "عالی! پاداش ویژه آهنگ + ۲۵ سکه (بالای ۸۰٪)",
        // # Wallet & VIP
        "wallet.title":"💰 موجودی کیف پول","wallet.hint":"سکه‌های شما برای ورود به بازی‌ها و خرید استفاده می‌شوند","wallet.buy":"🛒 خرید سکه","wallet.pkg_starter":"بسته شروع","wallet.pkg_standard":"بسته استاندارد","wallet.pkg_premium":"بسته پریمیوم","wallet.pkg_ultimate":"بسته نهایی","wallet.vip_title": "👑 اشتراک VIP", "wallet.buy_vip_btn": "خرید VIP (۱۰۰۰ سکه)", "wallet.renew_vip_btn": "تمدید VIP (۱۰۰۰ سکه)", "wallet.vip_active": "✅ شما VIP هستید (تا {date})", "wallet.vip_inactive": "شما کاربر عادی هستید.","vip.confirm":"آیا برای خرید VIP (۳۰ روزه) ۱۰۰۰ سکه می‌پردازید؟","vip.success":"👑 از حمایت شما صمیمانه سپاسگزاریم!\n\nاشتراک VIP شما با موفقیت به مدت ۳۰ روز فعال شد. از این پس می‌توانید بدون هیچ تبلیغی، تمرین‌های خود را با تمرکز کامل ادامه دهید.\n\nموفق و پیروز باشید! 🎶✨","vip.error":"خطا در خرید VIP","dev.vip_success":"✅ وضعیت VIP با موفقیت تغییر کرد (فقط برای تست)",
        // # Profile
        "profile.coins":"سکه","profile.total_xp":"مجموع XP","profile.extra_notes":"هنگ‌درام‌های اضافی","profile.skins":"اسکین‌های باز‌شده", "profile.history_title":"📊 تاریخچه تمرین (۱۰ مورد اخیر)", "profile.history_empty": "هنوز تمرینی ثبت نشده است","profile.logout_btn": "خروج از حساب کاربری",
        // # Leaderboard & Leagues
        "leaderboard.title": "🏆 برترین بازیکنان","leaderboard.empty": "هنوز هیچ بازیکنی در جدول نیست.","leaderboard.you": "شما","leaderboard.your_league": "لیگ فعلی شما:","league.bronze": "برنز","league.silver": "نقره","league.gold": "طلا","league.platinum": "پلاتینیوم","league.diamond": "الماس","league.legend": "افسانه‌ای",
        // # Settings
        "settings.title":"⚙️ تنظیمات","settings.appearance":"🎨 ظاهر بازی","settings.language":"زبان","settings.fall_speed":"سرعت گام‌ها","settings.note_size":"اندازه نت‌ها","settings.sound_volume":"صدای بازی","settings.save_settings":"ذخیره تنظیمات","settings.note_display": "حالت نمایش نت‌ها","settings.active_skin":"طرح هنگ‌درام (اسکین)","settings.avatar_gender": "جنسیت آواتار رندوم", "settings.avatar_random_btn": "🎲 ساخت آواتار رندوم (۲۰ سکه)", "settings.avatar_none_btn": "🚫 بدون آواتار (حروف)","settings.theme": "تم بازی", "theme.dark": "🌙 شب (تیره)", "theme.light": "☀️ روز (روشن)","settings.mic_title": "🎤 تنظیمات ساز و میکروفون","settings.mic_desc": "برای بهترین عملکرد با ساز واقعی، ابتدا میکروفون را تست و سپس ساز را کالیبره کنید.","settings.avatar_title": "🖼️ انتخاب آواتار","settings.gender_male": "👨 آقا", "settings.gender_female": "👩 خانم","settings.dev_vip":"🛠️ خاموش / روشن کردن VIP (تست)","display.number": "عدد", "display.name": "حروف",
        // # Skins
        "skin.default": "ساده", "skin.wood": "چوبی", "skin.silver": "نقره‌ای", "skin.gold": "طلایی", "skin.rainbow": "رنگین‌کمان", "skin.marble": "مرمری","skin.ice_blue": "کریستال آبی", "skin.bronze": "برنزی", "skin.turquoise": "فیروزه‌ای","skin.dark": "تاریکی", "skin.royal": "سلطنتی",
        // # Editor
        "editor.title": "🎼 آهنگساز","editor.song_title": "عنوان آهنگ","editor.artist": "خواننده","editor.difficulty": "سختی","editor.select_notes": "نت‌ها را انتخاب کنید:","editor.save_btn": "💾 ذخیره آهنگ","editor.clear_btn": "🗑 پاک کردن همه","editor.my_songs": "آهنگ‌های من","editor.fall_speed": "سرعت گام ها","editor.commit_step": "✅ ثبت این گام","editor.new_step": "➕ گام جدید","editor.current_step": "گام فعلی (نت‌های انتخاب شده):","editor.steps_list": "لیست گام‌ها:","editor.cost_note": "💰 هزینه ساخت آهنگ: ۱۵۰ سکه","editor.no_steps": "هنوز گامی ثبت نشده است","editor.no_notes": "هنوز نتی انتخاب نشده — از دکمه‌های بالا نت انتخاب کنید","editor.song_saved": "✅ آهنگ با موفقیت ذخیره شد!","difficulty.easy": "آسان","difficulty.medium": "متوسط","difficulty.hard": "سخت","editor.loading": "در حال بارگذاری...","editor.no_songs": "هنوز آهنگی نساخته‌اید","editor.click_delete":"کلیک برای حذف","editor.error_no_notes":"لطفاً حداقل یک نت برای این گام انتخاب کنید.","editor.warn_duplicate":"این گام با گام قبلی یکسان است. بازهم ثبت شود؟","editor.confirm_new_step":"نت‌های انتخاب‌شده پاک شوند؟ (گام فعلی ثبت نشده است)","editor.play_step":"پخش این گام","editor.delete":"حذف","editor.confirm_delete_step":"گام {n} حذف شود؟","editor.error_no_title":"لطفاً عنوان آهنگ را وارد کنید.","editor.error_no_steps":"لطفاً حداقل یک گام ثبت کنید.","editor.error_login":"ابتدا وارد شوید.","editor.error_save":"خطا: {msg}","editor.error_save_default":"ذخیره نشد","editor.confirm_clear":"تمام گام‌ها و نت‌های انتخاب‌شده پاک شوند؟","editor.error_load":"خطا در بارگذاری","editor.steps_count":"{n} گام","editor.notes_count":"{n} نت","editor.speed":"سرعت {n}","editor.play_song":"▶ پخش","editor.play_game":"🎮 بازی","calib.captured_hits":"ضربه‌های گرفته شده:","calib.calibrated_notes":"نت‌های کالیبره شده:",
        // # Calibration
        "calib.wait_sec":"⏱️ {sec} ثانیه صبر کن...","calib.ready_next":"✅ آماده ضربه بعدی","calib.noise":"⚠️ صدای نویز شناسایی شد. دوباره بزنید.","calib.invalid_freq":"⚠️ فرکانس نامعتبر. دوباره بزنید.","calib.registered":"✅ ثبت شد: {val} Hz ({count}/۳)","calib.next_note":"✅ نت بعدی","calib.waiting_hit":"منتظر ضربه...","calib.avg":"میانگین: {val} Hz","calib.none":"هیچ نتی کالیبره نشد.","calib.saved":"✅ کالیبراسیون ذخیره شد!","calib.error_save": "خطا در ارتباط با سرور",
        // # Ads
        "ad.title": "📺 تبلیغات", "ad.hint": "برای دیدن نتایج تمرین، لطفاً ۵ ثانیه صبر کنید.", "ad.wait_btn": "لطفاً صبر کنید...", "ad.close_btn": "بستن تبلیغ و ادامه",
        // # Mic
        "mic.success":"🎤 میکروفون با موفقیت روشن شد!","mic.error":"خطا در فعال‌سازی میکروفون: {msg}","mic.diag.title":"🔬 نتیجه عیب‌یابی میکروفون:","mic.diag.browser":"مرورگر:","mic.diag.secure":"Secure Context:","mic.diag.mics":"میکروفون‌های پیدا شده:","mic.diag.success":"✅ getUserMedia موفق! {n} ترک صوتی","mic.diag.instruction":"🎤 حالا ۳ ثانیه با صدای بلند صحبت کن یا سوت بزن...","mic.diag.done":"✅ تست تمام شد!\n\nحداکثر Vol مشاهده شده: {vol}%\n\n","mic.diag.ok":"🎉 میکروفون کار می‌کنه!","mic.diag.low":"⚠️ Vol خیلی کمه","mic.diag.error":"❌ getUserMedia خطا: {name}\n{msg}",
        // # Avatar
        "avatar.saved":"✓ آواتار با موفقیت ذخیره شد","avatar.error":"خطا در ذخیره آواتار. لطفاً دوباره تلاش کنید.",
        // # Messages & Errors
        "msg.saved":"✓ تغییرات ذخیره شد","msg.error_server":"خطا در ارتباط با سرور","msg.error_generic":"خطا","msg.confirm_buy_avatar": "آواتار {name} قفل است. آیا {price} سکه می‌پردازید؟", "msg.confirm_random_avatar_limit": "شما به محدودیت ۵ آواتار رندوم رسیده‌اید.\nقدیمی‌ترین آواتار هایلایت‌نشده حذف خواهد شد.\nآیا ادامه می‌دهید؟", "msg.confirm_random_avatar_cost": "ساخت آواتار رندوم جدید {cost} سکه هزینه دارد. ادامه می‌دهید؟", "msg.confirm_buy_skin": "آیا این اسکین را به قیمت {price} سکه می‌خرید؟", "msg.confirm_delete_avatar": "آیا از حذف این آواتار مطمئن هستید؟", "msg.confirm_delete_highlight": "⚠️ این آواتار هایلایت شده است. آیا از حذف آن مطمئن هستید؟", "msg.buy_success": "✅ خرید موفق! آواتار شما تغییر کرد.", "msg.skin_buy_success": "✅ خرید موفق! اسکین شما تغییر کرد.", "msg.avatar_deleted": "✓ آواتار با موفقیت حذف شد","auth.error.empty":"لطفاً تمام فیلدها را پر کنید.","auth.error.credentials":"نام کاربری یا رمز عبور اشتباه است.","auth.error.email":"فرمت ایمیل صحیح نیست.","auth.error.auto_login":"ثبت‌نام انجام شد اما ورود خودکار ناموفق بود. لطفاً دستی وارد شوید.","auth.error.register":"خطا در ثبت‌نام",
        
        "levels.title": "📈 مراحل و جوایز","levels.desc": "با کسب XP، باتری سطح خود را پر کنید و جایزه بگیرید!","profile.view_levels": "📈 مشاهده مراحل و جوایز",

        "auth.reset_code": "کد ۶ رقمی","auth.new_password": "رمز عبور جدید","auth.submit_new_password": "تغییر رمز عبور","auth.reset_success": "✅ رمز عبور با موفقیت تغییر کرد. حالا می‌توانید وارد شوید.",
   
        "reward.title": "🎉 تبریک!","reward.message_1": "شما به مرحله","reward.message_2": "رسیدید!","reward.level_prefix": "مرحله","reward.ok": "عالی!",
    
        "result.combo": "حداکثر کمبو:","result.combo_bonus": "پاداش کمبو","result.discount_unlocked": "تخفیف ۲۵٪ ساخت آهنگ فعال شد!",
   
        "result.too_short": "❌ تعداد نت‌های این آهنگ کمتر از ۱۵ بود. پاداشی محاسبه نشد.",
    },
    en: {
        // # Auth
        "auth.identifier":"Email or Username","auth.password":"Password","auth.login_btn":"Login to Studio","auth.no_account":"No account? Register","auth.username":"Username","auth.email":"Email","auth.register_btn":"Create Account","auth.have_account":"Already registered? Login","auth.forgot_password": "Forgot password?","auth.forgot_title": "🔐 Forgot Password","auth.forgot_desc": "Enter your phone number or email to receive a reset code.","auth.send_code_btn": "Send Reset Code","auth.code_sent": "Reset code sent","auth.error.rate_limit": "⚠️ Too many attempts! Please wait 1 minute.","auth.error.rate_limit": "⚠️ Too many attempts!","auth.error.wait_seconds": "⏱️ Please wait {sec} seconds...","auth.phone": "Phone Number",
        // # Header
        "header.logout":"Logout","header.level_prefix":"Lvl",
        // # Menu
        "menu.title":"Choose a mode","menu.free_play":"🎵 Free Play","menu.trial":"🌧️ Trial Mode (Entry: 10","menu.wallet":"💰 Wallet","menu.profile":"👤 Profile","menu.settings":"⚙️ Settings","menu.hint":"💡 Accuracy above 75% = 20 XP + level reward","menu.training":"📚 Practice & Learn","menu.training_short": "Practice","menu.editor":"🎼 Song Editor","menu.editor_short": "Song Editor","menu.mic_mode": "🎤 Real Instrument Mode (Mic)","menu.mic_on": "⏹️ Turn Off Mic","menu.mic_short": "Real Mic","menu.mic_off_short": "Turn Off","menu.mic_test": "🔬 Mic Test (Diagnostics)","menu.calibration": "🎯 Real Instrument Calibration","menu.leaderboard": "🏆 Leaderboard","menu.leaderboard_short": "Leaderboard",
        // # Training & Tutorials
        "training.title":"📚 Practice & Learn","training.my_songs":"🎵 My Songs","tutorial.level_1": "📖 Level 1: D Note Basics","tutorial.level_2": "📖 Level 2: Side Notes","tutorial.level_3": "📖 Level 3: Note Combos","tutorial.level_4": "📖 Level 4: Chords","tutorial.level_5": "📖 Level 5: Final Melody","tutorial.soon":"📖 Level {n} coming soon!",
        // # Game & Result
        "game.ready":"Get ready...","game.end":"End Practice","game.back":"← Back","result.title":"🎉 Practice Result","result.score":"Score:","result.hits":"Correct Hits:","result.misses":"Misses:","result.accuracy":"Accuracy:","result.xp":"XP Earned:","result.back":"Back to Menu","result.reward_full":"Excellent! Full reward + 20 XP (Above 75%)","result.reward_ok":"Good! 10 coin reward (50-75%)","result.reward_none":"No reward (25-50%)","result.reward_penalty":"5 coin penalty (Below 25%)","result.reward_prefix":"Your reward:","result.reward_song_full":"Excellent! Special Song Reward + 25 Coins (Above 80%)",
        // # Wallet & VIP
        "wallet.title":"💰 Wallet Balance","wallet.hint":"Your coins are used for game entries and purchases","wallet.buy":"🛒 Buy Coins","wallet.pkg_starter":"Starter Pack","wallet.pkg_standard":"Standard Pack","wallet.pkg_premium":"Premium Pack","wallet.pkg_ultimate":"Ultimate Pack","wallet.vip_title": "👑 VIP Subscription", "wallet.buy_vip_btn": "Buy VIP (1000 Coins)", "wallet.renew_vip_btn": "Renew VIP (1000 Coins)", "wallet.vip_active": "✅ You are VIP (Until {date})", "wallet.vip_inactive": "You are a regular user.","vip.confirm":"Do you want to pay 1000 coins for 30-day VIP?","vip.success":"👑 Thank you for your support!\n\nYour VIP subscription is active for 30 days. You can now practice without ads.\n\nBest of luck! 🎶✨","vip.error":"Error buying VIP","dev.vip_success":"✅ VIP status toggled successfully (Dev only)",
        // # Profile
        "profile.coins":"Coins","profile.total_xp":"Total XP","profile.extra_notes":"Extra Notes","profile.skins":"Unlocked Skins", "profile.history_title":"📊 Practice History (Last 10)", "profile.history_empty": "No practice history yet","profile.logout_btn": "Logout of Account",
        // # Leaderboard & Leagues
        "leaderboard.title": "🏆 Top Players","leaderboard.empty": "No players in the leaderboard yet.","leaderboard.you": "You","leaderboard.your_league": "Your Current League:","league.bronze": "Bronze","league.silver": "Silver","league.gold": "Gold","league.platinum": "Platinum","league.diamond": "Diamond","league.legend": "Legend",
        // # Settings
        "settings.title":"⚙️ Settings","settings.appearance":"🎨 Game Appearance","settings.language":"Language","settings.fall_speed":"Step Speed","settings.note_size":"Note Size","settings.sound_volume":"Game Volume","settings.save_settings":"Save Settings","settings.note_display": "Note Display Mode","settings.active_skin":"Handpan Skin","settings.avatar_gender": "Random Avatar Gender", "settings.avatar_random_btn": "🎲 Generate Random Avatar (20 Coins)", "settings.avatar_none_btn": "🚫 No Avatar (Letters)","settings.theme": "App Theme", "theme.dark": "🌙 Night (Dark)", "theme.light": "☀️ Day (Light)","settings.mic_title": "🎤 Instrument & Mic Settings","settings.mic_desc": "For best real-instrument performance, test the mic and then calibrate the instrument.","settings.avatar_title": "🖼️ Avatar Selection","settings.gender_male": "👨 Male", "settings.gender_female": "👩 Female","settings.dev_vip":"🛠️ Toggle VIP (Dev)","display.number": "Number", "display.name": "Letters",
        // # Skins
        "skin.default": "Simple", "skin.wood": "Wood", "skin.silver": "Silver","skin.gold": "Gold", "skin.rainbow": "Rainbow", "skin.marble": "Marble","skin.ice_blue": "Ice Blue", "skin.bronze": "Bronze", "skin.turquoise": "Turquoise","skin.dark": "Dark", "skin.royal": "Royal",
        // # Editor
        "editor.title": "🎼 Song Editor","editor.song_title": "Song Title","editor.artist": "Artist","editor.difficulty": "Difficulty","editor.select_notes": "Select notes:","editor.save_btn": "💾 Save Song","editor.clear_btn": "🗑 Clear All","editor.my_songs": "My Songs","editor.fall_speed": "Note Step Speed","editor.commit_step": "✅ Commit Step","editor.new_step": "➕ New Step","editor.current_step": "Current Step (Selected Notes):","editor.steps_list": "Steps List:","editor.cost_note": "💰 Song Creation Cost: 150 Coins","editor.no_steps": "No steps committed yet","editor.no_notes": "No notes selected yet — choose from the buttons above","editor.song_saved": "✅ Song saved successfully!","difficulty.easy": "Easy","difficulty.medium": "Medium","difficulty.hard": "Hard","editor.loading": "Loading...","editor.no_songs": "You haven't created any songs yet","editor.click_delete":"Click to delete","editor.error_no_notes":"Please select at least one note for this step.","editor.warn_duplicate":"This step is identical to the previous one. Commit anyway?","editor.confirm_new_step":"Clear selected notes? (Current step not committed)","editor.play_step":"Play this step","editor.delete":"Delete","editor.confirm_delete_step":"Delete step {n}?","editor.error_no_title":"Please enter song title.","editor.error_no_steps":"Please commit at least one step.","editor.error_login":"Please login first.","editor.error_save":"Error: {msg}","editor.error_save_default":"Not saved","editor.confirm_clear":"Clear all steps and selected notes?","editor.error_load":"Loading error","editor.steps_count":"{n} steps","editor.notes_count":"{n} notes","editor.speed":"Speed {n}","editor.play_song":"▶ Play","editor.play_game":"🎮 Play Game","calib.captured_hits":"Captured hits:","calib.calibrated_notes":"Calibrated notes:",
        // # Calibration
        "calib.wait_sec":"⏱️ {sec} seconds wait...","calib.ready_next":"✅ Ready for next hit","calib.noise":"⚠️ Noise detected. Please hit again.","calib.invalid_freq":"⚠️ Invalid frequency. Please hit again.","calib.registered":"✅ Registered: {val} Hz ({count}/3)","calib.next_note":"✅ Next note","calib.waiting_hit":"Waiting for hit...","calib.avg":"Average: {val} Hz","calib.none":"No notes calibrated.","calib.saved":"✅ Calibration saved!","calib.error_save": "Server connection error",
        // # Ads
        "ad.title": "📺 Advertisement", "ad.hint": "Please wait 5 seconds to see the practice results.", "ad.wait_btn": "Please wait...", "ad.close_btn": "Close Ad & Continue",
        // # Mic
        "mic.success":"🎤 Microphone turned on successfully!","mic.error":"Error activating microphone: {msg}","mic.diag.title":"🔬 Mic Diagnostic Result:","mic.diag.browser":"Browser:","mic.diag.secure":"Secure Context:","mic.diag.mics":"Microphones found:","mic.diag.success":"✅ getUserMedia successful! {n} audio tracks","mic.diag.instruction":"🎤 Now speak or whistle loudly for 3 seconds...","mic.diag.done":"✅ Test finished!\n\nMax Vol observed: {vol}%\n\n","mic.diag.ok":"🎉 Microphone is working!","mic.diag.low":"⚠️ Volume is too low","mic.diag.error":"❌ getUserMedia error: {name}\n{msg}",
        // # Avatar
        "avatar.saved":"✓ Avatar saved successfully","avatar.error":"Error saving avatar. Please try again.",
        // # Messages & Errors
        "msg.saved":"✓ Changes saved","msg.error_server":"Server connection error","msg.error_generic":"Error","msg.confirm_buy_avatar": "Avatar {name} is locked. Pay {price} coins?", "msg.confirm_random_avatar_limit": "You reached the limit of 5 random avatars.\nThe oldest unhighlighted avatar will be deleted.\nContinue?", "msg.confirm_random_avatar_cost": "Generating a new random avatar costs {cost} coins. Continue?", "msg.confirm_buy_skin": "Buy this skin for {price} coins?", "msg.confirm_delete_avatar": "Are you sure you want to delete this avatar?", "msg.confirm_delete_highlight": "⚠️ This avatar is highlighted. Are you sure you want to delete it?", "msg.buy_success": "✅ Purchase successful! Avatar changed.", "msg.skin_buy_success": "✅ Purchase successful! Skin changed.", "msg.avatar_deleted": "✓ Avatar deleted successfully","auth.error.empty":"Please fill in all fields.","auth.error.credentials":"Invalid username or password.","auth.error.email":"Invalid email format.","auth.error.auto_login":"Registration successful but auto-login failed. Please login manually.","auth.error.register":"Registration error",
        
        "levels.title": "📈 Levels & Rewards","levels.desc": "Earn XP to fill your level battery and get rewards!","profile.view_levels": "📈 View Levels & Rewards",
        
        "auth.reset_code": "6-digit Code","auth.new_password": "New Password","auth.submit_new_password": "Reset Password","auth.reset_success": "✅ Password reset successfully. You can now log in.",
        
        "reward.title": "🎉 Congratulations!","reward.message_1": "You reached level","reward.message_2": "!","reward.level_prefix": "Level","reward.ok": "Awesome!",
    
        "result.combo": "Max Combo:","result.combo_bonus": "Combo Bonus","result.discount_unlocked": "25% Song Discount Unlocked!",
    
        "result.too_short": "❌ Song has less than 15 notes. No rewards calculated.",
    }
};

const LEVEL_NAMES_I18N = {
    fa:["تازه‌کار","مبتدی","تمرین‌کننده","کوشا","چابک","همراه","پیشرو","سرسخت","الهام‌بخش","استاد ضرب","نوازنده","خنیاگر","هنرمند","خلاق","حرفه‌ای","ماهر","برتر","افسانه‌جو","نخبه","استاد","استاد بزرگ","افسانه","اسطوره","حماسه","پهلوان","جاودان","خردمند","یگانه","بی‌همتا","حکیم اعظم"],
    en:["Beginner","Novice","Practitioner","Diligent","Agile","Companion","Pioneer","Tenacious","Inspiring","Rhythm Master","Musician","Minstrel","Artist","Creative","Professional","Skilled","Superior","Legend Seeker","Elite","Master","Grand Master","Legend","Myth","Epic","Champion","Immortal","Sage","Unique","Peerless","Grand Sage"]
};

let CURRENT_LANG = 'fa';
function setLang(l){ if(!I18N[l]) l='fa'; CURRENT_LANG=l; document.documentElement.lang=l; document.documentElement.dir=(l==='fa')?'rtl':'ltr'; }
function t(k){ return I18N[CURRENT_LANG]?.[k] ?? I18N.fa[k] ?? k; }
function getLocalizedLevelName(lvl, fb){ const a=LEVEL_NAMES_I18N[CURRENT_LANG]; return (a && lvl>=1 && lvl<=a.length) ? a[lvl-1] : (fb||''); }

// ==========================================================
// LAYOUTS & COLORS
// ==========================================================
const HANDPAN_LAYOUT_9 = {
    "1": [471, 389, 38],
    "2": [352, 390, 38],
    "3": [555, 305, 38],
    "4": [270, 310, 38],
    "5": [557, 190, 38],
    "6": [267, 195, 38],
    "7": [474, 109, 38],
    "8": [354, 110, 38],
    "D": [412, 246, 58],
};
const SKINS = {
    default: { name: "ساده", id: "default" },
    wood: { name: "چوبی", id: "wood" }, 
    silver: { name: "نقره‌ای", id: "silver" },
    gold: { name: "طلایی", id: "gold" }, 
    rainbow: { name: "رنگین‌کمان", id: "rainbow" },
    marble: { name: "مرمری", id: "marble" }, 
    ice_blue: { name: "کریستال آبی", id: "ice_blue" },
    bronze: { name: "برنزی", id: "bronze" }, 
    turquoise: { name: "فیروزه‌ای", id: "turquoise" },
    dark: { name: "تاریکی", id: "dark" }, 
    royal: { name: "سلطنتی", id: "royal" }
};

const SKIN_IMAGES = {};
const KEY_TO_NAME = {
    "D": "D", "1": "A1", "2": "D2", "3": "C3", "4": "E4", 
    "5": "F5", "6": "Bb6", "7": "G7", "8": "A8",
    "9": "B1", "10": "C#2", "11": "I1", "12": "I2", "13": "I3", "14": "I4", "15": "I5", "16": "I6", "17": "I7", "18": "I8"
};
const NOTE_COLORS = {
    "1": "#f472b6", "2": "#34d399", "3": "#38bdf8", "4": "#2dd4bf", 
    "5": "#818cf8", "6": "#fbbf24", "7": "#a78bfa", "8": "#fb7185", "D": "#60a5fa"
};
const FREQS = { 
    '1': 110, '2': 146.83, '3': 130.81, '4': 329.63, '5': 698.46, 
    '6': 1864.66, '7': 3135.96, '8': 3520, 'D': 293.66,
    '9': 123.47, '10': 69.30, '11': 92.50, '12': 103.83, '13': 138.59, '14': 155.56, '15': 185.00, '16': 207.65, '17': 233.08, '18': 261.63
};

function generateHandpanLayout(total){
    const cx=410,cy=250; const L={};
    let centerR = total>=16?42:(total>=12?48:58);
    L["D"]=[cx,cy,centerR];
    const around = total-1;
    let outC,inC,outRad,inRad,outR,inR;
    if(around<=8){ outC=around; inC=0; outRad=145; outR=38; inRad=0; inR=0; }
    else if(around<=12){ outC=8; inC=around-8; outRad=155; inRad=85; outR=30; inR=22; }
    else { outC=10; inC=around-10; outRad=175; inRad=105; outR=24; inR=18; }
    
    let counter = 1;
    for(let i=0;i<outC;i++){ const a=(-90+i*360/outC)*Math.PI/180; L[String(counter++)]=[Math.round(cx+outRad*Math.cos(a)),Math.round(cy+outRad*Math.sin(a)),outR]; }
    for(let i=0;i<inC;i++){ const a=(-90+i*360/inC)*Math.PI/180; L[String(counter++)]=[Math.round(cx+inRad*Math.cos(a)),Math.round(cy+inRad*Math.sin(a)),inR]; }
    return L;
}
function getLayoutForNotes(n){ return n<=9?HANDPAN_LAYOUT_9:generateHandpanLayout(n); }

// ==========================================================
// STATE
// ==========================================================
let userTokens = 0;
let currentUser = null;
let ACTIVE_LAYOUT = HANDPAN_LAYOUT_9;
let ACTIVE_SKIN = SKINS.default;
const coinIconSVG = `<img src="/assets/coin.svg" alt="سکه" style="width:28px;height:28px;vertical-align:middle;">`;

function applyUserAssets(){
    const extra = currentUser?.extra_notes || 0;
    ACTIVE_LAYOUT = getLayoutForNotes(9 + extra);
    ACTIVE_SKIN = SKINS[currentUser?.active_skin] || SKINS.default;
}
function getNoteRadius(baseR){ return baseR * (currentUser?.note_size || 1.0); }

// ==========================================================
// AUDIO
// ==========================================================
let audioCtx = null;
const soundBuffers = {}; 

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}
document.body.addEventListener('click', () => { if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); });

async function loadAudioSamples() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = initAudio();
    const keys = Object.keys(HANDPAN_LAYOUT_9); 
    let loadedCount = 0;
    for (const key of keys) {
        try {
            const response = await fetch(`/assets/sounds/${key}.wav`);
            if (response.ok) {
                const arrayBuffer = await response.arrayBuffer();
                soundBuffers[key] = await ctx.decodeAudioData(arrayBuffer);
                loadedCount++;
            }
        } catch (e) { console.warn(`فایل صوتی ${key} پیدا نشد.`); }
    }
    console.log(`🎵 ${loadedCount} فایل صوتی WAV لود شد.`);
}

async function loadSkinImages() {
    const skinIds = Object.keys(SKINS).filter(id => id !== 'default');
    
    for (const id of skinIds) {
        const img = new Image();
        img.src = `/assets/skins/${id}.png`;
        img.onload = () => {
            SKIN_IMAGES[id] = img;
            if (currentUser?.active_skin === id) {
                const c = document.getElementById('handpanCanvasFree');
                if (c) drawHandpan(c.getContext('2d'));
                const c2 = document.getElementById('handpanCanvasFalling');
                if (c2) drawHandpan(c2.getContext('2d'));
            }
        };
        img.onerror = () => console.warn(`عکس اسکین ${id} پیدا نشد.`);
    }
}

function playSound(noteKey) {
    const ctx = initAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const volume = currentUser?.sound_volume ?? 0.5;
    if (volume === 0) return;

    if (soundBuffers[noteKey]) {
        const source = ctx.createBufferSource();
        source.buffer = soundBuffers[noteKey];
        const gain = ctx.createGain();
        gain.gain.value = volume; 
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(0); 
    } else {
        const freq = FREQS[noteKey] || 440; 
        const now = ctx.currentTime; 
        const duration = 4.0;
        const osc = ctx.createOscillator(); 
        const gain = ctx.createGain();
        osc.type = 'sine'; 
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now); 
        gain.gain.linearRampToValueAtTime(volume * 0.6, now + 0.05); 
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain); 
        gain.connect(ctx.destination); 
        osc.start(now); 
        osc.stop(now + duration + 0.1);
    }
}

// ==========================================================
// AUTH & UI
// ==========================================================
let authCooldownInterval = null;
let authCooldownEndTime = 0;

function startAuthCooldown(seconds = 60) {
    authCooldownEndTime = Date.now() + (seconds * 1000);
    localStorage.setItem('pm_lockout_until', authCooldownEndTime.toString());
    const errorEl = document.getElementById('authError');
    const loginBtn = document.querySelector('#login-form button');
    const regBtn = document.querySelector('#register-form button');

    if (authCooldownInterval) clearInterval(authCooldownInterval);
    
    authCooldownInterval = setInterval(() => {
        const remaining = Math.ceil((authCooldownEndTime - Date.now()) / 1000);
        
        if (remaining > 0) {
            // نمایش تایمر در پیام خطا
            errorEl.innerText = t('auth.error.wait_seconds').replace('{sec}', remaining);
            errorEl.style.color = 'var(--warning-color, #fbbf24)';
            
            // قفل کردن دکمه‌ها و نمایش زمان روی آن‌ها
            if (loginBtn) { loginBtn.disabled = true; loginBtn.style.opacity = '0.5'; loginBtn.innerText = `⏱️ ${remaining}`; }
            if (regBtn) { regBtn.disabled = true; regBtn.style.opacity = '0.5'; regBtn.innerText = `⏱️ ${remaining}`; }
        } else {
            // پایان زمان: پاک کردن تایمر و آزادسازی دکمه‌ها
            clearInterval(authCooldownInterval);
            authCooldownInterval = null;
            authCooldownEndTime = 0;
            localStorage.removeItem('pm_lockout_until');
            errorEl.innerText = '';
            
            if (loginBtn) { loginBtn.disabled = false; loginBtn.style.opacity = '1'; loginBtn.innerText = t('auth.login_btn'); }
            if (regBtn) { regBtn.disabled = false; regBtn.style.opacity = '1'; regBtn.innerText = t('auth.register_btn'); }
        }
    }, 1000);
}

function toggleAuth(type){
    document.querySelector('.form-box').style.display = 'block'; // نمایش باکس اصلی
    document.getElementById('login-form').style.display = type==='login'?'block':'none';
    document.getElementById('register-form').style.display = type==='register'?'block':'none';
    document.getElementById('forgot-password-view').style.display = 'none';
    document.getElementById('authError').innerText='';
}

function goToForgotPassword() {
    document.querySelector('.form-box').style.display = 'none'; // 👈 مخفی کردن کل باکس لاگین
    document.getElementById('forgot-password-view').style.display = 'block'; // نمایش صفحه فراموشی
    document.getElementById('authError').innerText = '';
}

async function sendResetCode() {
    const identifier = document.getElementById('forgotIdentifier').value.trim();
    const msgEl = document.getElementById('forgotMsg');
    const btn = document.getElementById('btn-send-code');
    
    if (!identifier) { msgEl.style.color = 'var(--danger-color)'; msgEl.innerText = t('auth.error.empty'); return; }
    
    msgEl.innerText = '';
    btn.innerText = 'در حال ارسال...';
    btn.disabled = true;
    
    try {
        const res = await fetch('/api/users/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier })
        });
        if (res.ok) {
            const data = await res.json();
            msgEl.style.color = 'var(--success-color)';
            msgEl.innerText = data.code ? `کد بازیابی (برای تست): ${data.code}` : t('auth.code_sent');
            
            // 👈 نمایش مرحله ۲ و قفل کردن فیلد اول
            document.getElementById('reset-step-2').style.display = 'block';
            document.getElementById('forgotIdentifier').disabled = true;
            btn.style.display = 'none'; // دکمه ارسال کد مخفی میشه
        } else {
            const err = await res.json();
            msgEl.style.color = 'var(--danger-color)';
            msgEl.innerText = err.detail || t('msg.error_server');
            btn.innerText = t('auth.send_code_btn');
            btn.disabled = false;
        }
    } catch(e) {
        msgEl.style.color = 'var(--danger-color)';
        msgEl.innerText = t('msg.error_server');
        btn.innerText = t('auth.send_code_btn');
        btn.disabled = false;
    }
}

async function sendResetCode() {
    const identifier = document.getElementById('forgotIdentifier').value.trim();
    const msgEl = document.getElementById('forgotMsg');
    const btn = document.getElementById('btn-send-code');
    
    if (!identifier) { msgEl.style.color = 'var(--danger-color)'; msgEl.innerText = t('auth.error.empty'); return; }
    
    msgEl.innerText = '';
    if (btn) { btn.innerText = 'در حال ارسال...'; btn.disabled = true; }
    
    try {
        const res = await fetch('/api/users/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier })
        });
        if (res.ok) {
            const data = await res.json();
            msgEl.style.color = 'var(--success-color)';
            msgEl.innerText = data.code ? `کد بازیابی (برای تست): ${data.code}` : t('auth.code_sent');
            
            // 👇 پیدا کردن و نمایش مرحله ۲
            const step2 = document.getElementById('reset-step-2');
            if (step2) {
                step2.style.display = 'block';
                console.log("✅ Step 2 is now visible.");
            } else {
                console.error("⚠️ BUG: Element 'reset-step-2' not found in HTML!");
            }
            
            const idInput = document.getElementById('forgotIdentifier');
            if (idInput) idInput.disabled = true;
            if (btn) btn.style.display = 'none'; 
        } else {
            const err = await res.json();
            msgEl.style.color = 'var(--danger-color)';
            msgEl.innerText = err.detail || t('msg.error_server');
            if (btn) { btn.innerText = t('auth.send_code_btn'); btn.disabled = false; }
        }
    } catch(e) {
        msgEl.style.color = 'var(--danger-color)';
        msgEl.innerText = t('msg.error_server');
        if (btn) { btn.innerText = t('auth.send_code_btn'); btn.disabled = false; }
    }
}

async function login(){
    if (Date.now() < authCooldownEndTime) return;

    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;
    const errorEl = document.getElementById('authError');
    
    if(!username || !password) { errorEl.innerText = t('auth.error.empty'); return; }
    
    const fd = new URLSearchParams(); 
    fd.append('username', username); 
    fd.append('password', password);
    
    errorEl.innerText = '';
    const submitBtn = document.querySelector('#login-form button');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = '...'; }

    try {
        const res = await fetch('/api/users/login', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:fd});
        
        if(res.ok) { 
            const d = await res.json(); 
            localStorage.setItem('pm_token', d.access_token); 
            errorEl.innerText = ''; 
            showGame(); 
        } 
        else {
            const err = await res.json().catch(() => ({}));
            const detail = err.detail || {};

            if (res.status === 403 && (detail.code === 'lockout' || detail.code === 'lockout_started')) {
                let remainingSeconds = detail.remaining_seconds || 60;
                const lockoutTime = Date.now() + (remainingSeconds * 1000);
                localStorage.setItem('pm_lockout_until', lockoutTime.toString());
                authCooldownEndTime = lockoutTime;
                startAuthCooldown(remainingSeconds);
                return;
            } 
            else if (res.status === 403 && detail.code === 'force_reset') {
                errorEl.style.color = 'var(--danger-color, #ef4444)';
                errorEl.innerText = detail.message || "اکانت شما قفل شده است. لطفاً رمز عبور خود را تغییر دهید.";
                if (typeof goToForgotPassword === 'function') {
                    setTimeout(() => goToForgotPassword(), 1500);
                }
            }
            else if (res.status === 401 && detail.code === 'wrong_attempt') {
                errorEl.style.color = 'var(--warning-color, #fbbf24)';
                errorEl.innerText = `نام کاربری یا رمز عبور اشتباه است. (${detail.attempts_left} شانس باقی مانده)`;
            }
            else {
                errorEl.innerText = (typeof detail === 'string') ? detail : (detail.message || t('auth.error.credentials'));
            }
        }
    } catch(e) { 
        errorEl.innerText = t('msg.error_server'); 
    } finally {
        if (submitBtn && Date.now() >= authCooldownEndTime) { 
            submitBtn.disabled = false; 
            submitBtn.innerText = t('auth.login_btn'); 
        }
    }
}

async function register(){
    // 👈 اگر تایمر فعال است، اصلاً درخواست ارسال نکن
    if (Date.now() < authCooldownEndTime) return;

    const username = document.getElementById('regUser').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone') ? document.getElementById('regPhone').value.trim() : null;
    const password = document.getElementById('regPass').value;
    const errorEl = document.getElementById('authError');
    errorEl.innerText = '';

    if(!username || !email || !password || !phone) { errorEl.innerText = t('auth.error.empty'); return; }
    if(!email.includes('@') || !email.includes('.')) { errorEl.innerText = t('auth.error.email'); return; }
    
    const submitBtn = document.querySelector('#register-form button');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = '...'; }

    try {
        const res = await fetch('/api/users/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username,email, phone,password})});
        
        if(res.ok) { 
            const loginFd = new URLSearchParams();
            loginFd.append('username', username);
            loginFd.append('password', password);
            
            const loginRes = await fetch('/api/users/login', {
                method: 'POST', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
                body: loginFd
            });
            
            if (loginRes.ok) {
                const loginData = await loginRes.json();
                localStorage.setItem('pm_token', loginData.access_token);
                showGame();
            } else {
                errorEl.innerText = t('auth.error.auto_login');
                toggleAuth('login');
            }
        }
        else { 
            if (res.status === 429) {
                startAuthCooldown(60);
            } else {
                const err = await res.json().catch(() => ({})); 
                errorEl.innerText = err.detail || t('auth.error.register'); 
            }
        }
    } catch(e) { 
        errorEl.innerText = t('msg.error_server'); 
    } finally {
        if (submitBtn && Date.now() >= authCooldownEndTime) { 
            submitBtn.disabled = false; 
            submitBtn.innerText = t('auth.register_btn'); 
        }
    }
}

function logout(){
    localStorage.removeItem('pm_token'); 
    currentUser = null;
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'flex'; // 👈 فرم لاگین برمی‌گرده
    backToMenu();
}

async function fetchUserProfile(){
    const token=localStorage.getItem('pm_token'); if(!token) return;
    try{
        const res=await fetch('/api/users/me',{headers:{'Authorization':`Bearer ${token}`}});
        if(res.ok){ currentUser=await res.json(); userTokens=currentUser.coins; updateUIFromUser(currentUser); }
        else if(res.status===401) logout();
    }catch(e){ console.error(e); }
}

function updateUIFromUser(d){
    applyLanguage();
    loadPracticeHistory();
    if(d.font_family) applyFont(d.font_family);
    applyTheme(d.theme || 'dark');

    document.getElementById('tokenDisplay').innerText = d.coins;
    
    const nameDisplay = document.getElementById('usernameDisplay');
    if (d.is_vip) {
        nameDisplay.innerHTML = `${d.username} <span class="vip-badge">VIP</span>`;
    } else {
        nameDisplay.innerText = d.username;
    }
    document.getElementById('levelBadge').innerText = `${t('header.level_prefix')} ${d.level}`;
    document.getElementById('xpProgressFill').style.width = `${d.progress_percent}%`;
    document.getElementById('xpText').innerText = `${d.xp_in_level} / ${d.xp_needed} XP`;

    const av = document.getElementById('headerAvatar');
    if (d.selected_avatar && d.selected_avatar !== 'default') {
        const avSrc = d.selected_avatar.startsWith('http') ? d.selected_avatar : `/assets/avatars/${d.selected_avatar}.png`;
        av.innerHTML = `<img src="${avSrc}" class="avatar-mini" alt="avatar" style="pointer-events:none; user-select:none;">`;
        
        const pImg = document.getElementById('profileAvatarImg');
        const pPlace = document.getElementById('profileAvatarPlaceholder');
        if(pImg) { pImg.src = avSrc; pImg.style.display = 'block'; pPlace.style.display = 'none'; }
    } else {
        av.innerHTML = `<div class="avatar-placeholder">${d.username.charAt(0).toUpperCase()}</div>`;
        const pImg = document.getElementById('profileAvatarImg');
        const pPlace = document.getElementById('profileAvatarPlaceholder');
        if(pImg) { pImg.style.display = 'none'; pPlace.style.display = 'flex'; pPlace.innerText = d.username.charAt(0).toUpperCase(); }
    }

    const wb=document.getElementById('walletBalance'); if(wb) wb.innerText=d.coins;
    const pn=document.getElementById('profileUsername'); if(pn) pn.innerText=d.username;
    const pl=document.getElementById('profileLevel'); if(pl) pl.innerText=`${t('header.level_prefix')} ${d.level} · ${getLocalizedLevelName(d.level,d.level_name)}`;
    const pf=document.getElementById('profileXpFill'); if(pf) pf.style.width=`${d.progress_percent}%`;
    const pt=document.getElementById('profileXpText'); if(pt) pt.innerText=`${d.xp_in_level} / ${d.xp_needed} XP`;
    const pc=document.getElementById('profileCoins'); if(pc) pc.innerText=d.coins;
    const ptx=document.getElementById('profileTotalXp'); if(ptx) ptx.innerText=d.xp;
    const pnot=document.getElementById('profileNotes'); if(pnot) pnot.innerText=d.extra_notes;
    const psk=document.getElementById('profileSkins'); if(psk) psk.innerText=d.owned_skins?.length || 0;
    const st = document.getElementById('setTheme'); if(st) st.value = d.theme || 'dark';

    applySettingsToUI(d);
}

function applySettingsToUI(d){
    const su=document.getElementById('setUsername'); if(su) su.value=d.username;
    const se=document.getElementById('setEmail'); if(se) se.value=d.email;
    const sl=document.getElementById('setLanguage'); if(sl) sl.value=d.language;
    const sf=document.getElementById('setFont'); if(sf) sf.value=d.font_family;
    const snd=document.getElementById('setNoteDisplay'); if(snd) snd.value=d.note_display_mode||'number';
    const sfs=document.getElementById('setFallSpeed'); if(sfs){ sfs.value=d.fall_speed; document.getElementById('fallSpeedVal').innerText=d.fall_speed; }
    const sns=document.getElementById('setNoteSize'); if(sns){ sns.value=d.note_size; document.getElementById('noteSizeVal').innerText=d.note_size.toFixed(2); }
    const ssv=document.getElementById('setSoundVolume'); if(ssv){ ssv.value=d.sound_volume; document.getElementById('soundVolVal').innerText=d.sound_volume.toFixed(2); }
}

function applyLanguage(){
    const lang = currentUser?.language || 'fa';
    setLang(lang);
    document.querySelectorAll('[data-i18n]').forEach(el=>{
        const tr = t(el.getAttribute('data-i18n')); 
        if(tr) el.innerHTML = tr; 
    });
    document.title = lang==='fa' ? 'PanMaster - استودیو' : 'PanMaster - Studio';
    
    if (document.getElementById('result-view').classList.contains('active') && window._lastResult) renderResultToken(window._lastResult);
    if (document.getElementById('reward-modal').classList.contains('show') && window._lastRewards) showRewardModal(window._lastRewards);
    loadPracticeHistory();
    renderAvatarGallery();
    renderSkinGallery();
}
function applyFont(f){ document.documentElement.style.setProperty('--app-font', `'${f}', sans-serif`); }

// ==========================================================
// NAVIGATION
// ==========================================================
function showView(id){ document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById(id).classList.add('active');
     if (typeof applyViewBackground === 'function') {
        applyViewBackground(id);
    }
 }
function showGame(){
    document.getElementById('auth-section').style.display='none';
    document.getElementById('game-section').style.display='flex';
    fetchUserProfile().then(()=>backToMenu());
    loadSkinImages();
    loadAudioSamples();
    loadCalibration();
}
function backToMenu(){
    showView('menu-view');
    stopFallingGame(); clearInterval(countdownInterval);
    currentSongData = null;
    currentStepIdx = 0;
    document.getElementById('countdown-overlay').style.display='none';
    fetchUserProfile();
}

function updateLiveSetting(key, value) {
    if (!currentUser) return;
    
    let parsedValue = value;
    if (key === 'note_size' || key === 'sound_volume') parsedValue = parseFloat(value);
    if (key === 'fall_speed') parsedValue = parseInt(value);

    currentUser[key] = parsedValue;

    // اعمال فوری روی کانواس‌ها
    if (key === 'note_size') {
        const c1 = document.getElementById('handpanCanvasFree');
        if (c1) drawHandpan(c1.getContext('2d'));
        const c2 = document.getElementById('handpanCanvasFalling');
        if (c2) drawHandpan(c2.getContext('2d'));
    }

    // همگام‌سازی با صفحه تنظیمات اصلی
    if (key === 'note_size' && document.getElementById('setNoteSize')) {
        document.getElementById('setNoteSize').value = parsedValue;
        document.getElementById('noteSizeVal').innerText = parsedValue.toFixed(2);
    }
    if (key === 'fall_speed' && document.getElementById('setFallSpeed')) {
        document.getElementById('setFallSpeed').value = parsedValue;
        document.getElementById('fallSpeedVal').innerText = parsedValue;
    }
    if (key === 'sound_volume' && document.getElementById('setSoundVolume')) {
        document.getElementById('setSoundVolume').value = parsedValue;
        document.getElementById('soundVolVal').innerText = parsedValue.toFixed(2);
    }
    if (key === 'note_display_mode' && document.getElementById('setNoteDisplay')) {
        document.getElementById('setNoteDisplay').value = parsedValue;
    }

    // ذخیره در دیتابیس
    const token = localStorage.getItem('pm_token');
    const payload = {};
    payload[key] = parsedValue;
    
    fetch('/api/users/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
    }).catch(e => console.error("Live save error:", e));
}

function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('btn-pause');
    if (btn) btn.innerText = isPaused ? "▶️" : "⏸️";
}

async function goToFreePlay(){
    await fetchUserProfile();
    applyUserAssets();
    showView('free-view');
    const c=document.getElementById('handpanCanvasFree');
    if (c) { drawHandpan(c.getContext('2d')); setupInteraction(c,'free'); }
}

function openGameSettings() {
    if (!isGameRunning) return; // فقط وقتی بازی در حال اجراست کار کنه
    isPaused = true;
    document.getElementById('game-settings-modal').style.display = 'flex';
    
    // همگام سازی مقادیر اسلایدرها با تنظیمات فعلی کاربر
    if (document.getElementById('liveNoteSize')) document.getElementById('liveNoteSize').value = currentUser.note_size || 1.0;
    if (document.getElementById('liveFallSpeed')) document.getElementById('liveFallSpeed').value = currentUser.fall_speed || 200;
    if (document.getElementById('liveSoundVol')) document.getElementById('liveSoundVol').value = currentUser.sound_volume || 0.5;
    if (document.getElementById('liveNoteDisplay')) document.getElementById('liveNoteDisplay').value = currentUser.note_display_mode || 'number';
}

function closeGameSettings() {
    // اول پنجره تنظیمات رو ببند
    document.getElementById('game-settings-modal').style.display = 'none';
    
    // 👈 بعدش شمارش معکوس رو شروع کن (بازی همچنان در حالت isPaused = true هست)
    startResumeCountdown();
}

async function goToFallingGame(song = null) {
    await fetchUserProfile();
    
    currentSongData = (song && Array.isArray(song.notes_data) && song.notes_data.length > 0) ? song : null;
    currentStepIdx = 0;

    let entryCost = 0;
    if (currentSongData) {
        if (currentSongData.isTutorial) {
            entryCost = 10; // مراحل آموزشی ۱۰ سکه
        } else {
            const isVip = currentUser?.is_vip;
            const createdDate = currentSongData.created_at ? new Date(currentSongData.created_at) : new Date();
            const daysOld = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
            
            if (daysOld > 14 && !isVip) {
                entryCost = 20; // آهنگ قدیمی‌تر از ۱۴ روز
            }
        }
    } else {
        entryCost = 10; // حالت تستی
    }

    if ((!currentSongData || currentSongData.isTutorial) && needsRecalibration()) {
        const go = confirm(t('msg.confirm_recalib'));
        if (go) { startCalibration(); return; }
    }
    applyUserAssets();

    if (entryCost > 0) {
        if (userTokens < entryCost) { alert(t('misc.not_enough_coins')); return; }
        const token = localStorage.getItem('pm_token');
        try {
            const res = await fetch('/api/users/spend-tokens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ amount: entryCost })
            });
            if (res.ok) {
                const d = await res.json();
                userTokens = d.new_balance;
                document.getElementById('tokenDisplay').innerText = userTokens;
            } else {
                alert(t('misc.coin_deduct_error')); return;
            }
        } catch (e) { alert(t('misc.connection_error')); return; }
    }

    showView('falling-view');
    if (document.getElementById('liveFallSpeed')) document.getElementById('liveFallSpeed').value = currentUser.fall_speed || 200;
    if (document.getElementById('liveSoundVol')) document.getElementById('liveSoundVol').value = currentUser.sound_volume || 0.5;
    if (document.getElementById('liveNoteDisplay')) document.getElementById('liveNoteDisplay').value = currentUser.note_display_mode || 'number';
    
    isPaused = false;
    if (document.getElementById('btn-pause')) document.getElementById('btn-pause').innerText = "⏸️";
    const c = document.getElementById('handpanCanvasFalling');
    if (c) { c.style.display = 'block'; drawHandpan(c.getContext('2d')); setupInteraction(c, 'falling'); }
    
    isMicMode = false;
    const micBtn = document.getElementById('micBtn');
    if (micBtn) { micBtn.innerText = t('menu.mic_mode'); micBtn.style.borderColor = "var(--danger-color)"; micBtn.style.color = "var(--danger-color)"; }
    const fv = document.getElementById('falling-view');
    if (fv) fv.classList.remove('mic-active');
    HIT_Y = 220;
    const fc = document.getElementById('fallingCanvas');
    if (fc) { fc.width = 820; fc.height = 280; }

    score = 0; hits = 0; misses = 0; totalSpawned = 0; fallingNotes = [];
    maxCombo = 0;
    isPaused = false; 
    startCountdown();
}

async function goToWallet(){ 
    showView('wallet-view'); 
    await fetchUserProfile(); 
    loadCoinPackages(); 
    
    if (!currentUser) return;
    const statusEl = document.getElementById('vipStatusText');
    const btnEl = document.getElementById('buyVipBtn');
    if (statusEl && btnEl) {
        if (currentUser.is_vip) {
            const expireDate = new Date(currentUser.vip_expire_date).toLocaleDateString(CURRENT_LANG === 'fa' ? 'fa-IR' : 'en-US');
            statusEl.innerText = t('wallet.vip_active').replace('{date}', expireDate);
            btnEl.innerText = t('wallet.renew_vip_btn');
        } else {
            statusEl.innerText = t('wallet.vip_inactive');
            btnEl.innerText = t('wallet.buy_vip_btn');
        }
    }
}   
function goToProfile(){ showView('profile-view'); fetchUserProfile(); }

function getLeagueInfo(leagueId) {
    switch(leagueId) {
        case 'bronze': return { name: t('league.bronze'), icon: '🥉' };
        case 'silver': return { name: t('league.silver'), icon: '🥈' };
        case 'gold': return { name: t('league.gold'), icon: '🥇' };
        case 'platinum': return { name: t('league.platinum'), icon: '💠' };
        case 'diamond': return { name: t('league.diamond'), icon: '💎' };
        case 'legend': return { name: t('league.legend'), icon: '👑' };
        default: return { name: 'Unknown', icon: '❓' };
    }
}

async function goToLeaderboard() {
    showView('leaderboard-view');
    const listEl = document.getElementById('leaderboard-list');
    listEl.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">${t('editor.loading')}</div>`;

    // آپدیت باکس لیگ خود کاربر
    if (currentUser) {
        let myLeagueId = 'bronze';
        if (currentUser.level > 25) myLeagueId = 'legend';
        else if (currentUser.level > 20) myLeagueId = 'diamond';
        else if (currentUser.level > 15) myLeagueId = 'platinum';
        else if (currentUser.level > 10) myLeagueId = 'gold';
        else if (currentUser.level > 5) myLeagueId = 'silver';
        
        const myLeague = getLeagueInfo(myLeagueId);
        const iconEl = document.getElementById('my-league-icon');
        const nameEl = document.getElementById('my-league-name');
        if (iconEl) iconEl.innerText = myLeague.icon;
        if (nameEl) nameEl.innerText = myLeague.name;
    }

    try {
        const res = await fetch('/api/users/leaderboard');
        if (!res.ok) throw new Error('Network error');
        
        const players = await res.json();
        
        if (!players || players.length === 0) {
            listEl.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">${t('leaderboard.empty')}</div>`;
            return;
        }

        listEl.innerHTML = '';
        const currentUsername = currentUser?.username;

        players.forEach(p => {
            const isMe = p.username === currentUsername;
            const row = document.createElement('div');
            const leagueInfo = getLeagueInfo(p.league || 'bronze');
            
            row.style.cssText = `display:flex; justify-content:space-between; align-items:center; padding:10px 15px; background:${isMe ? 'var(--btn-shadow)' : 'var(--bg-main)'}; border:1px solid ${isMe ? 'var(--primary)' : 'var(--border)'}; border-radius:10px; font-size:14px;`;
            
            let rankIcon = p.rank;
            if (p.rank === 1) rankIcon = '🥇';
            else if (p.rank === 2) rankIcon = '🥈';
            else if (p.rank === 3) rankIcon = '🥉';

            let avatarHtml = '';
            if (p.selected_avatar && p.selected_avatar !== 'default') {
                const avSrc = p.selected_avatar.startsWith('http') ? p.selected_avatar : `/assets/avatars/${p.selected_avatar}.png`;
                avatarHtml = `<img src="${avSrc}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid var(--border);">`;
            } else {
                avatarHtml = `<div style="width:32px; height:32px; border-radius:50%; background:var(--bg-card); display:flex; align-items:center; justify-content:center; font-weight:bold; border:2px solid var(--border);">${p.username.charAt(0).toUpperCase()}</div>`;
            }

            // 👇 نمایش میانگین دقت زیر XP
            row.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-size:18px; width:24px; text-align:center; font-weight:bold; color:${p.rank <= 3 ? '#fbbf24' : 'var(--text-muted)'};">${rankIcon}</span>
                    ${avatarHtml}
                    <div>
                        <div style="font-weight:bold; color:${isMe ? 'var(--primary)' : 'var(--text-main)'};">
                            ${escapeHtml(p.username)} 
                            ${isMe ? `<span style="font-size:10px; color:var(--text-muted);">(${t('leaderboard.you')})</span>` : ''}
                        </div>
                        <div style="font-size:11px; color:var(--text-muted);">Lvl ${p.level} · <span style="color:var(--primary);">${leagueInfo.icon} ${leagueInfo.name}</span></div>
                    </div>
                </div>
                <div style="text-align:left;">
                    <div style="font-weight:bold; color:var(--coin-text); font-size:15px;">${p.xp} XP</div>
                    <div style="font-size:10px; color:var(--success-color); margin-top:2px;">🎯 ${p.avg_accuracy}%</div>
                </div>
            `;
            listEl.appendChild(row);
        });
    } catch (e) {
        listEl.innerHTML = `<div style="text-align:center; color:var(--danger-color); padding:20px;">${t('msg.error_server')}</div>`;
    }
}  

function goToSettings(){ showView('settings-view'); fetchUserProfile(); renderAvatarGallery(); renderSkinGallery(); }

function updateEditorCostText() {
    const costEl = document.getElementById('editor-cost-text');
    if (!costEl || !currentUser) return;

    let cost = 150;
    const now = new Date();
    const discountUntil = currentUser.song_discount_until ? new Date(currentUser.song_discount_until) : null;

    // اگر زمان تخفیف معتبر بود
    if (discountUntil && discountUntil > now) {
        cost = Math.floor(150 * 0.75); // ۱۱۲ سکه
        costEl.innerHTML = `💰 هزینه ساخت آهنگ: <del style="color:var(--danger-color); opacity:0.7;">۱۵۰</del> <span style="color:var(--success-color); font-size:18px;">${cost}</span> سکه (تخفیف ۲۵٪ فعال!)`;
    } else {
        costEl.innerHTML = `💰 هزینه ساخت آهنگ: ۱۵۰ سکه`;
    }
}

async function goToSongEditor() {
    await fetchUserProfile(); // 👈 گرفتن آخرین وضعیت کاربر از دیتابیس
    showView('editor-view');
    if (typeof initSongEditor === 'function') {
        initSongEditor(); 
    }
    applyLanguage(); 
    updateEditorCostText(); // 👈 آپدیت کردن متن هزینه
}

function goToTrainingMenu() {
    showView('training-view');
}

function goToTutorialLevel(n) {
    const levelData = TUTORIAL_LEVELS[n];
    if (levelData) {
        goToFallingGame(levelData);
    }
}

function goToMySongs() {
    showView('my-songs-view');
    if (typeof loadMySongsInto === 'function') {
        loadMySongsInto('my-songs-list-menu');
    }
}

function onLanguageChange(l) {
    if (currentUser) currentUser.language = l; 
    setLang(l); 
    document.querySelectorAll('[data-i18n]').forEach(el => { 
        const tr = t(el.getAttribute('data-i18n')); 
        if(tr) el.innerText = tr; 
    });
}
function previewFont(f){ applyFont(f); }

// ==========================================================
// DRAWING
// ==========================================================
function drawHandpan(ctx, highlight = null) {
    const W = 820, H = 500; ctx.clearRect(0, 0, W, H);
    const cx = 410, cy = 250, r = 220;
    const currentSkinId = currentUser?.active_skin || 'default';
    const mode = currentUser?.note_display_mode || 'number';
    
    if (currentSkinId !== 'default' && SKIN_IMAGES[currentSkinId]) {
        const skinImg = SKIN_IMAGES[currentSkinId];
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip(); 
        ctx.drawImage(skinImg, cx - r, cy - r, r * 2, r * 2);
        ctx.restore();

        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = getCSSVar('--border', '#475569'); ctx.lineWidth = 3; ctx.stroke();
    } 
    else {
        ctx.shadowColor = '#000'; ctx.shadowBlur = 25;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = getCSSVar('--bg-card', '#1e293b'); ctx.fill();
        ctx.shadowBlur = 0; ctx.strokeStyle = getCSSVar('--border', '#475569'); ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, r - 10, 0, Math.PI * 2); ctx.fillStyle = getCSSVar('--bg-main', '#0f172a'); ctx.fill();
        ctx.strokeStyle = getCSSVar('--border', '#334155'); ctx.lineWidth = 2; ctx.stroke();
    }

    for (const [key, [x, y, bR]] of Object.entries(ACTIVE_LAYOUT)) {
        const r2 = getNoteRadius(bR), col = NOTE_COLORS[key] || "#60a5fa", hl = highlight === key;
        
        ctx.beginPath(); ctx.arc(x, y, r2 + 2, 0, Math.PI * 2); 
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; 
        ctx.fill();
        
        ctx.beginPath(); ctx.arc(x, y, r2, 0, Math.PI * 2); 
        
        if (currentSkinId !== 'default' && SKIN_IMAGES[currentSkinId]) {
            ctx.fillStyle = hl ? 'rgba(30, 58, 138, 0.3)' : 'rgba(15, 23, 42, 0.3)';
        } else {
            ctx.fillStyle = hl ? 'rgba(30, 58, 138, 0.3)' : 'rgba(30, 41, 59, 0.3)';
        }
        ctx.fill();
        
        ctx.strokeStyle = hl ? '#fff' : '#475569'; ctx.lineWidth = hl ? 3 : 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, r2 - 5, 0, Math.PI * 2); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
        
        let displayTxt = (mode === 'name') ? (KEY_TO_NAME[key] || key) : key;
        ctx.fillStyle = hl ? '#fff' : '#cbd5e1';
        ctx.font = `bold ${r2 >= 50 ? 32 : (r2 >= 32 ? 24 : 18)}px Arial`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(displayTxt, x, y);
    }
}

// ==========================================================
// FALLING GAME LOGIC
// ==========================================================
let fallingNotes=[];
let animationId=null, lastTime=0;
let score=0,hits=0,misses=0,totalSpawned=0;
let isPaused = false;
let gameTimerInterval = null;
let gameSeconds = 0;
let MAX_NOTES=20, HIT_Y=220;
let currentSongData = null;
let currentStepIdx = 0;
let currentSpawnInterval = 1.0;
let isGameRunning=false, noteSpawnTimer=0, countdownInterval=null;
let currentCombo = 0;       // 👈 کمبو فعلی
let maxCombo = 0;           // 👈 بیشترین کمبو
let particles = [];         // 👈 آرایه برای ذرات
let shakeTime = 0;          // 👈 زمان باقی‌مانده لرزش
let shakeIntensity = 0;     // 👈 شدت لرزش
const ctxFall=document.getElementById('fallingCanvas').getContext('2d');
const TEST_SEQUENCE=["D","1","2","3","4","5","6","7","8"];
const TUTORIAL_LEVELS = {
    1: { title: "ضرب گیری", isTutorial: true, fall_speed: 1, notes_data: [{notes:["1"]}, {notes:["4"]}, {notes:["8"]}, {notes:["5"]}, {notes:["1"]}, {notes:["4"]}, {notes:["8"]}, {notes:["5"]}, {notes:["1"]}, {notes:["4"]}, {notes:["8"]}, {notes:["5"]}, {notes:["2"]}, {notes:["3"]}, {notes:["7"]}, {notes:["6"]}, {notes:["2"]}, {notes:["3"]}, {notes:["7"]}, {notes:["6"]}, {notes:["2"]}, {notes:["3"]}, {notes:["7"]}, {notes:["6"]}] },    
    2: { title: "Tutorial 2", isTutorial: true, fall_speed: 0.6, notes_data: [{notes:["1"]}, {notes:["2"]}, {notes:["1"]}, {notes:["2"]}, {notes:["3"]}, {notes:["3"]}] },
    3: { title: "Tutorial 3", isTutorial: true, fall_speed: 0.8, notes_data: [{notes:["D"]}, {notes:["1"]}, {notes:["2"]}, {notes:["D"]}, {notes:["1"]}, {notes:["2"]}] },
    4: { title: "Tutorial 4", isTutorial: true, fall_speed: 0.7, notes_data: [{notes:["D","1"]}, {notes:["D","1"]}, {notes:["2","3"]}, {notes:["2","3"]}, {notes:["D","1"]}, {notes:["2","3"]}] },
    5: { title: "Tutorial 5", isTutorial: true, fall_speed: 1.0, notes_data: [{notes:["1"]}, {notes:["2"]}, {notes:["3"]}, {notes:["D","1"]}, {notes:["4"]}, {notes:["5"]}, {notes:["D","1"]}] }
};

function startCountdown(){
    let count=4;
    const ov=document.getElementById('countdown-overlay'); const tx=document.getElementById('countdown-text');
    ov.style.display='flex'; tx.innerText=count;
    countdownInterval=setInterval(()=>{
        count--;
        if(count===0) tx.innerText="GO!";
        else if(count<0){ clearInterval(countdownInterval); ov.style.display='none'; startFallingLoop(); }
        else tx.innerText=count;
    },1000);
}

function startFallingLoop() {
    isGameRunning = true;
    lastTime = performance.now();
    spawnNote();
    
    // 👇 فاصله اولیه اسپاون
    if (currentSongData) {
        const baseSpeed = currentUser?.fall_speed || 200;
        const songMultiplier = currentSongData.fall_speed || 1.0;
        // فاصله بین گام‌ها را طوری تنظیم میکنیم که با سرعت آهنگ هماهنگ باشد
        currentSpawnInterval = (1.35 / (baseSpeed * songMultiplier / 200)) || 1.0;
    } else {
        currentSpawnInterval = 1.5;
    }

    if (animationId) cancelAnimationFrame(animationId);
    requestAnimationFrame(animateFalling);
}

function spawnNote() {
    if (!isGameRunning) return;

    // حالت آهنگ
    if (currentSongData) {
        if (currentStepIdx >= currentSongData.notes_data.length) return;
        const step = currentSongData.notes_data[currentStepIdx];
        
        currentSpawnInterval = step.gap || 1.0; 
        currentStepIdx++;
        totalSpawned++;

        const baseSpeed = currentUser?.fall_speed || 200; 
        const songMultiplier = currentSongData.fall_speed || 1.0;
        const stepNotes = Array.isArray(step.notes) ? step.notes : (step.note ? [step.note] : []);
        const speed = baseSpeed * songMultiplier; // 👈 سرعت کاربر ضربدر ضریب آهنگ
        
        // 👇 محاسبه فاصله افقی
        const totalInStep = stepNotes.length;
        stepNotes.forEach((note, index) => {
            if (ACTIVE_LAYOUT[note]) {
                const xOffset = totalInStep > 1 ? (index - (totalInStep - 1) / 2) * 35 : 0; 
                fallingNotes.push({
                    note: note,
                    x: ACTIVE_LAYOUT[note][0] + xOffset, // موقعیت افقی برای جدا شدن بصری
                    y: -50, // همه از یک ارتفاع سقوط میکنن تا هم‌زمان برسن
                    speed: speed,
                    hit: false
                });
            }
        });
        return;
    }

    // حالت تستی (بدون تغییر)
    if (totalSpawned >= MAX_NOTES) return;
    totalSpawned++;
    const avail = TEST_SEQUENCE.filter(n => ACTIVE_LAYOUT[n]);
    if (!avail.length) return;
    const note = avail[Math.floor(Math.random() * avail.length)];
    fallingNotes.push({ note, x: ACTIVE_LAYOUT[note][0], y: -50, speed: currentUser?.fall_speed || 200, hit: false });
}

function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10, // سرعت افقی رندوم
            vy: (Math.random() - 0.5) * 10, // سرعت عمودی رندوم
            life: 1.0, // عمر ذره
            color: color
        });
    }
}

function animateFalling(time){
    if(!isGameRunning) return;
    if (isPaused) {
        lastTime = time; 
        animationId = requestAnimationFrame(animateFalling);
        return;
    }
    const dt=(time-lastTime)/1000; lastTime=time; noteSpawnTimer+=dt;
    
    if(noteSpawnTimer > currentSpawnInterval){ spawnNote(); noteSpawnTimer = 0; }

    // 👇 اعمال لرزش صفحه (Screen Shake)
    ctxFall.save();
    if (shakeTime > 0) {
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctxFall.translate(dx, dy);
        shakeTime -= dt;
    } else {
        shakeIntensity = 0;
    }

    ctxFall.clearRect(0, 0, 820, isMicMode ? 500 : 280);
    ctxFall.beginPath(); ctxFall.moveTo(0,HIT_Y); ctxFall.lineTo(820,HIT_Y);
    ctxFall.strokeStyle=getCSSVar('--primary', '#38bdf8'); ctxFall.lineWidth=4; ctxFall.stroke();
    
    const sm=currentUser?.note_size||1.0; const nr=25*sm;
    const mode = currentUser?.note_display_mode || 'number';

    // 👇 رسم نت‌ها
    for(let i=fallingNotes.length-1;i>=0;i--){
        const fn=fallingNotes[i]; if(fn.hit) continue;
        fn.y+=fn.speed*dt;
        
        ctxFall.beginPath(); ctxFall.arc(fn.x,fn.y,nr,0,Math.PI*2); 
        ctxFall.fillStyle=NOTE_COLORS[fn.note]||'#60a5fa'; ctxFall.fill();
        
        let displayTxt = fn.note;
        if (mode === 'name') displayTxt = KEY_TO_NAME[fn.note] || fn.note;

        ctxFall.fillStyle='#000'; 
        ctxFall.font=`bold ${Math.round(nr * 0.6)}px Arial`;        
        ctxFall.textAlign='center'; ctxFall.textBaseline='middle';
        ctxFall.fillText(displayTxt, fn.x, fn.y);
        
        if(fn.y>HIT_Y+100){ 
            misses++; 
            currentCombo = 0; // 👈 ریست شدن کمبو
            shakeTime = 0.15; shakeIntensity = 5; // 👈 لرزش صفحه هنگام خطا
            fallingNotes.splice(i,1); 
            checkEndGame(); 
        }
    }

    // 👇 رسم ذرات (Particles)
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5; // کاهش عمر ذره
        
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        
        ctxFall.globalAlpha = p.life;
        ctxFall.fillStyle = p.color;
        ctxFall.beginPath();
        ctxFall.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctxFall.fill();
        ctxFall.globalAlpha = 1.0; // برگردوندن شفافیت به حالت عادی
    }

    // 👇 نمایش متن کمبو (Combo)
    if (currentCombo > 2) {
        ctxFall.fillStyle = '#fbbf24';
        ctxFall.font = 'bold 30px Arial';
        ctxFall.textAlign = 'right';
        ctxFall.textBaseline = 'top';
        ctxFall.fillText(`Combo x${currentCombo}`, 800, 20);
    }

    ctxFall.restore(); // پایان لرزش
    animationId=requestAnimationFrame(animateFalling);
}

function executeHit(note, mode, fromMic = false) {
    if (!fromMic && !isMicMode) {
        playSound(note); 
    }
    
    const id = mode === 'free' ? 'handpanCanvasFree' : 'handpanCanvasFalling';
    const c = document.getElementById(id); 
    if (c) {
        const ctx = c.getContext('2d');
        drawHandpan(ctx, note); 
        setTimeout(() => drawHandpan(ctx), 150);
    }
    
    if (mode === 'falling' && isGameRunning) {
        checkHit(note, fromMic);
    }
}

function checkHit(note, fromMic = false) {
    let idx = -1;
    for (let i = 0; i < fallingNotes.length; i++) {
        const fn = fallingNotes[i];
        if (fn.note === note && !fn.hit) {
            if (fromMic && isMicMode) {
                if (fn.y > HIT_Y + 300 || fn.y < HIT_Y - 100) continue;
            }
            idx = i;
            break;
        }
    }

    if (idx !== -1) {
        const fn = fallingNotes[idx];
        
        // 👇 افکت‌ها هنگام ضربه موفق
        currentCombo++; // افزایش کمبو
        if (currentCombo > maxCombo) maxCombo = currentCombo;
        
        score += 100 + (currentCombo * 10); // امتیاز بیشتر با کمبو بالاتر
        
        createParticles(fn.x, fn.y, NOTE_COLORS[fn.note] || '#60a5fa'); // ساخت ذرات
        
        shakeTime = 0.05; shakeIntensity = 2; // لرزش ملایم صفحه هنگام ضربه

        fallingNotes[idx].hit = true;
        fallingNotes.splice(idx, 1);
        hits++;
        checkEndGame();
    }
}

function checkEndGame() {
    if (!isGameRunning) return;
    if (currentSongData) {
        if (currentStepIdx >= currentSongData.notes_data.length && fallingNotes.length === 0) {
            endFallingGame();
        }
    } else {
        if (totalSpawned >= MAX_NOTES && fallingNotes.length === 0) {
            endFallingGame();
        }
    }
}

function stopFallingGame(){ isGameRunning=false; if(animationId) cancelAnimationFrame(animationId); }

async function endFallingGame(){
    isGameRunning=false; 
    if(animationId) cancelAnimationFrame(animationId);
    
    // 👇 ریست کردن افکت‌ها
    currentCombo = 0;
    particles = [];
    shakeTime = 0;
    shakeIntensity = 0;
    
    const att=hits+misses; 
    const acc=att>0?Math.round((hits/att)*100):0;
    
    let practiceMode = 'falling';
    if (currentSongData) {
        practiceMode = currentSongData.isTutorial ? 'tutorial' : 'song';
    }

    const totalNotes = hits + misses;
    let earned = 0; let key = ''; let xpStr = '0';
    let comboBonus = 0;
    let gotDiscount = false;

    // 👇 قانون: اگر کمتر از ۱۵ نت باشد، هیچ پاداشی تعلق نمی‌گیرد
    if (totalNotes < 15) {
        earned = 0;
        xpStr = '0';
        key = 'result.too_short'; 
    } else {
        if (practiceMode === 'song') {
            if (acc >= 80) { earned = 25; key = 'result.reward_song_full'; xpStr = '+20'; }
            else if (acc >= 50) { earned = 10; key = 'result.reward_ok'; xpStr = '+10'; }
            else if (acc >= 25) { earned = 0; key = 'result.reward_none'; }
            else { earned = -5; key = 'result.reward_penalty'; }
        } else {
            if (acc >= 75) { earned = 15; key = 'result.reward_full'; xpStr = '+20'; }
            else if (acc >= 50) { earned = 10; key = 'result.reward_ok'; }
            else if (acc >= 25) { earned = 0; key = 'result.reward_none'; }
            else { earned = -5; key = 'result.reward_penalty'; }
        }

        // پاداش کمبو (فقط برای آهنگ‌های بالای ۱۵ نت)
        if (maxCombo >= 5) {
            comboBonus = 5;
        }
        
        // تخفیف فول کمبو (فقط برای آهنگ‌های بالای ۱۵ نت)
        if (maxCombo > 0 && maxCombo === totalNotes) {
            gotDiscount = true;
        }
    }

    const totalEarnedDisplay = earned + comboBonus;

    const showResults = async () => {
        document.getElementById('resScore').innerText = score;
        document.getElementById('resHits').innerText = hits;
        document.getElementById('resMisses').innerText = misses;
        document.getElementById('resAcc').innerText = acc + '%';
        document.getElementById('resCombo').innerText = maxCombo;
        document.getElementById('resXp').innerText = xpStr;

        window._lastResult = {
                    earned: totalEarnedDisplay, 
                    key: key, 
                    comboBonus: comboBonus, 
                    gotDiscount: gotDiscount
                };        
        renderResultToken(window._lastResult);
        showView('result-view');

        const token = localStorage.getItem('pm_token');
        try {
            // 👇 ارسال پاداش همراه با max_combo و total_notes
            const res = await fetch('/api/users/game-reward', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
                body: JSON.stringify({
                    tokens_earned: earned, 
                    accuracy: acc, 
                    score: score, 
                    mode: practiceMode,
                    max_combo: maxCombo, 
                    total_notes: hits + misses 
                }) 
            });
            
            if(res.ok) {
                const d = await res.json();
                userTokens = d.new_balance;
                document.getElementById('tokenDisplay').innerText = d.new_balance;
                document.getElementById('levelBadge').innerText = `${t('header.level_prefix')} ${d.level}`;
                document.getElementById('xpProgressFill').style.width = `${d.progress_percent}%`;
                document.getElementById('xpText').innerText = `${d.xp_in_level} / ${d.xp_needed} XP`;
                if(d.leveled_up && d.rewards_granted?.length) { 
                    window._lastRewards = d.rewards_granted; 
                    showRewardModal(d.rewards_granted); 
                }
            }
            
            // 👇 ذخیره تاریخچه همراه با max_combo و total_notes
            await fetch('/api/users/practice-history', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
                body: JSON.stringify({ 
                    mode: practiceMode, 
                    score: score, 
                    accuracy: acc,
                    max_combo: maxCombo, 
                    total_notes: hits + misses 
                }) 
            });
        } catch(e) { console.error(e); }
    };

    if (!currentUser?.is_vip) {
        showAd(showResults);
    } else {
        showResults();
    }
    
    currentSongData = null;
    currentStepIdx = 0;
}

function renderResultToken(r){
    const isPenalty = r.earned < 0;
    const color = isPenalty ? getCSSVar('--danger-color', '#ef4444') : (r.earned > 0 ? getCSSVar('--primary', '#38bdf8') : getCSSVar('--text-muted', '#94a3b8'));
    const prefix = isPenalty ? t('result.reward_prefix') : t('result.reward_prefix');
    const sign = r.earned > 0 ? '+' : '';
    
    let extraHtml = '';
    if (r.comboBonus > 0) {
        extraHtml += `<br><span style="font-size:12px; color:var(--success-color);">+${r.comboBonus} ${t('result.combo_bonus')}</span>`;
    }
    if (r.gotDiscount) {
        extraHtml += `<br><span style="font-size:12px; color:#fbbf24;">🔥 ${t('result.discount_unlocked')}</span>`;
    }

    document.getElementById('resTokenText').innerHTML = `${coinIconSVG} ${prefix} <span style="color:${color};font-size:24px;">${sign}${r.earned}</span>${extraHtml}<br><span style="font-size:14px;color:var(--text-muted);margin-top:5px;display:block;">${t(r.key)}</span>`;
}

function showRewardModal(rewards){
    const m=document.getElementById('reward-modal'); 
    const msg=document.getElementById('rewardMessage'); 
    const items=document.getElementById('rewardItems');
    const last=rewards[rewards.length-1].level;
    
    msg.innerHTML=`${t('reward.message_1')} <span style="color:var(--coin-text);font-weight:900;font-size:20px;">${last}</span> ${t('reward.message_2')}`;
    items.innerHTML='';
    
    rewards.forEach(r=>{ 
        const d=document.createElement('div'); 
        d.className='reward-item'; 
        d.style.display = 'flex';
        d.style.justifyContent = 'space-between';
        d.style.padding = '10px 15px';
        d.innerHTML = `
            <span style="color:var(--text-main);">${t('reward.level_prefix')} ${r.level}</span> 
            <span style="color:var(--coin-text); font-weight:bold;">${r.name}</span>
        `; 
        items.appendChild(d); 
    });
    m.classList.add('show');
}

function closeRewardModal(){ document.getElementById('reward-modal').classList.remove('show'); fetchUserProfile(); }

// ==========================================================
// SETTINGS & WALLET
// ==========================================================
async function loadCoinPackages(){
    try{
        const res=await fetch('/api/users/coin-packages'); if(!res.ok) return;
        const pkgs=await res.json(); const grid=document.getElementById('packagesGrid'); grid.innerHTML='';
        pkgs.forEach(p=>{
            const c=document.createElement('div'); c.className='pkg-card';
            c.innerHTML=`<div class="pkg-name">${t('wallet.pkg_'+p.id)||p.name}</div><div class="pkg-coins"><img src="/assets/coin.svg" alt="coin">${p.coins}</div><div class="pkg-price">${p.price}</div>`;
            c.onclick=()=>buyCoinPackage(p.id); grid.appendChild(c);
        });
    }catch(e){ console.error(e); }
}
async function buyCoinPackage(pid){
    const token=localStorage.getItem('pm_token');
    try{
        const res=await fetch('/api/users/buy-coins',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({package_id:pid})});
        if(res.ok){ const d=await res.json(); alert(`${d.coins_added} ${t('misc.coin')}`); await fetchUserProfile(); loadCoinPackages(); }
        else { const e=await res.json(); alert(e.detail||t('msg.error_generic')); }
    }catch(e){ alert(t('msg.error_server')); }
}

async function saveProfileInfo(){
    const token=localStorage.getItem('pm_token');
    const u=document.getElementById('setUsername').value.trim(); const em=document.getElementById('setEmail').value.trim();
    const msg=document.getElementById('profileMsg'); msg.innerText='';
    try{
        const res=await fetch('/api/users/profile',{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({username:u,email:em})});
        if(res.ok){ const d=await res.json(); if(d.access_token) localStorage.setItem('pm_token',d.access_token); msg.style.color='var(--success-color)'; msg.innerText=d.access_token?t('msg.saved_token'):t('msg.saved'); await fetchUserProfile(); }
        else { const e=await res.json(); msg.style.color='var(--danger-color)'; msg.innerText=e.detail||t('msg.error_generic'); }
    }catch(e){ msg.style.color='var(--danger-color)'; msg.innerText=t('msg.error_server'); }
}
async function changePassword(){
    const token=localStorage.getItem('pm_token');
    const o=document.getElementById('setOldPass').value; const n=document.getElementById('setNewPass').value;
    const msg=document.getElementById('passwordMsg'); msg.innerText='';
    if(n.length<6){ msg.style.color='var(--danger-color)'; msg.innerText=t('msg.pass_short'); return; }
    try{
        const res=await fetch('/api/users/password',{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({current_password:o,new_password:n})});
        if(res.ok){ msg.style.color='var(--success-color)'; msg.innerText=t('msg.pass_changed'); document.getElementById('setOldPass').value=''; document.getElementById('setNewPass').value=''; }
        else { const e=await res.json(); msg.style.color='var(--danger-color)'; msg.innerText=e.detail||t('msg.error_generic'); }
    }catch(e){ msg.style.color='var(--danger-color)'; msg.innerText=t('msg.error_server'); }
}
async function saveSettings(){
    const token = localStorage.getItem('pm_token');
    const msg = document.getElementById('settingsMsg'); 
    if (msg) msg.innerText = '';
    
    const payload = { 
        language: document.getElementById('setLanguage')?.value || 'fa',
        font_family: document.getElementById('setFont')?.value || 'Vazirmatn',
        note_display_mode: document.getElementById('setNoteDisplay')?.value || 'number', 
        active_skin: currentUser?.active_skin || 'default',
        selected_avatar: currentUser?.selected_avatar || 'default', 
        fall_speed: parseInt(document.getElementById('setFallSpeed')?.value || 200), 
        note_size: parseFloat(document.getElementById('setNoteSize')?.value || 1.0),
        theme: document.getElementById('setTheme')?.value || 'dark', 
        sound_volume: parseFloat(document.getElementById('setSoundVolume')?.value || 0.5)
    };
    
    try{
        const res = await fetch('/api/users/settings', {
            method: 'PUT', 
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, 
            body: JSON.stringify(payload)
        });
        
        if(res.ok){ 
            if (msg) { msg.style.color='var(--success-color)'; msg.innerText=t('msg.saved'); }
            if (currentUser) Object.assign(currentUser, payload);
            applyLanguage();
            await fetchUserProfile(); 
            applyLanguage();
        }
        else { 
            const e = await res.json(); 
            if (msg) { msg.style.color='var(--danger-color)'; msg.innerText = e.detail || t('msg.error_generic'); }
        }
    } catch(e) { 
        if (msg) { msg.style.color='var(--danger-color)'; msg.innerText=t('msg.error_server'); }
        console.error("Save settings error:", e);
    }
}

// ==========================================================
// INTERACTION
// ==========================================================
function setupInteraction(canvas, mode){
    const c=canvas.cloneNode(true); canvas.parentNode.replaceChild(c,canvas); drawHandpan(c.getContext('2d'));

    c.addEventListener('touchstart',(e)=>{
        e.preventDefault(); const rect=c.getBoundingClientRect();
        const sx=820/rect.width, sy=500/rect.height;
        for(let i=0;i<e.changedTouches.length;i++){
            const mx=(e.changedTouches[i].clientX-rect.left)*sx; const my=(e.changedTouches[i].clientY-rect.top)*sy;
            for(const [note,[x,y,bR]] of Object.entries(ACTIVE_LAYOUT)){
                if(Math.hypot(mx-x,my-y)<=getNoteRadius(bR)){ executeHit(note,mode); break; }
            }
        }
    },{passive:false});

    c.addEventListener('mousedown',(e)=>{
        const rect=c.getBoundingClientRect(); const mx=(e.clientX-rect.left)*(820/rect.width); const my=(e.clientY-rect.top)*(500/rect.height);
        for(const [note,[x,y,bR]] of Object.entries(ACTIVE_LAYOUT)){
            if(Math.hypot(mx-x,my-y)<=getNoteRadius(bR)){ executeHit(note,mode); break; }
        }
    });
}

// ==========================================================
// HISTORY
// ==========================================================
async function loadPracticeHistory() {
    const token = localStorage.getItem('pm_token'); if (!token) return;
    try {
        const res = await fetch('/api/users/practice-history?limit=10', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) return;
        const entries = await res.json(); renderHistoryList(entries);
    } catch(e) { console.error('history load error', e); }
}

function renderHistoryList(entries) {
    const list = document.getElementById('historyList'); if (!list) return;
    if (!entries || entries.length === 0) { 
        list.innerHTML = `<div style="text-align:center; color:#64748b; font-size:13px; padding:15px;">${t('profile.history_empty')}</div>`; 
        return; 
    }
    list.innerHTML = '';
    const locale = CURRENT_LANG === 'fa' ? 'fa-IR' : 'en-US';
    entries.forEach(e => {
        const date = new Date(e.played_at);
        const dateStr = date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
        const timeStr = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        const accuracyColor = e.accuracy >= 80 ? getCSSVar('--success-color', '#10b981') : (e.accuracy >= 50 ? getCSSVar('--warning-color', '#fbbf24') : getCSSVar('--danger-color', '#ef4444'));
        let modeIcon = '🌧️';
        if (e.mode === 'song') modeIcon = '🎵';
        else if (e.mode === 'tutorial') modeIcon = '📚';
        const item = document.createElement('div');
        item.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--bg-main); border-radius:8px; border:1px solid var(--border); font-size:13px;';
        item.innerHTML = `<div style="display:flex; align-items:center; gap:8px;"><span>${modeIcon}</span><span style="color:var(--text-muted); font-size:11px;">${dateStr} · ${timeStr}</span></div><div style="display:flex; gap:12px;"><span style="color:var(--text-main);">${e.score}</span><span style="color:${accuracyColor}; font-weight:bold;">${e.accuracy.toFixed(0)}%</span></div>`;
        list.appendChild(item);
    });
}

// ==========================================================
// MIC & CALIBRATION
// ==========================================================
let isMicMode = false;
let calibrationState = null;
let calibrationData = null;
let calibCooldownUntil = 0;    
let calibCollecting = false;    
let calibCollectStart = 0;
let calibCollectBuffer = [];
const CALIB_VOL_THRESHOLD = 0.002;
const CALIB_COOLDOWN_MS = 2000;

async function loadCalibration() {
    const token = localStorage.getItem('pm_token');
    if (!token) return;
    try {
        const res = await fetch('/api/users/calibration', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            calibrationData = await res.json();
            const notes = calibrationData.notes || {};
            window.pitchDetector.setCalibration(notes);
            console.log('✅ کالیبراسیون لود شد:', notes);
        }
    } catch(e) { console.error('calib load error', e); }
}

function needsRecalibration() {
    if (!calibrationData || !calibrationData.calibrated_at) return true;
    if (!calibrationData.notes || Object.keys(calibrationData.notes).length === 0) return true;
    const last = new Date(calibrationData.calibrated_at);
    const days = (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24);
    return days > 25;
}

function handleMicNote(noteKey, freq) {
    let mode = null;
    if (document.getElementById('free-view').classList.contains('active')) mode = 'free';
    else if (document.getElementById('falling-view').classList.contains('active')) mode = 'falling';
    
    if (mode) {
        executeHit(noteKey, mode, true); 
    }
}

async function toggleMicMode() {
    const btn = document.getElementById('micBtn'); 
    const titleSpan = btn ? btn.querySelector('.title') : null;
    const fv = document.getElementById('falling-view'); 
    const fc = document.getElementById('fallingCanvas'); 
    const hc = document.getElementById('handpanCanvasFalling');
    
    if (!isMicMode) {
        try {
            if (window.pitchDetector.setConfig) {
                window.pitchDetector.setConfig({
                    cooldownMs: 500,
                    threshold: 0.15,
                    minRms: 0.001,
                    gainValue: 5.0,
                    fftSize: 2048
                });
            }
            await window.pitchDetector.start(
                (noteKey, freq) => handleMicNote(noteKey, freq),
                () => {} 
            );
            isMicMode = true; 
            
            if (titleSpan) titleSpan.innerText = t('menu.mic_off_short');
            if (btn) { btn.style.borderColor = "var(--success-color)"; btn.style.color = "var(--success-color)"; }
            
            if (fv) fv.classList.add('mic-active'); 
            if (hc) hc.style.display = 'none'; 
            if (fc) { fc.width = 820; fc.height = 500; fc.style.aspectRatio = "820 / 500"; HIT_Y = 420; }
            alert(t('mic.success'));
        } catch (e) { 
            alert(t('mic.error').replace('{msg}', e.message)); 
        }
    } else {
        window.pitchDetector.stop(); 
        isMicMode = false; 
        
        if (titleSpan) titleSpan.innerText = t('menu.mic_short');
        if (btn) { btn.style.borderColor = "var(--danger-color)"; btn.style.color = "var(--danger-color)"; }
        
        if (fv) fv.classList.remove('mic-active'); 
        if (hc) hc.style.display = 'block'; 
        if (fc) { fc.width = 820; fc.height = 280; fc.style.aspectRatio = "820 / 280"; HIT_Y = 220; }
    }
}

async function startCalibration() {
    const allNotes = Object.keys(HANDPAN_LAYOUT_9); 
    calibrationState = { currentIdx: 0, allNotes: allNotes, samples: {}, MIN_SAMPLES: 3, MAX_SAMPLES: 10, movingNext: false };
    allNotes.forEach(n => calibrationState.samples[n] = []);
    calibCooldownUntil = 0; calibCollecting = false; calibCollectBuffer = [];
    showView('calibration-view'); updateCalibrationUI();
    try { window.pitchDetector.stop(); } catch(e) {}
    await new Promise(r => setTimeout(r, 300));
    if (window.pitchDetector.setConfig) {
        window.pitchDetector.setConfig({
            cooldownMs: 2000,
            threshold: 0.15,
            minRms: 0.002,
            gainValue: 5.0,
            fftSize: 2048
        });
    }
    try { await window.pitchDetector.start(() => {}, (rawPitch, rms) => onCalibrationPitch(rawPitch, rms)); } catch(e) { alert(t('mic.error').replace('{msg}', e.message)); cancelCalibration(); }
}

function onCalibrationPitch(rawPitch, rms) {
    if (!calibrationState) return;
    const liveEl = document.getElementById('calibLiveFreq'); const cooldownEl = document.getElementById('calibCooldown'); const now = Date.now();
    if (liveEl) { const volPct = (rms * 100).toFixed(1); liveEl.innerText = rawPitch ? `${rawPitch.toFixed(1)} Hz | Vol: ${volPct}%` : `— | Vol: ${volPct}%`; }
    if (calibrationState.movingNext) return;
    if (now < calibCooldownUntil) {
        const remaining = Math.ceil((calibCooldownUntil - now) / 1000);
        if (cooldownEl) cooldownEl.innerHTML = t('calib.wait_sec').replace('{sec}', remaining);
        return;
    } else { if (cooldownEl && cooldownEl.innerText.includes('صبر')) cooldownEl.innerHTML = `<strong style="color:var(--success-color);">${t('calib.ready_next')}</strong>`; }

    const currentNote = calibrationState.allNotes[calibrationState.currentIdx]; if (!currentNote) return;
    const arr = calibrationState.samples[currentNote];

    if (!calibCollecting && rms > CALIB_VOL_THRESHOLD && rawPitch) { calibCollecting = true; calibCollectStart = now; calibCollectBuffer = [rawPitch]; return; }

    if (calibCollecting) {
        if (rawPitch) calibCollectBuffer.push(rawPitch);
        if (now - calibCollectStart > 300) {
            if (calibCollectBuffer.length < 5) { calibCollecting = false; calibCollectBuffer = []; return; }
            const sorted = [...calibCollectBuffer].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)];
            const consistent = sorted.filter(p => Math.abs(p - median) / median < 0.05);
            if ((consistent.length / sorted.length) < 0.6) {
                if (cooldownEl) { cooldownEl.innerHTML = t('calib.noise'); cooldownEl.style.color = 'var(--danger-color)'; }
                calibCollecting = false; calibCollectBuffer = []; return;
            }
            if (median < 50 || median > 4000) {
                if (cooldownEl) { cooldownEl.innerHTML = t('calib.invalid_freq'); cooldownEl.style.color = 'var(--danger-color)'; }
                calibCollecting = false; calibCollectBuffer = []; return;
            }
            arr.push(median); updateCalibrationUI();
            calibCooldownUntil = now + CALIB_COOLDOWN_MS;
            if (cooldownEl) { cooldownEl.innerHTML = t('calib.registered').replace('{val}', median.toFixed(1)).replace('{count}', arr.length); cooldownEl.style.color = 'var(--primary)'; }
            calibCollecting = false; calibCollectBuffer = [];
            if (arr.length >= calibrationState.MIN_SAMPLES) {
                calibrationState.movingNext = true;
                setTimeout(() => {
                    if (!calibrationState) return;
                    calibrationState.movingNext = false;
                    if (calibrationState.currentIdx < calibrationState.allNotes.length - 1) {
                        calibrationState.currentIdx++; calibCooldownUntil = 0; updateCalibrationUI();
                        if (cooldownEl) { cooldownEl.innerHTML = `<strong style="color:var(--success-color);">${t('calib.next_note')}</strong>`; cooldownEl.style.color = 'var(--success-color)'; }
                    } else { finishCalibration(); }
                }, CALIB_COOLDOWN_MS + 200);
            }
        }
    }
}

function updateCalibrationUI() {
    if (!calibrationState) return;
    const currentNote = calibrationState.allNotes[calibrationState.currentIdx]; const count = calibrationState.samples[currentNote]?.length || 0;
    const noteNameMap = { "D": "D", "1": "۱", "2": "۲", "3": "۳", "4": "۴", "5": "۵", "6": "۶", "7": "۷", "8": "۸" };
    const noteEl = document.getElementById('calibNoteName'); if (noteEl) noteEl.innerText = noteNameMap[currentNote] || currentNote;
    const countEl = document.getElementById('calibCount'); if (countEl) countEl.innerText = count;
    const freqEl = document.getElementById('calibFreqInfo');
    if (freqEl) {
        if (count > 0) { const arr = calibrationState.samples[currentNote]; const avg = arr.reduce((a,b)=>a+b, 0) / arr.length; freqEl.innerText = t('calib.avg').replace('{val}', avg.toFixed(1)); }
        else freqEl.innerText = t('calib.waiting_hit');
    }
    const doneEl = document.getElementById('calibDoneList');
    if (doneEl) {
        const done = Object.keys(calibrationState.samples).filter(n => calibrationState.samples[n].length >= calibrationState.MIN_SAMPLES).map(n => noteNameMap[n] || n);
        doneEl.innerText = done.length > 0 ? done.join(' · ') : '—';
    }
}

function skipCalibNote() {
    if (!calibrationState) return;
    calibrationState.currentIdx++; calibCooldownUntil = 0;
    if (calibrationState.currentIdx >= calibrationState.allNotes.length) finishCalibration();
    else updateCalibrationUI();
}

async function finishCalibration() {
    if (!calibrationState) return;
    window.pitchDetector.stop();
    const result = {};
    for (const [note, samples] of Object.entries(calibrationState.samples)) {
        if (samples.length < calibrationState.MIN_SAMPLES) continue;
        const min = Math.min(...samples); const max = Math.max(...samples); const avg = samples.reduce((a,b)=>a+b, 0) / samples.length;
        const padding = avg * 0.03;
        result[note] = { min: parseFloat((min - padding).toFixed(2)), max: parseFloat((max + padding).toFixed(2)), avg: parseFloat(avg.toFixed(2)) };
    }
    if (Object.keys(result).length === 0) { alert(t('calib.none')); calibrationState = null; backToMenu(); return; }
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/calibration', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ notes: result }) });
        if (res.ok) {
            calibrationData = { notes: result, calibrated_at: new Date().toISOString() };
            window.pitchDetector.setCalibration(result);
            alert(t('calib.saved'));
            calibrationState = null;
            backToMenu();
        }
    } catch (e) { alert(t('msg.error_server')); }
}

function cancelCalibration() { window.pitchDetector.stop(); calibrationState = null; backToMenu(); }

async function diagnoseMic() {
    const result = [];
    result.push(`${t('mic.diag.browser')} ${navigator.userAgent.substring(0, 60)}...`);
    result.push(`${t('mic.diag.secure')} ${window.isSecureContext ? '✅ HTTPS/localhost' : '❌ HTTP (Problem!)'}`);
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(d => d.kind === 'audioinput');
        result.push(`${t('mic.diag.mics')} ${mics.length}`);
    } catch(e) { result.push(`enumerateDevices error: ${e.message}`); }

    try {
        if (window.pitchDetector) window.pitchDetector.stop();
        await new Promise(r => setTimeout(r, 1000));
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        result.push(`\n${t('mic.diag.success').replace('{n}', stream.getAudioTracks().length)}`);
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') await ctx.resume();
        const analyser = ctx.createAnalyser(); analyser.fftSize = 2048;
        const source = ctx.createMediaStreamSource(stream); source.connect(analyser);
        result.push(`\n${t('mic.diag.instruction')}`);
        alert(result.join('\n'));
        let maxVol = 0; const startTime = Date.now();
        await new Promise(resolve => {
            const check = () => {
                const buf = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(buf);
                let sum = 0; for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
                const vol = Math.sqrt(sum / buf.length) * 100;
                if (vol > maxVol) maxVol = vol;
                if (Date.now() - startTime < 3000) requestAnimationFrame(check);
                else resolve();
            }; check();
        });
        stream.getTracks().forEach(t => t.stop()); ctx.close();
        alert(`${t('mic.diag.done').replace('{vol}', maxVol.toFixed(2))}${maxVol > 0.5 ? t('mic.diag.ok') : t('mic.diag.low')}`);
    } catch(e) { alert(t('mic.diag.error').replace('{name}', e.name).replace('{msg}', e.message)); }
}

// ==========================================================
// گالری آواتار و DiceBear
// ==========================================================
const AVATAR_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const FREE_AVATARS = ['1', '2', '3', '4'];
const AVATAR_PRICES = {
    "1": 0, "2": 0, "3": 0, "4": 0,
    "5": 50, "6": 50, "7": 100, "8": 100,
    "9": 150, "10": 150, "11": 200, "12": 200
};

function renderAvatarGallery() {
    const gallery = document.getElementById('avatarGallery');
    if (!gallery) return;
    gallery.innerHTML = '';
    
    const owned = currentUser?.owned_avatars || FREE_AVATARS;
    const highlighted = currentUser?.highlighted_avatars || [];

    AVATAR_LIST.forEach(avName => {
        const isFree = FREE_AVATARS.includes(avName);
        const isOwned = owned.includes(avName);
        
        const wrap = document.createElement('div');
        wrap.style.position = 'relative';
        wrap.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.src = `/assets/avatars/${avName}.png`; 
        img.className = 'avatar-option';
        img.style.pointerEvents = 'none';
        
        if (currentUser?.selected_avatar === avName) img.classList.add('selected');
        wrap.appendChild(img);
        
        if (!isFree && !isOwned) {
            img.style.opacity = '0.4';
            const lock = document.createElement('div');
            lock.innerHTML = `🔒<br><span style="font-size:10px; color:var(--coin-text);">${AVATAR_PRICES[avName]}</span>`;
            lock.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; font-size:18px; text-shadow:1px 1px 3px #000; pointer-events:none;';
            wrap.appendChild(lock);
        }
        
        wrap.onclick = () => {
            if (isFree || isOwned) selectAvatar(avName);
            else promptBuyAvatar(avName);
        };
        gallery.appendChild(wrap);
    });

    const randomAvatars = owned.filter(id => id.startsWith('http'));
    randomAvatars.forEach(url => {
        const wrap = document.createElement('div');
        wrap.style.position = 'relative';
        wrap.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.src = url; 
        img.className = 'avatar-option';
        img.style.pointerEvents = 'none';
        
        if (currentUser?.selected_avatar === url) img.classList.add('selected');
        wrap.appendChild(img);
        
        const isHighlighted = highlighted.includes(url);
        const star = document.createElement('div');
        star.className = 'avatar-star' + (isHighlighted ? ' active' : '');
        star.innerText = isHighlighted ? '⭐' : '☆';
        star.style.pointerEvents = 'auto';
        star.onclick = (e) => { e.stopPropagation(); toggleHighlight(url); };
        wrap.appendChild(star);

        const delBtn = document.createElement('div');
        delBtn.className = 'avatar-delete';
        delBtn.innerHTML = '✕';
        delBtn.style.pointerEvents = 'auto';
        delBtn.onclick = (e) => { e.stopPropagation(); deleteRandomAvatar(url); };
        wrap.appendChild(delBtn);
        
        wrap.onclick = () => selectAvatar(url);
        gallery.appendChild(wrap);
    });
}

async function promptBuyAvatar(avName) {
    const price = AVATAR_PRICES[avName] || 50;
    const msg = t('msg.confirm_buy_avatar').replace('{name}', avName).replace('{price}', price);
    if (!confirm(msg)) return;
    
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/buy-avatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ avatar_id: avName, cost: price })
        });
        
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
            
            if (!currentUser.owned_avatars) currentUser.owned_avatars = [...FREE_AVATARS];
            currentUser.owned_avatars.push(avName);
            
            await selectAvatar(avName);
            alert(t('msg.buy_success'));
        } else {
            const err = await res.json();
            alert(err.detail || t('msg.error_generic'));
        }
    } catch (e) { alert(t('msg.error_server')); }
}

async function selectAvatar(avName) {
    if (!currentUser) return;
    
    const oldAvatar = currentUser.selected_avatar; 
    currentUser.selected_avatar = avName; 
    renderAvatarGallery(); 
    updateUIFromUser(currentUser); 
    
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ selected_avatar: avName })
        });
        
        if (res.ok) {
            const msg = document.getElementById('avatarMsg');
            if(msg) { msg.style.color='var(--success-color)'; msg.innerText = t('avatar.saved'); setTimeout(()=>msg.innerText='', 2000); }
        } else {
            currentUser.selected_avatar = oldAvatar;
            renderAvatarGallery();
            updateUIFromUser(currentUser);
            alert(t('avatar.error'));
        }
    } catch (e) { 
        currentUser.selected_avatar = oldAvatar;
        renderAvatarGallery();
        updateUIFromUser(currentUser);
        console.error(e); 
    }
}

async function generateRandomAvatar() {
    if (!currentUser) return;
    const cost = 20;
    const owned = currentUser.owned_avatars || [];
    const highlighted = currentUser.highlighted_avatars || [];
    const randomList = owned.filter(a => a.startsWith('http'));
    
    if (randomList.length >= 5) {
        const unhighlighted = randomList.filter(a => !highlighted.includes(a));
        if (unhighlighted.length === 0) {
            alert(t('msg.random_avatar_limit_error'));
            return;
        }
        if (!confirm(t('msg.confirm_random_avatar_limit'))) return;
    }
    
    if (!confirm(t('msg.confirm_random_avatar_cost').replace('{cost}', cost))) return;
    
    const gender = document.getElementById('avatarGender')?.value || 'male';
    const randomSeed = Math.random().toString(36).substring(7);
    let dicebearUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`;
    if (gender === 'male') dicebearUrl += '&facialHairProbability=100&hair=short01,short02,short03,short04,short05'; 
    else dicebearUrl += '&facialHairProbability=0&hair=long01,long02,long03,long04,long05';
    
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/buy-avatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ avatar_id: dicebearUrl, cost: cost })
        });
        
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
            await fetchUserProfile();
            await selectAvatar(dicebearUrl);
            const msg = document.getElementById('avatarMsg');
            if(msg) { msg.style.color='var(--success-color)'; msg.innerText = t('msg.avatar_uploaded'); setTimeout(()=>msg.innerText='', 3000); }
        } else {
            const err = await res.json();
            alert(err.detail || t('msg.error_generic'));
        }
    } catch (e) { alert(t('msg.error_server')); }
}

function toggleAccordion(contentId, chevronId) {
    const content = document.getElementById(contentId);
    const chevron = document.getElementById(chevronId);
    if (!content) return;
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        if (chevron) chevron.innerText = '▲';
        
        if (contentId === 'avatarGalleryWrap') renderAvatarGallery();
        if (contentId === 'skinGalleryWrap') renderSkinGallery();
    } else {
        content.style.display = 'none';
        if (chevron) chevron.innerText = '▼';
    }
}

async function toggleHighlight(avatarUrl) {
    if (!currentUser) return;
    
    const highlighted = currentUser.highlighted_avatars || [];
    const isCurrentlyHighlighted = highlighted.includes(avatarUrl);
    
    if (isCurrentlyHighlighted) {
        currentUser.highlighted_avatars = highlighted.filter(u => u !== avatarUrl);
    } else {
        currentUser.highlighted_avatars = [...highlighted, avatarUrl];
    }
    
    renderAvatarGallery(); 
    
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/toggle-highlight', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ avatar_url: avatarUrl })
        });
        if (res.ok) {
            const data = await res.json();
            currentUser.highlighted_avatars = data.highlighted_avatars;
            renderAvatarGallery();
        }
    } catch (e) { console.error(e); }
}

async function deleteRandomAvatar(avatarUrl) {
    if (!currentUser) return;
    
    const isHighlighted = currentUser.highlighted_avatars?.includes(avatarUrl);
    const msg = isHighlighted ? t('msg.confirm_delete_highlight') : t('msg.confirm_delete_avatar');
    if (!confirm(msg)) return;

    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/delete-avatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ avatar_url: avatarUrl })
        });
        
        if (res.ok) {
            await fetchUserProfile();
            renderAvatarGallery();
            const msgEl = document.getElementById('avatarMsg');
            if(msgEl) { 
                msgEl.style.color='#10b981'; 
                msgEl.innerText = t('msg.avatar_deleted'); 
                setTimeout(()=>msgEl.innerText='', 2000); 
            }
        } else {
            const err = await res.json();
            alert(err.detail || t('msg.error_generic'));
        }
    } catch (e) { alert(t('msg.error_server')); }
}

// ==========================================================
// VIP & Ads System
// ==========================================================
let adInterval = null;

async function buyVip() {
    if (!confirm(t('vip.confirm'))) return;
    
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/buy-vip', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
            
            await fetchUserProfile(); 
            goToWallet(); 
            
            alert(t('vip.success'));
        } else {
            const err = await res.json();
            alert(err.detail || t('vip.error'));
        }
    } catch (e) { alert(t('msg.error_server')); }
}

function showAd(onComplete) {
    if (currentUser?.is_vip) { onComplete(); return; }
    const overlay = document.getElementById('ad-overlay');
    const timerEl = document.getElementById('ad-timer');
    const btnEl = document.getElementById('ad-close-btn');
    if (!overlay || !timerEl || !btnEl) { onComplete(); return; }
    
    overlay.style.display = 'flex';
    let timeLeft = 5;
    timerEl.innerText = timeLeft;
    btnEl.classList.remove('ready');
    btnEl.innerText = t('ad.wait_btn');
    btnEl.disabled = true;
    
    clearInterval(adInterval);
    adInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(adInterval);
            timerEl.innerText = '✓';
            btnEl.classList.add('ready');
            btnEl.innerText = t('ad.close_btn');
            btnEl.disabled = false;
            btnEl.onclick = () => {
                overlay.style.display = 'none';
                onComplete();
            };
        }
    }, 1000);
}

// ==========================================================
// گالری اسکین‌ها
// ==========================================================
const SKIN_PRICES = {
    "wood": 150, "silver": 200, "gold": 300, "rainbow": 500,
    "marble": 400, "ice_blue": 350, "bronze": 250, "turquoise": 600,
    "dark": 800, "royal": 1000
};

function renderSkinGallery() {
    const gallery = document.getElementById('skinGallery');
    if (!gallery) return;
    gallery.innerHTML = '';
    
    const owned = currentUser?.owned_skins || [];

    Object.keys(SKINS).forEach(skinId => {
        const skin = SKINS[skinId];
        const isDefault = skinId === 'default';
        const isOwned = owned.includes(skinId) || isDefault;
        const localizedName = t('skin.' + skinId);
        
        const wrap = document.createElement('div');
        wrap.style.position = 'relative';
        wrap.style.cursor = 'pointer';
        wrap.title = localizedName;
        
        const img = document.createElement('img');
        if (isDefault) {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="35" fill="%231e293b" stroke="%23475569" stroke-width="3"/><circle cx="35" cy="35" r="8" fill="%230f172a"/></svg>';
        } else {
            img.src = `/assets/skins/${skinId}.png`;
        }
        img.className = 'skin-option';
        img.style.pointerEvents = 'none';
        
        if (currentUser?.active_skin === skinId) img.classList.add('selected');
        wrap.appendChild(img);
        
        if (!isOwned) {
            img.classList.add('locked');
            const priceTag = SKIN_PRICES[skinId] || 0;
            const badge = document.createElement('div');
            badge.className = 'skin-price-badge';
            badge.innerHTML = `🔒<br>${priceTag}`;
            wrap.appendChild(badge);
        }
        
        wrap.onclick = () => {
            if (isOwned) {
                selectSkin(skinId);
            } else {
                promptBuySkin(skinId);
            }
        };
        gallery.appendChild(wrap);
    });
}

async function selectSkin(skinId) {
    if (!currentUser) return;
    currentUser.active_skin = skinId;
    renderSkinGallery();
    updateUIFromUser(currentUser); 
    
    const token = localStorage.getItem('pm_token');
    try {
        await fetch('/api/users/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ active_skin: skinId })
        });
    } catch (e) { console.error(e); }
}

async function promptBuySkin(skinId) {
    const price = SKIN_PRICES[skinId] || 0;
    const msg = t('msg.confirm_buy_skin').replace('{price}', price);
    if (!confirm(msg)) return;
    
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/buy-skin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ skin_id: skinId })
        });
        
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
            if (!currentUser.owned_skins) currentUser.owned_skins = [];
            currentUser.owned_skins.push(skinId);
            await selectSkin(skinId);
            alert(t('msg.skin_buy_success'));
        } else {
            const err = await res.json();
            alert(err.detail || t('msg.error_generic'));
        }
    } catch (e) { alert(t('msg.error_server')); }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pm_theme', theme); 
    
    // 👈 وقتی تم عوض میشه، بک‌گراند صفحه فعلی رو دوباره ست کن
    const activeView = document.querySelector('.view.active');
    if (activeView && typeof applyViewBackground === 'function') {
        applyViewBackground(activeView.id);
    }
}

function previewTheme(theme) {
    applyTheme(theme);
}

// ==========================================================
// Levels & Rewards Data (Mirroring backend levels.py)
// ==========================================================
const LEVELS_DATA = {
    fa: ["تازه‌کار","مبتدی","تمرین‌کننده","کوشا","چابک","همراه","پیشرو","سرسخت","الهام‌بخش","استاد ضرب","نوازنده","خنیاگر","هنرمند","خلاق","حرفه‌ای","ماهر","برتر","افسانه‌جو","نخبه","استاد","استاد بزرگ","افسانه","اسطوره","حماسه","پهلوان","جاودان","خردمند","یگانه","بی‌همتا","حکیم اعظم"],
    en: ["Beginner","Novice","Practitioner","Diligent","Agile","Companion","Pioneer","Tenacious","Inspiring","Rhythm Master","Musician","Minstrel","Artist","Creative","Professional","Skilled","Superior","Legend Seeker","Elite","Master","Grand Master","Legend","Myth","Epic","Champion","Immortal","Sage","Unique","Peerless","Grand Sage"],
    rewards: {
        2: "10 سکه", 3: "30 سکه", 4: "اسکین چوبی", 5: "50 سکه", 6: "70 سکه", 7: "اسکین نقره‌ای", 
        8: "70 سکه", 9: "100 سکه", 10: "هنگ‌درام +۱ نت", 11: "120 سکه", 12: "اسکین طلایی", 
        13: "300 سکه", 14: "اسکین هفت رنگ", 15: "اسکین رگه‌دار", 16: "اسکین آسمانی", 17: "400 سکه", 
        18: "هنگ‌درام +۱ نت", 19: "اسکین برنزی", 20: "اسکین فیروزه‌ای", 21: "500 سکه", 
        22: "هنگ‌درام +۱ نت", 23: "هنگ‌درام +۱ نت", 24: "هنگ‌درام +۱ نت", 25: "600 سکه", 
        26: "هنگ‌درام +۱ نت", 27: "اسکین تاریکی", 28: "هنگ‌درام +۱ نت", 29: "750 سکه", 
        30: "اسکین افسانه‌ای + سکه 1000"
    }
};

// ==========================================================
// Levels & Rewards Logic (Dynamic)
// ==========================================================
let levelsConfig = null; // ذخیره دیتای لول‌ها در حافظه

async function goToLevels() {
    showView('levels-view');
    await fetchUserProfile(); 
    
    if (!levelsConfig) {
        const listEl = document.getElementById('levels-list');
        if (listEl) listEl.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);">در حال دریافت اطلاعات...</div>';
        
        try {
            const res = await fetch('/api/users/levels-data');
            if (res.ok) levelsConfig = await res.json();
        } catch(e) {
            console.error("Failed to load levels data", e);
            return;
        }
    }
    renderLevels();
}

function showSkinPreview(skinId, skinName) {
    const modal = document.getElementById('skin-preview-modal');
    const title = document.getElementById('skin-preview-title');
    const img = document.getElementById('skin-preview-img');
    
    title.innerText = skinName;
    // آدرس عکس اسکین رو بر اساس آیدی می‌سازیم. دقت کن اسم فایل‌ها باید با این آیدی‌ها هماهنگ باشن
    img.src = `/assets/skins/${skinId}.png`; 
    
    // اگر عکس پیدا نشد، یک ارور جایگزین نمایش بده
    img.onerror = () => { img.src = '/assets/coin.svg'; }; 
    
    modal.classList.add('show');
}

function renderLevels() {
    const listEl = document.getElementById('levels-list');
    if (!listEl || !currentUser || !levelsConfig) return;
    listEl.innerHTML = '';

    const currentLevel = currentUser.level;
    const progress = currentUser.progress_percent || 0; 
    const namesArray = CURRENT_LANG === 'fa' ? levelsConfig.names_fa : levelsConfig.names_fa;

    for (let i = 1; i <= 30; i++) {
        const levelName = namesArray[i - 1] || "Unknown";
        const rewardObj = levelsConfig.rewards[i];
        
        let rewardText = "بدون جایزه";
        let isSkin = false;
        let skinId = "";
        
        if (rewardObj) {
            rewardText = rewardObj.name;
            if (rewardObj.type === 'handpan_skin') {
                isSkin = true;
                skinId = rewardObj.id;
            }
        }

        let fillPercent = 0;
        if (i < currentLevel) fillPercent = 100;
        else if (i === currentLevel) fillPercent = progress;

        let fillColor = 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'; 
        if (i === currentLevel) fillColor = 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)'; 
        if (i > currentLevel) fillColor = 'transparent';

        const card = document.createElement('div');
        card.style.cssText = `
            display: flex; flex-direction: column; align-items: center; 
            background: var(--bg-card); padding: 15px; border-radius: 12px;
            border: 1px solid ${i === currentLevel ? 'var(--primary)' : 'var(--border)'};
            width: 100%; max-width: 350px; position: relative; margin-bottom: 10px;
            flex-direction: row; justify-content: space-between;
            ${i === currentLevel ? 'box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);' : ''}
        `;

        const cylinderHtml = `
            <div style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 14px; font-weight: 900; color: ${i <= currentLevel ? 'var(--primary)' : 'var(--text-muted)'};">Lvl ${i}</div>
                    <div style="font-size: 12px; color: var(--text-main); font-weight: bold;">${levelName}</div>
                </div>
                
                <div style="width: 100%; height: 16px; background: var(--bg-main); border: 2px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);">
                    <div style="width: ${fillPercent}%; height: 100%; background: ${fillColor}; transition: width 0.4s ease; border-radius: 8px; box-shadow: inset 0 -3px 5px rgba(0,0,0,0.2);"></div>
                </div>
            </div>
            
            <div style="min-width: 100px; text-align: left; margin-left: 15px;">
                <!-- 👈 اینجا onclick رو به onmouseenter و onmouseleave تغییر دادیم -->
                <div style="font-size: 11px; color: var(--coin-text); background: var(--bg-main); padding: 5px 8px; border-radius: 6px; cursor: ${isSkin ? 'pointer' : 'default'}; border: 1px solid ${isSkin ? 'var(--primary)' : 'transparent'}; text-align: center;" 
                     ${isSkin ? `onmouseenter="showSkinPreview('${skinId}', '${rewardText}')" onmouseleave="hideSkinPreview()" onclick="showSkinPreview('${skinId}', '${rewardText}')"` : ''}>
                    🎁 ${rewardText}
                </div>
            </div>
        `;
        card.innerHTML = cylinderHtml;
        listEl.appendChild(card);
    }
}

// 👈 اضافه کردن تابع بستن اسکین
function hideSkinPreview() {
    document.getElementById('skin-preview-modal').classList.remove('show');
}
// ==========================================================
// Dynamic Random Background per View & User
// ==========================================================
function applyViewBackground(viewId) {
    const gameViews = ['free-view', 'falling-view', 'calibration-view', 'result-view'];
    if (gameViews.includes(viewId)) {
        document.documentElement.style.setProperty('--app-bg', 'none');
        console.log("🎮 Background removed for game view:", viewId);
        return;
    }

    const username = currentUser?.username || 'guest';
    const storageKey = 'pm_bgs_' + username;
    let bgMap = JSON.parse(localStorage.getItem(storageKey) || '{}');

    if (!bgMap[viewId]) {
        bgMap[viewId] = Math.floor(Math.random() * 4) + 1;
        localStorage.setItem(storageKey, JSON.stringify(bgMap));
    }

    const bgNum = bgMap[viewId];
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const folder = isLight ? 'light' : 'dark';
    const bgUrl = `url('/assets/backgrounds/${folder}/bg${bgNum}.png')`;
    
    document.documentElement.style.setProperty('--app-bg', bgUrl);
    console.log("🖼️ Background Applied:", bgUrl, "for view:", viewId); // این خط رو ببین چی چاپ میکنه
}

async function submitNewPassword() {
    const identifier = document.getElementById('forgotIdentifier').value.trim();
    const code = document.getElementById('resetCode').value.trim();
    const newPassword = document.getElementById('newPassword').value;
    const msgEl = document.getElementById('forgotMsg');

    if (!code || !newPassword) {
        msgEl.style.color = 'var(--danger-color)';
        msgEl.innerText = t('auth.error.empty');
        return;
    }

    try {
        const res = await fetch('/api/users/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, code, new_password: newPassword })
        });
        
        if (res.ok) {
            msgEl.style.color = 'var(--success-color)';
            msgEl.innerText = t('auth.reset_success');
            
            // بعد از ۲ ثانیه، کاربر رو برگردون به صفحه لاگین و فرم‌ها رو ریست کن
            setTimeout(() => {
                toggleAuth('login');
                document.getElementById('reset-step-2').style.display = 'none';
                document.getElementById('forgotIdentifier').disabled = false;
                document.getElementById('forgotIdentifier').value = '';
                document.getElementById('btn-send-code').style.display = 'block';
                document.getElementById('btn-send-code').innerText = t('auth.send_code_btn');
                document.getElementById('btn-send-code').disabled = false;
                document.getElementById('resetCode').value = '';
                document.getElementById('newPassword').value = '';
                msgEl.innerText = '';
            }, 2500);
        } else {
            const err = await res.json();
            msgEl.style.color = 'var(--danger-color)';
            msgEl.innerText = err.detail || t('msg.error_server');
        }
    } catch(e) {
        msgEl.style.color = 'var(--danger-color)';
        msgEl.innerText = t('msg.error_server');
    }
}

function startResumeCountdown() {
    let count = 3; // شمارش معکوس ۳ ثانیه‌ای (می‌تونی ۴ کنی)
    const ov = document.getElementById('countdown-overlay');
    const tx = document.getElementById('countdown-text');
    
    if (!ov || !tx) return;
    
    ov.style.display = 'flex';
    tx.innerText = count;
    
    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        count--;
        if (count === 0) {
            tx.innerText = "GO!";
        } else if (count < 0) {
            clearInterval(countdownInterval);
            ov.style.display = 'none';
            
            // 👈 حالا که شمارش تموم شد، بازی رو آنپاز می‌کنیم
            isPaused = false; 
            lastTime = performance.now(); // جلوگیری از پرش نت‌ها
            
        } else {
            tx.innerText = count;
        }
    }, 1000);
}

// شروع برنامه و بررسی توکن
const savedToken = localStorage.getItem('pm_token');
if (!savedToken) {
    // ۱. اگر توکن نداریم، فقط لاگین نمایش داده میشه
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('game-section').style.display = 'none';
} else {
    // ۲. اگر توکن داریم، بازی نمایش داده میشه
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'flex';
    
    fetch('/api/users/me', { headers: { 'Authorization': `Bearer ${savedToken}` } })
        .then(res => { 
            if (res.ok) { showGame(); } else { logout(); } 
        })
        .catch(() => { logout(); });
}

// ==========================================
// 🛑 DEVELOPMENT ONLY - REMOVE BEFORE PRODUCTION 🛑
// ==========================================
async function devToggleVip() {
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/dev/toggle-vip', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            await fetchUserProfile(); 
            if (document.getElementById('wallet-view').classList.contains('active')) {
                goToWallet(); 
            }
            alert(t('dev.vip_success'));
        }
    } catch (e) { console.error(e); }
}
// ==========================================
// 🛑 DEVELOPMENT ONLY - REMOVE BEFORE PRODUCTION 🛑
// ==========================================

// بازگردانی تایمر بن بعد از رفرش صفحه
const savedLockout = localStorage.getItem('pm_lockout_until');
if (savedLockout && Date.now() < parseInt(savedLockout)) {
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('game-section').style.display = 'none';
    const remainingSeconds = Math.ceil((parseInt(savedLockout) - Date.now()) / 1000);
    if (remainingSeconds > 0) {
        startAuthCooldown(remainingSeconds);
    }
}
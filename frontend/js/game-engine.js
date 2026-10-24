console.log("✅ Game Engine Loaded!");

// ==========================================================
// I18N (ترجمه‌ها)
// ==========================================================
const I18N = {
    fa: {
        "auth.identifier":"ایمیل یا نام کاربری","auth.password":"رمز عبور","auth.login_btn":"ورود به استودیو","auth.no_account":"حساب ندارید؟ ثبت‌نام کنید","auth.username":"نام کاربری","auth.email":"ایمیل","auth.register_btn":"ساخت حساب","auth.have_account":"قبلاً ثبت‌نام کرده‌اید؟ وارد شوید",
        "header.logout":"خروج","header.level_prefix":"Lvl",
        "menu.title":"یک حالت را انتخاب کنید","menu.free_play":"🎵 بداهه‌نوازی (رایگان)","menu.trial":"🌧️ مرحله تستی (ورود: ۱۰","menu.wallet":"💰 کیف پول","menu.profile":"👤 پروفایل","menu.settings":"⚙️ تنظیمات","menu.hint":"💡 دقت بالای ۸۰٪ = ۲۰ XP + جایزه مرحله",
        "game.ready":"آماده باش...","game.end":"پایان تمرین","game.back":"← بازگشت",
        "result.title":"🎉 نتیجه تمرین","result.score":"امتیاز:","result.hits":"ضربه درست:","result.misses":"خطا:","result.accuracy":"دقت:","result.xp":"XP کسب‌شده:","result.back":"بازگشت به منو","result.reward_full":"عالی! پاداش کامل","result.reward_ok":"خوب! هزینه‌ات جبران شد","result.reward_low":"نیاز به تمرین بیشتر داری","result.reward_prefix":"پاداش شما:",
        "wallet.title":"💰 موجودی کیف پول","wallet.hint":"سکه‌های شما برای ورود به بازی‌ها و خرید استفاده می‌شوند","wallet.buy":"🛒 خرید سکه","wallet.pkg_starter":"بسته شروع","wallet.pkg_standard":"بسته استاندارد","wallet.pkg_premium":"بسته پریمیوم","wallet.pkg_ultimate":"بسته نهایی",
        "profile.coins":"سکه","profile.total_xp":"مجموع XP","profile.extra_notes":"هنگ‌درام‌های اضافی","profile.skins":"اسکین‌های باز‌شده",
        "settings.title":"⚙️ تنظیمات","settings.account":"📝 اطلاعات حساب","settings.username":"نام کاربری","settings.email":"ایمیل","settings.save_profile":"ذخیره تغییرات","settings.password":"🔒 تغییر رمز عبور","settings.current_password":"رمز فعلی","settings.new_password":"رمز جدید (حداقل ۶ کاراکتر)","settings.change_password":"تغییر رمز","settings.avatar":"🖼️ عکس پروفایل","settings.choose_image":"انتخاب عکس","settings.appearance":"🎨 ظاهر بازی","settings.language":"زبان","settings.font":"فونت نوشتار","settings.fall_speed":"سرعت سقوط نت‌ها","settings.note_size":"اندازه نت‌ها","settings.sound_volume":"صدای بازی","settings.save_settings":"ذخیره تنظیمات","settings.font_vazir":"Vazirmatn (پیش‌فرض)","settings.font_arial":"Arial","settings.font_tahoma":"Tahoma","settings.font_system":"System UI","settings.note_display": "حالت نمایش نت‌ها",
        "display.number": "عدد", "display.name": "حروف",
        "msg.saved":"✓ تغییرات ذخیره شد","msg.saved_token":"✓ تغییرات ذخیره شد (توکن جدید صادر شد)","msg.pass_changed":"✓ رمز عبور تغییر کرد","msg.avatar_uploaded":"✓ آواتار آپلود شد","msg.uploading":"در حال آپلود...","msg.error_server":"خطا در ارتباط با سرور","msg.error_generic":"خطا","msg.pass_short":"رمز جدید حداقل ۶ کاراکتر باید باشد",
        "reward.title":"🎉 تبریک!","reward.message_1":"شما به مرحله","reward.message_2":"رسیدید!","reward.ok":"عالی!","reward.level_prefix":"مرحله",
        "misc.coin":"سکه","misc.not_enough_coins":"❌ سکه کافی ندارید! برای بازی به ۱۰ سکه نیاز است.","misc.coin_deduct_error":"خطا در کسر سکه.","misc.connection_error":"ارتباط با سرور برقرار نشد."
    },
    en: {
        "auth.identifier":"Email or username","auth.password":"Password","auth.login_btn":"Enter Studio","auth.no_account":"No account? Register","auth.username":"Username","auth.email":"Email","auth.register_btn":"Create Account","auth.have_account":"Already registered? Sign in",
        "header.logout":"Logout","header.level_prefix":"Lvl",
        "menu.title":"Choose a mode","menu.free_play":"🎵 Free Play","menu.trial":"🌧️ Trial Mode (Entry: 10","menu.wallet":"💰 Wallet","menu.profile":"👤 Profile","menu.settings":"⚙️ Settings","menu.hint":"💡 Accuracy above 80% = 20 XP + level reward",
        "game.ready":"Get ready...","game.end":"End Practice","game.back":"← Back",
        "result.title":"🎉 Practice Result","result.score":"Score:","result.hits":"Correct Hits:","result.misses":"Misses:","result.accuracy":"Accuracy:","result.xp":"XP Earned:","result.back":"Back to Menu","result.reward_full":"Excellent! Full reward","result.reward_ok":"Good! Entry cost refunded","result.reward_low":"Keep practicing","result.reward_prefix":"Your reward:",
        "wallet.title":"💰 Wallet Balance","wallet.hint":"Your coins are used for game entries and purchases","wallet.buy":"🛒 Buy Coins","wallet.pkg_starter":"Starter Pack","wallet.pkg_standard":"Standard Pack","wallet.pkg_premium":"Premium Pack","wallet.pkg_ultimate":"Ultimate Pack",
        "profile.coins":"Coins","profile.total_xp":"Total XP","profile.extra_notes":"Extra Handpans","profile.skins":"Unlocked Skins",
        "settings.title":"⚙️ Settings","settings.account":"📝 Account Info","settings.username":"Username","settings.email":"Email","settings.save_profile":"Save Changes","settings.password":"🔒 Change Password","settings.current_password":"Current Password","settings.new_password":"New Password (min 6 chars)","settings.change_password":"Change Password","settings.avatar":"🖼️ Profile Picture","settings.choose_image":"Choose Image","settings.appearance":"🎨 Game Appearance","settings.language":"Language","settings.font":"Display Font","settings.fall_speed":"Note Fall Speed","settings.note_size":"Note Size","settings.sound_volume":"Game Volume","settings.save_settings":"Save Settings","settings.font_vazir":"Vazirmatn (default)","settings.font_arial":"Arial","settings.font_tahoma":"Tahoma","settings.font_system":"System UI","settings.note_display": "Note Display Mode",
        "display.number": "Number", "display.name": "Letters",
        "msg.saved":"✓ Changes saved","msg.saved_token":"✓ Changes saved (new token issued)","msg.pass_changed":"✓ Password changed","msg.avatar_uploaded":"✓ Avatar uploaded","msg.uploading":"Uploading...","msg.error_server":"Server connection error","msg.error_generic":"Error","msg.pass_short":"New password must be at least 6 characters",
        "reward.title":"🎉 Congratulations!","reward.message_1":"You reached level","reward.message_2":"!","reward.ok":"Great!","reward.level_prefix":"Level",
        "misc.coin":"coins","misc.not_enough_coins":"❌ Not enough coins! You need 10 coins to play.","misc.coin_deduct_error":"Error deducting coins.","misc.connection_error":"Connection failed."
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
// LAYOUTS & COLORS (بر اساس JSON شما)
// ==========================================================
const HANDPAN_LAYOUT_9 = {
    "D": [410, 250, 58],
    "1": [461, 374, 38], "2": [359, 374, 38], "3": [536, 300, 38],
    "4": [284, 300, 38], "5": [536, 199, 38], "6": [284, 199, 38],
    "7": [461, 128, 38], "8": [359, 128, 38]
};

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
// متغیرهای اصلی
// ==========================================================
let userTokens = 0;
let currentUser = null;
let ACTIVE_LAYOUT = HANDPAN_LAYOUT_9;
const coinIconSVG = `<img src="/assets/coin.svg" alt="سکه" style="width:28px;height:28px;vertical-align:middle;">`;

function applyUserAssets(){
    const extra = currentUser?.extra_notes || 0;
    ACTIVE_LAYOUT = getLayoutForNotes(9 + extra);
}
function getNoteRadius(baseR){ return baseR * (currentUser?.note_size || 1.0); }

// ==========================================================
// صدا (پلی‌فونیک با فایل‌های WAV)
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
    // فقط اگر AudioContext قبلا ساخته شده باشه ازش استفاده میکنیم
    if (!audioCtx) {
        // ایجاد یک AudioContext موقت برای دیکود کردن فایلها بدون نیاز به کلیک
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
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
        } catch (e) {
            console.warn(`فایل صوتی برای نت ${key} پیدا نشد.`);
        }
    }
    console.log(`🎵 ${loadedCount} فایل صوتی WAV با موفقیت لود شد.`);
}

function playSound(noteKey) {
    const ctx = initAudio();
    if (!ctx) return;
    
    // باز کردن قفل صدا در موبایل
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const volume = currentUser?.sound_volume ?? 0.5;
    if (volume === 0) return;

    // اگر فایل WAV داری، کل فایل رو تا آخر پخش میکنه
    if (soundBuffers[noteKey]) {
        console.log("🔊 پخش WAV:", noteKey);
        const source = ctx.createBufferSource();
        source.buffer = soundBuffers[noteKey];
        const gain = ctx.createGain();
        gain.gain.value = volume; 
        source.connect(gain);
        gain.connect(ctx.destination);
        
        // پخش کامل فایل (بدون قطع کردن نت قبلی)
        source.start(0); 
    } 
    // صدای پشتیبان (سینتسایزر) که الان تا ۴ ثانیه کشیده میشه
    else {
        console.warn("⚠️ WAV پیدا نشد. پخش سینتسایزر برای:", noteKey);
        const freq = FREQS[noteKey] || 440; 
        const now = ctx.currentTime; 
        const duration = 4.0; // 👈 از ۱.۵ ثانیه به ۴ ثانیه افزایش یافت

        const osc = ctx.createOscillator(); 
        const gain = ctx.createGain();
        
        osc.type = 'sine'; 
        osc.frequency.setValueAtTime(freq, now);
        
        // شروع نرم
        gain.gain.setValueAtTime(0, now); 
        gain.gain.linearRampToValueAtTime(volume * 0.6, now + 0.05); 
        // محو شدن تدریجی تا ثانیه ۴
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        osc.connect(gain); 
        gain.connect(ctx.destination); 
        osc.start(now); 
        osc.stop(now + duration + 0.1);
    }
}

// ==========================================================
// Auth
// ==========================================================
function toggleAuth(type){
    document.getElementById('login-form').style.display = type==='login'?'block':'none';
    document.getElementById('register-form').style.display = type==='register'?'block':'none';
    document.getElementById('authError').innerText='';
}
async function login(){
    const username=document.getElementById('loginUser').value.trim();
    const password=document.getElementById('loginPass').value;
    if(!username || !password) {
        document.getElementById('authError').innerText = 'لطفاً تمام فیلدها را پر کنید.';
        return;
    }
    const fd=new URLSearchParams(); fd.append('username',username); fd.append('password',password);
    try{
        const res=await fetch('/api/users/login',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:fd});
        if(res.ok){ 
            const d=await res.json(); 
            localStorage.setItem('pm_token',d.access_token); 
            document.getElementById('authError').innerText = '';
            showGame(); 
        }
        else document.getElementById('authError').innerText = 'نام کاربری یا رمز عبور اشتباه است.';
    }catch(e){ document.getElementById('authError').innerText = t('msg.error_server'); }
}

async function register(){
    const username=document.getElementById('regUser').value.trim();
    const email=document.getElementById('regEmail').value.trim();
    const password=document.getElementById('regPass').value;
    
    // اعتبارسنجی ساده سمت کاربر
    if(!username || !email || !password) {
        document.getElementById('authError').innerText = 'لطفاً تمام فیلدها را پر کنید.';
        return;
    }
    if(!email.includes('@') || !email.includes('.')) {
        document.getElementById('authError').innerText = 'فرمت ایمیل صحیح نیست (مثال: test@gmail.com).';
        return;
    }

    try{
        const res=await fetch('/api/users/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,email,password})});
        if(res.ok){ 
            alert('✅ ثبت‌نام موفق! حالا وارد شوید.');
            toggleAuth('login'); 
            document.getElementById('authError').innerText = '';
        }
        else { 
            const err=await res.json(); 
            let msg = t('msg.error_generic');
            // استخراج پیام دقیق از خطای 422 FastAPI
            if (Array.isArray(err.detail) && err.detail.length > 0) {
                msg = err.detail[0].msg;
                if (err.detail[0].loc.includes('email')) msg = 'فرمت ایمیل معتبر نیست.';
            } else if (typeof err.detail === 'string') {
                msg = err.detail;
            }
            document.getElementById('authError').innerText = msg; 
        }
    }catch(e){ document.getElementById('authError').innerText = t('msg.error_server'); }
}
function logout(){
    localStorage.removeItem('pm_token'); currentUser=null;
    document.getElementById('game-section').style.display='none';
    document.getElementById('auth-section').style.display='flex';
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
    if(d.font_family) applyFont(d.font_family);

    document.getElementById('tokenDisplay').innerText = d.coins;
    document.getElementById('usernameDisplay').innerText = d.username;
    document.getElementById('levelBadge').innerText = `${t('header.level_prefix')} ${d.level}`;
    document.getElementById('xpProgressFill').style.width = `${d.progress_percent}%`;
    document.getElementById('xpText').innerText = `${d.xp_in_level} / ${d.xp_needed} XP`;

    const av = document.getElementById('headerAvatar');
    av.innerHTML = d.avatar_url ? `<img src="${d.avatar_url}?t=${Date.now()}" class="avatar-mini" alt="avatar">` : `<div class="avatar-placeholder">${d.username.charAt(0).toUpperCase()}</div>`;

    const wb=document.getElementById('walletBalance'); if(wb) wb.innerText=d.coins;
    const pn=document.getElementById('profileUsername'); if(pn) pn.innerText=d.username;
    const pl=document.getElementById('profileLevel'); if(pl) pl.innerText=`${t('header.level_prefix')} ${d.level} · ${getLocalizedLevelName(d.level,d.level_name)}`;
    const pf=document.getElementById('profileXpFill'); if(pf) pf.style.width=`${d.progress_percent}%`;
    const pt=document.getElementById('profileXpText'); if(pt) pt.innerText=`${d.xp_in_level} / ${d.xp_needed} XP`;
    const pc=document.getElementById('profileCoins'); if(pc) pc.innerText=d.coins;
    const ptx=document.getElementById('profileTotalXp'); if(ptx) ptx.innerText=d.xp;
    const pnot=document.getElementById('profileNotes'); if(pnot) pnot.innerText=d.extra_notes;
    const psk=document.getElementById('profileSkins'); if(psk) psk.innerText=d.owned_skins.length;

    const pw=document.getElementById('profileAvatarWrap');
    if(pw) pw.innerHTML = d.avatar_url ? `<img src="${d.avatar_url}?t=${Date.now()}" class="avatar-big" alt="avatar">` : `<div class="avatar-placeholder-big">${d.username.charAt(0).toUpperCase()}</div>`;

    const sav=document.getElementById('settingsAvatarPreview');
    if(sav) sav.innerHTML = d.avatar_url ? `<img src="${d.avatar_url}?t=${Date.now()}" class="avatar-big" style="width:60px;height:60px;" alt="avatar">` : `<div class="avatar-placeholder-big" style="width:60px;height:60px;font-size:24px;">${d.username.charAt(0).toUpperCase()}</div>`;

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
        const tr = t(el.getAttribute('data-i18n')); if(tr) el.innerText = tr;
    });
    document.title = lang==='fa' ? 'PanMaster - استودیو' : 'PanMaster - Studio';
    if(document.getElementById('result-view').classList.contains('active') && window._lastResult) renderResultToken(window._lastResult);
    if(document.getElementById('reward-modal').classList.contains('show') && window._lastRewards) showRewardModal(window._lastRewards);
}
function applyFont(f){ document.documentElement.style.setProperty('--app-font', `'${f}', sans-serif`); }

// ==========================================================
// ناوبری
// ==========================================================
function showView(id){ document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function showGame(){
    document.getElementById('auth-section').style.display='none';
    document.getElementById('game-section').style.display='flex';
    fetchUserProfile().then(()=>backToMenu());
    loadAudioSamples();
}
function backToMenu(){
    showView('menu-view');
    stopFallingGame(); clearInterval(countdownInterval);
    document.getElementById('countdown-overlay').style.display='none';
    fetchUserProfile();
}
function goToFreePlay(){
    applyUserAssets();
    showView('free-view');
    const c=document.getElementById('handpanCanvasFree');
    if (c) { drawHandpan(c.getContext('2d')); setupInteraction(c,'free'); }
}
async function goToFallingGame(){
    applyUserAssets();
    if(userTokens<10){ alert(t('misc.not_enough_coins')); return; }
    const token=localStorage.getItem('pm_token');
    try{
        const res=await fetch('/api/users/spend-tokens',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({amount:10})});
        if(res.ok){ const d=await res.json(); userTokens=d.new_balance; document.getElementById('tokenDisplay').innerText=userTokens; }
        else { alert(t('misc.coin_deduct_error')); return; }
    }catch(e){ alert(t('misc.connection_error')); return; }
    showView('falling-view');
    const c=document.getElementById('handpanCanvasFalling');
    if (c) { drawHandpan(c.getContext('2d')); setupInteraction(c,'falling'); }
    score=0; hits=0; misses=0; totalSpawned=0; fallingNotes=[];
    startCountdown();
}
function goToWallet(){ showView('wallet-view'); fetchUserProfile(); loadCoinPackages(); }
function goToProfile(){ showView('profile-view'); fetchUserProfile(); }
function goToSettings(){ showView('settings-view'); fetchUserProfile(); }
function onLanguageChange(l){ setLang(l); document.querySelectorAll('[data-i18n]').forEach(el=>{ const tr=t(el.getAttribute('data-i18n')); if(tr) el.innerText=tr; }); }
function previewFont(f){ applyFont(f); }

// ==========================================================
// رسم روی هنگ درام
// ==========================================================
function drawHandpan(ctx, highlight=null){
    const W=820,H=500; ctx.clearRect(0,0,W,H);
    const cx=410,cy=250,r=220; 
    const mode = currentUser?.note_display_mode || 'number';
    
    // بدنه
    ctx.shadowColor='#000'; ctx.shadowBlur=25;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle='#1e293b'; ctx.fill();
    ctx.shadowBlur=0; ctx.strokeStyle='#475569'; ctx.lineWidth=3; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,r-10,0,Math.PI*2); ctx.fillStyle='#0f172a'; ctx.fill();
    ctx.strokeStyle='#334155'; ctx.lineWidth=2; ctx.stroke();

    for(const [key,[x,y,bR]] of Object.entries(ACTIVE_LAYOUT)){
        const r2=getNoteRadius(bR);
        const col=NOTE_COLORS[key]||"#60a5fa"; 
        const hl=highlight===key;
        
        ctx.beginPath(); ctx.arc(x,y,r2+2,0,Math.PI*2); ctx.fillStyle='#000'; ctx.fill();
        ctx.beginPath(); ctx.arc(x,y,r2,0,Math.PI*2); 
        ctx.fillStyle = hl ? '#1e3a8a' : '#1e293b';
        ctx.fill();
        
        ctx.strokeStyle=hl?'#fff':'#475569'; ctx.lineWidth=hl?3:2; ctx.stroke();
        ctx.beginPath(); ctx.arc(x,y,r2-5,0,Math.PI*2); ctx.strokeStyle=col; ctx.lineWidth=1.5; ctx.stroke();
        
        let displayTxt = key;
        if (mode === 'name') displayTxt = KEY_TO_NAME[key] || key;

        ctx.fillStyle = hl?'#fff':'#cbd5e1';
        const fs=r2>=50?32:(r2>=32?24:18);
        ctx.font=`bold ${fs}px Arial`; 
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(displayTxt, x, y);
    }
}

// ==========================================================
// فلاینگ نوت
// ==========================================================
let fallingNotes=[];
let animationId=null, lastTime=0;
let score=0,hits=0,misses=0,totalSpawned=0;
const MAX_NOTES=20, HIT_Y=220;
let isGameRunning=false, noteSpawnTimer=0, countdownInterval=null;
const ctxFall=document.getElementById('fallingCanvas').getContext('2d');
const TEST_SEQUENCE=["D","1","2","3","4","5","6","7","8"];

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
function startFallingLoop(){
    isGameRunning=true; lastTime=performance.now();
    spawnNote(); noteSpawnTimer=1.5;
    if(animationId) cancelAnimationFrame(animationId);
    requestAnimationFrame(animateFalling);
}
function spawnNote(){
    if(!isGameRunning || totalSpawned>=MAX_NOTES) return;
    totalSpawned++;
    const avail=TEST_SEQUENCE.filter(n=>ACTIVE_LAYOUT[n]);
    if(!avail.length) return;
    const note=avail[Math.floor(Math.random()*avail.length)];
    fallingNotes.push({note,x:ACTIVE_LAYOUT[note][0],y:-50,speed:currentUser?.fall_speed||200,hit:false});
}
function animateFalling(time){
    if(!isGameRunning) return;
    const dt=(time-lastTime)/1000; lastTime=time; noteSpawnTimer+=dt;
    if(noteSpawnTimer>1.5){ spawnNote(); noteSpawnTimer=0; }
    
    ctxFall.clearRect(0,0,820,280);
    ctxFall.beginPath(); ctxFall.moveTo(0,HIT_Y); ctxFall.lineTo(820,HIT_Y);
    ctxFall.strokeStyle='#38bdf8'; ctxFall.lineWidth=4; ctxFall.stroke();
    
    const sm=currentUser?.note_size||1.0; const nr=25*sm;
    const mode = currentUser?.note_display_mode || 'number';

    for(let i=fallingNotes.length-1;i>=0;i--){
        const fn=fallingNotes[i]; if(fn.hit) continue;
        fn.y+=fn.speed*dt;
        
        ctxFall.beginPath(); ctxFall.arc(fn.x,fn.y,nr,0,Math.PI*2); 
        ctxFall.fillStyle=NOTE_COLORS[fn.note]||'#60a5fa'; ctxFall.fill();
        
        let displayTxt = fn.note;
        if (mode === 'name') displayTxt = KEY_TO_NAME[fn.note] || fn.note;

        ctxFall.fillStyle='#000'; 
        ctxFall.font=`bold ${Math.round(14*sm)}px Arial`; 
        ctxFall.textAlign='center'; ctxFall.textBaseline='middle';
        ctxFall.fillText(displayTxt, fn.x, fn.y);
        
        if(fn.y>HIT_Y+40){ misses++; fallingNotes.splice(i,1); checkEndGame(); }
    }
    animationId=requestAnimationFrame(animateFalling);
}
function executeHit(note,mode){
    playSound(note);
    const id=mode==='free'?'handpanCanvasFree':'handpanCanvasFalling';
    const c=document.getElementById(id); if(!c) return;
    const ctx=c.getContext('2d');
    drawHandpan(ctx,note); setTimeout(()=>drawHandpan(ctx),150);
    if(mode==='falling' && isGameRunning) checkHit(note);
}
function checkHit(note){
    let idx=-1, minD=80;
    for(let i=0;i<fallingNotes.length;i++){
        const fn=fallingNotes[i];
        if(fn.note===note && !fn.hit){ const d=Math.abs(fn.y-HIT_Y); if(d<minD){ minD=d; idx=i; } }
    }
    if(idx!==-1){ fallingNotes[idx].hit=true; fallingNotes.splice(idx,1); score+=100; hits++; checkEndGame(); }
}
function checkEndGame(){ if(totalSpawned>=MAX_NOTES && fallingNotes.length===0 && isGameRunning) endFallingGame(); }
function stopFallingGame(){ isGameRunning=false; if(animationId) cancelAnimationFrame(animationId); }

async function endFallingGame(){
    isGameRunning=false; if(animationId) cancelAnimationFrame(animationId);
    const att=hits+misses; const acc=att>0?Math.round((hits/att)*100):0;
    let earned=0, key='';
    if(acc>=80){ earned=15; key='result.reward_full'; }
    else if(acc>=50){ earned=10; key='result.reward_ok'; }
    else { earned=5; key='result.reward_low'; }

    document.getElementById('resScore').innerText=score;
    document.getElementById('resHits').innerText=hits;
    document.getElementById('resMisses').innerText=misses;
    document.getElementById('resAcc').innerText=acc+'%';
    document.getElementById('resXp').innerText = acc>=80?'+20':'0';

    window._lastResult={earned,key};
    renderResultToken(window._lastResult);
    showView('result-view');

    const token=localStorage.getItem('pm_token');
    try{
        const res=await fetch('/api/users/game-reward',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({tokens_earned:earned,accuracy:acc,score})});
        if(res.ok){
            const d=await res.json();
            userTokens=d.new_balance;
            document.getElementById('tokenDisplay').innerText=d.new_balance;
            document.getElementById('levelBadge').innerText=`${t('header.level_prefix')} ${d.level}`;
            document.getElementById('xpProgressFill').style.width=`${d.progress_percent}%`;
            document.getElementById('xpText').innerText=`${d.xp_in_level} / ${d.xp_needed} XP`;
            if(d.leveled_up && d.rewards_granted?.length){ window._lastRewards=d.rewards_granted; showRewardModal(d.rewards_granted); }
        }
    }catch(e){ console.error(e); }
}

function renderResultToken(r){
    document.getElementById('resTokenText').innerHTML = `${coinIconSVG} ${t('result.reward_prefix')} <span style="color:#38bdf8;font-size:24px;">${r.earned}</span><br><span style="font-size:14px;color:#94a3b8;margin-top:5px;display:block;">${t(r.key)}</span>`;
}
function showRewardModal(rewards){
    const m=document.getElementById('reward-modal'); const msg=document.getElementById('rewardMessage'); const items=document.getElementById('rewardItems');
    const last=rewards[rewards.length-1].level;
    msg.innerHTML=`${t('reward.message_1')} <span style="color:#fbbf24;font-weight:900;">${last}</span> ${t('reward.message_2')}`;
    items.innerHTML='';
    rewards.forEach(r=>{ const d=document.createElement('div'); d.className='reward-item'; d.innerText=`${t('reward.level_prefix')} ${r.level}: ${r.name}`; items.appendChild(d); });
    m.classList.add('show');
}
function closeRewardModal(){ document.getElementById('reward-modal').classList.remove('show'); fetchUserProfile(); }

// ==========================================================
// تنظیمات و کیف پول
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
        if(res.ok){ const d=await res.json(); if(d.access_token) localStorage.setItem('pm_token',d.access_token); msg.style.color='#10b981'; msg.innerText=d.access_token?t('msg.saved_token'):t('msg.saved'); await fetchUserProfile(); }
        else { const e=await res.json(); msg.style.color='#ef4444'; msg.innerText=e.detail||t('msg.error_generic'); }
    }catch(e){ msg.style.color='#ef4444'; msg.innerText=t('msg.error_server'); }
}
async function changePassword(){
    const token=localStorage.getItem('pm_token');
    const o=document.getElementById('setOldPass').value; const n=document.getElementById('setNewPass').value;
    const msg=document.getElementById('passwordMsg'); msg.innerText='';
    if(n.length<6){ msg.style.color='#ef4444'; msg.innerText=t('msg.pass_short'); return; }
    try{
        const res=await fetch('/api/users/password',{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({current_password:o,new_password:n})});
        if(res.ok){ msg.style.color='#10b981'; msg.innerText=t('msg.pass_changed'); document.getElementById('setOldPass').value=''; document.getElementById('setNewPass').value=''; }
        else { const e=await res.json(); msg.style.color='#ef4444'; msg.innerText=e.detail||t('msg.error_generic'); }
    }catch(e){ msg.style.color='#ef4444'; msg.innerText=t('msg.error_server'); }
}
async function saveSettings(){
    const token=localStorage.getItem('pm_token');
    const msg=document.getElementById('settingsMsg'); msg.innerText='';
    const payload={ language: document.getElementById('setLanguage').value, font_family: document.getElementById('setFont').value, note_display_mode: document.getElementById('setNoteDisplay').value, fall_speed: parseInt(document.getElementById('setFallSpeed').value), note_size: parseFloat(document.getElementById('setNoteSize').value), sound_volume: parseFloat(document.getElementById('setSoundVolume').value) };
    try{
        const res=await fetch('/api/users/settings',{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(payload)});
        if(res.ok){ msg.style.color='#10b981'; msg.innerText=t('msg.saved'); await fetchUserProfile(); loadCoinPackages(); }
        else { const e=await res.json(); msg.style.color='#ef4444'; msg.innerText=e.detail||t('msg.error_generic'); }
    }catch(e){ msg.style.color='#ef4444'; msg.innerText=t('msg.error_server'); }
}
async function uploadAvatar(input){
    if(!input.files||!input.files[0]) return;
    const token=localStorage.getItem('pm_token'); const msg=document.getElementById('avatarMsg'); msg.innerText=t('msg.uploading');
    const fd=new FormData(); fd.append('file',input.files[0]);
    try{
        const res=await fetch('/api/users/avatar',{method:'POST',headers:{'Authorization':`Bearer ${token}`},body:fd});
        if(res.ok){ msg.style.color='#10b981'; msg.innerText=t('msg.avatar_uploaded'); await fetchUserProfile(); }
        else { const e=await res.json(); msg.style.color='#ef4444'; msg.innerText=e.detail||t('msg.error_generic'); }
    }catch(e){ msg.style.color='#ef4444'; msg.innerText=t('msg.error_server'); }
}

// ==========================================================
// تعامل لمسی و ماوس
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


// شروع برنامه
const savedToken = localStorage.getItem('pm_token');
if(savedToken) {
    // اگر توکن داریم، تست میکنیم ببینیم معتبر هست یا نه
    fetch('/api/users/me', { headers: { 'Authorization': `Bearer ${savedToken}` } })
        .then(res => {
            if (res.ok) { showGame(); } // توکن معتبره
            else { logout(); } // توکن باطله، پاکش کن
        })
        .catch(() => logout());
}
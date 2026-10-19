console.log("✅ Game Engine Loaded!");

let userTokens = 0;
const coinIconSVG = `<img src="/assets/coin.svg" alt="سکه" class="coin-icon coin-md">`;

// ===== AUTH =====
function toggleAuth(type) {
    document.getElementById('login-form').style.display = type === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = type === 'register' ? 'block' : 'none';
    document.getElementById('authError').innerText = '';
}

async function fetchUserProfile() {
    const token = localStorage.getItem('pm_token');
    if (!token) return;
    try {
        const res = await fetch('/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            const data = await res.json();
            userTokens = data.coins;
            document.getElementById('tokenDisplay').innerText = userTokens;
        }
    } catch (e) { console.error("Error fetching profile", e); }
}

async function login() {
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('pm_token', data.access_token);
            // 🆕 تغییر: برای نمایش یوزرنیم (نه ایمیل) یه بار پروفایل رو بگیر
            try {
                const meRes = await fetch('/api/users/me', {
                    headers: { 'Authorization': `Bearer ${data.access_token}` }
                });
                if (meRes.ok) {
                    const me = await meRes.json();
                    localStorage.setItem('pm_user', me.username);
                } else {
                    localStorage.setItem('pm_user', username);
                }
            } catch {
                localStorage.setItem('pm_user', username);
            }
            showGame();
        } else {
            document.getElementById('authError').innerText = 'ایمیل یا رمز عبور اشتباه است.';
        }
    } catch (e) {
        document.getElementById('authError').innerText = 'خطا در ارتباط با سرور.';
    }
}

async function register() {
    const username = document.getElementById('regUser').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPass').value;
    try {
        const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        if (res.ok) {
            alert('ثبت‌نام موفق! ۵۰ سکه هدیه به حساب شما اضافه شد. حالا وارد شوید.');
            toggleAuth('login');
        } else {
            const err = await res.json().catch(() => ({}));
            document.getElementById('authError').innerText = err.detail || 'خطا در ثبت‌نام';
        }
    } catch (e) {
        document.getElementById('authError').innerText = 'خطا در ارتباط با سرور.';
    }
}

function logout() {
    localStorage.removeItem('pm_token');
    localStorage.removeItem('pm_user');
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'flex';
    backToMenu();
}

// ===== AUDIO =====
let audioCtx = null;
let soundEnabled = true;
const HANDPAN_POSITIONS = {
    "A1": [461, 374, 38], "D2": [359, 374, 38], "C3": [536, 300, 38], "E4": [284, 300, 38],
    "F5": [536, 199, 38], "Bb6": [284, 199, 38], "G7": [461, 128, 38], "A8": [359, 128, 38], "D": [410, 250, 58]
};
const NOTE_COLORS = {
    "A1": "#f472b6", "D2": "#34d399", "C3": "#38bdf8", "E4": "#2dd4bf", "F5": "#818cf8", "Bb6": "#fbbf24", "G7": "#a78bfa", "A8": "#fb7185", "D": "#60a5fa"
};
const FREQS = { 'A1': 110, 'D2': 146.83, 'C3': 130.81, 'E4': 329.63, 'F5': 698.46, 'Bb6': 1864.66, 'G7': 3135.96, 'A8': 3520, 'D': 293.66 };

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playSound(note, volume = 0.5) {
    if (!soundEnabled) return;
    const ctx = initAudio();
    if (!ctx) return;
    let freq = FREQS[note] || 440;
    const now = ctx.currentTime;
    const duration = 1.5;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    const vib = ctx.createOscillator();
    const vibG = ctx.createGain();
    vib.frequency.value = 3.5; vibG.gain.value = 1.5;
    vib.connect(vibG); vibG.connect(osc.frequency);
    vib.start(now); vib.stop(now + duration);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.8, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + duration + 0.1);
}

function drawHandpan(ctx, highlight = null) {
    const W = 820, H = 500;
    ctx.clearRect(0, 0, W, H);
    const cx = 410, cy = 250, r = 220;
    ctx.shadowColor = '#000'; ctx.shadowBlur = 25;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = '#1e293b'; ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r - 10, 0, Math.PI * 2); ctx.fillStyle = '#0f172a'; ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke();
    for (let [note, [x, y, r2]] of Object.entries(HANDPAN_POSITIONS)) {
        const col = NOTE_COLORS[note]; const hl = highlight === note;
        ctx.beginPath(); ctx.arc(x, y, r2 + 2, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, r2, 0, Math.PI * 2); ctx.fillStyle = hl ? '#1e3a8a' : '#1e293b'; ctx.fill();
        ctx.strokeStyle = hl ? col : '#475569'; ctx.lineWidth = hl ? 3 : 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, r2 - 5, 0, Math.PI * 2); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = hl ? '#fff' : '#cbd5e1';
        ctx.font = `bold ${note === 'D' ? 28 : 22}px Arial`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(note, x, y);
    }
}

// ===== NAV =====
function showView(viewId) {
    const el = document.getElementById(viewId);
    if (!el) { console.error("❌ View not found:", viewId); return; }
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    el.classList.add('active');
}

function showGame() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'flex';
    document.getElementById('usernameDisplay').innerText = localStorage.getItem('pm_user') || 'کاربر';
    fetchUserProfile();
    backToMenu();
}

function backToMenu() {
    showView('menu-view');
    stopFallingGame();
    clearInterval(countdownInterval);
    const ov = document.getElementById('countdown-overlay');
    if (ov) ov.style.display = 'none';
}

// ===== FREE PLAY =====
function goToFreePlay() {
    showView('free-view');
    const canvas = document.getElementById('handpanCanvasFree');
    drawHandpan(canvas.getContext('2d'));
    setupInteraction(canvas, 'free');
}

// ===== FALLING =====
let fallingNotes = [];
let animationId = null;
let lastTime = 0;
let score = 0, hits = 0, misses = 0, totalSpawned = 0;
const MAX_NOTES = 20;
const HIT_Y = 220;
let isGameRunning = false, noteSpawnTimer = 0, countdownInterval = null;
const ctxFall = document.getElementById('fallingCanvas').getContext('2d');
const TEST_SEQUENCE = ["D", "E4", "A1", "D", "C3", "D2", "D", "G7", "A1"];

async function goToFallingGame() {
    if (userTokens < 10) {
        alert('❌ سکه کافی ندارید! برای بازی به ۱۰ سکه نیاز است.');
        return;
    }
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/spend-tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ amount: 10 })
        });
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
        } else { alert('خطا در کسر سکه. دوباره تلاش کنید.'); return; }
    } catch (e) { alert('ارتباط با سرور برقرار نشد.'); return; }

    showView('falling-view');
    const canvas = document.getElementById('handpanCanvasFalling');
    drawHandpan(canvas.getContext('2d'));
    setupInteraction(canvas, 'falling');
    score = 0; hits = 0; misses = 0; totalSpawned = 0;
    fallingNotes = [];
    startCountdown();
}

function startCountdown() {
    let count = 4;
    const overlay = document.getElementById('countdown-overlay');
    const text = document.getElementById('countdown-text');
    overlay.style.display = 'flex'; text.innerText = count;
    countdownInterval = setInterval(() => {
        count--;
        if (count === 0) text.innerText = "GO!";
        else if (count < 0) {
            clearInterval(countdownInterval);
            overlay.style.display = 'none';
            startFallingLoop();
        } else text.innerText = count;
    }, 1000);
}

function startFallingLoop() {
    isGameRunning = true;
    lastTime = performance.now();
    spawnNote();
    noteSpawnTimer = 1.5;
    if (animationId) cancelAnimationFrame(animationId);
    requestAnimationFrame(animateFalling);
}

function stopFallingGame() {
    isGameRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
}

function spawnNote() {
    if (!isGameRunning || totalSpawned >= MAX_NOTES) return;
    totalSpawned++;
    let randomNote = TEST_SEQUENCE[Math.floor(Math.random() * TEST_SEQUENCE.length)];
    fallingNotes.push({ note: randomNote, x: HANDPAN_POSITIONS[randomNote][0], y: -50, speed: 200, hit: false });
}

function animateFalling(time) {
    if (!isGameRunning) return;
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    noteSpawnTimer += dt;
    if (noteSpawnTimer > 1.5) { spawnNote(); noteSpawnTimer = 0; }

    ctxFall.clearRect(0, 0, 820, 280);
    ctxFall.beginPath(); ctxFall.moveTo(0, HIT_Y); ctxFall.lineTo(820, HIT_Y);
    ctxFall.strokeStyle = '#38bdf8'; ctxFall.lineWidth = 4; ctxFall.stroke();

    for (let i = fallingNotes.length - 1; i >= 0; i--) {
        let fn = fallingNotes[i];
        if (fn.hit) continue;
        fn.y += fn.speed * dt;
        ctxFall.beginPath(); ctxFall.arc(fn.x, fn.y, 25, 0, Math.PI * 2); ctxFall.fillStyle = NOTE_COLORS[fn.note]; ctxFall.fill();
        ctxFall.fillStyle = '#000'; ctxFall.font = 'bold 14px Arial'; ctxFall.textAlign = 'center'; ctxFall.textBaseline = 'middle';
        ctxFall.fillText(fn.note, fn.x, fn.y);
        if (fn.y > HIT_Y + 40) { misses++; fallingNotes.splice(i, 1); checkEndGame(); }
    }
    animationId = requestAnimationFrame(animateFalling);
}

function executeHit(note, mode) {
    playSound(note);
    const canvasId = mode === 'free' ? 'handpanCanvasFree' : 'handpanCanvasFalling';
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    drawHandpan(ctx, note);
    setTimeout(() => drawHandpan(ctx), 150);
    if (mode === 'falling' && isGameRunning) checkHit(note);
}

function checkHit(noteKey) {
    let hitIndex = -1, minDistance = 80;
    for (let i = 0; i < fallingNotes.length; i++) {
        const fn = fallingNotes[i];
        if (fn.note === noteKey && !fn.hit) {
            const dist = Math.abs(fn.y - HIT_Y);
            if (dist < minDistance) { minDistance = dist; hitIndex = i; }
        }
    }
    if (hitIndex !== -1) {
        fallingNotes[hitIndex].hit = true;
        fallingNotes.splice(hitIndex, 1);
        score += 100; hits++;
        checkEndGame();
    }
}

function checkEndGame() {
    if (totalSpawned >= MAX_NOTES && fallingNotes.length === 0 && isGameRunning) {
        endFallingGame();
    }
}

function endFallingGame() {
    isGameRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    let totalAttempts = hits + misses;
    let accuracy = totalAttempts > 0 ? Math.round((hits / totalAttempts) * 100) : 0;
    let earnedTokens = 0, rewardText = "";
    if (accuracy >= 80) { earnedTokens = 15; rewardText = "عالی! پاداش کامل"; }
    else if (accuracy >= 50) { earnedTokens = 10; rewardText = "خوب! هزینه‌ات جبران شد"; }
    else { earnedTokens = 5; rewardText = "نیاز به تمرین بیشتر داری"; }

    document.getElementById('resScore').innerText = score;
    document.getElementById('resHits').innerText = hits;
    document.getElementById('resMisses').innerText = misses;
    document.getElementById('resAcc').innerText = accuracy + '%';
    document.getElementById('resTokenText').innerHTML = `${coinIconSVG} پاداش شما: <span style="color:#38bdf8; font-size: 24px;">${earnedTokens}</span> <br><span style="font-size:14px;color:#94a3b8;margin-top:5px;display:block;">${rewardText}</span>`;
    showView('result-view');
    if (earnedTokens > 0) sendTokensToServer(earnedTokens, accuracy);
}

async function sendTokensToServer(amount, accuracy = null) {
    const token = localStorage.getItem('pm_token');
    try {
        const res = await fetch('/api/users/add-tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ amount: amount, accuracy: accuracy })
        });
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
        }
    } catch (e) { console.error("Could not save tokens", e); }
}

function setupInteraction(canvas, mode) {
    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);
    drawHandpan(newCanvas.getContext('2d'));

    newCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = newCanvas.getBoundingClientRect();
        const scaleX = 820 / rect.width, scaleY = 500 / rect.height;
        for (let i = 0; i < e.changedTouches.length; i++) {
            const mx = (e.changedTouches[i].clientX - rect.left) * scaleX;
            const my = (e.changedTouches[i].clientY - rect.top) * scaleY;
            for (let [note, [x, y, r]] of Object.entries(HANDPAN_POSITIONS)) {
                if (Math.hypot(mx - x, my - y) <= r) { executeHit(note, mode); break; }
            }
        }
    }, { passive: false });

    newCanvas.addEventListener('mousedown', (e) => {
        const rect = newCanvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (820 / rect.width);
        const my = (e.clientY - rect.top) * (500 / rect.height);
        for (let [note, [x, y, r]] of Object.entries(HANDPAN_POSITIONS)) {
            if (Math.hypot(mx - x, my - y) <= r) { executeHit(note, mode); break; }
        }
    });
}

// ===== BOOT =====
if (localStorage.getItem('pm_token')) {
    showGame();
}
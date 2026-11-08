// ==========================================================
// Song Editor Logic (Phase 2 - Step-based, Multi-note)
// ==========================================================
let currentStepNotes = [];   // نت‌های انتخاب‌شده برای گام فعلی
let songSteps = [];          // گام‌های ثبت‌شده: [{ notes: ["D", "1"] }, ...]
let isPlaying = false;
let playTimer = null;

const NOTE_KEYS = ["D", "1", "2", "3", "4", "5", "6", "7", "8"];
const STEP_PLAY_MS = 600;    // مدت هر گام در پیش‌نمایش

// ---------- گام فعلی ----------
function renderCurrentStep() {
    const container = document.getElementById('editor-notes-list');
    if (!container) return;

    // آپدیت وضعیت دکمه‌های نت همیشه انجام شود
    updateNoteButtonsState();

    container.innerHTML = '';
    if (currentStepNotes.length === 0) {
        container.innerHTML = `<span style="color:var(--text-muted); font-size:12px;">${t('editor.no_notes')}</span>`;
        return;
    }

    currentStepNotes.forEach((noteKey) => {
        const chip = document.createElement('div');
        chip.style.cssText = 'display:inline-flex; align-items:center; gap:6px; background:var(--primary); color:#0f172a; border-radius:20px; padding:5px 12px; margin:3px; font-size:14px; font-weight:bold; cursor:pointer; user-select:none;';
        chip.innerText = noteKey;
        chip.title = 'کلیک برای حذف';
        chip.onclick = () => toggleNoteSelection(noteKey);
        container.appendChild(chip);
    });

    if (currentStepNotes.length === 0) {
        container.innerHTML = `<span style="color:var(--text-muted); font-size:12px;">${t('editor.no_notes')}</span>`;
        return;
    }
}

function toggleNoteSelection(noteKey) {
    const idx = currentStepNotes.indexOf(noteKey);
    if (idx !== -1) currentStepNotes.splice(idx, 1);
    else currentStepNotes.push(noteKey);
    renderCurrentStep();
}

function updateNoteButtonsState() {
    document.querySelectorAll('#note-buttons button[data-note]').forEach(btn => {
        const n = btn.getAttribute('data-note');
        if (currentStepNotes.includes(n)) {
            btn.style.background = 'var(--primary)';
            btn.style.color = '#0f172a';
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 0 12px var(--primary)';
        } else {
            btn.style.background = 'var(--bg-main)';
            btn.style.color = 'var(--primary)';
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        }
    });
}

// ---------- ثبت گام ----------
function commitStep() {
    if (currentStepNotes.length === 0) {
        alert('لطفاً حداقل یک نت برای این گام انتخاب کنید.');
        return;
    }
    // جلوگیری از گام یکسان متوالی
    if (songSteps.length > 0) {
        const last = songSteps[songSteps.length - 1].notes.slice().sort();
        const cur = currentStepNotes.slice().sort();
        if (last.length === cur.length && last.every((v, i) => v === cur[i])) {
            if (!confirm('این گام با گام قبلی یکسان است. بازهم ثبت شود؟')) return;
        }
    }
    songSteps.push({ notes: [...currentStepNotes] });
    currentStepNotes = [];
    renderCurrentStep();
    renderStepsList();
}

function newStep() {
    if (currentStepNotes.length > 0) {
        if (!confirm('نت‌های انتخاب‌شده پاک شوند؟ (گام فعلی ثبت نشده است)')) return;
    }
    currentStepNotes = [];
    renderCurrentStep();
}

// ---------- لیست گام‌ها ----------
function renderStepsList() {
    const container = document.getElementById('song-steps-list');
    if (!container) return;
    container.innerHTML = '';

    if (songSteps.length === 0) {
        container.innerHTML = `<div style="color:var(--text-muted); font-size:12px; text-align:center; padding:10px;">${t('editor.no_steps')}</div>`;
        return;
    }
    if (songSteps.length === 0) {
        container.innerHTML = `<div style="color:var(--text-muted); font-size:12px; text-align:center; padding:10px;">${t('editor.no_steps')}</div>`;
        return;
    }

    songSteps.forEach((step, idx) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:var(--bg-card); border:1px solid var(--border); border-radius:8px; padding:8px 12px; margin-bottom:6px; font-size:13px; gap:8px;';

        const notesHtml = step.notes.map(n => {
            const col = (typeof NOTE_COLORS !== 'undefined' && NOTE_COLORS[n]) ? NOTE_COLORS[n] : '#60a5fa';
            return `<span style="display:inline-block; background:${col}; color:#0f172a; padding:2px 8px; border-radius:10px; margin:0 2px; font-weight:bold;">${n}</span>`;
        }).join('');

        row.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span style="color:var(--text-muted); font-size:11px; min-width:28px;">#${idx + 1}</span>
                <div>${notesHtml}</div>
            </div>
            <div style="display:flex; gap:6px;">
                <button title="پخش این گام" style="background:var(--primary); color:#0f172a; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-weight:bold;">▶</button>
                <button title="حذف" style="background:var(--danger-color,#ef4444); color:#fff; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-weight:bold;">✕</button>
            </div>
        `;

        row.querySelector('button[title="پخش این گام"]').onclick = () => {
            step.notes.forEach(n => playSound(n));
        };
        row.querySelector('button[title="حذف"]').onclick = () => {
            if (confirm(`گام ${idx + 1} حذف شود؟`)) {
                songSteps.splice(idx, 1);
                renderStepsList();
            }
        };

        container.appendChild(row);
    });
}

// ---------- دکمه‌های نت ----------
function renderNoteButtons() {
    const container = document.getElementById('note-buttons');
    if (!container) return;
    container.innerHTML = '';

    NOTE_KEYS.forEach(k => {
        const btn = document.createElement('button');
        btn.textContent = k;
        btn.setAttribute('data-note', k);
        btn.style.cssText = 'width:48px; height:48px; border-radius:50%; border:2px solid var(--primary); background:var(--bg-main); color:var(--primary); font-size:16px; font-weight:bold; cursor:pointer; transition:0.15s;';
        btn.onclick = () => toggleNoteSelection(k);
        container.appendChild(btn);
    });

    updateNoteButtonsState();
}

// ---------- ذخیره آهنگ ----------
async function saveSong() {
    const title = document.getElementById('song-title')?.value.trim();
    const artist = document.getElementById('song-artist')?.value.trim() || '';
    const difficulty = document.getElementById('song-difficulty')?.value || 'Easy';
    const fallSpeed = parseFloat(document.getElementById('song-fall-speed')?.value || 1.0);

    if (!title) { alert('لطفاً عنوان آهنگ را وارد کنید.'); return; }
    if (songSteps.length === 0) { alert('لطفاً حداقل یک گام ثبت کنید.'); return; }

    const token = localStorage.getItem('pm_token');
    if (!token) { alert('ابتدا وارد شوید.'); return; }

    try {
        const res = await fetch('/api/users/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                artist: artist || null,
                difficulty: difficulty,
                notes_data: songSteps.map(s => ({ notes: s.notes })),
                is_public: true,
                fall_speed: fallSpeed
            })
        });

        if (res.ok) {
            alert(t('editor.song_saved'));
            if (typeof fetchUserProfile === 'function') await fetchUserProfile();            
            songSteps = [];
            currentStepNotes = [];
            renderCurrentStep();
            renderStepsList();
            document.getElementById('song-title').value = '';
            document.getElementById('song-artist').value = '';
            loadMySongs();
        } else {
            const err = await res.json();
            alert('خطا: ' + (err.detail || 'ذخیره نشد'));
        }
    } catch (e) {
        alert('خطا در ارتباط با سرور');
    }
}

function clearSongNotes() {
    if (songSteps.length === 0 && currentStepNotes.length === 0) return;
    if (!confirm('تمام گام‌ها و نت‌های انتخاب‌شده پاک شوند؟')) return;
    songSteps = [];
    currentStepNotes = [];
    renderCurrentStep();
    renderStepsList();
}

// ---------- لیست آهنگ‌های من ----------
async function loadMySongsInto(containerId) {
    const token = localStorage.getItem('pm_token');
    const list = document.getElementById(containerId);
    if (!list) return;
    list.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">${t('editor.loading')}</div>`;

    try {
        const res = await fetch('/api/users/songs', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
            list.innerHTML = '<div style="text-align:center; color:var(--danger-color); padding:20px;">خطا در بارگذاری</div>';
            return;
        }
        const songs = await res.json();
        if (!songs || songs.length === 0) {
            list.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">${t('editor.no_songs')}</div>`;
            return;
        }
        list.innerHTML = '';
        songs.forEach(s => {
            const stepCount = Array.isArray(s.notes_data) ? s.notes_data.length : 0;
            const totalNotes = Array.isArray(s.notes_data)
                ? s.notes_data.reduce((acc, st) => acc + (Array.isArray(st.notes) ? st.notes.length : 0), 0)
                : 0;

            const card = document.createElement('div');
            card.style.cssText = 'background:var(--bg-main); border:1px solid var(--border); border-radius:12px; padding:12px 15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;';
            card.innerHTML = `
                <div>
                    <div style="font-weight:bold; color:var(--primary); font-size:15px;">🎵 ${escapeHtml(s.title || '')}</div>
                    <div style="font-size:12px; color:var(--text-muted);">
                        ${s.artist ? escapeHtml(s.artist) + ' • ' : ''}${s.difficulty || 'Easy'}
                        • ${stepCount} گام • ${totalNotes} نت
                        • سرعت ${s.fall_speed ?? 1.0}
                    </div>
                </div>
                <div style="display:flex; gap:6px;">
                    <button class="pm-game-song-btn" style="background:#fbbf24; color:#0f172a; border:none; padding:6px 14px; border-radius:8px; font-weight:bold; cursor:pointer;">🎮 بازی</button>
                    <button class="pm-play-song-btn" style="background:var(--primary); color:#0f172a; border:none; padding:6px 14px; border-radius:8px; font-weight:bold; cursor:pointer;">▶ پخش</button>
                </div>
            `;
            card.querySelector('.pm-game-song-btn').onclick = () => {
                if (typeof goToFallingGame === 'function') goToFallingGame(s);
            };
            card.querySelector('.pm-play-song-btn').onclick = () => playSteps(s.notes_data || []);
            list.appendChild(card);
        });
    } catch (e) {
        list.innerHTML = '<div style="text-align:center; color:var(--danger-color); padding:20px;">خطا در ارتباط با سرور</div>';
    }
}

function loadMySongs() {
    return loadMySongsInto('my-songs-list');
}

// ---------- پخش آهنگ ----------
function playSteps(stepsData) {
    if (isPlaying) stopSong();
    if (!Array.isArray(stepsData) || stepsData.length === 0) return;

    const ctx = initAudio();
    if (!ctx) return;

    isPlaying = true;
    let idx = 0;

    const tick = () => {
        if (!isPlaying) return;
        if (idx >= stepsData.length) { isPlaying = false; return; }
        const step = stepsData[idx];
        const notes = Array.isArray(step?.notes) ? step.notes : (step?.note ? [step.note] : []);
        notes.forEach(n => playSound(n));
        idx++;
        playTimer = setTimeout(tick, STEP_PLAY_MS);
    };
    tick();
}

function stopSong() {
    clearTimeout(playTimer);
    clearInterval(playTimer);
    isPlaying = false;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = String(text ?? '');
    return div.innerHTML;
}

// ---------- شروع ----------
function initSongEditor() {
    renderNoteButtons();
    renderCurrentStep();
    renderStepsList();
    loadMySongs();
}
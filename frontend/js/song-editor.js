// ==========================================================
// Song Editor Logic
// ==========================================================
let songNotes = [];
let isPlaying = false;
let playInterval = null;

const NOTE_KEYS = ["D", "1", "2", "3", "4", "5", "6", "7", "8"];

function renderSongEditor() {
    const container = document.getElementById('editor-notes-list');
    if (!container) return;
    container.innerHTML = '';

    songNotes.forEach((n, idx) => {
        const chip = document.createElement('div');
        chip.style.cssText = 'display:inline-flex; align-items:center; gap:6px; background:var(--bg-main); border:1px solid var(--border); border-radius:20px; padding:6px 12px; margin:4px; font-size:14px; font-weight:bold; color:var(--primary);';
        chip.innerHTML = `<span style="color:var(--text-muted); font-size:11px;">#${idx + 1}</span> ${n.note} <span style="color:var(--danger-color); cursor:pointer; font-size:16px;" onclick="removeSongNote(${idx})">✕</span>`;
        container.appendChild(chip);
    });

    const count = document.getElementById('editor-notes-count');
    if (count) count.innerText = songNotes.length;
}

function addSongNote(noteKey) {
    songNotes.push({ note: noteKey });
    renderSongEditor();
}

function removeSongNote(idx) {
    songNotes.splice(idx, 1);
    renderSongEditor();
}

function clearSongNotes() {
    songNotes = [];
    renderSongEditor();
}

async function saveSong() {
    const title = document.getElementById('song-title').value.trim();
    const artist = document.getElementById('song-artist').value.trim();
    const difficulty = document.getElementById('song-difficulty').value;

    if (!title) {
        alert('لطفاً عنوان آهنگ را وارد کنید.');
        return;
    }
    if (songNotes.length === 0) {
        alert('لطفاً حداقل یک نت اضافه کنید.');
        return;
    }

    const token = localStorage.getItem('pm_token');
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
                notes_data: songNotes,
                is_public: true
            })
        });

        if (res.ok) {
            alert('✅ آهنگ با موفقیت ذخیره شد!');
            clearSongNotes();
            document.getElementById('song-title').value = '';
            document.getElementById('song-artist').value = '';
        } else {
            const err = await res.json();
            alert('خطا: ' + (err.detail || 'ذخیره نشد'));
        }
    } catch (e) {
        alert('خطا در ارتباط با سرور');
    }
}

async function loadMySongs() {
    const token = localStorage.getItem('pm_token');
    const list = document.getElementById('my-songs-list');
    if (!list) return;
    list.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:20px;">در حال بارگذاری...</div>';

    try {
        const res = await fetch('/api/users/songs', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
            list.innerHTML = '<div style="text-align:center; color:var(--danger-color); padding:20px;">خطا در بارگذاری</div>';
            return;
        }
        const songs = await res.json();
        if (songs.length === 0) {
            list.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:20px;">هنوز آهنگی نساخته‌اید</div>';
            return;
        }
        list.innerHTML = '';
        songs.forEach(s => {
            const card = document.createElement('div');
            card.style.cssText = 'background:var(--bg-main); border:1px solid var(--border); border-radius:12px; padding:12px 15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;';
            card.innerHTML = `
                <div>
                    <div style="font-weight:bold; color:var(--primary); font-size:15px;">🎵 ${escapeHtml(s.title)}</div>
                    <div style="font-size:12px; color:var(--text-muted);">${s.artist || ''} • ${s.difficulty} • ${s.notes_data?.length || 0} نت</div>
                </div>
                <button onclick="playSong(${JSON.stringify(s.notes_data)})" style="background:var(--primary); color:#0f172a; border:none; padding:6px 14px; border-radius:8px; font-weight:bold; cursor:pointer;">▶ پخش</button>
            `;
            list.appendChild(card);
        });
    } catch (e) {
        list.innerHTML = '<div style="text-align:center; color:var(--danger-color); padding:20px;">خطا در ارتباط با سرور</div>';
    }
}

function playSong(notes) {
    if (isPlaying) return;
    isPlaying = true;
    const ctx = initAudio();
    if (!ctx) { isPlaying = false; return; }

    let idx = 0;
    playInterval = setInterval(() => {
        if (idx >= notes.length) {
            clearInterval(playInterval);
            isPlaying = false;
            return;
        }
        playSound(notes[idx].note);
        idx++;
    }, 400);
}

function stopSong() {
    clearInterval(playInterval);
    isPlaying = false;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

function renderNoteButtons() {
    const container = document.getElementById('note-buttons');
    if (!container) return;
    container.innerHTML = '';

    const keys = ["D", "1", "2", "3", "4", "5", "6", "7", "8"];
    keys.forEach(k => {
        const btn = document.createElement('button');
        btn.textContent = k;
        btn.style.cssText = 'width:48px; height:48px; border-radius:50%; border:2px solid var(--primary); background:var(--bg-main); color:var(--primary); font-size:16px; font-weight:bold; cursor:pointer; transition:0.15s;';
        btn.onmouseover = () => { btn.style.background = 'var(--primary)'; btn.style.color = '#0f172a'; };
        btn.onmouseout = () => { btn.style.background = 'var(--bg-main)'; btn.style.color = 'var(--primary)'; };
        btn.onclick = () => addSongNote(k);
        container.appendChild(btn);
    });
}

// تابع شروع به کار ادیتور
function initSongEditor() {
    renderNoteButtons();
    renderSongEditor();
    loadMySongs();
}
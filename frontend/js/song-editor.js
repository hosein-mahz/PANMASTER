// ==========================================================
// Song Editor Logic (Simplified & Safe)
// ==========================================================
var currentStepNotes = [];   
var songSteps = [];          
var isPlaying = false;
var playTimer = null;

var NOTE_KEYS = ["D", "1", "2", "3", "4", "5", "6", "7", "8"];
var STEP_PLAY_MS = 600;    

function renderCurrentStep() {
    var container = document.getElementById('editor-notes-list');
    if (!container) return;

    updateNoteButtonsState();
    container.innerHTML = '';

    if (currentStepNotes.length === 0) {
        container.innerHTML = '<span style="color:var(--text-muted); font-size:12px;">' + t('editor.no_notes') + '</span>';
        return;
    }

    for (var i = 0; i < currentStepNotes.length; i++) {
        var noteKey = currentStepNotes[i];
        var chip = document.createElement('div');
        chip.style.cssText = 'display:inline-flex; align-items:center; gap:6px; background:var(--primary); color:#0f172a; border-radius:20px; padding:5px 12px; margin:3px; font-size:14px; font-weight:bold; cursor:pointer; user-select:none;';
        chip.innerText = noteKey;
        chip.title = t('editor.click_delete');
        chip.onclick = (function(nk) { return function() { toggleNoteSelection(nk); }; })(noteKey);
        container.appendChild(chip);
    }
}

function toggleNoteSelection(noteKey) {
    var idx = currentStepNotes.indexOf(noteKey);
    if (idx !== -1) currentStepNotes.splice(idx, 1);
    else currentStepNotes.push(noteKey);
    renderCurrentStep();
}

function updateNoteButtonsState() {
    var buttons = document.querySelectorAll('#note-buttons button[data-note]');
    buttons.forEach(function(btn) {
        var n = btn.getAttribute('data-note');
        if (currentStepNotes.indexOf(n) !== -1) {
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

function commitStep() {
    if (currentStepNotes.length === 0) {
        alert(t('editor.error_no_notes'));
        return;
    }
    if (songSteps.length > 0) {
        const last = songSteps[songSteps.length - 1].notes.slice().sort();
        const cur = currentStepNotes.slice().sort();
        if (last.length === cur.length && last.every((v, i) => v === cur[i])) {
            if (!confirm(t('editor.warn_duplicate'))) return;
        }
    }
    
    // 👇 خوندن مقدار فاصله
    const gapInput = document.getElementById('song-step-gap');
    const gapValue = gapInput ? parseFloat(gapInput.value) : 1.0;

    // 👇 ذخیره فاصله به همراه نت‌ها
    songSteps.push({ notes: [...currentStepNotes], gap: gapValue });
    
    currentStepNotes = [];
    renderCurrentStep();
    renderStepsList();
}

function newStep() {
    currentStepNotes = [];
    renderCurrentStep();
}

function renderStepsList() {
    const container = document.getElementById('song-steps-list');
    if (!container) return;
    container.innerHTML = '';

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

        // 👇 نمایش فاصله گام
        const gapText = step.gap ? `⏱️ ${step.gap}s` : '⏱️ 1.0s';

        row.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span style="color:var(--text-muted); font-size:11px; min-width:28px;">#${idx + 1}</span>
                <div>${notesHtml}</div>
                <span style="font-size:10px; color:var(--coin-text); background:var(--bg-main); padding:2px 6px; border-radius:6px;">${gapText}</span>
            </div>
            <div style="display:flex; gap:6px;">
                <button title="${t('editor.play_step')}" style="background:var(--primary); color:#0f172a; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-weight:bold;">▶</button>
                <button title="${t('editor.delete')}" style="background:var(--danger-color,#ef4444); color:#fff; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-weight:bold;">✕</button>
            </div>
        `;

        row.querySelector('button[title="'+t('editor.play_step')+'"]').onclick = () => {
            step.notes.forEach(n => playSound(n));
        };
        row.querySelector('button[title="'+t('editor.delete')+'"]').onclick = () => {
            if (confirm(t('editor.confirm_delete_step').replace('{n}', idx + 1))) {
                songSteps.splice(idx, 1);
                renderStepsList();
            }
        };

        container.appendChild(row);
    });
}

function renderNoteButtons() {
    var container = document.getElementById('note-buttons');
    if (!container) return;
    container.innerHTML = '';

    NOTE_KEYS.forEach(function(k) {
        var btn = document.createElement('button');
        btn.textContent = k;
        btn.setAttribute('data-note', k);
        btn.style.cssText = 'width:48px; height:48px; border-radius:50%; border:2px solid var(--primary); background:var(--bg-main); color:var(--primary); font-size:16px; font-weight:bold; cursor:pointer; transition:0.15s;';
        btn.onclick = function() { toggleNoteSelection(k); };
        container.appendChild(btn);
    });

    updateNoteButtonsState();
}

async function saveSong() {
    var title = document.getElementById('song-title') ? document.getElementById('song-title').value.trim() : '';
    var artist = document.getElementById('song-artist') ? document.getElementById('song-artist').value.trim() : '';
    var difficulty = document.getElementById('song-difficulty') ? document.getElementById('song-difficulty').value : 'Easy';
    var fallSpeed = parseFloat(document.getElementById('song-fall-speed') ? document.getElementById('song-fall-speed').value : 1.0);

    if (!title) { alert(t('editor.error_no_title')); return; }
    if (songSteps.length === 0) { alert(t('editor.error_no_steps')); return; }

    var token = localStorage.getItem('pm_token');
    if (!token) { alert(t('editor.error_login')); return; }

    try {
        var res = await fetch('/api/users/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({
                title: title,
                artist: artist || null,
                difficulty: difficulty,
                notes_data: songSteps.map(function(s) { return { notes: s.notes }; }),
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
            if (document.getElementById('song-title')) document.getElementById('song-title').value = '';
            if (document.getElementById('song-artist')) document.getElementById('song-artist').value = '';
            loadMySongs();
        } else {
            var err = await res.json();
            alert(t('editor.error_save').replace('{msg}', err.detail || t('editor.error_save_default')));
        }
    } catch (e) {
        alert(t('msg.error_server'));
    }
}

function clearSongNotes() {
    if (songSteps.length === 0 && currentStepNotes.length === 0) return;
    if (!confirm(t('editor.confirm_clear'))) return;
    songSteps = [];
    currentStepNotes = [];
    renderCurrentStep();
    renderStepsList();
}

async function loadMySongsInto(containerId) {
    var token = localStorage.getItem('pm_token');
    var list = document.getElementById(containerId);
    if (!list) return;
    
    list.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:20px;">' + t('editor.loading') + '</div>';

    try {
        var res = await fetch('/api/users/songs', { headers: { 'Authorization': 'Bearer ' + token } });
        if (!res.ok) {
            list.innerHTML = '<div style="text-align:center; color:var(--danger-color); padding:20px;">' + t('editor.error_load') + '</div>';
            return;
        }
        var songs = await res.json();
        if (!songs || songs.length === 0) {
            list.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:20px;">' + t('editor.no_songs') + '</div>';
            return;
        }
        list.innerHTML = '';

        songs.forEach(function(s) {
            var stepCount = Array.isArray(s.notes_data) ? s.notes_data.length : 0;
            var totalNotes = Array.isArray(s.notes_data) ? s.notes_data.reduce(function(acc, st) { return acc + (Array.isArray(st.notes) ? st.notes.length : 0); }, 0) : 0;
            var diffKey = 'difficulty.' + (s.difficulty || 'easy').toLowerCase();

            var card = document.createElement('div');
            card.style.cssText = 'background:var(--bg-main); border:1px solid var(--border); border-radius:12px; padding:12px 15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;';

            card.innerHTML = '<div>' +
                '<div style="font-weight:bold; color:var(--primary); font-size:15px;">🎵 ' + escapeHtml(s.title || '') + '</div>' +
                '<div style="font-size:12px; color:var(--text-muted);">' +
                (s.artist ? escapeHtml(s.artist) + ' • ' : '') + t(diffKey) +
                ' • ' + t('editor.steps_count').replace('{n}', stepCount) +
                ' • ' + t('editor.notes_count').replace('{n}', totalNotes) +
                ' • ' + t('editor.speed').replace('{n}', s.fall_speed || 1.0) +
                '</div></div>' +
                '<div style="display:flex; gap:6px;">' +
                '<button class="pm-game-song-btn" style="background:#fbbf24; color:#0f172a; border:none; padding:6px 14px; border-radius:8px; font-weight:bold; cursor:pointer;">' + t('editor.play_game') + '</button>' +
                '<button class="pm-play-song-btn" style="background:var(--primary); color:#0f172a; border:none; padding:6px 14px; border-radius:8px; font-weight:bold; cursor:pointer;">' + t('editor.play_song') + '</button>' +
                '</div>';

            card.querySelector('.pm-game-song-btn').onclick = function() {
                if (typeof goToFallingGame === 'function') goToFallingGame(s);
            };
            card.querySelector('.pm-play-song-btn').onclick = function() {
                playSteps(s.notes_data || []);
            };
            list.appendChild(card);
        });
    } catch (e) {
        list.innerHTML = '<div style="text-align:center; color:var(--danger-color); padding:20px;">' + t('msg.error_server') + '</div>';
    }
}

function loadMySongs() {
    return loadMySongsInto('my-songs-list');
}

function playSteps(stepsData) {
    if (isPlaying) stopSong();
    if (!Array.isArray(stepsData) || stepsData.length === 0) return;

    if (!initAudio()) return;

    isPlaying = true;
    var idx = 0;

    var tick = function() {
        if (!isPlaying) return;
        if (idx >= stepsData.length) { isPlaying = false; return; }
        var step = stepsData[idx];
        var notes = Array.isArray(step.notes) ? step.notes : (step.note ? [step.note] : []);
        for (var i = 0; i < notes.length; i++) playSound(notes[i]);
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
    var div = document.createElement('div');
    div.innerText = String(text || '');
    return div.innerHTML;
}

function initSongEditor() {
    renderNoteButtons();
    renderCurrentStep();
    renderStepsList();
    loadMySongs();
}
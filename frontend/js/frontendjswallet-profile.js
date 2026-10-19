// ============================================
//   Wallet & Profile pages for PanMaster
// ============================================

// ---------- Helpers ----------
function formatDateFa(iso) {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleDateString('fa-IR'); }
    catch { return iso; }
}

function formatDateTimeFa(iso) {
    if (!iso) return '';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('fa-IR') + ' ' +
               d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    } catch { return iso; }
}

function getAuthToken() {
    return localStorage.getItem('pm_token');
}

// ---------- Wallet ----------
async function goToWallet() {
    showView('wallet-view');
    await refreshWallet();
}

async function refreshWallet() {
    const token = getAuthToken();
    if (!token) return;

    // موجودی و VIP
    try {
        const res = await fetch('/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const user = await res.json();
            userTokens = user.coins;
            document.getElementById('tokenDisplay').innerText = user.coins;
            document.getElementById('walletBalance').innerText = user.coins;

            const vipBox = document.getElementById('vipStatus');
            const isVipActive = user.is_vip && user.vip_expire_date &&
                                new Date(user.vip_expire_date) > new Date();
            if (isVipActive) {
                vipBox.classList.add('vip-active');
                vipBox.innerHTML = `✅ اشتراک VIP فعال است<br><span style="font-size:12px;color:var(--text-muted);">تا ${formatDateFa(user.vip_expire_date)}</span>`;
            } else {
                vipBox.classList.remove('vip-active');
                vipBox.innerHTML = `
                    <span style="color:var(--text-muted);font-size:13px;">اشتراک VIP فعال نیست</span>
                    <button class="btn" style="padding:10px;margin-top:4px;" onclick="buyVip()">خرید VIP (۵۰,۰۰۰ تومان / ۳۰ روز)</button>
                `;
            }
        }
    } catch (e) { console.error('refreshWallet/me', e); }

    // تاریخچه تراکنش‌ها
    try {
        const res = await fetch('/api/users/wallet/transactions?limit=50', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const txs = await res.json();
            const list = document.getElementById('transactionsList');
            if (!txs.length) {
                list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;font-size:13px;">هنوز تراکنشی ثبت نشده است.</p>';
            } else {
                list.innerHTML = txs.map(tx => {
                    const pos = tx.amount > 0;
                    const zero = tx.amount === 0;
                    const sign = pos ? '+' : '';
                    const cls = zero ? '' : (pos ? 'positive' : 'negative');
                    const label = zero ? '—' : `${sign}${tx.amount}`;
                    return `
                        <div class="tx-item">
                            <div class="tx-info">
                                <span class="tx-desc">${tx.description || tx.type}</span>
                                <span class="tx-date">${formatDateTimeFa(tx.created_at)}</span>
                            </div>
                            <span class="tx-amount ${cls}">${label}</span>
                        </div>`;
                }).join('');
            }
        }
    } catch (e) { console.error('refreshWallet/tx', e); }
}

async function buyCoins(packageId) {
    const token = getAuthToken();
    const msg = {
        small:  'خرید ۱۰۰ سکه به قیمت ۱۰,۰۰۰ تومان',
        medium: 'خرید ۵۰۰ سکه به قیمت ۴۵,۰۰۰ تومان',
        large:  'خرید ۱۰۰۰ سکه به قیمت ۸۰,۰۰۰ تومان'
    }[packageId];
    if (!msg) return;
    if (!confirm(msg + '\n\n(درگاه پرداخت آزمایشی — بدون پرداخت واقعی)')) return;

    try {
        const res = await fetch(`/api/users/wallet/buy-coins?package_id=${encodeURIComponent(packageId)}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            userTokens = data.new_balance;
            document.getElementById('tokenDisplay').innerText = userTokens;
            alert('✅ خرید با موفقیت انجام شد.');
            await refreshWallet();
        } else {
            const err = await res.json().catch(() => ({}));
            alert('خطا: ' + (err.detail || 'خرید انجام نشد'));
        }
    } catch (e) { alert('ارتباط با سرور برقرار نشد.'); }
}

async function buyVip() {
    if (!confirm('خرید اشتراک VIP به مدت ۳۰ روز\nقیمت: ۵۰,۰۰۰ تومان\n\n(درگاه پرداخت آزمایشی)')) return;
    const token = getAuthToken();
    try {
        const res = await fetch('/api/users/wallet/buy-vip', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            alert('✅ اشتراک VIP فعال شد!');
            await refreshWallet();
        } else {
            const err = await res.json().catch(() => ({}));
            alert('خطا: ' + (err.detail || 'خرید انجام نشد'));
        }
    } catch (e) { alert('ارتباط با سرور برقرار نشد.'); }
}

// ---------- Profile ----------
async function goToProfile() {
    showView('profile-view');
    await refreshProfile();
}

async function refreshProfile() {
    const token = getAuthToken();
    if (!token) return;

    document.getElementById('profileUsername').innerText = localStorage.getItem('pm_user') || 'کاربر';

    // ایمیل
    try {
        const res = await fetch('/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const u = await res.json();
            document.getElementById('profileEmail').innerText = u.email || '—';
        }
    } catch (e) { console.error('refreshProfile/me', e); }

    // آمار
    try {
        const res = await fetch('/api/users/profile/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const s = await res.json();
            document.getElementById('statGames').innerText  = s.total_games;
            document.getElementById('statBest').innerText   = Math.round(s.best_accuracy) + '%';
            document.getElementById('statEarned').innerText = s.total_coins_earned;
            document.getElementById('statSpent').innerText  = s.total_coins_spent;
            document.getElementById('memberSince').innerText = formatDateFa(s.member_since);
        }
    } catch (e) { console.error('refreshProfile/stats', e); }
}
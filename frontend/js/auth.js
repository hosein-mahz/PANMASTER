const API_URL = 'http://127.0.0.1:8000/api/users';

// ===== منطق ثبت‌نام =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                alert('ثبت‌نام با موفقیت انجام شد! حالا وارد شوید.');
                window.location.href = 'login.html';
            } else {
                const data = await response.json();
                alert('خطا: ' + (data.detail || 'مشکلی پیش آمد'));
            }
        } catch (err) {
            alert('ارتباط با سرور برقرار نشد. مطمئن شوید سرور روشن است.');
        }
    });
}

// ===== منطق ورود =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // ارسال به فرمت OAuth2 (که FastAPI انتظار داره)
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token); // ذخیره توکن
                alert('ورود موفق! در حال انتقال...');
                // window.location.href = 'game.html'; // در قدم بعدی این رو فعال می‌کنیم
            } else {
                alert('ایمیل یا رمز عبور اشتباه است.');
            }
        } catch (err) {
            alert('ارتباط با سرور برقرار نشد.');
        }
    });
}
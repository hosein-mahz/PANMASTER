from PIL import Image
import base64
import re

# خواندن فایل اچ‌تی‌ام‌ال
with open('coin_pm.html', 'r', encoding='utf-8') as f:
    html = f.read()

# پیدا کردن رشته عکس
match = re.search(r'base64,([^"]+)', html)
if match:
    # استخراج و ذخیره عکس اصلی
    img_data = base64.b64decode(match.group(1))
    with open('coin.jpg', 'wb') as f:
        f.write(img_data)

    # باز کردن عکس و حذف پس‌زمینه مشکی
    img = Image.open('coin.jpg').convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # اگر پیکسل مشکی بود (R, G, B کوچکتر از ۱۵)، آن را شفاف کن
        if item[0] < 15 and item[1] < 15 and item[2] < 15:
            newData.append((0, 0, 0, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save('coin_transparent.png', "PNG")
    print("✅ عکس با پس‌زمینه شفاف ساخته شد: coin_transparent.png")
else:
    print("❌ عکس پیدا نشد.")
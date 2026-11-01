import os
from PIL import Image, ImageDraw, ImageOps

# مسیر پوشه آواتارها (از پوشه backend اجرا کن)
FOLDER = "../frontend/assets/avatars"

def crop_to_circle(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # ساخت یک ماسک دایره‌ای
        mask = Image.new("L", img.size, 0)
        draw = ImageDraw.Draw(mask)
        # رسم دایره در مرکز تصویر
        draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
        
        # اعمال ماسک
        result = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        result.putalpha(mask)
        
        # ذخیره با پسوند PNG (چون SVG رو نمیشه به راحتی با پایتون ویرایش کرد)
        new_path = image_path.rsplit('.', 1)[0] + '.png'
        result.save(new_path, "PNG")
        print(f"✅ اصلاح شد: {new_path}")
        
        # اگر فایل اصلی SVG بود، می‌تونیم پاکش کنیم یا نگه داریم
        if image_path.endswith('.svg'):
            os.remove(image_path)
            
    except Exception as e:
        print(f"❌ خطا در {image_path}: {e}")

if __name__ == "__main__":
    for filename in os.listdir(FOLDER):
        if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".svg"):
            crop_to_circle(os.path.join(FOLDER, filename))
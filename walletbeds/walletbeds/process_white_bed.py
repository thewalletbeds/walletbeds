import os
from PIL import Image, ImageDraw, ImageFont

output_dir = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds\images"
logo_path = os.path.join(output_dir, "logo_transparent.png")
src_path = os.path.join(output_dir, "Dont Use", "white.png")
dest_path = os.path.join(output_dir, "brand_white.jpg")

print("--- Starting White Bed Image processing ---")

if not os.path.exists(logo_path):
    raise FileNotFoundError(f"Logo not found at {logo_path}")

if not os.path.exists(src_path):
    raise FileNotFoundError(f"Source image not found at {src_path}")

# Load logo and convert to silver watermark
with Image.open(logo_path) as logo_img:
    logo_img = logo_img.convert("RGBA")
    w_l, h_l = logo_img.size
    logo_data = list(logo_img.getdata())
    logo_silver_data = []
    for item in logo_data:
        r, g, b, a = item
        if r > 240 and g > 240 and b > 240:
            logo_silver_data.append((0, 0, 0, 0))
        else:
            if r < 100 and g < 100 and b < 120:
                logo_silver_data.append((240, 240, 240, a))
            else:
                logo_silver_data.append((255, 255, 255, a))
                
    logo_silver = Image.new("RGBA", (w_l, h_l))
    logo_silver.putdata(logo_silver_data)
    bbox = logo_silver.getbbox()
    logo_silver_cropped = logo_silver.crop(bbox) if bbox else logo_silver

# Load font
font_path = r"C:\Windows\Fonts\segoeuib.ttf"
if not os.path.exists(font_path):
    font_path = r"C:\Windows\Fonts\arialbd.ttf"
if not os.path.exists(font_path):
    font_path = r"C:\Windows\Fonts\segoeui.ttf"
if not os.path.exists(font_path):
    font_path = r"C:\Windows\Fonts\arial.ttf"

try:
    font = ImageFont.truetype(font_path, 22)
    print(f"Loaded bold font {font_path}")
except Exception:
    font = ImageFont.load_default()
    print("Failed to load bold font, using default PIL font.")

print(f"Processing {src_path} -> {dest_path}...")
with Image.open(src_path) as img:
    # Resize to 1024x1024
    img_resized = img.resize((1024, 1024), Image.Resampling.LANCZOS).convert("RGBA")
    
    # A. Erase the Gemini AI star watermark at bottom-right (935, 930) to (985, 980)
    # We copy a clean patch from (860, 930) and paste it over (935, 930)
    clean_patch = img_resized.crop((860, 930, 910, 980))
    img_resized.paste(clean_patch, (935, 930))
    
    # B. Overlay the silver logo at bottom-right corner (centered at 960, 955)
    # logo_w = 110
    # logo_h = int(logo_w * logo_silver_cropped.size[1] / logo_silver_cropped.size[0])
    # logo_resized = logo_silver_cropped.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    # logo_x = 960 - logo_w // 2
    # logo_y = 955 - logo_h // 2
    # img_resized.paste(logo_resized, (logo_x, logo_y), logo_resized)
    
    # Save as JPEG
    final_rgb = img_resized.convert("RGB")
    final_rgb.save(dest_path, "JPEG", quality=95)
    print(f"Successfully processed and saved white bed to {dest_path}")

print("--- Done ---")

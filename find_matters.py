import os
from PIL import Image

p = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds\images\Dont Use\white.png"

if os.path.exists(p):
    with Image.open(p) as img:
        img = img.convert("RGB")
        w, h = img.size
        crop_area = (w - 150, h - 150, w, h)
        cropped = img.crop(crop_area)
        pixels = list(cropped.getdata())
        bright_pixels = [px for px in pixels if px[0] > 200 and px[1] > 200 and px[2] > 200]
        print(f"Source white.png ({w}x{h}):")
        print(f"  Bright pixels in 150x150 bottom-right corner: {len(bright_pixels)}")
else:
    print("images/Dont Use/white.png does not exist!")

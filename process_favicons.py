from PIL import Image
import os

source_path = r"C:\Users\User\.gemini\antigravity\brain\7b89b246-a307-4679-97f3-82261470c423\walletbeds_favicon_wb_1781288957976.png"
public_dir = r"C:\Users\User\Documents\GitHub\walletbeds\public"

if not os.path.exists(public_dir):
    os.makedirs(public_dir)

img = Image.open(source_path).convert("RGBA")

# 1. apple-touch-icon.png (180x180)
img_apple = img.resize((180, 180), Image.Resampling.LANCZOS)
img_apple.save(os.path.join(public_dir, "apple-touch-icon.png"), format="PNG")

# 2. favicon-32x32.png (32x32)
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(os.path.join(public_dir, "favicon-32x32.png"), format="PNG")

# 3. favicon.ico (multi-size: 16, 32, 48, 64)
icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
img.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=icon_sizes)

print("Favicons generated successfully in the public directory.")

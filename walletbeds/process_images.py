import os
from PIL import Image, ImageEnhance

# Paths
source_image = r"C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\media__1779131782534.jpg"
output_dir = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds\images"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Open source image
img = Image.open(source_image)

# 1. Slate Edition (Original)
img.save(os.path.join(output_dir, "slate.png"))
print("Saved slate.png")

# 2. Black Edition
# Darken the image to make the gray bed look matte black, while maintaining details
enhancer_bright = ImageEnhance.Brightness(img)
img_dark = enhancer_bright.enhance(0.55)
enhancer_contrast = ImageEnhance.Contrast(img_dark)
img_black = enhancer_contrast.enhance(1.4)
img_black.save(os.path.join(output_dir, "black.png"))
print("Saved black.png")

# 3. White Edition
# Brighten the image to make the gray bed look white
enhancer_bright = ImageEnhance.Brightness(img)
img_bright = enhancer_bright.enhance(1.45)
enhancer_contrast = ImageEnhance.Contrast(img_bright)
img_white = enhancer_contrast.enhance(0.9)
img_white.save(os.path.join(output_dir, "white.png"))
print("Saved white.png")

# 4. Hero Image (Original is perfect for the main product showcase)
img.save(os.path.join(output_dir, "hero.png"))
print("Saved hero.png")

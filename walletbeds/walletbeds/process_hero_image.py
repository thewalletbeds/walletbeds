import os
from PIL import Image

pristine_src = r"C:\Users\User\.gemini\antigravity\brain\306e7690-0192-443a-a5ec-c1551c206af4\media__1779386870636.jpg"
output_dir = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds\images"
dest_path = os.path.join(output_dir, "upholstered_black.jpg")

print("--- Starting clean Hero Image processing ---")

if not os.path.exists(pristine_src):
    raise FileNotFoundError(f"Pristine source not found at {pristine_src}")

with Image.open(pristine_src) as img:
    # Convert and resize to 1024x1024
    img_resized = img.resize((1024, 1024), Image.Resampling.LANCZOS).convert("RGBA")
    
    # Erase the Gemini AI star watermark at bottom-right (935, 930) to (985, 980)
    # We copy a clean patch from (860, 930) and paste it over (935, 930)
    clean_patch = img_resized.crop((860, 930, 910, 980))
    img_resized.paste(clean_patch, (935, 930))
    
    # Save as JPEG cleanly without any baked-in watermark logo!
    final_rgb = img_resized.convert("RGB")
    final_rgb.save(dest_path, "JPEG", quality=95)
    print(f"Clean hero image successfully saved to {dest_path}")

print("--- Done ---")

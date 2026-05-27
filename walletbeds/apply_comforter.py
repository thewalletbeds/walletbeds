import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 1. Setup paths
brain_dir = r"C:\Users\User\.gemini\antigravity\brain\306e7690-0192-443a-a5ec-c1551c206af4"
comforter_src = os.path.join(brain_dir, "media__1779485917317.jpg")  # Inspiration image
logo_path = os.path.join(brain_dir, "media__1779388800515.png")     # Brand logo
output_dir = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds\images"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# 2. Bed information and color mapping
# Mapping: (bare_src_filename, output_comforter_filename, color_name)
bed_mappings = [
    ("media__1779386870636.jpg", "upholstered_black_comforter.jpg", "burgundy"),  # Midnight Tufted -> Burgundy
    ("media__1779386920241.jpg", "royal_blue_comforter.jpg", "white"),            # Royal Blue Tufted -> White
    ("media__1779386920136.jpg", "industrial_pipe_comforter.jpg", "black"),        # Industrial Pipe -> Black
    ("media__1779386920173.jpg", "sleigh_comforter.jpg", "gray"),                  # Classic Sleigh -> Gray
    ("media__1779386920158.jpg", "canopy_comforter.jpg", "blue")                  # Four-Poster Canopy -> Blue
]

# Side rail watermark coordinates (cx, cy) - same as watermark_engine.py
rail_coordinates = {
    "upholstered_black_comforter.jpg": (687, 560),
    "royal_blue_comforter.jpg": (687, 560),
    "canopy_comforter.jpg": (687, 560),
    "sleigh_comforter.jpg": (410, 445),
    "industrial_pipe_comforter.jpg": (410, 445)
}

# 3. Sheets boundary polygon
poly = [
    (240, 520),  # Top-Left
    (450, 460),  # Top-Right
    (800, 600),  # Bottom-Right
    (550, 820)   # Bottom-Left
]

# 4. Prepare Brand Logo
print("--- Loading and Processing Silver Brand Logo ---")
if not os.path.exists(logo_path):
    raise FileNotFoundError(f"Brand logo not found at {logo_path}")

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
            elif r > 50 and r < 120 and g > 100 and g < 160 and b > 150 and b < 220:
                logo_silver_data.append((120, 180, 240, a))
            else:
                logo_silver_data.append((255, 255, 255, a))

    logo_silver = Image.new("RGBA", (w_l, h_l))
    logo_silver.putdata(logo_silver_data)
    bbox = logo_silver.getbbox()
    logo_silver_cropped = logo_silver.crop(bbox) if bbox else logo_silver

# Load fonts
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

# 5. Load and crop comforter reference image
print("\n--- Processing Comforter Texture ---")
if not os.path.exists(comforter_src):
    raise FileNotFoundError(f"Comforter source not found at {comforter_src}")

with Image.open(comforter_src) as c_img:
    c_img = c_img.convert("RGB")
    # Crop the clean baffled-box texture from the bedroom photo (avoiding white frame)
    comforter_crop = c_img.crop((180, 420, 880, 880))
    # Resize comforter texture to bounding box of bedding area (560x360)
    comforter_resized = comforter_crop.resize((560, 360), Image.Resampling.LANCZOS)

# 6. Synthesize and watermark each bed
print("\n--- Synthesizing Cozy Comforter Views ---")
for src_name, dest_name, color in bed_mappings:
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(output_dir, dest_name)
    
    if not os.path.exists(src_path):
        print(f"Error: Pristine source {src_name} NOT found in brain storage, skipping.")
        continue
        
    print(f"Processing {src_name} -> {dest_name} ({color.upper()})...")
    with Image.open(src_path) as b_img:
        b_img = b_img.convert("RGB")
        w, h = b_img.size
        
        # A. Recolor and prepare the comforter texture for this bed
        bed_comforter = Image.new("RGB", (560, 360))
        for y in range(360):
            for x in range(560):
                cr, cg, cb = comforter_resized.getpixel((x, y))
                
                # Recolor based on color selection
                if color == "white":
                    br = int(cr * 1.02)
                    bg = int(cg * 1.02)
                    bb = int(cb * 1.02)
                elif color == "black":
                    br = int(cr * 0.20)
                    bg = int(cg * 0.20)
                    bb = int(cb * 0.22)
                elif color == "gray":
                    br = int(cr * 0.48)
                    bg = int(cg * 0.48)
                    bb = int(cb * 0.50)
                elif color == "burgundy":
                    br = int(cr * 0.68)
                    bg = int(cg * 0.05)
                    bb = int(cb * 0.18)
                elif color == "blue":
                    br = int(cr * 0.06)
                    bg = int(cg * 0.25)
                    bb = int(cb * 0.68)
                else:
                    br, bg, bb = cr, cg, cb
                    
                br = max(0, min(255, br))
                bg = max(0, min(255, bg))
                bb = max(0, min(255, bb))
                
                bed_comforter.putpixel((x, y), (br, bg, bb))
                
        # B. Create sheets mask and composite the comforter over the mattress
        sheets_mask = Image.new("L", (w, h), 0)
        draw_mask = ImageDraw.Draw(sheets_mask)
        draw_mask.polygon(poly, fill=255)
        
        comforter_overlay = Image.new("RGB", (w, h))
        comforter_overlay.paste(bed_comforter, (240, 460))
        
        # Base composite: Comforter fully drapes the sheets
        bed_with_comforter = Image.composite(comforter_overlay, b_img, sheets_mask)
        
        # C. Extract the wallet from the original bed image and layer it back
        # Wallet bounding box
        wx1, wy1, wx2, wy2 = 410, 545, 630, 670
        wallet_crop = b_img.crop((wx1, wy1, wx2, wy2))
        wc_w, wc_h = wallet_crop.size
        
        # Create feathered wallet transparency mask to remove original white sheets
        wallet_mask = Image.new("L", (wc_w, wc_h), 255)
        for y in range(wc_h):
            for x in range(wc_w):
                r, g, b = wallet_crop.getpixel((x, y))
                brightness = (r + g + b) // 3
                diff = max(r, g, b) - min(r, g, b)
                
                # Check if it is bright, low-saturation sheet background
                if brightness > 135 and diff < 35:
                    alpha = 0
                    if brightness < 160:
                        # Smooth linear feathering transition for shadow edges
                        alpha = int((160 - brightness) / 25 * 100)
                    wallet_mask.putpixel((x, y), alpha)
                else:
                    wallet_mask.putpixel((x, y), 255)
                    
        # Feather mask edges with Gaussian blur to prevent jagged margins
        wallet_mask_blurred = wallet_mask.filter(ImageFilter.GaussianBlur(1.5))
        
        # Apply mask to cropped wallet
        wallet_rgba = wallet_crop.convert("RGBA")
        wallet_rgba.putalpha(wallet_mask_blurred)
        
        # D. Generate a soft programmatic drop shadow for the wallet
        shadow_offset = (5, 8)
        shadow_blur = 6
        shadow_mask = wallet_mask.filter(ImageFilter.GaussianBlur(shadow_blur))
        shadow_img = Image.new("RGBA", (wc_w + 20, wc_h + 20), (0, 0, 0, 0))
        shadow_color = (0, 0, 0, 110) # Premium semi-transparent black shadow
        shadow_overlay = Image.new("RGBA", (wc_w, wc_h), shadow_color)
        shadow_img.paste(shadow_overlay, (10, 10), shadow_mask)
        
        # Paste shadow onto comforter bed
        composite_canvas = bed_with_comforter.convert("RGBA")
        composite_canvas.paste(shadow_img, (wx1 - 10 + shadow_offset[0], wy1 - 10 + shadow_offset[1]), shadow_img)
        
        # Paste transparent wallet on top of shadow
        composite_canvas.paste(wallet_rgba, (wx1, wy1), wallet_rgba)
        
        # E. Watermark Branding Overlays (Erase AI star, overlay logo & side rail watermark)
        # 1. Erase AI star at bottom-right
        clean_patch = composite_canvas.crop((860, 930, 910, 980))
        composite_canvas.paste(clean_patch, (935, 930))
        
        # 2. Overlay silver brand logo (centered at 960, 955)
        logo_w = 110
        logo_h = int(logo_w * logo_silver_cropped.size[1] / logo_silver_cropped.size[0])
        logo_resized = logo_silver_cropped.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        logo_x = 960 - logo_w // 2
        logo_y = 955 - logo_h // 2
        composite_canvas.paste(logo_resized, (logo_x, logo_y), logo_resized)
        
        # 3. Draw horizontal "WalletBeds™" text on the side rail
        td = ImageDraw.Draw(composite_canvas)
        watermark_text = "WalletBeds™"
        text_color = (255, 255, 255, 255)
        
        if hasattr(td, 'textbbox'):
            tb = td.textbbox((0, 0), watermark_text, font=font)
            tw = tb[2] - tb[0]
            th = tb[3] - tb[1]
        else:
            tw, th = td.textsize(watermark_text, font=font)
            
        txt_canvas = Image.new("RGBA", (tw + 20, th + 20), (0, 0, 0, 0))
        td_c = ImageDraw.Draw(txt_canvas)
        td_c.text((10, 10), watermark_text, font=font, fill=text_color)
        
        cx, cy = rail_coordinates.get(dest_name, (687, 560))
        paste_x = cx - txt_canvas.size[0] // 2
        paste_y = cy - txt_canvas.size[1] // 2
        
        composite_canvas.paste(txt_canvas, (paste_x, paste_y), txt_canvas)
        
        # F. Save composite image to workspace images directory
        final_rgb = composite_canvas.convert("RGB")
        final_rgb.save(dest_path, "JPEG", quality=95)
        print(f"  Successfully synthesized and saved to {dest_path}")

print("\n--- All Cozy Comforter Views Synthesized & Watermarked Successfully! ---")

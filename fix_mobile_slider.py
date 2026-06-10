import os

html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

target_html = '''                <div class="hero-slider" style="max-width: 100%; width: 800px; margin: 0 auto; aspect-ratio: 1/1;">
                    <img src="images/WalletBedHeroClean.png" alt="Wallet Bed Lifestyle Photo" class="hero-main-img hero-slide active" style="max-width: 100%; height: auto; max-height: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <img src="images/WalletBedHeroImageInfoGraphicv3.png" alt="Wallet Bed Features Summary" class="hero-main-img hero-slide" style="max-width: 100%; height: auto; max-height: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">

                </div>'''

replacement_html = '''                <div class="hero-image-wrapper hero-slider" style="max-width: 800px; margin: 0 auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <img src="images/WalletBedHeroClean.png" alt="Wallet Bed Lifestyle Photo" class="hero-main-img hero-slide active">
                    <img src="images/WalletBedHeroImageInfoGraphicv3.png" alt="Wallet Bed Features Summary" class="hero-main-img hero-slide">
                </div>'''

if target_html in html:
    html = html.replace(target_html, replacement_html)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Success: HTML updated.")
else:
    print("Error: Target HTML not found.")

import os

html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

target = "WalletBedHeroImageInfoGraphicv2.png"
replacement = "WalletBedHeroImageInfoGraphicv3.png"

if target in html:
    html = html.replace(target, replacement)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Success: Updated to v3 image.")
else:
    print("Error: Target v2 image not found.")

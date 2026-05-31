import os

replacements = {
    "images/upholstered_black.jpg": "images/WalletBedHeroImage.png",
    "images/brand_lv.jpg": "images/WalletBedMidnightTuftedEdition.png",
    "images/brand_goyard.jpg": "images/WalletBedRoyalBlueTufted.png",
    "images/brand_valentino.jpg": "images/WalletBedIndustrialPipeEdition.png",
    "images/brand_swiss.jpg": "images/WalletBedClassicSleighEdition.png",
    "images/brand_gucci.jpg": "images/WalletBedFourPosterCanopy.png",
    "images/brand_white.jpg": "images/WalletBedMinimalistPlatform.png"
}

for file in ["index.html", "script.js"]:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

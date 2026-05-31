import os

file_path = "script.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_fit = '"Base recess custom fitted for standard bi-fold and tri-fold wallets.",'
new_fit = '"Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\\" x 3.7\\", Compact exterior footprint: 5.3\\" x 3.9\\").",'

old_light = '"Automated Nightlight Integration: motion and light-sensing warm nightstand glow.",'
new_light = '"Automated Nightlight Integration: motion/weight sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",'

content = content.replace(old_fit, new_fit)
content = content.replace(old_light, new_light)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

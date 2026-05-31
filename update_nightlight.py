import os

file_path = "script.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_light = '"Automated Nightlight Integration: motion/weight sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",'
new_light = '"Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",'

content = content.replace(old_light, new_light)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

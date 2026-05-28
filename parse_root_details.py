import re

path = r"C:\Users\User\.gemini\antigravity\brain\3e92bd37-a9dd-499b-9133-c41e3b181563\.system_generated\steps\226\content.md"

with open(path, "r", encoding="utf-8") as f:
    html = f.read()

pattern = r'<a\s+[^>]*title="([^"]+)"[^>]*aria-label="([^"]+)"[^>]*href="([^"]+)"'
matches = re.findall(pattern, html)

print("Files inside /images/ folder on GitHub:")
for title, label, href in matches:
    print(f"- {title} ({label})")

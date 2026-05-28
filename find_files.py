import re

path = r"C:\Users\User\.gemini\antigravity\brain\3e92bd37-a9dd-499b-9133-c41e3b181563\.system_generated\steps\24\content.md"

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Let's find matches for href="/thewalletbeds/walletbeds/tree/main/... or blob/main/...
matches = re.findall(r'href="/thewalletbeds/walletbeds/(blob|tree)/main/([^"]+)"', text)
files = set()
for m in matches:
    files.add(m[1])

print("Files in repo root:")
for f in sorted(list(files)):
    print(f"- {f}")

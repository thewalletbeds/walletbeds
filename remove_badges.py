import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Pattern to match the specific card-brand-badge div and its contents
pattern = r'[ \t]*<div class="card-brand-badge">\s*<span class="brand-wallet">Wallet</span><span class="brand-beds">Beds</span><span class="brand-tm">™</span>\s*</div>\n*'
new_html = re.sub(pattern, '', html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_html)

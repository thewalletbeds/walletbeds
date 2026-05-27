import os

index_path = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds\index.html"

with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for matches
import re
matches = [m.start() for m in re.finditer(r"Money", content, re.IGNORECASE)]

print(f"Found {len(matches)} occurrences of 'Money' in index.html:")
for match_idx in matches:
    start = max(0, match_idx - 100)
    end = min(len(content), match_idx + 150)
    print(f"--- MATCH AT {match_idx} ---")
    snippet = content[start:end]
    print(snippet.encode('ascii', errors='replace').decode('ascii'))
    print("-" * 40)

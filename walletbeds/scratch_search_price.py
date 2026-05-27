with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if '20.00' in line:
        print(f"index.html Line {idx+1}: {line.strip()}")

with open('verify_build.py', 'r', encoding='utf-8') as f:
    v_lines = f.readlines()

for idx, line in enumerate(v_lines):
    if '20.00' in line or '20\\.00' in line:
        print(f"verify_build.py Line {idx+1}: {line.strip()}")

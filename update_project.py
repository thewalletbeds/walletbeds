import re
import os

# 1. Update apply_comforter.py
filepath = 'walletbeds/walletbeds/apply_comforter.py'
if os.path.exists(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Update paths
    content = re.sub(r"brain_dir = .*", "brain_dir = 'walletbeds/walletbeds/images'", content)
    content = re.sub(r"output_dir = .*", "output_dir = 'walletbeds/walletbeds/images'", content)
    
    # Uncomment and update logo logic
    # Find the line for logo_silver_cropped
    content = re.sub(r'# logo_silver_cropped = Image\.open\(r"C:\\Users\\User\\.gemini\\antigravity\\brain\\walletbeds\\logo_silver_cropped\.png"\)', 
                     'logo_silver_cropped = Image.open("walletbeds/walletbeds/images/The_Wallet_Bed_Official_Logo_2.png")', content)
    
    lines_to_uncomment = [
        'logo_w = 110',
        'logo_h = int(logo_w * logo_silver_cropped.size[1] / logo_silver_cropped.size[0])',
        'logo_resized = logo_silver_cropped.resize((logo_w, logo_h), Image.Resampling.LANCZOS)',
        'logo_x = 960 - logo_w // 2',
        'logo_y = 955 - logo_h // 2',
        'composite_canvas.paste(logo_resized, (logo_x, logo_y), logo_resized)',
        'composite_canvas.save(output_path, "PNG", quality=95)'
    ]
    
    for line in lines_to_uncomment:
        # Escape special characters for regex
        escaped_line = re.escape(line).replace(r'\ ', r'\s*')
        content = re.sub(r'#\s*' + escaped_line, line, content)

    with open(filepath, 'w') as f:
        f.write(content)

# 2. Update style.css
css_path = 'style.css'
if os.path.exists(css_path):
    with open(css_path, 'r') as f:
        css_content = f.read()
    
    # Update .logo style
    # Match font of h1: var(--font-heading), size clamp(2.5rem, 4.5vw, 4.2rem)
    logo_pattern = re.compile(r'(\.logo\s*\{[^}]*font-size:\s*)([^;]+)(;[^}]*font-family:\s*)([^;]+)(;)', re.MULTILINE)
    
    # If font-size or font-family aren't there, we'll be more aggressive
    if '.logo {' in css_content:
        # Find the block
        start = css_content.find('.logo {')
        end = css_content.find('}', start)
        block = css_content[start:end+1]
        
        new_block = block
        if 'font-size:' in new_block:
            new_block = re.sub(r'font-size:\s*[^;]+;', 'font-size: clamp(2.5rem, 4.5vw, 4.2rem);', new_block)
        else:
            new_block = new_block.replace('.logo {', '.logo {\n    font-size: clamp(2.5rem, 4.5vw, 4.2rem);')
            
        if 'font-family:' in new_block:
            new_block = re.sub(r'font-family:\s*[^;]+;', 'font-family: var(--font-heading);', new_block)
        else:
            new_block = new_block.replace('.logo {', '.logo {\n    font-family: var(--font-heading);')
        
        # Also font-weight 800
        if 'font-weight:' in new_block:
            new_block = re.sub(r'font-weight:\s*[^;]+;', 'font-weight: 800;', new_block)
        else:
            new_block = new_block.replace('.logo {', '.logo {\n    font-weight: 800;')

        css_content = css_content[:start] + new_block + css_content[end+1:]

    with open(css_path, 'w') as f:
        f.write(css_content)


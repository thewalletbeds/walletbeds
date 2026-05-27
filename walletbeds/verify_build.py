import os
import re
import sys
from html.parser import HTMLParser

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

class WalletBedsHTMLValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags_stack = []
        self.images = []
        self.links = []
        self.has_formspark_endpoint = False
        self.has_honeypot = False
        self.has_redirect = False
        self.errors = []
        self.current_form_action = None
        self.product_cards = []
        self.current_card = None
        self.in_card_h3 = False

    def handle_starttag(self, tag, attrs):
        # We push to stack for structural checks, focusing on primary block tags
        if tag in ['div', 'section', 'header', 'footer', 'main', 'form', 'select']:
            self.tags_stack.append((tag, self.getpos()))
        
        attrs_dict = dict(attrs)
        
        # Collect product card
        if tag == 'div' and 'product-card' in attrs_dict.get('class', ''):
            self.current_card = {
                'primary': [],
                'secondary': [],
                'stack_index': len(self.tags_stack) - 1,
                'name': 'Unknown'
            }
            
        if tag == 'h3' and self.current_card is not None:
            self.in_card_h3 = True
            
        if tag == 'img' and self.current_card is not None:
            classes = attrs_dict.get('class', '').split()
            if 'product-img-primary' in classes:
                self.current_card['primary'].append(attrs_dict.get('src'))
            if 'product-img-secondary' in classes:
                self.current_card['secondary'].append(attrs_dict.get('src'))
        
        # Collect image references
        if tag == 'img' and 'src' in attrs_dict:
            self.images.append(attrs_dict['src'])
            
        # Collect link references
        if tag == 'a' and 'href' in attrs_dict:
            self.links.append(attrs_dict['href'])
            
        # Form validation
        if tag == 'form':
            action = attrs_dict.get('action', '')
            self.current_form_action = action
            if action == 'https://submit-form.com/ss5F9ib9R':
                self.has_formspark_endpoint = True
            else:
                self.errors.append(f"Form action '{action}' does not match FormSpark endpoint")
                
        if tag == 'input' and self.current_form_action:
            name = attrs_dict.get('name', '')
            input_type = attrs_dict.get('type', '')
            if name == '_honeypot' and input_type == 'checkbox':
                self.has_honeypot = True
            if name == '_redirect' and input_type == 'hidden':
                self.has_redirect = True

    def handle_data(self, data):
        if self.in_card_h3 and self.current_card:
            self.current_card['name'] = data.strip()

    def handle_endtag(self, tag):
        if tag == 'h3' and self.current_card:
            self.in_card_h3 = False
            
        if tag in ['div', 'section', 'header', 'footer', 'main', 'form', 'select']:
            if self.tags_stack:
                start_tag, pos = self.tags_stack.pop()
                if self.current_card and tag == 'div' and len(self.tags_stack) == self.current_card['stack_index']:
                    self.product_cards.append(self.current_card)
                    self.current_card = None
                if start_tag != tag:
                    self.errors.append(f"Mismatched tag: opened '{start_tag}' at line {pos[0]} but closed with '{tag}' at line {self.getpos()[0]}")
            else:
                self.errors.append(f"Unexpected end tag '{tag}' at line {self.getpos()[0]}")

def run_verification():
    print("======================================================================")
    print("🏥 WALLET BEDS™ AUTOMATED FRONTEND BUILD VALIDATOR")
    print("======================================================================\n")

    html_path = "index.html"
    if not os.path.exists(html_path):
        print(f"❌ Error: {html_path} not found in current directory.")
        return False
        
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 1. Parse HTML structure & validate tags/forms
    parser = WalletBedsHTMLValidator()
    parser.feed(html_content)
    
    success = True
    
    print("1. HTML Tag & Structure Check:")
    if parser.errors:
        for err in parser.errors:
            print(f"   ❌ {err}")
        success = False
    else:
        print("   ✅ HTML layout parsing completed with balanced block structures.")

    # 2. Verify all local image assets
    print("\n2. Product Asset Path Verification:")
    image_errors = 0
    for img_path in parser.images:
        # Ignore external image URLs if any
        if img_path.startswith(('http://', 'https://')):
            print(f"   ℹ️ Skipping external image: {img_path}")
            continue
            
        local_path = img_path.replace('/', os.sep)
        if os.path.exists(local_path):
            size = os.path.getsize(local_path)
            print(f"   ✅ Asset exists: {img_path} ({size} bytes)")
        else:
            print(f"   ❌ Missing asset file: {img_path}")
            image_errors += 1
            success = False
            
    if image_errors == 0:
        print("   ✅ All local image renders are present and fully mapped.")

    # 3. Product Card Dual-Image Structure Verification
    print("\n3. Product Card Dual-Image Structure Verification:")
    expected_bed_images = [
        "images/brand_lv.jpg",
        "images/brand_goyard.jpg",
        "images/brand_swiss.jpg",
        "images/brand_valentino.jpg",
        "images/brand_gucci.jpg",
        "images/brand_white.jpg"
    ]
    
    # Assert presence of all 6 bed JPEG files in filesystem
    bed_errors = 0
    print("   Checking physical existence of the 6 premium bed assets:")
    for path in expected_bed_images:
        local_path = path.replace('/', os.sep)
        if os.path.exists(local_path):
            size = os.path.getsize(local_path)
            print(f"     ✅ Bed asset exists: {path} ({size} bytes)")
        else:
            print(f"     ❌ Missing bed asset file: {path}")
            bed_errors += 1
            success = False
            
    # Verify HTML structural cards parsing
    card_errors = 0
    print(f"   Parsed {len(parser.product_cards)} product cards from index.html:")
    if len(parser.product_cards) != 6:
        print(f"     ❌ Expected exactly 6 product cards, parsed {len(parser.product_cards)}.")
        card_errors += 1
        success = False
    else:
        for idx, card in enumerate(parser.product_cards):
            card_name = card['name']
            primary_imgs = card['primary']
            secondary_imgs = card['secondary']
            
            print(f"     📦 Card #{idx + 1}: '{card_name}'")
            
            # Assert exactly 1 primary image
            if len(primary_imgs) == 1:
                print(f"       ✅ Has exactly 1 primary image: {primary_imgs[0]}")
            else:
                print(f"       ❌ Primary image count mismatch! Expected 1, found {len(primary_imgs)} ({primary_imgs})")
                card_errors += 1
                success = False
                
            # Assert exactly 1 secondary image
            if len(secondary_imgs) == 1:
                print(f"       ✅ Has exactly 1 secondary image: {secondary_imgs[0]}")
                # Verify that it is one of the expected bed images
                if secondary_imgs[0] in expected_bed_images:
                    print(f"       ✅ Secondary image matches expected bed profile: {secondary_imgs[0]}")
                else:
                    print(f"       ❌ Secondary image '{secondary_imgs[0]}' is not in the expected bed list!")
                    card_errors += 1
                    success = False
            else:
                print(f"       ❌ Secondary image count mismatch! Expected 1, found {len(secondary_imgs)} ({secondary_imgs})")
                card_errors += 1
                success = False
                
    if bed_errors == 0 and card_errors == 0:
        print("   ✅ Dual-image hover structure is fully validated and perfectly synchronized.")

    # 4. Verify FormSpark waitlist parameters
    print("\n4. FormSpark Lead-Capture Integration:")
    if parser.has_formspark_endpoint:
        print("   ✅ Waitlist form actions direct to active endpoint: 'https://submit-form.com/ss5F9ib9R'")
    else:
        print("   ❌ Missing FormSpark endpoint action.")
        success = False
        
    if parser.has_honeypot:
        print("   ✅ Anti-spam honeypot fields incorporated in waitlist forms.")
    else:
        print("   ❌ Missing anti-spam honeypot field.")
        success = False
        
    if parser.has_redirect:
        print("   ✅ Redirection query parameters correctly set for post-submit toast.")
    else:
        print("   ❌ Missing post-submit redirect parameter.")
        success = False

    # 5. Verify Pricing & Dimensions text metrics
    print("\n5. Specifications & Pricing Metrics Validation:")
    
    # Target Retail Price $25.00
    price_pattern = r'\$25\.00'
    prices_found = re.findall(price_pattern, html_content)
    if len(prices_found) >= 6:
        print(f"   ✅ Pricing: Found {len(prices_found)} instances of the sold-out price '$25.00'.")
    else:
        print(f"   ❌ Pricing: Expected at least 6 instances of '$25.00', found {len(prices_found)}.")
        success = False
    # Ensure exact dimensions are NOT openly displayed to protect IP from copycats
    dim_l = '5.0"' not in html_content and '5.0 in' not in html_content
    dim_w = "3.7" not in html_content
    dim_d = "0.8" not in html_content
    
    if dim_l and dim_w and dim_d:
        print("   ✅ Dimensions: Confidential pocket specs are successfully hidden from open view.")
    else:
        print("   ❌ Dimensions: Exact pocket specs are exposed in HTML!")
        success = False

    # 6. Check CSS & JS references
    print("\n6. Asset Dependency Verification:")
    css_exists = os.path.exists("style.css")
    js_exists = os.path.exists("script.js")
    
    if css_exists:
        print(f"   ✅ master style sheet exists: style.css ({os.path.getsize('style.css')} bytes)")
    else:
        print("   ❌ Missing style.css dependency!")
        success = False
        
    if js_exists:
        print(f"   ✅ script behaviors file exists: script.js ({os.path.getsize('script.js')} bytes)")
    else:
        print("   ❌ Missing script.js dependency!")
        success = False

    print("\n======================================================================")
    if success:
        print("🎉 STATUS: BUILD VALIDATION SUCCESSFUL! ALL TESTS PASSED.")
    else:
        print("🚨 STATUS: BUILD VALIDATION FAILED. PLEASE CORRECT ERRORS.")
    print("======================================================================\n")
    return success

if __name__ == "__main__":
    run_verification()

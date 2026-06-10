import os

css_path = "style.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

target = ".product-img, .modal-main-img, .modal-thumb {"
replacement = ".product-img, .modal-main-img, .modal-thumb, .hero-main-img, .infographic-reminder-section img {"

if target in css:
    css = css.replace(target, replacement)
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print("Success: CSS selector updated.")
else:
    print("Error: Target selector not found.")

import os

# Update index.html
html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Update the main feature box
old_feature = '<p>An integrated ambient sensor softly illuminates your essentials in the dark, then seamlessly fades out.</p>'
new_feature = '<p>Illuminates your essentials in the dark, then shuts off seamlessly.</p>'
html = html.replace(old_feature, new_feature)

# Update the FAQ to remove sensor language
old_faq = 'The WalletBed contains a built-in automated nightlight sensor. When you approach or when the room goes dark, it automatically illuminates your essentials, providing a soft bedside light during your evening routine without disrupting the room.'
new_faq = 'The WalletBed features a built-in timer-activated nightlight. It gently illuminates your essentials in the dark, providing a soft bedside glow during your evening routine, and then shuts off seamlessly.'
html = html.replace(old_faq, new_faq)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

# Update script.js
js_path = "script.js"
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Remove the word 'sensing' from the specs
old_spec = 'Timer sensing warm glow.'
new_spec = 'Timer-activated warm glow.'
js = js.replace(old_spec, new_spec)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

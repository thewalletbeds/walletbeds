import os

# Update index.html
html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Nightlight Header and Description
html = html.replace('<h4>Automated Nightlight</h4>', '<h4>Warm Glow Nightlight</h4>')
html = html.replace('<p>Subtle sensor-activated nightlight automatically illuminates your essentials in the dark, then shuts off seamlessly.</p>', '<p>An integrated ambient sensor softly illuminates your essentials in the dark, then seamlessly fades out.</p>')
html = html.replace('<h3>How does the automated nightlight work?</h3>', '<h3>How does the warm glow nightlight work?</h3>')

# 2. Update Tiered Flat Shipping
old_shipping_desc = '<p>$5.99 Standard Shipping for single units, or $11.99 Premium Tracked Shipping for our 3-Pack Bundle.</p>'
new_shipping_desc = '<p>$5.99 Standard Shipping for single units, or $11.99 Premium Tracked Shipping for our Family and Friends Pack Bundle.</p>'
html = html.replace(old_shipping_desc, new_shipping_desc)

old_faq_shipping = 'methods ($5.99 Standard Shipping for single units, or $11.99 Premium Tracked Shipping for our 3-Pack Bundle).'
new_faq_shipping = 'methods ($5.99 Standard Shipping for single units, or $11.99 Premium Tracked Shipping for our Family and Friends Pack Bundle).'
html = html.replace(old_faq_shipping, new_faq_shipping)

# 3. Update 3-Pack Bundle to Family and Friends Pack Bundle
html = html.replace('The "Daily Essentials" 3-Pack', 'Family and Friends Pack Bundle')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)


# Update script.js
js_path = "script.js"
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace('${productName} (3-Pack Bundle)', '${productName} (Family and Friends Pack Bundle)')

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

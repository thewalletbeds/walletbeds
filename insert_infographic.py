import os

html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

target = '''        </section>

        <!-- ? Objection-Crushing FAQ Section -->'''

replacement = '''        </section>

        <!-- ? Infographic Reminder Visual -->
        <section class="infographic-reminder-section" style="padding: 4rem 0; background-color: var(--bg-dark); border-top: 1px solid rgba(255,255,255,0.05);">
            <div class="container" style="text-align: center;">
                <img src="images/WalletBedHeroImageInfoGraphicv2.png" alt="Wallet Bed Features Summary" style="max-width: 100%; height: auto; max-height: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            </div>
        </section>

        <!-- ? Objection-Crushing FAQ Section -->'''

if target in html:
    html = html.replace(target, replacement)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Success: Infographic section inserted.")
else:
    print("Error: Target string not found.")

import os

# 1. Update HTML
html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

target_html = '''                    <div class="hero-image-wrapper">
                        <img src="images/WalletBedHeroImageInfoGraphicv3.png" alt="Wallet Bed Features Infographic" class="hero-main-img">
                        <div class="hero-glow-overlay"></div>
                    </div>'''

replacement_html = '''                    <div class="hero-image-wrapper hero-slider" id="heroSlider">
                        <img src="images/WalletBedHeroClean.png" alt="Wallet Bed Lifestyle" class="hero-main-img hero-slide active">
                        <img src="images/WalletBedHeroImageInfoGraphicv3.png" alt="Wallet Bed Features Infographic" class="hero-main-img hero-slide">
                        <div class="hero-slider-nav">
                            <span class="slider-dot active" data-index="0"></span>
                            <span class="slider-dot" data-index="1"></span>
                        </div>
                        <div class="hero-glow-overlay"></div>
                    </div>'''

if target_html in html:
    html = html.replace(target_html, replacement_html)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Success: HTML updated.")
else:
    print("Error: Target HTML not found.")


# 2. Update CSS
css_path = "style.css"
css_addition = '''
/* Hero Slider Styles */
.hero-slider {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
    z-index: 1;
}

.hero-slide.active {
    opacity: 1;
    position: relative;
    z-index: 2;
}

.hero-slider-nav {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
}

.slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.slider-dot.active {
    background-color: #ffffff;
    transform: scale(1.2);
}
'''

with open(css_path, "a", encoding="utf-8") as f:
    f.write(css_addition)
print("Success: CSS appended.")

# 3. Update JS
js_path = "script.js"
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# We will inject the JS at the very beginning of the DOMContentLoaded block
target_js = "document.addEventListener('DOMContentLoaded', () => {"
replacement_js = '''document.addEventListener('DOMContentLoaded', () => {

    // Hero Slider Logic
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    if (heroSlides.length > 0) {
        const nextSlide = () => {
            heroSlides[currentSlide].classList.remove('active');
            sliderDots[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
            sliderDots[currentSlide].classList.add('active');
        };

        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // pause auto-play on manual click
                heroSlides[currentSlide].classList.remove('active');
                sliderDots[currentSlide].classList.remove('active');
                currentSlide = index;
                heroSlides[currentSlide].classList.add('active');
                sliderDots[currentSlide].classList.add('active');
            });
        });

        startSlideShow();
    }
'''

if target_js in js:
    js = js.replace(target_js, replacement_js)
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("Success: JS updated.")
else:
    print("Error: Target JS not found.")

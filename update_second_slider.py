import os

# 1. Update HTML
html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

target_html = '''                <img src="images/WalletBedHeroImageInfoGraphicv3.png" alt="Wallet Bed Features Summary" style="max-width: 100%; height: auto; max-height: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">'''

replacement_html = '''                <div class="hero-slider" style="max-width: 100%; width: 800px; margin: 0 auto; aspect-ratio: 1/1;">
                    <img src="images/WalletBedHeroClean.png" alt="Wallet Bed Lifestyle Photo" class="hero-main-img hero-slide active" style="max-width: 100%; height: auto; max-height: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <img src="images/WalletBedHeroImageInfoGraphicv3.png" alt="Wallet Bed Features Summary" class="hero-main-img hero-slide" style="max-width: 100%; height: auto; max-height: 800px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <div class="hero-slider-nav">
                        <span class="slider-dot active" data-index="0"></span>
                        <span class="slider-dot" data-index="1"></span>
                    </div>
                </div>'''

if target_html in html:
    html = html.replace(target_html, replacement_html)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Success: HTML updated.")
else:
    print("Error: Target HTML not found.")


# 2. Update JS
js_path = "script.js"
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

target_js = '''    // Hero Slider Logic
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
    }'''

replacement_js = '''    // Hero Slider Logic (Supports Multiple Sliders)
    const sliders = document.querySelectorAll('.hero-slider');
    
    sliders.forEach(slider => {
        const heroSlides = slider.querySelectorAll('.hero-slide');
        const sliderDots = slider.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        let slideInterval;

        if (heroSlides.length > 0) {
            const nextSlide = () => {
                heroSlides[currentSlide].classList.remove('active');
                if(sliderDots[currentSlide]) sliderDots[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % heroSlides.length;
                heroSlides[currentSlide].classList.add('active');
                if(sliderDots[currentSlide]) sliderDots[currentSlide].classList.add('active');
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
    });'''

if target_js in js:
    js = js.replace(target_js, replacement_js)
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("Success: JS updated.")
else:
    print("Error: Target JS not found.")

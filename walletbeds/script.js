/* ==========================================================================
   WALLET BEDS™ MASTER SCRIPT BEHAVIORS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // ❓ FAQ Accordion Logic
    // ==========================================
    const faqItems = document.querySelectorAll('.accordion-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all active accordions first (collapsible behavior)
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle clicked accordion
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 🏷️ Product Grid Filtering Logic
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            productCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    // Subtle entrance animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 🔀 E-Commerce Sorting Logic
    // ==========================================
    const sortSelect = document.querySelector('.sort-select');
    const productGrid = document.querySelector('.product-grid');
    
    if (sortSelect && productGrid) {
        sortSelect.addEventListener('change', () => {
            const sortBy = sortSelect.value;
            const cardsArray = Array.from(productCards);
            
            cardsArray.sort((a, b) => {
                if (sortBy === 'price-asc') {
                    // All are $25.00 currently, but setup logic for future
                    const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                    return priceA - priceB;
                } else if (sortBy === 'rating') {
                    const reviewsA = parseInt(a.querySelector('.review-count').textContent.replace(/[^\d]/g, ''));
                    const reviewsB = parseInt(b.querySelector('.review-count').textContent.replace(/[^\d]/g, ''));
                    return reviewsB - reviewsA; // Higher reviews first
                } else {
                    // default featured
                    return 0;
                }
            });
            
            // Re-append sorted elements
            cardsArray.forEach(card => {
                productGrid.appendChild(card);
            });
        });
    }

    // ==========================================
    // 📥 Rebuilt Data-Driven Product Quick-Shop Modal Controller
    // ==========================================

    // Dynamic Product Catalog Mappings
    const PRODUCT_CATALOG = {
        "Midnight Tufted Edition": {
            description: "Midnight Tufted Edition Wallet Bed. Everything you need to transform your bedside table into a luxury resting suite your wallet can relax on every night. Custom made for bi-fold and tri-fold wallets, with the frame specifically fitted for elegant nightstand placement. Made from premium charcoal fabric materials and built to high quality standards, with a soft premium leather mattress that's waterproof, hypoallergenic and resistant to UV and dust.",
            specs: [
                "Custom made dark charcoal fabric frame and leather mattress included.",
                "Base recess custom fitted for premium bi-fold/tri-fold wallets.",
                "Sleek and solid executive bed frame styling with premium nightstand presence.",
                "Premium top-grain leather: waterproof, UV resistant and hypoallergenic."
            ],
            image_base: "images/brand_lv.jpg",
            image_comforter: "images/brand_lv.jpg"
        },
        "Royal Blue Tufted Edition": {
            description: "Royal Blue Tufted Edition Wallet Bed. Add deep-contoured button stitching and visual drama to your bedroom or workspace. Precision-engineered with premium royal blue velvet fabric and a plush leather resting deck. Perfect for high-status cards and wallets seeking refined luxury and breathing room.",
            specs: [
                "Custom made royal blue velvet fabric frame and leather mattress included.",
                "Base recess custom fitted for premium bi-fold/tri-fold wallets.",
                "Deep-contoured velvet headboard for premium visual drama.",
                "Premium top-grain leather: waterproof, UV resistant and hypoallergenic."
            ],
            image_base: "images/brand_goyard.jpg",
            image_comforter: "images/brand_goyard.jpg"
        },
        "Industrial Pipe Edition": {
            description: "Industrial Pipe Edition Wallet Bed. Designed for modern work desks, tech setups, and rugged workspaces. Precision-built with matte-black steel pipe joints and a premium dark leather mattress. The ultimate industrial statement for tech enthusiasts and heavy-duty wallets.",
            specs: [
                "Rugged matte-black steel pipe frame and leather mattress included.",
                "Base recess custom fitted for premium bi-fold/tri-fold wallets.",
                "Industrial aesthetic optimized for tech workstation desk setups.",
                "Premium top-grain leather: waterproof, UV resistant and hypoallergenic."
            ],
            image_base: "images/brand_valentino.jpg",
            image_comforter: "images/brand_valentino.jpg"
        },
        "Classic Sleigh Edition": {
            description: "Classic Sleigh Edition Wallet Bed. A traditional, warm mahogany-finished wood frame featuring elegant curvature and classic sleigh headboards. Crafted for bedroom nightstands, providing organic warmth and premium leather cushioning for your daily essentials.",
            specs: [
                "Curved solid walnut wood sleigh frame and leather mattress included.",
                "Base recess custom fitted for premium bi-fold/tri-fold wallets.",
                "Traditional mahogany walnut finish for bedside warmth.",
                "Premium top-grain leather: waterproof, UV resistant and hypoallergenic."
            ],
            image_base: "images/brand_swiss.jpg",
            image_comforter: "images/brand_swiss.jpg"
        },
        "Four-Poster Canopy Edition": {
            description: "Four-Poster Canopy Edition Wallet Bed. The pinnacle of luxurious display framing. Precision-crafted mahogany wood posts standing tall to create a majestic bedroom setting for your wallet. Offers maximum visibility and security for your cards.",
            specs: [
                "Majestic four-poster mahogany wood frame and leather mattress included.",
                "Base recess custom fitted for premium bi-fold/tri-fold wallets.",
                "Maximum display height and premium nightstand canopy presence.",
                "Premium top-grain leather: waterproof, UV resistant and hypoallergenic."
            ],
            image_base: "images/brand_gucci.jpg",
            image_comforter: "images/brand_gucci.jpg"
        },
        "Minimalist Platform": {
            description: "Minimalist Platform Wallet Bed. A sleek, pristine white lacquer platform frame. Designed for clean desks, minimalist setups, and ultra-modern bedside environments. Features a low-profile premium white leather deck that perfectly cradles your wallet with sophisticated style.",
            specs: [
                "Pristine white lacquer platform frame and custom leather mattress included.",
                "Base recess custom fitted for premium bi-fold/tri-fold wallets.",
                "Sleek low-profile design optimized for clean, modern workspaces.",
                "Premium top-grain leather: waterproof, UV resistant and hypoallergenic."
            ],
            image_base: "images/brand_white.jpg",
            image_comforter: "images/brand_white.jpg"
        }
    };

    // Modal DOM Elements Bindings
    const waitlistModal = document.getElementById('waitlistModal');
    const modalMainImg = document.getElementById('modalMainImg');
    const thumbBareBtn = document.getElementById('thumbBareBtn');
    const thumbBareImg = document.getElementById('thumbBareImg');
    const thumbComforterBtn = document.getElementById('thumbComforterBtn');
    const thumbComforterImg = document.getElementById('thumbComforterImg');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalPriceLabel = document.getElementById('modalPriceLabel');
    const modalTabDesc = document.getElementById('modalTabDesc');
    const modalSpecsList = document.getElementById('modalSpecsList');
    
    const selectedProdInput = document.getElementById('selectedProductVal');
    const selectedComforterVal = document.getElementById('selectedComforterVal');
    const selectedPriceVal = document.getElementById('selectedPriceVal');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');
    const comforterRadios = document.querySelectorAll('input[name="comforter_option"]');

    // Rebuilt modal accordions tabs controller
    const modalTabHeaders = document.querySelectorAll('.accordion-tab .tab-header');
    modalTabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentTab = header.parentElement;
            const isActive = currentTab.classList.contains('active');
            
            // Close all tabs
            document.querySelectorAll('.accordion-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Toggle current tab
            if (!isActive) {
                currentTab.classList.add('active');
            }
        });
    });

    // Function to recalculate waitlist pricing dynamically based on chosen comforter option
    const updateModalPriceAndInputs = (productName) => {
        let basePrice = 25.00;
        let selectedComforter = "No Comforter";
        let comforterPrice = 0.00;
        
        const activeRadio = document.querySelector('input[name="comforter_option"]:checked');
        if (activeRadio) {
            const val = activeRadio.value;
            if (val === 'comforter-white') {
                selectedComforter = "Comforter - White";
                comforterPrice = 10.00;
            } else if (val === 'comforter-gray') {
                selectedComforter = "Comforter - Gray";
                comforterPrice = 10.00;
            } else if (val === 'comforter-black') {
                selectedComforter = "Comforter - Black";
                comforterPrice = 10.00;
            } else if (val === 'comforter-burgundy') {
                selectedComforter = "Comforter - Burgundy";
                comforterPrice = 10.00;
            }
        }
        
        const totalPrice = basePrice + comforterPrice;
        const formattedPrice = `$${totalPrice.toFixed(2)}`;
        
        // Update DOM pricing labels
        if (modalPriceLabel) modalPriceLabel.textContent = formattedPrice;
        if (modalSubmitBtn) modalSubmitBtn.textContent = `NOTIFY ME WHEN AVAILABLE — ${formattedPrice}`;
        
        // Sync hidden inputs for FormSpark waiting list submissions
        if (selectedProdInput) selectedProdInput.value = productName;
        if (selectedComforterVal) selectedComforterVal.value = selectedComforter;
        if (selectedPriceVal) selectedPriceVal.value = formattedPrice;
    };

    // Comforter option radio click listeners
    comforterRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const productName = modalProductTitle.textContent.trim();
            updateModalPriceAndInputs(productName);
        });
    });

    // Image click reveals bedding options customizer
    if (modalMainImg) {
        modalMainImg.addEventListener('click', () => {
            const optionsSection = document.querySelector('.modal-options-section');
            if (optionsSection) {
                optionsSection.classList.toggle('revealed');
                if (optionsSection.classList.contains('revealed')) {
                    optionsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }

    // Main Open Modal Logic
    const openModal = (productName) => {
        if (!waitlistModal) return;
        
        // Lookup product dataset
        const product = PRODUCT_CATALOG[productName] || PRODUCT_CATALOG["Midnight Tufted Edition"];
        const resolvedName = PRODUCT_CATALOG[productName] ? productName : "Midnight Tufted Edition";
        
        // Dynamically inject data
        if (modalProductTitle) modalProductTitle.textContent = resolvedName;
        if (modalMainImg) modalMainImg.src = product.image_base;
        if (thumbBareImg) thumbBareImg.src = product.image_base;
        if (thumbComforterImg) thumbComforterImg.src = product.image_comforter;
        
        // Reset default option to "No Comforter"
        const noComforterRadio = document.querySelector('input[name="comforter_option"][value="no-comforter"]');
        if (noComforterRadio) noComforterRadio.checked = true;
        
        // Reset customizer bedding options to collapsed state
        const optionsSection = document.querySelector('.modal-options-section');
        if (optionsSection) {
            optionsSection.classList.remove('revealed');
        }
        
        // Populate Description
        if (modalTabDesc) {
            modalTabDesc.innerHTML = `<p>${product.description}</p>`;
        }
        
        // Populate specs highlights list
        if (modalSpecsList) {
            modalSpecsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
        }
        
        // Reset tabs to show Description first
        document.querySelectorAll('.accordion-tab').forEach((tab, index) => {
            if (index === 0) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Trigger price and hidden inputs updates
        updateModalPriceAndInputs(resolvedName);
        
        // Asset security: Apply context blocks on newly injected images
        document.querySelectorAll('.modal-gallery-col img').forEach(img => {
            img.addEventListener('contextmenu', e => e.preventDefault());
            img.addEventListener('dragstart', e => e.preventDefault());
            img.addEventListener('selectstart', e => e.preventDefault());
        });

        // Hide overlay secondary comforter image on product cards
        document.querySelectorAll('.product-img-secondary').forEach(img => {
            img.classList.add('modal-hidden');
        });
        
        waitlistModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    // Close Modal Logic
    const closeModal = () => {
        if (waitlistModal) {
            waitlistModal.classList.remove('open');
            document.body.style.overflow = 'auto'; // Unlock background scroll
            
            // Restore card comforter image overlays
            document.querySelectorAll('.product-img-secondary.modal-hidden').forEach(img => {
                img.classList.remove('modal-hidden');
            });
        }
    };

    // Hook listeners up to Notify Me buttons, Header CTA
    const openModalBtns = document.querySelectorAll('.quick-notify-btn, .header-cta');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let productName = btn.getAttribute('data-product');
            if (!productName && btn.closest('.product-card')) {
                productName = btn.closest('.product-card').querySelector('h3').textContent.trim();
            }
            openModal(productName);
        });
    });

    // Click on product card image wrapper or card title opens the detailed Quick-Shop Modal
    const productCardsList = document.querySelectorAll('.product-card');
    productCardsList.forEach(card => {
        const media = card.querySelector('.card-media');
        const title = card.querySelector('.card-info h3');
        
        const triggerQuickShop = (e) => {
            e.preventDefault();
            const productName = card.querySelector('h3').textContent.trim();
            openModal(productName);
        };
        
        if (media) {
            media.style.cursor = 'pointer';
            media.addEventListener('click', triggerQuickShop);
        }
        
        if (title) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', triggerQuickShop);
        }
    });

    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    // Escape key closes modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ==========================================
    // 💬 Success Toast Notification (FormSpark Redirect Redirect)
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const successToast = document.getElementById('successToast');
    const toastClose = document.querySelector('.toast-close');
    
    if (urlParams.has('success') && successToast) {
        // Show the success toast
        setTimeout(() => {
            successToast.classList.add('active');
        }, 500);
        
        // Auto fade out after 6 seconds
        const autoFade = setTimeout(() => {
            successToast.classList.remove('active');
        }, 6500);
        
        if (toastClose) {
            toastClose.addEventListener('click', () => {
                clearTimeout(autoFade);
                successToast.classList.remove('active');
            });
        }
    }

    // ==========================================
    // 🗺️ Smooth Scroll Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll padding for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 🔒 E-Commerce Asset Security: Copy & Download Prevention
    // ==========================================
    // Prevent right-click / context menu (long-press on mobile) on all images and media containers
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' || e.target.closest('.card-media') || e.target.closest('.hero-visual')) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent dragging on all images to block drag-to-desktop saving
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        // Extra layer of mobile touch-hold selection prevention
        img.addEventListener('selectstart', (e) => {
            e.preventDefault();
        });
    });
});

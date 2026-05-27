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
            description: "Midnight Tufted Edition Wallet Bed. A detailed desktop display suite for your wallet. Features a precision-molded frame with a realistic faux-charcoal fabric texture and a tufted-button headboard look. Outfitted with a soft faux-leather mattress deck that is waterproof, hypoallergenic, and dust-resistant.",
            specs: [
                "Precision-molded polymer frame with faux-charcoal fabric texture.",
                "Base recess custom fitted for standard bi-fold and tri-fold wallets.",
                "Soft faux-leather mattress deck: waterproof, UV resistant and dust-proof.",
                "Sleek executive miniature bed styling for elegant nightstand placement."
            ],
            image_base: "images/brand_lv.jpg",
            image_comforter: "images/brand_lv.jpg"
        },
        "Royal Blue Tufted Edition": {
            description: "Royal Blue Tufted Edition Wallet Bed. Bring a unique visual highlight to your nightstand or workspace. Precision-molded from durable polymer with a textured faux-velvet royal blue finish and contoured tufted detailing. Includes a soft faux-leather mattress deck to cradle your cards and wallet.",
            specs: [
                "Precision-molded polymer frame with faux-velvet royal blue finish.",
                "Base recess custom fitted for standard bi-fold and tri-fold wallets.",
                "Soft faux-leather mattress deck: waterproof, UV resistant and dust-proof.",
                "Contoured headboard design for visual highlights."
            ],
            image_base: "images/brand_goyard.jpg",
            image_comforter: "images/brand_goyard.jpg"
        },
        "Industrial Pipe Edition": {
            description: "Industrial Pipe Edition Wallet Bed. Perfect for modern work desks, tech setups, and industrial workspaces. Precision-molded from high-durability polymer replicating rugged matte-black steel pipe joints. Complete with a dark faux-leather mattress deck.",
            specs: [
                "Durable polymer frame with realistic industrial pipe-joint styling.",
                "Base recess custom fitted for standard bi-fold and tri-fold wallets.",
                "Soft faux-leather mattress deck: waterproof, UV resistant and dust-proof.",
                "Industrial aesthetic optimized for tech workstation desk setups."
            ],
            image_base: "images/brand_valentino.jpg",
            image_comforter: "images/brand_valentino.jpg"
        },
        "Classic Sleigh Edition": {
            description: "Classic Sleigh Edition Wallet Bed. Features a traditional sleigh silhouette contoured for bedside nightstands. Molded from durable polymer and finished with a detailed, realistic faux-walnut wood grain. Complete with a soft faux-leather mattress deck.",
            specs: [
                "Durable polymer frame with realistic faux-walnut wood grain finish.",
                "Base recess custom fitted for standard bi-fold and tri-fold wallets.",
                "Soft faux-leather mattress deck: waterproof, UV resistant and dust-proof.",
                "Traditional sleigh curved headboard styling."
            ],
            image_base: "images/brand_swiss.jpg",
            image_comforter: "images/brand_swiss.jpg"
        },
        "Four-Poster Canopy Edition": {
            description: "Four-Poster Canopy Edition Wallet Bed. A majestic miniature bedroom frame for your daily pocket essentials. Precision-molded from durable polymer with posts finished in a realistic faux-mahogany wood grain. Features a soft faux-leather mattress deck for high visibility.",
            specs: [
                "Durable polymer canopy frame with realistic faux-mahogany finish.",
                "Base recess custom fitted for standard bi-fold and tri-fold wallets.",
                "Soft faux-leather mattress deck: waterproof, UV resistant and dust-proof.",
                "Four-poster miniature design with nightstand canopy presence."
            ],
            image_base: "images/brand_gucci.jpg",
            image_comforter: "images/brand_gucci.jpg"
        },
        "Minimalist Platform": {
            description: "Minimalist Platform Wallet Bed. A low-profile miniature suite designed for clean desks and minimalist environments. Precision-molded from durable polymer with a high-gloss white lacquer finish, paired with a matching white faux-leather mattress deck.",
            specs: [
                "Durable polymer frame with high-gloss white finish.",
                "Base recess custom fitted for standard bi-fold and tri-fold wallets.",
                "Soft white faux-leather mattress deck: waterproof, UV resistant and dust-proof.",
                "Sleek low-profile platform design."
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

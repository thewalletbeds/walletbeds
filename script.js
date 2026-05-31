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
            description: "Midnight Tufted Edition Wallet Bed. A premium desktop display and bedside suite featuring a faux charcoal fabric texture and a tufted button headboard. Equipped with an integrated automated nightlight that senses motion and darkness, and a soft surface-protecting lining to cradle your wallet and keys.",
            specs: [
                "Precision-molded polymer frame with faux-charcoal fabric texture.",
                "Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\" x 3.7\", Compact exterior footprint: 5.3\" x 3.9\").",
                "Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",
                "Surface Protection: soft interior lining prevents scratches on leather and brass."
            ],
            image_base: "images/WalletBedMidnightTuftedEdition.png",
            image_comforter: "images/WalletBedMidnightTuftedEdition.png"
        },
        "Royal Blue Tufted Edition": {
            description: "Royal Blue Tufted Edition Wallet Bed. Bring a unique visual highlight to your nightstand or workspace. Features a high durability polymer frame with a textured velvet-like royal blue finish. Outfitted with an automated nightlight and a soft surface-protecting lining to cradle your wallet and keys.",
            specs: [
                "Precision-molded polymer frame with velvet-textured finish.",
                "Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\" x 3.7\", Compact exterior footprint: 5.3\" x 3.9\").",
                "Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",
                "Surface Protection: soft interior lining prevents scratches on leather and brass."
            ],
            image_base: "images/WalletBedRoyalBlueTufted.png",
            image_comforter: "images/WalletBedRoyalBlueTufted.png"
        },
        "Industrial Pipe Edition": {
            description: "Industrial Pipe Edition Wallet Bed. Perfect for modern work desks, tech setups, and industrial workspaces. Crafted with a high durability polymer frame replicating rugged matte black steel pipe joints. Equipped with an automated nightlight and a soft surface-protecting lining.",
            specs: [
                "Durable polymer frame with realistic industrial pipe-joint styling.",
                "Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\" x 3.7\", Compact exterior footprint: 5.3\" x 3.9\").",
                "Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",
                "Surface Protection: soft interior lining prevents scratches on leather and brass."
            ],
            image_base: "images/WalletBedIndustrialPipeEdition.png",
            image_comforter: "images/WalletBedIndustrialPipeEdition.png"
        },
        "Classic Sleigh Edition": {
            description: "Classic Sleigh Edition Wallet Bed. Features a traditional sleigh silhouette contoured for bedside nightstands. Crafted from a high durability polymer frame finished with a realistic walnut grain wood effect. Complete with an automated nightlight and soft surface-protecting interior lining.",
            specs: [
                "Durable polymer frame with realistic walnut-grain wood grain finish.",
                "Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\" x 3.7\", Compact exterior footprint: 5.3\" x 3.9\").",
                "Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",
                "Surface Protection: soft interior lining prevents scratches on leather and brass."
            ],
            image_base: "images/WalletBedClassicSleighEdition.png",
            image_comforter: "images/WalletBedClassicSleighEdition.png"
        },
        "Four-Poster Canopy Edition": {
            description: "Four-Poster Canopy Edition Wallet Bed. A majestic miniature bedroom frame for your daily pocket essentials. Features a high durability polymer canopy frame with posts finished in an intricate mahogany effect wood grain. Complete with an automated nightlight and soft surface-protecting interior lining.",
            specs: [
                "Durable polymer canopy frame with realistic mahogany-effect finish.",
                "Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\" x 3.7\", Compact exterior footprint: 5.3\" x 3.9\").",
                "Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",
                "Surface Protection: soft interior lining prevents scratches on leather and brass."
            ],
            image_base: "images/WalletBedFourPosterCanopy.png",
            image_comforter: "images/WalletBedFourPosterCanopy.png"
        },
        "Minimalist Platform": {
            description: "Minimalist Platform Wallet Bed. A low-profile platform designed for clean desks and minimalist environments. Built on a high durability platform frame finished in a high gloss white lacquer style, paired with a matching white interior lining and automated nightlight sensor.",
            specs: [
                "Durable polymer frame with high-gloss white finish.",
                "Universal Fit & Dimensions: Fits bi-fold, tri-fold, Ridge wallets, and phones. (Interior tray: 5.0\" x 3.7\", Compact exterior footprint: 5.3\" x 3.9\").",
                "Automated Nightlight Integration: Timer sensing warm glow. Powered by 3 AAA batteries (100% wire-free for clean cable management).",
                "Surface Protection: soft interior lining prevents scratches on leather and brass."
            ],
            image_base: "images/WalletBedMinimalistPlatform.png",
            image_comforter: "images/WalletBedMinimalistPlatform.png"
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
    const modalAddToCartPrice = document.getElementById('modalAddToCartPrice');
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

    // Function to recalculate waitlist pricing dynamically based on package choice and chosen comforter option
    const updateModalPriceAndInputs = (productName) => {
        let basePrice = 21.25; // Single price after 15% off
        let comparePrice = 25.00;
        let isBundle = false;
        
        const activePackage = document.querySelector('input[name="package_option"]:checked');
        if (activePackage && activePackage.value === 'bundle') {
            basePrice = 60.56; // 3-pack bundle price
            comparePrice = 75.00;
            isBundle = true;
        }
        
        let selectedComforter = "No Comforter";
        let comforterPrice = 0.00;
        
        const activeRadio = document.querySelector('input[name="comforter_option"]:checked');
        if (activeRadio) {
            const val = activeRadio.value;
            if (val === 'comforter-white') {
                selectedComforter = "Comforter - White";
                comforterPrice = isBundle ? 30.00 : 10.00;
            } else if (val === 'comforter-gray') {
                selectedComforter = "Comforter - Gray";
                comforterPrice = isBundle ? 30.00 : 10.00;
            } else if (val === 'comforter-black') {
                selectedComforter = "Comforter - Black";
                comforterPrice = isBundle ? 30.00 : 10.00;
            } else if (val === 'comforter-burgundy') {
                selectedComforter = "Comforter - Burgundy";
                comforterPrice = isBundle ? 30.00 : 10.00;
            }
        }
        
        const totalPrice = basePrice + comforterPrice;
        const formattedPrice = `$${totalPrice.toFixed(2)}`;
        
        // Update DOM pricing labels
        if (modalPriceLabel) modalPriceLabel.textContent = formattedPrice;
        if (modalAddToCartPrice) modalAddToCartPrice.textContent = formattedPrice;
        
        const discountLabel = document.querySelector('.modal-price-discount');
        if (discountLabel) {
            const totalCompare = comparePrice + (isBundle ? comforterPrice : comforterPrice);
            discountLabel.textContent = `$${totalCompare.toFixed(2)}`;
        }
        
        // Sync hidden inputs for FormSpark waiting list submissions
        if (selectedProdInput) selectedProdInput.value = isBundle ? `${productName} (3-Pack Bundle)` : productName;
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

    // Package option radio click listeners
    const packageRadios = document.querySelectorAll('input[name="package_option"]');
    packageRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const productName = modalProductTitle.textContent.trim();
            
            // Adjust card active border styles
            packageRadios.forEach(r => {
                const design = r.nextElementSibling;
                if (design) {
                    design.style.borderColor = 'var(--border-light)';
                    design.style.backgroundColor = 'var(--bg-gray-subtle)';
                    design.style.boxShadow = 'none';
                }
            });
            
            const activeDesign = radio.nextElementSibling;
            if (activeDesign) {
                activeDesign.style.borderColor = 'var(--brand-teal)';
                activeDesign.style.backgroundColor = 'var(--bg-white)';
                activeDesign.style.boxShadow = '0 4px 12px var(--brand-teal-glow)';
            }
            
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
        
        // Reset default package to "single"
        const singlePackageRadio = document.querySelector('input[name="package_option"][value="single"]');
        if (singlePackageRadio) {
            singlePackageRadio.checked = true;
            // Apply standard styling to package designs
            const pRadios = document.querySelectorAll('input[name="package_option"]');
            pRadios.forEach(r => {
                const design = r.nextElementSibling;
                if (design) {
                    if (r.value === 'single') {
                        design.style.borderColor = 'var(--brand-teal)';
                        design.style.backgroundColor = 'var(--bg-white)';
                        design.style.boxShadow = '0 4px 12px var(--brand-teal-glow)';
                    } else {
                        design.style.borderColor = 'var(--border-light)';
                        design.style.backgroundColor = 'var(--bg-gray-subtle)';
                        design.style.boxShadow = 'none';
                    }
                }
            });
        }
        
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

    // ==========================================
    // 🤍 Wishlist Heart Toggle Logic
    // ==========================================
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening the product detail modal on click
            e.preventDefault();
            
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });
});

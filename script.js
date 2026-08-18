/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPTS
   Author: Harshitha
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Tracking
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .fe-card');

    document.addEventListener('mousemove', (e) => {
        // Dot movement (instant)
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // Ring movement (smooth transition via custom animate)
        cursor.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });


    // 2. Typing Effect (Hero Section)
    const typingText = document.getElementById('typing-text');
    const words = [
        "intuitive digital products.",
        "compelling brand experiences.",
        "engaging user interfaces.",
        "holistic design systems."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35; // Speed up when deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70; // Normal speed when typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 300; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingText) {
        type();
    }

    // 3. Interactive visual gallery
    const galleryGrid = document.querySelector('.visual-gallery-grid');
    const visualGallerySection = document.getElementById('visual-gallery');
    const resumeSection = document.getElementById('resume');
    const personalGalleryWorks = [
        { category: 'painting', title: 'Moonlit Grove', src: 'gallery/personal-work/painting-moonlit-trees.jpg', shape: 'gallery-item-wide' },
        { category: 'painting', title: 'Golden Temple', src: 'gallery/personal-work/painting-golden-temple.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Lamp and Moon', src: 'gallery/personal-work/painting-lamp-and-moon.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Sunset Architecture', src: 'gallery/personal-work/painting-sunset-architecture.jpg', shape: '' },
        { category: 'painting', title: 'Sunflower Study', src: 'gallery/personal-work/painting-sunflower-study.jpg', shape: '' },
        { category: 'painting', title: 'Bamboo Study', src: 'gallery/personal-work/painting-bamboo-study.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'City at Dusk', src: 'gallery/personal-work/painting-city-at-dusk.jpg', shape: '' },
        { category: 'painting', title: 'Yellow Horizon', src: 'gallery/personal-work/painting-yellow-horizon.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Wolf at Twilight', src: 'gallery/personal-work/painting-wolf-at-twilight.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Mountain Cabin', src: 'gallery/personal-work/painting-mountain-cabin.jpg', shape: '' },
        { category: 'painting', title: 'Moonlit Silhouettes', src: 'gallery/personal-work/painting-moonlit-silhouettes.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Tulip Figure', src: 'gallery/personal-work/painting-tulip-figure.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Bridal Portrait', src: 'gallery/personal-work/painting-bridal-portrait.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Cornfield Sunset', src: 'gallery/personal-work/painting-cornfield-sunset.jpg', shape: 'gallery-item-tall' },
        { category: 'painting', title: 'Mountain Triptych', src: 'gallery/personal-work/painting-mountain-triptych.jpg', shape: 'gallery-item-wide' },
        { category: 'illustration', title: 'Tamil Letterforms', src: 'gallery/personal-work/illustration-tamil-letterforms.png', shape: '' },
        { category: 'illustration', title: 'Madras Auto', src: 'gallery/personal-work/illustration-madras-auto.png', shape: '' },
        { category: 'illustration', title: 'Bharatanatyam', src: 'gallery/personal-work/illustration-bharatanatyam.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Chennai Central', src: 'gallery/personal-work/illustration-chennai-central.png', shape: '' },
        { category: 'illustration', title: 'Filter Kaapi', src: 'gallery/personal-work/illustration-filter-kaapi.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Idli, Vada, Sambar', src: 'gallery/personal-work/illustration-idli-vada-sambar.png', shape: '' },
        { category: 'illustration', title: 'Madras Presidency Map', src: 'gallery/personal-work/illustration-madras-map.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Marina Natkal', src: 'gallery/personal-work/illustration-marina-natkal.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Mediterranean Hues', src: 'gallery/personal-work/illustration-mediterranean-hues.png', shape: '' },
        { category: 'illustration', title: 'Rabbit', src: 'gallery/personal-work/illustration-rabbit.png', shape: '' },
        { category: 'illustration', title: 'Peacock Motif', src: 'gallery/personal-work/illustration-peacock.png', shape: '' },
        { category: 'illustration', title: 'Saree Studies', src: 'gallery/personal-work/illustration-fashion-collection.jpg', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Embroidered Heels', src: 'gallery/personal-work/illustration-embroidered-heels.jpg', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Blue Lineup', src: 'gallery/personal-work/illustration-fashion-blue.jpg', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Neutral Lineup', src: 'gallery/personal-work/illustration-fashion-neutral.jpg', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Saree Collection', src: 'gallery/personal-work/illustration-fashion-saree.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Tailored in Blue', src: 'gallery/personal-work/illustration-fashion-tailoring.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Saree Palette', src: 'gallery/personal-work/illustration-fashion-saree-color.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Saree Details', src: 'gallery/personal-work/illustration-fashion-saree-edit.png', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Alpine Reflection', src: 'gallery/personal-work/photo-alpine-reflection.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Coastal Sunset', src: 'gallery/personal-work/photo-coastal-sunset.jpg', shape: 'gallery-item-wide' },
        { category: 'photography', title: 'Spring Hillside', src: 'gallery/personal-work/photo-spring-hillside.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Lakeside After Dark', src: 'gallery/personal-work/photo-lakeside-after-dark.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'City Lights', src: 'gallery/personal-work/photo-city-lights.jpg', shape: 'gallery-item-wide' },
        { category: 'photography', title: 'Lake Crossing', src: 'gallery/personal-work/photo-lake-crossing.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Resting by the Sea', src: 'gallery/personal-work/photo-resting-by-the-sea.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Quiet Interior', src: 'gallery/personal-work/photo-quiet-interior.jpg', shape: '' },
        { category: 'photography', title: 'Pier Light', src: 'gallery/personal-work/photo-pier-light.jpg', shape: '' },
        { category: 'photography', title: 'Storm on the Shore', src: 'gallery/personal-work/photo-storm-on-the-shore.jpg', shape: '' },
        { category: 'photography', title: 'Winter Lake', src: 'gallery/personal-work/photo-winter-lake.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Pink Horizon', src: 'gallery/personal-work/photo-pink-horizon.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Coastal Beacon', src: 'gallery/personal-work/photo-coastal-beacon.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Monsoon Coast', src: 'gallery/personal-work/photo-monsoon-coast.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Umbrella Canopy', src: 'gallery/personal-work/photo-umbrella-canopy.jpg', shape: 'gallery-item-tall' },
        { category: 'photography', title: 'Autumn Valley', src: 'gallery/personal-work/photo-autumn-valley.jpg', shape: 'gallery-item-tall' }
    ];

    if (galleryGrid) {
        galleryGrid.innerHTML = personalGalleryWorks.map(work => `
            <button type="button" class="gallery-item ${work.shape}" data-gallery-category="${work.category}" data-gallery-title="${work.title}" data-gallery-src="${work.src}">
                <span class="gallery-image-frame"><img loading="lazy" src="${work.src}" alt="${work.title}"></span>
                <span class="gallery-item-caption">${work.title} <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
            </button>
        `).join('');
    }

    if (visualGallerySection && resumeSection) {
        resumeSection.insertAdjacentElement('afterend', visualGallerySection);
    }

    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryLightbox = document.getElementById('gallery-lightbox');
    const galleryLightboxImage = document.getElementById('gallery-lightbox-image');
    const galleryLightboxTitle = document.getElementById('gallery-lightbox-title');
    const galleryLightboxClose = document.querySelector('.gallery-lightbox-close');

    const closeGalleryLightbox = () => {
        if (!galleryLightbox) return;
        galleryLightbox.classList.remove('is-open');
        galleryLightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('gallery-open');
    };

    const selectGalleryCategory = (category) => {
        galleryFilters.forEach(item => {
            const isSelected = item.dataset.galleryFilter === category;
            item.classList.toggle('active', isSelected);
            item.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });
        galleryItems.forEach(item => item.classList.toggle('is-hidden', item.dataset.galleryCategory !== category));
    };

    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            selectGalleryCategory(filter.dataset.galleryFilter);
        });
    });

    selectGalleryCategory('photography');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!galleryLightbox || !galleryLightboxImage || !galleryLightboxTitle) return;
            galleryLightboxImage.src = item.dataset.gallerySrc;
            galleryLightboxImage.alt = item.querySelector('img')?.alt || '';
            galleryLightboxTitle.textContent = item.dataset.galleryTitle || '';
            galleryLightbox.classList.add('is-open');
            galleryLightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('gallery-open');
            galleryLightboxClose?.focus();
        });
    });

    galleryLightboxClose?.addEventListener('click', closeGalleryLightbox);
    galleryLightbox?.addEventListener('click', event => {
        if (event.target === galleryLightbox) closeGalleryLightbox();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && galleryLightbox?.classList.contains('is-open')) closeGalleryLightbox();
    });

    // 4. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu on click of nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }


    // 4. Scroll Spy Navigation (Highlight Active Section)
    const sections = document.querySelectorAll('section');
    function setActiveNav(activeId) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
        });
    }

    function updateActiveNav() {
        const checkpoint = window.innerHeight * 0.35;
        let activeSection = null;

        sections.forEach(section => {
            const { top, bottom } = section.getBoundingClientRect();
            if (top <= checkpoint && bottom > checkpoint) activeSection = section;
        });

        if (activeSection) setActiveNav(activeSection.id);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').slice(1);
            if (targetId) setActiveNav(targetId);
        });
    });

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();


    // 5. Case Study Modals Logic
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');
    let modalScrollPosition = 0;

    function lockBackgroundScroll() {
        if (document.body.classList.contains('modal-open')) return;
        modalScrollPosition = window.scrollY;
        document.body.style.top = `-${modalScrollPosition}px`;
        document.body.classList.add('modal-open');
    }

    function unlockBackgroundScroll() {
        if (!document.body.classList.contains('modal-open')) return;
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, modalScrollPosition);
    }

    function resetModalScroll(modal) {
        const container = modal.querySelector('.modal-container');
        if (container) container.scrollTop = 0;
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                resetModalScroll(targetModal);
                lockBackgroundScroll();
            }
        });
    });

    // Make entire project-card click trigger its corresponding modal
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.cursor = 'pointer'; // Ensure pointer cursor indicates clickability
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            
            const projectType = card.getAttribute('data-project');
            const modalId = `modal-${projectType}`;
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                resetModalScroll(targetModal);
                lockBackgroundScroll();
            }
        });
    });

    function closeModal(modal) {
        modal.classList.remove('active');
        unlockBackgroundScroll();
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });

    // ESC key close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });


    // 6. Contact Form Interactive Validation & Mock Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>`;
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            // Simulate form submission API delay
            setTimeout(() => {
                const name = document.getElementById('form-name').value;
                const email = document.getElementById('form-email').value;
                
                if (name && email) {
                    formStatus.classList.add('success');
                    formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    contactForm.reset();
                } else {
                    formStatus.classList.add('error');
                    formStatus.textContent = 'Oops! Please make sure all required fields are filled correctly.';
                }

                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
            }, 1800);
        });
    }

    // 7. Circular Before/After Auto-Transition Alignment (Design vs. Code)
    // Removed to prevent performance-intensive layout reflow calculations on mobile window resizing.

    // 9. AURA Case Study Gallery Slider
    const auraGallery = document.querySelector('.aura-gallery-container');
    if (auraGallery) {
        const slides = auraGallery.querySelectorAll('.aura-gallery-slide');
        const prevBtn = auraGallery.querySelector('.aura-gallery-arrow.prev');
        const nextBtn = auraGallery.querySelector('.aura-gallery-arrow.next');
        const dots = auraGallery.querySelectorAll('.aura-dot');
        let currentSlide = 0;

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-slide'));
                showSlide(index);
            });
        });
    }

    // 10. Foundmoon Final UI Gallery Slider
    const foundmoonGallery = document.querySelector('.foundmoon-gallery');
    if (foundmoonGallery) {
        const slides = foundmoonGallery.querySelectorAll('.foundmoon-gallery-slide');
        const prevBtn = foundmoonGallery.querySelector('.foundmoon-gallery-arrow.prev');
        const nextBtn = foundmoonGallery.querySelector('.foundmoon-gallery-arrow.next');
        const dots = foundmoonGallery.querySelectorAll('.foundmoon-gallery-dot');
        let currentSlide = 0;

        function showFoundmoonSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        prevBtn.addEventListener('click', () => showFoundmoonSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showFoundmoonSlide(currentSlide + 1));
        dots.forEach(dot => dot.addEventListener('click', () => showFoundmoonSlide(Number(dot.dataset.slide))));
    }

    // 11. Fixed Scroll Percentage
    function updateScrollPercentage() {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = height > 0 ? Math.round((winScroll / height) * 100) : 0;
        const indicator = document.getElementById('scroll-percentage-indicator');
        const label = document.getElementById('scroll-percentage');
        if (indicator && label) {
            indicator.setAttribute('aria-valuenow', percentage);
            label.textContent = `${percentage}%`;
        }
    }

    window.addEventListener('scroll', updateScrollPercentage, { passive: true });
    updateScrollPercentage();

    // 11. Image Lightbox for Mobile/Tablet Screens
    const caseImages = document.querySelectorAll('.modal-body img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    caseImages.forEach(img => {
        img.style.cursor = 'zoom-in'; // Visual indicator that images can be expanded
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        });
    });

    if (lightbox && lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 12. Modal Bottom Navigation Buttons
    const modalNavButtons = document.querySelectorAll('.modal-nav-btn');
    modalNavButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentModal = btn.closest('.modal');
            const action = btn.getAttribute('data-action');
            const nextModalId = btn.getAttribute('data-next');
            const prevModalId = btn.getAttribute('data-prev');

            if (currentModal) {
                currentModal.classList.remove('active');
                
                if (action === 'close-scroll') {
                    unlockBackgroundScroll();
                } else if (nextModalId) {
                    const nextModal = document.getElementById(nextModalId);
                    if (nextModal) {
                        setTimeout(() => {
                            nextModal.classList.add('active');
                            resetModalScroll(nextModal);
                            lockBackgroundScroll();
                        }, 250);
                    }
                } else if (prevModalId) {
                    const prevModal = document.getElementById(prevModalId);
                    if (prevModal) {
                        setTimeout(() => {
                            prevModal.classList.add('active');
                            resetModalScroll(prevModal);
                            lockBackgroundScroll();
                        }, 250);
                    }
                }
            }
        });
    });

    // 13. Close open modals when main navigation links are clicked
    const mainNavLinks = document.querySelectorAll('.nav-link, .logo');
    mainNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(m => {
                m.classList.remove('active');
            });
            unlockBackgroundScroll();
        });
    });

});

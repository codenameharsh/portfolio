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


    // 3. Mobile Navigation Menu Toggle
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

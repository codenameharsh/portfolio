/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPTS
   Author: Harshitha
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // The refreshed YonderLust narrative is authored alongside its legacy source.
    // Mount that focused sequence in the active modal before modal enhancements run.
    const yonderSource = document.querySelector('#modal-foundmoon .modal-body');
    const yonderTarget = document.querySelector('#modal-yonderlust .modal-body');
    const yonderStart = yonderSource?.querySelector('img[src="yonder_intro.png"]');
    const yonderDivider = yonderTarget?.querySelector('hr');
    const yonderNavigation = yonderTarget?.querySelector('.modal-nav');
    if (yonderStart && yonderDivider && yonderNavigation) {
        const refreshedNodes = [];
        let node = yonderStart;
        while (node) {
            const copy = node.cloneNode(true);
            refreshedNodes.push(copy);
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P' && node.textContent.includes('Given two days, prioritizing the right problem mattered more')) break;
            node = node.nextSibling;
        }

        let targetNode = yonderDivider.nextSibling;
        while (targetNode && targetNode !== yonderNavigation) {
            const nextNode = targetNode.nextSibling;
            targetNode.remove();
            targetNode = nextNode;
        }
        yonderDivider.after(...refreshedNodes);
    }

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

    // Keep compact card tool icons legible without adding permanent visual noise.
    document.querySelectorAll('.project-tags [aria-label]').forEach((tool) => {
        tool.dataset.tooltip = tool.getAttribute('aria-label');
    });

    // 2. Interactive visual gallery
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
        { category: 'illustration', title: 'Bharatanatyam', src: 'gallery/personal-work/illustration-bharatanatyam.png', shape: 'gallery-item-tall' },
        { category: 'illustration', title: 'Chennai Central', src: 'gallery/personal-work/illustration-chennai-central.png', shape: '' },
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
    const menuClose = document.getElementById('menu-close');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        const closeMobileMenu = () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            menuToggle.setAttribute('aria-expanded', 'false');
        };

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        menuClose?.addEventListener('click', closeMobileMenu);

        // Close menu on click of nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) closeMobileMenu();
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
    let lastModalTrigger = null;

    const caseStudyGlances = {
        'modal-smart-rewards': [
            'I designed a focused recommendation layer for the point where loyalty members must choose a reward.',
            'The work covered problem framing, the member experience, merchant controls, MVP strategy, and measurement.',
            'Members had points to spend but faced a difficult-to-compare catalog at the moment redemption should feel rewarding.',
            'The concept offers one explainable next-best reward while preserving the full catalog and the member’s control.'
        ],
        'modal-ai-stylist': [
            'I designed and built an AI stylist that turns a personal wardrobe into more useful daily recommendations.',
            'Over four weeks, I connected wardrobe digitization, progressive Style DNA onboarding, and a functional Android prototype.',
            'The key tension was earning the context an AI needs without front-loading personalization as work.',
            'The result is a four-step setup flow that keeps the path from a physical closet to a useful recommendation lightweight.'
        ],
        'modal-ecocycle': [
            'I led research, product design, and UI for a four-week sustainability community concept, grounded in 40 interviews.',
            'The work moved from research synthesis through architecture, profile exploration, and a high-fidelity prototype.',
            'People did not only want to track their sustainable actions; they were already looking for resources, participation, and ways to share progress.',
            'The product shifted from a personal tracker to a profile-centered system connecting identity, discovery, participation, and recognition.'
        ],
        'modal-foundmoon-app': [
            'I designed and built the native Android product, from the reading experience to the technical foundation.',
            'I defined the product flow and implemented the app with Android-native patterns for a calm, personal library.',
            'Readers needed a private, low-friction way to track books and reading progress without turning the habit into a feed.',
            'The app uses private, versioned on-device storage with import and export, keeping each reading record portable and personal.'
        ],
        'modal-foundmoon': [
            'I designed and built the native Android product, from the reading experience to the technical foundation.',
            'I defined the product flow and implemented the app with Android-native patterns for a calm, personal library.',
            'Readers needed a private, low-friction way to track books and reading progress without turning the habit into a feed.',
            'The app uses private, versioned on-device storage with import and export, keeping each reading record portable and personal.'
        ],
        'modal-yonderlust': [
            'I designed YonderLust in a focused two-day sprint around the two needs that most shaped solo travel: clarity and confidence.',
            'The work used secondary qualitative research to prioritize the core travel-planning flow and persistent safety support.',
            'The central decision was to leave social matching, booking, and other marketplace features outside the sprint.',
            'The resulting prototype connects discovery, planning, exploration, and help without letting safety take over the journey.'
        ],
        'modal-aura': [
            'I built AURA as a luxury fashion world where celestial inspiration is expressed through atmosphere, not literal decoration.',
            'Over two weeks, I shaped the strategy, visual identity, editorial system, packaging concepts, and digital guidelines.',
            'The core decision was to create shared rules for type, color, imagery, spacing, and composition rather than one fixed look.',
            'The result is a flexible system that stays recognizable as it moves across editorial, packaging, digital, and retail concepts.'
        ]
    };

    const caseStudyIntroductions = {
        'modal-smart-rewards': 'A loyalty recommendation layer that helps members choose a relevant reward instead of browsing without direction.',
        'modal-ai-stylist': 'An AI stylist designed to earn useful wardrobe context without making personalized setup feel exhausting.',
        'modal-ecocycle': 'A research-led sustainability community built around participation, shared resources, and visible personal progress.',
        'modal-foundmoon-app': 'A calm native Android companion for building a personal reading life.',
        'modal-foundmoon': 'A calm native Android companion for building a personal reading life.',
        'modal-yonderlust': 'A focused solo-travel concept that brings planning and safety together without turning exploration into a warning system.',
        'modal-aura': 'A luxury fashion world built from shared visual rules—expressive enough for editorial, coherent enough for every brand touchpoint.'
    };

    const caseStudyTechStack = {
        'modal-smart-rewards': [
            ['fa-brands fa-figma', 'Figma'],
            ['fa-solid fa-compass', 'Product strategy'],
            ['fa-solid fa-flask', 'Experimentation']
        ],
        'modal-ai-stylist': [
            ['fa-brands fa-figma', 'Figma'],
            ['fa-brands fa-android', 'Android Studio'],
            ['fa-solid fa-code', 'Kotlin'],
            ['fa-solid fa-layer-group', 'Jetpack Compose']
        ],
        'modal-ecocycle': [
            ['fa-brands fa-figma', 'Figma'],
            ['fa-solid fa-table-columns', 'FigJam'],
            ['fa-solid fa-magnifying-glass', 'Miro and UX research']
        ],
        'modal-foundmoon-app': [
            ['fa-brands fa-android', 'Android'],
            ['fa-solid fa-code', 'Kotlin'],
            ['fa-solid fa-layer-group', 'Jetpack Compose']
        ],
        'modal-foundmoon': [
            ['fa-brands fa-android', 'Android'],
            ['fa-solid fa-code', 'Kotlin'],
            ['fa-solid fa-layer-group', 'Jetpack Compose']
        ],
        'modal-yonderlust': [
            ['fa-brands fa-figma', 'Figma'],
            ['fa-solid fa-table-columns', 'FigJam'],
            ['fa-solid fa-pen-nib', 'Illustrator']
        ],
        'modal-aura': [
            ['fa-solid fa-pen-nib', 'Adobe Illustrator'],
            ['fa-solid fa-image', 'Photoshop'],
            ['fa-solid fa-book-open', 'InDesign']
        ]
    };

    modals.forEach(modal => {
        const title = modal.querySelector('h2');
        const container = modal.querySelector('.modal-container');
        const glance = caseStudyGlances[modal.id];
        if (!title || !container) return;

        title.id = `${modal.id}-title`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', title.id);
        modal.setAttribute('aria-hidden', 'true');
        container.setAttribute('tabindex', '-1');

        if (!modal.querySelector('.modal-close')) {
            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = 'modal-close';
            closeButton.setAttribute('aria-label', `Close ${title.textContent.trim()} case study`);
            closeButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
            container.prepend(closeButton);
            closeButton.addEventListener('click', () => closeModal(modal));
        }

        if (glance && !modal.querySelector('.case-study-glance')) {
            const heading = document.createElement('h3');
            const glanceSection = document.createElement('section');
            heading.className = 'case-study-glance-title';
            heading.textContent = 'TL;DR';
            const introduction = document.createElement('p');
            introduction.className = 'case-study-tldr-intro';
            introduction.textContent = caseStudyIntroductions[modal.id];
            glanceSection.className = 'case-study-glance';
            glanceSection.setAttribute('aria-label', 'Case study summary');
            ['Ownership', 'Scope', 'Focus', 'Evidence'].forEach((label, index) => {
                const item = document.createElement('div');
                item.innerHTML = `<span>${label}</span><p>${glance[index]}</p>`;
                glanceSection.append(item);
            });
            const divider = modal.querySelector('.modal-body hr');
            divider?.after(heading, introduction, glanceSection);
        }

        const techStack = caseStudyTechStack[modal.id];
        if (techStack && !modal.querySelector('.case-study-tech-stack')) {
            const techStackSection = document.createElement('section');
            techStackSection.className = 'case-study-tech-stack';
            techStackSection.setAttribute('aria-label', 'Tech stack');
            techStack.forEach(([iconClass, label]) => {
                const pill = document.createElement('span');
                pill.className = 'case-study-tech-pill';
                pill.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i><span>${label}</span>`;
                techStackSection.append(pill);
            });
            const insertionPoint = modal.querySelector('.case-study-glance');
            insertionPoint?.after(techStackSection);
        }

        const modalNavigation = modal.querySelector('.modal-nav');
        if (modalNavigation && !modal.querySelector('.modal-top-nav')) {
            const previous = modalNavigation.querySelector('[data-prev], .prev-modal-btn[data-action]');
            const next = modalNavigation.querySelector('[data-next], .next-modal-btn[data-action]');
            if (previous || next) {
                const topNavigation = document.createElement('nav');
                topNavigation.className = 'modal-top-nav';
                topNavigation.setAttribute('aria-label', 'Case study navigation');
                if (previous) {
                    const previousButton = document.createElement('button');
                    previousButton.type = 'button';
                    previousButton.className = 'modal-nav-btn modal-top-nav-btn';
                    if (previous.hasAttribute('data-action')) {
                        previousButton.setAttribute('data-action', previous.getAttribute('data-action'));
                    } else {
                        previousButton.setAttribute('data-prev', previous.getAttribute('data-prev'));
                    }
                    previousButton.innerHTML = previous.innerHTML;
                    topNavigation.append(previousButton);
                }
                if (next) {
                    const nextButton = document.createElement('button');
                    nextButton.type = 'button';
                    nextButton.className = 'modal-nav-btn modal-top-nav-btn';
                    if (next.hasAttribute('data-action')) {
                        nextButton.setAttribute('data-action', next.getAttribute('data-action'));
                    } else {
                        nextButton.setAttribute('data-next', next.getAttribute('data-next'));
                    }
                    nextButton.innerHTML = next.innerHTML;
                    topNavigation.append(nextButton);
                }
                title.after(topNavigation);
            }
        }
    });

    const visualDescriptions = {
        'yonder_intro.png': 'YonderLust solo travel app concept overview',
        'yonder_research_painpopints.png': 'YonderLust research pain points from solo travelers',
        'yonder_user_persona.png': 'YonderLust persona for Maya, a solo traveler',
        'yonder_journey_map.png': 'YonderLust journey map from discovery to reflection',
        'yonder_IA.png': 'YonderLust information architecture for discover, plan, explore, and safety',
        'yonder_user_flow.png': 'YonderLust core travel planning user flow',
        'yonder_wireframes.png': 'YonderLust early wireframes for planning and safety',
        'yonder_design_system.png': 'YonderLust calm visual design system',
        'yonder_final_UIxxxhdpi.png': 'YonderLust final mobile interface',
        'yonder_prototype.png': 'YonderLust prototype screens',
        'aura_1.png': 'AURA brand identity overview',
        'aura_moodboardxxxhdpi.png': 'AURA celestial creative direction moodboard',
        'aura_logo_1.png': 'AURA primary logo and usage',
        'aura_logo_2.png': 'AURA alternate logo treatment',
        'aura_palette1.png': 'AURA primary color palette',
        'aura_palette2.png': 'AURA supporting color palette',
        'aura_typography.png': 'AURA typography system',
        'aura_editorial.png': 'AURA editorial lookbook layout system',
        'aura_packaging.png': 'AURA packaging application',
        'aura_digital.png': 'AURA digital brand guidelines'
    };
    document.querySelectorAll('img[src]').forEach(image => {
        const fileName = image.getAttribute('src').split('/').pop();
        if (visualDescriptions[fileName]) image.alt = visualDescriptions[fileName];
    });

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

    function openModal(modal, trigger) {
        lastModalTrigger = trigger instanceof HTMLElement ? trigger : document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        resetModalScroll(modal);
        lockBackgroundScroll();
        requestAnimationFrame(() => modal.querySelector('.modal-close, .modal-container')?.focus());
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                openModal(targetModal, trigger);
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
                openModal(targetModal, card.querySelector('.project-link'));
            }
        });
    });

    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        unlockBackgroundScroll();
        if (lastModalTrigger instanceof HTMLElement && document.contains(lastModalTrigger)) {
            lastModalTrigger.focus();
        }
        lastModalTrigger = null;
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

    // Keyboard close and focus containment
    document.addEventListener('keydown', (e) => {
        const activeModal = document.querySelector('.modal.active');
        if (e.key === 'Escape') {
            if (activeModal) closeModal(activeModal);
        }
        if (e.key === 'Tab' && activeModal) {
            const focusable = [...activeModal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
                .filter(element => element.offsetParent !== null);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });


    // 6. Foundmoon Final UI Gallery Slider
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
            e.preventDefault();
            const currentModal = btn.closest('.modal');
            const action = btn.getAttribute('data-action');
            const nextModalId = btn.getAttribute('data-next');
            const prevModalId = btn.getAttribute('data-prev');

            if (currentModal) {
                if (currentModal.dataset.navigating === 'true') return;
                currentModal.dataset.navigating = 'true';
                currentModal.classList.remove('active');
                currentModal.setAttribute('aria-hidden', 'true');
                const returnTrigger = lastModalTrigger;
                
                if (action === 'close-scroll') {
                    unlockBackgroundScroll();
                    const selectedWork = document.getElementById('selected-work');
                    selectedWork?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (returnTrigger instanceof HTMLElement) setTimeout(() => returnTrigger.focus({ preventScroll: true }), 450);
                    lastModalTrigger = null;
                } else if (nextModalId) {
                    const nextModal = document.getElementById(nextModalId);
                    if (nextModal) {
                        setTimeout(() => {
                            delete currentModal.dataset.navigating;
                            openModal(nextModal, returnTrigger);
                        }, 220);
                    }
                } else if (prevModalId) {
                    const prevModal = document.getElementById(prevModalId);
                    if (prevModal) {
                        setTimeout(() => {
                            delete currentModal.dataset.navigating;
                            openModal(prevModal, returnTrigger);
                        }, 220);
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

    // Subtle scroll choreography that preserves the browser's natural scrolling.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollStages = document.querySelectorAll(
        '.section-header, .project-card, .timeline-item, .about-visual, .about-story, .skills-card, .education-card, .resume-card, .contact-method'
    );

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        scrollStages.forEach((stage, index) => {
            stage.classList.add('scroll-stage');
            stage.style.setProperty('--scroll-stage-delay', `${Math.min(index % 4, 3) * 70}ms`);
        });

        const stageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in-view');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        scrollStages.forEach((stage) => stageObserver.observe(stage));

    } else {
        scrollStages.forEach((stage) => stage.classList.add('is-in-view'));
    }

});

import { ZERO_RELEASES, initUniversalCartDrawer, isDropsFruit5mlLive } from './zero-products.js';

const NAV_ITEMS = [
    { label: 'Catalog', href: '/catalog.html', desktop: true },
    { label: 'Syrup', href: '/syrup.html', desktop: true },
    { label: 'Drops', href: '/drops.html', desktop: true },
    { label: 'Maple Topping', href: '/maple-topping.html', desktop: true },
    { label: 'ZFit', href: '/zfit.html', desktop: true },
    { label: 'Legal Info', href: '/legal.html', desktop: false },
];

const MENU_ITEMS = [
    { label: 'Home', href: '/index.html' },
    ...NAV_ITEMS,
    { label: 'About', href: '/index.html#experience' },
];

const normalizePath = (href) => {
    const path = href.split('#')[0] || '/index.html';
    return path === '/' ? '/index.html' : path;
};

const isCurrentHref = (href) => normalizePath(href) === normalizePath(window.location.pathname);

const renderAnchor = ({ label, href }) => {
    const current = isCurrentHref(href);
    return `<a href="${href}"${current ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
};

const normalizeNavigation = () => {
    const navLinks = document.querySelector('.nav-links');
    const moreMenu = navLinks?.querySelector('.more-menu');
    const moreDropdown = document.getElementById('more-dropdown');

    if (navLinks && moreMenu) {
        navLinks.querySelectorAll('li.desktop-only').forEach((item) => item.remove());
        NAV_ITEMS.filter((item) => item.desktop).forEach((item) => {
            const navItem = document.createElement('li');
            navItem.className = 'desktop-only';
            navItem.innerHTML = renderAnchor(item);
            navLinks.insertBefore(navItem, moreMenu);
        });
    }

    if (moreDropdown) {
        moreDropdown.innerHTML = MENU_ITEMS.map(renderAnchor).join('');
    }
};

const syncScheduledDropsCopy = () => {
    const release = ZERO_RELEASES.dropsFruit5ml;
    const isLive = isDropsFruit5mlLive();

    document.querySelectorAll('[data-drops-size-copy]').forEach((element) => {
        const isShort = element.dataset.dropsSizeCopy === 'short';
        element.textContent = isLive
            ? (isShort ? release.liveShortCopy : release.liveCopy)
            : (isShort ? release.upcomingShortCopy : release.upcomingCopy);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const ACCESS_CODE = "192017";
    const SESSION_KEY = "zero_vault_access";
    normalizeNavigation();
    syncScheduledDropsCopy();
    const cartApi = initUniversalCartDrawer();
    window.zeroCartApi = cartApi;
    const closeOverlay = (element) => {
        if (!element?.classList.contains('active')) return;
        element.classList.remove('expanded');
        setTimeout(() => element.classList.remove('active'), 500);
    };

    // Global Lock/Unlock Logic
    const overlay = document.getElementById('coming-soon-overlay');
    if (overlay) {
        if (sessionStorage.getItem(SESSION_KEY) === "granted") {
            overlay.style.display = 'none'; // Total removal from render stack
            document.body.classList.remove('locked');
        } else {
            document.body.classList.add('locked');
        }
    }

    // Portal UI Interaction
    const portal = {
        overlay: overlay,
        devYes: document.getElementById('dev-yes'),
        devNo: document.getElementById('dev-no'),
        devCheck: document.getElementById('developer-check'),
        codePrompt: document.getElementById('code-prompt'),
        devInput: document.getElementById('dev-code'),
        submitBtn: document.getElementById('submit-code')
    };

    portal.devYes?.addEventListener('click', () => {
        portal.devCheck.classList.add('hide');
        portal.codePrompt.classList.remove('hide');
        setTimeout(() => portal.devInput.focus(), 100);
    });

    const unlockSite = () => {
        if (portal.devInput.value === ACCESS_CODE) {
            sessionStorage.setItem(SESSION_KEY, "granted");
            portal.overlay.classList.add('fade-out');
            setTimeout(() => portal.overlay.style.display = 'none', 1000); 
            document.body.classList.remove('locked');
            console.log("Access Granted.");
        } else {
            alert("Incorrect code.");
            portal.devInput.value = "";
        }
    };

    portal.submitBtn?.addEventListener('click', unlockSite);
    portal.devInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockSite();
    });

    // Search and more menu logic
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopout = document.getElementById('search-popout');
    const morphIconBox = document.getElementById('morph-icon-box');
    const mainSearch = document.getElementById('main-search');
    const closeSearch = document.getElementById('close-search');
    const moreTrigger = document.getElementById('more-trigger');
    const moreDropdown = document.getElementById('more-dropdown');

    if (searchTrigger && searchPopout && morphIconBox && mainSearch) {
        searchTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (searchPopout.classList.contains('active')) {
                closeOverlay(searchPopout);
            } else {
                searchPopout.classList.add('active');
                setTimeout(() => {
                    morphIconBox.style.transform = 'translateX(200px)';
                    setTimeout(() => {
                        morphIconBox.style.transform = 'translateX(0)';
                        searchPopout.classList.add('expanded');
                        setTimeout(() => mainSearch.focus(), 400);
                    }, 400);
                }, 300);
            }
        });
    }

    closeSearch?.addEventListener('click', () => closeOverlay(searchPopout));

    if (moreTrigger && moreDropdown) {
        moreTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            moreDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        const clickedNode = e.target;

        if (moreDropdown && !moreDropdown.contains(clickedNode) && !moreTrigger?.contains(clickedNode)) {
            moreDropdown.classList.remove('active');
        }
        if (searchPopout && !searchPopout.contains(clickedNode) && !searchTrigger?.contains(clickedNode)) {
            closeOverlay(searchPopout);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay(searchPopout);
            moreDropdown?.classList.remove('active');
        }
    });

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    // Pinned Product Story
    const storyTrack = document.getElementById('product-story-track');
    const storyStage = document.getElementById('product-story-stage');
    const isCompactViewport = () => window.matchMedia('(max-width: 768px)').matches;

    if (storyTrack && storyStage) {
        const applyStoryVisuals = () => {
            const rect = storyTrack.getBoundingClientRect();
            const distance = Math.max(storyTrack.offsetHeight - window.innerHeight, 1);
            const progress = clamp((-rect.top) / distance, 0, 1);
            const revealProgress = clamp((progress - 0.18) / 0.5, 0, 1);
            let darkness = 0;

            if (progress < 0.2) {
                darkness = clamp(progress / 0.2, 0, 1);
            } else if (progress > 0.78) {
                darkness = 1 - clamp((progress - 0.78) / 0.22, 0, 1);
            } else {
                darkness = 1;
            }

            storyStage.style.setProperty('--story-progress', revealProgress.toFixed(4));
            storyStage.style.setProperty('--story-left-opacity', clamp((revealProgress - 0.08) * 2.8, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-center-opacity', clamp((revealProgress - 0.34) * 3.2, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-right-opacity', clamp((revealProgress - 0.54) * 3.2, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-syrup-opacity', clamp((revealProgress - 0.02) * 4.2, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-drops-opacity', clamp((revealProgress - 0.22) * 4, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-topping-opacity', clamp((revealProgress - 0.42) * 4, 0, 1).toFixed(4));
            storyStage.style.setProperty('--story-darkness', darkness.toFixed(4));
            storyTrack.closest('.product-story-section')?.style.setProperty('--section-darkness', darkness.toFixed(4));
        };

        const updateStoryProgress = () => {
            if (isCompactViewport()) {
                storyStage.style.setProperty('--story-progress', '1');
                storyStage.style.setProperty('--story-left-opacity', '1');
                storyStage.style.setProperty('--story-center-opacity', '1');
                storyStage.style.setProperty('--story-right-opacity', '1');
                storyStage.style.setProperty('--story-syrup-opacity', '1');
                storyStage.style.setProperty('--story-drops-opacity', '1');
                storyStage.style.setProperty('--story-topping-opacity', '1');
                storyStage.style.setProperty('--story-darkness', '0');
                storyTrack.closest('.product-story-section')?.style.setProperty('--section-darkness', '0');
                return;
            }
            applyStoryVisuals();
        };

        updateStoryProgress();
        window.addEventListener('scroll', updateStoryProgress, { passive: true });
        window.addEventListener('resize', updateStoryProgress);
    }

    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsRail = document.getElementById('testimonials-rail');

    if (testimonialsTrack && testimonialsRail) {
        let testimonialsManualOffset = 0;

        const updateTestimonialsPosition = () => {
            if (isCompactViewport()) {
                testimonialsRail.style.transform = 'translate3d(0, 0, 0)';
                return;
            }

            const rect = testimonialsTrack.getBoundingClientRect();
            const distance = Math.max(testimonialsTrack.offsetHeight - window.innerHeight, 1);
            const leadIn = window.innerHeight * 0.62;
            const rawProgress = clamp((leadIn - rect.top) / (distance + leadIn), 0, 1);
            const progress = 1 - Math.pow(1 - rawProgress, 1.35);
            const maxShift = Math.max(testimonialsRail.scrollWidth - window.innerWidth, 0);
            const startOffset = Math.min(window.innerWidth * 0.16, 220);
            testimonialsManualOffset = clamp(testimonialsManualOffset, -maxShift, 0);
            const translateX = startOffset - (progress * (maxShift + startOffset)) + testimonialsManualOffset;

            testimonialsRail.style.transform = `translate3d(${translateX.toFixed(1)}px, 0, 0)`;
        };

        testimonialsRail.addEventListener('wheel', (event) => {
            if (isCompactViewport()) return;

            const maxShift = Math.max(testimonialsRail.scrollWidth - window.innerWidth, 0);
            if (!maxShift) return;

            event.preventDefault();
            testimonialsManualOffset = clamp(testimonialsManualOffset - event.deltaY * 0.55, -maxShift, 0);
            updateTestimonialsPosition();
        }, { passive: false });

        updateTestimonialsPosition();
        window.addEventListener('scroll', updateTestimonialsPosition, { passive: true });
        window.addEventListener('resize', updateTestimonialsPosition);
    }

    // Pronounced but lightweight parallax layers
    const parallaxLayers = Array.from(document.querySelectorAll('[data-parallax]'));
    if (parallaxLayers.length) {
        let rafId = 0;

        const updateParallax = () => {
            rafId = 0;
            const viewportHeight = window.innerHeight || 1;

            parallaxLayers.forEach((layer) => {
                const rect = layer.parentElement?.getBoundingClientRect();
                if (!rect) return;

                const centerOffset = (rect.top + rect.height / 2) - viewportHeight / 2;
                const normalized = Math.max(-1.3, Math.min(1.3, centerOffset / viewportHeight));
                const speed = Number(layer.dataset.parallaxSpeed || 0.3);
                const scale = Number(layer.dataset.parallaxScale || 1.32);
                const translateY = normalized * viewportHeight * speed * -1;
                const image = layer.querySelector('.parallax-image');

                if (image) {
                    image.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale})`;
                }
            });
        };

        const requestParallaxFrame = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(updateParallax);
        };

        updateParallax();
        window.addEventListener('scroll', requestParallaxFrame, { passive: true });
        window.addEventListener('resize', requestParallaxFrame);
    }

    // Transition Revealer
    const revealItems = document.querySelectorAll('.n-card, .dark-accent-card, .hero-h1, .hero-p, .flv-card-min, .metric-strip, .feature-wireframe, .showcase-panel, .journey-card, .timeline-card, .footer-shell');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });
});

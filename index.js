import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ZERO_RELEASES, initUniversalCartDrawer, isDropsFruit5mlLive } from './zero-products.js';

const PRIMARY_NAV_ITEMS = [
    { label: 'Catalog', href: '/catalog.html' },
    { label: 'ZFit', href: '/zfit.html' },
];

const PRODUCT_MENU_ITEMS = [
    { label: 'Syrup', href: '/syrup.html' },
    { label: 'Drops', href: '/drops.html' },
    { label: 'Maple Topping', href: '/maple-topping.html' },
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

const initSmoothScroll = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduceMotion.matches) {
        return null;
    }

    const lenis = new Lenis({
        autoRaf: true,
        anchors: {
            offset: -88,
            duration: 1.05,
            easing: (t) => 1 - Math.pow(1 - t, 3),
        },
        duration: 1.08,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        prevent: (node) => node.closest?.('[data-scroll-lock], .global-overlay, .zero-cart-drawer'),
    });

    const syncScrollState = () => {
        const shouldStop = document.body.classList.contains('locked')
            || document.body.classList.contains('cart-drawer-open');

        if (shouldStop) {
            lenis.stop();
        } else {
            lenis.start();
        }
    };

    const bodyObserver = new MutationObserver(syncScrollState);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    reduceMotion.addEventListener('change', (event) => {
        if (event.matches) {
            lenis.destroy();
            bodyObserver.disconnect();
            window.zeroLenis = null;
        }
    });

    window.zeroLenis = lenis;
    syncScrollState();

    return lenis;
};

const normalizeNavigation = () => {
    const navLinks = document.querySelector('.nav-links');
    const moreMenu = navLinks?.querySelector('.more-menu');
    const moreTrigger = document.getElementById('more-trigger');
    const moreDropdown = document.getElementById('more-dropdown');
    const productMenuIsActive = PRODUCT_MENU_ITEMS.some((item) => isCurrentHref(item.href));

    if (navLinks && moreMenu) {
        navLinks.querySelectorAll('li.desktop-only, li.nav-primary-link').forEach((item) => item.remove());
        PRIMARY_NAV_ITEMS.forEach((item) => {
            const navItem = document.createElement('li');
            navItem.className = 'nav-primary-link';
            navItem.innerHTML = renderAnchor(item);
            navLinks.insertBefore(navItem, moreMenu);
        });
    }

    if (moreTrigger) {
        moreTrigger.className = `icon-btn product-menu-trigger${productMenuIsActive ? ' active' : ''}`;
        moreTrigger.setAttribute('aria-label', 'Open product menu');
        moreTrigger.setAttribute('aria-haspopup', 'true');
        moreTrigger.setAttribute('aria-expanded', 'false');
        moreTrigger.innerHTML = `
            <svg class="product-menu-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6"></path>
            </svg>
        `;
    }

    if (moreDropdown) {
        moreDropdown.setAttribute('aria-label', 'Product menu');
        moreDropdown.innerHTML = PRODUCT_MENU_ITEMS.map(renderAnchor).join('');
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
    initSmoothScroll();
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
            moreTrigger.setAttribute('aria-expanded', String(moreDropdown.classList.contains('active')));
        });
    }

    document.addEventListener('click', (e) => {
        const clickedNode = e.target;

        if (moreDropdown && !moreDropdown.contains(clickedNode) && !moreTrigger?.contains(clickedNode)) {
            moreDropdown.classList.remove('active');
            moreTrigger?.setAttribute('aria-expanded', 'false');
        }
        if (searchPopout && !searchPopout.contains(clickedNode) && !searchTrigger?.contains(clickedNode)) {
            closeOverlay(searchPopout);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay(searchPopout);
            moreDropdown?.classList.remove('active');
            moreTrigger?.setAttribute('aria-expanded', 'false');
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

    const productLinesSection = document.querySelector('.product-lines-section');

    if (productLinesSection) {
        const pageBase = [255, 255, 255];
        const grayBase = [232, 235, 235];
        let ambientFrame = 0;

        const updateAmbientDark = () => {
            ambientFrame = 0;
            const rect = productLinesSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const fadeInStart = viewportHeight - 300;
            const fadeIn = clamp((fadeInStart - rect.top) / 220, 0, 1);
            const fadeOut = clamp((viewportHeight * 0.72 - rect.bottom) / 220, 0, 1);
            const amount = fadeIn * (1 - fadeOut);
            const mixed = pageBase.map((channel, index) => Math.round(channel + ((grayBase[index] - channel) * amount)));

            document.body.style.setProperty('--ambient-bg', `rgb(${mixed.join(', ')})`);
            productLinesSection.style.setProperty('--product-lines-darkness', amount.toFixed(4));
        };

        const requestAmbientFrame = () => {
            if (ambientFrame) return;
            ambientFrame = window.requestAnimationFrame(updateAmbientDark);
        };

        updateAmbientDark();
        window.addEventListener('scroll', requestAmbientFrame, { passive: true });
        window.addEventListener('resize', requestAmbientFrame);
    }

    const productLineCards = document.querySelectorAll('.product-lines-section .journey-card');

    const habitsSection = document.querySelector('.habits-section');

    if (habitsSection) {
        const habitsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                habitsSection.classList.toggle('in-frame', entry.isIntersecting);
            });
        }, { threshold: 0.18, rootMargin: '-8% 0px -18% 0px' });

        habitsObserver.observe(habitsSection);
    }

    if (productLinesSection) {
        const productSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    productLinesSection.classList.add('in-frame');
                    return;
                }

                if (entry.boundingClientRect.top > 0) {
                    productLinesSection.classList.remove('in-frame');
                    productLineCards.forEach((card) => card.classList.remove('in-frame'));
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

        productSectionObserver.observe(productLinesSection);
    }

    if (productLineCards.length) {
        const productLineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-frame');
                    return;
                }

                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('in-frame');
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

        productLineCards.forEach((card) => productLineObserver.observe(card));
    }

    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsRail = document.getElementById('testimonials-rail');
    const testimonialsRows = testimonialsRail ? Array.from(testimonialsRail.querySelectorAll('[data-testimonials-row]')) : [];

    if (testimonialsTrack && testimonialsRail && testimonialsRows.length) {
        const updateTestimonialsPosition = () => {
            if (isCompactViewport()) {
                testimonialsRows.forEach((row) => {
                    row.style.transform = 'translate3d(0, 0, 0)';
                });
                return;
            }

            const rect = testimonialsTrack.getBoundingClientRect();
            const distance = Math.max(testimonialsTrack.offsetHeight - window.innerHeight, 1);
            const leadIn = window.innerHeight * 0.52;
            const rawProgress = clamp((leadIn - rect.top) / (distance + leadIn), 0, 1);
            const progress = 1 - Math.pow(1 - rawProgress, 1.35);

            testimonialsRows.forEach((row) => {
                const maxShift = Math.max(row.scrollWidth - window.innerWidth, 0);
                const startOffset = Math.min(window.innerWidth * 0.14, 190);
                const direction = row.dataset.testimonialsRow === 'reverse' ? -1 : 1;
                const baseTranslate = direction === 1
                    ? startOffset - (progress * (maxShift + startOffset))
                    : -maxShift - startOffset + (progress * (maxShift + startOffset));

                row.style.transform = `translate3d(${baseTranslate.toFixed(1)}px, 0, 0)`;
            });
        };

        updateTestimonialsPosition();
        window.addEventListener('scroll', updateTestimonialsPosition, { passive: true });
        window.addEventListener('resize', updateTestimonialsPosition);
    }

    const productSplitTrack = document.getElementById('product-split-track');
    const productSplitStage = document.getElementById('product-split-stage');

    if (productSplitTrack && productSplitStage) {
        const setProductSplitVars = (spread) => {
            const eased = 1 - Math.pow(1 - spread, 3);
            productSplitStage.style.setProperty('--product-spread', eased.toFixed(4));
            productSplitStage.style.setProperty('--split-left-x', `${(-1.2 - (28 * eased)).toFixed(2)}vw`);
            productSplitStage.style.setProperty('--split-left-y', `${(0.7 + (1.2 * eased)).toFixed(2)}rem`);
            productSplitStage.style.setProperty('--split-left-rotate', `${(-4 - (3 * eased)).toFixed(2)}deg`);
            productSplitStage.style.setProperty('--split-center-x', '0vw');
            productSplitStage.style.setProperty('--split-center-y', `${(-1.8 * eased).toFixed(2)}rem`);
            productSplitStage.style.setProperty('--split-center-rotate', `${(1.5 * eased).toFixed(2)}deg`);
            productSplitStage.style.setProperty('--split-right-x', `${(1.2 + (28 * eased)).toFixed(2)}vw`);
            productSplitStage.style.setProperty('--split-right-y', `${(1.1 + (1.2 * eased)).toFixed(2)}rem`);
            productSplitStage.style.setProperty('--split-right-rotate', `${(4 + (3 * eased)).toFixed(2)}deg`);
        };

        const updateProductSplit = () => {
            if (isCompactViewport()) {
                setProductSplitVars(1);
                return;
            }

            const rect = productSplitTrack.getBoundingClientRect();
            const distance = Math.max(productSplitTrack.offsetHeight - window.innerHeight, 1);
            const leadIn = window.innerHeight * 0.58;
            const rawProgress = clamp((leadIn - rect.top) / (distance + leadIn), 0, 1);
            const spread = clamp(rawProgress / 0.82, 0, 1);
            setProductSplitVars(spread);
        };

        updateProductSplit();
        window.addEventListener('scroll', updateProductSplit, { passive: true });
        window.addEventListener('resize', updateProductSplit);
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
    const revealItems = document.querySelectorAll('.n-card, .dark-accent-card, .hero-h1, .hero-p, .flv-card-min, .metric-strip, .feature-wireframe, .showcase-panel, .page-journey-grid .journey-card, .timeline-card, .footer-shell');
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

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ZERO_RELEASES, initUniversalCartDrawer, isDropsFruit5mlLive } from './zero-products.js';
import { initZeroAnalytics } from './zero-analytics.js';

const PRIMARY_NAV_ITEMS = [
    { label: 'Catalog', href: '/catalog' },
    { label: 'ZFit', href: '/zfit' },
    { label: 'About', href: '/about-zero' },
    { label: 'Social', href: '/zero-social' },
];

const PRODUCT_MENU_ITEMS = [
    { label: 'Syrup', href: '/zero-syrup' },
    { label: 'Drops', href: '/zero-drops' },
    { label: 'Maple Topping', href: '/zero-maple-topping' },
];

const SOCIAL_LINKS = [
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@zerofoods.id.official',
        icon: 'https://cdn.simpleicons.org/youtube/FFFFFF',
    },
    {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@zerofoods.id',
        icon: 'https://cdn.simpleicons.org/tiktok/FFFFFF',
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61573572337033',
        icon: 'https://cdn.simpleicons.org/facebook/FFFFFF',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/zerofoods.id/',
        icon: 'https://cdn.simpleicons.org/instagram/FFFFFF',
    },
];

const SALES_PROOF_ENDPOINT = import.meta.env.VITE_ZERO_SALES_PROOF_ENDPOINT
    || window.ZERO_SALES_PROOF_ENDPOINT
    || 'https://admin.jenanggemi.com/api/zero-sales-proof/';
const SALES_PROOF_CACHE_KEY = 'zero_sales_proof_daily_v1';
const SALES_PROOF_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' });
const SALES_PROOF_META_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

const SEARCH_ITEMS = [
    {
        title: 'ZERO Home',
        category: 'Website',
        href: '/',
        description: 'Start here for ZERO Foods Indonesia, zero sugar sweetness, product lines, reviews, and lab certification.',
        keywords: ['home', 'zero foods', 'zero sugar', 'zero calorie', 'healthy choices', 'sweetness', 'lab certified'],
    },
    {
        title: 'Catalog',
        category: 'Shop',
        href: '/catalog',
        description: 'Compare ZERO Syrup, ZERO Drops, Maple Topping, and the full product lineup.',
        keywords: ['catalog', 'shop', 'products', 'lineup', 'buy', 'order', 'compare'],
    },
    {
        title: 'ZERO Syrup',
        category: 'Product',
        href: '/zero-syrup',
        description: 'Full-size zero-calorie syrup bottles for coffee, refreshers, tea, and daily drinks.',
        keywords: ['syrup', 'drink bottle', 'coffee', 'refreshers', 'fruit flavors', 'plain', 'caramel', 'hazelnut', 'lemonade'],
    },
    {
        title: 'ZERO Syrup in Catalog',
        category: 'Catalog',
        href: '/catalog#catalog-syrup',
        description: 'See the catalog overview for the daily drink bottle.',
        keywords: ['catalog syrup', 'daily drink bottle', 'syrup section'],
    },
    {
        title: 'ZERO Drops',
        category: 'Product',
        href: '/zero-drops',
        description: 'Portable concentrated sweetener drops for sweetness anywhere.',
        keywords: ['drops', 'dropper', 'portable sweetener', 'concentrated', '5ml', '10ml', '30ml', 'coffee drops'],
    },
    {
        title: 'ZERO Drops in Catalog',
        category: 'Catalog',
        href: '/catalog#catalog-drops',
        description: 'See the catalog overview for the portable sweetener format.',
        keywords: ['catalog drops', 'portable sweetener', 'drops section'],
    },
    {
        title: 'ZERO Maple Topping',
        category: 'Product',
        href: '/zero-maple-topping',
        description: 'A thicker zero-calorie maple pour for pancakes, waffles, yogurt bowls, and desserts.',
        keywords: ['maple', 'maple topping', 'topping', 'pancakes', 'waffles', 'yogurt', 'dessert', 'food'],
    },
    {
        title: 'Maple Topping in Catalog',
        category: 'Catalog',
        href: '/catalog#catalog-maple',
        description: 'See the catalog overview for ZERO Maple Topping.',
        keywords: ['catalog maple', 'maple section', 'heavier pour'],
    },
    {
        title: 'ZFit',
        category: 'Wellness',
        href: '/zfit',
        description: 'Functional wellness products including fiber syrup and apple cider vinegar syrup.',
        keywords: ['zfit', 'wellness', 'fiber', 'prebiotic', 'acv', 'apple cider vinegar', 'mother', '250ml', '100ml'],
    },
    {
        title: 'About ZERO',
        category: 'Company',
        href: '/about-zero',
        description: 'Meet ZERO Foods Indonesia and find the team in Sleman, Yogyakarta.',
        keywords: ['about', 'company', 'team', 'yogyakarta', 'sleman', 'address', 'zero foods indonesia'],
    },
    {
        title: 'ZERO Social',
        category: 'Company',
        href: '/zero-social',
        description: 'Watch Bang ZERO test real foods with a CGM and explain blood glucose spikes.',
        keywords: ['social', 'cgm', 'blood sugar', 'glucose', 'food tests', 'spike', 'bang zero', 'chart'],
    },
    {
        title: 'Legal Info',
        category: 'Information',
        href: '/legal-info',
        description: 'Read ZERO legal information, regulatory references, and sweetener positioning.',
        keywords: ['legal', 'fine print', 'regulatory', 'sucralose', 'stevia', 'aspartame', 'safety'],
    },
];

const normalizePath = (href) => {
    const path = href.split('#')[0] || '/';
    return path === '/' ? '/' : path.replace(/\/+$/, '');
};

const isCurrentHref = (href) => normalizePath(href) === normalizePath(window.location.pathname);

const renderAnchor = ({ label, href }) => {
    const current = isCurrentHref(href);
    return `<a href="${href}"${current ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
};

const normalizeSearchText = (value) => value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
}[char]));

const getJakartaDateKey = (date = new Date()) => SALES_PROOF_DATE_FORMATTER.format(date);

const getJakartaYear = () => Number(getJakartaDateKey().slice(0, 4)) || new Date().getFullYear();

const formatSalesProofNumber = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 1000) return '';
    const rounded = Math.floor(number / 1000) * 1000;
    return `${rounded.toLocaleString('en-US')}+`;
};

const readSalesProofCache = () => {
    try {
        const cached = JSON.parse(localStorage.getItem(SALES_PROOF_CACHE_KEY) || 'null');
        return cached && typeof cached === 'object' ? cached : null;
    } catch {
        return null;
    }
};

const writeSalesProofCache = (payload) => {
    try {
        localStorage.setItem(SALES_PROOF_CACHE_KEY, JSON.stringify(payload));
    } catch {
        // The proof counter is optional; storage failures should not affect the page.
    }
};

const buildSalesProofUrl = (year) => {
    const url = new URL(SALES_PROOF_ENDPOINT, window.location.origin);
    url.searchParams.set('year', String(year));
    return url.toString();
};

const renderSalesProof = (payload) => {
    const count = document.querySelector('[data-sales-proof-count]');
    if (!count || !payload) return false;

    const year = Number(payload.year || getJakartaYear());
    const display = String(payload.display || formatSalesProofNumber(payload.rounded_units)).trim();
    if (!display) return false;

    count.textContent = display;
    count.setAttribute('aria-label', `${display} units sold in ${year}`);

    const label = document.querySelector('[data-sales-proof-label]');
    if (label) {
        label.textContent = `Units sold in ${year}`;
    }

    const meta = document.querySelector('[data-sales-proof-meta]');
    const dateSource = payload.updated_at || payload.cache_date;
    const date = dateSource ? new Date(dateSource) : null;
    if (meta && date && !Number.isNaN(date.getTime())) {
        meta.textContent = `As of ${SALES_PROOF_META_DATE_FORMATTER.format(date)}, ZERO leads Indonesia's zero-calorie syrup category.`;
    }

    return true;
};

const initSalesProofCounter = async () => {
    if (!document.querySelector('[data-sales-proof-count]') || !SALES_PROOF_ENDPOINT) return;

    const todayKey = getJakartaDateKey();
    const cached = readSalesProofCache();
    if (cached?.date_key === todayKey && renderSalesProof(cached.payload)) {
        return;
    }

    if (cached?.payload) {
        renderSalesProof(cached.payload);
    }

    try {
        const response = await fetch(buildSalesProofUrl(getJakartaYear()), {
            headers: { Accept: 'application/json' },
            credentials: 'omit',
        });
        if (!response.ok) return;

        const payload = await response.json();
        if (!payload?.ok || !renderSalesProof(payload)) return;

        writeSalesProofCache({
            date_key: todayKey,
            payload,
        });
    } catch {
        // Keep the baked-in fallback if the daily proof endpoint is unavailable.
    }
};

const getSearchScore = (item, query) => {
    const normalizedTitle = normalizeSearchText(item.title);
    const normalizedCategory = normalizeSearchText(item.category);
    const normalizedDescription = normalizeSearchText(item.description);
    const normalizedKeywords = item.keywords.map(normalizeSearchText);
    const searchableText = [
        normalizedTitle,
        normalizedCategory,
        normalizedDescription,
        ...normalizedKeywords,
    ].join(' ');
    const queryTerms = query.split(' ').filter(Boolean);

    if (!queryTerms.every((term) => searchableText.includes(term))) {
        return 0;
    }

    let score = 8;
    queryTerms.forEach((term) => {
        if (normalizedTitle === term) score += 80;
        if (normalizedTitle.startsWith(term)) score += 42;
        if (normalizedTitle.includes(term)) score += 24;
        if (normalizedKeywords.some((keyword) => keyword === term || keyword.startsWith(term))) score += 28;
        if (normalizedCategory === 'product' || normalizedCategory === 'wellness') score += 50;
        if (normalizedCategory.includes(term)) score += 12;
        if (normalizedDescription.includes(term)) score += 6;
    });

    return score;
};

const getSearchResults = (query) => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) return [];

    return SEARCH_ITEMS
        .map((item) => ({ ...item, score: getSearchScore(item, normalizedQuery) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .slice(0, 6);
};

const initSiteSearch = ({ searchPopout, mainSearch }) => {
    if (!searchPopout || !mainSearch) return null;

    const resultPanel = document.createElement('div');
    resultPanel.id = 'search-results';
    resultPanel.className = 'search-results-panel';
    resultPanel.setAttribute('role', 'listbox');
    resultPanel.setAttribute('aria-label', 'Search results');
    resultPanel.setAttribute('aria-live', 'polite');
    searchPopout.appendChild(resultPanel);
    mainSearch.setAttribute('autocomplete', 'off');
    mainSearch.setAttribute('aria-controls', 'search-results');

    let currentResults = [];

    const navigateTo = (href) => {
        window.location.href = href;
    };

    const renderResults = () => {
        currentResults = getSearchResults(mainSearch.value);
        const hasQuery = normalizeSearchText(mainSearch.value).length > 0;
        searchPopout.classList.toggle('search-results-open', hasQuery);

        if (!hasQuery) {
            resultPanel.innerHTML = '';
            return;
        }

        if (!currentResults.length) {
            resultPanel.innerHTML = `
                <div class="search-empty-state" role="status">
                    <strong>No results found</strong>
                    <span>Try syrup, drops, maple, ZFit, about, or legal.</span>
                </div>
            `;
            return;
        }

        resultPanel.innerHTML = currentResults.map((item, index) => `
            <button class="search-result-item" type="button" role="option" data-search-index="${index}">
                <span class="search-result-meta">${escapeHtml(item.category)}</span>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.description)}</span>
            </button>
        `).join('');
    };

    mainSearch.addEventListener('input', renderResults);
    mainSearch.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();
        if (currentResults[0]) {
            navigateTo(currentResults[0].href);
        }
    });

    resultPanel.addEventListener('click', (event) => {
        const resultButton = event.target.closest('[data-search-index]');
        if (!resultButton) return;

        const result = currentResults[Number(resultButton.dataset.searchIndex)];
        if (result) {
            navigateTo(result.href);
        }
    });

    return {
        clear() {
            mainSearch.value = '';
            renderResults();
        },
        renderResults,
    };
};

const initSmoothScroll = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 768px)');

    if (reduceMotion.matches || compactViewport.matches) {
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

const initFooterSocialLinks = () => {
    document.querySelectorAll('[data-footer-socials]').forEach((container) => {
        container.innerHTML = SOCIAL_LINKS.map((social) => `
            <a class="footer-social-link" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${social.label}">
                <img src="${social.icon}" alt="" aria-hidden="true" loading="lazy" width="20" height="20">
                <span class="sr-only">${social.label}</span>
            </a>
        `).join('');
    });
};

const initLegalReveals = () => {
    const revealItems = document.querySelectorAll('.legal-reveal, .legal-comparison-row');

    if (!revealItems.length) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.06,
        rootMargin: '0px 0px 18% 0px',
    });

    revealItems.forEach((item) => observer.observe(item));
};

const initSiteLoader = () => {
    const loaderBar = document.getElementById('site-loader-bar');
    const loaderPercent = document.getElementById('site-loader-percent');
    const compactViewport = window.matchMedia('(max-width: 768px)');
    const startedAt = performance.now();
    let progress = 0;

    const setProgress = (value) => {
        progress = Math.max(progress, Math.min(value, 1));
        document.documentElement.style.setProperty('--site-load-progress', progress.toFixed(3));
        if (loaderPercent) {
            loaderPercent.textContent = `${Math.round(progress * 100)}%`;
        }
        if (loaderBar) {
            loaderBar.style.width = `${progress * 100}%`;
        }
    };

    const waitForCriticalImage = async () => {
        const images = Array.from(document.querySelectorAll(
            'img[fetchpriority="high"], .hero-main-image, .page-hero-image'
        )).slice(0, 1);

        if (!images.length) {
            setProgress(0.78);
            return;
        }

        let complete = 0;
        const update = () => {
            complete += 1;
            setProgress(0.12 + ((complete / images.length) * 0.68));
        };

        await Promise.all(images.map(async (image) => {
            if (image.complete && image.naturalWidth > 0) {
                update();
                return;
            }

            try {
                if (image.decode) {
                    await image.decode();
                } else {
                    await new Promise((resolve) => {
                        image.addEventListener('load', resolve, { once: true });
                        image.addEventListener('error', resolve, { once: true });
                    });
                }
            } catch {
                // A failed optional image should not trap the visitor on the loader.
            }
            update();
        }));
    };

    setProgress(0.08);

    const ready = waitForCriticalImage();
    const releaseFallbackMs = compactViewport.matches ? 450 : 700;
    const minimumVisibleMs = compactViewport.matches ? 80 : 120;
    const releaseFallback = new Promise((resolve) => window.setTimeout(resolve, releaseFallbackMs));

    Promise.race([ready, releaseFallback]).then(() => {
        setProgress(1);
        const elapsed = performance.now() - startedAt;
        window.setTimeout(() => {
            const loader = document.getElementById('site-loader');
            document.body.classList.remove('site-loading');
            document.body.classList.add('site-loaded');
            window.setTimeout(() => {
                if (loader) {
                    loader.style.display = 'none';
                }
            }, 460);
        }, Math.max(0, minimumVisibleMs - elapsed));
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initZeroAnalytics();
    initSiteLoader();
    normalizeNavigation();
    syncScheduledDropsCopy();
    initSalesProofCounter();
    initFooterSocialLinks();
    initLegalReveals();
    const cartApi = initUniversalCartDrawer();
    window.zeroCartApi = cartApi;
    initSmoothScroll();
    const closeOverlay = (element) => {
        if (!element?.classList.contains('active')) return;
        element.classList.remove('expanded');
        setTimeout(() => element.classList.remove('active'), 500);
    };

    const overlay = document.getElementById('coming-soon-overlay');
    if (overlay) {
        overlay.remove();
        document.body.classList.remove('locked');
    }

    // Search and more menu logic
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopout = document.getElementById('search-popout');
    const morphIconBox = document.getElementById('morph-icon-box');
    const mainSearch = document.getElementById('main-search');
    const closeSearch = document.getElementById('close-search');
    const moreTrigger = document.getElementById('more-trigger');
    const moreDropdown = document.getElementById('more-dropdown');
    const siteSearch = initSiteSearch({ searchPopout, mainSearch });

    if (searchTrigger && searchPopout && morphIconBox && mainSearch) {
        searchTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (searchPopout.classList.contains('active')) {
                siteSearch?.clear();
                closeOverlay(searchPopout);
            } else if (isCompactViewport()) {
                searchPopout.classList.add('active', 'expanded');
                mainSearch.focus();
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

    closeSearch?.addEventListener('click', () => {
        siteSearch?.clear();
        closeOverlay(searchPopout);
    });

    closeSearch?.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        siteSearch?.clear();
        closeOverlay(searchPopout);
    });

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
            siteSearch?.clear();
            closeOverlay(searchPopout);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            siteSearch?.clear();
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
        let compactStoryApplied = false;

        const applyStoryVisuals = () => {
            compactStoryApplied = false;
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
                if (compactStoryApplied) {
                    return;
                }

                compactStoryApplied = true;
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

    if (productLinesSection && !isCompactViewport()) {
        const pageBase = [255, 255, 255];
        const grayBase = [218, 222, 222];
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

    const catalogRows = document.querySelectorAll('.catalog-product-row');
    if (catalogRows.length) {
        const catalogRowObserver = new IntersectionObserver((entries) => {
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

        catalogRows.forEach((row) => catalogRowObserver.observe(row));
    }

    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsRail = document.getElementById('testimonials-rail');
    let testimonialsRows = testimonialsRail ? Array.from(testimonialsRail.querySelectorAll('[data-testimonials-row]')) : [];

    if (testimonialsTrack && testimonialsRail && testimonialsRows.length) {
        let compactTestimonials = isCompactViewport();

        if (compactTestimonials) {
            testimonialsRows.forEach((row) => {
                row.style.transform = 'none';
            });
        } else {

            testimonialsRows.forEach((row, index) => {
                row.dataset.testimonialsRow = index % 2 === 0 ? 'forward' : 'reverse';
            });

            const loopRows = testimonialsRows.map((row) => {
                const originalCards = Array.from(row.children);
                const clonePasses = 2;

                for (let pass = 0; pass < clonePasses; pass += 1) {
                    originalCards.forEach((card) => {
                        const clone = card.cloneNode(true);
                        clone.setAttribute('aria-hidden', 'true');
                        row.appendChild(clone);
                    });
                }

                return {
                    row,
                    originalCount: originalCards.length,
                    cycleWidth: 0,
                };
            });
            let testimonialFrame = 0;

        const measureTestimonials = () => {
            loopRows.forEach((loop) => {
                const cards = Array.from(loop.row.children).slice(0, loop.originalCount);
                const first = cards[0];
                const last = cards[cards.length - 1];
                const gap = parseFloat(window.getComputedStyle(loop.row).columnGap) || 0;

                loop.cycleWidth = first && last
                    ? (last.offsetLeft + last.offsetWidth - first.offsetLeft + gap)
                    : 1;
            });
        };

        const updateTestimonialsPosition = () => {
            testimonialFrame = 0;

            const rect = testimonialsTrack.getBoundingClientRect();
            const leadIn = window.innerHeight * 0.52;
            const scrollTravel = Math.max(0, leadIn - rect.top);

            loopRows.forEach((loop) => {
                const cycleWidth = Math.max(loop.cycleWidth, 1);
                const direction = loop.row.dataset.testimonialsRow === 'reverse' ? -1 : 1;
                const startOffset = compactTestimonials ? window.innerWidth * 0.04 : Math.min(window.innerWidth * 0.14, 190);
                let baseTranslate;

                if (compactTestimonials) {
                    const trackDistance = Math.max(testimonialsTrack.offsetHeight - window.innerHeight * 0.35, 1);
                    const progress = clamp(scrollTravel / trackDistance, 0, 1);
                    const rowOverflow = Math.max(cycleWidth - window.innerWidth + (startOffset * 2), 0);
                    const travel = Math.min(rowOverflow, window.innerWidth * 0.82) * progress;

                    baseTranslate = direction === 1
                        ? startOffset - travel
                        : startOffset - rowOverflow + travel;
                } else {
                    const travel = (scrollTravel * 1.95) % cycleWidth;
                    baseTranslate = direction === 1
                        ? startOffset - travel
                        : -cycleWidth - startOffset + travel;
                }

                loop.row.style.transform = `translate3d(${baseTranslate.toFixed(1)}px, 0, 0)`;
            });
        };

        let testimonialsActive = !compactTestimonials;
            const requestTestimonialsFrame = () => {
                if (compactTestimonials && !testimonialsActive) return;
                if (testimonialFrame) return;
                testimonialFrame = window.requestAnimationFrame(updateTestimonialsPosition);
            };

            measureTestimonials();
            updateTestimonialsPosition();
            window.addEventListener('scroll', requestTestimonialsFrame, { passive: true });
            window.addEventListener('resize', () => {
                compactTestimonials = isCompactViewport();
                testimonialsActive = !compactTestimonials || testimonialsActive;
                measureTestimonials();
                requestTestimonialsFrame();
            });
        }
    }

    const productSplitTrack = document.getElementById('product-split-track');
    const productSplitStage = document.getElementById('product-split-stage');

    if (productSplitTrack && productSplitStage && !isCompactViewport()) {
        const setProductSplitVars = (spread) => {
            const eased = 1 - Math.pow(1 - spread, 3);
            const firstCard = productSplitStage.querySelector('.product-split-card');
            const cardWidth = firstCard?.offsetWidth || 350;
            const startOffset = clamp(cardWidth * 0.18, 48, 72);
            const finalOffset = clamp(cardWidth + 32, 310, 410);
            const sideOffset = startOffset + ((finalOffset - startOffset) * eased);
            productSplitStage.style.setProperty('--product-spread', eased.toFixed(4));
            productSplitStage.style.setProperty('--split-left-x', `${(-sideOffset).toFixed(1)}px`);
            productSplitStage.style.setProperty('--split-left-y', `${(0.7 + (0.9 * eased)).toFixed(2)}rem`);
            productSplitStage.style.setProperty('--split-left-rotate', `${(-4 - (1.8 * eased)).toFixed(2)}deg`);
            productSplitStage.style.setProperty('--split-center-x', '0px');
            productSplitStage.style.setProperty('--split-center-y', `${(-1.2 * eased).toFixed(2)}rem`);
            productSplitStage.style.setProperty('--split-center-rotate', `${(0.95 * eased).toFixed(2)}deg`);
            productSplitStage.style.setProperty('--split-right-x', `${sideOffset.toFixed(1)}px`);
            productSplitStage.style.setProperty('--split-right-y', `${(1.1 + (0.9 * eased)).toFixed(2)}rem`);
            productSplitStage.style.setProperty('--split-right-rotate', `${(4 + (1.8 * eased)).toFixed(2)}deg`);
        };

        const updateProductSplit = () => {
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
    if (parallaxLayers.length && !isCompactViewport()) {
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
        if (isCompactViewport()) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = '';
            return;
        }

        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });
});

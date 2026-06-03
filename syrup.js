import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

const SYRUP_IMAGE_MODE = 'carousel';

const SYRUP_CAROUSEL_IMAGES = [
    {
        src: '/ZERO Media/ZERO Syrup Images/Carousel/Syrup Carousel 1.jpg',
        alt: 'ZERO Syrup product lineup',
    },
    {
        src: '/ZERO Media/ZERO Syrup Images/Carousel/Syrup Carousel 2.jpg',
        alt: 'ZERO Syrup product bottles',
    },
    {
        src: '/ZERO Media/ZERO Syrup Images/Carousel/Syrup Carousel 3.jpg',
        alt: 'ZERO Syrup bottle selection',
    },
];

const withSyrupCarouselImages = (product) => {
    if (SYRUP_IMAGE_MODE !== 'carousel') return product;
    const firstCarouselImage = SYRUP_CAROUSEL_IMAGES[0]?.src;
    if (!firstCarouselImage) return product;

    return {
        ...product,
        heroImage: firstCarouselImage,
        options: product.options.map((option) => ({
            ...option,
            image: firstCarouselImage,
        })),
    };
};

const initSyrupImageCarousel = () => {
    if (SYRUP_IMAGE_MODE !== 'carousel') return;

    const shell = document.querySelector('.syrup-visual-shell');
    const selectedImage = document.getElementById('selected-flavor-image');
    if (!shell || !selectedImage || SYRUP_CAROUSEL_IMAGES.length < 2) return;

    let activeIndex = 0;
    let position = 1;
    let targetPosition = 1;
    let velocity = 0;
    let animationFrameId = null;
    let autoplayId = null;
    const carouselSlides = [
        SYRUP_CAROUSEL_IMAGES[SYRUP_CAROUSEL_IMAGES.length - 1],
        ...SYRUP_CAROUSEL_IMAGES,
        SYRUP_CAROUSEL_IMAGES[0],
    ];

    const updateTrack = () => {
        shell.style.setProperty('--syrup-carousel-position', position);
    };

    const updateActiveSlide = () => {
        shell.querySelectorAll('.syrup-carousel-slide').forEach((slide, index) => {
            const realIndex = Number(slide.dataset.realIndex);
            const isActive = index === Math.round(position) && realIndex === activeIndex;
            slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
    };

    const snapAfterLoop = () => {
        if (targetPosition === carouselSlides.length - 1) {
            position = 1;
            targetPosition = 1;
        } else if (targetPosition === 0) {
            position = SYRUP_CAROUSEL_IMAGES.length;
            targetPosition = SYRUP_CAROUSEL_IMAGES.length;
        }

        velocity = 0;
        updateTrack();
        updateActiveSlide();
    };

    const animate = () => {
        const distance = targetPosition - position;
        velocity += distance * 0.2;
        velocity *= 0.72;
        position += velocity;
        updateTrack();

        if (Math.abs(distance) < 0.003 && Math.abs(velocity) < 0.003) {
            position = targetPosition;
            animationFrameId = null;
            snapAfterLoop();
            return;
        }

        animationFrameId = window.requestAnimationFrame(animate);
    };

    const setActiveIndex = (offset) => {
        if (targetPosition === carouselSlides.length - 1) {
            position = 1;
            targetPosition = 1;
        } else if (targetPosition === 0) {
            position = SYRUP_CAROUSEL_IMAGES.length;
            targetPosition = SYRUP_CAROUSEL_IMAGES.length;
        }

        activeIndex = (activeIndex + offset + SYRUP_CAROUSEL_IMAGES.length) % SYRUP_CAROUSEL_IMAGES.length;
        targetPosition += offset;
        velocity += offset * 0.12;
        updateActiveSlide();

        if (!animationFrameId) {
            animationFrameId = window.requestAnimationFrame(animate);
        }
    };

    const startAutoplay = () => {
        window.clearInterval(autoplayId);
        autoplayId = window.setInterval(() => {
            setActiveIndex(1);
        }, 3200);
    };

    const moveCarousel = (offset) => {
        setActiveIndex(offset);
        startAutoplay();
    };

    shell.classList.add('syrup-carousel-shell');
    selectedImage.classList.add('syrup-carousel-source-image');
    selectedImage.setAttribute('aria-hidden', 'true');
    shell.insertAdjacentHTML('beforeend', `
        <div class="syrup-carousel-track" aria-live="polite">
            ${carouselSlides.map((image, index) => `
                <div class="syrup-carousel-slide" data-real-index="${(index + SYRUP_CAROUSEL_IMAGES.length - 1) % SYRUP_CAROUSEL_IMAGES.length}" aria-hidden="${index === 1 ? 'false' : 'true'}">
                    <img class="syrup-carousel-image" src="${image.src}" alt="${image.alt}">
                </div>
            `).join('')}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous syrup image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next syrup image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
        </button>
    `);

    shell.querySelector('.syrup-carousel-prev')?.addEventListener('click', () => moveCarousel(-1));
    shell.querySelector('.syrup-carousel-next')?.addEventListener('click', () => moveCarousel(1));

    updateTrack();
    startAutoplay();
};

const initProofNumberReels = () => {
    const numbers = Array.from(document.querySelectorAll('[data-proof-number]'));
    if (!numbers.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const buildNumberSequence = (target, direction) => {
        if (direction === 'down') {
            const start = Math.max(9, target);
            return Array.from({ length: start - target + 1 }, (_, index) => start - index);
        }
        return Array.from({ length: target + 1 }, (_, index) => index);
    };

    const rollNumber = (numberElement) => {
        if (numberElement.dataset.proofReelReady === 'true') return;
        numberElement.dataset.proofReelReady = 'true';
        const targetNumber = numberElement.dataset.proofNumber || numberElement.textContent.trim();
        const direction = numberElement.dataset.proofDirection || 'up';
        const targetValue = Number(targetNumber);
        numberElement.setAttribute('aria-label', targetNumber);

        if (prefersReducedMotion || !Number.isFinite(targetValue)) {
            numberElement.textContent = targetNumber;
            return;
        }

        const sequence = buildNumberSequence(targetValue, direction);
        let index = 0;
        numberElement.textContent = sequence[index];
        numberElement.classList.add('is-rolling');

        const tick = window.setInterval(() => {
            index += 1;
            if (index >= sequence.length) {
                window.clearInterval(tick);
                numberElement.textContent = targetNumber;
                numberElement.classList.remove('is-rolling');
                return;
            }
            numberElement.textContent = sequence[index];
        }, direction === 'down' ? 76 : 58);
    };

    if (!('IntersectionObserver' in window)) {
        numbers.forEach(rollNumber);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            rollNumber(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.45 });

    numbers.forEach((numberElement) => observer.observe(numberElement));
};

document.addEventListener('DOMContentLoaded', async () => {
    const cartApi = window.zeroCartApi;
    const catalog = await loadZeroCatalog();
    const product = withSyrupCarouselImages(applyCatalogToProduct(ZERO_PRODUCTS.syrup, catalog));

    initProductPage({
        product,
        dom: {
            optionGridId: 'syrup-flavor-grid',
            sizeSelectorId: 'syrup-size-selector',
            selectedNameId: 'selected-flavor-name',
            selectedDescriptionId: 'selected-flavor-description',
            selectedImageId: 'selected-flavor-image',
            selectedGroupId: 'selected-flavor-group',
            selectedPriceId: 'selected-syrup-price',
            selectedSizeNoteId: 'selected-size-note',
            addButtonId: 'add-syrup-to-cart',
        },
        defaultOptionId: 'plain',
        defaultSizeId: '250ml',
        onAdd: (item) => {
            cartApi?.store.addItem(item);
            cartApi?.openDrawer();
        },
    });

    initSyrupImageCarousel();
    initProofNumberReels();
});

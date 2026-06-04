import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

const MAPLE_CAROUSEL_IMAGES = [
    {
        src: '/ZERO Media/ZERO Maple Topping Images/Carousel/Maple Topping Carousel 1.jpg',
        alt: 'ZERO Maple Topping product image',
    },
    {
        src: '/ZERO Media/ZERO Maple Topping Images/Carousel/Maple Topping Carousel 2.jpg',
        alt: 'ZERO Maple Topping pour image',
    },
    {
        src: '/ZERO Media/ZERO Maple Topping Images/Carousel/Maple Topping Carousel 3.jpg',
        alt: 'ZERO Maple Topping online product image',
    },
];

const withMapleCarouselImages = (product) => {
    const firstCarouselImage = MAPLE_CAROUSEL_IMAGES[0]?.src;
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

const initMapleImageCarousel = () => {
    const shell = document.querySelector('.syrup-visual-shell');
    const selectedImage = document.getElementById('selected-maple-image');
    if (!shell || !selectedImage || MAPLE_CAROUSEL_IMAGES.length < 2) return;

    let activeIndex = 0;
    let position = 1;
    let targetPosition = 1;
    let velocity = 0;
    let animationFrameId = null;
    let autoplayId = null;
    const carouselSlides = [
        MAPLE_CAROUSEL_IMAGES[MAPLE_CAROUSEL_IMAGES.length - 1],
        ...MAPLE_CAROUSEL_IMAGES,
        MAPLE_CAROUSEL_IMAGES[0],
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
            position = MAPLE_CAROUSEL_IMAGES.length;
            targetPosition = MAPLE_CAROUSEL_IMAGES.length;
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
            position = MAPLE_CAROUSEL_IMAGES.length;
            targetPosition = MAPLE_CAROUSEL_IMAGES.length;
        }

        activeIndex = (activeIndex + offset + MAPLE_CAROUSEL_IMAGES.length) % MAPLE_CAROUSEL_IMAGES.length;
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
                <div class="syrup-carousel-slide" data-real-index="${(index + MAPLE_CAROUSEL_IMAGES.length - 1) % MAPLE_CAROUSEL_IMAGES.length}" aria-hidden="${index === 1 ? 'false' : 'true'}">
                    <img class="syrup-carousel-image" src="${image.src}" alt="${image.alt}">
                </div>
            `).join('')}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous maple topping image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next maple topping image">
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

document.addEventListener('DOMContentLoaded', async () => {
    const cartApi = window.zeroCartApi;
    const catalog = await loadZeroCatalog();
    const product = withMapleCarouselImages(applyCatalogToProduct(ZERO_PRODUCTS.mapleTopping, catalog));

    initProductPage({
        product,
        dom: {
            optionGridId: 'maple-flavor-grid',
            sizeSelectorId: 'maple-size-selector',
            selectedNameId: 'selected-maple-name',
            selectedDescriptionId: 'selected-maple-description',
            selectedImageId: 'selected-maple-image',
            selectedGroupId: 'selected-maple-group',
            selectedPriceId: 'selected-maple-price',
            selectedSizeNoteId: 'selected-maple-size-note',
            addButtonId: 'add-maple-to-cart',
        },
        defaultOptionId: 'classic-maple',
        defaultSizeId: '550ml',
        onAdd: (item) => {
            cartApi?.store.addItem(item);
            cartApi?.openDrawer();
        },
    });

    initMapleImageCarousel();
});

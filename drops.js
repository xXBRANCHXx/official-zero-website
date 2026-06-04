import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

const DROPS_CAROUSEL_IMAGES = [
    {
        src: '/ZERO Media/ZERO Drops Images/Carousel/ZERO Drops Carousel 1.jpg',
        alt: 'ZERO Drops product image',
    },
    {
        src: '/ZERO Media/ZERO Drops Images/Carousel/ZERO Drops Carousel 2.jpg',
        alt: 'ZERO Drops flavor drops image',
    },
    {
        src: '/ZERO Media/ZERO Drops Images/Carousel/ZERO Drops Carousel 3.jpg',
        alt: 'ZERO Drops compact product page image',
    },
];

const withDropsCarouselImages = (product) => {
    const firstCarouselImage = DROPS_CAROUSEL_IMAGES[0]?.src;
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

const initDropsImageCarousel = () => {
    const shell = document.querySelector('.syrup-visual-shell');
    const selectedImage = document.getElementById('selected-drops-image');
    if (!shell || !selectedImage || DROPS_CAROUSEL_IMAGES.length < 2) return;

    let activeIndex = 0;
    let position = 1;
    let targetPosition = 1;
    let velocity = 0;
    let animationFrameId = null;
    let autoplayId = null;
    const carouselSlides = [
        DROPS_CAROUSEL_IMAGES[DROPS_CAROUSEL_IMAGES.length - 1],
        ...DROPS_CAROUSEL_IMAGES,
        DROPS_CAROUSEL_IMAGES[0],
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
            position = DROPS_CAROUSEL_IMAGES.length;
            targetPosition = DROPS_CAROUSEL_IMAGES.length;
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
            position = DROPS_CAROUSEL_IMAGES.length;
            targetPosition = DROPS_CAROUSEL_IMAGES.length;
        }

        activeIndex = (activeIndex + offset + DROPS_CAROUSEL_IMAGES.length) % DROPS_CAROUSEL_IMAGES.length;
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
                <div class="syrup-carousel-slide" data-real-index="${(index + DROPS_CAROUSEL_IMAGES.length - 1) % DROPS_CAROUSEL_IMAGES.length}" aria-hidden="${index === 1 ? 'false' : 'true'}">
                    <img class="syrup-carousel-image" src="${image.src}" alt="${image.alt}">
                </div>
            `).join('')}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous drops image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next drops image">
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
    const product = withDropsCarouselImages(applyCatalogToProduct(ZERO_PRODUCTS.drops, catalog));

    initProductPage({
        product,
        dom: {
            optionGridId: 'drops-flavor-grid',
            sizeSelectorId: 'drops-size-selector',
            selectedNameId: 'selected-drops-name',
            selectedDescriptionId: 'selected-drops-description',
            selectedImageId: 'selected-drops-image',
            selectedGroupId: 'selected-drops-group',
            selectedPriceId: 'selected-drops-price',
            selectedSizeNoteId: 'selected-drops-size-note',
            addButtonId: 'add-drops-to-cart',
        },
        defaultOptionId: 'plain',
        defaultSizeId: '30ml',
        onAdd: (item) => {
            cartApi?.store.addItem(item);
            cartApi?.openDrawer();
        },
    });

    initDropsImageCarousel();
});

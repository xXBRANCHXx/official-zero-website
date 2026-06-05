import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

const ZFIT_CAROUSELS = {
    fiber: {
        label: 'fiber syrup',
        images: [
            { src: '/ZERO Media/ZFIT/Fiber Syrup Carousel/Fiber Syrup 1.jpg', alt: 'ZFIT Fiber Syrup product image' },
            { src: '/ZERO Media/ZFIT/Fiber Syrup Carousel/Fiber Syrup 2.jpg', alt: 'ZFIT Fiber Syrup online product image' },
            { src: '/ZERO Media/ZFIT/Fiber Syrup Carousel/Fiber Syrup 3.jpg', alt: 'ZFIT Fiber Syrup shop image' },
        ],
    },
    acvs: {
        label: 'ACVS',
        images: [
            { src: '/ZERO Media/ZFIT/ACVS Carousel/ACVS 1.jpg', alt: 'ZFIT ACVS product image' },
            { src: '/ZERO Media/ZFIT/ACVS Carousel/ACVS 2.jpg', alt: 'ZFIT ACVS bottle image' },
            { src: '/ZERO Media/ZFIT/ACVS Carousel/ACVS 3.jpg', alt: 'ZFIT ACVS online product image' },
            { src: '/ZERO Media/ZFIT/ACVS Carousel/ACVS 4.jpg', alt: 'ZFIT ACVS shop image' },
        ],
    },
};

const withCarouselImages = (product, carousel) => {
    const firstImage = carousel.images[0]?.src;
    if (!firstImage) return product;

    return {
        ...product,
        heroImage: firstImage,
        options: product.options.map((option) => ({
            ...option,
            image: firstImage,
        })),
    };
};

const initZfitImageCarousel = (key) => {
    const carousel = ZFIT_CAROUSELS[key];
    const shell = document.querySelector(`[data-zfit-carousel="${key}"]`);
    const selectedImage = shell?.querySelector('img');
    if (!carousel || !shell || !selectedImage || carousel.images.length < 2) return;

    let activeIndex = 0;
    let position = 1;
    let targetPosition = 1;
    let velocity = 0;
    let animationFrameId = null;
    let autoplayId = null;
    const carouselSlides = [
        carousel.images[carousel.images.length - 1],
        ...carousel.images,
        carousel.images[0],
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
            position = carousel.images.length;
            targetPosition = carousel.images.length;
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
            position = carousel.images.length;
            targetPosition = carousel.images.length;
        }

        activeIndex = (activeIndex + offset + carousel.images.length) % carousel.images.length;
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
                <div class="syrup-carousel-slide" data-real-index="${(index + carousel.images.length - 1) % carousel.images.length}" aria-hidden="${index === 1 ? 'false' : 'true'}">
                    <img class="syrup-carousel-image" src="${image.src}" alt="${image.alt}">
                </div>
            `).join('')}
        </div>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-prev" aria-label="Previous ${carousel.label} image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
        </button>
        <button type="button" class="syrup-carousel-arrow syrup-carousel-next" aria-label="Next ${carousel.label} image">
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
    const fiberProduct = withCarouselImages(applyCatalogToProduct(ZERO_PRODUCTS.zfitFiberSyrup, catalog), ZFIT_CAROUSELS.fiber);
    const acvsProduct = withCarouselImages(applyCatalogToProduct(ZERO_PRODUCTS.zfitAcvs, catalog), ZFIT_CAROUSELS.acvs);

    initProductPage({
        product: fiberProduct,
        dom: {
            optionGridId: 'fiber-flavor-grid',
            sizeSelectorId: 'fiber-size-selector',
            selectedNameId: 'selected-fiber-name',
            selectedDescriptionId: 'selected-fiber-description',
            selectedImageId: 'selected-fiber-image',
            selectedGroupId: 'selected-fiber-group',
            selectedPriceId: 'selected-fiber-price',
            selectedSizeNoteId: 'selected-fiber-size-note',
            addButtonId: 'add-fiber-to-cart',
        },
        defaultOptionId: 'unflavored',
        defaultSizeId: '250ml',
        onAdd: (item) => {
            cartApi?.store.addItem(item);
            cartApi?.openDrawer();
        },
    });

    initProductPage({
        product: acvsProduct,
        dom: {
            optionGridId: 'acvs-flavor-grid',
            sizeSelectorId: 'acvs-size-selector',
            selectedNameId: 'selected-acvs-name',
            selectedDescriptionId: 'selected-acvs-description',
            selectedImageId: 'selected-acvs-image',
            selectedGroupId: 'selected-acvs-group',
            selectedPriceId: 'selected-acvs-price',
            selectedSizeNoteId: 'selected-acvs-size-note',
            addButtonId: 'add-acvs-to-cart',
        },
        defaultOptionId: 'apple-cider-vinegar-syrup',
        defaultSizeId: '250ml',
        onAdd: (item) => {
            cartApi?.store.addItem(item);
            cartApi?.openDrawer();
        },
    });

    initZfitImageCarousel('fiber');
    initZfitImageCarousel('acvs');
});

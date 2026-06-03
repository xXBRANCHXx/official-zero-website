import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

const SYRUP_IMAGE_MODE = 'flavor'; // Change to 'carousel' for Plan B.

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
    const optionGrid = document.getElementById('syrup-flavor-grid');
    if (!shell || !selectedImage || SYRUP_CAROUSEL_IMAGES.length < 2) return;

    let activeIndex = 0;
    let autoplayId = null;

    const renderImage = () => {
        const image = SYRUP_CAROUSEL_IMAGES[activeIndex];
        selectedImage.src = image.src;
        selectedImage.alt = image.alt;
    };

    const setActiveIndex = (nextIndex) => {
        activeIndex = (nextIndex + SYRUP_CAROUSEL_IMAGES.length) % SYRUP_CAROUSEL_IMAGES.length;
        renderImage();
    };

    const startAutoplay = () => {
        window.clearInterval(autoplayId);
        autoplayId = window.setInterval(() => {
            setActiveIndex(activeIndex + 1);
        }, 3200);
    };

    const moveCarousel = (offset) => {
        setActiveIndex(activeIndex + offset);
        startAutoplay();
    };

    shell.classList.add('syrup-carousel-shell');
    shell.insertAdjacentHTML('beforeend', `
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
    optionGrid?.addEventListener('click', () => {
        window.requestAnimationFrame(renderImage);
    });

    renderImage();
    startAutoplay();
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
});

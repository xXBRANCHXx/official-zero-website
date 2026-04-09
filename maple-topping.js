import { ZERO_PRODUCTS, initProductPage } from './zero-products.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartApi = window.zeroCartApi;

    initProductPage({
        product: ZERO_PRODUCTS.mapleTopping,
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
});

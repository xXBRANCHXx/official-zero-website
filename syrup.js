import { ZERO_PRODUCTS, initProductPage } from './zero-products.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartApi = window.zeroCartApi;

    initProductPage({
        product: ZERO_PRODUCTS.syrup,
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
});

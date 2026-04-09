import { ZERO_PRODUCTS, initProductPage } from './zero-products.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartApi = window.zeroCartApi;

    initProductPage({
        product: ZERO_PRODUCTS.drops,
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
});

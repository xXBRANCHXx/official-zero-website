import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cartApi = window.zeroCartApi;
    const catalog = await loadZeroCatalog();
    const product = applyCatalogToProduct(ZERO_PRODUCTS.mapleTopping, catalog);

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
});

import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cartApi = window.zeroCartApi;
    const catalog = await loadZeroCatalog();
    const product = applyCatalogToProduct(ZERO_PRODUCTS.syrup, catalog);

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
});

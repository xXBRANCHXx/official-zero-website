import { ZERO_PRODUCTS, applyCatalogToProduct, initProductPage, loadZeroCatalog } from './zero-products.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cartApi = window.zeroCartApi;
    const catalog = await loadZeroCatalog();
    const product = applyCatalogToProduct(ZERO_PRODUCTS.drops, catalog);

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
});

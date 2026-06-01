import { ZERO_PRODUCTS, initProductPage } from './zero-products.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartApi = window.zeroCartApi;
    const modal = document.getElementById('quick-add-modal');
    const container = document.getElementById('quick-add-container');
    const closeBtn = document.querySelector('.quick-add-close');
    const backdrop = document.querySelector('.quick-add-backdrop');

    if (!modal) return;

    const closeModal = () => {
        modal.classList.remove('open');
        setTimeout(() => {
            container.innerHTML = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.querySelectorAll('.quick-add-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const productKey = btn.dataset.product;
            const product = ZERO_PRODUCTS[productKey];
            if (!product) return;

            // Render template
            container.innerHTML = `
                <div class="syrup-configurator">
                    <div class="showcase-panel">
                        <div class="showcase-header">
                            <div>
                                <span class="showcase-badge" id="qa-group"></span>
                                <h3 id="qa-name"></h3>
                            </div>
                            <strong id="qa-price"></strong>
                        </div>
                        <p class="syrup-selection-copy" id="qa-desc"></p>
                        <div class="syrup-visual-shell">
                            <img id="qa-img" src="" alt="">
                        </div>
                        <div class="syrup-size-summary" id="qa-size-note"></div>
                    </div>

                    <div class="feature-wireframe syrup-chooser-panel">
                        <div>
                            <strong class="syrup-panel-label">Choose A Flavor</strong>
                            <div id="qa-flavor-grid" class="syrup-flavor-grid"></div>
                        </div>
                        <div>
                            <strong class="syrup-panel-label">Choose A Size</strong>
                            <div id="qa-size-selector" class="syrup-size-selector"></div>
                        </div>
                        <div class="btn-cluster">
                            <button type="button" id="qa-add-btn" class="n-btn primary">Add To Cart</button>
                        </div>
                    </div>
                </div>
            `;

            initProductPage({
                product: product,
                dom: {
                    optionGridId: 'qa-flavor-grid',
                    sizeSelectorId: 'qa-size-selector',
                    selectedNameId: 'qa-name',
                    selectedDescriptionId: 'qa-desc',
                    selectedImageId: 'qa-img',
                    selectedGroupId: 'qa-group',
                    selectedPriceId: 'qa-price',
                    selectedSizeNoteId: 'qa-size-note',
                    addButtonId: 'qa-add-btn',
                },
                defaultOptionId: product.options[0].id,
                defaultSizeId: product.sizes[0].id,
                onAdd: (item) => {
                    cartApi?.store.addItem(item);
                    // Add a visual feedback to the button
                    const addBtn = document.getElementById('qa-add-btn');
                    if (addBtn) {
                        const originalText = addBtn.textContent;
                        addBtn.textContent = 'Added!';
                        setTimeout(() => { addBtn.textContent = originalText; }, 1000);
                    }
                },
            });

            modal.classList.add('open');
        });
    });
});

import { ZERO_PRODUCTS, initProductPage } from './zero-products.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartApi = window.zeroCartApi;
    const modal = document.getElementById('quick-add-modal');
    const container = document.getElementById('quick-add-container');
    const closeBtn = modal?.querySelector('.quick-add-close');
    const backdrop = modal?.querySelector('.quick-add-backdrop');
    let closeTimer = null;

    if (!modal) return;

    const closeModal = () => {
        if (!modal.classList.contains('open')) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('quick-add-open', 'locked');
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
            container.innerHTML = '';
        }, 300);
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });

    document.querySelectorAll('.quick-add-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const productKey = btn.dataset.product;
            const product = ZERO_PRODUCTS[productKey];
            if (!product) return;

            window.clearTimeout(closeTimer);
            container.innerHTML = `
                <div class="quick-add-configurator">
                    <div class="quick-add-summary">
                        <div class="showcase-header quick-add-heading">
                            <div>
                                <span class="showcase-badge" id="qa-group"></span>
                                <h3>${product.name}</h3>
                            </div>
                            <strong id="qa-price"></strong>
                        </div>
                        <div class="quick-add-selected">
                            <span>Selected Variant</span>
                            <strong id="qa-name"></strong>
                            <p class="syrup-selection-copy" id="qa-desc"></p>
                        </div>
                        <div class="syrup-size-summary" id="qa-size-note"></div>
                    </div>

                    <div class="quick-add-options syrup-chooser-panel">
                        <div>
                            <strong class="syrup-panel-label">${product.options.length > 1 ? 'Choose A Variant' : 'Variant'}</strong>
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
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('quick-add-open', 'locked');
        });
    });
});

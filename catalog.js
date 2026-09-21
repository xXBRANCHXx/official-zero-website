import { ZERO_PRODUCTS, applyCatalogToProduct, catalogSelectionPrice, formatPrice, initProductPage, loadZeroCatalog } from './zero-products.js';
import './catalog.css';
const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

document.addEventListener('DOMContentLoaded', async () => {
    const modal = document.getElementById('quick-add-modal');
    const container = document.getElementById('quick-add-container');
    if (!modal || !container) return;
    let feedbackTimer;
    modal.querySelector('.quick-add-close')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
    modal.addEventListener('close', () => {
        document.body.classList.remove('quick-add-open', 'locked');
        window.clearTimeout(feedbackTimer);
    });
    const triggers = [...document.querySelectorAll('.quick-add-trigger')];
    triggers.forEach(button => { button.disabled = true; });
    const catalog = await loadZeroCatalog();
    if (Array.isArray(catalog)) {
        const schemaNode = document.querySelector('script[type="application/ld+json"]');
        if (schemaNode) {
            const schema = JSON.parse(schemaNode.textContent);
            for (const definition of Object.values(ZERO_PRODUCTS)) {
                const rows = catalog.filter(row => row.product_slug === definition.slug && row.status !== 'inactive');
                const node = schema['@graph']?.find(entry => entry['@type'] === 'Product' && entry.name === definition.name);
                if (node?.offers && rows.length) {
                    const prices = rows.map(row => catalogSelectionPrice(row));
                    Object.assign(node.offers, {lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: rows.length});
                }
            }
            schemaNode.textContent = JSON.stringify(schema);
        }
    }
    triggers.forEach(button => {
        const definition = ZERO_PRODUCTS[button.dataset.product];
        if (!definition) return;
        const product = applyCatalogToProduct(definition, catalog);
        const card = button.closest('[data-catalog-product]');
        const rows = (catalog || []).filter(row => row.product_slug === product.slug && row.status !== 'inactive');
        const prices = rows.map(row => catalogSelectionPrice(row));
        if (card) {
            const price = card.querySelector('[data-catalog-price]');
            const sizes = card.querySelector('[data-catalog-sizes]');
            const flavors = card.querySelector('[data-catalog-flavors]');
            if (price) price.textContent = prices.length ? `${formatPrice(Math.min(...prices))}${Math.min(...prices)!==Math.max(...prices)?` – ${formatPrice(Math.max(...prices))}`:''}` : 'Currently unavailable';
            if (sizes) sizes.textContent = product.sizes.map(size => size.label).join(' · ');
            if (flavors) flavors.textContent = `${product.options.length} flavors`;
        }
        button.disabled = product.catalogUnavailable || !product.options.length;
        if (button.disabled) {
            const note = document.createElement('p');
            note.className = 'catalog-availability'; note.setAttribute('role','status');
            note.textContent = product.catalogUnavailable ? 'Unable to load current prices. Please reload and try again.' : 'No sizes are currently available.';
            button.after(note);
        }
        button.addEventListener('click', () => {
            container.innerHTML = `
                <div class="quick-add-scroll" data-lenis-prevent>
                    <div class="quick-add-configurator">
                        <div class="quick-add-summary">
                            <div class="quick-add-heading"><span class="showcase-badge" id="qa-group"></span><h2 id="quick-add-title">${escape(product.name)}</h2><div class="quick-add-selected"><span>Selected Variant</span><strong id="qa-name"></strong></div></div>
                        </div>
                        <div class="quick-add-options syrup-chooser-panel">
                            <div><strong class="syrup-panel-label">${product.options.length > 1 ? 'Choose A Variant' : 'Variant'}</strong><div id="qa-flavor-grid" class="syrup-flavor-grid"></div></div>
                            <div><strong class="syrup-panel-label">Choose A Size</strong><div id="qa-size-selector" class="syrup-size-selector"></div></div>
                            <div class="syrup-size-summary" id="qa-size-note" role="status"></div>
                            <details class="quick-add-about"><summary>Why choose it</summary><p class="syrup-selection-copy" id="qa-desc"></p></details>
                        </div>
                    </div>
                </div>
                <div class="quick-add-footer"><div id="qa-price" aria-live="polite"></div><button type="button" id="qa-add-btn" class="n-btn primary">Add To Cart</button></div>`;
            initProductPage({ product, dom: {optionGridId:'qa-flavor-grid',sizeSelectorId:'qa-size-selector',selectedNameId:'qa-name',selectedDescriptionId:'qa-desc',selectedGroupId:'qa-group',selectedPriceId:'qa-price',selectedSizeNoteId:'qa-size-note',addButtonId:'qa-add-btn'},
                defaultOptionId: product.options[0]?.id, defaultSizeId: product.sizes[0]?.id,
                onAdd: item => {
                    window.zeroCartApi?.store.addItem(item);
                    const add = document.getElementById('qa-add-btn');
                    if (add) { add.textContent='Added!';window.clearTimeout(feedbackTimer);feedbackTimer=window.setTimeout(()=>{if(!add.disabled)add.textContent='Add To Cart';},1200); }
                }
            });
            modal.showModal();
            document.body.classList.add('quick-add-open','locked');
        });
    });
});

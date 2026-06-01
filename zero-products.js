const CART_KEY = 'zero_products_cart_v1';
const WHATSAPP_PHONE = '6285842833973';
const CONFIGURED_INVENTORY_API_BASE_URL = (import.meta.env.VITE_ZERO_INVENTORY_API_BASE_URL || '').replace(/\/$/, '');
const currency = new Intl.NumberFormat('id-ID');
const DROPS_FRUIT_5ML_START_ISO = '2026-06-15T00:00:00+07:00';

export const ZERO_RELEASES = {
    dropsFruit5ml: {
        startsAt: new Date(DROPS_FRUIT_5ML_START_ISO),
        label: 'June 15',
        upcomingCopy: '5ml currently covers coffee flavors; fruit flavors unlock in 5ml on June 15. 10ml stays plain only, and 30ml carries the full range.',
        liveCopy: '5ml is now available for every flavor. 10ml stays plain only, and 30ml carries the full range.',
        upcomingShortCopy: '5ml coffee flavors now; fruit flavors join 5ml on June 15.',
        liveShortCopy: '5ml and 30ml carry the full flavor range; 10ml stays plain only.',
    },
};

export const isReleaseLive = (release, now = new Date()) => now >= release.startsAt;
export const isDropsFruit5mlLive = (now = new Date()) => isReleaseLive(ZERO_RELEASES.dropsFruit5ml, now);

export const ZERO_PRODUCTS = {
    syrup: {
        slug: 'syrup',
        name: 'ZERO Syrup',
        checkoutLabel: 'ZERO Syrup',
        heroImage: '/ZERO Media/ZERO Syrup Renders/Plain.png',
        description: 'Zero-calorie syrup for coffee, refreshers, and daily drinks with a smoother finish than stevia.',
        options: [
            { id: 'plain', name: 'Plain', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Plain.png', description: 'No added flavor, just sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'hazelnut', name: 'Hazelnut', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Hazelnut.png', description: 'Nutty coffee-house profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'maple', name: 'Maple', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Maple.png', description: 'Warm maple sweetness for coffee and breakfast drinks.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'pumpkin-spice', name: 'Pumpkin Spice', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Plain.png', description: 'Seasonal spice profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'caramel', name: 'Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Caramel.png', description: 'Classic caramel coffee syrup.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'salted-caramel', name: 'Salted Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Salted Caramel.png', description: 'Caramel with a salted edge.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'butterscotch', name: 'Butterscotch', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Butterscotch.png', description: 'Deep buttery sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'vanilla', name: 'Vanilla', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Vanilla.png', description: 'Smooth vanilla profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'pistachio', name: 'Pistachio', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Pistachio.png', description: 'Nutty pistachio cafe flavor.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'pandan', name: 'Pandan', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Pandan.png', description: 'Fragrant pandan sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'strawberry', name: 'Strawberry', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Strawberry.png', description: 'Bright fruit sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'lychee', name: 'Lychee', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Lychee.png', description: 'Floral lychee profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'mango', name: 'Mango', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Mango.png', description: 'Tropical mango flavor.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'lemonade', name: 'Lemonade', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Plain.png', description: 'Citrus-forward lemonade sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'melon', name: 'Melon', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Melon.png', description: 'Sweet melon drink profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'mint', name: 'Mint', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Mint.png', description: 'Cool mint finish.', sizes: ['50ml', '250ml', '550ml'] },
        ],
        sizes: [
            { id: '50ml', label: '50ml', price: 10000, note: 'Sample size' },
            { id: '250ml', label: '250ml', price: 39000, note: 'Most popular' },
            { id: '550ml', label: '550ml', price: 69000, note: 'Best value' },
        ],
    },
    drops: {
        slug: 'drops',
        name: 'ZERO Drops',
        checkoutLabel: 'ZERO Drops',
        heroImage: '/ZERO Media/ZERO Drops Hero.png',
        description: 'Pocket-sized concentrated sweetness. Just 5 to 7 drops can sweeten a drink.',
        options: [
            { id: 'plain', name: 'Plain', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'The core all-purpose drops flavor.', sizes: ['5ml', '10ml', '30ml'] },
            { id: 'hazelnut', name: 'Hazelnut', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Nutty cafe profile for coffee drinks.', sizes: ['5ml', '30ml'] },
            { id: 'pumpkin-spice', name: 'Pumpkin Spice', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Warm spice notes for seasonal drinks.', sizes: ['5ml', '30ml'] },
            { id: 'caramel', name: 'Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Classic caramel sweetness.', sizes: ['5ml', '30ml'] },
            { id: 'butterscotch', name: 'Butterscotch', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Rich buttery sweetness in concentrated form.', sizes: ['5ml', '30ml'] },
            { id: 'pandan', name: 'Pandan', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Fragrant pandan profile for creative drinks.', sizes: ['5ml', '30ml'] },
            { id: 'pistachio', name: 'Pistachio', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Nutty drops for coffee and dessert drinks.', sizes: ['5ml', '30ml'] },
            { id: 'vanilla', name: 'Vanilla', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Smooth vanilla sweetness.', sizes: ['5ml', '30ml'] },
            { id: 'strawberry-kiwi', name: 'Strawberry Kiwi', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Fruit-forward blend built for cold drinks.', sizes: ['30ml'] },
            { id: 'lychee-bloom', name: 'Lychee Bloom', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Floral lychee profile with a brighter finish.', sizes: ['30ml'] },
            { id: 'grapefruit', name: 'Grapefruit', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Crisp citrus bitterness balanced by sweetness.', sizes: ['30ml'] },
            { id: 'peach-mango', name: 'Peach Mango', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Soft peach layered with tropical mango.', sizes: ['30ml'] },
            { id: 'lemonade', name: 'Lemonade', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Bright lemonade flavor for water and sodas.', sizes: ['30ml'] },
            { id: 'cucumber-mint', name: 'Cucumber Mint', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Cooling fresh profile for light drinks.', sizes: ['30ml'] },
            { id: 'blue-raspberry', name: 'Blue Raspberry', group: 'Other Flavors', image: '/ZERO Media/ZERO Drops Hero.png', description: 'Candy-like berry flavor for bold mixed drinks.', sizes: ['30ml'] },
        ],
        sizes: [
            { id: '5ml', label: '5ml', price: 20000, note: 'Coffee flavors only' },
            { id: '10ml', label: '10ml', price: 30000, note: 'Plain only' },
            { id: '30ml', label: '30ml', price: 49000, note: 'All flavors' },
        ],
    },
    mapleTopping: {
        slug: 'maple-topping',
        name: 'ZERO Maple Topping',
        checkoutLabel: 'ZERO Maple Topping',
        heroImage: '/ZERO Media/ZERO Maple Topping Hero.png',
        description: 'A thick zero-calorie topping with real maple extract made for pancakes, yogurt, and heavier pours.',
        options: [
            { id: 'classic-maple', name: 'Classic Maple', group: 'Topping', image: '/ZERO Media/ZERO Maple Topping Hero.png', description: 'Thick maple topping for food applications. This is not the same as ZERO Maple Syrup for coffee.', sizes: ['550ml'] },
        ],
        sizes: [
            { id: '550ml', label: '550ml', price: 149000, note: 'Food topping format' },
        ],
    },
};

if (isDropsFruit5mlLive()) {
    ZERO_PRODUCTS.drops.options.forEach((option) => {
        if (!option.sizes.includes('5ml')) {
            option.sizes = ['5ml', ...option.sizes];
        }
    });

    ZERO_PRODUCTS.drops.sizes = ZERO_PRODUCTS.drops.sizes.map((size) => (
        size.id === '5ml' ? { ...size, note: 'All flavors' } : size
    ));
}

export const formatPrice = (value) => `Rp${currency.format(value)}`;

export const buildZeroSku = (productSlug, optionId, sizeId) => `ZERO-${String(productSlug).replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase()}-${String(optionId).toUpperCase()}-${String(sizeId).toUpperCase()}`;

const getInventoryApiCandidates = () => {
    const candidates = [
        CONFIGURED_INVENTORY_API_BASE_URL,
        window.ZERO_INVENTORY_API_BASE_URL,
    ];

    const host = window.location.hostname.toLowerCase();
    if (host === 'zerofoods.id' || host === 'www.zerofoods.id') {
        candidates.push('https://api.zerofoods.id');
    }

    candidates.push(window.location.origin);

    return [...new Set(candidates
        .map((value) => String(value || '').replace(/\/$/, ''))
        .filter(Boolean))];
};

export const loadZeroCatalog = async () => {
    const apiCandidates = getInventoryApiCandidates();

    for (const apiBaseUrl of apiCandidates) {
        try {
            const response = await fetch(`${apiBaseUrl}/api/catalog`, {
                headers: { Accept: 'application/json' },
                credentials: 'omit',
            });
            if (!response.ok) throw new Error(`Inventory API ${response.status}`);
            const payload = await response.json();
            return Array.isArray(payload.data) ? payload.data : [];
        } catch (error) {
            console.warn(`ZERO inventory catalog unavailable at ${apiBaseUrl}; trying fallback.`, error);
        }
    }

    return null;
};

export const applyCatalogToProduct = (product, catalogRows) => {
    if (!Array.isArray(catalogRows)) return product;

    const rowByKey = new Map(catalogRows.map((row) => [
        `${row.product_slug}:${row.option_id}:${row.size_id}`,
        row,
    ]));

    return {
        ...product,
        options: product.options.map((option) => ({
            ...option,
            sizes: option.sizes.filter((sizeId) => {
                const row = rowByKey.get(`${product.slug}:${option.id}:${sizeId}`);
                return !row || row.status !== 'inactive';
            }),
        })),
        sizes: product.sizes.map((size) => {
            const rowsForSize = product.options
                .map((option) => rowByKey.get(`${product.slug}:${option.id}:${size.id}`))
                .filter(Boolean);
            const pricedRow = rowsForSize.find((row) => Number(row.sale_price) >= 0) || rowsForSize[0];
            if (!pricedRow) return size;
            const basePrice = Number(pricedRow.price);
            const salePrice = Number(pricedRow.sale_price);
            return {
                ...size,
                price: Number.isFinite(salePrice) ? salePrice : size.price,
                originalPrice: Number.isFinite(basePrice) && basePrice !== salePrice ? basePrice : null,
                discountLabel: pricedRow.discount?.label || '',
            };
        }),
        inventoryRows: rowByKey,
    };
};

export const loadCart = () => {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
        return [];
    }
};

const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('zero-cart-updated', { detail: { cart } }));
};

const buildCheckoutMessage = (cart) => {
    const lines = [
        'Halo ZERO, saya ingin memesan produk ZERO.',
        '',
        'Mohon jangan hapus atau ubah format pesanan ini agar admin bisa memproses dengan cepat.',
        '',
        'Detail pesanan:'
    ];

    let total = 0;
    cart.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        total += lineTotal;
        lines.push(`${index + 1}. ${item.label}${item.sku ? ` [${item.sku}]` : ''} x${item.quantity} = ${formatPrice(lineTotal)}`);
    });

    lines.push('');
    lines.push(`Total: ${formatPrice(total)}`);
    lines.push('');
    lines.push('Nama:');
    lines.push('Alamat:');
    lines.push('Catatan:');

    return encodeURIComponent(lines.join('\n'));
};

export const createCartStore = () => {
    let cart = loadCart();

    const emit = () => {
        saveCart(cart);
    };

    return {
        getCart() {
            return [...cart];
        },
        getCount() {
            return cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
        },
        getTotal() {
            return cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);
        },
        getCheckoutUrl() {
            if (!cart.length) return '#';
            return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${buildCheckoutMessage(cart)}`;
        },
        addItem(item) {
            const existing = cart.find((entry) => entry.key === item.key);

            if (existing) {
                existing.quantity += item.quantity || 1;
            } else {
                cart.push({ ...item, quantity: item.quantity || 1 });
            }

            emit();
        },
        updateQuantity(itemKey, delta) {
            const item = cart.find((entry) => entry.key === itemKey);
            if (!item) return;
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter((entry) => entry.key !== itemKey);
            }
            emit();
        },
        clear() {
            cart = [];
            emit();
        },
        syncFromStorage() {
            cart = loadCart();
        },
    };
};

export const initUniversalCartDrawer = () => {
    const cartBubble = document.getElementById('syrup-cart-bubble');
    const cartBadge = document.getElementById('syrup-cart-badge');
    const store = createCartStore();

    if (!document.getElementById('zero-cart-drawer')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="zero-cart-backdrop" class="zero-cart-backdrop" aria-hidden="true"></div>
            <aside id="zero-cart-drawer" class="zero-cart-drawer" aria-hidden="true" aria-label="Shopping cart" data-lenis-prevent>
                <div class="zero-cart-drawer-head">
                    <div>
                        <span class="showcase-badge">Cart</span>
                        <h2>Your ZERO Order</h2>
                    </div>
                    <button type="button" id="zero-cart-close" class="icon-btn zero-cart-close" aria-label="Close cart">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <p id="zero-cart-empty" class="zero-cart-empty">Your cart is empty. Add a ZERO product to start the order.</p>
                <div id="zero-cart-items" class="zero-cart-items"></div>
                <div class="zero-cart-summary">
                    <div>
                        <span>Items</span>
                        <strong id="zero-cart-count">0 items</strong>
                    </div>
                    <div>
                        <span>Total</span>
                        <strong id="zero-cart-total">Rp0</strong>
                    </div>
                </div>
                <div class="zero-cart-actions">
                    <button type="button" id="zero-cart-clear" class="n-btn">Clear Cart</button>
                    <a id="zero-cart-checkout" class="n-btn primary syrup-checkout-link disabled" href="#" target="_blank" aria-disabled="true">Checkout</a>
                </div>
                <p class="zero-cart-note">Checkout opens WhatsApp with product names, sizes, quantities, prices, and total already formatted.</p>
            </aside>
        `);
    }

    const drawer = document.getElementById('zero-cart-drawer');
    const backdrop = document.getElementById('zero-cart-backdrop');
    const cartItems = document.getElementById('zero-cart-items');
    const cartCount = document.getElementById('zero-cart-count');
    const cartTotal = document.getElementById('zero-cart-total');
    const emptyState = document.getElementById('zero-cart-empty');
    const checkoutLink = document.getElementById('zero-cart-checkout');
    const clearButton = document.getElementById('zero-cart-clear');
    const closeButton = document.getElementById('zero-cart-close');

    const syncBubble = () => {
        if (!cartBubble || !cartBadge) return;
        const count = store.getCount();
        cartBadge.textContent = String(count);
        cartBubble.classList.toggle('has-items', count > 0);
    };

    const render = () => {
        store.syncFromStorage();
        const cart = store.getCart();
        cartItems.innerHTML = '';

        if (!cart.length) {
            emptyState?.classList.remove('hide');
        } else {
            emptyState?.classList.add('hide');
        }

        cart.forEach((item) => {
            const itemNode = document.createElement('div');
            itemNode.className = 'zero-cart-item';
            itemNode.innerHTML = `
                <div>
                    <strong>${item.label}</strong>
                    <span>${formatPrice(item.price)} each</span>
                </div>
                <div class="syrup-cart-controls">
                    <button type="button" data-cart-action="decrease" data-item-key="${item.key}" aria-label="Decrease quantity">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" data-cart-action="increase" data-item-key="${item.key}" aria-label="Increase quantity">+</button>
                </div>
            `;
            cartItems.appendChild(itemNode);
        });

        const count = store.getCount();
        const total = store.getTotal();
        cartCount.textContent = `${count} item${count === 1 ? '' : 's'}`;
        cartTotal.textContent = formatPrice(total);
        syncBubble();

        if (!cart.length) {
            checkoutLink?.setAttribute('aria-disabled', 'true');
            checkoutLink?.classList.add('disabled');
            if (checkoutLink) checkoutLink.href = '#';
        } else {
            checkoutLink?.removeAttribute('aria-disabled');
            checkoutLink?.classList.remove('disabled');
            if (checkoutLink) checkoutLink.href = store.getCheckoutUrl();
        }
    };

    const openDrawer = () => {
        drawer?.classList.add('active');
        backdrop?.classList.add('active');
        drawer?.setAttribute('aria-hidden', 'false');
        backdrop?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('cart-drawer-open');
        render();
    };

    const closeDrawer = () => {
        drawer?.classList.remove('active');
        backdrop?.classList.remove('active');
        drawer?.setAttribute('aria-hidden', 'true');
        backdrop?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('cart-drawer-open');
    };

    cartBubble?.addEventListener('click', openDrawer);
    closeButton?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);
    clearButton?.addEventListener('click', () => {
        store.clear();
        render();
    });

    cartItems?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-cart-action]');
        if (!target) return;
        const delta = target.dataset.cartAction === 'increase' ? 1 : -1;
        store.updateQuantity(target.dataset.itemKey, delta);
        render();
    });

    window.addEventListener('zero-cart-updated', render);
    window.addEventListener('storage', render);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDrawer();
        }
    });

    render();

    return {
        openDrawer,
        closeDrawer,
        render,
        store,
    };
};

export const initProductPage = ({
    product,
    dom,
    defaultOptionId,
    defaultSizeId,
    onAdd,
}) => {
    const optionGrid = document.getElementById(dom.optionGridId);
    const sizeSelector = document.getElementById(dom.sizeSelectorId);
    const selectedName = document.getElementById(dom.selectedNameId);
    const selectedDescription = document.getElementById(dom.selectedDescriptionId);
    const selectedImage = document.getElementById(dom.selectedImageId);
    const selectedGroup = document.getElementById(dom.selectedGroupId);
    const selectedPrice = document.getElementById(dom.selectedPriceId);
    const selectedSizeNote = document.getElementById(dom.selectedSizeNoteId);
    const addButton = document.getElementById(dom.addButtonId);

    if (!optionGrid || !sizeSelector || !addButton) return null;

    let selectedOptionId = defaultOptionId || product.options[0]?.id;
    let selectedSizeId = defaultSizeId || product.sizes[0]?.id;

    const findOption = (optionId) => product.options.find((option) => option.id === optionId);
    const findSize = (sizeId) => product.sizes.find((size) => size.id === sizeId);
    const findInventoryRow = (optionId, sizeId) => product.inventoryRows?.get(`${product.slug}:${optionId}:${sizeId}`) || null;

    const getAvailableSizeIds = (optionId) => findOption(optionId)?.sizes || [];

    const ensureValidSize = () => {
        const availableSizeIds = getAvailableSizeIds(selectedOptionId);
        if (!availableSizeIds.includes(selectedSizeId)) {
            selectedSizeId = availableSizeIds[0];
        }
    };

    const renderSizeSelector = () => {
        const availableSizeIds = getAvailableSizeIds(selectedOptionId);

        sizeSelector.innerHTML = product.sizes.map((size) => {
            const isAvailable = availableSizeIds.includes(size.id);
            const inventoryRow = findInventoryRow(selectedOptionId, size.id);
            const inStock = !inventoryRow || inventoryRow.available;
            const disabled = !isAvailable || !inStock;
            const stockLabel = inventoryRow ? (inventoryRow.available ? `${inventoryRow.stock} in stock` : 'Sold out') : '';
            return `
                <button type="button" class="syrup-size-chip${size.id === selectedSizeId ? ' active' : ''}" data-size-id="${size.id}" ${disabled ? 'disabled' : ''}>
                    <strong>${size.label}</strong>
                    <span>${formatPrice(size.price)}${size.originalPrice ? ` · was ${formatPrice(size.originalPrice)}` : ''}${size.note ? ` · ${size.note}` : ''}${stockLabel ? ` · ${stockLabel}` : ''}</span>
                </button>
            `;
        }).join('');
    };

    const updateSelectionPanel = () => {
        ensureValidSize();
        const option = findOption(selectedOptionId);
        const size = findSize(selectedSizeId);
        if (!option || !size) return;

        if (selectedName) selectedName.textContent = option.name;
        if (selectedDescription) selectedDescription.textContent = option.description;
        if (selectedImage) {
            selectedImage.src = option.image;
            selectedImage.alt = `${option.name} ${product.name}`;
        }
        if (selectedGroup) selectedGroup.textContent = option.group;
        const inventoryRow = findInventoryRow(option.id, size.id);
        if (selectedPrice) selectedPrice.textContent = size.originalPrice ? `${formatPrice(size.price)} (was ${formatPrice(size.originalPrice)})` : formatPrice(size.price);
        if (selectedSizeNote) {
            const stockCopy = inventoryRow ? (inventoryRow.available ? `${inventoryRow.stock} in stock` : 'Sold out') : '';
            selectedSizeNote.textContent = `${size.label}${size.note ? ` · ${size.note}` : ''}${size.discountLabel ? ` · ${size.discountLabel}` : ''}${stockCopy ? ` · ${stockCopy}` : ''}`;
        }
        if (addButton) {
            addButton.disabled = Boolean(inventoryRow && !inventoryRow.available);
            addButton.textContent = inventoryRow && !inventoryRow.available ? 'Sold Out' : 'Add To Cart';
        }

        Array.from(optionGrid.querySelectorAll('[data-option-id]')).forEach((button) => {
            button.classList.toggle('active', button.dataset.optionId === selectedOptionId);
        });

        renderSizeSelector();
    };

    optionGrid.innerHTML = product.options.map((option) => `
        <button type="button" class="syrup-choice-card" data-option-id="${option.id}">
            <span>${option.group}</span>
            <strong>${option.name}</strong>
        </button>
    `).join('');

    updateSelectionPanel();

    optionGrid.addEventListener('click', (event) => {
        const target = event.target.closest('[data-option-id]');
        if (!target) return;
        selectedOptionId = target.dataset.optionId;
        updateSelectionPanel();
    });

    sizeSelector.addEventListener('click', (event) => {
        const target = event.target.closest('[data-size-id]');
        if (!target || target.hasAttribute('disabled')) return;
        selectedSizeId = target.dataset.sizeId;
        updateSelectionPanel();
    });

    addButton.addEventListener('click', () => {
        const option = findOption(selectedOptionId);
        const size = findSize(selectedSizeId);
        if (!option || !size) return;

        const labelParts = [product.checkoutLabel];
        if (product.options.length > 1 || option.name !== product.checkoutLabel) {
            labelParts.push(option.name);
        }
        if (size.label) {
            labelParts.push(size.label);
        }

        onAdd?.({
            key: `${product.slug}:${option.id}:${size.id}`,
            sku: buildZeroSku(product.slug, option.id, size.id),
            productSlug: product.slug,
            productName: product.checkoutLabel,
            optionId: option.id,
            optionName: option.name,
            sizeId: size.id,
            sizeLabel: size.label,
            label: labelParts.join(' - '),
            price: size.price,
            quantity: 1,
        });
    });

    return {
        getSelection() {
            return {
                option: findOption(selectedOptionId),
                size: findSize(selectedSizeId),
            };
        },
    };
};

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
            { id: 'plain', name: 'Plain', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Plain.jpg', description: 'No added flavor, just sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'hazelnut', name: 'Hazelnut', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Hazelnut.jpg', description: 'Nutty coffee-house profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'maple', name: 'Maple', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Maple.jpg', description: 'Warm maple sweetness for coffee and breakfast drinks.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'pumpkin-spice', name: 'Pumpkin Spice', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Pumpkinspice.jpg', description: 'Seasonal spice profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'caramel', name: 'Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Caramel.jpg', description: 'Classic caramel coffee syrup.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'salted-caramel', name: 'Salted Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Salted-Caramel.jpg', description: 'Caramel with a salted edge.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'butterscotch', name: 'Butterscotch', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Butterscotch.jpg', description: 'Deep buttery sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'vanilla', name: 'Vanilla', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Vanilla.jpg', description: 'Smooth vanilla profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'pistachio', name: 'Pistachio', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Pistachio.jpg', description: 'Nutty pistachio cafe flavor.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'pandan', name: 'Pandan', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Pandan.jpg', description: 'Fragrant pandan sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'strawberry', name: 'Strawberry', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Strawberry.jpg', description: 'Bright fruit sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'lychee', name: 'Lychee', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Lychee.jpg', description: 'Floral lychee profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'mango', name: 'Mango', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Mango.jpg', description: 'Tropical mango flavor.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'lemonade', name: 'Lemonade', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Lemonade.jpg', description: 'Citrus-forward lemonade sweetness.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'melon', name: 'Melon', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Melon.jpg', description: 'Sweet melon drink profile.', sizes: ['50ml', '250ml', '550ml'] },
            { id: 'mint', name: 'Mint', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Images/Product Photos/Zero-Mint.jpg', description: 'Cool mint finish.', sizes: ['50ml', '250ml', '550ml'] },
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
    zfitFiberSyrup: {
        slug: 'fiber-syrup',
        name: 'ZFIT Fiber Syrup',
        checkoutLabel: 'ZFIT Fiber Syrup',
        heroImage: '/ZERO Media/ZFIT/Fiber Syrup Carousel/Fiber Syrup 1.jpg',
        description: 'A prebiotic fiber syrup made for easy daily mixing.',
        options: [
            { id: 'unflavored', name: 'Unflavored', group: 'Fiber Syrup', image: '/ZERO Media/ZFIT/Fiber Syrup Carousel/Fiber Syrup 1.jpg', description: 'Prebiotic support without changing the drink profile.', sizes: ['250ml'] },
            { id: 'lemonade-pomegranate', name: 'Lemonade Pomegranate', group: 'Fiber Syrup', image: '/ZERO Media/ZFIT/Fiber Syrup Carousel/Fiber Syrup 1.jpg', description: 'A sweeter fiber syrup profile for water and cold drinks.', sizes: ['250ml'] },
        ],
        sizes: [
            { id: '250ml', label: '250ml', price: 129000, note: '6g fiber per serving' },
        ],
    },
    zfitAcvs: {
        slug: 'acvs',
        name: 'ZFIT ACVS',
        checkoutLabel: 'ZFIT ACVS',
        heroImage: '/ZERO Media/ZFIT/ACVS Carousel/ACVS 1.jpg',
        description: 'Apple cider vinegar syrup with the mother, built for easier daily use.',
        options: [
            { id: 'apple-cider-vinegar-syrup', name: 'Apple Cider Vinegar Syrup', group: 'ACVS', image: '/ZERO Media/ZFIT/ACVS Carousel/ACVS 1.jpg', description: 'Raw and unfiltered apple cider vinegar syrup.', sizes: ['100ml', '250ml'] },
        ],
        sizes: [
            { id: '100ml', label: '100ml', price: 29500, note: 'Trial size' },
            { id: '250ml', label: '250ml', price: 49500, note: 'Routine size' },
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

const getDiscountPercent = (discount, basePrice, salePrice) => {
    if (!discount || !Number.isFinite(Number(basePrice)) || Number(basePrice) <= 0) return 0;
    if (discount.type === 'percent') return Math.round(Number(discount.amount || 0));
    return Math.round(((Number(basePrice) - Number(salePrice)) / Number(basePrice)) * 100);
};

const getDiscountDisplay = (discount, basePrice, salePrice) => {
    const discountAmount = Math.max(0, Math.round(Number(basePrice || 0) - Number(salePrice || 0)));
    const percent = getDiscountPercent(discount, basePrice, salePrice);
    const label = String(discount?.label || '').trim();
    if (!discount || discountAmount <= 0 || percent <= 0) {
        return {
            active: false,
            amount: 0,
            percent: 0,
            label: '',
            badge: '',
            message: '',
        };
    }

    return {
        active: true,
        amount: discountAmount,
        percent,
        label,
        badge: `-${percent}%`,
        message: `${formatPrice(discountAmount)} (${percent}%)${label ? ` ${label}` : ''}`,
    };
};

const getDiscountToneClass = (percent) => {
    const value = Number(percent) || 0;
    if (value >= 100) return 'discount-ribbon-100';
    if (value >= 75) return 'discount-ribbon-75';
    if (value >= 50) return 'discount-ribbon-50';
    if (value >= 25) return 'discount-ribbon-25';
    return 'discount-ribbon-10';
};

const PRODUCT_STICK_TO_IT_COPY = 'We do not use stevia because better-for-you only works when it is easy to keep using. Our view of healthy is the option that fits your daily routine, tastes clean, and helps you stick with it.';

const renderDiscountRibbon = (discount, extraClass = '') => {
    if (!discount?.active) return '';
    const classes = ['zero-discount-ribbon', getDiscountToneClass(discount.percent), extraClass].filter(Boolean).join(' ');
    const label = `${discount.badge}!`;
    return `<span class="${classes}">${escapeHtml(label)}</span>`;
};

const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const buildZeroSku = (productSlug, optionId, sizeId) => `ZERO-${String(productSlug).replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase()}-${String(optionId).toUpperCase()}-${String(sizeId).toUpperCase()}`;

const getInventoryCatalogUrls = () => {
    const candidates = [
        CONFIGURED_INVENTORY_API_BASE_URL,
        window.ZERO_INVENTORY_API_BASE_URL,
    ];

    const host = window.location.hostname.toLowerCase();
    if (host === 'zerofoods.id' || host === 'www.zerofoods.id') {
        candidates.push('https://admin.jenanggemi.com/api/zero-store/?action=catalog');
        candidates.push('https://api.zerofoods.id');
    }

    candidates.push(window.location.origin);

    return [...new Set(candidates
        .map((value) => String(value || '').replace(/\/$/, ''))
        .filter(Boolean)
        .map((value) => value.includes('/api/')
            ? value
            : `${value}/api/catalog`))];
};

export const loadZeroCatalog = async () => {
    const catalogUrls = getInventoryCatalogUrls();

    for (const catalogUrl of catalogUrls) {
        try {
            const response = await fetch(catalogUrl, {
                headers: { Accept: 'application/json' },
                credentials: 'omit',
                cache: 'no-store',
            });
            if (!response.ok) throw new Error(`Inventory API ${response.status}`);
            const payload = await response.json();
            return Array.isArray(payload.data) ? payload.data : [];
        } catch (error) {
            console.warn(`ZERO inventory catalog unavailable at ${catalogUrl}; trying fallback.`, error);
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
        sizes: product.sizes,
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

const CUSTOMER_KEY = 'zero_products_customer_v1';

export const loadCheckoutCustomer = () => {
    try {
        const customer = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || '{}');
        return {
            fullName: String(customer.fullName || ''),
            address: String(customer.address || ''),
        };
    } catch {
        return { fullName: '', address: '' };
    }
};

const saveCheckoutCustomer = (customer) => {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify({
        fullName: String(customer.fullName || ''),
        address: String(customer.address || ''),
    }));
};

const buildCheckoutMessage = (cart, customer = {}) => {
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
        const basePrice = Number(item.basePrice || item.price || 0);
        const discount = getDiscountDisplay(item.discount, basePrice, item.price);
        const itemLabel = `${index + 1}. ${item.label}${item.sku ? ` [${item.sku}]` : ''} x${item.quantity}`;
        if (discount.active) {
            const baseLineTotal = basePrice * item.quantity;
            const discountLineTotal = discount.amount * item.quantity;
            lines.push(`${itemLabel} = ${formatPrice(baseLineTotal)}`);
            lines.push(`   Discount: -${formatPrice(discountLineTotal)} (${discount.percent}%)${discount.label ? ` ${discount.label}` : ''}`);
            lines.push(`   Net: ${formatPrice(lineTotal)}`);
            return;
        }
        lines.push(`${itemLabel} = ${formatPrice(lineTotal)}`);
    });

    lines.push('');
    lines.push(`Total: ${formatPrice(total)}`);
    lines.push('');
    lines.push(`Nama: ${String(customer.fullName || '').trim()}`);
    lines.push(`Alamat: ${String(customer.address || '').trim()}`);
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
        getCheckoutUrl(customer = {}) {
            if (!cart.length) return '#';
            return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${buildCheckoutMessage(cart, customer)}`;
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
        removeItem(itemKey) {
            cart = cart.filter((entry) => entry.key !== itemKey);
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
                <div class="zero-cart-customer" data-zero-checkout-customer>
                    <label>
                        <span>Full Name</span>
                        <input id="zero-cart-full-name" type="text" autocomplete="name" maxlength="120" placeholder="Your full name">
                    </label>
                    <label>
                        <span>Delivery Address</span>
                        <textarea id="zero-cart-address" autocomplete="street-address" maxlength="500" rows="3" placeholder="Street, area, city, postal code"></textarea>
                    </label>
                    <p id="zero-cart-customer-error" class="zero-cart-form-error" hidden>Please add your full name and delivery address before checkout.</p>
                </div>
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
                <p class="zero-cart-note">Checkout opens WhatsApp with your order, full name, delivery address, and total already formatted.</p>
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
    const fullNameInput = document.getElementById('zero-cart-full-name');
    const addressInput = document.getElementById('zero-cart-address');
    const customerError = document.getElementById('zero-cart-customer-error');

    const setCustomerError = (message = '') => {
        if (!customerError) return;
        customerError.hidden = !message;
        customerError.textContent = message;
    };

    const getCustomer = () => ({
        fullName: String(fullNameInput?.value || '').trim(),
        address: String(addressInput?.value || '').trim(),
    });

    const isCustomerComplete = () => {
        const customer = getCustomer();
        return customer.fullName.length > 1 && customer.address.length > 5;
    };

    const syncCheckoutCustomer = () => {
        const customer = getCustomer();
        saveCheckoutCustomer(customer);
        if (isCustomerComplete()) {
            setCustomerError('');
        }
        return customer;
    };

    const savedCustomer = loadCheckoutCustomer();
    if (fullNameInput) fullNameInput.value = savedCustomer.fullName;
    if (addressInput) addressInput.value = savedCustomer.address;

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
            const basePrice = Number(item.basePrice || item.price || 0);
            const discount = getDiscountDisplay(item.discount, basePrice, item.price);
            itemNode.className = 'zero-cart-item';
            itemNode.innerHTML = `
                <div>
                    <strong>${escapeHtml(item.label)}</strong>
                    ${renderDiscountRibbon(discount, 'zero-discount-ribbon-inline')}
                    <span>${formatPrice(item.price)} each${discount.active ? ` · was ${formatPrice(basePrice)}` : ''}</span>
                </div>
                <div class="syrup-cart-controls">
                    <button type="button" data-cart-action="decrease" data-item-key="${escapeHtml(item.key)}" aria-label="Decrease quantity by one">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                            <path d="M5 12h14"></path>
                        </svg>
                    </button>
                    <span class="syrup-cart-quantity" aria-label="Quantity">${item.quantity}</span>
                    <button type="button" data-cart-action="increase" data-item-key="${escapeHtml(item.key)}" aria-label="Increase quantity by one">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                            <path d="M12 5v14"></path>
                            <path d="M5 12h14"></path>
                        </svg>
                    </button>
                    <button type="button" class="syrup-cart-remove" data-cart-action="remove" data-item-key="${escapeHtml(item.key)}" aria-label="Remove ${escapeHtml(item.label)} from cart">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4h8v2"></path>
                            <path d="M19 6l-1 14H6L5 6"></path>
                            <path d="M10 11v5"></path>
                            <path d="M14 11v5"></path>
                        </svg>
                    </button>
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
            if (checkoutLink) checkoutLink.href = store.getCheckoutUrl(getCustomer());
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

    fullNameInput?.addEventListener('input', () => {
        syncCheckoutCustomer();
        render();
    });

    addressInput?.addEventListener('input', () => {
        syncCheckoutCustomer();
        render();
    });

    checkoutLink?.addEventListener('click', (event) => {
        if (checkoutLink.classList.contains('disabled')) {
            event.preventDefault();
            return;
        }

        const customer = syncCheckoutCustomer();
        if (!customer.fullName || !customer.address) {
            event.preventDefault();
            setCustomerError('Please add your full name and delivery address before checkout.');
            if (!customer.fullName) {
                fullNameInput?.focus();
            } else {
                addressInput?.focus();
            }
            return;
        }

        checkoutLink.href = store.getCheckoutUrl(customer);
    });

    cartItems?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-cart-action]');
        if (!target) return;
        if (target.dataset.cartAction === 'remove') {
            store.removeItem(target.dataset.itemKey);
            render();
            return;
        }
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
    const priceForSelection = (size, inventoryRow) => {
        const salePrice = Number(inventoryRow?.sale_price);
        return Number.isFinite(salePrice) && salePrice > 0 ? salePrice : Number(size?.price || 0);
    };
    const originalPriceForSelection = (inventoryRow, salePrice) => {
        const basePrice = Number(inventoryRow?.price);
        return Number.isFinite(basePrice) && basePrice > 0 && basePrice !== salePrice ? basePrice : null;
    };
    const discountForSelection = (inventoryRow, salePrice) => {
        const basePrice = Number(inventoryRow?.price);
        return getDiscountDisplay(inventoryRow?.discount, basePrice, salePrice);
    };

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
            const displayPrice = priceForSelection(size, inventoryRow);
            const originalPrice = originalPriceForSelection(inventoryRow, displayPrice);
            const discount = discountForSelection(inventoryRow, displayPrice);
            return `
                <button type="button" class="syrup-size-chip${size.id === selectedSizeId ? ' active' : ''}${discount.active ? ' has-discount' : ''}" data-size-id="${size.id}" ${disabled ? 'disabled' : ''}>
                    <strong>${size.label}</strong>
                    <span class="zero-size-price-row">
                        <span class="zero-size-price">${formatPrice(displayPrice)}</span>
                        ${renderDiscountRibbon(discount)}
                    </span>
                    ${originalPrice ? `<small class="zero-size-compare">${formatPrice(originalPrice)}</small>` : ''}
                    ${!inStock ? '<small class="zero-size-stock">Sold out</small>' : ''}
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
        if (selectedDescription) selectedDescription.textContent = PRODUCT_STICK_TO_IT_COPY;
        if (selectedImage) {
            selectedImage.src = option.image;
            selectedImage.alt = `${option.name} ${product.name}`;
        }
        if (selectedGroup) selectedGroup.textContent = option.group;
        const inventoryRow = findInventoryRow(option.id, size.id);
        const displayPrice = priceForSelection(size, inventoryRow);
        const originalPrice = originalPriceForSelection(inventoryRow, displayPrice);
        const discount = discountForSelection(inventoryRow, displayPrice);
        if (selectedPrice) {
            selectedPrice.innerHTML = `
                <span class="zero-price-line">${formatPrice(displayPrice)}${originalPrice ? ` <small>was ${formatPrice(originalPrice)}</small>` : ''}</span>
                ${renderDiscountRibbon(discount, 'zero-discount-ribbon-inline')}
            `;
        }
        if (selectedSizeNote) {
            selectedSizeNote.textContent = '';
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
        const inventoryRow = findInventoryRow(option.id, size.id);
        if (inventoryRow && !inventoryRow.available) return;
        const selectedSku = inventoryRow?.sku_code || inventoryRow?.sku || buildZeroSku(product.slug, option.id, size.id);
        const selectedPrice = priceForSelection(size, inventoryRow);

        const labelParts = [product.checkoutLabel];
        if (product.options.length > 1 || option.name !== product.checkoutLabel) {
            labelParts.push(option.name);
        }
        if (size.label) {
            labelParts.push(size.label);
        }

        onAdd?.({
            key: selectedSku || `${product.slug}:${option.id}:${size.id}`,
            sku: selectedSku,
            productSlug: product.slug,
            productName: product.checkoutLabel,
            optionId: option.id,
            optionName: option.name,
            sizeId: size.id,
            sizeLabel: size.label,
            label: labelParts.join(' - '),
            price: selectedPrice,
            basePrice: Number(inventoryRow?.price || selectedPrice),
            discount: inventoryRow?.discount || null,
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

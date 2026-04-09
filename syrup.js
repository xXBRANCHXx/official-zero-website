document.addEventListener('DOMContentLoaded', () => {
    const cartKey = 'zero_syrup_cart_v1';
    const whatsappPhone = '6285842833973';
    const currency = new Intl.NumberFormat('id-ID');
    const syrupSizes = [
        { id: '50ml', label: '50ml', price: 10000, note: 'Sample size' },
        { id: '250ml', label: '250ml', price: 39000, note: 'Most popular' },
        { id: '550ml', label: '550ml', price: 69000, note: 'Best value' },
    ];
    const syrupFlavors = [
        { id: 'plain', name: 'Plain', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Plain.png', description: 'No added flavor, just sweetness.' },
        { id: 'hazelnut', name: 'Hazelnut', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Hazelnut.png', description: 'Nutty coffee-house profile.' },
        { id: 'maple', name: 'Maple', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Maple.png', description: 'Warm maple sweetness for coffee and breakfast drinks.' },
        { id: 'pumpkin-spice', name: 'Pumpkin Spice', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Plain.png', description: 'Seasonal spice profile.' },
        { id: 'caramel', name: 'Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Caramel.png', description: 'Classic caramel coffee syrup.' },
        { id: 'salted-caramel', name: 'Salted Caramel', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Salted Caramel.png', description: 'Caramel with a salted edge.' },
        { id: 'butterscotch', name: 'Butterscotch', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Butterscotch.png', description: 'Deep buttery sweetness.' },
        { id: 'vanilla', name: 'Vanilla', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Vanilla.png', description: 'Smooth vanilla profile.' },
        { id: 'pistachio', name: 'Pistachio', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Pistachio.png', description: 'Nutty pistachio café flavor.' },
        { id: 'pandan', name: 'Pandan', group: 'Coffee Flavors', image: '/ZERO Media/ZERO Syrup Renders/Pandan.png', description: 'Fragrant pandan sweetness.' },
        { id: 'strawberry', name: 'Strawberry', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Strawberry.png', description: 'Bright fruit sweetness.' },
        { id: 'lychee', name: 'Lychee', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Lychee.png', description: 'Floral lychee profile.' },
        { id: 'mango', name: 'Mango', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Mango.png', description: 'Tropical mango flavor.' },
        { id: 'lemonade', name: 'Lemonade', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Plain.png', description: 'Citrus-forward lemonade sweetness.' },
        { id: 'melon', name: 'Melon', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Melon.png', description: 'Sweet melon drink profile.' },
        { id: 'mint', name: 'Mint', group: 'Other Flavors', image: '/ZERO Media/ZERO Syrup Renders/Mint.png', description: 'Cool mint finish.' },
    ];

    const flavorGrid = document.getElementById('syrup-flavor-grid');
    const sizeSelector = document.getElementById('syrup-size-selector');
    const selectedFlavorName = document.getElementById('selected-flavor-name');
    const selectedFlavorDescription = document.getElementById('selected-flavor-description');
    const selectedFlavorImage = document.getElementById('selected-flavor-image');
    const selectedFlavorGroup = document.getElementById('selected-flavor-group');
    const selectedPrice = document.getElementById('selected-syrup-price');
    const selectedSizeNote = document.getElementById('selected-size-note');
    const addToCartButton = document.getElementById('add-syrup-to-cart');
    const cartItems = document.getElementById('syrup-cart-items');
    const cartCount = document.getElementById('syrup-cart-count');
    const cartTotal = document.getElementById('syrup-cart-total');
    const emptyState = document.getElementById('syrup-cart-empty');
    const checkoutLink = document.getElementById('syrup-whatsapp-checkout');
    const clearCartButton = document.getElementById('syrup-clear-cart');
    const cartPanel = document.getElementById('syrup-cart-panel');
    const cartBubble = document.getElementById('syrup-cart-bubble');
    const cartBadge = document.getElementById('syrup-cart-badge');

    let selectedFlavorId = syrupFlavors[0].id;
    let selectedSizeId = syrupSizes[1].id;

    const loadCart = () => {
        try {
            return JSON.parse(localStorage.getItem(cartKey) || '[]');
        } catch {
            return [];
        }
    };

    const saveCart = (cart) => {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    };

    let cart = loadCart();

    const findFlavor = (flavorId) => syrupFlavors.find((flavor) => flavor.id === flavorId);
    const findSize = (sizeId) => syrupSizes.find((size) => size.id === sizeId);

    const formatPrice = (value) => `Rp${currency.format(value)}`;

    const buildMessage = () => {
        const lines = [
            'Halo ZERO, saya ingin memesan ZERO Syrup.',
            '',
            'Mohon jangan hapus atau ubah format pesanan ini agar admin bisa memproses dengan cepat.',
            '',
            'Detail pesanan:'
        ];

        let total = 0;
        cart.forEach((item, index) => {
            const lineTotal = item.price * item.quantity;
            total += lineTotal;
            lines.push(`${index + 1}. ZERO Syrup - ${item.flavorName} - ${item.sizeLabel} x${item.quantity} = ${formatPrice(lineTotal)}`);
        });

        lines.push('');
        lines.push(`Total: ${formatPrice(total)}`);
        lines.push('');
        lines.push('Nama:');
        lines.push('Alamat:');
        lines.push('Catatan:');

        return encodeURIComponent(lines.join('\n'));
    };

    const syncCheckoutLink = () => {
        if (!checkoutLink) return;
        if (!cart.length) {
            checkoutLink.setAttribute('aria-disabled', 'true');
            checkoutLink.classList.add('disabled');
            checkoutLink.href = '#';
            return;
        }

        checkoutLink.removeAttribute('aria-disabled');
        checkoutLink.classList.remove('disabled');
        checkoutLink.href = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${buildMessage()}`;
    };

    const syncCartBubble = (count) => {
        if (!cartBadge || !cartBubble) return;
        cartBadge.textContent = String(count);
        cartBubble.classList.toggle('has-items', count > 0);
    };

    const updateSelectionPanel = () => {
        const flavor = findFlavor(selectedFlavorId);
        const size = findSize(selectedSizeId);
        if (!flavor || !size) return;

        selectedFlavorName.textContent = flavor.name;
        selectedFlavorDescription.textContent = flavor.description;
        selectedFlavorImage.src = flavor.image;
        selectedFlavorImage.alt = `${flavor.name} ZERO Syrup render`;
        selectedFlavorGroup.textContent = flavor.group;
        selectedPrice.textContent = formatPrice(size.price);
        selectedSizeNote.textContent = `${size.label} · ${size.note}`;

        Array.from(flavorGrid.querySelectorAll('[data-flavor-id]')).forEach((button) => {
            button.classList.toggle('active', button.dataset.flavorId === selectedFlavorId);
        });

        Array.from(sizeSelector.querySelectorAll('[data-size-id]')).forEach((button) => {
            button.classList.toggle('active', button.dataset.sizeId === selectedSizeId);
        });
    };

    const renderCart = () => {
        cartItems.innerHTML = '';

        if (!cart.length) {
            emptyState.classList.remove('hide');
            cartCount.textContent = '0 items';
            cartTotal.textContent = formatPrice(0);
            syncCartBubble(0);
            syncCheckoutLink();
            return;
        }

        emptyState.classList.add('hide');
        let total = 0;
        let count = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            count += item.quantity;

            const itemNode = document.createElement('div');
            itemNode.className = 'syrup-cart-item';
            itemNode.innerHTML = `
                <div>
                    <strong>${item.flavorName} · ${item.sizeLabel}</strong>
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

        cartCount.textContent = `${count} item${count === 1 ? '' : 's'}`;
        cartTotal.textContent = formatPrice(total);
        syncCartBubble(count);
        syncCheckoutLink();
    };

    const addCurrentSelectionToCart = () => {
        const flavor = findFlavor(selectedFlavorId);
        const size = findSize(selectedSizeId);
        if (!flavor || !size) return;

        const key = `${flavor.id}:${size.id}`;
        const existing = cart.find((item) => item.key === key);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                key,
                flavorId: flavor.id,
                flavorName: flavor.name,
                sizeId: size.id,
                sizeLabel: size.label,
                price: size.price,
                quantity: 1,
            });
        }

        saveCart(cart);
        renderCart();
    };

    const updateCartQuantity = (itemKey, delta) => {
        const item = cart.find((entry) => entry.key === itemKey);
        if (!item) return;
        item.quantity += delta;

        if (item.quantity <= 0) {
            cart = cart.filter((entry) => entry.key !== itemKey);
        }

        saveCart(cart);
        renderCart();
    };

    flavorGrid.innerHTML = syrupFlavors.map((flavor) => `
        <button type="button" class="syrup-choice-card" data-flavor-id="${flavor.id}">
            <span>${flavor.group}</span>
            <strong>${flavor.name}</strong>
        </button>
    `).join('');

    sizeSelector.innerHTML = syrupSizes.map((size) => `
        <button type="button" class="syrup-size-chip" data-size-id="${size.id}">
            <strong>${size.label}</strong>
            <span>${formatPrice(size.price)}</span>
        </button>
    `).join('');

    flavorGrid.addEventListener('click', (event) => {
        const target = event.target.closest('[data-flavor-id]');
        if (!target) return;
        selectedFlavorId = target.dataset.flavorId;
        updateSelectionPanel();
    });

    sizeSelector.addEventListener('click', (event) => {
        const target = event.target.closest('[data-size-id]');
        if (!target) return;
        selectedSizeId = target.dataset.sizeId;
        updateSelectionPanel();
    });

    cartItems.addEventListener('click', (event) => {
        const target = event.target.closest('[data-cart-action]');
        if (!target) return;
        const delta = target.dataset.cartAction === 'increase' ? 1 : -1;
        updateCartQuantity(target.dataset.itemKey, delta);
    });

    addToCartButton?.addEventListener('click', addCurrentSelectionToCart);
    clearCartButton?.addEventListener('click', () => {
        cart = [];
        saveCart(cart);
        renderCart();
    });

    cartBubble?.addEventListener('click', () => {
        if (!cartPanel) return;
        cartPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        cartPanel.classList.remove('cart-panel-flash');
        requestAnimationFrame(() => {
            cartPanel.classList.add('cart-panel-flash');
        });
    });

    cartPanel?.addEventListener('animationend', () => {
        cartPanel.classList.remove('cart-panel-flash');
    });

    updateSelectionPanel();
    renderCart();
});

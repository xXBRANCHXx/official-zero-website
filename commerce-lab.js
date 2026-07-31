const item = { item_key: 'syrup:plain:250ml', sku: 'ZEROSYRP001', quantity: 2 };

const stages = [
    {
        owner: 'browser', ownerLabel: 'Browser → ZERO server', name: 'Search destination area', short: 'Location search',
        method: 'GET', endpoint: '/api/zero-commerce/?action=areas&q=Sleman', caller: 'ZERO checkout in the customer browser',
        purpose: 'Autocomplete an Indonesian district/postal-code area without exposing the Biteship API token.',
        security: 'ZERO proxies the request. The Biteship token exists only on the server.',
        request: { query: { q: 'Sleman' } },
        response: { ok: true, areas: [{ id: 'IDNP5IDNC…IDZ55581', name: 'Ngaglik, Sleman, DI Yogyakarta. 55581', postal_code: '55581', city: 'Sleman', province: 'DI Yogyakarta' }] },
    },
    {
        owner: 'provider', ownerLabel: 'ZERO server → Biteship', name: 'Biteship Maps: Search Area', short: 'Biteship Maps API',
        method: 'GET', endpoint: 'https://api.biteship.com/v1/maps/areas?countries=ID&type=single&input=Sleman', caller: 'ZERO commerce server',
        purpose: 'Return the authoritative Biteship area_id used for accurate standard-courier rates.',
        security: 'HTTP Basic Auth uses the Biteship token as the username with a blank password. It is never sent to the browser.',
        request: { headers: { Authorization: 'Basic base64(biteship_test.••••••:)', Accept: 'application/json' } },
        response: { success: true, areas: [{ id: 'IDNP5IDNC…IDZ55581', name: 'Ngaglik, Sleman, DI Yogyakarta. 55581', country_code: 'ID', postal_code: 55581 }] },
    },
    {
        owner: 'provider', ownerLabel: 'ZERO server → Biteship', name: 'Biteship Rates: Retrieve Courier Rates', short: 'Live price + weight',
        method: 'POST', endpoint: 'https://api.biteship.com/v1/rates/couriers', caller: 'ZERO commerce server after recalculating cart prices and SKU weights',
        purpose: 'Get available courier services and prices from the configured ZERO pickup area to the selected destination.',
        security: 'Weights and prices come from server configuration/database, never from editable browser totals.',
        request: { origin_area_id: 'IDNP5IDNC…ORIGIN', destination_area_id: 'IDNP5IDNC…IDZ55581', couriers: 'jne,sicepat,anteraja,jnt,tiki', items: [{ name: 'ZERO Syrup Plain 250ml', category: 'food_and_drink', sku: 'ZEROSYRP001', value: 39000, quantity: 2, weight: 480 }] },
        response: { success: true, object: 'courier_pricing', pricing: [{ courier_name: 'JNE', courier_code: 'jne', courier_service_name: 'REG', courier_service_code: 'reg', duration: '2 - 3 days', price: 18000, available_collection_method: ['pickup'] }] },
    },
    {
        owner: 'zero', ownerLabel: 'ZERO server', name: 'ZERO signed shipping quote', short: 'Lock total for 15 min',
        method: 'POST', endpoint: '/api/zero-commerce/?action=rates', caller: 'ZERO checkout in the customer browser',
        purpose: 'Return sanitized rates plus a 15-minute HMAC-signed quote tied to the cart fingerprint, weight, destination, and courier.',
        security: 'The quote token prevents the browser from changing shipping_price, courier, cart subtotal, or total weight.',
        request: { items: [item], voucher_code: '', destination_area_id: 'IDNP5IDNC…IDZ55581', destination_area_name: 'Ngaglik, Sleman, DI Yogyakarta. 55581', destination_postal_code: '55581' },
        response: { ok: true, items_subtotal: 78000, total_weight_grams: 960, rates: [{ courier_name: 'JNE', courier_service_name: 'REG', shipping_price: 18000, payment_total: 96000, quote_token: 'eyJ2ZXJzaW9uIjoxLC4uLn0.•••' }] },
    },
    {
        owner: 'provider', ownerLabel: 'ZERO server → Duitku', name: 'Duitku POP: Create Invoice', short: 'Create payment',
        method: 'POST', endpoint: 'https://api-sandbox.duitku.com/api/merchant/createInvoice', caller: 'ZERO commerce server after verifying the signed quote',
        purpose: 'Create the hosted Duitku payment page for the exact server-calculated products + shipping total.',
        security: 'Headers include x-duitku-merchantcode, timestamp, and HMAC-SHA256 signature. The merchant key stays server-side.',
        request: { paymentAmount: 96000, merchantOrderId: 'ZEROWEB-20260731-123456', productDetails: 'ZERO Foods order ZEROWEB-20260731-123456', paymentMethod: '', customerVaName: 'Test Customer', email: 'test@example.com', phoneNumber: '081234567890', itemDetails: [{ name: 'ZERO Syrup Plain 250ml', price: 78000, quantity: 2 }, { name: 'Shipping - JNE REG', price: 18000, quantity: 1 }], callbackUrl: 'https://admin.jenanggemi.com/api/zero-commerce/?action=duitku_callback', returnUrl: 'https://zerofoods.id/payment-status?order=…&token=…', expiryPeriod: 15 },
        response: { merchantCode: 'DXXXX', reference: 'DXXXXS875LXXXX32IJZ7', paymentUrl: 'https://app-sandbox.duitku.com/redirect_checkout?reference=DXXXXS875LXXXX32IJZ7', statusCode: '00', statusMessage: 'SUCCESS' },
    },
    {
        owner: 'provider', ownerLabel: 'Duitku → ZERO server', name: 'Duitku Payment Callback', short: 'Confirm payment',
        method: 'POST · x-www-form-urlencoded', endpoint: '/api/zero-commerce/?action=duitku_callback', caller: 'Duitku server (not the customer redirect)',
        purpose: 'Confirm payment. Only a callback with the expected merchant, amount, order ID, result, and HMAC can mark the order paid.',
        security: 'Signature formula: HMAC_SHA256(merchantCode + amount + merchantOrderId, merchantKey).',
        request: { merchantCode: 'DXXXX', amount: '96000', merchantOrderId: 'ZEROWEB-20260731-123456', paymentCode: 'NQ', resultCode: '00', reference: 'DXXXXCX80TXXX5Q70QCI', publisherOrderId: 'MGUHWKJX3M1KMSQN5', signature: 'hmac_sha256_hex' },
        response: { ok: true, paid: true, shipment_created: true, order_id: 'ZEROWEB-20260731-123456' },
    },
    {
        owner: 'provider', ownerLabel: 'ZERO server → Biteship', name: 'Biteship Orders: Create an Order', short: 'Book shipment',
        method: 'POST', endpoint: 'https://api.biteship.com/v1/orders', caller: 'ZERO server only after verified Duitku resultCode 00',
        purpose: 'Create the real or simulated courier shipment and receive the Biteship order, tracking, waybill, route, and status.',
        security: 'Sandbox uses biteship_test.* and never dispatches a courier. Production requires biteship_live.* and explicit production mode.',
        request: { shipper_organization: 'ZERO Foods Indonesia', origin_contact_name: 'ZERO Fulfillment', origin_contact_phone: '085842833973', origin_address: 'Jl. Jombor Tegal No.124 A, Sleman, Yogyakarta', origin_area_id: 'IDNP5IDNC…ORIGIN', origin_collection_method: 'pickup', destination_contact_name: 'Test Customer', destination_contact_phone: '081234567890', destination_contact_email: 'test@example.com', destination_address: 'Full customer address', destination_area_id: 'IDNP5IDNC…IDZ55581', courier_company: 'jne', courier_type: 'reg', delivery_type: 'now', reference_id: 'ZEROWEB-20260731-123456', items: [{ name: 'ZERO Syrup Plain 250ml', category: 'food_and_drink', sku: 'ZEROSYRP001', value: 39000, quantity: 2, weight: 480 }] },
        response: { success: true, object: 'order', id: '5dd599ebdefcd4158eb8470b', courier: { tracking_id: '6de509ebdefgh4158ij3451c', waybill_id: 'WYB-1112223333443', company: 'jne', type: 'reg', routing_code: 'JOG-A' }, reference_id: 'ZEROWEB-20260731-123456', price: 18000, status: 'confirmed' },
    },
    {
        owner: 'provider', ownerLabel: 'Biteship → ZERO server', name: 'Biteship Order Webhook', short: 'Track shipment',
        method: 'POST', endpoint: '/api/zero-commerce/?action=biteship_webhook', caller: 'Biteship webhook service',
        purpose: 'Keep the ZERO order synchronized when the shipment status, actual price, tracking ID, or waybill changes.',
        security: 'Biteship sends the configured X-Zero-Webhook-Secret header. Its value must match the server-only secret; duplicate events are safe to replay.',
        request: { headers: { 'X-Zero-Webhook-Secret': '••••••', 'Content-Type': 'application/json' }, body: { event: 'order.status', courier_tracking_id: '6de509ebdefgh4158ij3451c', courier_waybill_id: 'WYB-1112223333443', courier_company: 'JNE', courier_type: 'REG', order_id: '5dd599ebdefcd4158eb8470b', order_price: 18000, status: 'in_transit' } },
        response: { ok: true, received: true, event: 'order.status', order_id: '5dd599ebdefcd4158eb8470b' },
    },
    {
        owner: 'zero', ownerLabel: 'Admin browser ← ZERO server', name: 'ZERO A5 Shipping Label', short: 'Print A5',
        method: 'GET', endpoint: '/api/zero-commerce/?action=label&order=ZEROWEB-20260731-123456', caller: 'Authenticated ZERO/Jenang Gemi admin',
        purpose: 'Render an A5 print layout using Biteship’s waybill, routing code, courier, recipient, package weight, and SKU contents.',
        security: 'Biteship has no shipping-label API. This authenticated ZERO endpoint generates the label; it is not public customer data.',
        request: { query: { action: 'label', order: 'ZEROWEB-20260731-123456' }, authentication: 'Executive Dashboard session required' },
        response: { content_type: 'text/html; charset=utf-8', print_css: '@page { size: A5 portrait; margin: 7mm; }', includes: ['Code 128 waybill barcode', 'courier + service', 'routing code', 'sender', 'recipient + phone', 'weight', 'SKU contents', 'SANDBOX watermark when testing'] },
    },
];

const flow = document.querySelector('#commerce-flow');
const jsonNode = document.querySelector('#api-json');
const state = { active: 0, tab: 'request' };

const renderInspector = () => {
    const stage = stages[state.active];
    document.querySelectorAll('.flow-stage').forEach((button, index) => button.setAttribute('aria-pressed', String(index === state.active)));
    document.querySelector('#api-owner').textContent = stage.ownerLabel;
    document.querySelector('#api-name').textContent = stage.name;
    document.querySelector('#api-purpose').textContent = stage.purpose;
    document.querySelector('#api-method').textContent = stage.method;
    document.querySelector('#api-endpoint').textContent = stage.endpoint;
    document.querySelector('#api-caller').textContent = stage.caller;
    document.querySelector('#api-security').textContent = stage.security;
    document.querySelector('#json-caption').textContent = state.tab === 'request' ? 'Exact request example' : 'Exact response example';
    jsonNode.textContent = JSON.stringify(stage[state.tab], null, 2);
};

stages.forEach((stage, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'flow-stage';
    button.dataset.owner = stage.owner;
    button.innerHTML = `<span class="stage-number">${String(index + 1).padStart(2, '0')}</span><span class="stage-owner">${stage.ownerLabel}</span><strong>${stage.name}</strong><small>${stage.short}</small>`;
    button.addEventListener('click', () => { state.active = index; renderInspector(); document.querySelector('.api-inspector')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
    flow.appendChild(button);
});

document.querySelectorAll('[data-json-tab]').forEach((button) => {
    button.addEventListener('click', () => {
        state.tab = button.dataset.jsonTab;
        document.querySelectorAll('[data-json-tab]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
        renderInspector();
    });
});

document.querySelector('#copy-json')?.addEventListener('click', async (event) => {
    await navigator.clipboard.writeText(jsonNode.textContent);
    event.currentTarget.textContent = 'Copied';
    window.setTimeout(() => { event.currentTarget.textContent = 'Copy JSON'; }, 1200);
});

renderInspector();

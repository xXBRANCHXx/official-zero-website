const endpoint = (import.meta.env.VITE_ZERO_COMMERCE_API_URL || window.ZERO_COMMERCE_API_URL || '').trim();
const query = new URLSearchParams(window.location.search);
const orderId = query.get('order') || '';
const token = query.get('token') || '';
const title = document.querySelector('#payment-title');
const message = document.querySelector('#payment-message');
const details = document.querySelector('#payment-details');
let checks = 0;
const formatPrice = (value) => `Rp${new Intl.NumberFormat('id-ID').format(Number(value || 0))}`;
const renderDetails = (order) => {
    const rows = [
        ['Order', order.order_id],
        ['Total', formatPrice(order.payment_total)],
        ['Courier', order.courier || '—'],
        ['Waybill', order.waybill_id || 'Pending'],
        ['Mode', String(order.mode).toUpperCase()],
    ];
    details.replaceChildren(...rows.map(([label, value]) => {
        const row = document.createElement('div');
        const term = document.createElement('dt');
        const description = document.createElement('dd');
        term.textContent = label;
        description.textContent = value;
        row.append(term, description);
        return row;
    }));
};

const checkStatus = async () => {
    if (!endpoint || !orderId || !token) {
        title.textContent = 'Payment status unavailable';
        message.textContent = 'This return link is incomplete. Contact ZERO with your Duitku reference.';
        return;
    }
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.set('action', 'status');
    url.searchParams.set('order', orderId);
    url.searchParams.set('token', token);
    try {
        const response = await fetch(url, { headers: { Accept: 'application/json' }, credentials: 'omit' });
        const data = await response.json();
        if (!response.ok || !data.ok) throw new Error(data.error || 'Status request failed.');
        const order = data.order;
        const paid = order.payment_status === 'PAID';
        title.textContent = paid ? 'Payment confirmed' : 'Payment is still pending';
        message.textContent = paid
            ? (order.waybill_id ? 'Your payment and Biteship shipment are confirmed.' : 'Payment is confirmed. The shipping order is being prepared.')
            : 'Duitku has not sent a verified successful callback yet.';
        renderDetails(order);
        if (paid) { localStorage.removeItem('zero_products_cart_v1'); return; }
        checks += 1;
        if (checks < 12) window.setTimeout(checkStatus, 5000);
    } catch (error) {
        title.textContent = 'Unable to check payment';
        message.textContent = error instanceof Error ? error.message : 'Please refresh this page.';
    }
};

document.querySelector('#payment-refresh')?.addEventListener('click', checkStatus);
checkStatus();

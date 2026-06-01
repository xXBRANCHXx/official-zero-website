const ANALYTICS_ENDPOINT = import.meta.env.VITE_ZERO_ANALYTICS_ENDPOINT || window.ZERO_ANALYTICS_ENDPOINT || 'https://jenanggemi.com/analytics.php';
const DEVICE_COOKIE = 'jg_analytics_device_id';
const DEVICE_MAX_AGE = 60 * 60 * 24 * 365 * 2;

const createDeviceId = () => {
    if (window.crypto?.randomUUID) return `device-${window.crypto.randomUUID()}`;
    return `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readCookie = (name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : '';
};

const writeCookie = (name, value, maxAgeSeconds) => {
    const parts = [
        `${name}=${encodeURIComponent(value)}`,
        'Path=/',
        'SameSite=Lax',
        `Max-Age=${maxAgeSeconds}`,
    ];
    if (window.location.protocol === 'https:') parts.push('Secure');
    document.cookie = parts.join('; ');
};

const ensureDeviceId = () => {
    const existing = readCookie(DEVICE_COOKIE);
    if (existing) return existing;
    const created = createDeviceId();
    writeCookie(DEVICE_COOKIE, created, DEVICE_MAX_AGE);
    return created;
};

const createSessionId = () => {
    const key = 'zero_analytics_session_id';
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const created = `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(key, created);
    return created;
};

const sendEvent = (eventType, extra = {}) => {
    if (!ANALYTICS_ENDPOINT) return;

    const payload = {
        event_type: eventType,
        session_id: createSessionId(),
        device_id: ensureDeviceId(),
        source: 'zero',
        traffic_kind: 'website',
        site_key: 'zero',
        site_label: 'Official ZERO Website',
        page_path: window.location.pathname,
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer,
        occurred_at: new Date().toISOString(),
        ...extra,
    };

    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(ANALYTICS_ENDPOINT, new Blob([body], { type: 'application/json' }));
        return;
    }

    fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'omit',
    }).catch(() => {});
};

export const initZeroAnalytics = () => {
    if (!ANALYTICS_ENDPOINT) return;

    const startedAt = performance.now();
    sendEvent('page_view');

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        const button = event.target.closest('button');
        const cta = link || button;
        if (!cta) return;

        const label = cta.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) || '';
        const href = link?.href || '';
        if (href.includes('api.whatsapp.com') || href.includes('wa.me')) {
            sendEvent('checkout_click', { cta_location: label || 'WhatsApp checkout' });
        } else if (cta.id?.includes('add') || label.toLowerCase().includes('add to cart')) {
            sendEvent('add_to_cart_click', { cta_location: label || cta.id || '' });
        }
    });

    window.addEventListener('pagehide', () => {
        sendEvent('time_spent', {
            elapsed_ms: Math.max(0, Math.round(performance.now() - startedAt)),
        });
    });
};

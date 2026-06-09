const ANALYTICS_ENDPOINT = import.meta.env.VITE_ZERO_ANALYTICS_ENDPOINT || window.ZERO_ANALYTICS_ENDPOINT || 'https://jenanggemi.com/analytics.php';
const DEVICE_COOKIE = 'jg_analytics_device_id';
const DEVICE_MAX_AGE = 60 * 60 * 24 * 365 * 2;
const EVENT_QUEUE_KEY = 'zero_analytics_event_queue';

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

const buildEvent = (eventType, extra = {}) => ({
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
});

const readQueuedEvents = () => {
    try {
        const queued = JSON.parse(localStorage.getItem(EVENT_QUEUE_KEY) || '[]');
        return Array.isArray(queued) ? queued.slice(-20) : [];
    } catch {
        return [];
    }
};

const writeQueuedEvents = (events) => {
    try {
        localStorage.setItem(EVENT_QUEUE_KEY, JSON.stringify(events.slice(-20)));
    } catch {
        // Analytics must never interrupt the storefront.
    }
};

const sendBeaconPayload = (payload) => {
    if (!ANALYTICS_ENDPOINT || !navigator.sendBeacon) return false;
    return navigator.sendBeacon(
        ANALYTICS_ENDPOINT,
        new Blob([JSON.stringify(payload)], { type: 'text/plain' })
    );
};

const sendPayload = async (payload) => {
    if (!ANALYTICS_ENDPOINT) return false;

    const body = JSON.stringify(payload);
    const response = await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'omit',
    });
    return response.ok;
};

const sendEvent = (eventType, extra = {}, useBeacon = false) => {
    const payload = buildEvent(eventType, extra);
    if (useBeacon && sendBeaconPayload(payload)) return;

    sendPayload(payload).catch(() => {
        writeQueuedEvents([...readQueuedEvents(), payload]);
    });
};

const flushQueuedEvents = async () => {
    const queued = readQueuedEvents();
    if (!queued.length) return;

    const remaining = [];
    for (const payload of queued) {
        try {
            if (!await sendPayload(payload)) remaining.push(payload);
        } catch {
            remaining.push(payload);
        }
    }
    writeQueuedEvents(remaining);
};

export const initZeroAnalytics = () => {
    if (!ANALYTICS_ENDPOINT) return;

    const startedAt = performance.now();
    let visibleStartedAt = document.visibilityState === 'visible' ? performance.now() : null;
    let visibleElapsedMs = 0;

    flushQueuedEvents();
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
        }
    });

    window.addEventListener('zero-commerce-event', (event) => {
        const detail = event.detail || {};
        sendEvent(detail.eventType || 'commerce_event', {
            product_code: detail.productCode || '',
            product_label: detail.productLabel || '',
            flavor_code: detail.flavorCode || '',
            flavor_label: detail.flavorLabel || '',
            package_size: detail.packageSize || '',
            package_label: detail.packageLabel || '',
            package_price: String(detail.packagePrice || ''),
            cta_location: detail.ctaLocation || '',
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            visibleStartedAt = performance.now();
            return;
        }
        if (visibleStartedAt !== null) {
            visibleElapsedMs += performance.now() - visibleStartedAt;
            visibleStartedAt = null;
        }
    });

    window.addEventListener('pagehide', () => {
        if (visibleStartedAt !== null) {
            visibleElapsedMs += performance.now() - visibleStartedAt;
        }
        sendEvent('time_spent', {
            elapsed_ms: Math.max(0, Math.round(visibleElapsedMs || (performance.now() - startedAt))),
        }, true);
    });
};

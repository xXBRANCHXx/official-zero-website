# Catalog and checkout

The catalog keeps the existing ZERO copy, photos, translations and flavor → size
selection. The catalog feed now determines the visible flavors and sizes, including
new dashboard entries. Missing or inactive entries cannot be added to the cart.

Images stay at the product level: the catalog selector has no flavor photos, and
the dedicated product pages keep their shared carousels. The supplied Meet Mini
image leads the Syrup carousel and appears on its catalog card.

The existing cart storage key, voucher API, order API, idempotency keys, WhatsApp
handoff and optional Biteship/Duitku flow remain in place. Opening the cart and
starting checkout refresh the saved item prices and availability. Checkout shows
an order summary above the existing delivery fields.

Deploy together with the dashboard's ZERO catalog editor. The dashboard resolves
SKU prices / website overrides and scheduled discounts for both the public feed
and the order writer. The website remains compatible with the old catalog API.

## Local preview

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4182
```

Open http://127.0.0.1:4182/catalog/. The Vite development proxy reads the existing
public catalog. Order submission is not configured in this local preview.

## Validation

```sh
npx playwright install chromium
npm run test:catalog
npm run test:articles
npm run build
```

The browser test expects the development server at port 4182 (`ZERO_TEST_URL`
overrides this). It intercepts every commerce API call and the WhatsApp handoff;
it never places a live order. `CHROMIUM_PATH` can select an installed Chromium,
and `PLAYWRIGHT_MODULE` can select an existing Playwright installation.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const siteUrl = 'https://zerofoods.id';

const routes = [
    { path: '/', file: 'index.html' },
    { path: '/catalog/', file: 'catalog.html' },
    { path: '/zero-syrup/', file: 'syrup.html', script: 'syrup.js' },
    { path: '/zero-drops/', file: 'drops.html', script: 'drops.js' },
    { path: '/zero-maple-topping/', file: 'maple-topping.html', script: 'maple-topping.js' },
    { path: '/zfit/', file: 'zfit.html', script: 'zfit.js' },
    { path: '/about-zero/', file: 'about.html' },
    { path: '/zero-social/', file: 'social.html' },
    { path: '/legal-info/', file: 'legal.html' },
];

const escapeXml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const absoluteUrl = (path) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${siteUrl}${normalized.split('/').map((segment) => encodeURIComponent(decodeURIComponent(segment))).join('/')}`;
};

const extractHtmlImages = (html) => {
    const images = [];
    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
        const tag = match[0];
        const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] || '';
        const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1] || '';
        if (src.startsWith('/') && !src.toLowerCase().endsWith('.svg')) {
            images.push({ src, title: alt });
        }
    }
    return images;
};

const extractScriptImages = (source) => {
    const images = [];
    for (const match of source.matchAll(/["'](\/ZERO Media\/[^"']+\.(?:png|jpe?g|webp|avif))["']/gi)) {
        images.push({ src: match[1], title: '' });
    }
    return images;
};

const productData = readFileSync(join(projectRoot, 'zero-products.js'), 'utf8');

const routeImages = routes.map((route) => {
    const html = readFileSync(join(projectRoot, route.file), 'utf8');
    const images = extractHtmlImages(html);

    if (route.script) {
        images.push(...extractScriptImages(readFileSync(join(projectRoot, route.script), 'utf8')));
    }

    if (route.path === '/catalog/' || route.path.startsWith('/zero-') || route.path === '/zfit/') {
        const productImages = extractScriptImages(productData);
            images.push(...productImages.filter(({ src }) => {
                const value = src.toLowerCase();
                if (route.path === '/catalog/') return true;
                if (route.path === '/zfit/') return value.includes('/zfit/') || value.includes('fiber syrup') || value.includes('acvs');
                if (route.path === '/zero-maple-topping/') return value.includes('maple');
                if (route.path === '/zero-syrup/') return value.includes('/zero syrup');
                if (route.path === '/zero-drops/') return value.includes('/zero drops');
                return false;
            }));
    }

    const deduped = new Map();
    for (const image of images) {
        if (!deduped.has(image.src) || (!deduped.get(image.src).title && image.title)) {
            deduped.set(image.src, image);
        }
    }

    return { ...route, images: [...deduped.values()] };
});

const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
  </url>`).join('\n')}
</urlset>
`;

const imagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routeImages.filter((route) => route.images.length).map((route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
${route.images.map((image) => `    <image:image>
      <image:loc>${escapeXml(absoluteUrl(image.src))}</image:loc>
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`;

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-images.xml</loc>
  </sitemap>
</sitemapindex>
`;

for (const [fileName, content] of [
    ['sitemap.xml', indexXml],
    ['sitemap-pages.xml', pagesXml],
    ['sitemap-images.xml', imagesXml],
]) {
    writeFileSync(join(projectRoot, fileName), content);
    writeFileSync(join(projectRoot, 'public', fileName), content);
}

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('articles.html');
const css = read('articles.css');
const js = read('articles.js');
const nav = read('index.js');
const redirects = read('scripts/clean-routes.mjs');
const sitemap = read('scripts/generate-sitemaps.mjs');
const robots = read('robots.txt');
const llms = read('llms.txt');

const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const topic of ['healthy-eating', 'keeping-fit', 'losing-weight', 'diabetes-remission']) {
  expect(html.includes(`data-topic-link="${topic}"`), `The bento is missing ${topic}.`);
  expect(js.includes(`'${topic}'`), `The article router is missing ${topic}.`);
  expect(llms.includes(`/articles/${topic}/`), `AI discovery copy is missing ${topic}.`);
}

expect((html.match(/images\.unsplash\.com/g) || []).length >= 4, 'Each topic needs fitting online photography.');
expect(html.includes('href="/index.css"') && html.includes('class="floating-nav"') && html.includes('class="footer-shell"'), 'Articles must reuse the official ZERO site navigation, typography, and footer system.');
expect(css.includes('.topic-card::before') && css.includes('mix-blend-mode: color'), 'Topic images need the blue duotone overlay.');
expect(css.includes('.topic-card:hover img') && css.includes('filter: none'), 'Topic photography must return to full color on hover.');
expect(css.includes('--articles-accent: #1dbfd3') && !css.includes('#071b54'), 'The article experience must use the site cyan branding instead of the old purple-heavy treatment.');
expect(!css.includes('gradient') && !html.includes('articles-orbit'), 'The article landing page must stay flat and restrained, without gradients or the ZERO orbit graphic.');
expect(js.includes('const initMotion') && js.includes("addEventListener('pointermove'") && js.includes('IntersectionObserver'), 'The bento and article cards need polished reveal and pointer animations.');
expect(js.includes("isSandbox ? 'noindex, nofollow, noarchive'"), 'Sandbox routes must remain outside search indexes.');
expect(js.includes("'@type': 'Article'") && html.includes('data-articles-schema'), 'Article pages need structured Article metadata.');
expect(js.includes('datePublished') && js.includes('mainEntityOfPage'), 'Article schema needs publication and canonical page data.');
expect(nav.includes("payload.visibility !== 'live'") && nav.includes("label: 'Articles'"), 'Main-site article navigation must only appear in live mode.');
expect(redirects.includes('/articles/* /articles/index.html 200'), 'Clean article URLs need a static-host rewrite.');
expect(sitemap.includes("path: '/articles/'"), 'The article collection must be discoverable in the sitemap.');
expect(robots.includes('Allow: /'), 'Search and AI crawlers must be allowed to access live pages.');

console.log('articles UI tests passed');

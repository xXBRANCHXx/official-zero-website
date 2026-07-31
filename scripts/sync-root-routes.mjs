import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const routes = [
    ['catalog.html', 'catalog'],
    ['syrup.html', 'zero-syrup'],
    ['drops.html', 'zero-drops'],
    ['maple-topping.html', 'zero-maple-topping'],
    ['zfit.html', 'zfit'],
    ['about.html', 'about-zero'],
    ['social.html', 'zero-social'],
    ['legal.html', 'legal-info'],
    ['articles.html', 'articles'],
    ['commerce-lab.html', 'commerce-lab'],
    ['payment-status.html', 'payment-status'],
];

for (const [sourceFile, routePath] of routes) {
    const routeDir = join(projectRoot, routePath);
    mkdirSync(routeDir, { recursive: true });
    copyFileSync(join(projectRoot, sourceFile), join(routeDir, 'index.html'));
}

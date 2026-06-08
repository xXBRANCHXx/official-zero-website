import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, 'dist');

const routes = [
    ['catalog.html', 'catalog'],
    ['syrup.html', 'zero-syrup'],
    ['drops.html', 'zero-drops'],
    ['maple-topping.html', 'zero-maple-topping'],
    ['zfit.html', 'zfit'],
    ['about.html', 'about-zero'],
    ['social.html', 'zero-social'],
    ['legal.html', 'legal-info'],
];

for (const [fileName, routePath] of routes) {
    const source = join(distRoot, fileName);
    if (!existsSync(source)) {
        throw new Error(`Expected build output not found: ${fileName}`);
    }

    const routeDir = join(distRoot, routePath);
    mkdirSync(routeDir, { recursive: true });
    renameSync(source, join(routeDir, 'index.html'));
}

const redirectLines = routes.map(([fileName, routePath]) => `/${fileName} /${routePath} 301`);
redirectLines.unshift('/index.html / 301');
writeFileSync(join(distRoot, '_redirects'), `${redirectLines.join('\n')}\n`);

const vercelConfig = {
    cleanUrls: true,
    trailingSlash: false,
    redirects: [
        { source: '/index.html', destination: '/', permanent: true },
        ...routes.map(([fileName, routePath]) => ({
            source: `/${fileName}`,
            destination: `/${routePath}`,
            permanent: true,
        })),
    ],
};

writeFileSync(join(distRoot, 'vercel.json'), `${JSON.stringify(vercelConfig, null, 2)}\n`);

for (const [fileName] of routes) {
    rmSync(join(distRoot, fileName), { force: true });
}

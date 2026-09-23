# Article delivery and indexing

On Hostinger, `.htaccess` routes `/articles/` and its descendants to
`articles.php`. The controller reads the existing public blog API and fills the
built `articles/index.html` template with the page's full content, title,
description, canonical URL, social metadata, and structured data. The browser
script preserves this content and adds the existing motion and video controls.

The template itself stays `noindex` for safe development/static previews. The
production response is `index` only for available, public routes. Sandbox pages
stay `noindex` in both HTML and HTTP headers. Missing, future, or withdrawn public
articles return 404; an upstream outage returns 503 with `Retry-After`.

The existing `/sitemap.xml` now references `/sitemap-articles.xml`, served by
`sitemap-articles.php`. It reads the public feed on each request and includes the
collection, populated topics, and published articles with real modification
dates. New stories appear as their publication times arrive, without a build or
manual sitemap edit. Both endpoints avoid full-page caching so delivery changes
are respected. Article bodies are sanitized by the existing upstream API.

## Deployment

Run `npm run build` and commit the source and tracked `dist` output together.
Hostinger deploys `master` automatically. Keep the PHP files and `.htaccess`
alongside the built HTML; the article routes require PHP-enabled hosting. Vite's
development preview still uses the original client-rendered article UI.

## Verification

```sh
npm run test:articles
npm run test:article-indexing # PHP 8+, with DOM and SimpleXML
npm run build
```

After deployment, fetch a published article without JavaScript and verify its
full text, self-referencing canonical, `index` robots rule, and 200 status. Check
that a missing article returns 404, sandbox responses stay `noindex`, and
`/sitemap-articles.xml` contains only public posts. Use Search Console URL
Inspection to request a recrawl; submit `/sitemap.xml` if not already submitted.

<?php
declare(strict_types=1);
require __DIR__ . '/article-delivery.php';

header('Cache-Control: no-store, max-age=0');
try {
    // Always read the public feed; sandbox query parameters have no effect.
    $xml = zero_article_sitemap(zero_article_feed());
    header('Content-Type: application/xml; charset=utf-8');
    echo $xml;
} catch (Throwable $error) {
    error_log('ZERO article sitemap: ' . $error->getMessage());
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    header('Retry-After: 60');
    echo 'The article sitemap is temporarily unavailable. Please retry shortly.';
}

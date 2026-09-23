<?php
declare(strict_types=1);
require __DIR__ . '/article-delivery.php';

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/articles/', PHP_URL_PATH) ?: '/articles/';
if ($path === '/articles.php' || $path === '/articles.html' || $path === '/articles/index.html') {
    header('Location: /articles/', true, 301);
    exit;
}
$sandbox = preg_match('~^/articles/sandbox(?:/|$)~', $path) === 1;
$failed = false;
try {
    $payload = zero_article_feed($sandbox);
} catch (Throwable $error) {
    error_log('ZERO article delivery: ' . $error->getMessage());
    $payload = [];
    $failed = true;
}
try {
    $template = file_get_contents(__DIR__ . '/articles/index.html');
    if ($template === false) throw new RuntimeException('Article template is unavailable.');
    $response = zero_article_response($template, $path, $payload, $failed);
    http_response_code($response['status']);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Robots-Tag: ' . $response['robots']);
    // Do not retain previews or withdrawn stories in a CDN/full-page cache.
    header('Cache-Control: no-store, max-age=0');
    if ($response['status'] === 503) header('Retry-After: 60');
    echo $response['html'];
} catch (Throwable $error) {
    error_log('ZERO article rendering: ' . $error->getMessage());
    http_response_code(503);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('Retry-After: 60');
    echo '<!doctype html><html><head><title>Articles temporarily unavailable</title></head><body><h1>Articles temporarily unavailable</h1><p>Please try again shortly.</p></body></html>';
}

<?php
declare(strict_types=1);
require dirname(__DIR__) . '/public/article-delivery.php';

set_error_handler(static function ($severity, $message, $file, $line): never {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

function check(bool $condition, string $message): void
{
    if (!$condition) throw new RuntimeException($message);
}

function document(string $html): DOMXPath
{
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $html);
    libxml_clear_errors();
    return new DOMXPath($dom);
}

$template = file_get_contents(dirname(__DIR__) . '/articles.html');
$post = [
    'title' => 'Food & health: "A guide"', 'slug' => 'food-health', 'topic' => 'healthy-eating',
    'excerpt' => 'Practical <tips> & guidance', 'body_html' => '<h2>Complete article</h2><p>Readable without JavaScript.</p><section><p>Nested content.</p></section>',
    'scheduled_at_utc' => '2026-01-01T09:00:00+00:00', 'updated_at' => '2026-02-01T09:00:00+00:00',
];
$future = [...$post, 'slug' => 'future-story', 'scheduled_at_utc' => '2099-01-01T00:00:00Z'];
$draft = [...$post, 'slug' => 'draft-story', 'status' => 'draft'];
$payload = ['ok' => true, 'available' => true, 'visibility' => 'live', 'posts' => [$post, $future, $draft]];
$response = zero_article_response($template, '/articles/healthy-eating/food-health/', $payload);
$doc = document($response['html']);
check($response['status'] === 200, 'Published articles must return 200.');
check($doc->evaluate('string(//meta[@name="robots"]/@content)') === 'index, follow, max-image-preview:large', 'Published HTML must be indexable before JavaScript.');
check($doc->evaluate('string(//link[@rel="canonical"]/@href)') === ZERO_ARTICLE_ORIGIN . '/articles/healthy-eating/food-health/', 'Canonical must identify this article.');
check($doc->evaluate('string(//title)') === $post['title'] . ' | ZERO Foods Indonesia', 'Article title must be escaped without corruption.');
check($doc->evaluate('string(//article/header/h1)') === $post['title'], 'Article heading must be present in source HTML.');
check(str_contains($response['html'], 'Readable without JavaScript.'), 'Body must be server-rendered.');
check($doc->query('//main/section[@data-results]/article//section/p')->length === 1, 'Nested article sections must preserve the template structure.');
check($doc->query('//body[contains(@class,"site-loaded")]')->length === 1, 'JavaScript-disabled visitors must not be trapped behind the loader.');
check($doc->query('//main[@data-server-rendered="true"]')->length === 1, 'Client must preserve server-rendered content.');
$schema = json_decode($doc->evaluate('string(//script[@data-articles-schema])'), true, 512, JSON_THROW_ON_ERROR);
check($schema['@type'] === 'Article' && $schema['headline'] === $post['title'], 'Article structured data must be available in initial HTML.');

$library = zero_article_response($template, '/articles/', $payload);
$doc = document($library['html']);
check($doc->query('//a[@class="article-card is-visible"]')->length === 1, 'Library must expose crawlable links to published stories only.');
check(!str_contains($library['html'], 'future-story') && !str_contains($library['html'], 'draft-story'), 'Future and draft content must not leak into the public library.');
$topic = zero_article_response($template, '/articles/healthy-eating/', $payload);
check($topic['status'] === 200 && str_contains($topic['html'], 'href="/articles/healthy-eating/food-health/"'), 'Topic pages must link to their articles.');

foreach (['/articles/healthy-eating/future-story/', '/articles/healthy-eating/draft-story/', '/articles/healthy-eating/missing/', '/articles/unknown/', '/articles/healthy-eating/food-health/extra/'] as $path) {
    $missing = zero_article_response($template, $path, $payload);
    check($missing['status'] === 404 && str_starts_with($missing['robots'], 'noindex'), 'Missing, future, and invalid routes need an actual 404.');
    check(!str_contains($missing['html'], 'Readable without JavaScript.'), 'An invalid route must never expose a published article body.');
}
$sandbox = zero_article_response($template, '/articles/sandbox/healthy-eating/future-story/', $payload);
check($sandbox['status'] === 200 && str_starts_with($sandbox['robots'], 'noindex'), 'Sandbox may render future stories but must be noindex.');
check(!str_contains($sandbox['html'], 'data-sandbox-banner hidden'), 'Sandbox must retain its visible banner.');
$off = [...$payload, 'available' => false, 'visibility' => 'off'];
check(zero_article_response($template, '/articles/', $off)['status'] === 404, 'Delivery off must remain unavailable.');
check(zero_article_response($template, '/articles/', [], true)['status'] === 503, 'Upstream failure should be retryable, not a cached empty success.');

$xml = simplexml_load_string(zero_article_sitemap($payload));
check($xml !== false && count($xml->url) === 3, 'Sitemap must include collection, populated topic, and published article.');
check(!str_contains($xml->asXML(), 'future-story') && !str_contains($xml->asXML(), 'draft-story'), 'Sitemap must exclude future and draft posts.');
check((string) $xml->url[2]->lastmod === '2026-02-01T09:00:00+00:00', 'Sitemap must use the real modification time.');
check(count(simplexml_load_string(zero_article_sitemap($off))->url) === 0, 'Turning off delivery must remove article sitemap entries.');
$later = [...$payload, 'posts' => [$post, [...$future, 'scheduled_at_utc' => '2026-01-02T00:00:00Z']]];
check(count(simplexml_load_string(zero_article_sitemap($later))->url) === 4, 'Newly published stories must enter the sitemap without a build.');

$hostile = [...$post, 'title' => '</title><script>alert(1)</script>', 'seo_description' => '"><script>alert(2)</script>'];
$escaped = zero_article_response($template, '/articles/healthy-eating/food-health/', [...$payload, 'posts' => [$hostile]]);
check(!str_contains($escaped['html'], '<script>alert('), 'Metadata and JSON-LD must not allow script injection.');
echo "Article indexing tests passed\n";

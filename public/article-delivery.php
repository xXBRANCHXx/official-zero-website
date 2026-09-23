<?php
declare(strict_types=1);

// Shared by the HTML controller and live sitemap. The upstream API is the
// authority for delivery mode, publication schedules, and sanitized body HTML.
const ZERO_ARTICLE_ORIGIN = 'https://zerofoods.id';
const ZERO_ARTICLE_FEED = 'https://admin.jenanggemi.com/api/public-blog/';

function zero_article_escape($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function zero_article_topics(): array
{
    return [
        'healthy-eating' => ['label' => 'Healthy Eating', 'description' => 'Practical choices for more balanced meals, drinks, and daily routines.', 'photo' => 'photo-1498837167922-ddd27525d352'],
        'keeping-fit' => ['label' => 'Keeping Fit', 'description' => 'Useful ways to move consistently, recover well, and make fitness fit real life.', 'photo' => 'photo-1517836357463-d25dfeac3438'],
        'losing-weight' => ['label' => 'Losing Weight', 'description' => 'Sustainable habits for managing weight without losing sight of health or enjoyment.', 'photo' => 'photo-1535914254981-b5012eebbd15'],
        'diabetes-remission' => ['label' => 'Diabetes Remission', 'description' => 'Evidence-aware context for metabolic health and informed conversations with your care team.', 'photo' => 'photo-1505751172876-fa1923c5c528'],
    ];
}

function zero_article_feed(bool $sandbox = false): array
{
    // Never accept a request-supplied URL or forward arbitrary query parameters.
    $url = ZERO_ARTICLE_FEED . ($sandbox ? '?sandbox=1' : '');
    $context = stream_context_create(['http' => [
        'timeout' => 8,
        'ignore_errors' => true,
        'follow_location' => 0,
        'header' => "Accept: application/json\r\nUser-Agent: ZERO-Article-Delivery/1.0\r\n",
    ]]);
    $body = @file_get_contents($url, false, $context);
    $headers = function_exists('http_get_last_response_headers') ? http_get_last_response_headers() : ($http_response_header ?? []);
    if ($body === false || !preg_match('~^HTTP/\S+ 200(?:\s|$)~', $headers[0] ?? '')) {
        throw new RuntimeException('The article service is unavailable.');
    }
    $payload = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($payload) || ($payload['ok'] ?? false) !== true
        || !is_bool($payload['available'] ?? null) || !is_array($payload['posts'] ?? null)) {
        throw new RuntimeException('The article service returned an invalid response.');
    }
    return $payload;
}

function zero_article_posts(array $payload, bool $sandbox = false): array
{
    if (empty($payload['available']) || !in_array($payload['visibility'] ?? '', $sandbox ? ['live', 'sandbox'] : ['live'], true)) {
        return [];
    }
    $topics = zero_article_topics();
    return array_values(array_filter($payload['posts'] ?? [], static function ($post) use ($topics, $sandbox): bool {
        if (!is_array($post) || !isset($topics[$post['topic'] ?? ''])
            || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', (string) ($post['slug'] ?? ''))) {
            return false;
        }
        if (isset($post['status']) && !in_array($post['status'], ['published', 'scheduled'], true)) return false;
        $scheduled = $post['scheduled_at_utc'] ?? null;
        return $sandbox || !$scheduled || (($time = strtotime($scheduled)) !== false && $time <= time());
    }));
}

function zero_article_path(array $post, bool $sandbox = false): string
{
    return '/articles/' . ($sandbox ? 'sandbox/' : '') . rawurlencode($post['topic']) . '/' . rawurlencode($post['slug']) . '/';
}

function zero_article_image(array $post): string
{
    return ($post['featured_image_url'] ?? '') ?: 'https://images.unsplash.com/' . zero_article_topics()[$post['topic']]['photo'] . '?auto=format&fit=crop&w=1600&q=85';
}

function zero_article_date(?string $value): string
{
    if (!$value || strtotime($value) === false) return '';
    return (new DateTimeImmutable($value))->setTimezone(new DateTimeZone('Asia/Jakarta'))->format('j F Y');
}

function zero_article_sitemap(array $payload): string
{
    $entries = [];
    $posts = zero_article_posts($payload);
    if (!empty($payload['available']) && ($payload['visibility'] ?? '') === 'live') {
        $entries[] = ['path' => '/articles/'];
        foreach (array_unique(array_column($posts, 'topic')) as $topic) {
            $entries[] = ['path' => '/articles/' . $topic . '/'];
        }
    }
    foreach ($posts as $post) {
        $entries[] = ['path' => zero_article_path($post), 'modified' => $post['updated_at'] ?? $post['scheduled_at_utc'] ?? null];
    }
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    foreach ($entries as $entry) {
        $xml .= '  <url><loc>' . zero_article_escape(ZERO_ARTICLE_ORIGIN . $entry['path']) . '</loc>';
        $modified = isset($entry['modified']) ? strtotime($entry['modified']) : false;
        if ($modified !== false && $modified <= time()) $xml .= '<lastmod>' . gmdate(DATE_ATOM, $modified) . '</lastmod>';
        $xml .= "</url>\n";
    }
    return $xml . "</urlset>\n";
}

function zero_article_response(string $template, string $path, array $payload, bool $failed = false): array
{
    $parts = explode('/', trim($path, '/'));
    array_shift($parts);
    $sandbox = ($parts[0] ?? '') === 'sandbox';
    if ($sandbox) array_shift($parts);
    $topic = $parts[0] ?? '';
    $slug = $parts[1] ?? '';
    $topics = zero_article_topics();
    $base = '/articles' . ($sandbox ? '/sandbox' : '');
    $posts = zero_article_posts($payload, $sandbox);
    $available = !empty($payload['available']) && in_array($payload['visibility'] ?? '', $sandbox ? ['live', 'sandbox'] : ['live'], true);
    $valid = count($parts) <= 2 && (!$topic || isset($topics[$topic]));
    $post = null;
    foreach ($posts as $candidate) {
        if ($candidate['topic'] === $topic && $candidate['slug'] === $slug) $post = $candidate;
    }
    $status = $failed ? 503 : (!$available || !$valid || ($slug && !$post) ? 404 : 200);
    $robots = $status === 200 && !$sandbox ? 'index, follow, max-image-preview:large' : 'noindex, nofollow, noarchive';
    $canonical = ZERO_ARTICLE_ORIGIN . '/articles/' . ($valid && $topic ? $topic . '/' : '') . ($post ? $slug . '/' : '');
    $title = $topic && isset($topics[$topic]) ? $topics[$topic]['label'] . ' Articles | ZERO Foods Indonesia' : 'ZERO Articles | Practical Guides for Healthier Daily Habits';
    $description = $topics[$topic]['description'] ?? 'Explore practical ZERO Foods Indonesia guides on healthy eating, fitness, sustainable weight loss, and diabetes remission.';
    $image = 'https://images.unsplash.com/' . ($topics[$topic]['photo'] ?? $topics['healthy-eating']['photo']) . '?auto=format&fit=crop&w=1600&q=85';
    $schema = [];
    $e = 'zero_article_escape';

    if ($status !== 200) {
        $title = $failed ? 'Articles temporarily unavailable | ZERO Foods Indonesia' : 'Article not found | ZERO Foods Indonesia';
        $description = $failed ? 'Please try again shortly.' : 'This story is not currently published.';
        $content = '<section class="articles-unavailable"><h1>' . $e($failed ? 'Articles temporarily unavailable' : 'Article not found') . '</h1><p>' . $e($description) . '</p><a href="/articles/">Return to articles</a></section>';
    } elseif ($post) {
        $title = ($post['seo_title'] ?? '') ?: $post['title'] . ' | ZERO Foods Indonesia';
        $description = ($post['seo_description'] ?? '') ?: $post['excerpt'];
        $image = zero_article_image($post);
        $published = zero_article_date($post['scheduled_at_utc'] ?? $post['created_at'] ?? null);
        $updated = zero_article_date($post['updated_at'] ?? null);
        $author = ($post['author'] ?? '') ?: 'ZERO Editorial';
        $topicLink = $base . '/' . $topic . '/';
        $content = '<article class="article-view"><header class="article-view-header">'
            . '<a class="article-view-topic article-reveal is-visible" href="' . $e($topicLink) . '">' . $e($topics[$topic]['label']) . '</a>'
            . '<h1 class="article-reveal is-visible">' . $e($post['title']) . '</h1>'
            . '<p class="article-view-excerpt article-reveal is-visible">' . $e($post['excerpt']) . '</p>'
            . '<div class="article-view-meta article-reveal is-visible"><span>By ' . $e($author) . '</span><span>' . max(1, (int) ($post['reading_minutes'] ?? 1)) . ' min read</span>'
            . ($published ? '<span>Published ' . $e($published) . '</span>' : '')
            . ($updated && $updated !== $published ? '<span>Updated ' . $e($updated) . '</span>' : '') . '</div></header>'
            . '<img class="article-view-cover article-reveal is-visible" src="' . $e($image) . '" alt="' . $e($post['title']) . '" fetchpriority="high">'
            . '<div class="article-body article-reveal is-visible">' . ($post['body_html'] ?? '') . '</div>'
            . '<footer class="article-view-footer article-reveal is-visible"><a href="' . $e($topicLink) . '">← More in ' . $e($topics[$topic]['label']) . '</a><a href="' . $e($base) . '/">All topics</a></footer></article>';
        $schema = [
            '@context' => 'https://schema.org', '@type' => 'Article', 'headline' => $post['title'],
            'description' => $description, 'image' => [$image], 'mainEntityOfPage' => $canonical,
            'datePublished' => $post['scheduled_at_utc'] ?? $post['created_at'] ?? null, 'dateModified' => $post['updated_at'] ?? null,
            'author' => ['@type' => 'Person', 'name' => $author],
            'publisher' => ['@type' => 'Organization', 'name' => 'ZERO Foods Indonesia', 'url' => ZERO_ARTICLE_ORIGIN . '/'],
            'articleSection' => $topics[$topic]['label'],
        ];
    } else {
        $filtered = array_values(array_filter($posts, static fn ($item) => !$topic || $item['topic'] === $topic));
        $heading = $topics[$topic]['label'] ?? 'Latest stories';
        $content = '<div class="articles-results-head"><div><p>' . ($topic ? 'EXPLORE THE TOPIC' : 'NEW FROM ZERO') . '</p><h2>' . $e($heading) . '</h2></div>'
            . ($topic ? '<a class="articles-back" href="' . $e($base) . '/">← All four topics</a>' : '') . '</div><div class="article-grid">';
        foreach ($filtered as $item) {
            $content .= '<a class="article-card is-visible" href="' . $e(zero_article_path($item, $sandbox)) . '">'
                . '<span class="article-card-image"><img src="' . $e(zero_article_image($item)) . '" alt="' . $e($item['title']) . '" loading="lazy"></span>'
                . '<span class="article-card-meta"><span>' . $e($topics[$item['topic']]['label']) . '</span><span>' . $e(zero_article_date($item['scheduled_at_utc'] ?? $item['updated_at'] ?? null)) . '</span></span>'
                . '<h3>' . $e($item['title']) . '</h3><p>' . $e($item['excerpt']) . '</p></a>';
        }
        $content .= '</div>' . (!$filtered ? '<div class="articles-empty"><strong>No published stories here yet.</strong><p>Check back soon.</p></div>' : '');
        $schema = ['@context' => 'https://schema.org', '@type' => 'CollectionPage', 'name' => $heading, 'description' => $description, 'url' => $canonical,
            'mainEntity' => ['@type' => 'ItemList', 'numberOfItems' => count($filtered), 'itemListElement' => array_map(static fn ($item, $index) => [
                '@type' => 'ListItem', 'position' => $index + 1, 'url' => ZERO_ARTICLE_ORIGIN . zero_article_path($item), 'name' => $item['title'],
            ], $filtered, array_keys($filtered))]];
    }

    $html = preg_replace_callback('~<title>.*?</title>~s', static fn () => '<title>' . $e($title) . '</title>', $template, 1);
    $values = [
        'description' => $description, 'robots' => $robots, 'og:title' => $title, 'og:description' => $description,
        'og:type' => $post && $status === 200 ? 'article' : 'website', 'og:url' => $canonical, 'og:image' => $image,
        'twitter:title' => $title, 'twitter:description' => $description, 'twitter:image' => $image,
    ];
    $html = preg_replace_callback('~<meta\b[^>]*>~i', static function ($match) use ($values, $e) {
        if (!preg_match('~(?:name|property)="([^"]+)"~', $match[0], $name) || !isset($values[$name[1]])) return $match[0];
        return preg_replace_callback('~content="[^"]*"~', static fn () => 'content="' . $e($values[$name[1]]) . '"', $match[0]);
    }, $html);
    $html = preg_replace_callback('~<link\b[^>]*data-articles-canonical[^>]*>~', static fn () => '<link rel="canonical" href="' . $e($canonical) . '" data-articles-canonical>', $html);
    $html = preg_replace_callback('~(<script\b[^>]*data-articles-schema[^>]*>).*?(</script>)~s', static fn ($m) => $m[1] . json_encode($schema ?: new stdClass(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR) . $m[2], $html);
    $html = preg_replace_callback('~(<section\b[^>]*data-results[^>]*>).*?(</section>)~s', static fn ($m) => $m[1] . $content . $m[2], $html, 1, $replaced);
    if ($replaced !== 1) throw new RuntimeException('Article template is missing its results section.');
    $html = str_replace('data-articles-app ', 'data-articles-app data-server-rendered="true" ', $html);
    $html = str_replace('articles-page site-loading', 'articles-page site-loaded', $html);
    if ($topic || $status !== 200) {
        $html = str_replace('data-topic-bento>', 'data-topic-bento hidden>', $html);
        $html = str_replace('class="articles-results"', 'class="articles-results is-topic-view"', $html);
    }
    foreach ($topics as $key => $_) {
        $count = count(array_filter($posts, static fn ($item) => $item['topic'] === $key));
        $html = preg_replace_callback('~(<span data-topic-count="' . $key . '">).*?(</span>)~', static fn ($m) => $m[1] . $count . ($count === 1 ? ' article' : ' articles') . $m[2], $html);
    }
    $html = str_replace('class="topic-card ', 'class="topic-card is-visible ', $html);
    if ($sandbox) {
        $html = str_replace('data-sandbox-banner hidden', 'data-sandbox-banner', $html);
        $html = preg_replace('~href="/articles/(?!sandbox/)~', 'href="/articles/sandbox/', $html);
    }
    return ['status' => $status, 'robots' => $robots, 'html' => $html];
}

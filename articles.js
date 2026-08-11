const app = document.querySelector('[data-articles-app]');

if (app) {
  const localEndpoint = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? new URLSearchParams(window.location.search).get('articlesEndpoint')
    : '';
  const endpoint = localEndpoint || window.ZERO_ARTICLES_ENDPOINT || app.dataset.endpoint || 'https://admin.jenanggemi.com/api/public-blog/';
  const topicDetails = {
    'healthy-eating': {
      label: 'Healthy Eating',
      description: 'Practical choices for more balanced meals, drinks, and daily routines.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=85'
    },
    'keeping-fit': {
      label: 'Keeping Fit',
      description: 'Useful ways to move consistently, recover well, and make fitness fit real life.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=85'
    },
    'losing-weight': {
      label: 'Losing Weight',
      description: 'Sustainable habits for managing weight without losing sight of health or enjoyment.',
      image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&w=1600&q=85'
    },
    'diabetes-remission': {
      label: 'Diabetes Remission',
      description: 'Evidence-aware context for metabolic health and informed conversations with your care team.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=85'
    }
  };

  const parts = window.location.pathname.split('/').filter(Boolean);
  const articleIndex = parts.indexOf('articles');
  const routeParts = articleIndex >= 0 ? parts.slice(articleIndex + 1) : [];
  const isSandbox = routeParts[0] === 'sandbox';
  if (isSandbox) routeParts.shift();
  const selectedTopic = topicDetails[routeParts[0]] ? routeParts[0] : '';
  const selectedSlug = selectedTopic && routeParts[1] ? routeParts[1] : '';
  const routeBase = isSandbox ? '/articles/sandbox' : '/articles';
  const results = document.querySelector('[data-results]');
  const bento = document.querySelector('[data-topic-bento]');
  const libraryHero = document.querySelector('[data-library-hero]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const revealObserver = 'IntersectionObserver' in window && !reduceMotion.matches
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.revealDelay || 0);
        window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' })
    : null;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const articlePath = (post) => `${routeBase}/${encodeURIComponent(post.topic)}/${encodeURIComponent(post.slug)}/`;
  const topicPath = (topic) => `${routeBase}/${encodeURIComponent(topic)}/`;
  const safeDate = (value, options = {}) => {
    const date = new Date(value || '');
    return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-ID', {
      timeZone: 'Asia/Jakarta', day: 'numeric', month: 'long', year: 'numeric', ...options
    }).format(date);
  };

  const setMeta = ({ title, description, url, image, type = 'website', robots }) => {
    document.title = title;
    const set = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element && value) element.setAttribute(attribute, value);
    };
    set('meta[name="description"]', 'content', description);
    set('[data-articles-canonical]', 'href', url);
    set('[data-articles-og-title]', 'content', title);
    set('[data-articles-og-description]', 'content', description);
    set('[data-articles-og-type]', 'content', type);
    set('[data-articles-og-url]', 'content', url);
    set('[data-articles-og-image]', 'content', image);
    set('[data-articles-twitter-title]', 'content', title);
    set('[data-articles-twitter-description]', 'content', description);
    set('[data-articles-twitter-image]', 'content', image);
    set('[data-articles-robots]', 'content', robots);
  };

  const setSchema = (schema) => {
    const element = document.querySelector('[data-articles-schema]');
    if (element) element.textContent = JSON.stringify(schema);
  };

  const initMotion = () => {
    const revealables = [...document.querySelectorAll('.topic-card:not([data-reveal-ready]), .article-card:not([data-reveal-ready]), .article-reveal:not([data-reveal-ready])')];
    revealables.forEach((element, index) => {
      element.dataset.revealReady = 'true';
      element.dataset.revealDelay = String(Math.min(index % 4, 3) * 90);
      if (reduceMotion.matches || element.getBoundingClientRect().top < window.innerHeight * 1.08) {
        window.setTimeout(() => element.classList.add('is-visible'), Number(element.dataset.revealDelay));
      } else if (revealObserver) {
        revealObserver.observe(element);
      } else {
        element.classList.add('is-visible');
      }
    });

    if (!finePointer.matches || reduceMotion.matches) return;
    document.querySelectorAll('.topic-card:not([data-parallax-ready])').forEach((cardElement) => {
      cardElement.dataset.parallaxReady = 'true';
      cardElement.addEventListener('pointermove', (event) => {
        const bounds = cardElement.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        cardElement.style.setProperty('--image-x', `${((x - .5) * -12).toFixed(2)}px`);
        cardElement.style.setProperty('--image-y', `${((y - .5) * -12).toFixed(2)}px`);
        cardElement.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
        cardElement.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
      });
      cardElement.addEventListener('pointerleave', () => {
        cardElement.style.setProperty('--image-x', '0px');
        cardElement.style.setProperty('--image-y', '0px');
        cardElement.style.setProperty('--glow-x', '50%');
        cardElement.style.setProperty('--glow-y', '50%');
      });
    });
  };

  const updateRouteLinks = () => {
    document.querySelectorAll('[data-topic-link]').forEach((link) => {
      link.href = topicPath(link.dataset.topicLink);
    });
    document.querySelectorAll('a[href="/articles/"], a[href="/articles"]').forEach((link) => {
      link.href = `${routeBase}/`;
    });
  };

  const updateTopicCounts = (posts) => {
    Object.keys(topicDetails).forEach((topic) => {
      const count = posts.filter((post) => post.topic === topic).length;
      const element = document.querySelector(`[data-topic-count="${topic}"]`);
      if (element) element.textContent = count === 1 ? '1 article' : `${count} articles`;
    });
  };

  const card = (post) => {
    const topic = topicDetails[post.topic] || topicDetails['healthy-eating'];
    const image = post.featured_image_url || topic.image;
    const date = safeDate(post.scheduled_at_utc || post.updated_at);
    return `<a class="article-card" href="${articlePath(post)}">
      <span class="article-card-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}" loading="lazy"></span>
      <span class="article-card-meta"><span>${escapeHtml(topic.label)}</span><span>${escapeHtml(date || `${post.reading_minutes || 1} min read`)}</span></span>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
    </a>`;
  };

  const renderLibrary = (posts) => {
    const filtered = selectedTopic ? posts.filter((post) => post.topic === selectedTopic) : posts;
    const topic = selectedTopic ? topicDetails[selectedTopic] : null;
    const heading = topic ? topic.label : 'Latest stories';
    const eyebrow = topic ? 'EXPLORE THE TOPIC' : 'NEW FROM ZERO';
    results.innerHTML = `<div class="articles-results-head">
      <div><p>${eyebrow}</p><h2>${escapeHtml(heading)}</h2></div>
      ${topic ? `<a class="articles-back" href="${routeBase}/">← All four topics</a>` : ''}
    </div>
    ${filtered.length ? `<div class="article-grid">${filtered.map(card).join('')}</div>` : `<div class="articles-empty"><strong>No published stories here yet.</strong><p>${escapeHtml(topic?.description || 'The ZERO editorial team is preparing practical new guides. Check back soon.')}</p></div>`}`;

    const title = topic ? `${topic.label} Articles | ZERO Foods Indonesia` : 'ZERO Articles | Practical Guides for Healthier Daily Habits';
    const description = topic?.description || 'Explore practical ZERO Foods Indonesia guides on healthy eating, fitness, sustainable weight loss, and diabetes remission.';
    const path = topic ? `/articles/${selectedTopic}/` : '/articles/';
    setMeta({
      title,
      description,
      url: `https://zerofoods.id${path}`,
      image: topic?.image || topicDetails['healthy-eating'].image,
      robots: isSandbox ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large'
    });
    setSchema({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: heading,
      description,
      url: `https://zerofoods.id${path}`,
      isPartOf: { '@type': 'WebSite', name: 'ZERO Foods Indonesia', url: 'https://zerofoods.id/' },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: filtered.length,
        itemListElement: filtered.map((post, index) => ({
          '@type': 'ListItem', position: index + 1, url: `https://zerofoods.id/articles/${post.topic}/${post.slug}/`, name: post.title
        }))
      }
    });
    initMotion();
  };

  const renderArticle = (post) => {
    const topic = topicDetails[post.topic] || topicDetails['healthy-eating'];
    const image = post.featured_image_url || topic.image;
    const published = safeDate(post.scheduled_at_utc || post.created_at);
    const updated = safeDate(post.updated_at);
    libraryHero.hidden = true;
    bento.hidden = true;
    results.innerHTML = `<article class="article-view">
      <header class="article-view-header">
        <a class="article-view-topic article-reveal" href="${topicPath(post.topic)}">${escapeHtml(topic.label)}</a>
        <h1 class="article-reveal">${escapeHtml(post.title)}</h1>
        <p class="article-view-excerpt article-reveal">${escapeHtml(post.excerpt)}</p>
        <div class="article-view-meta article-reveal"><span>By ${escapeHtml(post.author || 'ZERO Editorial')}</span><span>${Number(post.reading_minutes || 1)} min read</span>${published ? `<span>Published ${escapeHtml(published)}</span>` : ''}${updated && updated !== published ? `<span>Updated ${escapeHtml(updated)}</span>` : ''}</div>
      </header>
      ${image ? `<img class="article-view-cover article-reveal" src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}" fetchpriority="high">` : ''}
      <div class="article-body article-reveal">${post.body_html || '<p>This article is being prepared.</p>'}</div>
      <footer class="article-view-footer article-reveal"><a href="${topicPath(post.topic)}">← More in ${escapeHtml(topic.label)}</a><a href="${routeBase}/">All topics</a></footer>
    </article>`;

    const title = post.seo_title || `${post.title} | ZERO Foods Indonesia`;
    const description = post.seo_description || post.excerpt;
    const canonical = `https://zerofoods.id/articles/${post.topic}/${post.slug}/`;
    setMeta({
      title,
      description,
      url: canonical,
      image,
      type: 'article',
      robots: isSandbox ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large'
    });
    setSchema({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description,
      image: [image],
      datePublished: post.scheduled_at_utc || post.created_at,
      dateModified: post.updated_at,
      author: { '@type': 'Person', name: post.author || 'ZERO Editorial' },
      publisher: {
        '@type': 'Organization',
        name: 'ZERO Foods Indonesia',
        url: 'https://zerofoods.id/',
        logo: { '@type': 'ImageObject', url: 'https://zerofoods.id/ZERO%20logos/ZERO%20Logo%20Black.svg' }
      },
      mainEntityOfPage: canonical,
      articleSection: topic.label,
      inLanguage: 'en'
    });
    initMotion();
  };

  const renderUnavailable = (message = '') => {
    bento.hidden = true;
    results.innerHTML = `<section class="articles-unavailable"><h2>Articles are not public yet.</h2><p>${escapeHtml(message || 'The ZERO editorial library is currently in private preparation mode.')}</p><a href="/">Return to ZERO</a></section>`;
    setMeta({
      title: 'Articles unavailable | ZERO Foods Indonesia',
      description: 'The ZERO editorial library is currently unavailable.',
      url: 'https://zerofoods.id/articles/',
      image: topicDetails['healthy-eating'].image,
      robots: 'noindex, nofollow, noarchive'
    });
  };

  const load = async () => {
    updateRouteLinks();
    document.querySelector('[data-sandbox-banner]').hidden = !isSandbox;
    try {
      const url = new URL(endpoint, window.location.href);
      if (isSandbox) url.searchParams.set('sandbox', '1');
      const response = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || payload.ok === false) throw new Error(payload.error || 'The article library could not be opened.');
      if (!payload.available) {
        renderUnavailable();
        return;
      }
      const posts = Array.isArray(payload.posts) ? payload.posts : [];
      updateTopicCounts(posts);
      if (selectedSlug) {
        const post = posts.find((item) => item.topic === selectedTopic && item.slug === selectedSlug);
        if (!post) {
          renderUnavailable('That story is not available in this view. It may be scheduled for later or no longer published.');
          return;
        }
        renderArticle(post);
      } else {
        renderLibrary(posts);
      }
    } catch (error) {
      renderUnavailable(error.message);
    }
  };

  initMotion();
  load();
}

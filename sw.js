// Offline support. Network-first for everything: the live site and the live
// spreadsheet always win, and the cache is only a fallback when the network fails.
// Every successful response refreshes the cache, so there is no version to bump on deploy.

const CACHE = 'agenda-v1';

// The spreadsheet CSV lives on another origin; app.js passes its URL in the query string.
const CSV_URL = new URL(location.href).searchParams.get('csv');

// Set on cached CSV copies so the page can tell it's showing saved (possibly stale) data.
const CACHED_AT_HEADER = 'X-Cached-At';

// App shell, cached on install so the first visit already works offline. Anything
// missing here is still picked up at runtime the next time it's requested.
const SHELL = [
  './',
  'manifest.webmanifest',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-192.png',
  'assets/icons/icon-maskable-512.png',
  'assets/icons/apple-touch-icon.png',
  'css/style.css',
  'css/flyers.css',
  'js/app.js',
  'js/config.js',
  'js/csv.js',
  'js/events.js',
  'js/flyer.js',
  'js/icons.js',
  'js/line.js',
  'js/month.js',
  'js/types.js',
  'js/whatsapp.js',
  'js/vendor/html-to-image.js',
  'fonts/barlow-500.woff2',
  'fonts/barlow-600.woff2',
  'fonts/barlow-700.woff2',
  'fonts/barlow-condensed-600.woff2',
  'fonts/barlow-condensed-700.woff2',
  'fonts/barlow-condensed-800.woff2',
];

const isCSV = (url) => CSV_URL && url === CSV_URL;

// Cacheable = a complete, successful, readable response.
const cacheable = (res) => res.ok && res.status !== 206 && (res.type === 'basic' || res.type === 'cors');

// Store a copy; CSV copies get stamped with the time they were saved.
async function store(cache, request, res) {
  if (!isCSV(typeof request === 'string' ? request : request.url)) return cache.put(request, res);
  const headers = new Headers(res.headers);
  headers.set(CACHED_AT_HEADER, new Date().toISOString());
  const body = await res.blob();
  return cache.put(request, new Response(body, { status: res.status, statusText: res.statusText, headers }));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Best effort: one missing file must not keep the worker from installing.
    const urls = [...SHELL.map((path) => new URL(path, location.href).href), ...(CSV_URL ? [CSV_URL] : [])];
    await Promise.all(urls.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'no-cache', mode: isCSV(url) ? 'cors' : 'same-origin' });
        if (cacheable(res)) await store(cache, url, res);
      } catch (err) {
        console.warn('[sw] não foi possível guardar', url, err);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);
  const sameOrigin = url.origin === location.origin;
  if (!sameOrigin && !isCSV(request.url)) return;
  if (sameOrigin && url.pathname === new URL(location.href).pathname) return; // never serve sw.js itself
  event.respondWith(networkFirst(event, request));
});

async function networkFirst(event, request) {
  const cache = await caches.open(CACHE);
  let res;
  try {
    res = await fetch(request);
  } catch (err) {
    return (await fromCache(cache, request)) || Promise.reject(err);
  }
  // Server errors also fall back, but are passed through when nothing is saved.
  if (res.status >= 500) return (await fromCache(cache, request)) || res;
  // Browsers refuse a redirected response replayed for a navigation, so don't keep those.
  if (cacheable(res) && !(request.mode === 'navigate' && res.redirected)) {
    event.waitUntil(store(cache, request, res.clone()));
  }
  return res;
}

async function fromCache(cache, request) {
  return (await cache.match(request, { ignoreVary: true }))
    // Any page URL (?query, index.html) falls back to the saved home page.
    || (request.mode === 'navigate' && ((await cache.match(request, { ignoreSearch: true })) || (await cache.match('./'))))
    || null;
}

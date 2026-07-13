// ═══════════════════════════════════════════════
//  PARSIANIK TEXTILE CALCULATOR — Service Worker
//  Strategy: Cache First, then Network fallback
// ═══════════════════════════════════════════════

const CACHE_NAME = 'parsianik-textile-v1';

// Files to cache on install
const PRECACHE = [
  '/index.html',
  '/manifest.json',
  '/icons/parsianik-192.png',
  '/icons/parsianik-512.png',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap',
];

// ── Install: pre-cache all core assets ──────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local files strictly; Google Fonts may fail on first install
      // without network — that's acceptable, they'll cache on first visit.
      return cache.addAll(['/index.html', '/manifest.json'])
        .then(() => cache.addAll(PRECACHE).catch(() => {}));
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: remove old caches ─────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first with network fallback ────
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Not in cache — fetch from network and cache the result
      return fetch(event.request)
        .then(response => {
          // Only cache valid responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, toCache);
          });
          return response;
        })
        .catch(() => {
          // Network failed and nothing in cache — return offline fallback
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

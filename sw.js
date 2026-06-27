const CACHE_NAME = 'vasool-v1';

// On install — clear ALL old caches
self.addEventListener('install', event => {
  self.skipWaiting();
});

// On activate — delete any old service worker caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Network first — always get fresh data, no caching
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});

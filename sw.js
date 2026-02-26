// Celestia Service Worker — enables offline support and PWA install
const CACHE_NAME = 'celestia-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/panels.css',
    '/css/constellations.css',
    '/css/responsive.css',
    '/js/astronomy.js',
    '/js/planets.js',
    '/js/constellations.js',
    '/js/renderer.js',
    '/js/ui.js',
    '/js/app.js',
    '/manifest.json',
];

// Install — cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});

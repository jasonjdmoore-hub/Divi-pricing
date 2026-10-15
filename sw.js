// Offline cache for Divi Pricing. Bump VERSION when index.html changes.
const VERSION = 'divi-pricing-v8';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png', './slides/01-your-choice.jpg', './slides/02-divi-advantage.jpg', './slides/03-internal-point-values.jpg', './slides/04-internal-point-values-little-bay.jpg', './slides/05-point-exchange-values.jpg', './slides/06-leading-developers.jpg', './slides/07-vacation-cost-calculator.jpg', './concierge/index.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match('./index.html'))));
});

const CACHE_NAME = 'panmaster-v1';
const ASSETS = [
  '/', '/index.html', '/css/style.css', '/js/game-engine.js', '/js/pitch-detector.js', '/js/song-editor.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
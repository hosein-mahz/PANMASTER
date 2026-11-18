const CACHE_NAME = 'panmaster-v2'; // نسخه عوض شد تا کش قدیمی پاک شود
const ASSETS = [
  '/', '/css/style.css', '/js/game-engine.js', '/js/pitch-detector.js', '/js/song-editor.js'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // فعال‌سازی فوری نسخه جدید
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // پاک کردن کش‌های قدیمی
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
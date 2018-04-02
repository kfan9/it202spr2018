var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/',
  '/work/your-first-pwapp-master/work/index.html',
  '/work/your-first-pwapp-master/work/scripts/app.js',
  '/work/your-first-pwapp-master/work/styles/inline.css',
  '/work/your-first-pwapp-master/work/images/clear.png',
  '/work/your-first-pwapp-master/work/images/cloudy-scattered-showers.png',
  '/work/your-first-pwapp-master/work/images/cloudy.png',
  '/work/your-first-pwapp-master/work/images/fog.png',
  '/work/your-first-pwapp-master/work/images/ic_add_white_24px.svg',
  '/work/your-first-pwapp-master/work/images/ic_refresh_white_24px.svg',
  '/work/your-first-pwapp-master/work/images/partly-cloudy.png',
  '/work/your-first-pwapp-master/work/images/rain.png',
  '/work/your-first-pwapp-master/work/images/scattered-showers.png',
  '/work/your-first-pwapp-master/work/images/sleet.png',
  '/work/your-first-pwapp-master/work/images/snow.png',
  '/work/your-first-pwapp-master/work/images/thunderstorm.png',
  '/work/your-first-pwapp-master/work/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
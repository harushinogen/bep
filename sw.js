const staticCacheName = 'site-static-v3';
const assets = [
  '/',
  '/index.html',
  '/js/control.js',
  '/js/data.js',
  '/js/modal.js',
  '/js/tables.js',
  '/js/ui.js',
  '/js/pwa.js',
  '/css/output.css',
  '/css/style.css',
  '/assets/Octocat/Octocat.jpg',
  '/assets/icons/chartjs-tutsplus.jpg',
  '/assets/icons/javascript-electron-logo-s.jpg',
  '/assets/icons/tailwind.png',
  '/assets/icons/chart.png',
  '/node_modules/chart.js/dist/Chart.bundle.js'
];

// install service worker
self.addEventListener('install', evt => {
  // console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('catching shell assets');
      cache.addAll(assets);
    })
  )
});

// activate event
self.addEventListener('activate', evt => {
  // console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
})

// fetch event
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
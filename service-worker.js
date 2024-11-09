const CACHE_NAME = 'weather-app-cache-v8';

const URLs_TO_CACHE = [
  '/',
  '/Weather-App/index.html',
  '/Weather-App/style.css',
  '/Weather-App/script.js',
  '/Weather-App/manifest.json',
  '/Weather-App/icons/3820178.png',
  '/Weather-App/icons/7477790.png',
  '/Weather-App/SVGs/fog-svgrepo-com.svg',
  '/Weather-App/SVGs/reshot-icon-light-snowing-UPS2TMANC8.svg',
  '/Weather-App/SVGs/haze-svgrepo-com.svg', 
  '/Weather-App/SVGs/reshot-icon-partly-cloudy-PTW7DJ5GSX.svg',
  '/Weather-App/SVGs/magnify.svg',
  '/Weather-App/SVGs/reshot-icon-snowflake-TK5WALZX68.svg',
  '/Weather-App/SVGs/reshot-icon-cloudy-GDRKNX4WF8.svg',
  '/Weather-App/SVGs/reshot-icon-sun-PSMYLH76Q3.svg',
  '/Weather-App/SVGs/reshot-icon-cloudy-SL7KNBWD3M.svg',
  '/Weather-App/SVGs/reshot-icon-thunderstorm-KA23SLGT5H.svg',
  '/Weather-App/SVGs/reshot-icon-heavy-rain-W4E63SHR7P.svg',
  '/Weather-App/SVGs/reshot-icon-umbrella-with-rain-GA92PSB65X.svg',
  '/Weather-App/SVGs/reshot-icon-heavy-snowing-T6VYHUANP7.svg',
  '/Weather-App/SVGs/reshot-icon-weather-8CKJB9YN7X.svg',
  '/Weather-App/SVGs/reshot-icon-light-rain-FSB7JXM9VR.svg',
  '/Weather-App/SVGs/gorgeous-clouds-background-with-blue-sky-design_1017-25501.avif'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(URLs_TO_CACHE);
      })
      .catch((error) => {
        console.log('Caching failed: ', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache: ', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
  
        return fetch(event.request)
          .then((networkResponse) => {
      
            if (networkResponse && networkResponse.status === 200) {
              const clonedResponse = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, clonedResponse); 
              });
            }
            return networkResponse; 
          }).catch((error) => {

            console.log('Network request failed and no cache available:', error);
            return caches.match('/Weather-App/index.html'); 
          });
      })
    );
  });
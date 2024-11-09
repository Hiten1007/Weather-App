const CACHE_NAME = 'weather-app-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/Weather-App/index.html',
        '/Weather-App/styles.css',
        '/Weather-App/script.js',
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
        '/Weather-App/SVGs/reshot-icon-light-rain-FSB7JXM9VR.svg'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cache) => cache !== CACHE_NAME).map((cache) => caches.delete(cache))
      );
    })
  );
});
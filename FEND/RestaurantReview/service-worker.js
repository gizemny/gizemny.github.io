// boiler plate service worker 
// https://www.youtube.com/watch?v=BfL3pprhnms&t=4s


var cacheName = 'v1';
var cacheFiles = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    './sw_registration.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
]

self.addEventListener('install', function(e){
    console.log('[ServiceWorker] Installed')
    
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});


self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activated')

    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('[ServiceWorker] Removing cached files from ', thisCacheName)
                    return caches.delete(thisCacheName);
                }
            }))
        })
    );

});

// https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0
self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    if (e.request.url.indexOf(dataUrl) > -1) {
        /*
         * When the request URL contains dataUrl, the app is asking for fresh
         * weather data. In this case, the service worker always goes to the
         * network and then caches the response. This is called the "Cache then
         * network" strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
         */
        e.respondWith(
            caches.open(dataCacheName).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});

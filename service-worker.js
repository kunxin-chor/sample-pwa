const CACHE_NAME = 'dog-adoption-cache-v5';

self.addEventListener('install', (event) => {
    self.skipWaiting();

    event.waitUntil((async () => {
        try {
            const response = await fetch('cache-files.json');
            const files = await response.json();
            const cache = await caches.open(CACHE_NAME);
            return cache.addAll(files);
        } catch (err) {
            console.error('Error caching files:', err);
        }
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        try {
            const cacheNames = await caches.keys();
            const promises = cacheNames.map(async (cacheName) => {
                if (cacheName !== CACHE_NAME) {
                    return caches.delete(cacheName);
                }
            });
            return Promise.all(promises);
        } catch (err) {
            console.error('Error during activation:', err);
        }
    })());
});


self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith((async () => {
            const cachedResponse = await caches.match(event.request);
            return cachedResponse || fetch(event.request);
        })());
    }
});


self.addEventListener('message', (event) => {
   
    if (event.data && event.data.type === 'UPDATE_CACHE') {
   
        self.skipWaiting();             
    }
});

const CACHE_NAME = 'dog-adoption-cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    
    event.waitUntil(
        fetch('cache-files.json').then(response => response.json()).then(files => {
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(files);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        self.skipWaiting();
    }
});

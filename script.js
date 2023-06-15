if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function updateCache() {
    if (navigator.serviceWorker && registration.active) {
        registration.active.postMessage({ type: 'UPDATE_CACHE' });
    }
}

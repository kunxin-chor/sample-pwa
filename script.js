
let globalRegistration = null;
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            globalRegistration = registration;
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log("new service worker registered");
        window.location.reload();    
    });
}

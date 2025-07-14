const CACHE_NAME = 'clara-vision-v1.0.0';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/asesoramiento.html',
    '/lentes-contacto.html',
    '/lentes-sol.html',
    '/recetados.html',
    '/reparaciones.html',
    '/styles.css',
    '/script.js',
    '/logo.png',
    '/sinfondo.png',
    '/conlogo.png',
    '/lente contacto.jpg'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: Instalación completa');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error en instalación', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== CACHE_NAME) {
                            console.log('Service Worker: Eliminando cache antigua', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activación completa');
                return self.clients.claim();
            })
    );
});

// Fetch Strategy: Cache First with Network Fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    // Update cache in background for next time
                    fetch(event.request)
                        .then(networkResponse => {
                            if (networkResponse.ok) {
                                const responseClone = networkResponse.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => {
                                        cache.put(event.request, responseClone);
                                    });
                            }
                        })
                        .catch(() => {
                            // Network failed, but we have cache
                        });
                    
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetch(event.request)
                    .then(networkResponse => {
                        // Check if valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone response for cache
                        const responseToCache = networkResponse.clone();

                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed and no cache
                        // Return offline page for HTML requests
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // For images, return placeholder
                        if (event.request.destination === 'image') {
                            return new Response(
                                '<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Imagen no disponible</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                    });
            })
    );
});

// Background Sync for Forms
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(sendFormData());
    }
});

// Push Notifications (for future use)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nueva notificación de Clara Visión',
        icon: '/logo.png',
        badge: '/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver más',
                icon: '/logo.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/logo.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Clara Visión', options)
    );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper function to send form data when back online
async function sendFormData() {
    try {
        const cache = await caches.open('form-data-cache');
        const requests = await cache.keys();
        
        for (const request of requests) {
            try {
                await fetch(request);
                await cache.delete(request);
            } catch (error) {
                // Will retry on next sync
                console.log('Failed to send form data, will retry later');
            }
        }
    } catch (error) {
        console.error('Error sending cached form data:', error);
    }
}

// Performance metrics
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
        // Log performance metrics
        console.log('Performance Metrics:', event.data.metrics);
    }
});

/// <reference lib="webworker" />

const CACHE_NAME = 'liga360-cache-v1';
const STATIC_ASSETS = ['/', '/favicon.ico'];

// Instalar: cachear assets estáticos
(self as unknown as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  // Activar inmediatamente sin esperar a que se cierren tabs
  (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
});

// Activar: limpiar caches antiguos
(self as unknown as ServiceWorkerGlobalScope).addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )
      )
  );
  // Tomar control de todas las pestañas abiertas
  (self as unknown as ServiceWorkerGlobalScope).clients.claim();
});

// Fetch: Network-first para HTML/DDP, Cache-first para assets estáticos
(self as unknown as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // No interceptar WebSocket (DDP) ni solicitudes a otros dominios
  if (
    request.method !== 'GET' ||
    url.protocol === 'ws:' ||
    url.protocol === 'wss:' ||
    url.pathname.startsWith('/sockjs') ||
    url.origin !== location.origin
  ) {
    return;
  }

  // Assets estáticos (JS chunks, CSS, imágenes, fuentes): Cache-first
  if (
    /\.(js|css|woff2?|ttf|eot|svg|png|jpe?g|gif|webp|ico)$/.test(
      url.pathname
    ) ||
    (url.pathname.startsWith('/__meteor_runtime_config__') === false &&
      url.pathname.includes('.'))
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          // Solo cachear respuestas válidas
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // HTML / navegación: Network-first con fallback a cache
  event.respondWith(
    fetch(request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      })
      .catch(() =>
        caches.match(request).then(cached => cached || caches.match('/'))
      )
      .then(response => response || new Response('Offline', { status: 503 }))
  );
});

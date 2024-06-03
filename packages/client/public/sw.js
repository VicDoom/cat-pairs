const CACHE_NAME= 'cat-coders-cache-offline-v1';

const URLS = [
  '/',
  '/index.html',
  ...Array.from({ length: 34 }).map((_, index) => `/images/cards/card-${index+1}.jpg`),
  '/avatar.png',
  '/bg.svg',
  '/crown.svg',
  '/exit.svg',
  '/vite.svg',
  '/about-us.svg',
  '/cat-background.png',
  '/forum.svg',
  '/leaderboard.svg',
  '/images/cards/card-back-dark.jpg',
  '/images/cards/card-back-light.jpg',
  '/media/lost.mp3',
  '/media/song.mp3',
  '/media/win.mp3',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // eslint-disable-next-line no-console
        console.log('[Service Worker] adding static files');
        cache.addAll(URLS);
      }));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      if (event.request.method !== 'GET') {
        return await fetch(event.request);
      }
      try {
        const response = await fetch(event.request);

        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());

        return response;
      } catch (error) {
        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) {
          return cachedResponse;
        }
      }
    })()
  );
});

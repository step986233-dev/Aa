const CACHE_NAME = 'prequest-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './robot.png'
];

// 서비스 워커 설치 및 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 캐시 활성화 및 이전 캐시 정돈
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 오프라인 리소스 리턴 (캐시 데이터 사용)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

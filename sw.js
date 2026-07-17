const CACHE_NAME = 'smart-finance-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './js/app.js',
  './manifest.json'
];

// 1. Instalação: Guarda os arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos guardados no cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Ativação: Limpa caches antigos se houver mudança de versão
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Funcionamento: Tenta pegar da internet, se falhar, pega do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

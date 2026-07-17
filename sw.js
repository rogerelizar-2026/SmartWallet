// ===== SMART FINANCE - SERVICE WORKER =====
// Versão do cache - ALTERE este número quando atualizar os arquivos
const CACHE_VERSION = 'v1.0.0-r1';
const CACHE_NAME = `smart-finance-${CACHE_VERSION}`;

// Arquivos essenciais para o app funcionar offline
const CORE_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './js/app.js',
    './manifest.json',
    './logo.svg',
    './logomarca.svg',
    './favicon.svg'
];

// CDN externa (Chart.js) - cache separadamente
const CDN_ASSETS = [
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

// ===== INSTALAÇÃO =====
self.addEventListener('install', (event) => {
    console.log('[SmartFinance SW] Instalando...', CACHE_NAME);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SmartFinance SW] Cacheando core assets');
                // addAll falha se qualquer arquivo não existir, então usamos add individual com try/catch
                const promises = CORE_ASSETS.map((url) =>
                    cache.add(url).catch((err) => {
                        console.warn(`[SmartFinance SW] Falha ao cachear: ${url}`, err);
                    })
                );
                return Promise.all(promises);
            })
            .then(() => self.skipWaiting())
    );
});

// ===== ATIVAÇÃO =====
self.addEventListener('activate', (event) => {
    console.log('[SmartFinance SW] Ativando...', CACHE_NAME);
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('smart-finance-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SmartFinance SW] Removendo cache antigo:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ===== INTERCEPTAÇÃO DE REQUISIÇÕES =====
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Ignora requisições não-GET
    if (request.method !== 'GET') return;

    // Ignora URLs externas exceto CDNs conhecidas
    const url = new URL(request.url);
    if (url.origin !== location.origin && !url.href.includes('cdn.jsdelivr.net')) {
        return;
    }

    // Estratégia: Stale-While-Revalidate para HTML/JS/CSS
    // Estratégia: Cache-First para imagens/SVGs/fontes
    if (request.destination === 'document' ||
        request.url.endsWith('.js') ||
        request.url.endsWith('.css')) {
        event.respondWith(staleWhileRevalidate(request));
    } else {
        event.respondWith(cacheFirst(request));
    }
});

// ===== ESTRATÉGIA: CACHE-FIRST =====
// Tenta o cache primeiro; se falhar, vai para a rede e cacheia
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) {
        return cached;
    }
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        console.warn('[SmartFinance SW] Falha na rede:', request.url, err);
        // Fallback: página offline
        if (request.destination === 'document') {
            return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Worker Offline' });
    }
}

// ===== ESTRATÉGIA: STALE-WHILE-REVALIDATE =====
// Retorna o cache imediatamente e atualiza em background
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    const networkPromise = fetch(request)
        .then((response) => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch((err) => {
            console.warn('[SmartFinance SW] Falha na rede (SWR):', request.url, err);
            return null;
        });

    // Se tem cache, retorna imediatamente
    if (cached) {
        return cached;
    }

    // Aguarda a rede
    const response = await networkPromise;
    if (response) return response;

    // Fallback para página principal
    if (request.destination === 'document') {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
    }

    return new Response('Offline', { status: 503, statusText: 'Service Worker Offline' });
}

// ===== MENSAGENS DO CLIENTE =====
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((keys) =>
                Promise.all(keys.map((key) => caches.delete(key)))
            ).then(() => console.log('[SmartFinance SW] Cache limpo'))
        );
    }
});

console.log('[SmartFinance SW] Service Worker carregado');

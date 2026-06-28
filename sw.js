// AI Hybrid — Service Worker v2.0
// Cache offline + notifikasi push
const CACHE = 'ai-hybrid-v2';
const ASSETS = ['./index.html', './manifest.json', './icon.svg', './model-registry.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS).catch(() => {})) // jangan crash kalau 1 asset gagal
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Jangan intercept request ke API AI, Firebase, HuggingFace CDN, GitHub
  const bypass = [
    'huggingface.co', 'cdn-lfs', '.onnx',
    'api.groq.com', 'api.openai.com', 'api.deepseek.com',
    'openrouter.ai', 'firebase', 'firestore', 'googleapis.com',
    'api.github.com', 'gist.github.com',
    'api.search.brave.com', 'searx', 'searxng',
    'api.duckduckgo.com',
  ];
  if (bypass.some(b => url.includes(b))) return;

  // Strategi: cache-first untuk assets statis, network-first untuk halaman
  if (e.request.method !== 'GET') return;

  const isNavigation = e.request.mode === 'navigate';
  if (isNavigation) {
    // Network-first untuk navigasi — agar halaman selalu fresh
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
  } else {
    // Cache-first untuk aset lain
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok && e.request.method === 'GET') {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
  }
});

// Push notification
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'AI Hybrid', body: 'Ada notifikasi baru' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icon.svg',
      badge: './icon.svg',
      tag: data.tag || 'ai-hybrid',
      vibrate: [200, 100, 200],
    })
  );
});

// Message dari app (misal: skip waiting untuk update)
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

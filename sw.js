// AI Hybrid — Service Worker v2.0
const CACHE = 'ai-hybrid-v2';
const ASSETS = ['./index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Jangan cache request ke API eksternal / HuggingFace
  if (url.includes('huggingface.co') || url.includes('api.groq.com') ||
      url.includes('api.openai.com') || url.includes('api.deepseek.com') ||
      url.includes('openrouter.ai') || url.includes('firebase') ||
      url.includes('cdn.jsdelivr.net') || url.includes('gstatic.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && e.request.method === 'GET') {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'AI Hybrid', body: 'Ada notifikasi baru' };
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body, icon: './icon.svg', badge: './icon.svg', tag: data.tag || 'ai-hybrid'
  }));
});

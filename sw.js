/* Service worker do Gamifica Educação: permite instalar como aplicativo.
   Estratégia "rede primeiro": sempre busca a versão nova; usa a cópia guardada só se estiver sem internet. */
const VERSAO = 'gamifica-v17';
const BASE = ['/', '/index.html', '/manifest.webmanifest', '/icone-192.png', '/icone-512.png', '/icone.svg', '/favicon.ico'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(BASE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(r).then(resp => {
    if (resp.ok && resp.type === 'basic') { const copia = resp.clone(); caches.open(VERSAO).then(c => c.put(r, copia)).catch(() => {}); }
    return resp;
  }).catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('/') : Response.error()))));
});

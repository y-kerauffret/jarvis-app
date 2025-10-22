self.addEventListener("install", e=>{
  e.waitUntil(caches.open("jarvis-cache").then(c=>c.addAll(["./","./index.html","./style.css","./app.js"])));
});
self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(r=>r || fetch(e.request)));
});

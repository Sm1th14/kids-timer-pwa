const CACHE_NAME = "kids-timer-v2"
const urlsToCache = [
  "/kids-timer-pwa/",
  "/kids-timer-pwa/index.html",
  "/kids-timer-pwa/manifest.json",
  "/kids-timer-pwa/icon-192.png",
  "/kids-timer-pwa/icon-512.png"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response
      return fetch(event.request)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== "basic") return res
          const resClone = res.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone)
          })
          return res
        })
        .catch(() => caches.match("/kids-timer-pwa/index.html"))
    })
  )
})

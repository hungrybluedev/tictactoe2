const files_to_cache = [
  "/fonts/ShadowsIntoLight.ttf",
  "/img/favicon.ico",
  "/img/logo.svg",
  "/css/default.css",
  "/js/cpu.js",
  "/js/definition.js",
  "/js/main.js",
  "/",
  "/tictactoe.webmanifest",
  "/index.html",
];
const cache_name = "HBDTicTacToe-v2.0.0";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(files_to_cache);
      })
      .catch((_) => {})
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      for (const name of names) {
        if (name !== cache_name) {
          caches.delete(name);
        }
      }
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached_response) => {
      return cached_response || fetch(event.request);
    })
  );
});

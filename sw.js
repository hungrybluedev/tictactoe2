const files_to_cache = [
  "https://hungrybluedev.github.io/tictactoe2/fonts/ShadowsIntoLight.ttf",
  "https://hungrybluedev.github.io/tictactoe2/img/favicon.ico",
  "https://hungrybluedev.github.io/tictactoe2/img/logo.svg",
  "https://hungrybluedev.github.io/tictactoe2/css/default.css",
  "https://hungrybluedev.github.io/tictactoe2/js/cpu.js",
  "https://hungrybluedev.github.io/tictactoe2/js/definition.js",
  "https://hungrybluedev.github.io/tictactoe2/js/main.js",
  "https://hungrybluedev.github.io/tictactoe2/",
  "https://hungrybluedev.github.io/tictactoe2/tictactoe.webmanifest",
  "https://hungrybluedev.github.io/tictactoe2/index.html",
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

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("artfolio-cache").then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/assets/css/style.css"
      ])
    )
  );
});

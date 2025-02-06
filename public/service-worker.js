// Define a cache name to uniquely identify this cache
const CACHE_NAME = "todo-cache-v1"; 

// List of URLs that need to be cached for offline use
const urlsToCache = ["/", "/index.html", "/static/js/bundle.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    // Open the cache and add the specified URLs to it
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache); // Cache the assets for offline access
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Check if the request is already cached
    caches.match(event.request).then((response) => {
      // If the resource is found in the cache, return it; otherwise, fetch it from the network
      return response || fetch(event.request);
    })
  );
});

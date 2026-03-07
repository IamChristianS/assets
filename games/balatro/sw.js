const CACHE_NAME = "balatro-cache-v1";
const ASSETS = ["./", "./index.html", "./game.js", "./love.js", "./love.wasm", "./game.data", "./consolewrapper.js", "./theme/love.css", "./theme/bg.png"];

self.addEventListener("install", (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
	event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
});

self.addEventListener("fetch", (event) => {
	const request = event.request;
	event.respondWith(
		caches.match(request).then((cached) => {
			if (cached) return cached;
			return fetch(request)
				.then((response) => {
					// Only cache same-origin GET requests
					const isGET = request.method === "GET";
					const isSameOrigin = new URL(request.url).origin === self.location.origin;
					if (isGET && isSameOrigin) {
						const clone = response.clone();
						caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
					}
					return response;
				})
				.catch(() => cached);
		}),
	);
});

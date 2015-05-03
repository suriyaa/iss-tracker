importScripts("public/serviceworker-cache-polyfill.js");

var CACHE_NAME = "sw-demo-iss-v1";

this.addEventListener('fetch', function(event) {
	var fetchReq = event.request.clone(),
		cacheReq = event.request.clone();
	event.respondWith(fetch(fetchReq).then(function(response) {
		var resp = response.clone(),
			req = event.request.clone();
		caches.open(CACHE_NAME).then(function(cache) {
			cache.put(req, resp);
		});
		return response;
	}).catch(function() {
		return caches.match(cacheReq);
	}));
});

this.addEventListener('activate', function(e) {
	console.log('deleting cache');
	e.waitUntil(caches.delete(CACHE_NAME));
});

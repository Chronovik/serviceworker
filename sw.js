this.addEventListener('activate', function(event) {
    var cacheWhitelist = ['v7'];

    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
              return caches.open('v7').then(function(cache) {
                cache.put(event.request, response.clone());
                return response;
              });
            });
          })
          .catch(function() {
            return caches.match('/fail.jpg');
          })
    );
});
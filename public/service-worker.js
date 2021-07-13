const CACHE_NAME = 'todo-pwa-file-cache-v2';
const DATA_CACHE_NAME = 'todo-pwa-data-cache-v1';

const FILES_TO_CACHE = [
        '/',
        '/todos',
        '/favicon.ico',
        '/manifest.json',
        '/assets/js/todo.js',
        '/assets/js/main.js',
        '/assets/css/styles.css',
        '/assets/images/icons/icon-72x72.png',
        '/assets/images/icons/icon-96x96.png',
        '/assets/images/icons/icon-128x128.png',
        '/assets/images/icons/icon-144x144.png'
      ];


//install service worker
self.addEventListener('install', (event) => {
    console.log('Installed Service Worker');

    console.log(event);
    
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then((cache) => {
            console.log('Files were cached');
            return cache.addAll(FILES_TO_CACHE);
        })
        .then(() => self.skipWaiting())
        .catch((error) => {
            console/log('error caching files', error);
        })
    );
});

//activate service worker
self.addEventListener('activate', (event) => {
    console.log('Activated Service Worker');
    event.waitUntil(
        caches
        .keys()
        .then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === CACHE_NAME && key === DATA_CACHE_NAME) {
                        console.log('Removing old cache data:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
        .catch((error) => {
            console.log(error);
        })
    );
});

// Intercept Fetch requests and server up cached content
self.addEventListener('fetch', (event) => {
    console.log(event.request.url);
    if (event.request.url.includes('/api')) {
      event.respondWith(
        caches
          .open(DATA_CACHE_NAME)
          .then(cache => {
            console.log(cache);
            return fetch(event.request)
              .then(response => {
                if (response.status === 200) {
                  cache.put(event.request.url, response.clone());
                }
                return response;
              })
              .catch(err => {
                console.log(err);
                // Network failed, attempt to serve data from cache
                return cache.match(event.request);
              })
          })
          .catch(error => console.log(error))
      );
    } else {
      event.respondWith(
        fetch(event.request)
          .catch(error => {
            console.log(error);
            return caches.match(event.request).then(response => {
              if (response) {
                return response;
              } else if (event.request.headers.get('accept').includes('text/html')) {
                // return cached page
                return caches.match(event.request.url);
              }
            })
          })
      )
    }
  });

//
// * register
// *install
// *activate

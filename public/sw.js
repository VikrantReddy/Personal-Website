const CACHE_NAME = 'personal-website-v1';
const STATIC_CACHE_NAME = 'static-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  '/src/components/Hero.tsx',
  '/src/components/Skills.tsx',
  '/src/components/Projects.tsx',
  '/src/components/Contact.tsx',
  '/src/index.css',
  '/src/App.css',
  '/src/lib/utils.ts',
  '/src/hooks/use-mobile.tsx',
  '/src/hooks/use-toast.ts',
  '/src/hooks/use-lazy-icons.tsx',
  '/src/components/ui/button.tsx',
  '/src/components/ui/card.tsx',
  '/src/components/ui/toaster.tsx',
  '/src/components/ui/sonner.tsx',
  '/src/components/ui/tooltip.tsx',
  '/src/components/ui/accordion.tsx',
  '/src/components/ui/alert-dialog.tsx',
  '/src/components/ui/alert.tsx',
  '/src/components/ui/aspect-ratio.tsx',
  '/src/components/ui/avatar.tsx',
  '/src/components/ui/badge.tsx',
  '/src/components/ui/breadcrumb.tsx',
  '/src/components/ui/calendar.tsx',
  '/src/components/ui/carousel.tsx',
  '/src/components/ui/chart.tsx',
  '/src/components/ui/checkbox.tsx',
  '/src/components/ui/collapsible.tsx',
  '/src/components/ui/command.tsx',
  '/src/components/ui/context-menu.tsx',
  '/src/components/ui/dialog.tsx',
  '/src/components/ui/drawer.tsx',
  '/src/components/ui/dropdown-menu.tsx',
  '/src/components/ui/form.tsx',
  '/src/components/ui/hover-card.tsx',
  '/src/components/ui/input-otp.tsx',
  '/src/components/ui/input.tsx',
  '/src/components/ui/label.tsx',
  '/src/components/ui/menubar.tsx',
  '/src/components/ui/navigation-menu.tsx',
  '/src/components/ui/pagination.tsx',
  '/src/components/ui/popover.tsx',
  '/src/components/ui/progress.tsx',
  '/src/components/ui/radio-group.tsx',
  '/src/components/ui/resizable.tsx',
  '/src/components/ui/scroll-area.tsx',
  '/src/components/ui/select.tsx',
  '/src/components/ui/separator.tsx',
  '/src/components/ui/sheet.tsx',
  '/src/components/ui/sidebar.tsx',
  '/src/components/ui/skeleton.tsx',
  '/src/components/ui/slider.tsx',
  '/src/components/ui/switch.tsx',
  '/src/components/ui/table.tsx',
  '/src/components/ui/tabs.tsx',
  '/src/components/ui/textarea.tsx',
  '/src/components/ui/toast.tsx',
  '/src/components/ui/toggle-group.tsx',
  '/src/components/ui/toggle.tsx',
  '/src/components/ui/tooltip.tsx',
  '/src/components/ui/use-toast.ts',
  '/tailwind.config.ts',
  '/tsconfig.json',
  '/tsconfig.app.json',
  '/tsconfig.node.json',
  '/vite.config.ts',
  '/package.json',
  '/bun.lockb',
  '/package-lock.json',
  '/postcss.config.js',
  '/eslint.config.js',
  '/components.json',
  '/README.md',
  '/favicon.ico',
  '/placeholder.svg',
  '/robots.txt'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S) requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    // HTML documents - try cache first, then network
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Scripts and styles - cache first, then network
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  } else if (request.destination === 'image') {
    // Images - network first, then cache
    event.respondWith(
      fetch(request).then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
  } else {
    // Other resources - try cache first, then network
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Perform any background sync operations here
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Personal Website', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});


const CACHE_NAME = "budget-security-cache-v3";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
  "https://cdn.jsdelivr.net/npm/sweetalert2@11",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/chart.js"
];

// Pemasangan Aset UI Inti Ke Dalam Memori Lokal Perangkat
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    .then(() => self.skipWaiting())
  );
});

// Pembersihan Cache Usang Otomatis Saat Pembaruan Kode
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })))
    .then(() => self.clients.claim())
  );
});

// Intersepsi Jaringan: Sajikan UI Instan Walau Offline
self.addEventListener("fetch", (e) => {
  if (e.request.url.includes("script.google.com")) return; // Biarkan API ditangani oleh logika AJAX
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

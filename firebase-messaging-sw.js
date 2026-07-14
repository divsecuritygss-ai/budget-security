importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Konfigurasi resmi proyek sima-pwa Anda
const firebaseConfig = {
  apiKey: "AIzaSyAiOtXQgGhy3HLgHJgckqXyWrpTJ_IoxIU",
  authDomain: "sima-pwa.firebaseapp.com",
  projectId: "sima-pwa",
  storageBucket: "sima-pwa.firebasestorage.app",
  messagingSenderId: "605997992963",
  appId: "1:605997992963:web:b6b029dd3a1a7b9b051236",
  measurementId: "G-6XLN5K19K7"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Menangkap notifikasi push saat PWA sedang tidak dibuka/di latar belakang
messaging.onBackgroundMessage((payload) => {
  console.log('Menerima pesan di latar belakang: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png' // Sesuaikan dengan nama file ikon di PWA Anda jika ada
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
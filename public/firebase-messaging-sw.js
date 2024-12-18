importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA8Pj9hYcNZfPBqEiLJYF8qxfAhOpi3nK0",
  authDomain: "pwa-weather-tracker.firebaseapp.com",
  projectId: "pwa-weather-tracker",
  storageBucket: "pwa-weather-tracker.firebasestorage.app",
  messagingSenderId: "1001682485557",
  appId: "1:1001682485557:web:d67bccde71db56fe4c4c7c",
  measurementId: "G-4QLFF8CKSS",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/android-chrome-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

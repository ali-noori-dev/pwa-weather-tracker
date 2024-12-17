import { firebaseConfig } from "../src/config/firebaseConfig";

importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js"
);

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

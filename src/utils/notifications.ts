import { getToken } from "firebase/messaging";
import { messaging } from "../config/firebaseInit.ts";

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE_KEY_PAIR,
        serviceWorkerRegistration: registration,
      });
      console.log("FCM Token:", token);
      // Send the token to your server to save it for sending notifications
    } else {
      console.error("Permission not granted for notifications");
    }
  } catch (error) {
    console.error("Error getting notification permission", error);
  }
};

export default requestNotificationPermission;

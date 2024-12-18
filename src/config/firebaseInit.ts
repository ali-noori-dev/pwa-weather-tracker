import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA8Pj9hYcNZfPBqEiLJYF8qxfAhOpi3nK0",
  authDomain: "pwa-weather-tracker.firebaseapp.com",
  projectId: "pwa-weather-tracker",
  storageBucket: "pwa-weather-tracker.firebasestorage.app",
  messagingSenderId: "1001682485557",
  appId: "1:1001682485557:web:d67bccde71db56fe4c4c7c",
  measurementId: "G-4QLFF8CKSS",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };

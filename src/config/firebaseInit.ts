import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig.ts";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };

import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../config/firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const sendNotification = async (
  token: string,
  payload: { title: string; body: string }
) => {
  try {
    await admin.messaging().send({
      token,
      notification: payload,
    });
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification", error);
  }
};

export default sendNotification;

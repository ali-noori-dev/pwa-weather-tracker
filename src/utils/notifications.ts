const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
    } else {
      console.error("Permission not granted for notifications");
    }
  } catch (error) {
    console.error("Error getting notification permission", error);
  }
};

export default requestNotificationPermission;

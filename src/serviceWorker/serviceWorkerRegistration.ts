export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    if (import.meta.env.PROD) {
      // Register only in production mode
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered: ", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed: ", error);
        });
    }
  }
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerServiceWorker } from "serviceWorker";
import App from "./App.tsx";

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

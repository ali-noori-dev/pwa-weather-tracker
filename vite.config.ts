import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker in the background
      includeAssets: [
        "icons/favicon.svg",
        "icons/favicon.ico",
        "robots.txt",
        "offline.html",
        "icons/apple-touch-icon.png",
        "images/background.jpg",
      ],
      manifest: {
        name: "PWA Weather Tracker",
        short_name: "WeatherTracker",
        description:
          "A PWA for tracking weather conditions with offline access and push notifications.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/", // Entry point when launched from home screen
        icons: [
          {
            src: "/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/_variables.scss' as *;`, // Auto-import Sass variables globally
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      components: "/src/components",
      constants: "/src/constants",
      hooks: "/src/hooks",
      services: "/src/services",
      serviceWorkers: "/src/serviceWorkers",
      styles: "/src/styles",
      types: "/src/types",
      utils: "/src/utils",
    },
  },
  server: {
    port: 5174,
  },
});

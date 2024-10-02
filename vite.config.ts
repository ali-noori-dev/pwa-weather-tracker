import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker in the background
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
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
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.openweathermap\.org\//, // Cache weather API responses
            handler: "NetworkFirst", // Use NetworkFirst caching strategy for API calls
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // Cache responses for 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/, // Cache image files
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache images for 1 week
              },
            },
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/styles/_variables.scss';`, // Auto-import Sass variables globally
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Set up alias for cleaner imports
    },
  },
});

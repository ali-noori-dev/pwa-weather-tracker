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
        "icons/apple-touch-icon.png",
        "images/background.jpg",
      ],
      manifest: {
        name: "PWA Weather Tracker",
        short_name: "WeatherTracker",
        description:
          "A PWA for tracking weather conditions with offline access and push notifications.",
        theme_color: "#1976d2",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "https://pwa-weather-tracker.netlify.app/",
        scope: "https://pwa-weather-tracker.netlify.app/",
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
        screenshots: [
          {
            src: "/screenshots/Desktop_screenshot.png",
            sizes: "1440x730",
            type: "image/png",
          },
          {
            src: "/screenshots/Mobile_screenshot.png",
            sizes: "458x612",
            type: "image/png",
          },
        ],
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
      serviceWorker: "/src/serviceWorker",
      styles: "/src/styles",
      types: "/src/types",
      utils: "/src/utils",
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
        manualChunks: undefined,
      },
    },
  },
});

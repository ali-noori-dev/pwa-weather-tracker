export default {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{html,js,css,png,svg,woff2,json}", // Adjust based on your assets
  ],
  swDest: "dist/sw.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openweathermap\.org\/data\/2\.5\/weather/,
      handler: "NetworkFirst", // Cache API responses
      options: {
        cacheName: "weather-api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // Cache for 1 hour
        },
      },
    },
    {
      urlPattern: /^https:\/\/wft-geo-db\.p\.rapidapi\.com\/v1\/geo\/places/,
      handler: "StaleWhileRevalidate", // Cache city suggestions API
      options: {
        cacheName: "city-suggestions-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // Cache for 1 hour
        },
      },
    },
  ],
};

module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{html,js,css,png,svg,woff2,json,jpg}"],
  swDest: "dist/sw.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openweathermap\.org\/data\/2\.5\/weather/,
      handler: "NetworkFirst",
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
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "city-suggestions-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // Cache for 1 hour
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|woff2|ttf|otf|eot)$/, // Cache assets like images and fonts
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 1 month
        },
      },
    },
    {
      urlPattern: ({ request }) => request.mode === "navigate", // Cache navigation requests (HTML pages)
      handler: "NetworkFirst",
      options: {
        cacheName: "html-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 1 week
        },
      },
    },
  ],
};

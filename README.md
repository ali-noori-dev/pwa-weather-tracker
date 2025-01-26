# **PWA Weather Tracker**

A Progressive Web App (PWA) built with **React**, **TypeScript**, and **Vite** for tracking real-time weather conditions. The app supports offline access, push notifications, and is installable on mobile and desktop devices for a native-like experience.

## **Screenshots**

### Desktop View

![Desktop Weather Dashboard](/public/screenshots/Desktop_screenshot.png)

Weather dashboard showing current conditions and forecast

### Mobile View

![Mobile Weather Dashboard](/public/screenshots/Mobile_screenshot.png)

Responsive mobile interface with city search

## **Features**

- **Real-time Weather Data**: Fetches live weather data using the [OpenWeatherMap API](https://openweathermap.org/api).
- **City Search Suggestions**: Retrieves city suggestions as the user types using the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/).
- **Advanced Caching**: Implements strategic caching for API responses and static assets to improve performance and offline functionality.
- **Offline Support**: Works offline by caching API responses and static assets.
- **Push Notifications**: Get weather alerts even when the app is closed.
- **Installable**: Can be installed as a native app on mobile and desktop devices using PWA technology.
- **Responsive Design**: Fully responsive UI using **Sass** for flexible styling.

## **Tech Stack**

- **Vite**: A fast, modern build tool for frontend development.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Type-safe development to reduce errors and enhance maintainability.
- **Sass**: CSS preprocessor for cleaner and reusable styles.
- **Vite PWA Plugin**: Easily configure PWA features like service workers, caching, and manifest generation.
- **OneSignal**: Cross-platform push notification service for web and mobile apps.

---

## **Getting Started**

To get a local copy of the project up and running, follow these steps.

### **Prerequisites**

- **Node.js** (v14+)
- **npm** (v7+)

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ali-noori-dev/pwa-weather-tracker.git
   cd pwa-weather-tracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## **Available Scripts**

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5175](http://localhost:5175) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.\
Generates service worker using Workbox.

### `npm run lint`

Runs ESLint to check for code style issues.

### `npm run preview`

Preview the production build locally.

### `npm run build-and-serve`

Builds the app for production and serves it using a local server.\
Open [http://localhost:3000](http://localhost:3000) to view the production build.

---

## **PWA Features**

- **Service Worker**: Automatically generated and updated for offline support.
- **Manifest File**: Provides metadata about the app, such as the name, icons, and theme color.
- **Caching**: Leverages Workbox to cache API responses and static assets for improved offline performance.

### **Testing PWA Features**

1. Run the development server:

   ```bash
   npm run dev
   ```

2. Open the app in **Google Chrome**.
3. Use **Chrome DevTools** (F12):
   - Go to the **"Application"** tab.
   - Check the **"Manifest"** and **"Service Worker"** sections to ensure the PWA is correctly set up.
   - Use **Lighthouse** to audit your PWA for performance, accessibility, best practices, and SEO.

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.

---

## **Acknowledgments**

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Vite PWA Plugin](https://vite-plugin-pwa.netlify.app/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/)

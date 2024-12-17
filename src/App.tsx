import { useEffect } from "react";
import { NetworkStatus, WeatherSearch } from "./components";
import "./styles/main.scss";
import { requestNotificationPermission } from "./utils";

function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <main className="app-main">
      <WeatherSearch />
      <NetworkStatus />
    </main>
  );
}

export default App;

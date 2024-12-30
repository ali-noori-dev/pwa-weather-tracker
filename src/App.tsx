import { NetworkStatus, WeatherSearch } from "./components";
import "./styles/main.scss";

function App() {
  return (
    <main className="app-main">
      <WeatherSearch />
      <NetworkStatus />
    </main>
  );
}

export default App;

import axios from "axios";
import { WeatherData } from "../types";

const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCity = async (city: string) => {
  const response = await axios.get<WeatherData>(
    `${BASE_URL}/data/2.5/weather`,
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    }
  );
  return response.data;
};

import axios from "axios";
import { CitySearchResult } from "../types";

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCitySuggestions = async (
  query: string
): Promise<string[]> => {
  // Only make the request if there is a query
  if (!query.trim()) return [];

  const response = await axios.get<CitySearchResult>(`${BASE_URL}/places`, {
    params: {
      namePrefix: query,
      limit: 10,
      offset: 0,
      types: "CITY",
      minPopulation: 100000,
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  });

  // Extracts and returns an array of city names from the API response.
  return response.data.data.map((place: { name: string }) => place.name);
};

import axios from "axios";
import { CityDetails, CitySearchResult } from "types";

const BASE_URL = import.meta.env.VITE_GEODB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_GEODB_API_KEY;

export const fetchCitySuggestions = async (
  query: string
): Promise<CityDetails[]> => {
  // Only make the request if there is a query
  if (!query.trim()) return [];

  const response = await axios.get<CitySearchResult>(
    `${BASE_URL}/v1/geo/places`,
    {
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
    }
  );

  // Extracts and returns an array of city names from the API response.
  return response.data.data;
};

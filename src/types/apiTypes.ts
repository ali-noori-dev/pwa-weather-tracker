export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiErrorResponse {
  message: string;
}

export interface CitySearchResult {
  data: CityDetails[];
  metadata: CityMetadata;
}

export interface CityDetails {
  id: number;
  wikiDataId: string;
  type: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

interface CityMetadata {
  currentOffset: number;
  totalCount: number;
}

export interface WeatherDetails {
  coord: Coordinates;
  weather: WeatherElement[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: CloudsInfo;
  dt: number;
  sys: LocationDetails;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface CloudsInfo {
  all: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface LocationDetails {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

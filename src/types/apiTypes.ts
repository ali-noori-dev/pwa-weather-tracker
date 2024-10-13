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
  metadata: Metadata;
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

export interface Metadata {
  currentOffset: number;
  totalCount: number;
}

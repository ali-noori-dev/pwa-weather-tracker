import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useFavorites, useGetApi } from "../../hooks";
import { fetchCitySuggestions, fetchWeatherByCity } from "../../services";
import { AutocompleteOption, CityDetails } from "../../types";
import { Autocomplete, Center, VFlex } from "../common";
import FavoriteCitiesList from "../FavoriteCitiesList/FavoriteCitiesList";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import "./WeatherSearch.scss";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { favorites, toggleFavorite } = useFavorites(selectedCity);

  const transformCitySuggestions = (
    data: CityDetails[]
  ): AutocompleteOption[] => {
    return data.map((item) => ({ label: item.name }));
  };

  const { data: suggestions = [], loading: loadingSuggestions } = useGetApi({
    apiMethod: fetchCitySuggestions,
    params: [city],
    transform: transformCitySuggestions,
  });

  const {
    data: weatherData,
    loading: loadingWeather,
    reset: resetWeather,
  } = useGetApi({
    apiMethod: fetchWeatherByCity,
    params: [selectedCity],
    enabled: !!selectedCity,
  });

  const handleInputChange = (inputValue: string) => {
    setCity(inputValue);

    if (!inputValue) {
      setSelectedCity("");
      if (weatherData) resetWeather();
    }
  };

  const onSelectCity = async (selectedItem: AutocompleteOption) => {
    setSelectedCity(selectedItem.label);
  };

  return (
    <Center className="weather-search">
      <VFlex className="weather-search__container">
        <Autocomplete
          options={suggestions ?? []}
          onSelect={onSelectCity}
          placeholder="Search for a city"
          startIcon={<FiSearch />}
          loading={loadingSuggestions}
          onInputChange={handleInputChange}
          defaultOptions={
            favorites.length > 0 && <FavoriteCitiesList favorites={favorites} />
          }
        />

        {loadingWeather ? (
          <Center className="weather-search__message">
            Loading weather data...
          </Center>
        ) : weatherData ? (
          <WeatherDetails
            weatherData={weatherData}
            selectedCity={selectedCity}
            isFavorite={favorites.includes(selectedCity)}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <Center className="weather-search__message">
            Select a city to see the weather
          </Center>
        )}
      </VFlex>
    </Center>
  );
};

export default WeatherSearch;

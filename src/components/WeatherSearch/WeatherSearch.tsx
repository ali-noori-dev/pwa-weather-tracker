import React, { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useFavorites, useGetApi } from "../../hooks";
import { fetchCitySuggestions, fetchWeatherByCity } from "../../services";
import { AutocompleteOption, CityDetails } from "../../types";
import { Autocomplete, Center, VFlex } from "../common";
import FavoriteDeleteButton from "../FavoriteDeleteButton/FavoriteDeleteButton";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import "./WeatherSearch.scss";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { favorites, toggleFavorite, removeFavorite } =
    useFavorites(selectedCity);

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
    if (inputValue !== selectedCity) setCity(inputValue);

    if (!inputValue) {
      setSelectedCity("");
      if (weatherData) resetWeather();
    }
  };

  const renderWeatherContent = () => {
    if (loadingWeather) {
      return renderMessage("Loading weather data...");
    } else if (weatherData) {
      return (
        <WeatherDetails
          weatherData={weatherData}
          selectedCity={selectedCity}
          isFavorite={favorites.includes(selectedCity)}
          toggleFavorite={toggleFavorite}
        />
      );
    } else {
      return renderMessage("Select a city to see the weather");
    }
  };

  const renderMessage = (message: string) => (
    <Center className="weather-search__message">{message}</Center>
  );

  const favoriteOptions = favorites.map((item) => ({
    label: item,
    startIcon: <BsBookmarkFill className="weather-search__bookmark-icon" />,
    endIcon: (
      <FavoriteDeleteButton onRemoveFavorite={() => removeFavorite(item)} />
    ),
  }));

  return (
    <Center className="weather-search">
      <VFlex className="weather-search__container">
        <Autocomplete
          options={suggestions ?? []}
          onSelect={(selectedItem) => setSelectedCity(selectedItem.label)}
          placeholder="Search for a city"
          startIcon={<FiSearch />}
          loading={loadingSuggestions}
          onInputChange={handleInputChange}
          defaultOptions={favoriteOptions}
        />

        {renderWeatherContent()}
      </VFlex>
    </Center>
  );
};

export default WeatherSearch;

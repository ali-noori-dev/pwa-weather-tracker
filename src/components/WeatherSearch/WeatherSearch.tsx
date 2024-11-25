import React, { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { useFavorites, useGetApi } from "../../hooks";
import { fetchCitySuggestions, fetchWeatherByCity } from "../../services";
import { AutocompleteOption, CityDetails } from "../../types";
import { Autocomplete, Center, IconButton, VFlex } from "../common";
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
    setCity(inputValue);

    if (!inputValue) {
      setSelectedCity("");
      if (weatherData) resetWeather();
    }
  };

  const onSelectCity = async (selectedItem: AutocompleteOption) => {
    setSelectedCity(selectedItem.label);
  };

  const defaultOptions = favorites.map((item) => ({
    label: item,
    startIcon: <BsBookmarkFill className="weather-search__bookmark-icon" />,
    endIcon: (
      <IconButton
        ariaLabel="Remove favorite"
        className="weather-search__delete-button"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          removeFavorite(item);
        }}
      >
        <MdClear fontSize={20} />
      </IconButton>
    ),
  }));

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
          defaultOptions={defaultOptions}
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

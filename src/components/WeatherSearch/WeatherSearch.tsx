import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetApi } from "../../hooks";
import { fetchCitySuggestions, fetchWeatherByCity } from "../../services";
import { AutocompleteOption, CityDetails } from "../../types";
import { Autocomplete, Center, VerticalFlex } from "../common";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import "./WeatherSearch.scss";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

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
    data: weather,
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
      if (weather) resetWeather();
    }
  };

  const onSelectCity = async (selectedItem: AutocompleteOption) => {
    setSelectedCity(selectedItem.label);
  };

  return (
    <Center className="weather-search">
      <div className="weather-search__container">
        <Autocomplete
          options={suggestions ?? []}
          onSelect={onSelectCity}
          placeholder="Search for a city"
          startIcon={<FiSearch />}
          loading={loadingSuggestions}
          onInputChange={handleInputChange}
        />

        {loadingWeather ? (
          <Center className="weather-search__message">
            Loading weather data...
          </Center>
        ) : weather ? (
          <VerticalFlex className="weather-search__details" justify="center">
            <Center>
              <WeatherIcon iconCode={weather.weather[0].icon} />
            </Center>
          </VerticalFlex>
        ) : (
          <Center className="weather-search__message">
            Select a city to see the weather
          </Center>
        )}
      </div>
    </Center>
  );
};

export default WeatherSearch;

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetApi } from "../../hooks";
import { fetchCitySuggestions, fetchWeatherByCity } from "../../services";
import { AutocompleteOption } from "../../types";
import { Autocomplete, Center } from "../common";
import "./WeatherSearch.scss";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { data: suggestions = [], loading: loadingSuggestions } = useGetApi({
    apiMethod: fetchCitySuggestions,
    params: [city],
    transform(data) {
      return data.map((item) => ({ label: item.name })) as AutocompleteOption[];
    },
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

  console.log(weather);

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
          <p>Loading weather data...</p>
        ) : weather ? (
          <div>
            <h3>Weather in {selectedCity}</h3>
          </div>
        ) : (
          <p>Select a city to see the weather</p>
        )}
      </div>
    </Center>
  );
};

export default WeatherSearch;

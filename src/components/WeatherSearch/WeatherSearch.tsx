import React, { useState } from "react";
import { FaWind } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { useGetApi } from "../../hooks";
import { fetchCitySuggestions, fetchWeatherByCity } from "../../services";
import { AutocompleteOption, CityDetails } from "../../types";
import { Autocomplete, Center, Flex, VFlex } from "../common";
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
        />

        {loadingWeather ? (
          <Center className="weather-search__message">
            Loading weather data...
          </Center>
        ) : weatherData ? (
          <VFlex align="center" className="weather-search__result">
            <WeatherIcon iconCode={weatherData.weather[0].icon} />

            <p className="weather-search__temp">
              {Math.round(weatherData.main.temp)}°C
            </p>

            <h3 className="weather-search__city-name">{selectedCity}</h3>

            <Flex className="weather-search__stats">
              <Flex>
                <WiHumidity size={60} />

                <VFlex justify="center" gap="4px">
                  <p className="weather-search__humidity">
                    {weatherData.main.humidity}%
                  </p>

                  <p>Humidity</p>
                </VFlex>
              </Flex>

              <Flex gap="16px" align="center">
                <FaWind size={50} />

                <VFlex justify="center" gap="4px">
                  <p className="weather-search__wind">
                    {Math.round(weatherData.wind.speed)} km/h
                  </p>

                  <p>Wind Speed</p>
                </VFlex>
              </Flex>
            </Flex>
          </VFlex>
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

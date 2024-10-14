import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetApi } from "../../hooks";
import { fetchCitySuggestions } from "../../services";
import { Autocomplete, Center } from "../common";
import "./WeatherSearch.scss";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");

  const { data: suggestions = [], loading } = useGetApi({
    apiMethod: fetchCitySuggestions,
    params: [city],
  });

  const handleInputChange = (inputValue: string) => {
    setCity(inputValue);
  };

  const onSelectCity = (selectedItem: string) => {
    console.log(selectedItem);
  };

  return (
    <Center className="weather-search">
      <div className="weather-search__container">
        <Autocomplete
          suggestions={suggestions ?? []}
          onSelect={onSelectCity}
          placeholder="Search for a city"
          startIcon={<FiSearch />}
          loading={loading}
          onInputChange={handleInputChange}
        />
      </div>
    </Center>
  );
};

export default WeatherSearch;

import { WeatherIcon } from "components";
import { Button, Flex, VFlex } from "components/common";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WeatherData } from "types";
import "./WeatherDetails.scss";

interface WeatherDetailsProps {
  weatherData: WeatherData;
  selectedCity: string;
  isFavorite: boolean;
  toggleFavorite: VoidFunction;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weatherData,
  selectedCity,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <VFlex align="center" className="weather-details">
      <WeatherIcon iconCode={weatherData.weather[0].icon} />

      <p className="weather-details__temp">
        {Math.round(weatherData.main.temp)}°C
      </p>

      <h3 className="weather-details__city-name">{selectedCity}</h3>

      <Flex className="weather-details__stats">
        <Flex>
          <WiHumidity size={60} />

          <VFlex justify="center" gap="4px">
            <p className="weather-details__humidity">
              {weatherData.main.humidity}%
            </p>

            <p>Humidity</p>
          </VFlex>
        </Flex>

        <Flex gap="16px" align="center">
          <FaWind size={50} />

          <VFlex justify="center" gap="4px">
            <p className="weather-details__wind">
              {Math.round(weatherData.wind.speed)} km/h
            </p>

            <p>Wind Speed</p>
          </VFlex>
        </Flex>
      </Flex>

      {isFavorite ? (
        <Button
          icon={<BsBookmarkFill />}
          onClick={toggleFavorite}
          className="weather-details__favorite-btn"
        >
          Saved
        </Button>
      ) : (
        <Button icon={<BsBookmark />} onClick={toggleFavorite}>
          Save
        </Button>
      )}
    </VFlex>
  );
};

export default WeatherDetails;

import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WeatherData } from "../../types";
import { Flex, VFlex } from "../common";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import "./WeatherDetails.scss";

interface WeatherDetailsProps {
  weatherData: WeatherData;
  selectedCity: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weatherData,
  selectedCity,
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
    </VFlex>
  );
};

export default WeatherDetails;

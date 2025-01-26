import { weatherIconPaths } from "constants/weatherIconPaths";
import React from "react";
import "./WeatherIcon.scss";

interface WeatherIconProps {
  iconCode: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const iconPath = weatherIconPaths[iconCode] || "/icons/day.svg"; // Default to day icon if code not found

  return <img src={iconPath} alt="Weather Icon" className="weather-icon" />;
};

export default WeatherIcon;

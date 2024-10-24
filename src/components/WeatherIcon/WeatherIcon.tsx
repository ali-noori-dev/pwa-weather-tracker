interface WeatherIconProps {
  iconCode: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return <img src={iconUrl} alt="Weather Icon" className="weather-icon" />;
};

export default WeatherIcon;

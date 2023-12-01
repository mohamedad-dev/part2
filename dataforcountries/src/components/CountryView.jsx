import { useEffect, useState } from "react";
import axios from "axios";

const CountryView = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`
      )
      .then((res) => setWeatherData(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weatherData ? (
        <>
          <h3>Weather in {country.capital[0]}:</h3>
          <p>
            Temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>Wind {weatherData.wind.speed} m/s</p>
        </>
      ) : (
        <p style={{ color: "red" }}>
          No weather data is available for {country.name.common} at the moment.
        </p>
      )}
    </div>
  );
};
export default CountryView;

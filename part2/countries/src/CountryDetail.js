import React, { useEffect, useState } from "react";
import weatherService from "./services/weather";

export default function CountryDetail({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capitalInfo.latlng) {
      const [latitude, longitude] = country.capitalInfo.latlng;
      weatherService.getWeather(latitude, longitude).then((data) => {
        setWeather(data);
      });
    }
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <dl>
        <dt>Captial</dt>
        <dd>{country.capital.join(",")}</dd>

        <dt>Area</dt>
        <dd>{country.area}</dd>
      </dl>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
      />

      {weather && (
        <>
          <h3>Weather in {country.capital[0]}</h3>

          <dl>
            <dt>Time</dt>
            <dd>{weather.current_weather.time}</dd>

            <dt>Temperature</dt>
            <dd>{weather.current_weather.temperature} °C</dd>

            <dt>Windspeed</dt>
            <dd>{weather.current_weather.windspeed} km/h</dd>
          </dl>
        </>
      )}
    </div>
  );
}

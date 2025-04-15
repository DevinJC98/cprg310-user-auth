"use client";

import { useEffect, useState } from "react";
import WeatherChart from "./WeatherChart";
import "./Weather.css";

const weatherMapping = {
  Clear: { text: "Clear", icon: "☀️" },
  Clouds: { text: "Cloudy", icon: "⛅" },
  Drizzle: { text: "Drizzle", icon: "🌦️" },
  Rain: { text: "Rain", icon: "🌧️" },
  Thunderstorm: { text: "Thunderstorm", icon: "⛈️" },
  Snow: { text: "Snow", icon: "❄️" },
  Mist: { text: "Mist", icon: "🌫️" },
  Smoke: { text: "Smoke", icon: "🌫️" },
  Haze: { text: "Haze", icon: "🌫️" },
  Dust: { text: "Dust", icon: "🌫️" },
  Fog: { text: "Fog", icon: "🌫️" },
  Sand: { text: "Sand", icon: "🌫️" },
  Ash: { text: "Ash", icon: "🌫️" },
  Squall: { text: "Squall", icon: "💨" },
  Tornado: { text: "Tornado", icon: "🌪️" },
};

export default function Weather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      const apiKey = "17b199da9f8c2ccdd65090c7e00b6ba2";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${apiKey}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setWeather(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather Application</h1>

      {weather ? (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          {(() => {
            const main = weather.weather[0].main;
            const mapped = weatherMapping[main];
            return (
              <p className="description">
                {mapped ? `${mapped.icon} ${mapped.text}` : main}
              </p>
            );
          })()}
          <p className="temperature">{weather.main.temp}°C</p>
        </div>
      ) : (
        <p className="not-found">No weather data found for "{city}"</p>
      )}

      <WeatherChart city={city} />
    </div>
  );
}

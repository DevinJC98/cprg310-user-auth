"use client";
import { useState } from "react";
import MiniMapWrapper from "./components/MiniMapWrapper";
import Weather from "./components/Weather/Weather";
import ThemeSettings from "./components/ThemeSettings";

export default function Home() {
  const [inputCity, setInputCity] = useState("Calgary");
  const [city, setCity] = useState("Calgary");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  return (
    <div>
      <div className="title">
        <p className="welcome_text">Welcome to our blog world! </p>
        <div>
          <ThemeSettings />
        </div>
      </div>
      <div className="mapweather">
        <div className="search-section">
          <form onSubmit={handleSubmit} className="shared-form">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Enter a city"
            />
            <button type="submit">Your favorite place</button>
          </form>
          <p className="search-description">
            Five famous attractions and local weather in your favorite place
          </p>
        </div>
        <div className="infor">
          <div className="map">
            <MiniMapWrapper city={city} />
          </div>
          <div className="weather">
            <Weather city={city} />
          </div>
        </div>
      </div>
    </div>
  );
}

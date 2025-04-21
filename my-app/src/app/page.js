"use client";
import { useState } from "react";
import MiniMapWrapper from "./components/MiniMapWrapper";
import ThemeSettings from "./components/ThemeSettings";

const poemLines = [
  "The world is wide, the road is long,",
  "I travel light with heart and song.",
  "Through mountain winds and ocean’s spray,",
  "I chase the sun and dance with day.",
  "The cities call with tales untold,",
  "The forests hum with secrets old.",
  "A map? I have none—only stars,",
  "And dreams that stretch beyond the bars.",
  "For every step, my soul flies free.",
];

export default function Home() {
  const [inputCity, setInputCity] = useState("Calgary");
  const [city, setCity] = useState("Calgary");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  return (
    <div>
      <div></div>
      <div className="welcome-part">
        <div className="title">
          <p className="welcome_text">Welcome to our blog world! </p>
          <div className="poem">
            {poemLines.map((line, index) => (
              <p
                key={index}
                className="poem-line"
                style={{ animationDelay: `${index * 0.6}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="mapweather">
          <div className="search-section">
            <form onSubmit={handleSubmit} className="shared-form">
              <input
                className="city-input"
                type="text"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter a city"
              />
              <button className="submit-button" type="submit">
                Search
              </button>
            </form>
            <p className="search-description">
              Famous attractions and local weather in your favorite place.
            </p>
          </div>
          <div className="infor">
            <div className="map">
              <MiniMapWrapper city={city} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";

export default function WeatherChart({ city }) {
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const apiKey = "17b199da9f8c2ccdd65090c7e00b6ba2";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      const temps = data.list.map((entry) => ({
        date: new Date(entry.dt * 1000),
        temp: entry.main.temp,
      }));

      setTemperatureData(temps);
    };

    fetchForecast();
  }, [city]);

  useEffect(() => {
    if (temperatureData.length === 0) return;

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select("#chart").selectAll("*").remove();

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(temperatureData, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(temperatureData, (d) => d.temp),
        d3.max(temperatureData, (d) => d.temp),
      ])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.temp));

    svg
      .append("path")
      .datum(temperatureData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [temperatureData]);

  return (
    <div id="chart" className="w-full flex justify-center items-center"></div>
  );
}

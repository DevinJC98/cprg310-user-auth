"use client";
import { useState, useEffect } from "react";

const themes = [
  {
    id: "light",
    name: "Light",
    bg: "#ffffff",
    text: "#000000",
    accent: "#007bff",
  },
  {
    id: "dark",
    name: "Dark",
    bg: "#121212",
    text: "#ffffff",
    accent: "#bb86fc",
  },
];

export default function ThemeSettings() {
  const [selected, setSelected] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setSelected(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (id) => {
    const theme = themes.find((t) => t.id === id);
    if (!theme) return;

    document.documentElement.style.setProperty("--bg", theme.bg);
    document.documentElement.style.setProperty("--text", theme.text);
    document.documentElement.style.setProperty("--accent", theme.accent);
  };

  const changeTheme = (e) => {
    const id = e.target.value;
    setSelected(id);
    localStorage.setItem("theme", id);
    applyTheme(id);
  };

  return (
    <div className="theme">
      <p>Theme Settings :</p>
      {themes.map((t) => (
        <label key={t.id}>
          <input
            type="radio"
            name="theme"
            value={t.id}
            checked={selected === t.id}
            onChange={changeTheme}
          />
          {t.name}
        </label>
      ))}
    </div>
  );
}

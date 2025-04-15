"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./Map.css";

import { useMap } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MiniMap({ city }) {
  const [center, setCenter] = useState([51.0447, -114.0719]);
  const [places, setPlaces] = useState([]);

  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  }

  useEffect(() => {
    if (!city) return;

    const fetchLocationAndPlaces = async () => {
      try {
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
        ).then((r) => r.json());
        if (!geo[0]) return;

        const lat = parseFloat(geo[0].lat),
          lon = parseFloat(geo[0].lon);
        setCenter([lat, lon]);

        const query = `[out:json];node(around:5000,${lat},${lon})[tourism];out;`;
        const data = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        }).then((r) => r.json());

        const top5 = data.elements.slice(0, 5).map((p) => ({
          lat: p.lat,
          lon: p.lon,
          name: p.tags?.name || "景点",
        }));
        setPlaces(top5);
      } catch (err) {
        console.error("Map fetch error:", err);
      }
    };

    fetchLocationAndPlaces();
  }, [city]);

  return (
    <div className="mini-map-container">
      <MapContainer center={center} zoom={14} className="leaflet-container">
        <ChangeMapView center={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>查询地点</Popup>
        </Marker>
        {places.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lon]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

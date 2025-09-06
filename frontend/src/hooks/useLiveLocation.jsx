import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

export function useLiveLocation() {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    place: "Fetching...",
  });

  useEffect(() => {
    socket.on("sensorUpdate", async (data) => {
      if (!data?.gps) return;

      // Split "40.432, 34.123" into [lat, lng]
      const [latStr, lngStr] = data.gps.split(",").map((val) => val.trim());
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      let placeName = "Unknown location";
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const result = await response.json();
        placeName = result.display_name || "Unknown location";
      } catch (err) {
        console.error("Geocoding error:", err);
      }

      setLocation({ lat, lng, place: placeName });
    });

    return () => {
      socket.off("sensorUpdate");
    };
  }, []);

  return location;
}

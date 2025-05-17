import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        setLocation(null);
      }
    );
  }, []);

  return location;
}

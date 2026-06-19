import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import { useEffect, useState } from "react";
import userIcon from "../assets/user.png";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export default function EditLocationPicker({
  location,
  setLocation,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState({
    lat: 22.3039,
    lng: 70.8022,
  });

  // Set map center from saved location
  useEffect(() => {
    const coords =
      location?.coordinates?.coordinates;

    if (coords?.length === 2) {
      setCenter({
        lat: Number(coords[1]),
        lng: Number(coords[0]),
      });
    }
  }, [location]);

  const updateLocation = (lat, lng) => {
    setLocation({
      coordinates: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    setCenter({
      lat,
      lng,
    });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    updateLocation(lat, lng);
  };

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="space-y-3">
      <GoogleMap
        mapContainerStyle={
          mapContainerStyle
        }
        center={center}
        zoom={15}
        onClick={handleMapClick}
      >
        {location?.coordinates
          ?.coordinates?.length === 2 && (
            <Marker
              position={{
                lat: Number(
                  location.coordinates
                    .coordinates[1]
                ),
                lng: Number(
                  location.coordinates
                    .coordinates[0]
                ),
              }}
              icon={{
                url: userIcon,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          )}
      </GoogleMap>
    </div>
  );
}
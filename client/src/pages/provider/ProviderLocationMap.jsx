import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "350px",
};

export default function ProviderLocationMap({
  provider,
}) {
  const [showInfo, setShowInfo] =
    useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded)
    return <div>Loading Map...</div>;

  const lat =
    provider?.location?.coordinates
      ?.coordinates?.[1];

  const lng =
    provider?.location?.coordinates
      ?.coordinates?.[0];

  if (!lat || !lng) {
    return (
      <div className="bg-white p-4 rounded-lg">
        Location not available
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={15}
      center={{ lat, lng }}
    >
      <Marker
        position={{ lat, lng }}
        onClick={() =>
          setShowInfo(true)
        }
      />

      {showInfo && (
        <InfoWindow
          position={{ lat, lng }}
          onCloseClick={() =>
            setShowInfo(false)
          }
        >
          <div>
            <h3 className="font-bold">
              {provider.name}
            </h3>

            <p>
              {provider.service}
            </p>

            <p>
              {provider.location.city}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
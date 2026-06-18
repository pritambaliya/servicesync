import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import { useEffect, useRef, useState } from "react";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export default function LocationPicker({
  location,
  setLocation,
}) {
  const [center, setCenter] = useState({
    lat: 22.3039,
    lng: 70.8022,
  });

  const searchRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;
        const lng =
          position.coords.longitude;

        setCenter({ lat, lng });

        setLocation({
          address: "",
          city: "",
          state: "",
          pincode: "",
          coordinates: {
            type: "Point",
            coordinates: [lng, lat],
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // Reverse Geocode
  const updateLocation = async (
    lat,
    lng
  ) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const data = await res.json();

      let address = "";
      let city = "";
      let state = "";
      let pincode = "";

      if (data.results.length > 0) {
        address =
          data.results[0]
            .formatted_address;

        data.results[0].address_components.forEach(
          (item) => {
            if (
              item.types.includes(
                "locality"
              )
            )
              city = item.long_name;

            if (
              item.types.includes(
                "administrative_area_level_1"
              )
            )
              state = item.long_name;

            if (
              item.types.includes(
                "postal_code"
              )
            )
              pincode = item.long_name;
          }
        );
      }

      setLocation({
        address,
        city,
        state,
        pincode,
        coordinates: {
          type: "Point",
          coordinates: [lng, lat],
        },
      });

      setCenter({ lat, lng });

    } catch (error) {
      console.log(error);
    }
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    updateLocation(lat, lng);
  };

  const onPlacesChanged = () => {
    const places =
      searchRef.current.getPlaces();

    if (!places.length) return;

    const place = places[0];

    const lat =
      place.geometry.location.lat();

    const lng =
      place.geometry.location.lng();

    updateLocation(lat, lng);
  };

  if (!isLoaded)
    return <div>Loading Map...</div>;

  return (
    <div className="space-y-3">


      <GoogleMap
        mapContainerStyle={
          mapContainerStyle
        }
        zoom={15}
        center={center}
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
          />
        )}
      </GoogleMap>

      {location?.address && (
        <div className="bg-gray-100 p-3 rounded">
          <p>
            <strong>
              Selected Address:
            </strong>
          </p>
          <p>{location.address}</p>
        </div>
      )}
    </div>
  );
}
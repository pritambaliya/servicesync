import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { X } from "lucide-react";

export default function BookingPage() {
  const { providerid } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(state || null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [flash, setFlash] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const fetchProvider = async () => {
    try {
      const { data } = await API.get(`/provider/${providerid}`);
      setProvider(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!provider) fetchProvider();
  }, [providerid]);

  useEffect(() => {
    if (provider?.location) {
      setAddress(provider.location.address || "");
      setCity(provider.location.city || "");
      setStateName(provider.location.state || "");
    }
  }, [provider]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setFlash({ type: "error", message: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);

        setFlash({
          type: "success",
          message: "Location fetched successfully 📍"
        });
      },
      () => {
        setFlash({
          type: "error",
          message: "Location permission denied ❌"
        });
      }
    );
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        setFlash({ type: "error", message: "Please select date & time" });
        return;
      }

      setLoading(true);

      const latNum = parseFloat(latitude);
      const lngNum = parseFloat(longitude);

      const locationData = {
        address,
        city,
        state: stateName,
        ...( !isNaN(latNum) && !isNaN(lngNum) && {
          coordinates: {
            type: "Point",
            coordinates: [lngNum, latNum] 
          }
        })
      };

      await API.post("/bookings/create", {
        providerId: providerid,
        service: provider.service,
        date,
        time,
        note,
        location: locationData
      });

      setFlash({ type: "success", message: "Booking Successful 🎉" });

      setTimeout(() => {
        navigate("/customer");
      }, 1500);

    } catch (err) {
      console.log(err);
      setFlash({
        type: "error",
        message: err.response?.data?.message || "Booking failed"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!provider) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">

      {/* FLASH */}
      {flash.message && (
        <div className={`fixed top-0 left-0 w-full flex justify-between px-4 py-3 z-[9999]
          ${flash.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          <span>{flash.message}</span>
          <X onClick={() => setFlash({ type: "", message: "" })} />
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md my-10">

        <h1 className="text-2xl font-bold text-center mb-4">
          Book Service
        </h1>

        {/* PROVIDER */}
        <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
          <p><b>{provider.name}</b></p>
          <p>{provider.service}</p>
          <p>{provider.location?.city}</p>
        </div>

        <label>Date</label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label>Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label>Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <label>City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <label>State</label>
        <input
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={getCurrentLocation}
          className="w-full mb-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          📍 Use Current Location
        </button>

        {latitude && longitude && (
          <p className="text-xs text-gray-500 mb-3 text-center">
            📍 {latitude}, {longitude}
          </p>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-3 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-900"
          }`}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

      </div>
    </div>
  );
}
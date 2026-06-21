import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../../api/axios.js";
import { X } from "lucide-react";
import Flash from "../../components/Flash.jsx";

export default function BookingPage() {
  const { providerid } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(state || null);
  const [user, setUser] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");


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
    const currentUser = JSON.parse(localStorage.getItem("user"));

    console.log("Current Login User:", currentUser);

    setUser(currentUser);
  }, []);

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        setFlash({ type: "error", message: "Please select date & time" });
        return;
      }

      setLoading(true);
      
      const latNum = Number(user?.location?.coordinates?.coordinates?.[1]);
      const lngNum = Number(user?.location?.coordinates?.coordinates?.[0]);

      const locationData = {
        address: user?.location?.address || "",
        city: user?.location?.city || "",
        state: user?.location?.state || "",
        pincode: user?.location?.pincode || "",

        ...(!isNaN(latNum) && !isNaN(lngNum) && {
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

      {flash.message && (
        <Flash flash={flash} setFlash={setFlash} />
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md my-10">

        <h1 className="text-2xl font-bold text-center mb-4">
          Book Service
        </h1>

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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">

  <div className="flex justify-between items-start gap-3">

    <div>
      <h3 className="font-semibold text-blue-900">
        Service Address
      </h3>

      <p className="text-sm text-gray-700 mt-1">
        {user?.location?.address || "Address not available"}
      </p>

      <p className="text-xs text-gray-500">
        {user?.location?.city},{" "}
        {user?.location?.state}
      </p>
    </div>

    <button
      onClick={() =>
        navigate("/customer/profile/edit")
      }
      className="text-blue-600 text-sm font-medium hover:underline"
    >
      Change
    </button>

  </div>

</div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-3 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-900"
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
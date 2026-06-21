import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import { ArrowLeft, X } from "lucide-react";
import Flash from "../../components/Flash";

export default function EditBooking() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");

  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const fetchBooking = async () => {

    try {

      setLoading(true);

      const { data } = await API.get(
        "/bookings/customer",
        {
          withCredentials: true
        }
      );

      const booking = data.data.find(
        (b) => b._id === id
      );

      if (!booking) {

        setFlash({
          type: "error",
          message: "Booking not found"
        });

        setTimeout(() => {
          navigate(-1);
        }, 1500);

        return;
      }

      setDate(
        booking.date
          ? new Date(booking.date)
            .toISOString()
            .split("T")[0]
          : ""
      );

      setTime(booking.time || "");
      setNote(booking.note || "");

      setAddress(booking.location?.address || "");
      setCity(booking.location?.city || "");
      setStateName(booking.location?.state || "");

      setLng(
        booking.location?.coordinates?.coordinates?.[0] || ""
      );

      setLat(
        booking.location?.coordinates?.coordinates?.[1] || ""
      );

    } catch (err) {

      console.log(err);

      setFlash({
        type: "error",
        message: "Failed to fetch booking"
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  // get current location
  const getCurrentLocation = () => {

    if (!navigator.geolocation) {

      setFlash({
        type: "error",
        message: "Geolocation not supported"
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLat(position.coords.latitude);
        setLng(position.coords.longitude);

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

  // update booking
  const handleUpdate = async () => {

    try {

      if (!date || !time) {

        setFlash({
          type: "error",
          message: "Date & Time required"
        });

        return;
      }

      setLoading(true);

      await API.put(`/bookings/update/${id}`, {
        date,
        time,
        note,
        address,
        city,
        state: stateName,
        lat,
        lng
      },

        {
          withCredentials: true
        }
      );

      setFlash({
        type: "success",
        message: "Booking updated successfully 🎉"
      });

      setTimeout(() => {
        navigate("/customer/bookings");
      }, 1500);

    } catch (err) {


      setFlash({
        type: "error",
        message:
          err.response?.data?.message ||
          "Update failed"
      });

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-r
      from-[#081c3a]
      to-[#0b3c78]
      flex items-center justify-center
      p-4
    ">

      {flash.message && (
        <Flash flash={flash} setFlash={setFlash} success={false} />
      )}
      {loading && <Loader />}

      <div className="
        bg-white
        w-full
        max-w-2xl
        rounded-2xl
        p-6 md:p-8
        shadow-2xl
      ">

        <div className="flex items-center gap-3 mb-6">

          <button
            onClick={() => navigate(-1)}
            className="
              bg-gray-100
              hover:bg-gray-200
              p-2
              rounded-full
            "
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-bold">
            Edit Booking
          </h1>

        </div>

        <div className="mb-4">

          <label className="font-semibold">
            Date
          </label>

          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className=" w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div className="mb-4">

          <label className="font-semibold">
            Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="
              w-full
              border
              p-3
              rounded-lg
              mt-2
            "
          />

        </div>

        <div className="mb-4">

          <label className="font-semibold">
            Note
          </label>

          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="
              w-full
              border
              p-3
              rounded-lg
              mt-2
            "
          />

        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`
            w-full
            text-white
            py-3
            rounded-lg
            font-semibold
            ${loading
              ? "bg-gray-400"
              : "bg-blue-900 hover:bg-blue-950"
            }
          `}
        >
          {loading ? "Updating..." : "Update Booking"}
        </button>

      </div>
    </div>
  );
}
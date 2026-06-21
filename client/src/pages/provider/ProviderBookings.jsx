import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import { useNavigate } from "react-router-dom";

export default function ProviderBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchBookings = async () => {
    try {

      setLoading(true);
      const { data } = await API.get(
        "/bookings/provider",
        {
          withCredentials: true,
        }
      );
      setBookings(data.data || []);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {

      await API.put(
        `/bookings/${id}/status`,
        { status },
        {
          withCredentials: true,
        }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, status }
            : b
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-GB"
    );
  };

  const formatTime = (time) => {

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
  };

  const openMap = (booking) => {

    const coordinates =
      booking.location?.coordinates?.coordinates;

    if (!coordinates) {
      alert("Location not available");
      return;
    }

    const lng = coordinates[0];
    const lat = coordinates[1];

    window.open(
      `https://www.google.com/maps?q=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] p-6">

      {loading && <Loader />}

      <div className="max-w-7xl mx-auto mb-8">

        <h1 className="text-4xl font-bold text-white">
          Service Bookings
        </h1>

        <p className="text-gray-300 mt-2">
          Manage customer booking requests
        </p>

      </div>

      {bookings.length === 0 ? (

        <div className="text-center text-gray-300 mt-20">
          No bookings found
        </div>

      ) : (

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="
                bg-white/10
                backdrop-blur-md
                border
                border-white/20
                rounded-3xl
                p-6
                shadow-2xl
              "
            >

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-4">

                  {booking.customer?.profileImage?.url ? (
                    <img
                      src={
                        booking.customer.profileImage.url
                      }
                      alt="customer"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/30
                      "
                    />

                  ) : (

                    <div
                      className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl"
                    >
                      👤
                    </div>

                  )}

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {booking.customer?.name}
                    </h2>

                    <p className="text-gray-300 text-sm">
                      {booking.customer?.email}
                    </p>
                  </div>
                </div>

                <div>
                  {booking.status === "pending" && (
                    <span
                      className="bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Pending
                    </span>
                  )}

                  {booking.status === "accepted" && (
                    <span
                      className="bg-green-400/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Accepted
                    </span>
                  )}

                  {booking.status === "cancelled" && (
                    <span
                      className="bg-red-400/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Cancelled
                    </span>
                  )}

                  {booking.status === "completed" && (
                    <span
                      className="bg-blue-400/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Completed
                    </span>
                  )}

                </div>
              </div>

              <div className="space-y-3 text-gray-200">

                <p>
                  🛠 Service :
                  <span className="ml-2 text-white">
                    {booking.service}
                  </span>
                </p>

                <p>
                  📅 Booking Date :
                  <span className="ml-2 text-white">
                    {formatDate(booking.date)}
                  </span>
                </p>

                <p>
                  ⏰ Time :
                  <span className="ml-2 text-white">
                    {formatTime(booking.time)}
                  </span>
                </p>

                <p>
                  📍 Address :
                  <span className="ml-2 text-white">
                    {booking.location?.address}
                  </span>
                </p>

                <p>
                  🏙 City :
                  <span className="ml-2 text-white">
                    {booking.location?.city}
                  </span>
                </p>

                <p>
                  📞 Mobile :
                  <span className="ml-2 text-white">
                    {booking.customer?.mobile}
                  </span>
                </p>

                {booking.note && (
                  <p>
                    📝 Note :
                    <span className="ml-2 text-white">
                      {booking.note}
                    </span>
                  </p>
                )}

              </div>

              <button
                onClick={() => openMap(booking)}
                className="mt-7 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition"
              >
                🗺️ View Customer Location
              </button>

              <div className="flex flex-wrap gap-3 mt-3">

                {booking.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        booking._id,
                        "accepted"
                      )
                    }
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition"
                  >
                    Accept
                  </button>
                )}

                {booking.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        booking._id,
                        "cancelled"
                      )
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
                  >
                    Cancelled
                  </button>
                )}

                {booking.status === "accepted" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/provider/chat/${booking._id}`)
                      }
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-2xl font-semibold transition"
                    >
                      Chat Now
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          booking._id,
                          "completed"
                        )
                      }
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold transition"
                    >
                      Mark as Completed
                    </button>
                  </>
                )}

                {booking.status === "completed" && (
                  <button
                    onClick={() =>
                      navigate(`/provider/chat/${booking._id}`)
                    }
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-2xl font-semibold transition"
                  >
                    Open Chat
                  </button>
                )}
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
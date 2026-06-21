import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function CustomerBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const navigate = useNavigate();
  const fetchBookings = async () => {
    try {

      setLoading(true);

      const { data } = await API.get(
        "/bookings/customer",
        {
          withCredentials: true
        }
      );

      setBookings(data.data || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const removeCard = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this booking permanently?"
    );

    if (!confirmDelete) return;

    try {

      setLoading(true);

      await API.delete(
        `/bookings/delete/${id}`,
        {
          withCredentials: true
        }
      );

      setBookings((prev) =>
        prev.filter((b) => b._id !== id)
      );

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {

    if (!time) return "N/A";

    try {

      if (time.includes("AM") || time.includes("PM")) {
        return time;
      }

      return new Date(
        `1970-01-01T${time}`
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

    } catch {
      return time;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] p-4 md:p-6">

      {loading && <Loader />}

      <h1 className="text-3xl font-bold text-white text-center mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (

        <p className="text-center text-gray-300">
          No bookings found
        </p>

      ) : (

        <div className="max-w-5xl mx-auto grid gap-6">

          {bookings.map((b) => (

            <div
              key={b._id}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 md:pt-10 pt-10 shadow-lg"
            >

              {b.status !== "pending" && (
                <button
                  onClick={() => removeCard(b._id)}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 p-2 rounded-full transition"
                >
                  <X size={18} />
                </button>
              )}

              <div className="flex justify-between items-start gap-4 flex-wrap">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      b.provider?.profileImage?.url ||
                      "https://via.placeholder.com/100"
                    }
                    alt="provider"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/30"
                  />

                  <div>

                    <h2 className="text-lg md:text-xl font-bold text-white">
                      {b.provider?.name || "Unknown Provider"}
                    </h2>

                    {b.service && (
                      <p className="text-sm text-gray-300 mt-1">
                        🛠 {b.service}
                      </p>
                    )}

                    <p className="text-yellow-400 text-sm mt-1">
                      ⭐ {b.provider?.rating || "No rating"}
                    </p>

                  </div>
                </div>

                <div
                  className={`
                    px-4 py-1 rounded-full text-sm font-semibold capitalize

                    ${b.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : b.status === "accepted"
                        ? "bg-blue-500 text-white"
                        : b.status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                    }
                  `}
                >
                  {b.status}
                </div>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4 text-white text-sm">

                <p>
                  📅 <span className="font-semibold">Date:</span>{" "}
                  {new Date(b.date).toLocaleDateString("en-GB")}
                </p>

                <p>
                  ⏰ <span className="font-semibold">Time:</span>{" "}
                  {formatTime(b.time)}
                </p>

                {b.note && (
                  <p className="md:col-span-2">
                    📝 <span className="font-semibold">Note:</span>{" "}
                    {b.note}
                  </p>
                )}

                {b.location?.address && (
                  <p className="md:col-span-2">
                    📍 <span className="font-semibold">Address:</span>{" "}
                    {b.location.address}
                  </p>
                )}

                {b.status === "accepted" &&
                  b.provider?.mobile && (
                    <p>
                      📞 <span className="font-semibold">
                        Provider:
                      </span>{" "}
                      {b.provider.mobile}
                    </p>
                  )}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  onClick={() => setSelectedProvider(b.provider)}
                  className="
                    flex-1
                    bg-white/20
                    hover:bg-white/30
                    text-white
                    py-2
                    rounded-lg
                  "
                >
                  More Details
                </button>

                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/customer/bookings/edit/${b._id}`)
                      }
                      className="
                        flex-1
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-2
                        rounded-lg
                      "
                    >
                      Edit Booking
                    </button>

                  </>
                )}

                {b.status === "accepted" && (
                  <>
                    <button
                      onClick={() =>
                        navigate("/customer/bookings/review", {
                          state: {
                            providerId: b.provider._id,
                            bookingId: b._id,
                            providerName: b.provider.name,
                            serviceName: b.service,
                          },
                        })
                      }
                      className="
                        flex-1
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-black
                        py-2
                        rounded-lg
                      "
                    >
                      Review & Rating
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/customer/chat/${b._id}`,
                          {
                            state: {
                              bookingId: b._id,
                              provider: b.provider,
                            },
                          }
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]
                      "
                    >
                      <MessageCircle size={18} />

                      Chat Now
                    </button>

                  </>
                )}

                {b.status === "completed" && (
                  <>
                    <button
                      onClick={() =>
                        navigate("/customer/bookings/review", {
                          state: {
                            providerId: b.provider._id,
                            bookingId: b._id,
                            providerName: b.provider.name,
                            serviceName: b.service,
                          },
                        })
                      }
                      className="
                      flex-1
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-black
                      py-2
                      rounded-lg
                    "
                    >
                      Review & Rating
                    </button>


                    <button
                      onClick={() =>
                        navigate(
                          `/customer/chat/${b._id}`,
                          {
                            state: {
                              bookingId: b._id,
                              provider: b.provider,
                            },
                          }
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <MessageCircle size={18} />

                      Chat Now
                    </button>
                  </>
                )}

                {b.status === "cancelled" && (
                  <button
                    onClick={() =>
                      navigate("/customer/bookings/review", {
                        state: {
                          providerId: b.provider._id,
                          bookingId: b._id,
                          providerName: b.provider.name,
                          serviceName: b.service,
                        },
                      })
                    }
                    className="
                      flex-1
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-black
                      py-2
                      rounded-lg
                    "
                  >
                    Review & Rating
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProvider && (

        <div className="
          fixed inset-0
          bg-black/50
          backdrop-blur-sm
          flex items-center justify-center
          z-50 p-4
        ">

          <div className="
            bg-white
            rounded-2xl
            w-full max-w-md
            p-6
            relative
            shadow-2xl
            max-h-[90vh]
            overflow-y-auto
          ">

            <button
              onClick={() => setSelectedProvider(null)}
              className="
                absolute top-3 right-3
                bg-gray-100
                hover:bg-red-100
                p-2 rounded-full
              "
            >
              <X size={18} />
            </button>

            <img
              src={
                selectedProvider.profileImage?.url ||
                "https://via.placeholder.com/150"
              }
              alt="provider"
              className="
                w-28 h-28
                rounded-full
                mx-auto
                object-cover
                border-4 border-blue-200
              "
            />

            <h2 className="text-2xl font-bold text-center mt-4">
              {selectedProvider.name}
            </h2>

            <p className="text-center text-yellow-500 mt-1">
              ⭐ {selectedProvider.rating || "No rating"}
            </p>

            <div className="mt-6 space-y-3 text-gray-700 text-sm">

              {selectedProvider.service && (
                <p>🛠 {selectedProvider.service}</p>
              )}

              {selectedProvider.experience && (
                <p>
                  📅 {selectedProvider.experience} years experience
                </p>
              )}

              {selectedProvider.priceRange && (
                <p>
                  💰 ₹{selectedProvider.priceRange}/hr
                </p>
              )}

              {selectedProvider.email && (
                <p>
                  📧 {selectedProvider.email}
                </p>
              )}

              {selectedProvider.mobile && (
                <p>
                  📞 {selectedProvider.mobile}
                </p>
              )}

              {selectedProvider.location?.address && (
                <p>
                  📍 {selectedProvider.location.address}
                </p>
              )}

              {selectedProvider.location?.city && (
                <p>
                  🌆 {selectedProvider.location.city}
                </p>
              )}

              <p>
                {selectedProvider.isAvailable
                  ? "🟢 Available"
                  : "🔴 Not Available"}
              </p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
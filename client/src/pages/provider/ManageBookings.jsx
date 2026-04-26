import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/provider");
      setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings = filter
    ? bookings.filter(b => b.status === filter)
    : bookings;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Manage Bookings
        </h2>

        {/* Filter */}
        <select
          className="mb-4 p-2 border rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
        </select>

        {/* Booking List */}
        {filteredBookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-4 mb-4 rounded-xl shadow"
          >
            <h3 className="font-semibold text-lg">{b.service}</h3>

            <p className="text-gray-600">
              📍 {b.location?.address}, {b.location?.city}, {b.location?.state}
            </p>

            <p className="text-sm text-gray-500">
              {b.date} | {b.time}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span className="text-blue-500 font-semibold">
                {b.status}
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-3 flex gap-2">
              {b.status === "pending" && (
                <button
                  onClick={() => updateStatus(b._id, "accepted")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
              )}

              {b.status === "accepted" && (
                <button
                  onClick={() => updateStatus(b._id, "completed")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => updateStatus(b._id, "cancelled")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
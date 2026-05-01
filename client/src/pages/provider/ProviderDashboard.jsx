import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    completed: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/bookings/provider");
      const bookings = res.data.data;

      setStats({
        total: bookings.length,
        pending: bookings.filter(b => b.status === "pending").length,
        accepted: bookings.filter(b => b.status === "accepted").length,
        completed: bookings.filter(b => b.status === "completed").length
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Provider Dashboard 👋
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total</h2>
            <p className="text-2xl">{stats.total}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Pending</h2>
            <p className="text-2xl">{stats.pending}</p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Accepted</h2>
            <p className="text-2xl">{stats.accepted}</p>
          </div>

          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Completed</h2>
            <p className="text-2xl">{stats.completed}</p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/provider/bookings")}
            className="bg-blue-500 text-white px-5 py-2 rounded"
          >
            Manage Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
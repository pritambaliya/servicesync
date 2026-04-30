import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-[#081c3a]">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/admin/providers")}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-blue-600">
            Pending Providers
          </h2>
          <p className="text-gray-500 mt-2">
            Approve or reject service providers
          </p>
        </div>

      </div>

    </div>
  );
}
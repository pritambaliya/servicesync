import { useNavigate } from "react-router-dom";

export default function RegisterRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-6 text-[#081c3a]">
          Choose Your Role
        </h2>

        <div className="space-y-4">

          <button
            onClick={() => navigate("/register/customer")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Register as Customer
          </button>

          <button
            onClick={() => navigate("/register/provider")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Register as Service Provider
          </button>

        </div>

      </div>
    </div>
  );
}
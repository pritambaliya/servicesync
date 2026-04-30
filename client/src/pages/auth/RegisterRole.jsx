import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Loader from "../../components/Loader";

export default function RegisterRole() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#081c3a] to-[#0b3c78] px-4">

    {loading && <Loader/>}

      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-6 text-[#081c3a]">
          Choose Your Role
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          Select how you want to register
        </p>

        <div className="space-y-4">

          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => navigate("/register/customer"),2000);
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register as Customer
          </button>

          <button
            onClick={() => {
              
              setLoading(true);
              setTimeout(() => navigate("/register/provider"), 2000);
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Register as Service Provider
          </button>

        </div>

      </div>
    </div>
  );
}
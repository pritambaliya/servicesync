import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Customerbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#081c3a] text-white flex justify-between items-center px-6 py-4 shadow-md">
      
      {/* LOGO */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Service<span className="text-blue-400">Sync</span>
      </h1>

      {/* MENU */}
      <div className="flex items-center gap-6 text-sm md:text-base">

        <button
          onClick={() => navigate("/customer")}
          className="hover:text-blue-300"
        >
          Services
        </button>

        <button
          onClick={() => navigate("/customer/bookings")}
          className="hover:text-blue-300"
        >
          View
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="hover:text-blue-300 flex items-center gap-1"
        >
          <FiUser size={18} /> Profile
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
        >
          <FiLogOut size={16} /> Logout
        </button>

      </div>
    </div>
  );
}
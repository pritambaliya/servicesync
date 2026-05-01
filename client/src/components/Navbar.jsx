import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-[#081c3a] text-white px-6 py-4 flex justify-between items-center shadow-md relative">

      {/* 🔥 Logo */}
      <div
        className="text-2xl font-bold cursor-pointer tracking-wide"
        onClick={() => navigate("/")}
      >
        <span className="text-white">Service</span>
        <span className="text-blue-400">Sync</span>
      </div>

      {/* 💻 Desktop Menu */}
      <div className=" md:flex gap-8 items-center text-lg">

        <button
          onClick={() => navigate("/logout")}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded transition"
        >
          Logout
        </button>
      </div>

      
    </nav>
  );
}
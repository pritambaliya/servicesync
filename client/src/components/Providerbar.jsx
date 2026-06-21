import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import API from "../api/axios.js";

export default function Providerbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#081c3a] text-white shadow-md relative">

      <div className="flex justify-between items-center px-6 py-4">

        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Service<span className="text-blue-400">Sync</span>
        </h1>

        <div className="hidden md:flex items-center gap-6 text-sm md:text-base">


          <button onClick={() => navigate("/provider/bookings")} className="hover:text-blue-300">
            View
          </button>

          <button
            onClick={() => navigate("/provider/profile")}
            className="hover:text-blue-300 flex items-center gap-1"
          >
            <FiUser size={18} /> Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/logout");
            }}
            className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
          >
            <FiLogOut /> Logout
          </button>

        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

      </div>

      {open && (
        <div className="md:hidden bg-[#081c3a] flex flex-col items-center gap-5 py-6 shadow-lg">

          <button
            onClick={() => {
              navigate("/provider/bookings");
              setOpen(false);
            }}
            className="text-lg"
          >
            View
          </button>

          <button
            onClick={() => {
              navigate("/provider/profile");
              setOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <FiUser /> Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/logout");
            }}
            className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
          >
            <FiLogOut /> Logout
          </button>

        </div>
      )}
    </div>
  );
}
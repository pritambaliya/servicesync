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
      <div className="hidden md:flex gap-8 items-center text-lg">
        <button onClick={() => navigate("/")} className="hover:text-blue-300 transition">
          Home
        </button>

        <button onClick={() => navigate("/about")} className="hover:text-blue-300 transition">
          About
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded transition"
        >
          Login or SignUp
        </button>
      </div>

      {/* 📱 Mobile Menu Button */}
      <div className="md:hidden ">
        <button onClick={() => setOpen(!open)}>
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#081c3a] flex flex-col items-center gap-5 py-6 md:hidden z-50 shadow-lg">
          
          <button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="text-lg"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/about");
              setOpen(false);
            }}
            className="text-lg"
          >
            About
          </button>

          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded"
          >
            Login or SignUp
          </button>
        </div>
      )}
    </nav>
  );
}
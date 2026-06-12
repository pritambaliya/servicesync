import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-[#081c3a] text-white px-6 py-4 flex justify-between items-center shadow-md">

      <div
        className="text-2xl font-bold cursor-pointer tracking-wide"
        onClick={() => navigate("/admin")}
      >
        <span className="text-white">Service</span>
        <span className="text-blue-400">Sync</span>
      </div>

      <div className="flex gap-6 items-center text-lg">

        <button
          onClick={() => navigate("/admin")}
          className="hover:text-blue-300 transition"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
        >
          <FiLogOut size={16} /> Logout
        </button>

      </div>
    </nav>
  );
}
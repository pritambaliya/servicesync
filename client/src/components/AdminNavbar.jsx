import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();   // 🔥 clear login data
    navigate("/login");     // redirect to login
  };

  return (
    <nav className="bg-[#081c3a] text-white px-6 py-4 flex justify-between items-center shadow-md">

      {/* 🔥 Logo */}
      <div
        className="text-2xl font-bold cursor-pointer tracking-wide"
        onClick={() => navigate("/admin")}
      >
        <span className="text-white">Service</span>
        <span className="text-blue-400">Sync</span>
      </div>

      {/* 💻 Menu */}
      <div className="flex gap-6 items-center text-lg">

        <button
          onClick={() => navigate("/admin")}
          className="hover:text-blue-300 transition"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#081c3a] text-white min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">

        <NavLink to="/admin" className="block hover:text-blue-300">
          Dashboard
        </NavLink>

        <NavLink to="/admin/providers" className="block hover:text-blue-300">
          Providers
        </NavLink>

      </nav>
    </div>
  );
}
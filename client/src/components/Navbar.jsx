import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between">
      <h1 className="font-bold text-xl">ServiceSync</h1>

      <div className="flex gap-4">
        {user?.role === "customer" && <span>My Bookings</span>}
        {user?.role === "provider" && <span>Manage Bookings</span>}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate delay (UX smooth)
    setTimeout(() => {
      // 🔥 clear storage
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");

      setLoading(false);

      // redirect
      navigate("/login");
    }, 1500); 
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#081c3a] flex items-center justify-center">
      
      {/* ✅ SHOW LOADER */}
      {loading && <Loader />}

      {/* fallback text */}
      {!loading && (
        <h1 className="text-white text-lg font-semibold">
          Logging out...
        </h1>
      )}

    </div>
  );
}
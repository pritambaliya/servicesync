import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import API from "./api/axios.js";

export default function App() {
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const { data } = await API.get("/api/test");

        console.log("✅ Backend Response:", data);

      } catch (err) {
        console.error("❌ Error connecting backend:", err.message);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AppRoutes />
    </div>
  );
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Loader from "../../components/Loader";


export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await API.get("/auth/logout", {
          withCredentials: true
        });

        localStorage.clear();

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (err) {
        console.log(err);

        navigate("/login");
      }
    };

    logoutUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">
        <Loader />
    </div>
  );
}
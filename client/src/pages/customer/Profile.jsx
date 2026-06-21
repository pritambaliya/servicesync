import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import API from "../../api/axios";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setLoading(false);
    }
  }, []);

  const handleDeleteAccount = async () => {

    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account and all bookings."
    );

    if (!confirmDelete) return;

    try {

      await API.delete("/customer/delete-account", {
        withCredentials: true
      });


      localStorage.removeItem("user");

      navigate("/login");


    } catch (error) {

      console.log(error);
      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">

      <div className="flex justify-center items-center px-4 py-10">

        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 text-white">

          <div className="flex justify-center mb-6">
            {user?.profileImage?.url ? (
              <img
                src={user?.profileImage?.url}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-3xl text-gray-700">
                👤
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            {user.name || "No Name"}
          </h2>

          <p className="text-center text-gray-300 mb-6">
            {user.role?.toUpperCase()}
          </p>

          <div className="space-y-4 text-sm md:text-base">

            {user.mobile && (
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-gray-300">📞 Mobile</span>
                <span>{user.mobile}</span>
              </div>
            )}

            {user.email && (
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-gray-300">📧 Email</span>
                <span>{user.email}</span>
              </div>
            )}

            {user.location?.address && (
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-gray-300">🏠 Address</span>
                <span>{user.location.address}</span>
              </div>
            )}

            {user.location?.city && (
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-gray-300">📍 City</span>
                <span>{user.location.city}</span>
              </div>
            )}

            {user.location?.state && (
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="text-gray-300">🌍 State</span>
                <span>{user.location.state}</span>
              </div>
            )}

          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={() => navigate("/customer")}
              className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
            >
              Back
            </button>

            <button
              onClick={() => {
                navigate("/customer/profile/edit");
              }}
              className="flex-1 bg-green-500 py-2 rounded-lg hover:bg-green-600"
            >
              Edit Profile
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex-1  bg-red-600  py-2  rounded-lg  hover:bg-red-700"
            >
              Delete Account
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
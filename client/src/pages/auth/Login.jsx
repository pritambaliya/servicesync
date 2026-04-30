import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, X } from "lucide-react";
import API from "../../api/axios";
import Loader from "../../components/Loader";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });

  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    setMobile(value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setFlash({ type: "", message: "" });

  if (!role || mobile.length !== 10 || !password) {
    setFlash({
      type: "error",
      message: "Please fill all fields correctly"
    });
    return;
  }

  try {
    setLoading(true); 

    const { data } = await API.post("/auth/login", {
      mobile,
      password,
      role
    });

    if (!data.success) {
      setLoading(false); 
      setFlash({
        type: "error",
        message: data.message || "Login failed"
      });
      return;
    }

    setFlash({
      type: "success",
      message: data.message || "Login successful"
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);

    setTimeout(() => {
      const userRole = data.user?.role;

      setLoading(false); 

      if (userRole === "customer") navigate("/customer");
      else if (userRole === "provider") navigate("/provider");
      else if (userRole === "admin") navigate("/admin");
      else navigate("/");
    }, 2000);

  } catch (err) {
    setLoading(false);

    setFlash({
      type: "error",
      message:
        err.response?.data?.message || "Server error. Try again later."
    });
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] flex flex-col">
      
      {flash.message && (
        <div
          className={`top-[65px] left-0 w-full flex items-center justify-between px-4 py-3 z-[9999] shadow-md
          ${flash.type === "success"
            ? ""
            : "bg-red-500 text-white"}`}
        >
          <span className="text-sm md:text-base font-medium">
            {flash.message}
          </span>

          <X
            onClick={() => setFlash({ type: "", message: "" })}
            className="cursor-pointer hover:opacity-70"
          />
        </div>
      )}

      {loading && <Loader />}

      <div className="flex flex-1 items-center justify-center px-6">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-10">

          <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Wrench className="text-blue-500 w-5 h-5" />
            <span className="text-[#081c3a]">Service</span>
            <span className="text-blue-500">Sync</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Login as</option>
              <option value="customer">Customer</option>
              <option value="provider">Service Provider</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-3 text-gray-700">+91</span>
              <input
                type="text"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter mobile number"
                inputMode="numeric"
                className="w-full p-3 outline-none"
              />
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />

            <button className="w-full bg-[#081c3a] text-white py-3 rounded-lg hover:bg-[#0b3c78] transition">
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            New user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#081c3a] font-semibold cursor-pointer"
            >
              Create account
            </span>
          </p>

          <p className="text-center text-xs text-gray-500 mt-2">
            Location access may be required after login
          </p>

        </div>
      </div>
    </div>
  );
}
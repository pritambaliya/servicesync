import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { X } from "lucide-react";
import Loader from "../../components/Loader";
import Flash from "../../components/Flash";

export default function RegisterCustomer() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: ""
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
    "Jammu and Kashmir", "Ladakh"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setFlash({ type: "error", message: "Geolocation not supported" });
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setForm((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng
        }));

        setLoading(false);
        setFlash({
          type: "success",
          message: "Location captured successfully"
        });
      },
      () => {
        setLoading(false);
        setFlash({
          type: "error",
          message: "Location access denied"
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.password) {
      setFlash({
        type: "error",
        message: "Please fill required fields"
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/customer/register", {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
        location: {
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          coordinates: {
            type: "Point",
            coordinates: [form.longitude, form.latitude]
          }
        }
      });

      setLoading(false);

      setFlash({
        type: data.success ? "success" : "error",
        message: data.message
      });

      if (data.success) {
        setTimeout(() => navigate("/login"), 2000);
      }

    } catch (err) {
      setLoading(false);

      setFlash({
        type: "error",
        message: err.response?.data?.message || "Registration failed"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#081c3a] to-[#0b3c78] px-4 py-10">

      {flash.message && (
        <Flash flash={flash} setFlash={setFlash} success={false}/>
      )}

      {loading && <Loader/>}

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full items-center max-w-2xl p-6 md:p-10 rounded-xl shadow-lg space-y-4"
      >

        <h2 className="text-2xl font-bold text-center text-blue-700">
          Customer Registration
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />

          <div className="flex items-center border rounded w-full overflow-hidden">

            <span className="px-3 text-gray-700 border-r">+91</span>

            <input
              name="mobile"
              placeholder="Enter mobile number"
              value={form.mobile}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 10) value = value.slice(0, 10);
                setForm({ ...form, mobile: value });
              }}
              className="p-3 w-full outline-none"
              inputMode="numeric"
            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="email"
            placeholder="Email (optional)"
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />

        </div>

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="p-3 border rounded w-full"
        />

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="p-3 border rounded w-full"
          >
            <option value="">Select State</option>
            {indianStates.map((state, i) => (
              <option key={i} value={state}>{state}</option>
            ))}
          </select>

          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            className="p-3 border rounded w-full"
          />

        </div>

        <button
          type="button"
          onClick={getLocation}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          {loading ? "Getting Location..." : "📍 Allow Location Access"}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading ? "Registering..." : "Register Customer"}
        </button>

        <p className="text-center text-sm"> Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer font-semibold" > Login </span>
        </p>

      </form>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { X } from "lucide-react";
import Loader from "../../components/Loader";
import Flash from "../../components/Flash";
import LocationPicker from "../../components/LocationPicker";

export default function RegisterProvider() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });

  const [fileErrors, setFileErrors] = useState({
    idProof: "",
    profileImage: ""
  });

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    service: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: null,
    longitude: null,
    experience: "",
    priceRange: "",
    idProof: null,
    profileImage: null
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
    "Jammu and Kashmir", "Ladakh"
  ];

  const services = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "Painter",
    "Cleaner",
    "AC Technician"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const field = e.target.name;

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf"
    ];

    const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

    const maxSize = 5 * 1024 * 1024; // 5MB

    let errorMsg = "";

    if (!allowedTypes.includes(file.type)) {
      errorMsg = "Only JPG, JPEG, PNG, PDF allowed";
    }

    if (field === "profileImage" && !imageTypes.includes(file.type)) {
      errorMsg = "Profile image must be JPG or PNG";
    }

    if (file.size > maxSize) {
      errorMsg = "File must be less than 5MB";
    }

    if (errorMsg) {
      setFileErrors((prev) => ({
        ...prev,
        [field]: errorMsg
      }));

      setForm((prev) => ({
        ...prev,
        [field]: null
      }));

      e.target.value = "";
      return;
    }

    setFileErrors((prev) => ({
      ...prev,
      [field]: ""
    }));

    setForm((prev) => ({
      ...prev,
      [field]: file
    }));
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setFlash({ type: "error", message: "Geolocation not supported" });
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
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

    if (!form.name || !form.mobile || !form.password || !form.service) {
      setFlash({
        type: "error",
        message: "Please fill all required fields"
      });
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      setFlash({
        type: "error",
        message: "Enter a valid 10-digit mobile number"
      });
      return;
    }

    if (!form.address || !form.city || !form.state) {
      setFlash({
        type: "error",
        message: "Please fill address, city, and state"
      });
      return;
    }

    if (!form.latitude || !form.longitude) {
      setFlash({
        type: "error",
        message: "Please select location"
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("mobile", form.mobile);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("service", form.service);
      formData.append("experience", form.experience);
      formData.append("priceRange", form.priceRange);

      formData.append("address", form.address);
      formData.append("city", form.city);
      formData.append("state", form.state);
      formData.append("pincode", form.pincode);
      formData.append("latitude", String(form.latitude));
      formData.append("longitude", String(form.longitude));

      if (form.idProof) formData.append("idProof", form.idProof);
      if (form.profileImage) formData.append("profileImage", form.profileImage);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const { data } = await API.post("/provider/register", formData);

      setFlash({
        type: "success",
        message: data.message || "Registered successfully"
      });

      setLoading(false);

      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      console.log("ERROR FULL:", err);
      console.log("SERVER ERROR:", err.response?.data);

      setLoading(false);

      setFlash({
        type: "error",
        message: err.response?.data?.message || "Registration failed"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#081c3a] to-[#0b3c78] px-4 py-10">
      {flash.message && (
        <Flash flash={flash} setFlash={setFlash} />
      )}

      {loading && <Loader />}

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Service Provider Registration
        </h2>

        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="p-3 border rounded w-full"
        >
          <option value="">Select Service</option>
          {services.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <div className="flex items-center border rounded w-full overflow-hidden">
            <span className="px-3 text-gray-700 border-r">+91</span>
            <input
              name="mobile"
              value={form.mobile}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, "");
                if (v.length > 10) v = v.slice(0, 10);
                setForm({ ...form, mobile: v });
              }}
              className="p-3 w-full outline-none"
              placeholder="Mobile Number"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="experience"
            type="number"
            placeholder="Experience (years)"
            onChange={handleChange}
            className="p-3 border rounded"
          />

          <input
            name="priceRange"
            placeholder="Price per hour (₹)"
            onChange={handleChange}
            className="p-3 border rounded"
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="p-3 border rounded w-full"
          required
        />

        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="p-3 border rounded"
          >
            <option value="">State</option>
            {indianStates.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>

          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            className="p-3 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload ID Proof <span className="text-red-500">*</span>
          </label>

          <p className="text-xs text-blue-600 mb-2">
            Upload a valid Aadhaar Card, PAN Card, Driving License, or Voter ID.
          </p>

          <p className="text-xs text-gray-500 mb-1">
            Supported formats: JPG, PNG, PDF • Max size: 5 MB
          </p>

          <input
            type="file"
            name="idProof"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />

          {fileErrors.idProof && (
            <p className="text-red-500 text-sm mt-1">
              * {fileErrors.idProof}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Upload Profile Image</label>

          <p className="text-xs text-gray-500 mb-1">
            Supported formats: JPG, PNG, PDF • Max size: 5 MB
          </p>

          <input
            type="file"
            name="profileImage"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />

          {fileErrors.profileImage && (
            <p className="text-red-500 text-sm mt-1">
              * {fileErrors.profileImage}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            Select Service Location
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Choose your service area so customers can find you nearby.
          </p>

          <LocationPicker
            location={{
              coordinates: {
                type: "Point",
                coordinates: [
                  form.longitude,
                  form.latitude,
                ],
              },
            }}
            setLocation={(loc) =>
              setForm((prev) => ({
                ...prev,
                longitude: loc.coordinates?.coordinates[0] || prev.longitude,
                latitude: loc.coordinates?.coordinates[1] || prev.latitude,
              }))
            }
          />
        </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800">
            📢 Important Notice
          </h4>

          <p className="text-sm text-blue-700 mt-1">
            Your account will be activated only after <b>admin approval</b>. You will receive
            an email notification once your registration has been approved. Please use
            a valid email address and check your inbox regularly.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading ? "Registering..." : "Register Provider"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
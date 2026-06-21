import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

import Loader from "../../components/Loader";
import Flash from "../../components/Flash";
import EditLocationPicker from "../../components/EditLocationPicker";

export default function EditProviderProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [flash, setFlash] = useState({
    message: "",
    success: "",
  });

  const [preview, setPreview] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    experience: "",
    priceRange: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isAvailable: true,
    latitude: null,
    longitude: null,
  });

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    const data = {
      name: user.name || "",
      mobile: user.mobile || "",
      email: user.email || "",
      service: user.service || "",
      experience: user.experience || "",
      priceRange: user.priceRange || "",
      address: user.location?.address || "",
      city: user.location?.city || "",
      state: user.location?.state || "",
      pincode: user.location?.pincode || "",
      isAvailable: user.isAvailable ?? true,
      longitude:
        user.location?.coordinates?.coordinates?.[0] || 70.8022,
      latitude:
        user.location?.coordinates?.coordinates?.[1] || 22.3039,
    };

    setFormData(data);

    setOriginalData({
      name: data.name,
      experience: data.experience,
      priceRange: data.priceRange,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      isAvailable: data.isAvailable,
      longitude: data.longitude,
      latitude: data.latitude
    });

    setPreview(user?.profileImage?.url || "");

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!originalData) return;

    const changed =
      JSON.stringify({
        name: formData.name,
        experience: formData.experience,
        priceRange: formData.priceRange,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isAvailable: formData.isAvailable,
        longitude: formData.longitude,
        latitude: formData.latitude,
      }) !== JSON.stringify(originalData) ||
      profileImage;

    setHasChanges(changed);
  }, [formData, profileImage, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "isAvailable"
          ? value === "true"
          : value,
    }));
  };
  console.log(JSON.parse(localStorage.getItem("user")));
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFlash({
        message:
          "Only JPG, JPEG and PNG images are allowed",
        type: "error",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFlash({
        message:
          "Image size must be less than 5MB",
        type: "error",
      });
      return;
    }

    setProfileImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("experience", formData.experience);
      data.append("priceRange", formData.priceRange);
      data.append("isAvailable", formData.isAvailable);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("pincode", formData.pincode);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const res = await API.put(
        "/provider/profile/update",
        data,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.provider
        )
      );

      setFlash({
        message:
          "Profile updated successfully",
        type: "success",
      });

      setTimeout(() => {
        navigate("/provider/profile");
      }, 1500);

    } catch (err) {
      setFlash({
        message:
          err.response?.data?.message ||
          "Failed to update profile",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">

      {flash.message && (
        <Flash
          flash={flash}
          setFlash={setFlash}
          success={flash.success}
        />
      )}

      {saving && <Loader />}

      <div className="flex justify-center px-4 py-8">

        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-white shadow-xl">

          <h2 className="text-3xl font-bold text-center mb-8">
            Edit Provider Profile
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="flex flex-col items-center">

              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-700">
                  👤
                </div>
              )}

              <label className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer">
                Change Photo

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>

              <p className="text-xs text-gray-300 mt-2">
                Upload JPG, JPEG or PNG image only.
                Maximum size 5MB.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="bg-white/10 border border-white/20 rounded-lg p-3"
              />

              <input
                type="text"
                value={formData.service}
                disabled
                className="bg-gray-700 rounded-lg p-3 cursor-not-allowed"
              />

              <input
                type="text"
                value={formData.mobile}
                disabled
                className="bg-gray-700 rounded-lg p-3 cursor-not-allowed"
              />

              <input
                type="email"
                value={formData.email}
                disabled
                className="bg-gray-700 rounded-lg p-3 cursor-not-allowed"
              />

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience (Years)"
                className="bg-white/10 border border-white/20 rounded-lg p-3"
              />

              <input
                type="text"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                placeholder="₹300 - ₹500"
                className="bg-white/10 border border-white/20 rounded-lg p-3"
              />

            </div>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="bg-white/10 border border-white/20 rounded-lg p-3"
              />

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-lg p-3 text-white"
              >
                <option value="" className="text-black">
                  Select State
                </option>

                {indianStates.map((state) => (
                  <option
                    key={state}
                    value={state}
                    className="text-black"
                  >
                    {state}
                  </option>
                ))}
              </select>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="bg-white/10 border border-white/20 rounded-lg p-3"
              />

              <select
                name="isAvailable"
                value={formData.isAvailable}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-lg p-3 text-white"
              >
                <option value="true" className="text-black">
                  Available
                </option>

                <option value="false" className="text-black">
                  Not Available
                </option>
              </select>

            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Change Your Location
              </h3>

              <EditLocationPicker
                location={{
                  coordinates: {
                    type: "Point",
                    coordinates: [
                      formData.longitude,
                      formData.latitude
                    ]
                  }

                }}

                setLocation={(locationData) => {

                  const coords = locationData.coordinates.coordinates;

                  setFormData(prev => ({
                    ...prev,
                    longitude: coords[0],
                    latitude: coords[1]
                  }));
                }}
              />

            </div>

            <div className="flex gap-4 pt-4">

              <button
                type="button"
                onClick={() =>
                  navigate("/provider/profile")
                }
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!hasChanges || saving}
                className={`flex-1 py-3 rounded-lg transition ${!hasChanges
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {saving
                  ? "Updating..."
                  : "Update Profile"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

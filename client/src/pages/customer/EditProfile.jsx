import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios.js";

import Loader from "../../components/Loader.jsx";
import Customerbar from "../../components/Customerbar.jsx";
import Flash from "../../components/Flash.jsx";
import EditLocationPicker from "../../components/EditLocationPicker.jsx";

export default function EditProfile() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [flash, setFlash] = useState({
        type: "",
        message: "",
        success: "",
    });

    const [isChanged, setIsChanged] = useState(false);

    const [removePhoto, setRemovePhoto] = useState(false);

    const [preview, setPreview] = useState("");

    const [profileImage, setProfileImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
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
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/login");
            return;
        }

        setFormData({
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || "",
            address: user.location?.address || "",
            city: user.location?.city || "",
            state: user.location?.state || "",
            pincode: user.location?.pincode || "",
            longitude:
                user.location?.coordinates?.coordinates?.[0] || 70.8022,
            latitude:
                user.location?.coordinates?.coordinates?.[1] || 22.3039,
        });

        setPreview(user.profileImage?.url || "");

        setLoading(false);
    }, [navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setIsChanged(true);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setProfileImage(file);
        setRemovePhoto(false);
        setIsChanged(true);

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        const confirmDelete = window.confirm(
            "Remove profile image permanently?"
        );

        if (!confirmDelete) return;

        setPreview("");
        setProfileImage(null);
        setRemovePhoto(true);
        setIsChanged(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("address", formData.address);
            data.append("city", formData.city);
            data.append("state", formData.state);
            data.append("pincode", formData.pincode);
            data.append("latitude", String(formData.latitude));
            data.append("longitude", String(formData.longitude));

            data.append(
                "removeProfileImage",
                removePhoto
            );

            if (profileImage) {
                data.append(
                    "profileImage",
                    profileImage
                );
            }

            const res = await API.put(
                "/customer/profile/update",
                data,    
                {
                    withCredentials: true,
                }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.customer)
            );

            setFlash({
                type: "success",
                message: "Profile updated successfully"
            });

            setTimeout(() => {
                navigate("/customer/profile");
            }, 1500);

        } catch (err) {
            setFlash({
                message:
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to update profile",
                type: "error",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">


            {flash.message && (
                <Flash
                    flash={flash}
                    setFlash={setFlash}
                    success={flash.success}
                />
            )}

            {loading && <Loader />}

            <div className="flex justify-center px-4 py-8">

                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-white shadow-xl">

                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Edit Profile
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

                            <div className="flex gap-3 mt-4 flex-wrap justify-center">

                                <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer transition">
                                    Add Profile Photo

                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImage}
                                    />
                                </label>


                                {preview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                                    >
                                        Remove
                                    </button>
                                )}

                            </div>

                            <div className="mt-3 text-center">
                                <p className="text-xs text-gray-300">
                                    Supported formats: JPG, JPEG, PNG
                                </p>

                                <p className="text-xs text-gray-400">
                                    Maximum file size: 5 MB
                                </p>
                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="bg-white/10 border border-white/20 rounded-lg p-3 outline-none"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="bg-white/10 border border-white/20 rounded-lg p-3 outline-none"
                            />

                            <input
                                type="text"
                                value={formData.mobile}
                                disabled
                                className="bg-gray-700 rounded-lg p-3 cursor-not-allowed"
                            />

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                className="bg-white/10 border border-white/20 rounded-lg p-3 outline-none"
                            />

                        </div>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 outline-none"
                        />

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="bg-white/10 border border-white/20 rounded-lg p-3 outline-none"
                            />

                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="bg-white/10 border border-white/20 rounded-lg p-3 outline-none text-white"
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

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">
                                Select Your Location
                            </h3>

                            <EditLocationPicker
                                location={{
                                    coordinates: {
                                        type: "Point",
                                        coordinates: [
                                            formData.longitude,
                                            formData.latitude,
                                        ],
                                    },
                                }}
                                setLocation={(locationData) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        longitude:
                                            locationData.coordinates.coordinates[0],
                                        latitude:
                                            locationData.coordinates.coordinates[1],
                                    }));

                                    setIsChanged(true);
                                }}
                            />

                        </div>

                        <div className="flex gap-4 pt-4">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/customer/profile")
                                }
                                className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving || !isChanged}
                                className={`flex-1 py-3 rounded-lg transition ${saving || !isChanged
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

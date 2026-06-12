import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function ProviderProfile() {

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchProfile = async () => {

    try {
      setLoading(true);

      const { data } = await API.get(
        "/provider/profile",
        {
          withCredentials: true,
        }
      );
      setProvider(data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const avgRating =
    provider?.reviews?.length > 0
      ? (
        provider.reviews.reduce(
          (sum, r) => sum + r.rating,
          0
        ) / provider.reviews.length
      ).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] p-6">

      {loading && <Loader />}

      {!provider ? (

        <div className="text-center text-white mt-20">
          No profile found
        </div>

      ) : (

        <div className="max-w-5xl mx-auto">

          <div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
          >

            <div
              className="h-40 bg-gradient-to-r from-blue-500 to-cyan-400"
            />

            <div className="px-8 pb-8">

              <div className="-mt-16 flex justify-between items-end flex-wrap gap-4">

                <div className="flex items-end gap-5">

                  {provider.profileImage?.url ? (

                    <img
                      src={provider.profileImage.url}
                      alt="profile"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-5xl text-white"
                    >
                      👤
                    </div>

                  )}

                  {/* NAME */}
                  <div className="mb-3">

                    <h1 className="text-3xl font-bold text-white">
                      {provider.name}
                    </h1>

                    <p className="text-gray-300 mt-1 capitalize">
                      {provider.service}
                    </p>

                    {/* RATING */}
                    <div className="flex items-center gap-2 mt-2">

                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-xl ${star <= Math.round(avgRating)
                                ? "text-yellow-400"
                                : "text-gray-400"
                              }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <span className="text-white text-sm">
                        {avgRating || "No rating"}
                      </span>

                    </div>

                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/provider/edit-profile")
                  }
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold transition"
                >
                  Edit Profile
                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">

                <div
                  className="bg-white/10 border border-white/10 rounded-2xl p-6"
                >

                  <h2 className="text-xl font-bold text-white mb-5">
                    Personal Information
                  </h2>

                  <div className="space-y-4 text-gray-200">

                    <p>
                      👤 Name :
                      <span className="text-white ml-2">
                        {provider.name}
                      </span>
                    </p>

                    <p>
                      📧 Email :
                      <span className="text-white ml-2">
                        {provider.email}
                      </span>
                    </p>

                    <p>
                      📞 Mobile :
                      <span className="text-white ml-2">
                        {provider.mobile}
                      </span>
                    </p>

                    <p>
                      🛠 Service :
                      <span className="text-white ml-2 capitalize">
                        {provider.service}
                      </span>
                    </p>

                    <p>
                      📅 Experience :
                      <span className="text-white ml-2">
                        {provider.experience || 0} Years
                      </span>
                    </p>

                    <p>
                      💰 Price :
                      <span className="text-white ml-2">
                        {provider.priceRange > 0
                          ? `₹${provider.priceRange}/hr`
                          : "None"}
                      </span>
                    </p>

                  </div>

                </div>

                <div
                  className="bg-white/10 border border-white/10 rounded-2xl p-6"
                >

                  <h2 className="text-xl font-bold text-white mb-5">
                    Location Details
                  </h2>

                  <div className="space-y-4 text-gray-200">

                    <p>
                      🏠 Address :
                      <span className="text-white ml-2">
                        {provider.location?.address}
                      </span>
                    </p>

                    <p>
                      🏙 City :
                      <span className="text-white ml-2">
                        {provider.location?.city}
                      </span>
                    </p>

                    <p>
                      🌍 State :
                      <span className="text-white ml-2">
                        {provider.location?.state}
                      </span>
                    </p>

                    <p>
                      📮 Pincode :
                      <span className="text-white ml-2">
                        {provider.location?.pincode}
                      </span>
                    </p>

                    <p>
                      ✅ Availability :
                      <span
                        className={`ml-2 font-semibold ${provider.isAvailable
                            ? "text-green-400"
                            : "text-red-400"
                          }`}
                      >
                        {provider.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </p>

                    <p>
                      🧾 Status :
                      <span className="text-white ml-2 capitalize">
                        {provider.status}
                      </span>
                    </p>

                  </div>

                </div>

              </div>

              <div
                className="mt-8 bg-white/10 border border-white/10 rounded-2xl p-6"
              >

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl font-bold text-white">
                    Customer Reviews
                  </h2>

                  <span className="text-gray-300">
                    {provider.reviews?.length || 0} Reviews
                  </span>

                </div>

                {provider.reviews?.length > 0 ? (

                  <div className="space-y-4">

                    {provider.reviews.map((review) => (

                      <div
                        key={review._id}
                        className="bg-white/10 border border-white/10 rounded-2xl p-4"
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            {review.customer?.profileImage?.url ? (

                              <img
                                src={
                                  review.customer.profileImage.url
                                }
                                alt="customer"
                                className="w-12 h-12 rounded-full object-cover"
                              />

                            ) : (

                              <div
                                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                              >
                                👤
                              </div>

                            )}

                            <div>

                              <h4 className="text-white font-semibold">
                                {review.customer?.name ||
                                  "Customer"}
                              </h4>

                              <div className="flex">

                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`text-sm ${star <= review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-500"
                                      }`}
                                  >
                                    ★
                                  </span>
                                ))}

                              </div>

                            </div>

                          </div>

                          <span className="text-yellow-400 font-bold">
                            {review.rating}.0
                          </span>

                        </div>

                        <p className="text-gray-300 mt-4">
                          {review.comment}
                        </p>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="text-center text-gray-300 py-10">
                    No reviews yet
                  </div>

                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
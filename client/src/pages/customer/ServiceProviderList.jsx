import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import { useParams, useNavigate } from "react-router-dom";
import ProviderLocationMap from "../provider/ProviderLocationMap.jsx";

export default function ServiceProviderList() {
  const { type } = useParams();

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [selectedProvider, setSelectedProvider] =
    useState(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/provider/by-service?service=${type}`
      );

      const list = data.data || [];

      setProviders(list);
      setFilteredProviders(list);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [type]);

  useEffect(() => {

    if (!searchCity) {
      setFilteredProviders(providers);
    } else {

      const filtered = providers.filter((p) =>
        p.location?.city
          ?.toLowerCase()
          .includes(searchCity.toLowerCase())
      );

      setFilteredProviders(filtered);
    }

  }, [searchCity, providers]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] p-6">

      {loading && <Loader />}

      <h1 className="text-3xl font-bold text-white mb-6 capitalize text-center">
        {type} Services
      </h1>

      <div className="max-w-xl mx-auto mb-8">

        <input
          type="text"
          placeholder="🔍 Search by city..."
          value={searchCity}
          onChange={(e) =>
            setSearchCity(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-white/20
            text-white
            placeholder-gray-300
            border
            border-white/30
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

      </div>

      {filteredProviders.length === 0 ? (

        <p className="text-gray-300 text-center">
          No providers found
        </p>

      ) : (

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {filteredProviders.map((p) => {

            const avgRating =
              p.reviews?.length > 0
                ? (
                  p.reviews.reduce(
                    (sum, review) =>
                      sum + review.rating,
                    0
                  ) / p.reviews.length
                ).toFixed(1)
                : null;

            return (
              <div
                key={p._id}
                onClick={() =>
                  setSelectedProvider(p)
                }
                className="
                  cursor-pointer
                  bg-white/10
                  backdrop-blur-md
                  border
                  border-white/20
                  p-5
                  rounded-2xl
                  shadow-lg
                  hover:scale-105
                  transition
                "
              >

                <div className="flex items-center gap-4">

                  {p.profileImage?.url && (
                    <img
                      src={p.profileImage.url}
                      alt="profile"
                      className="
                        w-20
                        h-20
                        rounded-full
                        object-cover
                        border
                      "
                    />
                  )}

                  <div>

                    <h2 className="text-lg font-semibold text-white">
                      {p.name}
                    </h2>

                    <p className="text-yellow-400 text-sm mt-1">
                      ⭐ {avgRating || "No rating"}
                    </p>

                  </div>
                </div>

                <div className="text-sm text-gray-300 mt-4">

                  {p.location?.city && (
                    <p>📍 {p.location.city}</p>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

      {selectedProvider && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">

          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-white/20 bg-white shadow-2xl">

            <div className="bg-gradient-to-r from-[#081c3a] to-[#0b3c78] p-6 text-white relative">

              <button
                onClick={() =>
                  setSelectedProvider(null)
                }
                className="
                  absolute
                  top-4
                  right-4
                  bg-white/10
                  hover:bg-white/20
                  p-2
                  rounded-full
                  transition
                "
              >
                ✖
              </button>

              <div className="flex items-center gap-5">

                {selectedProvider.profileImage
                  ?.url && (
                    <img
                      src={
                        selectedProvider.profileImage
                          .url
                      }
                      alt="profile"
                      className="
                      w-28
                      h-28
                      rounded-full
                      object-cover
                      border-4
                      border-white
                      shadow-lg
                    "
                    />
                  )}

                <div>

                  <h2 className="text-3xl font-bold">
                    {selectedProvider.name}
                  </h2>

                  <p className="text-blue-100 mt-1 capitalize">
                    🛠{" "}
                    {selectedProvider.service}
                  </p>

                  <div className="flex items-center gap-2 mt-3">

                    <div className="text-yellow-400 text-xl">
                      ⭐
                    </div>

                    <p className="font-semibold text-lg">

                      {selectedProvider.reviews
                        ?.length > 0
                        ? (
                          selectedProvider.reviews.reduce(
                            (
                              sum,
                              review
                            ) =>
                              sum +
                              review.rating,
                            0
                          ) /
                          selectedProvider
                            .reviews.length
                        ).toFixed(1)
                        : "No rating"}

                    </p>

                    <span className="text-sm text-gray-200">
                      (
                      {selectedProvider.reviews
                        ?.length || 0}{" "}
                      reviews)
                    </span>

                  </div>

                  <div className="mt-3">

                    {selectedProvider.isAvailable ? (

                      <span className="bg-green-500/20 text-green-200 border border-green-300/20 px-3 py-1 rounded-full text-sm">
                        🟢 Available
                      </span>

                    ) : (

                      <span className="bg-red-500/20 text-red-200 border border-red-300/20 px-3 py-1 rounded-full text-sm">
                        🔴 Not Available
                      </span>

                    )}

                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                <div className="bg-gray-100 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    Experience
                  </p>

                  <h3 className="font-semibold text-lg">
                    📅{" "}
                    {selectedProvider.experience ||
                      0}{" "}
                    Years
                  </h3>

                </div>

                <div className="bg-gray-100 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    Price
                  </p>

                  <h3 className="font-semibold text-lg">
                    💰{" "}
                    {selectedProvider.priceRange > 0
                      ? `₹${selectedProvider.priceRange}/hr`
                      : "None"}
                  </h3>

                </div>

                <div className="bg-gray-100 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    Location
                  </p>

                  <h3 className="font-semibold text-sm leading-6">
                    📍 {selectedProvider.location?.address || "No Address"}
                    <br />

                    🏙 {selectedProvider.location?.city || "No City"}
                    <br />

                    🌎 {selectedProvider.location?.state || "No State"}
                  </h3>

                </div>

                <div className="bg-gray-100 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    Email
                  </p>

                  <h3 className="font-semibold text-sm break-all">
                    📧 {selectedProvider.email}
                  </h3>

                </div>

              </div>

              <div className="bg-white rounded-xl p-5 shadow">
                <ProviderLocationMap
                  provider={selectedProvider}
                />
              </div>

              <div>

                <div className="flex items-center justify-between mb-4 mt-5">

                  <h3 className="text-2xl font-bold text-gray-800">
                    Customer Reviews
                  </h3>

                  <span className="text-sm text-gray-500">
                    {selectedProvider.reviews
                      ?.length || 0}{" "}
                    Total
                  </span>

                </div>

                {selectedProvider.reviews
                  ?.length > 0 ? (

                  <div className="space-y-4">

                    {selectedProvider.reviews.map((review) => (

                      <div
                        key={review._id}
                        className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition bg-gray-50"
                      >

                        <div className="flex items-start justify-between mb-3">

                          <div className="flex items-center gap-3">

                            {review.customer?.profileImage?.url ? (

                              <img
                                src={review.customer.profileImage.url}
                                alt="customer"
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                              />

                            ) : (

                              <div
                                className=" w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg"
                              >
                                👤
                              </div>

                            )}

                            <div>

                              <h4 className="font-semibold text-gray-800">
                                {review.customer?.name || "Customer"}
                              </h4>
                            </div>

                          </div>

                          <div className="flex items-center gap-1">

                            {[1, 2, 3, 4, 5].map((star) => (

                              <span
                                key={star}
                                className={`text-xl ${star <= review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                                  }`}
                              >
                                ★
                              </span>

                            ))}

                          </div>

                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          {review.comment}
                        </p>

                      </div>
                    ))}

                  </div>

                ) : (

                  <div className="bg-gray-100 rounded-2xl p-8 text-center text-gray-500">
                    No reviews available
                  </div>

                )}

              </div>

              {selectedProvider.isAvailable ? (

                <button
                  className="w-full mt-8 bg-gradient-to-r from-[#081c3a] to-[#0b3c78] text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition
                  "
                  onClick={() => {

                    navigate(
                      `/customer/service/booking/${selectedProvider._id}`,
                      {
                        state: selectedProvider,
                      }
                    );

                  }}
                >
                  Book Now
                </button>

              ) : (

                <button
                  className="w-full mt-8 bg-gray-300 text-white py-3 rounded-2xl cursor-not-allowed
                  "
                >
                  Currently Unavailable
                </button>

              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
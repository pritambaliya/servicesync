import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceProviderList() {
  const { type } = useParams();

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 NEW → selected provider (modal)
  const [selectedProvider, setSelectedProvider] = useState(null);

  // 🔥 FETCH DATA
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

  // 🔍 FILTER BY CITY
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

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-white mb-6 capitalize text-center">
        {type} Services
      </h1>

      {/* 🔍 SEARCH */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search by city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 🚫 NO DATA */}
      {filteredProviders.length === 0 ? (
        <p className="text-gray-300 text-center">
          No providers found
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {filteredProviders.map((p) => (
            <div
              key={p._id}
              onClick={() => setSelectedProvider(p)}   // 🔥 CLICK
              className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-lg hover:scale-105 transition"
            >

              {/* TOP ROW */}
              <div className="flex items-center gap-4">

                {p.profileImage?.url && (
                  <img
                    src={p.profileImage.url}
                    alt="profile"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                )}

                <div>
                  {p.name && (
                    <h2 className="text-lg font-semibold text-white">
                      {p.name}
                    </h2>
                  )}

                  <p className="text-yellow-400 text-sm mt-1">
                    ⭐ {p.avgRating || "No rating"}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="text-sm text-gray-300 mt-4 space-y-1">

                {p.location?.city && <p>📍 {p.location.city}</p>}
              </div>
            </div>
          ))}

        </div>
      )}

      {/* 🔥 MODAL */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">

            {/* ❌ CLOSE */}
            <button
              onClick={() => setSelectedProvider(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            {/* IMAGE */}
            {selectedProvider.profileImage?.url && (
              <img
                src={selectedProvider.profileImage.url}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />
            )}

            {/* NAME */}
            <h2 className="text-xl font-bold text-center">
              {selectedProvider.name}
            </h2>

            {/* RATING */}
            <p className="text-center text-yellow-500 mt-1">
              ⭐ {selectedProvider.avgRating || "No rating"}
            </p>
            <p className="text-center mt-1 text-sm">
        {selectedProvider.isAvailable ? (
          <span className="text-green-600 font-medium">🟢 Available</span>
        ) : (
          <span className="text-red-500 font-medium">🔴 Not Available</span>
        )}
      </p>
            {/* DETAILS */}
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              {selectedProvider.service && <p>🛠 {selectedProvider.service}</p>}
              {selectedProvider.experience && (
                <p>📅 {selectedProvider.experience} yrs experience</p>
              )}
              {selectedProvider.priceRange && (
                <p>💰 ₹{selectedProvider.priceRange}/hr</p>
              )}
              {selectedProvider.email && (
                 <p>📧 {selectedProvider.email}</p>
              )}
              {selectedProvider.location?.address && (
                <p>🏠 {selectedProvider.location.address}</p>
              )}
              {selectedProvider.location?.city && (
                <p>📍 {selectedProvider.location.city}</p>
              )}
            </div>

              {selectedProvider.isAvailable ? (
                <button
              className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                navigate(`/customer/service/booking/${selectedProvider._id}`, {
                  state: selectedProvider
                });console.log("STATE:", state);
              }}
            > Book Now </button>
                ) : (
                <button
              className="w-full mt-5 bg-blue-300 text-white py-2 rounded-lg pointer-events-none"
              onClick={() => {
                console.log("Book:", selectedProvider._id);
              }}
            > Book Now </button>
                )}


          </div>
        </div>
      )}

    </div>
  );
}
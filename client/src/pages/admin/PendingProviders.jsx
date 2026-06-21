import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import Loader from "../../components/Loader";

export default function PendingProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/admin/providers/pending");

      setProviders(data.data || []);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleApprove = async (id) => {
    try {
      setLoading(true);

      await API.put(`/admin/provider/${id}/approve`);

      setProviders((prev) => prev.filter((p) => p._id !== id));
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);

      await API.put(`/admin/provider/${id}/reject`);

      setProviders((prev) => prev.filter((p) => p._id !== id));
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const openMap = (provider) => {

    const coordinates =
      provider.location?.coordinates?.coordinates;

    if (!coordinates || coordinates.length < 2) {
      alert("Provider location not available");
      return;
    }

    const lng = coordinates[0];
    const lat = coordinates[1];

    window.open(
      `https://www.google.com/maps?q=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] p-6">

      {loading && <Loader />}

      <h1 className="text-2xl font-bold mb-6 text-white">
        Pending Providers ({providers.length})
      </h1>

      {providers.length === 0 ? (
        <p className="text-gray-300">No pending providers</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {providers.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition space-y-3"
            >

              {p.profileImage?.url && (
                <img
                  src={p.profileImage.url}
                  alt="profile"
                  className="w-20 h-20 object-cover rounded-full border"
                />
              )}

              <div>
                {p.name && <h2 className="font-bold text-lg">{p.name}</h2>}
                {p.mobile && <p className="text-sm text-gray-500">📞 {p.mobile}</p>}
                {p.email && <p className="text-sm text-gray-500">📧 {p.email}</p>}
              </div>

              {(p.service || p.experience || p.priceRange) && (
                <div className="text-sm text-gray-600 space-y-1">
                  {p.service && <p><b>Service:</b> {p.service}</p>}
                  {p.experience && <p><b>Experience:</b> {p.experience} yrs</p>}
                  {p.priceRange && <p><b>Price:</b> ₹{p.priceRange}/hr</p>}
                </div>
              )}

              {(p.location?.address ||
                p.location?.city ||
                p.location?.state ||
                p.location?.pincode) && (
                  <div className="text-sm text-gray-600">
                    {p.location?.address && (
                      <p><b>Address:</b> {p.location.address}</p>
                    )}

                    {(p.location?.city || p.location?.state || p.location?.pincode) && (
                      <p>
                        {p.location?.city && `${p.location.city}, `}
                        {p.location?.state && `${p.location.state} `}
                        {p.location?.pincode && `- ${p.location.pincode}`}
                      </p>
                    )}
                  </div>
                )}

              {p.idProof?.url && (
                <div>
                  <p className="text-sm font-medium mb-1">ID Proof:</p>
                  <a
                    href={p.idProof.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Document
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-1">Provider Location:</p>
                <a
                  onClick={() => openMap(p)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline text-sm cursor-pointer"
                >
                  View Location
                </a>
              </div>
              <div className="flex gap-3 pt-2">

                <button
                  onClick={() => handleApprove(p._id)}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  ✅ Approve
                </button>

                <button
                  onClick={() => handleReject(p._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  ❌ Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
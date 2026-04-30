import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import Loader from "../../components/Loader";

export default function PendingProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/providers/pending");

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
      await API.put(`/provider/${id}/approve`);

      setProviders((prev) => prev.filter((p) => p._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/provider/${id}/reject`);

      setProviders((prev) => prev.filter((p) => p._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {loading && <Loader />}

      <h1 className="text-2xl font-bold mb-6">
        Pending Providers
      </h1>

      {providers.length === 0 ? (
        <p className="text-gray-500">No pending providers</p>
      ) : (
        <div className="grid gap-4">

          {providers.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              <div>
                <h2 className="font-semibold text-lg">{p.name}</h2>
                <p className="text-sm text-gray-500">{p.mobile}</p>
                <p className="text-sm text-gray-500">{p.service}</p>
                <p className="text-sm text-gray-500">
                  {p.location?.city}, {p.location?.state}
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => handleApprove(p._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(p._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
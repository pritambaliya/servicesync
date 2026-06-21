import { useState } from "react";
import API from "../../api/axios.js";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Flash from "../../components/Flash.jsx";

const ReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    providerId,
    bookingId,
    providerName,
    serviceName,
  } = location.state || {};

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState({
    type: "",
    message: "",
  });

  const showFlash = (type, message) => {
    setFlash({ type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      return showFlash("error", "Please select rating");
    }

    try {
      setLoading(true);

      const reviewData = {
        providerId,
        bookingId,
        rating,
        comment,
      };

      const res = await API.post("/reviews/add",
        reviewData,
        {
          withCredentials: true,
        }
      );

      showFlash(
        "success",
        res.data.message || "Review Added Successfully"
      );

      setTimeout(() => {
        navigate("/customer/bookings");
      }, 1500);

    } catch (error) {
      console.log(error);

      showFlash(
        "error",
        error.response?.data?.message ||
        "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] flex items-center justify-center p-4">

      {flash.message && (
        <Flash flash={flash} setFlash={setFlash} success={false} />
      )}

      <div
        className=" w-full max-w-md rounded-3xl border border-white/30 bg-white/10 backdrop-blur-lg shadow-2xl p-6"
      >

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Rate Your Experience
        </h2>

        <div
          className="
            bg-white/10
            border
            border-white/20
            p-4
            rounded-2xl
            mb-6
          "
        >
          <h3 className="text-xl font-semibold text-white">
            {providerName}
          </h3>

          <p className="text-gray-300 mt-1">
            Service: {serviceName}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`text-5xl transition-all duration-300 transform
                  ${star <= (hover || rating)
                    ? "text-yellow-400 scale-125 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]"
                    : "text-gray-400"
                  }
                  hover:rotate-12
                `}
              >
                ★
              </button>
            ))}
          </div>

          <p className="text-center text-gray-300 mb-5">
            {hover || rating
              ? `${hover || rating} Star Rating`
              : "Select Your Rating"}
          </p>

          <div className="mb-5">
            <textarea
              rows="5"
              placeholder="Write your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/20 bg-white/10 text-white placeholder-gray-300 p-4 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-yellow-400
              hover:bg-yellow-500
              text-black
              font-bold
              py-3
              rounded-2xl
              transition-all
              duration-300
              hover:scale-[1.02]
              disabled:opacity-50
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

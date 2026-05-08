import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Star, X, ArrowLeft } from "lucide-react";

export default function AddReviewPage() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const booking = state?.booking;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });

  if (!booking) {
    return (
      <div className="text-center mt-10 text-red-500">
        Booking data not found
      </div>
    );
  }

  // SUBMIT REVIEW
  const handleSubmitReview = async () => {

    try {

      if (!rating) {

        setFlash({
          type: "error",
          message: "Please select rating"
        });

        return;
      }

      setLoading(true);

      await API.post(

        "/reviews/add",

        {
          providerId: booking.provider._id,
          bookingId: booking._id,
          rating,
          comment
        },

        {
          withCredentials: true
        }
      );

      setFlash({
        type: "success",
        message: "Review submitted successfully 🎉"
      });

      setTimeout(() => {
        navigate("/customer/bookings");
      }, 1500);

    } catch (err) {

      console.log(err);

      setFlash({
        type: "error",
        message:
          err.response?.data?.message ||
          "Failed to submit review"
      });

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-r
      from-[#081c3a]
      to-[#0b3c78]
      flex
      items-center
      justify-center
      p-4
    ">

      {/* FLASH MESSAGE */}
      {flash.message && (

        <div
          className={`fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 z-[9999]
          ${
            flash.type === "success"
              ? "bg-green-500"
              : "bg-red-500"
          } text-white`}
        >

          <span>{flash.message}</span>

          <X
            className="cursor-pointer"
            onClick={() =>
              setFlash({
                type: "",
                message: ""
              })
            }
          />

        </div>
      )}

      <div className="
        bg-white
        w-full
        max-w-xl
        rounded-2xl
        shadow-2xl
        p-6
      ">

        {/* TOP */}
        <div className="
          flex
          items-center
          gap-3
          mb-6
        ">

          <button
            onClick={() => navigate(-1)}
            className="
              bg-gray-100
              hover:bg-gray-200
              p-2
              rounded-full
            "
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-bold">
            Add Review
          </h1>

        </div>

        {/* PROVIDER INFO */}
        <div className="
          bg-gray-100
          rounded-xl
          p-4
          mb-6
        ">

          <h2 className="
            text-xl
            font-bold
          ">
            {booking.provider?.name}
          </h2>

          <p className="text-gray-600">
            {booking.service}
          </p>

        </div>

        {/* STAR RATING */}
        <div className="mb-6">

          <label className="
            block
            font-semibold
            mb-3
          ">
            Rating
          </label>

          <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <Star
                key={star}
                size={35}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className={`
                  cursor-pointer
                  transition-all
                  ${
                    star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                `}
              />

            ))}

          </div>

        </div>

        {/* COMMENT */}
        <div className="mb-6">

          <label className="
            block
            font-semibold
            mb-3
          ">
            Comment
          </label>

          <textarea
            rows={5}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your experience..."
            className="
              w-full
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-blue-400
            "
          />

        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmitReview}
          disabled={loading}
          className={`
            w-full
            py-3
            rounded-xl
            text-white
            font-semibold
            ${
              loading
                ? "bg-gray-400"
                : "bg-blue-900 hover:bg-blue-950"
            }
          `}
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>

      </div>
    </div>
  );
}
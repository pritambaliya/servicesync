import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  comment: String

}, { timestamps: true });
const Review = mongoose.model("Review", reviewSchema);
export default Review;

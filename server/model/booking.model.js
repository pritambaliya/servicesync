import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },

  note: {
    type: String,
    maxlength: 500
  },

  service: String,

  date: Date,
  time: String,

  address: String,

  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

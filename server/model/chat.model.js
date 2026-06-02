import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
      required: true,
    },

    senderModel: {
      type: String,
      enum: ["customer", "provider"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const chatSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Chat",
  chatSchema
);
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  mobile: { 
    type: String, 
    required: true, 
    unique: true 
  },

  email: { 
    type: String,  
    unique: true,
    sparse: true
  },

  service: { 
    type: String, 
    required: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      type: { 
        type: String, 
        default: "Point" 
      },
      coordinates: [Number]
    }
  },

  idProof: {
    url: String,
    public_id: String
  },

  profileImage: {
  url: String,
  public_id: String
  },

  isAvailable: { 
    type: Boolean, 
    default: true 
  },

  priceRange: String,

  experience: Number,

  profileImage: {
    url: String,
    public_id: String
  },

  rating: { 
    type: Number, 
    default: 0 
  },
  reviewsCount: { 
    type: Number, 
    default: 0 
  },

  reviews: [
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  }
]
  
}, 
{ 
    timestamps: true 
});

providerSchema.index({ "location.coordinates": "2dsphere" });
const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
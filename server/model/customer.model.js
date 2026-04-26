import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "customer"
  },
  
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
    unique: true
  },

  password: {
    type: String,
    required: true
  },


  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number], 
        required: true
      }
    }
  },


  profileImage: {
    url: String,
    public_id: String
  }

}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;

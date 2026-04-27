import bcrypt from "bcrypt";
import Customer from "../model/customer.model.js";

const registerCustomer = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      password,
      location
    } = req.body;

    if (!name || !mobile || !password) {
      req.flash("error", "Name, mobile and password are required");
      return res.status(400).json({
        message: req.flash("error")[0]
      });
    }

    const existing = await Customer.findOne({ mobile });
    if (existing) {
      req.flash("error", "Customer already exists");
      return res.status(400).json({
        message: req.flash("error")[0]
      });
    }

    // 🔥 PASSWORD HASH
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 LOCATION BUILD (SAFE)
    let locationData = {};

    if (location) {
      locationData = {
        address: location.address,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
      };

      // ✅ only add coordinates if valid
      if (
        location.coordinates &&
        location.coordinates.coordinates &&
        location.coordinates.coordinates.length === 2
      ) {
        locationData.coordinates = {
          type: "Point",
          coordinates: [
            Number(location.coordinates.coordinates[0]), // lng
            Number(location.coordinates.coordinates[1])  // lat
          ]
        };
      }
    }

    // 🔥 CREATE CUSTOMER
    const customer = await Customer.create({
      name,
      mobile,
      email,
      password: hashedPassword,
      location: locationData
    });

    req.flash("success", "Customer registered successfully");

    res.status(201).json({
      success: true,
      message: req.flash("success")[0],
      data: customer
    });

  } catch (err) {
    console.error(err);

    req.flash("error", "Something went wrong during registration");

    res.status(500).json({
      success: false,
      message: req.flash("error")[0]
    });
  }
};

export { registerCustomer };
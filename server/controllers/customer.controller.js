import bcrypt from "bcrypt";
import Customer from "../model/customer.model.js";
import cloudinary from "../config/cloudanary.js";

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

    //Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    //Location Built
    let locationData = {};

    if (location) {
      locationData = {
        address: location.address,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
      };

      //only add coordinates if valid
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

    //Create Customer
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

//Update Profile
const updateProfile = async (req, res) => {
  try {
    const customerId = req.user._id;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    customer.name = req.body.name;
    customer.email = req.body.email;

    customer.location.address =
      req.body.address;

    customer.location.city =
      req.body.city;

    customer.location.state =
      req.body.state;

    customer.location.pincode =
      req.body.pincode;

    if (req.file) {
      customer.profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    if (req.body.removeProfileImage === "true") {
      customer.profileImage = {
        url: "",
        public_id: "",
      };
    }

    if (req.body.removeProfileImage === "true") {
      if (customer.profileImage?.public_id) {
        await cloudinary.uploader.destroy(
          customer.profileImage.public_id
        );
      }

      customer.profileImage = {
        url: "",
        public_id: "",
      };
    }

    await customer.save();

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerCustomer, updateProfile };
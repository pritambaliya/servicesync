import bcrypt from "bcrypt";
import Provider from "../model/provider.model.js";

const registerProvider = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      password,
      service,
      address,
      city,
      state,
      pincode,
      experience,
      latitude,
      longitude,
      priceRange
    } = req.body;

    const existing = await Provider.findOne({ mobile });
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (existing) {
      req.flash("error", "Provider already exists");
      return res.status(400).json({
        success: false,
        message: req.flash("error")[0]
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newProvider = await Provider.create({
      name,
      mobile,
      email,
      password: hashed,
      service,
      experience: Number(experience) || 0,
      priceRange,
      location: {
        address,
        city,
        state,
        pincode,
        coordinates: {
          type: "Point",
          coordinates: [
            Number(longitude),
            Number(latitude)
          ]
        }
      },

      isAvailable: true,

      idProof: {
        url: req.files?.idProof?.[0]?.path,
        public_id: req.files?.idProof?.[0]?.filename
      },

      profileImage: {
        url: req.files?.profileImage?.[0]?.path,
        public_id: req.files?.profileImage?.[0]?.filename
      }
    });

    req.flash("success", "Request sent to admin");

    res.json({
      success: true,
      message: req.flash("success")[0],
      data: newProvider
    });

  } catch (err) {
    console.log("ERROR:", err);

    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0]
    });
  }
};

const getProviderProfile = async (
  req,
  res
) => {
  try {

    const provider = await Provider.findById(
      req.user._id
    )
    .populate(
      "reviews.customer",
      "name profileImage"
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    req.flash(
      "success",
      "Profile fetched successfully"
    );

    res.json({
      success: true,
      message: req.flash("success")[0],
      data: provider,
    });

  } catch (err) {

    console.log(err);

    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0],
    });

  }
};

export { getProviderProfile, registerProvider };
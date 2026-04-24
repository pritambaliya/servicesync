import bcrypt from "bcrypt";
import Provider from "../model/provider.model.js";

const registerProvider = async (req, res) => {
  try {
    const {
      name,
      mobile,
      password,
      service,
      lat,
      lng
    } = req.body;

    const existing = await Provider.findOne({ mobile });

    if (existing) {
      req.flash("error", "Provider already exists");
      return res.status(400).json({
        message: req.flash("error")
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newProvider = await Provider.create({
      name,
      mobile,
      password: hashed,
      service,
      location: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)]
      },
      isAvailable: true,

      idProof: {
        url: req.file?.path,
        public_id: req.file?.filename
      }
    });

    console.log("FILE:", req.file);

    req.flash("success", "Request sent to admin");

    res.json({
      message: req.flash("success"),
      data: newProvider
    });

  } catch (err) {
    req.flash("error", err.message);

    res.status(500).json({
      message: req.flash("error")
    });
  }
};

export { registerProvider };
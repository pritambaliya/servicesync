import bcrypt from "bcrypt";
import Customer from "../model/customer.model.js";

const registerCustomer = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      mobile,
      email,
      password: hashedPassword
    });

    req.flash("success", "Customer registered successfully");

    res.status(201).json({
      message: req.flash("success")[0],
      data: customer
    });

  } catch (err) {
    console.error(err);

    req.flash("error", "Something went wrong during registration");

    res.status(500).json({
      message: req.flash("error")[0]
    });
  }
};

export { registerCustomer };
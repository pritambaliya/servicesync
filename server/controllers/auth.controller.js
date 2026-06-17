import Customer from "../model/customer.model.js";
import Provider from "../model/provider.model.js";
import sendEmail from "../config/sendEmail.js";
import bcrypt from "bcrypt";

const loginSuccess = (req, res) => {
  req.flash("success", "Login successful");

  res.json({
    message: req.flash("success")[0],
    user: req.user
  });
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Logout failed");
      return res.status(500).json({
        message: req.flash("error")[0]
      });
    }

    req.flash("success", "Logged out successfully");

    res.json({
      message: req.flash("success")[0]
    });
  });
};


const sendForgotOtp = async (req, res) => {
  try {
    const { email, role } = req.body;

    let user;

    if (role === "customer") {
      user = await Customer.findOne({ email });
    } else if (role === "provider") {
      user = await Provider.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "ServiceSync Password Reset OTP",
      `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
      <p>Account Type: ${role}</p>
      `
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    let user = await Customer.findOne({ email });

    if (!user) {
      user = await Provider.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.resetOtp !== otp ||
      user.resetOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};  

export { loginSuccess, logoutUser, sendForgotOtp, resetPassword };
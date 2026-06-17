import express from "express";
import passport from "passport";
import { logoutUser, sendForgotOtp, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: info?.message || "Login failed"
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login session error"
        });
      }

      return res.json({
        success: true,
        message: "Login successful",
        user
      });
    });

  })(req, res, next);
});

router.get("/logout", logoutUser);

router.post(
  "/forgot-password",
  sendForgotOtp
);

router.post(
  "/reset-password",
  resetPassword
);

export default router;
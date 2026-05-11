import express from "express";
import upload from "../middleware/upload.middleware.js";
import { getProviderProfile, registerProvider } from "../controllers/provider.controller.js";
import Provider from "../model/provider.model.js";
import { isLoggedIn, isProvider} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/by-service", async (req, res) => {
  try {

    let { service } = req.query;

    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Service is required"
      });
    }

    service = service.replace(/-/g, " ");

    const providers = await Provider.find({
      service: new RegExp(`^${service}$`, "i"),
      status: "approved"
    })
    .populate("reviews.customer", "name profileImage");

    res.json({
      success: true,
      data: providers
    });

  } catch (err) {

    console.log("ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});

// ✅ REGISTER
router.post(
  "/register",
  upload.fields([
    { name: "profileImage" },
    { name: "idProof" }
  ]),
  registerProvider
);

router.get(
  "/profile",
  isLoggedIn,
  isProvider,
  getProviderProfile
);

export default router;
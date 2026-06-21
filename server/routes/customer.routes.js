import express from 'express';
import {registerCustomer, updateProfile, deleteAccount} from "../controllers/customer.controller.js";
import upload from "../middleware/upload.middleware.js";
import {isCustomer} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/register", registerCustomer);

router.put(
  "/profile/update",
  isCustomer,
  upload.single("profileImage"),
  updateProfile
);

router.delete(
 "/delete-account",
 isCustomer,
 deleteAccount
);

export default router;
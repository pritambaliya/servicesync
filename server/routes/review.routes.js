import express from "express";
import { addReview } from "../controllers/review.controller.js";
import { isLoggedIn, isCustomer } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", isLoggedIn, isCustomer, addReview);

export default router;
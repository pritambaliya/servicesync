import express from "express";
import {
  createBooking,
  updateBookingStatus,
  getCustomerBookings,
  getProviderBookings,
  cancelBookingByCustomer
} from "../controllers/booking.controller.js";

import {
  isLoggedIn,
  isCustomer,
  isProvider
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", isLoggedIn, isCustomer, createBooking);

router.put("/:id/status", isLoggedIn, isProvider, updateBookingStatus);

router.get("/customer", isLoggedIn, isCustomer, getCustomerBookings);

router.get("/provider", isLoggedIn, isProvider, getProviderBookings);

router.put("/cancel/:id", isLoggedIn, isCustomer, cancelBookingByCustomer);
export default router;
import express from "express";
import {
  createBooking,
  updateBookingStatus,
  getCustomerBookings,
  getProviderBookings,
  cancelBookingByCustomer,
  deleteBooking,
  updateBooking
} from "../controllers/booking.controller.js";

import {
  isLoggedIn,
  isCustomer,
  isProvider
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",isLoggedIn, isCustomer, createBooking); //Customer Side

router.delete("/delete/:id", isLoggedIn, isCustomer, deleteBooking);

router.put("/update/:id", isLoggedIn, isCustomer, updateBooking);

router.put("/:id/status", isLoggedIn, isProvider, updateBookingStatus); //Provider Side

router.get("/customer", isLoggedIn, isCustomer, getCustomerBookings);  //Customer Side

router.get("/provider", isLoggedIn, isProvider, getProviderBookings); //Provider Side

router.put("/cancel/:id", isLoggedIn, isCustomer, cancelBookingByCustomer); //Customer Side
export default router;
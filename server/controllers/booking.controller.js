import Booking from "../model/booking.model.js";
import Provider from "../model/provider.model.js";

export const createBooking = async (req, res) => {
  try {
    const { providerId, service, date, time, note, location } = req.body;

    if (!providerId || !date || !time) {
      req.flash("error", "Missing required fields");
      return res.status(400).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    const provider = await Provider.findById(providerId);
    if (!provider) {
      req.flash("error", "Provider not found");
      return res.status(404).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      provider: providerId,
      service,
      date,
      time,
      note,
      location
    });

    req.flash("success", "Booking created");

    res.status(201).json({
      success: true,
      message: req.flash("success")[0],
      data: booking
    });

  } catch (err) {
    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0],
      data: null
    });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["accepted", "completed", "cancelled"];
    if (!allowed.includes(status)) {
      req.flash("error", "Invalid status");
      return res.status(400).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      req.flash("error", "Booking not found");
      return res.status(404).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    if (String(booking.provider) !== String(req.user._id)) {
      req.flash("error", "Not allowed");
      return res.status(403).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    booking.status = status;
    await booking.save();

    req.flash("success", "Booking updated");

    res.json({
      success: true,
      message: req.flash("success")[0],
      data: booking
    });

  } catch (err) {
    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0],
      data: null
    });
  }
};


export const getCustomerBookings = async (req, res) => {
  try {
    const { status, from, to, service } = req.query;

    let filter = {
      customer: req.user._id
    };

    if (status) {
      filter.status = status;
    }

    if (service) {
      filter.service = service;
    }

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const bookings = await Booking.find(filter)
      .populate("provider");

    const result = bookings.map(b => {
      const providerData = { ...b.provider._doc };

      if (b.status !== "accepted") {
        delete providerData.mobile;
        delete providerData.email;
      }

      return {
        ...b._doc,
        provider: providerData
      };
    });

    req.flash("success", "Filtered bookings fetched");

    res.json({
      success: true,
      message: req.flash("success")[0],
      data: result
    });

  } catch (err) {
    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0],
      data: null
    });
  }
};


export const getProviderBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      provider: req.user._id
    })
    .populate("customer");

    req.flash(
      "success",
      "Provider bookings fetched"
    );

    res.json({
      success: true,
      message: req.flash("success")[0],
      data: bookings
    });

  } catch (err) {

    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0],
      data: null
    });

  }
};

export const cancelBookingByCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.status(404).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    if (String(booking.customer) !== String(req.user._id)) {
      req.flash("error", "Not allowed");
      return res.status(403).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    if (booking.status === "completed") {
      req.flash("error", "Cannot cancel completed booking");
      return res.status(400).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    if (booking.status === "cancelled") {
      req.flash("error", "Booking already cancelled");
      return res.status(400).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled successfully");

    res.json({
      success: true,
      message: req.flash("success")[0],
      data: booking
    });

  } catch (err) {
    req.flash("error", err.message);

    res.status(500).json({
      success: false,
      message: req.flash("error")[0],
      data: null
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // only own booking delete
    if (String(booking.customer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Not allowed"
      });
    }

    await Booking.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Booking deleted permanently"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const updateBooking = async (req, res) => {

  try {

    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    if (
      String(booking.customer) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending booking editable"
      });
    }

    const {
      date,
      time,
      note,
      address,
      city,
      state,
      lat,
      lng
    } = req.body;

    booking.date = date;
    booking.time = time;
    booking.note = note;

    booking.location = {
      address,
      city,
      state,

      coordinates: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };

    await booking.save();

    res.json({
      success: true,
      message: "Booking updated",
      data: booking
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

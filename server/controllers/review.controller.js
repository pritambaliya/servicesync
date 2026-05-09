import Provider from "../model/provider.model.js";
import Booking from "../model/booking.model.js";

export const addReview = async (req, res) => {
  try {
    const { providerId, rating, comment, bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.status(404).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    if (String(booking.customer) !== String(req.user._id)) {
      req.flash("error", "Not your booking");
      return res.status(403).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    if (booking.status === "pending") {
      req.flash("error", "Review allowed after accept, completion or rejected");
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

    const alreadyReviewed = provider.reviews.find(
      r => String(r.customer) === String(req.user._id)
    );

    if (alreadyReviewed) {
      req.flash("error", "You already reviewed this provider");
      return res.status(400).json({
        success: false,
        message: req.flash("error")[0],
        data: null
      });
    }

    provider.reviews.push({
      customer: req.user._id,
      rating,
      comment
    });

    provider.reviewsCount = provider.reviews.length;

    provider.rating =
      provider.reviews.reduce((acc, item) => acc + item.rating, 0) /
      provider.reviews.length;

    await provider.save();

    req.flash("success", "Review added successfully");

    res.status(201).json({
      success: true,
      message: req.flash("success")[0],
      data: provider
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
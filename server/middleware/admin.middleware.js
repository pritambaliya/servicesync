exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  req.flash("error", "Access denied"); 

  res.status(403).json({
    message: req.flash("error")
  });
};
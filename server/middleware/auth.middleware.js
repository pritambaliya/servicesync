exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.flash("error", "Login required"); 

  res.status(401).json({
    message: req.flash("error")
  });
};
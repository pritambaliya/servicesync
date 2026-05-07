const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "Login required");

  return res.status(401).json({
    success: false,
    message: req.flash("error")[0],
    data: null
  });
};

const isCustomer = (req, res, next) => {
  if (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    req.user &&
    req.user.role === "customer"
  ) {
    return next();
  }

  req.flash("error", "Customer access only");

  return res.status(403).json({
    success: false,
    message: req.flash("error")[0],
    data: null
  });
};

const isProvider = (req, res, next) => {
  if (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    req.user &&
    req.user.role === "provider"
  ) {
    return next();
  }

  req.flash("error", "Provider access only");

  return res.status(403).json({
    success: false,
    message: req.flash("error")[0],
    data: null
  });
};

export { isLoggedIn, isCustomer, isProvider };
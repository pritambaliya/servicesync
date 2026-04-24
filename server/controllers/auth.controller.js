const loginSuccess = (req, res) => {
  req.flash("success", "Login successful");

  res.json({
    message: req.flash("success")[0],
    user: req.user
  });
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Logout failed");
      return res.status(500).json({
        message: req.flash("error")[0]
      });
    }

    req.flash("success", "Logged out successfully");

    res.json({
      message: req.flash("success")[0]
    });
  });
};

export { loginSuccess, logoutUser };
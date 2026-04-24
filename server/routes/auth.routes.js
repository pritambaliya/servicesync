import express from "express";
import passport from "passport";
import { loginSuccess, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(400).json({
        message: req.flash("error")[0]
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: req.flash("success")[0],
        user
      });
    });

  })(req, res, next);
});

router.get("/logout", logoutUser);

export default router;
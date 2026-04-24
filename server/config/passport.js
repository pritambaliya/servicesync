import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import Provider from "../model/provider.model.js";
import Customer from "../model/customer.model.js";

passport.use(
  new LocalStrategy(
    { usernameField: "mobile", passReqToCallback: true },
    async (req, mobile, password, done) => {
      try {
        let user = await Provider.findOne({ mobile });
        let role = "provider";

        if (!user) {
          user = await Customer.findOne({ mobile });
          role = "customer";
        }

        if (!user) {
          req.flash("error", "User not found");
          return done(null, false);
        }

        if (role === "provider" && user.status !== "approved") {
          req.flash("error", "Wait for admin approval");
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          req.flash("error", "Wrong password");
          return done(null, false);
        }

        user.role = role;

        req.flash("success", "Login successful");
        return done(null, user);

      } catch (err) {
        return done(err);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, { id: user._id, role: user.role });
});

passport.deserializeUser(async (data, done) => {
  try {
    let user;

    if (data.role === "provider") {
      user = await Provider.findById(data.id);
    } else {
      user = await Customer.findById(data.id);
    }

    // attach role again
    if (user) {
      user.role = data.role;
    }

    done(null, user);

  } catch (err) {
    done(err);
  }
});

export default passport;
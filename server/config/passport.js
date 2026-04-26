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
        const frontendRole = req.body.role;

        let user = await Provider.findOne({ mobile });
        let role = "provider";

        if (!user) {
          user = await Customer.findOne({ mobile });
          role = "customer";
        }

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // 🔥 VALIDATE FRONTEND ROLE (IMPORTANT FIX)
        if (frontendRole && frontendRole !== role) {
          return done(null, false, { message: "Invalid role selected" });
        }

        // provider approval check
        if (role === "provider" && user.status !== "approved") {
          return done(null, false, { message: "Wait for admin approval" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Wrong password" });
        }

        user = user.toObject();
        user.role = role; // attach runtime role

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
    } else if (data.role === "customer") {
      user = await Customer.findById(data.id);
    } else {
      return done(null, false);
    }

    if (!user) return done(null, false);

    user = user.toObject();
    user.role = data.role;

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
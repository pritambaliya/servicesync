import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import passport from "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false 
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/provider", providerRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }
  res.status(401).json({ message: "Not logged in" });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });
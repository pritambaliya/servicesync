import express from "express";
import mongoose from "mongoose";
import http from "http";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import passport from "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import dotenv from "dotenv";
import cors from "cors";

import { initSocket } from "./config/socket.js";

dotenv.config();

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://servicesync-enrn.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/provider", providerRoutes);
app.use("/admin", adminRoutes);
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/chat", chatRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Current User
app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }

  res.status(401).json({
    message: "Not logged in",
  });
});

// Auth Check
app.get("/check-auth", (req, res) => {
  res.json({
    auth: req.isAuthenticated(),
    user: req.user,
    session: req.session,
  });
});

// 404 Handler
app.use((req, res) => {
  console.log(
    "Route not found:",
    req.method,
    req.url
  );

  res.status(404).json({
    message: "Route not found",
  });
});

// Database Connection + Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // IMPORTANT:
    // Use server.listen() NOT app.listen()
    server.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    });
  })
  .catch((err) => {
    console.error(
      "DB Connection Error:",
      err
    );
  });

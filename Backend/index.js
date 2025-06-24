const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/BgmiPlayer");
const passportConfig = require("./config/passportConfig");
require("dotenv").config();

const app = express();

// Validate required environment variables
const requiredEnvVars = ["DB_URL", "SESSION_SECRET"];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

// Enhanced MongoDB connection with modern options
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
      tls: true, // Use 'tls' instead of 'ssl'
      tlsAllowInvalidCertificates: false // More secure than allowing invalid certs
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

// Initialize Passport configuration
passportConfig(passport);

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced session configuration
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  collectionName: "sessions",
  ttl: 30 * 24 * 60 * 60, // 30 days in seconds
  autoRemove: "native", // Use MongoDB's TTL index
  touchAfter: 24 * 3600, // Reduce session writes
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running...",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server only after DB connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
});

// Handle process termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

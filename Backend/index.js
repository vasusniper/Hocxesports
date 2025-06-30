<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/BgmiPlayer");
const path = require("path");
const passportConfig = require("./config/passportConfig");
require("dotenv").config();
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/error');
>>>>>>> ab4e9370 (add Some furure)

const app = express();

// ======================
// 1. Environment Validation
// ======================
const requiredEnvVars = [
  'DB_URL',
  'SESSION_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'CLIENT_URL'
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars.join(', '));
  process.exit(1);
}

// ======================
// 2. Database Connection
// ======================
connectDB().then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB Connection Failed:', err.message);
  process.exit(1);
});

// ======================
// 3. Middleware Setup
// ======================
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

<<<<<<< HEAD
// Routes
app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
// Last Route 
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "Frontend/public/error.html"));
});

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
=======
// ======================
// 4. Route Configuration
// ======================
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/auth', require('./routes/auth'));
app.use('/teams', require('./routes/teams'));
>>>>>>> ab4e9370 (add Some furure)

// ======================
// 5. Error Handling
// ======================
app.use(notFound);       // ✅ custom 404 handler (redirects to frontend)
app.use(errorHandler);   // ✅ general error handler

// ======================
// 6. Server Startup
// ======================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
  📡 Listening on port ${PORT}
  🔗 CORS enabled for: ${process.env.CLIENT_URL}
  `);
});

// ======================
// 7. Graceful Shutdown
// ======================
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Server terminated');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

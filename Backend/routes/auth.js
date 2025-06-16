const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google login
router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

// Callback
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");  // redirect to React home
  }
);

// Get user data
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;

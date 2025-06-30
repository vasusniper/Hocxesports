const User = require('../models/User');

// Google auth success handler

exports.googleAuthSuccess = (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=unauthorized`);
  }

  const { _id, username, email, image } = req.user;

  // Redirect with query parameters
  const redirectURL = `${process.env.CLIENT_URL}/?id=${_id}&name=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&image=${encodeURIComponent(image)}`;

  return res.redirect(redirectURL);
};

// Logout handler
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logged out successfully' });
  });
};

// Get current user
exports.getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }
  
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      image: req.user.image
    }
  });
};
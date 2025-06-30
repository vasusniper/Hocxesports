const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Google OAuth routes
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account' 
}));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed` 
  }),
  authController.googleAuthSuccess
);

// User routes
router.get('/user', authController.getCurrentUser);
router.get('/logout', authController.logout);

module.exports = router;
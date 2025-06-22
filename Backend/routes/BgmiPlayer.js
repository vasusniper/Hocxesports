const express=require("express");
const router=express.Router();
const multer=require("multer");
const { cloudinary, storage } = require("../config/cloudinary"); // Make sure to import cloudinary
const upload=multer({ storage });
const Team=require("../models/playerTeam");
const {teamValidate}=require("../middlewares/teamValidate.js");
const User = require("../models/User.js");
router.post(
  "/submit",
  upload.single("logo"),
 teamValidate,async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a team logo" });
      }

      // Validate required fields
      const requiredFields = ['teamName', 'igl', 'player2', 'player3', 'player4'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bgmi_teams_logos" // Optional: organize uploads in folder
      });

      const newTeam = new Team({
        teamName: req.body.teamName,
        igl: req.body.igl,
        player2: req.body.player2,
        player3: req.body.player3,
        player4: req.body.player4,
        logoUrl: result.secure_url,
        submittedBy: req.user?.id || null // Handle case when no auth
      });

      await newTeam.save();
      
      res.status(201).json({ 
        success: true,
        message: 'Team submitted successfully!',
        team: newTeam
      });

    } catch (err) {
      console.error("Error submitting team:", err);
      
      // More specific error messages
      let errorMessage = 'Server error';
      if (err.name === 'ValidationError') {
        errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
      } else if (err.message.includes('File too large')) {
        errorMessage = 'Image file is too large (max 2MB)';
      }

      res.status(500).json({ 
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);
// GET all teams
router.get("/data", async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ message: "Error fetching teams" });
  }
});

module.exports = router;
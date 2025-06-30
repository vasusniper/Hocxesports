const { cloudinary } = require('../config/cloudinary');
const Team = require('../models/Team');
const fs = require('fs');

exports.submitTeam = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Team logo is required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "bgmi_teams_logos",
      transformation: { width: 500, crop: 'limit' }
    });

    fs.unlinkSync(req.file.path); // Clean up

    const newTeam = await Team.create({
      teamName: req.body.teamName,
      igl: req.body.igl,
      mobileNumber: req.body.mobileNumber,
      player2: req.body.player2,
      player3: req.body.player3,
      player4: req.body.player4,
      logoUrl: result.secure_url,
      submittedBy: req.user?.id || null // Optional auth support
    });

    res.status(201).json({
      success: true,
      message: 'Team registered successfully',
      team: newTeam
    });

  } catch (err) {
    console.error('Team submission error:', err);
    if (req.file?.path) fs.unlinkSync(req.file.path);

    const message = err.name === 'ValidationError'
      ? Object.values(err.errors).map(e => e.message).join(', ')
      : err.message.includes('File upload failed')
        ? 'Logo upload failed'
        : 'Server error';

    res.status(500).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('submittedBy', 'username image')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: teams.length, teams });
  } catch (err) {
    console.error('Get teams error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch teams' });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    if (team.logoUrl) {
      const publicId = team.logoUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`bgmi_teams_logos/${publicId}`);
    }

    await team.remove();
    res.json({ success: true, message: 'Team deleted successfully' });

  } catch (err) {
    console.error('Delete team error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete team' });
  }
};

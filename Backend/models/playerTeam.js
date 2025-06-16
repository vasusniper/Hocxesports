const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, maxlength: 50 },
  igl: { type: String, required: true, maxlength: 30 },
  player2: { type: String, required: true, maxlength: 30 },
  player3: { type: String, required: true, maxlength: 30 },
  player4: { type: String, required: true, maxlength: 30 },
  logoUrl: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
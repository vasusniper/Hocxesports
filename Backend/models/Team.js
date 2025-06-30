const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, trim: true, maxlength: 50 },
    igl: { type: String, required: true, trim: true, maxlength: 30 },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      match: /^[0-9]{10}$/,
      unique: true,
    },
    player2: { type: String, required: true, trim: true, maxlength: 30 },
    player3: { type: String, required: true, trim: true, maxlength: 30 },
    player4: { type: String, required: true, trim: true, maxlength: 30 },
    logoUrl: { type: String, required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Add index for better query performance
teamSchema.index({ teamName: 1 });
teamSchema.index({ submittedBy: 1 });

module.exports = mongoose.model("Team", teamSchema);

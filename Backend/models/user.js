const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
  image: String, // 👈 new field
});

module.exports = mongoose.model("User", userSchema);

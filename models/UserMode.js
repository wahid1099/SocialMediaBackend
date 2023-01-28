const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  joined: { type: Date, default: Date.now },

  followers: [String],
  following: [String],
});

module.exports = mongoose.model("User", userSchema);

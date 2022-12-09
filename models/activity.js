const mongoose = require("mongoose");

// Business Activity
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Business Activity Name"],
    trim: true,
  },
  oldid: {
    type: String,
  },
});

module.exports = mongoose.model("Activity", schema);

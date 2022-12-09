const mongoose = require("mongoose");

const adClass = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please entet Name"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Please entet Slug"],
    trim: true,
  },
  platform: {
    type: String,
    trim: true,
    required: [true, "Please select Platform(i.e Mobile or Web or Both)"],
    enum: {
      values: ["Mobile", "Web", "Both"],
      message: "Please select Correct Platform",
    },
  },
});

module.exports = mongoose.model("AdClass", adClass);

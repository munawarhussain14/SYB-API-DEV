const mongoose = require("mongoose");

const adType = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide Name of Type"],
  },
  size: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("AdType", adType);

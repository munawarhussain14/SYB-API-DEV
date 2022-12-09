const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Amenity Name"],
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Amenity", amenitySchema);

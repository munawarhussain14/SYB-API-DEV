const mongoose = require("mongoose");

const propertyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Property Type Name"],
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

module.exports = mongoose.model("property_type", propertyTypeSchema);

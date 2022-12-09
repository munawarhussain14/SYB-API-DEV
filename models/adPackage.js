const mongoose = require("mongoose");

const adpackageSchema = new mongoose.Schema({
  adClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdClass",
  },
  adType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdType",
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  title: {
    type: String,
    required: [true, "Please enter Package Title"],
  },
  slug: {
    type: String,
    required: [true, "Please enter Package Slug"],
  },
  days: {
    type: Number,
    required: [true, "Please enter Days"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter Price"],
    trim: true,
  },
  discount: {
    type: Number,
    trim: true,
    default: null,
  },
  discount_end_date: {
    type: Date,
    trim: true,
    default: null,
  },
  required_cat: {
    type: Boolean,
    default: false,
  },
  enable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("AdPackage", adpackageSchema);

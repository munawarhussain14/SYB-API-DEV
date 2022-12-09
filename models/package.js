const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Package Name"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Please enter Slug Name"],
    trim: true,
  },
  detail: {
    type: String,
    trim: true,
  },
  currency: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter Package Price"],
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
  },
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  duration: {
    type: Number,
    trim: true,
  },
  untilSold: {
    type: Boolean,
    default: false,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  type: {
    type: String,
    trim: true,
    required: [
      true,
      "Please select Type for the Package(i.e Listing, Real Estate)",
    ],
    enum: {
      values: ["Business", "Real Estate"],
      message: "Please select Correct Type",
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  special: {
    type: Boolean,
    default: false,
  },
  enable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Package", packageSchema);

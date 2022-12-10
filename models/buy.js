const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  query_id: {
    type: String,
    required: [true, "Please enter Query ID"],
    trim: true,
    unique: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  sub_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  question: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  detail: {
    type: String,
  },
  publish: {
    type: String,
    trim: true,
    required: [true, "Please select Publish Status"],
    default: "private",
    enum: {
      values: ["private", "publish"],
      message: "Please select Correct Publish Status",
    },
  },
  status: {
    type: String,
    trim: true,
    required: [true, "Please select Status"],
    default: "pending",
    enum: {
      values: ["pending", "process", "approved", "rejected", "closed"],
      message: "Please select Correct Status",
    },
  },
  name: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  expected_price: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  email: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  publishAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BuyerQuery", schema);

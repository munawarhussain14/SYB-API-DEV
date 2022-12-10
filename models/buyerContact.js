const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  query: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BuyerQuery",
  },
  phone_no: {
    type: String,
  },
  quoted_price: {
    type: Number,
  },
  remarks: {
    type: String,
  },
  status: {
    type: String,
    trim: true,
    required: [true, "Please select Status"],
    default: "pending",
    enum: {
      values: ["pending", "process", "closed"],
      message: "Please select Correct Status",
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BuyerQueryContact", schema);

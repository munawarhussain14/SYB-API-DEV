const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  clicked: {
    type: Number,
    trim: true,
    default: 0,
  },
  phone: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  image: {
    public_id: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  requestDesign: {
    type: Boolean,
    required: [true, "Please provide Request Design Requirement"],
    default: false,
  },
  adPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdPackage",
  },
  startAt: {
    type: Date,
    trim: true,
  },
  expireAt: {
    type: Date,
    trim: true,
  },
  publishAt: {
    type: Date,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    default: "Pending",
    required: [true, "Please select Status"],
    enum: {
      values: [
        "Pending",
        "Payment Pending",
        "Published",
        "Private",
        "Trash",
        "Block",
      ],
      message: "Please select Correct Status",
    },
  },
  redirect: {
    type: String,
    required: [true, "Please provide Redirect Link"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  enable: {
    type: Boolean,
    default: false,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    trim: true,
    default: "Pending",
    required: [true, "Please provide Payment Status"],
    enum: {
      values: ["Pending", "Paid", "Cancel", "Decline", "Fail"],
      message: "Please select Correct Payment Status",
    },
  },
  payment_message: {
    type: String,
    trim: true,
  },
  package: {
    package_title: {
      type: String,
    },
    package_price: {
      type: Number,
    },
    package_date: {
      type: Date,
    },
    package_expiry_date: {
      type: Date,
    },
    ref: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Advertisement", advertisementSchema);

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  purpose: {
    type: String,
    required: [true, "Please select Purpose"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Please enter Property Title"],
    trim: true,
  },
  sub_title: {
    type: String,
    required: [true, "Please enter Property Sub Title"],
    trim: true,
  },
  property_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property_type",
  },
  description: {
    type: String,
  },
  property_size: {
    type: Number,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  price: {
    type: Number,
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  location: {
    address: {
      type: String,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
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
    payment_status: {
      type: Boolean,
      default: false,
    },
    ref: {
      type: String,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
  },
  feature: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("property", propertySchema);

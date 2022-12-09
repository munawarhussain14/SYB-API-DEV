const mongoose = require("mongoose");

const listingScheme = new mongoose.Schema({
  list_id: {
    type: String,
    required: [true, "Please enter Listing ID"],
    trim: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Please enter Listing Title"],
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  company_name: {
    type: String,
    required: [true, "Please enter Business Name"],
    trim: true,
  },
  business_name: {
    type: String,
    required: [true, "Please enter Business Name"],
    trim: true,
  },
  asking_price: {
    type: Number,
  },
  company_asking_price: {
    type: Number,
  },
  min_asking_price: {
    type: Number,
  },
  license_expiry_date: {
    type: Date,
  },
  license_type: {
    type: String,
  },
  business_establish_date: {
    type: Date,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  sub_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  business_activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  feature: {
    type: String,
  },
  business_overview: {
    type: String,
  },
  reason_for_sale: {
    type: String,
  },
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
  website: {
    type: String,
  },
  business_address: {
    type: String,
  },
  company_address: {
    type: String,
  },
  real_estate: {
    type: String,
  },
  lease_expiry_date: {
    type: Date,
  },
  business_type: {
    type: String,
  },
  size_of_premises: {
    type: Number,
  },
  annual_lease: {
    type: Number,
  },
  lease_term: {
    type: String,
  },
  finance: [
    {
      year: {
        type: Number,
      },
      revenue: {
        type: Number,
      },
      profit: {
        type: Number,
      },
    },
  ],
  package: {
    package_title: {
      type: String,
    },
    package_name: {
      type: String,
    },
    package_price: {
      type: Number,
    },
    currency: {
      type: String,
      default: "",
    },
    package_date: {
      type: Date,
    },
    package_expiry_date: {
      type: Date,
    },
    untilSold: {
      type: Boolean,
      default: false,
    },
    payment_source: {
      type: String,
      default: "Via Online Payment",
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    special: {
      type: Boolean,
      dafault: false,
    },
    featured: {
      type: Boolean,
      dafault: false,
    },
    ref: {
      type: String,
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    verified: {
      type: Boolean,
      dafault: false,
    },
  },
  init_info_status: {
    type: Boolean,
    dafault: true,
  },
  basic_info_status: {
    type: Boolean,
    dafault: false,
  },
  images_status: {
    type: Boolean,
    dafault: false,
  },
  location_detail_status: {
    type: Boolean,
    dafault: false,
  },
  real_estate_status: {
    type: Boolean,
    dafault: false,
  },
  finance_status: {
    type: Boolean,
    dafault: false,
  },
  package_status: {
    type: Boolean,
    dafault: false,
  },
  payment_status: {
    type: Boolean,
    dafault: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  approve_date: {
    type: Date,
  },
  block: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  sort: {
    type: Number,
    default: 3,
  },
  view: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sold: {
    type: Boolean,
    default: false,
  },
  issues: [
    {
      createdAt: {
        type: Date,
        default: Date.now,
      },
      issuesList: {
        type: String,
      },
      fix: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("List", listingScheme);

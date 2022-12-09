const mongoose = require("mongoose");
const mongooseIntl = require('mongoose-intl');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Category Name"],
    trim: true,
    intl:true
  },
  slug: {
    type: String,
    trim: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: "61ae0725a0da3e6c36492099",
  },
  old_id: {
    type: String,
    trim: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    trim: true,
  },
});

categorySchema.plugin(mongooseIntl, {
  languages: ["en", "ar", "fr"],
  defaultLanguage: "en",
});
module.exports = mongoose.model("Category", categorySchema);

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },

  phonenumber: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  oldid: {
    type: String,
  },
  visitAt: {
    type: Date,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordTekken: String,
  resetPassowrdExpire: Date,
  verification_code: {
    type: String,
  },
  fav_listing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      unique: true,
    },
  ],
  verification_code_verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

// Encrypting Password before Saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPasswrod) {
  return await bcrypt.compare(enteredPasswrod, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Set token expire time
  this.resetPasswordToken = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

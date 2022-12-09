const User = require("../models/user");
const List = require("../models/listing");

const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/ApiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getCode = (user) => {
  let verification_code;
  if (!user.verification_code || user.verification_code == "") {
    verification_code = Math.floor(Math.random() * 999999) % 100000;
    user.verification_code = verification_code;
    user.save();
    return verification_code;
  } else {
    return user.verification_code;
  }
};

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, phonenumber, email, password } = req.body;
  const verification_code = Math.floor(Math.random() * 999999) % 100000;

  //await User.updateMany({}, { delete: false }, { multi: true });

  let user = await User.findOne({
    email,
    delete: true,
  });

  if (user) {
    user = await User.findByIdAndUpdate(user.id, {
      name,
      email,
      phonenumber,
      // password,
      verification_code,
      delete: false,
      verification_code_verified: false,
      status: false,
      avatar: {
        public_id: "avatar_ehqcee",
        url: "",
      },
    });
    user.password = password;
    user.save();
  } else {
    user = await User.findOne({
      email,
      delete: false,
    });
    if (user) {
      return next(new ErrorHandler("Email already taken", 400));
    } else {
      user = await User.create({
        name,
        email,
        phonenumber,
        password,
        verification_code,
        avatar: {
          public_id: "avatar_ehqcee",
          url: "",
        },
      });
    }
  }

  const message = `Hi ${user.name}!<br/><br/>Welcome to Sell Your Business, Your are successfully Registered.<br>Here is the Identification Code you will need to help us recognize your identity.<br> Your Identification Code is: ${verification_code}`;

  await sendEmail({
    email: user.email,
    subject: "Register Successfully",
    message,
  });

  try {
    const token = user.getJwtToken();
    //sendToken(user, 200, res);
    res.status(200).json({
      success: true,
      message: `Verification Code sent to: ${user.email}`,
      token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  /*
    const token = user.getJwtToken();

    return res.status(201).json({
        success:true,
        token
    });*/
});

exports.verifyUser = catchAsyncErrors(async (req, res, next) => {
  const { verf_code, email } = req.body;

  const user = await User.findOne({
    verification_code: verf_code,
    email: email,
    delete: false,
  });

  if (!user || user.length < 1) {
    return next(new ErrorHandler("Invalid Code", 400));
  }

  user.verification_code_verified = true;
  user.verification_code = "";
  user.status = true;

  await user.save();

  let { token } = req.cookies;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    try {
      const token = user.getJwtToken();
      res.status(200).json({
        success: true,
        message: `Varified Scuessfully`,
        token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
  return res.status(201).json({
    success: true,
    message: "Varified Scuessfully",
    user,
  });
});

exports.verifyAppUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, verf_code } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email, delete: false }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email & Password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email & Password", 400));
  }

  if (user.verification_code != verf_code) {
    return next(new ErrorHandler("Invalid Verification Code", 400));
  }

  user.verification_code_verified = true;
  user.verification_code = "";
  user.status = true;

  await user.save();

  sendToken(user, 200, res);
});

// Add a user => /api/v1/register
exports.addUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phonenumber, createdAt, oldid } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    phonenumber,
    oldid,
    createdAt,
    avatar: {
      public_id: "avatar_ehqcee",
      url: "https://res.cloudinary.com/dvsvjzdee/image/upload/v1636458747/avatar_ehqcee.jpg",
    },
  });

  return res.status(201).json({
    success: true,
  });
});

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("Login Request");
  //console.log("Params : "+email);

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  const user = await User.findOne({ email, delete: false }).select("+password");
  let verification_code = Math.floor(Math.random() * 999999) % 100000;
  // return next(new ErrorHandler("Invalid Email & Password", 400));
  if (!user) {
    return next(new ErrorHandler("Invalid Email & Password", 400));
  }

  if (user.oldid && !user.status) {
    verification_code = getCode(user);
    user.verification_code_verified = false;
    user.status = false;
    await user.save();

    const message = `Hi ${user.name}!<br/><br/>Welcome to Sell Your Business, Here is the Identification Code you will need to help us recognize your identity.<br> Your Identification Code is: ${verification_code}`;

    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });

    return next(new ErrorHandler("Password Expired", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email & Password", 400));
  }

  if (!user.status) {
    verification_code = getCode(user);
    user.verification_code_verified = false;
    user.status = false;
    await user.save();

    const message = `Hi ${user.name}!<br/><br/>Welcome to Sell Your Business, Your are successfully Registered.<br>Here is the Identification Code you will need to help us recognize your identity.<br> Your Identification Code is: ${verification_code}`;

    await sendEmail({
      email: user.email,
      subject: "Register Successfully",
      message,
    });
    return next(
      new ErrorHandler("Please check you email for Verification", 403)
    );
  }

  sendToken(user, 200, res);
});

// Resend User => /api/v1/login
exports.resendCode = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  console.log("Resend Verification Code");

  // Checks if email and password is entered by user
  if (!email) {
    return next(new ErrorHandler("Please enter email", 400));
  }

  const user = await User.findOne({ email, delete: false });

  if (!user) {
    return next(new ErrorHandler("Invalid Email", 400));
  }
  let verification_code = getCode(user);

  const message = `Hi ${user.name}!<br/><br/>Welcome to Sell Your Business, <br>Here is the Identification Code you will need to help us recognize your identity.<br> Your Identification Code is: ${verification_code}`;

  await sendEmail({
    email: user.email,
    subject: "Resend Verification Code",
    message,
  });

  res.status(200).json({
    success: true,
    message: `Verification Code has send to : ${user.email}`,
  });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  console.log("Forgot Password Request");
  const user = await User.findOne({ email: req.body.email, delete: false });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  try {
    const verification_code = getCode(user);

    const message = `Hi ${user.name}!<br/>Your Identification Code is: ${verification_code} to reset Password`;

    await sendEmail({
      email: user.email,
      subject: "Forgot Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Verification Code has send to : ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  console.log("Reset Forgot Password");
  const { email, verf_code } = req.body;

  let user = await User.findOne({ email, delete: false });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  if (user.verification_code != verf_code) {
    return next(new ErrorHandler("Invalid Verification Code", 400));
  }

  // Hash URL token
  /*const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }*/

  /*if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }*/

  user.password = req.body.password;

  /*
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;*/
  user.verification_code = "";
  await user.save();

  sendToken(user, 200, res, "Password Reset Successfully");
});

exports.sendDeactivateCode = catchAsyncErrors(async (req, res, next) => {
  console.log("Deactivate");
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  try {
    const verification_code = getCode(user);
    console.log(verification_code);
    const message = `Hi ${user.name}!<br/>Your Verification Code is: ${verification_code} to delete account`;

    await sendEmail({
      email: user.email,
      subject: "Delete Account",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Verification Code has send to : ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.deactivateAccount = catchAsyncErrors(async (req, res, next) => {
  console.log("Deactivate Account");
  const user = await User.findByIdAndUpdate(req.user.id, { delete: true });
  user.fav_listing = [];
  user.save();
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.verification_code != req.body.code) {
    return next(new ErrorHandler("Invalid code", 404));
  }

  await List.updateMany(
    { user: user.id },
    { $set: { delete: true } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: `Account Deleted`,
  });
});

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Login Please", 400));
  }

  if (!req.user.status) {
    return next(new ErrorHandler("User not active", 400));
  }
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

exports.checkVersion = catchAsyncErrors(async (req, res, next) => {
  //Version Check
  res.status(200).json({
    success: true,
    message: "New update available",
    version: "1.0.1+15",
    android:
      "https://play.google.com/store/apps/details?id=com.saleyourbusiness.syb",
    ios: "#",
  });
});

exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id, delete: false });
  updateView(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

const updateView = async (id) => {
  const data = {
    visitAt: Date.now(),
  };
  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

// Update / Change password   => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id, delete: false }).select(
    "+password"
  );
  //console.log(req.body);
  //Checked Previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("Old password is Incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Update Profile   => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log(newUserData);
  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all Users   => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ delete: false });

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user Detail   => /api/v1/admin/user/:id
exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id, delete: false });

  if (!user) {
    return next(new ErrorHandler(`User does not found with id: ${req.params}`));
  }

  res.status(200).json({ user });
});

// Update user profile   => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  console.log(newUserData);
  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Update user profile   => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`, 400)
    );
  }

  // Remove avatar from couldinary avatar: TODO

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

// Logout user =>  /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  console.log("Request: Logout");
  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Access =>  /api/v1/access
exports.checkAccess = catchAsyncErrors(async (req, res, next) => {
  console.log("Request: Check Access");

  res.status(200).json({
    success: true,
    message: "Access Granted",
  });
});

exports.account = catchAsyncErrors(async (req, res, next) => {
  //console.log(req);

  const { token } = req.cookies;

  if (!token) {
    //return req
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }
  //console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: decoded.id, delete: false });

  /*
    res.status(200).json({
        success:true,
        user
    }); */
});

exports.getUserId = catchAsyncErrors(async (req, res, next) => {
  const data = await User.find({ oldid: req.params.oldid });

  if (!data) {
    return next(new ErrorHandler("User not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

exports.addUserFav = catchAsyncErrors(async (req, res, next) => {
  const listing_id = req.params.listing_id;

  if (!listing_id) {
    return next(new ErrorHandler("List not found", 400));
  }
  let user = req.user;
  if (!user) {
    return next(new ErrorHandler("Please Login", 400));
  }
  if (!user.fav_listing.includes(listing_id)) {
    user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { fav_listing: listing_id } },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    success: true,
    data: user.fav_listing,
  });
});

exports.removeUserFav = catchAsyncErrors(async (req, res, next) => {
  const listing_id = req.params.listing_id;
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $pull: { fav_listing: listing_id } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: user.fav_listing,
  });
});

exports.getUserFav = catchAsyncErrors(async (req, res, next) => {
  console.log("Favourite Request");
  const resPerPage = 10;
  let condition = {
    status: true,
    block: false,
    sold: false,
    _id: { $in: req.user.fav_listing },
  };

  count = await List.countDocuments(condition);

  const apiFeatures = new APIFeatures(
    List.find(condition)
      .populate("category", ["name", "slug"])
      .populate("sub_category", ["name", "slug"])
      .populate({
        path: "business_activities",
        select: "name",
      })
      .populate("country")
      .populate("state", "name")
      .populate("city", "name"),
    req.query
  )
    .search(["title", "company_name", "business_name"])
    .filter()
    .sort({ sort: 1, createdAt: -1 })
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  res.status(200).json({
    success: true,
    total: data.length,
    resPerPage,
    data,
  });
});

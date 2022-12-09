const List = require("../models/listing");
const User = require("../models/user");
const Query = require("../models/query");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

exports.getSummary = catchAsyncError(async (req, res, next) => {
  const total_listing = await List.countDocuments();
  const approved_listing = await List.find({ status: true }).countDocuments();
  const pending_listing = await List.find({ status: false }).countDocuments();
  const total_user = await User.find({ type: "user" }).countDocuments();
  const total_query = await Query.countDocuments();

  res.status(200).json({
    success: true,
    total_listing,
    approved_listing,
    pending_listing,
    total_user,
    total_query,
  });
});

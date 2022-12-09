const Activity = require("../models/activity");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

// Get Cities => /api/v1/ceties
exports.getActivities = catchAsyncError(async (req, res, next) => {
  let resPerPage = 500;

  if (req.query.resPerPage) {
    resPerPage = parseInt(req.query.resPerPage);
  }
  const count = await Activity.countDocuments();

  const apiFeatures = new APIFeatures(Activity.find(), req.query)
    .search()
    .filter()
    .search(["name"])
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  const countAPI = new APIFeatures(Activity.find(), req.query)
    .search()
    .filter()
    .search(["name"]);

  const totalCount = await countAPI.query;

  res.status(200).json({
    success: true,
    count: data.length,
    total: totalCount.length,
    resPerPage,
    data,
  });
});

// Create new City => /api/v1/city/new
exports.newActivity = catchAsyncError(async (req, res, next) => {
  const data = await Activity.create(req.body);

  res.status(200).json({
    success: true,
    data,
  });
});

// Get City => /api/v1/city/:id
exports.getActivity = catchAsyncError(async (req, res, next) => {
  const data = await Activity.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Activity not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// Update City => /api/v1/city/:id
exports.updateActivity = catchAsyncError(async (req, res, next) => {
  let data = await Activity.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Activity not found", 400));
  }

  data = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

// Delete City => /api/v1/city/:id
exports.deleteActivity = catchAsyncError(async (req, res, next) => {
  console.log("Request: Delete City");

  const data = await Activity.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Activity not found", 400));
  }

  await data.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Activity",
  });
});

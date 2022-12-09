const Query = require("../models/query");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

exports.getUserQueries = catchAsyncError(async (req, res, next) => {
  const resPerPage = 20;
  const count = await Query.countDocuments();
  const apiFeatures = new APIFeatures(
    Query.find({ user: req.user.id }).populate("list", "title"),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: data.length,
    total: count,
    data,
  });
});

// Get Contacts => /api/v1/states
exports.getQueries = catchAsyncError(async (req, res, next) => {
  const resPerPage = 20;
  const count = await Query.countDocuments();
  const apiFeatures = new APIFeatures(
    Query.find().populate("list", "title"),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: data.length,
    total: count,
    data,
  });
});

// Create new State => /api/v1/state/new
exports.newQuery = catchAsyncError(async (req, res, next) => {
  console.log("New Query Request");
  if (req.user) {
    req.body.user = req.user.id;
  }
  const data = await Query.create(req.body);

  res.status(200).json({
    success: true,
    data,
  });
});

// Get State => /api/v1/state/:id
exports.getQuery = catchAsyncError(async (req, res, next) => {
  console.log("Get Query Request");

  const data = await Query.findById(req.params.id).populate("list", "title");

  if (!data) {
    return next(new ErrorHandler("Query not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// Update State => /api/v1/state/:id
exports.updateQuery = catchAsyncError(async (req, res, next) => {
  let data = await Query.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Query not found", 400));
  }

  data = await Query.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("List", "title");

  res.status(200).json({
    success: true,
    data,
  });
});

// Delete State => /api/v1/state/:id
exports.deleteQuery = catchAsyncError(async (req, res, next) => {
  const data = await Query.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Query not found", 400));
  }

  await data.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Query",
  });
});

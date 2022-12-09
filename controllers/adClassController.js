const adClass = require("../models/adClass");
const Model = adClass;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

const formated = (object) => {
  return object;
};

const all = async (req) => {
  const resPerPage = 20;
  const count = await Model.countDocuments();
  const apiFeatures = new APIFeatures(Model.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const data = await apiFeatures.query;
  return {
    success: true,
    count: data.length,
    total: count,
    data,
  };
};

// Get Classs => /api/v1/Classs
exports.getAll = catchAsyncError(async (req, res, next) => {
  const data = await all(req);

  res.status(200).json(data);
});

// Create new Class => /api/v1/Class/new
exports.add = catchAsyncError(async (req, res, next) => {
  const data = await formated(Model.create(req.body));

  res.status(200).json({
    success: true,
    data,
  });
});

// Get Class => /api/v1/state/:id
exports.get = catchAsyncError(async (req, res, next) => {
  const data = await formated(Model.findById(req.params.id));

  if (!data) {
    return next(new ErrorHandler("Class not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// Update State => /api/v1/state/:id
exports.update = catchAsyncError(async (req, res, next) => {
  let data = await formated(Model.findById(req.params.id));

  if (!data) {
    return next(new ErrorHandler("Class not found", 400));
  }

  data = await formated(
    Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
  );

  res.status(200).json({
    success: true,
    data,
  });
});

// Delete State => /api/v1/state/:id
exports.remove = catchAsyncError(async (req, res, next) => {
  let data = await formated(Model.findById(req.params.id));

  if (!data) {
    return next(new ErrorHandler("Class not found", 400));
  }

  await data.deleteOne();

  data = await all(req);

  data = { message: "Ad Class Deleted Successfuly", ...data };
  res.status(200).json(data);
});

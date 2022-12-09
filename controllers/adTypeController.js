const adType = require("../models/adType");
const Model = adType;
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

const formated = (object) => {
  return object;
};

// Get Pages => /api/v1/pages
exports.getAll = catchAsyncError(async (req, res, next) => {
  const resPerPage = 20;
  const count = await Model.countDocuments();
  let tempModel;
  if (req.query.adPage) tempModel = Model.find({ page: req.query.adPage });
  else tempModel = Model.find();
  const apiFeatures = new APIFeatures(formated(tempModel), req.query)
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

// Create new Page => /api/v1/page/new
exports.add = catchAsyncError(async (req, res, next) => {
  let data = await Model.create(req.body);

  data = await formated(Model.find(data._id));

  res.status(200).json({
    success: true,
    data,
  });
});

// Get Page => /api/v1/state/:id
exports.get = catchAsyncError(async (req, res, next) => {
  const data = await formated(Model.findById(req.params.id));

  if (!data) {
    return next(new ErrorHandler("Page not found", 400));
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
    return next(new ErrorHandler("Page not found", 400));
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
  const data = await formated(Model.findById(req.params.id));

  if (!data) {
    return next(new ErrorHandler("Page not found", 400));
  }

  await data.deleteOne();

  res.status(200).json({
    success: true,
    message: "Deleted",
  });
});

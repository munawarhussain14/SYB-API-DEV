const property_type = require("../models/property_type");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

exports.getDashboardPropertyTypes = catchAsyncError(async (req, res, next) => {
  const resPerPage = 50;
  const count = await property_type.countDocuments();

  const apiFeatures = new APIFeatures(property_type.find(), req.query)
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

exports.getPropertyTypes = catchAsyncError(async (req, res, next) => {
  const resPerPage = 50;
  const count = await property_type.countDocuments();

  const apiFeatures = new APIFeatures(property_type.find(), req.query)
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

exports.newPropertyType = catchAsyncError(async (req, res, next) => {
  const row = await property_type.create(req.body);

  res.status(200).json({
    success: true,
    property_type: row,
  });
});

exports.getPropertyType = catchAsyncError(async (req, res, next) => {
  const row = await property_type.findById(req.params.id);

  if (!row) {
    return next(new ErrorHandler("Property Type not found", 400));
  }

  res.status(200).json({
    success: true,
    property_type: row,
  });
});

exports.updatePropertyType = catchAsyncError(async (req, res, next) => {
  let row = await property_type.findById(req.params.id);

  if (!row) {
    return next(new ErrorHandler("Property Type not found", 400));
  }

  row = await property_type.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    property_type: row,
  });
});

exports.deletePropertyType = catchAsyncError(async (req, res, next) => {
  const row = await property_type.findById(req.params.id);

  if (!row) {
    return next(new ErrorHandler("Property Type not found", 400));
  }

  await property_type.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Property Type",
  });
});

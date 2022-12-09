const Amenity = require("../models/amenity");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

exports.getAmenities = catchAsyncError(async (req, res, next) => {
  const resPerPage = 50;
  const count = await Amenity.countDocuments();

  const apiFeatures = new APIFeatures(Amenity.find(), req.query)
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

exports.newAmenity = catchAsyncError(async (req, res, next) => {
  const amenity = await Amenity.create(req.body);

  res.status(200).json({
    success: true,
    amenity,
  });
});

exports.getAmenity = catchAsyncError(async (req, res, next) => {
  const amenity = await Amenity.findById(req.params.id);

  if (!amenity) {
    return next(new ErrorHandler("Aminty not found", 400));
  }

  res.status(200).json({
    success: true,
    amenity,
  });
});

exports.updateAmenity = catchAsyncError(async (req, res, next) => {
  let amenity = await Amenity.findById(req.params.id);

  if (!amenity) {
    return next(new ErrorHandler("Amenity not found", 400));
  }

  amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    amenity,
  });
});

exports.deleteAmenity = catchAsyncError(async (req, res, next) => {
  const amenity = await Amenity.findById(req.params.id);

  if (!amenity) {
    return next(new ErrorHandler("Amenity not found", 400));
  }

  await amenity.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Amenity",
  });
});

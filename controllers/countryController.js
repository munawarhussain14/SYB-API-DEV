const Country = require("../models/country");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

// Get Countries => /api/v1/countries
exports.getCountries = catchAsyncError(async (req, res, next) => {
  console.log("Request: Get Countries");

  let resPerPage = 10;
  const countriesCount = await Country.countDocuments();

  if (req.query["resPerPage"]) {
    resPerPage = parseInt(req.query["resPerPage"]);
  }

  const apiFeatures = new APIFeatures(Country.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  res.status(200).json({
    success: true,
    resPerPage,
    count: data.length,
    total: countriesCount,
    data,
  });
});

// Create new Country => /api/v1/country/new
exports.newCountry = catchAsyncError(async (req, res, next) => {
  console.log("Request: New Country");

  const country = await Country.create(req.body);

  res.status(200).json({
    success: true,
    country,
  });
});

// Get Country => /api/v1/country/:id
exports.getCountry = catchAsyncError(async (req, res, next) => {
  console.log("Request: Get Country");

  const country = await Country.findById(req.params.id);

  if (!country) {
    return next(new ErrorHandler("Country not found", 400));
  }

  res.status(200).json({
    success: true,
    country,
  });
});

// Update Country => /api/v1/country/:id
exports.updateCountry = catchAsyncError(async (req, res, next) => {
  console.log("Request: Update Country");

  let country = await Country.findById(req.params.id);

  if (!country) {
    return next(new ErrorHandler("Country not found", 400));
  }

  country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    country,
  });
});

// Delete Country => /api/v1/country/:id
exports.deleteCountry = catchAsyncError(async (req, res, next) => {
  console.log("Request: Delete Country");

  const country = await Country.findById(req.params.id);

  if (!country) {
    return next(new ErrorHandler("Country not found", 400));
  }

  await country.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Country",
  });
});

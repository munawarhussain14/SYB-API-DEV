const package = require("../models/adPackage");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

const formatedProperty = (model) => {
  return model
    .populate({ path: "country" })
    .populate({ path: "adClass" })
    .populate({ path: "adType" });
};

const allPackages = async (req) => {
  const resPerPage = 50;
  const count = await package.countDocuments();
  const temp = req.query;
  let params = {};
  if (temp["adClass"]) {
    params = { adClass: temp.adPage };
  }

  if (temp["type"]) {
    params = { type: temp.type, ...params };
  }

  if (temp["country"]) {
    params = { country: temp.country, ...params };
  }

  const apiFeatures = new APIFeatures(
    formatedProperty(package.find(params)),
    req.query
  )
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

exports.getPackages = catchAsyncError(async (req, res, next) => {
  const data = await allPackages(req);
  res.status(200).json(data);
});

exports.newPackage = catchAsyncError(async (req, res, next) => {
  console.log("New Package");
  console.log(req.body["country"]);
  if (req.body["country"]["_id"]) {
    req.body["country"] = req.body["country"]["_id"];
  } else {
    req.body["country"] = req.body["country"];
  }

  let row = await package.create(req.body);

  row = await formatedProperty(package.find(row._id));

  res.status(200).json({
    success: true,
    package: row,
  });
});

exports.getPackage = catchAsyncError(async (req, res, next) => {
  const row = await formatedProperty(package.findById(req.params.id));
  if (!row) {
    return next(new ErrorHandler("Package not found", 400));
  }

  res.status(200).json({
    success: true,
    package: row,
  });
});

exports.updatePackage = catchAsyncError(async (req, res, next) => {
  let row = await formatedProperty(package.findById(req.params.id));

  if (!row) {
    return next(new ErrorHandler("Package not found", 400));
  }

  row = await formatedProperty(
    package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
  );

  res.status(200).json({
    success: true,
    package: row,
  });
});

exports.deletePackage = catchAsyncError(async (req, res, next) => {
  const row = await formatedProperty(package.findById(req.params.id));

  if (!row) {
    return next(new ErrorHandler("Package not found", 400));
  }

  await package.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Package",
  });
});

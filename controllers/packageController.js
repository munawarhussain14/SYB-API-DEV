const listPackage = require("../models/package");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

const formatedProperty = (model) => {
  return model.populate({ path: "country" });
};

const allpackages = async (req) => {
  
  let resPerPage = 10;
  const count = await listPackage.countDocuments();

  if(req.query.page==0){
    resPerPage = 500;
    req.query.page = 1;
  }

  const apiFeatures = new APIFeatures(
    formatedProperty(listPackage.find()),
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
  const data = await allpackages(req);
  res.status(200).json(data);
});

exports.getAppPackages = catchAsyncError(async (req, res, next) => {
  const featured = await formatedProperty(
    listPackage.find({
      special: false,
      type: req.params.type,
    })
  );
  const special = await formatedProperty(
    listPackage.find({ special: true, type: req.params.type })
  );

  res.status(200).json({
    success: true,
    business: {
      featured,
      special,
    },
  });
});

exports.newPackage = catchAsyncError(async (req, res, next) => {
  req.body["country"] = req.body["country"]["_id"];
  req.body["currency"] = req.body["country"]["currency"];
  let row = await listPackage.create(req.body);

  row = await formatedProperty(listPackage.find(row._id));

  res.status(200).json({
    success: true,
    package: row,
  });
});

exports.getPackage = catchAsyncError(async (req, res, next) => {
  const row = await formatedProperty(listPackage.findById(req.params.id));
  if (!row) {
    return next(new ErrorHandler("Package not found", 400));
  }

  res.status(200).json({
    success: true,
    package: row,
  });
});

exports.updatePackage = catchAsyncError(async (req, res, next) => {
  let row = await formatedProperty(listPackage.findById(req.params.id));

  if (!row) {
    return next(new ErrorHandler("Package not found", 400));
  }

  req.body["currency"] = req.body["country"]["currency"];
  req.body["country"] = req.body["country"]["_id"];

  row = await listPackage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    package: row,
  });
});

exports.deletePackage = catchAsyncError(async (req, res, next) => {
  const row = await formatedProperty(listPackage.findById(req.params.id));
  //console.log("Package ID : ",req.params.id);
  //console.log(row);

  if (!row) {
    return next(new ErrorHandler("Package not found", 400));
  }

  await row.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Package"
  });
});

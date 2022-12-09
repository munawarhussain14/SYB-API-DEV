const property = require("../models/property");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
var formidable = require("formidable");

/**********************Public Request Method Start*****************************/

const formatedProperty = (model) => {
  return model
    .populate({ path: "location.country", select: "name" })
    .populate({ path: "location.state", select: "name" })
    .populate({ path: "location.city", select: "name" })
    .populate("property_type", "name")
    .populate("amenities", "name");
};

exports.getProperties = catchAsyncError(async (req, res, next) => {
  const resPerPage = 50;
  const count = await property.countDocuments();
  const query = formatedProperty(property.find());
  const apiFeatures = new APIFeatures(query, req.query)
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

exports.newProperty = catchAsyncError(async (req, res, next) => {
  /*if (req.body["property_type"]) {
    let property_type = JSON.parse(req.body["property_type"]);
    let type = typeof property_type;
    if (type == "object") {
      req.body["property_type"] = property_type["_id"];
    }
  }*/
  //console.log(req.body);
  //return next(new ErrorHandler("Property not found", 400));
  let row = await property.create(req.body);
  const query = formatedProperty(property.findById(row["_id"]));
  row = await query;

  res.status(200).json({
    success: true,
    property: row,
  });
});

exports.getProperty = catchAsyncError(async (req, res, next) => {
  const query = formatedProperty(property.findById(req.params.id));
  const row = await query;

  if (!row) {
    return next(new ErrorHandler("Property not found", 400));
  }

  res.status(200).json({
    success: true,
    property: row,
  });
});

exports.updateProperty = catchAsyncError(async (req, res, next) => {
  const query = formatedProperty(property.findById(req.params.id));
  let row = await query;

  if (!row) {
    return next(new ErrorHandler("Property not found", 400));
  }

  row = await formatedProperty(
    property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
  );

  res.status(200).json({
    success: true,
    property: row,
  });
});

exports.uploadImage = catchAsyncError(async (req, res, next) => {
  console.log("Image Upload Request");

  const data = await property.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler("Property not found", 400));
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "real_estate_gallery",
  });
  await data.updateOne({
    $push: {
      images: {
        public_id: result["public_id"],
        url: result["url"],
      },
    },
  });

  await data.updateOne({ images_status: true });
  /*if (data.images.length == 5) {
  }*/

  const row = await property.findById(req.params.id);

  res.status(200).json({
    success: true,
    property: row,
  });

  if (!data) {
    return next(new ErrorHandler("Property not found", 400));
  }
});

// Upload Image => /api/v1/list/upload/:id
exports.deleteImage = catchAsyncError(async (req, res, next) => {
  console.log("Image Delete Request");

  const query = formatedProperty(property.findById(req.params.id));
  let data = await query;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const image = data.images.id(req.body.image_id);

  const result = await cloudinary.uploader.destroy(
    image.public_id,
    function (error, result) {
      //console.log(result, error);
    }
  );

  if (result["result"] == "ok") {
    const deleteImage = data.images.id(req.body.image_id).remove();
    data.save();
    data = await package.findById(req.params.id);
  }

  if (data.images.length == 0) {
    await data.updateOne({ images_status: false });
  }

  res.status(200).json({
    success: true,
    data,
  });

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }
});

exports.deleteProperty = catchAsyncError(async (req, res, next) => {
  const row = await property.findById(req.params.id);

  if (!row) {
    return next(new ErrorHandler("Property not found", 400));
  }

  await property.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Property",
  });
});
/***************************Public Request Method End*****************************/

/**********************Admin and User Request Method Start***************************/
/**********************Admin and User Request Method End*****************************/

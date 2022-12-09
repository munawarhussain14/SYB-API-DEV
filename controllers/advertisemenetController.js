const advertisement = require("../models/advertisement");
const AdType = require("../models/adType");
const AdPackage = require("../models/adPackage");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");
require("dotenv").config();
const sizeOf = require("image-size");
const adPackage = require("../models/adPackage");
const adClass = require("../models/adClass");
const adType = require("../models/adType");

const cloudinary = require("cloudinary").v2;

const formatedProperty = (model) => {
  return model
    .populate({ path: "user" })
    .populate({ path: "category" })
    .populate({
      path: "adPackage",
      populate: [{ path: "adClass" }, { path: "adType" }, { path: "country" }],
    })
    .populate({ path: "country" });
};

const uploadImage = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.uploader.upload(file, {
    folder: "advertisements",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  });

  return result;
};

const deleteImage = async (public_id) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.uploader.destroy(
    public_id,
    function (error, result) {
      //console.log(result, error);
    }
  );
};

const getAd = async (page, type) => {
  if (page == "home") {
    page = "6255c1ddddb8aacc22e901f1";
  } else if (page == "detail") {
    page = "6255c1f0ddb8aacc22e901fd";
  } else if (page == "listing") {
    page = "6255c1e7ddb8aacc22e901f7";
  }

  let adtype = await AdType.findOne({ name: type });

  let interstitial = await formatedProperty(
    advertisement.find({
      enable: true,
      page: page,
      status: "Published",
      expireAt: { $gte: new Date().toISOString() },
      type: adtype._id,
    })
  );

  if (interstitial.length > 0) interstitial = interstitial[0];
  else interstitial = {};

  if (type == "Interstitial") {
    return { interstitial };
  }

  const slides = await formatedProperty(
    advertisement.find({
      enable: true,
      status: "Published",
      page: page,
      expireAt: { $gte: new Date().toISOString() },
      type: adtype._id,
    })
  );
  if (type == "Slide") {
    return { slides };
  }
  const banners = await formatedProperty(
    advertisement.find({
      enable: true,
      status: "Published",
      page: page,
      expireAt: { $gte: new Date().toISOString() },
      type: adtype._id,
    })
  );

  if (type == "Banner") {
    return { banners };
  }

  //return { interstitial, slides, banners };
};

exports.getAd;

exports.checkAdvertisements = catchAsyncError(async (req, res, next) => {
  const result = await getAd(req.params.page, req.params.type);
  res.status(200).json(result);
});

exports.viewAdvertisement = catchAsyncError(async (req, res, next) => {
  const ad = await advertisement.findById(req.params.id);
  let count = ad.clicked;
  count++;
  row = await advertisement.findByIdAndUpdate(
    req.params.id,
    { clicked: count },
    {
      new: true,
      runValidators: true,
    }
  );

  res.redirect(ad.redirect);
});

exports.requestAd = catchAsyncError(async (req, res, next) => {
  if (
    req.params.platform != "Both" &&
    req.params.platform != "Web" &&
    req.params.platform != "Mobile"
  ) {
    return next(new ErrorHandler(`Invalid Platform`, 400));
  }

  if (!req.params.class) {
    return next(new ErrorHandler(`Invalid Ad Class`, 400));
  }

  if (!req.params.type) {
    return next(new ErrorHandler(`Invalid Ad Type`, 400));
  }

  const adclasses = await adClass.find({
    name: req.params.class,
    platform: { $in: ["Both", req.params.platform] },
  });

  const adtypes = await adType.find({ name: req.params.type });
  const packages = await adPackage.find({
    adClass: { $in: adclasses },
    adType: { $in: adtypes },
  });

  let condition = {
    adPackage: { $in: packages },
    status: "Published",
    expireAt: { $gte: new Date().toISOString() },
    enable: true,
  };

  if (req.query.category) {
    condition = { category: req.query.category, ...condition };
  }
  const data = await formatedProperty(advertisement.find(condition));

  res.status(200).json({
    success: true,
    data,
  });
});

const allAdvertisements = async (req) => {
  const resPerPage = 50;
  const count = await advertisement.countDocuments();

  let request;
  if (req.user && req.user.role == "user") {
    request = advertisement.find({ user: req.user.id });
  } else {
    request = advertisement.find();
  }

  const apiFeatures = new APIFeatures(formatedProperty(request), req.query)
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

exports.clickedAdvertisements = catchAsyncError(async (req, res, next) => {});

exports.getAdvertisements = catchAsyncError(async (req, res, next) => {
  console.log("Request for the Advertisements");
  const data = await allAdvertisements(req);
  res.status(200).json(data);
});

exports.newAdvertisement = catchAsyncError(async (req, res, next) => {
  const requestDesign = req.body.requestDesign;
  let data;
  if (!requestDesign) {
    const adPackage = await AdPackage.findById(req.body.adPackage)
      .populate({ path: "adClass" })
      .populate({ path: "adType" });
    console.log("==================");
    console.log(req.file);
    const { height, width } = sizeOf(req.file.path);

    const requiredHeight = adPackage.adType.size.height;
    const requiredWidth = adPackage.adType.size.width;
    if (height != requiredHeight || width != requiredWidth) {
      return next(
        new ErrorHandler(
          `Invalid size, ${requiredWidth}x${requiredHeight} required`,
          400
        )
      );
    }
    const result = await uploadImage(req.file.path, {
      folder: "advertisements",
    });

    data = {
      ...req.body,
      image: {
        public_id: result["public_id"],
        url: result["url"],
      },
    };
  } else {
    data = {
      ...req.body,
    };
  }

  let row = await advertisement.create(data);

  row = await formatedProperty(advertisement.findById(row._id));

  res.status(200).json({
    success: true,
    advertisement: row,
  });
});

exports.getAdvertisement = catchAsyncError(async (req, res, next) => {
  const row = await formatedProperty(advertisement.findById(req.params.id));

  if (!row) {
    return next(new ErrorHandler("Advertisment not found", 400));
  }

  res.status(200).json({
    success: true,
    advertisement: row,
  });
});

exports.getPackageAdvertisement = catchAsyncError(async (req, res, next) => {
  const data = await advertisement.findOne({
    adPackage: req.params.id,
    enable: true,
  });

  if (!data) {
    return next(new ErrorHandler("Ad not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

exports.updateAdvertisement = catchAsyncError(async (req, res, next) => {
  let row = await formatedProperty(advertisement.findById(req.params.id));

  if (!row) {
    return next(new ErrorHandler("Advertisment not found", 400));
  }

  const adPackage = await AdPackage.findById(row.adPackage.id)
    .populate({ path: "adClass" })
    .populate({ path: "adType" });

  if (req.file) {
    const { height, width } = sizeOf(req.file.path);

    const requiredHeight = adPackage.adType.size.height;
    const requiredWidth = adPackage.adType.size.width;
    if (height != requiredHeight || width != requiredWidth) {
      return next(
        new ErrorHandler(
          `Invalid size, ${requiredWidth}x${requiredHeight} required`,
          400
        )
      );
    }
  }

  let data = {
    ...req.body,
  };

  if (req.file) {
    if (row.image.public_id) await deleteImage(row.image.public_id);
    const result = await uploadImage(req.file.path);
    data["image"] = {
      public_id: result["public_id"],
      url: result["url"],
    };
  }

  row = await advertisement.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  row = await formatedProperty(advertisement.findById(req.params.id));

  res.status(200).json({
    success: true,
    advertisement: row,
  });
});

exports.deleteAdvertisement = catchAsyncError(async (req, res, next) => {
  const row = await formatedProperty(advertisement.findById(req.params.id));

  if (!row) {
    return next(new ErrorHandler("Advertisment not found", 400));
  }

  if (row.image.public_id) await deleteImage(row.image.public_id);

  await advertisement.deleteOne();

  let data = await allAdvertisements(req);

  res.status(200).json({
    message: "Delete Advertisment Type",
    ...data,
  });
});

exports.postAdvertisement = catchAsyncError(async (req, res, next) => {
  req.body["country"] = "618d5e3b5ecd8e7644866cc5";
  let data;
  if (req.file) {
    const result = await uploadImage(req.file.path);

    data = {
      ...req.body,
      user: req.user.id,
      image: {
        public_id: result["public_id"],
        url: result["url"],
      },
    };
  } else if (req.body.image) {
    const result = await uploadImage(req.body.image);
    data = {
      ...req.body,
      user: req.user.id,
      image: {
        public_id: result["public_id"],
        url: result["url"],
      },
    };
  } else {
    data = {
      ...req.body,
      user: req.user.id,
    };
  }

  let row = await advertisement.create(data);

  row = await formatedProperty(advertisement.findById(row._id));

  res.status(200).json({
    success: true,
    advertisement: row,
  });
});

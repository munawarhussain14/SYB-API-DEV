const List = require("../models/listing");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");
const CleanFilter = require("../utils/clearFilter");
const { getAd } = require("../controllers/advertisemenetController");
require("dotenv").config();
const sendEmail = require("../utils/sendEmail");
const axios = require("axios");

const cloudinary = require("cloudinary").v2;
var formidable = require("formidable");
const Package = require("../models/package");

// Upload Image => /api/v1/list/upload/:id
exports.uploadImage = catchAsyncError(async (req, res, next) => {
  console.log("Image Upload Request");

  const data = await List.findById(req.params.id);

  if (data.images == 6) {
    return next(new ErrorHandler("Images limit reach", 400));
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  // console.log(req.body.file.path);
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "listing_gallery",
  });
  await data.updateOne({
    $push: {
      images: {
        public_id: result["public_id"],
        url: result["url"],
      },
    },
  });

  await data.updateOne({ status: false, images_status: true });
  /*if (data.images.length == 5) {
  }*/

  res.status(200).json({
    success: true,
  });

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }
});

// Upload Image => /api/v1/list/upload/:id
exports.uploadCropImage = catchAsyncError(async (req, res, next) => {
  console.log("Upload Croped Image");
  let data = await List.findById(req.params.id);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const image = data.images.id(req.params.image_id);
  console.log(image.public_id);
  let result = await cloudinary.uploader.destroy(
    image.public_id,
    function (error, result) {
      console.log(result, error);
    }
  );

  if (result["result"] == "ok") {
    console.log(result);
  }

  const deleteImage = await data.images.id(req.params.image_id).remove();
  data.save();
  data = await List.findById(req.params.id);

  result = await cloudinary.uploader.upload(req.body.file, {
    folder: "listing_gallery",
  });
  await data.updateOne({
    $push: {
      images: {
        public_id: result["public_id"],
        url: result["url"],
      },
    },
  });

  data = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("country")
    .populate("state", "name")
    .populate("city", "name");

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// Upload Image => /api/v1/list/upload/:id
exports.deleteImage = catchAsyncError(async (req, res, next) => {
  console.log("Image Delete Request");

  let data = await List.findById(req.params.id);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const image = data.images.id(req.body.image_id);
  console.log(image.public_id);
  const result = await cloudinary.uploader.destroy(
    image.public_id,
    function (error, result) {
      console.log(result, error);
    }
  );

  if (result["result"] == "ok") {
    const deleteImage = data.images.id(req.body.image_id).remove();
    data.save();
    data = await List.findById(req.params.id);
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

// Upload Image => /api/v1/list/upload/:id
exports.uploadAdminImage = catchAsyncError(async (req, res, next) => {
  console.log("Admin Image Upload Request");

  let data = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("country")
    .populate("state", "name")
    .populate("city", "name");

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.uploader.upload(req.body.file, {
    folder: "listing_gallery",
  });

  await data.updateOne({
    status: false,
    $push: {
      images: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    },
  });

  await data.updateOne({ status: false, images_status: true });

  if (data.images.length == 5) {
  }

  const updatedData = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");

  res.status(200).json({
    success: true,
    data: updatedData,
  });

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }
});

exports.deleteAdminImage = catchAsyncError(async (req, res, next) => {
  let data = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const image = data.images.id(req.params.image_id);
  console.log(image);
  const result = await cloudinary.uploader.destroy(
    image.public_id,
    function (error, result) {
      console.log(result, error);
    }
  );

  const deleteImage = data.images.id(req.params.image_id).remove();
  data.save();

  if (result["result"] == "ok") {
    console.log("Step1");
  }

  if (data.images && data.images.length == 0) {
    await data.updateOne({ images_status: false });
  }
  console.log("Step2");

  const updatedData = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");

  res.status(200).json({
    success: true,
    data,
  });

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }
});

const allList = async (req, fav_list = null) => {
  //await List.updateMany({}, { delete: false }, { multi: true });
  let resPerPage = 10;

  if (req.query["resPerPage"]) {
    resPerPage = parseInt(req.query.resPerPage);
  }

  let condition = {
    status: true,
    block: false,
    sold: false,
    delete: false,
  };

  if (fav_list) {
    condition = { ...condition, _id: { $in: fav_list } };
  }
  console.log(condition);
  count = await List.countDocuments(condition);
  /*
  await List.updateMany({}, { $set: { sort: 3 } }, { multi: true });

    await List.updateMany(
      { "package.package_name": "syb_special" },
      { $set: { sort: 1 } },
      { multi: true }
    );

    await List.updateMany(
      { "package.package_name": "featured" },
      { $set: { sort: 2 } },
      { multi: true }
    );
*/
  /* { status: true } */
  //await List.updateMany({ block: false });
  const apiFeatures = new APIFeatures(
    List.find(condition)
      .populate("category", ["name", "slug"])
      .populate("sub_category", ["name", "slug"])
      .populate({
        path: "business_activities",
        select: "name",
      })
      .populate("country")
      .populate("state", "name")
      .populate("city", "name"),
    req.query
  )
    .search(["title", "company_name", "business_name"])
    .filter()
    .sort({ sort: 1, createdAt: -1 })
    .pagination(resPerPage);

  const totalListisng = new APIFeatures(
    List.find(condition)
      .populate("category", ["name", "slug"])
      .populate("sub_category", ["name", "slug"])
      .populate({
        path: "business_activities",
        select: "name",
      })
      .populate("country")
      .populate("state", "name")
      .populate("city", "name"),
    req.query
  )
    .search(["title", "company_name", "business_name"])
    .filter()
    .sort({ sort: 1, createdAt: -1 });

  const countTotal = await totalListisng.query;
  const data = await apiFeatures.query;
  return {
    success: true,
    count: data.length,
    total: countTotal.length,
    resPerPage,
    data,
  };
};

// Get States => /api/v1/states
exports.getLists = catchAsyncError(async (req, res, next) => {
  const data = await allList(req);
  res.status(200).json(data);
});

exports.getFavLists = catchAsyncError(async (req, res, next) => {
  const data = await allList(req, req.user.fav_listing);
  res.status(200).json(data);
});

//gethomepagefeatured
exports.getMainFeatured = catchAsyncError(async (req, res, next) => {
  let package_name = req.params.package_name.toString();

  let set_limit = req.query.listlimit;
  if (!set_limit) {
    set_limit = 6;
  }
  const data = await List.find({
    "package.package_name": package_name,
    status: true,
  })
    .populate("category", ["name", "slug"])
    .populate("sub_category", ["name", "slug"])
    .populate("state", "name")
    .limit(parseInt(set_limit));

  if (!data) {
    return next(new ErrorHandler("Lists not found", 400));
  }

  //    const data1=set_limit;
  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

// Get States => /api/v1/states
exports.getUserLists = catchAsyncError(async (req, res, next) => {
  const resPerPage = 10;
  let condition1 = { user: req.user.id, delete: false };
  let condition2 = {};
  if (req.query.type) {
    const type = req.query.type;
    if (type == "uncompleted") {
      condition2 = {
        $or: [
          { init_info_status: false },
          { basic_info_status: false },
          { finance_status: false },
          { images_status: false },
          { package_status: false },
          { real_estate_status: false },
          { init_info_status: { $exists: false } },
          { basic_info_status: { $exists: false } },
          { finance_status: { $exists: false } },
          { images_status: { $exists: false } },
          { package_status: { $exists: false } },
          { real_estate_status: { $exists: false } },
        ],
      };
    }

    if (type == "pending") {
      condition2 = {
        $and: [
          { status: false },
          { init_info_status: true },
          { basic_info_status: true },
          { finance_status: true },
          { images_status: true },
          { package_status: true },
          { real_estate_status: true },
        ],
      };
    }
    if (type == "active") {
      condition2 = { status: true };
    }
  }

  let condition = { $and: [condition1, condition2] };

  const count = await List.countDocuments(condition);
  const apiFeatures = new APIFeatures(
    List.find(condition)
      .populate("category", "name")
      .populate("sub_category", "name")
      .populate({
        path: "business_activities",
        select: "name",
      })
      .populate("country")
      .populate("state", "name")
      .populate("city", "name"),
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
    resPerPage,
    data,
  });
});

const getSYBListID = async () => {
  let count = await List.countDocuments();
  count++;
  console.log(count);
  let list_id = "SYB_" + count;
  let list = await List.findOne({ list_id: list_id });

  while (list) {
    count++;
    list_id = "SYB_" + count;
    list = await List.findOne({ list_id: list_id });
    console.log(list_id);
  }
  return list_id;
};

// Create new State => /api/v1/state/new
exports.newList = catchAsyncError(async (req, res, next) => {
  let { package_status } = req.body;
  //  console.log(req.body);

  if (package_status) {
    var start_date = new Date();
    var datetime = new Date();
    var expiry_date = new Date();
    expiry_date.setDate(datetime.getDate() + 30);
    console.log(req.body);
    req.body["package"] = {
      package_title: "Free",
      payment_status: true,
      package_price: 0,
      package_date: start_date,
      package_expiry_date: expiry_date,
      package_name: "Free",
      untilSold: false,
      special: false,
      featured: false,
      verified: true,
    };
  }

  const getData = await List.find();
  const list_id = await getSYBListID();
  req.body.list_id = list_id;
  req.body.user = req.user.id;
  let title = req.body.title;
  req.body["slug"] = title.toLowerCase().replace(" ", "-");
  req.body["sort"] = 3;
  const data = await List.create(req.body);

  res.status(200).json({
    success: true,
    data,
  });
});

// Get State => /api/v1/state/:id
exports.getList = catchAsyncError(async (req, res, next) => {
  console.log("Get List Request");
  const data = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
    free:true
  });
});

// Update State => /api/v1/state/:id
exports.updateList = catchAsyncError(async (req, res, next) => {
  let data = await List.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }

  if (!req.body.status) req.body.status = false;

  data = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");
  console.log("Requested");

  //console.log(data.sub_category);
  if (req.body.category && !req.body.sub_category && data.sub_category) {
    await data.updateOne({ $pull: { sub_category: data.sub_category._id } });
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// Delete State => /api/v1/state/:id
exports.deleteList = catchAsyncError(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(new ErrorHandler("List not found", 400));
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const images = list.images;

  images.forEach(async (image) => {
    await cloudinary.uploader.destroy(
      image.public_id,
      function (error, result) {}
    );
  });

  await list.deleteOne();
  const data = await allList(req);

  res.status(200).json({
    message: "Delete List",
    ...data,
  });
});

// Get States => /api/v1/states
exports.getAdminLists = catchAsyncError(async (req, res, next) => {
  //const count = await List.countDocuments();
  const resPerPage = 10;

  let condition = {};
  if (req.query.type) {
    const type = req.query.type;
    if (type == "uncompleted") {
      condition = {
        $or: [
          { init_info_status: false },
          { basic_info_status: false },
          { finance_status: false },
          { images_status: false },
          { package_status: false },
          { real_estate_status: false },
          { init_info_status: { $exists: false } },
          { basic_info_status: { $exists: false } },
          { finance_status: { $exists: false } },
          { images_status: { $exists: false } },
          { package_status: { $exists: false } },
          { real_estate_status: { $exists: false } },
        ],
      };
    }

    if (type == "not-approved") {
      condition = {
        $and: [
          { status: false },
          { init_info_status: true },
          { basic_info_status: true },
          { finance_status: true },
          { images_status: true },
          { package_status: true },
          { real_estate_status: true },
        ],
      };
    }
    if (type == "approved") {
      condition = { status: true };
    }

    if (type == "no-image") {
      condition = { images_status: false };
    }
  }

  const filter_condition = await CleanFilter(req.query, [
    "title",
    "company_name",
    "business_name",
  ]);
  const final_condition = { $and: [filter_condition, condition] };
  const count = await List.countDocuments(final_condition);

  // console.log(final_condition);
  const apiFeatures = new APIFeatures(
    List.find(final_condition)
      .populate("category", "name")
      .populate("sub_category", "name")
      .populate({
        path: "business_activities",
        select: "name",
      })
      .populate("country")
      .populate({
        path: "user",
        select: ["name", "email", "phonenumber"],
      })
      .populate("state", "name")
      .populate("city", "name"),
    req.query
  )
    .search(["title", "company_name", "business_name"])
    .filter()
    .sort({ createdAt: -1 })
    .pagination(resPerPage);

  const lists = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: lists.length,
    total: count,
    resPerPage,
    lists,
  });
});

// Update State => /api/v1/state/:id
exports.updateAdminList = catchAsyncError(async (req, res, next) => {
  console.log("Admin Update Request");

  let data = await List.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }
  req.body["sort"] = 3;
  const package = req.body["package"];
  if (package) {
    if (package["package_name"] === "syb_special") {
      req.body["sort"] = 1;
    } else if (package["package_name"] === "featured") {
      req.body["sort"] = 2;
    }
  }

  if (req.body.request == "MarkAsPaid") {
    let pkg = req.body.paymentPackage;

    let datetime = new Date();
    let expiry_date = new Date();
    if (!pkg.untilSold) {
      expiry_date.setDate(expiry_date.getDate() + parseInt(pkg.duration));
    }else{
      expiry_date = null;
    }
    req.body = {
      package: {
        currency: "AED",
        package_title: pkg.package_name,
        payment_status: true,
        package_price: pkg.package_price,
        package_date: datetime,
        package_expiry_date: expiry_date,
        package_name: pkg.package_name,
        untilSold: pkg.untilSold,
        special: pkg.special,
        featured: pkg.featured,
        payment_source: pkg.payment_source,
        verified: true,
      },
    };
  }

  if (!req.body.status) {
    req.body.status = false;
  } /*else if (req.body.status) {
    const message = `Hi ${user.name}!<br/><br/>Dear `;

    await sendEmail({
      email: user.email,
      subject: "Listing Approved",
      message,
    });
  }*/

  data = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");

  /*if (!req.body.sub_category && data.sub_category) {
    await data.updateOne({ $pull: { sub_category: data.sub_category._id } });
  }*/

  res.status(200).json({
    success: true,
    data,
  });
});

// Get State => /api/v1/state/:id
exports.getAdminList = catchAsyncError(async (req, res, next) => {
  console.log("Get Admin List Request");
  // await List.deleteMany();
  let data = await List.findById(req.params.id)
    .populate("category", "name")
    .populate("sub_category", "name")
    .populate("country")
    .populate({
      path: "business_activities",
      select: "name",
    })
    .populate("state", "name")
    .populate("city", "name");

  // await List.updateMany(
  //   { status: true, "package.ref": { $exists: false } },
  //   { $set: { "package.payment_status": true } },
  //   { multi: true }
  // );

  if (
    !data.package.payment_status &&
    data.package.ref &&
    !data.package.verified
  ) {
    console.log("Test");
    await postVerifyPayment(req.params.id);

    data = await List.findById(req.params.id)
      .populate("category", "name")
      .populate("sub_category", "name")
      .populate("country")
      .populate({
        path: "business_activities",
        select: "name",
      })
      .populate("state", "name")
      .populate("city", "name");
  }

  if (!data) {
    return next(new ErrorHandler("List not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

const postVerifyPayment = async (list_id) => {
  console.log("Post Verify Payment");
  const list = await List.findById(list_id);
  let package;
  if (list.package.package_id) {
    package = await Package.findById(list.package.package_id).populate({
      path: "country",
    });
    //return next(new ErrorHandler("Package not found", 400));
  }
  const { payment_status, ref } = { ...list.package };

  var FormData = require("form-data");
  var data = new FormData();
  data.append("ivp_method", "check");
  data.append("ivp_store", process.env.PAY_STORE_ID);
  data.append("ivp_authkey", process.env.PAY_AUTH_KEY);
  data.append("order_ref", ref);

  var config = {
    method: "post",
    url: "https://secure.telr.com/gateway/order.json",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  let sort = 3;

  let message;
  await axios(config)
    .then(async (response) => {
      const server_response = response.data;

      console.log("Axios Request");
      console.log(server_response);

      if (server_response.order) {
        const { amount, description, status } = server_response.order;
        var start_date = new Date();
        var datetime = new Date();
        var expiry_date;
        //TODO: Update ref in Selected List
        //console.log(parseInt(amount));

        if (!package) {
          package = await Package.findOne({
            $or: [{ price: amount }, { discount: amount }],
          }).populate({
            path: "country",
          });
        }

        if (status.code == 3) {
          let package_name = "free";
          let package_title = package.name;
          sort = 3;
          if (package.special) {
            package_name = "syb_special";
            sort = 1;
          } else {
            package_name = "featured";
            sort = 2;
          }

          if (package.untilSold) {
            expiry_date = null;
          } else {
            expiry_date = datetime.setDate(
              datetime.getDate() + package.duration
            );
          }
          let currency = package.country.currency;
          let current_list = await List.findByIdAndUpdate(list_id, {
            package_status: true,
            sort,
            package: {
              currency: currency,
              package_title: package_title,
              payment_status: true,
              package_price: amount,
              package_date: start_date,
              package_expiry_date: expiry_date,
              package_name: package_name,
              untilSold: package.untilSold,
              special: package.special,
              featured: package.featured,
              ref: ref,
              verified: true,
            },
          });

          message = "Order Successfully";

          return {
            success: true,
            message: "Payment successfully verified",
            //data: current_list,
          };
          //outputPage(res, "success", platform);
          return;
        } else {
          console.log("Error After received response");
          return {
            success: true,
            message: "Payment not verify",
          };
          //outputPage(res, "error", platform);
          return;
        }
      } else if (server_response.error) {
        message = server_response.error.message;
        console.log("Error After received response", message);
        return {
          success: true,
          message: "Payment not verify",
        };
        //outputPage(res, "error", platform);
        return;
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log("Error After received response", error);
      return {
        success: true,
        message: "Payment not verify",
      };
      //outputPage(res, "error", platform);
      return;
    });

  if (!payment_status && ref) {
    //TODO: Check status of order
  }
};

const Category = require("../models/category");
const List = require("../models/listing");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");

// Get Cities => /api/v1/ceties
exports.getSubCategories = catchAsyncError(async (req, res, next) => {
  const data = await Category.find({ parent: req.params.parent });

  res.status(200).json({
    success: true,
    data,
  });
});

// Get Cities => /api/v1/ceties
exports.getMainCategories = catchAsyncError(async (req, res, next) => {
  const data = await Category.find({ parent: null });

  res.status(200).json({
    success: true,
    data,
  });
});

// Get Cities => /api/v1/ceties
exports.getHomeCategories = catchAsyncError(async (req, res, next) => {
  const data = await List.aggregate([
    { $match: { category: { $exists: 1 }, status: true } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  let ids = data.map((e) => {
    return e._id;
  });

  if (ids.length > 9) {
    ids = ids.slice(0, 9);
  } else {
  }

  const categories = await Category.find({ _id: { $in: ids } });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

const allCategories = async (req) => {
  let resPerPage = 500;

  if (req.query["resPerPage"]) {
    resPerPage = parseInt(req.query.resPerPage);
  }

  const count = await Category.countDocuments();
  let condition = {};
  let query = req.query;
  if (req.query["parent"] && req.query["parent"] == "null") {
    condition = {
      parent: {
        $exists: false,
      },
    };

    let temp = [];
    for (let i in query) {
      if (i != "parent") {
        temp[i] = query[i];
      }
    }
    query = temp;
  }

  if (req.query["resPerPage"]) {
    resPerPage = parseInt(query.resPerPage);
  }

  const cats = await Category.find(condition);

  const apiFeatures = new APIFeatures(
    Category.find(condition).populate("parent", ["name", "slug"]),
    query
  )
    .search()
    .filter()
    .search(["name"])
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  // data.forEach((ele,index)=>{
  //   // console.log(typeof ele.name)
  //   console.log(ele.get("title"));
  // });

  const countAPI = new APIFeatures(
    Category.find(condition).populate("parent", ["name", "slug"]),
    query
  )
    .search()
    .search(["name"])
    .filter();

  const countTotal = await countAPI.query;
  
  /*
  const temps = await Category.find();
  temps.forEach((cat) => {
    console.log(cat);
    const name = cat.name;
    cat.set("name.en",name);
    cat.save();
    // await Category.findByIdAndUpdate(
    //   cat._id,
    //   { $set: { name: { en: name } } },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
  });*/

  return {
    success: true,
    count: data.length,
    total: countTotal.length,
    resPerPage,
    data,
  };
};

// Get Cities => /api/v1/ceties
exports.getCategories = catchAsyncError(async (req, res, next) => {
  const data = await allCategories(req);
  res.status(200).json(data);
  /*
  let resPerPage = 500;
  const count = await Category.countDocuments();
  let condition = {};
  let query = req.query;
  if (req.query["parent"] && req.query["parent"]=="null") {
    condition = { parent: {
      $exists: false
    }};

    let temp = [];
    for (let i in query) {
      if(i!="parent"){
        temp[i] = query[i];
      }
    }
    query = temp;
  }

  if(req.query['resPerPage']){
    resPerPage = parseInt(query.resPerPage);
  }

  const cats = await Category.find(condition);*/

  /*
  cats.forEach(async (cat) => {
    const temp = cat.slug
      .replaceAll("/", "-or-")
      .replaceAll("&", "and")
      .replaceAll("'", "")
      .replaceAll(",", "")
      .replaceAll(" ", "-")
      .replaceAll("--", "-")
      .toLowerCase();
    await Category.findByIdAndUpdate(
      cat._id,
      { slug: temp },
      {
        new: true,
        runValidators: true,
      }
    );
  });*/

  /*
  const apiFeatures = new APIFeatures(
    Category.find(condition).populate("parent", ["name", "slug"]),
    query
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
  });*/
});

// Create new City => /api/v1/city/new
exports.newCategory = catchAsyncError(async (req, res, next) => {
  req.body["slug"] = req.body["name"].toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  const data = await Category.create(req.body);

  res.status(200).json({
    success: true,
    data,
  });
});

// Get City => /api/v1/city/:id
exports.getCategory = catchAsyncError(async (req, res, next) => {
  const data = await Category.findById(req.params.id).populate("parent", [
    "name",
    "slug",
  ]);

  if (!data) {
    return next(new ErrorHandler("Category not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

exports.byOldid = catchAsyncError(async (req, res, next) => {
  const data = await Category.find({ old_id: req.params.old_id });

  if (!data) {
    return next(new ErrorHandler("Category not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

exports.bySlug = catchAsyncError(async (req, res, next) => {
  const data = await Category.findOne({ slug: req.params.slug });

  if (!data) {
    return next(new ErrorHandler("Category not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

exports.childBySlug = catchAsyncError(async (req, res, next) => {
  const data = await Category.findOne({ slug: req.params.slug });
  const children = await Category.find({ parent: data.id });
  if (!data) {
    return next(new ErrorHandler("Category not found", 400));
  }

  res.status(200).json({
    success: true,
    data:children,
  });
});

// Update City => /api/v1/city/:id
exports.updateCategory = catchAsyncError(async (req, res, next) => {
  let data = await Category.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Category not found", 400));
  }

  req.body["slug"] = req.body["name"]
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  data = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

// Delete City => /api/v1/city/:id
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  console.log("Request: Delete City");

  const data = await Category.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Category not found", 400));
  }

  await data.deleteOne();

  res.status(200).json({
    success: true,
    message: "Delete Category",
  });
});

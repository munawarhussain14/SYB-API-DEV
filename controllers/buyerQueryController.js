const BuyerQuery = require("../models/buy");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");
const CleanFilter = require("../utils/clearFilter");
const sendEmail = require("../utils/sendEmail");

const queries = async (req) => {
  let resPerPage = 10;

  if (req.query["resPerPage"]) {
    resPerPage = parseInt(req.query.resPerPage);
  }
  let condition = {};
  if (req.user) {
    condition = { user: req.user.id };
  }

  const count = await BuyerQuery.countDocuments(condition);
  let query = req.query;

  if (req.query["resPerPage"]) {
    resPerPage = parseInt(query.resPerPage);
  }
  console.log(req.query);
  const apiFeatures = new APIFeatures(
    BuyerQuery.find(condition)
      .populate("user", ["name"])
      .populate("country", ["name"])
      .populate("state", ["name"])
      .populate("category", ["name", "slug"])
      .populate("sub_category", ["name", "slug"])
      .populate("activities", ["name"]),
    query
  )
    .filter()
    .search(["question", "name", "email"])
    .pagination(resPerPage);

  const data = await apiFeatures.query;

  const countAPI = new APIFeatures(
    BuyerQuery.find(condition).populate("user", ["name"]),
    query
  )
    .search(["question", "name", "email"])
    .filter();

  const countTotal = await countAPI.query;

  return {
    success: true,
    count: data.length,
    total: countTotal.length,
    resPerPage,
    data,
  };
};

exports.fetchAll = catchAsyncError(async (req, res, next) => {
  const data = await queries(req);
  res.status(200).json(data);
});

exports.create = catchAsyncError(async (req, res, next) => {
  const body = { ...req.body };
  if (req.body["expected_price[min]"]) {
    body["expected_price"] = { min: req.body["expected_price[min]"] };
  }

  if (req.body["expected_price[max]"]) {
    body["expected_price"] = {
      ...body["expected_price"],
      max: req.body["expected_price[max]"],
    };
  }
  if(req.user){
    body["user"] = req.user.id;
  }
  const data = await BuyerQuery.create(body);

  res.status(200).json({
    success: true,
    data,
  });
});

exports.fetch = catchAsyncError(async (req, res, next) => {
  const data = await BuyerQuery.findById(req.params.id)
    .populate("country", ["name"])
    .populate("state", ["name"])
    .populate("category", ["name"])
    .populate("sub_category", ["name"])
    .populate("activities", ["name"])
    .populate("user", ["name", "email"]);

  if (!data) {
    return next(new ErrorHandler("Query not found", 400));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

exports.update = catchAsyncError(async (req, res, next) => {
  let data = await BuyerQuery.findById(req.params.id);

  if (!data) {
    return next(new ErrorHandler("Query not found", 400));
  }
  console.log(req.body);
  data = await BuyerQuery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

exports.remove = catchAsyncError(async (req, res, next) => {
  const query = await BuyerQuery.findById(req.params.id);

  if (!query) {
    return next(new ErrorHandler("Query not found", 400));
  }

  await query.deleteOne();
  const data = await queries(req);

  res.status(200).json({
    message: "Delete Query",
    ...data,
  });
});

exports.approveQuery = catchAsyncError(async (req, res, next) => {
  const query = await BuyerQuery.findById(req.params.id);

  if (!query) {
    return next(new ErrorHandler("Buyer Query not found", 400));
  }

  const data = await BuyerQuery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const message = `Hi ${data.name}!<br/><br/>Sell Your Business, Your are Query for "${data.question}" has been approved.<br>Find the link to query below.`;

  /*await sendEmail({
    email: data.email,
    subject: "Buyer Query Approved",
    message,
  });*/

  res.status(200).json({
    message: "Query Approved",
    ...data,
  });
});

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");
const axios = require("axios");
const List = require("../models/listing");
const Advertisement = require("../models/advertisement");
const ListPackage = require("../models/package");
let http = require("http");
let fs = require("fs");
require("dotenv").config();

exports.processPayment = catchAsyncError(async (req, res, next) => {
  console.log("Payment Request");
  let list_id;
  let package_id;
  let platform;

  /*
  if (!req.params.amount) {
    return next(new ErrorHandler("Please provide Amount", 404));
  } else {
    amount = req.params.amount;
  }*/

  if (!req.params.package_id) {
    return next(new ErrorHandler("Please provide Package", 404));
  } else {
    package_id = req.params.package_id;
  }

  if (!req.params.list_id) {
    return next(new ErrorHandler("Please provide List", 404));
  } else {
    list_id = req.params.list_id;
  }

  if (!req.params.platform) {
    return next(new ErrorHandler("Please provide Platform", 404));
  } else {
    platform = req.params.platform;
  }

  const business = await List.findById(list_id);
  const listPackage = await ListPackage.findById(package_id);

  if (!package) {
    return next(new ErrorHandler("Please provide Package", 404));
  }

  let amount = listPackage.price;
  let untilSold = listPackage.untilSold;
  let discount_expire = true;

  if (listPackage.discount) {
    if (listPackage.discount_end_date) {
      let current_date = new Date();
      current_date.setHours(0, 0, 0, 0);
      let discount_date = new Date(listPackage.discount_end_date);
      discount_date.setHours(0, 0, 0, 0);

      if (discount_date.getTime() >= current_date.getTime()) {
        amount = listPackage.discount;
      } else if (current_date.getTime() > discount_date.getTime()) {
        amount = listPackage.price;
      }
    } else {
      amount = listPackage.discount;
    }
  } else {
    amount = listPackage.price;
  }

  if (amount == 0) {
    return next(new ErrorHandler("Please provide Amount", 404));
  }

  var cart_id = list_id + "-" + Math.floor(Math.random() * 5000);

  var FormData = require("form-data");
  var data = new FormData();
  data.append("ivp_method", "create");
  data.append("ivp_store", process.env.PAY_STORE_ID);
  data.append("ivp_authkey", process.env.PAY_AUTH_KEY);
  data.append("ivp_amount", amount);
  data.append("ivp_currency", "aed");
  data.append("ivp_test", process.env.PAY_TEST);
  data.append("ivp_cart", cart_id);
  data.append("ivp_desc", `Sell Your Business: ${business.list_id}`);
  data.append(
    "return_auth",
    `${process.env.SERVER_URL}verify/${platform}/${list_id}/${package_id}`
    // "https://syb.ae/payment/success.php?list_id=" + list_id
  );
  data.append(
    "return_decl",
    `${process.env.SERVER_URL}payment/decline/${platform}/${list_id}`
    // "https://syb.ae/payment/decline.php?list_id=" + list_id
  );
  data.append(
    "return_can",
    `${process.env.SERVER_URL}payment/cancel/${platform}/${list_id}`
    // "https://syb.ae/payment/cancel.php?list_id=" + list_id
  );

  if (req.user) {
    data.append("bill_fname", req.user.name);
    //data.append('bill_sname', req.user.name)
    data.append("bill_email", req.user.email);
  }

  var config = {
    method: "post",
    url: "https://secure.telr.com/gateway/order.json",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  let message;
  let list;

  axios(config)
    .then(async (response) => {
      const server_response = response.data;

      if (server_response.order) {
        console.log(server_response.order);
        const ref = server_response.order.ref;
        const url = server_response.order.url;
        list = await List.findByIdAndUpdate(req.params.list_id, {
          package: {
            ref: ref,
            price: amount,
            untilSold,
            package_id,
            verified: false,
          },
        });

        message = "Link generated Successfully";
        res.status(200).json({
          success: true,
          message,
          url,
        });
      } else if (server_response.error) {
        message = server_response.error.message;
        res.status(200).json({
          success: false,
          message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(200).json({
        success: true,
        message: error,
      });
    });
});

exports.processResponse = catchAsyncError(async (req, res, next) => {
  console.log("Payment Response");
  console.log("Params: ", req.params);

  const list = await List.findById(req.params.id);

  //TODO: Check status of order
  var FormData = require("form-data");
  var data = new FormData();
  data.append("ivp_method", "check");
  data.append("ivp_store", process.env.PAY_STORE_ID);
  data.append("ivp_authkey", process.env.PAY_AUTH_KEY);
  data.append("order_ref", list.package.ref);

  var config = {
    method: "post",
    url: "https://secure.telr.com/gateway/order.json",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  let message;

  axios(config)
    .then(function (response) {
      const server_response = response.data;
      //console.log(response.data);
      if (server_response.order) {
        //TODO: Update ref in Selected List

        message = "Order Successfully";
        res.status(200).json({
          success: true,
          message,
        });
      } else if (server_response.error) {
        message = server_response.error.message;
        res.status(200).json({
          success: false,
          message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(200).json({
        success: true,
        message: error,
      });
    });

  //TODO: Update Pacakage Information

  // res.status(200).json({
  //     success: true
  // })
});

exports.processCancel = catchAsyncError(async (req, res, next) => {
  console.log("Payment Cancel");
  console.log("Params: ", req.params);
  console.log("Test For Aws console");
  console.log("Params: ", req.body);
  outputPage(res, "cancel", req.params.platform);
  return;

  res.status(200).json({
    success: true,
  });
});

exports.processDecline = catchAsyncError(async (req, res, next) => {
  console.log("Payment Decline");
  console.log("Params: ", req.params);
  console.log("Params: ", req.body);
  outputPage(res, "decline", req.params.platform);
  return;
  res.status(200).json({
    success: true,
  });
});

exports.freePackage = catchAsyncError(async (req, res, next) => {
  var start_date = new Date();
  var datetime = new Date();
  var expiry_date = datetime.setDate(datetime.getDate() + 30);

  await List.findByIdAndUpdate(req.params.id, {
    package_status: true,
    sort,
    package: {
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
    },
  });
  res.status(200).json({
    success: true,
  });
  ``;
});
exports.verifyPayment = catchAsyncError(async (req, res, next) => {
  console.log("Verify Payment");
  const listPackage = await ListPackage.findById(
    req.params.package_id
  ).populate({
    path: "country",
  });
  const list = await List.findById(req.params.id);
  const { package_status, ref } = { ...list.package };
  const platform = req.params.platform;

  if (!package_status && ref) {
    //TODO: Check status of order
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
    axios(config)
      .then(async (response) => {
        const server_response = response.data;

        if (server_response.order) {
          const { amount, description, status } = server_response.order;
          var start_date = new Date();
          var datetime = new Date();
          var expiry_date;
          //TODO: Update ref in Selected List

          if (status.code == 3) {
            let package_name = "free";
            let package_title = listPackage.name;
            sort = 3;
            if (listPackage.special) {
              package_name = "syb_special";
              sort = 1;
            } else {
              package_name = "featured";
              sort = 2;
            }

            if (listPackage.untilSold) {
              expiry_date = null;
            } else {
              expiry_date = datetime.setDate(
                datetime.getDate() + listPackage.duration
              );
            }

            let currency = listPackage.country.currency;
            console.log(currency);
            let current_list = await List.findByIdAndUpdate(req.params.id, {
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
                untilSold: listPackage.untilSold,
                special: listPackage.special,
                featured: listPackage.featured,
                ref: ref,
                verified: true,
              },
            })
              .populate("category", "name")
              .populate("sub_category", "name")
              .populate("country", "name")
              .populate({
                path: "business_activities",
                select: "name",
              })
              .populate("state", "name")
              .populate("city", "name");

            message = "Order Successfully";
            console.log("Render Header");

            outputPage(res, "success", platform);
            return;
          } else {
            /*let current_list = await List.findByIdAndUpdate(
              req.params.list_id,
              {
                package: {
                  package_status: false,
                  //ref: null,
                },
              }
            );*/
            console.log("Error After received response");
            message = "Order not Placed";
            outputPage(res, "error", platform);
            return;
          }
        } else if (server_response.error) {
          message = server_response.error.message;
          console.log("Error After received response1", message);
          outputPage(res, "error", platform);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log("Error After received response2", error);
        outputPage(res, "error", platform);
        return;
      });
  }
});

exports.verifyAdvertisementPayment = catchAsyncError(async (req, res, next) => {
  console.log("Advertisement Payment Verify");
  const ad_id = req.params.id;
  const platform = req.params.platform;
  const advertisement = await Advertisement.findById(req.params.id).populate({
    path: "adPackage",
  });
  const { package_status, ref } = { ...advertisement.package };

  if (!package_status && ref) {
    //TODO: Check status of order
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

    let message;
    axios(config)
      .then(async (response) => {
        const server_response = response.data;

        if (server_response.order) {
          const { amount, description, status } = server_response.order;
          var start_date = new Date();
          var datetime = new Date();
          let expiry = new Date();
          var expiry_date = expiry.setDate(
            datetime.getDate() + advertisement.adPackage.days
          );

          //TODO: Update ref in Selected List
          if (status.code == 3) {
            let current_advertisement = await Advertisement.findByIdAndUpdate(
              ad_id,
              {
                publishAt: datetime,
                expireAt: expiry_date,
                payment_status: "Paid",
                status: "Published",
                enable: true,
                package: {
                  package_title: advertisement.adPackage.title,
                  package_price: amount,
                  package_date: start_date,
                  package_expiry_date: expiry_date,
                  ref: ref,
                },
              }
            );

            message = "Order Successfully";
            outputPage(res, "success", platform);
            return;
          } else {
            /*let temp = await Advertisement.findByIdAndUpdate(req.params.id, {
              package: {
                ref: null,
              },
            });*/
            outputPage(res, "success", platform);
            return;
          }
        } else if (server_response.error) {
          message = server_response.error.message;
          outputPage(res, "error", platform);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
        outputPage(res, "error", platform);
        return;
        // res.status(200).json({
        //   success: true,
        //   message: error,
        // });
      });
  }
});

exports.requsetAdvertismentPayment = catchAsyncError(async (req, res, next) => {
  console.log("Advertisment Payment Request");
  let ad_id;
  let amount;
  let platform;

  if (!req.params.id) {
    return next(new ErrorHandler("Please provide Advertisement", 404));
  } else {
    ad_id = req.params.id;
  }

  if (!req.params.platform) {
    return next(new ErrorHandler("Please provide Platform", 404));
  } else {
    platform = req.params.platform;
  }

  let advertisement = await Advertisement.findById({ _id: ad_id }).populate({
    path: "adPackage",
    populate: [{ path: "adClass" }, { path: "adType" }, { path: "country" }],
  });
  if (!advertisement) {
    return next(new ErrorHandler("Please provide Advertisement", 404));
  }

  amount = 0; //advertisement.adPackage.price
  const currency = advertisement.adPackage.country.currency;

  if (advertisement.adPackage.discount) {
    if (advertisement.adPackage.discount_end_date) {
      let current_date = new Date();
      current_date.setHours(0, 0, 0, 0);
      let discount_date = new Date(advertisement.adPackage.discount_end_date);
      discount_date.setHours(0, 0, 0, 0);

      if (discount_date.getTime() >= current_date.getTime()) {
        amount = advertisement.adPackage.discount;
      } else if (current_date.getTime() > discount_date.getTime()) {
        amount = advertisement.adPackage.price;
      }
    } else {
      amount = advertisement.adPackage.discount;
    }
  } else {
    amount = advertisement.adPackage.price;
  }

  if (amount == 0) {
    return next(new ErrorHandler("Please provide Amount", 404));
  }

  var cart_id = ad_id + "-" + Math.floor(Math.random() * 5000);

  var FormData = require("form-data");
  var data = new FormData();
  data.append("ivp_method", "create");
  data.append("ivp_store", process.env.PAY_STORE_ID);
  data.append("ivp_authkey", process.env.PAY_AUTH_KEY);
  data.append("ivp_amount", amount);
  data.append("ivp_currency", currency);
  data.append("ivp_test", process.env.PAY_TEST);
  data.append("ivp_cart", cart_id);
  data.append("ivp_desc", "Sell Your Business: Advertisement Charges");
  data.append(
    "return_auth",
    `${process.env.SERVER_URL}advertisement/payment/${platform}/verify/${ad_id}`
  );
  data.append(
    "return_decl",
    `${process.env.SERVER_URL}advertisement/payment/${platform}/decline/${ad_id}`
  );
  data.append(
    "return_can",
    `${process.env.SERVER_URL}advertisement/payment/${platform}/cancel/${ad_id}`
  );

  if (req.user) {
    data.append("bill_fname", req.user.name);
    //data.append('bill_sname', req.user.name)
    data.append("bill_email", req.user.email);
  }

  var config = {
    method: "post",
    url: "https://secure.telr.com/gateway/order.json",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  let message;

  axios(config)
    .then(async (response) => {
      const server_response = response.data;
      console.log("Payment Response");
      if (server_response.order) {
        console.log("Order Success");
        const ref = server_response.order.ref;
        const url = server_response.order.url;
        advertisement = await Advertisement.findByIdAndUpdate(req.params.id, {
          package: {
            ref: ref,
          },
        });

        message = "Link generated Successfully";
        console.log("Order Success Page Call");
        res.status(200).json({
          success: true,
          message,
          url,
        });
      } else if (server_response.error) {
        console.log("Order Fail");
        message = server_response.error.message;
        res.status(200).json({
          success: false,
          message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(200).json({
        success: true,
        message: error,
      });
    });
});

exports.successAdvertisementResponse = catchAsyncError(
  async (req, res, next) => {
    console.log("Advertisement Payment Response");
    console.log("Params: ", req.params);

    const advertisement = await Advertisement.findById(req.params.id);

    //TODO: Check status of order
    var FormData = require("form-data");
    var data = new FormData();
    data.append("ivp_method", "check");
    data.append("ivp_store", process.env.PAY_STORE_ID);
    data.append("ivp_authkey", process.env.PAY_AUTH_KEY);
    data.append("order_ref", ad.package.ref);

    var config = {
      method: "post",
      url: "https://secure.telr.com/gateway/order.json",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    let message;

    axios(config)
      .then(function (response) {
        const server_response = response.data;
        console.log(response.data);
        if (server_response.order) {
          //TODO: Update ref in Selected List

          message = "Order Successfully";
          outputPage(res, "success");
          return;
          /*res.status(200).json({
            success: true,
            message,
          });*/
        } else if (server_response.error) {
          message = server_response.error.message;
          outputPage(res, "error");
          return;
          res.status(200).json({
            success: false,
            message,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        outputPage(res, "error");
        return;
        res.status(200).json({
          success: true,
          message: error,
        });
      });
  }
);

exports.processAdvertisementCancel = catchAsyncError(async (req, res, next) => {
  console.log("Payment Cancel");
  console.log("Params: ", req.params);
  console.log("Params: ", req.body);
  outputPage(res, "cancel", req.params.platform);
  return;
});

exports.processAdvertisementDecline = catchAsyncError(
  async (req, res, next) => {
    console.log("Payment Decline");
    console.log("Params: ", req.params);
    console.log("Params: ", req.body);
    outputPage(res, "decline", req.params.platform);
    return;
  }
);

const outputPage = (res, status, platform = "Mobile") => {
  let file;
  if (status == "success") {
    file = `./pages/payment/${platform}/success.html`;
  } else if (status == "error") {
    file = `./pages/payment/${platform}/error.html`;
  } else if (status == "cancel") {
    file = `./pages/payment/${platform}/cancel.html`;
  } else if (status == "fail") {
    file = `./pages/payment/${platform}/fail.html`;
  } else if (status == "decline") {
    file = `./pages/payment/${platform}/decline.html`;
  }

  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  fs.readFile(file, null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Whoops! File not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
};

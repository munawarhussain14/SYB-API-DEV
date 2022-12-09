const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
const errorMiddleware = require("../middlewares/errors");

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//import all routes
//const products = require("./routes/product");
const auth = require("../routes/auth");
const country = require("../routes/country");
const state = require("../routes/state");
const city = require("../routes/city");
const category = require("../routes/category");
const department = require("../routes/departments");
const activity = require("../routes/activity");
const list = require("../routes/list");
const data = require("../routes/data");
const query = require("../routes/query");
const payment = require("../routes/payment");
const amenity = require("../routes/amenity");
const property_type = require("../routes/property_types");
const listPackage = require("../routes/package");
const property = require("../routes/property");
const advertisement = require("../routes/advertisement");
const dashboard = require("../routes/dashboard");
const adpackage = require("../routes/adPackage");
const adClass = require("../routes/adClass");
const adType = require("../routes/adType");
const mail = require("../routes/mail");
const buyerquery = require("../routes/buyerquery");

//app.use('/api/v1', products);
app.use("/api/v1", auth);
app.use("/api/v1", country);
app.use("/api/v1", state);
app.use("/api/v1", city);
app.use("/api/v1", category);
app.use("/api/v1", activity);
app.use("/api/v1", list);
app.use("/api/v1", data);
app.use("/api/v1", query);
app.use("/api/v1", department);
app.use("/api/v1", payment);
app.use("/api/v1", amenity);
app.use("/api/v1", property_type);
app.use("/api/v1", listPackage);
app.use("/api/v1", property);
app.use("/api/v1", advertisement);
app.use("/api/v1", dashboard);
app.use("/api/v1", adpackage);
app.use("/api/v1", adClass);
app.use("/api/v1", adType);
app.use("/api/v1", mail);
app.use("/api/v1", buyerquery);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

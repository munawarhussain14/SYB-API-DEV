const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
const errorMiddleware = require("./middlewares/errors");

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
const buyerqueryContact = require("../routes/buyerqueryContact");

const base = "/api/v1";

//app.use('/api/v1', products);
app.use(`${base}`, auth);
app.use(`${base}`, country);
app.use(`${base}`, state);
app.use(`${base}`, city);
app.use(`${base}`, category);
app.use(`${base}`, activity);
app.use(`${base}`, list);
app.use(`${base}`, data);
app.use(`${base}`, query);
app.use(`${base}`, department);
app.use(`${base}`, payment);
app.use(`${base}`, amenity);
app.use(`${base}`, property_type);
app.use(`${base}`, listPackage);
app.use(`${base}`, property);
app.use(`${base}`, advertisement);
app.use(`${base}`, dashboard);
app.use(`${base}`, adpackage);
app.use(`${base}`, adClass);
app.use(`${base}`, adType);
app.use(`${base}`, mail);
app.use(`${base}`, buyerquery);
app.use(`${base}`, buyerqueryContact);

router.get("/",(req,res)=>{
  res.json({
    "name":"SYB API",
    "author":"Munawar Hussain"
  });
});

app.use(`${base}`, router);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
// module.exports.handler = serverless(app);

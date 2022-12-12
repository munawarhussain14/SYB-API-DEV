const app = require("./src/api");

const connectDatabase = require("./config/database");

//const dotenv = require("dotenv");

// Handle Uncaught exceptions
process.on(`uncaughtException`, (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

//Setting up config file
if(process.env.NODE_ENV==="PRODUCTION")
require("dotenv").dotenv.config({ path: "config/config.env" });

//connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promises Rejection");
  server.close(() => {
    process.exit(1);
  });
});

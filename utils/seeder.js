const Product = require("../models/product");

const User = require("../models/user");

const List = require("../models/listing");

const [AdPage, AdType] = require("../models/adPackage");

const dotenv = require("dotenv");

const connectDatabase = require("../config/database");

const products = require("../data/products");

const products = require("../data/products");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("User are deleted");

    await List.deleteMany();
    console.log("Listing are deleted");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//deleteData();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//seedProducts();

const category = require("../data/categories.json");
const Category = require("../models/category");

const seedCategory = async () => {
  try {
    //await Category.deleteMany();
    console.log("category are deleted");

    await Category.insertMany(category);
    console.log("All category are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//seedCategory();

const activity = require("../data/activities.json");
const Activity = require("../models/activity");

const seedActivity = async () => {
  try {
    await Activity.deleteMany();
    console.log("Activity are deleted");

    await Activity.insertMany(activity);
    console.log("All activity are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//seedActivity();

const amenites = require("../data/amenities.json");
const Amenity = require("../models/amenity");

const seedAmenity = async () => {
  try {
    await Amenity.deleteMany();
    console.log("Amenity are deleted");

    await Amenity.insertMany(amenites);
    console.log("All Amenites are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//seedAmenity();

const types = require("../data/property_types.json");
const Type = require("../models/property_type");

const seedPropertyTypes = async () => {
  try {
    await Type.deleteMany();
    console.log("Property Types are deleted");

    await Type.insertMany(types);
    console.log("All Property Types are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//seedPropertyTypes();

const express = require("express");
const router = express.Router();

const {
  getPackages,
  getPackage,
  newPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/adPackageController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/adpackages")
  .get(getPackages)
  .post(isAuthenticatedUser, /*authorizeRoles("admin"),*/ newPackage);

router
  .route("/adpackages/:id")
  .get(getPackage)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updatePackage)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deletePackage);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getPackages,
  getPackage,
  newPackage,
  updatePackage,
  deletePackage,
  getAppPackages,
} = require("../controllers/packageController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/packages")
  .get(getPackages)
  .post(isAuthenticatedUser, /*authorizeRoles("admin"),*/ newPackage);

router
  .route("/packages/app/:type")
  .get(isAuthenticatedUser, /*authorizeRoles("admin"),*/ getAppPackages);

router
  .route("/package/:id")
  .get(getPackage)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updatePackage)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deletePackage);

module.exports = router;

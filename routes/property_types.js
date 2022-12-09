const express = require("express");
const router = express.Router();

const {
  getPropertyTypes,
  getPropertyType,
  newPropertyType,
  updatePropertyType,
  deletePropertyType,
  getDashboardPropertyTypes,
} = require("../controllers/propertyTypeController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/dashboard_property_types").get(getDashboardPropertyTypes);

router
  .route("/property_types")
  .get(getPropertyTypes)
  .post(isAuthenticatedUser, /*authorizeRoles("admin"),*/ newPropertyType);

router
  .route("/property_types/:id")
  .get(getPropertyType)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updatePropertyType)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deletePropertyType);

module.exports = router;

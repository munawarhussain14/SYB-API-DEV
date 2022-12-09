const express = require("express");
const router = express.Router();

const {
  getAmenities,
  getAmenity,
  newAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenitiesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/amenities")
  .get(getAmenities)
  .post(isAuthenticatedUser, /*authorizeRoles("admin"),*/ newAmenity);

router
  .route("/amenities/:id")
  .get(getAmenity)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updateAmenity)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deleteAmenity);

module.exports = router;

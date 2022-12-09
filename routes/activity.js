const express = require("express");
const router = express.Router();

const {
  getActivities,
  newActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/activities").get(getActivities);

router
  .route("/activity/new")
  .post(/*isAuthenticatedUser, authorizeRoles("admin") ,*/ newActivity);

router
  .route("/activities")
  .post(/*isAuthenticatedUser, authorizeRoles("admin") ,*/ newActivity);

router
  .route("/activity/:id")
  .get(getActivity)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateActivity)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteActivity);

router
  .route("/activities/:id")
  .get(getActivity)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateActivity)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteActivity);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getQueries,
  newQuery,
  getQuery,
  updateQuery,
  deleteQuery,
  getUserQueries,
} = require("../controllers/queryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/queries").get(
  isAuthenticatedUser,
  // authorizeRoles("user"),
  getQueries
);

router
  .route("/queries/user")
  .get(isAuthenticatedUser, authorizeRoles("admin", "user"), getUserQueries);

router
  .route("/queries/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "user"), newQuery);

router
  .route("/queries/:id")
  .get(getQuery)
  .put(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    updateQuery
  )
  .delete(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    deleteQuery
  );

module.exports = router;

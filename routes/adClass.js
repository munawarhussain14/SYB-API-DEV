const express = require("express");
const router = express.Router();
const page = "adClasses";
const {
  getAll,
  add,
  get,
  update,
  remove,
} = require("../controllers/adClassController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route(`/${page}`)
  .get(isAuthenticatedUser, getAll)
  .post(isAuthenticatedUser, add);

router
  .route(`/${page}/:id`)
  .get(get)
  .put(isAuthenticatedUser, update)
  .delete(isAuthenticatedUser, remove);

module.exports = router;

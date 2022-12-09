const express = require("express");
const router = express.Router();
const page = "adtypes";
const {
  getAll,
  add,
  get,
  update,
  remove,
} = require("../controllers/adTypeController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route(`/${page}`)
  .get(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    getAll
  )
  .post(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    add
  );

router
  .route(`/${page}/:id`)
  .get(get)
  .put(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    update
  )
  .delete(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    remove
  );

module.exports = router;

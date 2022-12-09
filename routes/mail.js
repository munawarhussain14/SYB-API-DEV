const express = require("express");
const router = express.Router();

const { sendMail } = require("../controllers/mailController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/sendMail")
  .post(isAuthenticatedUser, authorizeRoles("admin"), sendMail);

module.exports = router;

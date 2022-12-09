const express = require("express");
const router = express.Router();

const { getSummary } = require("../controllers/dashboardController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/summary").get(getSummary);

module.exports = router;

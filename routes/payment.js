const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  processPayment,
  processResponse,
  processCancel,
  processDecline,
  verifyPayment,
  freePackage,
  verifyAdvertisementPayment,
  requsetAdvertismentPayment,
  successAdvertisementResponse,
  processAdvertisementCancel,
  processAdvertisementDecline,
} = require("../controllers/paymentController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/freePackage/:id/:package_id").get(freePackage);
router.route("/verify/:platform/:id/:package_id").get(verifyPayment);

router.route("/payment/response/:platform/:id").get(processResponse);
router.route("/payment/cancel/:platform/:id").get(processCancel);
router.route("/payment/decline/:platform/:id").get(processDecline);

router
  .route("/payment/:platform/:list_id/:package_id")
  .get(isAuthenticatedUser, processPayment);

//router.route("/payment/:id").get(processPayment);

/**************Advertisement Payment*************** */
router
  .route("/advertisement/payment/:platform/verify/:id")
  .get(verifyAdvertisementPayment);

router
  .route("/advertisement/payment/request/:platform/:id")
  .get(isAuthenticatedUser, requsetAdvertismentPayment);

router
  .route("/advertisement/payment/:platform/success/:id")
  .get(successAdvertisementResponse);

router
  .route("/advertisement/payment/:platform/cancel/:id")
  .get(processAdvertisementCancel);

router
  .route("/advertisement/payment/:platform/decline/:id")
  .get(processAdvertisementDecline);

module.exports = router;

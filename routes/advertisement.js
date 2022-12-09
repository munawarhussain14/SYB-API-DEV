const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  getAdvertisements,
  getAdvertisement,
  newAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  checkAdvertisements,
  postAdvertisement,
  clickedAdvertisements,
  viewAdvertisement,
  getPackageAdvertisement,
  requestAd,
} = require("../controllers/advertisemenetController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/ads/:platform/:class/:type").get(requestAd);

router.route("/packageads/:id").get(getPackageAdvertisement);

router
  .route("/advertisements")
  .get(isAuthenticatedUser, authorizeRoles("user", "admin"), getAdvertisements)
  .post(isAuthenticatedUser, upload.single("image"), newAdvertisement);

/*
router
  .route("/advertisements/admin")
  .get(isAuthenticatedUser, getAdminAdvertisements);
*/
router.route("/advertisements/view/:id").get(viewAdvertisement);

router.route("/advertisements/check/:page/:type").get(checkAdvertisements);

router.route("/advertisements/post/user/ad").post(
  isAuthenticatedUser,
  // authorizeRoles("user"),
  upload.single("image"),
  postAdvertisement
);

router
  .route("/advertisements/:id")
  .get(getAdvertisement)
  .put(
    isAuthenticatedUser,
    // authorizeRoles("user"),
    upload.single("image"),
    updateAdvertisement
  )
  .delete(
    isAuthenticatedUser,
    /*authorizeRoles("admin"),*/ deleteAdvertisement
  );

router.route("/advertisements/clicked/:id").get(clickedAdvertisements);

module.exports = router;

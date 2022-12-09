const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  getUserLists,
  getLists,
  newList,
  getList,
  updateList,
  deleteList,
  getMainFeatured,
  uploadImage,
  deleteImage,
  getAdminLists,
  updateAdminList,
  uploadAdminImage,
  uploadCropImage,
  deleteAdminImage,
  getAdminList,
  getFavLists,
} = require("../controllers/listController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/list/deleteImage/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin", "user"), deleteImage);

router
  .route("/admin/list/deleteImage/:id/:image_id")
  .delete(/*isAuthenticatedUser, authorizeRoles("user"),*/ deleteAdminImage);

router.route("/lists").get(getLists);
router.route("/lists/favourite").get(isAuthenticatedUser, getFavLists);

router
  .route("/lists/backend")
  .get(isAuthenticatedUser, authorizeRoles("admin", "user"), getUserLists);

/*router.route("/list/new")
.post(isAuthenticatedUser, authorizeRoles("user") ,newList);*/

router.route("/list/new").post(isAuthenticatedUser, newList);

router
  .route("/list/upload/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "user"),
    upload.single("image"),
    uploadImage
  );

router
  .route("/admin/list/uploadCropImage/:id/:image_id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "user"),
    upload.single("image"),
    uploadCropImage
  );

router
  .route("/admin/list/upload/:id")
  .put(/*isAuthenticatedUser,*/ upload.single("image"), uploadAdminImage);

router
  .route("/list/:id")
  .get(getList)
  .put(isAuthenticatedUser, authorizeRoles("user", "admin"), updateList)
  .delete(isAuthenticatedUser, /*authorizeRoles("user"),*/ deleteList);

/*
router
  .route("/list/:id")
  .get(getList)
  .put(updateList)
  .delete(isAuthenticatedUser, /*authorizeRoles("user"),*/ /* deleteList);
 */
router.route("/admin/list/:id").get(getAdminList);

/*
router.route("/list/:id")
    .get(getList)
    .put(updateList)
    .delete(isAuthenticatedUser, authorizeRoles("user"), deleteList);
*/

router.route("/list/mainfeatured/:package_name").get(getMainFeatured);

router.route("/admin/lists").get(getAdminLists);
router.route("/admin/list/:id").put(isAuthenticatedUser, updateAdminList);

module.exports = router;

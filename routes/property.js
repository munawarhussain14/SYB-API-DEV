const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  getProperties,
  getProperty,
  newProperty,
  updateProperty,
  deleteProperty,
  uploadImage,
  deleteImage,
} = require("../controllers/propertyController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/properties")
  .get(getProperties)
  .post(isAuthenticatedUser, /*authorizeRoles("admin"),*/ newProperty);

router
  .route("/properties/:id")
  .get(getProperty)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updateProperty)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deleteProperty);

router
  .route("/properties/images/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("user"),
    upload.single("image"),
    uploadImage
  )
  .delete(isAuthenticatedUser, authorizeRoles("admin", "user"), deleteImage);

module.exports = router;

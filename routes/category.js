const express = require("express");
const router = express.Router();

const {
  getSubCategories,
  getCategories,
  newCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getHomeCategories,
  getMainCategories,
  byOldid,
  bySlug,
  childBySlug,
} = require("../controllers/categoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/categories").get(getCategories);
router
  .route("/categories")
  .post(isAuthenticatedUser, /*authorizeRoles("admin"),*/ newCategory);

router.route("/subCategories/:parent").get(getSubCategories);

router.route("/getparentcategories").get(getMainCategories);

router.route("/category/oldid/:old_id").get(byOldid);
router.route("/category/slug/:slug").get(bySlug);
router.route("/category/child/:slug").get(childBySlug);

router
  .route("/category/:id")
  .get(getCategory)
  .put(/*isAuthenticatedUser, authorizeRoles("admin"),*/ updateCategory)
  .delete(/*isAuthenticatedUser, authorizeRoles("admin"),*/ deleteCategory);

router.route("/categories/home").get(getHomeCategories);

module.exports = router;

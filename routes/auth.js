const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getUserDetail,
  allUsers,
  updateUser,
  deleteUser,
  logout,
  checkAccess,
  account,
  addUser,
  getUserId,
  verifyUser,
  verifyAppUser,
  resendCode,
  addUserFav,
  getUserFav,
  removeUserFav,
  checkVersion,
  sendDeactivateCode,
  deactivateAccount,
} = require("../controllers/authController");
//Version Check Add
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);

router.route("/adduser").post(addUser);

router.route("/resendCode").post(resendCode);

router.route("/login").post(loginUser);

router.route("/user/verify/").post(verifyUser);

router.route("/app/user/verify").post(verifyAppUser);

router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").post(resetPassword);
router.route("/password/reset").post(resetPassword);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/deactivate/code").get(isAuthenticatedUser, sendDeactivateCode);
router.route("/deactivate").post(isAuthenticatedUser, deactivateAccount);

router.route("/checkVersion").get(checkVersion);
router.route("/me").get(isAuthenticatedUser, getUserProfile);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/add-to-fav/:listing_id").put(isAuthenticatedUser, addUserFav);
router.route("/remove-fav/:listing_id").put(isAuthenticatedUser, removeUserFav);
router.route("/get-favs").get(isAuthenticatedUser, getUserFav);

router.route("/admin/users").get(isAuthenticatedUser, allUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, /*authorizeRoles('admin'),*/ getUserDetail)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

router.route("/logout").get(logout);

router.route("/access").get(isAuthenticatedUser, checkAccess);

router.route("/account").get(account);

router.route("/admin/oldid/:oldid").get(getUserId);

module.exports = router;

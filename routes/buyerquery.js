const express = require("express");
const router = express.Router();

const {
  fetchAll,
  fetch,
  create,
  update,
  remove,
  approveQuery,
} = require("../controllers/buyerQueryController");

const {
  isAuthenticatedUser,
  authorizeRoles,
  isUser,
} = require("../middlewares/auth");

let base_url = "buyerQueries"

router.route(isAuthenticatedUser,authorizeRoles("admin"),`/${base_url}/approved/:id`).put(approveQuery);

router
  .route(`/${base_url}`)
  .get(fetchAll)
  .post(isUser/*isAuthenticatedUser, authorizeRoles("admin")*/, create);

router
  .route(`/${base_url}/:id`)
  .get(fetch)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ update)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ remove);


module.exports = router;

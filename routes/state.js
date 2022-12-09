const express = require("express")
const router = express.Router()

const { 
    getStates,
    newState,
    getState,
    updateState,
    deleteState,
    getStateByCountry
} = require('../controllers/stateController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route("/states").get(getStates)

router.route("/states/new").post(isAuthenticatedUser,/* authorizeRoles("admin") ,*/newState)

router
  .route("/states/:id")
  .get(getState)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updateState)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deleteState);

router.route("/state/:id")
    .get(getState)
    .put(/*isAuthenticatedUser, authorizeRoles("admin"),*/ updateState)
    .delete(/*isAuthenticatedUser, authorizeRoles("admin"),*/ deleteState);


router.route("/states/bycountry/:id").get(getStateByCountry)

    module.exports = router
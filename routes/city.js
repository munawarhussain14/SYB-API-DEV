const express = require("express")
const router = express.Router()

const { 
    getCities,
    newCity,
    getCity,
    updateCity,
    deleteCity,
    byOldid,
    getCityByState
} = require('../controllers/cityController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route("/cities").get(getCities)

router.route("/cities/new").post(isAuthenticatedUser, /*authorizeRoles("admin") ,*/newCity)

router
  .route("/cities/:id")
  .get(getCity)
  .put(isAuthenticatedUser, /*authorizeRoles("admin"),*/ updateCity)
  .delete(isAuthenticatedUser, /*authorizeRoles("admin"),*/ deleteCity);

router.route("/city/oldid/:old_id").get(byOldid)

router.route("/cities/bystate/:id").get(getCityByState)

router.route("/city/:id")
    .get(getCity)
    .put(/*isAuthenticatedUser, authorizeRoles("admin"),*/ updateCity)
    .delete(/*isAuthenticatedUser, authorizeRoles("admin"),*/ deleteCity);

    module.exports = router
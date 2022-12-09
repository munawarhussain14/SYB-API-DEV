const express = require("express")
const router = express.Router()

const { 
    getCountries,
    newCountry,
    getCountry,
    updateCountry,
    deleteCountry 
} = require('../controllers/countryController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route("/countries").get(getCountries)
router
  .route("/countries")
  .post(isAuthenticatedUser, /*authorizeRoles("admin") ,*/ newCountry);

router
  .route("/countries/:id")
  .get(getCountry)
  .put(/*isAuthenticatedUser, authorizeRoles("admin"),*/ updateCountry)
  .delete(/*isAuthenticatedUser, authorizeRoles("admin"),*/ deleteCountry);


router.route("/country/new").post(/*isAuthenticatedUser, authorizeRoles("admin") ,*/newCountry)

router.route("/country/:id")
    .get(getCountry)
    .put(/*isAuthenticatedUser, authorizeRoles("admin"),*/ updateCountry)
    .delete(/*isAuthenticatedUser, authorizeRoles("admin"),*/ deleteCountry);

    module.exports = router
const express = require("express")
const router = express.Router()

const { 
    getFormData
} = require('../controllers/dataController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route("/getFormData").get(getFormData)

    module.exports = router
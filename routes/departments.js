const express = require("express")
const router = express.Router()

const { 
    getDepartments,
    newDepartment,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getParentDepartments,
    getDepartmentbySlug
} = require('../controllers/departmentController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route("/department").get(getDepartments)

router.route("/department/new").post(newDepartment)

router.route("/parentsDepartment/").get(getParentDepartments)

router.route("/department/:id")
    .get(getDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment); 

router.route("/slugDepartment/:slug")
    .get(getDepartmentbySlug); 

    module.exports = router
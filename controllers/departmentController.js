const Department = require('../models/department')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/ApiFeatures')



// Get Departments => /api/v1/ceties
exports.getDepartments = catchAsyncError(async (req, res, next)=>{
    
    const resPerPage = 4;
    const count = await Department.countDocuments()

    const apiFeatures = new APIFeatures(Department.find(),req.query)
    .search()
    .filter()
    .pagination(resPerPage)

    const data = await apiFeatures.query

    res.status(200).json({
        success: true,
        count: data.length,
        total: count,
        data
    })
});

// Create new City => /api/v1/city/new
exports.newDepartment = catchAsyncError(async (req, res, next)=>{
    
    const data = await Department.create(req.body)

    res.status(200).json({
        success: true,
        data
    })
});

// Get City => /api/v1/city/:id
exports.getDepartment = catchAsyncError(async (req, res, next)=>{
    
    const data = await Department.findById(req.params.id)

    if(!data){
        return next(new ErrorHandler('Category not found',400))
    }

    res.status(200).json({
        success: true,
        data
    })
});

exports.getDepartmentbySlug = catchAsyncError(async (req, res, next)=>{
    
    const data = await Department.findOne({"slug":req.params.slug})

    if(!data){
        return next(new ErrorHandler('Category not found',400))
    }

    res.status(200).json({
        success: true,
        departmant:data
    })
});

// Update City => /api/v1/city/:id
exports.updateDepartment = catchAsyncError(async (req, res, next)=>{
    
    let data = await Department.findById(req.params.id)

    if(!data){
        return next(new ErrorHandler('Department not found',400))
    }

    data = await Department.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success: true,
        data
    })
});

// Delete City => /api/v1/city/:id
exports.deleteDepartment = catchAsyncError(async (req, res, next)=>{
    //console.log("Request: Delete City");
   
    const data = await Department.findById(req.params.id)

    if(!data){
        return next(new ErrorHandler('Category not found',400))
    }

    await data.deleteOne()

    res.status(200).json({
        success: true,
        message:"Delete Category"
    })
});


// Get Departments => /api/v1/ceties
exports.getParentDepartments = catchAsyncError(async (req, res, next)=>{
    
    const data = await Department.find({"parent":null})

    if(!data){
        return next(new ErrorHandler('No Department Exist',400))
    }

    res.status(200).json({
        success: true,
        data
    })
});


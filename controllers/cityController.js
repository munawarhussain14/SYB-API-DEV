const City = require('../models/city')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/ApiFeatures')


// Get Cities => /api/v1/ceties
exports.getCities = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Get Cities");

    let resPerPage = 50;
    if (req.query["resPerPage"]) {
      resPerPage = parseInt(req.query["resPerPage"]);
    }

    const cityCount = await City.countDocuments()

    const apiFeatures = new APIFeatures(
      City.find().populate("state", ["_id","name"]),
      req.query
    )
      .search()
      .filter()
      .pagination(resPerPage);

    const data = await apiFeatures.query

    res.status(200).json({
        success: true,
        count: data.length,
        total: cityCount,
        resPerPage,
        data
    })
});

// Create new City => /api/v1/city/new
exports.newCity = catchAsyncError(async (req, res, next)=>{
    console.log("Request: New City");

    const city = await City.create(req.body)

    res.status(200).json({
        success: true,
        city
    })
});

// Get City => /api/v1/city/:id
exports.getCity = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Get City");
    
    const city = await City.findById(req.params.id).populate('state');
    const state = await city.state.populate('country');
    // const country = await Country.findById(city.state.country);

    if(!city){
        return next(new ErrorHandler('City not found',400))
    }

    res.status(200).json({
        success: true,
        city
    })
});


exports.byOldid = catchAsyncError(async (req, res, next)=>{
    
    const data = await City.find({"old_id" : req.params.old_id})

    if(!data){
        return next(new ErrorHandler('City not found',400))
    }

    res.status(200).json({
        success: true,
        data
    })
});

// Update City => /api/v1/city/:id
exports.updateCity = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Update City");

    let city = await City.findById(req.params.id)

    if(!city){
        return next(new ErrorHandler('City not found',400))
    }

    city = await City.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success: true,
        city
    })
});

// Delete City => /api/v1/city/:id
exports.deleteCity = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Delete City");
   
    const city = await City.findById(req.params.id)

    if(!city){
        return next(new ErrorHandler('City not found',400))
    }

    await city.deleteOne()

    res.status(200).json({
        success: true,
        message:"Delete City"
    })
});


// Get State => /api/v1/state/:id
exports.getCityByState = catchAsyncError(async (req, res, next)=>{
     // console.log(req.params.id);
     const data = await City.find({ state: req.params.id });
    //const state = await State.find(req.params.id).populate('country','name')

    if(!data){
        return next(new ErrorHandler('Cities not found',400))
    }

    res.status(200).json({
        success: true,
        data
    })
});
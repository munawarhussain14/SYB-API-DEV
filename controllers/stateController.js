const State = require('../models/state')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/ApiFeatures')


// Get States => /api/v1/states
exports.getStates = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Get States");

    let resPerPage = 10;
    const stateCount = await State.countDocuments()

      if (req.query["resPerPage"]) {
        resPerPage = parseInt(req.query["resPerPage"]);
      }

    const apiFeatures = new APIFeatures(State.find().populate("country",["name"]), req.query)
    .search()
    .filter()
    .pagination(resPerPage)

    const data = await apiFeatures.query

    res.status(200).json({
      success: true,
      count: data.length,
      resPerPage,
      total: stateCount,
      data,
    });
});

// Create new State => /api/v1/state/new
exports.newState = catchAsyncError(async (req, res, next)=>{
    console.log("Request: New State");
    req.body["slug"] = req.body["name"]
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    const state = await State.create(req.body)

    res.status(200).json({
        success: true,
        state
    })
});

// Get State => /api/v1/state/:id
exports.getState = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Get State");
    
    const state = await State.findById(req.params.id).populate('country',["_id",'name'])

    if(!state){
        return next(new ErrorHandler('State not found',400))
    }

    res.status(200).json({
        success: true,
        state
    })
});


// Get State => /api/v1/state/:id
exports.getStateByCountry = catchAsyncError(async (req, res, next)=>{
     // console.log(req.params.id);
     const data = await State.find({ country: req.params.id });
    //const state = await State.find(req.params.id).populate('country','name')

    if(!data){
        return next(new ErrorHandler('States not found',400))
    }

    res.status(200).json({
        success: true,
        data
    })
});


// Update State => /api/v1/state/:id
exports.updateState = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Update State");

    if (req.body["name"])
      req.body["slug"] = req.body["name"]
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

    let state = await State.findById(req.params.id)

    if(!state){
        return next(new ErrorHandler('State not found',400))
    }

    state = await State.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        state
    })
});

// Delete State => /api/v1/state/:id
exports.deleteState = catchAsyncError(async (req, res, next)=>{
    console.log("Request: Delete State");
   
    const state = await State.findById(req.params.id)

    if(!state){
        return next(new ErrorHandler('State not found',400))
    }

    await state.deleteOne()

    res.status(200).json({
        success: true,
        message:"Delete State"
    })
});
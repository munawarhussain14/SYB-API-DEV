const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/ApiFeatures')


exports.termsAndCondition = catchAsyncError(async (req, res, next)=>{
    res.status(200)
});

const User = require("../models/user");

const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let { token } = req.cookies
    if(req.headers.authorization)
    {
        token =  req.headers.authorization;
    }

    if(!token){
        return next(new ErrorHandler('Login first to access this resource.',401));
    }  
    
    if(token=="j:null"){
        return next(new ErrorHandler("Null Token", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);
    req.user = user;

    next()

} )

// Check if user is authenticated or not
exports.isUser = catchAsyncErrors( async (req, res, next) => {
    let { token } = req.cookies
    if(req.headers.authorization)
    {
        token =  req.headers.authorization;
    }

    if(!token){
        return next();
    }  
    
    if(token=="j:null"){
        return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);
    req.user = user;
    next()

} )


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }

        next()
    }
}
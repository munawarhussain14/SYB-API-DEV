const Category = require("../models/category")
const Activity = require("../models/activity")
const Country = require("../models/country")

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/ApiFeatures')

exports.getFormData = catchAsyncError(async(req, res, next)=>{

    //const catagories = await Category.find({category:null})
    console.log("Get Form Data");
    const categories = await Category.find();
    const countries = await Country.find();
    
    var subCategories;
    console.log(req.query.parent);
    if(req.query.parent){
        subCategories = await Category.find({"parent":req.query.parent});
    }
    else{
        subCategories = null;
    }

    const activities = await Activity.find();
    
    res.status(200).json({
        success: true,
        asking_price_min:0,
        asking_price_max:100,
        revenue_min:0,
        revenue_max:100,
    	countries,
        categories,
        subCategories,
        activities
    })

})
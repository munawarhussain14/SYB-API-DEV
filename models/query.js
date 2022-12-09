const mongoose = require('mongoose')

const queryScheme = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please enter Name'],
        trim:true
    },
    phone:{
        type: String,
        required:[true, 'Please enter Phone No'],
        trim:true
    },
    email:{
        type: String,
        required:[true, 'Please enter Email'],
        trim:true
    },
    message:{
        type: String
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'List',
        required:[true, 'Please provide List']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }

})

module.exports = mongoose.model('Query', queryScheme)
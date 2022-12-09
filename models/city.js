const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter City Name"],
        trim: true     
    },
    enable:{
        type: Boolean,
        default: true
    },
    
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required:true
    } ,
    oldid: {
        type: String
    }
});

module.exports = mongoose.model('City',citySchema);
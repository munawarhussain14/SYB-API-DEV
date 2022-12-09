const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter department Name"],
        trim: true     
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Department"
    }, 
    enable:{
        type: Boolean,
        default: true
    },
    slug:{
        type: String,
    },
    icon : {
       type: String,
    }
});

module.exports = mongoose.model('Department',departmentSchema);